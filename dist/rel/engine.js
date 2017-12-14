/*Auto generated by Kirby - v1.0.0 czlab.kirby.engine - Thu Dec 14 2017 02:39:55 GMT-0800 (PST)*/

const readline = require("readline");
const fs = require("fs");
const parser = require("./parser");
const std = require("./stdlib");
const pairs_QUERY = std["pairs_QUERY"];
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
const conj_BANG = std["conj_BANG"];
const count = std["count"];
const last = std["last"];
const pop_BANG = std["pop_BANG"];
const opt_QUERY__QUERY = std["opt_QUERY__QUERY"];
const keyword_QUERY = std["keyword_QUERY"];
const symbol_QUERY = std["symbol_QUERY"];
const seq = std["seq"];
const kirbystdlibref = std;
const macro_assert = "\n  (macro* assert* [c msg] (if* c true (throw* msg))) ";
const macro_cond = "\n  (macro* cond* [&xs]\n    (if* (> (count* xs) 0)\n      (list* 'if*\n            (first* xs)\n            (nth* xs 1)\n            (cons* 'cond* (rest* (rest* xs)))))) ";
const GLOBAL = ((typeof (window) === "undefined") ?
  undefined :
  window);
const prefix = "kirby> ";
////////////////////////////////////////////////////////////////////////////////
//fn: [assertSymbol] in file: engine.ky,line: 47
const assertSymbol = function(k) {
  return ((!(k instanceof Symbol)) ?
    (function() {
      throw new Error("env.xxx key must be a symbol");
    }).call(this) :
    null);
};
//Lexical Environment
class LEXEnv {
  ////////////////////////////////////////////////////////////////////////////////
  //fn: [constructor] in file: engine.ky,line: 55
  //Create and initialize
  //a new env with these symbols,
  //and optionally a parent env
  constructor(parent, vars, exprs) {
    (this["nspaces"] = [], this["data"] = {}, this["parent"] = null);
    if (parent) {
      this["parent"] = parent;
    }
    for (let i = 0, e = null, ev = null, sz = kirbystdlibref.count(vars), ____break = false; ((!____break) && (i < sz)); i = (i + 1)) {
      (e = vars[i], ev = e.value);
      if ( (ev === "&") ) {
        this.data[[
          vars[i + 1]
        ].join("")] = Array.prototype.slice.call(exprs, i);
        ____break = true;
      } else {
        if (ev.startsWith("&")) {
          this.data[ev.slice(1)] = Array.prototype.slice.call(exprs, i);
          ____break = true;
        } else {
          if (true) {
            this.data[ev] = exprs[i];
          }
        }
      }
    }
    return this;
  }
  ////////////////////////////////////////////////////////////////////////////////
  //fn: [find] in file: engine.ky,line: 76
  //Find the env
  //containing this symbol
  find(k) {
    assertSymbol(k);
    return (contains_QUERY(this.data, k.value) ?
      this :
      (some_QUERY(this.parent) ?
        this.parent.find(k) :
        null));
  }
  ////////////////////////////////////////////////////////////////////////////////
  //fn: [set] in file: engine.ky,line: 83
  //Bind this symbol,
  //value to this env
  set(k, v) {
    assertSymbol(k);
    this.data[k.value] = v;
    return v;
  }
  ////////////////////////////////////////////////////////////////////////////////
  //fn: [get] in file: engine.ky,line: 88
  //Get value of
  //this symbol
  get(k) {
    assertSymbol(k);
    let env = this.find(k);
    return (env ?
      env.data[k.value] :
      k.value);
  }
  ////////////////////////////////////////////////////////////////////////////////
  //fn: [select] in file: engine.ky,line: 95
  select(what) {
    return seq(this.data).reduce(function(acc, GS__5) {
      let k = GS__5[0];
      let v = GS__5[1];
      if ((function() {
          let C__6;
          switch (what) {
            case "fn":
              C__6 = (typeof (v) === "function");
              break;
            case "var":
              C__6 = (!(typeof (v) === "function"));
              break;
            default:
              C__6 = true;
              break;
          }
          return C__6;
        }).call(this)) {
        acc[[
          k
        ].join("")] = v;
      }
      return acc;
    }, {});
  }
  ////////////////////////////////////////////////////////////////////////////////
  //fn: [prn] in file: engine.ky,line: 103
  //Print set of vars
  prn() {
    return std.prn(this.data);
  }
  ////////////////////////////////////////////////////////////////////////////////
  //fn: [pushNSP] in file: engine.ky,line: 106
  //Add a namespace
  pushNSP(nsp) {
    return conj_BANG(this.nspaces, [
      nsp
    ].join(""));
  }
  ////////////////////////////////////////////////////////////////////////////////
  //fn: [peekNSP] in file: engine.ky,line: 109
  //Returns the
  //last added namespace
  peekNSP() {
    return last(this.nspaces);
  }
  ////////////////////////////////////////////////////////////////////////////////
  //fn: [popNSP] in file: engine.ky,line: 113
  //Return and remove
  //the last added namespace
  popNSP() {
    return pop_BANG(this.nspaces)[0];
  }
  ////////////////////////////////////////////////////////////////////////////////
  //fn: [firstNSP] in file: engine.ky,line: 117
  //Get the first
  //added namespace
  firstNSP() {
    return this.nspaces[0];
  }
  ////////////////////////////////////////////////////////////////////////////////
  //fn: [countNSPCache] in file: engine.ky,line: 121
  //Count n# of
  //added namespaces
  countNSPCache() {
    return kirbystdlibref.count(this.nspaces);
  }
  ////////////////////////////////////////////////////////////////////////////////
  //fn: [resetNSPCache] in file: engine.ky,line: 125
  //Clear all namespaces
  resetNSPCache() {
    this["nspaces"] = [];
    return null;
  }
}
////////////////////////////////////////////////////////////////////////////////
//fn: [Function.prototype.clone] in file: engine.ky,line: 133
Function.prototype.clone = function() {
  let that = this;
  let tmp = function() {
    let ____args = Array.prototype.slice.call(arguments);
    return that.apply(this, ____args);
  };
  let GS__7 = that;
  Object.entries(GS__7).forEach(function(e) {
    return (function(v, k) {
      return tmp[k] = v;
    })(e[1], e[0]);
  });
  return tmp;
};
////////////////////////////////////////////////////////////////////////////////
//fn: [prnStr] in file: engine.ky,line: 140
const prnStr = function() {
  let xs = Array.prototype.slice.call(arguments, 0);
  return xs.map(function() {
    let ____args = Array.prototype.slice.call(arguments);
    return prn(____args[0]);
  }).join(" ");
};
////////////////////////////////////////////////////////////////////////////////
//fn: [prnLn] in file: engine.ky,line: 143
const prnLn = function() {
  let xs = Array.prototype.slice.call(arguments, 0);
  return xs.map(function() {
    let ____args = Array.prototype.slice.call(arguments);
    return prn(____args[0]);
  }).forEach(function() {
    let ____args = Array.prototype.slice.call(arguments);
    return (console ?
      console.log([
        ____args[0]
      ].join("")) :
      null);
  });
};
////////////////////////////////////////////////////////////////////////////////
//fn: [slurp] in file: engine.ky,line: 146
const slurp = function(f) {
  return fs.readFileSync(f, "utf-8");
};
////////////////////////////////////////////////////////////////////////////////
//fn: [spit] in file: engine.ky,line: 149
const spit = function(f, s) {
  return fs.writeFileSync(f, s, "utf-8");
};
////////////////////////////////////////////////////////////////////////////////
//fn: [clone] in file: engine.ky,line: 152
const clone = function(obj) {
  let oid = typeid(obj);
  return (function() {
    let C__8;
    switch (oid) {
      case "vector":
      case "map":
      case "list":
        C__8 = into_BANG(oid, Array.prototype.slice.call(obj));
        break;
      case "array":
        C__8 = Array.prototype.slice.call(obj);
        break;
      case "object":
        C__8 = seq(obj).reduce(function(acc, en) {
          acc[en[0]] = last(en);
          return acc;
        }, {});
        break;
      case "function":
        C__8 = obj.clone();
        break;
      default:
        C__8 = (function() {
          throw new Error([
            "clone of non-collection: ",
            oid
          ].join(""));
        }).call(this);
        break;
    }
    return C__8;
  }).call(this);
};
////////////////////////////////////////////////////////////////////////////////
//fn: [cons] in file: engine.ky,line: 171
const cons = function(a, b) {
  return [
    a
  ].concat(b);
};
////////////////////////////////////////////////////////////////////////////////
//fn: [conj] in file: engine.ky,line: 174
const conj = function(arr) {
  let xs = Array.prototype.slice.call(arguments, 1);
  return (list_QUERY(arr) ?
    into_BANG("list", xs.reverse().concat(arr)) :
    (some_QUERY(arr) ?
      into_BANG("vector", arr.concat(xs)) :
      (true ?
        arr :
        null)));
};
////////////////////////////////////////////////////////////////////////////////
//fn: [fapply] in file: engine.ky,line: 186
const fapply = function(f) {
  let xs = Array.prototype.slice.call(arguments, 1);
  return f.apply(this, xs);
};
////////////////////////////////////////////////////////////////////////////////
//fn: [fmap] in file: engine.ky,line: 189
const fmap = function(f, arr) {
  return arr.map(f);
};
////////////////////////////////////////////////////////////////////////////////
//fn: [resolveJS] in file: engine.ky,line: 192
const resolveJS = function(s) {
  return [
    (contains_QUERY(s, ".") ?
      eval(/^(.*)\.[^\.]*$/g.exec(s)[1]) :
      GLOBAL),
    eval(s)
  ];
};
////////////////////////////////////////////////////////////////////////////////
//fn: [filterJS] in file: engine.ky,line: 200
const filterJS = function(obj) {
  let s = stringify(obj);
  return (not_DASH_empty(s) ?
    JSON.parse(s) :
    null);
};
////////////////////////////////////////////////////////////////////////////////
//fn: [withMeta] in file: engine.ky,line: 205
const withMeta = function(obj, m) {
  let ret = clone(obj);
  ret["____meta"] = m;
  return ret;
};
////////////////////////////////////////////////////////////////////////////////
//fn: [meta] in file: engine.ky,line: 210
const meta = function(obj) {
  if ( (!(Array.isArray(obj) || object_QUERY(obj) || (typeof (obj) === "function"))) ) {
    throw new Error([
      "can't get metadata from: ",
      typeid(obj)
    ].join(""));
  } else {
    null;
  }
  return obj["____meta"];
};
////////////////////////////////////////////////////////////////////////////////
//fn: [evalJS] in file: engine.ky,line: 218
const evalJS = function(s) {
  return filterJS(eval(s.toString()));
};
////////////////////////////////////////////////////////////////////////////////
//fn: [invokeJS] in file: engine.ky,line: 222
const invokeJS = function(method) {
  let xs = Array.prototype.slice.call(arguments, 1);
  let GS__9 = resolveJS(method);
  let obj = GS__9[0];
  let f = GS__9[1];
  return filterJS(f.apply(obj, xs));
};
var toolkit = {
  "macroexpand*": function(code) {
    let GS__10 = Array.prototype.slice.call(arguments, 1);
    let env = GS__10[0];
    return (console ?
      console.log([
        std.prn(expandMacro(code, (env || g_env)))
      ].join("")) :
      null);
  },
  "macros*": function() {
    let GS__11 = Array.prototype.slice.call(arguments, 0);
    let fout = GS__11[0];
    let s = std.prn(CACHE);
    return (fout ?
      spit(fout, s) :
      (console ?
        console.log([
          s
        ].join("")) :
        null));
  },
  "env*": function(what) {
    let GS__12 = Array.prototype.slice.call(arguments, 1);
    let env = GS__12[0];
    let fout = GS__12[1];
    let s = std.prn((env || g_env).select(what));
    return (fout ?
      spit(fout, s) :
      (console ?
        console.log([
          s
        ].join("")) :
        null));
  },
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
  "str*": function() {
    let xs = Array.prototype.slice.call(arguments, 0);
    return xs.join("");
  },
  "slice*": function(arr) {
    let xs = Array.prototype.slice.call(arguments, 1);
    return Array.prototype.slice.apply(arr, xs);
  },
  "throw*": function() {
    let xs = Array.prototype.slice.call(arguments, 0);
    return (function() {
      throw new Error(xs.join(""));
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
  "spit*": spit,
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
    return (0 === std.modulo(n, 2));
  },
  "is-odd?": function(n) {
    return (1 === std.modulo(n, 2));
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
    return (0 === (nmod2));
  },
  "odds": function(n) {
    return (1 === (nmod2));
  },
  "type*": function(x) {
    return typeof (x);
  },
  "meta*": meta,
  "conj*": conj,
  "seq*": std.seq,
  "is-atom?": std.atom_QUERY,
  "atom*": std.atom,
  "deref*": std.deref,
  "reset*": std.reset_BANG,
  "swap*": std.swap_BANG,
  "with-meta*": withMeta,
  "js-eval*": evalJS,
  "js*": invokeJS
};
var loadedMacros_QUERY = false;
var CACHE = {};
////////////////////////////////////////////////////////////////////////////////
//fn: [loadMacros] in file: engine.ky,line: 350
const loadMacros = function() {
  if ( (!loadedMacros_QUERY) ) {
    loadedMacros_QUERY = true;
    require("./macros.ky");
  }
  return null;
};
////////////////////////////////////////////////////////////////////////////////
//fn: [setMacro] in file: engine.ky,line: 356
//Register a new macro
const setMacro = function(cmd, func) {
  if ( (cmd && func) ) {
    cmd = [
      cmd
    ].join("");
    if ( (!contains_QUERY(cmd, "/")) ) {
      let c = g_env.peekNSP();
      if ( (!c) ) {
        throw new Error("missing namespace");
      } else {
        null;
      }
      cmd = [
        c,
        "/",
        cmd
      ].join("");
    }
    CACHE[cmd] = func;
  }
  return null;
};
////////////////////////////////////////////////////////////////////////////////
//fn: [getMacro] in file: engine.ky,line: 368
//Get macro
const getMacro = function(cmd) {
  let nsp = null;
  let ret = null;
  cmd = [
    cmd
  ].join("");
  if (contains_QUERY(cmd, "/")) {
    ret = CACHE[cmd];
  } else {
    nsp = g_env.peekNSP();
    if (nsp) {
      ret = CACHE[[
        nsp,
        "/",
        cmd
      ].join("")];
    }
    if ( (!ret) ) {
      ret = CACHE[[
        "czlab.kirby.macros/",
        cmd
      ].join("")];
    } else {
      null;
    }
  }
  return ret;
};
////////////////////////////////////////////////////////////////////////////////
//fn: [dbg] in file: engine.ky,line: 383
const dbg = function(obj) {
  return (console ?
    console.log([
      "DBG-RT: ",
      prn(obj)
    ].join("")) :
    null);
};
////////////////////////////////////////////////////////////////////////////////
//fn: [readAST] in file: engine.ky,line: 386
//Returns the AST
const readAST = function(s) {
  let ret = parser.parse(s);
  if ( (1 === kirbystdlibref.count(ret)) ) {
    ret = ret[0];
  }
  return ret;
};
////////////////////////////////////////////////////////////////////////////////
//fn: [isList?] in file: engine.ky,line: 393
//Returns true
//if a non-empty list
const isList_QUERY = function(x) {
  return (sequential_QUERY(x) && not_DASH_empty(x));
};
////////////////////////////////////////////////////////////////////////////////
//fn: [quasiquote] in file: engine.ky,line: 399
const quasiquote = function(ast) {
  return ((!isList_QUERY(ast)) ?
    [
      kirbystdlibref.symbol("quote"),
      ast
    ] :
    ((symbol_QUERY(ast[0]) && (ast[0] == "unquote")) ?
      ast[1] :
      ((isList_QUERY(ast[0]) && (ast[0][0] == "splice-unquote")) ?
        [
          kirbystdlibref.symbol("concat*"),
          ast[0][1],
          quasiquote(ast.slice(1))
        ] :
        (true ?
          (function() {
            let a0 = ast[0];
            let a1 = ast.slice(1);
            return [
              kirbystdlibref.symbol("cons*"),
              quasiquote(a0),
              quasiquote(a1)
            ];
          }).call(this) :
          null))));
};
////////////////////////////////////////////////////////////////////////////////
//fn: [isMacroCall?] in file: engine.ky,line: 416
const isMacroCall_QUERY = function(ast, env) {
  return (pairs_QUERY(ast) && symbol_QUERY(ast[0]) && getMacro([
      ast[0]
    ].join("")));
};
////////////////////////////////////////////////////////////////////////////////
//fn: [expandMacro] in file: engine.ky,line: 422
const expandMacro = function(ast, env) {
  let isM_QUERY = isMacroCall_QUERY(ast, env);
  let mac = null;
  let cmd = (isM_QUERY ?
    ast[0] :
    "");
  for (let ____break = false; ((!____break) && isMacroCall_QUERY(ast, env));) {
    (cmd = [
      ast[0]
    ].join(""), mac = getMacro(cmd), ast = mac.apply(mac, ast.slice(1)));
  }
  return ast;
};
////////////////////////////////////////////////////////////////////////////////
//fn: [evalAst] in file: engine.ky,line: 432
const evalAst = function(ast, env) {
  return (keyword_QUERY(ast) ?
    ast.value :
    ((typeof (ast) === "string") ?
      std.unwrap_DASH_str(ast) :
      (symbol_QUERY(ast) ?
        env.get(ast) :
        (pairs_QUERY(ast) ?
          ast.map(function() {
            let ____args = Array.prototype.slice.call(arguments);
            return compute(____args[0], env);
          }) :
          (list_QUERY(ast) ?
            into_BANG("list", ast.map(function() {
              let ____args = Array.prototype.slice.call(arguments);
              return compute(____args[0], env);
            })) :
            (vector_QUERY(ast) ?
              into_BANG("vector", ast.map(function() {
                let ____args = Array.prototype.slice.call(arguments);
                return compute(____args[0], env);
              })) :
              ((false && map_QUERY(ast)) ?
                seq(ast).reduce(function(acc, en) {
                  acc[compute(en[0], env)] = compute(last(en), env);
                  return acc;
                }, {}) :
                (map_QUERY(ast) ?
                  (function() {
                    let m = {};
                    for (let i = 0, sz = kirbystdlibref.count(ast), ____break = false; ((!____break) && (i < sz)); i = (i + 2)) {
                      m[compute(ast[i], env)] = compute(ast[i + 1], env);
                    }
                    return m;
                  }).call(this) :
                  (true ?
                    ast :
                    null)))))))));
};
////////////////////////////////////////////////////////////////////////////////
//fn: [handleAND] in file: engine.ky,line: 464
const handleAND = function(ast, env) {
  let ret = true;
  for (let i = 1, sz = kirbystdlibref.count(ast), ____break = false; ((!____break) && (i < sz)); i = (i + 1)) {
    ret = compute(ast[i], env);
    if ( (!ret) ) {
      ____break = true;
    } else {
      null;
    }
  }
  return ret;
};
////////////////////////////////////////////////////////////////////////////////
//fn: [handleOR] in file: engine.ky,line: 472
const handleOR = function(ast, env) {
  let ret = null;
  for (let i = 1, sz = kirbystdlibref.count(ast), ____break = false; ((!____break) && (i < sz)); i = (i + 1)) {
    ret = compute(ast[i], env);
    if (ret) {
      ____break = true;
    }
  }
  return ret;
};
////////////////////////////////////////////////////////////////////////////////
//fn: [handleLet] in file: engine.ky,line: 480
const handleLet = function(ast, env) {
  let e = new LEXEnv(env);
  let a1 = ast[1];
  for (let i = 0, sz = kirbystdlibref.count(a1), ____break = false; ((!____break) && (i < sz)); i = (i + 2)) {
    e.set(a1[i], compute(a1[i + 1], e));
  }
  return [
    ast[2],
    e
  ];
};
////////////////////////////////////////////////////////////////////////////////
//fn: [handleMacro] in file: engine.ky,line: 490
const handleMacro = function(ast, env) {
  let rc = [
    ast[0],
    ast[1],
    [
      kirbystdlibref.symbol("fn*"),
      ast[2]
    ].concat(ast.slice(3))
  ];
  let a2 = rc[2];
  let a1 = rc[1];
  let cmd = [
    "czlab.kirby.macros/",
    a1
  ].join("");
  let func = compute(a2, env);
  func["____macro"] = true;
  return setMacro(cmd, func);
};
////////////////////////////////////////////////////////////////////////////////
//fn: [handleTry] in file: engine.ky,line: 503
const handleTry = function(ast, env) {
  let a1 = ast[1];
  let a2 = ast[2];
  return (function() {
    try {
      return compute(a1, env);
    } catch (ex) {
      return ((a2 && ("catch*" == a2[0])) ?
        ((ex instanceof Error) ?
          ex = ex.message :
          null) :
        compute(a2[2], new LEXEnv(env, [
          a2[1]
        ], [
          ex
        ])));
    }
  }).call(this);
};
////////////////////////////////////////////////////////////////////////////////
//fn: [handleIf] in file: engine.ky,line: 519
const handleIf = function(ast, env) {
  let c = compute(ast[1], env);
  let a2 = ast[2];
  let a3 = ast[3];
  return (((c === null) || (false === c)) ?
    ((!(typeof (a3) === "undefined")) ?
      a3 :
      null) :
    a2);
};
////////////////////////////////////////////////////////////////////////////////
//fn: [handleForm] in file: engine.ky,line: 528
const handleForm = function(ast, env) {
  let f = null;
  let el = evalAst(ast, env);
  return ((vector_QUERY(ast) || map_QUERY(ast) || list_QUERY(ast)) ?
    [
      false,
      el
    ] :
    (Array.isArray(el) ?
      (function() {
        f = el[0];
        return ((f && f.____ast) ?
          [
            true,
            f.____ast,
            f.____genenv(el.slice(1))
          ] :
          (true ?
            [
              false,
              ((typeof (f) === "function") ?
                f.apply(f, el.slice(1)) :
                el),
              env
            ] :
            null));
      }).call(this) :
      (true ?
        [
          false,
          el
        ] :
        null)));
};
////////////////////////////////////////////////////////////////////////////////
//fn: [fn-wrap] in file: engine.ky,line: 547
const fn_DASH_wrap = function(run, ast, env, params) {
  let f = function() {
    let ____args = Array.prototype.slice.call(arguments);
    return run(ast, new LEXEnv(env, params, ____args));
  };
  (f["____macro"] = false, f["____meta"] = null, f["____ast"] = ast, f["____genenv"] = function() {
    let ____args = Array.prototype.slice.call(arguments);
    return new LEXEnv(env, params, ____args[0]);
  });
  return f;
};
////////////////////////////////////////////////////////////////////////////////
//fn: [compute*] in file: engine.ky,line: 558
const compute_STAR = function(ast, env) {
  let ok_QUERY = true;
  let cmd = "";
  let ret = null;
  let g1 = function(a) {
    return (pairs_QUERY(a) ?
      a[0] :
      "");
  };
  for (let ____break = false; (!____break);) {
    (ast = expandMacro(ast, env), cmd = g1(ast));
    ____break = ((!Array.isArray(ast)) ?
      (function() {
        let GS__13 = true;
        ret = evalAst(ast, env);
        return GS__13;
      }).call(this) :
      ((0 === kirbystdlibref.count(ast)) ?
        (function() {
          let GS__14 = true;
          ret = ast;
          return GS__14;
        }).call(this) :
        (("and*" == cmd) ?
          (function() {
            let GS__15 = true;
            ret = handleAND(ast, env);
            return GS__15;
          }).call(this) :
          (("or*" == cmd) ?
            (function() {
              let GS__16 = true;
              ret = handleOR(ast, env);
              return GS__16;
            }).call(this) :
            (("def*" == cmd) ?
              (function() {
                let GS__17 = true;
                ret = env.set(a1, compute(a2, env));
                return GS__17;
              }).call(this) :
              (("let*" == cmd) ?
                (function() {
                  let GS__18 = false;
                  let rc = handleLet(ast, env);
                  (ast = rc[0], env = rc[1]);
                  return GS__18;
                }).call(this) :
                (("quote" == cmd) ?
                  (function() {
                    let GS__19 = true;
                    ret = ast[1];
                    return GS__19;
                  }).call(this) :
                  (("quasiquote" == cmd) ?
                    (function() {
                      let GS__20 = false;
                      ast = quasiquote(ast[1]);
                      return GS__20;
                    }).call(this) :
                    (("macro*" == cmd) ?
                      (function() {
                        let GS__21 = true;
                        ret = handleMacro(ast, env);
                        return GS__21;
                      }).call(this) :
                      (("macroexpand" == cmd) ?
                        (function() {
                          let GS__22 = true;
                          ret = expandMacro(ast[1], env);
                          return GS__22;
                        }).call(this) :
                        (("try*" == cmd) ?
                          (function() {
                            let GS__23 = true;
                            ret = handleTry(ast, env);
                            return GS__23;
                          }).call(this) :
                          (("do*" == cmd) ?
                            (function() {
                              let GS__24 = false;
                              evalAst(ast.slice(1, -1), env);
                              ast = ast[(ast.length - 1)];
                              return GS__24;
                            }).call(this) :
                            (("if*" == cmd) ?
                              (function() {
                                let GS__25 = false;
                                ast = handleIf(ast, env);
                                return GS__25;
                              }).call(this) :
                              (("fn*" == cmd) ?
                                (function() {
                                  let GS__26 = true;
                                  ret = fn_DASH_wrap(compute, ast[2], env, ast[1]);
                                  return GS__26;
                                }).call(this) :
                                (true ?
                                  (function() {
                                    let rc = handleForm(ast, env);
                                    let a1 = rc[1];
                                    let a2 = rc[2];
                                    return (rc[0] ?
                                      (function() {
                                        let GS__27 = false;
                                        (ast = a1, env = a2);
                                        return GS__27;
                                      }).call(this) :
                                      (function() {
                                        let GS__28 = true;
                                        ret = a1;
                                        return GS__28;
                                      }).call(this));
                                  }).call(this) :
                                  null)))))))))))))));
  }
  return ret;
};
////////////////////////////////////////////////////////////////////////////////
//fn: [compute] in file: engine.ky,line: 629
const compute = function(ast, env) {
  if ( (!env) ) {
    env = g_env;
  } else {
    null;
  }
  let ret = compute_STAR(ast, env);
  return ((typeof (ret) === "undefined") ?
    null :
    ret);
};
////////////////////////////////////////////////////////////////////////////////
//fn: [newEnv] in file: engine.ky,line: 635
const newEnv = function() {
  return (function() {
    let ret = new LEXEnv();
    let GS__29 = toolkit;
    Object.entries(GS__29).forEach(function(e) {
      return (function(v, k) {
        return ret.set(symbol(k), v);
      })(e[1], e[0]);
    });
    return ret;
  }).call(this);
};
////////////////////////////////////////////////////////////////////////////////
//fn: [runRepl] in file: engine.ky,line: 641
const runRepl = function() {
  let rl = readline.createInterface(process.stdin, process.stdout);
  rl.on("line", function(line) {
    try {
      if (line) {
        if (console) {
          console.log([
            reval(line)
          ].join(""));
        }
      }
    } catch (e) {
      if (console) {
        console.log([
          e
        ].join(""));
      }
    }
    rl.setPrompt(prefix, prefix.length);
    return rl.prompt();
  });
  rl.on("close", function() {
    if (console) {
      console.log([
        "Bye!"
      ].join(""));
    }
    return process.exit(0);
  });
  init();
  if (console) {
    console.log([
      prefix,
      "Kirby REPL v",
      version
    ].join(""));
  }
  rl.setPrompt(prefix, prefix.length);
  return rl.prompt();
};
////////////////////////////////////////////////////////////////////////////////
//fn: [reval] in file: engine.ky,line: 663
const reval = function(c) {
  let xs = Array.prototype.slice.call(arguments, 1);
  return prn(compute(readAST(c)));
};
var inited_QUERY = false;
var version = "";
var g_env = null;
////////////////////////////////////////////////////////////////////////////////
//fn: [init] in file: engine.ky,line: 670
const init = function(ver) {
  if ( (!inited_QUERY) ) {
    (version = ver, g_env = newEnv());
    reval(macro_cond);
    reval(macro_assert);
    loadMacros();
    inited_QUERY = true;
  }
  return inited_QUERY;
};
////////////////////////////////////////////////////////////////////////////////
//fn: [globalEnv] in file: engine.ky,line: 679
const globalEnv = function() {
  return g_env;
};
module.exports = {
  LEXEnv: LEXEnv,
  setMacro: setMacro,
  getMacro: getMacro,
  expandMacro: expandMacro,
  compute: compute,
  newEnv: newEnv,
  runRepl: runRepl,
  init: init,
  globalEnv: globalEnv
};