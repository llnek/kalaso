/*Auto generated by Kirby v1.0.0 - Fri Dec 22 2017 22:00:48 GMT-0800 (PST)
  czlab.kirby.poo
(null)
*/

const kirbystdlibref = std;
//Defining a lambda positional argument
class LambdaArg {
  ////////////////////////////////////////////////////////////////////////////////
  //fn: [constructor] in file: x.ky,line: 5
  constructor(arg) {
    if ( (!(poo(3))) ) {
      throw Error("Precondition failed");
    } else {
      null;
    }
    this["value"] = "";
    let name = ((arg === "%") ?
      "1" :
      arg.slice(1));
    let v = parseInt(name);
    if ( (!(v > 0)) ) {
      throw new Error([
        "invalid lambda-arg ",
        arg
      ].join(""));
    } else {
      null;
    }
    --v;
    this.value = [
      v
    ].join("");
    return this;
  }
  ////////////////////////////////////////////////////////////////////////////////
  //fn: [toString] in file: x.ky,line: 15
  toString() {
    return this.value;
  }
}
module.exports = {
  LambdaArg: LambdaArg
};