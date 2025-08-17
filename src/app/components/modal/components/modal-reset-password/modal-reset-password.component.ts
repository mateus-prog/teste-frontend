import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modal-reset-password',
  templateUrl: './modal-reset-password.component.html',
  styleUrls: ['./modal-reset-password.component.css']
})
export class ModalResetPasswordComponent{

  @Input() id!: string;
  @Input() htmlContent: string = '';
}