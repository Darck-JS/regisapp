import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FotoRegistroPage } from './foto-registro.page';

const routes: Routes = [
  {
    path: '',
    component: FotoRegistroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FotoRegistroPageRoutingModule {}
