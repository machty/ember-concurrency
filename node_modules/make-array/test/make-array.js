'use strict';

var expect = require('chai').expect;
var makeArray = require('../');

var regex = /abc/;
var func = function(){};
var long_func = function(a, b, c, d, e, f){};
var date = new Date;
var obj = {};

var cases = [
  ['undefined', undefined, []],
  ['null', null, []],
  ['empty array', [], []],
  ['array', [1, 2], [1, 2]],
  ['number', 1, [1]],
  ['string', '1', ['1']],
  ['regex', regex, [regex]],
  ['function', func, [func]],
  ['function with many arguments', long_func, [long_func]],
  ['boolean', true, [true]],
  ['false', false, [false]],
  ['date', date, [date]],
  ['object', obj, [obj]],
  ['arguments 1, 2, 3', getArguments(1, 2, 3), [1, 2, 3]],
  ['array-like object', {
    '0': 1,
    '1': '2',
    length: 2
  }, [1, '2']]
];


function getArguments () {
  return arguments;
}

function clone (array) {
  return [].concat(array);
}


describe("makeArray", function(){
  it("nothing", function(){
    expect(makeArray()).to.deep.equal([]);
  });

  cases.forEach(function (c) {
    it(c[0], function(){
      expect(makeArray(c[1])).to.deep.equal(c[2]);
    });

    [
      [], 
      [1], 
      [{}], 
      [1, {}]
    ].forEach(function (host) {
      it(c[0] + ', with host ' + JSON.stringify(host), function(){
        var cloned = clone(host);
        var cloned2 = clone(host);
        expect(makeArray(c[1], cloned)).to.deep.equal(cloned2.concat(c[2]));
      });
    });
  });
});
