const e=document.querySelector("button[data-start]"),t=document.querySelector("button[data-stop]");t.disabled=!0,e.addEventListener("click",(a=>{colorChangeTimer=setInterval((()=>{document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}),1e3),e.disabled=!0,t.disabled=!1})),t.addEventListener("click",(a=>{clearInterval(colorChangeTimer),e.disabled=!1,t.disabled=!0}));
//# sourceMappingURL=01-color-switcher.9c1aa439.js.map
