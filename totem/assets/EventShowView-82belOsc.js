import{B as x,_ as M,f as s,m as N,o as c,a as p,i as O,b as t,t as I,d as S,n as _,y as j,F,p as P,e as q}from"./index-7Mieldr-.js";import{_ as H}from"./Spinner-cCyAiQu3.js";import{_ as z}from"./ToastContainer-xDxOPs9U.js";function G(d){const r=new FormData;return r.append("video",d,"message.webm"),x.post("totem-api/clientsMessage/uploadVideo",r,{headers:{"Content-Type":"multipart/form-data"}}).then(n=>n.data)}const C=d=>(P("data-v-9388f388"),d=d(),q(),d),A={class:"container"},J={class:"card border"},K=C(()=>t("span",{class:"h2 title"},"Deixe uma Mensagem",-1)),Q={class:"video-wrapper"},W={key:0,class:"timer"},X={class:"btn-actions-wrapper"},Y={key:0,class:"allowed-record-wrapper"},Z={key:1,class:"not-allowed-record-wrapper w-100"},ee=C(()=>t("p",{class:"not-allowed-record-text"},"Não foi possível acessar a câmera",-1)),ae={key:0},te={__name:"EventShowView",setup(d){let r=null,n=null,l=null;const w=s(!!navigator.mediaDevices),k=s(null),f=s(null),h=s(""),g=s(""),o=s(!1),u=s(!1),v=s(!1),b=s(null),m=s(null),y=N(),T={backgroundImage:`url(${y.backgroundBaseUrl}/${y.currentEvent.background})`};function E(e){r=e}function B(){let e=3;return new Promise(a=>{const i=setInterval(()=>{if(e===0){clearInterval(i),g.value="",a();return}g.value=`${e--}`},1e3)})}function D(){let e=30;const a=setInterval(()=>{if(e===0){R(),h.value="",clearInterval(a);return}h.value=`(${e--})`},1e3);return a}async function L(){if(o.value||v.value)return;try{await navigator.mediaDevices.getUserMedia({audio:!0,video:!0}).then(E)}catch{w.value=!1;return}l=null,u.value=!1,f.value.src="",o.value=!1,k.value.srcObject=r,await B(),o.value=!0,n=new MediaRecorder(r,{mimeType:"video/webm"});const e=D();n.start();let a=[];n.addEventListener("dataavailable",i=>{a.push(i.data)}),n.addEventListener("stop",i=>{clearInterval(e),h.value="";const V=new Blob(a,{type:"video/webm"});l=V,a=[],f.value.src=URL.createObjectURL(V),u.value=!0})}function R(){o.value=!1,n.stop(),r.getTracks().forEach(e=>e.stop())}async function U(){v.value=!0;try{const{success:e,errors:a}=await G(l);if(e)m.value.pushToast("Mensagem enviada","success"),l=null,u.value=!1,o.value=!1,f.value.src="";else if(a)m.value.pushToast(a.video,"danger");else throw new Error}catch{m.value.pushToast("Houve um erro ao subir o arquivo. Por favor, Contate o administrador.","danger")}finally{v.value=!1}}function $(){if(l=b.value.files[0],l.type.split("/")[0]!=="video"){m.value.pushToast("O arquivo não é um vídeo válido","danger");return}f.value.src=URL.createObjectURL(l),u.value=!0}return(e,a)=>(c(),p(F,null,[O(z,{ref_key:"toastContainer",ref:m},null,512),t("div",{class:"background-image wrapper",style:T},[t("div",A,[t("div",J,[K,t("div",Q,[!o.value&&!u.value?(c(),p("span",W,I(g.value),1)):S("",!0),t("video",{class:_(["recording",o.value?"":"d-none"]),ref_key:"videoRecording",ref:k,muted:"",autoplay:""},null,2),o.value?S("",!0):(c(),p("video",{key:1,class:"recorded",ref_key:"videoRecorded",ref:f,controls:""},null,512))]),t("div",X,[w.value?(c(),p("div",Y,[t("button",{class:_(["btn-record",v.value||o.value?"disabled":""]),onClick:L},"Gravar",2),t("button",{class:_(["btn-stop",o.value?"":"disabled"]),onClick:R},"Parar "+I(h.value),3)])):(c(),p("div",Z,[ee,t("input",{type:"file",name:"chosen-video",capture:"user",accept:"video/*",ref_key:"chosenVideoInput",ref:b,hidden:"",onChange:$},null,544),t("button",{class:_(["choose-video",v.value?"disabled":""]),onClick:a[0]||(a[0]=(...i)=>b.value.click&&b.value.click(...i))}," Selecionar Vídeo do Dispositivo ",2)])),t("button",{class:_(u.value?"":"disabled"),onClick:U},[v.value?(c(),j(H,{key:1,class:"s-1rem"})):(c(),p("span",ae,"Enviar"))],2)])])])])],64))}},ne=M(te,[["__scopeId","data-v-9388f388"]]);export{ne as default};