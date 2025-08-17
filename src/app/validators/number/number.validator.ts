import { Validator, AbstractControl } from '@angular/forms';
import { ValidationErrors } from '@angular/forms';

export class NumberValidator implements Validator {

    /**
     * Valida um CPF ou CNPJ de acordo com seu dígito verificador.
     */
    static validate(c: AbstractControl): ValidationErrors | null {

        const number = c.value;

        if(number.length > 0){
            var numsStr = number.replace(/[^0-9]/g,'');
            
            if (parseInt(numsStr) != number) {
                // Dígito verificador não é válido, resultando em falha.
                return { isNotNumber: true };
            }
        }

        return null;
    }

    /**
     * Implementa a interface de um validator.
     */
    validate(c: AbstractControl): ValidationErrors | null {
        return NumberValidator.validate(c);
    }
}