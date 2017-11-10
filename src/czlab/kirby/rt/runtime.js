/*Auto generated by Kirby - v1.0.0 czlab.kirby.rt.runtime Thu Nov 09 2017 23:38:55 GMT-0800 (PST)*/

var readline = require("readline");
var parser = require("../bl/parser");
var std = require("../bl/stdlib");
var contains_QUERY = std["contains_QUERY"];
var keyword_QUERY = std["keyword_QUERY"];
var atom = std["atom"];
var into = std["into"];
var vector_QUERY = std["vector_QUERY"];
var vector = std["vector"];
var symbol_QUERY = std["symbol_QUERY"];
var symbol = std["symbol"];
var count = std["count"];
var list_QUERY = std["list_QUERY"];
var map_QUERY = std["map_QUERY"];
var tree = std["tree"];
var seq = std["seq"];
var prn = std["prn"];
var not_DASH_empty = std["not_DASH_empty"];
var sequential_QUERY = std["sequential_QUERY"];
var rt = require("../rt/toolkit");
var env = require("../bl/env");
var LEXEnv = env["LEXEnv"];
var kirbystdlibref = std;

let loadedMacros_QUERY;
loadedMacros_QUERY = false;

let CACHE;
CACHE = {};

function loadMacros() {
  if ( (!loadedMacros_QUERY) ) {
    loadedMacros_QUERY = true;
    require("../bl/macros.ky");
  }
  return null;
}

//
function setMacro(cmd, func) {
  if ( (cmd && func) ) {
    cmd = [cmd].join("");
    if ( (!contains_QUERY(cmd, "/")) ) {
      let c;
      c = global_env.peekNSP();
      if ( (!c) ) {
        throw new Error("missing namespace");
      }
      cmd = [c, "/", cmd].join("");
    }
    CACHE[cmd] = func;
  }
  return null;
}

//
function getMacro(cmd) {
  let ret;
  ret = null;
  cmd = [cmd].join("");
  if (contains_QUERY(cmd, "/")) {
    ret = CACHE[cmd];
  } else {
    let nsp;
    nsp = global_env.peekNSP();
    if (nsp) {
      ret = CACHE[[nsp, "/", cmd].join("")];
    }
    if ( (!ret) ) {
      ret = CACHE[["czlab.kirby.bl.macros/", cmd].join("")];
    }
  }
  return ret;
}

//
function wrap_DASH_str(s) {
  return ["\"", s.replace(/\\/g, "\\\\").replace(/"/g, "\\\"").replace(/\n/g, "\\n"), "\""].join("");
}

//
function unwrap_DASH_str(s) {
  return ((s.startsWith("\"") && s.endsWith("\"")) ?
    s.slice(1, (s.length - 1)).replace(/\\"/g, "\"").replace(/\\n/g, "\n").replace(/\\\\/g, "\\") :
    s);
}

//
function dbg(obj) {
  return (console ?
    console.log(["DBG-RT: ", prn(obj, true)].join("")) :
    null);
}

//
function readAST(s) {
  let ret;
  ret = parser.parser(s);
  if ( (1 === count(ret)) ) {
    ret = ret[0];
  }
  return ret;
}

//
function isPair_QUERY(x) {
  return (sequential_QUERY(x) && (!(0 === kirbystdlibref.count(x))));
}

//
function quasiquote(ast) {
  return ((!isPair_QUERY(ast)) ?
    tree(symbol("quote"), ast) :
    ((symbol_QUERY(ast[0]) && (ast[0].value === "unquote")) ?
      ast[1] :
      ((isPair_QUERY(ast[0]) && (ast[0][0].value === "splice-unquote")) ?
        tree(symbol("concat*"), ast[0][1], quasiquote(ast.slice(1))) :
        (true ?
          (function() {
            let a0,
              a1;
            a0 = ast[0];
            a1 = ast.slice(1);
            return tree(symbol("cons*"), quasiquote(a0), quasiquote(a1));
          }).call(this) :
          null))));
}

//
function isMacroCall_QUERY(ast, env) {
  return (list_QUERY(ast) && symbol_QUERY(ast[0]) && getMacro([ast[0]].join("")));
}

//
function expandMacro(ast, env, mc) {
  return macroexpand(ast, env);
}

//
function macroexpand(ast, env) {
  let isM_QUERY,
    mac,
    cmd;
  isM_QUERY = isMacroCall_QUERY(ast, env);
  mac = null;
  cmd = (isM_QUERY ?
    ast[0] :
    "");
  for (let ____break = false; ((!____break) && isMacroCall_QUERY(ast, env));) {
    (cmd = [ast[0]].join(""), mac = getMacro(cmd), ast = mac.apply(mac, ast.slice(1)));
  }
  return ast;
}

