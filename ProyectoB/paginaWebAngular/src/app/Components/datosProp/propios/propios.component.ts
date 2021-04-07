import { Component, OnInit } from '@angular/core';
import { PropiosServiceService } from '../../../Services/pagina-propios/propios-service.service'
import { FormControl, FormGroup } from '@angular/forms';
import * as Highcharts from 'highcharts'



@Component({
  selector: 'app-propios',
  templateUrl: './propios.component.html',
  styleUrls: ['./propios.component.scss']
})
export class PropiosComponent implements OnInit {
  
  public options:any ={

    title: {
        text: 'Media de valores de cada contaminante'
    },

    subtitle: {
        text: ''
    },

    yAxis: {
        title: {
            text: 'µg/m3'
        }
    },

    xAxis: {
        categories:[]
    },
    tooltip: {
      formatter:function(){
        switch(this.series.name){
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
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },
    series: [],

    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
        }]
    }
  }
  createFormGroup() {
    return new FormGroup({
      estacion: new FormControl(''),
      fechaInicial: new FormControl(''),
      fechaFinal: new FormControl(''),
    })
  }
  contactForm: FormGroup;
  constructor(private _propios : PropiosServiceService) { 
    this.contactForm = this.createFormGroup();
  }

  ngOnInit(): void {
    
    
  }
  
  onSaveForm(){
   
    let contVal =  [
      {
        name : "",
        data:[]
      },
      console.log(this.contactForm.value)
    ]
    this._propios.postAPI(this.contactForm.value).subscribe( data => {
      console.log(data)
      let fechas = new Array();
      let contaminantes =  new Array();
      let contVal = new Array();
      let valCO = new Array();
      let valPM10 = new Array();
      let valNO = new Array();
      let valCO2 = new Array();
      let valPM25 = new Array();
      for (const key in data) {
        let enc = false;
        let encUno = false;
        //key son numeros 
        //empieza comprobacion de repetidos de fecha

          fechas.forEach(element => {
            if (data[key]["fecha"].substr(0,10) == element) {
              enc = true
            }
          });
          
          // añadimos la fecha en caso de que no este repetido
          if (!enc) {
            fechas.push(data[key]["fecha"].substr(0,10))
          }
          
          // comprobacion de repetidos en contaminantes
          contVal.forEach( element => {
            if (data[key]["contaminante"] == element["name"]) {
              encUno = true;
            }
          })
          //añadimos los contaminantes en caso que no esté repetido  
          if (!encUno) {
            contaminantes.push(data[key]["contaminante"])
          }
          // console.log(data[key]["valor"])
          // almacenamos la cantidad de datos 
          switch(data[key]["contaminante"]){
            case "CO":
              if (data[key]["valor"] == null){
                valCO.push(0)
              } else {
                valCO.push(Math.round(data[key]["valor"]))
              }
              break;
            case "PM10":
                if (data[key]["valor"] == null){
                  valPM10.push(0)
                } else {
                  valPM10.push(Math.round(data[key]["valor"]))
                }  
                break;
            case "NO": 
              if (data[key]["valor"] == null){
                valNO.push(0)
              } else {
                valNO.push(Math.round(data[key]["valor"]))
              } 
              break;
            case "CO2":
              if (data[key]["valor"] == null){
                valCO2.push(0)
              } else {
                valCO2.push(Math.round(data[key]["valor"]))
              } 
              break;
            case "PM25":
              if (data[key]["valor"] == null){
                valPM25.push(0)
              } else {
                valPM25.push(Math.round(data[key]["valor"]))
              }
            default:
              break;
          }

          contVal = [
            {
              name: "CO",
              data: valCO
            },
            {
              name: "PM10",
              data: valPM10
            },
            {
              name: "NO",
              data: valNO
            },
            {
              name: "CO2",
              data: valCO2
            },
            {
              name:"PM25",
              data: valPM25
            }
          ]
      }
      console.log(contVal)
      this.options.xAxis["categories"] = fechas
      this.options.series = contVal
      this.options.subtitle["text"] =  "Estacion: "+data[0]["estacion"]
      Highcharts.chart('propios', this.options)
    })
  }
}
  
