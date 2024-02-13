import{_ as R}from"./logo3-mF4Yn20y.js";import{_ as y,u as J,c as m,o as l,a as o,b as e,r as K,t as h,d as L,p as x,e as I,f as v,g as G,F as k,h as S,i as Q,w as W,v as X,n as Y,j as Z,k as ee,l as f,m as b,q as M,s as T}from"./index-2Qcw2tOZ.js";const te=t=>(x("data-v-62d8d8da"),t=t(),I(),t),se=te(()=>e("div",{class:"logo-wrapper"},[e("img",{src:R,alt:"relive logo"})],-1)),ne={key:0,class:"text-capitalize"},ae={__name:"Header",setup(t){const s=J(),r=m(()=>s.data?s.data.name.split(" ")[0]:"");return(d,_)=>(l(),o("header",null,[e("nav",null,[se,K(d.$slots,"default",{},void 0,!0),r.value?(l(),o("span",ne,"Olá, "+h(r.value),1)):L("",!0)])]))}},le=y(ae,[["__scopeId","data-v-62d8d8da"]]),oe={class:"event-card-wrapper"},ce={class:"img-title-wrapper"},re={class:"title text-capitalize"},ie={class:"img-wrapper shadow"},ue=["src"],de={__name:"EventCard",props:["imgSrc","title","clients"],setup(t){const s=t,r=v([]);return G(()=>{r.value.forEach(d=>{new bootstrap.Tooltip(d)})}),(d,_)=>(l(),o("div",oe,[e("div",ce,[e("span",re,h(s.title),1),e("div",ie,[e("img",{src:s.imgSrc,alt:"event image",loading:"lazy"},null,8,ue)])])]))}},_e=y(de,[["__scopeId","data-v-9be804ec"]]),j=t=>(x("data-v-6130750e"),t=t(),I(),t),pe={class:"table-wrapper"},ve=j(()=>e("span",{class:"h2 text-center w-100"},"Lista de clientes",-1)),me={class:"table-container"},he={class:"table table-striped w-100"},fe=j(()=>e("thead",null,[e("tr",null,[e("th",null,"Nome")])],-1)),ge=["data-bs-title"],be={__name:"EventClientsTable",props:["clients"],setup(t){const s=t;return(r,d)=>(l(),o("div",pe,[ve,e("div",me,[e("table",he,[fe,e("tbody",null,[(l(!0),o(k,null,S(s.clients,(_,p)=>(l(),o("tr",{key:p},[e("td",{class:"text-capitalize truncate","data-bs-toggle":"tooltip","data-bs-placement":"bottom","data-bs-title":_,ref_for:!0,ref:"tooltips"},h(_),9,ge)]))),128))])])])]))}},ye=y(be,[["__scopeId","data-v-6130750e"]]),B=t=>(x("data-v-cf750b58"),t=t(),I(),t),Ee={class:"my-select"},we=B(()=>e("option",{selected:"",disabled:""},null,-1)),$e=["value"],ke={class:"readonly-input"},Se=B(()=>e("i",{class:"bi bi-search icon"},null,-1)),xe={class:"container"},Ie={class:"fw-bold"},Ce=["value","onMousedown"],Oe={__name:"MySelect",props:["options"],emits:["change"],setup(t,{emit:s}){const r=t,d=s,_=Q({option:{value:"",textContent:""}}),p=v(""),i=m(()=>p===""?r.options:r.options.filter(n=>{const a=z(n.textContent).toLocaleLowerCase(),c=z(p.value).toLocaleLowerCase();return a.indexOf(c)!==-1})),u=m(()=>i.value.reduce((n,a)=>n[a.category]?(n[a.category].push(a),n):(n[a.category]=[a],n),{})),C=m(()=>Object.keys(u.value)),E=v(null),O=v(null),N=v([]),V=v(null),w=v(null),A=v(null);function D(){w.value.classList.add("d-block"),A.value.focus()}function F(){setTimeout(()=>{w.value.classList.remove("d-block")},100)}function U(){O.value.value="",O.value.querySelectorAll("option[selected]").forEach(n=>n.removeAttribute("selected")),w.value.querySelectorAll("ul li.selected").forEach(n=>n.classList.remove("selected"))}function H(n,a){U(),E.value.classList.add("filled"),_.option=a,n.target.classList.add("selected"),V.value.value=a.textContent;const c=N.value.find(g=>Number(g.value)===a.value);c.setAttribute("selected",""),c.parentNode.value=a.value,d("change",a)}function z(n){return n.replace(/[àáâã]/g,"a").replace(/[éê]/g,"e").replace(/í/g,"i").replace(/[óôõ]/g,"o").replace(/ú/g,"u").replace(/ç/g,"c").replace(/[ÀÁÂÃ]/g,"A").replace(/[ÉÊ]/g,"E").replace(/Í/g,"I").replace(/[ÓÔÕ]/g,"O").replace(/ÚÜ/g,"U").replace(/Ç/g,"C")}return(n,a)=>(l(),o("div",Ee,[e("select",{ref_key:"selectElement",ref:O},[we,(l(!0),o(k,null,S(r.options,(c,g)=>(l(),o("option",{key:g,value:c.value,ref_for:!0,ref_key:"optionsElements",ref:N},h(c.textContent),9,$e))),128))],512),e("label",ke,[e("span",{class:"my-select-placeholder",ref_key:"mySelectPlaceholderElement",ref:E},"Selecione um Evento",512),e("input",{type:"text",class:"form-control form-control-lg",readonly:"",onFocus:D,ref_key:"readonlySelectedOptionInputElement",ref:V},null,544)]),e("div",{class:"list",ref_key:"listElement",ref:w},[e("label",null,[Se,W(e("input",{type:"search",ref_key:"searchInputElement",ref:A,onBlur:F,"onUpdate:modelValue":a[0]||(a[0]=c=>p.value=c)},null,544),[[X,p.value]])]),e("ul",xe,[(l(!0),o(k,null,S(C.value,(c,g)=>(l(),o("li",{key:g,class:"category"},[e("span",Ie,h(c),1),e("ul",null,[(l(!0),o(k,null,S(u.value[c],($,He)=>(l(),o("li",{value:$.value,onMousedown:P=>H(P,$),class:Y(["item",_.option.value===$.value?"selected":""])},h($.textContent),43,Ce))),256))])]))),128))])],512)]))}},Le=y(Oe,[["__scopeId","data-v-cf750b58"]]),q=t=>(x("data-v-8f29f263"),t=t(),I(),t),Ne={class:"wrapper"},Ve={class:"actions-buttons-wrapper"},Ae=q(()=>e("i",{class:"bi bi-escape fs-5"},null,-1)),ze=[Ae],Me=q(()=>e("h1",{class:"display-2 fw-bolder"},"Eventos",-1)),Te={class:"event-wrapper animate__animated animate__fadeInRight"},je={class:"container"},Be={class:"event-metadata-wrapper"},qe={class:"event-category"},De={key:0,class:"text-capitalize h2 animate__animated animate__fadeIn"},Fe={key:0,class:"event-data-wrapper"},Ue={__name:"EventsView",setup(t){const s=Z(),r=m(()=>s.data.map((i,u)=>({value:u,textContent:i.name,category:i.category}))),d=m(()=>{const i=s.currentEvent.background;return i?`https://devjx.com/uploads/events/${i}`:""}),_=m(()=>{var u;return((u=s.currentEvent.clients)==null?void 0:u.split(", "))||["Nenhum cliente na lista."]});function p(i){s.setCurrentEvent(s.data[i.value])}return s.loadEvents(),(i,u)=>{const C=ee("router-link");return l(),o("div",Ne,[e("div",Ve,[e("button",{class:"btn btn-dark rounded-5",onClick:u[0]||(u[0]=(...E)=>f(T)&&f(T)(...E))},ze)]),b(le,{class:"animate__animated animate__fadeInDown"},{default:M(()=>[Me]),_:1}),e("div",Te,[e("div",je,[e("div",Be,[e("div",qe,[f(s).currentEvent?(l(),o("span",De,h(f(s).currentEvent.category),1)):L("",!0)]),b(Le,{options:r.value,onChange:p},null,8,["options"])]),f(s).currentEvent?(l(),o("div",Fe,[b(C,{to:"/event",class:"text-decoration-none"},{default:M(()=>[b(_e,{imgSrc:d.value,title:f(s).currentEvent.name,class:"animate__animated animate__fadeInUp"},null,8,["imgSrc","title"])]),_:1}),b(ye,{clients:_.value},null,8,["clients"])])):L("",!0)])])])}}},Je=y(Ue,[["__scopeId","data-v-8f29f263"]]);export{Je as default};