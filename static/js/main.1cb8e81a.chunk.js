(this["webpackJsonptelegram-bot-ui"]=this["webpackJsonptelegram-bot-ui"]||[]).push([[0],{128:function(e,t,n){},148:function(e,t,n){},224:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n(34),i=n.n(c),r=(n(128),n(129),n(47)),o=n(226),s=n(228),l=n(227),d=n(61),j=n(40),u=n(46),h=n.n(u),b=(n(148),n(17)),p="http://localhost:3001/",O=-1;var x=function(){var e=Object(a.useState)([]),t=Object(r.a)(e,2),n=t[0],c=t[1],i=Object(a.useState)(0),u=Object(r.a)(i,2),x=u[0],y=u[1],g=Object(a.useState)("usd"),v=Object(r.a)(g,2),m=v[0],f=v[1],k=Object(a.useState)("GREATER"),C=Object(r.a)(k,2),S=C[0],E=C[1],I=Object(a.useState)(""),T=Object(r.a)(I,2),N=T[0],B=T[1],R=Object(a.useState)(-1),A=Object(r.a)(R,2),D=A[0],P=A[1],w=function(){console.log("sync started...");h.a.get(p+"sync").then((function(e){c(e.data)}))},L=d.a.Option,F=Object(b.jsxs)(d.a,{defaultValue:"GREATER",style:{width:120},onChange:E,children:[Object(b.jsx)(L,{value:"GREATER",children:"GREATER"}),Object(b.jsx)(L,{value:"LESS",children:"LESS"})]}),G=[{title:"Parity",dataIndex:"parity",key:"parity"},{title:"Operation",dataIndex:"operation",key:"operation"},{title:"Price",dataIndex:"price",key:"price"},{title:"Date",dataIndex:"date",key:"date"},{title:"Condition",dataIndex:"conditionDone",key:"conditionDone",render:function(e,t){var n="red";return t.conditionDone&&(n=t.candleCloseCondition?"green":"yellow"),Object(b.jsx)("div",{style:{width:"10px",height:"10px",backgroundColor:n}})}},{dataIndex:"remove",key:"remove",render:function(e,t){return Object(b.jsx)(j.a,{type:"primary",danger:!0,onClick:function(){return e=t.key,console.log(e),void h.a.post(p+"remove",{key:e}).then((function(e){c(e.data)}));var e},children:" DELETE"})}}];return Object(b.jsxs)("div",{className:"App",children:[Object(b.jsxs)("div",{style:{display:"flex"},children:[Object(b.jsx)(j.a,{className:"setupButtons",type:"primary",onClick:w,children:"SYNC"}),Object(b.jsx)(j.a,{className:"setupButtons",type:"primary",onClick:function(){clearInterval(O),h.a.get(p+"startBot").then((function(e){console.log(e.data)})),O=setInterval((function(){w()}),3e5)},children:"Start Track"}),Object(b.jsx)(j.a,{className:"setupButtons",type:"primary",onClick:function(){clearInterval(O);h.a.get(p+"stop").then((function(e){console.log(e.data)}))},children:"Stop Track"})]}),Object(b.jsxs)("div",{children:[Object(b.jsx)(l.a,{placeholder:"telegram api",onChange:function(e){return B(e.target.value)}}),Object(b.jsx)(l.a,{placeholder:"chatId",onChange:function(e){return P(e.target.value)}}),Object(b.jsx)(j.a,{className:"setupButtons",type:"primary",onClick:function(){h.a.post(p+"setTelegram",{telegramApi:N,chatId:D}).then((function(e){console.log("telegramSet")}))},children:"Set Telegram"})]}),Object(b.jsxs)("div",{className:"additionBox",children:[Object(b.jsxs)("div",{className:"additionMenu",children:[Object(b.jsx)("h3",{children:"Parity"}),Object(b.jsx)("h3",{children:"Operation"}),Object(b.jsx)("h3",{children:"Price"}),Object(b.jsx)("h3",{})]}),Object(b.jsxs)("div",{className:"additionMenu",children:[Object(b.jsx)("div",{children:Object(b.jsx)(l.a,{placeholder:"parity",onChange:function(e){return f(e.target.value)}})}),Object(b.jsx)("div",{children:F}),Object(b.jsx)("div",{children:Object(b.jsx)(s.a,{onChange:y})}),Object(b.jsx)("div",{children:Object(b.jsx)(j.a,{type:"primary",onClick:function(){var e={parity:m,operation:S,price:x};h.a.post(p+"add",e).then((function(e){c(e.data)}))},children:"+"})})]})]}),Object(b.jsx)("div",{className:"trackTable",children:Object(b.jsx)(o.a,{columns:G,dataSource:n})})]})},y=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,229)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,i=t.getLCP,r=t.getTTFB;n(e),a(e),c(e),i(e),r(e)}))};i.a.render(Object(b.jsx)(x,{}),document.getElementById("root")),y()}},[[224,1,2]]]);
//# sourceMappingURL=main.1cb8e81a.chunk.js.map