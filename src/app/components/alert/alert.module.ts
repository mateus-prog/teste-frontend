import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './components';

@NgModule({
  declarations: [
    AlertComponent
  ],
  imports:[CommonModule],
  exports: [
    AlertComponent
  ]
})

export class AlertModule { }
