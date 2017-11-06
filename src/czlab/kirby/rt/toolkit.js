/*Auto generated by Kirby - v1.0.0 czlab.kirby.rt.toolkit Mon Nov 06 2017 02:57:53 GMT-0800 (PST)*/

var fs= require("fs");
var std= require("../bl/stdlib");
var LambdaArg=std["LambdaArg"];
var Keyword=std["Keyword"];
var Symbol=std["Symbol"];
var Atom=std["Atom"];
var kirbystdlibref=std;




//
Function.prototype.clone = function () {
let that;
that= this;

return (function() {
let tmp;
tmp= function () {
let ____args;
____args= Array.prototype.slice.call(arguments);

return that.apply(this,arguments);
};

(function() {
let G__1;
G__1= that;

return Object.entries(G__1).forEach(function (e) {
return (function (v,k) {
return tmp[k]=v;
})(e[1],e[0]);
});
}).call(this);
return tmp;
}).call(this);
}

//
function prn_str() {
let xs=Array.prototype.slice.call(arguments,0);
return xs.map(function () {
let ____args;
____args= Array.prototype.slice.call(arguments);

return std.prn(____args[0],true);
}).join(" ");
}

//
function prnice() {
let xs=Array.prototype.slice.call(arguments,0);
return xs.map(function () {
let ____args;
____args= Array.prototype.slice.call(arguments);

return std.prn(____args[0],true);
}).forEach(function (s) {
return (console ?
console.log([ s ].join("")) :
null);
});
}

//
function slurp(f) {
return fs.readFileSync(f,"utf-8");
}

//
function timeMillis() {
return new Date().getTime();
}

//
function object() {
let xs=Array.prototype.slice.call(arguments,0);
return ((0 === kirbystdlibref.count(xs)) ?
{} :
assoc.apply(this,[ {} ].concat(xs)));
}

//
function assoc(src) {
let xs=Array.prototype.slice.call(arguments,1);
((!(0 === (xs.length%2))) ?
(function (){ throw new Error("Odd number of assoc arguments"); })(this) :
null);
return (function() {
let ret;
ret= clone(src);

(function() {
for (let i=0,k=null,v=null,____break=false; ((!____break)&&(i < xs.length)); i=(i+2)){
k=["",xs[i]].join("");
v=xs[(i+1)];
((!(typeof(k) === "string")) ?
(function (){ throw new Error([ "expected string, got: ",typeof(k) ].join("")); })(this) :
null);
ret[k]=v;
}
}).call(this)

return ret;
}).call(this);
}

//
function dissoc(src) {
let xs=Array.prototype.slice.call(arguments,1);
return (function() {
let ret;
ret= clone(src);

(function() {
for (let i=0,____break=false; ((!____break)&&(i < xs.length)); i=(i+1)){
delete ret[xs[i]];
}
}).call(this)

return ret;
}).call(this);
}

//
function clone(obj) {
return (function() {
let ret;
ret= null;

(function() { let ____x;
switch (std.typeid(obj)) {
case "list":
____x= ret=Array.prototype.slice.call(obj);
break;
case "vector":
____x= (function() {
let G__2;
G__2= ret;

G__2=Array.prototype.slice.call(obj);
G__2["____vec"]=true;
return G__2;
}).call(this);
break;
case "hash-map":
____x= (function() {
let G__3;
G__3= ret;

G__3=Array.prototype.slice.call(obj);
G__3["____map"]=true;
return G__3;
}).call(this);
break;
case "object":
____x= ret=Object.keys(obj).reduce(function (acc,n) {
acc[n]=obj[n];
return acc;
},{});
break;
case "function":
____x= ret=obj.clone();
break;
default:
____x= (function (){ throw new Error([ "clone of non-collection: ",std.typeid(obj) ].join("")); })(this);
break;
}
return ____x;}).call(this);
Object.defineProperty(ret,"____meta",{ "enumerable": false,"writable": true });
return ret;
}).call(this);
}

//
function cons(a,b) {
return [ a ].concat(b);
}

//
function conj(arr) {
let xs=Array.prototype.slice.call(arguments,1);
return (std.list_QUERY(arr) ?
xs.reverse().concat(arr) :
(std.some_QUERY(arr) ?
(function() {
let v;
v= arr.concat(xs);

v["____vec"]=true;
return v;
}).call(this) :
(true ?
arr :
null)));
}

//
function seq(obj) {
return (std.list_QUERY(obj) ?
(std.not_empty(obj) ?
obj :
null) :
(std.vector_QUERY(obj) ?
(std.not_empty(obj) ?
Array.prototype.slice.call(obj) :
null) :
((typeof(obj) === "string") ?
(std.not_empty(obj) ?
obj.split("") :
null) :
((obj === null) ?
null :
(true ?
(function (){ throw new Error("seq: called on non-sequence"); })(this) :
null)))));
}

//
function fapply(f) {
let xs=Array.prototype.slice.call(arguments,1);
return f.apply(this,xs);
}

