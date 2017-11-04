/*Auto generated by Kirby - v1.0.0 czlab.kirby.rt.runtime Sat Nov 04 2017 02:19:52 GMT-0700 (PDT)*/

var readline= require("readline");
var parser= require("../bl/parser");
var std= require("../bl/stdlib");
var rt= require("../rt/toolkit");
var env= require("../bl/env");
var LEXEnv=env["LEXEnv"];
var kirbystdlibref=std;

let loadedMacros_QUERY;
loadedMacros_QUERY= false;

let CACHE;
CACHE= {};

function loadMacros() {
return ((!loadedMacros_QUERY) ?
(function() {
loadedMacros_QUERY=true;
return require("../bl/defmacros.ky");
}).call(this) :
null);
}

//
function setMacro(cmd,func) {
return ((cmd&&func) ?
(function() {
cmd=cmd.toString();
((!cmd.includes("/")) ?
(function() {
let c;
c= global_env.peekNSP();

((!c) ?
(function (){ throw new Error("missing namespace"); }).call(this) :
null);
return cmd=[c,"/",cmd].join("");
}).call(this) :
null);
return CACHE[cmd]=func;
}).call(this) :
null);
}

//
function getMacro(cmd) {
return (function() {
let ret;
ret= null;

cmd=cmd.toString();
(cmd.includes("/") ?
ret=CACHE[cmd] :
(function() {
let nsp;
nsp= global_env.peekNSP();

(nsp ?
ret=CACHE[[nsp,"/",cmd].join("")] :
null);
return ((!ret) ?
ret=CACHE[["czlab.kirby.bl.defmacros/",cmd].join("")] :
null);
}).call(this));
return ret;
}).call(this);
}

//
function wrap_str(s) {
return ["\"",s.replace(/\\/g,"\\\\").replace(/"/g,"\\\"").replace(/\n/g,"\\n"),"\""].join("");
}

//
function unwrap_str(s) {
return ((s.startsWith("\"")&&s.endsWith("\"")) ?
s.slice(1,(s.length-1)).replace(/\\"/g,"\"").replace(/\\n/g,"\n").replace(/\\\\/g,"\\") :
s);
}

//
function dbg(obj) {
return (console ?
console.log([ "DBG-RT: ",std.prn(obj,true) ].join("")) :
null);
}

//
function readAST(s) {
return (function() {
let ret;
ret= parser.parser(s);

((1 === ret.length) ?
ret=ret[0] :
null);
return ret;
}).call(this);
}

//
function isPair_QUERY(x) {
return (std.sequential_QUERY(x)&&std.not_empty(x));
}

//
function quasiquote(ast) {
return ((!isPair_QUERY(ast)) ?
[ std.symbol("quote"),ast ] :
((std.symbol_QUERY(ast[0])&&(ast[0].value === "unquote")) ?
ast[1] :
((isPair_QUERY(ast[0])&&(ast[0][0].value === "splice-unquote")) ?
[ std.symbol("concat*"),ast[0][1],quasiquote(ast.slice(1)) ] :
(true ?
(function() {
let a0,a1;
a0= ast[0];
a1= ast.slice(1);

return [ std.symbol("cons*"),quasiquote(a0),quasiquote(a1) ];
}).call(this) :
null))));
}

//
function isMacroCall_QUERY(ast,env) {
return (std.list_QUERY(ast)&&std.symbol_QUERY(ast[0])&&getMacro(ast[0].toString()));
}

//
function expandMacro(ast,env,mc) {
return (function() {
let ret;
ret= macroexpand(ast,env);

return ret;
}).call(this);
}

//
function macroexpand(ast,env) {
let isM_QUERY,mac,cmd;
isM_QUERY= isMacroCall_QUERY(ast,env);
mac= null;
cmd= (isM_QUERY ?
ast[0] :
"");

(function() {
for (let ____break=false; ((!____break)&&isMacroCall_QUERY(ast,env)); ){
cmd=ast[0].toString();
mac=getMacros(cmd);
ast=mac.apply(mac,ast.slice(1));
}
})(this);

return ast;
}

