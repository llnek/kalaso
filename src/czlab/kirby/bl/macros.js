/*Auto generated by Kirby - v1.0.0 czlab.kirby.bl.macros Sun Oct 29 2017 14:23:16 GMT-0700 (PDT)*/

;
let CACHE,loaded_QUERY;
CACHE= {};
loaded_QUERY= false;
;
//
function cacheLoaded_QUERY() {
return loaded_QUERY;
}

//
function load() {
return ((!loaded_QUERY) ?
    (function() {
  loaded_QUERY = true;
  return require("./defmacros.ky");
  }).call(this) :
  null);
}

//
function set(cmd,func) {
return (((typeof(cmd) === "string")&&(typeof(func) === "function")) ?
    (function() {
  return CACHE[cmd] = func;
  }).call(this) :
  null);
}

//
function get(x) {
return (x ?
  CACHE[x] :
  undefined);
}



module.exports = {
  cacheLoaded_QUERY: cacheLoaded_QUERY,
  load: load,
  set: set,
  get: get
};
