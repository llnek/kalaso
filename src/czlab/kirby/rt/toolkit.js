/*Auto generated by Kirby - v1.0.0 czlab.kirby.rt.toolkit Fri Nov 17 2017 09:20:14 GMT+1100 (AEDT)*/

const fs = require("fs");
const std = require("../bl/stdlib");
const extendAttr = std["extendAttr"];
const stringify = std["stringify"];
const contains_QUERY = std["contains_QUERY"];
const LambdaArg = std["LambdaArg"];
const Keyword = std["Keyword"];
const not_DASH_empty = std["not_DASH_empty"];
const object_QUERY = std["object_QUERY"];
const Symbol = std["Symbol"];
const into_BANG = std["into_BANG"];
const prn = std["prn"];
const Atom = std["Atom"];
const symbol = std["symbol"];
const swap_BANG = std["swap_BANG"];
const atom = std["atom"];
const vector = std["vector"];
const vector_QUERY = std["vector_QUERY"];
const list_QUERY = std["list_QUERY"];
const map_QUERY = std["map_QUERY"];
const some_QUERY = std["some_QUERY"];
const typeid = std["typeid"];
const sequential_QUERY = std["sequential_QUERY"];
const kirbystdlibref = std;
//
const prstrX = function(b, arr) {
  return arr.map(function(x) {
    return prn(x, b);
  });
}
//
Function.prototype.clone = function() {
  let that = this;
  let tmp = null;
  tmp = function() {
    let ____args = Array.prototype.slice.call(arguments);
    return that.apply(this, ____args);
  };
  let G__1 = that;
  Object.entries(G__1).forEach(function(e) {
    return (function(v, k) {
      return tmp[k] = v;
    })(e[1], e[0]);
  });
  return tmp;
}
//
const prnStr = function() {
  let xs = Array.prototype.slice.call(arguments, 0);
  return prstrX(true, xs).join(" ");
}
//
const prnLn = function() {
  let xs = Array.prototype.slice.call(arguments, 0);
  return prstrX(true, xs).forEach(function() {
    let ____args = Array.prototype.slice.call(arguments);
    return (console ?
      console.log([____args[0]].join("")) :
      null);
  });
}
//
const slurp = function(f) {
  return fs.readFileSync(f, "utf-8");
}
//
const clone = function(obj) {
  let ret = null;
  let oid = typeid(obj);
  return (function() {
    let S____3;
    switch (oid) {
      case "vector":
      case "map":
      case "list":
        S____3 = ret = into_BANG(oid, Array.prototype.slice.call(obj));
        break;
      case "array":
        S____3 = ret = Array.prototype.slice.call(obj);
        break;
      case "object":
        S____3 = ret = Object.entries(obj).reduce(function(acc, en) {
          acc[en[0]] = last(en);
          return acc;
        }, {});
        break;
      case "function":
        S____3 = ret = obj.clone();
        break;
      default:
        S____3 = (function() {
          throw new Error(["clone of non-collection: ", oid].join("")) ;
        }).call(this);
        break;
    }
    return S____3;
  }).call(this);
}
//
const cons = function(a, b) {
  return [a].concat(b);
}
//
const conj = function(arr) {
  let xs = Array.prototype.slice.call(arguments, 1);
  return (list_QUERY(arr) ?
    into_BANG("list", xs.reverse().concat(arr)) :
    (some_QUERY(arr) ?
      into_BANG("vector", arr.concat(xs)) :
      (true ?
        arr :
        null)));
}
//
const seq = function(obj) {
  return (Array.isArray(obj) ?
    ((!(0 === kirbystdlibref.count(obj))) ?
      Array.prototype.slice.call(obj) :
      null) :
    ((typeof (obj) === "string") ?
      ((!(0 === kirbystdlibref.count(obj))) ?
        obj.split("") :
        null) :
      ((obj === null) ?
        null :
        (true ?
          (function() {
            throw new Error("seq: called on non-sequence") ;
          }).call(this) :
          null))));
}
//
const fapply = function(f) {
  let xs = Array.prototype.slice.call(arguments, 1);
  return f.apply(this, xs);
}
//
const fmap = function(f, arr) {
  return arr.map(f);
}
var GLOBAL = ((typeof (window) === "undefined") ?
  undefined :
  window);