//
function evalAst(ast,env) {
return (std.keyword_QUERY(ast) ?
["\"",ast,"\""].join("") :
((typeof(ast) === "string") ?
unwrap_str(ast) :
(std.symbol_QUERY(ast) ?
env.get(ast) :
(std.list_QUERY(ast) ?
ast.map(function () {
let ____args;
____args= Array.prototype.slice.call(arguments);

return compute(____args[0],env);
}) :
(std.vector_QUERY(ast) ?
(function() {
let v;
v= ast.map(function () {
let ____args;
____args= Array.prototype.slice.call(arguments);

return compute(____args[0],env);
});

v["____vec"]=true;
return v;
}).call(this) :
((false&&std.map_QUERY(ast)) ?
(function() {
let m;
m= {};

forkeys([ k,ast ],m[compute(k,env)]=compute(ast[k],env));
return m;
}).call(this) :
(std.map_QUERY(ast) ?
(function() {
let m;
m= {};

(function() {
for (let i=0,____break=false; ((!____break)&&(i < ast.length)); i=(i+2)){
m[compute(ast[i],env)]=compute(ast[(i+1)],env);
}
})(this);

return m;
}).call(this) :
(true ?
ast :
null))))))));
}

//
function handleAND(ast,env) {
return (function() {
let ret,skip_QUERY;
ret= true;
skip_QUERY= false;

(function() {
for (let i=1,____break=false; ((!____break)&&((!skip_QUERY)&&(i < ast.length))); i=(i+1)){
ret=compute(ast[i],env);
((!ret) ?
skip_QUERY=true :
null);
}
})(this);

return ret;
}).call(this);
}

//
function handleOR(ast,env) {
return (function() {
let ret,skip_QUERY;
ret= null;
skip_QUERY= false;

(function() {
for (let i=1,____break=false; ((!____break)&&((!skip_QUERY)&&(i < ast.length))); i=(i+1)){
ret=compute(ast[i],env);
(ret ?
skip_QUERY=true :
null);
}
})(this);

return ret;
}).call(this);
}

//
function handleLet(ast,env) {
let e,a1;
e= new LEXEnv(env);
a1= ast[1];

(function() {
for (let i=0,____break=false; ((!____break)&&(i < a1.length)); i=(i+2)){
e.set(a1[i],compute(a1[(i+1)],e));
}
})(this);

return [ true,ast[2],e ];
}

//
function handleMacro(ast,env) {
let rc,a2,a1,func;
rc= [ ast[0],ast[1],[ std.symbol("fn*"),ast[2] ].concat(ast.slice(3)) ];
a2= rc[2];
a1= rc[1];
func= compute(a2,env);

func["____macro"]=true;
return env.set(a1,func);
}

//
function handleTry(ast,env) {
let a1,a2;
a1= ast[1];
a2= ast[2];

return (function() {
try {
return compute(a1,env);

} catch (ex) {
return ((a2&&("catch*" === a2[0].toString())) ?
((ex instanceof Error) ?
ex=ex.message :
null) :
compute(a2[2],new LEXEnv(env,[ a2[1] ],[ ex ])));

}
}).call(this);
}

//
function handleIf(ast,env) {
let c,a2,a3;
c= compute(ast[1],env);
a2= ast[2];
a3= ast[3];

return (((c === null)||(false === c)) ?
((!(typeof(a3) === "undefined")) ?
a3 :
null) :
a2);
}

//
function handleForm(ast,env) {
let el,f;
el= evalAst(ast,env);
f= el[0];

return (f.____ast ?
[ true,f.____ast,f.____genenv(el.slice(1)) ] :
[ false,f.apply(this,el.slice(1)),env ]);
}

//
function fn_wrap(run,ast,env,params) {
return (function() {
let f;
f= function () {
let ____args;
____args= Array.prototype.slice.call(arguments);

return run(ast,new LEXEnv(env,params,arguments));
};

f["____macro"]=false,f["____meta"]=null,f["____ast"]=ast,f["____genenv"]=function () {
let ____args;
____args= Array.prototype.slice.call(arguments);

return new LEXEnv(env,params,____args[0]);
};
return f;
}).call(this);
}

