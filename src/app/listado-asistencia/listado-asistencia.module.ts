import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListadoAsistenciaPageRoutingModule } from './listado-asistencia-routing.module';

import { ListadoAsistenciaPage } from './listado-asistencia.page';
import { QrCodeModule } from 'ng-qrcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListadoAsistenciaPageRoutingModule,
    QrCodeModule
  ],
  declarations: [ListadoAsistenciaPage]
})
export class ListadoAsistenciaPageModule {}
