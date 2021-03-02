!function(){class e{constructor(){var e,t,a;e=this,t="localStorage",a=window.localStorage,t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a}getUser(e){const t=JSON.parse(this.localStorage.getItem("user"))||[];return e?t[e]:t}addUser(e){const t=(JSON.parse(this.localStorage.getItem("user"))||[]).concat(e);return new Promise(e=>setTimeout(()=>e(this.localStorage.setItem("user",JSON.stringify(t))),2200))}removeUser(e){const t=(JSON.parse(this.localStorage.getItem("user"))||[]).filter((t,a)=>a!==e);this.localStorage.setItem("user",JSON.stringify(t))}}class t{constructor(){var t,a,r;t=this,a="userStore",r=new e,a in t?Object.defineProperty(t,a,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[a]=r}render(){const e=document.getElementById("listUser"),t=document.createDocumentFragment(),a=this.userStore.getUser();e.innerHTML="",a.forEach((e,a)=>{const r=document.createElement("li"),n=document.createRange().createContextualFragment('\n                <div class="item-content">\n                    <h3 class="h3">'.concat(e.name,'</h3>\n                    <p class="text">\n                        ').concat(e.email,"<br>\n                        ").concat(e.cpf,"<br>\n                        ").concat(e.phone,'<br>\n                    </p>\n                    <i class="btn-link remove-user">Remover</i>\n                </div>\n            '));r.appendChild(n),r.querySelector(".remove-user").addEventListener("click",this.onRemove.bind(this,a),!1),r.classList.add("item"),t.appendChild(r)}),e.appendChild(t)}onRemove(e){this.userStore.removeUser(e),this.render()}}class a{constructor(){var e,t,a;a={cpfValidate:e=>{if(11!=(e=e.replace(/\D/g,"")).toString().length||/^(\d)\1{10}$/.test(e))return!1;var t=!0;return[9,10].forEach((function(a){var r,n=0;e.split(/(?=)/).splice(0,a).forEach((function(e,t){n+=parseInt(e)*(a+2-(t+1))})),(r=(r=n%11)<2?0:11-r)!=e.substring(a,a+1)&&(t=!1)})),t}},(t="customValidate")in(e=this)?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a}setErrorMessage(e){const t=e.dataset.label,a=e.dataset.validate;try{a&&e.setCustomValidity(this.customValidate[a](e.value)?"":"".concat(t," inválido."))}catch(t){throw new Error("Custom [data-validate] value at: ".concat(e.outerHTML," is undefined"))}const r={badInput:["".concat(t," contem caracter inválido."),e.validity.badInput],rangeOverflow:["".concat(t," inválido."),e.validity.rangeOverflow],rangeUnderflow:["".concat(t," inválido."),e.validity.rangeUnderflow],stepMismatch:["".concat(t," inválido."),e.validity.stepMismatch],patternMismatch:["".concat(t," contem caracter inválido."),e.validity.patternMismatch],tooLong:["".concat(t," deve conter até ").concat(e.maxLength," caracteres."),e.validity.tooLong],tooShort:["".concat(t," deve conter ").concat(e.minLength," caracteres ou mais."),e.validity.tooShort],typeMismatch:["".concat(t," inválido."),e.validity.typeMismatch],valid:["",e.validity.valid],valueMissing:["".concat(t," obrigatório."),e.validity.valueMissing],customError:[e.validationMessage,e.validity.customError]},n=Object.keys(r).find(e=>{const[,t]=r[e];return t}),[s]=r[n];return s||""}}function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}class n{constructor(){r(this,"userStore",new e),r(this,"formValidateHelper",new a)}render(){const e=document.getElementById("userForm"),t=Array.from(e.elements).filter(e=>"BUTTON"!==e.tagName),a=document.querySelector("[type='submit']");e.addEventListener("submit",this.onSubmit.bind(this)),t.forEach(t=>{const r=t.parentElement.previousElementSibling;t.addEventListener("focus",()=>{!t.value&&r.classList.add("filled")}),t.addEventListener("blur",()=>{!t.value&&r.classList.remove("filled")}),t.addEventListener("input",()=>{const n=document.querySelector("#".concat(t.id," + .error"));document.activeElement===t||t.value?r.classList.add("filled"):r.classList.remove("filled"),t.classList.contains("dirty")||t.classList.add("dirty"),n.textContent=this.formValidateHelper.setErrorMessage(t),a.disabled=!e.checkValidity()})})}async onSubmit(e){const t=Object.fromEntries(new FormData(e.target)),[a]=Array.from(e.target.elements).filter(e=>"BUTTON"===e.tagName),r=Array.from(e.target.elements).filter(e=>"BUTTON"!==e.tagName);e.target.checkValidity()?(a.classList.add("loading"),a.disabled=!0,await this.userStore.addUser(t),e.target.reset(),a.classList.remove("loading"),a.firstChild.data="Sucesso",a.disabled=!1,r.forEach(e=>{e.parentElement.previousElementSibling.classList.remove("filled"),e.classList.remove("dirty")}),setTimeout(()=>{a.firstChild.data="Cadastrar",a.disabled=!0},2e3),e.preventDefault()):e.preventDefault()}}const s=new class{constructor(){var e,t,a;a="https://private-21e8de-rafaellucio.apiary-mock.com",(t="url")in(e=this)?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a}async getUser(){return(await fetch("".concat(this.url,"/users")).catch(e=>{console.error("Error:",e)})).json()}},i=new e;!async function(){if(!localStorage.getItem("user")){const e=document.createElement("div");e.classList.add("loader"),document.body.classList.add("screen"),document.body.prepend(e);const t=await s.getUser();await i.addUser(t),document.body.classList.remove("screen"),e.classList.remove("loader")}switch(window.location.pathname){case"/native-form-validation/":(new n).render();break;case"/native-form-validation/listar.html":(new t).render();break;case"/native-form-validation/404.html":break;default:window.location.href="/404.html"}}()}();
//# sourceMappingURL=app.b80db585.js.map
