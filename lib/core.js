const checkPhoneNumber = require('libphonenumber-js');
const checkEmail = require('validator');
//checkEmail.isEmail('email here');
/*
  this object keeps track of empty strings, nulls, undefineds
  and props on an array of objects. this comes in handy when 
  mapping objects to new objects
*/
class Collector {
  constructor(options) {
    // any options i guess

  }
   /*
     input is an array of objects
     options is an object that can have
     two props, email, phone,
     and the value is the prop name that
     is suppose to be one, to check that
     it is formatted correctly
   */

  run(input, options) { 
    if (varType(input) !== 'array') throw 'input has to be type array';

    // try and make just one function
    let mapObject = findMasterObj(input); // returns index of master obj

    return returnProblems({options, mapObject}, normalizeObjs(input, mapObject));
    
  }
}

function returnProblems(input, normalizedObjs) {
  let cleaned = [];
  let problems = createMaster(input.mapObject);
  let phone, email;
  if (checkOptions(input.options)) {
    if (input.options.phone) phone = input.options.phone;
    if (input.options.email) email = input.options.email;
  }
  for (let [index, obj] of normalizedObjs.entries()) {
    for (let key of Object.keys(obj)) {
      if (key === phone && obj[key]) {
        // check and clean
        obj[key] = checkPhoneNumber.parse(obj[key], 'US').phone;
      }  
      if (key === email && obj[key]) {
        if (!(checkEmail.isEmail(obj[key]))) {
          problems[key].push(index); // not proper email
        }
      }
      if (!(obj[key])) { // if its null, undefined, or empty
        // there is no value so add its index to that issues list
        problems[key].push(index); // we might just want to do obj eventually
      }
    }
    cleaned.push(obj);
  }
  return {problems, cleaned};
}

function createMaster(input) {
  let master = {};
  for (let key of Object.keys(input)) {
    master[key] = [];
  }
  return master;
}

function normalizeObjs(input, mapObject) {
 let normalizedObjs = [];
  for (let obj of input) { 
    for (item of Object.keys(mapObject)) {
      if (!(Object.keys(obj).includes(item))) {
        obj[item] = '';
      }
    }
    normalizedObjs.push(obj); 
  }
  return normalizedObjs;
}

function findMasterObj(input) { // return that object
  // first we have to find the object with the most props
  let count = 0, countIndex;
  for (let [index, obj] of input.entries()) {
    let currentLen = Object.keys(obj).length;
    if (currentLen > count) {
      count = currentLen;
      countIndex = index;
    }
  }
  return input[countIndex];
}

function checkOptions(input) {
  if (input){
    if (Object.keys(input).length !== 0) {
      if (Object.keys(input).includes('email') || Object.keys(input).includes('phone')) {
        return true;
      }
      return false;
    }
  }
  return false;
}

// check for type array
function varType(obj) {
  return {}.toString
    .call(obj)
    .match(/\s([a-zA-Z]+)/)[1]
    .toLowerCase();
}

function create(options) {
  return new Collector(options);
}

module.exports = create;