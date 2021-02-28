import FormValidateHelper from './form.validate.helper.js';

const formValidateHelper = new FormValidateHelper();
const CUSTOM_CPF_VALIDATE = 'cpfValidate';
const UNDEFINED_CUSTOM_VALIDATE = 'undefinedCpfValidate';

beforeEach(() => {
    document.body.innerHTML = `
        <div class="field-group">
            <label class="label" for="cpf">CPF</label>
            <div class="input-group">
                <input data-label="CPF" data-validate type="text" id="cpf" name="cpf" class="input" maxlength="11" required>
                <div class="error"></div>
            </div>
        </div>`;
});
describe('form input validate', () => {
    it('should not print error message', async () => {
        const inputElement = document.getElementById('cpf');
        inputElement.dataset.validate = CUSTOM_CPF_VALIDATE;
        inputElement.value = '40300918810';
        const hasErroMessage = formValidateHelper.setErrorMessage(inputElement);
        expect(hasErroMessage).toBe('');
    });

    it('should print error message', async () => {
        const inputElement = document.getElementById('cpf');
        inputElement.dataset.validate = CUSTOM_CPF_VALIDATE;
        inputElement.value = '40300918811';
        const hasErroMessage = formValidateHelper.setErrorMessage(inputElement);
        expect(hasErroMessage).toBe('CPF inválido.');
    });

    it('should throw exception error - Custom [data-validate] value is undefined', async () => {
        const inputElement = document.getElementById('cpf');
        inputElement.dataset.validate = UNDEFINED_CUSTOM_VALIDATE;
        inputElement.value = '40300918810';
        const hasErroMessage = () => formValidateHelper.setErrorMessage(inputElement);
        expect(hasErroMessage).toThrowError(`Custom [data-validate] value at: ${inputElement.outerHTML} is undefined`);
    });
});