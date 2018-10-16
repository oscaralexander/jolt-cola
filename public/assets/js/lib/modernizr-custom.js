/*! modernizr 3.6.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-devicemotion_deviceorientation-touchevents-webgl-setclasses !*/
!function(e,n,t){function o(e,n){return typeof e===n}function s(){var e,n,t,s,i,a,r;for(var l in d)if(d.hasOwnProperty(l)){if(e=[],n=d[l],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(t=0;t<n.options.aliases.length;t++)e.push(n.options.aliases[t].toLowerCase());for(s=o(n.fn,"function")?n.fn():n.fn,i=0;i<e.length;i++)a=e[i],r=a.split("."),1===r.length?Modernizr[r[0]]=s:(!Modernizr[r[0]]||Modernizr[r[0]]instanceof Boolean||(Modernizr[r[0]]=new Boolean(Modernizr[r[0]])),Modernizr[r[0]][r[1]]=s),f.push((s?"":"no-")+r.join("-"))}}function i(e){var n=p.className,t=Modernizr._config.classPrefix||"";if(u&&(n=n.baseVal),Modernizr._config.enableJSClass){var o=new RegExp("(^|\\s)"+t+"no-js(\\s|$)");n=n.replace(o,"$1"+t+"js$2")}Modernizr._config.enableClasses&&(n+=" "+t+e.join(" "+t),u?p.className.baseVal=n:p.className=n)}function a(){return"function"!=typeof n.createElement?n.createElement(arguments[0]):u?n.createElementNS.call(n,"http://www.w3.org/2000/svg",arguments[0]):n.createElement.apply(n,arguments)}function r(){var e=n.body;return e||(e=a(u?"svg":"body"),e.fake=!0),e}function l(e,t,o,s){var i,l,f,d,c="modernizr",u=a("div"),v=r();if(parseInt(o,10))for(;o--;)f=a("div"),f.id=s?s[o]:c+(o+1),u.appendChild(f);return i=a("style"),i.type="text/css",i.id="s"+c,(v.fake?v:u).appendChild(i),v.appendChild(u),i.styleSheet?i.styleSheet.cssText=e:i.appendChild(n.createTextNode(e)),u.id=c,v.fake&&(v.style.background="",v.style.overflow="hidden",d=p.style.overflow,p.style.overflow="hidden",p.appendChild(v)),l=t(u,e),v.fake?(v.parentNode.removeChild(v),p.style.overflow=d,p.offsetHeight):u.parentNode.removeChild(u),!!l}var f=[],d=[],c={_version:"3.6.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var t=this;setTimeout(function(){n(t[e])},0)},addTest:function(e,n,t){d.push({name:e,fn:n,options:t})},addAsyncTest:function(e){d.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=c,Modernizr=new Modernizr;var p=n.documentElement,u="svg"===p.nodeName.toLowerCase(),v=c._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):["",""];c._prefixes=v,Modernizr.addTest("webgl",function(){var n=a("canvas"),t="probablySupportsContext"in n?"probablySupportsContext":"supportsContext";return t in n?n[t]("webgl")||n[t]("experimental-webgl"):"WebGLRenderingContext"in e});var h=c.testStyles=l;Modernizr.addTest("touchevents",function(){var t;if("ontouchstart"in e||e.DocumentTouch&&n instanceof DocumentTouch)t=!0;else{var o=["@media (",v.join("touch-enabled),("),"heartz",")","{#modernizr{top:9px;position:absolute}}"].join("");h(o,function(e){t=9===e.offsetTop})}return t}),Modernizr.addTest("devicemotion","DeviceMotionEvent"in e),Modernizr.addTest("deviceorientation","DeviceOrientationEvent"in e),s(),i(f),delete c.addTest,delete c.addAsyncTest;for(var m=0;m<Modernizr._q.length;m++)Modernizr._q[m]();e.Modernizr=Modernizr}(window,document);