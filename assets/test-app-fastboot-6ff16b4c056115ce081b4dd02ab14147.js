define("~fastboot/app-factory",["test-app/app","test-app/config/environment"],function(t,e){return t=t.default,e=e.default,{default:function(){return t.create(e.APP)}}}),define("test-app/initializers/ajax",["exports"],function(t){"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0
var e=function(t){var e
let o=null==this||null===(e=this.fastboot)||void 0===e||null===(e=e.request)||void 0===e?void 0:e.protocol
if(/^\/\//.test(t.url))t.url=o+t.url
else if(!/^https?:\/\//.test(t.url))try{var i
t.url=o+"//"+(null==this||null===(i=this.fastboot)||void 0===i||null===(i=i.request)||void 0===i?void 0:i.host)+t.url}catch(r){throw new Error("You are using Ember Data with no host defined in your adapter. This will attempt to use the host of the FastBoot request, which is not configured for the current host of this request. Please set the hostWhitelist property for in your environment.js. FastBoot Error: "+r.message)}if(!najax)throw new Error("najax does not seem to be defined in your app. Did you override it via `addOrOverrideSandboxGlobals` in the fastboot server?")
najax(t)}
t.default={name:"ajax-service",initialize:function(t){t.register("ajax:node",e,{instantiate:!1})}}}),define("test-app/instance-initializers/setup-fetch",["exports","fetch"],function(t,e){"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0
t.default={name:"fetch",initialize:function(t){const o=t.lookup("service:fastboot");(0,e.setupFastboot)(o.get("request"))}}})
