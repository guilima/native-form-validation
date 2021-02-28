export default class FormValidateHelper {

    customValidate = {
        cpfValidate: (cpf) => {
            cpf = cpf.replace(/\D/g, '');
            if(cpf.toString().length != 11 || /^(\d)\1{10}$/.test(cpf)) return false;
            var result = true;
            [9,10].forEach(function(j){
                var soma = 0, r;
                cpf.split(/(?=)/).splice(0,j).forEach(function(e, i){
                    soma += parseInt(e) * ((j+2)-(i+1));
                });
                r = soma % 11;
                r = (r <2)?0:11-r;
                if(r != cpf.substring(j, j+1)) result = false;
            });
            return result;
        }
    }

    constructor() { }

    setErrorMessage(elem) {
        const label = elem.dataset.label;
        const validate = elem.dataset.validate;
        try {
            validate && elem.setCustomValidity(this.customValidate[validate](elem.value) ? '' : `${label} inválido.`);
        } catch (_) {
            throw new Error(`Custom [data-validate] value at: ${elem.outerHTML} is undefined`);
        }
        const validity = {
            badInput: [`${label} contem caracter inválido.`, elem.validity.badInput],
            rangeOverflow: [`${label} inválido.`, elem.validity.rangeOverflow],
            rangeUnderflow: [`${label} inválido.`, elem.validity.rangeUnderflow],
            stepMismatch: [`${label} inválido.`, elem.validity.stepMismatch],
            patternMismatch: [`${label} contem caracter inválido.`, elem.validity.patternMismatch],
            tooLong: [`${label} deve conter até ${elem.maxLength} caracteres.`, elem.validity.tooLong],
            tooShort: [`${label} deve conter ${elem.minLength} caracteres ou mais.`, elem.validity.tooShort],
            typeMismatch: [`${label} inválido.`, elem.validity.typeMismatch],
            valid: ['', elem.validity.valid],
            valueMissing: [`${label} obrigatório.`, elem.validity.valueMissing],
            customError: [elem.validationMessage, elem.validity.customError]
        };
        const validityName = Object.keys(validity).find(key => {
            const [, isInvalid] = validity[key];
            return isInvalid;
        });
        const [message] = validity[validityName];
    
        return message || '';
    }
}