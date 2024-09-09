import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'recuperapass',
    loadChildren: () => import('./recuperapass/recuperapass.module').then( m => m.RecuperapassPageModule)
  },
  {
    path: 'listado-asistencia',
    loadChildren: () => import('./listado-asistencia/listado-asistencia.module').then( m => m.ListadoAsistenciaPageModule)
  },
  {
    path: 'foto-registro',
    loadChildren: () => import('./foto-registro/foto-registro.module').then( m => m.FotoRegistroPageModule)
  },
  {
    path: 'home-alumno',
    loadChildren: () => import('./home-alumno/home-alumno.module').then( m => m.HomeAlumnoPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
