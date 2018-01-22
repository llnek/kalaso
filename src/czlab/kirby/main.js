/*Auto generated by Kirby v1.0.0 - Mon Jan 22 2018 00:41:32 GMT-0800 (PST)
  czlab.kirby.main
{":doc":"",":author":"Kenneth Leung"}
*/

const getopt = require("node-getopt");
const cp = require("child_process");
const watch = require("watch");
const path = require("path");
const fs = require("fs");
const tx = require("./compiler");
const std = require("./stdlib");
const object_QUERY = std["object_QUERY"];
const println = std["println"];
const rt = require("./engine");
const kirbystdlibref = std;
////////////////////////////////////////////////////////////////////////////////
//fn: [error!] in file: main.ky, line: 24
const error_BANG = function(msg) {
  println(msg);
  return process.exit(1);
};
////////////////////////////////////////////////////////////////////////////////
//fn: [compileSource] in file: main.ky, line: 27
const compileSource = function(opt) {
  let GS__10 = opt.argv;
  let fin = GS__10[0];
  let fout = GS__10[1];
  let options = opt.options;
  if ( (!fin) ) {
    error_BANG("No source file");
  } else {
    fin = path.resolve(fin);
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
      let GS__11 = options;
      let source_DASH_map = GS__11["source-map"];
      let format = GS__11["format"];
      let show_DASH_ast = GS__11["show-ast"];
      if ( (!show_DASH_ast) ) {
        println(["kirby v", tx.version].join(""), ": compiling: ", fin, " -> ", fout);
      } else {
        null;
      }
      let source = rt.slurp(fin);
      if (show_DASH_ast) {
        println(tx.dbgAST(source, fin));
      } else {
        let GS__12 = tx.transpile(source, fin, options);
        let ret = GS__12[0];
        let err = GS__12[1];
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
//fn: [init] in file: main.ky, line: 54
const init = function() {
  return rt.init(tx.version);
};
////////////////////////////////////////////////////////////////////////////////
//fn: [doWatch] in file: main.ky, line: 58
const doWatch = function(cwd) {
  std.println("Watching", cwd, "for file changes...");
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
            return cp.spawn("bin/boot.js", [f.slice((cwd.length + 1))], {
              "stdio": "inherit"
            });
          }).call(this) :
          null)));
  });
};
////////////////////////////////////////////////////////////////////////////////
//fn: [pcli] in file: main.ky, line: 83
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
//fn: [main] in file: main.ky, line: 97
const main = function() {
  let gopt = getopt.create([["v", "verbose", "show details of the source"], ["w", "watch", "auto-compile changed files"], ["m", "source-map", "generate source maps"], ["f", "format", "format source code"], ["V", "version", "show version"], ["r", "repl", "start a repl"], ["h", "help", "show help"], ["t", "show-ast", "show AST"]]).setHelp(["kirby [OPTIONS] [<infile>] [<outfile>]\n\n", "<outfile> defaults to <infile>.js\n\n", "[[OPTIONS]]\n\n"].join("")).bindHelp();
  return (init() && pcli(gopt));
};
main();
module.exports = {
  da57bc0172fb42438a11e6e8778f36fb: {
    ns: "czlab.kirby.main",
    macros: {}
  },
  main: main
};