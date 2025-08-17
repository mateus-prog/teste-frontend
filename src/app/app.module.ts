import { NgModule, NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from 'src/app/helper';
import { BreadcrumbModule } from 'src/app/components/breadcrumb/breadcrumb.module';

import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';
import { HeaderComponent } from 'src/app/template/header';

import { AlertModule } from 'src/app/components/alert/alert.module';
import { ModalModule } from 'src/app/components/modal/modal.module';

import { LoginComponent } from 'src/app/login/components/login';
import { ChangePasswordComponent } from 'src/app/login/components/change-password';

import { NgxMaskModule } from 'ngx-mask';

import { DatePipe } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';

import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';  
import { TranslateHttpLoader } from '@ngx-translate/http-loader'; 

import { UtilityService } from 'src/app/helper/utility';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export const MY_DATE_FORMAT = {
  display: {
    dateInput: 'DD MMM YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@NgModule({
  declarations: [	
    AppComponent,
    HeaderComponent,
    LoginComponent,
    ChangePasswordComponent,
 ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AlertModule,
    ModalModule,
    BreadcrumbModule,
    NgxMaskModule.forRoot(),
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    TranslateModule.forRoot({  
        loader: {  
          provide: TranslateLoader,  
          useFactory: HttpLoaderFactory,  
          deps: [HttpClient]  
        } //,defaultLanguage: 'pt-br',  
      })  
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: 'googleTagManagerId',  useValue: 'GTM-M5NCC3N' },
    {
      provide: MAT_DATE_LOCALE,
      useFactory: (translate: TranslateService) => {
        return translate.currentLang;
      },
      deps: [TranslateService],
    },
    UtilityService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
