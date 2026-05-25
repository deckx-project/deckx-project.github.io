(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();function Dn(e){const t=[],n=new Set;let r=0;e.slides.length||t.push({code:"empty-deck",severity:"error",message:"Deck must contain at least one slide."}),xn(e.aspectRatio)||t.push({code:"invalid-canvas",severity:"error",message:"Deck aspectRatio must resolve to a positive finite canvas."}),e.slides.forEach((o,c)=>{const f=o.id?.trim();f?n.has(f)?t.push({code:"duplicate-slide-id",severity:"error",message:`Slide id "${f}" is duplicated.`,slideId:f,slideIndex:c}):n.add(f):t.push({code:"missing-slide-id",severity:"error",message:`Slide ${c+1} is missing a stable id.`,slideIndex:c}),o.notes?.trim()?r+=1:t.push({code:"missing-notes",severity:"warning",message:`Slide ${f||c+1} has no speaker notes.`,slideId:f||void 0,slideIndex:c})});const s=t.filter(o=>o.severity==="error").length,i=t.length-s;return{deckId:e.id,issues:t,errorCount:s,warningCount:i,notesCoverage:{total:e.slides.length,withNotes:r,missing:Math.max(0,e.slides.length-r)}}}function xn(e){return e==="16:9"||e==="4:3"?!0:Number.isFinite(e.width)&&Number.isFinite(e.height)&&e.width>0&&e.height>0}function Ye(e){if(globalThis.crypto?.randomUUID)return`${e}-${globalThis.crypto.randomUUID()}`;if(globalThis.crypto?.getRandomValues){const t=new Uint32Array(4);return globalThis.crypto.getRandomValues(t),`${e}-${Array.from(t,n=>n.toString(16).padStart(8,"0")).join("")}`}return`${e}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`}function Ln(e){return{id:e.id,title:e.title,aspectRatio:e.aspectRatio,theme:e.theme,metadata:e.metadata,slides:e.slides.map(An)}}function An(e){const{notes:t,...n}=e;return n}function Tn(){return{status:"idle",startedAtEpochMs:null,elapsedBeforePauseMs:0,timerVersion:0}}function Cn(e,t=Date.now()){return e.status==="running"?e:{...e,status:"running",startedAtEpochMs:t,timerVersion:e.timerVersion+1}}function Mn(e,t=Date.now()){return e.status!=="running"||e.startedAtEpochMs===null?e:{...e,status:"paused",startedAtEpochMs:null,elapsedBeforePauseMs:e.elapsedBeforePauseMs+(t-e.startedAtEpochMs),timerVersion:e.timerVersion+1}}function Rn(e,t=Date.now()){return e.status!=="paused"?e:{...e,status:"running",startedAtEpochMs:t,timerVersion:e.timerVersion+1}}function On(e=Date.now()){return{status:"running",startedAtEpochMs:e,elapsedBeforePauseMs:0,timerVersion:0}}function Tt(e,t=Date.now()){return e.status!=="running"||e.startedAtEpochMs===null?e.elapsedBeforePauseMs:e.elapsedBeforePauseMs+(t-e.startedAtEpochMs)}function Pn(e){const t=Math.max(0,Math.floor(e/1e3)),n=Math.floor(t/60),r=t%60;return`${String(n).padStart(2,"0")}:${String(r).padStart(2,"0")}`}function In(e,t,n){let r={deckId:e,sessionId:t,stateVersion:0,index:0,timer:Tn(),peer:{connected:!1,lastSeenAt:null}};const s=new Set;return{subscribe(o){return s.add(o),()=>s.delete(o)},getState:()=>r,getPublicState:()=>({deckId:r.deckId,sessionId:r.sessionId,stateVersion:r.stateVersion,index:r.index,timer:r.timer}),getElapsedLabel:()=>Pn(Tt(r.timer)),goto(o){const c=wt(o,0,Math.max(0,n-1));c!==r.index&&(r={...r,index:c,stateVersion:r.stateVersion+1},i())},startTimer(){r={...r,timer:Cn(r.timer),stateVersion:r.stateVersion+1},i()},applyTimerCommand(o){const c=o==="pause"?Mn(r.timer):o==="resume"?Rn(r.timer):On();r={...r,timer:c,stateVersion:r.stateVersion+1},i()},applySnapshot(o){o.deckId!==r.deckId||o.sessionId!==r.sessionId||o.stateVersion<=r.stateVersion||(r={...r,index:wt(o.index,0,Math.max(0,n-1)),stateVersion:o.stateVersion,timer:o.timer},i())},markPeerSeen(){const o=r.peer.connected;r={...r,peer:{connected:!0,lastSeenAt:Date.now()}},o||i()},refreshPeer(o){if(r.peer.lastSeenAt===null)return;const c=Date.now()-r.peer.lastSeenAt<=o;c!==r.peer.connected&&(r={...r,peer:{...r.peer,connected:c}},i())},isPeerConnected(o){return r.peer.lastSeenAt!==null&&Date.now()-r.peer.lastSeenAt<=o}};function i(){s.forEach(o=>o())}}function wt(e,t,n){return Math.min(n,Math.max(t,e))}class Nn{constructor(t){this.options=t,this.channel=new BroadcastChannel(`html-ppt:${t.deckId}:${t.sessionId}`),this.channel.addEventListener("message",this.onMessage)}options;channel;listeners=new Set;lastSeqBySender=new Map;seq=0;send(t){const n={protocol:"deckx-player-sync/v1",deckId:this.options.deckId,sessionId:this.options.sessionId,senderId:this.options.senderId,from:this.options.from,seq:++this.seq,stateVersion:Un(t),sentAtEpochMs:Date.now(),body:t};this.channel.postMessage(n)}subscribe(t){return this.listeners.add(t),()=>this.listeners.delete(t)}close(){this.channel.removeEventListener("message",this.onMessage),this.channel.close(),this.listeners.clear()}onMessage=t=>{if(!Fn(t.data))return;const n=t.data;if(n.protocol!=="deckx-player-sync/v1"||n.deckId!==this.options.deckId||n.sessionId!==this.options.sessionId||n.senderId===this.options.senderId)return;const r=this.lastSeqBySender.get(n.senderId)??0;n.seq<=r||(this.lastSeqBySender.set(n.senderId,n.seq),this.listeners.forEach(s=>s(n)))}}class St{constructor(t="Transport is disabled."){this.reason=t}reason;send(){}subscribe(){return()=>{}}close(){}}function Un(e){if(e.type==="state-snapshot")return e.state.stateVersion;if(e.type==="pong")return e.stateVersion}function Fn(e){if(!e||typeof e!="object")return!1;const t=e;return t.protocol==="deckx-player-sync/v1"&&typeof t.deckId=="string"&&typeof t.sessionId=="string"&&typeof t.senderId=="string"&&typeof t.seq=="number"&&typeof t.sentAtEpochMs=="number"&&typeof t.body=="object"}async function qn(e){const t=new URL(window.location.href);t.hash="slideshow",t.searchParams.set("sessionId",e.sessionId);let n="popup,width=1280,height=720";if(e.display==="auto"){const s=await Xn();s.status&&e.onStatus?.(s.status),s.features&&(n=s.features)}const r=window.open(t.toString(),"html-ppt-slideshow",n);return r?(r.focus(),{windowRef:r,status:{type:"opened",message:"슬라이드쇼 창을 열었습니다. 필요하면 외부 화면으로 이동한 뒤 풀스크린을 시작하세요."}}):{windowRef:null,status:{type:"popup-blocked",message:"팝업이 차단되었습니다. 브라우저에서 팝업을 허용한 뒤 다시 열어주세요."}}}async function Xn(){const e=window;if(!window.isSecureContext||typeof e.getScreenDetails!="function")return{features:null,status:{type:"window-management-unavailable",message:"외부 화면 자동 배치는 이 브라우저 또는 실행 컨텍스트에서 지원되지 않아 일반 창으로 엽니다."}};try{const n=(await e.getScreenDetails()).screens.find(r=>!r.isPrimary)??null;return n?{features:`left=${n.availLeft},top=${n.availTop},width=${n.availWidth},height=${n.availHeight},popup`,status:{type:"opened",message:"외부 화면 좌표를 감지했습니다. 슬라이드쇼 창을 해당 위치로 엽니다."}}:{features:null,status:{type:"window-management-unavailable",message:"외부 화면을 찾지 못해 일반 창으로 엽니다."}}}catch{return{features:null,status:{type:"window-management-denied",message:"외부 화면 권한이 거부되었거나 사용할 수 없어 일반 창으로 엽니다."}}}}function ke(e){return e==="4:3"?{width:1024,height:768}:e==="16:9"?{width:1280,height:720}:{width:bt(e.width,1280),height:bt(e.height,720)}}function bt(e,t){return!Number.isFinite(e)||e<=0?t:Math.round(e)}function ye(e,t,n,r){e.innerHTML="",e.appendChild(Ct(t,n,r))}function Ct(e,t,n){const r=e.slides[t];if(!r){const h=document.createElement("section");return h.className="slide slide-end",h.innerHTML='<p class="muted">END</p>',h}const s=document.createElement("section"),i=ke(e.aspectRatio);s.className=["slide",r.className,e.theme?.className].filter(Boolean).join(" "),s.dataset.slideId=r.id,s.style.setProperty("--slide-width",`${i.width}px`),s.style.setProperty("--slide-height",`${i.height}px`),s.style.width=`${i.width}px`,s.style.height=`${i.height}px`,jn(s,e.theme?.cssVars);const o=r.render?.({deck:e,slide:r,index:t,total:e.slides.length,mode:n});o instanceof HTMLElement?s.appendChild(o):typeof o=="string"?s.innerHTML=o:s.appendChild(Hn(r));const c=document.createElement("div");c.className="slide-footer mono",c.textContent=r.footer||e.title;const f=document.createElement("div");return f.className="slide-page mono",f.textContent=`${String(t+1).padStart(2,"0")} / ${String(e.slides.length).padStart(2,"0")}`,s.append(c,f),s}function we(e,t=""){const n=ke(e.aspectRatio),r=document.createElement("div");r.className=`slide-wrap ${t}`.trim();const s=document.createElement("div");return s.className="slide-scaler",s.dataset.designWidth=String(n.width),s.dataset.designHeight=String(n.height),r.appendChild(s),r}function re(){document.querySelectorAll(".slide-scaler").forEach(e=>{const t=e.parentElement;if(!t)return;const n=Number(e.dataset.designWidth||1280),r=Number(e.dataset.designHeight||720),s=Math.min(t.clientWidth/n,t.clientHeight/r),i=(t.clientWidth-n*s)/2,o=(t.clientHeight-r*s)/2;e.style.width=`${n}px`,e.style.height=`${r}px`,e.style.transform=`scale(${s})`,e.style.left=`${i}px`,e.style.top=`${o}px`})}function Hn(e){const t=document.createElement("div");if(t.className="slide-content",e.kicker){const n=document.createElement("div");n.className="slide-kicker mono",n.textContent=e.kicker,t.appendChild(n)}if(e.title){const n=document.createElement("h2");n.innerHTML=e.title,t.appendChild(n)}if(e.body){const n=document.createElement("div");n.className="slide-body",n.innerHTML=e.body,t.appendChild(n)}return t}function jn(e,t){t&&Object.entries(t).forEach(([n,r])=>{e.style.setProperty(n,r)})}function Vn(e,t){e.innerHTML=`
    <main class="player-console player-console-empty">
      ${Mt("DeckX를 열어 발표를 시작하세요",t.homeHref)}
      <section class="player-console-grid player-console-grid-empty" aria-label="DeckX player open screen">
        <aside class="player-panel player-open-panel">
          ${Rt(t)}
        </aside>

        <section class="player-panel player-guidance-panel">
          <div class="player-panel-heading">
            <span class="mono">PLAYER FLOW</span>
            <h2>열기 전에는 플레이어만 준비합니다</h2>
          </div>
          <div class="player-empty-stage" aria-label="No DeckX opened">
            <strong>DeckX URL 또는 로컬 .deckx zip을 먼저 여세요.</strong>
            <span>덱을 열면 미리보기와 발표 시작 버튼이 활성화되고, DeckX 상세 정보는 필요할 때만 펼쳐볼 수 있습니다.</span>
          </div>
          <ol class="player-flow-list">
            <li><strong>1. DeckX 열기</strong><span>URL을 입력하거나 로컬 zip package를 선택합니다.</span></li>
            <li><strong>2. 미리보기 확인</strong><span>첫 슬라이드와 기본 발표 옵션을 확인합니다.</span></li>
            <li><strong>3. 발표 시작</strong><span>발표자뷰와 슬라이드쇼 창을 함께 실행합니다.</span></li>
          </ol>
          <div class="player-login-teaser">
            <strong>SSO와 팀 라이브러리 준비 영역</strong>
            <span>지금은 브라우저 로컬 히스토리로 동작하고, 이후 로그인하면 업로드 DeckX와 공유 받은 DeckX를 동기화할 수 있습니다.</span>
          </div>
        </section>
      </section>
    </main>
  `,Ot(e,t.actions)}function Bn(e,t){const n=ke(t.deck.aspectRatio),r=t.deck.slides[0],s=nr(t.deck);e.innerHTML=`
    <main class="player-console">
      ${Mt(t.deck.title,t.actions.homeHref)}
      <section class="player-console-grid player-console-grid-loaded" aria-label="DeckX player launch console">
        <aside class="player-panel player-open-panel">
          ${Rt(t)}
        </aside>

        <section class="player-panel player-preview-panel">
          <div class="player-panel-heading split">
            <div>
              <span class="mono">${k(Nt(t.sourceKind))}</span>
              <h2>${k(lr(r?.title||t.deck.title))}</h2>
            </div>
            <span class="player-count mono">01 / ${String(t.deck.slides.length).padStart(2,"0")}</span>
          </div>
          <div class="player-preview-stage" data-player-preview aria-label="First slide preview"></div>
          <div class="player-meta-strip" aria-label="Deck metadata">
            <span><strong>${t.deck.slides.length}</strong> slides</span>
            <span><strong>${k(It(t.deck.aspectRatio))}</strong> ${n.width}x${n.height}</span>
            <span><strong>${k(Pt(s))}</strong> planned</span>
            <span><strong>${k(ar(t.deck.metadata))}</strong> metadata</span>
          </div>
        </section>

        <aside class="player-panel player-run-panel">
          <div class="player-panel-heading">
            <span class="mono">RUN</span>
            <h2>발표 실행</h2>
          </div>
          <button class="btn primary player-start-button" type="button" data-action="start">발표 시작</button>
          <div class="player-secondary-actions" aria-label="Secondary player actions">
            <button class="btn" type="button" data-action="presenter">발표자뷰만</button>
            <button class="btn" type="button" data-action="slideshow">슬라이드쇼만</button>
          </div>
          <details class="player-settings-detail" open>
            <summary>발표 옵션</summary>
            ${Zn(t.motionMode)}
          </details>
          ${Qn(t,s)}
        </aside>
      </section>
    </main>
  `,Wn(e,t.publicDeck),zn(e,t.actions)}function Mt(e,t){return`
    <header class="player-console-header">
      <div class="player-title-group">
        <img class="brand-icon player-brand-icon" src="/brand/deckx-icon.svg" alt="" aria-hidden="true" />
        <div>
          <span class="badge mono">DeckX PLAYER</span>
          <h1>DeckX Player</h1>
          <p>${k(e)}</p>
        </div>
      </div>
      <div class="player-header-actions">
        ${t?`<a class="btn compact" href="${k(t)}">프로젝트 소개</a>`:""}
      </div>
    </header>
  `}function Rt(e){return`
    <div class="player-panel-heading">
      <span class="mono">SOURCE</span>
      <h2>DeckX 열기</h2>
    </div>
    ${e.actions.onOpenDeckxUrl?Kn(e.actions.deckxUrlValue??"",e.actions.deckxStatus??""):""}
    ${e.actions.onOpenDeckxFile?Gn():""}
    ${Yn(e.historyOptions)}
    ${e.demoOptions.length>0?Jn(e.demoOptions):""}
  `}function Wn(e,t){const n=e.querySelector("[data-player-preview]");if(!n)return;const r=we(t,"player-preview-wrap"),s=r.querySelector(".slide-scaler");s&&(ye(s,t,0,"slideshow"),n.appendChild(r),window.requestAnimationFrame(re))}function zn(e,t){Ot(e,t),e.querySelector('[data-action="start"]')?.addEventListener("click",t.onStart),e.querySelector('[data-action="presenter"]')?.addEventListener("click",t.onPresenterOnly),e.querySelector('[data-action="slideshow"]')?.addEventListener("click",t.onSlideshowOnly),e.querySelectorAll("[data-motion-mode]").forEach(n=>{n.addEventListener("click",()=>{t.onSetMotionMode(n.dataset.motionMode)})})}function Ot(e,t){const n=e.querySelector("[data-deckx-url-form]");n?.addEventListener("submit",s=>{s.preventDefault();const o=n.querySelector("[data-deckx-url-input]")?.value.trim();o&&t.onOpenDeckxUrl?.(o)});const r=e.querySelector("[data-deckx-file-input]");r?.addEventListener("change",()=>{const s=r.files?.[0];s&&t.onOpenDeckxFile?.(s),r.value=""}),e.querySelectorAll("[data-action='select-local-deckx']").forEach(s=>{s.addEventListener("click",()=>r?.click())})}function Kn(e,t){return`
    <form class="player-deckx-form" data-deckx-url-form>
      <label for="player-deckx-url">.deckx URL</label>
      <div class="player-input-row">
        <input
          id="player-deckx-url"
          data-deckx-url-input
          type="text"
          inputmode="url"
          autocomplete="url"
          placeholder="https://example.com/deck.deckx"
          value="${k(e)}"
          aria-label="DeckX URL"
        />
        <button class="btn compact" type="submit">열기</button>
      </div>
      ${t?`<div class="deckx-url-status">${k(t)}</div>`:""}
    </form>
  `}function Gn(){return`
    <div class="player-file-open">
      <span class="player-subhead mono">LOCAL PACKAGE</span>
      <input
        id="player-deckx-file"
        data-deckx-file-input
        class="visually-hidden"
        type="file"
        accept=".deckx,.zip,application/zip,application/x-zip-compressed"
        aria-label="DeckX zip file"
      />
      <button class="btn" type="button" data-action="select-local-deckx">로컬 .deckx zip 선택</button>
    </div>
  `}function Yn(e){return`
    <section class="player-history-list" aria-label="Recently opened DeckX">
      <span class="player-subhead mono">RECENT DeckX</span>
      ${e.length===0?'<p class="player-empty-copy">아직 열어본 DeckX가 없습니다.</p>':e.map(_n).join("")}
    </section>
  `}function _n(e){return e.kind==="url"&&e.href?`
      <a class="player-history-option" href="${k(e.href)}">
        <span>${k(e.label)}</span>
        <small>URL · ${k(e.detail)}</small>
      </a>
    `:`
    <button class="player-history-option as-button" type="button" data-action="select-local-deckx">
      <span>${k(e.label)}</span>
      <small>ZIP · ${k(e.detail)} · 다시 선택 필요</small>
    </button>
  `}function Jn(e){return`
    <nav class="player-demo-list" aria-label="Explicit demo DeckX packages">
      <span class="player-subhead mono">OFFICIAL SAMPLES</span>
      ${e.map(t=>`
            <a class="player-demo-option ${t.active?"active":""}" href="${k(t.href)}" aria-current="${t.active?"page":"false"}">
              <span><em>DEMO</em>${k(t.label)}</span>
              <small>${k(t.description)}</small>
            </a>
          `).join("")}
    </nav>
  `}function Zn(e){return`
    <div class="player-motion-block">
      <span class="player-subhead mono">MOTION MODE</span>
      <div class="player-motion-segment" role="group" aria-label="Motion controls">
        ${[{id:"full",label:"Full",description:"CSS motion and transitions enabled"},{id:"reduced",label:"Reduced",description:"Motion compressed for review"},{id:"paused",label:"Paused",description:"Animations paused"}].map(n=>`
              <button
                type="button"
                class="motion-mode ${n.id===e?"active":""}"
                data-motion-mode="${n.id}"
                aria-pressed="${n.id===e}"
                title="${k(n.description)}"
              >${k(n.label)}</button>
            `).join("")}
      </div>
    </div>
  `}function Qn(e,t){const n=ke(e.deck.aspectRatio),r=e.validationReport.notesCoverage,s=e.validationReport.errorCount>0?"BLOCKED":e.validationReport.warningCount>0?"WARNINGS":"READY";return`
    <details class="player-deckx-details">
      <summary>DeckX 상세 보기</summary>
      <dl class="player-detail-list">
        ${L("SOURCE",`${Nt(e.sourceKind)} · ${e.sourceLabel}`)}
        ${L("VALIDATION",`${s} · ${e.validationReport.errorCount} errors / ${e.validationReport.warningCount} warnings`)}
        ${L("NOTES",`${r.withNotes}/${r.total} notes · ${r.missing} missing`)}
        ${L("SESSION",e.sessionId)}
        ${L("DISPLAY",sr(e.displayFilters))}
        ${L("CANVAS",`${It(e.deck.aspectRatio)} · ${rr(n)}`)}
        ${L("DURATION",Pt(t))}
        ${er(e.deck.metadata)}
      </dl>
      ${tr(e.validationReport)}
    </details>
  `}function er(e){if(!e)return"";const t=[];return e.description&&t.push(L("DESCRIPTION",e.description)),e.version&&t.push(L("VERSION",e.version)),e.authors?.length&&t.push(L("AUTHORS",or(e))),e.tags?.length&&t.push(L("TAGS",e.tags.join(", "))),e.language&&t.push(L("LANGUAGE",e.language)),e.license&&t.push(L("LICENSE",e.license)),e.homepage&&t.push(L("HOMEPAGE",e.homepage)),e.repository&&t.push(L("REPOSITORY",e.repository)),e.generator?.name&&t.push(L("GENERATOR",ir(e))),(e.createdAt||e.updatedAt)&&t.push(L("DATES",[e.createdAt,e.updatedAt].filter(Boolean).join(" / "))),t.join("")}function L(e,t){return`
    <div class="player-detail-row">
      <dt class="mono">${k(e)}</dt>
      <dd>${k(t)}</dd>
    </div>
  `}function tr(e){return e.issues.length===0?'<p class="player-empty-copy">Validation issues 없음.</p>':`
    <div class="player-issue-list">
      ${e.issues.slice(0,4).map(t=>`
            <div class="player-issue" data-severity="${t.severity}">
              <strong>${k(t.code)}</strong>
              <span>${k(t.message)}</span>
            </div>
          `).join("")}
      ${e.issues.length>4?`<p>${e.issues.length-4} more issues hidden.</p>`:""}
    </div>
  `}function nr(e){return typeof e.durationSec=="number"&&e.durationSec>0?e.durationSec:e.slides.reduce((t,n)=>t+(n.timingSec||0),0)}function Pt(e){if(!e)return"No plan";const t=Math.floor(e/60),n=e%60;return t?n?`${t}m ${n}s`:`${t}m`:`${n}s`}function It(e){return typeof e=="string"?e:`${e.width}:${e.height}`}function rr(e){return`${e.width} x ${e.height}`}function sr(e){return`B${e.brightness} C${e.contrast} S${e.saturation}`}function ar(e){return e?e.tags?.length?e.tags.find(t=>t!=="stress"&&t!=="demo")??e.tags[0]:e.language?e.language:e.version?e.version:"present":"none"}function or(e){return(e.authors??[]).map(t=>[t.name,t.role].filter(Boolean).join(" · ")).join(", ")}function ir(e){return e.generator?[e.generator.name,e.generator.version].filter(Boolean).join(" "):""}function Nt(e){return e==="demo"?"Demo DeckX":e==="zip"?"Local ZIP":"URL DeckX"}function lr(e){return e.replace(/<[^>]*>/g,"").replace(/\s+/g," ").trim()}function k(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}const _e=[{id:"script-first",name:"Script First",description:"왼쪽 목록, 상단 긴 노트, 하단 Current/Next",layout:{presetId:"script-first",showCurrent:!0,showNext:!0,showNotes:!0,showOverview:!0,notesFontSize:22},grid:{columns:"140px minmax(0, 2fr) minmax(0, 1fr)",rows:"auto minmax(0, 1.2fr) minmax(0, 1fr) auto",areas:`
        "topbar topbar topbar"
        "overview notes notes"
        "overview current next"
        "bottombar bottombar bottombar"
      `}},{id:"balanced",name:"Balanced",description:"왼쪽 Current/Notes, 오른쪽 Next/List",layout:{presetId:"balanced",showCurrent:!0,showNext:!0,showNotes:!0,showOverview:!0,notesFontSize:18},grid:{columns:"minmax(0, 2fr) minmax(320px, 1fr)",rows:"auto minmax(0, 1fr) minmax(0, 0.78fr) auto",areas:`
        "topbar topbar"
        "current next"
        "notes overview"
        "bottombar bottombar"
      `}},{id:"review",name:"Review",description:"왼쪽 한 줄 목록, 오른쪽 작은 Next",layout:{presetId:"review",showCurrent:!0,showNext:!0,showNotes:!0,showOverview:!0,notesFontSize:17},grid:{columns:"128px minmax(0, 1fr) minmax(220px, 0.42fr)",rows:"auto minmax(0, 1.05fr) minmax(0, 0.85fr) auto",areas:`
        "topbar topbar topbar"
        "overview current next"
        "overview notes notes"
        "bottombar bottombar bottombar"
      `}}];function cr(e,t,n,r,s){const i=rt(s.layout.presetId),o=Sr(i.grid,s.layout.settingsOpen),c=s.layout.showCurrent||s.layout.showNext||s.layout.showNotes||s.layout.showOverview;e.innerHTML=`
    <main class="presenter">
      <header class="topbar">
        <div class="topbar-main">
          <div class="topbar-group">
            <div>
              <div class="label mono">SLIDE</div>
              <div class="value mono">${r.index+1} <span>/ ${n.slides.length}</span></div>
            </div>
            <div>
              <div class="label mono">ELAPSED</div>
              <div class="value mono accent" data-elapsed>00:00</div>
            </div>
            <div>
              <div class="label mono">CLOCK</div>
              <div class="value mono" data-clock>--:--:--</div>
            </div>
            <div>
              <div class="label mono">PACE</div>
              <div class="value mono pace-value" data-pace="${s.pace.state}" data-pace-label>${C(s.pace.label)}</div>
            </div>
          </div>
          <div class="topbar-group right">
            <span class="connection mono" title="발표자뷰와 슬라이드쇼 창의 동기화 상태">
              <span class="status-dot" data-connection-dot data-connected="false"></span>
              <span data-connection>${s.connectionStatus}</span>
            </span>
            <button class="tool-btn" data-action="goto" title="슬라이드 번호로 이동">Goto</button>
            <button class="tool-btn" data-action="search" title="제목, 본문, 노트 검색">Search</button>
            <button class="tool-btn primary-tool" data-action="open" title="관객용 슬라이드쇼 창을 엽니다">슬라이드쇼 창 열기</button>
            ${ur(s)}
            <button class="tool-btn" data-action="settings" title="발표자뷰 패널 배치를 선택합니다">${s.layout.settingsOpen?"프리셋 닫기":"뷰 프리셋"}</button>
            <button class="tool-btn danger" data-action="exit">종료</button>
          </div>
        </div>
        ${dr(s,t)}
      </header>

      ${s.layout.settingsOpen?pr(s.layout):""}

      ${s.layout.showCurrent?`<section class="panel current">
              <div class="panel-label mono">CURRENT</div>
              <div class="slide-host" data-current></div>
            </section>`:""}

      ${s.layout.showNext?`<section class="panel next">
              <div class="panel-label mono">NEXT</div>
              <div class="slide-host" data-next></div>
            </section>`:""}

      ${s.layout.showNotes?`<section class="panel notes">
              <div class="panel-label mono">SPEAKER NOTES${s.notesHasDraft?" · DRAFT":""}</div>
              <div class="panel-actions">
                <button class="mini-btn" data-action="edit-notes">Edit</button>
                <button class="mini-btn" data-action="export-notes">Export</button>
              </div>
              <div class="notes-content" style="font-size:${s.layout.notesFontSize}px">${br(s.notesText)}</div>
            </section>`:""}

      ${s.layout.showOverview?`<section class="panel overview">
              <div class="panel-label mono">SLIDE LIST</div>
              <div class="overview-list" data-overview></div>
            </section>`:""}

      ${c?"":`<section class="panel empty-presenter">
              <p>표시할 컴포넌트를 하나 이상 켜주세요.</p>
            </section>`}

      <footer class="bottombar">
        <div class="nav-dots" data-dots></div>
        <div class="bottom-status mono">${s.windowStatus?.message||"준비됨"}</div>
        <div class="timer-controls">
          <button class="btn compact" data-action="pause">${r.timer.status==="paused"?"Resume":"Pause"}</button>
          <button class="btn compact" data-action="reset">Reset</button>
        </div>
      </footer>
    </main>
  `;const f=e.querySelector(".presenter");f&&(f.dataset.preset=i.id,wr(f,o));const h=e.querySelector("[data-current]"),p=e.querySelector("[data-next]");if(h){const m=we(n);h.appendChild(m),ye(m.querySelector(".slide-scaler"),n,r.index,"presenter")}if(p){const m=we(n);p.appendChild(m),ye(m.querySelector(".slide-scaler"),n,r.index+1,"presenter")}hr(e,n,r.index,s.onGoto),gr(e);const u=e.querySelector("[data-dots]");u&&n.slides.forEach((m,E)=>{const S=document.createElement("button");S.type="button",S.className=E===r.index?"active":"",S.textContent=String(E+1),S.addEventListener("click",()=>s.onGoto(E)),u.appendChild(S)}),mr(e,s),e.querySelector('[data-action="settings"]')?.addEventListener("click",()=>{s.onToggleSettings()}),e.querySelector('[data-action="goto"]')?.addEventListener("click",()=>{s.onOpenCommand("goto")}),e.querySelector('[data-action="search"]')?.addEventListener("click",()=>{s.onOpenCommand("search")}),e.querySelector('[data-action="motion"]')?.addEventListener("click",s.onCycleMotionMode),e.querySelector('[data-action="theme"]')?.addEventListener("click",s.onCycleRuntimeTheme),e.querySelector('[data-action="open"]')?.addEventListener("click",s.onOpenSlideshow),e.querySelector('[data-action="copy-url"]')?.addEventListener("click",s.onCopySlideshowUrl),e.querySelector('[data-action="exit"]')?.addEventListener("click",s.onExit),e.querySelector('[data-action="edit-notes"]')?.addEventListener("click",s.onEditNotes),e.querySelector('[data-action="export-notes"]')?.addEventListener("click",s.onExportNotes),e.querySelector('[data-action="wake-lock"]')?.addEventListener("click",s.onToggleWakeLock),e.querySelector('[data-action="mirror"]')?.addEventListener("click",s.onToggleMirror),e.querySelector('[data-action="pause"]')?.addEventListener("click",s.onPauseResume),e.querySelector('[data-action="reset"]')?.addEventListener("click",s.onResetTimer),re()}function dr(e,t){const n=e.windowStatus?.type??"idle",r=e.validationReport.errorCount>0?`${e.validationReport.errorCount} errors`:`${e.validationReport.warningCount} warnings`,s=`${e.validationReport.notesCoverage.withNotes}/${e.validationReport.notesCoverage.total}`,i=e.validationReport.errorCount>0?"BLOCKED":e.connectionStatus==="CONNECTED"?"READY":"CHECK";return`
    <details class="readiness-detail">
      <summary>
        <span>운영 상태</span>
        <span class="readiness-summary-chip mono" data-readiness-state="${C(i.toLowerCase())}">${i}</span>
        <span class="readiness-summary-copy">SYNC ${C(e.connectionStatus)} · POPUP ${C(Et(n))} · VALIDATION ${C(r)}</span>
      </summary>
      <div class="readiness-row" aria-label="Presentation setup preflight">
        ${P("DECK",t.title,"","현재 열려 있는 DeckX 제목입니다.")}
        ${P("SESSION",Er(e.sessionId),"","발표자뷰와 슬라이드쇼가 공유하는 세션입니다.")}
        ${P("POPUP",Et(n),n,"슬라이드쇼 창 열기 상태입니다.")}
        ${P("SYNC",e.connectionStatus,"","BroadcastChannel 기반 창 간 연결 상태입니다.")}
        ${P("FULLSCREEN",e.fullscreenActive?"ON":"OFF","","현재 창의 풀스크린 상태입니다.")}
        ${P("MOTION",Ut(e.motionMode),"","덱 CSS animation 재생 방식입니다. 도구 메뉴에서 변경합니다.")}
        ${P("THEME",Ft(e.runtimeTheme),"","발표자뷰와 슬라이드쇼 chrome 테마입니다. 덱 내부 스타일은 바꾸지 않습니다.")}
        ${P("PACE",e.pace.detail,e.pace.state,"계획 시간 대비 현재 발표 속도입니다.")}
        ${P("FILTER",kr(e.displayFilters),"","관객용 화면 보정값입니다. 슬라이드쇼의 Display 메뉴에서 조정합니다.")}
        ${P("WAKE",e.wakeLockStatus,"","화면 꺼짐 방지 요청 상태입니다.")}
        ${P("MIRROR",e.mirrorStatus,"","관객 화면 미러링 상태입니다.")}
        ${P("VALIDATION",r,e.validationReport.errorCount>0?"error":"ok","DeckX package 검증 결과입니다.")}
        ${P("NOTES",s,"","발표자 노트가 연결된 슬라이드 수입니다.")}
      </div>
    </details>
  `}function P(e,t,n="",r=""){return`
    <span class="readiness-item" data-readiness-state="${C(n)}" title="${C(r)}">
      <span class="readiness-label mono">${C(e)}</span>
      <span class="readiness-value mono">${C(t)}</span>
      ${r?`<span class="readiness-description">${C(r)}</span>`:""}
    </span>
  `}function ur(e){return`
    <details class="presenter-tools-menu">
      <summary class="tool-btn">도구</summary>
      <div class="presenter-tools-panel">
        ${fe("motion",`Motion: ${Ut(e.motionMode)}`,"Full, Reduced, Paused 순서로 덱 애니메이션 재생 방식을 바꿉니다.")}
        ${fe("theme",`쇼 테마: ${Ft(e.runtimeTheme)}`,"발표자뷰와 슬라이드쇼 chrome을 Light/Dark로 전환합니다. 덱 스타일은 유지됩니다.")}
        ${fe("copy-url","URL 복사","현재 세션의 슬라이드쇼 URL을 복사합니다. 팝업 차단 시 수동 복구에 사용합니다.")}
        ${fe("wake-lock","Keep Awake","지원 브라우저에서 화면 꺼짐 방지를 요청합니다.")}
        ${fe("mirror","Audience Mirror","권한을 허용하면 발표자 화면 안에 관객 화면 확인용 미러를 띄웁니다.")}
      </div>
    </details>
  `}function fe(e,t,n){return`
    <button class="tool-menu-control" type="button" data-action="${C(e)}">
      <strong>${C(t)}</strong>
      <span>${C(n)}</span>
    </button>
  `}function pr(e){return`
    <section class="panel layout-settings">
      <div class="preset-picker" role="radiogroup" aria-label="Presenter view presets">
        ${_e.map(t=>fr(t,e.presetId)).join("")}
      </div>
    </section>
  `}function fr(e,t){return`
    <button
      type="button"
      class="preset-card ${e.id===t?"active":""}"
      data-preset-id="${e.id}"
      aria-pressed="${e.id===t}"
    >
      <span class="preset-name">${e.name}</span>
      <span class="preset-description">${e.description}</span>
      <span class="preset-map preset-map-${e.id}"><span class="preset-map-extra"></span></span>
    </button>
  `}function mr(e,t){e.querySelectorAll("[data-preset-id]").forEach(n=>{n.addEventListener("click",()=>{const r=n.dataset.presetId;t.onSelectPreset(r)})})}function hr(e,t,n,r){const s=e.querySelector("[data-overview]");s&&t.slides.forEach((i,o)=>{const c=document.createElement("button");c.type="button",c.className=`overview-item ${o===n?"active":""}`,c.setAttribute("aria-label",`Slide ${o+1}: ${vr(i.title||i.id)}`),c.addEventListener("click",()=>r(o)),c.addEventListener("keydown",m=>{const E=yr(m.key);if(E===0)return;m.preventDefault(),m.stopPropagation();const S=Array.from(s.querySelectorAll(".overview-item")),M=S.indexOf(c),D=Math.max(0,Math.min(S.length-1,M+E));S[D]?.focus()});const f=document.createElement("div"),h=ke(t.aspectRatio);f.className="overview-thumb",f.style.aspectRatio=`${h.width} / ${h.height}`;const p=document.createElement("div");p.className="overview-mini-slide",p.appendChild(Ct(t,o,"presenter")),f.appendChild(p);const u=document.createElement("span");u.className="overview-number mono",u.textContent=String(o+1).padStart(2,"0"),c.append(f,u),s.appendChild(c)})}function gr(e){e.querySelectorAll(".overview-thumb").forEach(t=>{const n=t.querySelector(".slide"),r=Number.parseFloat(n?.style.width||"1280"),s=t.clientWidth/r;t.style.setProperty("--overview-thumb-scale",String(s))})}function vr(e){return e.replace(/<[^>]*>/g,"")}function yr(e){return e==="ArrowDown"||e==="ArrowRight"?1:e==="ArrowUp"||e==="ArrowLeft"?-1:0}function wr(e,t){Object.entries(t).forEach(([n,r])=>{e.style.setProperty(n,r)})}function rt(e){return _e.find(t=>t.id===e)??_e[0]}function Sr(e,t){if(!t)return kt(e.columns,e.rows,e.areas);const n=e.areas.trim().split(`
`).map(i=>i.trim()).find(Boolean),r=n?n.replaceAll('"',"").trim().split(/\s+/).length:1,s=`"${Array.from({length:r},()=>"settings").join(" ")}"`;return kt(e.columns,e.rows.replace(/^auto\s+/,"auto auto "),e.areas.trim().replace(/^"[^"]+"/,`$&
${s}`))}function kt(e,t,n){return{"grid-template-columns":e,"grid-template-rows":t,"grid-template-areas":n}}function br(e){return C(e).replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>").replace(/\n/g,"<br />")}function Ut(e){return e==="reduced"?"Reduced":e==="paused"?"Paused":"Full"}function Ft(e){return e==="dark"?"Dark":"Light"}function kr(e){return`${e.brightness}/${e.contrast}/${e.saturation}`}function Et(e){return e==="opened"?"OPENED":e==="popup-blocked"?"BLOCKED":e==="opening"?"OPENING":e==="window-management-denied"?"DENIED":e==="window-management-unavailable"?"FALLBACK":"READY"}function Er(e){return e.length<=12?e:`${e.slice(0,6)}...${e.slice(-4)}`}function C(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function $r(e,t,n,r){e.innerHTML=`
    <main class="slideshow-stage" data-runtime-theme="${r.runtimeTheme}">
      <div data-slide-host style="${Lr(r.displayFilters)}"></div>
      <div class="slideshow-toolbar" aria-label="Slideshow controls">
        <button class="fullscreen-btn" data-action="fullscreen">
          ${document.fullscreenElement?"풀스크린 종료":"풀스크린 시작"}
        </button>
        <button class="theme-toggle-btn" data-action="theme">
          Theme: ${xr(r.runtimeTheme)}
        </button>
        <button class="motion-toggle-btn" data-action="motion">
          Motion: ${Dr(r.motionMode)}
        </button>
        <button class="display-filter-toggle-btn" data-action="display-filters" aria-expanded="${r.displayFiltersOpen}">
          Display
        </button>
      </div>
      ${r.displayFiltersOpen?`<div class="display-filter-panel" aria-label="Display filters">
              ${je("brightness","Bright",r.displayFilters.brightness)}
              ${je("contrast","Contrast",r.displayFilters.contrast)}
              ${je("saturation","Sat",r.displayFilters.saturation)}
            </div>`:""}
      <div class="fullscreen-status mono" data-fullscreen-status></div>
    </main>
  `;const s=e.querySelector("[data-slide-host]");if(s){const i=we(t,"slideshow-wrap");s.appendChild(i),ye(i.querySelector(".slide-scaler"),t,n.index,"slideshow")}e.querySelector('[data-action="fullscreen"]')?.addEventListener("click",r.onFullscreen),e.querySelector('[data-action="motion"]')?.addEventListener("click",r.onCycleMotionMode),e.querySelector('[data-action="theme"]')?.addEventListener("click",r.onCycleRuntimeTheme),e.querySelector('[data-action="display-filters"]')?.addEventListener("click",r.onToggleDisplayFilters),e.querySelectorAll("[data-filter-key]").forEach(i=>{i.addEventListener("input",()=>{const o=i.dataset.filterKey;r.onSetDisplayFilter(o,Number(i.value))})}),e.querySelector(".slideshow-stage")?.addEventListener("click",i=>{const o=i.target;o instanceof HTMLElement&&o.closest("button, input, label")||r.onNext()}),e.querySelector(".slideshow-stage")?.addEventListener("contextmenu",i=>{i.preventDefault(),r.onPrev()}),re()}function Dr(e){return e==="reduced"?"Reduced":e==="paused"?"Paused":"Full"}function xr(e){return e==="dark"?"Dark":"Light"}function je(e,t,n){return`
    <label class="filter-control">
      <span class="mono">${t}</span>
      <input type="range" min="60" max="140" step="1" value="${n}" data-filter-key="${e}" />
    </label>
  `}function Lr(e){return`filter: brightness(${e.brightness}%) contrast(${e.contrast}%) saturate(${e.saturation}%);`}const me=6e3,ge={brightness:100,contrast:100,saturation:100},$t="light",Ve={presetId:"script-first",showCurrent:!0,showNext:!0,showNotes:!0,showOverview:!0,notesFontSize:22,settingsOpen:!1};function Ar(e,t){const n=Ln(e),r=Dn(e),s=t.mount;let i=Tr(),o=Cr(e.id),c=Rr(e.id),f=Pr(e.id),h=Nr(e.id),p=null,u=!1,m="",E=!1,S="",M=!1,D="off",U=null,R="off",x=null,Z=o==="paused"?"full":o,d=Q(qr(t.mode),Xr(t.sessionId));return window.addEventListener("resize",re),document.addEventListener("keydown",de),document.addEventListener("fullscreenchange",v),document.addEventListener("visibilitychange",gt),W(d),v(),{destroy:A,getSessionId:()=>d.sessionId};function Q(a,l){const g=Ye("sender"),w=In(e.id,l,n.slides.length),O=xe(l,g,a),y={mode:a,sessionId:l,senderId:g,store:w,transport:O,unsubscribeStore:()=>{},unsubscribeTransport:()=>{},tickTimer:null,heartbeatTimer:null,lastWindowStatus:null};return y.unsubscribeStore=w.subscribe(v),y.unsubscribeTransport=O.subscribe(He=>Ne(y,He)),y.tickTimer=window.setInterval(z,250),y}function xe(a,l,g){return g==="landing"?new St:"BroadcastChannel"in window?new Nn({deckId:e.id,sessionId:a,senderId:l,from:g==="slideshow"?"slideshow":"presenter"}):new St("BroadcastChannel is not supported in this browser.")}function Y(a,l=d.sessionId){ee(d),d=Q(a,l),W(d),Hr(a,l),v()}function W(a){a.mode==="slideshow"&&(ie(a),a.transport.send({type:"hello",wantsState:!0})),a.mode==="presenter"&&(a.store.startTimer(),X(a),T(a))}function ee(a){a.unsubscribeStore(),a.unsubscribeTransport(),a.transport.close(),a.tickTimer!==null&&window.clearInterval(a.tickTimer),a.heartbeatTimer!==null&&window.clearInterval(a.heartbeatTimer)}function A(){ee(d),window.removeEventListener("resize",re),document.removeEventListener("keydown",de),document.removeEventListener("fullscreenchange",v),document.removeEventListener("visibilitychange",gt),ht(),vt()}function v(){if(document.body.dataset.mode=d.mode,document.body.dataset.motion=o,document.body.dataset.runtimeTheme=c,d.mode==="landing"){Bn(s,{deck:e,publicDeck:n,sessionId:d.sessionId,sourceKind:t.sourceKind??"url",sourceLabel:t.sourceLabel??t.deckxUrlValue??e.id,validationReport:r,motionMode:o,displayFilters:f,demoOptions:t.demoOptions??[],historyOptions:t.historyOptions??[],actions:{onStart:()=>Ie(),onPresenterOnly:()=>Y("presenter",d.sessionId),onSlideshowOnly:()=>Y("slideshow",d.sessionId),onSetMotionMode:a=>V(a),onOpenDeckxUrl:t.onOpenDeckxUrl,onOpenDeckxFile:t.onOpenDeckxFile,deckxUrlValue:t.deckxUrlValue,deckxStatus:t.deckxStatus,homeHref:t.homeHref}}),Xe();return}if(d.mode==="presenter"){cr(s,e,n,d.store.getState(),{connectionStatus:K(),windowStatus:d.lastWindowStatus,sessionId:d.sessionId,fullscreenActive:!!document.fullscreenElement,pace:ct(),notesText:qe(d.store.getState().index),notesHasDraft:mn(d.store.getState().index),validationReport:r,displayFilters:f,wakeLockStatus:Fr(D),mirrorStatus:At(R),layout:i,runtimeTheme:c,onNext:()=>$("next"),onPrev:()=>$("prev"),onGoto:a=>$("goto",a),onOpenCommand:a=>Ue(a),onEditNotes:()=>ut(),onExportNotes:()=>gn(),onPauseResume:()=>j(d.store.getState().timer.status==="paused"?"resume":"pause"),onResetTimer:()=>j("reset"),onOpenSlideshow:()=>Le(),onCopySlideshowUrl:()=>vn(),onExit:()=>Ae(),onSelectPreset:le,onToggleSettings:ce,onToggleWakeLock:()=>yn(),onToggleMirror:()=>wn(),onCycleRuntimeTheme:pe,motionMode:o,onCycleMotionMode:Ce}),Xe();return}$r(s,n,d.store.getState(),{onNext:()=>$("next"),onPrev:()=>$("prev"),onFullscreen:()=>ue(),motionMode:o,onCycleMotionMode:Ce,runtimeTheme:c,onCycleRuntimeTheme:pe,displayFilters:f,displayFiltersOpen:E,onToggleDisplayFilters:()=>{E=!E,v()},onSetDisplayFilter:dn}),Xe()}async function Ie(){Y("presenter",d.sessionId),await Le()}async function Le(){d.lastWindowStatus={type:"opening",message:"슬라이드쇼 창을 여는 중입니다."},v();const a=await qn({sessionId:d.sessionId,display:t.display??"auto",onStatus:l=>{d.lastWindowStatus=l,v()}});d.lastWindowStatus=a.status,v()}function Ae(){d.transport.send({type:"close-slideshow"}),Y("landing",Ye("session"))}function $(a,l){if(d.mode!=="landing"){if(d.mode==="presenter"){oe(d.store,a,l),X(d);return}d.transport.send({type:"nav-request",action:a,index:l}),d.store.isPeerConnected(me)||oe(d.store,a,l)}}function j(a){if(d.mode==="presenter"){d.store.applyTimerCommand(a),X(d);return}d.transport.send({type:"timer-command",action:a})}function X(a){a.mode==="presenter"&&a.transport.send({type:"state-snapshot",state:a.store.getPublicState()})}function T(a){a.mode!=="landing"&&a.transport.send({type:"runtime-preferences",motionMode:o,displayFilters:f,runtimeTheme:c})}function Ne(a,l){switch(a.store.markPeerSeen(),l.body.type){case"hello":a.mode==="presenter"&&(X(a),T(a));break;case"state-snapshot":a.mode==="slideshow"&&l.from==="presenter"&&a.store.applySnapshot(l.body.state);break;case"nav-request":a.mode==="presenter"&&(oe(a.store,l.body.action,l.body.index),X(a));break;case"timer-command":a.mode==="presenter"&&(a.store.applyTimerCommand(l.body.action),X(a));break;case"runtime-preferences":V(l.body.motionMode,{publish:!1}),l.body.displayFilters&&it(l.body.displayFilters,{publish:!1}),l.body.runtimeTheme&&lt(l.body.runtimeTheme,{publish:!1});break;case"ping":a.transport.send({type:"pong",stateVersion:a.store.getState().stateVersion}),a.mode==="presenter"&&X(a);break;case"pong":break;case"close-slideshow":a.mode==="slideshow"&&(window.close(),s.innerHTML='<div class="system-message">발표자가 슬라이드쇼를 종료했습니다.</div>');break}}function oe(a,l,g){l==="next"&&a.goto(a.getState().index+1),l==="prev"&&a.goto(a.getState().index-1),l==="goto"&&typeof g=="number"&&a.goto(g)}function ie(a){a.heartbeatTimer=window.setInterval(()=>{a.transport.send({type:"ping"}),a.store.isPeerConnected(me)||a.transport.send({type:"hello",wantsState:!0})},1e3)}function z(){d.mode!=="landing"&&(d.store.refreshPeer(me),Te())}function Te(){const a=document.querySelector("[data-clock]");a&&(a.textContent=Ur(new Date));const l=document.querySelector("[data-elapsed]");l&&(l.textContent=d.store.getElapsedLabel());const g=ct(),w=document.querySelector("[data-pace-label]");w&&(w.textContent=g.label,w.dataset.pace=g.state);const O=document.querySelector("[data-connection]");O&&(O.textContent=K());const y=document.querySelector("[data-connection-dot]");y&&(y.dataset.connected=String(d.store.isPeerConnected(me)))}function K(){return"BroadcastChannel"in window?d.store.isPeerConnected(me)?"CONNECTED":"DISCONNECTED":"UNSUPPORTED"}function le(a){const l=rt(a);i=Je({...l.layout,settingsOpen:i.settingsOpen}),Dt(i),v()}function ce(){i=Je({...i,settingsOpen:!i.settingsOpen}),Dt(i),v()}function de(a){if(d.mode!=="landing"&&!jr(a.target)){if(a.key==="ArrowRight"||a.key===" "||a.key==="PageDown"){a.preventDefault(),$("next");return}if(a.key==="ArrowLeft"||a.key==="PageUp"){a.preventDefault(),$("prev");return}if(a.key==="Home"){a.preventDefault(),$("goto",0);return}if(a.key==="End"){a.preventDefault(),$("goto",n.slides.length-1);return}if(a.key.toLowerCase()==="f"){a.preventDefault(),ue();return}if(a.key.toLowerCase()==="r"){a.preventDefault(),j("reset");return}if(a.key.toLowerCase()==="p"){a.preventDefault(),j(d.store.getState().timer.status==="paused"?"resume":"pause");return}if(a.key.toLowerCase()==="m"){a.preventDefault(),Me();return}if(a.key.toLowerCase()==="g"){a.preventDefault(),Ue("goto");return}if(a.key==="/"){a.preventDefault(),Ue("search");return}a.key.toLowerCase()==="n"&&d.mode==="presenter"&&(a.preventDefault(),ut())}}function ue(){if(document.fullscreenElement){document.exitFullscreen().catch(()=>{});return}document.documentElement.requestFullscreen({navigationUI:"hide"}).catch(()=>{const a=document.querySelector("[data-fullscreen-status]");a&&(a.textContent="풀스크린을 시작할 수 없습니다. 브라우저 권한 또는 사용자 제스처가 필요합니다.")})}function Ce(){if(o==="full"){V("reduced");return}if(o==="reduced"){V("paused");return}V("full")}function pe(){lt(c==="light"?"dark":"light")}function Me(){V(o==="paused"?Z:"paused")}function V(a,l={}){a!=="paused"&&(Z=a),a!==o&&(o=a,Mr(e.id,o),document.body.dataset.motion=o,l.publish!==!1&&T(d),v())}function dn(a,l){it({...f,[a]:Re(l,60,140)})}function it(a,l={}){f=qt(a),Ir(e.id,f),l.publish!==!1&&T(d),v()}function lt(a,l={}){a!==c&&(c=a,Or(e.id,c),document.body.dataset.runtimeTheme=c,l.publish!==!1&&T(d),v())}function ct(){const a=d.store.getState(),l=un();if(!l)return{label:"NO PLAN",detail:"NO PLAN",state:"none"};const g=Tt(a.timer)/1e3,w=dt(a.index),O=dt(a.index+1),y=20;return g<w-y?{label:"AHEAD",detail:`${Lt(g-w)} vs plan`,state:"ahead"}:g>O+y?{label:"BEHIND",detail:`${Lt(g-O)} vs plan`,state:"behind"}:{label:"ON TRACK",detail:`${Ze(g)} / ${Ze(l)}`,state:"on-track"}}function un(){if(typeof e.durationSec=="number"&&e.durationSec>0)return e.durationSec;const a=e.slides.reduce((l,g)=>l+(g.timingSec||0),0);return a>0?a:0}function dt(a){const l=e.durationSec&&e.slides.length>0?e.durationSec/e.slides.length:0;return e.slides.slice(0,a).reduce((g,w)=>g+(w.timingSec||l),0)}function Ue(a){p={mode:a,query:a==="goto"?String(d.store.getState().index+1):""},v()}function pn(){p=null,v()}function fn(){if(!p)return;if(p.mode==="goto"){const l=Number.parseInt(p.query,10);Number.isFinite(l)&&$("goto",l-1),p=null,v();return}const a=Fe(p.query)[0];a&&$("goto",a.index),p=null,v()}function Fe(a){const l=a.trim().toLowerCase();return l?e.slides.map((g,w)=>({index:w,title:Be(g.title||g.id||`Slide ${w+1}`),notes:g.notes||"",haystack:[g.title,g.body,g.notes,g.id].filter(Boolean).join(" ").toLowerCase()})).filter(g=>g.haystack.includes(l)).slice(0,8):[]}function qe(a){const l=e.slides[a];return l?h[l.id]??l.notes??"":""}function mn(a){const l=e.slides[a];return!!(l&&Object.prototype.hasOwnProperty.call(h,l.id))}function ut(){m=qe(d.store.getState().index),u=!0,v()}function pt(){u=!1,v()}function ft(){const a=e.slides[d.store.getState().index];a&&(h={...h,[a.id]:m},xt(e.id,h),u=!1,S="노트 드래프트를 저장했습니다.",v())}function hn(){const a=e.slides[d.store.getState().index];if(!a)return;const l={...h};delete l[a.id],h=l,xt(e.id,h),m=a.notes||"",u=!1,S="노트 드래프트를 원본으로 되돌렸습니다.",v()}function gn(){const a=[`# ${e.title} Speaker Notes`,"",...e.slides.flatMap((O,y)=>[`## ${y+1}. ${Be(O.title||O.id)}`,"",qe(y)||"_No speaker notes._",""])].join(`
`),l=new Blob([a],{type:"text/markdown;charset=utf-8"}),g=URL.createObjectURL(l),w=document.createElement("a");w.href=g,w.download=`${e.id}-speaker-notes.md`,w.click(),URL.revokeObjectURL(g),S="스피커 노트를 Markdown으로 내보냈습니다.",v()}async function vn(){const a=$n();try{await navigator.clipboard?.writeText(a),S="슬라이드쇼 URL을 복사했습니다."}catch{S=a}v()}async function yn(){if(U){M=!1,await ht(),D="off",v();return}M=!0,await mt(),v()}async function mt(){const a=navigator;if(!a.wakeLock){D="unsupported";return}try{U=await a.wakeLock.request("screen"),D="active",U.addEventListener("release",()=>{U=null,D="off",v()})}catch{U=null,D="denied"}}async function ht(){const a=U;U=null,a&&await a.release().catch(()=>{})}function gt(){document.visibilityState==="visible"&&M&&!U&&mt().then(v)}async function wn(){if(x||R==="fallback"){vt(),R="off",v();return}const a=navigator,l=a.mediaDevices?.getDisplayMedia;if(!l){R="fallback",v();return}try{x=await l.call(a.mediaDevices,{video:!0,audio:!1}),R="active"}catch{R="fallback"}v()}function vt(){x?.getTracks().forEach(a=>a.stop()),x=null}function Xe(){p&&Sn(),u&&bn(),d.mode==="presenter"&&R!=="off"&&kn(),S&&En()}function Sn(){if(!p)return;const a=p.mode==="search"?Fe(p.query):[],l=p.mode==="goto"?"Go to slide":"Search slides",g=p.mode==="goto"?"Slide number":"Title, body, or notes";s.insertAdjacentHTML("beforeend",`
        <div class="command-overlay" role="dialog" aria-modal="true" aria-label="${l}">
          <div class="command-box">
            <div class="command-title mono">${l}</div>
            <input class="command-input" data-command-input value="${he(p.query)}" placeholder="${g}" />
            <div class="command-results">
              ${p.mode==="search"?a.map(y=>yt(y.index,y.title,y.notes)).join("")||'<div class="command-empty">검색어를 입력하거나 결과가 없습니다.</div>':`<div class="command-empty">1-${n.slides.length} 범위의 번호를 입력하세요.</div>`}
            </div>
          </div>
        </div>
      `);const w=s.querySelector("[data-command-input]");window.requestAnimationFrame(()=>{w?.focus(),w?.setSelectionRange(0,w.value.length)}),w?.addEventListener("input",()=>{p={...p,query:w.value},O()}),w?.addEventListener("keydown",y=>{y.key==="Escape"&&(y.preventDefault(),pn()),y.key==="Enter"&&(y.preventDefault(),fn())}),s.querySelectorAll("[data-command-goto]").forEach(y=>{y.addEventListener("click",()=>{$("goto",Number(y.dataset.commandGoto)),p=null,v()})});function O(){if(p?.mode!=="search")return;const y=s.querySelector(".command-results");if(!y)return;const He=Fe(p.query);y.innerHTML=He.map(te=>yt(te.index,te.title,te.notes)).join("")||'<div class="command-empty">검색어를 입력하거나 결과가 없습니다.</div>',y.querySelectorAll("[data-command-goto]").forEach(te=>{te.addEventListener("click",()=>{$("goto",Number(te.dataset.commandGoto)),p=null,v()})})}}function yt(a,l,g){const w=Be(g).slice(0,86);return`
      <button class="command-result" data-command-goto="${a}" type="button">
        <span class="mono">${String(a+1).padStart(2,"0")}</span>
        <span>${he(l)}</span>
        <small>${he(w)}</small>
      </button>
    `}function bn(){s.insertAdjacentHTML("beforeend",`
        <div class="command-overlay" role="dialog" aria-modal="true" aria-label="Speaker notes editor">
          <div class="notes-editor-box">
            <div class="command-title mono">Speaker Notes Draft</div>
            <textarea class="notes-editor" data-notes-editor>${he(m)}</textarea>
            <div class="modal-actions">
              <button class="btn compact" data-action="notes-cancel">Cancel</button>
              <button class="btn compact" data-action="notes-reset">Reset</button>
              <button class="btn compact primary" data-action="notes-save">Save Draft</button>
            </div>
          </div>
        </div>
      `);const a=s.querySelector("[data-notes-editor]");window.requestAnimationFrame(()=>a?.focus()),a?.addEventListener("input",()=>{m=a.value}),a?.addEventListener("keydown",l=>{l.key==="Escape"&&(l.preventDefault(),pt()),l.key==="Enter"&&(l.metaKey||l.ctrlKey)&&(l.preventDefault(),ft())}),s.querySelector('[data-action="notes-cancel"]')?.addEventListener("click",pt),s.querySelector('[data-action="notes-reset"]')?.addEventListener("click",hn),s.querySelector('[data-action="notes-save"]')?.addEventListener("click",ft)}function kn(){s.insertAdjacentHTML("beforeend",`
        <aside class="audience-mirror">
          <div class="mirror-header mono">AUDIENCE MIRROR · ${At(R)}</div>
          <div class="mirror-body" data-mirror-body></div>
        </aside>
      `);const a=s.querySelector("[data-mirror-body]");if(!a)return;if(R==="active"&&x){const g=document.createElement("video");g.autoplay=!0,g.muted=!0,g.playsInline=!0,g.srcObject=x,a.appendChild(g);return}const l=we(n,"mirror-fallback-wrap");a.appendChild(l),ye(l.querySelector(".slide-scaler"),n,d.store.getState().index,"presenter"),re()}function En(){s.insertAdjacentHTML("beforeend",`<div class="transient-status mono" data-transient-status>${he(S)}</div>`),window.setTimeout(()=>{S="",document.querySelector("[data-transient-status]")?.remove()},2400)}function $n(){const a=new URL(window.location.href);return a.hash="slideshow",a.searchParams.set("sessionId",d.sessionId),a.toString()}}function Tr(){try{const e=window.localStorage.getItem("deckx-player:layout");return e?Je({...Ve,...JSON.parse(e)}):Ve}catch{return Ve}}function Dt(e){try{window.localStorage.setItem("deckx-player:layout",JSON.stringify(e))}catch{return}}function Cr(e){try{const t=window.localStorage.getItem(`deckx-player:${e}:motion`)||window.localStorage.getItem("deckx-player:motion");if(t==="full"||t==="reduced"||t==="paused")return t}catch{return"full"}return"full"}function Mr(e,t){try{window.localStorage.setItem(`deckx-player:${e}:motion`,t)}catch{return}}function Rr(e){try{const t=window.localStorage.getItem(`deckx-player:${e}:runtime-theme`)||window.localStorage.getItem("deckx-player:runtime-theme");if(t==="light"||t==="dark")return t}catch{return $t}return $t}function Or(e,t){try{window.localStorage.setItem(`deckx-player:${e}:runtime-theme`,t)}catch{return}}function Pr(e){try{const t=window.localStorage.getItem(`deckx-player:${e}:display-filters`);return t?qt(JSON.parse(t)):ge}catch{return ge}}function Ir(e,t){try{window.localStorage.setItem(`deckx-player:${e}:display-filters`,JSON.stringify(t))}catch{return}}function qt(e){return{brightness:Re(e.brightness??ge.brightness,60,140),contrast:Re(e.contrast??ge.contrast,60,140),saturation:Re(e.saturation??ge.saturation,60,140)}}function Nr(e){try{const t=window.localStorage.getItem(`deckx-player:${e}:notes-drafts`);if(!t)return{};const n=JSON.parse(t);return Object.fromEntries(Object.entries(n).filter(r=>typeof r[1]=="string"))}catch{return{}}}function xt(e,t){try{window.localStorage.setItem(`deckx-player:${e}:notes-drafts`,JSON.stringify(t))}catch{return}}function Je(e){return{...rt(e.presetId).layout,settingsOpen:!!e.settingsOpen}}function Ur(e){const t=String(e.getHours()).padStart(2,"0"),n=String(e.getMinutes()).padStart(2,"0"),r=String(e.getSeconds()).padStart(2,"0");return`${t}:${n}:${r}`}function Ze(e){const t=Math.max(0,Math.floor(e)),n=Math.floor(t/60),r=t%60;return`${String(n).padStart(2,"0")}:${String(r).padStart(2,"0")}`}function Lt(e){return`${e>=0?"+":"-"}${Ze(Math.abs(e))}`}function Fr(e){return e==="active"?"ACTIVE":e==="unsupported"?"UNSUPPORTED":e==="denied"?"DENIED":"OFF"}function At(e){return e==="active"?"ACTIVE":e==="fallback"?"FALLBACK":e==="unsupported"?"UNSUPPORTED":e==="denied"?"DENIED":"OFF"}function Be(e){return e.replace(/<[^>]*>/g,"")}function he(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Re(e,t,n){return Number.isFinite(e)?Math.min(n,Math.max(t,Math.round(e))):t}function qr(e){if(e)return e;const t=window.location.hash.replace("#",""),r=new URLSearchParams(window.location.search).get("mode")||t;return r==="presenter"||r==="slideshow"||r==="landing"?r:"landing"}function Xr(e){return e||new URLSearchParams(window.location.search).get("sessionId")||Ye("session")}function Hr(e,t){const n=new URL(window.location.href);n.hash=e,n.searchParams.set("sessionId",t),window.history.replaceState({},"",n.toString())}function jr(e){return e instanceof HTMLElement?e.isContentEditable||["INPUT","TEXTAREA","SELECT"].includes(e.tagName):!1}var N=Uint8Array,ne=Uint16Array,Vr=Int32Array,Xt=new N([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),Ht=new N([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),Br=new N([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),jt=function(e,t){for(var n=new ne(31),r=0;r<31;++r)n[r]=t+=1<<e[r-1];for(var s=new Vr(n[30]),r=1;r<30;++r)for(var i=n[r];i<n[r+1];++i)s[i]=i-n[r]<<5|r;return{b:n,r:s}},Vt=jt(Xt,2),Bt=Vt.b,Wr=Vt.r;Bt[28]=258,Wr[258]=28;var zr=jt(Ht,0),Kr=zr.b,Qe=new ne(32768);for(var b=0;b<32768;++b){var G=(b&43690)>>1|(b&21845)<<1;G=(G&52428)>>2|(G&13107)<<2,G=(G&61680)>>4|(G&3855)<<4,Qe[b]=((G&65280)>>8|(G&255)<<8)>>1}var ve=(function(e,t,n){for(var r=e.length,s=0,i=new ne(t);s<r;++s)e[s]&&++i[e[s]-1];var o=new ne(t);for(s=1;s<t;++s)o[s]=o[s-1]+i[s-1]<<1;var c;if(n){c=new ne(1<<t);var f=15-t;for(s=0;s<r;++s)if(e[s])for(var h=s<<4|e[s],p=t-e[s],u=o[e[s]-1]++<<p,m=u|(1<<p)-1;u<=m;++u)c[Qe[u]>>f]=h}else for(c=new ne(r),s=0;s<r;++s)e[s]&&(c[s]=Qe[o[e[s]-1]++]>>15-e[s]);return c}),Ee=new N(288);for(var b=0;b<144;++b)Ee[b]=8;for(var b=144;b<256;++b)Ee[b]=9;for(var b=256;b<280;++b)Ee[b]=7;for(var b=280;b<288;++b)Ee[b]=8;var Wt=new N(32);for(var b=0;b<32;++b)Wt[b]=5;var Gr=ve(Ee,9,1),Yr=ve(Wt,5,1),We=function(e){for(var t=e[0],n=1;n<e.length;++n)e[n]>t&&(t=e[n]);return t},q=function(e,t,n){var r=t/8|0;return(e[r]|e[r+1]<<8)>>(t&7)&n},ze=function(e,t){var n=t/8|0;return(e[n]|e[n+1]<<8|e[n+2]<<16)>>(t&7)},_r=function(e){return(e+7)/8|0},st=function(e,t,n){return(t==null||t<0)&&(t=0),(n==null||n>e.length)&&(n=e.length),new N(e.subarray(t,n))},Jr=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],I=function(e,t,n){var r=new Error(t||Jr[e]);if(r.code=e,Error.captureStackTrace&&Error.captureStackTrace(r,I),!n)throw r;return r},Zr=function(e,t,n,r){var s=e.length,i=r?r.length:0;if(!s||t.f&&!t.l)return n||new N(0);var o=!n,c=o||t.i!=2,f=t.i;o&&(n=new N(s*3));var h=function(pe){var Me=n.length;if(pe>Me){var V=new N(Math.max(Me*2,pe));V.set(n),n=V}},p=t.f||0,u=t.p||0,m=t.b||0,E=t.l,S=t.d,M=t.m,D=t.n,U=s*8;do{if(!E){p=q(e,u,1);var R=q(e,u+1,3);if(u+=3,R)if(R==1)E=Gr,S=Yr,M=9,D=5;else if(R==2){var Q=q(e,u,31)+257,xe=q(e,u+10,15)+4,Y=Q+q(e,u+5,31)+1;u+=14;for(var W=new N(Y),ee=new N(19),A=0;A<xe;++A)ee[Br[A]]=q(e,u+A*3,7);u+=xe*3;for(var v=We(ee),Ie=(1<<v)-1,Le=ve(ee,v,1),A=0;A<Y;){var Ae=Le[q(e,u,Ie)];u+=Ae&15;var x=Ae>>4;if(x<16)W[A++]=x;else{var $=0,j=0;for(x==16?(j=3+q(e,u,3),u+=2,$=W[A-1]):x==17?(j=3+q(e,u,7),u+=3):x==18&&(j=11+q(e,u,127),u+=7);j--;)W[A++]=$}}var X=W.subarray(0,Q),T=W.subarray(Q);M=We(X),D=We(T),E=ve(X,M,1),S=ve(T,D,1)}else I(1);else{var x=_r(u)+4,Z=e[x-4]|e[x-3]<<8,d=x+Z;if(d>s){f&&I(0);break}c&&h(m+Z),n.set(e.subarray(x,d),m),t.b=m+=Z,t.p=u=d*8,t.f=p;continue}if(u>U){f&&I(0);break}}c&&h(m+131072);for(var Ne=(1<<M)-1,oe=(1<<D)-1,ie=u;;ie=u){var $=E[ze(e,u)&Ne],z=$>>4;if(u+=$&15,u>U){f&&I(0);break}if($||I(2),z<256)n[m++]=z;else if(z==256){ie=u,E=null;break}else{var Te=z-254;if(z>264){var A=z-257,K=Xt[A];Te=q(e,u,(1<<K)-1)+Bt[A],u+=K}var le=S[ze(e,u)&oe],ce=le>>4;le||I(3),u+=le&15;var T=Kr[ce];if(ce>3){var K=Ht[ce];T+=ze(e,u)&(1<<K)-1,u+=K}if(u>U){f&&I(0);break}c&&h(m+131072);var de=m+Te;if(m<T){var ue=i-T,Ce=Math.min(T,de);for(ue+m<0&&I(3);m<Ce;++m)n[m]=r[ue+m]}for(;m<de;++m)n[m]=n[m-T]}}t.l=E,t.p=ie,t.b=m,t.f=p,E&&(p=1,t.m=M,t.d=S,t.n=D)}while(!p);return m!=n.length&&o?st(n,0,m):n.subarray(0,m)},Qr=new N(0),H=function(e,t){return e[t]|e[t+1]<<8},F=function(e,t){return(e[t]|e[t+1]<<8|e[t+2]<<16|e[t+3]<<24)>>>0},Ke=function(e,t){return F(e,t)+F(e,t+4)*4294967296};function es(e,t){return Zr(e,{i:2},t&&t.out,t&&t.dictionary)}var et=typeof TextDecoder<"u"&&new TextDecoder,ts=0;try{et.decode(Qr,{stream:!0}),ts=1}catch{}var ns=function(e){for(var t="",n=0;;){var r=e[n++],s=(r>127)+(r>223)+(r>239);if(n+s>e.length)return{s:t,r:st(e,n-1)};s?s==3?(r=((r&15)<<18|(e[n++]&63)<<12|(e[n++]&63)<<6|e[n++]&63)-65536,t+=String.fromCharCode(55296|r>>10,56320|r&1023)):s&1?t+=String.fromCharCode((r&31)<<6|e[n++]&63):t+=String.fromCharCode((r&15)<<12|(e[n++]&63)<<6|e[n++]&63):t+=String.fromCharCode(r)}};function zt(e,t){if(t){for(var n="",r=0;r<e.length;r+=16384)n+=String.fromCharCode.apply(null,e.subarray(r,r+16384));return n}else{if(et)return et.decode(e);var s=ns(e),i=s.s,n=s.r;return n.length&&I(8),i}}var rs=function(e,t){return t+30+H(e,t+26)+H(e,t+28)},ss=function(e,t,n){var r=H(e,t+28),s=H(e,t+30),i=zt(e.subarray(t+46,t+46+r),!(H(e,t+8)&2048)),o=t+46+r,c=as(e,o,s,n,F(e,t+20),F(e,t+24),F(e,t+42)),f=c[0],h=c[1],p=c[2];return[H(e,t+10),f,h,i,o+s+H(e,t+32),p]},as=function(e,t,n,r,s,i,o){var c=s==4294967295,f=i==4294967295,h=o==4294967295,p=t+n,u=c+f+h;if(r&&u){for(;t+4<p;t+=4+H(e,t+2))if(H(e,t)==1)return[c?Ke(e,t+4+8*f):s,f?Ke(e,t+4):i,h?Ke(e,t+4+8*(f+c)):o,1];r<2&&I(13)}return[s,i,o,0]};function os(e,t){for(var n={},r=e.length-22;F(e,r)!=101010256;--r)(!r||e.length-r>65558)&&I(13);var s=H(e,r+8);if(!s)return{};var i=F(e,r+16),o=F(e,r-20)==117853008;if(o){var c=F(e,r-12);o=F(e,c)==101075792,o&&(s=F(e,c+32),i=F(e,c+48))}for(var f=0;f<s;++f){var h=ss(e,i,o),p=h[0],u=h[1],m=h[2],E=h[3],S=h[4],M=h[5],D=rs(e,M);i=S,p?p==8?n[E]=es(e.subarray(D,D+u),{out:new N(m)}):I(14,"unknown compression type "+p):n[E]=st(e,D,D+u)}return n}const is="deckx.deck.v1";async function ls(e){const t=new URL(e,window.location.href).toString(),n=await fetch(t);if(!n.ok)throw new Error(`DeckX package fetch failed (${n.status} ${n.statusText}).`);return Kt(new Uint8Array(await n.arrayBuffer()),t)}function Kt(e,t="inline.deckx"){const n=ys(os(e));return cs(n,t)}function cs(e,t){const n=ws(e);if(!n)throw new Error("DeckX package is missing manifest.json.");const r=hs(Oe(e,n),n),s=tt(n),i=[],o=h=>{const p=e[h];if(!p)throw new Error(`DeckX asset is missing: ${h}`);const u=p.buffer.slice(p.byteOffset,p.byteOffset+p.byteLength),m=URL.createObjectURL(new Blob([u],{type:ks(h)}));return i.push(m),m},c=r.theme?.css?Gt(Oe(e,se(s,r.theme.css)),tt(se(s,r.theme.css)),o):"";return{deck:{id:r.id,title:r.title,aspectRatio:r.aspectRatio,durationSec:r.durationSec,theme:{name:"DeckX Package",className:`deckx-package-${bs(r.id)}`},metadata:ds(r.metadata,s,o),slides:r.slides.map(h=>us(h,e,s,o))},cssText:c,sourceUrl:t,dispose:()=>{i.forEach(h=>URL.revokeObjectURL(h))}}}function ds(e,t,n){if(e)return{version:e.version,description:e.description,authors:e.authors?.map(r=>({...r})),tags:e.tags?[...e.tags]:void 0,language:e.language,license:e.license,homepage:e.homepage,repository:e.repository,thumbnail:e.thumbnail?n(se(t,e.thumbnail)):void 0,createdAt:e.createdAt,updatedAt:e.updatedAt,generator:e.generator?{...e.generator}:void 0,custom:e.custom?{...e.custom}:void 0}}function us(e,t,n,r){const s=se(n,e.source),i=e.notes?se(n,e.notes):null,o=ps(Oe(t,s),tt(s),r);return{id:e.id,title:e.title,notes:i&&t[i]?Oe(t,i):void 0,footer:e.footer,className:e.className,timingSec:e.timingSec,render:()=>o}}function ps(e,t,n){if(/<\/?(html|head|body)\b/i.test(e))throw new Error("DeckX slide HTML must be a fragment, not a full document.");const r=document.createElement("template");if(r.innerHTML=e,r.content.querySelector("script"))throw new Error("Safe DeckX slides cannot include <script>.");return r.content.querySelectorAll("*").forEach(s=>{Array.from(s.attributes).forEach(i=>{const o=i.name.toLowerCase(),c=i.value;if(o.startsWith("on"))throw new Error("Safe DeckX slides cannot include inline event handlers.");if(o==="style"){s.setAttribute(o,Gt(c,t,n));return}if(o==="src"||o==="poster"||fs(s,o,c)){s.setAttribute(o,at(c,t,n));return}o==="srcset"&&s.setAttribute(o,ms(c,t,n))})}),r.innerHTML}function fs(e,t,n){return!(t!=="href"&&t!=="xlink:href"||e.tagName.toLowerCase()==="a"&&ot(n))}function ms(e,t,n){return e.split(",").map(r=>{const s=r.trim().split(/\s+/);return s[0]?(s[0]=at(s[0],t,n),s.join(" ")):""}).filter(Boolean).join(", ")}function Gt(e,t,n){return e.replace(/url\(\s*(['"]?)([^'")]+)\1\s*\)/gi,(r,s,i)=>{if(_t(i))return`url("${i}")`;if(ot(i))throw new Error(`Safe DeckX CSS cannot reference external assets: ${i}`);return`url("${at(i,t,n)}")`})}function at(e,t,n){if(_t(e))return e;if(ot(e))throw new Error(`Safe DeckX slides cannot reference external assets: ${e}`);const r=e.indexOf("#"),s=r>=0?e.slice(r):"",i=r>=0?e.slice(0,r):e,o=se(t,i.split("?")[0]);return`${n(o)}${s}`}function hs(e,t){const n=JSON.parse(e);if(!_(n))throw new Error(`${t} must contain a JSON object.`);if(n.schemaVersion!==is)throw new Error(`Unsupported DeckX schemaVersion: ${String(n.schemaVersion)}`);if(!ae(n.id))throw new Error("DeckX manifest is missing id.");if(!ae(n.title))throw new Error("DeckX manifest is missing title.");if(!Ss(n.aspectRatio))throw new Error("DeckX manifest has invalid aspectRatio.");if(!Array.isArray(n.slides)||n.slides.length===0)throw new Error("DeckX manifest must include at least one slide.");return n.metadata!==void 0&&gs(n.metadata),n.slides.forEach((r,s)=>vs(r,s)),n}function gs(e){if(!_(e))throw new Error("DeckX manifest metadata must be an object.");const t=e;if(["version","description","language","license","homepage","repository","thumbnail","createdAt","updatedAt"].forEach(n=>{if(t[n]!==void 0&&typeof t[n]!="string")throw new Error(`DeckX metadata.${n} must be a string.`)}),t.tags!==void 0&&(!Array.isArray(t.tags)||!t.tags.every(n=>typeof n=="string")))throw new Error("DeckX metadata.tags must be an array of strings.");if(t.authors!==void 0){if(!Array.isArray(t.authors))throw new Error("DeckX metadata.authors must be an array.");t.authors.forEach((n,r)=>{if(!_(n)||!ae(n.name))throw new Error(`DeckX metadata.authors[${r}] must include name.`)})}if(t.generator!==void 0&&(!_(t.generator)||!ae(t.generator.name)))throw new Error("DeckX metadata.generator must include name.");if(t.custom!==void 0&&!_(t.custom))throw new Error("DeckX metadata.custom must be an object.")}function vs(e,t){if(!_(e))throw new Error(`DeckX slide ${t+1} must be an object.`);if(!ae(e.id))throw new Error(`DeckX slide ${t+1} is missing id.`);if(!ae(e.source))throw new Error(`DeckX slide ${t+1} is missing source.`)}function ys(e){const t={};return Object.entries(e).forEach(([n,r])=>{n.endsWith("/")||(t[Yt(n)]=r)}),t}function ws(e){if(e["manifest.json"])return"manifest.json";const t=Object.keys(e).filter(n=>n.endsWith("/manifest.json"));return t.length===1?t[0]:null}function Oe(e,t){const n=e[t];if(!n)throw new Error(`DeckX package entry is missing: ${t}`);return zt(n)}function se(e,t){return Yt([e,t].filter(Boolean).join("/"))}function Yt(e){const t=e.replaceAll("\\","/");if(!t||t.startsWith("/")||t.includes("\0"))throw new Error(`Invalid DeckX package path: ${e}`);const n=[];if(t.split("/").forEach(r=>{if(!(!r||r===".")){if(r===".."){if(n.length===0)throw new Error(`DeckX package path escapes root: ${e}`);n.pop();return}n.push(r)}}),n.length===0)throw new Error(`Invalid DeckX package path: ${e}`);return n.join("/")}function tt(e){const t=e.lastIndexOf("/");return t===-1?"":e.slice(0,t)}function _(e){return typeof e=="object"&&e!==null}function ae(e){return typeof e=="string"&&e.trim().length>0}function Ss(e){return e==="16:9"||e==="4:3"?!0:_(e)&&typeof e.width=="number"&&typeof e.height=="number"&&Number.isFinite(e.width)&&Number.isFinite(e.height)&&e.width>0&&e.height>0}function _t(e){return e.startsWith("#")||e.startsWith("data:")||e.startsWith("blob:")||e.startsWith("mailto:")||e.startsWith("tel:")}function ot(e){return/^[a-z][a-z0-9+.-]*:/i.test(e)||e.startsWith("//")}function bs(e){return e.toLowerCase().replace(/[^a-z0-9-]+/g,"-").replace(/^-+|-+$/g,"")||"deck"}function ks(e){const t=e.toLowerCase();return t.endsWith(".svg")?"image/svg+xml":t.endsWith(".png")?"image/png":t.endsWith(".jpg")||t.endsWith(".jpeg")?"image/jpeg":t.endsWith(".gif")?"image/gif":t.endsWith(".webp")?"image/webp":t.endsWith(".css")?"text/css":t.endsWith(".html")?"text/html":t.endsWith(".md")?"text/markdown":"application/octet-stream"}function Es(e,t){e.innerHTML=`
    <main class="project-landing">
      <header class="project-nav">
        <a class="project-mark" href="/">
          <img class="brand-icon" src="/brand/deckx-icon.svg" alt="" aria-hidden="true" />
          <span>DeckX Player</span>
        </a>
        <nav class="project-nav-links" aria-label="Landing sections">
          <a href="#ai-native">AI Native</a>
          <a href="#deckx">DeckX</a>
          <a href="#concepts">개념</a>
          <a href="#samples">샘플</a>
        </nav>
        <a class="btn compact" href="${B(t.playerHref)}">플레이어 열기</a>
      </header>

      <section class="project-hero">
        <div class="project-hero-copy">
          <span class="badge mono">AI-NATIVE HTML DECKS</span>
          <h1>AI가 만든 HTML을 그대로 발표하세요</h1>
          <p>
            동적인 콘텐츠는 PPT로 다시 옮기는 순간 표현력이 줄어듭니다. DeckX Player는
            LLM과 agent가 만든 HTML 발표를 <code>.deckx</code> 패키지로 고정하고,
            URL이나 로컬 zip에서 열어 발표자뷰와 슬라이드쇼로 바로 실행합니다.
          </p>
          <div class="project-hero-points" aria-label="DeckX positioning">
            <span>HTML 그대로 사용</span>
            <span>모션 중심 발표</span>
            <span>Agent-native authoring</span>
          </div>
          <div class="project-actions">
            <a class="btn primary" href="${B(t.playerHref)}">플레이어 열기</a>
            <a class="btn" href="${B(t.defaultDemoHref)}">움직이는 샘플 보기</a>
          </div>
        </div>
        <div class="project-product-preview" aria-label="DeckX Player preview">
          <div class="preview-chrome">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div class="preview-layout">
            <aside>
              <strong>DeckX 열기</strong>
              <span>Recent DeckX</span>
              <span>Official Samples</span>
              <span>Uploads</span>
            </aside>
            <section>
              <div class="preview-slide">
                <div class="preview-status-row">
                  <small>LIVE DECKX</small>
                  <em>Full motion</em>
                </div>
                <strong>HTML motion deck</strong>
                <div class="preview-motion-scene" aria-hidden="true">
                  <div class="preview-flow-line"></div>
                  <div class="preview-flow-line"></div>
                  <div class="preview-flow-line"></div>
                  <div class="preview-metric-bars">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
              <div class="preview-actions">
                <span>발표 시작</span>
                <span>모션 제어</span>
              </div>
            </section>
          </div>
        </div>
      </section>

      <section class="project-section project-open-section">
        <form class="project-open" data-project-deckx-form>
          <label for="project-deckx-url">DeckX URL 빠르게 열기</label>
          <div class="project-open-row">
            <input
              id="project-deckx-url"
              data-project-deckx-input
              type="text"
              inputmode="url"
              autocomplete="url"
              value="${B(t.deckxUrlValue)}"
              aria-label="DeckX URL"
            />
            <button class="btn primary" type="submit">열기</button>
          </div>
        </form>
      </section>

      <section class="project-section" id="ai-native">
        <div class="section-heading">
          <p class="mono">WHY NOW</p>
          <h2>AI 시대에는 PPT보다 HTML이 자연스럽습니다</h2>
          <span class="section-lead">
            Claude Artifacts, coding agent, HTML prototype 흐름이 이미 콘텐츠 제작 방식을 바꾸고 있습니다.
            문제는 만든 HTML을 매번 발표용으로 묶고, 검증하고, 다시 여는 일이 귀찮다는 점입니다.
          </span>
        </div>
        <div class="info-grid">
          <article>
            <strong>PPT 변환 없이</strong>
            <span>LLM이 만든 HTML/CSS 결과물을 이미지나 슬라이드 캡처로 죽이지 않고 원본 표현 그대로 발표합니다.</span>
          </article>
          <article>
            <strong>모션 중심</strong>
            <span>CSS animation, transition, 데이터 흐름, 단계적 reveal을 발표자가 Full, Reduced, Paused로 제어합니다.</span>
          </article>
          <article>
            <strong>Agent-native</strong>
            <span>DeckX 작성 규칙과 검증 스크립트를 skill로 제공해 LLM agent가 덱을 만들고 바로 플레이어에서 확인하게 합니다.</span>
          </article>
        </div>
      </section>

      <section class="project-section" id="deckx">
        <div class="section-heading">
          <p class="mono">DeckX FORMAT</p>
          <h2>DeckX는 HTML 발표를 교환 가능한 파일로 만드는 포맷입니다</h2>
          <span class="section-lead">
            DeckX는 새 파일 포맷입니다. HTML 슬라이드, 발표자 노트, 스타일, 이미지 자산,
            메타데이터를 하나의 <code>.deckx</code> zip으로 묶고 플레이어가 동일한 런타임 계약으로 엽니다.
          </span>
        </div>
        <div class="project-format-grid">
          <pre class="deckx-tree" aria-label="DeckX package structure"><code>my-talk.deckx
  manifest.json
  slides/
    001-intro.html
    002-demo.html
  notes/
    001-intro.md
  styles/
    theme.css
  assets/
    hero.png</code></pre>
          <div class="info-grid format-cards">
            <article>
              <strong>파일 경계</strong>
              <span><code>manifest.json</code>, slides, notes, styles, assets를 하나의 <code>.deckx</code> zip으로 묶습니다.</span>
            </article>
            <article>
              <strong>URL 입력</strong>
              <span>플레이어는 <code>?deck=&lt;url&gt;</code>을 읽고 같은 런타임에 어떤 DeckX 덱이든 로드합니다.</span>
            </article>
            <article>
              <strong>안전한 기본값</strong>
              <span>일반 DeckX는 script 없는 Safe Deck이며 발표자 노트는 슬라이드쇼에서 제외됩니다.</span>
            </article>
            <article>
              <strong>검증 가능</strong>
              <span>schema, asset path, notes coverage, overflow를 검사해 발표 파일을 재현 가능한 단위로 다룹니다.</span>
            </article>
          </div>
        </div>
      </section>

      <section class="project-section">
        <div class="section-heading">
          <p class="mono">PLAYER FLOW</p>
          <h2>패키징 반복을 플레이어가 흡수합니다</h2>
          <span class="section-lead">
            HTML을 발표 파일처럼 쓰려면 zip, URL, 첫 화면 확인, 발표자뷰, 관객 화면, 모션 옵션을 매번 맞춰야 합니다.
            DeckX Player는 이 반복 작업을 하나의 열기 흐름으로 묶습니다.
          </span>
        </div>
        <div class="info-grid modes">
          <article>
            <strong>열기 전</strong>
            <span>DeckX URL, 로컬 zip, 최근 DeckX, 공식 샘플 중 하나를 선택합니다.</span>
          </article>
          <article>
            <strong>열었을 때</strong>
            <span>첫 슬라이드 미리보기와 발표 시작 버튼을 중심으로 표시합니다.</span>
          </article>
          <article>
            <strong>상세 정보</strong>
            <span>validation, notes, session 같은 DeckX 메타는 필요할 때만 펼쳐봅니다.</span>
          </article>
        </div>
      </section>

      <section class="project-section" id="concepts">
        <div class="section-heading">
          <p class="mono">DeckX BASICS</p>
          <h2>DeckX를 이해하는 네 가지 질문</h2>
          <span class="section-lead">
            DeckX는 처음 보는 포맷이므로 먼저 용어가 분명해야 합니다. 발표자는 새 편집기를 배우는 것이 아니라,
            HTML 발표를 파일처럼 열고 운영하는 방식을 이해하면 됩니다.
          </span>
        </div>
        <div class="project-answer-block">
          <strong>DeckX란?</strong>
          <span>
            DeckX는 HTML 기반 발표를 교환 가능한 패키지로 만들고, 같은 플레이어에서 재생하기 위한
            포맷과 런타임의 이름입니다.
          </span>
        </div>
        <div class="project-answer-block">
          <strong>DeckX Player란?</strong>
          <span>
            DeckX Player는 <code>.deckx</code> HTML presentation package를 열어 미리보기,
            발표자뷰, 슬라이드쇼, 발표자 노트, 모션 제어를 제공하는 웹 기반 발표 런타임입니다.
          </span>
        </div>
        <div class="project-answer-block">
          <strong>DeckX package란?</strong>
          <span>
            DeckX package는 <code>manifest.json</code>, HTML slides, Markdown speaker notes,
            styles, assets를 하나로 묶은 zip 기반 <code>.deckx</code> 발표 파일입니다.
          </span>
        </div>
        <div class="project-answer-block">
          <strong>뭐가 좋은가요?</strong>
          <span>
            PPT로 다시 옮기지 않아도 HTML의 모션과 레이아웃을 그대로 발표할 수 있고,
            발표자 노트와 자산까지 하나의 파일 또는 URL로 공유할 수 있습니다.
          </span>
        </div>
        <div class="info-grid modes">
          <article>
            <strong>HTML 표현력 유지</strong>
            <span>CSS motion, 데이터 흐름, 인터랙티브한 레이아웃을 이미지 캡처로 죽이지 않고 발표합니다.</span>
          </article>
          <article>
            <strong>발표 운영 내장</strong>
            <span>미리보기, 발표자뷰, 슬라이드쇼, 노트, 타이머, 모션 제어를 플레이어가 담당합니다.</span>
          </article>
          <article>
            <strong>공유 가능한 파일</strong>
            <span><code>.deckx</code> zip이나 URL로 전달해 같은 런타임에서 다시 열고 발표할 수 있습니다.</span>
          </article>
        </div>
      </section>

      <section class="project-section">
        <div class="section-heading">
          <p class="mono">MOTION</p>
          <h2>Full, Reduced, Paused</h2>
        </div>
        <div class="info-grid modes">
          <article>
            <strong>Full</strong>
            <span>덱 CSS animation과 transition을 그대로 재생합니다.</span>
          </article>
          <article>
            <strong>Reduced</strong>
            <span>모션을 거의 즉시 끝나게 줄여 발표장 환경이나 접근성 요구에 맞춥니다.</span>
          </article>
          <article>
            <strong>Paused</strong>
            <span>모든 CSS animation을 일시정지합니다. 모션 데모 검토나 발표 중 정지에 유용합니다.</span>
          </article>
        </div>
      </section>

      <section class="project-section" id="samples">
        <div class="section-heading">
          <p class="mono">OFFICIAL SAMPLES</p>
          <h2>움직이는 DeckX를 바로 열어볼 수 있습니다</h2>
          <span class="section-lead">
            공식 샘플은 사용자 히스토리와 분리됩니다. 모션, 정적 설명, 4:3 캔버스, 이미지 자산,
            롱덱 탐색을 같은 런타임에서 비교할 수 있습니다.
          </span>
        </div>
        <div class="project-demo-grid">
          ${t.demoOptions.map($s).join("")}
        </div>
      </section>

      <section class="project-section" id="workspace">
        <div class="section-heading">
          <p class="mono">NEXT STRATEGY</p>
          <h2>먼저 AI가 읽고 만들기 쉬운 경로를 검토합니다</h2>
        </div>
        <div class="info-grid modes">
          <article>
            <strong><code>llms.txt</code> 검토</strong>
            <span>DeckX 정의, package spec, 작성 가이드, 샘플 URL을 LLM이 빠르게 읽도록 공개 문서 구조를 정리할 수 있습니다.</span>
          </article>
          <article>
            <strong>MCP와 skill 검토</strong>
            <span>DeckX authoring skill, validation script, 샘플 생성 흐름을 agent-native 제작 경험으로 제공할지 먼저 검증합니다.</span>
          </article>
          <article>
            <strong>팀 기능은 이후</strong>
            <span>SSO, 업로드, 팀 이력은 아직 구현된 기능이 아니며, 제품화 이후 확장 후보로만 다룹니다.</span>
          </article>
        </div>
      </section>
    </main>
  `;const n=e.querySelector("[data-project-deckx-form]");n?.addEventListener("submit",r=>{r.preventDefault();const i=n.querySelector("[data-project-deckx-input]")?.value.trim();i&&t.onOpenDeckxUrl(i)})}function $s(e){return`
    <article class="project-demo-card">
      <div>
        <h3>${B(e.label)}</h3>
        <p>${B(e.description)}</p>
        <span>${B(e.detail)}</span>
      </div>
      <code>${B(e.url)}</code>
      <a class="btn compact" href="${B(e.href)}">플레이어에서 열기</a>
    </article>
  `}function B(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}const Jt=document.getElementById("app");if(!Jt)throw new Error("Missing #app mount element");const $e=Jt,Zt="deckx-package-style",Qt="deckx-player:history:v1",Ds=8,J=[{id:"dogfood",label:"DeckX zip 데모",description:"public/decks/deckx-player-demo.deckx 파일을 그대로 로드",detail:"이 프로젝트 자체를 DeckX package로 설명하는 도그푸딩 덱입니다.",url:"/decks/deckx-player-demo.deckx"},{id:"static",label:"정적 프레임워크 데모",description:"Deck/Runtime 경계를 설명하는 DeckX 샘플",detail:"텍스트 중심 발표가 기본 플레이어 기능과 어떻게 결합되는지 확인합니다.",url:"/decks/static-demo.deckx"},{id:"motion",label:"모션 그래픽 데모",description:"같은 런타임에 CSS motion DeckX를 교체한 샘플",detail:"CSS animation이 포함된 덱에서 Full, Reduced, Paused 차이를 확인합니다.",url:"/decks/motion-demo.deckx"},{id:"classic",label:"4:3 캔버스 데모",description:"DeckX aspectRatio가 렌더러에 반영되는 샘플",detail:"16:9가 아닌 DeckX canvas도 발표자뷰와 슬라이드쇼에 동일하게 반영됩니다.",url:"/decks/classic-4x3-demo.deckx"},{id:"image-heavy",label:"이미지 헤비 데모",description:"96개 package-local 이미지를 로드하는 asset stress 샘플",detail:"이미지가 많은 DeckX에서 preview, overview, object URL 처리 비용을 확인합니다.",url:"/decks/image-heavy-demo.deckx"},{id:"long-120",label:"120장 롱덱 데모",description:"많은 페이지에서 goto, search, overview 사용성을 확인하는 샘플",detail:"120장 DeckX를 통해 발표자뷰 썸네일 목록과 키보드 탐색 한계를 관찰합니다.",url:"/decks/long-120-demo.deckx"},{id:"long-image",label:"120장 이미지 롱덱 데모",description:"긴 DeckX와 package-local 이미지를 함께 로드하는 stress 샘플",detail:"120장 전체에 이미지가 포함된 DeckX로 탐색, 검색, 썸네일, asset 처리를 함께 관찰합니다.",url:"/decks/long-image-demo.deckx"}];let Se=null,be=null;window.addEventListener("beforeunload",()=>{Se?.destroy(),be?.dispose()});xs();async function xs(){if(!Ps()){if(Is()){window.location.replace(Ns());return}Ls();return}const e=Cs();if(document.body.dataset.page="player",!e){As();return}ln("DeckX deck loading...");try{await Ts(e)}catch(t){De(),cn(t)}}function Ls(){document.body.dataset.page="project",delete document.body.dataset.mode,De(),Es($e,{deckxUrlValue:new URL(J[0].url,window.location.href).toString(),playerHref:"/player",defaultDemoHref:Ge(J[0].url),demoOptions:J.map(e=>({id:e.id,label:e.label,description:e.description,detail:e.detail,url:e.url,href:Ge(e.url)})),onOpenDeckxUrl:e=>{window.location.assign(Ge(e))}})}function As(e=""){document.body.dataset.page="player",document.body.dataset.mode="landing",De(),Se?.destroy(),Se=null,be?.dispose(),be=null,Vn($e,{homeHref:"/",demoOptions:nn(null),historyOptions:rn(),actions:{onOpenDeckxUrl:on,onOpenDeckxFile:en,deckxUrlValue:"",deckxStatus:e,homeHref:"/"}})}async function Ts(e){const t=await ls(e.url),n=new URL(e.url,window.location.href).toString(),r=e.kind,s=e.kind==="demo"?J.find(i=>i.id===e.id)?.label??t.deck.title:n;e.kind==="url"&&sn({kind:"url",label:t.deck.title,detail:n,url:n}),tn(t,{source:e,sourceKind:r,sourceLabel:s,deckxUrlValue:n})}async function en(e){ln("Local DeckX zip loading...");try{const t=Kt(new Uint8Array(await e.arrayBuffer()),e.name);sn({kind:"zip",label:t.deck.title,detail:e.name}),window.history.replaceState(null,"","/player#landing"),tn(t,{source:{id:"local-zip",url:e.name,kind:"url"},sourceKind:"zip",sourceLabel:e.name,deckxUrlValue:""})}catch(t){De(),cn(t)}}function tn(e,t){Se?.destroy(),be?.dispose(),be=e,Rs(e.cssText,e.sourceUrl),Se=Ar(e.deck,{mount:$e,demoOptions:nn(t.source),historyOptions:rn(),sourceKind:t.sourceKind,sourceLabel:t.sourceLabel,deckxUrlValue:t.deckxUrlValue,onOpenDeckxUrl:on,onOpenDeckxFile:en,homeHref:"/"})}function Cs(){const t=new URLSearchParams(window.location.search).get("deck");if(t){const n=J.find(r=>Os(r.url,t));return{id:n?.id??"deckx-url",url:t,kind:n?"demo":"url"}}return null}function nn(e){return J.map(t=>({id:t.id,label:t.label,description:t.description,href:Pe(t.url),active:t.id===e?.id}))}function Pe(e){const t=new URL(window.location.href);return t.searchParams.set("deck",e),t.searchParams.delete("deckx"),t.searchParams.delete("sessionId"),t.hash="landing",`${t.pathname}${t.search}${t.hash}`}function rn(){return an().map(e=>({id:e.id,kind:e.kind,label:e.label,detail:e.detail,href:e.kind==="url"&&e.url?Pe(e.url):void 0}))}function sn(e){const t=e.kind==="url"&&e.url?`url:${e.url}`:`zip:${e.detail}`,n={id:t,kind:e.kind,label:e.label,detail:e.detail,url:e.url,openedAtEpochMs:Date.now()},r=an().filter(s=>s.id!==t);Ms([n,...r].slice(0,Ds))}function an(){try{const e=window.localStorage.getItem(Qt);if(!e)return[];const t=JSON.parse(e);return Array.isArray(t)?t.filter(Us).sort((n,r)=>r.openedAtEpochMs-n.openedAtEpochMs):[]}catch{return[]}}function Ms(e){try{window.localStorage.setItem(Qt,JSON.stringify(e))}catch{}}function Ge(e){const t=new URL("/player",window.location.href);return t.searchParams.set("deck",e),t.hash="landing",`${t.pathname}${t.search}${t.hash}`}function on(e){window.location.assign(Pe(e))}function Rs(e,t){if(De(),!e.trim())return;const n=document.createElement("style");n.id=Zt,n.dataset.deckxSource=t,n.textContent=e,document.head.appendChild(n)}function De(){document.getElementById(Zt)?.remove()}function Os(e,t){return new URL(e,window.location.href).toString()===new URL(t,window.location.href).toString()}function Ps(){return window.location.pathname.replace(/\/+$/,"")==="/player"}function Is(){const e=window.location.hash;return new URLSearchParams(window.location.search).has("deck")||e==="#landing"||e==="#presenter"||e==="#slideshow"}function Ns(){const e=new URL(window.location.href);return e.pathname="/player",`${e.pathname}${e.search}${e.hash||"#landing"}`}function ln(e){$e.innerHTML=`<main class="system-message">${nt(e)}</main>`}function cn(e){const t=e instanceof Error?e.message:String(e);$e.innerHTML=`
    <main class="system-message">
      <div class="load-error">
        <strong>DeckX deck load failed</strong>
        <span>${nt(t)}</span>
        <a class="btn" href="${nt(Pe(J[0].url))}">기본 데모 열기</a>
      </div>
    </main>
  `}function nt(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Us(e){if(!e||typeof e!="object")return!1;const t=e;return(t.kind==="url"||t.kind==="zip")&&typeof t.id=="string"&&typeof t.label=="string"&&typeof t.detail=="string"&&typeof t.openedAtEpochMs=="number"&&(t.url===void 0||typeof t.url=="string")}
