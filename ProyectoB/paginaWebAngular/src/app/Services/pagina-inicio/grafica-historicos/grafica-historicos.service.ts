import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class GraficaHistoricosService {

  constructor(private _http: HttpClient) { }

  ObtenerDatos(pais){
    let apiSpain = "https://api.waqi.info/feed/@8495/?token=2925a12d6716caa9e5eff975b281dd6eb985552c"
    let apiBulgarian = "https://api.waqi.info/feed/@8084/?token=2925a12d6716caa9e5eff975b281dd6eb985552c"
    let apiGreece = "https://api.waqi.info/feed/@12410/?token=2925a12d6716caa9e5eff975b281dd6eb985552c"
    switch (pais) {
      case "spain":
        return this._http.get(apiSpain)
        break;
      case "bulgarian":
        return this._http.get(apiBulgarian)
        break;
      case "greece": 
        return this._http.get(apiGreece)
        break;
      default:
        break;
    }
  }

}