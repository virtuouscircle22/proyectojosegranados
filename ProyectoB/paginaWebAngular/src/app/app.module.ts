import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// heroku git:remote -a appproyectopi
//añadidos por José Granados Rodríguez
import { MenuComponent } from './Components/menu/menu.component';
import { GraficaHistoricosComponent } from './Components/pagina-inicio/grafica-historicos/grafica-historicos.component';
import { HttpClientModule } from '@angular/common/http';
import { GraficaArduinoService } from 'src/app/Services/pagina-inicio/grafica-arduino/grafica-arduino.service';
import { GraficaArduinoComponent } from './Components/pagina-inicio/grafica-arduino/grafica-arduino/grafica-arduino.component';
import { FooterComponent } from './Components/footer/footer.component';
import { GraficasComponent } from './Components/pagina-inicio/graficas/graficas.component';
import { PropiosComponent } from './Components/datosProp/propios/propios.component';
import { PropiosServiceService} from './Services/pagina-propios/propios-service.service'
import { ExternosServicesService } from './Services/pagina-externos/externos-services.service'
import { ExternosComponent } from './Components/datosExt/externos/externos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ExplicacionComponent } from './Components/explicacion/explicacion.component';
import { ContaminantesComponent } from './Components/contaminantes/contaminantes.component';




@NgModule({
  declarations: [
    AppComponent,
    GraficaHistoricosComponent,
    GraficaArduinoComponent,
    FooterComponent,
    GraficasComponent,
    PropiosComponent,
    MenuComponent,
    ExternosComponent,
    ExplicacionComponent,
    ContaminantesComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    

  ],
  providers: [GraficaArduinoService,PropiosServiceService,ExternosServicesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
