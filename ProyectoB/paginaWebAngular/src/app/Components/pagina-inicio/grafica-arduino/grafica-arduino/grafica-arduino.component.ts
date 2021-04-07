import { Component, OnInit, ɵConsole } from '@angular/core';
import * as Highcharts from 'highcharts';
import {GraficaArduinoService} from '../../../../Services/pagina-inicio/grafica-arduino/grafica-arduino.service';



// declare var require: any;
// let Boost = require('highcharts/modules/boost');
// let noData = require('highcharts/modules/no-data-to-display');
// let More = require('highcharts/highcharts-more');

// Boost(Highcharts);
// noData(Highcharts);
// More(Highcharts);
// noData(Highcharts);

@Component({
  selector: 'app-grafica-arduino',
  templateUrl: './grafica-arduino.component.html',
  styleUrls: ['./grafica-arduino.component.scss']
})
export class GraficaArduinoComponent implements OnInit {

  public options : any = {
      chart: {
          type: 'column'
      },
      title: {
          text: 'Datos Propios'
      },
      xAxis: {
          categories: [] //nombre de los contaminantes
      },
      yAxis: {
        title: {
            text: 'µg/m3'
        }
      },
      // Esto define la leyenda dentro de cada valor 
      tooltip: {
        formatter:function(){
          switch(this.point.category){
            case "PM10":
              return "<small>PM10 ~ < 35 µg/m3 = BUENO <br> <= 50 µg/m3 = ACEPTABLE <br> > 50 µg/m3 = MALO</small><br>"+'<table><tr><td style="color:' + this.series.color+'"><b>'+this.series.name+'</b>: </td>'+'<td style="text-align: right"><b>'+this.point.y+' µg/m3 </b></td></tr>'
              break;
            case "PM25":
              return "<small>PM25 ~ < 20 µg/m3 = BUENO <br> <= 25 µg/m3 = ACEPTABLE <br> > 25 µg/m3 = MALO</small><br>"+'<table><tr><td style="color:' + this.series.color+'"><b>'+this.series.name+'</b>: </td>'+'<td style="text-align: right"><b>'+this.point.y+' µg/m3 </b></td></tr>'
              break;
            case "NO":
              return "<small>NO ~ <= 30 µg/m3 = BUENO <br> > 30 µg/m3 = MALO</small><br>"+'<table><tr><td style="color:' + this.series.color+'"><b>'+this.series.name+'</b>: </td>'+'<td style="text-align: right"><b>'+this.point.y+' µg/m3 </b></td></tr>'
              break;
            case "CO":
              return "<small>CO ~ < 10 µg/m3 = BUENO <br>  > 10 µg/m3 = MALO</small><br>"+'<table><tr><td style="color:' + this.series.color+'"><b>'+this.series.name+'</b>: </td>'+'<td style="text-align: right"><b>'+this.point.y+' µg/m3 </b></td></tr>'
              break;
            case "CO2":
              return "<small>CO2 ~ < 500000 µg/m3 = BUENO <br> > 500000 µg/m3 = MALO</small> <br>"+'<table><tr><td style="color:' + this.series.color+'"><b>'+this.series.name+'</b>: </td>'+'<td style="text-align: right"><b>'+this.point.y+' µg/m3 </b></td></tr>'
              break;
          }
        
        },
      },
      credits: {
          enabled: false
      },
      series: [
        
      ] //nombre(name) del pais y valores(data) de los contaminantes
  
  }
  

  constructor(private _arduino: GraficaArduinoService) { }
  ngOnInit(){
    var contenedor: Object
    var tooltip =[ ]
    var contaminantes = []
    var valContaminantes = []
    // realizamos la peticion a la API 
  this._arduino.ObtenerDatos().subscribe(
    datos => {
      let acum = 0
      var arr1:Object
      var arr2:Object
      var arr3:Object
    
       for (const key in datos["paises"]) {
        var contaminantes = []
        var valContaminantes = [] 
        for (let i = 0; i <  datos["paises"][key].length; i++) {

          // comprobamos que el contaminante NH3 no sea introducido 
          if (datos["paises"][key][i]["contaminante"] != "NH3") {
     
            //añadimos los contaminantes a un array
            contaminantes.push(datos["paises"][key][i]["contaminante"], )  

            //añadimos los valores de los contaminantes en un array con un control para convertir los null en 0
            if (datos["paises"][key][i]["valor"] != null) {
              valContaminantes.push(datos["paises"][key][i]["valor"])
            } else {
              valContaminantes.push(0)
            } 
          }
        }
        
        switch (acum) {
          case 0:
            arr1 = this._arduino.createObject(key,contaminantes,valContaminantes)
            break;
  
          case 1:
            arr2 = this._arduino.createObject(key,contaminantes,valContaminantes )
            break;
  
          case 2:
            arr3 = this._arduino.createObject(key,contaminantes,valContaminantes )
            break;
  
          default:
            break;
        }
        acum++    
      }
      let data = [
        {
          name:"Spain",
          data:[],
        },
        {
          name:"Bulgarian",
          data:[],
        },
        {
          name:"Greece",
          data:[],
        }
      ]
      var sinRepetir = arr1["cont"]
      var paises = [arr1["pais"], arr2["pais"], arr3["pais"]]
      var valores = [arr1["val"], arr2["val"], arr3["val"]]
      
      
      for (let i = 0; i < paises.length; i++) {
        data[i]["name"] = paises[i];
        data[i]["data"] = valores[i];
      }
      console.log(data)
      this.options.series = data
      this.options.xAxis["categories"] = sinRepetir
      Highcharts.chart('arduino', this.options)
  
      }
    )
  }
}  


