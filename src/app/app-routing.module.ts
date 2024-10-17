import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { guardGuard } from './guard/guard.guard';

const routes: Routes = [
  {
    path: 'home-profesor',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [guardGuard]
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
    loadChildren: () => import('./recuperapass/recuperapass.module').then( m => m.RecuperapassPageModule),
    canActivate: [guardGuard]
  },
  {
    path: 'listado-asistencia',
    loadChildren: () => import('./listado-asistencia/listado-asistencia.module').then( m => m.ListadoAsistenciaPageModule),
    canActivate: [guardGuard]
  },
  {
    path: 'foto-registro',
    loadChildren: () => import('./foto-registro/foto-registro.module').then( m => m.FotoRegistroPageModule),
    canActivate: [guardGuard]
  },
  {
    path: 'home-alumno',
    loadChildren: () => import('./home-alumno/home-alumno.module').then( m => m.HomeAlumnoPageModule),
    canActivate: [guardGuard]
  },
  {
    path: '**',
    loadChildren: () => import('./page404/page404.module').then( m => m.Page404PageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
