/*Auto generated by Kirby - v1.0.0 czlab.kirby.bl.parser Wed Nov 22 2017 10:44:02 GMT+1100 (AEDT)*/

const std = require("./stdlib");
const lambda_DASH_arg = std["lambda_DASH_arg"];
const object_QUERY = std["object_QUERY"];
const nichts_QUERY = std["nichts_QUERY"];
const count = std["count"];
const into_BANG = std["into_BANG"];
const vector = std["vector"];
const conj_BANG = std["conj_BANG"];
const opt_QUERY__QUERY = std["opt_QUERY__QUERY"];
const symbol = std["symbol"];
const keyword = std["keyword"];
const rdr = require("./lexer");
const kirbystdlibref = std;
const tnodeEx = rdr.tnodeEx();
const tnode = rdr.tnode();
//Raise an error
const throwE = function(token) {
  let msgs = Array.prototype.slice.call(arguments, 1);
  let s = msgs.join("");
  return (token ?
    (function() {
      throw new Error([s, "\nnear line: ", token.line, "\nin file: ", token.source].join("")) ;
    }).call(this) :
    (function() {
      throw new Error([s, "\nnear EOF "].join("")) ;
    }).call(this));
}
//Returns the next token,
//updates the token index
const nextToken = function(tokens) {
  let t = peekToken(tokens);
  ++tokens.pos;
  return t;
}
//Returns the next token,
//without moving the token index
const peekToken = function(tokens) {
  return tokens[tokens.pos];
}
//Attach source level information
//to the node
const copyTokenData = function(token, node) {
  if (object_QUERY(node)) {
    (node["source"] = token.source, node["line"] = token.line, node["column"] = token.column);
  }
  return node;
}
//Process an atom
const readAtom = function(tokens) {
  let ret = null;
  let tn = "";
  let token = nextToken(tokens);
  if (token) {
    tn = token.name;
  }
  if ( (0 === kirbystdlibref.count(tn)) ) {
    ret = undefined;
  } else {
    if (rdr.REGEX.float.test(tn)) {
      ret = parseFloat(tn);
    } else {
      if ( (rdr.REGEX.hex.test(tn) || rdr.REGEX.int.test(tn)) ) {
        ret = parseInt(tn);
      } else {
        if ( (tn.startsWith("\"") && tn.endsWith("\"")) ) {
          ret = tn;
        } else {
          if (tn.startsWith(":")) {
            ret = keyword(tn);
          } else {
            if (tn.startsWith("%")) {
              ret = lambda_DASH_arg(tn);
            } else {
              if ( (("nil" === tn) || ("null" === tn)) ) {
                ret = null;
              } else {
                if ( (("#t" === tn) || ("true" === tn)) ) {
                  ret = true;
                } else {
                  if ( (("#f" === tn) || ("false" === tn)) ) {
                    ret = false;
                  } else {
                    if (true) {
                      ret = symbol(tn);
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  return copyTokenData(token, ret);
}
//Process a LISP form
const readBlock = function(tokens, head, tail) {
  let ast = [];
  let ok_QUERY = true;
  let token = nextToken(tokens);
  let ret,
    cur,
    tn;
  if (token) {
    tn = token.name;
  }
  if ( (tn !== head) ) {
    throwE(token, "expected '", head, "'");
  }
  cur = peekToken(tokens);
  for (let ____break = false; ((!____break) && ok_QUERY);) {
    if ( (nichts_QUERY(cur) || (tail === cur.name)) ) {
      if (cur) {
        copyTokenData(token, ast);
      } else {
        throwE(cur, "expected '", tail, "', got EOF");
      }
      ok_QUERY = false;
    }
    if (ok_QUERY) {
      addAst(ast, read_STAR(tokens));
      cur = peekToken(tokens);
    }
  }
  nextToken(tokens);
  return ast;
}
//Process an expression
const readList = function(cur, tokens) {
  return readBlock(tokens, "(", ")");
}
//Process a Vector
const readVector = function(cur, tokens) {
  return into_BANG("vector", readBlock(tokens, "[", "]"));
}
//Process a Hashmap
const readMap = function(cur, tokens) {
  return into_BANG("map", readBlock(tokens, "{", "}"));
}
//Advance the token index,
//then continue to parse
const skip_PLUS_parse = function(tokens, func) {
  return copyTokenData(nextToken(tokens), func(tokens));
}
//Inner parser routine
const read_STAR = function(tokens) {
  let tmp = null;
  let token = peekToken(tokens);
  return (nichts_QUERY(token) ?
    undefined :
    (function() {
      let S____3;
      switch (token.name) {
        case "'":
          S____3 = skip_PLUS_parse(tokens, function() {
            let ____args = Array.prototype.slice.call(arguments);
            return [symbol("quote"), read_STAR(tokens)];
          });
          break;
        case "`":
          S____3 = skip_PLUS_parse(tokens, function() {
            let ____args = Array.prototype.slice.call(arguments);
            return [symbol("quasiquote"), read_STAR(tokens)];
          });
          break;
        case "~":
          S____3 = skip_PLUS_parse(tokens, function() {
            let ____args = Array.prototype.slice.call(arguments);
            return [symbol("unquote"), read_STAR(tokens)];
          });
          break;
        case "~@":
          S____3 = skip_PLUS_parse(tokens, function() {
            let ____args = Array.prototype.slice.call(arguments);
            return [symbol("splice-unquote"), read_STAR(tokens)];
          });
          break;
        case "^":
          S____3 = skip_PLUS_parse(tokens, function() {
            tmp = read_STAR(tokens);
            return [symbol("with-meta"), read_STAR(tokens), tmp];
          });
          break;
        case "@":
          S____3 = skip_PLUS_parse(tokens, function() {
            let ____args = Array.prototype.slice.call(arguments);
            return [symbol("deref"), read_STAR(tokens)];
          });
          break;
        case "$":
          S____3 = skip_PLUS_parse(tokens, function() {
            let ____args = Array.prototype.slice.call(arguments);
            return (function() {
              let y = read_STAR(tokens);
              let x = symbol("str");
              if ( (y.length > 1) ) {
                y = [x, y];
              } else {
                y.unshift(x);
              }
              return y;
            }).call(this);
          });
          break;
        case "#":
          S____3 = skip_PLUS_parse(tokens, function() {
            let ____args = Array.prototype.slice.call(arguments);
            return [symbol("lambda"), read_STAR(tokens)];
          });
          break;
        case ")":
          S____3 = throwE(token, "unexpected ')'");
          break;
        case "(":
          S____3 = readList(token, tokens);
          break;
        case "]":
          S____3 = throwE(token, "unexpected ']'");
          break;
        case "[":
          S____3 = readVector(token, tokens);
          break;
        case "}":
          S____3 = throwE(token, "unexpected '}'");
          break;
        case "{":
          S____3 = readMap(token, tokens);
          break;
        case ";":
        case ",":
          S____3 = (function() {
            let G__1 = undefined;
            nextToken(tokens);
            return G__1;
          }).call(this);
          break;
        default:
          S____3 = readAtom(tokens);
          break;
      }
      return S____3;
    }).call(this));
}
//
const addAst = function(ast, f) {
  if ( (!(typeof (f) === "undefined")) ) {
    conj_BANG(ast, f);
  }
  return ast;
}
//Main parser routine
const parser = function(source) {
  let G____4 = Array.prototype.slice.call(arguments, 1);
  let fname = G____4[0];
  let tokens = rdr.lexer(source, opt_QUERY__QUERY(fname, "*adhoc*"));
  let f = null;
  let ast = [];
  let tlen = count(tokens);
  tokens.pos = 0;
  for (let ____break = false; ((!____break) && (tokens.pos < tlen));) {
    addAst(ast, read_STAR(tokens));
  }
  return ast;
}
//Debug and dump the AST
const dumpTree = function(tree) {
  return (function() {
    for (let i = 0, sz = count(tree), ____break = false; ((!____break) && (i < sz)); i = (i + 1)) {
      if (console) {
        console.log([prn(tree[i])].join(""));
      }
    }
  }).call(this);
}
module.exports = {
  parser: parser,
  dumpTree: dumpTree
};