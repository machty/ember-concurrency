(self.webpackChunk_ember_auto_import_=self.webpackChunk_ember_auto_import_||[]).push([[929],{41:(e,t,s)=>{"use strict"
s.d(t,{O:()=>c,e:()=>o})
var n=s(473),r=s(536),i=s(587)
function a(e,t){return Object.keys(e).reduce((t,s)=>function(e,t,s){const r=Object.getOwnPropertyDescriptor(e,s)
r.initializer=r.initializer||(()=>e[s]),delete r.value
const i=(0,n.tracked)(t,s,r)
return t[s]=i,t}(e,t,s),t)}let o,c
o=a(r.K,{}),o=a({numRunning:0,numQueued:0,isRunning:!1,isQueued:!1,isIdle:!0,state:"idle"},o),c=a(i.N,{}),c=a({state:"waiting",isDropped:!1,isRunning:!1},c),Object.freeze(o),Object.freeze(c)},47:(e,t,s)=>{"use strict"
s.d(t,{Ag:()=>C,U6:()=>x,mp:()=>E,Zm:()=>_})
var n=s(454)
class r{constructor(e){this.maxConcurrency=e||1}}var i=s(157)
const a=(0,i.kw)("it belongs to a 'drop' Task that was already running")
class o{constructor(e){this.remainingSlots=e}step(){return this.remainingSlots>0?(this.remainingSlots--,i.su):a}}class c extends r{makeReducer(){return new o(this.maxConcurrency)}}class l{constructor(e){this.remainingSlots=e}step(){return this.remainingSlots>0?(this.remainingSlots--,i.su):i.I$}}class u extends r{makeReducer(){return new l(this.maxConcurrency)}}const h=(0,i.kw)("it belongs to a 'keepLatest' Task that was already running")
class d{constructor(e,t){this.remainingSlots=e,this.numToCancel=t}step(){return this.remainingSlots>0?(this.remainingSlots--,i.su):this.numToCancel>0?(this.numToCancel--,h):i.I$}}class p extends r{makeReducer(e,t){let s=e+t
return new d(this.maxConcurrency,s-this.maxConcurrency-1)}}const f=(0,i.kw)("it belongs to a 'restartable' Task that was .perform()ed again")
class m{constructor(e){this.numToCancel=e}step(){return this.numToCancel>0?(this.numToCancel--,f):i.su}}class g extends r{makeReducer(e,t){return new m(e+t-this.maxConcurrency)}}const y=new class{step(){return i.su}}
class b{makeReducer(){return y}}var k=s(439),v=s(638)
function w(e,t,s){return(t=function(e){var t=function(e){if("object"!=typeof e||!e)return e
var t=e[Symbol.toPrimitive]
if(void 0!==t){var s=t.call(e,"string")
if("object"!=typeof s)return s
throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e)
return"symbol"==typeof t?t:t+""}(t))in e?Object.defineProperty(e,t,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[t]=s,e}const S={enqueue:(e,t)=>t&&e.setBufferPolicy(u),debug:(e,t)=>t&&e.setDebug(t),drop:(e,t)=>t&&e.setBufferPolicy(c),keepLatest:(e,t)=>t&&e.setBufferPolicy(p),maxConcurrency:(e,t)=>e.setMaxConcurrency(t),onState:(e,t)=>e.setOnState(t),restartable:(e,t)=>t&&e.setBufferPolicy(g)}
function _(e,t){if(S[e])throw new Error(`A modifier with the name '${e}' has already been defined.`)
S[e]=t}function x(e){return S[e]}function E(e){return e in S}let C=class{constructor(e="<unknown>",t=null,s={}){w(this,"env",n.U),w(this,"_debug",null),w(this,"_enabledModifiers",[]),w(this,"_hasSetConcurrencyConstraint",!1),w(this,"_hasSetBufferPolicy",!1),w(this,"_hasEnabledEvents",!1),w(this,"_maxConcurrency",null),w(this,"_onStateCallback",(e,t)=>t.setState(e)),w(this,"_schedulerPolicyClass",b),this.name=e,this.taskDefinition=t,this.options=s,this._processModifierOptions(s)}createTask(e){let t=this.getTaskOptions(e)
return new v.Y(Object.assign({generatorFactory:t=>this.taskDefinition.apply(e,t)},t))}getModifier(e){if(E(e))return S[e].bind(null,this)}getOptions(){return this.options}getScheduler(e,t){return new k.A(e,t)}getTaskOptions(e){let t,s=this._onStateCallback,n=new this._schedulerPolicyClass(this._maxConcurrency)
return t=this.getScheduler(n,s&&"function"==typeof s),{context:e,debug:this._debug,env:this.env,name:this.name,group:void 0,scheduler:t,hasEnabledEvents:this._hasEnabledEvents,onStateCallback:s,enabledModifiers:this._enabledModifiers,modifierOptions:this.getOptions()}}setBufferPolicy(e){return function(e){if(e._hasSetBufferPolicy)throw new Error(`Cannot set multiple buffer policies on a task. ${e._schedulerPolicyClass} has already been set for task '${e.name}'`)}(this),this._hasSetBufferPolicy=!0,this._hasSetConcurrencyConstraint=!0,this._schedulerPolicyClass=e,this}setDebug(e){return this._debug=e,this}setEvented(e){return this._hasEnabledEvents=e,this}setMaxConcurrency(e){return this._hasSetConcurrencyConstraint=!0,this._maxConcurrency=e,this}setName(e){return this.name=e,this}setOnState(e){return this._onStateCallback=e,this}setTaskDefinition(e){return this.taskDefinition=e,this}_processModifierOptions(e){if(e)for(let t of Object.keys(e)){let s=e[t],n=this.getModifier(t)
"function"==typeof n&&n(s)&&this._enabledModifiers.push(t)}}}},104:(e,t,s)=>{"use strict"
s.d(t,{w:()=>l})
var n=s(421),r=s(454),i=s(603),a=s(223),o=s(704)
class c extends r.O{assert(...e){(0,i.assert)(...e)}async(e){(0,a.join)(()=>(0,a.schedule)("actions",e))}reportUncaughtRejection(e){(0,a.next)(null,function(){const t=(0,o.getOnerror)()
if(!t)throw e
t(e)})}defer(){return(0,n.defer)()}globalDebuggingEnabled(){return!1}}const l=new c},138:function(e,t){window._eai_r=require,window._eai_d=define},157:(e,t,s)=>{"use strict"
s.d(t,{Hs:()=>i,I$:()=>o,Tb:()=>n,dJ:()=>r,kw:()=>c,su:()=>a})
const n="CANCELLED",r="STARTED",i="QUEUED",a={type:r},o={type:i},c=e=>({type:n,reason:e})},193:(e,t,s)=>{"use strict"
s.r(t),s.d(t,{default:()=>n})
var n=(0,s(336).helper)(function(e){let[t,...s]=e
return t._curry(...s)})},236:(e,t,s)=>{"use strict"
s.r(t),s.d(t,{cancelHelper:()=>o,default:()=>c})
var n=s(336),r=s(603),i=s(449)
const a="the 'cancel-all' template helper was invoked"
function o(e){let t=e[0]
return t&&"function"==typeof t.cancelAll||(0,r.assert)(`The first argument passed to the \`cancel-all\` helper should be a Task (without quotes); you passed ${t}`,!1),(0,i.F)("cancel-all","cancelAll",[t,{reason:a}])}var c=(0,n.helper)(o)},378:(e,t,s)=>{"use strict"
s.d(t,{Jk:()=>o,b5:()=>a,wR:()=>l,y$:()=>u})
var n=s(223),r=s(104),i=s(581)
function a(e){return e&&("function"==typeof e.one&&"function"==typeof e.off||"function"==typeof e.on&&"function"==typeof e.off||"function"==typeof e.addEventListener&&"function"==typeof e.removeEventListener)}class o extends i._d{_deferable(){return r.w.defer()}}class c extends o{constructor(e){super(),this.ms=e}onYield(e){let t=(0,n.later)(()=>e.next(),this.ms)
return()=>(0,n.cancel)(t)}}function l(e){return new c(e)}function u(e,t){return t.split(".").reduce((e,t)=>e[t],e)}},435:(e,t,s)=>{"use strict"
s.d(t,{Y:()=>l})
var n=s(130),r=s(579),i=s(638),a=s(830)
const o={_performCount:0,setState(e){this._performCount=this._performCount+(e.numPerformedInc||0)
let t=e.numRunning>0,s=e.numQueued>0,n=Object.assign({},e,{performCount:this._performCount,isRunning:t,isQueued:s,isIdle:!t&&!s,state:t?"running":"idle"})
Object.assign(this,n)},onState(e,t){t.onStateCallback&&t.onStateCallback(e,t)}}
var c=s(41)
class l extends i.Y{constructor(e){super(e),(0,n.isDestroying)(this.context)||(0,n.registerDestructor)(this.context,()=>{this.cancelAll({reason:"the object it lives on was destroyed or unrendered",cancelRequestKind:r.Vt})})}get _isAlive(){return!(0,n.isDestroying)(this.context)}_taskInstanceFactory(e,t,s){let n=this._taskInstanceOptions(e,t,s)
return n.task=this,new a.H(n)}_clone(){return new l({context:this.context,debug:this.debug,env:this.env,generatorFactory:this.generatorFactory,group:this.group,hasEnabledEvents:this.hasEnabledEvents,name:this.name,onStateCallback:this.onStateCallback,scheduler:this.scheduler})}}c.e&&Object.defineProperties(l.prototype,c.e),Object.assign(l.prototype,o)},439:(e,t,s)=>{"use strict"
s.d(t,{A:()=>d})
var n=s(157)
const r=new Map
class i{constructor(e,t,s){this.stateTracker=t,this.schedulerPolicy=e,this.initialTaskInstances=s,this.startingInstances=[]}process(){let[e,t,s]=this.filterFinishedTaskInstances(),n=this.schedulerPolicy.makeReducer(t,s),r=e.filter(e=>this.setTaskInstanceExecutionState(e,n.step()))
return this.stateTracker.computeFinalStates(e=>this.applyState(e)),this.startingInstances.forEach(e=>e.start()),r}filterFinishedTaskInstances(){let e=0,t=0
return[this.initialTaskInstances.filter(s=>{let n=this.stateTracker.stateFor(s.task),r=s.executor.state
return r.isFinished?(n.onCompletion(s),!1):(r.hasStarted?e+=1:t+=1,!0)}),e,t]}setTaskInstanceExecutionState(e,t){let s=this.stateTracker.stateFor(e.task)
switch(e.executor.counted||(e.executor.counted=!0,s.onPerformed(e)),t.type){case n.Tb:return e.cancel(t.reason),!1
case n.dJ:return e.executor.state.hasStarted||(this.startingInstances.push(e),s.onStart(e)),s.onRunning(e),!0
case n.Hs:return s.onQueued(e),!0}}applyState(e){let{taskable:t}=e
if(!t.onState)return
const{guid:s}=t
if(r.has(s)&&e.tag<r.get(s))return
let n=Object.assign({numRunning:e.numRunning,numQueued:e.numQueued,numPerformedInc:e.numPerformedInc},e.attrs)
t.onState(n,t),r.set(s,e.tag)}}var a=s(960)
class o{constructor(e,t){this.taskable=e,this.numRunning=0,this.numQueued=0,this.numPerformedInc=0,this.attrs={},this.tag=t}onCompletion(e){let t=e.completionState
this.attrs.lastRunning=null,this.attrs.lastComplete=e,t===a.R5?this.attrs.lastSuccessful=e:(t===a.KH?this.attrs.lastErrored=e:t===a.kY&&(this.attrs.lastCanceled=e),this.attrs.lastIncomplete=e)}onPerformed(e){this.numPerformedInc+=1,this.attrs.lastPerformed=e}onStart(e){this.attrs.last=e}onRunning(e){this.attrs.lastRunning=e,this.numRunning+=1}onQueued(){this.numQueued+=1}applyStateFrom(e){Object.assign(this.attrs,e.attrs),this.numRunning+=e.numRunning,this.numQueued+=e.numQueued,this.numPerformedInc+=e.numPerformedInc}}const c=new Map
class l{constructor(){this.states=new Map}stateFor(e){let t=e.guid,s=this.states.get(t)
if(!s){let n=c.has(t)?c.get(t):0
s=new o(e,++n),this.states.set(t,s),c.set(t,n)}return s}computeFinalStates(e){this.forEachState(t=>e(t))}forEachState(e){this.states.forEach(t=>e(t))}}const u=new class{onCompletion(){}onPerformed(){}onStart(){}onRunning(){}onQueued(){}}
class h{stateFor(){return u}computeFinalStates(){}}class d{constructor(e,t){this.schedulerPolicy=e,this.stateTrackingEnabled=t,this.taskInstances=[]}cancelAll(e,t){let s=this.taskInstances.map(s=>{s.task.guids[e]&&s.executor.cancel(t)}).filter(e=>!!e)
return Promise.all(s)}perform(e){e.onFinalize(()=>this.scheduleRefresh()),this.taskInstances.push(e),this.refresh()}scheduleRefresh(){Promise.resolve().then(()=>this.refresh())}refresh(){let e=this.stateTrackingEnabled?new l:new h,t=new i(this.schedulerPolicy,e,this.taskInstances)
this.taskInstances=t.process()}}},449:(e,t,s)=>{"use strict"
s.d(t,{F:()=>i})
var n=s(603),r=s(378)
function i(e,t,s,i){let a=s[0],o=s.slice(1)
return function(...s){if(a&&"function"==typeof a[t]){if(i&&i.value){let e=s.pop()
s.push((0,r.y$)(e,i.value))}return a[t](...o,...s)}(0,n.assert)(`The first argument passed to the \`${e}\` helper should be a Task object (without quotes); you passed ${a}`,!1)}}},454:(e,t,s)=>{"use strict"
s.d(t,{O:()=>n,U:()=>r})
class n{assert(){}async(e){Promise.resolve().then(e)}reportUncaughtRejection(){this.async(e=>{throw e})}defer(){let e={promise:null,resolve:null,reject:null},t=new Promise((t,s)=>{e.resolve=t,e.reject=s})
return e.promise=t,e}globalDebuggingEnabled(){return!1}}const r=new n},532:(e,t,s)=>{"use strict"
s.r(t),s.d(t,{buildTask:()=>h})
var n=s(603),r=s(47),i=s(104),a=s(439),o=s(223)
class c extends a.A{scheduleRefresh(){(0,o.once)(this,this.refresh)}}var l=s(435)
class u extends r.Ag{constructor(...e){var t,s,n
super(...e),t=this,s="env",n=i.w,(s=function(e){var t=function(e){if("object"!=typeof e||!e)return e
var t=e[Symbol.toPrimitive]
if(void 0!==t){var s=t.call(e,"string")
if("object"!=typeof s)return s
throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e)
return"symbol"==typeof t?t:t+""}(s))in t?Object.defineProperty(t,s,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[s]=n}createTask(e){(0,n.assert)("Cannot create task if a task definition is not provided as generator function",this.taskDefinition)
let t=this.getTaskOptions(e)
return new l.Y(Object.assign({generatorFactory:t=>this.taskDefinition.apply(e,t)},t))}getModifier(e){let t=super.getModifier(e)
return(0,n.assert)(`Task option '${e}' is not recognized as a supported option.`,t),t}getScheduler(e,t){return new c(e,t)}get taskFn(){return this.taskDefinition}set taskFn(e){this.setTaskDefinition(e)}}function h(e,t,s,n){let r=t
n&&(r=Object.assign({},r),r[n]=!0)
const i=e()
return new u(s||"<unknown>",i.generator,r).createTask(i.context)}},536:(e,t,s)=>{"use strict"
s.d(t,{K:()=>n})
const n={last:null,lastRunning:null,lastPerformed:null,lastSuccessful:null,lastComplete:null,lastErrored:null,lastCanceled:null,lastIncomplete:null,performCount:0}
Object.freeze(n)},579:(e,t,s)=>{"use strict"
s.d(t,{Jn:()=>i,Vt:()=>o,W5:()=>n,aV:()=>c,f6:()=>a,iw:()=>r,qs:()=>l})
const n="TaskCancelation"
function r(e){return e&&e.name===n}const i="explicit",a="yielded",o="lifespan_end",c="parent_cancel"
class l{constructor(e,t){this.kind=e,this.reason=t,this.promise=new Promise(e=>{this.finalize=e})}}},581:(e,t,s)=>{"use strict"
s.d(t,{G$:()=>p,HD:()=>o,MM:()=>i,Oc:()=>m,Sx:()=>r,X7:()=>c,Zp:()=>n,_d:()=>u,i4:()=>f,pA:()=>a})
const n="__ec_cancel__",r="__ec_yieldable__",i="next",a="throw",o="return",c="cancel"
class l{constructor(e,t){this._taskInstance=e,this._resumeIndex=t}getTaskInstance(){return this._taskInstance}cancel(){let e=this._taskInstance
e.proceed.call(e,this._resumeIndex,c)}next(e){let t=this._taskInstance
t.proceed.call(t,this._resumeIndex,i,e)}return(e){let t=this._taskInstance
t.proceed.call(t,this._resumeIndex,o,e)}throw(e){let t=this._taskInstance
t.proceed.call(t,this._resumeIndex,a,e)}}class u{constructor(){this[r]=this[r].bind(this)}onYield(){}_deferable(){let e={resolve:void 0,reject:void 0}
return e.promise=new Promise((t,s)=>{e.resolve=t,e.reject=s}),e}_toPromise(){let e=this._deferable(),t={proceed(t,s,n){s==i||s==o?e.resolve(n):e.reject(n)}},s=this[r](t,0)
return e.promise[n]=s,e.promise}then(...e){return this._toPromise().then(...e)}catch(...e){return this._toPromise().catch(...e)}finally(...e){return this._toPromise().finally(...e)}[r](e,t){let s=new l(e,t)
return this.onYield(s)}}class h extends u{onYield(e){let t=requestAnimationFrame(()=>e.next())
return()=>cancelAnimationFrame(t)}}class d extends u{constructor(e){super(),this.ms=e}onYield(e){let t=setTimeout(()=>e.next(),this.ms)
return()=>clearTimeout(t)}}function p(){return new h}const f=new class extends u{onYield(){}}
function m(e){return new d(e)}},587:(e,t,s)=>{"use strict"
s.d(t,{N:()=>n})
const n={completionState:s(960).XS,value:null,error:null,isSuccessful:!1,isError:!1,isCanceled:!1,hasStarted:!1,isFinished:!1}},638:(e,t,s)=>{"use strict"
s.d(t,{Y:()=>k})
class n{constructor(e,t,s){this.value=e,this.done=t,this.errored=s}}class r{constructor(e){this.done=!1,this.generatorFactory=e,this.iterator=null}step(e,t){try{let s=this.getIterator(),{value:r,done:i}=s[t](e)
return i?this.finalize(r,!1):new n(r,!1,!1)}catch(e){return this.finalize(e,!0)}}getIterator(){return this.iterator||this.done||(this.iterator=this.generatorFactory()),this.iterator}finalize(e,t){return this.done=!0,this.iterator=null,new n(e,!0,t)}}var i=s(581),a=s(587),o=s(579),c=s(960)
const l="PERFORM_TYPE_DEFAULT",u="PERFORM_TYPE_UNLINKED",h="PERFORM_TYPE_LINKED",d={}
let p=[]
class f{constructor({generatorFactory:e,env:t,debug:s}){this.generatorState=new r(e),this.state=Object.assign({},a.N),this.index=1,this.disposers=[],this.finalizeCallbacks=[],this.env=t,this.debug=s,this.cancelRequest=null}start(){this.state.hasStarted||this.cancelRequest||(this.setState({hasStarted:!0}),this.proceedSync(i.MM,void 0))}cancel(e){return this.requestCancel(e)?(this.state.hasStarted?this.proceedWithCancelAsync():this.finalizeWithCancel(),this.cancelRequest.promise):(e.finalize(),e.promise)}setState(e){Object.assign(this.state,e),this.taskInstance.setState(this.state)}proceedChecked(e,t,s){this.state.isFinished||this.advanceIndex(e)&&(t===i.X7?(this.requestCancel(new o.qs(o.f6),s),this.proceedWithCancelAsync()):this.proceedAsync(t,s))}proceedWithCancelAsync(){this.proceedAsync(i.HD,d)}proceedAsync(e,t){this.advanceIndex(this.index),this.env.async(()=>this.proceedSync(e,t))}proceedSync(e,t){this.state.isFinished||(this.dispose(),this.generatorState.done?this.handleResolvedReturnedValue(e,t):this.handleResolvedContinueValue(e,t))}handleResolvedContinueValue(e,t){let s=this.index,n=this.generatorStep(t,e)
this.advanceIndex(s)&&(n.errored?this.finalize(n.value,c.KH):this.handleYieldedValue(n))}handleResolvedReturnedValue(e,t){switch(e){case i.MM:case i.HD:this.finalize(t,c.R5)
break
case i.pA:this.finalize(t,c.KH)}}handleYieldedUnknownThenable(e){let t=this.index
e.then(e=>{this.proceedChecked(t,i.MM,e)},e=>{this.proceedChecked(t,i.pA,e)})}advanceIndex(e){if(this.index===e)return++this.index}handleYieldedValue(e){let t=e.value
t?(this.addDisposer(t[i.Zp]),t[i.Sx]?this.invokeYieldable(t):"function"==typeof t.then?this.handleYieldedUnknownThenable(t):this.proceedWithSimpleValue(t)):this.proceedWithSimpleValue(t)}proceedWithSimpleValue(e){this.proceedAsync(i.MM,e)}addDisposer(e){"function"==typeof e&&this.disposers.push(e)}dispose(){let e=this.disposers
0!==e.length&&(this.disposers=[],e.forEach(e=>e()))}generatorStep(e,t){p.push(this)
let s=this.generatorState.step(e,t)
if(p.pop(),this._expectsLinkedYield){let e=s.value
e&&e.performType===h||console.warn("You performed a .linked() task without immediately yielding/returning it. This is currently unsupported (but might be supported in future version of ember-concurrency)."),this._expectsLinkedYield=!1}return s}maybeResolveDefer(){this.defer&&this.state.isFinished&&(this.state.completionState===c.R5?this.defer.resolve(this.state.value):this.defer.reject(this.state.error))}onFinalize(e){this.finalizeCallbacks.push(e),this.state.isFinished&&this.runFinalizeCallbacks()}runFinalizeCallbacks(){this.finalizeCallbacks.forEach(e=>e()),this.finalizeCallbacks=[],this.maybeResolveDefer(),this.maybeThrowUnhandledTaskErrorLater()}promise(){return this.defer||(this.defer=this.env.defer(),this.asyncErrorsHandled=!0,this.maybeResolveDefer()),this.defer.promise}maybeThrowUnhandledTaskErrorLater(){this.asyncErrorsHandled||this.state.completionState!==c.KH||(0,o.iw)(this.state.error)||this.env.async(()=>{this.asyncErrorsHandled||this.env.reportUncaughtRejection(this.state.error)})}requestCancel(e){return!this.cancelRequest&&!this.state.isFinished&&(this.cancelRequest=e,!0)}finalize(e,t){if(this.cancelRequest)return this.finalizeWithCancel()
let s={completionState:t}
t===c.R5?(s.isSuccessful=!0,s.value=e):t===c.KH?(s.isError=!0,s.error=e):t===c.kY&&(s.error=e),this.finalizeShared(s)}finalizeWithCancel(){let e=this.taskInstance.formatCancelReason(this.cancelRequest.reason),t=new Error(e)
this.debugEnabled()&&console.log(e),t.name=o.W5,this.finalizeShared({isCanceled:!0,completionState:c.kY,error:t,cancelReason:e}),this.cancelRequest.finalize()}debugEnabled(){return this.debug||this.env.globalDebuggingEnabled()}finalizeShared(e){this.index++,e.isFinished=!0,this.setState(e),this.runFinalizeCallbacks()}invokeYieldable(e){try{let t=e[i.Sx](this.taskInstance,this.index)
this.addDisposer(t)}catch(e){this.env.reportUncaughtRejection(e)}}onYielded(e,t){this.asyncErrorsHandled=!0,this.onFinalize(()=>{let s=this.state.completionState
s===c.R5?e.proceed(t,i.MM,this.state.value):s===c.KH?e.proceed(t,i.pA,this.state.error):s===c.kY&&e.proceed(t,i.X7,null)})
let s=this.getPerformType()
if(s!==u)return()=>{this.detectSelfCancelLoop(s,e),this.cancel(new o.qs(o.aV))}}getPerformType(){return this.taskInstance.performType||l}detectSelfCancelLoop(e,t){if(e!==l)return
let s=t.executor&&t.executor.cancelRequest
!s||s.kind!==o.Vt||this.cancelRequest||this.state.isFinished||this.taskInstance.selfCancelLoopWarning(t)}}var m=s(536)
let g=0
class y{constructor(e){this.context=e.context,this.debug=e.debug||!1,this.enabledModifiers=e.enabledModifiers,this.env=e.env,this.group=e.group,this.hasEnabledEvents=e.hasEnabledEvents,this.modifierOptions=e.modifierOptions,this.name=e.name,this.onStateCallback=e.onStateCallback,this.scheduler=e.scheduler,this.guid="ec_"+g++,this.guids={},this.guids[this.guid]=!0,this.group&&Object.assign(this.guids,this.group.guids)}cancelAll(e){let{reason:t,cancelRequestKind:s,resetState:n}=e||{}
t=t||".cancelAll() was explicitly called on the Task"
let r=new o.qs(s||o.Jn,t)
return this.scheduler.cancelAll(this.guid,r).then(()=>{n&&this._resetState()})}get _isAlive(){return!0}_resetState(){this.setState(m.K)}setState(){}}Object.assign(y.prototype,m.K),Object.assign(y.prototype,{numRunning:0,numQueued:0,isRunning:!1,isQueued:!1,isIdle:!0,state:"idle"})
class b{constructor(e,t,s){this.task=e,this.performType=t,this.linkedObject=s}perform(...e){return this.task._performShared(e,this.performType,this.linkedObject)}}let k=class e extends y{constructor(e){super(e),this.generatorFactory=e.generatorFactory,this.perform=this._perform.bind(this)}linked(){let e=p[p.length-1]
if(!e)throw new Error("You can only call .linked() from within a task.")
return new b(this,h,e)}unlinked(){return new b(this,u,null)}toString(){return`<Task:${this.name}>`}_clone(){return new e({context:this.context,debug:this.debug,env:this.env,generatorFactory:this.generatorFactory,group:this.group,hasEnabledEvents:this.hasEnabledEvents,name:this.name,onStateCallback:this.onStateCallback,scheduler:this.scheduler})}_curry(...e){let t=this._clone()
return t._curryArgs=[...this._curryArgs||[],...e],t}_perform(...e){return this._performShared(e,l,null)}_performShared(e,t,s){let n=this._curryArgs?[...this._curryArgs,...e]:e,r=this._taskInstanceFactory(n,t,s)
return t===h&&(s._expectsLinkedYield=!0),this._isAlive||r.cancel(),this.scheduler.perform(r),r}_taskInstanceOptions(e,t,s){return{args:e,executor:new f({generatorFactory:()=>this.generatorFactory(e),env:this.env,debug:this.debug}),performType:t,hasEnabledEvents:this.hasEnabledEvents}}}},783:(e,t,s)=>{"use strict"
s.r(t),s.d(t,{default:()=>c,performHelper:()=>o})
var n=s(336),r=s(603),i=s(449)
function a(e){return function(t){"function"==typeof e?e(t):null===e||(0,r.assert)(`The onError argument passed to the \`perform\` helper should be a function or null; you passed ${e}`,!1)}}function o(e,t){let s=(0,i.F)("perform","perform",e,t)
return t&&void 0!==t.onError?function(...e){try{return s(...e).catch(a(t.onError))}catch{a(t.onError)}}:s}var c=(0,n.helper)(o)},830:(e,t,s)=>{"use strict"
s.d(t,{H:()=>c})
var n=s(587),r=s(581),i=s(579)
class a{constructor({task:e,args:t,executor:s,performType:n,hasEnabledEvents:r}){this.task=e,this.args=t,this.performType=n,this.executor=s,this.executor.taskInstance=this,this.hasEnabledEvents=r}setState(){}formatCancelReason(){}selfCancelLoopWarning(){}onFinalize(e){this.executor.onFinalize(e)}proceed(e,t,s){this.executor.proceedChecked(e,t,s)}[r.Sx](e,t){return this.executor.onYielded(e,t)}cancel(e=".cancel() was explicitly called"){this.executor.cancel(new i.qs(i.Jn,e))}then(...e){return this.executor.promise().then(...e)}catch(...e){return this.executor.promise().catch(...e)}finally(...e){return this.executor.promise().finally(...e)}toString(){return`${this.task} TaskInstance`}start(){return this.executor.start(),this}}Object.assign(a.prototype,n.N),Object.assign(a.prototype,{state:"waiting",isDropped:!1,isRunning:!0})
var o=s(41)
class c extends a{setState(e){let t=this._recomputeState(e)
Object.assign(this,{...e,isRunning:!e.isFinished,isDropped:"dropped"===t,state:t})}_recomputeState(e){return e.isDropped?"dropped":e.isCanceled?e.hasStarted?"canceled":"dropped":e.isFinished?"finished":e.hasStarted?"running":"waiting"}formatCancelReason(e){return`TaskInstance '${this.getName()}' was canceled because ${e}. For more information, see: http://ember-concurrency.com/docs/task-cancelation-help`}getName(){return this.name||(this.name=this.task&&this.task.name||"<unknown>"),this.name}selfCancelLoopWarning(e){let t=`\`${e.getName()}\``,s=`\`${this.getName()}\``
console.warn(`ember-concurrency detected a potentially hazardous "self-cancel loop" between parent task ${t} and child task ${s}. If you want child task ${s} to be canceled when parent task ${t} is canceled, please change \`.perform()\` to \`.linked().perform()\`. If you want child task ${s} to keep running after parent task ${t} is canceled, change it to \`.unlinked().perform()\``)}triggerEvent(...e){if(!this.hasEnabledEvents)return
let t=this.task,s=t.context,n=t&&t.name
if(s&&s.trigger&&n){let[t,...r]=e
s.trigger(`${n}:${t}`,...r)}}}o.O&&Object.defineProperties(c.prototype,o.O)},860:(e,t,s)=>{"use strict"
s.r(t),s.d(t,{Task:()=>k.Y,TaskInstance:()=>a.H,Yieldable:()=>w.Jk,all:()=>c,allSettled:()=>l,animationFrame:()=>o.G$,didCancel:()=>b.iw,forever:()=>o.i4,getModifier:()=>y.U6,hasModifier:()=>y.mp,hash:()=>h,hashSettled:()=>d,race:()=>u,rawTimeout:()=>o.Oc,registerModifier:()=>y.Zm,task:()=>v,timeout:()=>w.wR,waitForEvent:()=>R,waitForProperty:()=>I,waitForQueue:()=>T})
var n=s(603),r=s(421),i=s.n(r),a=s(830),o=s(581)
const c=g(i().Promise,"all",p),l=g(i(),"allSettled",p),u=g(r.Promise,"race",p),h=g(i(),"hash",f),d=g(i(),"hashSettled",f)
function p(e){return e}function f(e){return Object.keys(e).map(t=>e[t])}function m(e){if(e)if(e instanceof a.H)e.executor.asyncErrorsHandled=!0
else if(e instanceof o._d)return e._toPromise()
return e}function g(e,t,s){return function(r){let c=function(e,t){if(Array.isArray(e))return e.map(t)
if("object"==typeof e&&null!==e){let s={}
return Object.keys(e).forEach(n=>{s[n]=t(e[n])}),s}return e}(r,m),l=s(c);(0,n.assert)(`'${t}' expects an array.`,Array.isArray(l))
let u=i().defer()
e[t](c).then(u.resolve,u.reject)
let h=!1,d=()=>{h||(h=!0,l.forEach(e=>{e&&(e instanceof a.H?e.cancel():"function"==typeof e[o.Zp]&&e[o.Zp]())}))},p=u.promise.finally(d)
return p[o.Zp]=d,p}}var y=s(47),b=s(579),k=s(435)
function v(){var e;(0,n.assert)('It appears you\'re attempting to use the new task(async () => { ... }) syntax, but the async arrow task function you\'ve provided is not being properly compiled by Babel.\n\nPossible causes / remedies:\n\n1. You must pass the async function expression directly to the task() function (it is not currently supported to pass in a variable containing the async arrow fn, or any other kind of indirection)\n2. The new task syntax is only supported by native classes. Ensure that this is one.\n3. If this code is in an addon, please ensure the addon specifies ember-concurrency "2.3.0" or higher in "dependencies" (not "devDependencies")\n4. Ensure that there is only one version of ember-concurrency v2.3.0+ being used in your project (including nested dependencies) and consider using npm/yarn/pnpm resolutions to enforce a single version is used\n5. Ensure that you have registered the Babel transform that Ember Concurrency uses to transform tasks in the "async-arrow" notation, see https://ember-concurrency.com/docs/v4-upgrade',!((e=arguments[arguments.length-1])&&e.constructor&&"AsyncFunction"===e.constructor.name)),(0,n.assert)("Using task(...) in any form other than `task(async () => {})` is no longer supported since ember-concurrency v5. Please use the modern syntax instead (and consider using one of ember-concurrency's codemods).",!1)}var w=s(378),S=s(123),_=s(223)
class x extends w.Jk{constructor(e){super(),this.queueName=e}onYield(e){let t
try{t=(0,_.schedule)(this.queueName,()=>e.next())}catch(t){e.throw(t)}return()=>(0,_.cancel)(t)}}class E extends w.Jk{constructor(e,t){super(),this.object=e,this.eventName=t,this.usesDOMEvents=!1}on(e){"function"==typeof this.object.addEventListener?(this.usesDOMEvents=!0,this.object.addEventListener(this.eventName,e)):this.object.on(this.eventName,e)}off(e){this.usesDOMEvents?this.object.removeEventListener(this.eventName,e):this.object.off(this.eventName,e)}onYield(e){let t=null,s=()=>{t&&this.off(t),t=null}
return t=t=>{s(),e.next(t)},this.on(t),s}}class C extends w.Jk{constructor(e,t,s=Boolean){super(),this.object=e,this.key=t,(0,n.deprecate)("waitForProperty is deprecated due to its use of observers. Consider using a polling approach instead.",!1,{id:"ember-concurrency.deprecate-wait-for-property",for:"ember-concurrency",since:"4.0.5",until:"5.0.0"}),this.predicateCallback="function"==typeof s?s:e=>e===s}onYield(e){let t=!1,s=()=>{let t=(0,w.y$)(this.object,this.key)
if(this.predicateCallback(t))return e.next(t),!0}
return s()||((0,S.addObserver)(this.object,this.key,null,s),t=!0),()=>{t&&s&&(0,S.removeObserver)(this.object,this.key,null,s)}}}function T(e){return new x(e)}function R(e,t){return(0,n.assert)(`${e} must include Ember.Evented (or support \`.on()\` and \`.off()\`) or DOM EventTarget (or support \`addEventListener\` and  \`removeEventListener\`) to be able to use \`waitForEvent\``,(0,w.b5)(e)),new E(e,t)}function I(e,t,s){return new C(e,t,s)}},960:(e,t,s)=>{"use strict"
s.d(t,{KH:()=>i,R5:()=>r,XS:()=>n,kY:()=>a})
const n=0,r=1,i=2,a=3}}])
