var T=Object.defineProperty;var E=(t,e,n)=>e in t?T(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var o=(t,e,n)=>(E(t,typeof e!="symbol"?e+"":e,n),n);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function n(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=n(s);fetch(s.href,r)}})();const C="0123456789",w="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",S=8;function B(t){const e=w+C;let n="";for(let i=0;i<t;i++)n+=e.charAt(Math.floor(Math.random()*e.length));return n}class I{constructor(e="",n=!1){o(this,"id");o(this,"value");o(this,"completed");o(this,"toggleCompleted",()=>{this.completed=!this.completed});o(this,"setCompleted",(e=!0)=>{this.completed=e});o(this,"getCompleted",()=>this.completed);o(this,"setValue",e=>{this.value=e});o(this,"getValue",()=>this.value);this.id=B(S),this.value=e,this.completed=n}}class p{constructor(e){o(this,"list");o(this,"addTask",e=>(this.list.push(e),this.list));o(this,"getTaskById",e=>this.list.find(n=>n.id===e)||null);o(this,"getTaskByIndex",e=>this.list[e]||null);this.list=e||[]}deleteTaskById(e){this.list=this.list.filter(n=>n.id!==e)}}const l=document.querySelector("#task-list"),L=document.querySelector("#search-input"),v=document.querySelector("#add-task"),g=document.querySelector("#new-task-input"),d=document.querySelector("#tab-remaining"),a=document.querySelector("#tab-completed"),u=document.querySelector("#tab-all");if(!l||!L||!v||!g||!d||!a||!u)throw new Error("DOM elements not found");const h=new p;let y="all";v.addEventListener("click",()=>{const t=g.value.trim();t!==""&&(b(t),g.value="",f())});L.addEventListener("input",()=>{const t=L.value;f(t)});d.addEventListener("click",()=>{k("remaining")});a.addEventListener("click",()=>{k("completed")});u.addEventListener("click",()=>{k("all")});function b(t){const e=new I(t);h.addTask(e)}function f(t=""){const e=q(h,t);O(e)}function q(t,e=""){const n=t.list.filter(i=>i.value.toLowerCase().includes(e.toLowerCase()));return new p(n)}function O(t){if(!l)throw new Error("DOM element not found");l.innerHTML="",N(t,y).list.forEach(n=>{const i=document.createElement("div");i.classList.add("task-item");const s=document.createElement("label");s.classList.add("form-control"),i.appendChild(s);const r=document.createElement("input");r.setAttribute("type","checkbox"),r.checked=n.completed,r.addEventListener("change",()=>{P(n.id)});const c=document.createElement("div");c.classList.add("task-item-value"),c.textContent=n.value,s.appendChild(r),s.appendChild(c),l.appendChild(i);const m=document.createElement("button");m.classList.add("btn-delete"),m.textContent="Delete",m.addEventListener("click",()=>{M(n.id)}),i.appendChild(m),l.insertBefore(i,l.firstChild)})}function M(t){h.deleteTaskById(t),f()}function P(t){const e=h.getTaskById(t);e&&(e.toggleCompleted(),f())}function k(t){y=t,[d,a,u].forEach(e=>{e&&e.classList.remove("active")}),t==="remaining"?d==null||d.classList.add("active"):t==="completed"?a==null||a.classList.add("active"):u==null||u.classList.add("active"),f()}function N(t,e){return e==="completed"?new p(t.list.filter(n=>n.getCompleted())):e==="remaining"?new p(t.list.filter(n=>!n.getCompleted())):t}f();