//
const resolveJS = function(s) {
  return [(contains_QUERY(s, ".") ?
    eval(/^(.*)\.[^\.]*$/g.exec(s)[1]) :
    GLOBAL), eval(s)];
}
//
const filterJS = function(obj) {
  let s = stringify(obj);
  return ((!(0 === kirbystdlibref.count(s))) ?
    JSON.parse(s) :
    null);
}
//
const withMeta = function(obj, m) {
  let ret = clone(obj);
  ret["____meta"] = m;
  return ret;
}
//
const meta = function(obj) {
  if ( (!(Array.isArray(obj) || object_QUERY(obj) || (typeof (obj) === "function"))) ) {
    throw new Error(["can't get metadata from: ", typeid(obj)].join(""));
  }
  return obj["____meta"];
}
//
const evalJS = function(s) {
  return filterJS(eval(s.toString()));
}
//
const invokeJS = function(method) {
  let xs = Array.prototype.slice.call(arguments, 1);
  let G____4 = resolveJS(method);
  let obj,
    f;
  obj = G____4[0];
  f = G____4[1];
  return filterJS(f.apply(obj, xs));
}
module.exports = {
  "is-same?": function(a, b) {
    return (a == b);
  },
  "is-nil?": function(x) {
    return (x === null);
  },
  "obj-type*": std.typeid,
  "gensym*": std.gensym,
  "is-eq?": std.eq_QUERY,
  "is-some?": std.some_QUERY,
  "slice*": function(arr) {
    let xs = Array.prototype.slice.call(arguments, 1);
    return Array.prototype.slice.apply(arr, xs);
  },
  "throw*": function() {
    let xs = Array.prototype.slice.call(arguments, 0);
    return (function() {
      throw new Error(xs.join("")) ;
    }).call(this);
  },
  "#f?": function(x) {
    return (false === x);
  },
  "#t?": function(x) {
    return (true === x);
  },
  "is-str?": function(x) {
    return (typeof (x) === "string");
  },
  "is-keyword?": std.keyword_QUERY,
  "is-symbol?": std.symbol_QUERY,
  "keyword*": std.keyword,
  "symbol*": std.symbol,
  "println*": prnLn,
  "prn*": prnStr,
  "slurp*": slurp,
  "<": function(a, b) {
    return (a < b);
  },
  "<=": function(a, b) {
    return (a <= b);
  },
  ">": function(a, b) {
    return (a > b);
  },
  ">=": function(a, b) {
    return (a >= b);
  },
  "+": function(a, b) {
    return (a + b);
  },
  "-": function(a, b) {
    return (a - b);
  },
  "*": function(a, b) {
    return (a * b);
  },
  "/": function(a, b) {
    return (a / b);
  },
  "not=": function(a, b) {
    return (a !== b);
  },
  "=": function(a, b) {
    return (a === b);
  },
  "is-contains?": std.contains_QUERY,
  "is-vector?": std.vector_QUERY,
  "is-list?": std.list_QUERY,
  "is-map?": std.map_QUERY,
  "hash-map*": std.hashmap,
  "vector*": std.vector,
  "list*": std.list,
  "values*": function(x) {
    return Object.values(x);
  },
  "keys*": function(x) {
    return Object.keys(x);
  },
  "get*": function(m, k) {
    return m[k];
  },
  "not*": function(x) {
    return (x ?
      false :
      true);
  },
  "dec*": function(x) {
    return (x - 1);
  },
  "inc*": function(x) {
    return (x + 1);
  },
  "is-even?": function(n) {
    return (0 === (n % 2));
  },
  "is-odd?": function(n) {
    return (1 === (n % 2));
  },
  "is-sequential?": std.sequential_QUERY,
  "concat*": std.concat_STAR,
  "count*": std.count,
  "cons*": cons,
  "rest*": function(arr) {
    return (arr ?
      arr.slice(1) :
      []);
  },
  "nth*": function(arr, i) {
    return arr[i];
  },
  "first*": function(arr) {
    return arr[0];
  },
  "is-empty?": function(x) {
    return (0 === std.count(x));
  },
  "not-empty*": std.not_DASH_empty,
  "apply*": fapply,
  "map*": fmap,
  "evens": function(n) {
    return (0 === (n % 2));
  },
  "odds": function(n) {
    return (1 === (n % 2));
  },
  "type*": function(x) {
    return typeof (x);
  },
  "meta*": meta,
  "conj*": conj,
  "seq*": seq,
  "is-atom?": std.atom_QUERY,
  "atom*": std.atom,
  "deref*": std.deref,
  "reset*": std.reset_BANG,
  "swap*": std.swap_BANG,
  "with-meta*": withMeta,
  "js-eval*": evalJS,
  "js*": invokeJS
}