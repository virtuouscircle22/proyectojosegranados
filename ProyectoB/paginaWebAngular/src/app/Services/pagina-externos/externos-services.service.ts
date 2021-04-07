import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ExternosServicesService {

  constructor(private _http: HttpClient) { }

  postAPI(datos){
    // let url = "http://localhost:3000/historicos/"+datos["estacion"]+"/"+datos["fechaInicial"]+"/"+datos["fechaFinal"]
    let url = "https://apirestiaqi.herokuapp.com/historicos/"+datos["estacion"]+"/"+datos["fechaInicial"]+"/"+datos["fechaFinal"]
   return this._http.post(url, datos);
  }
}
