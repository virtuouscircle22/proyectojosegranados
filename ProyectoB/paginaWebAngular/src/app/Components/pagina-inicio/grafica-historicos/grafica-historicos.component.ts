import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import {GraficaHistoricosService} from '../../../Services/pagina-inicio/grafica-historicos/grafica-historicos.service';



@Component({
    selector: 'app-grafica-historicos',
    templateUrl: './grafica-historicos.component.html',
    styleUrls: ['./grafica-historicos.component.scss']
  })
export class GraficaHistoricosComponent implements OnInit {
  public options : any = {
      chart: {
          type: 'column'
      },
      title: {
          text: 'Datos Externos'
      },
      xAxis: {
          categories: [] //nombre de los contaminantes
      }, 
      yAxis: {
        title: {
            text: 'µg/m3'
        }
      },
      //Define el contenido de la leyenda
      tooltip: {
        formatter:function(){
          switch(this.point.category){
            case "PM10":
              return "<small>PM10 ~ < 35 µg/m3 = BUENO <br> <= 50 µg/m3 = ACEPTABLE <br> > 50 µg/m3 = MALO</small><br>"+'<table><tr><td style="color:' + this.series.color+'"><b>'+this.series.name+'</b>: </td>'+'<td style="text-align: right"><b>'+this.point.y+' µg/m3 </b></td></tr>'
              break;
            case "PM25":
              return "<small>PM25 ~ < 20 µg/m3 = BUENO <br> <= 25 µg/m3 = ACEPTABLE <br> > 25 µg/m3 = MALO</small><br>"+'<table><tr><td style="color:' + this.series.color+'"><b>'+this.series.name+'</b>: </td>'+'<td style="text-align: right"><b>'+this.point.y+' µg/m3 </b></td></tr>'
              break;
            case "NO2":
              return "<small>NO2 ~ <= 30 µg/m3 = BUENO <br> <= 40 µg/m3 = ACEPTABLE <br> > 40 µg/m3 = MALO</small><br>"+'<table><tr><td style="color:' + this.series.color+'"><b>'+this.series.name+'</b>: </td>'+'<td style="text-align: right"><b>'+this.point.y+' µg/m3 </b></td></tr>'
              break;
            case "CO":
              return "<small>CO ~ < 10 µg/m3 = BUENO <br>  > 10 µg/m3 = MALO</small><br>"+'<table><tr><td style="color:' + this.series.color+'"><b>'+this.series.name+'</b>: </td>'+'<td style="text-align: right"><b>'+this.point.y+' µg/m3 </b></td></tr>'
              break;
            case "SO2":
              return "<small>SO2 ~ < 15 µg/m3 = BUENO <br> <= 20 µg/m3 = ACEPTABLE <br> >20 µg/m3 = MALO</small> <br>"+'<table><tr><td style="color:' + this.series.color+'"><b>'+this.series.name+'</b>: </td>'+'<td style="text-align: right"><b>'+this.point.y+' µg/m3 </b></td></tr>'
              break;
            case "O3":
              return "<small>O3 ~ < 75 µg/m3 = BUENO <br> <=100 µg/m3 = ACEPTABLE <br> > 100 µg/m3 = MALO </small> <br>"+'<table><tr><td style="color:' + this.series.color+'"><b>'+this.series.name+'</b>: </td>'+'<td style="text-align: right"><b>'+this.point.y+' µg/m3 </b></td></tr>'
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
 
  constructor(private _historicos: GraficaHistoricosService) { }
    ngOnInit(){
    let paises = ["spain","bulgarian","greece"]
    let i = 0
    let datosSpain = []
    let datosBulgarian = []
    let datosGreece = []

      let nameComun = []

      paises.forEach(k => {

        this._historicos.ObtenerDatos(k).subscribe( data => {

          for (const key in data["data"]["iaqi"]) {
            if(k == 'spain'){
              datosSpain.push(
                {
                  name: key,
                  data: data["data"]["iaqi"][key]["v"]
                }
              )
            } else if (k == 'bulgarian') {
              datosBulgarian.push(
                {
                  name: key,
                  data: data["data"]["iaqi"][key]["v"]
                }
              )
            } else {
              datosGreece.push(
                {
                  name: key,
                  data: data["data"]["iaqi"][key]["v"]
                }
              )
            }
          }
        i++
        if (i == paises.length) {
             
          let categories = []
          let datos = [
            {
              name: "Spain",
              data: []
            },
            {
              name: "Bulgarian",
              data: []
            },
            {
              name: "Greece",
              data: []
            }
          ]
          //Introducción de primeros datos 
          datosSpain.forEach(eSpain => {
            datosBulgarian.forEach(eBulgarian => {
              datosGreece.forEach(eGreece => {
                if(""+eSpain["name"] == ""+eBulgarian["name"] && ""+eSpain["name"] == ""+eGreece["name"]){
                  if(""+eSpain["name"] != "p" && ""+eSpain["name"] != "h" && ""+eSpain["name"] != "dew" && ""+eSpain["name"] != "w" && ""+eSpain["name"] != "wg" && ""+eSpain["name"] != "t"){
                     datos[0]["data"].push(eSpain["data"])
                    datos[1]["data"].push(eBulgarian["data"])
                    datos[2]["data"].push(eGreece["data"])
                    categories.push(eSpain["name"].toUpperCase())
                    nameComun.push(eSpain["name"])
                  }
                }
              });
            });
          });
// Debido a que cada país puede mostrar distintos contaminantes, en la introducción de datos anterior solo se han introducido los contaminantes comunes.
// Para ello realizaremos diferentes algoritmos para cada país 
let only = []

//       Algoritmo ESPAÑA
          datosSpain.forEach(eSpain => {
            let encontrado = false
            nameComun.forEach(key => {
              if(""+eSpain["name"] == ""+key){
                encontrado = true
              }
            });

            if(!encontrado){
              only.push(
                {
                  name: eSpain["name"],
                  data: [eSpain["data"], 0, 0]
                }
              )
            }
          });
//      Algoritmo BULGARIA

          datosBulgarian.forEach(eBulgarian => {
            let encontrado = false
            nameComun.forEach(key => {
              if(""+eBulgarian["name"] == ""+key){
                encontrado = true
              }
            });
            if(!encontrado){
              let encontradoB = false
              let indice1E = 0
              let indice1 = 0
              only.forEach(element2 => {
                if(""+eBulgarian["name"] == ""+element2["name"]){
                  encontradoB = true
                  indice1E = indice1
                }
                indice1++
              });

              if(encontradoB){
                only[indice1E]["data"][1] = eBulgarian["data"]
              } else {
                only.push(
                  {
                    name: eBulgarian["name"],
                    data: [0, eBulgarian["data"], 0]
                  }
                )
              }
            }
          });
          //Algoritmo Grecia 
        

          datosGreece.forEach(eGreece => {

            let encontrado = false
            nameComun.forEach(key => {
              if(""+eGreece["name"] == ""+key){
                encontrado = true
              }
            });

            if(!encontrado){
              let encontradoB = false
              let indice1E = 0
              let indice1 = 0

              only.forEach(element2 => {
                if(""+eGreece["name"] == ""+element2["name"]){
                  encontradoB = true
                  indice1E = indice1
                }
                indice1++
              });

              if(encontradoB){
                only[indice1E]["data"][2] = eGreece["data"]
              } else {
                only.push(
                  {
                    name: eGreece["name"],
                    data: [0, 0, eGreece["data"]]
                  }
                )
              }
            }
          });
          //Introduccion de datos
          only.forEach(element => {
            if(""+element["name"] != "p" && ""+element["name"] != "h" && ""+element["name"] != "dew" && ""+element["name"] != "w" && ""+element["name"] != "wg" && ""+element["name"] != "t" ){

              datos[0]["data"].push(element["data"][0])
              datos[1]["data"].push(element["data"][1])
              datos[2]["data"].push(element["data"][2])
              categories.push(element["name"].toUpperCase())
            }
          });

          //Asignación de los datos a la gráfica
          this.options.xAxis["categories"] = categories
          this.options.series = datos
          Highcharts.chart('container', this.options)          
        }
        })
        

      });

  }  
} 
        
  

