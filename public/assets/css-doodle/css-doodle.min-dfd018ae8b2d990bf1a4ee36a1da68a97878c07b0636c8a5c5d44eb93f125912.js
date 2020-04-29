!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e=e||self).CSSDoodle=t()}(this,(function(){"use strict";function e(e){let t=0,r=1,n=1;return{curr:(r=0)=>e[t+r],end:()=>e.length<=t,info:()=>({index:t,col:r,line:n}),index:e=>void 0===e?t:t=e,next(){let s=e[t++];return"\n"==s?(n++,r=0):r++,s}}}function t(t){t=t.trim();let r=[];if(!/^var\(/.test(t))return r;let n=e(t);try{r=function(e){let t="",r=[],n=[],s={};for(;!e.end();){let i=e.curr();if("("==i)r.push(i),t="";else if(")"==i||","==i){if(/^\-\-.+/.test(t)&&(s.name?(s.alternative||(s.alternative=[]),s.alternative.push({name:t})):s.name=t),")"==i){if("("!=r[r.length-1])throw new Error("bad match");r.pop()}","==i&&(r.length||(n.push(s),s={})),t=""}else/\s/.test(i)||(t+=i);e.next()}return r.length?[]:(s.name&&n.push(s),n)}(n)}catch(e){console.error(e&&e.message||"Bad variables.")}return r}function r(e){return Array.isArray(e)?e:[e]}function n(e,t="\n"){return(e||[]).join(t)}function s(e,t=1){return e[e.length-t]}function i(e){return e[0]}function l(e,t){return Array.prototype.flatMap?e.flatMap(t):e.reduce((e,r)=>e.concat(t(r)),[])}const u={func:(e="")=>({type:"func",name:e,arguments:[]}),argument:()=>({type:"argument",value:[]}),text:(e="")=>({type:"text",value:e}),pseudo:(e="")=>({type:"pseudo",selector:e,styles:[]}),cond:(e="")=>({type:"cond",name:e,styles:[],arguments:[]}),rule:(e="")=>({type:"rule",property:e,value:[]}),keyframes:(e="")=>({type:"keyframes",name:e,steps:[]}),step:(e="")=>({type:"step",name:e,styles:[]})},o={white_space:e=>/[\s\n\t]/.test(e),line_break:e=>/\n/.test(e),number:e=>!isNaN(e),pair:e=>['"',"(",")","'"].includes(e),pair_of:(e,t)=>({'"':'"',"'":"'","(":")"}[e]==t)},a={"π":Math.PI,"∏":Math.PI};function c(e,{col:t,line:r}){console.error(`(at line ${r}, column ${t}) ${e}`)}function p(e){return function(t,r){let n=t.index(),s="";for(;!t.end();){let r=t.next();if(e(r))break;s+=r}return r&&t.index(n),s}}function h(e,t){return p(e=>/[^\w@]/.test(e))(e,t)}function f(e){return p(e=>/[\s\{]/.test(e))(e)}function d(e,t){return p(e=>o.line_break(e)||"{"==e)(e,t)}function g(e,t){let r,n=u.step();for(;!e.end()&&"}"!=(r=e.curr());)if(o.white_space(r))e.next();else{if(n.name.length){if(n.styles.push(S(e,t)),"}"==e.curr())break}else n.name=z(e);e.next()}return n}function m(e,t){const r=[];let n;for(;!e.end()&&"}"!=(n=e.curr());)o.white_space(n)||r.push(g(e,t)),e.next();return r}function y(e,t){let r,n=u.keyframes();for(;!e.end()&&"}"!=(r=e.curr());)if(n.name.length){if("{"==r){e.next(),n.steps=m(e,t);break}e.next()}else if(h(e),n.name=f(e),!n.name.length){c("missing keyframes name",e.info());break}return n}function v(e,t={}){for(e.next();!e.end();){let r=e.curr();if(t.inline){if("\n"==r)break}else if("*"==(r=e.curr())&&"/"==e.curr(1))break;e.next()}t.inline||(e.next(),e.next())}function _(e){let t,r="";for(;!e.end()&&":"!=(t=e.curr());)o.white_space(t)||(r+=t),e.next();return r}function x(e,t){let r,n=[],i=[],l=[],c="";for(;!e.end();){if(r=e.curr(),/[\('"`]/.test(r)&&"\\"!==e.curr(-1))l.length&&"("!=r&&r===s(l)?l.pop():l.push(r),c+=r;else if("@"==r)i.length||(c=c.trimLeft()),c.length&&(i.push(u.text(c)),c=""),i.push($(e));else if(/[,)]/.test(r))if(l.length)")"==r&&l.pop(),c+=r;else{if(c.length&&(i.length?i.push(u.text(c)):i.push(u.text((h=c).trim().length?o.number(+h)?+h:h.trim():h)),c.startsWith("±"))){let e=c.substr(1),t=(p=i,JSON.parse(JSON.stringify(p)));s(t).value="-"+e,n.push(b(t)),s(i).value=e}if(n.push(b(i)),[i,c]=[[],""],")"==r)break}else a[r]&&(r=a[r]),c+=r;if(t&&")"==e.curr()&&!l.length){i.length&&n.push(b(i));break}e.next()}var p,h;return n}function b(e){let t=e.map(e=>{if("text"==e.type&&"string"==typeof e.value){let t=String(e.value);t.includes("`")&&(e.value=t=t.replace(/`/g,'"')),e.value=t.replace(/\n+|\s+/g," ")}return e}),r=i(t)||{},n=s(t)||{};if("text"==r.type&&"text"==n.type){let e=i(r.value),l=s(n.value);"string"==typeof r.value&&"string"==typeof n.value&&o.pair_of(e,l)&&(r.value=r.value.slice(1),n.value=n.value.slice(0,n.value.length-1),t.cluster=!0)}return t}function $(e){let t,r=u.func(),n="@",s=!1;for(e.next();!e.end();){t=e.curr();let i="."==t&&"@"==e.curr(1),l=e.curr(1);if("("==t||i){s=!0,e.next(),r.arguments=x(e,i);break}if(!s&&"("!==l&&!/[0-9a-zA-Z_\-.]/.test(l)){n+=t;break}n+=t,e.next()}let{fname:i,extra:l}=function(e){let t="",r="";if(/\D$/.test(e)||Math[e.substr(1)])return{fname:e,extra:r};for(let n=e.length-1;n>=0;n--){let s=e[n];if(!/[\d.]/.test(s)){t=e.substring(0,n+1);break}r=s+r}return{fname:t,extra:r}}(n);return r.name=i,l.length&&r.arguments.unshift([{type:"text",value:l}]),r.position=e.info().index,r}function k(e){let t,r=u.text(),n=0,s=!0;const i=[],l=[];for(i[n]=[];!e.end();)if(t=e.curr(),s&&o.white_space(t))e.next();else{if(s=!1,"\n"!=t||o.white_space(e.curr(-1)))if(","!=t||l.length){if(/[;}]/.test(t)){r.value.length&&(i[n].push(r),r=u.text());break}"@"==t?(r.value.length&&(i[n].push(r),r=u.text()),i[n].push($(e))):o.white_space(t)&&o.white_space(e.curr(-1))||("("==t&&l.push(t),")"==t&&l.pop(),a[t]&&(t=a[t]),r.value+=t)}else r.value.length&&(i[n].push(r),r=u.text()),i[++n]=[],s=!0;else r.value+=" ";e.next()}return r.value.length&&i[n].push(r),i}function z(e){let t,r="";for(;!e.end()&&"{"!=(t=e.curr());)o.white_space(t)||(r+=t),e.next();return r}function w(e){let t,r={name:"",arguments:[]};for(;!e.end();){if("("==(t=e.curr()))e.next(),r.arguments=x(e);else{if(/[){]/.test(t))break;o.white_space(t)||(r.name+=t)}e.next()}return r}function j(e,t){let r,n=u.pseudo();for(;!e.end()&&"}"!=(r=e.curr());)if(o.white_space(r))e.next();else{if(n.selector){let r=S(e,t);if("@use"==r.property?n.styles=n.styles.concat(r.value):n.styles.push(r),"}"==e.curr())break}else n.selector=z(e);e.next()}return n}function S(e,t){let r,n=u.rule();for(;!e.end()&&";"!=(r=e.curr());){if(n.property.length){n.value=k(e);break}if(n.property=_(e),"@use"==n.property){n.value=E(e,t);break}e.next()}return n}function M(e,t){let r,n=u.cond();for(;!e.end()&&"}"!=(r=e.curr());){if(n.name.length)if(":"==r){let t=j(e);t.selector&&n.styles.push(t)}else if("@"!=r||d(e,!0).includes(":")){if(!o.white_space(r)){let r=S(e,t);if(r.property&&n.styles.push(r),"}"==e.curr())break}}else n.styles.push(M(e));else Object.assign(n,w(e));e.next()}return n}function A(e,t){let r="";return e&&e.get_custom_property_value&&(r=e.get_custom_property_value(t)),r}function E(e,r){return e.next(),(k(e)||[]).reduce((e,n)=>{!function e(r,n){r.forEach&&r.forEach(r=>{if("text"==r.type&&r.value){let e=t(r.value);r.value=e.reduce((e,t)=>{let r,s="",i="";s=A(n,t.name),!s&&t.alternative&&t.alternative.every(e=>{if(i=A(n,e.name),i)return s=i,!1});try{r=C(s,n)}catch(e){}return r&&e.push.apply(e,r),e},[])}"func"==r.type&&r.arguments&&r.arguments.forEach(t=>{e(t,n)})})}(n,r);let[s]=n;return s.value&&s.value.length&&e.push(...s.value),e},[])}function C(t,r){const n=e(t),s=[];for(;!n.end();){let e=n.curr();if(o.white_space(e))n.next();else{if("/"==e&&"*"==n.curr(1))v(n);else if("/"==e&&"/"==n.curr(1))v(n,{inline:!0});else if(":"==e){let e=j(n,r);e.selector&&s.push(e)}else if("@"==e&&"@keyframes"===h(n,!0)){let e=y(n,r);s.push(e)}else if("@"!=e||d(n,!0).includes(":")){if(!o.white_space(e)){let e=S(n,r);e.property&&s.push(e)}}else{let e=M(n,r);e.name.length&&s.push(e)}n.next()}}return s}function O(e,t,r){return Math.max(t,Math.min(r,e))}function L(e,t,r){let n=0,s=e,i=e=>e>0&&e<1?.1:1,l=arguments.length;1==l&&([e,t]=[i(e),e]),l<3&&(r=i(e));let u=[];for(;(r>=0&&e<=t||r<0&&e>t)&&(u.push(e),e+=r,!(n++>=1e3)););return u.length||u.push(s),u}function T(e){return/^[a-zA-Z]$/.test(e)}function N(e){let t=()=>e;return t.lazy=!0,t}function H(e,t,r){return"cell-"+e+"-"+t+"-"+r}function W(e){for(;e&&e.value;)return W(e.value);return e||""}const[I,D,P]=[1,64,4096];function R(e){let[t,r,n]=(e+"").replace(/\s+/g,"").replace(/[,，xX]+/g,"x").split("x").map(Number);const s=1==t||1==r?P:D,i=1==t&&1==r?P:I,l={x:O(t||I,1,s),y:O(r||t||I,1,s),z:O(n||I,1,i)};return Object.assign({},l,{count:l.x*l.y*l.z})}function q(e,t){if(t){let r=new Blob([e],{type:"image/svg+xml"});return`url(${URL.createObjectURL(r)}#${t})`}return`url("data:image/svg+xml;utf8,${encodeURIComponent(e)}")`}function U(e){const t='xmlns="http://www.w3.org/2000/svg"';return e.includes("<svg")||(e=`<svg ${t}>${e}</svg>`),e.includes("xmlns")||(e=e.replace(/<svg([\s>])/,`<svg ${t}$1`)),e}function Z(e,t,r){return e*(1-r)+t*r}function B(e=0,t=e){return 1==arguments.length&&(1==e?e=0:e<1?e/=10:e=1),Z(e,t,Math.random())}function J(e){return(...t)=>{let r=function(e){let t="";return e.some(e=>{let r=String(e).trim();if(!r)return"";let n=r.match(/\d(\D+)$/);return t=n?n[1]:""}),t}(t);return function(e,t){return(...r)=>{r=r.map(e=>Number(String(e).replace(/\D+$/g,"")));let n=e.apply(null,r);return t.length?Array.isArray(n)?n.map(e=>e+t):n+t:n}}(e,r).apply(null,t)}}function F(e){return(...t)=>{let r=t.map(e=>String(e).charCodeAt(0)),n=e.apply(null,r);return Array.isArray(n)?n.map(e=>String.fromCharCode(e)):String.fromCharCode(n)}}function V(e){const t=function(e){let t=function(e){let t=String(e),r=[],n="";for(let e=0;e<t.length;++e){let i=t[e];if(X[i])if("-"==i&&"e"==t[e-1])n+=i;else if(r.length||n.length||!/[+-]/.test(i)){let{type:e,value:t}=s(r)||{};"operator"==e&&!n.length&&/[^()]/.test(i)&&/[^()]/.test(t)?n+=i:(n.length&&(r.push({type:"number",value:n}),n=""),r.push({type:"operator",value:i}))}else n+=i;else/\S/.test(i)&&(n+=i)}n.length&&r.push({type:"number",value:n});return r}(e);const r=[],n=[];for(let e=0;e<t.length;++e){let{type:i,value:l}=t[e];if("number"==i)n.push(l);else if("operator"==i)if("("==l)r.push(l);else if(")"==l){for(;r.length&&"("!=s(r);)n.push(r.pop());r.pop()}else{for(;r.length&&X[s(r)]>=X[l];){let e=r.pop();/[()]/.test(e)||n.push(e)}r.push(l)}}for(;r.length;)n.push(r.pop());return n}(e),r=[];for(;t.length;){let e=t.shift();if(/\d+/.test(e))r.push(e);else{let t=r.pop(),n=r.pop();r.push(G(e,Number(n),Number(t)))}}return r[0]}const X={"*":3,"/":3,"%":3,"+":2,"-":2,"(":1,")":1};function G(e,t,r){switch(e){case"+":return t+r;case"-":return t-r;case"*":return t*r;case"/":return t/r;case"%":return t%r}}const K={};function Q(e,t){return(...r)=>{let n=e+r.join("-");return K[n]?K[n]:K[n]=t.apply(null,r)}}function Y(e){return(...t)=>e.apply(null,l(t,e=>String(e).startsWith("[")?te(e):e))}function ee(e,t){return{type:e,value:t}}const te=Q("build_range",e=>l(function(e){let t=String(e),r=[],n=[];if(!t.startsWith("[")||!t.endsWith("]"))return r;for(let e=1;e<t.length-1;++e){let i=t[e];if("-"!=i||"-"!=t[e-1])if("-"!=i)if("-"!=s(n))n.length&&r.push(ee("char",n.pop())),n.push(i);else{n.pop();let e=n.pop();r.push(e?ee("range",[e,i]):ee("char",i))}else n.push(i)}return n.length&&r.push(ee("char",n.pop())),r}(e),({type:e,value:t})=>{if("char"==e)return t;let[r,n]=t,s=!1;r>n&&([r,n]=[n,r],s=!0);let i=F(L)(r,n);return s&&i.reverse(),i}));class re{constructor(e){this.prev=this.next=null,this.data=e}}class ne{constructor(e=20){this._limit=e,this._size=0}push(e){this._size>=this._limit&&(this.root=this.root.next,this.root.prev=null);let t=new re(e);this.root?(t.prev=this.tail,this.tail.next=t,this.tail=t):this.root=this.tail=t,this._size++}last(e=1){let t=this.tail;for(;--e&&t.prev;)t=t.prev;return t.data}}const{cos:se,sin:ie,sqrt:le,pow:ue,PI:oe}=Math,ae=oe/180;function ce(e,t){"function"==typeof arguments[0]&&(t=e,e={}),t||(t=e=>[se(e),ie(e)]);let r=e.split||120,n=e.scale||1,s=ae*(e.start||0),i=e.deg?e.deg*ae:oe/(r/2),l=[];for(let e=0;e<r;++e){let r=s+i*e,[u,o]=t(r);l.push(50*u*n+50+"% "+(50*o*n+50)+"%")}return e.type?`polygon(${e.type}, ${l.join(",")})`:`polygon(${l.join(",")})`}function pe(e,t,r){let n=ae*r;return[e*se(n)-t*ie(n),t*se(n)+e*ie(n)]}const he={circle:()=>"circle(49%)",triangle:()=>ce({split:3,start:-90},e=>[1.1*se(e),1.1*ie(e)+.2]),rhombus:()=>ce({split:4}),pentagon:()=>ce({split:5,start:54}),hexgon:()=>ce({split:6,start:30}),hexagon:()=>ce({split:6,start:30}),heptagon:()=>ce({split:7,start:-90}),octagon:()=>ce({split:8,start:22.5}),star:()=>ce({split:5,start:54,deg:144}),diamond:()=>"polygon(50% 5%, 80% 50%, 50% 95%, 20% 50%)",cross:()=>"polygon(\n 5% 35%, 35% 35%, 35% 5%, 65% 5%,\n 65% 35%, 95% 35%, 95% 65%, 65% 65%,\n 65% 95%, 35% 95%, 35% 65%, 5% 65%\n )",clover:(e=3)=>(4==(e=O(e,3,5))&&(e=2),ce({split:240},t=>{let r=se(e*t)*se(t),n=se(e*t)*ie(t);return 3==e&&(r-=.2),2==e&&(r/=1.1,n/=1.1),[r,n]})),hypocycloid(e=3){let t=1-(e=O(e,3,6));return ce({scale:1/e},r=>{let n=t*se(r)+se(t*(r-oe)),s=t*ie(r)+ie(t*(r-oe));return 3==e&&(n=1.1*n-.6,s*=1.1),[n,s]})},astroid:()=>he.hypocycloid(4),infinity:()=>ce(e=>{let t=.7*le(2)*se(e),r=ue(ie(e),2)+1;return[t/r,t*ie(e)/r]}),heart:()=>ce(e=>pe(1.2*(.75*ue(ie(e),3)),1.1*(se(1*e)*(13/18)-se(2*e)*(5/18)-se(3*e)/18-se(4*e)/18+.2),180)),bean:()=>ce(e=>{let[t,r]=[ue(ie(e),3),ue(se(e),3)];return pe((t+r)*se(e)*1.3-.45,(t+r)*ie(e)*1.3-.45,-90)}),bicorn:()=>ce(e=>pe(se(e),ue(ie(e),2)/(2+ie(e))-.5,180)),drop:()=>ce(e=>pe(ie(e),(1+ie(e))*se(e)/1.4,90)),pear:()=>ce(e=>[ie(e),(1+ie(e))*se(e)/1.4]),fish:()=>ce(e=>[se(e)-ue(ie(e),2)/le(2),ie(2*e)/2]),whale:()=>ce({split:240},e=>{let t=3.4*(ue(ie(e),2)-.5)*se(e);return pe(se(e)*t+.75,ie(e)*t*1.2,180)}),bud:(e=3)=>(e=O(e,3,10),ce({split:240},t=>[(1+.2*se(e*t))*se(t)*.8,(1+.2*se(e*t))*ie(t)*.8])),alien(...e){let[t=1,r=1,n=1,s=1,i=1]=e.map(e=>O(e,1,9));return ce({split:480,type:"evenodd"},e=>[.31*(se(e*t)+se(e*n)+se(e*i)),.31*(ie(e*r)+ie(e*s)+ie(e))])}};function fe(e,t){return t?/[,，]/.test(e):/[,，\s]/.test(e)}function de(e,t){for(;!e.end()&&fe(e.curr(1),t);)e.next()}function ge(t,r=!1){const n=e(t),s=[],i=[];let l="";for(;!n.end();){let e=n.curr();if(void 0===e)break;"("==e?(l+=e,i.push(e)):")"==e?(l+=e,i.length&&i.pop()):i.length?l+=e:fe(e,r)?(s.push(l),l="",de(n,r)):l+=e,n.next()}return l&&s.push(l),s}const me={index:({count:e})=>t=>e,row:({x:e})=>t=>e,col:({y:e})=>t=>e,depth:({z:e})=>t=>e,size:({grid:e})=>t=>e.count,"size-row":({grid:e})=>t=>e.x,"size-col":({grid:e})=>t=>e.y,"size-depth":({grid:e})=>t=>e.z,id:({x:e,y:t,z:r})=>n=>H(e,t,r),n:({extra:e})=>t=>e?e[0]:"@n",N:({extra:e})=>t=>e?e[1]:"@N",repeat:ye(""),multiple:ye(","),"multiple-with-space":ye(" "),pick:({context:e})=>Y((...t)=>ve(e,"last_pick",function(...e){let t=e.reduce((e,t)=>e.concat(t),[]);return t[~~(Math.random()*t.length)]}(t))),"pick-n"({context:e,extra:t,position:r}){let n="pn-counter"+r;return Y((...r)=>{e[n]||(e[n]=0),e[n]+=1;let s=r.length,[i]=t||[],l=r[((void 0===i?e[n]:i)-1)%s];return ve(e,"last_pick",l)})},"pick-d"({context:e,extra:t,position:r}){let n="pd-counter"+r,s="pd-values"+r;return Y((...r)=>{e[n]||(e[n]=0),e[n]+=1,e[s]||(e[s]=function(e){let t=Array.from?Array.from(e):e.slice(),r=e.length;for(;r;){let e=~~(Math.random()*r--),n=t[r];t[r]=t[e],t[e]=n}return t}(r));let i=r.length,[l]=t||[],u=((void 0===l?e[n]:l)-1)%i,o=e[s][u];return ve(e,"last_pick",o)})},"last-pick":({context:e})=>(t=1)=>{let r=e.last_pick;return r?r.last(t):""},rand:({context:e})=>(...t)=>{let r=(t.every(T)?F:J)(B).apply(null,t);return ve(e,"last_rand",r)},"rand-int":({context:e})=>(...t)=>{let r=t.every(T)?F:J,n=parseInt(r(B).apply(null,t));return ve(e,"last_rand",n)},"last-rand":({context:e})=>(t=1)=>{let r=e.last_rand;return r?r.last(t):""},stripe:()=>(...e)=>{let t,r=e.map(W),n=r.length,s=0,i=[];if(!n)return"";r.forEach(e=>{let[t,r]=ge(e);void 0!==r?i.push(r):s+=1});let l=i.length?`(100% - ${i.join(" - ")}) / ${s}`:`100% / ${n}`;return r.map((e,r)=>{if(i.length){let[r,n]=ge(e);return t=(t?t+" + ":"")+(void 0!==n?n:l),`${r} 0 calc(${t})`}return`${e} 0 ${100/n*(r+1)}%`}).join(",")},calc:()=>e=>V(W(e)),hex:()=>e=>parseInt(W(e)).toString(16),svg:N(e=>{if(void 0===e)return"";return q(U(W(e()).trim()))}),"svg-filter":N(e=>{if(void 0===e)return"";let t=function(e=""){return e+Math.random().toString(32).substr(2)}("filter-");return q(U(W(e()).trim()).replace(/<filter([\s>])/,`<filter id="${t}"$1`),t)}),var:()=>e=>`var(${W(e)})`,shape:()=>memo("shape-function",(e="",...t)=>(e=e.trim(),"function"==typeof he[e]?he[e](t):""))};function ye(e){return N((t,r)=>{if(!r||!t)return"";let n=O(W(t()),0,65536);return function(e,t){let r=[];for(let n=0;n<e;++n)r.push(t(n));return r}(n,e=>W(r(e+1,n))).join(e)})}function ve(e,t,r){return e[t]||(e[t]=new ne),e[t].push(r),r}var _e,xe,be=(_e=me,xe={m:"multiple",ms:"multiple-with-space",r:"rand",ri:"rand-int",lr:"last-rand",p:"pick",pn:"pick-n",pd:"pick-d",lp:"last-pick",rep:"repeat",i:"index",x:"row",y:"col",z:"depth",s:"size",sx:"size-row",sy:"size-col",sz:"size-depth","size-x":"size-row","size-y":"size-col","size-z":"size-depth",multi:"multiple","pick-by-turn":"pick-n","max-row":"size-row","max-col":"size-col",stripes:"stripe",strip:"stripe"},Object.keys(xe).forEach(e=>{_e[e]=_e[xe[e]]}),_e);let $e=[];function ke(e){if(!$e.length){let e=new Set;for(let t in document.head.style)t.startsWith("-")||e.add(t.replace(/[A-Z]/g,"-$&").toLowerCase());e.has("grid-gap")||e.add("grid-gap"),$e=Array.from(e)}return e&&e.test?$e.filter(t=>e.test(t)):$e}function ze(e){let t=new RegExp(`\\-?${e}\\-?`);return ke(t).map(e=>e.replace(t,"")).reduce((e,t)=>(e[t]=t,e),{})}const we=ze("webkit"),je=ze("moz");function Se(e,t){return we[e]?`-webkit-${t} ${t}`:je[e]?`-moz-${t} ${t}`:t}const Me={"4a0":[1682,2378],"2a0":[1189,1682],a0:[841,1189],a1:[594,841],a2:[420,594],a3:[297,420],a4:[210,297],a5:[148,210],a6:[105,148],a7:[74,105],a8:[52,74],a9:[37,52],a10:[26,37],b0:[1e3,1414],b1:[707,1e3],b2:[500,707],b3:[353,500],b4:[250,353],b5:[176,250],b6:[125,176],b7:[88,125],b8:[62,88],b9:[44,62],b10:[31,44],b11:[22,32],b12:[16,22],c0:[917,1297],c1:[648,917],c2:[458,648],c3:[324,458],c4:[229,324],c5:[162,229],c6:[114,162],c7:[81,114],c8:[57,81],c9:[40,57],c10:[28,40],c11:[22,32],c12:[16,22],d0:[764,1064],d1:[532,760],d2:[380,528],d3:[264,376],d4:[188,260],d5:[130,184],d6:[92,126],letter:[216,279],legal:[216,356],"junior-legal":[203,127],ledger:[279,432],tabloid:[279,432],executive:[190,254],postcard:[100,148],"business-card":[54,90],poster:[390,540]},Ae={portrait:"p",pt:"p",p:"p",landscape:"l",ls:"l",l:"l"};var Ee={"@size"(e,{is_special_selector:t}){let[r,n=r]=ge(e);return Me[r]&&([r,n]=function(e,t){e=String(e).toLowerCase();let[r,n]=Me[e]||[];return"p"==Ae[t]&&([n,r]=[r,n]),[n,r].map(e=>e+"mm")}(r,n)),`\n width:${r};height:${n};${t?"":`\n --internal-cell-width:${r};--internal-cell-height:${n};`}`},"@min-size"(e){let[t,r=t]=ge(e);return`min-width:${t};min-height:${r};`},"@max-size"(e){let[t,r=t]=ge(e);return`max-width:${t};max-height:${r};`},"@place-cell":(()=>{let e={center:"50%",0:"0%",left:"0%",right:"100%",top:"50%",bottom:"50%"},t={center:"50%",0:"0%",top:"0%",bottom:"100%",left:"50%",right:"50%"};return r=>{let[n,s="50%"]=ge(r);n=e[n]||n,s=t[s]||s;const i="var(--internal-cell-width, 25%)",l="var(--internal-cell-height, 25%)";return`\n position:absolute;left:${n};top:${s};width:${i};height:${l};margin-left:calc(${i} / -2) !important;margin-top:calc(${l} / -2) !important;grid-area:unset !important;`}})(),"@grid"(e,t){let[r,...n]=e.split("/").map(e=>e.trim());return n=n.join(" / "),{grid:R(r),size:n?this["@size"](n,t):""}},"@shape":Q("shape-property",e=>{let[t,...r]=ge(e);return he[t]?Se("clip-path",`clip-path:${he[t].apply(null,r)};`)+"overflow:hidden;":""}),"@use"(e){if(e.length>2)return e}};function Ce(e,t,r){let n=function(e){return t=>String(e).replace(/(\d+)(n)/g,"$1*"+t).replace(/n/g,t)}(e);for(let e=0;e<=r;++e)if(V(n(e))==t)return!0}const Oe={even:e=>!!(e%2),odd:e=>!(e%2)};function Le(e){return/^(even|odd)$/.test(e)}var Te={at:({x:e,y:t})=>(r,n)=>e==r&&t==n,nth:({count:e,grid:t})=>(...r)=>r.some(r=>Le(r)?Oe[r](e-1):Ce(r,e,t.count)),row:({x:e,grid:t})=>(...r)=>r.some(r=>Le(r)?Oe[r](e-1):Ce(r,e,t.x)),col:({y:e,grid:t})=>(...r)=>r.some(r=>Le(r)?Oe[r](e-1):Ce(r,e,t.y)),even:({count:e})=>t=>Oe.even(e-1),odd:({count:e})=>t=>Oe.odd(e-1),random:()=>(e=.5)=>(e>=1&&e<=0&&(e=.5),Math.random()<e)};var Ne=Object.getOwnPropertyNames(Math).reduce((e,t)=>(e[t]=()=>(...e)=>(e=e.map(W),"number"==typeof Math[t]?Math[t]:Math[t].apply(null,e.map(V))),e),{});function He(e){return/^\:(host|doodle)/.test(e)}function We(e){return/^\:(container|parent)/.test(e)}function Ie(e){return He(e)||We(e)}class De{constructor(e){this.tokens=e,this.rules={},this.props={},this.keyframes={},this.grid=null,this.is_grid_defined=!1,this.coords=[],this.reset()}reset(){this.styles={host:"",container:"",cells:"",keyframes:""},this.coords=[];for(let e in this.rules)e.startsWith("#cell")&&delete this.rules[e]}add_rule(e,t){let n=this.rules[e];n||(n=this.rules[e]=[]),n.push.apply(n,r(t))}pick_func(e){return be[e]||Ne[e]}apply_func(e,t,n){let s=e(...r(t)),i=[];return n.forEach(e=>{e.cluster||"string"!=typeof e.value?"function"==typeof e?i.push(e):e&&e.value&&i.push(e.value):i.push(...ge(e.value,!0))}),i=i.filter(e=>null!=e&&String(e).trim().length),s(...r(i))}compose_aname(...e){return e.join("-")}compose_selector({x:e,y:t,z:r},n=""){return`#${H(e,t,r)}${n}`}compose_argument(e,t,r=[]){let n=e.map(e=>{if("text"==e.type)return e.value;if("func"==e.type){let n=this.pick_func(e.name.substr(1));if(n){t.extra=r,t.position=e.position;let s=e.arguments.map(e=>n.lazy?(...r)=>this.compose_argument(e,t,r):this.compose_argument(e,t,r));return this.apply_func(n,t,s)}}});return{cluster:e.cluster,value:n.length>=2?{value:n.join("")}:n[0]}}compose_value(e,t){if(!e||!e.reduce)return"";return e.reduce((e,r)=>{switch(r.type){case"text":e+=r.value;break;case"func":{let n=r.name.substr(1),s=this.pick_func(n);if(s){t.position=r.position;let n=r.arguments.map(e=>s.lazy?(...r)=>this.compose_argument(e,t,r):this.compose_argument(e,t)),i=this.apply_func(s,t,n);null!=i&&(e+=i)}}}return e},"")}compose_rule(e,t,r){let n=Object.assign({},t),s=e.property,i=e.value.reduce((e,t)=>{let r=this.compose_value(t,n);return r&&e.push(r),e},[]),l=i.join(", ");if(/^animation(\-name)?$/.test(s)&&(this.props.has_animation=!0,n.count>1)){let{count:e}=n;switch(s){case"animation-name":l=i.map(t=>this.compose_aname(t,e)).join(", ");break;case"animation":l=i.map(t=>{let r=(t||"").split(/\s+/);return r[0]=this.compose_aname(r[0],e),r.join(" ")}).join(", ")}}"content"==s&&(/["']|^none$|^(var|counter|counters|attr)\(/.test(l)||(l=`'${l}'`)),"transition"==s&&(this.props.has_transition=!0);let u=`${s}:${l};`;if(u=Se(s,u),"clip-path"==s&&(u+=";overflow:hidden;"),"width"!=s&&"height"!=s||Ie(r)||(u+=`--internal-cell-${s}:${l};`),Ee[s]){let t=Ee[s](l,{is_special_selector:Ie(r)});switch(s){case"@grid":He(r)?(this.grid=t.grid,u=t.size||""):(u="",this.is_grid_defined||(t=Ee[s](l,{is_special_selector:!0}),this.grid=t.grid,this.add_rule(":host",t.size||""))),this.is_grid_defined=!0;break;case"@place-cell":He(r)||(u=t);case"@use":e.value.length&&this.compose(n,e.value),u=Ee[s](e.value);default:u=t}}return u}compose(e,t,r){this.coords.push(e),(t||this.tokens).forEach((t,s)=>{if(t.skip)return!1;if(r&&this.grid)return!1;switch(t.type){case"rule":this.add_rule(this.compose_selector(e),this.compose_rule(t,e));break;case"pseudo":{t.selector.startsWith(":doodle")&&(t.selector=t.selector.replace(/^\:+doodle/,":host"));let r=Ie(t.selector);r&&(t.skip=!0),t.selector.split(",").forEach(n=>{let s=t.styles.map(t=>this.compose_rule(t,e,n)),i=r?n:this.compose_selector(e,n);this.add_rule(i,s)});break}case"cond":{let r=Te[t.name.substr(1)];if(r){let n=t.arguments.map(t=>this.compose_argument(t,e));this.apply_func(r,e,n)&&this.compose(e,t.styles)}break}case"keyframes":this.keyframes[t.name]||(this.keyframes[t.name]=e=>`\n ${n(t.steps.map(t=>`\n ${t.name}{${n(t.styles.map(t=>this.compose_rule(t,e)))}}`))}`)}})}output(){Object.keys(this.rules).forEach((e,t)=>{if(We(e))this.styles.container+=`\n .container{${n(this.rules[e])}}`;else{let t=He(e)?"host":"cells";this.styles[t]+=`\n ${e}{${n(this.rules[e])}}`}});let e=Object.keys(this.keyframes);return this.coords.forEach((t,r)=>{e.forEach(e=>{let n=this.compose_aname(e,t.count);var s,i;this.styles.keyframes+=`\n ${s=0==r,i=`@keyframes ${e}{${this.keyframes[e](t)}}`,s?"function"==typeof i?i():i:""} @keyframes ${n}{${this.keyframes[e](t)}}`})}),{props:this.props,styles:this.styles,grid:this.grid}}}function Pe(e,t){let r=new De(e),n={};r.compose({x:1,y:1,z:1,count:1,context:{},grid:{x:1,y:1,z:1,count:1}},null,!0);let{grid:s}=r.output();if(s&&(t=s),r.reset(),1==t.z)for(let e=1,s=0;e<=t.x;++e)for(let i=1;i<=t.y;++i)r.compose({x:e,y:i,z:1,count:++s,grid:t,context:n});else for(let e=1,s=0;e<=t.z;++e)r.compose({x:1,y:1,z:e,count:++s,grid:t,context:n});return r.output()}class Re extends HTMLElement{constructor(){super(),this.doodle=this.attachShadow({mode:"open"}),this.extra={get_custom_property_value:this.get_custom_property_value.bind(this)}}load(e){let t,r=this.getAttribute("use")||"";if(r&&(r=`@use:${r};`),!this.innerHTML.trim()&&!r)return!1;try{let e=C(r+this.innerHTML,this.extra);this.grid_size=R(this.getAttribute("grid")),t=Pe(e,this.grid_size),t.grid&&(this.grid_size=t.grid),this.build_grid(t)}catch(e){this.innerHTML="",console.error(e&&e.message||"Error in css-doodle.")}!e&&this.hasAttribute("click-to-update")&&this.addEventListener("click",e=>this.update())}connectedCallback(e){/^(complete|interactive|loaded)$/.test(document.readyState)?this.load():setTimeout(()=>this.load(e))}get_custom_property_value(e){return getComputedStyle(this).getPropertyValue(e).trim().replace(/^\(|\)$/g,"")}cell(e,t,r){let n=document.createElement("div");return n.id=H(e,t,r),n}build_grid(e){const{has_transition:t,has_animation:r}=e.props,{keyframes:n,host:s,container:i,cells:l}=e.styles;this.doodle.innerHTML=`\n<style>${this.style_basic()}</style><style class="style-keyframes">${n}</style><style class="style-container">${this.style_size()} ${s} ${i}</style><style class="style-cells">${t||r?"":l}</style><div class="container"></div>`,this.doodle.querySelector(".container").appendChild(this.html_cells()),(t||r)&&setTimeout(()=>{this.set_style(".style-cells",l)},50)}inherit_props(e){return ke(/grid/).map(e=>`${e}:inherit;`).join("")}style_basic(){return`\n *{box-sizing:border-box;} *::after, *::before{box-sizing:inherit;}:host{display:block;visibility:visible;width:auto;height:auto;} .container{position:relative;width:100%;height:100%;display:grid;${this.inherit_props()}} .container div:empty{position:relative;line-height:1;display:grid;place-items:center;}`}style_size(){let{x:e,y:t}=this.grid_size;return`\n:host{grid-template-rows:repeat(${e}, 1fr);grid-template-columns:repeat(${t}, 1fr);}`}html_cells(){let{x:e,y:t,z:r}=this.grid_size,n=document.createDocumentFragment();if(1==r)for(let r=1;r<=e;++r)for(let e=1;e<=t;++e)n.appendChild(this.cell(r,e,1));else{let e=null;for(let t=1;t<=r;++t){let r=this.cell(1,1,t);(e||n).appendChild(r),e=r}e=null}return n}set_style(e,t){const r=this.shadowRoot.querySelector(e);r&&(r.styleSheet?r.styleSheet.cssText=t:r.innerHTML=t)}update(e){let t=this.getAttribute("use")||"";t&&(t=`@use:${t};`),e||(e=this.innerHTML),this.innerHTML=e,this.grid_size||(this.grid_size=R(this.getAttribute("grid")));const r=Pe(C(t+e,this.extra),this.grid_size);if(r.grid){let{x:e,y:t,z:n}=r.grid,{x:s,y:i,z:l}=this.grid_size;if(s!==e||i!==t||l!==n)return Object.assign(this.grid_size,r.grid),this.build_grid(r);Object.assign(this.grid_size,r.grid)}else{let r=R(this.getAttribute("grid")),{x:n,y:s,z:i}=r,{x:l,y:u,z:o}=this.grid_size;if(l!==n||u!==s||o!==i)return Object.assign(this.grid_size,r),this.build_grid(Pe(C(t+e,this.extra),this.grid_size))}this.set_style(".style-keyframes",r.styles.keyframes),r.props.has_animation&&(this.set_style(".style-cells",""),this.set_style(".style-container","")),setTimeout(()=>{this.set_style(".style-container",this.style_size()+r.styles.host+r.styles.container),this.set_style(".style-cells",r.styles.cells)})}get grid(){return Object.assign({},this.grid_size)}set grid(e){this.setAttribute("grid",e),this.connectedCallback(!0)}get use(){return this.getAttribute("use")}set use(e){this.setAttribute("use",e),this.connectedCallback(!0)}static get observedAttributes(){return["grid","use"]}attributeChangedCallback(e,t,r){if(t==r)return!1;"grid"==e&&t&&(this.grid=r),"use"==e&&t&&(this.use=r)}}return customElements.get("css-doodle")||customElements.define("css-doodle",Re),function(e,...t){let r=e.reduce((e,r,n)=>{return e+r+(null!=(s=t[n])?s:"");var s},""),n=document.createElement("css-doodle");return n.update&&n.update(r),n}}));