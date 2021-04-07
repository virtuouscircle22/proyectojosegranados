import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class PropiosServiceService {

  constructor(private _http: HttpClient) { }

  postAPI(datos){
    let url = "https://apirestiaqi.herokuapp.com/arduino/"+datos["estacion"]+"/"+datos["fechaInicial"]+"/"+datos["fechaFinal"]

   return this._http.post(url, datos);
  }
}
