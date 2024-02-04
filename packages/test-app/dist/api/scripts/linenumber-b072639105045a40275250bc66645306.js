(()=>{const e=document.getElementsByClassName("prettyprint source linenums")
let t,s,n,l,a=0,i=0
if(e&&e[0])for(l=document.location.hash.substring(1),s=e[0].getElementsByTagName("li"),n=s.length;a<n;a++)i++,t=`line${i}`,s[a].id=t,t===l&&(s[a].className+=" selected")})()
