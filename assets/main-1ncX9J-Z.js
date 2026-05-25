(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(a){if(a.ep)return;a.ep=!0;const i=n(a);fetch(a.href,i)}})();function Mn(e){const t=[],n=new Set;let r=0;e.slides.length||t.push({code:"empty-deck",severity:"error",message:"Deck must contain at least one slide."}),Cn(e.aspectRatio)||t.push({code:"invalid-canvas",severity:"error",message:"Deck aspectRatio must resolve to a positive finite canvas."}),e.slides.forEach((o,c)=>{const h=o.id?.trim();h?n.has(h)?t.push({code:"duplicate-slide-id",severity:"error",message:`Slide id "${h}" is duplicated.`,slideId:h,slideIndex:c}):n.add(h):t.push({code:"missing-slide-id",severity:"error",message:`Slide ${c+1} is missing a stable id.`,slideIndex:c}),o.notes?.trim()?r+=1:t.push({code:"missing-notes",severity:"warning",message:`Slide ${h||c+1} has no speaker notes.`,slideId:h||void 0,slideIndex:c})});const a=t.filter(o=>o.severity==="error").length,i=t.length-a;return{deckId:e.id,issues:t,errorCount:a,warningCount:i,notesCoverage:{total:e.slides.length,withNotes:r,missing:Math.max(0,e.slides.length-r)}}}function Cn(e){return e==="16:9"||e==="4:3"?!0:Number.isFinite(e.width)&&Number.isFinite(e.height)&&e.width>0&&e.height>0}function Ze(e){if(globalThis.crypto?.randomUUID)return`${e}-${globalThis.crypto.randomUUID()}`;if(globalThis.crypto?.getRandomValues){const t=new Uint32Array(4);return globalThis.crypto.getRandomValues(t),`${e}-${Array.from(t,n=>n.toString(16).padStart(8,"0")).join("")}`}return`${e}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`}function Pn(e=window){const t=e.navigator;if(t.userAgentData?.mobile===!0)return!0;const r=t.userAgent||"",a=t.platform||t.userAgentData?.platform||"",i=t.maxTouchPoints||0,o=i>0||"ontouchstart"in e,c=St(e,"(pointer: coarse)"),h=St(e,"(hover: none)");if(Rn(r)||On(r)||In(r,a,i))return!0;const m=Nn(e);return o&&c&&h&&m<=1024}function St(e,t){return typeof e.matchMedia=="function"&&e.matchMedia(t).matches}function Rn(e){return/Android.+Mobile|iPhone|iPod|Windows Phone|IEMobile|BlackBerry|BB10|Opera Mini|Opera Mobi|Mobile Safari/i.test(e)}function On(e){return/iPad|Tablet|Silk|Kindle|PlayBook|Android(?!.*Mobile)/i.test(e)}function In(e,t,n){return/Macintosh/i.test(e)&&/Mac/i.test(t)&&n>1}function Nn(e){const t=e.screen?.width||e.innerWidth,n=e.screen?.height||e.innerHeight;return Math.min(t,n)}function Xn(e){return{id:e.id,title:e.title,aspectRatio:e.aspectRatio,theme:e.theme,metadata:e.metadata,slides:e.slides.map(Hn)}}function Hn(e){const{notes:t,...n}=e;return n}function Un(){return{status:"idle",startedAtEpochMs:null,elapsedBeforePauseMs:0,timerVersion:0}}function jn(e,t=Date.now()){return e.status==="running"?e:{...e,status:"running",startedAtEpochMs:t,timerVersion:e.timerVersion+1}}function Fn(e,t=Date.now()){return e.status!=="running"||e.startedAtEpochMs===null?e:{...e,status:"paused",startedAtEpochMs:null,elapsedBeforePauseMs:e.elapsedBeforePauseMs+(t-e.startedAtEpochMs),timerVersion:e.timerVersion+1}}function qn(e,t=Date.now()){return e.status!=="paused"?e:{...e,status:"running",startedAtEpochMs:t,timerVersion:e.timerVersion+1}}function Vn(e=Date.now()){return{status:"running",startedAtEpochMs:e,elapsedBeforePauseMs:0,timerVersion:0}}function Ot(e,t=Date.now()){return e.status!=="running"||e.startedAtEpochMs===null?e.elapsedBeforePauseMs:e.elapsedBeforePauseMs+(t-e.startedAtEpochMs)}function Bn(e){const t=Math.max(0,Math.floor(e/1e3)),n=Math.floor(t/60),r=t%60;return`${String(n).padStart(2,"0")}:${String(r).padStart(2,"0")}`}function Wn(e,t,n){let r={deckId:e,sessionId:t,stateVersion:0,index:0,timer:Un(),peer:{connected:!1,lastSeenAt:null}};const a=new Set;return{subscribe(o){return a.add(o),()=>a.delete(o)},getState:()=>r,getPublicState:()=>({deckId:r.deckId,sessionId:r.sessionId,stateVersion:r.stateVersion,index:r.index,timer:r.timer}),getElapsedLabel:()=>Bn(Ot(r.timer)),goto(o){const c=$t(o,0,Math.max(0,n-1));c!==r.index&&(r={...r,index:c,stateVersion:r.stateVersion+1},i())},startTimer(){r={...r,timer:jn(r.timer),stateVersion:r.stateVersion+1},i()},applyTimerCommand(o){const c=o==="pause"?Fn(r.timer):o==="resume"?qn(r.timer):Vn();r={...r,timer:c,stateVersion:r.stateVersion+1},i()},applySnapshot(o){o.deckId!==r.deckId||o.sessionId!==r.sessionId||o.stateVersion<=r.stateVersion||(r={...r,index:$t(o.index,0,Math.max(0,n-1)),stateVersion:o.stateVersion,timer:o.timer},i())},markPeerSeen(){const o=r.peer.connected;r={...r,peer:{connected:!0,lastSeenAt:Date.now()}},o||i()},refreshPeer(o){if(r.peer.lastSeenAt===null)return;const c=Date.now()-r.peer.lastSeenAt<=o;c!==r.peer.connected&&(r={...r,peer:{...r.peer,connected:c}},i())},isPeerConnected(o){return r.peer.lastSeenAt!==null&&Date.now()-r.peer.lastSeenAt<=o}};function i(){a.forEach(o=>o())}}function $t(e,t,n){return Math.min(n,Math.max(t,e))}class zn{constructor(t){this.options=t,this.channel=new BroadcastChannel(`html-ppt:${t.deckId}:${t.sessionId}`),this.channel.addEventListener("message",this.onMessage)}options;channel;listeners=new Set;lastSeqBySender=new Map;seq=0;send(t){const n={protocol:"deckx-player-sync/v1",deckId:this.options.deckId,sessionId:this.options.sessionId,senderId:this.options.senderId,from:this.options.from,seq:++this.seq,stateVersion:Kn(t),sentAtEpochMs:Date.now(),body:t};this.channel.postMessage(n)}subscribe(t){return this.listeners.add(t),()=>this.listeners.delete(t)}close(){this.channel.removeEventListener("message",this.onMessage),this.channel.close(),this.listeners.clear()}onMessage=t=>{if(!Gn(t.data))return;const n=t.data;if(n.protocol!=="deckx-player-sync/v1"||n.deckId!==this.options.deckId||n.sessionId!==this.options.sessionId||n.senderId===this.options.senderId)return;const r=this.lastSeqBySender.get(n.senderId)??0;n.seq<=r||(this.lastSeqBySender.set(n.senderId,n.seq),this.listeners.forEach(a=>a(n)))}}class Et{constructor(t="Transport is disabled."){this.reason=t}reason;send(){}subscribe(){return()=>{}}close(){}}function Kn(e){if(e.type==="state-snapshot")return e.state.stateVersion;if(e.type==="pong")return e.stateVersion}function Gn(e){if(!e||typeof e!="object")return!1;const t=e;return t.protocol==="deckx-player-sync/v1"&&typeof t.deckId=="string"&&typeof t.sessionId=="string"&&typeof t.senderId=="string"&&typeof t.seq=="number"&&typeof t.sentAtEpochMs=="number"&&typeof t.body=="object"}async function Yn(e){const t=new URL(window.location.href);t.hash="slideshow",t.searchParams.set("sessionId",e.sessionId);let n="popup,width=1280,height=720";if(e.display==="auto"){const a=await _n();a.status&&e.onStatus?.(a.status),a.features&&(n=a.features)}const r=window.open(t.toString(),"html-ppt-slideshow",n);return r?(r.focus(),{windowRef:r,status:{type:"opened",message:"슬라이드쇼 창을 열었습니다. 필요하면 외부 화면으로 이동한 뒤 풀스크린을 시작하세요."}}):{windowRef:null,status:{type:"popup-blocked",message:"팝업이 차단되었습니다. 브라우저에서 팝업을 허용한 뒤 다시 열어주세요."}}}async function _n(){const e=window;if(!window.isSecureContext||typeof e.getScreenDetails!="function")return{features:null,status:{type:"window-management-unavailable",message:"외부 화면 자동 배치는 이 브라우저 또는 실행 컨텍스트에서 지원되지 않아 일반 창으로 엽니다."}};try{const n=(await e.getScreenDetails()).screens.find(r=>!r.isPrimary)??null;return n?{features:`left=${n.availLeft},top=${n.availTop},width=${n.availWidth},height=${n.availHeight},popup`,status:{type:"opened",message:"외부 화면 좌표를 감지했습니다. 슬라이드쇼 창을 해당 위치로 엽니다."}}:{features:null,status:{type:"window-management-unavailable",message:"외부 화면을 찾지 못해 일반 창으로 엽니다."}}}catch{return{features:null,status:{type:"window-management-denied",message:"외부 화면 권한이 거부되었거나 사용할 수 없어 일반 창으로 엽니다."}}}}function $e(e){return e==="4:3"?{width:1024,height:768}:e==="16:9"?{width:1280,height:720}:{width:xt(e.width,1280),height:xt(e.height,720)}}function xt(e,t){return!Number.isFinite(e)||e<=0?t:Math.round(e)}function J(e,t,n,r){e.innerHTML="",e.appendChild(It(t,n,r))}function It(e,t,n){const r=e.slides[t];if(!r){const m=document.createElement("section");return m.className="slide slide-end",m.innerHTML='<p class="muted">END</p>',m}const a=document.createElement("section"),i=$e(e.aspectRatio);a.className=["slide",r.className,e.theme?.className].filter(Boolean).join(" "),a.dataset.slideId=r.id,a.style.setProperty("--slide-width",`${i.width}px`),a.style.setProperty("--slide-height",`${i.height}px`),a.style.width=`${i.width}px`,a.style.height=`${i.height}px`,Zn(a,e.theme?.cssVars);const o=r.render?.({deck:e,slide:r,index:t,total:e.slides.length,mode:n});o instanceof HTMLElement?a.appendChild(o):typeof o=="string"?a.innerHTML=o:a.appendChild(Jn(r));const c=document.createElement("div");c.className="slide-footer mono",c.textContent=r.footer||e.title;const h=document.createElement("div");return h.className="slide-page mono",h.textContent=`${String(t+1).padStart(2,"0")} / ${String(e.slides.length).padStart(2,"0")}`,a.append(c,h),a}function Z(e,t=""){const n=$e(e.aspectRatio),r=document.createElement("div");r.className=`slide-wrap ${t}`.trim();const a=document.createElement("div");return a.className="slide-scaler",a.dataset.designWidth=String(n.width),a.dataset.designHeight=String(n.height),r.appendChild(a),r}function oe(){document.querySelectorAll(".slide-scaler").forEach(e=>{const t=e.parentElement;if(!t)return;const n=Number(e.dataset.designWidth||1280),r=Number(e.dataset.designHeight||720),a=Math.min(t.clientWidth/n,t.clientHeight/r),i=(t.clientWidth-n*a)/2,o=(t.clientHeight-r*a)/2;e.style.width=`${n}px`,e.style.height=`${r}px`,e.style.transform=`scale(${a})`,e.style.left=`${i}px`,e.style.top=`${o}px`})}function Jn(e){const t=document.createElement("div");if(t.className="slide-content",e.kicker){const n=document.createElement("div");n.className="slide-kicker mono",n.textContent=e.kicker,t.appendChild(n)}if(e.title){const n=document.createElement("h2");n.innerHTML=e.title,t.appendChild(n)}if(e.body){const n=document.createElement("div");n.className="slide-body",n.innerHTML=e.body,t.appendChild(n)}return t}function Zn(e,t){t&&Object.entries(t).forEach(([n,r])=>{e.style.setProperty(n,r)})}function Qn(e,t){e.innerHTML=`
    <main class="player-console player-console-empty">
      ${Nt("DeckX를 열어 발표를 시작하세요",t.homeHref)}
      <section class="player-console-grid player-console-grid-empty" aria-label="DeckX player open screen">
        <aside class="player-panel player-open-panel">
          ${Xt(t)}
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
  `,Ht(e,t.actions)}function er(e,t){const n=$e(t.deck.aspectRatio),r=t.deck.slides[0],a=fr(t.deck);e.innerHTML=`
    <main class="player-console">
      ${Nt(t.deck.title,t.actions.homeHref)}
      <section class="player-console-grid player-console-grid-loaded" aria-label="DeckX player launch console">
        <aside class="player-panel player-open-panel">
          ${Xt(t)}
        </aside>

        <section class="player-panel player-preview-panel">
          <div class="player-panel-heading split">
            <div>
              <span class="mono">${$(Ft(t.sourceKind))}</span>
              <h2>${$(br(r?.title||t.deck.title))}</h2>
            </div>
            <span class="player-count mono">01 / ${String(t.deck.slides.length).padStart(2,"0")}</span>
          </div>
          <div class="player-preview-stage" data-player-preview aria-label="First slide preview"></div>
          <div class="player-meta-strip" aria-label="Deck metadata">
            <span><strong>${t.deck.slides.length}</strong> slides</span>
            <span><strong>${$(jt(t.deck.aspectRatio))}</strong> ${n.width}x${n.height}</span>
            <span><strong>${$(Ut(a))}</strong> planned</span>
            <span><strong>${$(yr(t.deck.metadata))}</strong> metadata</span>
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
            ${cr(t.motionMode)}
          </details>
          ${dr(t,a)}
        </aside>
      </section>
    </main>
  `,tr(e,t.publicDeck),nr(e,t.actions)}function Nt(e,t){return`
    <header class="player-console-header">
      <div class="player-title-group">
        <img class="brand-icon player-brand-icon" src="/brand/deckx-icon.svg" alt="" aria-hidden="true" />
        <div>
          <span class="badge mono">DeckX PLAYER</span>
          <h1>DeckX Player</h1>
          <p>${$(e)}</p>
        </div>
      </div>
      <div class="player-header-actions">
        ${t?`<a class="btn compact" href="${$(t)}">프로젝트 소개</a>`:""}
      </div>
    </header>
  `}function Xt(e){return`
    <details class="player-source-menu" data-player-source-menu>
      <summary class="player-source-menu-summary">
        <span class="hamburger-lines" aria-hidden="true"></span>
        <span>덱 열기 / 샘플</span>
      </summary>
      <div class="player-source-menu-body">
        <div class="player-panel-heading">
          <span class="mono">SOURCE</span>
          <h2>DeckX 열기</h2>
        </div>
        ${e.actions.onOpenDeckxUrl?ar(e.actions.deckxUrlValue??"",e.actions.deckxStatus??""):""}
        ${e.actions.onOpenDeckxFile?sr():""}
        ${or(e.historyOptions)}
        ${e.demoOptions.length>0?lr(e.demoOptions):""}
      </div>
    </details>
  `}function tr(e,t){const n=e.querySelector("[data-player-preview]");if(!n)return;const r=Z(t,"player-preview-wrap"),a=r.querySelector(".slide-scaler");a&&(J(a,t,0,"slideshow"),n.appendChild(r),window.requestAnimationFrame(oe))}function nr(e,t){Ht(e,t),e.querySelector('[data-action="start"]')?.addEventListener("click",t.onStart),e.querySelector('[data-action="presenter"]')?.addEventListener("click",t.onPresenterOnly),e.querySelector('[data-action="slideshow"]')?.addEventListener("click",t.onSlideshowOnly),e.querySelectorAll("[data-motion-mode]").forEach(n=>{n.addEventListener("click",()=>{t.onSetMotionMode(n.dataset.motionMode)})})}function Ht(e,t){rr(e);const n=e.querySelector("[data-deckx-url-form]");n?.addEventListener("submit",a=>{a.preventDefault();const o=n.querySelector("[data-deckx-url-input]")?.value.trim();o&&t.onOpenDeckxUrl?.(o)});const r=e.querySelector("[data-deckx-file-input]");r?.addEventListener("change",()=>{const a=r.files?.[0];a&&t.onOpenDeckxFile?.(a),r.value=""}),e.querySelectorAll("[data-action='select-local-deckx']").forEach(a=>{a.addEventListener("click",()=>r?.click())})}function rr(e){const t=window.matchMedia("(max-width: 640px)").matches;e.querySelectorAll("[data-player-source-menu]").forEach(n=>{t||(n.open=!0)})}function ar(e,t){return`
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
          value="${$(e)}"
          aria-label="DeckX URL"
        />
        <button class="btn compact" type="submit">열기</button>
      </div>
      ${t?`<div class="deckx-url-status">${$(t)}</div>`:""}
    </form>
  `}function sr(){return`
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
  `}function or(e){return`
    <section class="player-history-list" aria-label="Recently opened DeckX">
      <span class="player-subhead mono">RECENT DeckX</span>
      ${e.length===0?'<p class="player-empty-copy">아직 열어본 DeckX가 없습니다.</p>':e.map(ir).join("")}
    </section>
  `}function ir(e){return e.kind==="url"&&e.href?`
      <a class="player-history-option" href="${$(e.href)}">
        <span>${$(e.label)}</span>
        <small>URL · ${$(e.detail)}</small>
      </a>
    `:`
    <button class="player-history-option as-button" type="button" data-action="select-local-deckx">
      <span>${$(e.label)}</span>
      <small>ZIP · ${$(e.detail)} · 다시 선택 필요</small>
    </button>
  `}function lr(e){return`
    <nav class="player-demo-list" aria-label="Explicit demo DeckX packages">
      <span class="player-subhead mono">OFFICIAL SAMPLES</span>
      ${e.map(t=>`
            <a class="player-demo-option ${t.active?"active":""}" href="${$(t.href)}" aria-current="${t.active?"page":"false"}">
              <span><em>DEMO</em>${$(t.label)}</span>
              <small>${$(t.description)}</small>
            </a>
          `).join("")}
    </nav>
  `}function cr(e){return`
    <div class="player-motion-block">
      <span class="player-subhead mono">MOTION MODE</span>
      <div class="player-motion-segment" role="group" aria-label="Motion controls">
        ${[{id:"full",label:"Full",description:"CSS motion and transitions enabled"},{id:"reduced",label:"Reduced",description:"Motion compressed for review"},{id:"paused",label:"Paused",description:"Animations paused"}].map(n=>`
              <button
                type="button"
                class="motion-mode ${n.id===e?"active":""}"
                data-motion-mode="${n.id}"
                aria-pressed="${n.id===e}"
                title="${$(n.description)}"
              >${$(n.label)}</button>
            `).join("")}
      </div>
    </div>
  `}function dr(e,t){const n=$e(e.deck.aspectRatio),r=e.validationReport.notesCoverage,a=e.validationReport.errorCount>0?"BLOCKED":e.validationReport.warningCount>0?"WARNINGS":"READY";return`
    <details class="player-deckx-details">
      <summary>DeckX 상세 보기</summary>
      <dl class="player-detail-list">
        ${T("SOURCE",`${Ft(e.sourceKind)} · ${e.sourceLabel}`)}
        ${T("VALIDATION",`${a} · ${e.validationReport.errorCount} errors / ${e.validationReport.warningCount} warnings`)}
        ${T("NOTES",`${r.withNotes}/${r.total} notes · ${r.missing} missing`)}
        ${T("SESSION",e.sessionId)}
        ${T("DISPLAY",hr(e.displayFilters))}
        ${T("CANVAS",`${jt(e.deck.aspectRatio)} · ${mr(n)}`)}
        ${T("DURATION",Ut(t))}
        ${ur(e.deck.metadata)}
      </dl>
      ${pr(e.validationReport)}
    </details>
  `}function ur(e){if(!e)return"";const t=[];return e.description&&t.push(T("DESCRIPTION",e.description)),e.version&&t.push(T("VERSION",e.version)),e.authors?.length&&t.push(T("AUTHORS",gr(e))),e.tags?.length&&t.push(T("TAGS",e.tags.join(", "))),e.language&&t.push(T("LANGUAGE",e.language)),e.license&&t.push(T("LICENSE",e.license)),e.homepage&&t.push(T("HOMEPAGE",e.homepage)),e.repository&&t.push(T("REPOSITORY",e.repository)),e.generator?.name&&t.push(T("GENERATOR",vr(e))),(e.createdAt||e.updatedAt)&&t.push(T("DATES",[e.createdAt,e.updatedAt].filter(Boolean).join(" / "))),t.join("")}function T(e,t){return`
    <div class="player-detail-row">
      <dt class="mono">${$(e)}</dt>
      <dd>${$(t)}</dd>
    </div>
  `}function pr(e){return e.issues.length===0?'<p class="player-empty-copy">Validation issues 없음.</p>':`
    <div class="player-issue-list">
      ${e.issues.slice(0,4).map(t=>`
            <div class="player-issue" data-severity="${t.severity}">
              <strong>${$(t.code)}</strong>
              <span>${$(t.message)}</span>
            </div>
          `).join("")}
      ${e.issues.length>4?`<p>${e.issues.length-4} more issues hidden.</p>`:""}
    </div>
  `}function fr(e){return typeof e.durationSec=="number"&&e.durationSec>0?e.durationSec:e.slides.reduce((t,n)=>t+(n.timingSec||0),0)}function Ut(e){if(!e)return"No plan";const t=Math.floor(e/60),n=e%60;return t?n?`${t}m ${n}s`:`${t}m`:`${n}s`}function jt(e){return typeof e=="string"?e:`${e.width}:${e.height}`}function mr(e){return`${e.width} x ${e.height}`}function hr(e){return`B${e.brightness} C${e.contrast} S${e.saturation}`}function yr(e){return e?e.tags?.length?e.tags.find(t=>t!=="stress"&&t!=="demo")??e.tags[0]:e.language?e.language:e.version?e.version:"present":"none"}function gr(e){return(e.authors??[]).map(t=>[t.name,t.role].filter(Boolean).join(" · ")).join(", ")}function vr(e){return e.generator?[e.generator.name,e.generator.version].filter(Boolean).join(" "):""}function Ft(e){return e==="demo"?"Demo DeckX":e==="zip"?"Local ZIP":"URL DeckX"}function br(e){return e.replace(/<[^>]*>/g,"").replace(/\s+/g," ").trim()}function $(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}const Qe=[{id:"script-first",name:"Script First",description:"왼쪽 목록, 상단 긴 노트, 하단 Current/Next",layout:{presetId:"script-first",showCurrent:!0,showNext:!0,showNotes:!0,showOverview:!0,notesFontSize:22},grid:{columns:"140px minmax(0, 2fr) minmax(0, 1fr)",rows:"auto minmax(0, 1.2fr) minmax(0, 1fr) auto",areas:`
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
      `}}];function wr(e,t,n,r,a){const i=ot(a.layout.presetId),o=Cr(i.grid,a.layout.settingsOpen),c=a.layout.showCurrent||a.layout.showNext||a.layout.showNotes||a.layout.showOverview,h=window.matchMedia("(max-width: 760px)").matches;e.innerHTML=`
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
              <div class="value mono pace-value" data-pace="${a.pace.state}" data-pace-label>${O(a.pace.label)}</div>
            </div>
          </div>
          <div class="topbar-group right">
            <span class="connection mono" title="발표자뷰와 슬라이드쇼 창의 동기화 상태">
              <span class="status-dot" data-connection-dot data-connected="false"></span>
              <span data-connection>${a.connectionStatus}</span>
            </span>
            <button class="tool-btn" data-action="goto" title="슬라이드 번호로 이동">Goto</button>
            <button class="tool-btn" data-action="search" title="제목, 본문, 노트 검색">Search</button>
            <button class="tool-btn primary-tool" data-action="open" title="관객용 슬라이드쇼 창을 엽니다">슬라이드쇼 창 열기</button>
            ${Sr(a)}
            <button class="tool-btn" data-action="settings" title="발표자뷰 패널 배치를 선택합니다">${a.layout.settingsOpen?"프리셋 닫기":"뷰 프리셋"}</button>
            <button class="tool-btn danger" data-action="exit">종료</button>
          </div>
        </div>
        ${kr(a,t)}
      </header>

      ${a.layout.settingsOpen?$r(a.layout):""}

      ${h?`<section class="mobile-combo-stage" aria-label="Mobile slideshow preview">
              <div class="mobile-stage-slide" data-mobile-stage></div>
            </section>

            <section class="mobile-presenter-panel" aria-label="Mobile presenter view">
              <div class="mobile-presenter-heading">
                <span class="mono">PRESENTER VIEW</span>
                <strong>${r.index+1} / ${n.slides.length}</strong>
              </div>
              <div class="mobile-presenter-previews">
                <div class="mobile-preview-tile">
                  <span class="mono">CURRENT</span>
                  <div class="mobile-mini-slide" data-mobile-current></div>
                </div>
                <div class="mobile-preview-tile">
                  <span class="mono">NEXT</span>
                  <div class="mobile-mini-slide" data-mobile-next></div>
                </div>
              </div>
              <div class="mobile-notes-block">
                <span class="mono">SCRIPT${a.notesHasDraft?" · DRAFT":""}</span>
                <div class="mobile-notes-content" style="font-size:${Math.max(15,a.layout.notesFontSize-5)}px">${Lt(a.notesText||"발표자 노트가 없습니다.")}</div>
              </div>
              <div class="mobile-nav-actions">
                <button class="btn compact" type="button" data-action="prev">이전</button>
                <button class="btn compact primary" type="button" data-action="next">다음</button>
              </div>
            </section>`:""}

      ${a.layout.showCurrent?`<section class="panel current">
              <div class="panel-label mono">CURRENT</div>
              <div class="slide-host" data-current></div>
            </section>`:""}

      ${a.layout.showNext?`<section class="panel next">
              <div class="panel-label mono">NEXT</div>
              <div class="slide-host" data-next></div>
            </section>`:""}

      ${a.layout.showNotes?`<section class="panel notes">
              <div class="panel-label mono">SPEAKER NOTES${a.notesHasDraft?" · DRAFT":""}</div>
              <div class="panel-actions">
                <button class="mini-btn" data-action="edit-notes">Edit</button>
                <button class="mini-btn" data-action="export-notes">Export</button>
              </div>
              <div class="notes-content" style="font-size:${a.layout.notesFontSize}px">${Lt(a.notesText)}</div>
            </section>`:""}

      ${a.layout.showOverview?`<section class="panel overview">
              <div class="panel-label mono">SLIDE LIST</div>
              <div class="overview-list" data-overview></div>
            </section>`:""}

      ${c?"":`<section class="panel empty-presenter">
              <p>표시할 컴포넌트를 하나 이상 켜주세요.</p>
            </section>`}

      <footer class="bottombar">
        <div class="nav-dots" data-dots></div>
        <div class="bottom-status mono">${a.windowStatus?.message||"준비됨"}</div>
        <div class="timer-controls">
          <button class="btn compact" data-action="pause">${r.timer.status==="paused"?"Resume":"Pause"}</button>
          <button class="btn compact" data-action="reset">Reset</button>
        </div>
      </footer>
    </main>
  `;const m=e.querySelector(".presenter");m&&(m.dataset.preset=i.id,Mr(m,o));const p=e.querySelector("[data-current]"),u=e.querySelector("[data-next]"),g=e.querySelector("[data-mobile-stage]"),x=e.querySelector("[data-mobile-current]"),E=e.querySelector("[data-mobile-next]");if(p){const b=Z(n);p.appendChild(b),J(b.querySelector(".slide-scaler"),n,r.index,"presenter")}if(u){const b=Z(n);u.appendChild(b),J(b.querySelector(".slide-scaler"),n,r.index+1,"presenter")}if(g){const b=Z(n,"mobile-stage-wrap");g.appendChild(b),J(b.querySelector(".slide-scaler"),n,r.index,"slideshow")}if(x){const b=Z(n,"mobile-mini-wrap");x.appendChild(b),J(b.querySelector(".slide-scaler"),n,r.index,"presenter")}if(E){const b=Z(n,"mobile-mini-wrap");E.appendChild(b),J(b.querySelector(".slide-scaler"),n,r.index+1,"presenter")}Dr(e,n,r.index,a.onGoto),Lr(e);const M=e.querySelector("[data-dots]");M&&n.slides.forEach((b,C)=>{const L=document.createElement("button");L.type="button",L.className=C===r.index?"active":"",L.textContent=String(C+1),L.addEventListener("click",()=>a.onGoto(C)),M.appendChild(L)}),xr(e,a),e.querySelector('[data-action="settings"]')?.addEventListener("click",()=>{a.onToggleSettings()}),e.querySelector('[data-action="goto"]')?.addEventListener("click",()=>{a.onOpenCommand("goto")}),e.querySelector('[data-action="search"]')?.addEventListener("click",()=>{a.onOpenCommand("search")}),e.querySelector('[data-action="prev"]')?.addEventListener("click",a.onPrev),e.querySelector('[data-action="next"]')?.addEventListener("click",a.onNext),e.querySelector('[data-action="motion"]')?.addEventListener("click",a.onCycleMotionMode),e.querySelector('[data-action="theme"]')?.addEventListener("click",a.onCycleRuntimeTheme),e.querySelector('[data-action="open"]')?.addEventListener("click",a.onOpenSlideshow),e.querySelector('[data-action="copy-url"]')?.addEventListener("click",a.onCopySlideshowUrl),e.querySelector('[data-action="exit"]')?.addEventListener("click",a.onExit),e.querySelector('[data-action="edit-notes"]')?.addEventListener("click",a.onEditNotes),e.querySelector('[data-action="export-notes"]')?.addEventListener("click",a.onExportNotes),e.querySelector('[data-action="wake-lock"]')?.addEventListener("click",a.onToggleWakeLock),e.querySelector('[data-action="mirror"]')?.addEventListener("click",a.onToggleMirror),e.querySelector('[data-action="pause"]')?.addEventListener("click",a.onPauseResume),e.querySelector('[data-action="reset"]')?.addEventListener("click",a.onResetTimer),oe()}function kr(e,t){const n=e.windowStatus?.type??"idle",r=e.validationReport.errorCount>0?`${e.validationReport.errorCount} errors`:`${e.validationReport.warningCount} warnings`,a=`${e.validationReport.notesCoverage.withNotes}/${e.validationReport.notesCoverage.total}`,i=e.validationReport.errorCount>0?"BLOCKED":e.connectionStatus==="CONNECTED"?"READY":"CHECK";return`
    <details class="readiness-detail">
      <summary>
        <span>운영 상태</span>
        <span class="readiness-summary-chip mono" data-readiness-state="${O(i.toLowerCase())}">${i}</span>
        <span class="readiness-summary-copy">SYNC ${O(e.connectionStatus)} · POPUP ${O(At(n))} · VALIDATION ${O(r)}</span>
      </summary>
      <div class="readiness-row" aria-label="Presentation setup preflight">
        ${N("DECK",t.title,"","현재 열려 있는 DeckX 제목입니다.")}
        ${N("SESSION",Rr(e.sessionId),"","발표자뷰와 슬라이드쇼가 공유하는 세션입니다.")}
        ${N("POPUP",At(n),n,"슬라이드쇼 창 열기 상태입니다.")}
        ${N("SYNC",e.connectionStatus,"","BroadcastChannel 기반 창 간 연결 상태입니다.")}
        ${N("FULLSCREEN",e.fullscreenActive?"ON":"OFF","","현재 창의 풀스크린 상태입니다.")}
        ${N("MOTION",qt(e.motionMode),"","덱 CSS animation 재생 방식입니다. 도구 메뉴에서 변경합니다.")}
        ${N("THEME",Vt(e.runtimeTheme),"","발표자뷰와 슬라이드쇼 chrome 테마입니다. 덱 내부 스타일은 바꾸지 않습니다.")}
        ${N("PACE",e.pace.detail,e.pace.state,"계획 시간 대비 현재 발표 속도입니다.")}
        ${N("FILTER",Pr(e.displayFilters),"","관객용 화면 보정값입니다. 슬라이드쇼의 Display 메뉴에서 조정합니다.")}
        ${N("WAKE",e.wakeLockStatus,"","화면 꺼짐 방지 요청 상태입니다.")}
        ${N("MIRROR",e.mirrorStatus,"","관객 화면 미러링 상태입니다.")}
        ${N("VALIDATION",r,e.validationReport.errorCount>0?"error":"ok","DeckX package 검증 결과입니다.")}
        ${N("NOTES",a,"","발표자 노트가 연결된 슬라이드 수입니다.")}
      </div>
    </details>
  `}function N(e,t,n="",r=""){return`
    <span class="readiness-item" data-readiness-state="${O(n)}" title="${O(r)}">
      <span class="readiness-label mono">${O(e)}</span>
      <span class="readiness-value mono">${O(t)}</span>
      ${r?`<span class="readiness-description">${O(r)}</span>`:""}
    </span>
  `}function Sr(e){return`
    <details class="presenter-tools-menu">
      <summary class="tool-btn">도구</summary>
      <div class="presenter-tools-panel">
        ${ye("motion",`Motion: ${qt(e.motionMode)}`,"Full, Reduced, Paused 순서로 덱 애니메이션 재생 방식을 바꿉니다.")}
        ${ye("theme",`쇼 테마: ${Vt(e.runtimeTheme)}`,"발표자뷰와 슬라이드쇼 chrome을 Light/Dark로 전환합니다. 덱 스타일은 유지됩니다.")}
        ${ye("copy-url","URL 복사","현재 세션의 슬라이드쇼 URL을 복사합니다. 팝업 차단 시 수동 복구에 사용합니다.")}
        ${ye("wake-lock","Keep Awake","지원 브라우저에서 화면 꺼짐 방지를 요청합니다.")}
        ${ye("mirror","Audience Mirror","권한을 허용하면 발표자 화면 안에 관객 화면 확인용 미러를 띄웁니다.")}
      </div>
    </details>
  `}function ye(e,t,n){return`
    <button class="tool-menu-control" type="button" data-action="${O(e)}">
      <strong>${O(t)}</strong>
      <span>${O(n)}</span>
    </button>
  `}function $r(e){return`
    <section class="panel layout-settings">
      <div class="preset-picker" role="radiogroup" aria-label="Presenter view presets">
        ${Qe.map(t=>Er(t,e.presetId)).join("")}
      </div>
    </section>
  `}function Er(e,t){return`
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
  `}function xr(e,t){e.querySelectorAll("[data-preset-id]").forEach(n=>{n.addEventListener("click",()=>{const r=n.dataset.presetId;t.onSelectPreset(r)})})}function Dr(e,t,n,r){const a=e.querySelector("[data-overview]");a&&t.slides.forEach((i,o)=>{const c=document.createElement("button");c.type="button",c.className=`overview-item ${o===n?"active":""}`,c.setAttribute("aria-label",`Slide ${o+1}: ${Ar(i.title||i.id)}`),c.addEventListener("click",()=>r(o)),c.addEventListener("keydown",g=>{const x=Tr(g.key);if(x===0)return;g.preventDefault(),g.stopPropagation();const E=Array.from(a.querySelectorAll(".overview-item")),M=E.indexOf(c),b=Math.max(0,Math.min(E.length-1,M+x));E[b]?.focus()});const h=document.createElement("div"),m=$e(t.aspectRatio);h.className="overview-thumb",h.style.aspectRatio=`${m.width} / ${m.height}`;const p=document.createElement("div");p.className="overview-mini-slide",p.appendChild(It(t,o,"presenter")),h.appendChild(p);const u=document.createElement("span");u.className="overview-number mono",u.textContent=String(o+1).padStart(2,"0"),c.append(h,u),a.appendChild(c)})}function Lr(e){e.querySelectorAll(".overview-thumb").forEach(t=>{const n=t.querySelector(".slide"),r=Number.parseFloat(n?.style.width||"1280"),a=t.clientWidth/r;t.style.setProperty("--overview-thumb-scale",String(a))})}function Ar(e){return e.replace(/<[^>]*>/g,"")}function Tr(e){return e==="ArrowDown"||e==="ArrowRight"?1:e==="ArrowUp"||e==="ArrowLeft"?-1:0}function Mr(e,t){Object.entries(t).forEach(([n,r])=>{e.style.setProperty(n,r)})}function ot(e){return Qe.find(t=>t.id===e)??Qe[0]}function Cr(e,t){if(!t)return Dt(e.columns,e.rows,e.areas);const n=e.areas.trim().split(`
`).map(i=>i.trim()).find(Boolean),r=n?n.replaceAll('"',"").trim().split(/\s+/).length:1,a=`"${Array.from({length:r},()=>"settings").join(" ")}"`;return Dt(e.columns,e.rows.replace(/^auto\s+/,"auto auto "),e.areas.trim().replace(/^"[^"]+"/,`$&
${a}`))}function Dt(e,t,n){return{"grid-template-columns":e,"grid-template-rows":t,"grid-template-areas":n}}function Lt(e){return O(e).replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>").replace(/\n/g,"<br />")}function qt(e){return e==="reduced"?"Reduced":e==="paused"?"Paused":"Full"}function Vt(e){return e==="dark"?"Dark":"Light"}function Pr(e){return`${e.brightness}/${e.contrast}/${e.saturation}`}function At(e){return e==="opened"?"OPENED":e==="popup-blocked"?"BLOCKED":e==="opening"?"OPENING":e==="window-management-denied"?"DENIED":e==="window-management-unavailable"?"FALLBACK":"READY"}function Rr(e){return e.length<=12?e:`${e.slice(0,6)}...${e.slice(-4)}`}function O(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Or(e,t,n,r){e.innerHTML=`
    <main class="slideshow-stage" data-runtime-theme="${r.runtimeTheme}">
      <div data-slide-host style="${Xr(r.displayFilters)}"></div>
      <div class="slideshow-toolbar" aria-label="Slideshow controls">
        <button class="fullscreen-btn" data-action="fullscreen">
          ${document.fullscreenElement?"풀스크린 종료":"풀스크린 시작"}
        </button>
        <button class="theme-toggle-btn" data-action="theme">
          Theme: ${Nr(r.runtimeTheme)}
        </button>
        <button class="motion-toggle-btn" data-action="motion">
          Motion: ${Ir(r.motionMode)}
        </button>
        <button class="display-filter-toggle-btn" data-action="display-filters" aria-expanded="${r.displayFiltersOpen}">
          Display
        </button>
      </div>
      ${r.displayFiltersOpen?`<div class="display-filter-panel" aria-label="Display filters">
              ${Ve("brightness","Bright",r.displayFilters.brightness)}
              ${Ve("contrast","Contrast",r.displayFilters.contrast)}
              ${Ve("saturation","Sat",r.displayFilters.saturation)}
            </div>`:""}
      <div class="fullscreen-status mono" data-fullscreen-status></div>
    </main>
  `;const a=e.querySelector("[data-slide-host]");if(a){const i=Z(t,"slideshow-wrap");a.appendChild(i),J(i.querySelector(".slide-scaler"),t,n.index,"slideshow")}e.querySelector('[data-action="fullscreen"]')?.addEventListener("click",r.onFullscreen),e.querySelector('[data-action="motion"]')?.addEventListener("click",r.onCycleMotionMode),e.querySelector('[data-action="theme"]')?.addEventListener("click",r.onCycleRuntimeTheme),e.querySelector('[data-action="display-filters"]')?.addEventListener("click",r.onToggleDisplayFilters),e.querySelectorAll("[data-filter-key]").forEach(i=>{i.addEventListener("input",()=>{const o=i.dataset.filterKey;r.onSetDisplayFilter(o,Number(i.value))})}),e.querySelector(".slideshow-stage")?.addEventListener("click",i=>{const o=i.target;o instanceof HTMLElement&&o.closest("button, input, label")||r.onNext()}),e.querySelector(".slideshow-stage")?.addEventListener("contextmenu",i=>{i.preventDefault(),r.onPrev()}),oe()}function Ir(e){return e==="reduced"?"Reduced":e==="paused"?"Paused":"Full"}function Nr(e){return e==="dark"?"Dark":"Light"}function Ve(e,t,n){return`
    <label class="filter-control">
      <span class="mono">${t}</span>
      <input type="range" min="60" max="140" step="1" value="${n}" data-filter-key="${e}" />
    </label>
  `}function Xr(e){return`filter: brightness(${e.brightness}%) contrast(${e.contrast}%) saturate(${e.saturation}%);`}const ge=6e3,be={brightness:100,contrast:100,saturation:100},Tt="light",Be={presetId:"script-first",showCurrent:!0,showNext:!0,showNotes:!0,showOverview:!0,notesFontSize:22,settingsOpen:!1};function Hr(e,t){const n=Xn(e),r=Mn(e),a=t.mount;let i=Ur(),o=jr(e.id),c=qr(e.id),h=Br(e.id),m=zr(e.id),p=null,u=!1,g="",x=!1,E="",M=!1,b="off",C=null,L="off",A=null,te=o==="paused"?"full":o,d=ne(Yr(t.mode),_r(t.sessionId));return window.addEventListener("resize",oe),document.addEventListener("keydown",fe),document.addEventListener("fullscreenchange",v),document.addEventListener("visibilitychange",bt),K(d),v(),{destroy:P,getSessionId:()=>d.sessionId};function ne(s,l){const y=Ze("sender"),k=Wn(e.id,l,n.slides.length),I=Le(l,y,s),w={mode:s,sessionId:l,senderId:y,store:k,transport:I,unsubscribeStore:()=>{},unsubscribeTransport:()=>{},tickTimer:null,heartbeatTimer:null,lastWindowStatus:null};return w.unsubscribeStore=k.subscribe(v),w.unsubscribeTransport=I.subscribe(qe=>Xe(w,qe)),w.tickTimer=window.setInterval(G,250),w}function Le(s,l,y){return y==="landing"?new Et:"BroadcastChannel"in window?new zn({deckId:e.id,sessionId:s,senderId:l,from:y==="slideshow"?"slideshow":"presenter"}):new Et("BroadcastChannel is not supported in this browser.")}function z(s,l=d.sessionId){re(d),d=ne(s,l),K(d),Jr(s,l),v()}function K(s){s.mode==="slideshow"&&(de(s),s.transport.send({type:"hello",wantsState:!0})),s.mode==="presenter"&&(s.store.startTimer(),q(s),R(s))}function re(s){s.unsubscribeStore(),s.unsubscribeTransport(),s.transport.close(),s.tickTimer!==null&&window.clearInterval(s.tickTimer),s.heartbeatTimer!==null&&window.clearInterval(s.heartbeatTimer)}function P(){re(d),window.removeEventListener("resize",oe),document.removeEventListener("keydown",fe),document.removeEventListener("fullscreenchange",v),document.removeEventListener("visibilitychange",bt),vt(),wt()}function v(){if(document.body.dataset.mode=d.mode,document.body.dataset.motion=o,document.body.dataset.runtimeTheme=c,d.mode==="landing"){er(a,{deck:e,publicDeck:n,sessionId:d.sessionId,sourceKind:t.sourceKind??"url",sourceLabel:t.sourceLabel??t.deckxUrlValue??e.id,validationReport:r,motionMode:o,displayFilters:h,demoOptions:t.demoOptions??[],historyOptions:t.historyOptions??[],actions:{onStart:()=>Ne(),onPresenterOnly:()=>z("presenter",d.sessionId),onSlideshowOnly:()=>z("slideshow",d.sessionId),onSetMotionMode:s=>W(s),onOpenDeckxUrl:t.onOpenDeckxUrl,onOpenDeckxFile:t.onOpenDeckxFile,deckxUrlValue:t.deckxUrlValue,deckxStatus:t.deckxStatus,homeHref:t.homeHref}}),Fe();return}if(d.mode==="presenter"){wr(a,e,n,d.store.getState(),{connectionStatus:Y(),windowStatus:d.lastWindowStatus,sessionId:d.sessionId,fullscreenActive:!!document.fullscreenElement,pace:pt(),notesText:je(d.store.getState().index),notesHasDraft:bn(d.store.getState().index),validationReport:r,displayFilters:h,wakeLockStatus:Gr(b),mirrorStatus:Rt(L),layout:i,runtimeTheme:c,onNext:()=>D("next"),onPrev:()=>D("prev"),onGoto:s=>D("goto",s),onOpenCommand:s=>He(s),onEditNotes:()=>mt(),onExportNotes:()=>kn(),onPauseResume:()=>B(d.store.getState().timer.status==="paused"?"resume":"pause"),onResetTimer:()=>B("reset"),onOpenSlideshow:()=>Ae(),onCopySlideshowUrl:()=>Sn(),onExit:()=>Te(),onSelectPreset:ue,onToggleSettings:pe,onToggleWakeLock:()=>$n(),onToggleMirror:()=>En(),onCycleRuntimeTheme:he,motionMode:o,onCycleMotionMode:Ce}),Fe();return}Or(a,n,d.store.getState(),{onNext:()=>D("next"),onPrev:()=>D("prev"),onFullscreen:()=>me(),motionMode:o,onCycleMotionMode:Ce,runtimeTheme:c,onCycleRuntimeTheme:he,displayFilters:h,displayFiltersOpen:x,onToggleDisplayFilters:()=>{x=!x,v()},onSetDisplayFilter:hn}),Fe()}async function Ne(){if(Pn()){z("presenter",d.sessionId),d.lastWindowStatus={type:"idle",message:"모바일에서는 현재 탭에서 슬라이드와 발표자뷰를 함께 표시합니다."},v();return}z("presenter",d.sessionId),await Ae()}async function Ae(){d.lastWindowStatus={type:"opening",message:"슬라이드쇼 창을 여는 중입니다."},v();const s=await Yn({sessionId:d.sessionId,display:t.display??"auto",onStatus:l=>{d.lastWindowStatus=l,v()}});d.lastWindowStatus=s.status,v()}function Te(){d.transport.send({type:"close-slideshow"}),z("landing",Ze("session"))}function D(s,l){if(d.mode!=="landing"){if(d.mode==="presenter"){ce(d.store,s,l),q(d);return}d.transport.send({type:"nav-request",action:s,index:l}),d.store.isPeerConnected(ge)||ce(d.store,s,l)}}function B(s){if(d.mode==="presenter"){d.store.applyTimerCommand(s),q(d);return}d.transport.send({type:"timer-command",action:s})}function q(s){s.mode==="presenter"&&s.transport.send({type:"state-snapshot",state:s.store.getPublicState()})}function R(s){s.mode!=="landing"&&s.transport.send({type:"runtime-preferences",motionMode:o,displayFilters:h,runtimeTheme:c})}function Xe(s,l){switch(s.store.markPeerSeen(),l.body.type){case"hello":s.mode==="presenter"&&(q(s),R(s));break;case"state-snapshot":s.mode==="slideshow"&&l.from==="presenter"&&s.store.applySnapshot(l.body.state);break;case"nav-request":s.mode==="presenter"&&(ce(s.store,l.body.action,l.body.index),q(s));break;case"timer-command":s.mode==="presenter"&&(s.store.applyTimerCommand(l.body.action),q(s));break;case"runtime-preferences":W(l.body.motionMode,{publish:!1}),l.body.displayFilters&&dt(l.body.displayFilters,{publish:!1}),l.body.runtimeTheme&&ut(l.body.runtimeTheme,{publish:!1});break;case"ping":s.transport.send({type:"pong",stateVersion:s.store.getState().stateVersion}),s.mode==="presenter"&&q(s);break;case"pong":break;case"close-slideshow":s.mode==="slideshow"&&(window.close(),a.innerHTML='<div class="system-message">발표자가 슬라이드쇼를 종료했습니다.</div>');break}}function ce(s,l,y){l==="next"&&s.goto(s.getState().index+1),l==="prev"&&s.goto(s.getState().index-1),l==="goto"&&typeof y=="number"&&s.goto(y)}function de(s){s.heartbeatTimer=window.setInterval(()=>{s.transport.send({type:"ping"}),s.store.isPeerConnected(ge)||s.transport.send({type:"hello",wantsState:!0})},1e3)}function G(){d.mode!=="landing"&&(d.store.refreshPeer(ge),Me())}function Me(){const s=document.querySelector("[data-clock]");s&&(s.textContent=Kr(new Date));const l=document.querySelector("[data-elapsed]");l&&(l.textContent=d.store.getElapsedLabel());const y=pt(),k=document.querySelector("[data-pace-label]");k&&(k.textContent=y.label,k.dataset.pace=y.state);const I=document.querySelector("[data-connection]");I&&(I.textContent=Y());const w=document.querySelector("[data-connection-dot]");w&&(w.dataset.connected=String(d.store.isPeerConnected(ge)))}function Y(){return"BroadcastChannel"in window?d.store.isPeerConnected(ge)?"CONNECTED":"DISCONNECTED":"UNSUPPORTED"}function ue(s){const l=ot(s);i=et({...l.layout,settingsOpen:i.settingsOpen}),Mt(i),v()}function pe(){i=et({...i,settingsOpen:!i.settingsOpen}),Mt(i),v()}function fe(s){if(d.mode!=="landing"&&!Zr(s.target)){if(s.key==="ArrowRight"||s.key===" "||s.key==="PageDown"){s.preventDefault(),D("next");return}if(s.key==="ArrowLeft"||s.key==="PageUp"){s.preventDefault(),D("prev");return}if(s.key==="Home"){s.preventDefault(),D("goto",0);return}if(s.key==="End"){s.preventDefault(),D("goto",n.slides.length-1);return}if(s.key.toLowerCase()==="f"){s.preventDefault(),me();return}if(s.key.toLowerCase()==="r"){s.preventDefault(),B("reset");return}if(s.key.toLowerCase()==="p"){s.preventDefault(),B(d.store.getState().timer.status==="paused"?"resume":"pause");return}if(s.key.toLowerCase()==="m"){s.preventDefault(),Pe();return}if(s.key.toLowerCase()==="g"){s.preventDefault(),He("goto");return}if(s.key==="/"){s.preventDefault(),He("search");return}s.key.toLowerCase()==="n"&&d.mode==="presenter"&&(s.preventDefault(),mt())}}function me(){if(document.fullscreenElement){document.exitFullscreen().catch(()=>{});return}document.documentElement.requestFullscreen({navigationUI:"hide"}).catch(()=>{const s=document.querySelector("[data-fullscreen-status]");s&&(s.textContent="풀스크린을 시작할 수 없습니다. 브라우저 권한 또는 사용자 제스처가 필요합니다.")})}function Ce(){if(o==="full"){W("reduced");return}if(o==="reduced"){W("paused");return}W("full")}function he(){ut(c==="light"?"dark":"light")}function Pe(){W(o==="paused"?te:"paused")}function W(s,l={}){s!=="paused"&&(te=s),s!==o&&(o=s,Fr(e.id,o),document.body.dataset.motion=o,l.publish!==!1&&R(d),v())}function hn(s,l){dt({...h,[s]:Re(l,60,140)})}function dt(s,l={}){h=Bt(s),Wr(e.id,h),l.publish!==!1&&R(d),v()}function ut(s,l={}){s!==c&&(c=s,Vr(e.id,c),document.body.dataset.runtimeTheme=c,l.publish!==!1&&R(d),v())}function pt(){const s=d.store.getState(),l=yn();if(!l)return{label:"NO PLAN",detail:"NO PLAN",state:"none"};const y=Ot(s.timer)/1e3,k=ft(s.index),I=ft(s.index+1),w=20;return y<k-w?{label:"AHEAD",detail:`${Pt(y-k)} vs plan`,state:"ahead"}:y>I+w?{label:"BEHIND",detail:`${Pt(y-I)} vs plan`,state:"behind"}:{label:"ON TRACK",detail:`${tt(y)} / ${tt(l)}`,state:"on-track"}}function yn(){if(typeof e.durationSec=="number"&&e.durationSec>0)return e.durationSec;const s=e.slides.reduce((l,y)=>l+(y.timingSec||0),0);return s>0?s:0}function ft(s){const l=e.durationSec&&e.slides.length>0?e.durationSec/e.slides.length:0;return e.slides.slice(0,s).reduce((y,k)=>y+(k.timingSec||l),0)}function He(s){p={mode:s,query:s==="goto"?String(d.store.getState().index+1):""},v()}function gn(){p=null,v()}function vn(){if(!p)return;if(p.mode==="goto"){const l=Number.parseInt(p.query,10);Number.isFinite(l)&&D("goto",l-1),p=null,v();return}const s=Ue(p.query)[0];s&&D("goto",s.index),p=null,v()}function Ue(s){const l=s.trim().toLowerCase();return l?e.slides.map((y,k)=>({index:k,title:We(y.title||y.id||`Slide ${k+1}`),notes:y.notes||"",haystack:[y.title,y.body,y.notes,y.id].filter(Boolean).join(" ").toLowerCase()})).filter(y=>y.haystack.includes(l)).slice(0,8):[]}function je(s){const l=e.slides[s];return l?m[l.id]??l.notes??"":""}function bn(s){const l=e.slides[s];return!!(l&&Object.prototype.hasOwnProperty.call(m,l.id))}function mt(){g=je(d.store.getState().index),u=!0,v()}function ht(){u=!1,v()}function yt(){const s=e.slides[d.store.getState().index];s&&(m={...m,[s.id]:g},Ct(e.id,m),u=!1,E="노트 드래프트를 저장했습니다.",v())}function wn(){const s=e.slides[d.store.getState().index];if(!s)return;const l={...m};delete l[s.id],m=l,Ct(e.id,m),g=s.notes||"",u=!1,E="노트 드래프트를 원본으로 되돌렸습니다.",v()}function kn(){const s=[`# ${e.title} Speaker Notes`,"",...e.slides.flatMap((I,w)=>[`## ${w+1}. ${We(I.title||I.id)}`,"",je(w)||"_No speaker notes._",""])].join(`
`),l=new Blob([s],{type:"text/markdown;charset=utf-8"}),y=URL.createObjectURL(l),k=document.createElement("a");k.href=y,k.download=`${e.id}-speaker-notes.md`,k.click(),URL.revokeObjectURL(y),E="스피커 노트를 Markdown으로 내보냈습니다.",v()}async function Sn(){const s=Tn();try{await navigator.clipboard?.writeText(s),E="슬라이드쇼 URL을 복사했습니다."}catch{E=s}v()}async function $n(){if(C){M=!1,await vt(),b="off",v();return}M=!0,await gt(),v()}async function gt(){const s=navigator;if(!s.wakeLock){b="unsupported";return}try{C=await s.wakeLock.request("screen"),b="active",C.addEventListener("release",()=>{C=null,b="off",v()})}catch{C=null,b="denied"}}async function vt(){const s=C;C=null,s&&await s.release().catch(()=>{})}function bt(){document.visibilityState==="visible"&&M&&!C&&gt().then(v)}async function En(){if(A||L==="fallback"){wt(),L="off",v();return}const s=navigator,l=s.mediaDevices?.getDisplayMedia;if(!l){L="fallback",v();return}try{A=await l.call(s.mediaDevices,{video:!0,audio:!1}),L="active"}catch{L="fallback"}v()}function wt(){A?.getTracks().forEach(s=>s.stop()),A=null}function Fe(){p&&xn(),u&&Dn(),d.mode==="presenter"&&L!=="off"&&Ln(),E&&An()}function xn(){if(!p)return;const s=p.mode==="search"?Ue(p.query):[],l=p.mode==="goto"?"Go to slide":"Search slides",y=p.mode==="goto"?"Slide number":"Title, body, or notes";a.insertAdjacentHTML("beforeend",`
        <div class="command-overlay" role="dialog" aria-modal="true" aria-label="${l}">
          <div class="command-box">
            <div class="command-title mono">${l}</div>
            <input class="command-input" data-command-input value="${ve(p.query)}" placeholder="${y}" />
            <div class="command-results">
              ${p.mode==="search"?s.map(w=>kt(w.index,w.title,w.notes)).join("")||'<div class="command-empty">검색어를 입력하거나 결과가 없습니다.</div>':`<div class="command-empty">1-${n.slides.length} 범위의 번호를 입력하세요.</div>`}
            </div>
          </div>
        </div>
      `);const k=a.querySelector("[data-command-input]");window.requestAnimationFrame(()=>{k?.focus(),k?.setSelectionRange(0,k.value.length)}),k?.addEventListener("input",()=>{p={...p,query:k.value},I()}),k?.addEventListener("keydown",w=>{w.key==="Escape"&&(w.preventDefault(),gn()),w.key==="Enter"&&(w.preventDefault(),vn())}),a.querySelectorAll("[data-command-goto]").forEach(w=>{w.addEventListener("click",()=>{D("goto",Number(w.dataset.commandGoto)),p=null,v()})});function I(){if(p?.mode!=="search")return;const w=a.querySelector(".command-results");if(!w)return;const qe=Ue(p.query);w.innerHTML=qe.map(ae=>kt(ae.index,ae.title,ae.notes)).join("")||'<div class="command-empty">검색어를 입력하거나 결과가 없습니다.</div>',w.querySelectorAll("[data-command-goto]").forEach(ae=>{ae.addEventListener("click",()=>{D("goto",Number(ae.dataset.commandGoto)),p=null,v()})})}}function kt(s,l,y){const k=We(y).slice(0,86);return`
      <button class="command-result" data-command-goto="${s}" type="button">
        <span class="mono">${String(s+1).padStart(2,"0")}</span>
        <span>${ve(l)}</span>
        <small>${ve(k)}</small>
      </button>
    `}function Dn(){a.insertAdjacentHTML("beforeend",`
        <div class="command-overlay" role="dialog" aria-modal="true" aria-label="Speaker notes editor">
          <div class="notes-editor-box">
            <div class="command-title mono">Speaker Notes Draft</div>
            <textarea class="notes-editor" data-notes-editor>${ve(g)}</textarea>
            <div class="modal-actions">
              <button class="btn compact" data-action="notes-cancel">Cancel</button>
              <button class="btn compact" data-action="notes-reset">Reset</button>
              <button class="btn compact primary" data-action="notes-save">Save Draft</button>
            </div>
          </div>
        </div>
      `);const s=a.querySelector("[data-notes-editor]");window.requestAnimationFrame(()=>s?.focus()),s?.addEventListener("input",()=>{g=s.value}),s?.addEventListener("keydown",l=>{l.key==="Escape"&&(l.preventDefault(),ht()),l.key==="Enter"&&(l.metaKey||l.ctrlKey)&&(l.preventDefault(),yt())}),a.querySelector('[data-action="notes-cancel"]')?.addEventListener("click",ht),a.querySelector('[data-action="notes-reset"]')?.addEventListener("click",wn),a.querySelector('[data-action="notes-save"]')?.addEventListener("click",yt)}function Ln(){a.insertAdjacentHTML("beforeend",`
        <aside class="audience-mirror">
          <div class="mirror-header mono">AUDIENCE MIRROR · ${Rt(L)}</div>
          <div class="mirror-body" data-mirror-body></div>
        </aside>
      `);const s=a.querySelector("[data-mirror-body]");if(!s)return;if(L==="active"&&A){const y=document.createElement("video");y.autoplay=!0,y.muted=!0,y.playsInline=!0,y.srcObject=A,s.appendChild(y);return}const l=Z(n,"mirror-fallback-wrap");s.appendChild(l),J(l.querySelector(".slide-scaler"),n,d.store.getState().index,"presenter"),oe()}function An(){a.insertAdjacentHTML("beforeend",`<div class="transient-status mono" data-transient-status>${ve(E)}</div>`),window.setTimeout(()=>{E="",document.querySelector("[data-transient-status]")?.remove()},2400)}function Tn(){const s=new URL(window.location.href);return s.hash="slideshow",s.searchParams.set("sessionId",d.sessionId),s.toString()}}function Ur(){try{const e=window.localStorage.getItem("deckx-player:layout");return e?et({...Be,...JSON.parse(e)}):Be}catch{return Be}}function Mt(e){try{window.localStorage.setItem("deckx-player:layout",JSON.stringify(e))}catch{return}}function jr(e){try{const t=window.localStorage.getItem(`deckx-player:${e}:motion`)||window.localStorage.getItem("deckx-player:motion");if(t==="full"||t==="reduced"||t==="paused")return t}catch{return"full"}return"full"}function Fr(e,t){try{window.localStorage.setItem(`deckx-player:${e}:motion`,t)}catch{return}}function qr(e){try{const t=window.localStorage.getItem(`deckx-player:${e}:runtime-theme`)||window.localStorage.getItem("deckx-player:runtime-theme");if(t==="light"||t==="dark")return t}catch{return Tt}return Tt}function Vr(e,t){try{window.localStorage.setItem(`deckx-player:${e}:runtime-theme`,t)}catch{return}}function Br(e){try{const t=window.localStorage.getItem(`deckx-player:${e}:display-filters`);return t?Bt(JSON.parse(t)):be}catch{return be}}function Wr(e,t){try{window.localStorage.setItem(`deckx-player:${e}:display-filters`,JSON.stringify(t))}catch{return}}function Bt(e){return{brightness:Re(e.brightness??be.brightness,60,140),contrast:Re(e.contrast??be.contrast,60,140),saturation:Re(e.saturation??be.saturation,60,140)}}function zr(e){try{const t=window.localStorage.getItem(`deckx-player:${e}:notes-drafts`);if(!t)return{};const n=JSON.parse(t);return Object.fromEntries(Object.entries(n).filter(r=>typeof r[1]=="string"))}catch{return{}}}function Ct(e,t){try{window.localStorage.setItem(`deckx-player:${e}:notes-drafts`,JSON.stringify(t))}catch{return}}function et(e){return{...ot(e.presetId).layout,settingsOpen:!!e.settingsOpen}}function Kr(e){const t=String(e.getHours()).padStart(2,"0"),n=String(e.getMinutes()).padStart(2,"0"),r=String(e.getSeconds()).padStart(2,"0");return`${t}:${n}:${r}`}function tt(e){const t=Math.max(0,Math.floor(e)),n=Math.floor(t/60),r=t%60;return`${String(n).padStart(2,"0")}:${String(r).padStart(2,"0")}`}function Pt(e){return`${e>=0?"+":"-"}${tt(Math.abs(e))}`}function Gr(e){return e==="active"?"ACTIVE":e==="unsupported"?"UNSUPPORTED":e==="denied"?"DENIED":"OFF"}function Rt(e){return e==="active"?"ACTIVE":e==="fallback"?"FALLBACK":e==="unsupported"?"UNSUPPORTED":e==="denied"?"DENIED":"OFF"}function We(e){return e.replace(/<[^>]*>/g,"")}function ve(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Re(e,t,n){return Number.isFinite(e)?Math.min(n,Math.max(t,Math.round(e))):t}function Yr(e){if(e)return e;const t=window.location.hash.replace("#",""),r=new URLSearchParams(window.location.search).get("mode")||t;return r==="presenter"||r==="slideshow"||r==="landing"?r:"landing"}function _r(e){return e||new URLSearchParams(window.location.search).get("sessionId")||Ze("session")}function Jr(e,t){const n=new URL(window.location.href);n.hash=e,n.searchParams.set("sessionId",t),window.history.replaceState({},"",n.toString())}function Zr(e){return e instanceof HTMLElement?e.isContentEditable||["INPUT","TEXTAREA","SELECT"].includes(e.tagName):!1}var H=Uint8Array,se=Uint16Array,Qr=Int32Array,Wt=new H([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),zt=new H([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),ea=new H([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),Kt=function(e,t){for(var n=new se(31),r=0;r<31;++r)n[r]=t+=1<<e[r-1];for(var a=new Qr(n[30]),r=1;r<30;++r)for(var i=n[r];i<n[r+1];++i)a[i]=i-n[r]<<5|r;return{b:n,r:a}},Gt=Kt(Wt,2),Yt=Gt.b,ta=Gt.r;Yt[28]=258,ta[258]=28;var na=Kt(zt,0),ra=na.b,nt=new se(32768);for(var S=0;S<32768;++S){var _=(S&43690)>>1|(S&21845)<<1;_=(_&52428)>>2|(_&13107)<<2,_=(_&61680)>>4|(_&3855)<<4,nt[S]=((_&65280)>>8|(_&255)<<8)>>1}var we=(function(e,t,n){for(var r=e.length,a=0,i=new se(t);a<r;++a)e[a]&&++i[e[a]-1];var o=new se(t);for(a=1;a<t;++a)o[a]=o[a-1]+i[a-1]<<1;var c;if(n){c=new se(1<<t);var h=15-t;for(a=0;a<r;++a)if(e[a])for(var m=a<<4|e[a],p=t-e[a],u=o[e[a]-1]++<<p,g=u|(1<<p)-1;u<=g;++u)c[nt[u]>>h]=m}else for(c=new se(r),a=0;a<r;++a)e[a]&&(c[a]=nt[o[e[a]-1]++]>>15-e[a]);return c}),Ee=new H(288);for(var S=0;S<144;++S)Ee[S]=8;for(var S=144;S<256;++S)Ee[S]=9;for(var S=256;S<280;++S)Ee[S]=7;for(var S=280;S<288;++S)Ee[S]=8;var _t=new H(32);for(var S=0;S<32;++S)_t[S]=5;var aa=we(Ee,9,1),sa=we(_t,5,1),ze=function(e){for(var t=e[0],n=1;n<e.length;++n)e[n]>t&&(t=e[n]);return t},F=function(e,t,n){var r=t/8|0;return(e[r]|e[r+1]<<8)>>(t&7)&n},Ke=function(e,t){var n=t/8|0;return(e[n]|e[n+1]<<8|e[n+2]<<16)>>(t&7)},oa=function(e){return(e+7)/8|0},it=function(e,t,n){return(t==null||t<0)&&(t=0),(n==null||n>e.length)&&(n=e.length),new H(e.subarray(t,n))},ia=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],X=function(e,t,n){var r=new Error(t||ia[e]);if(r.code=e,Error.captureStackTrace&&Error.captureStackTrace(r,X),!n)throw r;return r},la=function(e,t,n,r){var a=e.length,i=r?r.length:0;if(!a||t.f&&!t.l)return n||new H(0);var o=!n,c=o||t.i!=2,h=t.i;o&&(n=new H(a*3));var m=function(he){var Pe=n.length;if(he>Pe){var W=new H(Math.max(Pe*2,he));W.set(n),n=W}},p=t.f||0,u=t.p||0,g=t.b||0,x=t.l,E=t.d,M=t.m,b=t.n,C=a*8;do{if(!x){p=F(e,u,1);var L=F(e,u+1,3);if(u+=3,L)if(L==1)x=aa,E=sa,M=9,b=5;else if(L==2){var ne=F(e,u,31)+257,Le=F(e,u+10,15)+4,z=ne+F(e,u+5,31)+1;u+=14;for(var K=new H(z),re=new H(19),P=0;P<Le;++P)re[ea[P]]=F(e,u+P*3,7);u+=Le*3;for(var v=ze(re),Ne=(1<<v)-1,Ae=we(re,v,1),P=0;P<z;){var Te=Ae[F(e,u,Ne)];u+=Te&15;var A=Te>>4;if(A<16)K[P++]=A;else{var D=0,B=0;for(A==16?(B=3+F(e,u,3),u+=2,D=K[P-1]):A==17?(B=3+F(e,u,7),u+=3):A==18&&(B=11+F(e,u,127),u+=7);B--;)K[P++]=D}}var q=K.subarray(0,ne),R=K.subarray(ne);M=ze(q),b=ze(R),x=we(q,M,1),E=we(R,b,1)}else X(1);else{var A=oa(u)+4,te=e[A-4]|e[A-3]<<8,d=A+te;if(d>a){h&&X(0);break}c&&m(g+te),n.set(e.subarray(A,d),g),t.b=g+=te,t.p=u=d*8,t.f=p;continue}if(u>C){h&&X(0);break}}c&&m(g+131072);for(var Xe=(1<<M)-1,ce=(1<<b)-1,de=u;;de=u){var D=x[Ke(e,u)&Xe],G=D>>4;if(u+=D&15,u>C){h&&X(0);break}if(D||X(2),G<256)n[g++]=G;else if(G==256){de=u,x=null;break}else{var Me=G-254;if(G>264){var P=G-257,Y=Wt[P];Me=F(e,u,(1<<Y)-1)+Yt[P],u+=Y}var ue=E[Ke(e,u)&ce],pe=ue>>4;ue||X(3),u+=ue&15;var R=ra[pe];if(pe>3){var Y=zt[pe];R+=Ke(e,u)&(1<<Y)-1,u+=Y}if(u>C){h&&X(0);break}c&&m(g+131072);var fe=g+Me;if(g<R){var me=i-R,Ce=Math.min(R,fe);for(me+g<0&&X(3);g<Ce;++g)n[g]=r[me+g]}for(;g<fe;++g)n[g]=n[g-R]}}t.l=x,t.p=de,t.b=g,t.f=p,x&&(p=1,t.m=M,t.d=E,t.n=b)}while(!p);return g!=n.length&&o?it(n,0,g):n.subarray(0,g)},ca=new H(0),V=function(e,t){return e[t]|e[t+1]<<8},j=function(e,t){return(e[t]|e[t+1]<<8|e[t+2]<<16|e[t+3]<<24)>>>0},Ge=function(e,t){return j(e,t)+j(e,t+4)*4294967296};function da(e,t){return la(e,{i:2},t&&t.out,t&&t.dictionary)}var rt=typeof TextDecoder<"u"&&new TextDecoder,ua=0;try{rt.decode(ca,{stream:!0}),ua=1}catch{}var pa=function(e){for(var t="",n=0;;){var r=e[n++],a=(r>127)+(r>223)+(r>239);if(n+a>e.length)return{s:t,r:it(e,n-1)};a?a==3?(r=((r&15)<<18|(e[n++]&63)<<12|(e[n++]&63)<<6|e[n++]&63)-65536,t+=String.fromCharCode(55296|r>>10,56320|r&1023)):a&1?t+=String.fromCharCode((r&31)<<6|e[n++]&63):t+=String.fromCharCode((r&15)<<12|(e[n++]&63)<<6|e[n++]&63):t+=String.fromCharCode(r)}};function Jt(e,t){if(t){for(var n="",r=0;r<e.length;r+=16384)n+=String.fromCharCode.apply(null,e.subarray(r,r+16384));return n}else{if(rt)return rt.decode(e);var a=pa(e),i=a.s,n=a.r;return n.length&&X(8),i}}var fa=function(e,t){return t+30+V(e,t+26)+V(e,t+28)},ma=function(e,t,n){var r=V(e,t+28),a=V(e,t+30),i=Jt(e.subarray(t+46,t+46+r),!(V(e,t+8)&2048)),o=t+46+r,c=ha(e,o,a,n,j(e,t+20),j(e,t+24),j(e,t+42)),h=c[0],m=c[1],p=c[2];return[V(e,t+10),h,m,i,o+a+V(e,t+32),p]},ha=function(e,t,n,r,a,i,o){var c=a==4294967295,h=i==4294967295,m=o==4294967295,p=t+n,u=c+h+m;if(r&&u){for(;t+4<p;t+=4+V(e,t+2))if(V(e,t)==1)return[c?Ge(e,t+4+8*h):a,h?Ge(e,t+4):i,m?Ge(e,t+4+8*(h+c)):o,1];r<2&&X(13)}return[a,i,o,0]};function ya(e,t){for(var n={},r=e.length-22;j(e,r)!=101010256;--r)(!r||e.length-r>65558)&&X(13);var a=V(e,r+8);if(!a)return{};var i=j(e,r+16),o=j(e,r-20)==117853008;if(o){var c=j(e,r-12);o=j(e,c)==101075792,o&&(a=j(e,c+32),i=j(e,c+48))}for(var h=0;h<a;++h){var m=ma(e,i,o),p=m[0],u=m[1],g=m[2],x=m[3],E=m[4],M=m[5],b=fa(e,M);i=E,p?p==8?n[x]=da(e.subarray(b,b+u),{out:new H(g)}):X(14,"unknown compression type "+p):n[x]=it(e,b,b+u)}return n}const ga="deckx.deck.v1";async function va(e){const t=new URL(e,window.location.href).toString(),n=await fetch(t);if(!n.ok)throw new Error(`DeckX package fetch failed (${n.status} ${n.statusText}).`);return Zt(new Uint8Array(await n.arrayBuffer()),t)}function Zt(e,t="inline.deckx"){const n=Aa(ya(e));return ba(n,t)}function ba(e,t){const n=Ta(e);if(!n)throw new Error("DeckX package is missing manifest.json.");const r=xa(Oe(e,n),n),a=at(n),i=[],o=m=>{const p=e[m];if(!p)throw new Error(`DeckX asset is missing: ${m}`);const u=p.buffer.slice(p.byteOffset,p.byteOffset+p.byteLength),g=URL.createObjectURL(new Blob([u],{type:Pa(m)}));return i.push(g),g},c=r.theme?.css?Qt(Oe(e,ie(a,r.theme.css)),at(ie(a,r.theme.css)),o):"";return{deck:{id:r.id,title:r.title,aspectRatio:r.aspectRatio,durationSec:r.durationSec,theme:{name:"DeckX Package",className:`deckx-package-${Ca(r.id)}`},metadata:wa(r.metadata,a,o),slides:r.slides.map(m=>ka(m,e,a,o))},cssText:c,sourceUrl:t,dispose:()=>{i.forEach(m=>URL.revokeObjectURL(m))}}}function wa(e,t,n){if(e)return{version:e.version,description:e.description,authors:e.authors?.map(r=>({...r})),tags:e.tags?[...e.tags]:void 0,language:e.language,license:e.license,homepage:e.homepage,repository:e.repository,thumbnail:e.thumbnail?n(ie(t,e.thumbnail)):void 0,createdAt:e.createdAt,updatedAt:e.updatedAt,generator:e.generator?{...e.generator}:void 0,custom:e.custom?{...e.custom}:void 0}}function ka(e,t,n,r){const a=ie(n,e.source),i=e.notes?ie(n,e.notes):null,o=Sa(Oe(t,a),at(a),r);return{id:e.id,title:e.title,notes:i&&t[i]?Oe(t,i):void 0,footer:e.footer,className:e.className,timingSec:e.timingSec,render:()=>o}}function Sa(e,t,n){if(/<\/?(html|head|body)\b/i.test(e))throw new Error("DeckX slide HTML must be a fragment, not a full document.");const r=document.createElement("template");if(r.innerHTML=e,r.content.querySelector("script"))throw new Error("Safe DeckX slides cannot include <script>.");return r.content.querySelectorAll("*").forEach(a=>{Array.from(a.attributes).forEach(i=>{const o=i.name.toLowerCase(),c=i.value;if(o.startsWith("on"))throw new Error("Safe DeckX slides cannot include inline event handlers.");if(o==="style"){a.setAttribute(o,Qt(c,t,n));return}if(o==="src"||o==="poster"||$a(a,o,c)){a.setAttribute(o,lt(c,t,n));return}o==="srcset"&&a.setAttribute(o,Ea(c,t,n))})}),r.innerHTML}function $a(e,t,n){return!(t!=="href"&&t!=="xlink:href"||e.tagName.toLowerCase()==="a"&&ct(n))}function Ea(e,t,n){return e.split(",").map(r=>{const a=r.trim().split(/\s+/);return a[0]?(a[0]=lt(a[0],t,n),a.join(" ")):""}).filter(Boolean).join(", ")}function Qt(e,t,n){return e.replace(/url\(\s*(['"]?)([^'")]+)\1\s*\)/gi,(r,a,i)=>{if(tn(i))return`url("${i}")`;if(ct(i))throw new Error(`Safe DeckX CSS cannot reference external assets: ${i}`);return`url("${lt(i,t,n)}")`})}function lt(e,t,n){if(tn(e))return e;if(ct(e))throw new Error(`Safe DeckX slides cannot reference external assets: ${e}`);const r=e.indexOf("#"),a=r>=0?e.slice(r):"",i=r>=0?e.slice(0,r):e,o=ie(t,i.split("?")[0]);return`${n(o)}${a}`}function xa(e,t){const n=JSON.parse(e);if(!ee(n))throw new Error(`${t} must contain a JSON object.`);if(n.schemaVersion!==ga)throw new Error(`Unsupported DeckX schemaVersion: ${String(n.schemaVersion)}`);if(!le(n.id))throw new Error("DeckX manifest is missing id.");if(!le(n.title))throw new Error("DeckX manifest is missing title.");if(!Ma(n.aspectRatio))throw new Error("DeckX manifest has invalid aspectRatio.");if(!Array.isArray(n.slides)||n.slides.length===0)throw new Error("DeckX manifest must include at least one slide.");return n.metadata!==void 0&&Da(n.metadata),n.slides.forEach((r,a)=>La(r,a)),n}function Da(e){if(!ee(e))throw new Error("DeckX manifest metadata must be an object.");const t=e;if(["version","description","language","license","homepage","repository","thumbnail","createdAt","updatedAt"].forEach(n=>{if(t[n]!==void 0&&typeof t[n]!="string")throw new Error(`DeckX metadata.${n} must be a string.`)}),t.tags!==void 0&&(!Array.isArray(t.tags)||!t.tags.every(n=>typeof n=="string")))throw new Error("DeckX metadata.tags must be an array of strings.");if(t.authors!==void 0){if(!Array.isArray(t.authors))throw new Error("DeckX metadata.authors must be an array.");t.authors.forEach((n,r)=>{if(!ee(n)||!le(n.name))throw new Error(`DeckX metadata.authors[${r}] must include name.`)})}if(t.generator!==void 0&&(!ee(t.generator)||!le(t.generator.name)))throw new Error("DeckX metadata.generator must include name.");if(t.custom!==void 0&&!ee(t.custom))throw new Error("DeckX metadata.custom must be an object.")}function La(e,t){if(!ee(e))throw new Error(`DeckX slide ${t+1} must be an object.`);if(!le(e.id))throw new Error(`DeckX slide ${t+1} is missing id.`);if(!le(e.source))throw new Error(`DeckX slide ${t+1} is missing source.`)}function Aa(e){const t={};return Object.entries(e).forEach(([n,r])=>{n.endsWith("/")||(t[en(n)]=r)}),t}function Ta(e){if(e["manifest.json"])return"manifest.json";const t=Object.keys(e).filter(n=>n.endsWith("/manifest.json"));return t.length===1?t[0]:null}function Oe(e,t){const n=e[t];if(!n)throw new Error(`DeckX package entry is missing: ${t}`);return Jt(n)}function ie(e,t){return en([e,t].filter(Boolean).join("/"))}function en(e){const t=e.replaceAll("\\","/");if(!t||t.startsWith("/")||t.includes("\0"))throw new Error(`Invalid DeckX package path: ${e}`);const n=[];if(t.split("/").forEach(r=>{if(!(!r||r===".")){if(r===".."){if(n.length===0)throw new Error(`DeckX package path escapes root: ${e}`);n.pop();return}n.push(r)}}),n.length===0)throw new Error(`Invalid DeckX package path: ${e}`);return n.join("/")}function at(e){const t=e.lastIndexOf("/");return t===-1?"":e.slice(0,t)}function ee(e){return typeof e=="object"&&e!==null}function le(e){return typeof e=="string"&&e.trim().length>0}function Ma(e){return e==="16:9"||e==="4:3"?!0:ee(e)&&typeof e.width=="number"&&typeof e.height=="number"&&Number.isFinite(e.width)&&Number.isFinite(e.height)&&e.width>0&&e.height>0}function tn(e){return e.startsWith("#")||e.startsWith("data:")||e.startsWith("blob:")||e.startsWith("mailto:")||e.startsWith("tel:")}function ct(e){return/^[a-z][a-z0-9+.-]*:/i.test(e)||e.startsWith("//")}function Ca(e){return e.toLowerCase().replace(/[^a-z0-9-]+/g,"-").replace(/^-+|-+$/g,"")||"deck"}function Pa(e){const t=e.toLowerCase();return t.endsWith(".svg")?"image/svg+xml":t.endsWith(".png")?"image/png":t.endsWith(".jpg")||t.endsWith(".jpeg")?"image/jpeg":t.endsWith(".gif")?"image/gif":t.endsWith(".webp")?"image/webp":t.endsWith(".css")?"text/css":t.endsWith(".html")?"text/html":t.endsWith(".md")?"text/markdown":"application/octet-stream"}const Ra={en:{lang:"en",navLabel:"Landing sections",nav:[{href:"#start",label:"Start"},{href:"#ai-native",label:"AI Native"},{href:"#deckx",label:"DeckX"},{href:"#concepts",label:"Basics"},{href:"#samples",label:"Samples"}],languageHref:"/ko/",languageLabel:"한국어",playerCta:"Open Player",hero:{badge:"AI-NATIVE HTML DECKS",title:"Present AI-generated HTML without converting it to PowerPoint",body:"Dynamic content loses its value when it is rebuilt as static slides. DeckX Player keeps HTML authored by LLMs and agents in a .deckx package, then opens it from a URL or local zip with presenter view and slideshow view.",points:["Use HTML as-is","Motion-first presenting","Agent-native authoring"],primary:"Open Player",secondary:"Watch a moving sample"},preview:{openTitle:"Open DeckX",recent:"Recent DeckX",samples:"Official Samples",uploads:"Uploads",present:"Start presenting",motion:"Motion control"},open:{label:"Open a DeckX URL",button:"Open"},starter:{eyebrow:"GET STARTED",title:"Start from a copyable DeckX starter project",lead:"deckx-project/deckx-starter-basic is the public starter repository for creating a first DeckX deck. It gives humans and agents the same source-folder contract with README, AGENTS.md, validation, and packaging scripts.",repoButton:"View public repo",steps:[{title:"Clone",code:"git clone https://github.com/deckx-project/deckx-starter-basic.git"},{title:"Edit",code:"deck/manifest.json, deck/slides, deck/notes, deck/styles"},{title:"Validate",code:"npm run validate"},{title:"Pack",code:"npm run pack"}]},why:{eyebrow:"WHY NOW",title:"In the AI era, HTML is a better presentation source than PPT",lead:"Claude Artifacts, coding agents, and HTML prototypes have already changed how content is produced. The remaining friction is packaging, validating, and reopening that HTML every time it needs to be presented.",cards:[{title:"No PPT conversion",body:"Keep the original HTML/CSS output from LLMs instead of flattening it into screenshots or rebuilt slide objects."},{title:"Motion-first",body:"Let the presenter control CSS animation, transitions, data flow, and staged reveals with Full, Reduced, and Paused modes."},{title:"Agent-native",body:"Expose DeckX authoring rules and validation scripts so LLM agents can create a deck and check it directly in the player."}]},format:{eyebrow:"DeckX FORMAT",title:"DeckX turns HTML presentations into exchangeable files",lead:"DeckX is a new package format. It bundles HTML slides, speaker notes, styles, image assets, and metadata into one zip-based .deckx file that the player opens with the same runtime contract.",cards:[{title:"File boundary",body:"Bundle manifest.json, slides, notes, styles, and assets into a single .deckx zip package."},{title:"URL input",body:"The player reads ?deck=<url> and loads any DeckX deck into the same runtime."},{title:"Safe default",body:"A normal DeckX package is a script-free Safe Deck, and speaker notes stay out of the slideshow view."},{title:"Verifiable",body:"Schema, asset paths, notes coverage, and visual overflow can be checked before a deck is presented."}]},flow:{eyebrow:"PLAYER FLOW",title:"The player absorbs the repetitive packaging work",lead:"Using HTML as a presentation file usually means coordinating zip files, URLs, first-slide checks, presenter view, audience view, and motion settings. DeckX Player folds those steps into one opening flow.",cards:[{title:"Before opening",body:"Choose a DeckX URL, local zip, recent deck, or official sample."},{title:"After opening",body:"Start from a first-slide preview and a clear presentation launch action."},{title:"When details matter",body:"Validation, notes, and session metadata stay available without dominating the first screen."}]},concepts:{eyebrow:"DeckX BASICS",title:"Four questions that define DeckX",lead:"DeckX is a new format, so the words need to be clear first. Presenters do not need a new editor; they need to understand how HTML presentations can be opened and operated like files.",answers:[{title:"What is DeckX?",body:"DeckX is the name of the format and runtime for packaging HTML-based presentations as exchangeable presentation files."},{title:"What is DeckX Player?",body:"DeckX Player is a browser-based runtime that opens .deckx HTML presentation packages with preview, presenter view, slideshow view, speaker notes, and motion controls."},{title:"What is a DeckX package?",body:"A DeckX package is a zip-based .deckx file containing manifest.json, HTML slides, Markdown speaker notes, styles, and assets."},{title:"Why is it useful?",body:"You can present HTML motion and layout directly, without rebuilding it in PPT, while sharing notes and assets as one file or URL."}],benefits:[{title:"Keep HTML expression",body:"Preserve CSS motion, data flow, and interactive layout instead of flattening them into images."},{title:"Presentation operations included",body:"Preview, presenter view, slideshow view, notes, timer, and motion controls are handled by the player."},{title:"Shareable file",body:"Send a .deckx zip or URL and reopen it in the same runtime."}]},motion:{eyebrow:"MOTION",title:"Full, Reduced, Paused",cards:[{title:"Full",body:"Run deck CSS animation and transitions as authored."},{title:"Reduced",body:"Shorten motion for accessibility needs or presentation-room constraints."},{title:"Paused",body:"Pause CSS animation for review, explanation, or controlled moments during a talk."}]},samples:{eyebrow:"OFFICIAL SAMPLES",title:"Open moving DeckX examples immediately",lead:"Official samples stay separate from user history. Compare motion decks, static explanations, 4:3 canvases, image-heavy decks, and long-deck navigation in the same runtime.",openLabel:"Open in Player"},strategy:{eyebrow:"NEXT STRATEGY",title:"Make DeckX easy for search engines and AI agents to read first",cards:[{title:"English as the default",body:"Use English as the canonical discovery surface for global search and AI answer engines, while keeping a Korean version for local users."},{title:"llms.txt review",body:"Publish DeckX definitions, package specs, authoring guides, and sample URLs in a concise structure that LLMs can read quickly."},{title:"MCP and skills review",body:"Validate whether DeckX authoring skills, validation scripts, and sample generation should become an agent-native creation workflow."},{title:"Search and AI answer evidence",body:"Align static HTML, canonical links, hreflang, sitemap, robots.txt, JSON-LD, and public Markdown docs so crawlers and AI answer engines read the same facts."},{title:"Team features later",body:"SSO, upload, team history, and team libraries are not implemented features today. Treat them only as future product candidates."}]}},ko:{lang:"ko",navLabel:"랜딩 섹션",nav:[{href:"#start",label:"시작하기"},{href:"#ai-native",label:"AI Native"},{href:"#deckx",label:"DeckX"},{href:"#concepts",label:"개념"},{href:"#samples",label:"샘플"}],languageHref:"/",languageLabel:"English",playerCta:"플레이어 열기",hero:{badge:"AI-NATIVE HTML DECKS",title:"AI가 만든 HTML을 PPT로 바꾸지 않고 그대로 발표하세요",body:"동적인 콘텐츠는 PPT로 다시 옮기는 순간 표현력이 줄어듭니다. DeckX Player는 LLM과 agent가 만든 HTML 발표를 .deckx 패키지로 고정하고, URL이나 로컬 zip에서 열어 발표자뷰와 슬라이드쇼로 바로 실행합니다.",points:["HTML 그대로 사용","모션 중심 발표","Agent-native authoring"],primary:"플레이어 열기",secondary:"움직이는 샘플 보기"},preview:{openTitle:"DeckX 열기",recent:"Recent DeckX",samples:"Official Samples",uploads:"Uploads",present:"발표 시작",motion:"모션 제어"},open:{label:"DeckX URL 빠르게 열기",button:"열기"},starter:{eyebrow:"GET STARTED",title:"복사해서 바로 시작하는 DeckX 스타터 프로젝트",lead:"deckx-project/deckx-starter-basic은 첫 DeckX를 만들기 위한 public starter repo입니다. README, AGENTS.md, 검증/패키징 스크립트를 함께 제공해 사람과 agent가 같은 source-folder 계약으로 수정할 수 있습니다.",repoButton:"Public repo 보기",steps:[{title:"Clone",code:"git clone https://github.com/deckx-project/deckx-starter-basic.git"},{title:"Edit",code:"deck/manifest.json, deck/slides, deck/notes, deck/styles"},{title:"Validate",code:"npm run validate"},{title:"Pack",code:"npm run pack"}]},why:{eyebrow:"WHY NOW",title:"AI 시대에는 PPT보다 HTML이 자연스럽습니다",lead:"Claude Artifacts, coding agent, HTML prototype 흐름이 이미 콘텐츠 제작 방식을 바꾸고 있습니다. 문제는 만든 HTML을 매번 발표용으로 묶고, 검증하고, 다시 여는 일이 귀찮다는 점입니다.",cards:[{title:"PPT 변환 없이",body:"LLM이 만든 HTML/CSS 결과물을 이미지나 슬라이드 캡처로 죽이지 않고 원본 표현 그대로 발표합니다."},{title:"모션 중심",body:"CSS animation, transition, 데이터 흐름, 단계적 reveal을 발표자가 Full, Reduced, Paused로 제어합니다."},{title:"Agent-native",body:"DeckX 작성 규칙과 검증 스크립트를 skill로 제공해 LLM agent가 덱을 만들고 바로 플레이어에서 확인하게 합니다."}]},format:{eyebrow:"DeckX FORMAT",title:"DeckX는 HTML 발표를 교환 가능한 파일로 만드는 포맷입니다",lead:"DeckX는 새 파일 포맷입니다. HTML 슬라이드, 발표자 노트, 스타일, 이미지 자산, 메타데이터를 하나의 .deckx zip으로 묶고 플레이어가 동일한 런타임 계약으로 엽니다.",cards:[{title:"파일 경계",body:"manifest.json, slides, notes, styles, assets를 하나의 .deckx zip으로 묶습니다."},{title:"URL 입력",body:"플레이어는 ?deck=<url>을 읽고 같은 런타임에 어떤 DeckX 덱이든 로드합니다."},{title:"안전한 기본값",body:"일반 DeckX는 script 없는 Safe Deck이며 발표자 노트는 슬라이드쇼에서 제외됩니다."},{title:"검증 가능",body:"schema, asset path, notes coverage, overflow를 검사해 발표 파일을 재현 가능한 단위로 다룹니다."}]},flow:{eyebrow:"PLAYER FLOW",title:"패키징 반복을 플레이어가 흡수합니다",lead:"HTML을 발표 파일처럼 쓰려면 zip, URL, 첫 화면 확인, 발표자뷰, 관객 화면, 모션 옵션을 매번 맞춰야 합니다. DeckX Player는 이 반복 작업을 하나의 열기 흐름으로 묶습니다.",cards:[{title:"열기 전",body:"DeckX URL, 로컬 zip, 최근 DeckX, 공식 샘플 중 하나를 선택합니다."},{title:"열었을 때",body:"첫 슬라이드 미리보기와 발표 시작 버튼을 중심으로 표시합니다."},{title:"상세 정보",body:"validation, notes, session 같은 DeckX 메타는 필요할 때만 펼쳐봅니다."}]},concepts:{eyebrow:"DeckX BASICS",title:"DeckX를 이해하는 네 가지 질문",lead:"DeckX는 처음 보는 포맷이므로 먼저 용어가 분명해야 합니다. 발표자는 새 편집기를 배우는 것이 아니라, HTML 발표를 파일처럼 열고 운영하는 방식을 이해하면 됩니다.",answers:[{title:"DeckX란?",body:"DeckX는 HTML 기반 발표를 교환 가능한 패키지로 만들고, 같은 플레이어에서 재생하기 위한 포맷과 런타임의 이름입니다."},{title:"DeckX Player란?",body:"DeckX Player는 .deckx HTML presentation package를 열어 미리보기, 발표자뷰, 슬라이드쇼, 발표자 노트, 모션 제어를 제공하는 웹 기반 발표 런타임입니다."},{title:"DeckX package란?",body:"DeckX package는 manifest.json, HTML slides, Markdown speaker notes, styles, assets를 하나로 묶은 zip 기반 .deckx 발표 파일입니다."},{title:"뭐가 좋은가요?",body:"PPT로 다시 옮기지 않아도 HTML의 모션과 레이아웃을 그대로 발표할 수 있고, 발표자 노트와 자산까지 하나의 파일 또는 URL로 공유할 수 있습니다."}],benefits:[{title:"HTML 표현력 유지",body:"CSS motion, 데이터 흐름, 인터랙티브한 레이아웃을 이미지 캡처로 죽이지 않고 발표합니다."},{title:"발표 운영 내장",body:"미리보기, 발표자뷰, 슬라이드쇼, 노트, 타이머, 모션 제어를 플레이어가 담당합니다."},{title:"공유 가능한 파일",body:".deckx zip이나 URL로 전달해 같은 런타임에서 다시 열고 발표할 수 있습니다."}]},motion:{eyebrow:"MOTION",title:"Full, Reduced, Paused",cards:[{title:"Full",body:"덱 CSS animation과 transition을 그대로 재생합니다."},{title:"Reduced",body:"모션을 거의 즉시 끝나게 줄여 발표장 환경이나 접근성 요구에 맞춥니다."},{title:"Paused",body:"모든 CSS animation을 일시정지합니다. 모션 데모 검토나 발표 중 정지에 유용합니다."}]},samples:{eyebrow:"OFFICIAL SAMPLES",title:"움직이는 DeckX를 바로 열어볼 수 있습니다",lead:"공식 샘플은 사용자 히스토리와 분리됩니다. 모션, 정적 설명, 4:3 캔버스, 이미지 자산, 롱덱 탐색을 같은 런타임에서 비교할 수 있습니다.",openLabel:"플레이어에서 열기"},strategy:{eyebrow:"NEXT STRATEGY",title:"먼저 검색 엔진과 AI agent가 읽기 쉬운 경로를 만듭니다",cards:[{title:"영어를 기본값으로",body:"글로벌 검색과 AI answer engine 유입을 위해 canonical discovery surface는 영어로 두고, 한국어 버전은 지역 사용자와 설명 보강용으로 함께 제공합니다."},{title:"llms.txt 검토",body:"DeckX 정의, package spec, 작성 가이드, 샘플 URL을 LLM이 빠르게 읽도록 공개 문서 구조를 정리합니다."},{title:"MCP와 skill 검토",body:"DeckX authoring skill, validation script, 샘플 생성 흐름을 agent-native 제작 경험으로 제공할지 먼저 검증합니다."},{title:"검색과 AI 답변 근거",body:"정적 HTML, canonical, hreflang, sitemap, robots.txt, JSON-LD, 공개 Markdown 문서로 검색 엔진과 AI answer engine이 같은 사실을 읽게 합니다."},{title:"팀 기능은 이후",body:"SSO, 업로드, 팀 이력은 아직 구현된 기능이 아니며, 제품화 이후 확장 후보로만 다룹니다."}]}}};function Oa(e,t){const n=Ra[t.locale];e.innerHTML=`
    <main class="project-landing" lang="${n.lang}">
      <header class="project-nav">
        <a class="project-mark" href="${f(t.homeHref)}">
          <img class="brand-icon" src="/brand/deckx-icon.svg" alt="" aria-hidden="true" />
          <span>DeckX Player</span>
        </a>
        <nav class="project-nav-links" aria-label="${f(n.navLabel)}">
          ${n.nav.map(a=>`<a href="${f(a.href)}">${f(a.label)}</a>`).join("")}
        </nav>
        <a class="btn compact" href="${f(n.languageHref)}">${f(n.languageLabel)}</a>
        <a class="btn compact" href="${f(t.playerHref)}">${f(n.playerCta)}</a>
      </header>

      <section class="project-hero">
        <div class="project-hero-copy">
          <span class="badge mono">${f(n.hero.badge)}</span>
          <h1>${f(n.hero.title)}</h1>
          <p>${U(n.hero.body)}</p>
          <div class="project-hero-points" aria-label="DeckX positioning">
            ${n.hero.points.map(a=>`<span>${f(a)}</span>`).join("")}
          </div>
          <div class="project-actions">
            <a class="btn primary" href="${f(t.playerHref)}">${f(n.hero.primary)}</a>
            <a class="btn" href="${f(t.defaultDemoHref)}">${f(n.hero.secondary)}</a>
          </div>
        </div>
        ${Ia(n)}
      </section>

      <section class="project-section project-open-section">
        <form class="project-open" data-project-deckx-form>
          <label for="project-deckx-url">${f(n.open.label)}</label>
          <div class="project-open-row">
            <input
              id="project-deckx-url"
              data-project-deckx-input
              type="text"
              inputmode="url"
              autocomplete="url"
              value="${f(t.deckxUrlValue)}"
              aria-label="DeckX URL"
            />
            <button class="btn primary" type="submit">${f(n.open.button)}</button>
          </div>
        </form>
      </section>

      ${Na(n,t)}
      ${Ye("ai-native",n.why,"info-grid")}
      ${Xa(n)}
      ${Ye("",n.flow,"info-grid modes")}
      ${Ha(n)}
      ${Ye("",n.motion,"info-grid modes")}
      ${Ua(n,t.demoOptions)}
      ${ja(n)}
    </main>
  `;const r=e.querySelector("[data-project-deckx-form]");r?.addEventListener("submit",a=>{a.preventDefault();const o=r.querySelector("[data-project-deckx-input]")?.value.trim();o&&t.onOpenDeckxUrl(o)})}function Ia(e){return`
    <div class="project-product-preview" aria-label="DeckX Player preview">
      <div class="preview-chrome">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div class="preview-layout">
        <aside>
          <strong>${f(e.preview.openTitle)}</strong>
          <span>${f(e.preview.recent)}</span>
          <span>${f(e.preview.samples)}</span>
          <span>${f(e.preview.uploads)}</span>
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
            <span>${f(e.preview.present)}</span>
            <span>${f(e.preview.motion)}</span>
          </div>
        </section>
      </div>
    </div>
  `}function Na(e,t){return`
    <section class="project-section project-start-section" id="start">
      <div class="section-heading">
        <p class="mono">${f(e.starter.eyebrow)}</p>
        <h2>${f(e.starter.title)}</h2>
        <span class="section-lead">${U(e.starter.lead)}</span>
      </div>
      <div class="project-start-layout">
        <div class="project-start-copy">
          <pre class="deckx-tree" aria-label="DeckX starter project structure"><code>deckx-starter-basic/
  deck/
    manifest.json
    slides/
    notes/
    styles/
    assets/
  package.json
  README.md
  AGENTS.md</code></pre>
          <div class="project-actions">
            <a class="btn primary" href="${f(t.starterSourceHref)}">${f(e.starter.repoButton)}</a>
          </div>
        </div>
        <ol class="project-start-steps">
          ${e.starter.steps.map((n,r)=>`
            <li>
              <span>${r+1}</span>
              <strong>${f(n.title)}</strong>
              <code>${f(n.code)}</code>
            </li>
          `).join("")}
        </ol>
      </div>
    </section>
  `}function Ye(e,t,n){return`
    <section class="project-section"${e?` id="${f(e)}"`:""}>
      <div class="section-heading">
        <p class="mono">${f(t.eyebrow)}</p>
        <h2>${f(t.title)}</h2>
        ${t.lead?`<span class="section-lead">${U(t.lead)}</span>`:""}
      </div>
      <div class="${f(n)}">
        ${t.cards.map(r=>`
          <article>
            <strong>${U(r.title)}</strong>
            <span>${U(r.body)}</span>
          </article>
        `).join("")}
      </div>
    </section>
  `}function Xa(e){return`
    <section class="project-section" id="deckx">
      <div class="section-heading">
        <p class="mono">${f(e.format.eyebrow)}</p>
        <h2>${f(e.format.title)}</h2>
        <span class="section-lead">${U(e.format.lead)}</span>
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
          ${e.format.cards.map(t=>`
            <article>
              <strong>${f(t.title)}</strong>
              <span>${U(t.body)}</span>
            </article>
          `).join("")}
        </div>
      </div>
    </section>
  `}function Ha(e){return`
    <section class="project-section" id="concepts">
      <div class="section-heading">
        <p class="mono">${f(e.concepts.eyebrow)}</p>
        <h2>${f(e.concepts.title)}</h2>
        <span class="section-lead">${U(e.concepts.lead)}</span>
      </div>
      ${e.concepts.answers.map(t=>`
        <div class="project-answer-block">
          <strong>${f(t.title)}</strong>
          <span>${U(t.body)}</span>
        </div>
      `).join("")}
      <div class="info-grid modes">
        ${e.concepts.benefits.map(t=>`
          <article>
            <strong>${f(t.title)}</strong>
            <span>${U(t.body)}</span>
          </article>
        `).join("")}
      </div>
    </section>
  `}function Ua(e,t){return`
    <section class="project-section" id="samples">
      <div class="section-heading">
        <p class="mono">${f(e.samples.eyebrow)}</p>
        <h2>${f(e.samples.title)}</h2>
        <span class="section-lead">${U(e.samples.lead)}</span>
      </div>
      <div class="project-demo-grid">
        ${t.map(n=>Fa(n,e.samples.openLabel)).join("")}
      </div>
    </section>
  `}function ja(e){return`
    <section class="project-section" id="workspace">
      <div class="section-heading">
        <p class="mono">${f(e.strategy.eyebrow)}</p>
        <h2>${f(e.strategy.title)}</h2>
      </div>
      <div class="info-grid modes">
        ${e.strategy.cards.map(t=>`
          <article>
            <strong>${U(t.title)}</strong>
            <span>${U(t.body)}</span>
          </article>
        `).join("")}
      </div>
    </section>
  `}function Fa(e,t){return`
    <article class="project-demo-card">
      <div>
        <h3>${f(e.label)}</h3>
        <p>${f(e.description)}</p>
        <span>${f(e.detail)}</span>
      </div>
      <code>${f(e.url)}</code>
      <a class="btn compact" href="${f(e.href)}">${f(t)}</a>
    </article>
  `}function U(e){return f(e).replaceAll(".deckx","<code>.deckx</code>").replaceAll("manifest.json","<code>manifest.json</code>").replaceAll("?deck=&lt;url&gt;","<code>?deck=&lt;url&gt;</code>").replaceAll("llms.txt","<code>llms.txt</code>").replaceAll("robots.txt","<code>robots.txt</code>").replaceAll("sitemap","<code>sitemap</code>").replaceAll("JSON-LD","<code>JSON-LD</code>").replaceAll("hreflang","<code>hreflang</code>")}function f(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}const nn=document.getElementById("app");if(!nn)throw new Error("Missing #app mount element");const xe=nn,rn="deckx-package-style",an="deckx-player:history:v1",qa=8,Va="https://github.com/deckx-project/deckx-starter-basic",Q=[{id:"dogfood",label:"DeckX zip 데모",description:"public/decks/deckx-player-demo.deckx 파일을 그대로 로드",detail:"이 프로젝트 자체를 DeckX package로 설명하는 도그푸딩 덱입니다.",url:"/decks/deckx-player-demo.deckx"},{id:"static",label:"정적 프레임워크 데모",description:"Deck/Runtime 경계를 설명하는 DeckX 샘플",detail:"텍스트 중심 발표가 기본 플레이어 기능과 어떻게 결합되는지 확인합니다.",url:"/decks/static-demo.deckx"},{id:"motion",label:"모션 그래픽 데모",description:"같은 런타임에 CSS motion DeckX를 교체한 샘플",detail:"CSS animation이 포함된 덱에서 Full, Reduced, Paused 차이를 확인합니다.",url:"/decks/motion-demo.deckx"},{id:"classic",label:"4:3 캔버스 데모",description:"DeckX aspectRatio가 렌더러에 반영되는 샘플",detail:"16:9가 아닌 DeckX canvas도 발표자뷰와 슬라이드쇼에 동일하게 반영됩니다.",url:"/decks/classic-4x3-demo.deckx"},{id:"image-heavy",label:"이미지 헤비 데모",description:"96개 package-local 이미지를 로드하는 asset stress 샘플",detail:"이미지가 많은 DeckX에서 preview, overview, object URL 처리 비용을 확인합니다.",url:"/decks/image-heavy-demo.deckx"},{id:"long-120",label:"120장 롱덱 데모",description:"많은 페이지에서 goto, search, overview 사용성을 확인하는 샘플",detail:"120장 DeckX를 통해 발표자뷰 썸네일 목록과 키보드 탐색 한계를 관찰합니다.",url:"/decks/long-120-demo.deckx"},{id:"long-image",label:"120장 이미지 롱덱 데모",description:"긴 DeckX와 package-local 이미지를 함께 로드하는 stress 샘플",detail:"120장 전체에 이미지가 포함된 DeckX로 탐색, 검색, 썸네일, asset 처리를 함께 관찰합니다.",url:"/decks/long-image-demo.deckx"}],_e={en:{dogfood:{label:"DeckX zip demo",description:"Loads public/decks/deckx-player-demo.deckx as a packaged presentation",detail:"A dogfooding deck that explains DeckX Player using the DeckX package format itself."},static:{label:"Static framework demo",description:"A DeckX sample explaining the Deck/Runtime boundary",detail:"Shows how text-heavy talks combine with the player basics."},motion:{label:"Motion graphics demo",description:"A CSS motion DeckX loaded into the same runtime",detail:"Compare Full, Reduced, and Paused motion modes with an animated deck."},classic:{label:"Classic 4:3 canvas demo",description:"A sample showing DeckX aspectRatio support",detail:"Confirms that non-16:9 DeckX canvases render consistently in presenter and slideshow views."},"image-heavy":{label:"Image-heavy demo",description:"An asset stress sample with 96 package-local images",detail:"Checks preview, overview, and object URL behavior for image-heavy decks."},"long-120":{label:"Long 120-slide demo",description:"A sample for goto, search, and overview behavior across many pages",detail:"Exercises presenter thumbnails and keyboard navigation limits with a 120-slide DeckX."},"long-image":{label:"Long image demo",description:"A stress sample combining long-deck navigation with package-local images",detail:"Checks navigation, search, thumbnails, and asset handling across 120 image-backed slides."}},ko:Object.fromEntries(Q.map(e=>[e.id,{label:e.label,description:e.description,detail:e.detail}]))};let ke=null,Se=null;window.addEventListener("beforeunload",()=>{ke?.destroy(),Se?.dispose()});Ba();async function Ba(){if(!Qa()){if(es()){window.location.replace(ts());return}Wa();return}const e=Ya();if(document.body.dataset.page="player",!e){Ka();return}fn("DeckX deck loading...");try{await Ga(e)}catch(t){De(),mn(t)}}function Wa(){const e=za();document.body.dataset.page="project",document.documentElement.lang=e,delete document.body.dataset.mode,De(),Oa(xe,{locale:e,deckxUrlValue:new URL(Q[0].url,window.location.href).toString(),homeHref:e==="ko"?"/ko/":"/",playerHref:"/player",defaultDemoHref:Je(Q[0].url),starterSourceHref:Va,demoOptions:Q.map(t=>({id:t.id,label:_e[e][t.id].label,description:_e[e][t.id].description,detail:_e[e][t.id].detail,url:t.url,href:Je(t.url)})),onOpenDeckxUrl:t=>{window.location.assign(Je(t))}})}function za(){return window.location.pathname.replace(/\/+$/,"")==="/ko"?"ko":"en"}function Ka(e=""){document.body.dataset.page="player",document.body.dataset.mode="landing",De(),ke?.destroy(),ke=null,Se?.dispose(),Se=null,Qn(xe,{homeHref:"/",demoOptions:ln(null),historyOptions:cn(),actions:{onOpenDeckxUrl:pn,onOpenDeckxFile:sn,deckxUrlValue:"",deckxStatus:e,homeHref:"/"}})}async function Ga(e){const t=await va(e.url),n=new URL(e.url,window.location.href).toString(),r=e.kind,a=e.kind==="demo"?Q.find(i=>i.id===e.id)?.label??t.deck.title:n;e.kind==="url"&&dn({kind:"url",label:t.deck.title,detail:n,url:n}),on(t,{source:e,sourceKind:r,sourceLabel:a,deckxUrlValue:n})}async function sn(e){fn("Local DeckX zip loading...");try{const t=Zt(new Uint8Array(await e.arrayBuffer()),e.name);dn({kind:"zip",label:t.deck.title,detail:e.name}),window.history.replaceState(null,"","/player#landing"),on(t,{source:{id:"local-zip",url:e.name,kind:"url"},sourceKind:"zip",sourceLabel:e.name,deckxUrlValue:""})}catch(t){De(),mn(t)}}function on(e,t){ke?.destroy(),Se?.dispose(),Se=e,Ja(e.cssText,e.sourceUrl),ke=Hr(e.deck,{mount:xe,demoOptions:ln(t.source),historyOptions:cn(),sourceKind:t.sourceKind,sourceLabel:t.sourceLabel,deckxUrlValue:t.deckxUrlValue,onOpenDeckxUrl:pn,onOpenDeckxFile:sn,homeHref:"/"})}function Ya(){const t=new URLSearchParams(window.location.search).get("deck");if(t){const n=Q.find(r=>Za(r.url,t));return{id:n?.id??"deckx-url",url:t,kind:n?"demo":"url"}}return null}function ln(e){return Q.map(t=>({id:t.id,label:t.label,description:t.description,href:Ie(t.url),active:t.id===e?.id}))}function Ie(e){const t=new URL(window.location.href);return t.searchParams.set("deck",e),t.searchParams.delete("deckx"),t.searchParams.delete("sessionId"),t.hash="landing",`${t.pathname}${t.search}${t.hash}`}function cn(){return un().map(e=>({id:e.id,kind:e.kind,label:e.label,detail:e.detail,href:e.kind==="url"&&e.url?Ie(e.url):void 0}))}function dn(e){const t=e.kind==="url"&&e.url?`url:${e.url}`:`zip:${e.detail}`,n={id:t,kind:e.kind,label:e.label,detail:e.detail,url:e.url,openedAtEpochMs:Date.now()},r=un().filter(a=>a.id!==t);_a([n,...r].slice(0,qa))}function un(){try{const e=window.localStorage.getItem(an);if(!e)return[];const t=JSON.parse(e);return Array.isArray(t)?t.filter(ns).sort((n,r)=>r.openedAtEpochMs-n.openedAtEpochMs):[]}catch{return[]}}function _a(e){try{window.localStorage.setItem(an,JSON.stringify(e))}catch{}}function Je(e){const t=new URL("/player",window.location.href);return t.searchParams.set("deck",e),t.hash="landing",`${t.pathname}${t.search}${t.hash}`}function pn(e){window.location.assign(Ie(e))}function Ja(e,t){if(De(),!e.trim())return;const n=document.createElement("style");n.id=rn,n.dataset.deckxSource=t,n.textContent=e,document.head.appendChild(n)}function De(){document.getElementById(rn)?.remove()}function Za(e,t){return new URL(e,window.location.href).toString()===new URL(t,window.location.href).toString()}function Qa(){return window.location.pathname.replace(/\/+$/,"")==="/player"}function es(){const e=window.location.hash;return new URLSearchParams(window.location.search).has("deck")||e==="#landing"||e==="#presenter"||e==="#slideshow"}function ts(){const e=new URL(window.location.href);return e.pathname="/player",`${e.pathname}${e.search}${e.hash||"#landing"}`}function fn(e){xe.innerHTML=`<main class="system-message">${st(e)}</main>`}function mn(e){const t=e instanceof Error?e.message:String(e);xe.innerHTML=`
    <main class="system-message">
      <div class="load-error">
        <strong>DeckX deck load failed</strong>
        <span>${st(t)}</span>
        <a class="btn" href="${st(Ie(Q[0].url))}">기본 데모 열기</a>
      </div>
    </main>
  `}function st(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function ns(e){if(!e||typeof e!="object")return!1;const t=e;return(t.kind==="url"||t.kind==="zip")&&typeof t.id=="string"&&typeof t.label=="string"&&typeof t.detail=="string"&&typeof t.openedAtEpochMs=="number"&&(t.url===void 0||typeof t.url=="string")}
