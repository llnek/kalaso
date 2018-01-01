/*Auto generated by Kirby v1.0.0 - Mon Jan 01 2018 00:15:52 GMT-0800 (PST)
  czlab.kirby.main
({"doc":"","author":"Kenneth Leung"})
*/

const getopt = require("node-getopt");
const cp = require("child_process");
const watch = require("watch");
const path = require("path");
const fs = require("fs");
const tx = require("./compiler");
const std = require("./stdlib");
const object_QUERY = std["object_QUERY"];
const rt = require("./engine");
const kirbystdlibref = std;
////////////////////////////////////////////////////////////////////////////////
//fn: [error!] in file: main.ky,line: 23
const error_BANG = function(msg) {
  if (console) {
    console.log([
      msg
    ].join(""));
  }
  return process.exit(1);
};
////////////////////////////////////////////////////////////////////////////////
//fn: [compileSource] in file: main.ky,line: 26
const compileSource = function(opt) {
  let GS__9 = opt.argv;
  let fin = GS__9[0];
  let fout = GS__9[1];
  let options = opt.options;
  if ( (!fin) ) {
    error_BANG("No source file");
  } else {
    null;
  }
  if ( (!fin.endsWith(".ky")) ) {
    error_BANG("Source file extension not '.ky'");
  } else {
    null;
  }
  if ( (!fout) ) {
    fout = fin.replace(/\.ky$/g, ".js");
  } else {
    null;
  }
  return (function() {
    try {
      let GS__10 = options;
      let source_DASH_map = GS__10["source-map"];
      let format = GS__10["format"];
      let show_DASH_ast = GS__10["show-ast"];
      if ( (!show_DASH_ast) ) {
        if (console) {
          console.log([
            [
              "kirby v",
              tx.version
            ].join(""),
            ": compiling: ",
            fin,
            " -> ",
            fout
          ].join(""));
        }
      } else {
        null;
      }
      let source = rt.slurp(fin);
      if (show_DASH_ast) {
        if (console) {
          console.log([
            tx.dbgAST(source, fin)
          ].join(""));
        }
      } else {
        let GS__11 = tx.transpile(source, fin, options);
        let ret = GS__11[0];
        let err = GS__11[1];
        rt.spit(fout, ret);
        if (err) {
          throw err;
        }
      }
      return null;
    } catch (e) {
      return error_BANG(e);
    }
  }).call(this);
};
////////////////////////////////////////////////////////////////////////////////
//fn: [init] in file: main.ky,line: 51
const init = function() {
  let c = require("./compiler");
  let w = process.cwd();
  let f = function(module, fname) {
    let GS__12 = c.transpile(rt.slurp(fname), path.relative(w, fname));
    let code = GS__12[0];
    let err = GS__12[1];
    return (err ?
      (function() {
        throw err;
      }).call(this) :
      module._compile(code, fname));
  };
  require.extensions[".ky"] = f;
  return rt.init(tx.version);
};
////////////////////////////////////////////////////////////////////////////////
//fn: [doWatch] in file: main.ky,line: 65
const doWatch = function(cwd) {
  if (console) {
    console.log([
      "Watching",
      cwd,
      "for file changes..."
    ].join(""));
  }
  return watch.watchTree(cwd, {
    "ignoreDirectoryPattern": /node_modules/,
    "ignoreDotFiles": true,
    "filter": function(f, stat) {
      return (f.endsWith(".ky") || stat.isDirectory());
    }
  }, function(f, curr, prev) {
    return ((object_QUERY(f) && ((prev === null) && (curr === null))) ?
      (function() {
        let GS__13 = null;
        "finished walking the tree";
        return GS__13;
      }).call(this) :
      ((curr && ((curr.nlink === 0))) ?
        (function() {
          let GS__14 = null;
          "f was removed";
          return GS__14;
        }).call(this) :
        (true ?
          (function() {
            return cp.spawn("bin/boot.js", [
              f.slice((cwd.length + 1))
            ], {
              "stdio": "inherit"
            });
          }).call(this) :
          null)));
  });
};
////////////////////////////////////////////////////////////////////////////////
//fn: [pcli] in file: main.ky,line: 90
const pcli = function(gopt) {
  let opt = gopt.parseSystem();
  let GS__15 = opt.options;
  let version = GS__15["version"];
  let repl = GS__15["repl"];
  let watch = GS__15["watch"];
  let help = GS__15["help"];
  if (version) {
    console.info(tx.version);
  } else {
    if (watch) {
      doWatch(process.cwd());
    } else {
      if (repl) {
        rt.runRepl();
      } else {
        if ( (help || (0 === kirbystdlibref.count(opt.argv))) ) {
          gopt.showHelp();
        } else {
          if (true) {
            compileSource(opt);
          }
        }
      }
    }
  }
  return true;
};
////////////////////////////////////////////////////////////////////////////////
//fn: [main] in file: main.ky,line: 104
const main = function() {
  let gopt = getopt.create([
    [
      "w",
      "watch",
      "auto-compile changed files"
    ],
    [
      "m",
      "source-map",
      "generate source maps"
    ],
    [
      "f",
      "format",
      "format source code"
    ],
    [
      "v",
      "version",
      "show version"
    ],
    [
      "r",
      "repl",
      "start a repl"
    ],
    [
      "h",
      "help",
      "show help"
    ],
    [
      "t",
      "show-ast",
      "show AST"
    ]
  ]).setHelp([
    "kirby [OPTIONS] [<infile>] [<outfile>]\n\n",
    "<outfile> defaults to <infile>.js\n\n",
    "[[OPTIONS]]\n\n"
  ].join("")).bindHelp();
  return (init() && pcli(gopt));
};
main()
module.exports = {
  ____namespaceid: "czlab.kirby.main",
  main: main
};