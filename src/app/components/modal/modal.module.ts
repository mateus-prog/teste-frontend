import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalConfirmComponent } from 'src/app/components/modal/components/modal-confirm';
import { ModalResetPasswordComponent } from 'src/app/components/modal/components/modal-reset-password';

@NgModule({
  declarations: [
    ModalConfirmComponent,
    ModalResetPasswordComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ModalConfirmComponent,
    ModalResetPasswordComponent
  ]
})

export class ModalModule { }