import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { QrCodeModule } from 'ng-qrcode';



@NgModule({
  declarations: [AppComponent],
  imports: [QrCodeModule,HttpClientModule, BrowserModule, IonicModule.forRoot(), AppRoutingModule, CommonModule],
  providers: [{provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