//
function evalAst(ast, env) {
  return (keyword_QUERY(ast) ?
    ["\"", ast, "\""].join("") :
    ((typeof (ast) === "string") ?
      unwrap_DASH_str(ast) :
      (symbol_QUERY(ast) ?
        env.get(ast) :
        (list_QUERY(ast) ?
          ast.map(function() {
            let ____args;
            ____args = Array.prototype.slice.call(arguments);
            return compute(____args[0], env);
          }) :
          (vector_QUERY(ast) ?
            into("vector", ast.map(function() {
              let ____args;
              ____args = Array.prototype.slice.call(arguments);
              return compute(____args[0], env);
            })) :
            ((false && map_QUERY(ast)) ?
              Object.entries(ast).reduce(function(acc, en) {
                acc[compute(en[0], env)] = compute(last(en), env);
                return acc;
              }, {}) :
              (map_QUERY(ast) ?
                (function() {
                  let m;
                  m = {};
                  for (let i = 0, ____break = false; ((!____break) && (i < ast.length)); i = (i + 2)) {
                    m[compute(ast[i], env)] = compute(ast[(i + 1)], env);
                  }
                  return m;
                }).call(this) :
                (true ?
                  ast :
                  null))))))));
}

//
function handleAND(ast, env) {
  let ret;
  ret = true;
  for (let i = 1, ____break = false; ((!____break) && (i < ast.length)); i = (i + 1)) {
    ret = compute(ast[i], env);
    if ( (!ret) ) {
      ____break = true;
    }
  }
  return ret;
}

//
function handleOR(ast, env) {
  let ret;
  ret = null;
  for (let i = 1, ____break = false; ((!____break) && (i < ast.length)); i = (i + 1)) {
    ret = compute(ast[i], env);
    if (ret) {
      ____break = true;
    }
  }
  return ret;
}

//
function handleLet(ast, env) {
  let e,
    a1;
  e = new LEXEnv(env);
  a1 = ast[1];
  for (let i = 0, ____break = false; ((!____break) && (i < a1.length)); i = (i + 2)) {
    e.set(a1[i], compute(a1[(i + 1)], e));
  }
  return vector(true, ast[2], e);
}

//
function handleMacro(ast, env) {
  let rc,
    a2,
    a1,
    func;
  rc = tree(ast[0], ast[1], [symbol("fn*"), ast[2]].concat(ast.slice(3)));
  a2 = rc[2];
  a1 = rc[1];
  func = compute(a2, env);
  func["____macro"] = true;
  return env.set(a1, func);
}

//
function handleTry(ast, env) {
  let a1,
    a2;
  a1 = ast[1];
  a2 = ast[2];
  return (function() {
    try {
      compute(a1, env);

    } catch (ex) {
      return ((a2 && ("catch*" === [a2[0]].join(""))) ?
        ((ex instanceof Error) ?
          ex = ex.message :
          null) :
        compute(a2[2], new LEXEnv(env, [a2[1]], [ex])));
    }
  }).call(this);
}

//
function handleIf(ast, env) {
  let c,
    a2,
    a3;
  c = compute(ast[1], env);
  a2 = ast[2];
  a3 = ast[3];
  return (((c === null) || (false === c)) ?
    ((!(typeof (a3) === "undefined")) ?
      a3 :
      null) :
    a2);
}

//
function handleForm(ast, env) {
  let el,
    f;
  el = evalAst(ast, env);
  f = el[0];
  return (f.____ast ?
    vector(true, f.____ast, f.____genenv(el.slice(1))) :
    vector(false, f.apply(this, el.slice(1)), env));
}

//
function fn_DASH_wrap(run, ast, env, params) {
  let f;
  f = function() {
    let ____args;
    ____args = Array.prototype.slice.call(arguments);
    return run(ast, new LEXEnv(env, params, ____args));
  };
  (f["____macro"] = false, f["____meta"] = null, f["____ast"] = ast, f["____genenv"] = function() {
    let ____args;
    ____args = Array.prototype.slice.call(arguments);
    return new LEXEnv(env, params, ____args[0]);
  });
  return f;
}

