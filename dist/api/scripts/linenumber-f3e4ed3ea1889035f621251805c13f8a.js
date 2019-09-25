(()=>{const e=document.getElementsByClassName("prettyprint source linenums")
let t,s,n,l,a=0,i=0
if(e&&e[0])for(l=document.location.hash.substring(1),n=(s=e[0].getElementsByTagName("li")).length;a<n;a++)t=`line${++i}`,s[a].id=t,t===l&&(s[a].className+=" selected")})()
