// Generated by LispyScript v1.5.0
var _STARkirby_STAR = require("kirby"),
  _STARpath_STAR = require("path"),
  _STARfs_STAR = require("fs");
var _STARprocess_STAR = process;
require.extensions[".kirby"] = function (module,fname) {
  return   (function() {
  let code = _STARfs_STAR.readFileSync(fname,"utf8");
  return module._compile(_STARkirby_STAR.transpile(code,_STARpath_STAR.relative(_STARprocess_STAR.cwd(),fname)),fname);
  })();
};
require("./macros.kirby");