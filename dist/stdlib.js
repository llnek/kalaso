/*Auto generated by Kirby v1.0.0 - Tue Dec 26 2017 02:57:48 GMT-0800 (PST)
  czlab.kirby.stdlib
({ doc : Kirby's standard core library.
author : Kenneth Leung
 })
*/

////////////////////////////////////////////////////////////////////////////////
//fn: [not-empty] in file: stdlib.ky,line: 13
//If coll is empty, returns nil, else coll
const not_DASH_empty = function(coll) {
  return ((0 === count(coll)) ?
    null :
    coll);
};
////////////////////////////////////////////////////////////////////////////////
//fn: [stringify] in file: stdlib.ky,line: 21
//JSON stringify (no cyclical obj-ref)
const stringify = function(obj) {
  let cache = [];
  let f = function(U__1, v) {
    if (( (typeof (v) === "function") )) {
      v = "native-fn";
    } else {
      if (object_QUERY(v)) {
        if (contains_QUERY(cache, v)) {
          v = undefined;
        } else {
          conj_BANG(cache, v);
        }
      } else {
        null;
      }
    }
    return v;
  };
  return (obj ?
    JSON.stringify(obj, f) :
    null);
};
////////////////////////////////////////////////////////////////////////////////
//fn: [opt??] in file: stdlib.ky,line: 37
//If cur is not defined, returns other else cur
const opt_QUERY__QUERY = function(cur, other) {
  return (((typeof (cur) !== "undefined")) ?
    cur :
    other);
};
////////////////////////////////////////////////////////////////////////////////
//fn: [conj!] in file: stdlib.ky,line: 45
//conj[oin]. Returns coll with the xs
//'added'. (conj! nil item) returns [item].
//If coll is a list, prepends else appends to coll.
const conj_BANG = function(coll) {
  let xs = Array.prototype.slice.call(arguments, 1);
  let c = (coll || []);
  if (list_QUERY(c)) {
    c.unshift.apply(c, xs.reverse());
  } else {
    c.push.apply(c, xs);
  }
  return c;
};
////////////////////////////////////////////////////////////////////////////////
//fn: [conj] in file: stdlib.ky,line: 58
//Like conj! but
//returns a new collection
const conj = function(coll) {
  let xs = Array.prototype.slice.call(arguments, 1);
  let c = (vector_QUERY(coll) ?
    into("vector", coll) :
    (list_QUERY(coll) ?
      into("list", coll) :
      (map_QUERY(coll) ?
        into("map", coll) :
        (nichts_QUERY(coll) ?
          [] :
          (true ?
            Array.prototype.slice.call(coll) :
            null)))));
  return conj_BANG.apply(this, [
    c
  ].concat(xs));
};
////////////////////////////////////////////////////////////////////////////////
//fn: [pop!] in file: stdlib.ky,line: 74
//Removes the first element if list,
//else removes the last element,
//returning the element
//and the altered collection
const pop_BANG = function(coll) {
  let r = (list_QUERY(coll) ?
    coll.shift() :
    coll.pop());
  return [
    r,
    coll
  ];
};
////////////////////////////////////////////////////////////////////////////////
//fn: [pop] in file: stdlib.ky,line: 86
//Like pop! but returns a new collection
const pop = function(coll) {
  let r = (list_QUERY(coll) ?
    getProp(coll, 0) :
    last(coll));
  return [
    r,
    (list_QUERY(coll) ?
      coll.slice(1) :
      coll.slice(0, -1))
  ];
};
////////////////////////////////////////////////////////////////////////////////
//fn: [getProp] in file: stdlib.ky,line: 95
//If prop is a string, returns the value of
//this object property, obeying the own? flag.
//Otherwise, return the value at the index of
//the array
const getProp = function(obj, prop) {
  let GS__2 = Array.prototype.slice.call(arguments, 2);
  let own_QUERY = GS__2[0];
  own_QUERY = opt_QUERY__QUERY(own_QUERY, true);
  return ((((typeof (prop) === "string")) || ((typeof (prop) === "number"))) ?
    ((own_QUERY && ((typeof (prop) === "string")) && (!obj.hasOwnProperty(prop))) ?
      undefined :
      obj[prop]) :
    undefined);
};
////////////////////////////////////////////////////////////////////////////////
//fn: [dumpObj] in file: stdlib.ky,line: 115
//Stringify a native (js) object
const dumpObj = function(obj, cache) {
  return [
    "{ ",
    seq(obj).reduce(function(acc, GS__3) {
      let k = GS__3[0];
      let v = GS__3[1];
      return (contains_QUERY(cache, v) ?
        acc :
        acc += [
          prn(k),
          " : ",
          prn(v),
          "\n"
        ].join(""));
    }, ""),
    " }"
  ].join("");
};
////////////////////////////////////////////////////////////////////////////////
//fn: [prn] in file: stdlib.ky,line: 131
//Print data as string - use to dump an AST node
const prn = function(obj) {
  let GS__4 = Array.prototype.slice.call(arguments, 1);
  let r_QUERY = GS__4[0];
  let cache = [];
  let f = function(v) {
    let GS__5 = Array.prototype.slice.call(arguments, 1);
    let k = GS__5[0];
    if (( (typeof (v) === "function") )) {
      v = "native-fn";
    } else {
      if (object_QUERY(v)) {
        if (contains_QUERY(cache, v)) {
          v = undefined;
        } else {
          conj_BANG(cache, v);
        }
      } else {
        null;
      }
    }
    return v;
  };
  return (obj ?
    prn_STAR(obj, r_QUERY, f) :
    "");
};
////////////////////////////////////////////////////////////////////////////////
//fn: [prn*] in file: stdlib.ky,line: 149
const prn_STAR = function(obj, r_QUERY, func) {
  let oid = typeid(obj);
  let delims = {
    "vector": [
      "[",
      "]"
    ],
    "list": [
      "'(",
      ")"
    ],
    "array": [
      "(",
      ")"
    ],
    "map": [
      "{",
      "}"
    ],
    "object": [
      "{",
      "}"
    ]
  };
  let dms = getProp(delims, oid);
  let farr = function(oid, obj, f) {
    let c = [];
    let x = null;
    let dms = getProp(delims, oid);
    for (let i = 0, sz = count(obj), ____break = false; ((!____break) && (i < sz)); i = (i + 1)) {
      x = f(obj[i], i);
      conj_BANG(c, prn_STAR((((typeof (x) === "undefined")) ?
        null :
        x), r_QUERY, f));
    }
    return [
      getProp(dms, 0),
      c.join(" "),
      last(dms)
    ].join("");
  };
  return (function() {
    let C__6;
    switch (oid) {
      case "atom":
        C__6 = [
          "(atom ",
          func(obj.value),
          ")"
        ].join("");
        break;
      case "lambda_DASH_arg":
        C__6 = [
          "%",
          (parseInt(obj.value) + 1)
        ].join("");
        break;
      case "keyword":
        C__6 = [
          ":",
          obj.value
        ].join("");
        break;
      case "symbol":
        C__6 = obj.value;
        break;
      case "object":
        C__6 = [
          getProp(dms, 0),
          seq(obj).reduce(function(acc, GS__7) {
            let k = GS__7[0];
            let v = GS__7[1];
            let x = func(v, k);
            return (((typeof (x) === "undefined")) ?
              acc :
              acc += [
                prn_STAR(k, r_QUERY, func),
                ":",
                prn_STAR(v, r_QUERY, func),
                ","
              ].join(""));
          }, ""),
          last(dms)
        ].join("");
        break;
      case "vector":
      case "map":
      case "array":
      case "list":
        C__6 = farr(oid, obj, func);
        break;
      case "string":
        C__6 = (r_QUERY ?
          wrap_DASH_str(obj) :
          obj);
        break;
      case "null":
      case "nil":
        C__6 = "null";
        break;
      default:
        C__6 = ((Array.isArray(obj)) ?
          farr("array", obj, func) :
          obj.toString());
        break;
    }
    return C__6;
  }).call(this);
};
//Defining a lambda positional argument
class LambdaArg {
  ////////////////////////////////////////////////////////////////////////////////
  //fn: [constructor] in file: stdlib.ky,line: 202
  constructor(arg) {
    this["value"] = "";
    let name = ((arg === "%") ?
      "1" :
      arg.slice(1));
    let v = parseInt(name);
    if ( (!(v > 0)) ) {
      throw new Error([
        "invalid lambda-arg ",
        arg
      ].join(""));
    } else {
      null;
    }
    --v;
    this.value = [
      v
    ].join("");
    return this;
  }
  ////////////////////////////////////////////////////////////////////////////////
  //fn: [toString] in file: stdlib.ky,line: 211
  toString() {
    return this.value;
  }
}
//Defining a primitive data type
class Primitive {
  ////////////////////////////////////////////////////////////////////////////////
  //fn: [constructor] in file: stdlib.ky,line: 216
  constructor(v) {
    this["value"] = null;
    this.value = v;
    return this;
  }
  ////////////////////////////////////////////////////////////////////////////////
  //fn: [toString] in file: stdlib.ky,line: 218
  toString() {
    return this.value;
  }
}
//Defining a keyword
class Keyword {
  ////////////////////////////////////////////////////////////////////////////////
  //fn: [constructor] in file: stdlib.ky,line: 223
  constructor(name) {
    this["value"] = "";
    this.value = name.slice(1);
    return this;
  }
  ////////////////////////////////////////////////////////////////////////////////
  //fn: [toString] in file: stdlib.ky,line: 225
  toString() {
    return this.value;
  }
}
//Defining a symbol
class Symbol {
  ////////////////////////////////////////////////////////////////////////////////
  //fn: [constructor] in file: stdlib.ky,line: 230
  constructor(name) {
    this["value"] = "";
    this.value = name;
    return this;
  }
  ////////////////////////////////////////////////////////////////////////////////
  //fn: [toString] in file: stdlib.ky,line: 232
  toString() {
    return this.value;
  }
}
////////////////////////////////////////////////////////////////////////////////
//fn: [primitive?] in file: stdlib.ky,line: 235
//Returns true if primitive
const primitive_QUERY = function(obj) {
  return (obj instanceof Primitive);
};
////////////////////////////////////////////////////////////////////////////////
//fn: [primitive] in file: stdlib.ky,line: 239
//Create a Primitive
const primitive = function(v) {
  return new Primitive(v);
};
////////////////////////////////////////////////////////////////////////////////
//fn: [symbol?] in file: stdlib.ky,line: 243
//Returns true if a symbol
const symbol_QUERY = function(obj) {
  return (obj instanceof Symbol);
};
////////////////////////////////////////////////////////////////////////////////
//fn: [symbol] in file: stdlib.ky,line: 247
//Create a new Symbol
const symbol = function(name) {
  return new Symbol(name);
};
////////////////////////////////////////////////////////////////////////////////
//fn: [keyword?] in file: stdlib.ky,line: 251
//Returns true if a keyword
const keyword_QUERY = function(obj) {
  return (obj instanceof Keyword);
};
////////////////////////////////////////////////////////////////////////////////
//fn: [keyword] in file: stdlib.ky,line: 255
//Create a new Keyword
const keyword = function(name) {
  return new Keyword(name);
};
////////////////////////////////////////////////////////////////////////////////
//fn: [keyword->symbol] in file: stdlib.ky,line: 259
//Convert a Keyword to Symbol
const keyword_DASH__GT_symbol = function(k) {
  let s = new Symbol(k.value);
  (s["source"] = k.source, s["line"] = k.line, s["column"] = k.column);
  return s;
};
////////////////////////////////////////////////////////////////////////////////
//fn: [lambda-arg?] in file: stdlib.ky,line: 268
//Returns true if a Lambda Arg
const lambda_DASH_arg_QUERY = function(obj) {
  return (obj instanceof LambdaArg);
};
////////////////////////////////////////////////////////////////////////////////
//fn: [lambda-arg] in file: stdlib.ky,line: 272
//Create a new Lambda Arg
const lambda_DASH_arg = function(name) {
  return new LambdaArg(name);
};
//Defining a clojure-like Atom
class Atom {
  ////////////////////////////////////////////////////////////////////////////////
  //fn: [constructor] in file: stdlib.ky,line: 278
  constructor(val) {
    this["value"] = null;
    this.value = val;
    return this;
  }
}
////////////////////////////////////////////////////////////////////////////////
//fn: [atom?] in file: stdlib.ky,line: 281
//Returns true if an Atom
const atom_QUERY = function(atm) {
  return (atm instanceof Atom);
};
////////////////////////////////////////////////////////////////////////////////
//fn: [atom] in file: stdlib.ky,line: 285
//Create a new Atom
const atom = function(val) {
  return new Atom(val);
};
////////////////////////////////////////////////////////////////////////////////
//fn: [reset!] in file: stdlib.ky,line: 289
//Set a new value to the Atom
const reset_BANG = function(a, v) {
  a.value = v;
  return null;
};
////////////////////////////////////////////////////////////////////////////////
//fn: [deref] in file: stdlib.ky,line: 293
//Get value inside the Atom
const deref = function(a) {
  return a.value;
};
////////////////////////////////////////////////////////////////////////////////
//fn: [swap!] in file: stdlib.ky,line: 297
//Change value inside the Atom,
//returning the new value
const swap_BANG = function(a, f) {
  let xs = Array.prototype.slice.call(arguments, 2);
  a.value = f.apply(this, [
    a.value
  ].concat(xs));
  return getProp(a, "value");
};
////////////////////////////////////////////////////////////////////////////////
//fn: [typeid] in file: stdlib.ky,line: 305
//Returns the type-id
//of this object
const typeid = function(obj) {
  return (lambda_DASH_arg_QUERY(obj) ?
    "lambda_DASH_arg" :
    (keyword_QUERY(obj) ?
      "keyword" :
      (symbol_QUERY(obj) ?
        "symbol" :
        (vector_QUERY(obj) ?
          "vector" :
          (atom_QUERY(obj) ?
            "atom" :
            (list_QUERY(obj) ?
              "list" :
              (map_QUERY(obj) ?
                "map" :
                (((obj === null)) ?
                  "null" :
                  (((obj === true)) ?
                    "true" :
                    (((obj === false)) ?
                      "false" :
                      (((typeof (obj) === "function")) ?
                        "function" :
                        (((typeof (obj) === "string")) ?
                          "string" :
                          (((typeof (obj) === "number")) ?
                            "number" :
                            ((Array.isArray(obj)) ?
                              "array" :
                              (object_QUERY(obj) ?
                                "object" :
                                (true ?
                                  (function() {
                                    throw new Error([
                                      "Unknown type [",
                                      typeof (obj),
                                      "]"
                                    ].join(""));
                                  }).call(this) :
                                  null))))))))))))))));
};
////////////////////////////////////////////////////////////////////////////////
//fn: [complex?] in file: stdlib.ky,line: 328
const complex_QUERY = function(x) {
  return ((Array.isArray(x)) || object_QUERY(x));
};
////////////////////////////////////////////////////////////////////////////////
//fn: [simple?] in file: stdlib.ky,line: 332
const simple_QUERY = function(x) {
  return (((typeof (obj) === "undefined")) || ((obj === null)) || ((obj === false)) || ((obj === true)) || ((typeof (obj) === "string")) || ((typeof (obj) === "number")));
};
////////////////////////////////////////////////////////////////////////////////
//fn: [value?] in file: stdlib.ky,line: 341
//Returns true
//if a simple value
const value_QUERY = function(obj) {
  return (((obj === null)) || vector_QUERY(obj) || list_QUERY(obj) || map_QUERY(obj) || ((obj === false)) || ((obj === true)) || ((typeof (obj) === "string")) || ((typeof (obj) === "number")));
};
////////////////////////////////////////////////////////////////////////////////
//fn: [sequential?] in file: stdlib.ky,line: 354
//Returns true if coll
//implements Sequential
const sequential_QUERY = function(arr) {
  return ((Array.isArray(arr)) && (!map_QUERY(arr)));
};
////////////////////////////////////////////////////////////////////////////////
//fn: [eq?] in file: stdlib.ky,line: 360
//Tests if two things are equal
const eq_QUERY = function(a, b) {
  let ta = typeid(a);
  let ok_QUERY = true;
  let tb = typeid(b);
  return ((!((ta === tb) || (sequential_QUERY(a) && sequential_QUERY(b)))) ?
    false :
    (function() {
      let C__8;
      switch (ta) {
        case "map":
        case "list":
        case "vector":
          C__8 = (function() {
            if ( (a.length !== b.length) ) {
              ok_QUERY = false;
            } else {
              for (let i = 0, sz = a.length, ____break = false; ((!____break) && (i < sz)); i = (i + 1)) {
                if ( (!eq_QUERY(a[i], b[i])) ) {
                  ok_QUERY = false;
                  ____break = true;
                }
              }
            }
            return ok_QUERY;
          }).call(this);
          break;
        case "object":
          C__8 = (function() {
            if ( (!(count(a) === count(b))) ) {
              ok_QUERY = false;
            } else {
              for (let i = 0, k = null, ks = Object.keys(a), ____break = false; ((!____break) && (i < ks.length)); i = (i + 1)) {
                k = ks[i];
                if ( (!eq_QUERY(getProp(a, k), getProp(b, k))) ) {
                  ok_QUERY = false;
                  ____break = true;
                }
              }
            }
            return ok_QUERY;
          }).call(this);
          break;
        case "symbol":
        case "keyword":
          C__8 = (a.value === b.value);
          break;
        default:
          C__8 = (a === b);
          break;
      }
      return C__8;
    }).call(this));
};
////////////////////////////////////////////////////////////////////////////////
//fn: [object?] in file: stdlib.ky,line: 397
//Returns true
//if a js object
const object_QUERY = function(obj) {
  return ((!(((obj === null)) || (Array.isArray(obj)))) ?
    (typeof (obj) === "object") :
    null);
};
////////////////////////////////////////////////////////////////////////////////
//fn: [last] in file: stdlib.ky,line: 404
//Returns the last element
const last = function(coll) {
  return (((Array.isArray(coll)) && (coll.length > 0)) ?
    getProp(coll, (coll.length - 1)) :
    null);
};
////////////////////////////////////////////////////////////////////////////////
//fn: [into!] in file: stdlib.ky,line: 410
//Assign a type to this collection
const into_BANG = function(type, coll) {
  let C__9;
  switch (type) {
    case "vector":
      C__9 = coll["____vec"] = true;
      break;
    case "list":
      C__9 = coll["____list"] = true;
      break;
    case "map":
      C__9 = coll["____map"] = true;
      break;
  }
  return coll;
};
////////////////////////////////////////////////////////////////////////////////
//fn: [into] in file: stdlib.ky,line: 421
//Like into! but
//returning a new collection
const into = function(type, coll) {
  return into_BANG(type, coll.slice(0));
};
////////////////////////////////////////////////////////////////////////////////
//fn: [pairs?] in file: stdlib.ky,line: 427
//Returns true if
//a LISP list, not data
const pairs_QUERY = function(obj) {
  return ((Array.isArray(obj)) && (!vector_QUERY(obj)) && (!map_QUERY(obj)) && (!list_QUERY(obj)));
};
////////////////////////////////////////////////////////////////////////////////
//fn: [list?] in file: stdlib.ky,line: 436
//Returns true if a List
const list_QUERY = function(obj) {
  return ((Array.isArray(obj)) && obj.____list);
};
////////////////////////////////////////////////////////////////////////////////
//fn: [list] in file: stdlib.ky,line: 440
//Create a List
const list = function() {
  let xs = Array.prototype.slice.call(arguments, 0);
  xs["____list"] = true;
  return xs;
};
////////////////////////////////////////////////////////////////////////////////
//fn: [vector?] in file: stdlib.ky,line: 444
//Returns true if a Vector
const vector_QUERY = function(obj) {
  return ((Array.isArray(obj)) && obj.____vec);
};
////////////////////////////////////////////////////////////////////////////////
//fn: [vector] in file: stdlib.ky,line: 448
//Create a Vector
const vector = function() {
  let xs = Array.prototype.slice.call(arguments, 0);
  xs["____vec"] = true;
  return xs;
};
////////////////////////////////////////////////////////////////////////////////
//fn: [map?] in file: stdlib.ky,line: 452
//Returns true if a Hashmap
const map_QUERY = function(obj) {
  return ((Array.isArray(obj)) && obj.____map);
};
////////////////////////////////////////////////////////////////////////////////
//fn: [hashmap] in file: stdlib.ky,line: 456
//Create a new Hashmap
const hashmap = function() {
  let xs = Array.prototype.slice.call(arguments, 0);
  if (( (!((0 === modulo(xs.length, 2)))) )) {
    throw new Error("Invalid arity for hashmap");
  }
  xs["____map"] = true;
  return xs;
};
////////////////////////////////////////////////////////////////////////////////
//fn: [seq] in file: stdlib.ky,line: 462
//Returns a sequence
const seq = function(obj) {
  return (((typeof (obj) === "string")) ?
    obj.split("") :
    ((Array.isArray(obj)) ?
      obj.slice(0) :
      (object_QUERY(obj) ?
        Object.entries(obj) :
        null)));
};
////////////////////////////////////////////////////////////////////////////////
//fn: [contains?] in file: stdlib.ky,line: 470
//Returns true
//if item is inside
const contains_QUERY = function(coll, x) {
  return (((Array.isArray(coll)) || ((typeof (coll) === "string"))) ?
    coll.includes(x) :
    (object_QUERY(coll) ?
      coll.hasOwnProperty(x) :
      (true ?
        false :
        null)));
};
////////////////////////////////////////////////////////////////////////////////
//fn: [nichts?] in file: stdlib.ky,line: 480
//Returns true if object is
//either null of undefined
const nichts_QUERY = function(obj) {
  return (((typeof (obj) === "undefined")) || ((obj === null)));
};
////////////////////////////////////////////////////////////////////////////////
//fn: [some?] in file: stdlib.ky,line: 485
//Returns true if object is
//defined and not null
const some_QUERY = function(obj) {
  return (!nichts_QUERY(obj));
};
////////////////////////////////////////////////////////////////////////////////
//fn: [count] in file: stdlib.ky,line: 490
//Count the number of elements inside
const count = function(coll) {
  return (coll ?
    ((((typeof (coll) === "string")) || (Array.isArray(coll))) ?
      coll :
      Object.keys(coll)).length :
    0);
};
////////////////////////////////////////////////////////////////////////////////
//fn: [concat*] in file: stdlib.ky,line: 497
//Add many to this collection
const concat_STAR = function(coll) {
  let xs = Array.prototype.slice.call(arguments, 1);
  return (coll ?
    coll.concat.apply(coll, xs) :
    null);
};
////////////////////////////////////////////////////////////////////////////////
//fn: [every] in file: stdlib.ky,line: 502
const every = function(coll, start, step) {
  let ret = [];
  for (let i = start, sz = coll.length, ____break = false; ((!____break) && (i < sz)); i = (i + step)) {
    conj_BANG(ret, coll[i]);
  }
  return ret;
};
////////////////////////////////////////////////////////////////////////////////
//fn: [evens] in file: stdlib.ky,line: 510
//Collect every
//2nd item starting at 0
const evens = function(coll) {
  return every(coll, 0, 2);
};
////////////////////////////////////////////////////////////////////////////////
//fn: [odds] in file: stdlib.ky,line: 515
//Collect every
//2nd item starting at 1
const odds = function(coll) {
  return every(coll, 1, 2);
};
////////////////////////////////////////////////////////////////////////////////
//fn: [modulo] in file: stdlib.ky,line: 520
//Modulo
const modulo = function(x, N) {
  return ((x < 0) ?
    (x - (-1 * (N + (Math.floor(((-1 * x) / N)) * N)))) :
    (x % N));
};
////////////////////////////////////////////////////////////////////////////////
//fn: [interleave] in file: stdlib.ky,line: 528
//Returns a seq of the first item
//in each coll, then the second, etc
const interleave = function(c1, c2) {
  let cz = ((c2.length < c1.length) ?
    c2.length :
    c1.length);
  let ret = [];
  for (let i = 0, ____break = false; ((!____break) && (i < cz)); i = (i + 1)) {
    conj_BANG(ret, c1[i], c2[i]);
  }
  return ret;
};
////////////////////////////////////////////////////////////////////////////////
//fn: [zipmap] in file: stdlib.ky,line: 541
//Returns a map with the
//keys mapped to the corresponding vals
const zipmap = function(keys, vals) {
  let cz = ((keys.length < vals.length) ?
    keys.length :
    vals.length);
  let ret = {};
  for (let i = 0, ____break = false; ((!____break) && (i < cz)); i = (i + 1)) {
    ret[[
      keys[i]
    ].join("")] = vals[i];
  }
  return ret;
};
////////////////////////////////////////////////////////////////////////////////
//fn: [extendAttr] in file: stdlib.ky,line: 555
const extendAttr = function(obj, attr) {
  let GS__10 = Array.prototype.slice.call(arguments, 2);
  let flags = GS__10[0];
  flags = opt_QUERY__QUERY(flags, {
    "enumerable": false,
    "writable": true
  });
  Object.defineProperty(obj, attr, flags);
  return obj;
};
const gensym_DASH_counter = atom(0);
////////////////////////////////////////////////////////////////////////////////
//fn: [gensym] in file: stdlib.ky,line: 564
//Generates next random symbol
const gensym = function() {
  let GS__11 = Array.prototype.slice.call(arguments, 0);
  let pfx = GS__11[0];
  return symbol([
    opt_QUERY__QUERY(pfx, "GS__"),
    swap_BANG(gensym_DASH_counter, function(x) {
      return (x + 1);
    })
  ].join(""));
};
////////////////////////////////////////////////////////////////////////////////
//fn: [slice] in file: stdlib.ky,line: 571
const slice = function(coll) {
  let GS__12 = Array.prototype.slice.call(arguments, 1);
  let start = GS__12[0];
  let end = GS__12[1];
  return (((typeof (end) !== "undefined")) ?
    Array.prototype.slice.call(coll, start, end) :
    (((typeof (start) !== "undefined")) ?
      Array.prototype.slice.call(coll, start) :
      Array.prototype.slice.call(coll)));
};
////////////////////////////////////////////////////////////////////////////////
//fn: [assoc!] in file: stdlib.ky,line: 579
const assoc_BANG = function(mmap) {
  let xs = Array.prototype.slice.call(arguments, 1);
  if (mmap) {
    for (let i = 0, sz = count(xs), ____break = false; ((!____break) && (i < sz)); i = (i + 2)) {
      mmap[xs[i]] = xs[i + 1];
    }
  }
  return mmap;
};
////////////////////////////////////////////////////////////////////////////////
//fn: [dissoc!] in file: stdlib.ky,line: 589
const dissoc_BANG = function(mmap) {
  let xs = Array.prototype.slice.call(arguments, 1);
  if (mmap) {
    let GS__13 = xs;
    for (let GS__15 = 0, GS__14 = false, ____break = false; ((!____break) && ((!GS__14) && (GS__15 < GS__13.length))); GS__15 = (GS__15 + 1)) {
      let n = getProp(GS__13, GS__15);
      null;
      if ( (!true) ) {
        GS__14 = true;
      } else {
        null;
      }
      if ( ((!GS__14) && true) ) {
        delete mmap[n];
      }
    }
    null;
  }
  return mmap;
};
////////////////////////////////////////////////////////////////////////////////
//fn: [truthy?] in file: stdlib.ky,line: 595
const truthy_QUERY = function(a) {
  return (!falsy_QUERY(a));
};
////////////////////////////////////////////////////////////////////////////////
//fn: [falsy?] in file: stdlib.ky,line: 598
const falsy_QUERY = function(a) {
  return (((a === null)) || ((a === false)));
};
var m_DASH_identity = {
  "bind": function(mv, mf) {
    return mf(mv);
  },
  "result": function() {
    let ____args = Array.prototype.slice.call(arguments);
    return ____args[0];
  }
};
var m_DASH_maybe = {
  "bind": function(mv, mf) {
    return (((mv === null)) ?
      null :
      mf(mv));
  },
  "result": function() {
    let ____args = Array.prototype.slice.call(arguments);
    return ____args[0];
  },
  "zero": null
};
var m_DASH_array = {
  "bind": function(mv, mf) {
    return mv.map(mf).reduce(function(acc, v) {
      return acc.concat(v);
    }, []);
  },
  "result": function() {
    let ____args = Array.prototype.slice.call(arguments);
    return [].concat(____args[0]);
  },
  "zero": [],
  "plus": function() {
    let ____args = Array.prototype.slice.call(arguments);
    return ____args.reduce(function(acc, v) {
      return acc.concat(v);
    }, []);
  }
};
var m_DASH_state = {
  "bind": function(mv, mf) {
    return function(s) {
      let x = mv(s);
      return mf(getProp(x, 0))(getProp(x, 1));
    };
  },
  "result": function(v) {
    return function(s) {
      return [].concat([
        v,
        s
      ]);
    };
  }
};
var m_DASH_continuation = {
  "bind": function(mv, mf) {
    return function(c) {
      return mv(function(v) {
        return mf(v)(c);
      });
    };
  },
  "result": function(v) {
    return function(c) {
      return c(v);
    };
  }
};
////////////////////////////////////////////////////////////////////////////////
//fn: [wrap-str] in file: stdlib.ky,line: 647
const wrap_DASH_str = function(s) {
  let out = "\"";
  for (let i = 0, ch = "", sz = count(s), ____break = false; ((!____break) && (i < sz)); i = (i + 1)) {
    ch = s.charAt(i);
    if ( (ch === "\"") ) {
      out += "\\\"";
    } else {
      if ( (ch === "\n") ) {
        out += "\\n";
      } else {
        if ( (ch === "\t") ) {
          out += "\\t";
        } else {
          if ( (ch === "\f") ) {
            out += "\\f";
          } else {
            if ( (ch === "\r") ) {
              out += "\\r";
            } else {
              if ( (ch === "\v") ) {
                out += "\\v";
              } else {
                if ( (ch === "\\") ) {
                  out += (("u" === s.charAt((i + 1))) ?
                    ch :
                    "\\\\");
                } else {
                  if (true) {
                    out += ch;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  return out += "\"";
};
////////////////////////////////////////////////////////////////////////////////
//fn: [unwrap-str] in file: stdlib.ky,line: 664
const unwrap_DASH_str = function(s) {
  return ((s.startsWith("\"") && s.endsWith("\"")) ?
    (function() {
      let out = "";
      s = s.slice(1, -1);
      for (let i = 0, nx = "", ch = "", sz = count(s), ____break = false; ((!____break) && (i < sz)); i = (i + 1)) {
        ch = s.charAt(i);
        if ( (ch === "\\") ) {
          ++i;
          nx = s.charAt(i);
          if ( (nx === "\"") ) {
            out += "\"";
          } else {
            if ( (nx === "\\") ) {
              out += "\\";
            } else {
              if ( (nx === "n") ) {
                out += "\n";
              } else {
                if ( (nx === "t") ) {
                  out += "\t";
                } else {
                  if ( (nx === "f") ) {
                    out += "\f";
                  } else {
                    if ( (nx === "v") ) {
                      out += "\v";
                    } else {
                      if ( (nx === "r") ) {
                        out += "\r";
                      } else {
                        if (true) {
                          out += ch;
                          --i;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        } else {
          out += ch;
        }
      }
      return out;
    }).call(this) :
    s);
};
////////////////////////////////////////////////////////////////////////////////
//fn: [escXml] in file: stdlib.ky,line: 688
const escXml = function(s) {
  let out = "";
  for (let i = 0, c = null, sz = count(s), ____break = false; ((!____break) && (i < sz)); i = (i + 1)) {
    c = s[i];
    if ( (c === "&") ) {
      c = "&amp;";
    } else {
      if ( (c === ">") ) {
        c = "&gt;";
      } else {
        if ( (c === "<") ) {
          c = "&lt;";
        } else {
          if ( (c === "\"") ) {
            c = "&quot;";
          } else {
            if ( (c === "'") ) {
              c = "&apos;";
            } else {
              null;
            }
          }
        }
      }
    }
    out += c;
  }
  return out;
};
////////////////////////////////////////////////////////////////////////////////
//fn: [split-seq] in file: stdlib.ky,line: 703
const split_DASH_seq = function(coll, cnt) {
  return ((cnt < count(coll)) ?
    [
      Array.prototype.slice.call(coll, 0, cnt),
      Array.prototype.slice.call(coll, cnt)
    ] :
    [
      Array.prototype.slice.call(coll, 0),
      []
    ]);
};
////////////////////////////////////////////////////////////////////////////////
//fn: [select-keys] in file: stdlib.ky,line: 709
const select_DASH_keys = function(coll, keys) {
  return seq(keys).reduce(function(acc, n) {
    acc[[
      n
    ].join("")] = getProp(coll, [
      n
    ].join(""));
    return acc;
  }, {});
};
////////////////////////////////////////////////////////////////////////////////
//fn: [doUpdateIn!] in file: stdlib.ky,line: 717
const doUpdateIn_BANG = function(coll, n, func, args, err) {
  let cur = (((typeof (n) === "number")) ?
    (((Array.isArray(coll)) && (n < coll.length)) ?
      getProp(coll, n) :
      err(n)) :
    (true ?
      getProp(coll, n) :
      null));
  let v = func.apply(this, cons(cur, args));
  return coll[n] = v;
};
////////////////////////////////////////////////////////////////////////////////
//fn: [update-in!] in file: stdlib.ky,line: 727
const update_DASH_in_BANG = function(coll, keys, func) {
  let xs = Array.prototype.slice.call(arguments, 3);
  let err = function(k) {
    return (function() {
      throw new Error([
        "update-in! failed, bad nested keys: ",
        k
      ].join(""));
    }).call(this);
  };
  let root = coll;
  let end = (keys.length - 1);
  let m,
    n;
  for (let i = 0, ____break = false; ((!____break) && (i <= end)); i = (i + 1)) {
    n = keys[i];
    if ( (i === end) ) {
      doUpdateIn_BANG(root, n, func, xs, err);
    } else {
      if (( (typeof (n) === "number") )) {
        if ( (!((Array.isArray(root)) && (n < root.length))) ) {
          err(n);
        } else {
          root = getProp(root, n);
        }
      } else {
        if (true) {
          m = getProp(root, n);
          if (( (typeof (m) === "undefined") )) {
            m = {};
            root[n] = m;
          }
          if ( (!object_QUERY(m)) ) {
            err(n);
          } else {
            null;
          }
          root = m;
        }
      }
    }
  }
  return coll;
};
////////////////////////////////////////////////////////////////////////////////
//fn: [merge!] in file: stdlib.ky,line: 750
const merge_BANG = function(base, m) {
  let ret = (base || {});
  let src = (m || {});
  let GS__16 = src;
  Object.entries(GS__16).forEach(function(e) {
    return (function(v, k) {
      return ret[k] = v;
    })(getProp(e, 1), getProp(e, 0));
  });
  return ret;
};
////////////////////////////////////////////////////////////////////////////////
//fn: [merge] in file: stdlib.ky,line: 757
const merge = function() {
  let maps = Array.prototype.slice.call(arguments, 0);
  return maps.reduce(function(acc, n) {
    return merge_BANG(acc, n);
  }, {});
};
module.exports = {
  not_DASH_empty: not_DASH_empty,
  stringify: stringify,
  opt_QUERY__QUERY: opt_QUERY__QUERY,
  conj_BANG: conj_BANG,
  conj: conj,
  pop_BANG: pop_BANG,
  pop: pop,
  getProp: getProp,
  prn: prn,
  LambdaArg: LambdaArg,
  Primitive: Primitive,
  Keyword: Keyword,
  Symbol: Symbol,
  primitive_QUERY: primitive_QUERY,
  primitive: primitive,
  symbol_QUERY: symbol_QUERY,
  symbol: symbol,
  keyword_QUERY: keyword_QUERY,
  keyword: keyword,
  keyword_DASH__GT_symbol: keyword_DASH__GT_symbol,
  lambda_DASH_arg_QUERY: lambda_DASH_arg_QUERY,
  lambda_DASH_arg: lambda_DASH_arg,
  Atom: Atom,
  atom_QUERY: atom_QUERY,
  atom: atom,
  reset_BANG: reset_BANG,
  deref: deref,
  swap_BANG: swap_BANG,
  typeid: typeid,
  complex_QUERY: complex_QUERY,
  simple_QUERY: simple_QUERY,
  value_QUERY: value_QUERY,
  sequential_QUERY: sequential_QUERY,
  eq_QUERY: eq_QUERY,
  object_QUERY: object_QUERY,
  last: last,
  into_BANG: into_BANG,
  into: into,
  pairs_QUERY: pairs_QUERY,
  list_QUERY: list_QUERY,
  list: list,
  vector_QUERY: vector_QUERY,
  vector: vector,
  map_QUERY: map_QUERY,
  hashmap: hashmap,
  seq: seq,
  contains_QUERY: contains_QUERY,
  nichts_QUERY: nichts_QUERY,
  some_QUERY: some_QUERY,
  count: count,
  concat_STAR: concat_STAR,
  evens: evens,
  odds: odds,
  modulo: modulo,
  interleave: interleave,
  zipmap: zipmap,
  extendAttr: extendAttr,
  gensym: gensym,
  slice: slice,
  assoc_BANG: assoc_BANG,
  dissoc_BANG: dissoc_BANG,
  truthy_QUERY: truthy_QUERY,
  falsy_QUERY: falsy_QUERY,
  m_DASH_identity: m_DASH_identity,
  m_DASH_maybe: m_DASH_maybe,
  m_DASH_array: m_DASH_array,
  m_DASH_state: m_DASH_state,
  m_DASH_continuation: m_DASH_continuation,
  wrap_DASH_str: wrap_DASH_str,
  unwrap_DASH_str: unwrap_DASH_str,
  escXml: escXml,
  split_DASH_seq: split_DASH_seq,
  select_DASH_keys: select_DASH_keys,
  update_DASH_in_BANG: update_DASH_in_BANG,
  merge: merge
};