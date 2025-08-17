import { AbstractControl, ValidationErrors, Validator } from '@angular/forms';

export class DateValidator implements Validator {
    static validate(c: AbstractControl): ValidationErrors | null {
        const rawInput = c.value;
        let formattedDate: string;

        if (rawInput.length === 8) {
            const day = rawInput.slice(0, 2);
            const month = rawInput.slice(2, 4);
            const year = rawInput.slice(4);

            formattedDate = `${day}/${month}/${year}`;
        }else{
            formattedDate = rawInput;
        }

        if (!formattedDate) {
            return null; // Campo vazio é permitido (use Validators.required se quiser obrigar)
        }

        const datePattern = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;

        if (!datePattern.test(formattedDate)) {
            return { invalidFormat: true }; // Formato inválido
        }

        const [day, month, year] = formattedDate.split('/').map(Number);
        const date = new Date(year, month - 1, day);

        /** saber se é maior do que 18 anos ou não */ 
        const today = new Date();
        const age = today.getFullYear() - date.getFullYear();
        const m = today.getMonth() - date.getMonth();
        const d = today.getDate() - date.getDate();

        const isUnder18 = age < 18 || (age === 18 && (m < 0 || (m === 0 && d < 0)));

        if (isUnder18) {
            return { underage: true };// Menor de 18 anos
        }
        //

        if (date.getDate() !== day || date.getMonth() + 1 !== month || date.getFullYear() !== year) {
            return { invalidDate: true }; // Data inexistente
        }

        return null;
    }

    validate(c: AbstractControl): ValidationErrors | null {
        return DateValidator.validate(c);
    }
}
