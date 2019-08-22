!function(t){var e={};function r(n){if(e[n])return e[n].exports;var i=e[n]={i:n,l:!1,exports:{}};return t[n].call(i.exports,i,i.exports,r),i.l=!0,i.exports}r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)r.d(n,i,function(e){return t[e]}.bind(null,i));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="dist/",r(r.s=1)}([,function(t,e,r){"use strict";r.r(e);
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
var n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(t,e)};function i(t,e){function r(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}var o=Array.isArray||function(t){return t&&"number"==typeof t.length};function u(t){return null!==t&&"object"==typeof t}function c(t){return"function"==typeof t}function s(t){return Error.call(this),this.message=t?t.length+" errors occurred during unsubscription:\n"+t.map(function(t,e){return e+1+") "+t.toString()}).join("\n  "):"",this.name="UnsubscriptionError",this.errors=t,this}s.prototype=Object.create(Error.prototype);var a=s,f=function(){function t(t){this.closed=!1,this._parentOrParents=null,this._subscriptions=null,t&&(this._unsubscribe=t)}return t.prototype.unsubscribe=function(){var e;if(!this.closed){var r=this._parentOrParents,n=this._unsubscribe,i=this._subscriptions;if(this.closed=!0,this._parentOrParents=null,this._subscriptions=null,r instanceof t)r.remove(this);else if(null!==r)for(var s=0;s<r.length;++s){r[s].remove(this)}if(c(n))try{n.call(this)}catch(t){e=t instanceof a?h(t.errors):[t]}if(o(i)){s=-1;for(var f=i.length;++s<f;){var l=i[s];if(u(l))try{l.unsubscribe()}catch(t){e=e||[],t instanceof a?e=e.concat(h(t.errors)):e.push(t)}}}if(e)throw new a(e)}},t.prototype.add=function(e){var r=e;if(!e)return t.EMPTY;switch(typeof e){case"function":r=new t(e);case"object":if(r===this||r.closed||"function"!=typeof r.unsubscribe)return r;if(this.closed)return r.unsubscribe(),r;if(!(r instanceof t)){var n=r;(r=new t)._subscriptions=[n]}break;default:throw new Error("unrecognized teardown "+e+" added to Subscription.")}var i=r._parentOrParents;if(null===i)r._parentOrParents=this;else if(i instanceof t){if(i===this)return r;r._parentOrParents=[i,this]}else{if(-1!==i.indexOf(this))return r;i.push(this)}var o=this._subscriptions;return null===o?this._subscriptions=[r]:o.push(r),r},t.prototype.remove=function(t){var e=this._subscriptions;if(e){var r=e.indexOf(t);-1!==r&&e.splice(r,1)}},t.EMPTY=function(t){return t.closed=!0,t}(new t),t}();function h(t){return t.reduce(function(t,e){return t.concat(e instanceof a?e.errors:e)},[])}var l=function(t){function e(e,r){var n=t.call(this,e,r)||this;return n.scheduler=e,n.work=r,n.pending=!1,n}return i(e,t),e.prototype.schedule=function(t,e){if(void 0===e&&(e=0),this.closed)return this;this.state=t;var r=this.id,n=this.scheduler;return null!=r&&(this.id=this.recycleAsyncId(n,r,e)),this.pending=!0,this.delay=e,this.id=this.id||this.requestAsyncId(n,this.id,e),this},e.prototype.requestAsyncId=function(t,e,r){return void 0===r&&(r=0),setInterval(t.flush.bind(t,this),r)},e.prototype.recycleAsyncId=function(t,e,r){if(void 0===r&&(r=0),null!==r&&this.delay===r&&!1===this.pending)return e;clearInterval(e)},e.prototype.execute=function(t,e){if(this.closed)return new Error("executing a cancelled action");this.pending=!1;var r=this._execute(t,e);if(r)return r;!1===this.pending&&null!=this.id&&(this.id=this.recycleAsyncId(this.scheduler,this.id,null))},e.prototype._execute=function(t,e){var r=!1,n=void 0;try{this.work(t)}catch(t){r=!0,n=!!t&&t||new Error(t)}if(r)return this.unsubscribe(),n},e.prototype._unsubscribe=function(){var t=this.id,e=this.scheduler,r=e.actions,n=r.indexOf(this);this.work=null,this.state=null,this.pending=!1,this.scheduler=null,-1!==n&&r.splice(n,1),null!=t&&(this.id=this.recycleAsyncId(e,t,null)),this.delay=null},e}(function(t){function e(e,r){return t.call(this)||this}return i(e,t),e.prototype.schedule=function(t,e){return void 0===e&&(e=0),this},e}(f)),p=function(){function t(e,r){void 0===r&&(r=t.now),this.SchedulerAction=e,this.now=r}return t.prototype.schedule=function(t,e,r){return void 0===e&&(e=0),new this.SchedulerAction(this,t).schedule(r,e)},t.now=function(){return Date.now()},t}(),d=new(function(t){function e(r,n){void 0===n&&(n=p.now);var i=t.call(this,r,function(){return e.delegate&&e.delegate!==i?e.delegate.now():n()})||this;return i.actions=[],i.active=!1,i.scheduled=void 0,i}return i(e,t),e.prototype.schedule=function(r,n,i){return void 0===n&&(n=0),e.delegate&&e.delegate!==this?e.delegate.schedule(r,n,i):t.prototype.schedule.call(this,r,n,i)},e.prototype.flush=function(t){var e=this.actions;if(this.active)e.push(t);else{var r;this.active=!0;do{if(r=t.execute(t.state,t.delay))break}while(t=e.shift());if(this.active=!1,r){for(;t=e.shift();)t.unsubscribe();throw r}}},e}(p))(l),y=!1,b={Promise:void 0,set useDeprecatedSynchronousErrorHandling(t){t&&(new Error).stack;y=t},get useDeprecatedSynchronousErrorHandling(){return y}};function v(t){setTimeout(function(){throw t},0)}var m={closed:!0,next:function(t){},error:function(t){if(b.useDeprecatedSynchronousErrorHandling)throw t;v(t)},complete:function(){}},w="function"==typeof Symbol?Symbol("rxSubscriber"):"@@rxSubscriber_"+Math.random(),_=function(t){function e(r,n,i){var o=t.call(this)||this;switch(o.syncErrorValue=null,o.syncErrorThrown=!1,o.syncErrorThrowable=!1,o.isStopped=!1,arguments.length){case 0:o.destination=m;break;case 1:if(!r){o.destination=m;break}if("object"==typeof r){r instanceof e?(o.syncErrorThrowable=r.syncErrorThrowable,o.destination=r,r.add(o)):(o.syncErrorThrowable=!0,o.destination=new g(o,r));break}default:o.syncErrorThrowable=!0,o.destination=new g(o,r,n,i)}return o}return i(e,t),e.prototype[w]=function(){return this},e.create=function(t,r,n){var i=new e(t,r,n);return i.syncErrorThrowable=!1,i},e.prototype.next=function(t){this.isStopped||this._next(t)},e.prototype.error=function(t){this.isStopped||(this.isStopped=!0,this._error(t))},e.prototype.complete=function(){this.isStopped||(this.isStopped=!0,this._complete())},e.prototype.unsubscribe=function(){this.closed||(this.isStopped=!0,t.prototype.unsubscribe.call(this))},e.prototype._next=function(t){this.destination.next(t)},e.prototype._error=function(t){this.destination.error(t),this.unsubscribe()},e.prototype._complete=function(){this.destination.complete(),this.unsubscribe()},e.prototype._unsubscribeAndRecycle=function(){var t=this._parentOrParents;return this._parentOrParents=null,this.unsubscribe(),this.closed=!1,this.isStopped=!1,this._parentOrParents=t,this},e}(f),g=function(t){function e(e,r,n,i){var o,u=t.call(this)||this;u._parentSubscriber=e;var s=u;return c(r)?o=r:r&&(o=r.next,n=r.error,i=r.complete,r!==m&&(c((s=Object.create(r)).unsubscribe)&&u.add(s.unsubscribe.bind(s)),s.unsubscribe=u.unsubscribe.bind(u))),u._context=s,u._next=o,u._error=n,u._complete=i,u}return i(e,t),e.prototype.next=function(t){if(!this.isStopped&&this._next){var e=this._parentSubscriber;b.useDeprecatedSynchronousErrorHandling&&e.syncErrorThrowable?this.__tryOrSetError(e,this._next,t)&&this.unsubscribe():this.__tryOrUnsub(this._next,t)}},e.prototype.error=function(t){if(!this.isStopped){var e=this._parentSubscriber,r=b.useDeprecatedSynchronousErrorHandling;if(this._error)r&&e.syncErrorThrowable?(this.__tryOrSetError(e,this._error,t),this.unsubscribe()):(this.__tryOrUnsub(this._error,t),this.unsubscribe());else if(e.syncErrorThrowable)r?(e.syncErrorValue=t,e.syncErrorThrown=!0):v(t),this.unsubscribe();else{if(this.unsubscribe(),r)throw t;v(t)}}},e.prototype.complete=function(){var t=this;if(!this.isStopped){var e=this._parentSubscriber;if(this._complete){var r=function(){return t._complete.call(t._context)};b.useDeprecatedSynchronousErrorHandling&&e.syncErrorThrowable?(this.__tryOrSetError(e,r),this.unsubscribe()):(this.__tryOrUnsub(r),this.unsubscribe())}else this.unsubscribe()}},e.prototype.__tryOrUnsub=function(t,e){try{t.call(this._context,e)}catch(t){if(this.unsubscribe(),b.useDeprecatedSynchronousErrorHandling)throw t;v(t)}},e.prototype.__tryOrSetError=function(t,e,r){if(!b.useDeprecatedSynchronousErrorHandling)throw new Error("bad call");try{e.call(this._context,r)}catch(e){return b.useDeprecatedSynchronousErrorHandling?(t.syncErrorValue=e,t.syncErrorThrown=!0,!0):(v(e),!0)}return!1},e.prototype._unsubscribe=function(){var t=this._parentSubscriber;this._context=null,this._parentSubscriber=null,t.unsubscribe()},e}(_);function S(t,e){var r=!1;return arguments.length>=2&&(r=!0),function(n){return n.lift(new x(t,e,r))}}var x=function(){function t(t,e,r){void 0===r&&(r=!1),this.accumulator=t,this.seed=e,this.hasSeed=r}return t.prototype.call=function(t,e){return e.subscribe(new E(t,this.accumulator,this.seed,this.hasSeed))},t}(),E=function(t){function e(e,r,n,i){var o=t.call(this,e)||this;return o.accumulator=r,o._seed=n,o.hasSeed=i,o.index=0,o}return i(e,t),Object.defineProperty(e.prototype,"seed",{get:function(){return this._seed},set:function(t){this.hasSeed=!0,this._seed=t},enumerable:!0,configurable:!0}),e.prototype._next=function(t){if(this.hasSeed)return this._tryNext(t);this.seed=t,this.destination.next(t)},e.prototype._tryNext=function(t){var e,r=this.index++;try{e=this.accumulator(this.seed,t,r)}catch(t){this.destination.error(t)}this.seed=e,this.destination.next(e)},e}(_);var P="function"==typeof Symbol&&Symbol.observable||"@@observable";function T(){}function O(t){return t?1===t.length?t[0]:function(e){return t.reduce(function(t,e){return e(t)},e)}:T}var I=function(){function t(t){this._isScalar=!1,t&&(this._subscribe=t)}return t.prototype.lift=function(e){var r=new t;return r.source=this,r.operator=e,r},t.prototype.subscribe=function(t,e,r){var n=this.operator,i=function(t,e,r){if(t){if(t instanceof _)return t;if(t[w])return t[w]()}return t||e||r?new _(t,e,r):new _(m)}(t,e,r);if(n?i.add(n.call(i,this.source)):i.add(this.source||b.useDeprecatedSynchronousErrorHandling&&!i.syncErrorThrowable?this._subscribe(i):this._trySubscribe(i)),b.useDeprecatedSynchronousErrorHandling&&i.syncErrorThrowable&&(i.syncErrorThrowable=!1,i.syncErrorThrown))throw i.syncErrorValue;return i},t.prototype._trySubscribe=function(t){try{return this._subscribe(t)}catch(e){b.useDeprecatedSynchronousErrorHandling&&(t.syncErrorThrown=!0,t.syncErrorValue=e),!function(t){for(;t;){var e=t,r=e.closed,n=e.destination,i=e.isStopped;if(r||i)return!1;t=n&&n instanceof _?n:null}return!0}(t)?console.warn(e):t.error(e)}},t.prototype.forEach=function(t,e){var r=this;return new(e=j(e))(function(e,n){var i;i=r.subscribe(function(e){try{t(e)}catch(t){n(t),i&&i.unsubscribe()}},n,e)})},t.prototype._subscribe=function(t){var e=this.source;return e&&e.subscribe(t)},t.prototype[P]=function(){return this},t.prototype.pipe=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];return 0===t.length?this:O(t)(this)},t.prototype.toPromise=function(t){var e=this;return new(t=j(t))(function(t,r){var n;e.subscribe(function(t){return n=t},function(t){return r(t)},function(){return t(n)})})},t.create=function(e){return new t(e)},t}();function j(t){if(t||(t=b.Promise||Promise),!t)throw new Error("no Promise impl found");return t}var N=function(t){return function(e){for(var r=0,n=t.length;r<n&&!e.closed;r++)e.next(t[r]);e.complete()}};function A(){return"function"==typeof Symbol&&Symbol.iterator?Symbol.iterator:"@@iterator"}var k=A(),V=function(t){return t&&"number"==typeof t.length&&"function"!=typeof t};function D(t){return!!t&&"function"!=typeof t.subscribe&&"function"==typeof t.then}var L=function(t){if(t&&"function"==typeof t[P])return n=t,function(t){var e=n[P]();if("function"!=typeof e.subscribe)throw new TypeError("Provided object does not correctly implement Symbol.observable");return e.subscribe(t)};if(V(t))return N(t);if(D(t))return r=t,function(t){return r.then(function(e){t.closed||(t.next(e),t.complete())},function(e){return t.error(e)}).then(null,v),t};if(t&&"function"==typeof t[k])return e=t,function(t){for(var r=e[k]();;){var n=r.next();if(n.done){t.complete();break}if(t.next(n.value),t.closed)break}return"function"==typeof r.return&&t.add(function(){r.return&&r.return()}),t};var e,r,n,i=u(t)?"an invalid object":"'"+t+"'";throw new TypeError("You provided "+i+" where a stream was expected. You can provide an Observable, Promise, Array, or Iterable.")};function H(t,e){return new I(function(r){var n=new f,i=0;return n.add(e.schedule(function(){i!==t.length?(r.next(t[i++]),r.closed||n.add(this.schedule())):r.complete()})),n})}function R(t,e){if(null!=t){if(function(t){return t&&"function"==typeof t[P]}(t))return function(t,e){return new I(function(r){var n=new f;return n.add(e.schedule(function(){var i=t[P]();n.add(i.subscribe({next:function(t){n.add(e.schedule(function(){return r.next(t)}))},error:function(t){n.add(e.schedule(function(){return r.error(t)}))},complete:function(){n.add(e.schedule(function(){return r.complete()}))}}))})),n})}(t,e);if(D(t))return function(t,e){return new I(function(r){var n=new f;return n.add(e.schedule(function(){return t.then(function(t){n.add(e.schedule(function(){r.next(t),n.add(e.schedule(function(){return r.complete()}))}))},function(t){n.add(e.schedule(function(){return r.error(t)}))})})),n})}(t,e);if(V(t))return H(t,e);if(function(t){return t&&"function"==typeof t[k]}(t)||"string"==typeof t)return function(t,e){if(!t)throw new Error("Iterable cannot be null");return new I(function(r){var n,i=new f;return i.add(function(){n&&"function"==typeof n.return&&n.return()}),i.add(e.schedule(function(){n=t[k](),i.add(e.schedule(function(){if(!r.closed){var t,e;try{var i=n.next();t=i.value,e=i.done}catch(t){return void r.error(t)}e?r.complete():(r.next(t),this.schedule())}}))})),i})}(t,e)}throw new TypeError((null!==t&&typeof t||t)+" is not observable")}function C(t,e){return e?R(t,e):t instanceof I?t:new I(L(t))}var G=new I(function(t){return t.complete()});function M(t){return t?function(t){return new I(function(e){return t.schedule(function(){return e.complete()})})}(t):G}function Y(t,e){return function(r){if("function"!=typeof t)throw new TypeError("argument is not a function. Are you looking for `mapTo()`?");return r.lift(new F(t,e))}}var F=function(){function t(t,e){this.project=t,this.thisArg=e}return t.prototype.call=function(t,e){return e.subscribe(new B(t,this.project,this.thisArg))},t}(),B=function(t){function e(e,r,n){var i=t.call(this,e)||this;return i.project=r,i.count=0,i.thisArg=n||i,i}return i(e,t),e.prototype._next=function(t){var e;try{e=this.project.call(this.thisArg,t,this.count++)}catch(t){return void this.destination.error(t)}this.destination.next(e)},e}(_);var U=function(){return function(t,e){this.value=t,this.interval=e}}();function K(t){return t&&"function"==typeof t.schedule}function q(t,e){return e?H(t,e):new I(N(t))}var z=function(t){function e(e,r,n){var i=t.call(this)||this;return i.parent=e,i.outerValue=r,i.outerIndex=n,i.index=0,i}return i(e,t),e.prototype._next=function(t){this.parent.notifyNext(this.outerValue,t,this.outerIndex,this.index++,this)},e.prototype._error=function(t){this.parent.notifyError(t,this),this.unsubscribe()},e.prototype._complete=function(){this.parent.notifyComplete(this),this.unsubscribe()},e}(_);function W(t,e,r,n,i){if(void 0===i&&(i=new z(t,r,n)),!i.closed)return e instanceof I?e.subscribe(i):L(e)(i)}var J=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return i(e,t),e.prototype.notifyNext=function(t,e,r,n,i){this.destination.next(e)},e.prototype.notifyError=function(t,e){this.destination.error(t)},e.prototype.notifyComplete=function(t){this.destination.complete()},e}(_);var Q=function(){function t(t,e){void 0===e&&(e=Number.POSITIVE_INFINITY),this.project=t,this.concurrent=e}return t.prototype.call=function(t,e){return e.subscribe(new X(t,this.project,this.concurrent))},t}(),X=function(t){function e(e,r,n){void 0===n&&(n=Number.POSITIVE_INFINITY);var i=t.call(this,e)||this;return i.project=r,i.concurrent=n,i.hasCompleted=!1,i.buffer=[],i.active=0,i.index=0,i}return i(e,t),e.prototype._next=function(t){this.active<this.concurrent?this._tryNext(t):this.buffer.push(t)},e.prototype._tryNext=function(t){var e,r=this.index++;try{e=this.project(t,r)}catch(t){return void this.destination.error(t)}this.active++,this._innerSub(e,t,r)},e.prototype._innerSub=function(t,e,r){var n=new z(this,void 0,void 0);this.destination.add(n),W(this,t,e,r,n)},e.prototype._complete=function(){this.hasCompleted=!0,0===this.active&&0===this.buffer.length&&this.destination.complete(),this.unsubscribe()},e.prototype.notifyNext=function(t,e,r,n,i){this.destination.next(e)},e.prototype.notifyComplete=function(t){var e=this.buffer;this.remove(t),this.active--,e.length>0?this._next(e.shift()):0===this.active&&this.hasCompleted&&this.destination.complete()},e}(J);function Z(t){return t}function $(t){return void 0===t&&(t=Number.POSITIVE_INFINITY),function t(e,r,n){return void 0===n&&(n=Number.POSITIVE_INFINITY),"function"==typeof r?function(i){return i.pipe(t(function(t,n){return C(e(t,n)).pipe(Y(function(e,i){return r(t,e,n,i)}))},n))}:("number"==typeof r&&(n=r),function(t){return t.lift(new Q(e,n))})}(Z,t)}function tt(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];return $(1)(function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];var r=t[t.length-1];return K(r)?(t.pop(),H(t,r)):q(t)}.apply(void 0,t))}var et=function(){function t(t,e){this.compare=t,this.keySelector=e}return t.prototype.call=function(t,e){return e.subscribe(new rt(t,this.compare,this.keySelector))},t}(),rt=function(t){function e(e,r,n){var i=t.call(this,e)||this;return i.keySelector=n,i.hasKey=!1,"function"==typeof r&&(i.compare=r),i}return i(e,t),e.prototype.compare=function(t,e){return t===e},e.prototype._next=function(t){var e;try{var r=this.keySelector;e=r?r(t):t}catch(t){return this.destination.error(t)}var n=!1;if(this.hasKey)try{n=(0,this.compare)(this.key,e)}catch(t){return this.destination.error(t)}else this.hasKey=!0;n||(this.key=e,this.destination.next(t))},e}(_);function nt(t){var e=t.subscriber,r=t.counter,n=t.period;e.next(r),this.schedule({subscriber:e,counter:r+1,period:n},n)}Object.prototype.toString;function it(t,e,r,n){return c(r)&&(n=r,r=void 0),n?it(t,e,r).pipe(Y(function(t){return o(t)?n.apply(void 0,t):n(t)})):new I(function(n){!function t(e,r,n,i,o){var u;if(function(t){return t&&"function"==typeof t.addEventListener&&"function"==typeof t.removeEventListener}(e)){var c=e;e.addEventListener(r,n,o),u=function(){return c.removeEventListener(r,n,o)}}else if(function(t){return t&&"function"==typeof t.on&&"function"==typeof t.off}(e)){var s=e;e.on(r,n),u=function(){return s.off(r,n)}}else if(function(t){return t&&"function"==typeof t.addListener&&"function"==typeof t.removeListener}(e)){var a=e;e.addListener(r,n),u=function(){return a.removeListener(r,n)}}else{if(!e||!e.length)throw new TypeError("Invalid event target");for(var f=0,h=e.length;f<h;f++)t(e[f],r,n,i,o)}i.add(u)}(t,e,function(t){arguments.length>1?n.next(Array.prototype.slice.call(arguments)):n.next(t)},n,r)})}var ot,ut,ct,st,at,ft=(ot=1e3,void 0===ot&&(ot=0),void 0===ut&&(ut=d),(o(ct=ot)||!(ct-parseFloat(ct)+1>=0)||ot<0)&&(ot=0),ut&&"function"==typeof ut.schedule||(ut=d),new I(function(t){return t.add(ut.schedule(nt,ot,{subscriber:t,counter:0,period:ot})),t})).pipe(function(t){return void 0===t&&(t=d),function(e){return r=function(){return e.pipe(S(function(e,r){var n=e.current;return{value:r,current:t.now(),last:n}},{current:t.now(),value:void 0,last:void 0}),Y(function(t){var e=t.current,r=t.last,n=t.value;return new U(n,e-r)}))},new I(function(t){var e;try{e=r()}catch(e){return void t.error(e)}return(e?C(e):M()).subscribe(t)});var r}}(),Y(function(t){return{deltaTime:t.interval/1e3}})),ht=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];var r=Number.POSITIVE_INFINITY,n=null,i=t[t.length-1];return K(i)?(n=t.pop(),t.length>1&&"number"==typeof t[t.length-1]&&(r=t.pop())):"number"==typeof i&&(r=t.pop()),null===n&&1===t.length&&t[0]instanceof I?t[0]:$(r)(q(t,n))}(it(document,"mousedown"),it(document,"touchstart")).pipe(function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];var r=t[t.length-1];return K(r)?(t.pop(),function(e){return tt(t,e,r)}):function(e){return tt(t,e)}}(!1),function(t){return t.lift(new et(st,at))});var lt=function(){function t(t,e){this.observables=t,this.project=e}return t.prototype.call=function(t,e){return e.subscribe(new pt(t,this.observables,this.project))},t}(),pt=function(t){function e(e,r,n){var i=t.call(this,e)||this;i.observables=r,i.project=n,i.toRespond=[];var o=r.length;i.values=new Array(o);for(var u=0;u<o;u++)i.toRespond.push(u);for(u=0;u<o;u++){var c=r[u];i.add(W(i,c,c,u))}return i}return i(e,t),e.prototype.notifyNext=function(t,e,r,n,i){this.values[r]=e;var o=this.toRespond;if(o.length>0){var u=o.indexOf(r);-1!==u&&o.splice(u,1)}},e.prototype.notifyComplete=function(){},e.prototype._next=function(t){if(0===this.toRespond.length){var e=[t].concat(this.values);this.project?this._tryProject(e):this.destination.next(e)}},e.prototype._tryProject=function(t){var e;try{e=this.project.apply(this,t)}catch(t){return void this.destination.error(t)}this.destination.next(e)},e}(J);var dt=function(){function t(t,e){this.predicate=t,this.thisArg=e}return t.prototype.call=function(t,e){return e.subscribe(new yt(t,this.predicate,this.thisArg))},t}(),yt=function(t){function e(e,r,n){var i=t.call(this,e)||this;return i.predicate=r,i.thisArg=n,i.count=0,i}return i(e,t),e.prototype._next=function(t){var e;try{e=this.predicate.call(this.thisArg,t,this.count++)}catch(t){return void this.destination.error(t)}e&&this.destination.next(t)},e}(_);function bt(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var r=[],n=!0,i=!1,o=void 0;try{for(var u,c=t[Symbol.iterator]();!(n=(u=c.next()).done)&&(r.push(u.value),!e||r.length!==e);n=!0);}catch(t){i=!0,o=t}finally{try{n||null==c.return||c.return()}finally{if(i)throw o}}return r}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var vt=100;function mt(t,e){var r=bt(e,2),n=(r[0],r[1]);if(function(t,e){return e&&t.target&&"btn-new"===t.target.className}(n))return St();if(function(t){return t.target&&"btn-hold"===t.target.className}(n))return Et(t);if(function(t){return t.target&&"btn-roll"===t.target.className}(n))return xt(t);if(t.isGameOver)t.isGameRunning=!1;else if(t.board[t.activePlayer].roundScore>=vt)return function(t){return t.isGameOver=!0,t}(t);return t}var wt=function(t){return t.board[t.activePlayer].boardElement.classList.remove("active"),t.activePlayer=0===t.activePlayer?1:0,t.board[t.activePlayer].boardElement.classList.add("active"),t},_t=function(t){return t.board[t.activePlayer].roundScore=0,t.board[t.activePlayer].roundScoreElement.innerText=t.board[t.activePlayer].roundScore,t};function gt(t){return t.isGameRunning}function St(){var t,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=(t=[],[0,1].map(function(e){var r=Nt(e);r.roundScoreElement.innerText=0,r.currentScoreElement.innerText=0,r.nameElement.innerText="Player "+e,t.push(r)}),{board:t,dice:document.getElementsByClassName("dice")[0],diceValue:1});return Object.assign({},{isGameOver:!1,isGameRunning:!0,activePlayer:0},r,e)}var xt=function(t){return t.isGameOver?t:(1===(t=Pt(t)).diceValue&&(t=_t(t),t=wt(t)),function(t){return t.board[t.activePlayer].roundScore+=t.diceValue,t.board[t.activePlayer].roundScoreElement.innerText=t.board[t.activePlayer].roundScore,t}(t))},Et=function(t){return t.isGameRunning?(t.board[t.activePlayer].score+=t.board[t.activePlayer].roundScore,t.board[t.activePlayer].currentScoreElement.innerText=t.board[t.activePlayer].score,_t(t),t.board[t.activePlayer].score>=vt?(t.board[t.activePlayer].nameElement.innerText="Winner",t.isGameRunning=!1,t):wt(t)):t},Pt=function(t){return t.diceValue=Math.floor(1+6*Math.random()),t.dice.classList.remove(t.dice.classList[1]),t.dice.classList.add("roll-"+t.diceValue),t},Tt=function(t){return document.getElementsByClassName("player-".concat(t,"-panel"))[0]},Ot=function(t){return document.getElementById("name-"+t)},It=function(t){return document.getElementById("score-"+t)},jt=function(t){return document.getElementById("current-"+t)},Nt=function(t){return{boardElement:Tt(t),nameElement:Ot(t),roundScoreElement:It(t),currentScoreElement:jt(t),score:0,roundScore:0}};(function(){var t,e,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return ft.pipe(function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];return function(e){var r;"function"==typeof t[t.length-1]&&(r=t.pop());var n=t;return e.lift(new lt(n,r))}}(ht),S(mt,St(r)),(t=gt,function(r){return r.lift(new dt(t,e))}))})().subscribe(console.log("hihi"))}]);