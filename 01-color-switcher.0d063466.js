!function(){var t,e=document.querySelector("[data-start]"),r=document.querySelector("[data-stop]"),n=document.querySelector("body");function o(t){t.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0))}e.addEventListener("click",(function(){e.setAttribute("disabled",""),t=setInterval(o,1e3,n)})),r.addEventListener("click",(function(){clearInterval(t),e.removeAttribute("disabled")}))}();
//# sourceMappingURL=01-color-switcher.0d063466.js.map
