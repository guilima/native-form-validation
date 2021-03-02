import UserStore from './user.store.js';
import FormValidateHelper from './form.validate.helper.js';

export default class RegisterPage {
    userStore = new UserStore();
    formValidateHelper = new FormValidateHelper();

    constructor() { }

    render() {
        const formElement = document.getElementById('userForm');
        const fieldElementList = Array.from(formElement.elements).filter(elem => elem.tagName !== "BUTTON");
        const btnSubmitElement = document.querySelector("[type='submit']");
        formElement.addEventListener('submit', this.onSubmit.bind(this));
        fieldElementList.forEach(field => {
            const labelElement = field.parentElement.previousElementSibling;
            field.addEventListener('focus', () => {
                !field.value && labelElement.classList.add('filled');
            });
            field.addEventListener('blur', () => {
                !field.value && labelElement.classList.remove('filled');
            });
            field.addEventListener('input', () => {
                const fieldErrorElement = document.querySelector(`#${field.id} + .error`);
                document.activeElement === field || field.value ? labelElement.classList.add('filled') : labelElement.classList.remove('filled');
                if(!field.classList.contains('dirty')) {
                    field.classList.add('dirty');
                }
                fieldErrorElement.textContent = this.formValidateHelper.setErrorMessage(field);
                btnSubmitElement.disabled = !formElement.checkValidity();
            });
        });
    }

    async onSubmit(event) {
        const formObj = Object.fromEntries(new FormData(event.target));
        const [ btnSubmitElement ] = Array.from(event.target.elements).filter(elem => elem.tagName === "BUTTON");
        const fieldElementList = Array.from(event.target.elements).filter(elem => elem.tagName !== "BUTTON");
        if(!event.target.checkValidity()) {
            event.preventDefault();
            return;
        }
        btnSubmitElement.classList.add('loading');
        btnSubmitElement.disabled = true;
        await this.userStore.addUser(formObj);
        event.target.reset();
        btnSubmitElement.classList.remove('loading');
        btnSubmitElement.firstChild.data = 'Sucesso';
        btnSubmitElement.disabled = false;
        fieldElementList.forEach(elem => {
            const labelElement = elem.parentElement.previousElementSibling;
            labelElement.classList.remove('filled');
            elem.classList.remove('dirty');
        });
        setTimeout(() => {
            btnSubmitElement.firstChild.data = 'Cadastrar';
            btnSubmitElement.disabled = true;
        }, 2000);
        event.preventDefault();
    }
}