//
function computeLoop(ast,env) {
let ok_QUERY,ret;
ok_QUERY= true;
ret= null;

(function() {
for (let ____break=false; ((!____break)&&ok_QUERY); ){
ast=macroexpand(ast,env);
ok_QUERY=((!std.list_QUERY(ast)) ?
(function() {
let G__1;
G__1= false;

ret=evalAst(ast,env);
return G__1;
}).call(this) :
((0 === ast.length) ?
(function() {
let G__2;
G__2= false;

ret=ast;
return G__2;
}).call(this) :
(("and*" === ast[0].toString()) ?
(function() {
let G__3;
G__3= false;

ret=handleAND(ast,env);
return G__3;
}).call(this) :
(("or*" === ast[0].toString()) ?
(function() {
let G__4;
G__4= false;

ret=handleOR(ast,env);
return G__4;
}).call(this) :
(("def*" === ast[0].toString()) ?
(function() {
let G__5;
G__5= false;

ret=env.set(a1,compute(a2,env));
return G__5;
}).call(this) :
(("let*" === ast[0].toString()) ?
(function() {
let rc;
rc= handleLet(ast,env);

ast=rc[1];
env=rc[2];
return rc[0];
}).call(this) :
(("quote" === ast[0].toString()) ?
(function() {
let G__6;
G__6= false;

ret=ast[1];
return G__6;
}).call(this) :
(("quasiquote" === ast[0].toString()) ?
(function() {
let G__7;
G__7= true;

ast=quasiquote(ast[1]);
return G__7;
}).call(this) :
(("defmacro" === ast[0].toString()) ?
(function() {
let G__8;
G__8= false;

ret=handleMacro(ast,env);
return G__8;
}).call(this) :
(("macroexpand" === ast[0].toString()) ?
(function() {
let G__9;
G__9= false;

ret=macroexpand(ast[1],env);
return G__9;
}).call(this) :
(("try*" === ast[0].toString()) ?
(function() {
let G__10;
G__10= false;

ret=handleTry(ast,env);
return G__10;
}).call(this) :
(("do*" === ast[0].toString()) ?
(function() {
let G__11;
G__11= true;

evalAst(ast.slice(1,-1),env);
ast=ast[(ast.length-1)];
return G__11;
}).call(this) :
(("if*" === ast[0].toString()) ?
(function() {
let G__12;
G__12= true;

ast=handleIf(ast,env);
return G__12;
}).call(this) :
(("fn*" === ast[0].toString()) ?
(function() {
let G__13;
G__13= false;

ret=fn_wrap(compute,ast[2],env,ast[1]);
return G__13;
}).call(this) :
(true ?
(function() {
let rc;
rc= handleForm(ast,env);

(rc[0] ?
(function() {
ast=rc[1];
return env=rc[2];
}).call(this) :
(function() {
return ret=rc[1];
}).call(this));
return rc[0];
}).call(this) :
null)))))))))))))));
}
})(this);

return ret;
}

//
function compute(ast,env) {
((!env) ?
env=global_env :
null);
let ret;
ret= computeLoop(ast,env);

return ((typeof(ret) === "undefined") ?
null :
ret);
}

//
function show(exp) {
return std.prn(exp);
}

//
function newEnv() {
return (function() {
let ret;
ret= new LEXEnv();

(function() {
let G__14;
G__14= rt;

return Object.entries(G__14).forEach(function (e) {
return (function (v,k) {
return ret.set(std.symbol(k),v);
})(e[1],e[0]);
});
}).call(this);
ret.set(std.symbol("eval"),function (ast) {
return compute(ast,ret);
});
ret.set(std.symbol("*ARGV*"),[]);
ret.set(std.symbol("*host-language*"),"javascript");
ret.set(std.symbol("*gensym-counter*"),std.atom(0));
return ret;
}).call(this);
}

let prefix;
prefix= "kirby> ";

let run_repl;
run_repl= function () {
let rl;
rl= readline.createInterface(process.stdin,process.stdout);

rl.on("line",function (line) {
(function() {
try {
return (line ?
(console ?
console.log([ rep(line) ].join("")) :
null) :
null);

} catch (err) {
return (console ?
console.log([ err ].join("")) :
null);

}
}).call(this);
rl.setPrompt(prefix,prefix.length);
return rl.prompt();
});
rl.on("close",function () {
(console ?
console.log([ "Bye!" ].join("")) :
null);
return process.exit(0);
});
(console ?
console.log([ prefix,"Kirby REPL v1.0.0" ].join("")) :
null);
rl.setPrompt(prefix,prefix.length);
return rl.prompt();
};

let rep;
rep= function () {
let ____args;
____args= Array.prototype.slice.call(arguments);

return show(compute(readAST(____args[0])));
};

let global_env;
global_env= new LEXEnv();

//
function runRepl() {
init();
return run_repl();
}

let macro_assert;
macro_assert= "\n  (defmacro assert* [c msg] (if* c true (throw* msg)))";

let macro_cond;
macro_cond= "\n  (defmacro cond* [&xs]\n    (if* (> (count* xs) 0)\n      (list* 'if*\n            (first* xs)\n            (nth* xs 1)\n            (cons* 'cond* (rest* (rest* xs))))))";

//
function init() {
global_env=newEnv();
global_env.set(std.symbol("*host-language*"),"javascript");
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

