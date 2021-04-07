import { Component, OnInit } from '@angular/core';
import { ExternosServicesService} from '../../../Services/pagina-externos/externos-services.service'
import { FormControl, FormGroup } from '@angular/forms';
import * as Highcharts from 'highcharts'

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);

@Component({
  selector: 'app-externos',
  templateUrl: './externos.component.html',
  styleUrls: ['./externos.component.scss']
})
export class ExternosComponent implements OnInit {
  public options:any ={

    title: {
        text: 'Media de valores de cada contaminante'
    },

    subtitle: {
        text: ''
    },

    yAxis: {
        title: {
            text: 'µg / m3'
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
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },
    series: [],

    // responsive: {
    //     rules: [{
    //         condition: {
    //             maxWidth: 500
    //         },
    //         chartOptions: {
    //             legend: {
    //                 layout: 'horizontal',
    //                 align: 'center',
    //                 verticalAlign: 'bottom'
    //             }
    //         }
    //     }]
    // }
  }
  
  createFormGroup() {
    return new FormGroup({
      estacion: new FormControl(''),
      fechaInicial: new FormControl(''),
      fechaFinal: new FormControl(''),
    })
  }
  contactForm: FormGroup;
  constructor(private _externos: ExternosServicesService) { 
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
    ]
    this._externos.postAPI(this.contactForm.value).subscribe( data => {
      let fechas = new Array();
      let contaminantes =  new Array();
      let contVal = new Array();
      let indice = 0;
      let indiceE = 0;
 
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
        if (data[key]["contaminante"] != "h" && data[key]["contaminante"] != "t" && data[key]["contaminante"] != "w" && data[key]["contaminante"] != "wg" && data[key]["contaminante"] != "dew" && data[key]["contaminante"] != "p") {
          contVal.forEach( element => {
              
            if (data[key]["contaminante"].toUpperCase() == element["name"]) {
              encUno = true;
              indiceE = indice
            }
          })
          //añadimos los contaminantes en caso que no esté repetido  
          if (!encUno) {
            contaminantes.push(data[key]["contaminante"].toUpperCase())
            contVal.push(
              {
                name: data[key]["contaminante"].toUpperCase(), 
                data:[Math.round(data[key]["valor"])]
              }
              )
            } else {
              contVal.forEach(element => {
                if (data[key]["contaminante"].toUpperCase() == element["name"]) {
                  element["data"].push(Math.round(data[key]["valor"]))
                }
              });
            }
            indice++
        }
        
        
      }
        
        this.options.xAxis["categories"] = fechas
        this.options.series = contVal
        this.options.subtitle["text"] = "Estación: "+data[0]["estacion"]
        Highcharts.chart('externos', this.options)
    })
    
  }
}