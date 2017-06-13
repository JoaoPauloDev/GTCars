(function($, doc) {
  'use strict';

  var app = (function app(){

    var $companyName = $('[data-js="companyName"]');
    var $companyPhone = $('[data-js="companyPhone"]');
    var $btnRegister = $('[data-js="btnRegister"]');
    var $tableCars = $('[data-js="carsTable"]');
    var $inputsForm = $('[data-js="ipt"]');
    var htmlFragment = doc.createDocumentFragment();
    var ajaxCompanyInfo = new XMLHttpRequest();
    var ajaxGetCars = new XMLHttpRequest();
    var ajaxPostCar = new XMLHttpRequest();
    var ajaxRemoveCar = new XMLHttpRequest();

    function getCompanyInfo(){
      if(isAjaxReady(ajaxCompanyInfo)){
        $companyName.textContent = JSON.parse(ajaxCompanyInfo.responseText).name;
        $companyPhone.textContent = JSON.parse(ajaxCompanyInfo.responseText).phone;
      }
    }

    function getCars(){
      if(isAjaxReady(ajaxGetCars)){
        JSON.parse(ajaxGetCars.responseText).forEach(function(car){
          htmlFragment.appendChild(putCarInRow(car));
        });
        $tableCars.appendChild(htmlFragment);
      }
    }

    function putCarInRow(car){
      var tr = doc.createElement('TR');
      fillCarRow(tr, car);
      tr.appendChild(deleteCarCell());
      return tr;
    }

    function fillCarRow(tr, car){
      Object.keys(car).forEach(function(property, index){
        var td = doc.createElement('TD');
        if(index)
          td.textContent = car[property];
        else
          td.appendChild(createImage(car[property]));
        tr.setAttribute('data-js', 'carRow');
        tr.appendChild(td);
      });
    }

    function deleteCarCell(){
      var td = doc.createElement('TD');
      var btn = doc.createElement('BUTTON');
      btn.textContent = 'X';
      btn.addEventListener('click', removeCar, false);
      td.appendChild(btn);
      return td;
    }

    function removeCar(){
      ajaxRemoveCar.open('DELETE', 'http://localhost:3000/car');
      ajaxRemoveCar.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      ajaxRemoveCar.send('plate=' + this.parentElement.parentElement.children[3].textContent);
      ajaxRemoveCar.addEventListener('readystatechange', succesRequest, false);
    }

    function removeRow(){
      $tableCars.removeChild(this.parentElement.parentElement);
    }

    function createImage(link){
      var image = doc.createElement('IMG');
      image.setAttribute('src', link);
      image.setAttribute('class', 'carImage');
      return image;
    }

    function isAjaxReady(ajax){
      if(ajax.readyState === 4 && ajax.status === 200)
        return true;
      return false;
    }

    function fieldsFilled(){
      return $inputsForm.every(function(field){
        return !!field.value;
      });
    }

    function registerNewCar(event){
      event.preventDefault();
      if(fieldsFilled())
        sendCarInfo();
      else
        alert('Preencha todos os campos do formulário');
    }

    function sendCarInfo(){
      ajaxPostCar.open('POST', 'http://localhost:3000/car');
      ajaxPostCar.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      var data = generateData();
      ajaxPostCar.send(data);
      ajaxPostCar.addEventListener('readystatechange', succesRequest, false);
    }

    function succesRequest(){
      if(this.readyState === 4 && this.status === 200){
        cleanTable();
        ajaxGet();
      }
    }

    function generateData(){
      return $inputsForm.reduce(function(acc, item, index){
        if(index === 1)
          acc = acc.name + '=' + acc.value + '&' + item.name + '=' + item.value;
        else
          acc += '&' + item.name + '=' + item.value;    
        return acc;
      },0);
    }

    function cleanTable(){
      for(var x = 1; x < $tableCars.rows.length;){
        $tableCars.removeChild($tableCars.rows[x]);
      }
    }

    function ajaxCompany(){
      ajaxCompanyInfo.open('GET', 'http://localhost:8080/company.json');
      ajaxCompanyInfo.send();
      ajaxCompanyInfo.addEventListener('readystatechange', getCompanyInfo, false);
    }

    function ajaxGet(){
      ajaxGetCars.open('GET', 'http://localhost:3000/car');
      ajaxGetCars.send();
      ajaxGetCars.addEventListener('readystatechange', getCars, false);
    }
    
    ajaxCompany();
    ajaxGet();
    $btnRegister.addEventListener('click', registerNewCar, false);

    return {
      'getCompanyInfo': getCompanyInfo,
      'getCars': getCars,
      'putCarInRow': putCarInRow,
      'fillCarRow': fillCarRow,
      'deleteCarCell': deleteCarCell,
      'removeRow': removeRow,
      'createImage': createImage,
      'isAjaxReady': isAjaxReady,
      'fieldsFilled': fieldsFilled,
      'registerNewCar': registerNewCar,
      'sendCarInfo': sendCarInfo,
      'succesRequest': succesRequest,
      'generateData': generateData,
      'cleanTable': cleanTable,
      'ajaxCompany': ajaxCompany,
      'ajaxGet': ajaxGet
    };

  })();

  window.appRegisterCar = app;

})(window.DOM, document);
