import{A as ne,_ as O,o as g,a as C,B as ae,m as U,k as ie,c as M,g as re,C as oe,h as se,i as R,b as s,w as le,t as D,d as N,q as T,x as ce,D as pe,F as ue,E as ye,p as me,f as de}from"./index-IGrksR5B.js";import{_ as xe}from"./Spinner-EqCGG6Xn.js";import{_ as fe}from"./ToastContainer-C5jnUWGW.js";function ge(u,b){const y=new FormData;return y.append("event_hash",u),y.append("video",b,"message.webm"),ne.post("totem-api/clientsMessage/uploadVideo",y,{headers:{"Content-Type":"multipart/form-data"}}).then(l=>l.data)}function he(u){return u&&u.__esModule&&Object.prototype.hasOwnProperty.call(u,"default")?u.default:u}var H={exports:{}};(function(u){(function(b,y){u.exports?u.exports=y():window.ysFixWebmDuration=y()})("fix-webm-duration",function(){var b={172351395:{name:"EBML",type:"Container"},646:{name:"EBMLVersion",type:"Uint"},759:{name:"EBMLReadVersion",type:"Uint"},754:{name:"EBMLMaxIDLength",type:"Uint"},755:{name:"EBMLMaxSizeLength",type:"Uint"},642:{name:"DocType",type:"String"},647:{name:"DocTypeVersion",type:"Uint"},645:{name:"DocTypeReadVersion",type:"Uint"},108:{name:"Void",type:"Binary"},63:{name:"CRC-32",type:"Binary"},190023271:{name:"SignatureSlot",type:"Container"},16010:{name:"SignatureAlgo",type:"Uint"},16026:{name:"SignatureHash",type:"Uint"},16037:{name:"SignaturePublicKey",type:"Binary"},16053:{name:"Signature",type:"Binary"},15963:{name:"SignatureElements",type:"Container"},15995:{name:"SignatureElementList",type:"Container"},9522:{name:"SignedElement",type:"Binary"},139690087:{name:"Segment",type:"Container"},21863284:{name:"SeekHead",type:"Container"},3515:{name:"Seek",type:"Container"},5035:{name:"SeekID",type:"Binary"},5036:{name:"SeekPosition",type:"Uint"},88713574:{name:"Info",type:"Container"},13220:{name:"SegmentUID",type:"Binary"},13188:{name:"SegmentFilename",type:"String"},1882403:{name:"PrevUID",type:"Binary"},1868715:{name:"PrevFilename",type:"String"},2013475:{name:"NextUID",type:"Binary"},1999803:{name:"NextFilename",type:"String"},1092:{name:"SegmentFamily",type:"Binary"},10532:{name:"ChapterTranslate",type:"Container"},10748:{name:"ChapterTranslateEditionUID",type:"Uint"},10687:{name:"ChapterTranslateCodec",type:"Uint"},10661:{name:"ChapterTranslateID",type:"Binary"},710577:{name:"TimecodeScale",type:"Uint"},1161:{name:"Duration",type:"Float"},1121:{name:"DateUTC",type:"Date"},15273:{name:"Title",type:"String"},3456:{name:"MuxingApp",type:"String"},5953:{name:"WritingApp",type:"String"},103:{name:"Timecode",type:"Uint"},6228:{name:"SilentTracks",type:"Container"},6359:{name:"SilentTrackNumber",type:"Uint"},39:{name:"Position",type:"Uint"},43:{name:"PrevSize",type:"Uint"},35:{name:"SimpleBlock",type:"Binary"},32:{name:"BlockGroup",type:"Container"},33:{name:"Block",type:"Binary"},34:{name:"BlockVirtual",type:"Binary"},13729:{name:"BlockAdditions",type:"Container"},38:{name:"BlockMore",type:"Container"},110:{name:"BlockAddID",type:"Uint"},37:{name:"BlockAdditional",type:"Binary"},27:{name:"BlockDuration",type:"Uint"},122:{name:"ReferencePriority",type:"Uint"},123:{name:"ReferenceBlock",type:"Int"},125:{name:"ReferenceVirtual",type:"Int"},36:{name:"CodecState",type:"Binary"},13730:{name:"DiscardPadding",type:"Int"},14:{name:"Slices",type:"Container"},104:{name:"TimeSlice",type:"Container"},76:{name:"LaceNumber",type:"Uint"},77:{name:"FrameNumber",type:"Uint"},75:{name:"BlockAdditionID",type:"Uint"},78:{name:"Delay",type:"Uint"},79:{name:"SliceDuration",type:"Uint"},72:{name:"ReferenceFrame",type:"Container"},73:{name:"ReferenceOffset",type:"Uint"},74:{name:"ReferenceTimeCode",type:"Uint"},47:{name:"EncryptedBlock",type:"Binary"},106212971:{name:"Tracks",type:"Container"},46:{name:"TrackEntry",type:"Container"},87:{name:"TrackNumber",type:"Uint"},13253:{name:"TrackUID",type:"Uint"},3:{name:"TrackType",type:"Uint"},57:{name:"FlagEnabled",type:"Uint"},8:{name:"FlagDefault",type:"Uint"},5546:{name:"FlagForced",type:"Uint"},28:{name:"FlagLacing",type:"Uint"},11751:{name:"MinCache",type:"Uint"},11768:{name:"MaxCache",type:"Uint"},254851:{name:"DefaultDuration",type:"Uint"},216698:{name:"DefaultDecodedFieldDuration",type:"Uint"},209231:{name:"TrackTimecodeScale",type:"Float"},4991:{name:"TrackOffset",type:"Int"},5614:{name:"MaxBlockAdditionID",type:"Uint"},4974:{name:"Name",type:"String"},177564:{name:"Language",type:"String"},6:{name:"CodecID",type:"String"},9122:{name:"CodecPrivate",type:"Binary"},362120:{name:"CodecName",type:"String"},13382:{name:"AttachmentLink",type:"Uint"},1742487:{name:"CodecSettings",type:"String"},1785920:{name:"CodecInfoURL",type:"String"},438848:{name:"CodecDownloadURL",type:"String"},42:{name:"CodecDecodeAll",type:"Uint"},12203:{name:"TrackOverlay",type:"Uint"},5802:{name:"CodecDelay",type:"Uint"},5819:{name:"SeekPreRoll",type:"Uint"},9764:{name:"TrackTranslate",type:"Container"},9980:{name:"TrackTranslateEditionUID",type:"Uint"},9919:{name:"TrackTranslateCodec",type:"Uint"},9893:{name:"TrackTranslateTrackID",type:"Binary"},96:{name:"Video",type:"Container"},26:{name:"FlagInterlaced",type:"Uint"},5048:{name:"StereoMode",type:"Uint"},5056:{name:"AlphaMode",type:"Uint"},5049:{name:"OldStereoMode",type:"Uint"},48:{name:"PixelWidth",type:"Uint"},58:{name:"PixelHeight",type:"Uint"},5290:{name:"PixelCropBottom",type:"Uint"},5307:{name:"PixelCropTop",type:"Uint"},5324:{name:"PixelCropLeft",type:"Uint"},5341:{name:"PixelCropRight",type:"Uint"},5296:{name:"DisplayWidth",type:"Uint"},5306:{name:"DisplayHeight",type:"Uint"},5298:{name:"DisplayUnit",type:"Uint"},5299:{name:"AspectRatioType",type:"Uint"},963876:{name:"ColourSpace",type:"Binary"},1029411:{name:"GammaValue",type:"Float"},230371:{name:"FrameRate",type:"Float"},97:{name:"Audio",type:"Container"},53:{name:"SamplingFrequency",type:"Float"},14517:{name:"OutputSamplingFrequency",type:"Float"},31:{name:"Channels",type:"Uint"},15739:{name:"ChannelPositions",type:"Binary"},8804:{name:"BitDepth",type:"Uint"},98:{name:"TrackOperation",type:"Container"},99:{name:"TrackCombinePlanes",type:"Container"},100:{name:"TrackPlane",type:"Container"},101:{name:"TrackPlaneUID",type:"Uint"},102:{name:"TrackPlaneType",type:"Uint"},105:{name:"TrackJoinBlocks",type:"Container"},109:{name:"TrackJoinUID",type:"Uint"},64:{name:"TrickTrackUID",type:"Uint"},65:{name:"TrickTrackSegmentUID",type:"Binary"},70:{name:"TrickTrackFlag",type:"Uint"},71:{name:"TrickMasterTrackUID",type:"Uint"},68:{name:"TrickMasterTrackSegmentUID",type:"Binary"},11648:{name:"ContentEncodings",type:"Container"},8768:{name:"ContentEncoding",type:"Container"},4145:{name:"ContentEncodingOrder",type:"Uint"},4146:{name:"ContentEncodingScope",type:"Uint"},4147:{name:"ContentEncodingType",type:"Uint"},4148:{name:"ContentCompression",type:"Container"},596:{name:"ContentCompAlgo",type:"Uint"},597:{name:"ContentCompSettings",type:"Binary"},4149:{name:"ContentEncryption",type:"Container"},2017:{name:"ContentEncAlgo",type:"Uint"},2018:{name:"ContentEncKeyID",type:"Binary"},2019:{name:"ContentSignature",type:"Binary"},2020:{name:"ContentSigKeyID",type:"Binary"},2021:{name:"ContentSigAlgo",type:"Uint"},2022:{name:"ContentSigHashAlgo",type:"Uint"},206814059:{name:"Cues",type:"Container"},59:{name:"CuePoint",type:"Container"},51:{name:"CueTime",type:"Uint"},55:{name:"CueTrackPositions",type:"Container"},119:{name:"CueTrack",type:"Uint"},113:{name:"CueClusterPosition",type:"Uint"},112:{name:"CueRelativePosition",type:"Uint"},50:{name:"CueDuration",type:"Uint"},4984:{name:"CueBlockNumber",type:"Uint"},106:{name:"CueCodecState",type:"Uint"},91:{name:"CueReference",type:"Container"},22:{name:"CueRefTime",type:"Uint"},23:{name:"CueRefCluster",type:"Uint"},4959:{name:"CueRefNumber",type:"Uint"},107:{name:"CueRefCodecState",type:"Uint"},155296873:{name:"Attachments",type:"Container"},8615:{name:"AttachedFile",type:"Container"},1662:{name:"FileDescription",type:"String"},1646:{name:"FileName",type:"String"},1632:{name:"FileMimeType",type:"String"},1628:{name:"FileData",type:"Binary"},1710:{name:"FileUID",type:"Uint"},1653:{name:"FileReferral",type:"Binary"},1633:{name:"FileUsedStartTime",type:"Uint"},1634:{name:"FileUsedEndTime",type:"Uint"},4433776:{name:"Chapters",type:"Container"},1465:{name:"EditionEntry",type:"Container"},1468:{name:"EditionUID",type:"Uint"},1469:{name:"EditionFlagHidden",type:"Uint"},1499:{name:"EditionFlagDefault",type:"Uint"},1501:{name:"EditionFlagOrdered",type:"Uint"},54:{name:"ChapterAtom",type:"Container"},13252:{name:"ChapterUID",type:"Uint"},5716:{name:"ChapterStringUID",type:"String"},17:{name:"ChapterTimeStart",type:"Uint"},18:{name:"ChapterTimeEnd",type:"Uint"},24:{name:"ChapterFlagHidden",type:"Uint"},1432:{name:"ChapterFlagEnabled",type:"Uint"},11879:{name:"ChapterSegmentUID",type:"Binary"},11964:{name:"ChapterSegmentEditionUID",type:"Uint"},9155:{name:"ChapterPhysicalEquiv",type:"Uint"},15:{name:"ChapterTrack",type:"Container"},9:{name:"ChapterTrackNumber",type:"Uint"},0:{name:"ChapterDisplay",type:"Container"},5:{name:"ChapString",type:"String"},892:{name:"ChapLanguage",type:"String"},894:{name:"ChapCountry",type:"String"},10564:{name:"ChapProcess",type:"Container"},10581:{name:"ChapProcessCodecID",type:"Uint"},1293:{name:"ChapProcessPrivate",type:"Binary"},10513:{name:"ChapProcessCommand",type:"Container"},10530:{name:"ChapProcessTime",type:"Uint"},10547:{name:"ChapProcessData",type:"Binary"},39109479:{name:"Tags",type:"Container"},13171:{name:"Tag",type:"Container"},9152:{name:"Targets",type:"Container"},10442:{name:"TargetTypeValue",type:"Uint"},9162:{name:"TargetType",type:"String"},9157:{name:"TagTrackUID",type:"Uint"},9161:{name:"TagEditionUID",type:"Uint"},9156:{name:"TagChapterUID",type:"Uint"},9158:{name:"TagAttachmentUID",type:"Uint"},10184:{name:"SimpleTag",type:"Container"},1443:{name:"TagName",type:"String"},1146:{name:"TagLanguage",type:"String"},1156:{name:"TagDefault",type:"Uint"},1159:{name:"TagString",type:"String"},1157:{name:"TagBinary",type:"Binary"}};function y(e,n){e.prototype=Object.create(n.prototype),e.prototype.constructor=e}function l(e,n){this.name=e||"Unknown",this.type=n||"Unknown"}l.prototype.updateBySource=function(){},l.prototype.setSource=function(e){this.source=e,this.updateBySource()},l.prototype.updateByData=function(){},l.prototype.setData=function(e){this.data=e,this.updateByData()};function h(e,n){l.call(this,e,n||"Uint")}y(h,l);function x(e){return e.length%2===1?"0"+e:e}h.prototype.updateBySource=function(){this.data="";for(var e=0;e<this.source.length;e++){var n=this.source[e].toString(16);this.data+=x(n)}},h.prototype.updateByData=function(){var e=this.data.length/2;this.source=new Uint8Array(e);for(var n=0;n<e;n++){var t=this.data.substr(n*2,2);this.source[n]=parseInt(t,16)}},h.prototype.getValue=function(){return parseInt(this.data,16)},h.prototype.setValue=function(e){this.setData(x(e.toString(16)))};function v(e,n){l.call(this,e,n||"Float")}y(v,l),v.prototype.getFloatArrayType=function(){return this.source&&this.source.length===4?Float32Array:Float64Array},v.prototype.updateBySource=function(){var e=this.source.reverse(),n=this.getFloatArrayType(),t=new n(e.buffer);this.data=t[0]},v.prototype.updateByData=function(){var e=this.getFloatArrayType(),n=new e([this.data]),t=new Uint8Array(n.buffer);this.source=t.reverse()},v.prototype.getValue=function(){return this.data},v.prototype.setValue=function(e){this.setData(e)};function f(e,n){l.call(this,e,n||"Container")}y(f,l),f.prototype.readByte=function(){return this.source[this.offset++]},f.prototype.readUint=function(){for(var e=this.readByte(),n=8-e.toString(2).length,t=e-(1<<7-n),r=0;r<n;r++)t*=256,t+=this.readByte();return t},f.prototype.updateBySource=function(){for(this.data=[],this.offset=0;this.offset<this.source.length;this.offset=t){var e=this.readUint(),n=this.readUint(),t=Math.min(this.offset+n,this.source.length),r=this.source.slice(this.offset,t),o=b[e]||{name:"Unknown",type:"Unknown"},p=l;switch(o.type){case"Container":p=f;break;case"Uint":p=h;break;case"Float":p=v;break}var m=new p(o.name,o.type);m.setSource(r),this.data.push({id:e,idHex:e.toString(16),data:m})}},f.prototype.writeUint=function(e,n){for(var t=1,r=128;e>=r&&t<8;t++,r*=128);if(!n)for(var o=r+e,p=t-1;p>=0;p--){var m=o%256;this.source[this.offset+p]=m,o=(o-m)/256}this.offset+=t},f.prototype.writeSections=function(e){this.offset=0;for(var n=0;n<this.data.length;n++){var t=this.data[n],r=t.data.source,o=r.length;this.writeUint(t.id,e),this.writeUint(o,e),e||this.source.set(r,this.offset),this.offset+=o}return this.offset},f.prototype.updateByData=function(){var e=this.writeSections("draft");this.source=new Uint8Array(e),this.writeSections()},f.prototype.getSectionById=function(e){for(var n=0;n<this.data.length;n++){var t=this.data[n];if(t.id===e)return t.data}return null};function c(e){f.call(this,"File","File"),this.setSource(e)}y(c,f),c.prototype.fixDuration=function(e,n){var t=n&&n.logger;t===void 0?t=function(S){console.log(S)}:t||(t=function(){});var r=this.getSectionById(139690087);if(!r)return t("[fix-webm-duration] Segment section is missing"),!1;var o=r.getSectionById(88713574);if(!o)return t("[fix-webm-duration] Info section is missing"),!1;var p=o.getSectionById(710577);if(!p)return t("[fix-webm-duration] TimecodeScale section is missing"),!1;var m=o.getSectionById(1161);if(m)if(m.getValue()<=0)t("[fix-webm-duration] Duration section is present, but the value is empty"),m.setValue(e);else return t("[fix-webm-duration] Duration section is present"),!1;else t("[fix-webm-duration] Duration section is missing"),m=new v("Duration","Float"),m.setValue(e),o.data.push({id:1161,data:m});return p.setValue(1e6),o.updateByData(),r.updateByData(),this.updateByData(),!0},c.prototype.toBlob=function(e){return new Blob([this.source.buffer],{type:e||"video/webm"})};function i(e,n,t,r){if(typeof t=="object"&&(r=t,t=void 0),!t)return new Promise(function(p){i(e,n,p,r)});try{var o=new FileReader;o.onloadend=function(){try{var p=new c(new Uint8Array(o.result));p.fixDuration(n,r)&&(e=p.toBlob(e.type))}catch{}t(e)},o.readAsArrayBuffer(e)}catch{t(e)}}return i.default=i,i})})(H);var ve=H.exports;const Ce=he(ve),Ue=["value","step","min","max"],be={__name:"Slider",props:["value","step","min","max"],emits:["change"],setup(u,{emit:b}){const y=u,l=b;return(h,x)=>(g(),C("input",{type:"range",class:"win10-thumb",onChange:x[0]||(x[0]=v=>l("change",v.target.value)),value:u.value,step:y.step,min:y.min,max:y.max},null,40,Ue))}},Se=O(be,[["__scopeId","data-v-0f65cca3"]]),V=u=>(me("data-v-500f1a2b"),u=u(),de(),u),Te={class:"actions-buttons-wrapper border p-2 rounded-5"},ke=V(()=>s("i",{class:"bi bi-arrow-left-circle fs-5"},null,-1)),De={class:"container-fluid"},Be=V(()=>s("span",{class:"h4 title"},"Deixe sua mensagem",-1)),_e={class:"video-wrapper"},we={key:0,class:"timer"},Fe={class:"video-controls"},Ie={class:"btn-wrapper"},Ee={class:"btn-play-wrapper"},Re={key:0,class:"bi bi-play-fill"},Ve={key:1,class:"bi bi-pause-fill"},Pe={key:0,class:"video-time"},Ae={key:0,class:"bi bi-fullscreen"},Le={key:1,class:"bi bi-fullscreen-exit"},Me={class:"btn-actions-wrapper"},Ne={key:0,class:"allowed-record-wrapper"},Oe={key:1,class:"not-allowed-record-wrapper w-100"},He=V(()=>s("p",{class:"not-allowed-record-text"},"Não foi possível acessar a câmera",-1)),We={key:0},$e={key:0,class:"bi bi-fullscreen"},je={key:1,class:"bi bi-fullscreen-exit"},qe={__name:"EventShowView",setup(u){const b=ae(),{hash:y}=b.currentRoute.value.params;let l=null,h=null,x=null;const v=U(!!navigator.mediaDevices),f=U(null),c=U(null),i=ie({length:"00:00",progress:"00:00",barMaxValue:0,barStep:.01,barValue:0,isPlaying:!1,isFullscreen:!1}),e=U(""),n=U(""),t=U(!1),r=U(!1),o=U(!1),p=M(()=>r.value?"Recomeçar":"Gravar"),m=U(null),S=U(null),_=U(null),B=re(),W=M(()=>{var a;return{backgroundImage:`url(${B.backgroundBaseUrl}/${(a=B.currentEvent)==null?void 0:a.background})`}});function $(a){i.barValue=a,c.value.currentTime=a}function j(a){l=a}function q(){let a=3;return new Promise(d=>{const k=setInterval(()=>{if(a===0){clearInterval(k),n.value="",d();return}n.value=`${a--}`},1e3)})}function z(){let a=20;e.value=`(${a})`;const d=setInterval(()=>{if(a===0){P(),e.value="",clearInterval(d);return}e.value=`(${--a})`},1e3);return d}async function G(a){if(t.value||o.value)return;w();const d=a.target;d.classList.add("disabled","pe-none");try{await navigator.mediaDevices.getUserMedia({audio:!0,video:!0}).then(j)}catch{v.value=!1,d.classList.remove("disabled","pe-none");return}x=null,r.value=!1,c.value.src="",t.value=!1,f.value.srcObject=l,await q(),t.value=!0,A(),h=new MediaRecorder(l,{mimeType:"video/webm"});const k=z();h.start();const F=Date.now();let I=[];h.addEventListener("dataavailable",E=>{I.push(E.data)}),h.addEventListener("stop",async E=>{const te=Date.now()-F;clearInterval(k),e.value="",x=await Ce(new Blob(I,{type:"video/webm"}),te,{logger:!1}),I=[],c.value.src=URL.createObjectURL(x),c.value.load(),r.value=!0,d.classList.remove("disabled","pe-none")})}function P(){t.value=!1,h.stop(),l.getTracks().forEach(a=>a.stop())}async function K(){if(!o.value){o.value=!0;try{const{success:a,errors:d}=await ge(y,x);if(a)S.value.pushToast("Vídeo Enviado!","success"),x=null,r.value=!1,t.value=!1,c.value.src="",w();else if(d)S.value.pushToast(d.video,"danger");else throw new Error}catch{S.value.pushToast("Houve um erro ao subir o arquivo. Por favor, Contate o administrador.","danger")}finally{o.value=!1}}}function J(){if(x=m.value.files[0],x.type.split("/")[0]!=="video"){S.value.pushToast("O arquivo não é um vídeo válido","danger");return}c.value.src=URL.createObjectURL(x),r.value=!0}async function Q(){if(B.currentEvent)return;const{data:a}=await ye(y);if(!a){b.push("/");return}B.setCurrentEvent(a)}function X(a){const d=String(Math.floor(a)).padStart(2,"0");i.length=`00:${d}`}function Y(){const a=c.value.duration;isNaN(a)||!isFinite(a)||(X(a),i.barMaxValue=a)}function Z(){i.isPlaying?c.value.pause():c.value.play(),i.isPlaying=!i.isPlaying}function w(){i.isPlaying=!1,i.barValue=0,i.progress="00:00"}function ee(){const a=String(Math.floor(c.value.currentTime)).padStart(2,"0");i.barValue=c.value.currentTime,i.progress=`00:${a}`}function A(){i.isFullscreen||(document.body.requestFullscreen(),_.value.classList.add("fullscreen"),i.isFullscreen=!0)}function L(){if(!i.isFullscreen){A();return}_.value.classList.remove("fullscreen"),document.exitFullscreen(),i.isFullscreen=!i.isFullscreen}return Q(),oe(()=>{c.value.addEventListener("durationchange",Y),c.value.addEventListener("timeupdate",ee),c.value.addEventListener("ended",w)}),(a,d)=>{const k=se("router-link");return g(),C(ue,null,[R(fe,{ref_key:"toastContainer",ref:S,style:{"z-index":"3000"}},null,512),s("div",Te,[R(k,{to:"/",class:"btn btn-dark rounded-5"},{default:le(()=>[ke]),_:1})]),s("div",{class:"background-image wrapper",style:pe(W.value)},[s("div",De,[s("div",{class:"card border",ref_key:"cardElement",ref:_},[Be,s("div",_e,[!t.value&&!r.value?(g(),C("span",we,D(n.value),1)):N("",!0),s("video",{class:T(["recording",t.value?"":"d-none"]),ref_key:"videoRecording",ref:f,muted:"",autoplay:"",tabindex:"-1"},null,2),s("video",{class:T(["recorded",t.value?"d-none":""]),ref_key:"videoRecorded",ref:c,tabindex:"-1"},null,2),s("div",Fe,[R(Se,{class:"my-slider",step:i.barStep,min:0,value:i.barValue,max:i.barMaxValue,onChange:$},null,8,["step","value","max"]),s("div",Ie,[s("div",Ee,[s("button",{class:T(["btn-control",r.value?"":"disabled"]),onClick:Z},[i.isPlaying?(g(),C("i",Ve)):(g(),C("i",Re))],2),r.value?(g(),C("span",Pe,D(i.progress)+" | "+D(i.length),1)):N("",!0),s("button",{class:"btn-control btn-fullscreen-mobile",onClick:L},[i.isFullscreen?(g(),C("i",Le)):(g(),C("i",Ae))])]),s("div",Me,[v.value?(g(),C("div",Ne,[s("button",{class:T(["btn-record",o.value||t.value?"disabled":""]),onClick:G},D(p.value),3),s("button",{class:T(["btn-stop",t.value?"":"disabled"]),onClick:P}," Parar "+D(e.value),3)])):(g(),C("div",Oe,[He,s("input",{type:"file",name:"chosen-video",capture:"user",accept:"video/*",ref_key:"chosenVideoInput",ref:m,hidden:"",onChange:J},null,544),s("button",{class:T(["choose-video",o.value?"disabled":""]),onClick:d[0]||(d[0]=(...F)=>m.value.click&&m.value.click(...F))}," Selecionar Vídeo do Dispositivo ",2)])),s("button",{class:T(r.value?"":"disabled"),onClick:K},[o.value?(g(),ce(xe,{key:1,class:"s-1rem"})):(g(),C("span",We,"Enviar"))],2)]),s("button",{class:"btn-control btn-fullscreen-desktop",onClick:L},[i.isFullscreen?(g(),C("i",je)):(g(),C("i",$e))])])])])],512)])],4)],64)}}},Je=O(qe,[["__scopeId","data-v-500f1a2b"]]);export{Je as default};