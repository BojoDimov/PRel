import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { NgxElectronModule } from 'ngx-electron';
import { DataMockService } from 'src/services/data-mock.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    NgxElectronModule,
    AppRoutingModule
  ],
  providers: [
    DataMockService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
