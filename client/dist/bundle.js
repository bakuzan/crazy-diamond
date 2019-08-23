!function(t){var e={};function s(i){if(e[i])return e[i].exports;var o=e[i]={i:i,l:!1,exports:{}};return t[i].call(o.exports,o,o.exports,s),o.l=!0,o.exports}s.m=t,s.c=e,s.d=function(t,e,i){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(s.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)s.d(i,o,function(e){return t[e]}.bind(null,o));return i},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/",s(s.s=0)}([function(t,e,s){"use strict";s.r(e);
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const i=new WeakMap,o=t=>"function"==typeof t&&i.has(t),n=void 0!==window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,r=(t,e,s=null)=>{for(;e!==s;){const s=e.nextSibling;t.removeChild(e),e=s}},a={},l={},c=`{{lit-${String(Math.random()).slice(2)}}}`,p=`\x3c!--${c}--\x3e`,d=new RegExp(`${c}|${p}`),h="$lit$";class u{constructor(t,e){this.parts=[],this.element=e;const s=[],i=[],o=document.createTreeWalker(e.content,133,null,!1);let n=0,r=-1,a=0;const{strings:l,values:{length:p}}=t;for(;a<p;){const t=o.nextNode();if(null!==t){if(r++,1===t.nodeType){if(t.hasAttributes()){const e=t.attributes,{length:s}=e;let i=0;for(let t=0;t<s;t++)f(e[t].name,h)&&i++;for(;i-- >0;){const e=l[a],s=g.exec(e)[2],i=s.toLowerCase()+h,o=t.getAttribute(i);t.removeAttribute(i);const n=o.split(d);this.parts.push({type:"attribute",index:r,name:s,strings:n}),a+=n.length-1}}"TEMPLATE"===t.tagName&&(i.push(t),o.currentNode=t.content)}else if(3===t.nodeType){const e=t.data;if(e.indexOf(c)>=0){const i=t.parentNode,o=e.split(d),n=o.length-1;for(let e=0;e<n;e++){let s,n=o[e];if(""===n)s=y();else{const t=g.exec(n);null!==t&&f(t[2],h)&&(n=n.slice(0,t.index)+t[1]+t[2].slice(0,-h.length)+t[3]),s=document.createTextNode(n)}i.insertBefore(s,t),this.parts.push({type:"node",index:++r})}""===o[n]?(i.insertBefore(y(),t),s.push(t)):t.data=o[n],a+=n}}else if(8===t.nodeType)if(t.data===c){const e=t.parentNode;null!==t.previousSibling&&r!==n||(r++,e.insertBefore(y(),t)),n=r,this.parts.push({type:"node",index:r}),null===t.nextSibling?t.data="":(s.push(t),r--),a++}else{let e=-1;for(;-1!==(e=t.data.indexOf(c,e+1));)this.parts.push({type:"node",index:-1}),a++}}else o.currentNode=i.pop()}for(const t of s)t.parentNode.removeChild(t)}}const f=(t,e)=>{const s=t.length-e.length;return s>=0&&t.slice(s)===e},m=t=>-1!==t.index,y=()=>document.createComment(""),g=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=\/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class b{constructor(t,e,s){this.__parts=[],this.template=t,this.processor=e,this.options=s}update(t){let e=0;for(const s of this.__parts)void 0!==s&&s.setValue(t[e]),e++;for(const t of this.__parts)void 0!==t&&t.commit()}_clone(){const t=n?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),e=[],s=this.template.parts,i=document.createTreeWalker(t,133,null,!1);let o,r=0,a=0,l=i.nextNode();for(;r<s.length;)if(o=s[r],m(o)){for(;a<o.index;)a++,"TEMPLATE"===l.nodeName&&(e.push(l),i.currentNode=l.content),null===(l=i.nextNode())&&(i.currentNode=e.pop(),l=i.nextNode());if("node"===o.type){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(l.previousSibling),this.__parts.push(t)}else this.__parts.push(...this.processor.handleAttributeExpressions(l,o.name,o.strings,this.options));r++}else this.__parts.push(void 0),r++;return n&&(document.adoptNode(t),customElements.upgrade(t)),t}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const v=` ${c} `;class _{constructor(t,e,s,i){this.strings=t,this.values=e,this.type=s,this.processor=i}getHTML(){const t=this.strings.length-1;let e="",s=!1;for(let i=0;i<t;i++){const t=this.strings[i],o=t.lastIndexOf("\x3c!--");s=(o>-1||s)&&-1===t.indexOf("--\x3e",o+1);const n=g.exec(t);e+=null===n?t+(s?v:p):t.substr(0,n.index)+n[1]+n[2]+h+n[3]+c}return e+=this.strings[t]}getTemplateElement(){const t=document.createElement("template");return t.innerHTML=this.getHTML(),t}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const w=t=>null===t||!("object"==typeof t||"function"==typeof t),x=t=>Array.isArray(t)||!(!t||!t[Symbol.iterator]);class S{constructor(t,e,s){this.dirty=!0,this.element=t,this.name=e,this.strings=s,this.parts=[];for(let t=0;t<s.length-1;t++)this.parts[t]=this._createPart()}_createPart(){return new P(this)}_getValue(){const t=this.strings,e=t.length-1;let s="";for(let i=0;i<e;i++){s+=t[i];const e=this.parts[i];if(void 0!==e){const t=e.value;if(w(t)||!x(t))s+="string"==typeof t?t:String(t);else for(const e of t)s+="string"==typeof e?e:String(e)}}return s+=t[e]}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class P{constructor(t){this.value=void 0,this.committer=t}setValue(t){t===a||w(t)&&t===this.value||(this.value=t,o(t)||(this.committer.dirty=!0))}commit(){for(;o(this.value);){const t=this.value;this.value=a,t(this)}this.value!==a&&this.committer.commit()}}class z{constructor(t){this.value=void 0,this.__pendingValue=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild(y()),this.endNode=t.appendChild(y())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t.__insert(this.startNode=y()),t.__insert(this.endNode=y())}insertAfterPart(t){t.__insert(this.startNode=y()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this.__pendingValue=t}commit(){for(;o(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=a,t(this)}const t=this.__pendingValue;t!==a&&(w(t)?t!==this.value&&this.__commitText(t):t instanceof _?this.__commitTemplateResult(t):t instanceof Node?this.__commitNode(t):x(t)?this.__commitIterable(t):t===l?(this.value=l,this.clear()):this.__commitText(t))}__insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}__commitNode(t){this.value!==t&&(this.clear(),this.__insert(t),this.value=t)}__commitText(t){const e=this.startNode.nextSibling,s="string"==typeof(t=null==t?"":t)?t:String(t);e===this.endNode.previousSibling&&3===e.nodeType?e.data=s:this.__commitNode(document.createTextNode(s)),this.value=t}__commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value instanceof b&&this.value.template===e)this.value.update(t.values);else{const s=new b(e,t.processor,this.options),i=s._clone();s.update(t.values),this.__commitNode(i),this.value=s}}__commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let s,i=0;for(const o of t)void 0===(s=e[i])&&(s=new z(this.options),e.push(s),0===i?s.appendIntoPart(this):s.insertAfterPart(e[i-1])),s.setValue(o),s.commit(),i++;i<e.length&&(e.length=i,this.clear(s&&s.endNode))}clear(t=this.startNode){r(this.startNode.parentNode,t.nextSibling,this.endNode)}}class k{constructor(t,e,s){if(this.value=void 0,this.__pendingValue=void 0,2!==s.length||""!==s[0]||""!==s[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=s}setValue(t){this.__pendingValue=t}commit(){for(;o(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=a,t(this)}if(this.__pendingValue===a)return;const t=!!this.__pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=t),this.__pendingValue=a}}class C extends S{constructor(t,e,s){super(t,e,s),this.single=2===s.length&&""===s[0]&&""===s[1]}_createPart(){return new N(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class N extends P{}let T=!1;try{const t={get capture(){return T=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}class ${constructor(t,e,s){this.value=void 0,this.__pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=s,this.__boundHandleEvent=t=>this.handleEvent(t)}setValue(t){this.__pendingValue=t}commit(){for(;o(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=a,t(this)}if(this.__pendingValue===a)return;const t=this.__pendingValue,e=this.value,s=null==t||null!=e&&(t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive),i=null!=t&&(null==e||s);s&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),i&&(this.__options=A(t),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=t,this.__pendingValue=a}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}const A=t=>t&&(T?{capture:t.capture,passive:t.passive,once:t.once}:t.capture);
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const E=new class{handleAttributeExpressions(t,e,s,i){const o=e[0];if("."===o){return new C(t,e.slice(1),s).parts}return"@"===o?[new $(t,e.slice(1),i.eventContext)]:"?"===o?[new k(t,e.slice(1),s)]:new S(t,e,s).parts}handleTextExpression(t){return new z(t)}};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */function O(t){let e=R.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},R.set(t.type,e));let s=e.stringsArray.get(t.strings);if(void 0!==s)return s;const i=t.strings.join(c);return void 0===(s=e.keyString.get(i))&&(s=new u(t,t.getTemplateElement()),e.keyString.set(i,s)),e.stringsArray.set(t.strings,s),s}const R=new Map,j=new WeakMap;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.1.2");const U=(t,...e)=>new _(t,e,"html",E),V=133;function M(t,e){const{element:{content:s},parts:i}=t,o=document.createTreeWalker(s,V,null,!1);let n=H(i),r=i[n],a=-1,l=0;const c=[];let p=null;for(;o.nextNode();){a++;const t=o.currentNode;for(t.previousSibling===p&&(p=null),e.has(t)&&(c.push(t),null===p&&(p=t)),null!==p&&l++;void 0!==r&&r.index===a;)r.index=null!==p?-1:r.index-l,r=i[n=H(i,n)]}c.forEach(t=>t.parentNode.removeChild(t))}const B=t=>{let e=11===t.nodeType?0:1;const s=document.createTreeWalker(t,V,null,!1);for(;s.nextNode();)e++;return e},H=(t,e=-1)=>{for(let s=e+1;s<t.length;s++){const e=t[s];if(m(e))return s}return-1};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const F=(t,e)=>`${t}--${e}`;let q=!0;void 0===window.ShadyCSS?q=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),q=!1);const D=t=>e=>{const s=F(e.type,t);let i=R.get(s);void 0===i&&(i={stringsArray:new WeakMap,keyString:new Map},R.set(s,i));let o=i.stringsArray.get(e.strings);if(void 0!==o)return o;const n=e.strings.join(c);if(void 0===(o=i.keyString.get(n))){const s=e.getTemplateElement();q&&window.ShadyCSS.prepareTemplateDom(s,t),o=new u(e,s),i.keyString.set(n,o)}return i.stringsArray.set(e.strings,o),o},W=["html","svg"],L=new Set,I=(t,e,s)=>{L.add(t);const i=s?s.element:document.createElement("template"),o=e.querySelectorAll("style"),{length:n}=o;if(0===n)return void window.ShadyCSS.prepareTemplateStyles(i,t);const r=document.createElement("style");for(let t=0;t<n;t++){const e=o[t];e.parentNode.removeChild(e),r.textContent+=e.textContent}(t=>{W.forEach(e=>{const s=R.get(F(e,t));void 0!==s&&s.keyString.forEach(t=>{const{element:{content:e}}=t,s=new Set;Array.from(e.querySelectorAll("style")).forEach(t=>{s.add(t)}),M(t,s)})})})(t);const a=i.content;s?function(t,e,s=null){const{element:{content:i},parts:o}=t;if(null==s)return void i.appendChild(e);const n=document.createTreeWalker(i,V,null,!1);let r=H(o),a=0,l=-1;for(;n.nextNode();){for(l++,n.currentNode===s&&(a=B(e),s.parentNode.insertBefore(e,s));-1!==r&&o[r].index===l;){if(a>0){for(;-1!==r;)o[r].index+=a,r=H(o,r);return}r=H(o,r)}}}(s,r,a.firstChild):a.insertBefore(r,a.firstChild),window.ShadyCSS.prepareTemplateStyles(i,t);const l=a.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==l)e.insertBefore(l.cloneNode(!0),e.firstChild);else if(s){a.insertBefore(r,a.firstChild);const t=new Set;t.add(r),M(s,t)}};window.JSCompiler_renameProperty=(t,e)=>t;const K={toAttribute(t,e){switch(e){case Boolean:return t?"":null;case Object:case Array:return null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){switch(e){case Boolean:return null!==t;case Number:return null===t?null:Number(t);case Object:case Array:return JSON.parse(t)}return t}},J=(t,e)=>e!==t&&(e==e||t==t),Y={attribute:!0,type:String,converter:K,reflect:!1,hasChanged:J},G=Promise.resolve(!0),Q=1,X=4,Z=8,tt=16,et=32,st="finalized";class it extends HTMLElement{constructor(){super(),this._updateState=0,this._instanceProperties=void 0,this._updatePromise=G,this._hasConnectedResolver=void 0,this._changedProperties=new Map,this._reflectingProperties=void 0,this.initialize()}static get observedAttributes(){this.finalize();const t=[];return this._classProperties.forEach((e,s)=>{const i=this._attributeNameForProperty(s,e);void 0!==i&&(this._attributeToPropertyMap.set(i,s),t.push(i))}),t}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const t=Object.getPrototypeOf(this)._classProperties;void 0!==t&&t.forEach((t,e)=>this._classProperties.set(e,t))}}static createProperty(t,e=Y){if(this._ensureClassProperties(),this._classProperties.set(t,e),e.noAccessor||this.prototype.hasOwnProperty(t))return;const s="symbol"==typeof t?Symbol():`__${t}`;Object.defineProperty(this.prototype,t,{get(){return this[s]},set(e){const i=this[t];this[s]=e,this._requestUpdate(t,i)},configurable:!0,enumerable:!0})}static finalize(){const t=Object.getPrototypeOf(this);if(t.hasOwnProperty(st)||t.finalize(),this[st]=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const t=this.properties,e=[...Object.getOwnPropertyNames(t),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t):[]];for(const s of e)this.createProperty(s,t[s])}}static _attributeNameForProperty(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}static _valueHasChanged(t,e,s=J){return s(t,e)}static _propertyValueFromAttribute(t,e){const s=e.type,i=e.converter||K,o="function"==typeof i?i:i.fromAttribute;return o?o(t,s):t}static _propertyValueToAttribute(t,e){if(void 0===e.reflect)return;const s=e.type,i=e.converter;return(i&&i.toAttribute||K.toAttribute)(t,s)}initialize(){this._saveInstanceProperties(),this._requestUpdate()}_saveInstanceProperties(){this.constructor._classProperties.forEach((t,e)=>{if(this.hasOwnProperty(e)){const t=this[e];delete this[e],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(e,t)}})}_applyInstanceProperties(){this._instanceProperties.forEach((t,e)=>this[e]=t),this._instanceProperties=void 0}connectedCallback(){this._updateState=this._updateState|et,this._hasConnectedResolver&&(this._hasConnectedResolver(),this._hasConnectedResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(t,e,s){e!==s&&this._attributeToProperty(t,s)}_propertyToAttribute(t,e,s=Y){const i=this.constructor,o=i._attributeNameForProperty(t,s);if(void 0!==o){const t=i._propertyValueToAttribute(e,s);if(void 0===t)return;this._updateState=this._updateState|Z,null==t?this.removeAttribute(o):this.setAttribute(o,t),this._updateState=this._updateState&~Z}}_attributeToProperty(t,e){if(this._updateState&Z)return;const s=this.constructor,i=s._attributeToPropertyMap.get(t);if(void 0!==i){const t=s._classProperties.get(i)||Y;this._updateState=this._updateState|tt,this[i]=s._propertyValueFromAttribute(e,t),this._updateState=this._updateState&~tt}}_requestUpdate(t,e){let s=!0;if(void 0!==t){const i=this.constructor,o=i._classProperties.get(t)||Y;i._valueHasChanged(this[t],e,o.hasChanged)?(this._changedProperties.has(t)||this._changedProperties.set(t,e),!0!==o.reflect||this._updateState&tt||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(t,o))):s=!1}!this._hasRequestedUpdate&&s&&this._enqueueUpdate()}requestUpdate(t,e){return this._requestUpdate(t,e),this.updateComplete}async _enqueueUpdate(){let t,e;this._updateState=this._updateState|X;const s=this._updatePromise;this._updatePromise=new Promise((s,i)=>{t=s,e=i});try{await s}catch(t){}this._hasConnected||await new Promise(t=>this._hasConnectedResolver=t);try{const t=this.performUpdate();null!=t&&await t}catch(t){e(t)}t(!this._hasRequestedUpdate)}get _hasConnected(){return this._updateState&et}get _hasRequestedUpdate(){return this._updateState&X}get hasUpdated(){return this._updateState&Q}performUpdate(){this._instanceProperties&&this._applyInstanceProperties();let t=!1;const e=this._changedProperties;try{(t=this.shouldUpdate(e))&&this.update(e)}catch(e){throw t=!1,e}finally{this._markUpdated()}t&&(this._updateState&Q||(this._updateState=this._updateState|Q,this.firstUpdated(e)),this.updated(e))}_markUpdated(){this._changedProperties=new Map,this._updateState=this._updateState&~X}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(t){return!0}update(t){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((t,e)=>this._propertyToAttribute(e,this[e],t)),this._reflectingProperties=void 0)}updated(t){}firstUpdated(t){}}it[st]=!0;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const ot=t=>e=>"function"==typeof e?((t,e)=>(window.customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:s,elements:i}=e;return{kind:s,elements:i,finisher(e){window.customElements.define(t,e)}}})(t,e),nt=(t,e)=>"method"!==e.kind||!e.descriptor||"value"in e.descriptor?{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(s){s.createProperty(e.key,t)}}:Object.assign({},e,{finisher(s){s.createProperty(e.key,t)}}),rt=(t,e,s)=>{e.constructor.createProperty(s,t)};function at(t){return(e,s)=>void 0!==s?rt(t,e,s):nt(t,e)}const lt="adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ct=Symbol();class pt{constructor(t,e){if(e!==ct)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){return void 0===this._styleSheet&&(lt?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const dt=(t,...e)=>{const s=e.reduce((e,s,i)=>e+(t=>{if(t instanceof pt)return t.cssText;if("number"==typeof t)return t;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(s)+t[i+1],t[0]);return new pt(s,ct)};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
(window.litElementVersions||(window.litElementVersions=[])).push("2.2.1");const ht=t=>t.flat?t.flat(1/0):function t(e,s=[]){for(let i=0,o=e.length;i<o;i++){const o=e[i];Array.isArray(o)?t(o,s):s.push(o)}return s}(t);class ut extends it{static finalize(){super.finalize.call(this),this._styles=this.hasOwnProperty(JSCompiler_renameProperty("styles",this))?this._getUniqueStyles():this._styles||[]}static _getUniqueStyles(){const t=this.styles,e=[];if(Array.isArray(t)){ht(t).reduceRight((t,e)=>(t.add(e),t),new Set).forEach(t=>e.unshift(t))}else t&&e.push(t);return e}initialize(){super.initialize(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const t=this.constructor._styles;0!==t.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?lt?this.renderRoot.adoptedStyleSheets=t.map(t=>t.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(t.map(t=>t.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(t){super.update(t);const e=this.render();e instanceof _&&this.constructor.render(e,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(t=>{const e=document.createElement("style");e.textContent=t.cssText,this.renderRoot.appendChild(e)}))}render(){}}ut.finalized=!0,ut.render=(t,e,s)=>{if(!s||"object"!=typeof s||!s.scopeName)throw new Error("The `scopeName` option is required.");const i=s.scopeName,o=j.has(e),n=q&&11===e.nodeType&&!!e.host,a=n&&!L.has(i),l=a?document.createDocumentFragment():e;if(((t,e,s)=>{let i=j.get(e);void 0===i&&(r(e,e.firstChild),j.set(e,i=new z(Object.assign({templateFactory:O},s))),i.appendInto(e)),i.setValue(t),i.commit()})(t,l,Object.assign({templateFactory:D(i)},s)),a){const t=j.get(l);j.delete(l);const s=t.value instanceof b?t.value.template:void 0;I(i,l,s),r(e,e.firstChild),e.appendChild(l),j.set(e,t)}!o&&n&&window.ShadyCSS.styleElement(e.host)};var ft=()=>(`${1e7}`+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,t=>{const e=Number(t);return(e^window.crypto.getRandomValues(new Uint8Array(1))[0]&15>>e/4).toString(16)});var mt=class{constructor(t,e="/"){this.appRoutes=[],this.baseUrl="/",this.listeners=[],this.appRoutes=t,this.baseUrl=e,this.listenToPopState()}get base(){return this.baseUrl}get currentRoute(){const t=this.guardPath(`/${window.location.pathname.replace(this.baseUrl,"")}`);return this.appRoutes.find(e=>e.url===t)}subscribe(t){this.listeners.push(t)}push(t){const e=this.currentRoute,s=this.guardPath(t.replace(this.baseUrl,"")),i=this.appRoutes.find(t=>t.url===s);if(!i)return void console.error("Unknown route",s);const o=t.startsWith(this.baseUrl)?t:`${this.baseUrl}${t}`,n=`${window.location.origin}${o}`;window.history.pushState(null,"",n),this.publishChange(i,e)}guardPath(t){if(!t)return this.baseUrl;console.log(t,t.split("?")[0]);let e=t.split("?")[0];return(e=(e=(e=e.replace(/\/\//g,"/")).startsWith("/")?e:`/${e}`).endsWith("/")?e.slice(0,-1):e)||this.baseUrl}listenToPopState(){window.onpopstate=()=>{const t=this.guardPath(`/${window.location.pathname.replace(this.baseUrl,"")}`),e=this.appRoutes.find(e=>e.url===t);e?this.publishChange(e):console.error("Unknown route",t)}}publishChange(t,e){const s={key:ft(),fromRoute:e,toRoute:t};this.listeners.forEach(t=>t(s))}};var yt=new mt([{name:"home",render:()=>U`
          <czd-home></czd-home>
        `,url:"/"},{name:"puzzle",render:()=>U`
          <czd-puzzle></czd-puzzle>
        `,url:"/puzzle"}],"/");var gt=function(t,e,s,i){var o,n=arguments.length,r=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,s,i);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(n<3?o(r):n>3?o(e,s,r):o(e,s))||r);return n>3&&r&&Object.defineProperty(e,s,r),r};let bt=class extends ut{constructor(){super(...arguments),this.href="",this.buttonise=!1,this.primary=!1,this.nav=!1}static get styles(){return dt`
      .router-link--as-button {
        display: block;
        text-decoration: none;
        font-family: var(--font-family);
        font-size: var(--font-size);
        background: none;
        border: none;
        box-shadow: 1px 1px 2px 0px var(--shadow-colour),
          0px 0px 1px 0px var(--shadow-colour);
        padding: 5px 10px;
        margin: 0 2px;
        cursor: pointer;
      }
      .router-link--as-button:hover {
        background-color: hsl(0, 0%, 95%);
      }
      .router-link--primary {
        background-color: var(--primary-colour);
        color: var(--secondary-contrast);
      }
      .router-link--primary:hover {
        background-color: var(--primary-colour-hovered);
      }
      .router-link--nav {
        text-decoration: none;
        font-size: 1.25rem;
        color: var(--secondary-colour);
      }
      .router-link--nav:hover {
        color: var(--secondary-colour-hovered);
      }
    `}render(){const t=this.resolveLocation(),e=["router-link",this.buttonise&&"router-link--as-button",this.buttonise&&this.primary&&"router-link--primary",this.nav&&"router-link--nav"].filter(t=>!!t).join(" ");return U`
      <a class="${e}" href="${t}" @click=${this.handleClick}>
        <slot></slot>
      </a>
    `}handleClick(t){if(function(t){if(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)return;if(t.defaultPrevented)return;if(void 0!==t.button&&0!==t.button)return;const e=t.currentTarget;if(e&&e.getAttribute){const t=e.getAttribute("target")||"";if(/\b_blank\b/i.test(t))return}return t.preventDefault(),!0}(t)){const t=this.resolveLocation();yt.push(t)}}resolveLocation(){const t=this.href.startsWith(yt.base)?this.href:`${yt.base}${this.href}`;return yt.guardPath(t)}};gt([at({type:String})],bt.prototype,"href",void 0),gt([at({type:Boolean})],bt.prototype,"buttonise",void 0),gt([at({type:Boolean})],bt.prototype,"primary",void 0),gt([at({type:Boolean})],bt.prototype,"nav",void 0),bt=gt([ot("czd-router-link")],bt);var vt=function(t,e,s,i){var o,n=arguments.length,r=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,s,i);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(n<3?o(r):n>3?o(e,s,r):o(e,s))||r);return n>3&&r&&Object.defineProperty(e,s,r),r};let _t=class extends ut{constructor(){super(...arguments),this.type="button",this.primary=!1,this.icon=!1,this.disabled=!1}static get styles(){return dt`
      :host[disabled] {
        pointer-events: none;
      }
      .button {
        font-family: var(--font-family);
        font-size: var(--font-size);
        background: none;
        border: none;
        box-shadow: 1px 1px 2px 0px var(--shadow-colour),
          0px 0px 1px 0px var(--shadow-colour);
        padding: 5px 10px;
        margin: 0 2px;
        cursor: pointer;
      }
      .button:hover {
        background-color: hsl(0, 0%, 95%);
      }
      .button--primary {
        background-color: var(--primary-colour);
        color: var(--secondary-contrast);
      }
      .button--primary:hover {
        background-color: var(--primary-colour-hovered);
      }
      .button--icon {
        padding: 2px 8px;
        border-radius: 50%;
        box-shadow: none;
        font-size: 1.25rem;
      }
      .button--icon:hover {
        background-color: initial;
        box-shadow: 1px 1px 2px 0px var(--shadow-colour),
          0px 0px 1px 0px var(--shadow-colour);
      }
      .button:disabled {
        background-color: var(--disabled-colour);
        cursor: default;
      }
    `}render(){const t=["button",this.primary&&"button--primary",this.icon&&"button--icon"].filter(t=>!!t).join(" ");return U`
      <button
        type="${this.type}"
        class="${t}"
        ?disabled=${this.disabled}
        @click=${this.onClick}
      >
        <slot></slot>
      </button>
    `}onClick(){const t=new CustomEvent("onClick",{bubbles:!0,composed:!0,detail:null});this.dispatchEvent(t)}};vt([at({type:String})],_t.prototype,"type",void 0),vt([at({type:Boolean})],_t.prototype,"primary",void 0),vt([at({type:Boolean})],_t.prototype,"icon",void 0),vt([at({type:Boolean})],_t.prototype,"disabled",void 0),_t=vt([ot("czd-button")],_t);var wt=dt`
  .has-float-label {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    position: relative;
  }
  .has-float-label label {
    position: absolute;
    left: 5px;
    top: 1px;
    cursor: text;
    font-size: 0.75em;
    opacity: 1;
    -webkit-transition: all 0.2s;
    transition: all 0.2s;
  }
  .has-float-label select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
  .has-float-label input,
  .has-float-label select {
    font-size: inherit;
    padding: 0 0.5em;
    padding-top: 1em;
    margin-bottom: 2px;
    border: 0;
    border-radius: 0;
    border-bottom: 2px solid rgba(0, 0, 0, 0.1);
  }
  .has-float-label input::-webkit-input-placeholder,
  .has-float-label select::-webkit-input-placeholder {
    opacity: 1;
    -webkit-transition: all 0.2s;
    transition: all 0.2s;
  }
  .has-float-label
    input:placeholder-shown:not(:focus)::-webkit-input-placeholder,
  .has-float-label
    select:placeholder-shown:not(:focus)::-webkit-input-placeholder {
    opacity: 0;
  }
  .has-float-label
    input:placeholder-shown:not(:focus)
    + :not(.input-has-content),
  .has-float-label
    select:placeholder-shown:not(:focus)
    + :not(.input-has-content) {
    font-size: 1.3em;
    opacity: 0.7;
    pointer-events: none;
    top: 0.5em;
    left: 0.3em;
  }
  .has-float-label input:focus,
  .has-float-label select:focus {
    outline: none;
    border-color: var(--primary-colour);
  }
  .has-float-label.input-list-container input {
    padding-bottom: 0.3em;
  }
  .has-float-label.input-list-container
    input:placeholder-shown:not(:focus)
    + :not(.input-has-content) {
    font-size: 1.3em;
    opacity: 0.7;
    pointer-events: none;
    top: 1em;
  }
  .has-float-label select {
    padding: 0.75em 0.25em 0 0.75em;
    margin-bottom: 0;
    cursor: pointer;
  }
  .has-float-label--select::after {
    content: '⌵';
    position: absolute;
    top: 75%;
    right: 5px;
    -webkit-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
    font-weight: 700;
    font-size: 0.75em;
    pointer-events: none;
    height: calc(100% - 0.75em);
  }
`;async function xt(t,e){const s=function(t){const e=t||{},s=e.headers||(e.body instanceof FormData?{}:{Accept:"application/json","Content-Type":"application/json"});return{...e,headers:s}}(e);try{const e=await fetch(`/api${t}`,{method:"GET",...s});return await e.json()}catch(t){return{success:!1,data:null,errorMessage:t.message}}}var St=function(t,e,s,i){var o,n=arguments.length,r=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,s,i);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(n<3?o(r):n>3?o(e,s,r):o(e,s))||r);return n>3&&r&&Object.defineProperty(e,s,r),r};let Pt=class extends ut{constructor(){super(...arguments),this.file=void 0}static get styles(){return[wt,dt`
        .control {
          display: flex;
          flex-direction: column;
          margin-bottom: 10px;
        }
        .control__input.control__input {
          padding-bottom: 5px;
        }

        .form {
          min-width: 400px;
          max-width: 50%;
        }
      `]}async firstUpdated(){const t=await xt("/ping");console.log(t)}render(){return U`
      <h1 class="page-title">Upload an image to get started</h1>
      <form class="form" @submit=${this.onSubmit}>
        <div class="control has-float-label">
          <label for="file">Upload</label>
          <input
            class="control__input"
            id="file"
            type="file"
            name="file"
            accept="image/png, image/jpeg"
            required
            @change=${this.onFileSelect}
          />
        </div>

        <czd-button type="submit" primary @onClick=${this.onSubmit}
          >Submit</czd-button
        >
      </form>
    `}onFileSelect(t){const e=t.target,s=e.files&&e.files[0];this.file=s||void 0}async onSubmit(t){if(t.preventDefault(),console.log("submit",this.file),!this.file)return;const e=new FormData;e.append("file",this.file);const s=await xt("/puzzle",{body:e,method:"POST"});if(console.log(s),s.success){const t=s.message;yt.push(`/puzzle?key=${t}`)}}};St([at({type:File})],Pt.prototype,"file",void 0),Pt=St([ot("czd-home")],Pt);var zt=function(t,e,s,i){var o,n=arguments.length,r=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,s,i);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(n<3?o(r):n>3?o(e,s,r):o(e,s))||r);return n>3&&r&&Object.defineProperty(e,s,r),r};let kt=class extends ut{constructor(){super(...arguments),this.isHidden=!1}static get styles(){return dt`
      .tile {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .tile__button {
        display: flex;
        background: none;
        padding: 0;
        border: none;
      }
      .tile__button:not([disabled]) {
        cursor: pointer;
      }
      .image {
      }
      .image--hidden {
        visibility: hidden;
      }
    `}render(){const t=["image",this.isHidden&&"image--hidden"].filter(t=>!!t).join(" ");return U`
      <div class="tile">
        <button
          class="tile__button"
          type="button"
          ?disabled=${this.isHidden}
          @click=${this.onClick}
        >
          <img class="${t}" src="${this.image}" alt="Tile ${this.key}" />
        </button>
      </div>
    `}onClick(){const t=new CustomEvent("select",{detail:this.key});this.dispatchEvent(t)}};zt([at({type:Number})],kt.prototype,"key",void 0),zt([at({type:String})],kt.prototype,"image",void 0),zt([at({type:Boolean})],kt.prototype,"isHidden",void 0),kt=zt([ot("czd-tile")],kt);var Ct=(t="")=>t.slice(1).split("&").reduce((t,e)=>{const[s,i]=e.split("=");return{...t,[s]:i}},{});var Nt=function(t,e,s,i){var o,n=arguments.length,r=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,s,i);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(n<3?o(r):n>3?o(e,s,r):o(e,s))||r);return n>3&&r&&Object.defineProperty(e,s,r),r};let Tt=class extends ut{constructor(){super(...arguments),this.puzzle=void 0,this.tiles=[],this.noPuzzle=!1,this.isSolved=!1,this.message=""}static get styles(){return dt`
      :host,
      .container {
        display: flex;
        flex-direction: column;
        width: 100%;
      }
      .tile-grid {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-auto-rows: 1fr;
        grid-gap: 2px;
        background-color: var(--secondary-colour);
        padding: 2px;
        box-shadow: 1px 1px 2px 0px var(--primary-colour),
          0px 0px 1px 0px var(--primary-colour);
        margin: auto;
      }

      .success-summary {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: auto;
      }
      .success-summary__actions {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        margin: 10px 0;
      }

      .feedback {
        display: flex;
        justify-content: center;
        width: 100%;
        padding: 5px 0;
      }
    `}async firstUpdated(){const t=window.location.search,e=Ct(t),s=e.key;console.log(e),s?this.fetchPuzzle(s):this.noPuzzle=!0}render(){if(this.noPuzzle)return U`
        <div>
          <h1>No image found</h1>
          <p style="white-space:pre-line;">
            ${"We couldn't find an image to create a puzzle with.\n            Upload one on the homepage."}
          </p>
          <div>
            <czd-router-link .href="${yt.base}"
              >Return to Home</czd-router-link
            >
          </div>
        </div>
      `;const t=this.puzzle&&this.puzzle.original,e=this.isSolved?"Congratulations! You solved the puzzle.":"Solve the puzzle";return U`
      <div class="container">
        <h1>${e}</h1>
        ${this.isSolved?U`
              <div class="success-summary">
                <div>
                  <img src="${t}" alt="Puzzle Solution" />
                </div>
                <div class="success-summary__actions">
                  <czd-router-link .href="${yt.base}" primary buttonise
                    >New game</czd-router-link
                  >
                  <czd-button primary @onClick=${this.resetPuzzle}
                    >Play again</czd-button
                  >
                </div>
              </div>
            `:U`
              <div class="tile-grid">
                ${this.tiles.map(t=>U`
                      <czd-tile
                        .key=${t.position}
                        .image=${t.image}
                        ?isHidden=${8===t.position}
                        @select=${this.handleSelect}
                      ></czd-tile>
                    `)}
              </div>
              <div class="feedback">
                ${this.message}
              </div>
            `}
      </div>
    `}handleSelect(t){const e=t.detail,s=this.tiles.findIndex(t=>8===t.position),i=this.tiles.findIndex(t=>t.position===e);console.log(`from: ${i}, to: ${s} ??`);const o=s%3==i%3,n=3===Math.abs(s-i),r=Math.floor(s/3)===Math.floor(i/3),a=1===Math.abs(s-i);if(o&&n||r&&a){const t=[...this.tiles];[t[s],t[i]]=[t[i],t[s]],this.tiles=t,this.message="",this.validatePositions()}else this.message="You need to click on a piece adjacent to the empty tile!"}validatePositions(){this.isSolved=this.tiles.every((t,e)=>t.position===e)}resetPuzzle(){this.isSolved=!1,this.setPuzzleData(this.puzzle)}async fetchPuzzle(t){if(t){const e=await xt(`/puzzle/${t}`);if(e.success){const t={original:e.original.image,tiles:e.tiles.map(t=>({image:t.image,position:t.position}))};this.setPuzzleData(t)}}this.puzzle||(this.noPuzzle=!0)}setPuzzleData(t){this.puzzle=t,this.tiles=function(t){const e=[...t];for(let t=e.length-1;t>0;t--){const s=Math.floor(Math.random()*(t+1));[e[t],e[s]]=[e[s],e[t]]}return e}(t.tiles)}};Nt([at({type:Object})],Tt.prototype,"puzzle",void 0),Nt([at({type:Array})],Tt.prototype,"tiles",void 0),Nt([at({type:Boolean})],Tt.prototype,"noPuzzle",void 0),Nt([at({type:Boolean})],Tt.prototype,"isSolved",void 0),Nt([at({type:String})],Tt.prototype,"message",void 0),Tt=Nt([ot("czd-puzzle")],Tt);var $t=function(t,e,s,i){var o,n=arguments.length,r=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,s,i);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(n<3?o(r):n>3?o(e,s,r):o(e,s))||r);return n>3&&r&&Object.defineProperty(e,s,r),r};let At=class extends ut{constructor(){super(...arguments),this.routeKey=""}static get styles(){return dt`
      :host,
      main {
        --action-bar-height: 51px;
        min-height: calc(100vh - 10px - var(--action-bar-height));
      }

      main {
        padding: 5px;
      }

      .action-bar {
        display: flex;
        align-items: center;
        background-color: var(--primary-colour);
        min-height: var(--action-bar-height);
        padding: 10px 15px;
        box-shadow: 1px 1px 2px 2px var(--shadow-colour);
        box-sizing: border-box;
      }
    `}firstUpdated(){yt.subscribe(({key:t})=>this.routeKey=t)}render(){let t=yt.currentRoute;return t||(t={name:"404",render:()=>U`
          <h1>We couldn't find what you were looking for.</h1>
          <div>
            <czd-router-link .href=${yt.base}
              >Return to Home</czd-router-link
            >
          </div>
        `,url:""}),U`
      <nav class="action-bar">
        <czd-router-link nav .href=${yt.base}>Home</czd-router-link>
      </nav>
      <main>
        ${t.render(this.routeKey)}
      </main>
    `}};$t([at({type:String})],At.prototype,"routeKey",void 0),At=$t([ot("czd-router-view")],At)}]);