import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class GraficaArduinoService {

  constructor(private _http:HttpClient) { }

  ObtenerDatos() {


  // let api = "https://proyectofinalapi.herokuapp.com/arduino/ultimos"
  // let api = "https://proyectofinalapi.herokuapp.com/historicos/ultimos"
  
   let api = "https://apirestiaqi.herokuapp.com/arduino/ultimos"

   return  this._http.get(api)
  
  }
  createObject(a, b, c) {
    return new Object(
      {
        pais: a,
        cont: b,
        val : c
      }
    )
  }
}
