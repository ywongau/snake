(this.webpackJsonpsnake=this.webpackJsonpsnake||[]).push([[0],{10:function(e,t,n){},11:function(e,t,n){"use strict";n.r(t);var o=n(0),a=n(1),r=n(3),s=n.n(r);n(9),n(10);var i=({food:e})=>Object(o.jsx)("div",{className:"food",style:{left:e[0]+"em",top:e[1]+"em",width:"1em",height:"1em"}}),c=({snake:e})=>e.map((e=>Object(o.jsx)("div",{className:"snake",style:{left:e[0]+"em",top:e[1]+"em",width:"1em",height:"1em"}},e))),d=({snake:e,food:t})=>Object(o.jsxs)(o.Fragment,{children:[Object(o.jsx)(c,{snake:e})," ",Object(o.jsx)(i,{food:t})]}),l={left:37,up:38,right:39,down:40};const m="next",u="init",h="direction";var v=(e,t,n)=>()=>{const[o,r]=Object(a.useReducer)((({next:e,init:t})=>(n,o)=>{switch(o.type){case m:return{...n,game:e(n.game,n.direction)};case h:return{...n,direction:o.payload};case u:return{...n,game:t(),timer:o.payload};default:return n}})(e),{game:void 0,timer:void 0,direction:l.up}),s=e=>{Object.values(l).includes(e.keyCode)&&r({type:h,payload:e.keyCode})};return o.game&&!o.game.isAlive&&n(o.timer),[o,()=>{const e=t((()=>{r({type:m})}));r({type:u,payload:e}),document.body.addEventListener("keydown",s)}]};const g=((e,t,n)=>{const o={[l.up]:[0,-1],[l.down]:[0,1],[l.left]:[-1,0],[l.right]:[1,0]},a=(e,t)=>{return n=e,o=t,2===Math.abs(n-o)?e:t;var n,o};return{init:()=>{const o=[[Math.floor(t/2),Math.floor(n/2)]];return{snake:o,isAlive:!0,food:e(o),movingDirection:l.up}},next:(r,s)=>{const i=a(r.movingDirection,s),c=o[i],d=[r.snake[0][0]+c[0],r.snake[0][1]+c[1]],l=(m=d,u=r.food,m[0]===u[0]&&m[1]===u[1]);var m,u;const h=l?r.snake:r.snake.slice(0,-1),v=[d,...h],g=!(e=>-1===e[0]||-1===e[1]||e[0]===t+1||e[1]===n+1)(d)&&(f=d,!h.some((e=>e[0]===f[0]&&e[1]===f[1])));var f;return{...r,snake:g?v:r.snake,food:l?e(v):r.food,isAlive:g,movingDirection:i}}}})(((e,t,n)=>{const o=[...new Array(t)].flatMap(((e,t)=>[...new Array(n)].map(((e,n)=>[t,n]))));return t=>{return((e,t)=>t[Math.floor(t.length*e)])(e(),o.filter((n=t,e=>!n.some((t=>t[0]===e[0]&&t[1]===e[1])))));var n}})(Math.random,31,23),31,23);var f=()=>{const[e,t]=v(g,(e=>setInterval(e,150)),clearInterval)();return Object(o.jsxs)("div",{className:"board",style:{width:"32em",height:"24em"},children:[e.game?Object(o.jsx)(d,{snake:e.game.snake,food:e.game.food}):null,e.game&&e.game.isAlive?null:Object(o.jsx)("button",{onClick:t,children:"Start"})]})};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(Object(o.jsx)(f,{}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((e=>{e.unregister()}))},9:function(e,t,n){}},[[11,1,2]]]);
//# sourceMappingURL=main.5d810b3e.chunk.js.map