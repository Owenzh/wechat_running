/*
 * Wxmlify v1.2.0
 * https://github.com/zhanziyang/wxmlify
 * 
 * Copyright (c) 2018 zhanziyang
 * Released under the ISC license
 */
"use strict";function startsWith(t,e,r){return t.substr(r||0,e.length)===e}function endsWith(t,e,r){var n=(r||t.length)-e.length,a=t.lastIndexOf(e,n);return-1!==a&&a===n}function stringIncludes(t,e,r){return-1!==t.indexOf(e,r||0)}function isRealNaN(t){return"number"==typeof t&&isNaN(t)}function arrayIncludes(t,e,r){var n=t.length;if(0===n)return!1;for(var a=0|r,i=isRealNaN(e),s=a>=0?a:n+a;s<n;){var o=t[s++];if(o===e)return!0;if(i&&isRealNaN(o))return!0}return!1}var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},slicedToArray=function(){return function(t,e){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return function(t,e){var r=[],n=!0,a=!1,i=void 0;try{for(var s,o=t[Symbol.iterator]();!(n=(s=o.next()).done)&&(r.push(s.value),!e||r.length!==e);n=!0);}catch(t){a=!0,i=t}finally{try{!n&&o.return&&o.return()}finally{if(a)throw i}}return r}(t,e);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),toConsumableArray=function(t){if(Array.isArray(t)){for(var e=0,r=Array(t.length);e<t.length;e++)r[e]=t[e];return r}return Array.from(t)};function lexer(t,e){var r={str:t,options:e,cursor:0,tokens:[]};return lex(r),r.tokens}function lex(t){for(var e=t.str,r=e.length;t.cursor<r;){if("<"!==e.charAt(t.cursor))lexText(t);else if(startsWith(e,"!--",t.cursor+1))lexComment(t);else{var n=lexTag(t);if(n){var a=n.toLowerCase();arrayIncludes(t.options.childlessTags,a)&&lexSkipTag(n,t)}}}}function lexText(t){var e=t.str,r=t.cursor,n=e.indexOf("<",r),a="text";if(-1===n){var i=e.slice(r);return t.cursor=e.length,void t.tokens.push({type:a,content:i})}if(n!==r){var s=e.slice(r,n);t.cursor=n,t.tokens.push({type:a,content:s})}}function lexComment(t){t.cursor+=4;var e=t.str,r=t.cursor,n=e.indexOf("--\x3e",r),a="comment";if(-1===n){var i=e.slice(r);return t.cursor=e.length,void t.tokens.push({type:a,content:i})}var s=e.slice(r,n);t.cursor=n+3,t.tokens.push({type:a,content:s})}function lexTag(t){var e=t.str,r="/"===e.charAt(t.cursor+1);t.tokens.push({type:"tag-start",close:r}),t.cursor+=r?2:1;var n=lexTagName(t);lexTagAttributes(t);var a="/"===e.charAt(t.cursor);return t.tokens.push({type:"tag-end",close:a}),t.cursor+=a?2:1,n}var whitespace=/\s/;function isWhitespaceChar(t){return whitespace.test(t)}function lexTagName(t){for(var e=t.str,r=t.cursor,n=e.length,a=r;a<n;){var i=e.charAt(a);if(!(isWhitespaceChar(i)||"/"===i||">"===i))break;a++}for(var s=a+1;s<n;){var o=e.charAt(s);if(!!(isWhitespaceChar(o)||"/"===o||">"===o))break;s++}t.cursor=s;var l=e.slice(a,s);return t.tokens.push({type:"tag",content:l}),l}function lexTagAttributes(t){for(var e=t.str,r=t.tokens,n=t.cursor,a=null,i=n,s=[],o=e.length;n<o;){var l=e.charAt(n);if(a){l===a&&(a=null),n++}else{if("/"===l||">"===l){n!==i&&s.push(e.slice(i,n));break}if(isWhitespaceChar(l))n!==i&&s.push(e.slice(i,n)),i=n+1,n++;else"'"===l||'"'===l?(a=l,n++):n++}}t.cursor=n;for(var c=s.length,u="attribute",f=0;f<c;f++){var p=s[f];if(p&&p.length){if(-1===p.indexOf("=")){var h=s[f+1];if(h&&startsWith(h,"=")){if(h.length>1){var y=p+h;r.push({type:u,content:y}),f+=1;continue}var d=s[f+2];if(f+=1,d){var g=p+"="+d;r.push({type:u,content:g}),f+=1;continue}}}if(endsWith(p,"=")){var m=s[f+1];if(m&&!stringIncludes(m,"=")){var v=p+m;r.push({type:u,content:v}),f+=1;continue}var b=p.slice(0,-1);r.push({type:u,content:b})}else r.push({type:u,content:p})}}}function lexSkipTag(t,e){for(var r=e.str,n=e.cursor,a=e.tokens,i=r.length,s=n;s<i;){var o=r.indexOf("</",s);if(-1===o){lexText(e);break}var l={str:r,cursor:o+2,tokens:[]},c=lexTagName(l);if(t.toLowerCase()===c.toLowerCase()){var u=r.slice(n,o);a.push({type:"text",content:u});lexTagAttributes(l),a.push.apply(a,[{type:"tag-start",close:!0}].concat(toConsumableArray(l.tokens),[{type:"tag-end",close:!1}])),e.cursor=l.cursor+1;break}s=l.cursor}}function parser(t,e){var r={tagName:null,children:[]};return parse$1({tokens:t,options:e,cursor:0,stack:[r]}),r.children}function hasTerminalParent(t,e,r){var n=r[t];if(n)for(var a=e.length-1;a>=0;){var i=e[a].tagName;if(i===t)break;if(arrayIncludes(n,i))return!0;a--}return!1}function parse$1(t){for(var e=t.tokens,r=t.options,n=t.stack,a=n[n.length-1].children,i=e.length,s=t.cursor;s<i;){var o=e[s];if("tag-start"===o.type){var l=e[++s];s++;var c=l.content.toLowerCase();if(o.close){for(var u=void 0;(u=n.pop())&&c!==u.tagName;);for(;s<i;){if("tag-end"!==e[s].type)break;s++}break}var f=arrayIncludes(r.closingTags,c);if(f)f=!hasTerminalParent(c,n,r.closingTagAncestorBreakers);if(f)for(var p=n.length-1;p>0;){if(c===n[p].tagName){a=(n=n.slice(0,p))[p-1].children;break}p-=1}for(var h=[],y=void 0;s<i&&"tag-end"!==(y=e[s]).type;)h.push(y.content),s++;s++;var d=[];if(a.push({type:"element",tagName:l.content,attributes:h,children:d}),!(y.close||arrayIncludes(r.voidTags,c))){n.push({tagName:c,children:d});var g={tokens:e,options:r,cursor:s,stack:n};parse$1(g),s=g.cursor}}else a.push(o),s++}t.cursor=s}function format(t){return t.map(function(t){var e=capitalize(t.type);return"Element"===e?{type:e,tagName:t.tagName.toLowerCase(),attributes:formatAttributes(t.attributes),children:format(t.children)}:{type:e,content:t.content}})}function capitalize(t){return t.charAt(0).toUpperCase()+t.slice(1)}function camelCase(t){return t.split("-").reduce(function(t,e){return t+e.charAt(0).toUpperCase()+e.slice(1)})}function castValue(t){if("string"!=typeof t)return t;if(""===t)return t;var e=+t;return isNaN(e)?t:e}function unquote(t){var e=t.charAt(0),r=t.length-1;return('"'===e||"'"===e)&&e===t.charAt(r)?t.slice(1,r):t}function splitHead(t,e){var r=t.indexOf(e);return-1===r?[t]:[t.slice(0,r),t.slice(r+e.length)]}function formatAttributes(t){return t.reduce(function(t,e){var r=splitHead(e.trim(),"="),n=slicedToArray(r,2),a=n[0],i=n[1];if(i=i?unquote(i):a,"class"===a)t.className=i.split(" ");else if("style"===a)t.style=formatStyles(i);else if(startsWith(a,"data-")){t.dataset=t.dataset||{};var s=camelCase(a.slice(5));t.dataset[s]=castValue(i)}else t[camelCase(a)]=castValue(i);return t},{})}function formatStyles(t){return t.trim().split(";").map(function(t){return splitHead(t.trim(),":")}).reduce(function(t,e){var r=slicedToArray(e,2),n=r[0],a=r[1];if(a){var i=camelCase(n.trim()),s=castValue(a.trim());t[i]=s}return t},{})}var childlessTags=["style","script","template"],closingTags=["html","head","body","p","dt","dd","li","option","thead","th","tbody","tr","td","tfoot","colgroup"],closingTagAncestorBreakers={li:["ul","ol","menu"],dt:["dl"],dd:["dl"],tbody:["table"],thead:["table"],tfoot:["table"],tr:["table"],td:["table"]},voidTags=["!doctype","area","base","br","col","command","embed","hr","img","input","keygen","link","meta","param","source","track","wbr"],parseDefaults={voidTags:voidTags,closingTags:closingTags,closingTagAncestorBreakers:closingTagAncestorBreakers,childlessTags:childlessTags,format:format};function parse$$1(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:parseDefaults;return format(parser(lexer(t,e),e),e)}var index={parse:parse$$1,parseDefaults:parseDefaults},src=Object.freeze({parseDefaults:parseDefaults,parse:parse$$1,default:index}),util={BLOCK_ELEMENTS:["h1","h2","h3","h4","h5","h6","p","div","pre","table","tbody","tfoot","tr","ul","ol","li","video","dl","dt","dd","hr","blockquote"],INHERIT_STYLE:["borderCollapse","borderSpacing","captionSide","color","cursor","direction","elevation","empty-cells","fontFamily","fontSize","fontStyle","fontVariant","fontWeight","font","letterSpacing","lineHeight","listStyleImage","listStylePosition","listStyleType","listStyle","stress","textAlign","textIndent","textTrasform","visibility","whiteSpace","wordSpacing"],decodeHTMLEntities:function(t){var e={amp:"&",apos:"'","#x27":"'","#x2F":"/","#39":"'","#47":"/",lt:"<",gt:">",nbsp:" ",quot:'"'};return t.replace(/&([^;]+);/gm,function(t,r){return e[r]||t})},copy:function(t){if("object"!==(void 0===t?"undefined":_typeof(t)))return t;var e={};for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r]);return e},assign:function(t,e){if(null==t)throw new TypeError("Cannot convert undefined or null to object");for(var r=Object(t),n=1;n<arguments.length;n++){var a=arguments[n];if(null!=a)for(var i in a)Object.prototype.hasOwnProperty.call(a,i)&&(r[i]=a[i])}return r},omit:function(t,e){if("object"!==(void 0===t?"undefined":_typeof(t))||"[object Array]"!==Object.prototype.toString.call(e))return t;var r={};for(var n in t)t.hasOwnProperty(n)&&e.indexOf(n)<0&&(r[n]=t[n]);return r},pick:function(t,e){if("object"!==(void 0===t?"undefined":_typeof(t))||"[object Array]"!==Object.prototype.toString.call(e))return t;var r={};for(var n in t)t.hasOwnProperty(n)&&e.indexOf(n)>=0&&(r[n]=t[n]);return r},validateHtmlString:function(t){return!0}},noop=function(){},options={preserveStyles:"all",dataKey:"wxmlified",disableImagePreivew:!1,onImageTap:noop},himalaya=src&&index||src;function Wxmlify(t,e,r){if("string"!=typeof t)throw TypeError("Wxmlify 的第一个参数必须是字符串，代表要解析的HTML代码");if(util.validateHtmlString(t)||console.warn("HTML代码格式不合法或不规范，解析结果可能不符合预期"),"object"!==(void 0===e?"undefined":_typeof(e))||"function"!=typeof e.setData)throw TypeError("Wxmlify 的第二个参数必须是微信小程序的一个页面实例");this.html=t,this.page=e,r=r||{},this.options=util.assign({},options,r),this.fullNodes=himalaya.parse(t),this.images=[],this.init()}Wxmlify.prototype.init=function(){this.traverse(),this.bindEvents(),this.exec()},Wxmlify.prototype.exec=function(){for(var t=[],e=0,r=this.fullNodes.length;e<r;e++){var n=this.fullNodes[e];console.log(n);if("Element"==n.type&&n.children.length){n.children.forEach(function(t){t.parentTag=n.tagName});var a=[];"table"===n.tagName?this.getTableDescendants(n,a):(this.getDescendants(n,a),a.length&&(n.descendants=a)),t.push(n)}else("Text"!=n.type||n.content.trim())&&(n.styles=this.getStyles(n),n['aaa']='ql ps',n.styleString=this.stringifyStyle(n.styles),t.push(n))}var i={};i[this.options.dataKey]=t,this.page.setData(i)},Wxmlify.prototype.bindEvents=function(){this.page.__wxmlifyImageTapHandler=this.imageTapHandler.bind(this)},Wxmlify.prototype.imageTapHandler=function(t){var e=t.currentTarget.dataset.attributes||{};this.page;this.options.disableImagePreivew||wx.previewImage({current:e.src,urls:this.images}),this.options.onImageTap&&this.options.onImageTap(t)},Wxmlify.prototype.getFullNodes=function(){return this.fullNodes},Wxmlify.prototype.getHTML=function(){return this.html},Wxmlify.prototype.getImages=function(){return this.images},Wxmlify.prototype.getDescendants=function(t,e){var r=t.children||[],n=this.getStyles(t);t.styles=n,t.styleString=this.stringifyStyle(n);for(var a=0,i=r.length;a<i;a++){var s=r[a];s.styles=util.pick(n,util.INHERIT_STYLE),s.styleString=this.stringifyStyle(n),s.children&&s.children.length?(s.children.forEach(function(t){t.parentTag=s.tagName}),"table"===s.tagName?this.getTableDescendants(s,e):(this.getDescendants(s,e),util.BLOCK_ELEMENTS.indexOf(s.tagName)>=0&&e.push({type:"BIB",tagName:s.tagName,styles:{},styleString:"",parentTag:t.tagName}))):("Text"!=s.type||s.content.trim())&&e.push(s)}},Wxmlify.prototype.getTableDescendants=function(t,e){var r=this.getStyles(t);t.styles=r,t.styleString=this.stringifyStyle(r),t.table=!0;var n=[];this.findAllCertanTypeOfTagIn(t,n,["tr"]),n.forEach(function(t){this.manageTableRow(t)}.bind(this)),t.rows=n},Wxmlify.prototype.findAllCertanTypeOfTagIn=function(t,e,r){if(t.children)for(var n=t.children,a=n.length,i=0;i<a;i++){var s=n[i];s&&r.indexOf(s.tagName)>=0?e.push(s):this.findAllCertanTypeOfTagIn(s,e,r)}},Wxmlify.prototype.manageTableRow=function(t){var e=[];this.findAllCertanTypeOfTagIn(t,e,["td","th"]),t.cells=e.map(function(t){var e=[];return this.getDescendants(t,e),t.descendants=e,t}.bind(this)),t.isHead=e[0]&&"th"===e[0].tagName},Wxmlify.prototype.getStyles=function(t){var e=util.copy(t.styles)||{};this.addTagStyles(e,t.tagName);var r=this.options.preserveStyles||[];if(t.attributes&&t.attributes.style){var n=t.attributes.style;for(var a in n)n.hasOwnProperty(a)&&("all"==r||r.indexOf(a)>=0)&&(e[a]=n[a])}return e},Wxmlify.prototype.addTagStyles=function(t,e){"b"!=e&&"strong"!=e||(t.fontWeight="bold"),"i"!=e&&"em"!=e||(t.fontStyle="italic"),"s"==e&&(t["text-decoration"]="underline"),"del"==e&&(t["text-decoration"]="line-through")},Wxmlify.prototype.stringifyStyle=function(t){var e="";for(var r in t){if(t.hasOwnProperty(r))e+=r.replace(/[A-Z]/,function(t){return"-"+t.toLowerCase()})+": "+t[r]+"; "}return e},Wxmlify.prototype.traverse=function(){this.fullNodes=this.fullNodes||[];for(var t=this,e=function(e){"img"==e.tagName&&t.images.push(e.attributes.src),"Text"==e.type&&(e.content=util.decodeHTMLEntities(e.content))},r=0,n=this.fullNodes.length;r<n;r++){var a=this.fullNodes[r];e(a),function t(r){for(var n=r.children||[],a=0,i=n.length;a<i;a++){var s=n[a];e(s),t(s)}}(a)}};var wxmlify=Wxmlify;module.exports=wxmlify;
