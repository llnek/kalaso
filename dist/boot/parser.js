/*Auto generated by Kirby - v1.0.0 czlab.kirby.parser Fri Dec 15 2017 22:53:22 GMT-0800 (PST)*/

const std = require("./stdlib");
const lambda_DASH_arg = std["lambda_DASH_arg"];
const object_QUERY = std["object_QUERY"];
const nichts_QUERY = std["nichts_QUERY"];
const count = std["count"];
const into_BANG = std["into_BANG"];
const vector = std["vector"];
const conj_BANG = std["conj_BANG"];
const prn = std["prn"];
const wrap_DASH_str = std["wrap_DASH_str"];
const list_QUERY = std["list_QUERY"];
const vector_QUERY = std["vector_QUERY"];
const map_QUERY = std["map_QUERY"];
const escXml = std["escXml"];
const symbol_QUERY = std["symbol_QUERY"];
const keyword_QUERY = std["keyword_QUERY"];
const lambda_DASH_arg_QUERY = std["lambda_DASH_arg_QUERY"];
const slice = std["slice"];
const opt_QUERY__QUERY = std["opt_QUERY__QUERY"];
const symbol = std["symbol"];
const primitive_QUERY = std["primitive_QUERY"];
const keyword = std["keyword"];
const contains_QUERY = std["contains_QUERY"];
const list = std["list"];
const not_DASH_empty = std["not_DASH_empty"];
const kirbystdlibref = std;
class Token {
  ////////////////////////////////////////////////////////////////////////////////
  //name: [constructor] in file: parser.ky near line: 22
  constructor(source, line, column, value) {
    (this["source"] = source, this["value"] = value, this["line"] = line, this["column"] = column);
    return this;
  }
  ////////////////////////////////////////////////////////////////////////////////
  //name: [toString] in file: parser.ky near line: 28
  toString() {
    return this.value;
  }
}
////////////////////////////////////////////////////////////////////////////////
//name: [mkToken] in file: parser.ky near line: 31
//Create a token
const mkToken = function(source, line, col, chunk) {
  return new Token(source, line, col, chunk);
};
const REGEX = {
  id: /^[a-zA-Z_$][\/.?\-*!0-9a-zA-Z_'<>%#@$\+]*$/,
  id2: /^[*\-][\/.?\-*!0-9a-zA-Z_'<>%#@$\+]+$/,
  float: /^[-+]?[0-9]+\.[0-9]+$/,
  int: /^[-+]?[0-9]+$/,
  hex: /^[-+]?0x/,
  dquoteHat: /^"/,
  dquoteEnd: /"$/,
  func: /^function\b/,
  slash: /\//g,
  query: /\?/g,
  perc: /%/g,
  bang: /!/g,
  plus: /\+/g,
  dash: /-/g,
  quote: /'/g,
  hash: /#/g,
  at: /@/g,
  less: /</g,
  greater: />/g,
  star: /\*/g,
  wspace: /\s/
};
const REPLACERS = [[REGEX.query, "_QUERY_"], [REGEX.bang, "_BANG_"], [REGEX.dash, "_DASH_"], [REGEX.quote, "_QUOTE_"], [REGEX.hash, "_HASH_"], [REGEX.plus, "_PLUS_"], [REGEX.perc, "_PERC_"], [REGEX.at, "_AT_"], [REGEX.less, "_LT_"], [REGEX.greater, "_GT_"], [REGEX.star, "_STAR_"]];
////////////////////////////////////////////////////////////////////////////////
//name: [testid?] in file: parser.ky near line: 66
//Returns true
//if a valid js identifier
const testid_QUERY = function(name) {
  return (REGEX.id.test(name) || REGEX.id2.test(name));
};
////////////////////////////////////////////////////////////////////////////////
//name: [jsid] in file: parser.ky near line: 71
//Escape to
//compliant js identifier
const jsid = function(input) {
  let pfx = "";
  let name = [input].join("");
  if ( (name && name.startsWith("-")) ) {
    (pfx = "-", name = name.slice(1));
  }
  return (testid_QUERY(name) ?
    REPLACERS.reduce(function(acc, x) {
      acc = acc.replace(x[0], x[1]);
      return (acc.endsWith(x[1]) ?
        acc.slice(0, -1) :
        acc);
    }, [pfx, name].join("").replace(REGEX.slash, ".")) :
    ((pfx === "") ?
      name :
      [pfx, name].join("")));
};
////////////////////////////////////////////////////////////////////////////////
//name: [lexer] in file: parser.ky near line: 91
//Lexical analyzer
const lexer = function(source, fname) {
  let fform_QUERY = false;
  let esc_QUERY = false;
  let str_QUERY = false;
  let regex_QUERY = false;
  let comment_QUERY = false;
  let len = kirbystdlibref.count(source);
  let token = "";
  let line = 1;
  let ch = null;
  let nx = null;
  let col = 0;
  let pos = 0;
  let tline = line;
  let tree = [];
  let tcol = col;
  let toke = function(ln, col, s, s_QUERY) {
    if (opt_QUERY__QUERY(s_QUERY, not_DASH_empty(s))) {
      if ( (s.startsWith("&") && (s !== "&&") && (s.length > 1)) ) {
        conj_BANG(tree, mkToken(fname, ln, col, "&"));
        s = s.slice(1);
      }
      conj_BANG(tree, mkToken(fname, ln, col, s));
    }
    return "";
  };
  for (let ____break = false; ((!____break) && (pos < len));) {
    ch = source.charAt(pos);
    ++col;
    ++pos;
    nx = source.charAt(pos);
    if ( (ch === "\n") ) {
      col = 0;
      ++line;
      if (comment_QUERY) {
        comment_QUERY = false;
      }
    }
    if (comment_QUERY) {
      null;
    } else {
      if (esc_QUERY) {
        esc_QUERY = false;
        token += ch;
      } else {
        if (regex_QUERY) {
          if ( (ch === "\\") ) {
            esc_QUERY = true;
          }
          token += ch;
          if ( (ch === "/") ) {
            regex_QUERY = false;
            if (contains_QUERY("gimuy", nx)) {
              token += nx;
              ++pos;
            }
            token = toke(tline, tcol, token);
          }
        } else {
          if (fform_QUERY) {
            if ( ((ch === "`") && (nx === "`") && (source.charAt((pos + 1)) === "`")) ) {
              fform_QUERY = false;
              pos += 2;
              token += "\"";
              token = toke(tline, tcol, token, true);
            } else {
              if ( (ch === "\"") ) {
                token += "\\\"";
              } else {
                if ( (ch === "\n") ) {
                  token += "\\n";
                } else {
                  if ( (ch === "\\") ) {
                    if ( ((nx === "n") || (nx === "r") || (nx === "u") || (nx === "t") || (nx === "f") || (nx === "v")) ) {
                      token += ch;
                    } else {
                      token += "\\\\";
                    }
                  } else {
                    if (true) {
                      token += ch;
                    }
                  }
                }
              }
            }
          } else {
            if ( ((ch === "`") && (nx === "`") && (source.charAt((pos + 1)) === "`") && (0 === kirbystdlibref.count(token))) ) {
              (tline = line, tcol = col);
              pos += 2;
              fform_QUERY = true;
              token += "\"";
            } else {
              if ( (ch === "\"") ) {
                if ( (!str_QUERY) ) {
                  (tline = line, tcol = col);
                  str_QUERY = true;
                  token += ch;
                } else {
                  str_QUERY = false;
                  token += ch;
                  token = toke(tline, tcol, token, true);
                }
              } else {
                if (str_QUERY) {
                  if ( (ch === "\n") ) {
                    ch = "\\n";
                  }
                  if ( (ch === "\\") ) {
                    esc_QUERY = true;
                  }
                  token += ch;
                } else {
                  if ( ((ch === "'") || (ch === "`") || (ch === "$") || (ch === "@") || (ch === "^")) ) {
                    if ( ((0 === kirbystdlibref.count(token)) && (!REGEX.wspace.test(nx))) ) {
                      (tline = line, tcol = col);
                      toke(tline, tcol, ch);
                    } else {
                      token += ch;
                    }
                  } else {
                    if ( ((ch === "&") && (nx === "&")) ) {
                      if ( (0 === kirbystdlibref.count(token)) ) {
                        (tline = line, tcol = col);
                      }
                      token += [ch, nx].join("");
                      ++pos;
                    } else {
                      if ( (ch === "~") ) {
                        if ( ((0 === kirbystdlibref.count(token)) && (!REGEX.wspace.test(nx))) ) {
                          (tline = line, tcol = col);
                          if ( (nx === "@") ) {
                            ++pos;
                            toke(tline, tcol, "~@");
                          } else {
                            toke(tline, tcol, ch);
                          }
                        } else {
                          token += ch;
                        }
                      } else {
                        if ( ((ch === "#") && (nx === "/") && (0 === kirbystdlibref.count(token))) ) {
                          regex_QUERY = true;
                          (tline = line, tcol = col);
                          ++pos;
                          token += nx;
                        } else {
                          if ( ((ch === "[") || (ch === "]") || (ch === "{") || (ch === "}") || (ch === "(") || (ch === ")")) ) {
                            (token = toke(tline, tcol, token), tline = line, tcol = col);
                            toke(tline, tcol, ch);
                          } else {
                            if ( (ch === ";") ) {
                              (token = toke(tline, tcol, token), tline = line, tcol = col, comment_QUERY = true);
                            } else {
                              if ( ((ch === ",") || REGEX.wspace.test(ch)) ) {
                                token = toke(((ch === "\n") ?
                                  (tline - 1) :
                                  tline), tcol, token);
                              } else {
                                if (true) {
                                  if ( (0 === kirbystdlibref.count(token)) ) {
                                    (tline = line, tcol = col);
                                  }
                                  token += ch;
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
            }
          }
        }
      }
    }
  }
  let tmp = {
    "source": fname,
    "line": tline,
    "column": col
  };
  if (fform_QUERY) {
    throwE(tmp, "unterminated free-form");
  }
  if (esc_QUERY) {
    throwE(tmp, "incomplete escape");
  }
  if (str_QUERY) {
    throwE(tmp, "unterminated string");
  }
  if (regex_QUERY) {
    throwE(tmp, "unterminated regex definition");
  }
  return tree;
};
////////////////////////////////////////////////////////////////////////////////
//name: [throwE] in file: parser.ky near line: 225
//Raise an error
const throwE = function(token) {
  let msgs = Array.prototype.slice.call(arguments, 1);
  let s = msgs.join("");
  return (token ?
    (function() {
      throw new Error([s, "\nnear line: ", token.line, "\nin file: ", token.source].join("")) ;
    }).call(this) :
    (function() {
      throw new Error([s, "\nnear EOF"].join("")) ;
    }).call(this));
};
////////////////////////////////////////////////////////////////////////////////
//name: [popToken] in file: parser.ky near line: 235
//Returns the next token,
//updates the token index
const popToken = function(tokens) {
  let t = peekToken(tokens);
  ++tokens.pos;
  return t;
};
////////////////////////////////////////////////////////////////////////////////
//name: [peekToken] in file: parser.ky near line: 241
//Returns the next token,
//without moving the token index
const peekToken = function(tokens) {
  return tokens[tokens.pos];
};
////////////////////////////////////////////////////////////////////////////////
//name: [prevToken] in file: parser.ky near line: 246
//Returns the previous token
const prevToken = function(tokens) {
  return tokens[(tokens.pos - 1)];
};
////////////////////////////////////////////////////////////////////////////////
//name: [copyTokenData] in file: parser.ky near line: 250
//Attach source level information
//to the node
const copyTokenData = function(token, node) {
  if ( (object_QUERY(node) || Array.isArray(node)) ) {
    (node["source"] = token.source, node["line"] = token.line, node["column"] = token.column);
  }
  return node;
};
////////////////////////////////////////////////////////////////////////////////
//name: [readAtom] in file: parser.ky near line: 260
//Process an atom
const readAtom = function(tokens) {
  let token = popToken(tokens);
  let ret = null;
  let tn = token.value;
  if ( (0 === kirbystdlibref.count(tn)) ) {
    ret = undefined;
  } else {
    if (REGEX.float.test(tn)) {
      ret = parseFloat(tn);
    } else {
      if ( (REGEX.hex.test(tn) || REGEX.int.test(tn)) ) {
        ret = parseInt(tn);
      } else {
        if ( (tn.startsWith("\"") && tn.endsWith("\"")) ) {
          ret = std.unwrap_DASH_str(tn);
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
};
////////////////////////////////////////////////////////////////////////////////
//name: [readBlock] in file: parser.ky near line: 292
//Process a LISP form
const readBlock = function(tokens, head, tail) {
  let token = popToken(tokens);
  let ast = [];
  let ok_QUERY = true;
  let start = token;
  if ( (token.value !== head) ) {
    throwE(token, "expected '", head, "'");
  }
  for (let cur = peekToken(tokens), ____break = false; (!____break);) {
    if (nichts_QUERY(cur)) {
      throwE(start, "expected '", tail, "', got EOF");
    } else {
      if ( (tail === cur.value) ) {
        ____break = true;
      } else {
        if (true) {
          addAst(ast, read_STAR(tokens));
          cur = peekToken(tokens);
        }
      }
    }
  }
  popToken(tokens);
  return copyTokenData(start, ast);
};
////////////////////////////////////////////////////////////////////////////////
//name: [readList] in file: parser.ky near line: 312
//Process an expression
const readList = function(cur, tokens) {
  return readBlock(tokens, "(", ")");
};
////////////////////////////////////////////////////////////////////////////////
//name: [readVector] in file: parser.ky near line: 316
//Process a Vector
const readVector = function(cur, tokens) {
  return into_BANG("vector", readBlock(tokens, "[", "]"));
};
////////////////////////////////////////////////////////////////////////////////
//name: [readMap] in file: parser.ky near line: 321
//Process a Hashmap
const readMap = function(cur, tokens) {
  return into_BANG("map", readBlock(tokens, "{", "}"));
};
////////////////////////////////////////////////////////////////////////////////
//name: [skipParse] in file: parser.ky near line: 326
//Advance the token index,
//then continue to parse
const skipParse = function(tokens, func) {
  let t = popToken(tokens);
  let ret = func(tokens);
  let a1 = ret[0];
  copyTokenData(t, a1);
  return copyTokenData(t, ret);
};
////////////////////////////////////////////////////////////////////////////////
//name: [read*] in file: parser.ky near line: 336
//Inner parser routine
const read_STAR = function(tokens) {
  let tmp = null;
  let token = peekToken(tokens);
  return (nichts_QUERY(token) ?
    undefined :
    (function() {
      let S____2;
      switch (token.value) {
        case "'":
          S____2 = skipParse(tokens, function() {
            let ____args = Array.prototype.slice.call(arguments);
            return [kirbystdlibref.symbol("quote"), read_STAR(tokens)];
          });
          break;
        case "`":
          S____2 = skipParse(tokens, function() {
            let ____args = Array.prototype.slice.call(arguments);
            return [kirbystdlibref.symbol("quasiquote"), read_STAR(tokens)];
          });
          break;
        case "~":
          S____2 = skipParse(tokens, function() {
            let ____args = Array.prototype.slice.call(arguments);
            return [kirbystdlibref.symbol("unquote"), read_STAR(tokens)];
          });
          break;
        case "~@":
          S____2 = skipParse(tokens, function() {
            let ____args = Array.prototype.slice.call(arguments);
            return [kirbystdlibref.symbol("splice-unquote"), read_STAR(tokens)];
          });
          break;
        case "^":
          S____2 = skipParse(tokens, function() {
            tmp = read_STAR(tokens);
            return [kirbystdlibref.symbol("with-meta"), read_STAR(tokens), tmp];
          });
          break;
        case "@":
          S____2 = skipParse(tokens, function() {
            let ____args = Array.prototype.slice.call(arguments);
            return [kirbystdlibref.symbol("deref"), read_STAR(tokens)];
          });
          break;
        case "$":
          S____2 = skipParse(tokens, function() {
            let ____args = Array.prototype.slice.call(arguments);
            return (function() {
              let y = read_STAR(tokens);
              let x = kirbystdlibref.symbol("str");
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
          S____2 = skipParse(tokens, function() {
            let ____args = Array.prototype.slice.call(arguments);
            return [kirbystdlibref.symbol("lambda"), read_STAR(tokens)];
          });
          break;
        case "[":
          S____2 = readVector(token, tokens);
          break;
        case "(":
          S____2 = readList(token, tokens);
          break;
        case "{":
          S____2 = readMap(token, tokens);
          break;
        case ")":
        case "]":
        case "}":
          S____2 = throwE(token, "unexpected ", token.value);
          break;
        case ";":
        case ",":
          S____2 = (function() {
            let G__1 = undefined;
            popToken(tokens);
            return G__1;
          }).call(this);
          break;
        default:
          S____2 = readAtom(tokens);
          break;
      }
      return S____2;
    }).call(this));
};
////////////////////////////////////////////////////////////////////////////////
//name: [addAst] in file: parser.ky near line: 383
const addAst = function(ast, f) {
  if ( (!(typeof (f) === "undefined")) ) {
    conj_BANG(ast, f);
  }
  return ast;
};
////////////////////////////////////////////////////////////////////////////////
//name: [parse] in file: parser.ky near line: 387
//Main parser routine
const parse = function(source) {
  let G____3 = Array.prototype.slice.call(arguments, 1);
  let fname = G____3[0];
  let tokens = lexer(source, opt_QUERY__QUERY(fname, "*adhoc*"));
  let f = null;
  let ast = [];
  let tlen = kirbystdlibref.count(tokens);
  tokens.pos = 0;
  if (false) {
    tokens.forEach(function() {
      let ____args = Array.prototype.slice.call(arguments);
      return (console ?
        console.log(["token=", ____args[0].name].join("")) :
        null);
    });
  }
  for (let ____break = false; ((!____break) && (tokens.pos < tlen));) {
    addAst(ast, read_STAR(tokens));
  }
  return ast;
};
////////////////////////////////////////////////////////////////////////////////
//name: [dumpInfo] in file: parser.ky near line: 399
const dumpInfo = function(tag, ast) {
  return ((ast && (typeof (ast.line) === "number")) ?
    ["<", tag, " line=", "\"", ast.line, "\"", " column=", "\"", ast.column, "\"", ">"].join("") :
    ["<", tag, ">"].join(""));
};
////////////////////////////////////////////////////////////////////////////////
//name: [dump*] in file: parser.ky near line: 409
//Debug and dump the AST
const dump_STAR = function(tree) {
  let s = "";
  if (primitive_QUERY(tree)) {
    tree = tree.value;
  }
  return (vector_QUERY(tree) ?
    [dumpInfo("vector", tree), tree.map(function() {
      let ____args = Array.prototype.slice.call(arguments);
      return dump_STAR(____args[0]);
    }).join(""), "</vector>"].join("") :
    (map_QUERY(tree) ?
      [dumpInfo("map", tree), tree.map(function() {
        let ____args = Array.prototype.slice.call(arguments);
        return dump_STAR(____args[0]);
      }).join(""), "</map>"].join("") :
      (list_QUERY(tree) ?
        [dumpInfo("list", tree), tree.map(function() {
          let ____args = Array.prototype.slice.call(arguments);
          return dump_STAR(____args[0]);
        }).join(""), "</list>"].join("") :
        (Array.isArray(tree) ?
          [dumpInfo("sexpr", tree), tree.map(function() {
            let ____args = Array.prototype.slice.call(arguments);
            return dump_STAR(____args[0]);
          }).join(""), "</sexpr>"].join("") :
          (lambda_DASH_arg_QUERY(tree) ?
            [dumpInfo("lambda-arg", tree), "%",(parseInt(tree.value) + 1), "</lambda-arg>"].join("") :
            (keyword_QUERY(tree) ?
              [dumpInfo("keyword", tree), escXml(tree.value), "</keyword>"].join("") :
              (symbol_QUERY(tree) ?
                [dumpInfo("symbol", tree), escXml(tree.value), "</symbol>"].join("") :
                ((typeof (tree) === "string") ?
                  ["<string>", escXml(wrap_DASH_str(tree)), "</string>"].join("") :
                  ((typeof (tree) === "number") ?
                    ["<number>", tree, "</number>"].join("") :
                    ((tree === null) ?
                      ["<reserved>", "null", "</reserved>"].join("") :
                      ((true === tree) ?
                        ["<boolean>", true, "</boolean>"].join("") :
                        ((false === tree) ?
                          ["<boolean>", false, "</boolean>"].join("") :
                          ((typeof (tree) === "undefined") ?
                            ["<reserved>", "undefined", "</reserved>"].join("") :
                            (true ?
                              (function() {
                                throw "Bad AST" ;
                              }).call(this) :
                              null))))))))))))));
};
////////////////////////////////////////////////////////////////////////////////
//name: [dumpTree] in file: parser.ky near line: 454
//Debug and dump the AST
const dumpTree = function(tree, fname) {
  return ["<AbstractSyntaxTree file=\"", escXml(fname), "\">", dump_STAR(tree), "</AbstractSyntaxTree>"].join("");
};
module.exports = {
  Token: Token,
  REGEX: REGEX,
  testid_QUERY: testid_QUERY,
  jsid: jsid,
  parse: parse,
  dumpTree: dumpTree
};