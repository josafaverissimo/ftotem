import{m as p,E as b,o as r,a as u,b as m,r as h,q as v,e as x,k as T,c as g,F as k,j as C,x as w,w as y,G as B,t as $,H as E}from"./index-SQbSlupK.js";const L={class:"d-flex"},D={class:"toast-body"},H=m("button",{type:"button",class:"btn-close btn-close-white me-2 m-auto","data-bs-dismiss":"toast"},null,-1),I={__name:"Toast",props:["color"],emits:["hidden"],setup(c,{emit:i}){const s=i,e=c,l=e.color?`text-bg-${e.color}`:"text-bg-dark",o=p(null);return b(()=>{bootstrap.Toast.getOrCreateInstance(o.value).show();const{value:t}=o;t.addEventListener("hidden.bs.toast",()=>s("hidden")),setTimeout(()=>{t.classList.remove("animate__fadeInDown"),t.classList.add("animate__fadeOutUp"),setTimeout(()=>{s("hidden")},800)},3e3)}),(t,_)=>(r(),u("div",{class:v(["toast align-items-center border-0 animate__animated animate__fadeInDown",x(l)]),ref_key:"toast",ref:o,"data-bs-animation":"false","data-bs-autohide":"false"},[m("div",L,[m("div",D,[h(t.$slots,"default")]),H])],2))}},O={class:"toast-container toast-container position-fixed top-0 start-50 p-3 translate-middle-x"},N={__name:"ToastContainer",props:["color"],setup(c,{expose:i}){const s=c,e=T({});let l=0;const o=g(()=>Object.keys(e)),t=p(s.color);function _(n,d=null){const a=s.color;d&&(t.value=d),e[l++]=n,E(()=>{t.value=a})}function f(n){delete e[n]}return i({pushToast:_}),(n,d)=>(r(),u("div",O,[(r(!0),u(k,null,C(o.value,a=>(r(),w(I,{key:a,color:t.value,onHidden:j=>f(a)},{default:y(()=>[B($(e[a]),1)]),_:2},1032,["color","onHidden"]))),128))]))}};export{N as _};
