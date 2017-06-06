(function($, doc) {
  'use strict';

  /*
  Vamos estruturar um pequeno app utilizando módulos.
  Nosso APP vai ser um cadastro de carros. Vamos fazê-lo por partes.
  A primeira etapa vai ser o cadastro de veículos, de deverá funcionar da
  seguinte forma:
  - No início do arquivo, deverá ter as informações da sua empresa - nome e
  telefone (já vamos ver como isso vai ser feito)
  - Ao abrir a tela, ainda não teremos carros cadastrados. Então deverá ter
  um formulário para cadastro do carro, com os seguintes campos:
    - Imagem do carro (deverá aceitar uma URL)
    - Marca / Modelo
    - Ano
    - Placa
    - Cor
    - e um botão "Cadastrar"

  Logo abaixo do formulário, deverá ter uma tabela que irá mostrar todos os
  carros cadastrados. Ao clicar no botão de cadastrar, o novo carro deverá
  aparecer no final da tabela.

  Agora você precisa dar um nome para o seu app. Imagine que ele seja uma
  empresa que vende carros. Esse nosso app será só um catálogo, por enquanto.
  Dê um nome para a empresa e um telefone fictício, preechendo essas informações
  no arquivo company.json que já está criado.

  Essas informações devem ser adicionadas no HTML via Ajax.

  Parte técnica:
  Separe o nosso módulo de DOM criado nas últimas aulas em
  um arquivo DOM.js.

  E aqui nesse arquivo, faça a lógica para cadastrar os carros, em um módulo
  que será nomeado de "app".
  */

  var app = (function app(){

    var $companyName = $('[data-js="companyName"]');
    var $companyPhone = $('[data-js="companyPhone"]');
    var $btnCadastrar = $('[data-js="btnCadastrar"]');
    var $carsTable = $('[data-js="carsTable"]');
    var $inputsForm = $('[data-js="ipt"]');
    var docFragment = doc.createDocumentFragment();
    var ajax = new XMLHttpRequest();

    var registerNewCar = function registerNewCar(event){
      event.preventDefault();
      if(allFieldsFilled())
        newTableLine();
      else
        alert('Por favor, preencha todos os campos.');
    };

    var newTableLine = function newTableLine(){
      var row = doc.createElement('TR');
      $inputsForm.forEach(function fillRowCells(item){
        createDataCell(row, item)
      });
      row.appendChild(createDeleteButtonCell());
      docFragment.appendChild(row);
      $carsTable.appendChild(docFragment);
    };

    var createDataCell = function createDataCell(row, item){
      var data = doc.createElement('TD');
      if(item.value.match(/png|jpg|gif|svg/gi)){
          data.appendChild(createIMG(item.value));
          row.appendChild(data);
      }else{
        var text = doc.createTextNode(item.value);
        data.appendChild(text);
        row.appendChild(data);
      }
    };

    var createDeleteButtonCell = function createDeleteButtonCell(){
      var td = doc.createElement('TD');
      var btnDeletar = doc.createElement('BUTTON');
      btnDeletar.addEventListener('click', deleteLine, false);
      btnDeletar.textContent = 'X';
      td.appendChild(btnDeletar);
      return td;
    };

    var deleteLine = function deleteLine(){
        $carsTable.removeChild(this.parentElement.parentElement); 
    };

    var allFieldsFilled = function allFieldsFilled(){
      return $inputsForm.every(hasValue);
    };

    var createIMG = function createIMG(src){
      var img = doc.createElement('IMG');
      img.setAttribute('src', src);
      img.setAttribute('class','carImage');
      return img;
    };

    var hasValue = function hasValue(item){
      return item.value !== "";
    };

    var setCompanyNamePhone = function setCompanyNamePhone(){
      if(ajax.readyState === 4 && ajax.status === 200){
        $companyName.textContent = JSON.parse(ajax.responseText).name;
        $companyPhone.textContent = JSON.parse(ajax.responseText).phone;
      }
    };

    ajax.open('get', 'http://localhost:8080/company.json');
    ajax.send();
    ajax.addEventListener('readystatechange', setCompanyNamePhone);
    $btnCadastrar.addEventListener('click', registerNewCar);

    return{
      'registerNewCar' : registerNewCar,
      'newTableLine' : newTableLine,
      'createDataCell' : createDataCell,
      'allFieldsFilled' : allFieldsFilled,
      'createIMG' : createIMG,
      'hasValue' : hasValue,
      'setCompanyNamePhone' : setCompanyNamePhone,
      'createDeleteButtonCell' : createDeleteButtonCell,
      'deleteLine' : deleteLine
    };

  })();

  window.appRegisterCar = app;

})(window.DOM, document);
