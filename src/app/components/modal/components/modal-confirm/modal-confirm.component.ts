import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.css']
})
export class ModalConfirmComponent{

  @Input() id!: string;
  @Input() inUse!: boolean;
  @Input() title!: string;
  @Input() message!: string;
  @Input() buttonCancel!: string;
  @Input() buttonConfirm!: string;

  @Output() confirm = new EventEmitter<boolean>();

  constructor() { }

  confirmModal(){
    this.confirm.emit(true);
  }

  cancelModal(){
    this.confirm.emit(false);
  }

}
