import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//AÑADIDO POR JOSE GRANADOS RODIGUEZ
import { PropiosComponent } from './Components/datosProp/propios/propios.component';
import { ExternosComponent } from './Components/datosExt/externos/externos.component';
import { GraficasComponent } from './Components/pagina-inicio/graficas/graficas.component';
import { ExplicacionComponent } from './Components/explicacion/explicacion.component';
import { ContaminantesComponent } from './Components/contaminantes/contaminantes.component';

const routes: Routes = [
  { path: '', component:  GraficasComponent},
  { path: 'propios', component: PropiosComponent },
  { path: 'externos', component: ExternosComponent },
  { path: 'explicacion', component: ExplicacionComponent },
  { path: 'contaminantes', component: ContaminantesComponent  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
