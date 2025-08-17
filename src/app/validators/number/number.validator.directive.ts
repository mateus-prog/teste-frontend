import { Directive } from '@angular/core';
import { Validator, NG_VALIDATORS } from '@angular/forms';

import { NumberValidator } from 'src/app/validators/number/number.validator';

@Directive({
    selector: '[appNumberValidate][ngModel]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: NumberValidatorDirective,
        multi: true
    }]
})

export class NumberValidatorDirective extends NumberValidator implements Validator {}