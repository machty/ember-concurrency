var q=null
window.PR_SHOULD_USE_CONTINUATION=!0,function(){function e(e,t,n,r){t&&(n(e={a:t,d:e}),r.push.apply(r,e.e))}function t(t,n){var r,a={};(function(){for(var e=t.concat(n),s=[],i={},o=0,l=e.length;o<l;++o){var c=e[o],u=c[3]
if(u)for(var d=u.length;--d>=0;)a[u.charAt(d)]=c
u=""+(c=c[1]),i.hasOwnProperty(u)||(s.push(c),i[u]=q)}s.push(/[\S\s]/),r=function(e){function t(e){var t=e.charCodeAt(0)
if(92!==t)return t
var n=e.charAt(1)
return(t=d[n])?t:"0"<=n&&n<="7"?parseInt(e.substring(1),8):"u"===n||"x"===n?parseInt(e.substring(2),16):e.charCodeAt(1)}function n(e){return e<32?(e<16?"\\x0":"\\x")+e.toString(16):("\\"!==(e=String.fromCharCode(e))&&"-"!==e&&"["!==e&&"]"!==e||(e="\\"+e),e)}function r(e){for(var r=e.substring(1,e.length-1).match(/\\u[\dA-Fa-f]{4}|\\x[\dA-Fa-f]{2}|\\[0-3][0-7]{0,2}|\\[0-7]{1,2}|\\[\S\s]|[^\\]/g),a=(e=[],[]),s="^"===r[0],i=s?1:0,o=r.length;i<o;++i){var l,c=r[i]
if(/\\[bdsw]/i.test(c))e.push(c)
else c=t(c),i+2<o&&"-"===r[i+1]?(l=t(r[i+2]),i+=2):l=c,a.push([c,l]),l<65||c>122||(l<65||c>90||a.push([32|Math.max(65,c),32|Math.min(l,90)]),l<97||c>122||a.push([-33&Math.max(97,c),-33&Math.min(l,122)]))}for(a.sort(function(e,t){return e[0]-t[0]||t[1]-e[1]}),r=[],c=[NaN,NaN],i=0;i<a.length;++i)(o=a[i])[0]<=c[1]+1?c[1]=Math.max(c[1],o[1]):r.push(c=o)
for(a=["["],s&&a.push("^"),a.push.apply(a,e),i=0;i<r.length;++i)o=r[i],a.push(n(o[0])),o[1]>o[0]&&(o[1]+1>o[0]&&a.push("-"),a.push(n(o[1])))
return a.push("]"),a.join("")}function a(e){for(var t=e.source.match(/\[(?:[^\\\]]|\\[\S\s])*]|\\u[\dA-Fa-f]{4}|\\x[\dA-Fa-f]{2}|\\\d+|\\[^\dux]|\(\?[!:=]|[()^]|[^()[\\^]+/g),n=t.length,a=[],o=0,l=0;o<n;++o){var c=t[o]
"("===c?++l:"\\"===c.charAt(0)&&(c=+c.substring(1))&&c<=l&&(a[c]=-1)}for(o=1;o<a.length;++o)-1===a[o]&&(a[o]=++s)
for(l=o=0;o<n;++o)"("===(c=t[o])?void 0===a[++l]&&(t[o]="(?:"):"\\"===c.charAt(0)&&(c=+c.substring(1))&&c<=l&&(t[o]="\\"+a[l])
for(l=o=0;o<n;++o)"^"===t[o]&&"^"!==t[o+1]&&(t[o]="")
if(e.ignoreCase&&i)for(o=0;o<n;++o)e=(c=t[o]).charAt(0),c.length>=2&&"["===e?t[o]=r(c):"\\"!==e&&(t[o]=c.replace(/[A-Za-z]/g,function(e){return e=e.charCodeAt(0),"["+String.fromCharCode(-33&e,32|e)+"]"}))
return t.join("")}for(var s=0,i=!1,o=!1,l=0,c=e.length;l<c;++l){var u=e[l]
if(u.ignoreCase)o=!0
else if(/[a-z]/i.test(u.source.replace(/\\u[\da-f]{4}|\\x[\da-f]{2}|\\[^UXux]/gi,""))){i=!0,o=!1
break}}var d={b:8,t:9,n:10,v:11,f:12,r:13},p=[]
for(l=0,c=e.length;l<c;++l){if((u=e[l]).global||u.multiline)throw Error(""+u)
p.push("(?:"+a(u)+")")}return RegExp(p.join("|"),o?"gi":"g")}(s)})()
var i=n.length
return function t(o){for(var l=o.d,c=[l,"pln"],u=0,d=o.a.match(r)||[],p={},h=0,f=d.length;h<f;++h){var g,m=d[h],y=p[m],w=void 0
if("string"==typeof y)g=!1
else{var v=a[m.charAt(0)]
if(v)w=m.match(v[1]),y=v[0]
else{for(g=0;g<i;++g)if(v=n[g],w=m.match(v[1])){y=v[0]
break}w||(y="pln")}!(g=y.length>=5&&"lang-"===y.substring(0,5))||w&&"string"==typeof w[1]||(g=!1,y="src"),g||(p[m]=y)}if(v=u,u+=m.length,g){g=w[1]
var b=m.indexOf(g),S=b+g.length
w[2]&&(b=(S=m.length-w[2].length)-g.length),y=y.substring(5),e(l+v,m.substring(0,b),t,c),e(l+v+b,g,s(y,g),c),e(l+v+S,m.substring(S),t,c)}else c.push(l+v,y)}o.e=c}}function n(e){var n=[],r=[]
e.tripleQuotedStrings?n.push(["str",/^(?:'''(?:[^'\\]|\\[\S\s]|''?(?=[^']))*(?:'''|$)|"""(?:[^"\\]|\\[\S\s]|""?(?=[^"]))*(?:"""|$)|'(?:[^'\\]|\\[\S\s])*(?:'|$)|"(?:[^"\\]|\\[\S\s])*(?:"|$))/,q,"'\""]):e.multiLineStrings?n.push(["str",/^(?:'(?:[^'\\]|\\[\S\s])*(?:'|$)|"(?:[^"\\]|\\[\S\s])*(?:"|$)|`(?:[^\\`]|\\[\S\s])*(?:`|$))/,q,"'\"`"]):n.push(["str",/^(?:'(?:[^\n\r'\\]|\\.)*(?:'|$)|"(?:[^\n\r"\\]|\\.)*(?:"|$))/,q,"\"'"]),e.verbatimStrings&&r.push(["str",/^@"(?:[^"]|"")*(?:"|$)/,q])
var a=e.hashComments
return a&&(e.cStyleComments?(a>1?n.push(["com",/^#(?:##(?:[^#]|#(?!##))*(?:###|$)|.*)/,q,"#"]):n.push(["com",/^#(?:(?:define|elif|else|endif|error|ifdef|include|ifndef|line|pragma|undef|warning)\b|[^\n\r]*)/,q,"#"]),r.push(["str",/^<(?:(?:(?:\.\.\/)*|\/?)(?:[\w-]+(?:\/[\w-]+)+)?[\w-]+\.h|[a-z]\w*)>/,q])):n.push(["com",/^#[^\n\r]*/,q,"#"])),e.cStyleComments&&(r.push(["com",/^\/\/[^\n\r]*/,q]),r.push(["com",/^\/\*[\S\s]*?(?:\*\/|$)/,q])),e.regexLiterals&&r.push(["lang-regex",/^(?:^^\.?|[!+-]|!=|!==|#|%|%=|&|&&|&&=|&=|\(|\*|\*=|\+=|,|-=|->|\/|\/=|:|::|;|<|<<|<<=|<=|=|==|===|>|>=|>>|>>=|>>>|>>>=|[?@[^]|\^=|\^\^|\^\^=|{|\||\|=|\|\||\|\|=|~|break|case|continue|delete|do|else|finally|instanceof|return|throw|try|typeof)\s*(\/(?=[^*/])(?:[^/[\\]|\\[\S\s]|\[(?:[^\\\]]|\\[\S\s])*(?:]|$))+\/)/]),(a=e.types)&&r.push(["typ",a]),(e=(""+e.keywords).replace(/^ | $/g,"")).length&&r.push(["kwd",RegExp("^(?:"+e.replace(/[\s,]+/g,"|")+")\\b"),q]),n.push(["pln",/^\s+/,q," \r\n\t "]),r.push(["lit",/^@[$_a-z][\w$@]*/i,q],["typ",/^(?:[@_]?[A-Z]+[a-z][\w$@]*|\w+_t\b)/,q],["pln",/^[$_a-z][\w$@]*/i,q],["lit",/^(?:0x[\da-f]+|(?:\d(?:_\d+)*\d*(?:\.\d*)?|\.\d\+)(?:e[+-]?\d+)?)[a-z]*/i,q,"0123456789"],["pln",/^\\[\S\s]?/,q],["pun",/^.[^\s\w"-$'./@\\`]*/,q]),t(n,r)}function r(e,t){function n(e){switch(e.nodeType){case 1:if(s.test(e.className))break
if("BR"===e.nodeName)r(e),e.parentNode&&e.parentNode.removeChild(e)
else for(e=e.firstChild;e;e=e.nextSibling)n(e)
break
case 3:case 4:if(l){var t=e.nodeValue,a=t.match(i)
if(a){var c=t.substring(0,a.index)
e.nodeValue=c,(t=t.substring(a.index+a[0].length))&&e.parentNode.insertBefore(o.createTextNode(t),e.nextSibling),r(e),c||e.parentNode.removeChild(e)}}}}function r(e){for(;!e.nextSibling;)if(!(e=e.parentNode))return
var t
for(e=function e(t,n){var r=n?t.cloneNode(!1):t
if(a=t.parentNode){var a=e(a,1),s=t.nextSibling
a.appendChild(r)
for(var i=s;i;i=s)s=i.nextSibling,a.appendChild(i)}return r}(e.nextSibling,0);(t=e.parentNode)&&1===t.nodeType;)e=t
c.push(e)}var a,s=/(?:^|\s)nocode(?:\s|$)/,i=/\r\n?|\n/,o=e.ownerDocument
e.currentStyle?a=e.currentStyle.whiteSpace:window.getComputedStyle&&(a=o.defaultView.getComputedStyle(e,q).getPropertyValue("white-space"))
var l=a&&"pre"===a.substring(0,3)
for(a=o.createElement("LI");e.firstChild;)a.appendChild(e.firstChild)
for(var c=[a],u=0;u<c.length;++u)n(c[u])
t===(0|t)&&c[0].setAttribute("value",t)
var d=o.createElement("OL")
d.className="linenums"
for(var p=Math.max(0,t-1|0)||0,h=(u=0,c.length);u<h;++u)(a=c[u]).className="L"+(u+p)%10,a.firstChild||a.appendChild(o.createTextNode(" ")),d.appendChild(a)
e.appendChild(d)}function a(e,t){for(var n=t.length;--n>=0;){var r=t[n]
y.hasOwnProperty(r)?window.console&&console.warn("cannot override language handler %s",r):y[r]=e}}function s(e,t){return e&&y.hasOwnProperty(e)||(e=/^\s*</.test(t)?"default-markup":"default-code"),y[e]}function i(e){var t=e.g
try{var n=function(e){var t,n=/(?:^|\s)nocode(?:\s|$)/,r=[],a=0,s=[],i=0
e.currentStyle?t=e.currentStyle.whiteSpace:window.getComputedStyle&&(t=document.defaultView.getComputedStyle(e,q).getPropertyValue("white-space"))
var o=t&&"pre"===t.substring(0,3)
return function e(t){switch(t.nodeType){case 1:if(n.test(t.className))break
for(var l=t.firstChild;l;l=l.nextSibling)e(l)
"BR"!==(l=t.nodeName)&&"LI"!==l||(r[i]="\n",s[i<<1]=a++,s[i++<<1|1]=t)
break
case 3:case 4:(l=t.nodeValue).length&&(l=o?l.replace(/\r\n?/g,"\n"):l.replace(/[\t\n\r ]+/g," "),r[i]=l,s[i<<1]=a,a+=l.length,s[i++<<1|1]=t)}}(e),{a:r.join("").replace(/\n$/,""),c:s}}(e.h),r=n.a
e.a=r,e.c=n.c,e.d=0,s(t,r)(e)
var a,i,l=/\bMSIE\b/.test(navigator.userAgent),c=(t=/\n/g,e.a),u=c.length,d=(n=0,e.c),p=d.length,h=(r=0,e.e),f=h.length
e=0
for(h[f]=u,i=a=0;i<f;)h[i]!==h[i+2]?(h[a++]=h[i++],h[a++]=h[i++]):i+=2
for(f=a,i=a=0;i<f;){for(var g=h[i],m=h[i+1],y=i+2;y+2<=f&&h[y+1]===m;)y+=2
h[a++]=g,h[a++]=m,i=y}for(h.length=a;r<p;){var w,v=d[r+2]||u,b=h[e+2]||u,S=(y=Math.min(v,b),d[r+1])
if(1!==S.nodeType&&(w=c.substring(n,y))){l&&(w=w.replace(t,"\r")),S.nodeValue=w
var x=S.ownerDocument,N=x.createElement("SPAN")
N.className=h[e+1]
var C=S.parentNode
C.replaceChild(N,S),N.appendChild(S),n<v&&(d[r+1]=S=x.createTextNode(c.substring(y,v)),C.insertBefore(S,N.nextSibling))}(n=y)>=v&&(r+=2),n>=b&&(e+=2)}}catch(o){"console"in window&&console.log(o&&o.stack?o.stack:o)}}var o,l,c=[o=[[l=["break,continue,do,else,for,if,return,while"],"auto,case,char,const,default,double,enum,extern,float,goto,int,long,register,short,signed,sizeof,static,struct,switch,typedef,union,unsigned,void,volatile"],"catch,class,delete,false,import,new,operator,private,protected,public,this,throw,true,try,typeof"],"alignof,align_union,asm,axiom,bool,concept,concept_map,const_cast,constexpr,decltype,dynamic_cast,explicit,export,friend,inline,late_check,mutable,namespace,nullptr,reinterpret_cast,static_assert,static_cast,template,typeid,typename,using,virtual,where"],u=[o,"abstract,boolean,byte,extends,final,finally,implements,import,instanceof,null,native,package,strictfp,super,synchronized,throws,transient"],d=[u,"as,base,by,checked,decimal,delegate,descending,dynamic,event,fixed,foreach,from,group,implicit,in,interface,internal,into,is,lock,object,out,override,orderby,params,partial,readonly,ref,sbyte,sealed,stackalloc,string,select,uint,ulong,unchecked,unsafe,ushort,var"],p=[l,"and,as,assert,class,def,del,elif,except,exec,finally,from,global,import,in,is,lambda,nonlocal,not,or,pass,print,raise,try,with,yield,False,True,None"],h=[l,"alias,and,begin,case,class,def,defined,elsif,end,ensure,false,in,module,next,nil,not,or,redo,rescue,retry,self,super,then,true,undef,unless,until,when,yield,BEGIN,END"],f=/^(DIR|FILE|vector|(de|priority_)?queue|list|stack|(const_)?iterator|(multi)?(set|map)|bitset|u?(int|float)\d*)/,g=/\S/,m=n({keywords:[c,d,o=[o,"debugger,eval,export,function,get,null,set,undefined,var,with,Infinity,NaN"],"caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END"+p,h,l=[l,"case,done,elif,esac,eval,fi,function,in,local,set,then,until"]],hashComments:!0,cStyleComments:!0,multiLineStrings:!0,regexLiterals:!0}),y={}
a(m,["default-code"]),a(t([],[["pln",/^[^<?]+/],["dec",/^<!\w[^>]*(?:>|$)/],["com",/^<\!--[\S\s]*?(?:--\>|$)/],["lang-",/^<\?([\S\s]+?)(?:\?>|$)/],["lang-",/^<%([\S\s]+?)(?:%>|$)/],["pun",/^(?:<[%?]|[%?]>)/],["lang-",/^<xmp\b[^>]*>([\S\s]+?)<\/xmp\b[^>]*>/i],["lang-js",/^<script\b[^>]*>([\S\s]*?)(<\/script\b[^>]*>)/i],["lang-css",/^<style\b[^>]*>([\S\s]*?)(<\/style\b[^>]*>)/i],["lang-in.tag",/^(<\/?[a-z][^<>]*>)/i]]),["default-markup","htm","html","mxml","xhtml","xml","xsl"]),a(t([["pln",/^\s+/,q," \t\r\n"],["atv",/^(?:"[^"]*"?|'[^']*'?)/,q,"\"'"]],[["tag",/^^<\/?[a-z](?:[\w-.:]*\w)?|\/?>$/i],["atn",/^(?!style[\s=]|on)[a-z](?:[\w:-]*\w)?/i],["lang-uq.val",/^=\s*([^\s"'>]*(?:[^\s"'/>]|\/(?=\s)))/],["pun",/^[/<->]+/],["lang-js",/^on\w+\s*=\s*"([^"]+)"/i],["lang-js",/^on\w+\s*=\s*'([^']+)'/i],["lang-js",/^on\w+\s*=\s*([^\s"'>]+)/i],["lang-css",/^style\s*=\s*"([^"]+)"/i],["lang-css",/^style\s*=\s*'([^']+)'/i],["lang-css",/^style\s*=\s*([^\s"'>]+)/i]]),["in.tag"]),a(t([],[["atv",/^[\S\s]+/]]),["uq.val"]),a(n({keywords:c,hashComments:!0,cStyleComments:!0,types:f}),["c","cc","cpp","cxx","cyc","m"]),a(n({keywords:"null,true,false"}),["json"]),a(n({keywords:d,hashComments:!0,cStyleComments:!0,verbatimStrings:!0,types:f}),["cs"]),a(n({keywords:u,cStyleComments:!0}),["java"]),a(n({keywords:l,hashComments:!0,multiLineStrings:!0}),["bsh","csh","sh"]),a(n({keywords:p,hashComments:!0,multiLineStrings:!0,tripleQuotedStrings:!0}),["cv","py"]),a(n({keywords:"caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END",hashComments:!0,multiLineStrings:!0,regexLiterals:!0}),["perl","pl","pm"]),a(n({keywords:h,hashComments:!0,multiLineStrings:!0,regexLiterals:!0}),["rb"]),a(n({keywords:o,cStyleComments:!0,regexLiterals:!0}),["js"]),a(n({keywords:"all,and,by,catch,class,else,extends,false,finally,for,if,in,is,isnt,loop,new,no,not,null,of,off,on,or,return,super,then,true,try,unless,until,when,while,yes",hashComments:3,cStyleComments:!0,multilineStrings:!0,tripleQuotedStrings:!0,regexLiterals:!0}),["coffee"]),a(t([],[["str",/^[\S\s]+/]]),["regex"]),window.prettyPrintOne=function(e,t,n){var a=document.createElement("PRE")
return a.innerHTML=e,n&&r(a,n),i({g:t,i:n,h:a}),a.innerHTML},window.prettyPrint=function(e){for(var t=[document.getElementsByTagName("pre"),document.getElementsByTagName("code"),document.getElementsByTagName("xmp")],n=[],a=0;a<t.length;++a)for(var s=0,o=t[a].length;s<o;++s)n.push(t[a][s])
t=q
var l=Date
l.now||(l={now:function(){return+new Date}})
var c=0,u=/\blang(?:uage)?-([\w.]+)(?!\S)/;(function t(){for(var a=window.PR_SHOULD_USE_CONTINUATION?l.now()+250:1/0;c<n.length&&l.now()<a;c++){var s=n[c]
if((o=s.className).indexOf("prettyprint")>=0){var o,d,p
if(p=!(o=o.match(u))){for(var h=void 0,f=(p=s).firstChild;f;f=f.nextSibling){var m=f.nodeType
h=1===m?h?p:f:3===m&&g.test(f.nodeValue)?p:h}p=(d=h===p?void 0:h)&&"CODE"===d.tagName}for(p&&(o=d.className.match(u)),o&&(o=o[1]),p=!1,h=s.parentNode;h;h=h.parentNode)if(("pre"===h.tagName||"code"===h.tagName||"xmp"===h.tagName)&&h.className&&h.className.indexOf("prettyprint")>=0){p=!0
break}p||((p=!!(p=s.className.match(/\blinenums\b(?::(\d+))?/))&&(!p[1]||!p[1].length||+p[1]))&&r(s,p),i({g:o,h:s,i:p}))}}c<n.length?setTimeout(t,250):e&&e()})()},window.PR={createSimpleLexer:t,registerLangHandler:a,sourceDecorator:n,PR_ATTRIB_NAME:"atn",PR_ATTRIB_VALUE:"atv",PR_COMMENT:"com",PR_DECLARATION:"dec",PR_KEYWORD:"kwd",PR_LITERAL:"lit",PR_NOCODE:"nocode",PR_PLAIN:"pln",PR_PUNCTUATION:"pun",PR_SOURCE:"src",PR_STRING:"str",PR_TAG:"tag",PR_TYPE:"typ"}}()