//
function computeLoop(ast, env) {
  let ok_QUERY,
    ret;
  ok_QUERY = true;
  ret = null;
  for (let ____break = false; ((!____break) && ok_QUERY);) {
    ast = macroexpand(ast, env);
    ok_QUERY = ((!list_QUERY(ast)) ?
      (function() {
        let G__1;
        G__1 = false;
        ret = evalAst(ast, env);
        return G__1;
      }).call(this) :
      ((0 === count(ast)) ?
        (function() {
          let G__2;
          G__2 = false;
          ret = ast;
          return G__2;
        }).call(this) :
        (("and*" === [ast[0]].join("")) ?
          (function() {
            let G__3;
            G__3 = false;
            ret = handleAND(ast, env);
            return G__3;
          }).call(this) :
          (("or*" === [ast[0]].join("")) ?
            (function() {
              let G__4;
              G__4 = false;
              ret = handleOR(ast, env);
              return G__4;
            }).call(this) :
            (("def*" === [ast[0]].join("")) ?
              (function() {
                let G__5;
                G__5 = false;
                ret = env.set(a1, compute(a2, env));
                return G__5;
              }).call(this) :
              (("let*" === [ast[0]].join("")) ?
                (function() {
                  let rc;
                  rc = handleLet(ast, env);
                  ast = rc[1];
                  env = rc[2];
                  return rc[0];
                }).call(this) :
                (("quote" === [ast[0]].join("")) ?
                  (function() {
                    let G__6;
                    G__6 = false;
                    ret = ast[1];
                    return G__6;
                  }).call(this) :
                  (("quasiquote" === [ast[0]].join("")) ?
                    (function() {
                      let G__7;
                      G__7 = true;
                      ast = quasiquote(ast[1]);
                      return G__7;
                    }).call(this) :
                    (("macro*" === [ast[0]].join("")) ?
                      (function() {
                        let G__8;
                        G__8 = false;
                        ret = handleMacro(ast, env);
                        return G__8;
                      }).call(this) :
                      (("macroexpand" === [ast[0]].join("")) ?
                        (function() {
                          let G__9;
                          G__9 = false;
                          ret = macroexpand(ast[1], env);
                          return G__9;
                        }).call(this) :
                        (("try*" === [ast[0]].join("")) ?
                          (function() {
                            let G__10;
                            G__10 = false;
                            ret = handleTry(ast, env);
                            return G__10;
                          }).call(this) :
                          (("do*" === [ast[0]].join("")) ?
                            (function() {
                              let G__11;
                              G__11 = true;
                              evalAst(ast.slice(1, -1), env);
                              ast = ast[(ast.length - 1)];
                              return G__11;
                            }).call(this) :
                            (("if*" === [ast[0]].join("")) ?
                              (function() {
                                let G__12;
                                G__12 = true;
                                ast = handleIf(ast, env);
                                return G__12;
                              }).call(this) :
                              (("fn*" === [ast[0]].join("")) ?
                                (function() {
                                  let G__13;
                                  G__13 = false;
                                  ret = fn_DASH_wrap(compute, ast[2], env, ast[1]);
                                  return G__13;
                                }).call(this) :
                                (true ?
                                  (function() {
                                    let rc;
                                    rc = handleForm(ast, env);
                                    if (rc[0]) {
                                      ast = rc[1];
                                      env = rc[2];
                                    } else {
                                      ret = rc[1];
                                    }
                                    return rc[0];
                                  }).call(this) :
                                  null)))))))))))))));
  }
  return ret;
}

//
function compute(ast, env) {
  if ( (!env) ) {
    env = global_env;
  }
  let ret;
  ret = computeLoop(ast, env);
  return ((typeof (ret) === "undefined") ?
    null :
    ret);
}

//
function show(exp) {
  return prn(exp);
}

//
function newEnv() {
  let ret;
  ret = new LEXEnv();
  let G__14;
  G__14 = rt;
  Object.entries(G__14).forEach(function(e) {
    return (function(v, k) {
      return ret.set(symbol(k), v);
    })(e[1], e[0]);
  });
  ret.set(symbol("eval"), function(ast) {
    return compute(ast, ret);
  });
  ret.set(symbol("*ARGV*"), []);
  ret.set(symbol("*host-language*"), "javascript");
  ret.set(symbol("*gensym-counter*"), atom(0));
  return ret;
}

let prefix;
prefix = "kirby> ";

let run_repl;
run_repl = function() {
  let rl;
  rl = readline.createInterface(process.stdin, process.stdout);
  rl.on("line", function(line) {
    try {
      (
      line ?
        (console ?
          console.log([rep(line)].join("")) :
          null) :
        null);

    } catch (err) {
      if (console) {
        console.log([err].join(""));
      }
    }
    rl.setPrompt(prefix, prefix.length);
    return rl.prompt();
  });
  rl.on("close", function() {
    if (console) {
      console.log(["Bye!"].join(""));
    }
    return process.exit(0);
  });
  if (console) {
    console.log([prefix, "Kirby REPL v1.0.0"].join(""));
  }
  rl.setPrompt(prefix, prefix.length);
  return rl.prompt();
};

let rep;
rep = function() {
  let ____args;
  ____args = Array.prototype.slice.call(arguments);
  return show(compute(readAST(____args[0])));
};

let global_env;
global_env = new LEXEnv();

//
function runRepl() {
  init();
  return run_repl();
}

let macro_assert;
macro_assert = "\n  (macro* assert* [c msg] (if* c true (throw* msg)))";

let macro_cond;
macro_cond = "\n  (macro* cond* [&xs]\n    (if* (> (count* xs) 0)\n      (list* 'if*\n            (first* xs)\n            (nth* xs 1)\n            (cons* 'cond* (rest* (rest* xs))))))";

//
function init() {
  global_env = newEnv();
  global_env.set(symbol("*host-language*"), "javascript");
  rep(macro_cond);
  rep(macro_assert);
  return loadMacros();
}

//
function globalEnv() {
  return global_env;
}



module.exports = {
  setMacro: setMacro,
  getMacro: getMacro,
  expandMacro: expandMacro,
  compute: compute,
  newEnv: newEnv,
  runRepl: runRepl,
  init: init,
  globalEnv: globalEnv
};

