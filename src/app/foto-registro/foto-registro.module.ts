import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FotoRegistroPageRoutingModule } from './foto-registro-routing.module';

import { FotoRegistroPage } from './foto-registro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FotoRegistroPageRoutingModule
  ],
  declarations: [FotoRegistroPage]
})
export class FotoRegistroPageModule {}
