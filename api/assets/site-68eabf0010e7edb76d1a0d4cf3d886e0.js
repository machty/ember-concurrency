anchors.options.placement="left",anchors.add().remove(".no-anchor")
var tocElements=document.getElementById("toc").getElementsByTagName("a")
document.getElementById("filter-input").addEventListener("keyup",function(e){var t,n
if(13===e.keyCode)for(t=0;t<tocElements.length;t++)if(!(n=tocElements[t]).classList.contains("hide"))return location.replace(n.href),e.preventDefault()
var o=function(){return!0},a=this.value.toLowerCase()
for(a.match(/^\s*$/)||(o=function(e){return-1!==e.toLowerCase().indexOf(a)}),t=0;t<tocElements.length;t++)o((n=tocElements[t]).innerHTML)?n.classList.remove("hide"):n.classList.add("hide")})
