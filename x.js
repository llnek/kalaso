/*Auto generated by Kalaso - v1.0.0 undefined Wed Oct 18 2017 00:03:08 GMT-0700 (PDT)*/

(function (m) {
let mBind,mResult,mZero,mPlus;
mBind = m.mBind;
mResult = m.mResult;
mZero = m.mZero;
mPlus = m.mPlus;
;
let ____mResult;
____mResult = function () {
let body=Array.prototype.slice.call(arguments,0);
return ((mZero&&empty_QUERY(body)) ?
  mZero :
  mResult.apply(this,body));
};
;
return null;
})({ "mBind": function (mv,mf) {
  return mv.map(mf).reduce(function (acc,v) {
  return acc.concat(v);
  },[]);
  },"mResult": function (v) {
  return v();
  },"mZero": [],"mPlus": function () {
  return Array.prototype.slice.call(arguments).reduce(fnc(acc(v),acc.concat(v)),[]);
  } });