//
function fmap(f,arr) {
return arr.map(f);
}

let GLOBAL;
GLOBAL= ((typeof(window) === "undefined") ?
undefined :
window);

//
function resolveJS(s) {
return [ (std.contains_QUERY(s,".") ?
eval(/^(.*)\.[^\.]*$/g.exec(s)[1]) :
GLOBAL),eval(s) ];
}

//
function filterJS(obj) {
let s;
s= std.stringify(obj);

return (std.not_empty(s) ?
JSON.parse(s) :
null);
}

//
function withMeta(obj,m) {
return (function() {
let ret;
ret= clone(obj);

ret["____meta"]=m;
return ret;
}).call(this);
}

//
function jsObject_QUERY(m) {
return (std.object_QUERY(m)&&(!(m instanceof LambdaArg))&&(!(m instanceof Atom))&&(!(m instanceof Symbol))&&(!(m instanceof Keyword)));
}

//
function meta(obj) {
(((!std.sequential_QUERY(obj))&&(!std.map_QUERY(obj))&&(!jsObject_QUERY(obj))&&(!(typeof(obj) === "function"))) ?
(function (){ throw new Error([ "can't get metadata from: ",std.typeid(obj) ].join("")); })(this) :
null);
return obj["____meta"];
}

//
function evalJS(s) {
return filterJS(eval(s.toString()));
}

//
function invokeJS(method) {
let xs=Array.prototype.slice.call(arguments,1);
let res;
let G____3= resolveJS(method);
let obj,f;
obj=G____3[0];
f=G____3[1];
res= f.apply(obj,xs);

return filterJS(res);
}

let gensym_counter;
gensym_counter= std.atom(0);

//
function gensym() {
let G____4=Array.prototype.slice.call(arguments,0);
let G____5= G____4;
let pfx;
pfx=G____5[0];
return std.symbol([(pfx||"G__"),std.swap_BANG(gensym_counter,function (x) {
return (x+1);
})].join(""));
}

module.exports={ "is-same?": function (a,b) {
return (a == b);
},"obj-type*": std.typeid,"gensym*": gensym,"is-eq?": std.eq_QUERY,"is-nil?": function (x) {
return (x === null);
},"is-some?": std.some_QUERY,"slice*": function (arr) {
let xs=Array.prototype.slice.call(arguments,1);
return Array.prototype.slice.apply(arr,xs);
},"throw*": function () {
let xs=Array.prototype.slice.call(arguments,0);
return (function (){ throw new Error(xs.join("")); })(this);
},"#f?": function (x) {
return (false === x);
},"#t?": function (x) {
return (true === x);
},"is-str?": function (x) {
return (typeof(x) === "string");
},"symbol*": std.symbol,"is-symbol?": std.symbol_QUERY,"keyword*": std.keyword,"is-keyword?": std.keyword_QUERY,"println*": prnice,"prn*": prn_str,"slurp*": slurp,"<": function (a,b) {
return (a < b);
},"<=": function (a,b) {
return (a <= b);
},">": function (a,b) {
return (a > b);
},">=": function (a,b) {
return (a >= b);
},"+": function (a,b) {
return (a+b);
},"-": function (a,b) {
return (a-b);
},"*": function (a,b) {
return (a*b);
},"/": function (a,b) {
return (a/b);
},"time*": timeMillis,"list*": std.list,"is-list?": std.list_QUERY,"vector*": std.vector,"is-vector?": std.vector_QUERY,"hash-map*": std.hashmap,"is-map?": std.map_QUERY,"dissoc*": dissoc,"assoc*": assoc,"is-contains?": std.contains_QUERY,"get*": function (m,k) {
return m[k];
},"keys*": function (x) {
return Object.keys(x);
},"values*": function (x) {
return Object.values(x);
},"dec*": function (x) {
return (x-1);
},"inc*": function (x) {
return (x+1);
},"not*": function (x) {
return (x ?
false :
true);
},"is-even?": function (n) {
return (0 === (n%2));
},"is-odd?": function (n) {
return (1 === (n%2));
},"is-sequential?": std.sequential_QUERY,"cons*": cons,"concat*": std.concat_STAR,"nth*": function (arr,i) {
return arr[i];
},"first*": function (arr) {
return arr[0];
},"rest*": function (arr) {
return (arr ?
arr.slice(1) :
[]);
},"is-empty?": std.empty_QUERY,"not-empty*": std.not_empty,"count*": std.count,"apply*": fapply,"map*": fmap,"type*": function (x) {
return typeof(x);
},"evens*": std.evens,"odds*": std.odds,"conj*": conj,"seq*": seq,"with-meta*": withMeta,"meta*": meta,"atom*": std.atom,"is-atom?": std.atom_QUERY,"deref*": std.deref,"reset*": std.reset_BANG,"swap*": std.swap_BANG,"js-eval*": evalJS,"js*": invokeJS }
