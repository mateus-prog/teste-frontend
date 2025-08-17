import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({ providedIn: 'root' })
export class MessageService {
    // convenience methods
    success(message: string) {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: '<span style="font-size: 18px;">'+message+'</span>',
            showConfirmButton: false,
            timer: 1500
        })
    }

    error(message: string) {
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: '<span style="font-size: 18px;">'+message+'</span>',
            showConfirmButton: false,
            timer: 1500
        })
    }

    info(message: string) {
        Swal.fire({
            position: 'top-end',
            icon: 'info',
            title: '<span style="font-size: 18px;">'+message+'</span>',
            showConfirmButton: false,
            timer: 1500
        })
    }

    warning(message: string) {
        Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: '<span style="font-size: 18px;">'+message+'</span>',
            showConfirmButton: false,
            timer: 1500
        })
    }
}