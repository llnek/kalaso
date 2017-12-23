// Copyright (c) 2013-2017, Kenneth Leung. All rights reserved.
// The use and distribution terms for this software are covered by the
// Eclipse Public License 1.0 (http:;;opensource.org;licenses;eclipse-1.0.php)
// which can be found in the file epl-v10.html at the root of this distribution.
// By using this software in any fashion, you are agreeing to be bound by
// the terms of this license.
// You must not remove this notice, or any other, from this software.
"use strict";
//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
var types = require("../bl/types");
var std = require("../bl/stdlib");

//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
function pr_str_A(arr) {
  return arr.map(function(e) { return types.pr_obj(e); });
}
//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
function pr_str() {
  return pr_str_A(std.slice(arguments)).join(" ");
}

//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
function str_A(arr) {
  return arr.map(function(e) { return types.pr_obj(e, false); });
}

//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
function str() {
  return str_A(std.slice(arguments)).join("");
}

//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
function prn() {
  std.println.apply({}, pr_str_A(std.slice(arguments)));
}

//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
function println() {
  std.println.apply({}, str_A(std.slice(arguments)));
}

//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
function slurp(f) {
  return require("fs").readFileSync(f, "utf-8");
}

//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
function timeMillis() { return new Date().getTime(); }

//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
function assoc(src) {
  return types.assoc.apply(this,
      [ types.clone(src) ].concat(std.slice(arguments, 1)));
}

//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
function dissoc(src) {
  return types.dissoc.apply(this,
    [ types.clone(src) ].concat(std.slice(arguments, 1)));
}

//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
function cons(a, b) { return [a].concat(b); }

//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
function conj(arr) {
  if (types.list_p(arr)) {
    return std.slice(arguments, 1).reverse().concat(arr);
  } else if (arr) {
    let v = arr.concat(std.slice(arguments, 1));
    v.__isvector__ = true;
    return v;
  } else {
    return arr;
  }
}

//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
function seq(obj) {
  if (types.list_p(obj)) {
    return obj.length > 0 ? obj : null;
  }
  if (types.vector_p(obj)) {
    return obj.length > 0 ? std.slice(obj) : null;
  }
  if (types.primitive_p(obj)) {
    obj=obj.value;
  }
  if (typeof obj === "string") {
    return obj.length > 0 ? obj.split("") : null;
  }
  if (obj === null) {
    return null;
  }
  std.raise("seq: called on non-sequence");
}

//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
function apply(f) {
  let args = std.slice(arguments, 1),
      end=args.length-1;
  return f.apply(this,
                 args.slice(0, end).concat(args[end]));
}

//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
function map(f, arr) {
  return arr.map(function(e){ return f(e); });
}
//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
var GLOBAL= typeof(window)==="undefined" ? undefined : window;
//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
function resolveJS(str) {
  if (str.match(/\./)) {
    let re = /^(.*)\.[^\.]*$/,
        mc = re.exec(str);
    return [eval(match[1]), eval(str)];
  } else {
    return [GLOBAL, eval(str)];
  }
}
//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
function filterJS(obj) {
  if (!obj) {return null;}
  let cache=[];
  let s=JSON.stringify(obj, function(k, v) {
    if (v && typeof v === "object") {
      if (cache.indexOf(v) === -1) {
        cache.push(v);
      } else {
        //skip found object, avoid circular reference
        v=undefined;
      }
    }
    return v;
  });
  return JSON.parse(s);
}
//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
function withMeta(obj, m) {
  let ret = types.clone(obj); ret.__meta__ = m; return ret;
}

//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
function meta(obj) {
  if (!types.sequential_p(obj) &&
      !types.hashmap_p(obj) &&
      !types.object_p(obj) &&
      typeof obj !== "function") {
    std.raise("attempt to get metadata from: ", types.obj_type(obj));
  }
  return obj.__meta__;
}

//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
function deref(atm) { return atm.value; }

//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
function reset(atm, val) { return atm.value = val; }

//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
function swap(atm, f) {
  let args = [ atm.value ].concat(std.slice(arguments, 2));
  atm.value = f.apply(this, args);
  return atm.value;
}

//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
function evalJS(str) {
  return filterJS(eval(str.toString()));
}

//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
function invokeJS(method) {
  let args = std.slice(arguments, 1),
      r = resolveJS(method),
      obj = r[0],
      f = r[1],
      res = f.apply(obj, args);
  return filterJS(res);
}

