!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},o={},t=e.parcelRequire45c2;null==t&&((t=function(e){if(e in n)return n[e].exports;if(e in o){var t=o[e];delete o[e];var r={id:e,exports:{}};return n[e]=r,t.call(r.exports,r,r.exports),r.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,n){o[e]=n},e.parcelRequire45c2=t);var r=t("h6c0i");function i(e){return r.Notify.success(e)}function u(e){return r.Notify.failure(e)}function a(e,n,o){var t=Math.random()>.3,r=n+e*o-o;return console.log(e,r),new Promise((function(n,o){setTimeout((function(){return t?n("✅ Fulfilled promise ".concat(e," in ").concat(r)):o("❌ Rejected promise ".concat(e," in ").concat(r))}),r)}))}document.querySelector(".form").addEventListener("submit",(function(e){e.preventDefault();var n=new FormData(e.target),o={};n.forEach((function(e,n){return o[n]=Number(e)})),console.log("fomdata:",o);for(var t=o.delay,r=o.step,c=o.amount,f=1;f<=c;f+=1)a(f,t,r).then(i,u)}))}();
//# sourceMappingURL=03-promises.2c11e1e1.js.map