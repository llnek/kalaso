/*Auto generated by Kirby - v1.0.0 czlab.kirby.bl.lexer Mon Nov 06 2017 23:09:22 GMT-0800 (PST)*/

var std= require("./stdlib");
var G____2= require("source-map");
var TreeNode=G____2["SourceNode"];
var kirbystdlibref=std;

//
function tnodeEx(chunk,name) {
return tnode(null,null,null,chunk,name);
}

//
function tnode() {
let G____3=Array.prototype.slice.call(arguments,0);
let G____4= G____3;
let source,line,col,chunk,name;
source=G____4[0];
line=G____4[1];
col=G____4[2];
chunk=G____4[3];
name=G____4[4];
return new TreeNode(line,col,source,chunk,std.opt(name,""));
}

let REGEX;
REGEX= { noret: /^def\b|^var\b|^set!\b|^set-in!\b|^throw\b/,id: /^[a-zA-Z_$][\/.?\-*!0-9a-zA-Z_'<>%#@$\+]*$/,id2: /^[*\-][\/.?\-*!0-9a-zA-Z_'<>%#@$\+]+$/,float: /^[-+]?[0-9]+\.[0-9]+$/,int: /^[-+]?[0-9]+$/,hex: /^[-+]?0x/,dquoteHat: /^"/,dquoteEnd: /"$/,func: /^function\b/,slash: /\//g,query: /\?/g,perc: /%/g,bang: /!/g,plus: /\+/g,dash: /-/g,quote: /'/g,hash: /#/g,at: /@/g,less: /</g,greater: />/g,star: /\*/g,wspace: /\s/ };

//
function testid_QUERY(name) {
return (REGEX.id.test(name)||REGEX.id2.test(name));
}

//
function jsid(name) {
let pfx;
pfx= "";

(((typeof(name) === "string")&&("-" === name.charAt(0))) ?
(function() {
pfx="-";
return name=name.slice(1);
}).call(this) :
null);
return (testid_QUERY(name) ?
[pfx,name].join("").replace(REGEX.query,"_QUERY").replace(REGEX.slash,".").replace(REGEX.bang,"_BANG").replace(REGEX.dash,"_DASH").replace(REGEX.quote,"_QUOTE").replace(REGEX.hash,"_HASH").replace(REGEX.plus,"_PLUS").replace(REGEX.perc,"_PERC").replace(REGEX.at,"_AT").replace(REGEX.less,"_LT").replace(REGEX.greater,"_GT").replace(REGEX.star,"_STAR") :
((pfx === "") ?
name :
[pfx,name].join("")));
}

//
function lexer(source,fname) {
let len,token,line,tcol,col,pos,ch,nx,esc_QUERY,str_QUERY,regex_QUERY,comment_QUERY;
len= source.length;
token= "";
line= 1;
tcol= 0;
col= 0;
pos= 0;
ch= null;
nx= null;
esc_QUERY= false;
str_QUERY= false;
regex_QUERY= false;
comment_QUERY= false;

return (function() {
let tree;
tree= std.list();

let toke;
toke= function (ln,col,s,s_QUERY) {
(std.opt(s_QUERY,std.not_DASHempty(s)) ?
std.conj_BANG(tree,tnode(fname,ln,col,s,s)) :
null);
return "";
};

(function() {
for (let ____break=false; ((!____break)&&(pos < len)); ){
ch=source.charAt(pos);
++col;
++pos;
nx=source.charAt(pos);
((ch === "\n") ?
(function() {
col=0;
++line;
return (comment_QUERY ?
comment_QUERY=false :
null);
}).call(this) :
null);
(comment_QUERY ?
null :
(esc_QUERY ?
(function() {
esc_QUERY=false;
return token += ch;
}).call(this) :
(regex_QUERY ?
(function() {
((ch === "\\") ?
esc_QUERY=true :
null);
token += ch;
return ((ch === "/") ?
(function() {
regex_QUERY=false;
("gimuy".includes(nx) ?
(function() {
token += nx;
return ++pos;
}).call(this) :
null);
return token=toke(line,tcol,token);
}).call(this) :
null);
}).call(this) :
((ch === "\"") ?
((!str_QUERY) ?
(function() {
tcol=col;
str_QUERY=true;
return token += ch;
}).call(this) :
(function() {
str_QUERY=false;
token += ch;
return token=toke(line,tcol,token,true);
}).call(this)) :
(str_QUERY ?
(function() {
((ch === "\n") ?
ch="\\n" :
null);
((ch === "\\") ?
esc_QUERY=true :
null);
return token += ch;
}).call(this) :
(((ch === "'")||(ch === "`")||(ch === "@")||(ch === "^")) ?
(((0 === kirbystdlibref.count(token))&&(!REGEX.wspace.test(nx))) ?
(function() {
tcol=col;
return toke(line,tcol,ch);
}).call(this) :
token += ch) :
(((ch === "&")&&(nx === "&")) ?
(function() {
((0 === kirbystdlibref.count(token)) ?
tcol=col :
null);
token += [ch,nx].join("");
return ++pos;
}).call(this) :
((ch === "~") ?
(((0 === kirbystdlibref.count(token))&&(!REGEX.wspace.test(nx))) ?
(function() {
tcol=col;
return ((nx === "@") ?
(function() {
++pos;
return toke(line,tcol,"~@");
}).call(this) :
toke(line,tcol,ch));
}).call(this) :
token += ch) :
(((ch === "/")&&(0 === kirbystdlibref.count(token))) ?
(function() {
regex_QUERY=true;
tcol=col;
return token += ch;
}).call(this) :
(((ch === "[")||(ch === "]")||(ch === "{")||(ch === "}")||(ch === "(")||(ch === ")")) ?
(function() {
token=toke(line,tcol,token);
tcol=col;
return toke(line,tcol,ch);
}).call(this) :
((ch === ";") ?
(function() {
token=toke(line,tcol,token);
tcol=col;
return comment_QUERY=true;
}).call(this) :
(((ch === ",")||REGEX.wspace.test(ch)) ?
token=toke(((ch === "\n") ?
(line-1) :
line),tcol,token) :
(true ?
(function() {
((0 === kirbystdlibref.count(token)) ?
tcol=col :
null);
return token += ch;
}).call(this) :
null)))))))))))));
}
}).call(this);
return tree;
}).call(this);
}



module.exports = {
tnodeEx: tnodeEx,
tnode: tnode,
REGEX: REGEX,
testid_QUERY: testid_QUERY,
jsid: jsid,
lexer: lexer
};

