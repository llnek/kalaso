/*Auto generated by Kirby - v1.0.0  - Mon Nov 06 2017 22:10:14 GMT-0800 (PST)*/

(function () {
let recur,____f;
recur= null;
____f= function (a,b) {
;return (((a+b) > 10) ?
(function() {
console.log("done");
;return 1;
}).call(this) :
(function() {
console.log("a=",a,", b=",b);
;return recur((a+1),(b+1));
}).call(this));
};
;;
let ____xs,____ret;
____xs= null;
____ret= ____f;
;;
recur=function () {
____xs=arguments;
if (____ret) {for(____ret=undefined;____ret===undefined;){____ret=____f.apply(this,____xs);} return ____ret;};
;return undefined;
};
;return recur(1,1);
})(this)
