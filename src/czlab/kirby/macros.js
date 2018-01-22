/*Auto generated by Kirby v1.0.0 - Mon Jan 22 2018 00:41:27 GMT-0800 (PST)
  czlab.kirby.stdlib
{":doc":"Kirby's standard core library.",":author":"Kenneth Leung"}
*/

const ____macros = {
  "assert*": "(macro* assert* (c msg) (syntax-quote (if* (unquote c) true (throw* (unquote msg)))))",
  "cond*": "(macro* cond* (& xs) (if* (> (count* xs) 0) (list* (quote if*) (first* xs) (nth* xs 1) (cons* (quote cond*) (rest* (rest* xs))))))",
  "_andp_*": "(macro* _andp_* (& xs) (if* (= 1 (unquote (count* xs))) (syntax-quote (unquote (first* xs))) (syntax-quote (and (splice-unquote xs)))))",
  "empty?": "(macro* empty? (coll) (syntax-quote (= 0 (kirbystdlibref/count (unquote coll)))))",
  "starts?": "(macro* starts? (s arg) (syntax-quote (.startsWith (unquote s) (unquote arg))))",
  "ends?": "(macro* ends? (s arg) (syntax-quote (.endsWith (unquote s) (unquote arg))))",
  "n#": "(macro* n# (coll) (syntax-quote (kirbystdlibref/count (unquote coll))))",
  "1st": "(macro* 1st (x) (syntax-quote (first (unquote x))))",
  "2nd": "(macro* 2nd (x) (syntax-quote (second (unquote x))))",
  "3rd": "(macro* 3rd (x) (syntax-quote (nth (unquote x) 2)))",
  "trap!": "(macro* trap! (& msgs) (let* [sz (count* msgs)] (if* (> sz 1) (syntax-quote (throw (join \"\" (vec (splice-unquote msgs))))) (if* (> sz 0) (syntax-quote (throw (unquote (nth* msgs 0)))) (syntax-quote (throw \"error!\"))))))",
  "merror": "(macro* merror (e) (syntax-quote (new Error (unquote e))))",
  "raise!": "(macro* raise! (& msgs) (let* [sz (count* msgs)] (if* (> sz 1) (syntax-quote (throw (merror (join \"\" (vec (splice-unquote msgs)))))) (if* (> sz 0) (syntax-quote (throw (merror (unquote (nth* msgs 0))))) (syntax-quote (throw (merror \"error!\")))))))",
  "slice": "(macro* slice (arr start end) (if* end (syntax-quote (Array.prototype.slice.call (unquote arr) (unquote start) (unquote end))) (if* start (syntax-quote (Array.prototype.slice.call (unquote arr) (unquote start))) (syntax-quote (Array.prototype.slice.call (unquote arr))))))",
  "float": "(macro* float (x) (syntax-quote (parseFloat (unquote x))))",
  "int": "(macro* int (x) (syntax-quote (parseInt (unquote x))))",
  "delay": "(macro* delay (f t) (syntax-quote (setTimeout (unquote f) (unquote t))))",
  "break-out-of-loop!": "(macro* break-out-of-loop! () (syntax-quote (set! ____break true)))",
  "undef!": "(macro* undef! (x) (syntax-quote (set! (unquote x) undefined)))",
  "nil!": "(macro* nil! (x) (syntax-quote (set! (unquote x) null)))",
  "last-index": "(macro* last-index (coll) (syntax-quote (-1 (alen (unquote coll)))))",
  "rest": "(macro* rest (coll) (syntax-quote (.slice (unquote coll) 1)))",
  "cdr": "(macro* cdr (coll) (syntax-quote (.slice (unquote coll) 1)))",
  "second": "(macro* second (coll) (syntax-quote (nth (unquote coll) 1)))",
  "first": "(macro* first (coll) (syntax-quote (nth (unquote coll) 0)))",
  "car": "(macro* car (coll) (syntax-quote (nth (unquote coll) 0)))",
  "nexth": "(macro* nexth (coll i) (syntax-quote (nth (unquote coll) (1 (unquote i)))))",
  "nth": "(macro* nth (coll i) (syntax-quote (get (unquote coll) (unquote i))))",
  "even?": "(macro* even? (& xs) (syntax-quote (_andp_* (splice-unquote (map* (lambda* [x] (syntax-quote (= 0 (kirbystdlibref/modulo (unquote x) 2)))) xs)))))",
  "odd?": "(macro* odd? (& xs) (syntax-quote (_andp_* (splice-unquote (map* (lambda* [x] (syntax-quote (not (even? (unquote x))))) xs)))))",
  "alen": "(macro* alen (coll) (syntax-quote (.-length (unquote coll))))",
  "nzlen?": "(macro* nzlen? (coll) (syntax-quote (> (alen (unquote coll)) 0)))",
  "zlen?": "(macro* zlen? (coll) (syntax-quote (= 0 (alen (unquote coll)))))",
  "type": "(macro* type (obj) (syntax-quote (typeof (unquote obj))))",
  "whatis?": "(macro* whatis? (obj) (syntax-quote (Object.prototype.toString.call (unquote obj))))",
  "regex?": "(macro* regex? (& xs) (syntax-quote (_andp_* (splice-unquote (map* (lambda* [x] (syntax-quote (= (whatis? (unquote x)) \"[object RegExp]\"))) xs)))))",
  "array?": "(macro* array? (& xs) (syntax-quote (_andp_* (splice-unquote (map* (lambda* [x] (syntax-quote (Array.isArray (unquote x)))) xs)))))",
  "arr?": "(macro* arr? (& xs) (syntax-quote (array? (splice-unquote xs))))",
  "date?": "(macro* date? (& xs) (syntax-quote (_andp_* (splice-unquote (map* (lambda* [x] (syntax-quote (= (whatis? (unquote x)) \"[object Date]\"))) xs)))))",
  "bool?": "(macro* bool? (& xs) (syntax-quote (boolean? (splice-unquote xs))))",
  "boolean?": "(macro* boolean? (& xs) (syntax-quote (_andp_* (splice-unquote (map* (lambda* [x] (syntax-quote (= (typeof (unquote x)) \"boolean\"))) xs)))))",
  "num?": "(macro* num? (& xs) (syntax-quote (number? (splice-unquote xs))))",
  "number?": "(macro* number? (& xs) (syntax-quote (_andp_* (splice-unquote (map* (lambda* [x] (syntax-quote (= (typeof (unquote x)) \"number\"))) xs)))))",
  "str?": "(macro* str? (& xs) (syntax-quote (string? (splice-unquote xs))))",
  "string?": "(macro* string? (& xs) (syntax-quote (_andp_* (splice-unquote (map* (lambda* [x] (syntax-quote (= (typeof (unquote x)) \"string\"))) xs)))))",
  "fn?": "(macro* fn? (& xs) (syntax-quote (_andp_* (splice-unquote (map* (lambda* [x] (syntax-quote (= (typeof (unquote x)) \"function\"))) xs)))))",
  "undef?": "(macro* undef? (& xs) (syntax-quote (_andp_* (splice-unquote (map* (lambda* [x] (syntax-quote (= (typeof (unquote x)) \"undefined\"))) xs)))))",
  "def?": "(macro* def? (& xs) (syntax-quote (_andp_* (splice-unquote (map* (lambda* [x] (syntax-quote (not= (typeof (unquote x)) \"undefined\"))) xs)))))",
  "nil?": "(macro* nil? (& xs) (syntax-quote (_andp_* (splice-unquote (map* (lambda* [x] (syntax-quote (= (unquote x) null))) xs)))))",
  "zero?": "(macro* zero? (& xs) (syntax-quote (_andp_* (splice-unquote (map* (lambda* [x] (syntax-quote (= (unquote x) 0))) xs)))))",
  "one?": "(macro* one? (& xs) (syntax-quote (_andp_* (splice-unquote (map* (lambda* [x] (syntax-quote (= (unquote x) 1))) xs)))))",
  "neg?": "(macro* neg? (& xs) (syntax-quote (_andp_* (splice-unquote (map* (lambda* [x] (syntax-quote (< (unquote x) 0))) xs)))))",
  "pos?": "(macro* pos? (& xs) (syntax-quote (_andp_* (splice-unquote (map* (lambda* [x] (syntax-quote (> (unquote x) 0))) xs)))))",
  "values": "(macro* values (obj) (syntax-quote (Object.values (unquote obj))))",
  "keys": "(macro* keys (obj) (syntax-quote (Object.keys (unquote obj))))",
  "properties": "(macro* properties (obj) (syntax-quote (Object.getOwnPropertyNames (unquote obj))))",
  "assert": "(macro* assert (tst & msgs) (syntax-quote (if (unquote tst) true (raise! (splice-unquote msgs)))))",
  "false?": "(macro* false? (& xs) (syntax-quote (_andp_* (splice-unquote (map* (lambda* [x] (syntax-quote (= (unquote x) false))) xs)))))",
  "true?": "(macro* true? (& xs) (syntax-quote (_andp_* (splice-unquote (map* (lambda* [x] (syntax-quote (= (unquote x) true))) xs)))))",
  "when-not": "(macro* when-not (tst & xs) (syntax-quote (when (not (unquote tst)) (splice-unquote xs))))",
  "unless": "(macro* unless (tst & xs) (syntax-quote (when-not (unquote tst) (splice-unquote xs))))",
  "if-not": "(macro* if-not (tst then else) (syntax-quote (if (not (unquote tst)) (unquote then) (unquote else))))",
  "while": "(macro* while (tst & xs) (syntax-quote (for [:while (unquote tst)] (splice-unquote xs))))",
  "when": "(macro* when (tst & xs) (syntax-quote (if (unquote tst) (do (splice-unquote xs)))))",
  "cond": "(macro* cond (& xs) (let* [len (count* xs)] (do* (assert* (is-even? len) \"cond expects even args\") (if* (> len 0) (let* [c (nth* xs 0) e (nth* xs 1) r (rest* (rest* xs))] (if* (is-same? c \"else\") (syntax-quote (if true (unquote e))) (syntax-quote (if (unquote c) (unquote e) (cond (splice-unquote r))))))))))",
  "->": "(macro* -> (expr form & xs) (let* [x (syntax-quote ((unquote (nth* form 0)) (unquote expr) (splice-unquote (rest* form))))] (if* (> (count* xs) 0) (syntax-quote (-> (unquote x) (splice-unquote xs))) (syntax-quote (unquote x)))))",
  "->>": "(macro* ->> (expr form & xs) (let* [x (syntax-quote ((splice-unquote form) (unquote expr)))] (if* (> (count* xs) 0) (syntax-quote (->> (unquote x) (splice-unquote xs))) (syntax-quote (unquote x)))))",
  "let": "(macro* let (bindings & xs) (syntax-quote (do (var (splice-unquote bindings)) (splice-unquote xs))))",
  "single?": "(macro* single? (coll) (syntax-quote (= 1 (n# (unquote coll)))))",
  "dual?": "(macro* dual? (coll) (syntax-quote (= 2 (n# (unquote coll)))))",
  "triple?": "(macro* triple? (coll) (syntax-quote (= 3 (n# (unquote coll)))))",
  "loop": "(macro* loop (bindings & more) (let* [es (evens* bindings) os (odds* bindings)] (syntax-quote ((fn [] (var _x_ null recur null _f_ (fn [(splice-unquote es)] (splice-unquote more)) _r_ _f_) (set! recur (fn [] (set! _x_ arguments) (raw# \"if (_r_) {for(_r_=undefined;_r_===undefined;){_r_=_f_.apply(this,_x_);} return _r_;}\") undefined)) (recur (splice-unquote os))) this))))",
  "concat": "(macro* concat (coll x) (syntax-quote (.concat (unquote coll) (unquote x))))",
  "join": "(macro* join (sep coll) (syntax-quote (.join (unquote coll) (unquote sep))))",
  "do-with": "(macro* do-with (binding & xs) (let* [f (nth* binding 0)] (syntax-quote (let [(unquote f) (unquote (nth* binding 1))] (splice-unquote xs) (unquote f)))))",
  "do->false": "(macro* do->false (& xs) (let* [a (gensym*)] (syntax-quote (let [(unquote a) false] (splice-unquote xs) (unquote a)))))",
  "do->true": "(macro* do->true (& xs) (let* [a (gensym*)] (syntax-quote (let [(unquote a) true] (splice-unquote xs) (unquote a)))))",
  "do->nil": "(macro* do->nil (& xs) (let* [a (gensym*)] (syntax-quote (let [(unquote a) null] (splice-unquote xs) (unquote a)))))",
  "do->undef": "(macro* do->undef (& xs) (let* [a (gensym*)] (syntax-quote (let [(unquote a) undefined] (splice-unquote xs) (unquote a)))))",
  "do->break!": "(macro* do->break! (& xs) (syntax-quote (do (splice-unquote xs) (break-out-of-loop!))))",
  "inc": "(macro* inc (x) (syntax-quote (1 (unquote x))))",
  "dec": "(macro* dec (x) (syntax-quote (-1 (unquote x))))",
  "dotimes": "(macro* dotimes (binding & xs) (let* [_t (gensym*) b1 (first* binding)] (syntax-quote (for [(unquote b1) 0 (unquote _t) (unquote (nth* binding 1)) :while (< (unquote b1) (unquote _t)) :recur (1 (unquote b1))] (splice-unquote xs)))))",
  "range": "(macro* range (a b c) (let* [start (if* b a 0) end (if* b b a) step (if* c c 1)] (syntax-quote (do-with [ret []] (for [i (unquote start) :while (< i (unquote end)) :recur (+ i (unquote step))] (ret.push i))))))",
  "apply": "(macro* apply (f this args) (syntax-quote (.apply (unquote f) (unquote this) (unquote args))))",
  "apply*": "(macro* apply* (f this & args) (syntax-quote (.apply (unquote f) (unquote this) (vec (splice-unquote args)))))",
  "ch@": "(macro* ch@ (s pos) (syntax-quote (.charAt (unquote s) (unquote pos))))",
  "false!": "(macro* false! (x) (syntax-quote (set! (unquote x) false)))",
  "true!": "(macro* true! (x) (syntax-quote (set! (unquote x) true)))",
  "repeat": "(macro* repeat (n x) (syntax-quote (do-with [ret []] (for [i 0 :while (< i (unquote n)) :recur (1 i)] (ret.push (unquote x))))))",
  "doseq": "(macro* doseq (bindings & xs) (let* [loopExpr (gensym*) escvar (gensym*) idxvar (gensym*) _let (if* (is-eq? (nth* bindings 2) (quote :let)) (nth* bindings 3)) _while (if* (is-eq? (nth* bindings 2) (quote :while)) (nth* bindings 3) (if* (is-eq? (nth* bindings 4) (quote :while)) (nth* bindings 5) (if* (is-eq? (nth* bindings 6) (quote :while)) (nth* bindings 7) true))) _when (if* (is-eq? (nth* bindings 2) (quote :when)) (nth* bindings 3) (if* (is-eq? (nth* bindings 4) (quote :when)) (nth* bindings 5) (if* (is-eq? (nth* bindings 6) (quote :when)) (nth* bindings 7) true)))] (syntax-quote (let [(unquote loopExpr) (unquote (nth* bindings 1))] (for [(unquote idxvar) 0 (unquote escvar) false :while (and (not (unquote escvar)) (< (unquote idxvar) (alen (unquote loopExpr)))) :recur (1 (unquote idxvar))] (var (unquote (nth* bindings 0)) (nth (unquote loopExpr) (unquote idxvar))) (unquote (if* _let (syntax-quote (var (splice-unquote _let))))) (if-not (unquote _while) (set! (unquote escvar) true)) (when (and (not (unquote escvar)) (unquote _when)) (splice-unquote xs))) null))))",
  "if-some+": "(macro* if-some+ (binding then else) (let* [tst (gensym*)] (syntax-quote (let [(unquote tst) (unquote (nth* binding 1)) (unquote (first* binding)) (unquote tst)] (if (> (n# (unquote tst)) 0) (unquote then) (unquote else))))))",
  "if-some": "(macro* if-some (binding then else) (let* [tst (gensym*)] (syntax-quote (let [(unquote tst) (unquote (nth* binding 1)) (unquote (first* binding)) (unquote tst)] (if (or (undef? (unquote tst)) (nil? (unquote tst))) (unquote else) (unquote then))))))",
  "if-let": "(macro* if-let (binding then else) (let* [tst (gensym*)] (syntax-quote (let [(unquote tst) (unquote (nth* binding 1)) (unquote (first* binding)) (unquote tst)] (if (unquote tst) (unquote then) (unquote else))))))",
  "when-some+": "(macro* when-some+ (binding & xs) (let* [tst (gensym*)] (syntax-quote (let [(unquote tst) (unquote (nth* binding 1)) (unquote (first* binding)) (unquote tst)] (when (> (n# (unquote tst)) 0) (splice-unquote xs))))))",
  "when-some": "(macro* when-some (binding & xs) (let* [tst (gensym*)] (syntax-quote (let [(unquote tst) (unquote (nth* binding 1)) (unquote (first* binding)) (unquote tst)] (when-not (or (undef? (unquote tst)) (nil? (unquote tst))) (splice-unquote xs))))))",
  "when-let": "(macro* when-let (binding & xs) (let* [tst (gensym*)] (syntax-quote (let [(unquote tst) (unquote (nth* binding 1)) (unquote (first* binding)) (unquote tst)] (when (unquote tst) (splice-unquote xs))))))",
  "doto": "(macro* doto (target & xs) (let* [v (gensym*)] (syntax-quote (let [(unquote v) (unquote target)] (splice-unquote (map* (lambda* [e] (syntax-quote ((unquote (first* e)) (unquote v) (splice-unquote (rest* e))))) xs)) (unquote v)))))",
  "map": "(macro* map (f coll) (syntax-quote (.map (unquote coll) (unquote f))))",
  "filter": "(macro* filter (p coll) (syntax-quote (.filter (unquote coll) (unquote p))))",
  "some": "(macro* some (p coll) (syntax-quote (.some (unquote coll) (unquote p))))",
  "take": "(macro* take (coll cnt) (syntax-quote (slice (unquote coll) 0 (unquote cnt))))",
  "constantly": "(macro* constantly (x) (syntax-quote (fn [& xs] (unquote x))))",
  "drop": "(macro* drop (coll cnt) (syntax-quote (slice (unquote coll) (unquote cnt))))",
  "reduce2": "(macro* reduce2 (f coll) (syntax-quote (.reduce (unquote coll) (unquote f))))",
  "reduce": "(macro* reduce (f start coll) (syntax-quote (.reduce (unquote coll) (unquote f) (unquote start))))",
  "str": "(macro* str (& xs) (syntax-quote (.join (vec (splice-unquote xs)) \"\")))",
  "lambda": "(macro* lambda (code) (let* [sz (count* code) body (if* (> sz 1) code (if* (> sz 0) (nth* code 0)))] (syntax-quote (fn [] (var ____args (slice arguments)) (unquote body)))))",
  "each": "(macro* each (func coll) (syntax-quote (.forEach (unquote coll) (unquote func))))",
  "each-key": "(macro* each-key (func obj) (let* [t (gensym*)] (syntax-quote (let [(unquote t) (unquote obj)] (each (fn [e] ((unquote func) (nth e 1) (nth e 0))) (Object.entries (unquote t)))))))",
  "dosync": "(macro* dosync (& exprs) (syntax-quote (do (splice-unquote exprs))))",
  "monad": "(macro* monad (docstring operations) (syntax-quote (do (var~ bind unit zero plus) (let [(splice-unquote operations)] (hashmap :bind bind :unit unit :zero zero :plus plus)))))",
  "defmonad": "(macro* defmonad (name docs operations) (let* [ds (if* (is-str? docs) docs \"\") ps (if* (is-str? docs) operations (if* (is-array? docs) docs)) _ (assert* (is-array? ps) \"no macro operations\")] (syntax-quote (const (unquote name) (monad (unquote ds) (unquote ps))))))",
  "dobind": "(macro* dobind (mbind steps expr) (let* [mv (nth* steps 1) a1 (nth* steps 0) more (rest* (rest* steps))] (syntax-quote ((unquote mbind) (unquote mv) (fn [(unquote a1)] (unquote (if* (not-empty* more) (syntax-quote (dobind (unquote mbind) (unquote more) (unquote expr))) (syntax-quote (do (unquote expr))))))))))",
  "domonad": "(macro* domonad (monad steps body) (syntax-quote ((fn [{:keys [bind unit zero] :as mo}] (var ret (lambda (if (and (kirbystdlibref/nichts? %1) (def? zero)) zero (unit %1)))) (dobind bind (unquote steps) (ret (unquote body)))) (unquote monad))))",
  "deftest": "(macro* deftest (name & body) (syntax-quote (const (unquote name) (lambda (vec (splice-unquote body))))))",
  "ensure": "(macro* ensure (form msg) (syntax-quote (kirbystdlibref/ensureTest (unquote form) (unquote msg))))",
  "ensureThrown": "(macro* ensureThrown (expected form msg) (syntax-quote (try (unquote form) (kirbystdlibref/ensureTestThrown (unquote expected) null (unquote msg)) (catch e (kirbystdlibref/ensureTestThrown (unquote expected) e (unquote msg))))))"
};
module.exports = {
  da57bc0172fb42438a11e6e8778f36fb: {
    ns: "czlab.kirby.stdlib",
    macros: ____macros
  }
};