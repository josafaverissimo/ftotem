import{A as P,_ as z,B as A,m as o,c as L,g as G,h as J,o as c,a as v,i as x,b as a,w as K,t as I,d as D,q as g,x as Q,C as W,F as X,D as Y,p as Z,f as ee}from"./index-pwADyDLL.js";import{_ as ae}from"./Spinner-MUg5lOjg.js";import{_ as te}from"./ToastContainer-LmxfOtjb.js";function se(i,w){const d=new FormData;return d.append("event_hash",i),d.append("video",w,"message.webm"),P.post("totem-api/clientsMessage/uploadVideo",d,{headers:{"Content-Type":"multipart/form-data"}}).then(u=>u.data)}const C=i=>(Z("data-v-60dbe274"),i=i(),ee(),i),oe={class:"actions-buttons-wrapper border p-2 rounded-5"},re=C(()=>a("i",{class:"bi bi-arrow-left-circle fs-5"},null,-1)),ne={class:"container-fluid"},le={class:"card border"},ce=C(()=>a("span",{class:"h4 title"},"Deixe sua mensagem",-1)),ie={class:"video-wrapper"},de={key:0,class:"timer"},ue={class:"btn-actions-wrapper"},ve={key:0,class:"allowed-record-wrapper"},pe={key:1,class:"not-allowed-record-wrapper w-100"},fe=C(()=>a("p",{class:"not-allowed-record-text"},"Não foi possível acessar a câmera",-1)),me={key:0},_e={__name:"EventShowView",setup(i){const w=A(),{hash:d}=w.currentRoute.value.params;let u=null,p=null,r=null;const V=o(!!navigator.mediaDevices),E=o(null),f=o(null),m=o(""),R=o(""),s=o(!1),n=o(!1),l=o(!1),$=L(()=>n.value?"Recomeçar":"Gravar"),k=o(null),_=o(null),y=G(),U=L(()=>{var e;return{backgroundImage:`url(${y.backgroundBaseUrl}/${(e=y.currentEvent)==null?void 0:e.background})`}});function N(e){u=e}function O(){let e=3;return new Promise(t=>{const h=setInterval(()=>{if(e===0){clearInterval(h),R.value="",t();return}R.value=`${e--}`},1e3)})}function H(){let e=30;m.value=`(${e})`;const t=setInterval(()=>{if(e===0){T(),m.value="",clearInterval(t);return}m.value=`(${--e})`},1e3);return t}async function M(e){if(s.value||l.value)return;const t=e.target;t.classList.add("disabled","pe-none");try{await navigator.mediaDevices.getUserMedia({audio:!0,video:!0}).then(N)}catch{V.value=!1,t.classList.remove("disabled","pe-none");return}r=null,n.value=!1,f.value.src="",s.value=!1,E.value.srcObject=u,await O(),s.value=!0,p=new MediaRecorder(u,{mimeType:"video/webm"});const h=H();p.start();let b=[];p.addEventListener("dataavailable",S=>{b.push(S.data)}),p.addEventListener("stop",S=>{clearInterval(h),m.value="";const B=new Blob(b,{type:"video/webm"});r=B,b=[],f.value.src=URL.createObjectURL(B),n.value=!0,t.classList.remove("disabled","pe-none")})}function T(){s.value=!1,p.stop(),u.getTracks().forEach(e=>e.stop())}async function j(){if(!l.value){l.value=!0;try{const{success:e,errors:t}=await se(d,r);if(e)_.value.pushToast("Mensagem enviada","success"),r=null,n.value=!1,s.value=!1,f.value.src="";else if(t)_.value.pushToast(t.video,"danger");else throw new Error}catch{_.value.pushToast("Houve um erro ao subir o arquivo. Por favor, Contate o administrador.","danger")}finally{l.value=!1}}}function q(){if(r=k.value.files[0],r.type.split("/")[0]!=="video"){_.value.pushToast("O arquivo não é um vídeo válido","danger");return}f.value.src=URL.createObjectURL(r),n.value=!0}async function F(){if(y.currentEvent)return;const{data:e}=await Y(d);if(!e){w.push("/");return}y.setCurrentEvent(e)}return F(),(e,t)=>{const h=J("router-link");return c(),v(X,null,[x(te,{ref_key:"toastContainer",ref:_},null,512),a("div",oe,[x(h,{to:"/",class:"btn btn-dark rounded-5"},{default:K(()=>[re]),_:1})]),a("div",{class:"background-image wrapper",style:W(U.value)},[a("div",ne,[a("div",le,[ce,a("div",ie,[!s.value&&!n.value?(c(),v("span",de,I(R.value),1)):D("",!0),a("video",{class:g(["recording",s.value?"":"d-none"]),ref_key:"videoRecording",ref:E,muted:"",autoplay:""},null,2),s.value?D("",!0):(c(),v("video",{key:1,class:"recorded",ref_key:"videoRecorded",ref:f,controls:""},null,512))]),a("div",ue,[V.value?(c(),v("div",ve,[a("button",{class:g(["btn-record",l.value||s.value?"disabled":""]),onClick:M},I($.value),3),a("button",{class:g(["btn-stop",s.value?"":"disabled"]),onClick:T}," Parar "+I(m.value),3)])):(c(),v("div",pe,[fe,a("input",{type:"file",name:"chosen-video",capture:"user",accept:"video/*",ref_key:"chosenVideoInput",ref:k,hidden:"",onChange:q},null,544),a("button",{class:g(["choose-video",l.value?"disabled":""]),onClick:t[0]||(t[0]=(...b)=>k.value.click&&k.value.click(...b))}," Selecionar Vídeo do Dispositivo ",2)])),a("button",{class:g(n.value?"":"disabled"),onClick:j},[l.value?(c(),Q(ae,{key:1,class:"s-1rem"})):(c(),v("span",me,"Enviar"))],2)])])])],4)],64)}}},we=z(_e,[["__scopeId","data-v-60dbe274"]]);export{we as default};