//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
var gensym_counter=types.atom(0);
//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
function gensym() {
  return types.symbol("G__" +
                      swap(gensym_counter,
                        function(x) { return x+1; }));
}

//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
module.exports= {

  "is-same?" : function(a,b) { return a==b;},

  "obj-type*" : types.obj_type,
  "gensym*" : gensym,
  "is-eq?" : types.eq_p,

  "is-nil?" : function(x) { return x===null; },
  "is-some?" : function(x) {
    return typeof x !== "undefined" && x !== null;
  },

  "slice*" : function() { return std.slice(arguments); },
  "throw*" : function() {
    throw new Error(std.slice(arguments).join(""));
  },

  "#f?" : function(x) { return x===false; },
  "#t?" : function(x) { return x===true;},
  "is-str?" : function(x) { return typeof x === "string";},

  "symbol*" : types.symbol,
  "is-symbol?" : types.symbol_p,
  "keyword*" : types.keyword,
  "is-keyword?" : types.keyword_p,

  "pr-str*" : pr_str,
  "str*" : str,
  "prn*" : prn,
  "println*" : println,
  "slurp*" : slurp,

  "<"  : function(a,b){return a<b;},
  "<=" : function(a,b){return a<=b;},
  ">"  : function(a,b){return a>b;},
  ">=" : function(a,b){return a>=b;},
  "+"  : function(a,b){return a+b;},
  "-"  : function(a,b){return a-b;},
  "*"  : function(a,b){return a*b;},
  "/"  : function(a,b){return a/b;},

  "not="  : function(a,b){return a !== b;},
  "="  : function(a,b){ return a===b;},

  "time*" : timeMillis,

  "list*" : types.list,
  "is-list?" : types.list_p,

  "vector*" : types.vector,
  "is-vector?" : types.vector_p,

  "hash-map*" : types.hashmap,
  "is-map?" : types.hashmap_p,

  "assoc*" : assoc,
  "dissoc*" : dissoc,

  "is-contains?" : function(c, x) {
    return (Array.isArray(c) || typeof c === "string")
      ? c.includes(x)
      : (typeof c ==="object")
      ? c.hasOwnProperty(x) : false;
  },

  "get*" : function(m,k) { return m ? m[k] : undefined; },
  "keys*" : function(x) { return Object.keys(x); },
  "values*" : function(x) { return Object.values(x); },

  "dec*" : function(x) { return x-1; },
  "inc*" : function(x) { return x+1;},

  "not*" : function(x) { return x ? false : true },

  "is-even?" : function(n) { return (n % 2) === 0; },
  "is-odd?" : function(n) { return (n % 2) === 1; },

  "is-sequential?" : types.sequential_p,
  "cons*" : cons,
  "concat*" : function (arr) {
    arr = arr || [];
    return arr.concat.apply(arr, std.slice(arguments, 1)); },

  "nth*" : function(arr, idx) { return arr ? arr[idx] : null; },
  "first*" : function(arr) { return arr ? arr[0] : null },
  "rest*" : function (arr) { return arr ? std.slice(arr,1) : []; },
  "is-empty?" : function (arr) { return arr===null || arr.length === 0; },

  "not-empty*" : function (arr) {
    return arr===null || arr.length === 0 ? null : arr },

  "count*" : function (s) {
    return (Array.isArray(s) || typeof s === "string") ?
      s.length : (s === null) ? 0 :
      (typeof s === "object") ? Object.keys(s).length : 0;
  },

  "apply*" : apply,
  "map*" : map,

  "type*" : function(x) { return typeof x;},
  "evens*" : function (arr) {
    let ret=[];
    arr= arr || [];
    for (var i=0; i < arr.length; i += 2) {
      ret.push(arr[i]);
    }
    return ret; },

  "odds*" : function (arr) {
    let ret=[];
    arr= arr || [];
    for (var i=1; i < arr.length; i += 2) {
      ret.push(arr[i]);
    }
    return ret; },

  "conj*" : conj,
  "seq*" : seq,

  "with-meta*" : withMeta,
  "meta*" : meta,
  "atom*" : types.atom,
  "is-atom?" : types.atom_p,
  "deref*" : deref,
  "reset*" : reset,
  "swap*" : swap,

  "js-eval*" : evalJS,
  "js*" : invokeJS

};

//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
//EOF
