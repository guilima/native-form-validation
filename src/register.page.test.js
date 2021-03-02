import RegisterPage from './register.page.js';

const registerPage = new RegisterPage();
const NAME = 'Joao Castro Silva';
const EMAIL = 'jo_castro@gmail.com';
const EMAIL_INVALID = 'jo_castro@';
const CPF = '13839216877';
const PHONE = '11993242221';

beforeEach(() => {
    document.body.innerHTML = `
        <form class="form" id="userForm" onsubmit="return false;">
            <div class="field-group">
                <label class="label" for="name">Nome completo (sem abreviações)</label>
                <div class="input-group">
                    <input data-label="Nome" type="text" id="name" name="name" class="input" required minlength="3" maxlength="50" pattern="^[A-zÀ-ú ]+$">
                    <div class="error"></div>
                </div>
            </div>

            <div class="field-group">
                <label class="label" for="email">E-mail</label>
                <div class="input-group">
                    <input data-label="Email" type="email" id="email" name="email" class="input" required>
                    <div class="error"></div>
                </div>
            </div>

            <div class="field-group">
                <label class="label" for="cpf">CPF</label>
                <div class="input-group">
                    <input data-label="CPF" data-validate="cpfValidate" type="text" id="cpf" name="cpf" class="input" maxlength="11" required>
                    <div class="error"></div>
                </div>
            </div>

            <div class="field-group">
                <label class="label" for="phone">Telefone</label>
                <div class="input-group">
                    <input data-label="Telefone" type="tel" id="phone" name="phone" class="input" required minlength="10" maxlength="11" pattern="[0-9]{10,11}">
                    <div class="error"></div>
                </div>
            </div>
            <button type="submit" class="btn">Cadastrar<div class="loader"></div></button>
        </form>`;

        registerPage.render();
});

describe('register page', () => {
    it('should submit user data', async () => {
        document.getElementById('name').value = NAME;
        document.getElementById('email').value = EMAIL;
        document.getElementById('cpf').value = CPF;
        document.getElementById('phone').value = PHONE;
        document.getElementById('name').dispatchEvent(new Event("input"));
        document.getElementById('email').dispatchEvent(new Event("input"));
        document.getElementById('cpf').dispatchEvent(new Event("input"));
        document.getElementById('phone').dispatchEvent(new Event("input"));
        expect(document.getElementById('userForm').checkValidity()).toBe(true);
        expect(document.querySelector("[type='submit']").disabled).toBe(false);
        await registerPage.onSubmit({target: document.getElementById('userForm'), preventDefault: () => {}});
        expect(document.querySelector("[type='submit']").firstChild.data).toBe('Sucesso');
    });

    it('should not submit user data', async () => {
        document.getElementById('name').value = NAME;
        document.getElementById('email').value = EMAIL_INVALID;
        document.getElementById('cpf').value = CPF;
        document.getElementById('phone').value = PHONE;
        document.getElementById('name').dispatchEvent(new Event("input"));
        document.getElementById('email').dispatchEvent(new Event("input"));
        document.getElementById('cpf').dispatchEvent(new Event("input"));
        document.getElementById('phone').dispatchEvent(new Event("input"));
        expect(document.getElementById('userForm').checkValidity()).toBe(false);
        expect(document.querySelector("[type='submit']").disabled).toBe(true);
        await registerPage.onSubmit({target: document.getElementById('userForm'), preventDefault: () => {}});
        expect(document.querySelector("[type='submit']").firstChild.data).toBe('Cadastrar');
    });
});