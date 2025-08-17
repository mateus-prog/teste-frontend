import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator } from '@angular/forms';
import { DateValidator } from 'src/app/validators/date/date.validator';

@Directive({
    selector: '[appDateValidate][ngModel]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: DateValidatorDirective,
        multi: true
    }]
})
export class DateValidatorDirective extends DateValidator implements Validator {}