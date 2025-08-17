import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { MessageService } from 'src/app/components/message/service/message.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private messageService: MessageService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            const error = err.error?.message || err.statusText;
            if(err.error?.message == 'Não Autorizado' && err.status == 401){
            }else{
                this.messageService.error(error);
            }

            console.error(err);
            return throwError(error);
            //return throwError(err.error.errors);
        }))
    }
}