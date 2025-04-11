import Address from '../models/address.js';
import * as addressService from '../services/address-service.js';
import * as listController from './list-controller.js';

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

    state.inputCep.addEventListener('change', handleInputCepChange);
    state.inputNumber.addEventListener('change', handleInputNumberChange);
    state.inputNumber.addEventListener('keyup', handleInputNumberKeyUp);
    state.btnClear.addEventListener('click', handleBtnClearClick);
    state.btnSave.addEventListener('click', handleBtnSaveClick);

}

function handleInputNumberKeyUp(event){
    state.address.number = event.target.value;
}

async function handleInputCepChange(event){
    const cep = event.target.value;
    try{
        const address = await addressService.findByCep(cep);

        state.inputCity.value = address.city;
        state.inputStreet.value = address.street;
        state.address = address;

        setFormError("cep", "");
        state.inputNumber.focus();
    }
    catch (e) {
        state.inputStreet.value = "";
        state.inputCity.value = "";
        setFormError("cep", "Informe um CEP válido");
    }
}

function handleBtnSaveClick(event){
    event.preventDefault();
    const errors = addressService.getErrors(state.address);
    const keys = Object.keys(errors);
    
    if (keys.length > 0){
        keys.forEach(key => {
            setFormError(key, errors[key]);
        });
    }
    else {
        listController.addCard(state.address);
        clearForm();
    }
}

function handleBtnClearClick(event){
    event.preventDefault();
    clearForm();
}

function clearForm(){
    state.inputCep.value = "";
    state.inputCity.value = "";
    state.inputNumber.value = "";
    state.inputStreet.value = "";

    setFormError("cep", "");
    setFormError("number", "");

    state.address = new Address();
    state.inputCep.focus();
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