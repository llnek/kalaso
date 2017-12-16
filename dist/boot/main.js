/*Auto generated by Kirby - v1.0.0 czlab.kirby.main Fri Dec 15 2017 22:53:24 GMT-0800 (PST)*/

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
//name: [error!] in file: main.ky near line: 23
const error_BANG = function(msg) {
  if (console) {
    console.log([msg].join(""));
  }
  return process.exit(1);
};
////////////////////////////////////////////////////////////////////////////////
//name: [compileSource] in file: main.ky near line: 26
const compileSource = function(opt) {
  let G____9 = opt.argv;
  let fin = G____9[0];
  let fout = G____9[1];
  let options = opt.options;
  if ( (!fin) ) {
    error_BANG("No source file");
  }
  if ( (!fin.endsWith(".ky")) ) {
    error_BANG("Source file extension not '.ky'");
  }
  if ( (!fout) ) {
    fout = fin.replace(/\.ky$/g, ".js");
  }
  return (function() {
    try {
      let G____10 = options;
      let source_DASH_map = G____10["source-map"];
      let format = G____10["format"];
      let show_DASH_ast = G____10["show-ast"];
      if ( (!show_DASH_ast) ) {
        if (console) {
          console.log([["kirby v", tx.version].join(""), ": compiling: ", fin, " -> ", fout].join(""));
        }
      }
      let source = rt.slurp(fin);
      if (show_DASH_ast) {
        if (console) {
          console.log([tx.dbgAST(source, fin)].join(""));
        }
      } else {
        let G____11 = tx.transpile(source, fin, options);
        let ret = G____11[0];
        let err = G____11[1];
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
//name: [init] in file: main.ky near line: 51
const init = function() {
  let c = require("./compiler");
  let w = process.cwd();
  let f = function(module, fname) {
    let G____12 = c.transpile(rt.slurp(fname), path.relative(w, fname));
    let code = G____12[0];
    let err = G____12[1];
    return (err ?
      (function() {
        throw err ;
      }).call(this) :
      module._compile(code, fname));
  };
  require.extensions[".ky"] = f;
  return rt.init(tx.version);
};
////////////////////////////////////////////////////////////////////////////////
//name: [doWatch] in file: main.ky near line: 65
const doWatch = function(cwd) {
  if (console) {
    console.log(["Watching", cwd, "for file changes..."].join(""));
  }
  return watch.watchTree(cwd, {
    "ignoreDirectoryPattern": /node_modules/,
    "ignoreDotFiles": true,
    "filter": function(f, stat) {
      return (f.endsWith(".ky") || stat.isDirectory());
    }
  }, function(f, curr, prev) {
    return ((object_QUERY(f) && (prev === null)) ?
      (function() {
        let G__1 = null;
        "finished walking the tree";
        return G__1;
      }).call(this) :
      ((curr && zero_QUERY(curr.nlink)) ?
        (function() {
          let G__2 = null;
          "f was removed";
          return G__2;
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
//name: [pcli] in file: main.ky near line: 90
const pcli = function(gopt) {
  let opt = gopt.parseSystem();
  let G____13 = opt.options;
  let version = G____13["version"];
  let repl = G____13["repl"];
  let watch = G____13["watch"];
  let help = G____13["help"];
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
//name: [main] in file: main.ky near line: 104
const main = function() {
  let gopt = getopt.create([["w", "watch", "auto-compile changed files"], ["m", "source-map", "generate source maps"], ["f", "format", "format source code"], ["v", "version", "show version"], ["r", "repl", "start a repl"], ["h", "help", "show help"], ["t", "show-ast", "show AST"]]).setHelp(["kirby [OPTIONS] [<infile>] [<outfile>]\n\n", "<outfile> defaults to <infile>.js\n\n", "[[OPTIONS]]\n\n"].join("")).bindHelp();
  return (init() && pcli(gopt));
};
main()
module.exports = {
  main: main
};