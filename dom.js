(function(win, doc){
  "use strict";

  function DOM(attribute){
    if(!(this instanceof DOM))
      return new DOM(attribute);

    this.element = doc.querySelectorAll(attribute);

    if(this.element.length === 1)
      return this.get();
  }

  DOM.isArray = function isArray(arg){
    return Object.prototype.toString.call(arg) === '[object Array]';
  };

  DOM.isObject = function isObject(arg){
    return Object.prototype.toString.call(arg) === '[object Object]';
  };

  DOM.isFunction = function isFunction(arg){
    return Object.prototype.toString.call(arg) === '[object Function]';
  };

  DOM.isNumber = function isNumber(arg){
    return Object.prototype.toString.call(arg) === '[object Number]';
  };

  DOM.isString = function isString(arg){
    return Object.prototype.toString.call(arg) === '[object String]';
  };

  DOM.isBoolean = function isBoolean(arg){
    return Object.prototype.toString.call(arg) === '[object Boolean]';
  };

  DOM.isNull = function isNull(arg){
    var argType = Object.prototype.toString.call(arg);
    return argType === '[object Null]' || argType === '[object Undefined]';
  };

  DOM.prototype.on = function on(event, callback){
    Array.prototype.forEach.call(this.element, function(node){
      node.addEventListener(event, callback, false);
    });
  };

  DOM.prototype.off = function off(event, callback){
    Array.prototype.forEach.call(this.element, function(node){
      node.removeEventListener(event, callback, false);
    })
  };

  DOM.prototype.get = function get(index){
    if(!index)
      return this.element[0];
    return this.element[index];
  }

  DOM.prototype.forEach = function forEach(callback){
    return Array.prototype.forEach.call(this.element, callback);
  };

  DOM.prototype.map = function map(callback){
    return Array.prototype.map.call(this.element, callback);
  };

  DOM.prototype.filter = function filter(callback){
    return Array.prototype.filter.call(this.element, callback);
  };

  DOM.prototype.reduce = function reduce(callback){
    return Array.prototype.reduce.call(this.element, callback);
  };

  DOM.prototype.reduceRight = function reduceRight(callback){
    return Array.prototype.reduceRight.call(this.element, callback);
  };

  DOM.prototype.every = function every(callback){
    return Array.prototype.every.call(this.element, callback);
  };

  DOM.prototype.some = function some(callback){
    return Array.prototype.some.call(this.element, callback);
  };

  win.DOM = DOM;

})(window, document);
