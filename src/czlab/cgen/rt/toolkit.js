/*Auto generated by Kirby - v1.0.0 Tue Oct 10 2017 00:04:59 GMT+0800 (HKT)*/

var types= require("../bl/types");
var std= require("../bl/stdlib");
;
//
function pr_str_A(arr) {
return std.map(function (e) {
return types.pr_obj(e);
},arr);
}

//
function pr_str() {
let xs=Array.prototype.slice.call(arguments,0);
return pr_str_A(xs).join(" ");
}

//
function str_A(arr) {
return std.map(function (e) {
return types.pr_obj(e,false);
},arr);
}

//
function str() {
let xs=Array.prototype.slice.call(arguments,0);
return str_A(xs).join("");
}

//
function prn() {
let xs=Array.prototype.slice.call(arguments,0);
return std.println.apply({},pr_str_A(xs));
}

//
function println() {
let xs=Array.prototype.slice.call(arguments,0);
return std.println.apply({},str_A(xs));
}

//
function slurp(f) {
return require("fs").readFileSync(f,"utf-8");
}

//
function timeMillis() {
return new Date().getTime();
}

//
function assoc(src) {
let xs=Array.prototype.slice.call(arguments,1);
return types.assoc.apply(this,std.concat([
  types.clone(src)
],xs));
}

//
function dissoc(src) {
let xs=Array.prototype.slice.call(arguments,1);
return types.dissoc.apply(this,std.concat([
  types.clone(src)
],xs));
}

//
function cons(a,b) {
return std.concat([
  a
],b);
}

//
function conj(arr) {
let xs=Array.prototype.slice.call(arguments,1);
return (types.list_QUERY(arr) ?
  xs.reverse().concat(arr) :
  (std.some_QUERY(arr) ?
    (function (v) {
    v["__isvector__"] = true;
    return v;
    })(std.concat(arr,xs)) :
    (true ?
      arr :
      null)));
}

//
function seq(obj) {
return (types.list_QUERY(obj) ?
  (std.not_empty(obj) ?
    obj :
    null) :
  (types.vector_QUERY(obj) ?
    (std.not_empty(obj) ?
      std.slice(obj) :
      null) :
    (std.string_QUERY(obj) ?
      (std.not_empty(obj) ?
        obj.split("") :
        null) :
      ((obj === null) ?
        null :
        (true ?
          std.raise_BANG("seq: called on non-sequence") :
          null)))));
}

//
function apply(f) {
let xs=Array.prototype.slice.call(arguments,1);
let end = eindex(xs);
return f.apply(this,std.concat(xs.slice(0,end),xs[end]));
}

var GLOBAL = ((typeof(window) === "undefined") ?
  undefined :
  window);
//
function resolveJS(s) {
return [
  (s.includes(".") ?
    (function (re,mc) {
    return eval(mc[1]);
    })(new RegExp("^(.*)\\.[^\\.]*$","g"),re.exec(s)) :
    GLOBAL),
  eval(s)
];
}

//
function filterJS(obj) {
let cache = [],
  s = (obj ?
    JSON.stringify(obj,function (k,v) {
    ((Object.prototype.toString.call(v) === "[object Object]") ?
      (std.contains_QUERY(cache,v) ?
        v = undefined :
        cache.push(v)) :
      null);
    return v;
    }) :
    null);
return (std.not_empty(s) ?
  JSON.parse(s) :
  null);
}

//
function withMeta(obj,m) {
return (function (ret) {
ret["__meta__"] = m;
return ret;
})(types.clone(obj));
}

//
function meta(obj) {
(((!types.sequential_QUERY(obj))&&(!types.hashmap_QUERY(obj))&&(!types.object_QUERY(obj))&&(!std.fn_QUERY(obj))) ?
  std.raise_BANG("attempt to get metadata from: ",types.obj_type(obj)) :
  null);
return obj["__meta__"];
}

//
function deref(a) {
return a.value;
}

//
function reset_BANG(a,v) {
return a["value"] = v;
}

//
function swap_BANG(a,f) {
let xs=Array.prototype.slice.call(arguments,2);
let args = std.concat([
  a.value
],xs);
a["value"] = f.apply(this,args);
return a["value"];
}

//
function evalJS(s) {
return filterJS(eval(s.toString()));
}

//
function invokeJS(method) {
let xs=Array.prototype.slice.call(arguments,1);
let r = resolveJS(method),
  obj = std.first(r),
  f = std.second(r),
  res = f.apply(obj,xs);
return filterJS(res);
}

var gensym_counter = types.atom(0);
//
function gensym() {
return types.symbol(["G__",swap_BANG(gensym_counter,function (x) {
return (x+1);
})].join(""));
}



module.exports = {
  pr_str: pr_str,
  str: str,
  prn: prn,
  println: println,
  slurp: slurp,
  timeMillis: timeMillis,
  assoc: assoc,
  dissoc: dissoc,
  cons: cons,
  conj: conj,
  seq: seq,
  apply: apply,
  resolveJS: resolveJS,
  filterJS: filterJS,
  withMeta: withMeta,
  meta: meta,
  deref: deref,
  reset_BANG: reset_BANG,
  swap_BANG: swap_BANG,
  evalJS: evalJS,
  invokeJS: invokeJS,
  gensym: gensym
};

