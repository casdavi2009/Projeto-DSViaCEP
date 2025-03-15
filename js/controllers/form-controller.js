import Address from '../models/address.js';

function State(){

    this.address = new Address();

    this.btnSave = null;
    this.btnClear = null;
    
    this.inputCep = null;
    this.inputStreet = null;
    this.inputNumber = null;
    this.inputCity = null;

    this.errorCep = null;
    this.errorNumber = null
}
const state = new State();

export function init(){
    state.inputCep = document.forms.newAdress.cep;
    state.inputStreet = document.forms.newAdress.street;
    state.inputNumber = document.forms.newAdress.number;
    state.inputCity = document.forms.newAdress.city;

    state.btnSave = document.forms.newAdress.btnSave;
    state.btnClear = document.forms.newAdress.btnClear;

    state.errorCep = document.querySelector('[data-error="cep"]');
    state.errorNumber = document.querySelector('[data-error="number"]');

    state.inputNumber.addEventListener('change', handleInputNumberChange);
}

function handleInputNumberChange(event){
    if (event.target.value == ""){
        setFormError("number", "Campo Requerido");
    }else {
        setFormError("number", "");
    }
}

function setFormError(key, value){
    const element = document.querySelector(`[data-error="${key}"]`)
    element.innerHTML = value;
}