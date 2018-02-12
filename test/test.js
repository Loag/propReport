const propReport = require('../lib/core')();

let obj1 = {
  f1: '',
  f2: 'hello',
  f3: 'world',
  f4: '', 
  phoneNumber: '234-567-1190',
  emailAddress: 'demodemo.co'
}

let obj2 = {
  f1: '',
  f2: 'hello',
  f3: 'world',
  f4: 'foo', 
  f5: 'bar',
  emailAddress: 'demo@demo.co'
}

console.log(propReport.run([obj1,obj2], {phone: 'phoneNumber', email: 'emailAddress'}));

/*
  expected return:
  { problems: 
     { f1: [ 0, 1 ],
       f2: [],
       f3: [],
       f4: [ 0 ],
       phoneNumber: [ 1 ],
       emailAddress: [ 0 ] },
    cleaned: 
     [ { f1: '',
         f2: 'hello',
         f3: 'world',
         f4: '',
         phoneNumber: '2345671190',
         emailAddress: 'demodemo.co' },
       { f1: '',
         f2: 'hello',
         f3: 'world',
         f4: 'foo',
         f5: 'bar',
         emailAddress: 'demo@demo.co',
         phoneNumber: '' } ] }
*/
