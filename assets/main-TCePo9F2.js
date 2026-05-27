(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(a){if(a.ep)return;a.ep=!0;const i=n(a);fetch(a.href,i)}})();function kr(e){const t=[],n=new Set;let r=0;e.slides.length||t.push({code:"empty-deck",severity:"error",message:"Deck must contain at least one slide."}),br(e.aspectRatio)||t.push({code:"invalid-canvas",severity:"error",message:"Deck aspectRatio must resolve to a positive finite canvas."}),e.slides.forEach((o,c)=>{const d=o.id?.trim();d?n.has(d)?t.push({code:"duplicate-slide-id",severity:"error",message:`Slide id "${d}" is duplicated.`,slideId:d,slideIndex:c}):n.add(d):t.push({code:"missing-slide-id",severity:"error",message:`Slide ${c+1} is missing a stable id.`,slideIndex:c}),o.notes?.trim()?r+=1:t.push({code:"missing-notes",severity:"warning",message:`Slide ${d||c+1} has no speaker notes.`,slideId:d||void 0,slideIndex:c})});const a=t.filter(o=>o.severity==="error").length,i=t.length-a;return{deckId:e.id,issues:t,errorCount:a,warningCount:i,notesCoverage:{total:e.slides.length,withNotes:r,missing:Math.max(0,e.slides.length-r)}}}function br(e){return e==="16:9"||e==="4:3"?!0:Number.isFinite(e.width)&&Number.isFinite(e.height)&&e.width>0&&e.height>0}function Ke(e){if(globalThis.crypto?.randomUUID)return`${e}-${globalThis.crypto.randomUUID()}`;if(globalThis.crypto?.getRandomValues){const t=new Uint32Array(4);return globalThis.crypto.getRandomValues(t),`${e}-${Array.from(t,n=>n.toString(16).padStart(8,"0")).join("")}`}return`${e}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`}function Sr(e=window){const t=e.navigator;if(t.userAgentData?.mobile===!0)return!0;const r=t.userAgent||"",a=t.platform||t.userAgentData?.platform||"",i=t.maxTouchPoints||0,o=i>0||"ontouchstart"in e,c=Zt(e,"(pointer: coarse)"),d=Zt(e,"(hover: none)");if($r(r)||Dr(r)||Er(r,a,i))return!0;const f=xr(e);return o&&c&&d&&f<=1024}function Zt(e,t){return typeof e.matchMedia=="function"&&e.matchMedia(t).matches}function $r(e){return/Android.+Mobile|iPhone|iPod|Windows Phone|IEMobile|BlackBerry|BB10|Opera Mini|Opera Mobi|Mobile Safari/i.test(e)}function Dr(e){return/iPad|Tablet|Silk|Kindle|PlayBook|Android(?!.*Mobile)/i.test(e)}function Er(e,t,n){return/Macintosh/i.test(e)&&/Mac/i.test(t)&&n>1}function xr(e){const t=e.screen?.width||e.innerWidth,n=e.screen?.height||e.innerHeight;return Math.min(t,n)}function Lr(e){return{id:e.id,title:e.title,aspectRatio:e.aspectRatio,theme:e.theme,metadata:e.metadata,slides:e.slides.map(Tr)}}function Tr(e){const{notes:t,...n}=e;return n}function Ar(){return{status:"idle",startedAtEpochMs:null,elapsedBeforePauseMs:0,timerVersion:0}}function Rr(e,t=Date.now()){return e.status==="running"?e:{...e,status:"running",startedAtEpochMs:t,timerVersion:e.timerVersion+1}}function Pr(e,t=Date.now()){return e.status!=="running"||e.startedAtEpochMs===null?e:{...e,status:"paused",startedAtEpochMs:null,elapsedBeforePauseMs:e.elapsedBeforePauseMs+(t-e.startedAtEpochMs),timerVersion:e.timerVersion+1}}function Cr(e,t=Date.now()){return e.status!=="paused"?e:{...e,status:"running",startedAtEpochMs:t,timerVersion:e.timerVersion+1}}function Mr(e=Date.now()){return{status:"running",startedAtEpochMs:e,elapsedBeforePauseMs:0,timerVersion:0}}function mn(e,t=Date.now()){return e.status!=="running"||e.startedAtEpochMs===null?e.elapsedBeforePauseMs:e.elapsedBeforePauseMs+(t-e.startedAtEpochMs)}function Ir(e){const t=Math.max(0,Math.floor(e/1e3)),n=Math.floor(t/60),r=t%60;return`${String(n).padStart(2,"0")}:${String(r).padStart(2,"0")}`}function Or(e,t,n,r=0,a=0){let i={deckId:e,sessionId:t,stateVersion:a,index:ot(r,0,Math.max(0,n-1)),timer:Ar(),peer:{connected:!1,lastSeenAt:null}};const o=new Set;return{subscribe(d){return o.add(d),()=>o.delete(d)},getState:()=>i,getPublicState:()=>({deckId:i.deckId,sessionId:i.sessionId,stateVersion:i.stateVersion,index:i.index,timer:i.timer}),getElapsedLabel:()=>Ir(mn(i.timer)),goto(d){const f=ot(d,0,Math.max(0,n-1));f!==i.index&&(i={...i,index:f,stateVersion:i.stateVersion+1},c())},startTimer(){i={...i,timer:Rr(i.timer),stateVersion:i.stateVersion+1},c()},applyTimerCommand(d){const f=d==="pause"?Pr(i.timer):d==="resume"?Cr(i.timer):Mr();i={...i,timer:f,stateVersion:i.stateVersion+1},c()},applySnapshot(d){d.deckId!==i.deckId||d.sessionId!==i.sessionId||d.stateVersion<=i.stateVersion||(i={...i,index:ot(d.index,0,Math.max(0,n-1)),stateVersion:d.stateVersion,timer:d.timer},c())},markPeerSeen(){const d=i.peer.connected;i={...i,peer:{connected:!0,lastSeenAt:Date.now()}},d||c()},refreshPeer(d){if(i.peer.lastSeenAt===null)return;const f=Date.now()-i.peer.lastSeenAt<=d;f!==i.peer.connected&&(i={...i,peer:{...i.peer,connected:f}},c())},isPeerConnected(d){return i.peer.lastSeenAt!==null&&Date.now()-i.peer.lastSeenAt<=d}};function c(){o.forEach(d=>d())}}function ot(e,t,n){return Math.min(n,Math.max(t,e))}class Nr{constructor(t){this.options=t,this.channel=new BroadcastChannel(`html-ppt:${t.deckId}:${t.sessionId}`),this.channel.addEventListener("message",this.onMessage)}options;channel;listeners=new Set;lastSeqBySender=new Map;seq=0;send(t){const n={protocol:"deckx-player-sync/v1",deckId:this.options.deckId,sessionId:this.options.sessionId,senderId:this.options.senderId,from:this.options.from,seq:++this.seq,stateVersion:Ur(t),sentAtEpochMs:Date.now(),body:t};this.channel.postMessage(n)}subscribe(t){return this.listeners.add(t),()=>this.listeners.delete(t)}close(){this.channel.removeEventListener("message",this.onMessage),this.channel.close(),this.listeners.clear()}onMessage=t=>{if(!Xr(t.data))return;const n=t.data;if(n.protocol!=="deckx-player-sync/v1"||n.deckId!==this.options.deckId||n.sessionId!==this.options.sessionId||n.senderId===this.options.senderId)return;const r=this.lastSeqBySender.get(n.senderId)??0;n.seq<=r||(this.lastSeqBySender.set(n.senderId,n.seq),this.listeners.forEach(a=>a(n)))}}class Qt{constructor(t="Transport is disabled."){this.reason=t}reason;send(){}subscribe(){return()=>{}}close(){}}function Ur(e){if(e.type==="state-snapshot")return e.state.stateVersion;if(e.type==="pong")return e.stateVersion}function Xr(e){if(!e||typeof e!="object")return!1;const t=e;return t.protocol==="deckx-player-sync/v1"&&typeof t.deckId=="string"&&typeof t.sessionId=="string"&&typeof t.senderId=="string"&&typeof t.seq=="number"&&typeof t.sentAtEpochMs=="number"&&typeof t.body=="object"}const Fr="DECKX_RUNTIME",Hr=["KSUG_RUNTIME"];class jr{scripts;globalNames;loaded=!1;loading=null;scriptElements=[];generation=0;constructor(t,n){this.scripts=t,this.globalNames=[...n?[n]:[],Fr,...Hr].filter((r,a,i)=>i.indexOf(r)===a)}get available(){return this.scripts.length>0}async mount(t){if(!this.available)return;const n=++this.generation;await this.loadScripts(),!(n!==this.generation||!t.isConnected)&&this.getRuntimeGlobal()?.mount?.(t)}cleanup(){this.generation+=1,this.getRuntimeGlobal()?.cleanup?.()}destroy(){this.cleanup(),this.scriptElements.forEach(t=>t.remove()),this.scriptElements=[],this.loaded=!1,this.loading=null}async loadScripts(){this.loaded||(this.loading||(this.loading=this.loadScriptsInOrder().then(()=>{this.loaded=!0})),await this.loading)}async loadScriptsInOrder(){for(const t of this.scripts)await new Promise((n,r)=>{const a=document.createElement("script");a.async=!1,a.src=t.url,a.dataset.deckxRuntimePath=t.path,a.onload=()=>n(),a.onerror=()=>r(new Error(`Trusted DeckX runtime failed to load: ${t.path}`)),document.body.appendChild(a),this.scriptElements.push(a)})}getRuntimeGlobal(){const t=window;for(const n of this.globalNames){const r=t[n];if(qr(r))return r}return null}}function qr(e){if(!e||typeof e!="object")return!1;const t=e;return typeof t.mount=="function"||typeof t.cleanup=="function"}async function Br(e){const t=new URL(window.location.href);t.hash="slideshow",t.searchParams.set("sessionId",e.sessionId),t.searchParams.set("slideshowWindow","popup"),e.deckUrl&&t.searchParams.set("deck",e.deckUrl);let n="popup,width=1280,height=720";if(e.display==="auto"){const a=await Kr(e.i18n);a.status&&e.onStatus?.(a.status),a.features&&(n=a.features)}const r=window.open(t.toString(),Wr(e.sessionId),n);return r?(r.focus(),{windowRef:r,status:{type:"opened",message:e.i18n.messages.window.opened}}):{windowRef:null,status:{type:"popup-blocked",message:e.i18n.messages.window.popupBlocked}}}function Wr(e){return`deckx-slideshow-${e.replace(/[^a-zA-Z0-9_-]/g,"-").slice(0,96)||"session"}`}async function Kr(e){const t=window;if(!window.isSecureContext||typeof t.getScreenDetails!="function")return{features:null,status:{type:"window-management-unavailable",message:e.messages.window.unavailable}};try{const r=(await t.getScreenDetails()).screens.find(a=>!a.isPrimary)??null;return r?{features:`left=${r.availLeft},top=${r.availTop},width=${r.availWidth},height=${r.availHeight},popup`,status:{type:"opened",message:e.messages.window.detected}}:{features:null,status:{type:"window-management-unavailable",message:e.messages.window.noExternal}}}catch{return{features:null,status:{type:"window-management-denied",message:e.messages.window.denied}}}}const zr=["en","ko"],fn="en",be="ui",hn="deckx-player:ui-locale",Vr={documentTitle:"DeckX Player",locale:{label:"UI language",en:"English",ko:"Korean"},demos:{starter:{label:"DeckX Starter",description:"A minimal starter project you can copy to build your first DeckX",detail:"A starter source folder with manifest, slides, notes, styles, assets, README, and AGENTS.md."},patternLibrary:{label:"Pattern library",description:"A pattern-first DeckX sample for safer LLM-authored slides",detail:"Shows cover, section, one-message, evidence, comparison, timeline, chart, quote, and code-focus patterns."},sampleEn:{label:"English developer sample",description:"A natural technical DeckX written as an English developer talk",detail:"Shows package contracts, validation signals, code snippets, and Safe Deck boundaries."},sampleKo:{label:"Korean developer sample",description:"A Korean technical DeckX sample focused on slide fundamentals",detail:"Uses pattern-first slides, presenter notes, local assets, and validation-ready structure."},templateKo:{label:"Korean layout templates",description:"Reusable PPT-style DeckX layout presets for Korean talks",detail:"Includes title, content, section, comparison, image, timeline, chart, quote, and closing layouts."},dogfood:{label:"DeckX zip demo",description:"Loads the public/decks/deckx-player-demo.deckx file as-is",detail:"A dogfooding deck that explains this project as a DeckX package."},static:{label:"Static framework demo",description:"A DeckX sample explaining the Deck/Runtime boundary",detail:"Shows how text-heavy presentations combine with the base player features."},motion:{label:"Motion graphics demo",description:"A CSS motion DeckX sample running in the same runtime",detail:"Compares Full, Reduced, and Paused modes in a deck with CSS animation."},classic:{label:"4:3 canvas demo",description:"A sample showing DeckX aspectRatio reflected in the renderer",detail:"A non-16:9 DeckX canvas is applied consistently in presenter view and slideshow."},imageHeavy:{label:"Image-heavy demo",description:"An asset stress sample that loads 96 package-local images",detail:"Checks preview, overview, and object URL costs in a DeckX with many images."},long120:{label:"Release runbook long deck",description:"A 120-slide developer runbook for goto, search, and overview behavior",detail:"Uses natural release checkpoints to observe presenter thumbnails and keyboard navigation limits."},longImage:{label:"System snapshot image deck",description:"A long image sample with package-local system screenshots",detail:"Combines navigation, search, thumbnails, and asset handling across 120 image-backed slides."}},main:{loadingDeck:"Loading DeckX deck...",loadingZip:"Loading local DeckX zip...",loadFailed:"DeckX deck load failed",openDefaultDemo:"Open default demo"},player:{homeSubtitle:"Open a DeckX to start presenting",flowHeading:"The player is ready before you open a deck",emptyTitle:"Open a DeckX URL or local .deckx zip first.",emptyBody:"After opening a deck, preview and start controls become active, and DeckX details stay tucked away until needed.",flowOpenTitle:"1. Open DeckX",flowOpenBody:"Enter a URL or choose a local zip package.",flowPreviewTitle:"2. Check preview",flowPreviewBody:"Review the first slide and default presentation options.",flowStartTitle:"3. Start presenting",flowStartBody:"Run presenter view and the slideshow window together.",teamAreaTitle:"SSO and team library placeholder",teamAreaBody:"For now, DeckX history stays in this browser. Later, sign-in can sync uploaded and shared DeckX packages.",slides:"slides",planned:"planned",metadata:"metadata",runHeading:"Run presentation",start:"Start presentation",resumeFrom:(e,t)=>`Resume from ${e} / ${t}`,startFromFirst:"Start from first slide",presenterOnly:"Presenter only",slideshowOnly:"Slideshow only",options:"Presentation options",projectHome:"Project overview",sourceMenu:"Open deck / samples",sourceHeading:"Open DeckX",openUrl:"Open",localPackage:"LOCAL PACKAGE",localZip:"Choose local .deckx zip",recentDeckx:"RECENT DeckX",noHistory:"No DeckX has been opened yet.",zipNeedsReselect:"select again required",officialSamples:"OFFICIAL SAMPLES",details:"View DeckX details",validationIssuesNone:"No validation issues.",moreIssuesHidden:e=>`${e} more issues hidden.`,sourceKind:{demo:"Demo DeckX",zip:"Local ZIP",url:"URL DeckX"},motionDescriptions:{full:"CSS motion and transitions enabled",reduced:"Motion compressed for review",paused:"Animations paused"},trustedRuntime:{heading:"TRUSTED RUNTIME",label:"Allow package JS",description:"Run package-local JavaScript declared by this DeckX."}},presenter:{presets:{scriptFirst:"Left list, long notes on top, Current/Next below",balanced:"Current/Notes on the left, Next/List on the right",review:"Single-line list on the left, compact Next on the right"},connectionTitle:"Synchronization status between presenter view and slideshow window",gotoTitle:"Go to slide number",searchTitle:"Search title, body, and notes",openSlideshowTitle:"Open the audience slideshow window",openSlideshow:"Open slideshow window",settingsTitle:"Choose presenter panel layout",closePresets:"Close presets",viewPresets:"View presets",exit:"Exit",noNotes:"No speaker notes.",prev:"Prev",next:"Next",emptyPanels:"Turn on at least one component to display.",ready:"Ready",readiness:{summary:"Operating status",deck:"Current DeckX title.",session:"Session shared by presenter view and slideshow.",popup:"Slideshow window open status.",sync:"BroadcastChannel-based connection status between windows.",fullscreen:"Fullscreen status for the current window.",motion:"Deck CSS animation playback mode. Change it from the tools menu.",theme:"Presenter and slideshow chrome theme. Deck-internal styles are unchanged.",pace:"Current pace compared with planned presentation time.",filter:"Audience display adjustment values. Change them from the slideshow Display menu.",wake:"Screen wake lock request status.",mirror:"Audience screen mirror status.",validation:"DeckX package validation result.",notes:"Number of slides with speaker notes."},tools:{label:"Tools",motionDescription:"Cycle deck animation playback through Full, Reduced, and Paused.",themeLabel:"Show theme",themeDescription:"Switch presenter and slideshow chrome between Light and Dark. Deck styles are preserved.",copyUrl:"Copy URL",copyUrlDescription:"Copy the slideshow URL for manual recovery when popups are blocked.",wakeLockDescription:"Request screen wake lock in supported browsers.",mirrorDescription:"After permission, show an audience-screen mirror inside presenter view."}},slideshow:{enterFullscreen:"Start fullscreen",exitFullscreen:"Exit fullscreen",controls:"Slideshow controls",display:"Display",displayFilters:"Display filters",brightness:"Bright",contrast:"Contrast",saturation:"Sat",exit:"End"},runtime:{mobileCombined:"On mobile, slides and presenter view are shown together in the current tab.",openingSlideshow:"Opening slideshow window.",slideshowClosed:"The presenter closed the slideshow.",fullscreenFailed:"Fullscreen could not start. Browser permission or a user gesture is required.",notesSaved:"Notes draft saved.",notesReset:"Notes draft restored to the source notes.",notesExported:"Speaker notes exported as Markdown.",slideshowUrlCopied:"Slideshow URL copied.",searchEmpty:"Enter a search term or no results were found.",gotoEmpty:e=>`Enter a number from 1-${e}.`},window:{popupBlocked:"Popup was blocked. Allow popups in the browser, then open it again.",opened:"Slideshow window opened. Move it to an external display and start fullscreen if needed.",unavailable:"External display placement is unavailable in this browser or context, so a normal window opens.",noExternal:"No external display was found, so a normal window opens.",detected:"External display coordinates detected. Opening the slideshow window there.",denied:"External display permission was denied or unavailable, so a normal window opens."}},Gr={documentTitle:"DeckX Player",locale:{label:"UI 언어",en:"영어",ko:"한국어"},demos:{starter:{label:"DeckX 스타터",description:"복사해서 첫 DeckX를 만들 수 있는 최소 예시 프로젝트",detail:"manifest, slides, notes, styles, assets, README, AGENTS.md를 포함한 starter source folder입니다."},patternLibrary:{label:"패턴 라이브러리",description:"LLM 작성 슬라이드의 저점을 올리는 pattern-first DeckX 샘플",detail:"cover, section, one-message, evidence, comparison, timeline, chart, quote, code-focus 패턴을 보여줍니다."},sampleEn:{label:"영문 개발자 샘플",description:"개발자 발표 흐름으로 만든 영문 DeckX 샘플",detail:"package contract, validation signal, code snippet, Safe Deck 경계를 보여줍니다."},sampleKo:{label:"한국어 개발자 샘플",description:"슬라이드 본질에 집중한 한국어 DeckX 샘플",detail:"패턴 우선 슬라이드, 발표자 노트, 로컬 asset, 검증 가능한 구조를 보여줍니다."},templateKo:{label:"한국어 기본 레이아웃 템플릿",description:"PPT 기본 장표 패턴을 DeckX로 옮긴 재사용 프리셋",detail:"title, content, section, comparison, image, timeline, chart, quote, closing 레이아웃을 포함합니다."},dogfood:{label:"DeckX zip 데모",description:"public/decks/deckx-player-demo.deckx 파일을 그대로 로드",detail:"이 프로젝트 자체를 DeckX package로 설명하는 도그푸딩 덱입니다."},static:{label:"정적 프레임워크 데모",description:"Deck/Runtime 경계를 설명하는 DeckX 샘플",detail:"텍스트 중심 발표가 기본 플레이어 기능과 어떻게 결합되는지 확인합니다."},motion:{label:"모션 그래픽 데모",description:"같은 런타임에 CSS motion DeckX를 교체한 샘플",detail:"CSS animation이 포함된 덱에서 Full, Reduced, Paused 차이를 확인합니다."},classic:{label:"4:3 캔버스 데모",description:"DeckX aspectRatio가 렌더러에 반영되는 샘플",detail:"16:9가 아닌 DeckX canvas도 발표자뷰와 슬라이드쇼에 동일하게 반영됩니다."},imageHeavy:{label:"이미지 헤비 데모",description:"96개 package-local 이미지를 로드하는 asset stress 샘플",detail:"이미지가 많은 DeckX에서 preview, overview, object URL 처리 비용을 확인합니다."},long120:{label:"릴리스 런북 롱덱",description:"120장 개발자 운영 런북으로 goto, search, overview를 확인하는 샘플",detail:"자연스러운 릴리스 체크포인트로 발표자뷰 썸네일 목록과 키보드 탐색 한계를 관찰합니다."},longImage:{label:"시스템 스냅샷 이미지 롱덱",description:"package-local 시스템 스냅샷 이미지를 포함한 120장 샘플",detail:"120장 전체에 이미지가 포함된 DeckX로 탐색, 검색, 썸네일, asset 처리를 함께 관찰합니다."}},main:{loadingDeck:"DeckX deck loading...",loadingZip:"Local DeckX zip loading...",loadFailed:"DeckX deck load failed",openDefaultDemo:"기본 데모 열기"},player:{homeSubtitle:"DeckX를 열어 발표를 시작하세요",flowHeading:"열기 전에는 플레이어만 준비합니다",emptyTitle:"DeckX URL 또는 로컬 .deckx zip을 먼저 여세요.",emptyBody:"덱을 열면 미리보기와 발표 시작 버튼이 활성화되고, DeckX 상세 정보는 필요할 때만 펼쳐볼 수 있습니다.",flowOpenTitle:"1. DeckX 열기",flowOpenBody:"URL을 입력하거나 로컬 zip package를 선택합니다.",flowPreviewTitle:"2. 미리보기 확인",flowPreviewBody:"첫 슬라이드와 기본 발표 옵션을 확인합니다.",flowStartTitle:"3. 발표 시작",flowStartBody:"발표자뷰와 슬라이드쇼 창을 함께 실행합니다.",teamAreaTitle:"SSO와 팀 라이브러리 준비 영역",teamAreaBody:"지금은 브라우저 로컬 히스토리로 동작하고, 이후 로그인하면 업로드 DeckX와 공유 받은 DeckX를 동기화할 수 있습니다.",slides:"slides",planned:"planned",metadata:"metadata",runHeading:"발표 실행",start:"발표 시작",resumeFrom:(e,t)=>`${e} / ${t}부터 이어서 시작`,startFromFirst:"처음부터 시작",presenterOnly:"발표자뷰만",slideshowOnly:"슬라이드쇼만",options:"발표 옵션",projectHome:"프로젝트 소개",sourceMenu:"덱 열기 / 샘플",sourceHeading:"DeckX 열기",openUrl:"열기",localPackage:"LOCAL PACKAGE",localZip:"로컬 .deckx zip 선택",recentDeckx:"RECENT DeckX",noHistory:"아직 열어본 DeckX가 없습니다.",zipNeedsReselect:"다시 선택 필요",officialSamples:"OFFICIAL SAMPLES",details:"DeckX 상세 보기",validationIssuesNone:"Validation issues 없음.",moreIssuesHidden:e=>`${e} more issues hidden.`,sourceKind:{demo:"Demo DeckX",zip:"Local ZIP",url:"URL DeckX"},motionDescriptions:{full:"CSS motion and transitions enabled",reduced:"Motion compressed for review",paused:"Animations paused"},trustedRuntime:{heading:"TRUSTED RUNTIME",label:"Package JS 허용",description:"이 DeckX가 선언한 package-local JavaScript를 실행합니다."}},presenter:{presets:{scriptFirst:"왼쪽 목록, 상단 긴 노트, 하단 Current/Next",balanced:"왼쪽 Current/Notes, 오른쪽 Next/List",review:"왼쪽 한 줄 목록, 오른쪽 작은 Next"},connectionTitle:"발표자뷰와 슬라이드쇼 창의 동기화 상태",gotoTitle:"슬라이드 번호로 이동",searchTitle:"제목, 본문, 노트 검색",openSlideshowTitle:"관객용 슬라이드쇼 창을 엽니다",openSlideshow:"슬라이드쇼 창 열기",settingsTitle:"발표자뷰 패널 배치를 선택합니다",closePresets:"프리셋 닫기",viewPresets:"뷰 프리셋",exit:"종료",noNotes:"발표자 노트가 없습니다.",prev:"이전",next:"다음",emptyPanels:"표시할 컴포넌트를 하나 이상 켜주세요.",ready:"준비됨",readiness:{summary:"운영 상태",deck:"현재 열려 있는 DeckX 제목입니다.",session:"발표자뷰와 슬라이드쇼가 공유하는 세션입니다.",popup:"슬라이드쇼 창 열기 상태입니다.",sync:"BroadcastChannel 기반 창 간 연결 상태입니다.",fullscreen:"현재 창의 풀스크린 상태입니다.",motion:"덱 CSS animation 재생 방식입니다. 도구 메뉴에서 변경합니다.",theme:"발표자뷰와 슬라이드쇼 chrome 테마입니다. 덱 내부 스타일은 바꾸지 않습니다.",pace:"계획 시간 대비 현재 발표 속도입니다.",filter:"관객용 화면 보정값입니다. 슬라이드쇼의 Display 메뉴에서 조정합니다.",wake:"화면 꺼짐 방지 요청 상태입니다.",mirror:"관객 화면 미러링 상태입니다.",validation:"DeckX package 검증 결과입니다.",notes:"발표자 노트가 연결된 슬라이드 수입니다."},tools:{label:"도구",motionDescription:"Full, Reduced, Paused 순서로 덱 애니메이션 재생 방식을 바꿉니다.",themeLabel:"쇼 테마",themeDescription:"발표자뷰와 슬라이드쇼 chrome을 Light/Dark로 전환합니다. 덱 스타일은 유지됩니다.",copyUrl:"URL 복사",copyUrlDescription:"현재 세션의 슬라이드쇼 URL을 복사합니다. 팝업 차단 시 수동 복구에 사용합니다.",wakeLockDescription:"지원 브라우저에서 화면 꺼짐 방지를 요청합니다.",mirrorDescription:"권한을 허용하면 발표자 화면 안에 관객 화면 확인용 미러를 띄웁니다."}},slideshow:{enterFullscreen:"풀스크린 시작",exitFullscreen:"풀스크린 종료",controls:"Slideshow controls",display:"Display",displayFilters:"Display filters",brightness:"Bright",contrast:"Contrast",saturation:"Sat",exit:"종료"},runtime:{mobileCombined:"모바일에서는 현재 탭에서 슬라이드와 발표자뷰를 함께 표시합니다.",openingSlideshow:"슬라이드쇼 창을 여는 중입니다.",slideshowClosed:"발표자가 슬라이드쇼를 종료했습니다.",fullscreenFailed:"풀스크린을 시작할 수 없습니다. 브라우저 권한 또는 사용자 제스처가 필요합니다.",notesSaved:"노트 드래프트를 저장했습니다.",notesReset:"노트 드래프트를 원본으로 되돌렸습니다.",notesExported:"스피커 노트를 Markdown으로 내보냈습니다.",slideshowUrlCopied:"슬라이드쇼 URL을 복사했습니다.",searchEmpty:"검색어를 입력하거나 결과가 없습니다.",gotoEmpty:e=>`1-${e} 범위의 번호를 입력하세요.`},window:{popupBlocked:"팝업이 차단되었습니다. 브라우저에서 팝업을 허용한 뒤 다시 열어주세요.",opened:"슬라이드쇼 창을 열었습니다. 필요하면 외부 화면으로 이동한 뒤 풀스크린을 시작하세요.",unavailable:"외부 화면 자동 배치는 이 브라우저 또는 실행 컨텍스트에서 지원되지 않아 일반 창으로 엽니다.",noExternal:"외부 화면을 찾지 못해 일반 창으로 엽니다.",detected:"외부 화면 좌표를 감지했습니다. 슬라이드쇼 창을 해당 위치로 엽니다.",denied:"외부 화면 권한이 거부되었거나 사용할 수 없어 일반 창으로 엽니다."}},_r={en:Vr,ko:Gr};function ze(e=Yr()){const t=Dt(e)??fn;return{locale:t,messages:_r[t],hrefForLocale:Jr}}function Yr(){const e=new URLSearchParams(window.location.search),t=Dt(e.get(be));return t?(Qr(t),t):Zr()??fn}function en(e){document.documentElement.lang=e.locale,document.title=e.messages.documentTitle}function Dt(e){if(!e)return null;const t=e.toLowerCase().split("-")[0];return t==="en"||t==="ko"?t:null}function Jr(e){const t=new URL(window.location.href);return t.searchParams.set(be,e),`${t.pathname}${t.search}${t.hash}`}function Zr(){try{return Dt(window.localStorage.getItem(hn))}catch{return null}}function Qr(e){try{window.localStorage.setItem(hn,e)}catch{return}}function Ne(e){return e==="4:3"?{width:1024,height:768}:e==="16:9"?{width:1280,height:720}:{width:tn(e.width,1280),height:tn(e.height,720)}}function tn(e,t){return!Number.isFinite(e)||e<=0?t:Math.round(e)}function se(e,t,n,r){e.innerHTML="",e.appendChild(gn(t,n,r))}function gn(e,t,n){const r=e.slides[t];if(!r){const d=document.createElement("section");return d.className="deckx-slide deckx-slide-end",d.dataset.deckxSlide="true",d.innerHTML='<p class="muted">END</p>',d}const a=document.createElement("section"),i=Ne(e.aspectRatio);a.className=["deckx-slide",r.className,e.theme?.className].filter(Boolean).join(" "),a.dataset.deckxSlide="true",a.dataset.slideId=r.id,a.style.setProperty("--slide-width",`${i.width}px`),a.style.setProperty("--slide-height",`${i.height}px`),a.style.width=`${i.width}px`,a.style.height=`${i.height}px`,na(a,e.theme?.cssVars);const o=r.render?.({deck:e,slide:r,index:t,total:e.slides.length,mode:n});o instanceof HTMLElement?a.appendChild(o):typeof o=="string"?a.innerHTML=o:(a.dataset.deckxDefaultSlide="true",a.appendChild(ta(r)));const c=ea(e.metadata?.custom);if(c.footer){const d=document.createElement("div");d.className="deckx-slide-footer mono",d.dataset.deckxSlideFooter="true",d.textContent=r.footer||e.title,a.appendChild(d)}if(c.page){const d=document.createElement("div");d.className="deckx-slide-page mono",d.dataset.deckxSlidePage="true",d.textContent=`${String(t+1).padStart(2,"0")} / ${String(e.slides.length).padStart(2,"0")}`,a.appendChild(d)}return a}function ea(e){const t=e?.playerChrome;if(t===!1)return{footer:!1,page:!1};if(t&&typeof t=="object"){const n=t;return{footer:n.footer!==!1,page:n.page!==!1}}return{footer:!0,page:!0}}function ie(e,t=""){const n=Ne(e.aspectRatio),r=document.createElement("div");r.className=`deckx-slide-wrap ${t}`.trim();const a=document.createElement("div");return a.className="deckx-slide-scaler",a.dataset.designWidth=String(n.width),a.dataset.designHeight=String(n.height),r.appendChild(a),r}function we(){document.querySelectorAll(".deckx-slide-scaler").forEach(e=>{const t=e.parentElement;if(!t)return;const n=Number(e.dataset.designWidth||1280),r=Number(e.dataset.designHeight||720),a=Math.min(t.clientWidth/n,t.clientHeight/r),i=(t.clientWidth-n*a)/2,o=(t.clientHeight-r*a)/2;e.style.width=`${n}px`,e.style.height=`${r}px`,e.style.transform=`scale(${a})`,e.style.left=`${i}px`,e.style.top=`${o}px`})}function ta(e){const t=document.createElement("div");if(t.className="deckx-default-slide-content",t.dataset.deckxDefaultSlideContent="true",e.kicker){const n=document.createElement("div");n.className="deckx-default-slide-kicker mono",n.textContent=e.kicker,t.appendChild(n)}if(e.title){const n=document.createElement("h2");n.innerHTML=e.title,t.appendChild(n)}if(e.body){const n=document.createElement("div");n.className="deckx-default-slide-body",n.innerHTML=e.body,t.appendChild(n)}return t}function na(e,t){t&&Object.entries(t).forEach(([n,r])=>{e.style.setProperty(n,r)})}function ra(e,t){const n=t.i18n.messages.player;e.innerHTML=`
    <main class="player-console player-console-empty">
      ${yn(n.homeSubtitle,t.i18n,t.homeHref)}
      <section class="player-console-grid player-console-grid-empty" aria-label="DeckX player open screen">
        <aside class="player-panel player-open-panel">
          ${wn(t)}
        </aside>

        <section class="player-panel player-guidance-panel">
          <div class="player-panel-heading">
            <span class="mono">PLAYER FLOW</span>
            <h2>${p(n.flowHeading)}</h2>
          </div>
          <div class="player-empty-stage" aria-label="No DeckX opened">
            <strong>${p(n.emptyTitle)}</strong>
            <span>${p(n.emptyBody)}</span>
          </div>
          <ol class="player-flow-list">
            <li><strong>${p(n.flowOpenTitle)}</strong><span>${p(n.flowOpenBody)}</span></li>
            <li><strong>${p(n.flowPreviewTitle)}</strong><span>${p(n.flowPreviewBody)}</span></li>
            <li><strong>${p(n.flowStartTitle)}</strong><span>${p(n.flowStartBody)}</span></li>
          </ol>
          <div class="player-login-teaser">
            <strong>${p(n.teamAreaTitle)}</strong>
            <span>${p(n.teamAreaBody)}</span>
          </div>
        </section>
      </section>
    </main>
  `,vn(e,t.actions)}function aa(e,t){const n=Ne(t.deck.aspectRatio),r=ca(t),a=t.deck.slides[r],i=ba(t.deck),o=t.i18n.messages.player,c=r>0;e.innerHTML=`
    <main class="player-console">
      ${yn(t.deck.title,t.i18n,t.actions.homeHref)}
      <section class="player-console-grid player-console-grid-loaded" aria-label="DeckX player launch console">
        <aside class="player-panel player-open-panel">
          ${wn(t)}
        </aside>

        <section class="player-panel player-preview-panel">
          <div class="player-panel-heading split">
            <div>
              <span class="mono">${p(Sn(t.sourceKind,t.i18n))}</span>
              <h2>${p(La(a?.title||t.deck.title))}</h2>
            </div>
            <span class="player-count mono">${String(r+1).padStart(2,"0")} / ${String(t.deck.slides.length).padStart(2,"0")}</span>
          </div>
          <div class="player-preview-stage" data-player-preview aria-label="First slide preview"></div>
          <div class="player-meta-strip" aria-label="Deck metadata">
            <span><strong>${t.deck.slides.length}</strong> ${p(o.slides)}</span>
            <span><strong>${p(bn(t.deck.aspectRatio))}</strong> ${n.width}x${n.height}</span>
            <span><strong>${p(kn(i))}</strong> ${p(o.planned)}</span>
            <span><strong>${p(Da(t.deck.metadata))}</strong> ${p(o.metadata)}</span>
          </div>
        </section>

        <aside class="player-panel player-run-panel">
          <div class="player-panel-heading">
            <span class="mono">RUN</span>
            <h2>${p(o.runHeading)}</h2>
          </div>
          <button class="btn primary player-start-button" type="button" data-action="start">
            <span>${p(o.start)}</span>
            <kbd>Ctrl/⌘ Enter</kbd>
          </button>
          ${c?`
            <div class="player-resume-block">
              <span>${p(o.resumeFrom(r+1,t.deck.slides.length))}</span>
              <button class="btn compact" type="button" data-action="start-first">${p(o.startFromFirst)}</button>
            </div>
          `:""}
          <div class="player-secondary-actions" aria-label="Secondary player actions">
            <button class="btn" type="button" data-action="presenter">${p(o.presenterOnly)}</button>
            <button class="btn" type="button" data-action="slideshow">${p(o.slideshowOnly)}</button>
          </div>
          <details class="player-settings-detail" open>
            <summary>${p(o.options)}</summary>
            ${ga(t.motionMode,t.i18n)}
            ${t.trustedRuntimeAvailable?ya(t.trustedRuntimeEnabled,t.i18n):""}
          </details>
          ${wa(t,i)}
        </aside>
      </section>
    </main>
  `,oa(e,t.publicDeck,r),la(e,t.actions)}function yn(e,t,n){const r=t.messages.player;return`
    <header class="player-console-header">
      <div class="player-title-group">
        <img class="brand-icon player-brand-icon" src="/brand/deckx-icon.svg" alt="" aria-hidden="true" />
        <div>
          <span class="badge mono">DeckX PLAYER</span>
          <h1>DeckX Player</h1>
          <p>${p(e)}</p>
        </div>
      </div>
      <div class="player-header-actions">
        ${sa(t)}
        ${n?`<a class="btn compact" href="${p(n)}">${p(r.projectHome)}</a>`:""}
      </div>
    </header>
  `}function sa(e){return`
    <nav class="locale-switch" aria-label="${p(e.messages.locale.label)}">
      ${zr.map(t=>ia(t,e)).join("")}
    </nav>
  `}function ia(e,t){const n=e.toUpperCase();return`
    <a
      class="locale-link ${e===t.locale?"active":""}"
      href="${p(t.hrefForLocale(e))}"
      hreflang="${e}"
      aria-current="${e===t.locale?"page":"false"}"
      title="${p(t.messages.locale[e])}"
    >${n}</a>
  `}function wn(e){const t=e.i18n.messages.player;return`
    <details class="player-source-menu" data-player-source-menu>
      <summary class="player-source-menu-summary">
        <span class="hamburger-lines" aria-hidden="true"></span>
        <span>${p(t.sourceMenu)}</span>
      </summary>
      <div class="player-source-menu-body">
        <div class="player-panel-heading">
          <span class="mono">SOURCE</span>
          <h2>${p(t.sourceHeading)}</h2>
        </div>
        ${e.actions.onOpenDeckxUrl?ua(e.actions.deckxUrlValue??"",e.actions.deckxStatus??"",e.i18n):""}
        ${e.actions.onOpenDeckxFile?pa(e.i18n):""}
        ${ma(e.historyOptions,e.i18n)}
        ${e.demoOptions.length>0?ha(e.demoOptions,e.i18n):""}
      </div>
    </details>
  `}function oa(e,t,n){const r=e.querySelector("[data-player-preview]");if(!r)return;const a=ie(t,"player-preview-wrap"),i=a.querySelector(".deckx-slide-scaler");i&&(se(i,t,n,"slideshow"),r.appendChild(a),window.requestAnimationFrame(we))}function la(e,t){vn(e,t),e.querySelector('[data-action="start"]')?.addEventListener("click",t.onStart),e.querySelector('[data-action="start-first"]')?.addEventListener("click",t.onStartFromFirst),e.querySelector('[data-action="presenter"]')?.addEventListener("click",t.onPresenterOnly),e.querySelector('[data-action="slideshow"]')?.addEventListener("click",t.onSlideshowOnly),e.querySelectorAll("[data-motion-mode]").forEach(n=>{n.addEventListener("click",()=>{t.onSetMotionMode(n.dataset.motionMode)})}),e.querySelector("[data-trusted-runtime-toggle]")?.addEventListener("change",n=>{const r=n.currentTarget;t.onSetTrustedRuntime(r.checked)})}function ca(e){return Ta(e.resumeSlideIndex??0,0,Math.max(0,e.deck.slides.length-1))}function vn(e,t){da(e);const n=e.querySelector("[data-deckx-url-form]");n?.addEventListener("submit",a=>{a.preventDefault();const o=n.querySelector("[data-deckx-url-input]")?.value.trim();o&&t.onOpenDeckxUrl?.(o)});const r=e.querySelector("[data-deckx-file-input]");r?.addEventListener("change",()=>{const a=r.files?.[0];a&&t.onOpenDeckxFile?.(a),r.value=""}),e.querySelectorAll("[data-action='select-local-deckx']").forEach(a=>{a.addEventListener("click",()=>r?.click())}),e.querySelectorAll("[data-deckx-url-link]").forEach(a=>{a.addEventListener("click",i=>{const o=a.dataset.deckxUrl;!o||!t.onOpenDeckxUrl||(i.preventDefault(),t.onOpenDeckxUrl(o))})})}function da(e){const t=window.matchMedia("(max-width: 640px)").matches;e.querySelectorAll("[data-player-source-menu]").forEach(n=>{t||(n.open=!0)})}function ua(e,t,n){return`
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
          value="${p(e)}"
          aria-label="DeckX URL"
        />
        <button class="btn compact" type="submit">${p(n.messages.player.openUrl)}</button>
      </div>
      ${t?`<div class="deckx-url-status">${p(t)}</div>`:""}
    </form>
  `}function pa(e){const t=e.messages.player;return`
    <div class="player-file-open">
      <span class="player-subhead mono">${p(t.localPackage)}</span>
      <input
        id="player-deckx-file"
        data-deckx-file-input
        class="visually-hidden"
        type="file"
        accept=".deckx,.zip,application/zip,application/x-zip-compressed"
        aria-label="DeckX zip file"
      />
      <button class="btn" type="button" data-action="select-local-deckx">${p(t.localZip)}</button>
    </div>
  `}function ma(e,t){const n=t.messages.player;return`
    <section class="player-history-list" aria-label="Recently opened DeckX">
      <span class="player-subhead mono">${p(n.recentDeckx)}</span>
      ${e.length===0?`<p class="player-empty-copy">${p(n.noHistory)}</p>`:e.map(r=>fa(r,t)).join("")}
    </section>
  `}function fa(e,t){return e.kind==="url"&&e.href?`
      <a class="player-history-option" href="${p(e.href)}" data-deckx-url-link data-deckx-url="${p(e.url??e.detail)}">
        <span>${p(e.label)}</span>
        <small>URL · ${p(e.detail)}</small>
      </a>
    `:`
    <button class="player-history-option as-button" type="button" data-action="select-local-deckx">
      <span>${p(e.label)}</span>
      <small>ZIP · ${p(e.detail)} · ${p(t.messages.player.zipNeedsReselect)}</small>
    </button>
  `}function ha(e,t){return`
    <nav class="player-demo-list" aria-label="Explicit demo DeckX packages">
      <span class="player-subhead mono">${p(t.messages.player.officialSamples)}</span>
      ${e.map(n=>`
            <a class="player-demo-option ${n.active?"active":""}" href="${p(n.href)}" data-deckx-url-link data-deckx-url="${p(n.url)}" aria-current="${n.active?"page":"false"}">
              <span><em>DEMO</em>${p(n.label)}</span>
              <small>${p(n.description)}</small>
            </a>
          `).join("")}
    </nav>
  `}function ga(e,t){const n=t.messages.player.motionDescriptions;return`
    <div class="player-motion-block">
      <span class="player-subhead mono">MOTION MODE</span>
      <div class="player-motion-segment" role="group" aria-label="Motion controls">
        ${[{id:"full",label:"Full",description:n.full},{id:"reduced",label:"Reduced",description:n.reduced},{id:"paused",label:"Paused",description:n.paused}].map(a=>`
              <button
                type="button"
                class="motion-mode ${a.id===e?"active":""}"
                data-motion-mode="${a.id}"
                aria-pressed="${a.id===e}"
                title="${p(a.description)}"
              >${p(a.label)}</button>
            `).join("")}
      </div>
    </div>
  `}function ya(e,t){const n=t.messages.player.trustedRuntime;return`
    <label class="player-trusted-runtime" title="${p(n.description)}">
      <span class="player-subhead mono">${p(n.heading)}</span>
      <span class="trusted-runtime-row">
        <input
          type="checkbox"
          data-trusted-runtime-toggle
          ${e?"checked":""}
          aria-label="${p(n.label)}"
        />
        <span>${p(n.label)}</span>
      </span>
    </label>
  `}function wa(e,t){const n=Ne(e.deck.aspectRatio),r=e.validationReport.notesCoverage,a=e.validationReport.errorCount>0?"BLOCKED":e.validationReport.warningCount>0?"WARNINGS":"READY";return`
    <details class="player-deckx-details">
      <summary>${p(e.i18n.messages.player.details)}</summary>
      <dl class="player-detail-list">
        ${P("SOURCE",`${Sn(e.sourceKind,e.i18n)} · ${e.sourceLabel}`)}
        ${P("VALIDATION",`${a} · ${e.validationReport.errorCount} errors / ${e.validationReport.warningCount} warnings`)}
        ${P("NOTES",`${r.withNotes}/${r.total} notes · ${r.missing} missing`)}
        ${P("SESSION",e.sessionId)}
        ${P("DISPLAY",$a(e.displayFilters))}
        ${P("CANVAS",`${bn(e.deck.aspectRatio)} · ${Sa(n)}`)}
        ${P("DURATION",kn(t))}
        ${va(e.deck.metadata)}
      </dl>
      ${ka(e.validationReport,e.i18n)}
    </details>
  `}function va(e){if(!e)return"";const t=[];return e.description&&t.push(P("DESCRIPTION",e.description)),e.version&&t.push(P("VERSION",e.version)),e.authors?.length&&t.push(P("AUTHORS",Ea(e))),e.tags?.length&&t.push(P("TAGS",e.tags.join(", "))),e.language&&t.push(P("LANGUAGE",e.language)),e.license&&t.push(P("LICENSE",e.license)),e.homepage&&t.push(P("HOMEPAGE",e.homepage)),e.repository&&t.push(P("REPOSITORY",e.repository)),e.generator?.name&&t.push(P("GENERATOR",xa(e))),(e.createdAt||e.updatedAt)&&t.push(P("DATES",[e.createdAt,e.updatedAt].filter(Boolean).join(" / "))),t.join("")}function P(e,t){return`
    <div class="player-detail-row">
      <dt class="mono">${p(e)}</dt>
      <dd>${p(t)}</dd>
    </div>
  `}function ka(e,t){return e.issues.length===0?`<p class="player-empty-copy">${p(t.messages.player.validationIssuesNone)}</p>`:`
    <div class="player-issue-list">
      ${e.issues.slice(0,4).map(n=>`
            <div class="player-issue" data-severity="${n.severity}">
              <strong>${p(n.code)}</strong>
              <span>${p(n.message)}</span>
            </div>
          `).join("")}
      ${e.issues.length>4?`<p>${p(t.messages.player.moreIssuesHidden(e.issues.length-4))}</p>`:""}
    </div>
  `}function ba(e){return typeof e.durationSec=="number"&&e.durationSec>0?e.durationSec:e.slides.reduce((t,n)=>t+(n.timingSec||0),0)}function kn(e){if(!e)return"No plan";const t=Math.floor(e/60),n=e%60;return t?n?`${t}m ${n}s`:`${t}m`:`${n}s`}function bn(e){return typeof e=="string"?e:`${e.width}:${e.height}`}function Sa(e){return`${e.width} x ${e.height}`}function $a(e){return`B${e.brightness} C${e.contrast} S${e.saturation}`}function Da(e){return e?e.tags?.length?e.tags.find(t=>t!=="stress"&&t!=="demo")??e.tags[0]:e.language?e.language:e.version?e.version:"present":"none"}function Ea(e){return(e.authors??[]).map(t=>[t.name,t.role].filter(Boolean).join(" · ")).join(", ")}function xa(e){return e.generator?[e.generator.name,e.generator.version].filter(Boolean).join(" "):""}function Sn(e,t){return e==="demo"?t.messages.player.sourceKind.demo:e==="zip"?t.messages.player.sourceKind.zip:t.messages.player.sourceKind.url}function La(e){return e.replace(/<[^>]*>/g,"").replace(/\s+/g," ").trim()}function Ta(e,t,n){return Number.isFinite(e)?Math.min(n,Math.max(t,Math.round(e))):t}function p(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}const yt=[{id:"script-first",name:"Script First",descriptionKey:"scriptFirst",layout:{presetId:"script-first",showCurrent:!0,showNext:!0,showNotes:!0,showOverview:!0,notesFontSize:22},grid:{columns:"140px minmax(0, 2fr) minmax(0, 1fr)",rows:"auto minmax(0, 1.2fr) minmax(0, 1fr) auto",areas:`
        "topbar topbar topbar"
        "overview notes notes"
        "overview current next"
        "bottombar bottombar bottombar"
      `}},{id:"balanced",name:"Balanced",descriptionKey:"balanced",layout:{presetId:"balanced",showCurrent:!0,showNext:!0,showNotes:!0,showOverview:!0,notesFontSize:18},grid:{columns:"minmax(0, 2fr) minmax(320px, 1fr)",rows:"auto minmax(0, 1fr) minmax(0, 0.78fr) auto",areas:`
        "topbar topbar"
        "current next"
        "notes overview"
        "bottombar bottombar"
      `}},{id:"review",name:"Review",descriptionKey:"review",layout:{presetId:"review",showCurrent:!0,showNext:!0,showNotes:!0,showOverview:!0,notesFontSize:17},grid:{columns:"128px minmax(0, 1fr) minmax(220px, 0.42fr)",rows:"auto minmax(0, 1.05fr) minmax(0, 0.85fr) auto",areas:`
        "topbar topbar topbar"
        "overview current next"
        "overview notes notes"
        "bottombar bottombar bottombar"
      `}}];function Aa(e,t,n,r,a){const i=Et(a.layout.presetId),o=Ha(i.grid,a.layout.settingsOpen),c=a.layout.showCurrent||a.layout.showNext||a.layout.showNotes||a.layout.showOverview,d=window.matchMedia("(max-width: 760px)").matches,f=a.i18n.messages.presenter;e.innerHTML=`
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
              <div class="value mono pace-value" data-pace="${a.pace.state}" data-pace-label>${S(a.pace.label)}</div>
            </div>
          </div>
          <div class="topbar-group right">
            <span class="connection mono" title="${S(f.connectionTitle)}">
              <span class="status-dot" data-connection-dot data-connected="false"></span>
              <span data-connection>${a.connectionStatus}</span>
            </span>
            <button class="tool-btn" data-action="goto" title="${S(f.gotoTitle)}">Goto</button>
            <button class="tool-btn" data-action="search" title="${S(f.searchTitle)}">Search</button>
            <button class="tool-btn primary-tool" data-action="open" title="${S(f.openSlideshowTitle)}">${S(f.openSlideshow)}</button>
            ${Pa(a)}
            <button class="tool-btn" data-action="settings" title="${S(f.settingsTitle)}">${S(a.layout.settingsOpen?f.closePresets:f.viewPresets)}</button>
            <button class="tool-btn danger" data-action="exit">${S(f.exit)}</button>
          </div>
        </div>
        ${Ra(a,t)}
      </header>

      ${a.layout.settingsOpen?Ca(a.layout,a.i18n):""}

      ${d?`<section class="mobile-combo-stage" aria-label="Mobile slideshow preview">
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
                <div class="mobile-notes-content" style="font-size:${Math.max(15,a.layout.notesFontSize-5)}px">${rn(a.notesText||f.noNotes)}</div>
              </div>
              <div class="mobile-nav-actions">
                <button class="btn compact" type="button" data-action="prev">${S(f.prev)}</button>
                <button class="btn compact primary" type="button" data-action="next">${S(f.next)}</button>
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
              <div class="notes-content" style="font-size:${a.layout.notesFontSize}px">${rn(a.notesText)}</div>
            </section>`:""}

      ${a.layout.showOverview?`<section class="panel overview">
              <div class="panel-label mono">SLIDE LIST</div>
              <div class="overview-list" data-overview></div>
            </section>`:""}

      ${c?"":`<section class="panel empty-presenter">
              <p>${S(f.emptyPanels)}</p>
            </section>`}

      <footer class="bottombar">
        <div class="nav-dots" data-dots></div>
        <div class="bottom-status mono">${S(a.windowStatus?.message||f.ready)}</div>
        <div class="timer-controls">
          <button class="btn compact" data-action="pause">${r.timer.status==="paused"?"Resume":"Pause"}</button>
          <button class="btn compact" data-action="reset">Reset</button>
        </div>
      </footer>
    </main>
  `;const k=e.querySelector(".presenter");k&&(k.dataset.preset=i.id,Fa(k,o));const m=e.querySelector("[data-current]"),g=e.querySelector("[data-next]"),y=e.querySelector("[data-mobile-stage]"),L=e.querySelector("[data-mobile-current]"),T=e.querySelector("[data-mobile-next]");if(m){const b=ie(n);m.appendChild(b),se(b.querySelector(".deckx-slide-scaler"),n,r.index,"presenter")}if(g){const b=ie(n);g.appendChild(b),se(b.querySelector(".deckx-slide-scaler"),n,r.index+1,"presenter")}if(y){const b=ie(n,"mobile-stage-wrap");y.appendChild(b),se(b.querySelector(".deckx-slide-scaler"),n,r.index,"slideshow")}if(L){const b=ie(n,"mobile-mini-wrap");L.appendChild(b),se(b.querySelector(".deckx-slide-scaler"),n,r.index,"presenter")}if(T){const b=ie(n,"mobile-mini-wrap");T.appendChild(b),se(b.querySelector(".deckx-slide-scaler"),n,r.index+1,"presenter")}Oa(e,n,r.index,a.onGoto),Na(e);const A=e.querySelector("[data-dots]");A&&n.slides.forEach((b,B)=>{const x=document.createElement("button");x.type="button",x.className=B===r.index?"active":"",x.textContent=String(B+1),x.addEventListener("click",()=>a.onGoto(B)),A.appendChild(x)}),Ia(e,a),e.querySelector('[data-action="settings"]')?.addEventListener("click",()=>{a.onToggleSettings()}),e.querySelector('[data-action="goto"]')?.addEventListener("click",()=>{a.onOpenCommand("goto")}),e.querySelector('[data-action="search"]')?.addEventListener("click",()=>{a.onOpenCommand("search")}),e.querySelector('[data-action="prev"]')?.addEventListener("click",a.onPrev),e.querySelector('[data-action="next"]')?.addEventListener("click",a.onNext),e.querySelector('[data-action="motion"]')?.addEventListener("click",a.onCycleMotionMode),e.querySelector('[data-action="theme"]')?.addEventListener("click",a.onCycleRuntimeTheme),e.querySelector('[data-action="open"]')?.addEventListener("click",a.onOpenSlideshow),e.querySelector('[data-action="copy-url"]')?.addEventListener("click",a.onCopySlideshowUrl),e.querySelector('[data-action="exit"]')?.addEventListener("click",a.onExit),e.querySelector('[data-action="edit-notes"]')?.addEventListener("click",a.onEditNotes),e.querySelector('[data-action="export-notes"]')?.addEventListener("click",a.onExportNotes),e.querySelector('[data-action="wake-lock"]')?.addEventListener("click",a.onToggleWakeLock),e.querySelector('[data-action="mirror"]')?.addEventListener("click",a.onToggleMirror),e.querySelector('[data-action="pause"]')?.addEventListener("click",a.onPauseResume),e.querySelector('[data-action="reset"]')?.addEventListener("click",a.onResetTimer),we()}function Ra(e,t){const n=e.windowStatus?.type??"idle",r=e.i18n.messages.presenter,a=e.validationReport.errorCount>0?`${e.validationReport.errorCount} errors`:`${e.validationReport.warningCount} warnings`,i=`${e.validationReport.notesCoverage.withNotes}/${e.validationReport.notesCoverage.total}`,o=e.validationReport.errorCount>0?"BLOCKED":e.connectionStatus==="CONNECTED"?"READY":"CHECK";return`
    <details class="readiness-detail">
      <summary>
        <span>${S(r.readiness.summary)}</span>
        <span class="readiness-summary-chip mono" data-readiness-state="${S(o.toLowerCase())}">${o}</span>
        <span class="readiness-summary-copy">SYNC ${S(e.connectionStatus)} · POPUP ${S(an(n))} · VALIDATION ${S(a)}</span>
      </summary>
      <div class="readiness-row" aria-label="Presentation setup preflight">
        ${O("DECK",t.title,"",r.readiness.deck)}
        ${O("SESSION",qa(e.sessionId),"",r.readiness.session)}
        ${O("POPUP",an(n),n,r.readiness.popup)}
        ${O("SYNC",e.connectionStatus,"",r.readiness.sync)}
        ${O("FULLSCREEN",e.fullscreenActive?"ON":"OFF","",r.readiness.fullscreen)}
        ${O("MOTION",$n(e.motionMode),"",r.readiness.motion)}
        ${O("THEME",Dn(e.runtimeTheme),"",r.readiness.theme)}
        ${O("PACE",e.pace.detail,e.pace.state,r.readiness.pace)}
        ${O("FILTER",ja(e.displayFilters),"",r.readiness.filter)}
        ${O("WAKE",e.wakeLockStatus,"",r.readiness.wake)}
        ${O("MIRROR",e.mirrorStatus,"",r.readiness.mirror)}
        ${O("VALIDATION",a,e.validationReport.errorCount>0?"error":"ok",r.readiness.validation)}
        ${O("NOTES",i,"",r.readiness.notes)}
      </div>
    </details>
  `}function O(e,t,n="",r=""){return`
    <span class="readiness-item" data-readiness-state="${S(n)}" title="${S(r)}">
      <span class="readiness-label mono">${S(e)}</span>
      <span class="readiness-value mono">${S(t)}</span>
      ${r?`<span class="readiness-description">${S(r)}</span>`:""}
    </span>
  `}function Pa(e){const t=e.i18n.messages.presenter.tools;return`
    <details class="presenter-tools-menu">
      <summary class="tool-btn">${S(t.label)}</summary>
      <div class="presenter-tools-panel">
        ${Te("motion",`Motion: ${$n(e.motionMode)}`,t.motionDescription)}
        ${Te("theme",`${t.themeLabel}: ${Dn(e.runtimeTheme)}`,t.themeDescription)}
        ${Te("copy-url",t.copyUrl,t.copyUrlDescription)}
        ${Te("wake-lock","Keep Awake",t.wakeLockDescription)}
        ${Te("mirror","Audience Mirror",t.mirrorDescription)}
      </div>
    </details>
  `}function Te(e,t,n){return`
    <button class="tool-menu-control" type="button" data-action="${S(e)}">
      <strong>${S(t)}</strong>
      <span>${S(n)}</span>
    </button>
  `}function Ca(e,t){return`
    <section class="panel layout-settings">
      <div class="preset-picker" role="radiogroup" aria-label="Presenter view presets">
        ${yt.map(n=>Ma(n,e.presetId,t)).join("")}
      </div>
    </section>
  `}function Ma(e,t,n){return`
    <button
      type="button"
      class="preset-card ${e.id===t?"active":""}"
      data-preset-id="${e.id}"
      aria-pressed="${e.id===t}"
    >
      <span class="preset-name">${e.name}</span>
      <span class="preset-description">${S(n.messages.presenter.presets[e.descriptionKey])}</span>
      <span class="preset-map preset-map-${e.id}"><span class="preset-map-extra"></span></span>
    </button>
  `}function Ia(e,t){e.querySelectorAll("[data-preset-id]").forEach(n=>{n.addEventListener("click",()=>{const r=n.dataset.presetId;t.onSelectPreset(r)})})}function Oa(e,t,n,r){const a=e.querySelector("[data-overview]");a&&t.slides.forEach((i,o)=>{const c=document.createElement("button");c.type="button",c.className=`overview-item ${o===n?"active":""}`,c.setAttribute("aria-label",`Slide ${o+1}: ${Ua(i.title||i.id)}`),c.addEventListener("click",()=>r(o)),c.addEventListener("keydown",g=>{const y=Xa(g.key);if(y===0)return;g.preventDefault(),g.stopPropagation();const L=Array.from(a.querySelectorAll(".overview-item")),T=L.indexOf(c),A=Math.max(0,Math.min(L.length-1,T+y));L[A]?.focus()});const d=document.createElement("div"),f=Ne(t.aspectRatio);d.className="overview-thumb",d.style.aspectRatio=`${f.width} / ${f.height}`;const k=document.createElement("div");k.className="overview-mini-slide",k.appendChild(gn(t,o,"presenter")),d.appendChild(k);const m=document.createElement("span");m.className="overview-number mono",m.textContent=String(o+1).padStart(2,"0"),c.append(d,m),a.appendChild(c)})}function Na(e){e.querySelectorAll(".overview-thumb").forEach(t=>{const n=t.querySelector(".deckx-slide"),r=Number.parseFloat(n?.style.width||"1280"),a=t.clientWidth/r;t.style.setProperty("--overview-thumb-scale",String(a))})}function Ua(e){return e.replace(/<[^>]*>/g,"")}function Xa(e){return e==="ArrowDown"||e==="ArrowRight"?1:e==="ArrowUp"||e==="ArrowLeft"?-1:0}function Fa(e,t){Object.entries(t).forEach(([n,r])=>{e.style.setProperty(n,r)})}function Et(e){return yt.find(t=>t.id===e)??yt[0]}function Ha(e,t){if(!t)return nn(e.columns,e.rows,e.areas);const n=e.areas.trim().split(`
`).map(i=>i.trim()).find(Boolean),r=n?n.replaceAll('"',"").trim().split(/\s+/).length:1,a=`"${Array.from({length:r},()=>"settings").join(" ")}"`;return nn(e.columns,e.rows.replace(/^auto\s+/,"auto auto "),e.areas.trim().replace(/^"[^"]+"/,`$&
${a}`))}function nn(e,t,n){return{"grid-template-columns":e,"grid-template-rows":t,"grid-template-areas":n}}function rn(e){return S(e).replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>").replace(/\n/g,"<br />")}function $n(e){return e==="reduced"?"Reduced":e==="paused"?"Paused":"Full"}function Dn(e){return e==="dark"?"Dark":"Light"}function ja(e){return`${e.brightness}/${e.contrast}/${e.saturation}`}function an(e){return e==="opened"?"OPENED":e==="popup-blocked"?"BLOCKED":e==="opening"?"OPENING":e==="window-management-denied"?"DENIED":e==="window-management-unavailable"?"FALLBACK":"READY"}function qa(e){return e.length<=12?e:`${e.slice(0,6)}...${e.slice(-4)}`}function S(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Ba(e,t,n,r){const a=r.i18n.messages.slideshow;e.innerHTML=`
    <main class="slideshow-stage" data-runtime-theme="${r.runtimeTheme}">
      <div data-slide-host style="${za(r.displayFilters)}"></div>
      <div class="slideshow-toolbar" aria-label="${Ae(a.controls)}">
        <button class="fullscreen-btn" data-action="fullscreen">
          ${Ae(document.fullscreenElement?a.exitFullscreen:a.enterFullscreen)}
        </button>
        <button class="theme-toggle-btn" data-action="theme">
          Theme: ${Ka(r.runtimeTheme)}
        </button>
        <button class="motion-toggle-btn" data-action="motion">
          Motion: ${Wa(r.motionMode)}
        </button>
        <button class="display-filter-toggle-btn" data-action="display-filters" aria-expanded="${r.displayFiltersOpen}">
          ${Ae(a.display)}
        </button>
        <button class="end-presentation-btn" data-action="exit">
          ${Ae(a.exit)}
        </button>
      </div>
      ${r.displayFiltersOpen?`<div class="display-filter-panel" aria-label="${Ae(a.displayFilters)}">
              ${lt("brightness",a.brightness,r.displayFilters.brightness)}
              ${lt("contrast",a.contrast,r.displayFilters.contrast)}
              ${lt("saturation",a.saturation,r.displayFilters.saturation)}
            </div>`:""}
      <div class="fullscreen-status mono" data-fullscreen-status></div>
    </main>
  `;const i=e.querySelector("[data-slide-host]");if(i){const o=ie(t,"slideshow-wrap");i.appendChild(o),se(o.querySelector(".deckx-slide-scaler"),t,n.index,"slideshow")}e.querySelector('[data-action="fullscreen"]')?.addEventListener("click",r.onFullscreen),e.querySelector('[data-action="motion"]')?.addEventListener("click",r.onCycleMotionMode),e.querySelector('[data-action="theme"]')?.addEventListener("click",r.onCycleRuntimeTheme),e.querySelector('[data-action="display-filters"]')?.addEventListener("click",r.onToggleDisplayFilters),e.querySelector('[data-action="exit"]')?.addEventListener("click",r.onExit),e.querySelectorAll("[data-filter-key]").forEach(o=>{o.addEventListener("input",()=>{const c=o.dataset.filterKey;r.onSetDisplayFilter(c,Number(o.value))})}),e.querySelector(".slideshow-stage")?.addEventListener("click",o=>{const c=o.target;c instanceof HTMLElement&&c.closest("button, input, label")||r.onNext()}),e.querySelector(".slideshow-stage")?.addEventListener("contextmenu",o=>{o.preventDefault(),r.onPrev()}),we()}function Wa(e){return e==="reduced"?"Reduced":e==="paused"?"Paused":"Full"}function Ka(e){return e==="dark"?"Dark":"Light"}function lt(e,t,n){return`
    <label class="filter-control">
      <span class="mono">${t}</span>
      <input type="range" min="60" max="140" step="1" value="${n}" data-filter-key="${e}" />
    </label>
  `}function za(e){return`filter: brightness(${e.brightness}%) contrast(${e.contrast}%) saturate(${e.saturation}%);`}function Ae(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}const Re=6e3,Ce={brightness:100,contrast:100,saturation:100},sn="light",on="trusted",ct={presetId:"script-first",showCurrent:!0,showNext:!0,showNotes:!0,showOverview:!0,notesFontSize:22,settingsOpen:!1};function Va(e,t){const n=Lr(e),r=kr(e),a=t.mount,i=t.i18n??ze();let o=Ga(),c=_a(e.id),d=Ja(e.id),f=Qa(e.id),k=ns(e.id),m=!!t.trustedRuntimeEnabled;const g=new jr(t.trustedRuntimeScripts??[],t.trustedRuntimeGlobal);let y=null,L=!1,T="",A=!1,b="",B=!1,x="off",F=null,I="off",V=null,Y=null,oe=null;const J=ss(t.mode);let te=os(J),M=!!document.fullscreenElement,Z=!1,Fe=c==="paused"?"full":c,u=$e(J,ls(t.sessionId));return window.addEventListener("resize",we),document.addEventListener("keydown",It),document.addEventListener("fullscreenchange",Nt),document.addEventListener("visibilitychange",Gt),W(u),pn(J,u.sessionId,te),v(),{destroy:Qe,getSessionId:()=>u.sessionId};function $e(s,l,w=0){const $=Ke("sender"),H=s==="presenter"?Date.now():0,D=Or(e.id,l,n.slides.length,w,H),Be=ne(l,$,s),j={mode:s,sessionId:l,senderId:$,store:D,transport:Be,unsubscribeStore:()=>{},unsubscribeTransport:()=>{},tickTimer:null,heartbeatTimer:null,lastWindowStatus:null};return j.unsubscribeStore=D.subscribe(v),j.unsubscribeTransport=Be.subscribe(vr=>Yn(j,vr)),j.tickTimer=window.setInterval(Zn,250),j}function ne(s,l,w){return w==="landing"?new Qt:"BroadcastChannel"in window?new Nr({deckId:e.id,sessionId:s,senderId:l,from:w==="slideshow"?"slideshow":"presenter"}):new Qt("BroadcastChannel is not supported in this browser.")}function pe(s,l=u.sessionId,w=0){He(u),u=$e(s,l,w),W(u),pn(s,l,te),v()}function Q(s){s.slideshowExitTarget&&(te=s.slideshowExitTarget),pe(s.mode,s.sessionId??u.sessionId,s.initialIndex??0)}function W(s){s.mode==="slideshow"&&(Jn(s),s.transport.send({type:"hello",wantsState:!0})),s.mode==="presenter"&&(s.store.startTimer(),le(s),Le(s))}function He(s){s.unsubscribeStore(),s.unsubscribeTransport(),s.transport.close(),s.tickTimer!==null&&window.clearInterval(s.tickTimer),s.heartbeatTimer!==null&&window.clearInterval(s.heartbeatTimer)}function Qe(){He(u),g.destroy(),window.removeEventListener("resize",we),document.removeEventListener("keydown",It),document.removeEventListener("fullscreenchange",Nt),document.removeEventListener("visibilitychange",Gt),Vt(),_t(),re()}function v(){if(document.body.dataset.mode=u.mode,document.body.dataset.motion=c,document.body.dataset.runtimeTheme=d,m&&g.cleanup(),u.mode==="landing"){aa(a,{i18n:i,deck:e,publicDeck:n,sessionId:u.sessionId,sourceUrl:t.deckxUrlValue??"",sourceKind:t.sourceKind??"url",sourceLabel:t.sourceLabel??t.deckxUrlValue??e.id,validationReport:r,motionMode:c,displayFilters:f,trustedRuntimeAvailable:g.available,trustedRuntimeEnabled:m,resumeSlideIndex:fe(),demoOptions:t.demoOptions??[],historyOptions:t.historyOptions??[],actions:{onStart:()=>G(),onStartFromFirst:()=>G({startIndex:0}),onPresenterOnly:()=>Q({mode:"presenter",initialIndex:fe()}),onSlideshowOnly:()=>Ee(),onSetMotionMode:s=>he(s),onSetTrustedRuntime:ar,onOpenDeckxUrl:t.onOpenDeckxUrl,onOpenDeckxFile:t.onOpenDeckxFile,deckxUrlValue:t.deckxUrlValue,deckxStatus:t.deckxStatus,homeHref:t.homeHref}}),it(),nt();return}if(u.mode==="presenter"){Aa(a,e,n,u.store.getState(),{i18n:i,connectionStatus:Mt(),windowStatus:u.lastWindowStatus,sessionId:u.sessionId,fullscreenActive:!!document.fullscreenElement,pace:jt(),notesText:st(u.store.getState().index),notesHasDraft:cr(u.store.getState().index),validationReport:r,displayFilters:f,wakeLockStatus:as(x),mirrorStatus:un(I),layout:o,runtimeTheme:d,onNext:()=>C("next"),onPrev:()=>C("prev"),onGoto:s=>C("goto",s),onOpenCommand:s=>rt(s),onEditNotes:()=>Bt(),onExportNotes:()=>ur(),onPauseResume:()=>qe(u.store.getState().timer.status==="paused"?"resume":"pause"),onResetTimer:()=>qe("reset"),onOpenSlideshow:()=>De(),onCopySlideshowUrl:()=>pr(),onExit:()=>K(),onSelectPreset:er,onToggleSettings:tr,onToggleWakeLock:()=>mr(),onToggleMirror:()=>fr(),onCycleRuntimeTheme:Xt,motionMode:c,onCycleMotionMode:Ut}),it(),nt();return}Ba(a,n,u.store.getState(),{i18n:i,onNext:()=>C("next"),onPrev:()=>C("prev"),onFullscreen:()=>Ot(),motionMode:c,onCycleMotionMode:Ut,runtimeTheme:d,onCycleRuntimeTheme:Xt,displayFilters:f,displayFiltersOpen:A,onToggleDisplayFilters:()=>{A=!A,v()},onSetDisplayFilter:rr,onExit:()=>K()}),it(),nt()}async function G(s={}){const l=me(s.startIndex);if(ge(e.id,l),Sr()){Q({mode:"presenter",initialIndex:l}),u.lastWindowStatus={type:"idle",message:i.messages.runtime.mobileCombined},v();return}Q({mode:"presenter",initialIndex:l}),await De()}async function De(){u.lastWindowStatus={type:"opening",message:i.messages.runtime.openingSlideshow},v();const s=await Br({sessionId:u.sessionId,display:t.display??"auto",i18n:i,deckUrl:t.slideshowDeckUrl,onStatus:l=>{u.lastWindowStatus=l,v()}});u.lastWindowStatus=s.status,et(s.windowRef),v()}function K(s={}){if(u.mode==="landing")return;const l=u.mode;if(ge(e.id,u.store.getState().index),document.fullscreenElement&&(Z=!0,document.exitFullscreen().catch(()=>{Z=!1})),s.publish!==!1&&u.transport.send({type:"end-presentation"}),l==="slideshow"){if(te==="landing"){Q({mode:"landing",sessionId:Ke("session")});return}xe();return}s.publish!==!1&&je(),re(),Q({mode:"landing",sessionId:Ke("session")})}function Ee(){const s=me();ge(e.id,s),Q({mode:"slideshow",slideshowExitTarget:"landing",initialIndex:s})}function me(s){return typeof s=="number"?ve(s,0,Math.max(0,n.slides.length-1)):fe()}function fe(){return ts(e.id,n.slides.length)}function xe(){window.close(),a.innerHTML=`<div class="system-message">${ee(i.messages.runtime.slideshowClosed)}</div>`}function et(s){re(),s&&(Y=s,oe=window.setInterval(()=>{Y?.closed&&(re(),u.mode==="presenter"&&(u.lastWindowStatus={type:"idle",message:i.messages.runtime.slideshowClosed},v()))},500))}function re(){oe!==null&&window.clearInterval(oe),oe=null,Y=null}function je(){Y&&!Y.closed&&Y.close(),re()}function C(s,l){if(u.mode!=="landing"){if(u.mode==="presenter"){tt(u.store,s,l),ge(e.id,u.store.getState().index),le(u);return}u.transport.send({type:"nav-request",action:s,index:l}),u.store.isPeerConnected(Re)||(tt(u.store,s,l),ge(e.id,u.store.getState().index))}}function qe(s){if(u.mode==="presenter"){u.store.applyTimerCommand(s),le(u);return}u.transport.send({type:"timer-command",action:s})}function le(s){s.mode==="presenter"&&s.transport.send({type:"state-snapshot",state:s.store.getPublicState()})}function Le(s){s.mode!=="landing"&&s.transport.send({type:"runtime-preferences",motionMode:c,displayFilters:f,runtimeTheme:d})}function Yn(s,l){switch(s.store.markPeerSeen(),l.body.type){case"hello":s.mode==="presenter"&&(le(s),Le(s));break;case"state-snapshot":s.mode==="slideshow"&&l.from==="presenter"&&s.store.applySnapshot(l.body.state);break;case"nav-request":s.mode==="presenter"&&(tt(s.store,l.body.action,l.body.index),ge(e.id,s.store.getState().index),le(s));break;case"timer-command":s.mode==="presenter"&&(s.store.applyTimerCommand(l.body.action),le(s));break;case"runtime-preferences":he(l.body.motionMode,{publish:!1}),l.body.displayFilters&&Ft(l.body.displayFilters,{publish:!1}),l.body.runtimeTheme&&Ht(l.body.runtimeTheme,{publish:!1});break;case"ping":s.transport.send({type:"pong",stateVersion:s.store.getState().stateVersion}),s.mode==="presenter"&&le(s);break;case"pong":break;case"end-presentation":K({publish:!1});break;case"close-slideshow":s.mode==="slideshow"&&xe();break}}function tt(s,l,w){l==="next"&&s.goto(s.getState().index+1),l==="prev"&&s.goto(s.getState().index-1),l==="goto"&&typeof w=="number"&&s.goto(w)}function Jn(s){s.heartbeatTimer=window.setInterval(()=>{s.transport.send({type:"ping"}),s.store.isPeerConnected(Re)||s.transport.send({type:"hello",wantsState:!0})},1e3)}function Zn(){u.mode!=="landing"&&(u.store.refreshPeer(Re),Qn())}function Qn(){const s=document.querySelector("[data-clock]");s&&(s.textContent=rs(new Date));const l=document.querySelector("[data-elapsed]");l&&(l.textContent=u.store.getElapsedLabel());const w=jt(),$=document.querySelector("[data-pace-label]");$&&($.textContent=w.label,$.dataset.pace=w.state);const H=document.querySelector("[data-connection]");H&&(H.textContent=Mt());const D=document.querySelector("[data-connection-dot]");D&&(D.dataset.connected=String(u.store.isPeerConnected(Re)))}function Mt(){return"BroadcastChannel"in window?u.store.isPeerConnected(Re)?"CONNECTED":"DISCONNECTED":"UNSUPPORTED"}function er(s){const l=Et(s);o=wt({...l.layout,settingsOpen:o.settingsOpen}),ln(o),v()}function tr(){o=wt({...o,settingsOpen:!o.settingsOpen}),ln(o),v()}function It(s){if(u.mode==="landing"){s.key==="Enter"&&(s.metaKey||s.ctrlKey)&&(s.preventDefault(),G());return}if(!ds(s.target)){if(s.key==="Escape"){s.preventDefault(),K();return}if(s.key==="ArrowRight"||s.key===" "||s.key==="PageDown"){s.preventDefault(),C("next");return}if(s.key==="ArrowLeft"||s.key==="PageUp"){s.preventDefault(),C("prev");return}if(s.key==="Home"){s.preventDefault(),C("goto",0);return}if(s.key==="End"){s.preventDefault(),C("goto",n.slides.length-1);return}if(s.key.toLowerCase()==="f"){s.preventDefault(),Ot();return}if(s.key.toLowerCase()==="r"){s.preventDefault(),qe("reset");return}if(s.key.toLowerCase()==="p"){s.preventDefault(),qe(u.store.getState().timer.status==="paused"?"resume":"pause");return}if(s.key.toLowerCase()==="m"){s.preventDefault(),nr();return}if(s.key.toLowerCase()==="g"){s.preventDefault(),rt("goto");return}if(s.key==="/"){s.preventDefault(),rt("search");return}s.key.toLowerCase()==="n"&&u.mode==="presenter"&&(s.preventDefault(),Bt())}}function Ot(){if(document.fullscreenElement){Z=!0,document.exitFullscreen().catch(()=>{Z=!1});return}document.documentElement.requestFullscreen({navigationUI:"hide"}).catch(()=>{const s=document.querySelector("[data-fullscreen-status]");s&&(s.textContent=i.messages.runtime.fullscreenFailed)})}function Nt(){const s=!!document.fullscreenElement,l=M&&!s;if(M=s,l&&u.mode!=="landing"&&!Z){K();return}Z=!1,v()}function Ut(){if(c==="full"){he("reduced");return}if(c==="reduced"){he("paused");return}he("full")}function Xt(){Ht(d==="light"?"dark":"light")}function nr(){he(c==="paused"?Fe:"paused")}function he(s,l={}){s!=="paused"&&(Fe=s),s!==c&&(c=s,Ya(e.id,c),document.body.dataset.motion=c,l.publish!==!1&&Le(u),v())}function rr(s,l){Ft({...f,[s]:ve(l,60,140)})}function Ft(s,l={}){f=En(s),es(e.id,f),l.publish!==!1&&Le(u),v()}function Ht(s,l={}){s!==d&&(d=s,Za(e.id,d),document.body.dataset.runtimeTheme=d,l.publish!==!1&&Le(u),v())}function ar(s){g.available&&(m=s,cs(s),s||g.cleanup(),v())}function nt(){if(!m||!g.available)return;const s=sr();s&&g.mount(s).catch(l=>{g.cleanup(),b=l instanceof Error?l.message:String(l),Jt()})}function sr(){return u.mode==="landing"?a.querySelector("[data-player-preview]"):u.mode==="slideshow"?a.querySelector("[data-slide-host]"):a.querySelector("[data-mobile-stage]")||a.querySelector("[data-current]")||a.querySelector("[data-next]")}function jt(){const s=u.store.getState(),l=ir();if(!l)return{label:"NO PLAN",detail:"NO PLAN",state:"none"};const w=mn(s.timer)/1e3,$=qt(s.index),H=qt(s.index+1),D=20;return w<$-D?{label:"AHEAD",detail:`${dn(w-$)} vs plan`,state:"ahead"}:w>H+D?{label:"BEHIND",detail:`${dn(w-H)} vs plan`,state:"behind"}:{label:"ON TRACK",detail:`${vt(w)} / ${vt(l)}`,state:"on-track"}}function ir(){if(typeof e.durationSec=="number"&&e.durationSec>0)return e.durationSec;const s=e.slides.reduce((l,w)=>l+(w.timingSec||0),0);return s>0?s:0}function qt(s){const l=e.durationSec&&e.slides.length>0?e.durationSec/e.slides.length:0;return e.slides.slice(0,s).reduce((w,$)=>w+($.timingSec||l),0)}function rt(s){y={mode:s,query:s==="goto"?String(u.store.getState().index+1):""},v()}function or(){y=null,v()}function lr(){if(!y)return;if(y.mode==="goto"){const l=Number.parseInt(y.query,10);Number.isFinite(l)&&C("goto",l-1),y=null,v();return}const s=at(y.query)[0];s&&C("goto",s.index),y=null,v()}function at(s){const l=s.trim().toLowerCase();return l?e.slides.map((w,$)=>({index:$,title:dt(w.title||w.id||`Slide ${$+1}`),notes:w.notes||"",haystack:[w.title,w.body,w.notes,w.id].filter(Boolean).join(" ").toLowerCase()})).filter(w=>w.haystack.includes(l)).slice(0,8):[]}function st(s){const l=e.slides[s];return l?k[l.id]??l.notes??"":""}function cr(s){const l=e.slides[s];return!!(l&&Object.prototype.hasOwnProperty.call(k,l.id))}function Bt(){T=st(u.store.getState().index),L=!0,v()}function Wt(){L=!1,v()}function Kt(){const s=e.slides[u.store.getState().index];s&&(k={...k,[s.id]:T},cn(e.id,k),L=!1,b=i.messages.runtime.notesSaved,v())}function dr(){const s=e.slides[u.store.getState().index];if(!s)return;const l={...k};delete l[s.id],k=l,cn(e.id,k),T=s.notes||"",L=!1,b=i.messages.runtime.notesReset,v()}function ur(){const s=[`# ${e.title} Speaker Notes`,"",...e.slides.flatMap((H,D)=>[`## ${D+1}. ${dt(H.title||H.id)}`,"",st(D)||"_No speaker notes._",""])].join(`
`),l=new Blob([s],{type:"text/markdown;charset=utf-8"}),w=URL.createObjectURL(l),$=document.createElement("a");$.href=w,$.download=`${e.id}-speaker-notes.md`,$.click(),URL.revokeObjectURL(w),b=i.messages.runtime.notesExported,v()}async function pr(){const s=wr();try{await navigator.clipboard?.writeText(s),b=i.messages.runtime.slideshowUrlCopied}catch{b=s}v()}async function mr(){if(F){B=!1,await Vt(),x="off",v();return}B=!0,await zt(),v()}async function zt(){const s=navigator;if(!s.wakeLock){x="unsupported";return}try{F=await s.wakeLock.request("screen"),x="active",F.addEventListener("release",()=>{F=null,x="off",v()})}catch{F=null,x="denied"}}async function Vt(){const s=F;F=null,s&&await s.release().catch(()=>{})}function Gt(){document.visibilityState==="visible"&&B&&!F&&zt().then(v)}async function fr(){if(V||I==="fallback"){_t(),I="off",v();return}const s=navigator,l=s.mediaDevices?.getDisplayMedia;if(!l){I="fallback",v();return}try{V=await l.call(s.mediaDevices,{video:!0,audio:!1}),I="active"}catch{I="fallback"}v()}function _t(){V?.getTracks().forEach(s=>s.stop()),V=null}function it(){y&&hr(),L&&gr(),u.mode==="presenter"&&I!=="off"&&yr(),b&&Jt()}function hr(){if(!y)return;const s=y.mode==="search"?at(y.query):[],l=y.mode==="goto"?"Go to slide":"Search slides",w=y.mode==="goto"?"Slide number":"Title, body, or notes";a.insertAdjacentHTML("beforeend",`
        <div class="command-overlay" role="dialog" aria-modal="true" aria-label="${l}">
          <div class="command-box">
            <div class="command-title mono">${l}</div>
            <input class="command-input" data-command-input value="${ee(y.query)}" placeholder="${w}" />
            <div class="command-results">
              ${y.mode==="search"?s.map(D=>Yt(D.index,D.title,D.notes)).join("")||`<div class="command-empty">${ee(i.messages.runtime.searchEmpty)}</div>`:`<div class="command-empty">${ee(i.messages.runtime.gotoEmpty(n.slides.length))}</div>`}
            </div>
          </div>
        </div>
      `);const $=a.querySelector("[data-command-input]");window.requestAnimationFrame(()=>{$?.focus(),$?.setSelectionRange(0,$.value.length)}),$?.addEventListener("input",()=>{y={...y,query:$.value},H()}),$?.addEventListener("keydown",D=>{D.key==="Escape"&&(D.preventDefault(),or()),D.key==="Enter"&&(D.preventDefault(),lr())}),a.querySelectorAll("[data-command-goto]").forEach(D=>{D.addEventListener("click",()=>{C("goto",Number(D.dataset.commandGoto)),y=null,v()})});function H(){if(y?.mode!=="search")return;const D=a.querySelector(".command-results");if(!D)return;const Be=at(y.query);D.innerHTML=Be.map(j=>Yt(j.index,j.title,j.notes)).join("")||`<div class="command-empty">${ee(i.messages.runtime.searchEmpty)}</div>`,D.querySelectorAll("[data-command-goto]").forEach(j=>{j.addEventListener("click",()=>{C("goto",Number(j.dataset.commandGoto)),y=null,v()})})}}function Yt(s,l,w){const $=dt(w).slice(0,86);return`
      <button class="command-result" data-command-goto="${s}" type="button">
        <span class="mono">${String(s+1).padStart(2,"0")}</span>
        <span>${ee(l)}</span>
        <small>${ee($)}</small>
      </button>
    `}function gr(){a.insertAdjacentHTML("beforeend",`
        <div class="command-overlay" role="dialog" aria-modal="true" aria-label="Speaker notes editor">
          <div class="notes-editor-box">
            <div class="command-title mono">Speaker Notes Draft</div>
            <textarea class="notes-editor" data-notes-editor>${ee(T)}</textarea>
            <div class="modal-actions">
              <button class="btn compact" data-action="notes-cancel">Cancel</button>
              <button class="btn compact" data-action="notes-reset">Reset</button>
              <button class="btn compact primary" data-action="notes-save">Save Draft</button>
            </div>
          </div>
        </div>
      `);const s=a.querySelector("[data-notes-editor]");window.requestAnimationFrame(()=>s?.focus()),s?.addEventListener("input",()=>{T=s.value}),s?.addEventListener("keydown",l=>{l.key==="Escape"&&(l.preventDefault(),Wt()),l.key==="Enter"&&(l.metaKey||l.ctrlKey)&&(l.preventDefault(),Kt())}),a.querySelector('[data-action="notes-cancel"]')?.addEventListener("click",Wt),a.querySelector('[data-action="notes-reset"]')?.addEventListener("click",dr),a.querySelector('[data-action="notes-save"]')?.addEventListener("click",Kt)}function yr(){a.insertAdjacentHTML("beforeend",`
        <aside class="audience-mirror">
          <div class="mirror-header mono">AUDIENCE MIRROR · ${un(I)}</div>
          <div class="mirror-body" data-mirror-body></div>
        </aside>
      `);const s=a.querySelector("[data-mirror-body]");if(!s)return;if(I==="active"&&V){const w=document.createElement("video");w.autoplay=!0,w.muted=!0,w.playsInline=!0,w.srcObject=V,s.appendChild(w);return}const l=ie(n,"mirror-fallback-wrap");s.appendChild(l),se(l.querySelector(".deckx-slide-scaler"),n,u.store.getState().index,"presenter"),we()}function Jt(){a.insertAdjacentHTML("beforeend",`<div class="transient-status mono" data-transient-status>${ee(b)}</div>`),window.setTimeout(()=>{b="",document.querySelector("[data-transient-status]")?.remove()},2400)}function wr(){const s=new URL(window.location.href);return s.hash="slideshow",s.searchParams.set("sessionId",u.sessionId),s.searchParams.set("slideshowWindow","popup"),t.slideshowDeckUrl&&s.searchParams.set("deck",t.slideshowDeckUrl),s.toString()}}function Ga(){try{const e=window.localStorage.getItem("deckx-player:layout");return e?wt({...ct,...JSON.parse(e)}):ct}catch{return ct}}function ln(e){try{window.localStorage.setItem("deckx-player:layout",JSON.stringify(e))}catch{return}}function _a(e){try{const t=window.localStorage.getItem(`deckx-player:${e}:motion`)||window.localStorage.getItem("deckx-player:motion");if(t==="full"||t==="reduced"||t==="paused")return t}catch{return"full"}return"full"}function Ya(e,t){try{window.localStorage.setItem(`deckx-player:${e}:motion`,t)}catch{return}}function Ja(e){try{const t=window.localStorage.getItem(`deckx-player:${e}:runtime-theme`)||window.localStorage.getItem("deckx-player:runtime-theme");if(t==="light"||t==="dark")return t}catch{return sn}return sn}function Za(e,t){try{window.localStorage.setItem(`deckx-player:${e}:runtime-theme`,t)}catch{return}}function Qa(e){try{const t=window.localStorage.getItem(`deckx-player:${e}:display-filters`);return t?En(JSON.parse(t)):Ce}catch{return Ce}}function es(e,t){try{window.localStorage.setItem(`deckx-player:${e}:display-filters`,JSON.stringify(t))}catch{return}}function ts(e,t){try{const n=window.localStorage.getItem(`deckx-player:${e}:last-slide`);return n?ve(Number.parseInt(n,10),0,Math.max(0,t-1)):0}catch{return 0}}function ge(e,t){try{if(t<=0){window.localStorage.removeItem(`deckx-player:${e}:last-slide`);return}window.localStorage.setItem(`deckx-player:${e}:last-slide`,String(t))}catch{return}}function En(e){return{brightness:ve(e.brightness??Ce.brightness,60,140),contrast:ve(e.contrast??Ce.contrast,60,140),saturation:ve(e.saturation??Ce.saturation,60,140)}}function ns(e){try{const t=window.localStorage.getItem(`deckx-player:${e}:notes-drafts`);if(!t)return{};const n=JSON.parse(t);return Object.fromEntries(Object.entries(n).filter(r=>typeof r[1]=="string"))}catch{return{}}}function cn(e,t){try{window.localStorage.setItem(`deckx-player:${e}:notes-drafts`,JSON.stringify(t))}catch{return}}function wt(e){return{...Et(e.presetId).layout,settingsOpen:!!e.settingsOpen}}function rs(e){const t=String(e.getHours()).padStart(2,"0"),n=String(e.getMinutes()).padStart(2,"0"),r=String(e.getSeconds()).padStart(2,"0");return`${t}:${n}:${r}`}function vt(e){const t=Math.max(0,Math.floor(e)),n=Math.floor(t/60),r=t%60;return`${String(n).padStart(2,"0")}:${String(r).padStart(2,"0")}`}function dn(e){return`${e>=0?"+":"-"}${vt(Math.abs(e))}`}function as(e){return e==="active"?"ACTIVE":e==="unsupported"?"UNSUPPORTED":e==="denied"?"DENIED":"OFF"}function un(e){return e==="active"?"ACTIVE":e==="fallback"?"FALLBACK":e==="unsupported"?"UNSUPPORTED":e==="denied"?"DENIED":"OFF"}function dt(e){return e.replace(/<[^>]*>/g,"")}function ee(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function ve(e,t,n){return Number.isFinite(e)?Math.min(n,Math.max(t,Math.round(e))):t}function ss(e){if(e)return e;const t=window.location.hash.replace("#",""),n=new URLSearchParams(window.location.search).get("mode");return t==="presenter"||t==="slideshow"||t==="landing"?t:n==="presenter"||n==="slideshow"||n==="landing"?n:"landing"}function is(){return!!window.opener}function os(e){return e!=="slideshow"||new URLSearchParams(window.location.search).get("slideshowWindow")==="popup"||is()?"close":"landing"}function ls(e){return e||new URLSearchParams(window.location.search).get("sessionId")||Ke("session")}function pn(e,t,n){const r=new URL(window.location.href);r.hash=e,r.searchParams.delete("mode"),e==="landing"?(r.searchParams.delete("sessionId"),r.searchParams.delete("slideshowWindow")):(r.searchParams.set("sessionId",t),(e!=="slideshow"||n!=="close")&&r.searchParams.delete("slideshowWindow")),window.history.replaceState({},"",r.toString())}function cs(e){const t=new URL(window.location.href);e?t.searchParams.set(on,"1"):t.searchParams.delete(on),window.history.replaceState({},"",t.toString())}function ds(e){return e instanceof HTMLElement?e.isContentEditable||["INPUT","TEXTAREA","SELECT"].includes(e.tagName):!1}var U=Uint8Array,ye=Uint16Array,us=Int32Array,xn=new U([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),Ln=new U([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),ps=new U([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),Tn=function(e,t){for(var n=new ye(31),r=0;r<31;++r)n[r]=t+=1<<e[r-1];for(var a=new us(n[30]),r=1;r<30;++r)for(var i=n[r];i<n[r+1];++i)a[i]=i-n[r]<<5|r;return{b:n,r:a}},An=Tn(xn,2),Rn=An.b,ms=An.r;Rn[28]=258,ms[258]=28;var fs=Tn(Ln,0),hs=fs.b,kt=new ye(32768);for(var E=0;E<32768;++E){var ae=(E&43690)>>1|(E&21845)<<1;ae=(ae&52428)>>2|(ae&13107)<<2,ae=(ae&61680)>>4|(ae&3855)<<4,kt[E]=((ae&65280)>>8|(ae&255)<<8)>>1}var Me=(function(e,t,n){for(var r=e.length,a=0,i=new ye(t);a<r;++a)e[a]&&++i[e[a]-1];var o=new ye(t);for(a=1;a<t;++a)o[a]=o[a-1]+i[a-1]<<1;var c;if(n){c=new ye(1<<t);var d=15-t;for(a=0;a<r;++a)if(e[a])for(var f=a<<4|e[a],k=t-e[a],m=o[e[a]-1]++<<k,g=m|(1<<k)-1;m<=g;++m)c[kt[m]>>d]=f}else for(c=new ye(r),a=0;a<r;++a)e[a]&&(c[a]=kt[o[e[a]-1]++]>>15-e[a]);return c}),Ue=new U(288);for(var E=0;E<144;++E)Ue[E]=8;for(var E=144;E<256;++E)Ue[E]=9;for(var E=256;E<280;++E)Ue[E]=7;for(var E=280;E<288;++E)Ue[E]=8;var Pn=new U(32);for(var E=0;E<32;++E)Pn[E]=5;var gs=Me(Ue,9,1),ys=Me(Pn,5,1),ut=function(e){for(var t=e[0],n=1;n<e.length;++n)e[n]>t&&(t=e[n]);return t},z=function(e,t,n){var r=t/8|0;return(e[r]|e[r+1]<<8)>>(t&7)&n},pt=function(e,t){var n=t/8|0;return(e[n]|e[n+1]<<8|e[n+2]<<16)>>(t&7)},ws=function(e){return(e+7)/8|0},xt=function(e,t,n){return(t==null||t<0)&&(t=0),(n==null||n>e.length)&&(n=e.length),new U(e.subarray(t,n))},vs=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],N=function(e,t,n){var r=new Error(t||vs[e]);if(r.code=e,Error.captureStackTrace&&Error.captureStackTrace(r,N),!n)throw r;return r},ks=function(e,t,n,r){var a=e.length,i=r?r.length:0;if(!a||t.f&&!t.l)return n||new U(0);var o=!n,c=o||t.i!=2,d=t.i;o&&(n=new U(a*3));var f=function(re){var je=n.length;if(re>je){var C=new U(Math.max(je*2,re));C.set(n),n=C}},k=t.f||0,m=t.p||0,g=t.b||0,y=t.l,L=t.d,T=t.m,A=t.n,b=a*8;do{if(!y){k=z(e,m,1);var B=z(e,m+1,3);if(m+=3,B)if(B==1)y=gs,L=ys,T=9,A=5;else if(B==2){var V=z(e,m,31)+257,Y=z(e,m+10,15)+4,oe=V+z(e,m+5,31)+1;m+=14;for(var J=new U(oe),te=new U(19),M=0;M<Y;++M)te[ps[M]]=z(e,m+M*3,7);m+=Y*3;for(var Z=ut(te),Fe=(1<<Z)-1,u=Me(te,Z,1),M=0;M<oe;){var $e=u[z(e,m,Fe)];m+=$e&15;var x=$e>>4;if(x<16)J[M++]=x;else{var ne=0,pe=0;for(x==16?(pe=3+z(e,m,3),m+=2,ne=J[M-1]):x==17?(pe=3+z(e,m,7),m+=3):x==18&&(pe=11+z(e,m,127),m+=7);pe--;)J[M++]=ne}}var Q=J.subarray(0,V),W=J.subarray(V);T=ut(Q),A=ut(W),y=Me(Q,T,1),L=Me(W,A,1)}else N(1);else{var x=ws(m)+4,F=e[x-4]|e[x-3]<<8,I=x+F;if(I>a){d&&N(0);break}c&&f(g+F),n.set(e.subarray(x,I),g),t.b=g+=F,t.p=m=I*8,t.f=k;continue}if(m>b){d&&N(0);break}}c&&f(g+131072);for(var He=(1<<T)-1,Qe=(1<<A)-1,v=m;;v=m){var ne=y[pt(e,m)&He],G=ne>>4;if(m+=ne&15,m>b){d&&N(0);break}if(ne||N(2),G<256)n[g++]=G;else if(G==256){v=m,y=null;break}else{var De=G-254;if(G>264){var M=G-257,K=xn[M];De=z(e,m,(1<<K)-1)+Rn[M],m+=K}var Ee=L[pt(e,m)&Qe],me=Ee>>4;Ee||N(3),m+=Ee&15;var W=hs[me];if(me>3){var K=Ln[me];W+=pt(e,m)&(1<<K)-1,m+=K}if(m>b){d&&N(0);break}c&&f(g+131072);var fe=g+De;if(g<W){var xe=i-W,et=Math.min(W,fe);for(xe+g<0&&N(3);g<et;++g)n[g]=r[xe+g]}for(;g<fe;++g)n[g]=n[g-W]}}t.l=y,t.p=v,t.b=g,t.f=k,y&&(k=1,t.m=T,t.d=L,t.n=A)}while(!k);return g!=n.length&&o?xt(n,0,g):n.subarray(0,g)},bs=new U(0),_=function(e,t){return e[t]|e[t+1]<<8},q=function(e,t){return(e[t]|e[t+1]<<8|e[t+2]<<16|e[t+3]<<24)>>>0},mt=function(e,t){return q(e,t)+q(e,t+4)*4294967296};function Ss(e,t){return ks(e,{i:2},t&&t.out,t&&t.dictionary)}var bt=typeof TextDecoder<"u"&&new TextDecoder,$s=0;try{bt.decode(bs,{stream:!0}),$s=1}catch{}var Ds=function(e){for(var t="",n=0;;){var r=e[n++],a=(r>127)+(r>223)+(r>239);if(n+a>e.length)return{s:t,r:xt(e,n-1)};a?a==3?(r=((r&15)<<18|(e[n++]&63)<<12|(e[n++]&63)<<6|e[n++]&63)-65536,t+=String.fromCharCode(55296|r>>10,56320|r&1023)):a&1?t+=String.fromCharCode((r&31)<<6|e[n++]&63):t+=String.fromCharCode((r&15)<<12|(e[n++]&63)<<6|e[n++]&63):t+=String.fromCharCode(r)}};function Cn(e,t){if(t){for(var n="",r=0;r<e.length;r+=16384)n+=String.fromCharCode.apply(null,e.subarray(r,r+16384));return n}else{if(bt)return bt.decode(e);var a=Ds(e),i=a.s,n=a.r;return n.length&&N(8),i}}var Es=function(e,t){return t+30+_(e,t+26)+_(e,t+28)},xs=function(e,t,n){var r=_(e,t+28),a=_(e,t+30),i=Cn(e.subarray(t+46,t+46+r),!(_(e,t+8)&2048)),o=t+46+r,c=Ls(e,o,a,n,q(e,t+20),q(e,t+24),q(e,t+42)),d=c[0],f=c[1],k=c[2];return[_(e,t+10),d,f,i,o+a+_(e,t+32),k]},Ls=function(e,t,n,r,a,i,o){var c=a==4294967295,d=i==4294967295,f=o==4294967295,k=t+n,m=c+d+f;if(r&&m){for(;t+4<k;t+=4+_(e,t+2))if(_(e,t)==1)return[c?mt(e,t+4+8*d):a,d?mt(e,t+4):i,f?mt(e,t+4+8*(d+c)):o,1];r<2&&N(13)}return[a,i,o,0]};function Ts(e,t){for(var n={},r=e.length-22;q(e,r)!=101010256;--r)(!r||e.length-r>65558)&&N(13);var a=_(e,r+8);if(!a)return{};var i=q(e,r+16),o=q(e,r-20)==117853008;if(o){var c=q(e,r-12);o=q(e,c)==101075792,o&&(a=q(e,c+32),i=q(e,c+48))}for(var d=0;d<a;++d){var f=xs(e,i,o),k=f[0],m=f[1],g=f[2],y=f[3],L=f[4],T=f[5],A=Es(e,T);i=L,k?k==8?n[y]=Ss(e.subarray(A,A+m),{out:new U(g)}):N(14,"unknown compression type "+k):n[y]=xt(e,A,A+m)}return n}const As="deckx.deck.v1";async function Rs(e){const t=new URL(e,window.location.href).toString(),n=await fetch(t);if(!n.ok)throw new Error(`DeckX package fetch failed (${n.status} ${n.statusText}).`);return Mn(new Uint8Array(await n.arrayBuffer()),t)}function Mn(e,t="inline.deckx"){const n=zs(Ts(e));return Ps(n,t)}function Ps(e,t){const n=Vs(e);if(!n)throw new Error("DeckX package is missing manifest.json.");const r=Bs(Ve(e,n),n),a=St(n),i=[],o=g=>!!e[g],c=g=>{const y=e[g];if(!y)throw new Error(`DeckX asset is missing: ${g}`);const L=y.buffer.slice(y.byteOffset,y.byteOffset+y.byteLength),T=URL.createObjectURL(new Blob([L],{type:Ys(g)}));return i.push(T),T},d=r.theme?.css?In(Ve(e,de(a,r.theme.css)),St(de(a,r.theme.css)),o,c):"",f=Ms(r.metadata,a,e,c),k=Cs(r.metadata);return{deck:{id:r.id,title:r.title,aspectRatio:r.aspectRatio,durationSec:r.durationSec,theme:{name:"DeckX Package",className:`deckx-package-${_s(r.id)}`},metadata:Is(r.metadata,a,c),slides:r.slides.map(g=>Os(g,e,a,o,c))},cssText:d,runtimeScripts:f,runtimeGlobal:k,sourceUrl:t,dispose:()=>{i.forEach(g=>URL.revokeObjectURL(g))}}}function Cs(e){const t=e?.custom?.runtimeGlobal;if(t!==void 0){if(typeof t!="string"||t.trim().length===0)throw new Error("DeckX metadata.custom.runtimeGlobal must be a non-empty string.");return t}}function Ms(e,t,n,r){const a=e?.custom?.runtime;if(a===void 0)return[];if(!Array.isArray(a))throw new Error("DeckX metadata.custom.runtime must be an array of package-local JS paths.");return a.map((i,o)=>{if(!ue(i))throw new Error(`DeckX metadata.custom.runtime[${o}] must be a non-empty string.`);if(_e(i)||Tt(i))throw new Error(`Trusted DeckX runtime must be package-local: ${i}`);const c=de(t,i);if(!c.toLowerCase().endsWith(".js"))throw new Error(`Trusted DeckX runtime must be a JavaScript file: ${c}`);if(!n[c])throw new Error(`Trusted DeckX runtime is missing: ${c}`);return{path:c,url:r(c)}})}function Is(e,t,n){if(e)return{version:e.version,description:e.description,authors:e.authors?.map(r=>({...r})),tags:e.tags?[...e.tags]:void 0,language:e.language,license:e.license,homepage:e.homepage,repository:e.repository,thumbnail:e.thumbnail?n(de(t,e.thumbnail)):void 0,createdAt:e.createdAt,updatedAt:e.updatedAt,generator:e.generator?{...e.generator}:void 0,custom:e.custom?{...e.custom}:void 0}}function Os(e,t,n,r,a){const i=de(n,e.source),o=e.notes?de(n,e.notes):null,c=Ns(Ve(t,i),St(i),r,a);return{id:e.id,title:e.title,notes:o&&t[o]?Ve(t,o):void 0,footer:e.footer,className:e.className,timingSec:e.timingSec,render:()=>c}}function Ns(e,t,n,r){if(/<\/?(html|head|body)\b/i.test(e))throw new Error("DeckX slide HTML must be a fragment, not a full document.");const a=document.createElement("template");if(a.innerHTML=e,a.content.querySelector("script"))throw new Error("Safe DeckX slides cannot include <script>.");return a.content.querySelectorAll("*").forEach(i=>{Array.from(i.attributes).forEach(o=>{const c=o.name.toLowerCase(),d=o.value;if(c.startsWith("on"))throw new Error("Safe DeckX slides cannot include inline event handlers.");if(c==="style"){i.setAttribute(c,In(d,t,n,r));return}if(c==="src"||c==="poster"||Us(i,c,d)){i.setAttribute(c,Lt(d,t,n,r));return}c==="srcset"&&i.setAttribute(c,Xs(d,t,n,r))})}),a.innerHTML}function Us(e,t,n){return!(t!=="href"&&t!=="xlink:href"||e.tagName.toLowerCase()==="a"&&_e(n))}function Xs(e,t,n,r){return e.split(",").map(a=>{const i=a.trim().split(/\s+/);return i[0]?(i[0]=Lt(i[0],t,n,r),i.join(" ")):""}).filter(Boolean).join(", ")}function In(e,t,n,r){return e.replace(/url\(\s*(['"]?)([^'")]+)\1\s*\)/gi,(a,i,o)=>{if(Tt(o))return`url("${o}")`;if(_e(o))throw new Error(`Safe DeckX CSS cannot reference external assets: ${o}`);return`url("${Lt(o,t,n,r)}")`})}function Lt(e,t,n,r){if(Tt(e))return e;if(_e(e))throw new Error(`Safe DeckX slides cannot reference external assets: ${e}`);const{referencePath:a,suffix:i}=Fs(e),o=Hs(t,a,n);return`${r(o)}${i}`}function Fs(e){const t=e.indexOf("#");return t===-1?{referencePath:e.split("?")[0],suffix:""}:{referencePath:e.slice(0,t).split("?")[0],suffix:e.slice(t)}}function Hs(e,t,n){const r=js(e,t),a=r.find(i=>n(i));if(a)return a;throw new Error(`DeckX package asset is missing: ${r.join(" or ")}`)}function js(e,t){if(t.startsWith("/"))return[Ie(t.slice(1))];const n=[de(e,t)],r=qs(t);return r&&r!==n[0]&&n.push(r),n}function qs(e){try{return Ie(e)}catch{return null}}function Bs(e,t){const n=JSON.parse(e);if(!ce(n))throw new Error(`${t} must contain a JSON object.`);if(n.schemaVersion!==As)throw new Error(`Unsupported DeckX schemaVersion: ${String(n.schemaVersion)}`);if(!ue(n.id))throw new Error("DeckX manifest is missing id.");if(!ue(n.title))throw new Error("DeckX manifest is missing title.");if(!Gs(n.aspectRatio))throw new Error("DeckX manifest has invalid aspectRatio.");if(!Array.isArray(n.slides)||n.slides.length===0)throw new Error("DeckX manifest must include at least one slide.");return n.metadata!==void 0&&Ws(n.metadata),n.slides.forEach((r,a)=>Ks(r,a)),n}function Ws(e){if(!ce(e))throw new Error("DeckX manifest metadata must be an object.");const t=e;if(["version","description","language","license","homepage","repository","thumbnail","createdAt","updatedAt"].forEach(n=>{if(t[n]!==void 0&&typeof t[n]!="string")throw new Error(`DeckX metadata.${n} must be a string.`)}),t.tags!==void 0&&(!Array.isArray(t.tags)||!t.tags.every(n=>typeof n=="string")))throw new Error("DeckX metadata.tags must be an array of strings.");if(t.authors!==void 0){if(!Array.isArray(t.authors))throw new Error("DeckX metadata.authors must be an array.");t.authors.forEach((n,r)=>{if(!ce(n)||!ue(n.name))throw new Error(`DeckX metadata.authors[${r}] must include name.`)})}if(t.generator!==void 0&&(!ce(t.generator)||!ue(t.generator.name)))throw new Error("DeckX metadata.generator must include name.");if(t.custom!==void 0&&!ce(t.custom))throw new Error("DeckX metadata.custom must be an object.")}function Ks(e,t){if(!ce(e))throw new Error(`DeckX slide ${t+1} must be an object.`);if(!ue(e.id))throw new Error(`DeckX slide ${t+1} is missing id.`);if(!ue(e.source))throw new Error(`DeckX slide ${t+1} is missing source.`)}function zs(e){const t={};return Object.entries(e).forEach(([n,r])=>{n.endsWith("/")||(t[Ie(n)]=r)}),t}function Vs(e){if(e["manifest.json"])return"manifest.json";const t=Object.keys(e).filter(n=>n.endsWith("/manifest.json"));return t.length===1?t[0]:null}function Ve(e,t){const n=e[t];if(!n)throw new Error(`DeckX package entry is missing: ${t}`);return Cn(n)}function de(e,t){return t.startsWith("/")?Ie(t.slice(1)):Ie([e,t].filter(Boolean).join("/"))}function Ie(e){const t=e.replaceAll("\\","/");if(!t||t.startsWith("/")||t.includes("\0"))throw new Error(`Invalid DeckX package path: ${e}`);const n=[];if(t.split("/").forEach(r=>{if(!(!r||r===".")){if(r===".."){if(n.length===0)throw new Error(`DeckX package path escapes root: ${e}`);n.pop();return}n.push(r)}}),n.length===0)throw new Error(`Invalid DeckX package path: ${e}`);return n.join("/")}function St(e){const t=e.lastIndexOf("/");return t===-1?"":e.slice(0,t)}function ce(e){return typeof e=="object"&&e!==null}function ue(e){return typeof e=="string"&&e.trim().length>0}function Gs(e){return e==="16:9"||e==="4:3"?!0:ce(e)&&typeof e.width=="number"&&typeof e.height=="number"&&Number.isFinite(e.width)&&Number.isFinite(e.height)&&e.width>0&&e.height>0}function Tt(e){return e.startsWith("#")||e.startsWith("data:")||e.startsWith("blob:")||e.startsWith("mailto:")||e.startsWith("tel:")}function _e(e){return/^[a-z][a-z0-9+.-]*:/i.test(e)||e.startsWith("//")}function _s(e){return e.toLowerCase().replace(/[^a-z0-9-]+/g,"-").replace(/^-+|-+$/g,"")||"deck"}function Ys(e){const t=e.toLowerCase();return t.endsWith(".svg")?"image/svg+xml":t.endsWith(".png")?"image/png":t.endsWith(".jpg")||t.endsWith(".jpeg")?"image/jpeg":t.endsWith(".gif")?"image/gif":t.endsWith(".webp")?"image/webp":t.endsWith(".css")?"text/css":t.endsWith(".html")?"text/html":t.endsWith(".js")?"text/javascript":t.endsWith(".md")?"text/markdown":"application/octet-stream"}const Js={en:{lang:"en",navLabel:"Landing sections",nav:[{href:"#start",label:"Start"},{href:"#ai-native",label:"AI Native"},{href:"#deckx",label:"DeckX"},{href:"#concepts",label:"Basics"},{href:"#samples",label:"Samples"}],languageHref:"/ko/",languageLabel:"한국어",playerCta:"Open Player",hero:{badge:"AI-NATIVE HTML DECKS",title:"Present AI-generated HTML without converting it to PowerPoint",body:"Dynamic content loses its value when it is rebuilt as static slides. DeckX Player keeps HTML authored by LLMs and agents in a .deckx package, then opens it from a URL or local zip with presenter view and slideshow view.",points:["Use HTML as-is","Motion-first presenting","Agent-native authoring"],primary:"Open Player",secondary:"Watch a moving sample"},preview:{openTitle:"Open DeckX",recent:"Recent DeckX",samples:"Official Samples",uploads:"Uploads",present:"Start presenting",motion:"Motion control"},open:{label:"Open a DeckX URL",button:"Open"},starter:{eyebrow:"GET STARTED",title:"Start from a copyable DeckX starter project",lead:"deckx-project/deckx-starter-basic is the public starter repository for creating a first DeckX deck. It gives humans and agents the same source-folder contract with README, AGENTS.md, validation, and packaging scripts.",repoButton:"View public repo",steps:[{title:"Clone",code:"git clone https://github.com/deckx-project/deckx-starter-basic.git"},{title:"Edit",code:"deck/manifest.json, deck/slides, deck/notes, deck/styles"},{title:"Validate",code:"npm run validate"},{title:"Pack",code:"npm run pack"}]},why:{eyebrow:"WHY NOW",title:"In the AI era, HTML is a better presentation source than PPT",lead:"Claude Artifacts, coding agents, and HTML prototypes have already changed how content is produced. The remaining friction is packaging, validating, and reopening that HTML every time it needs to be presented.",cards:[{title:"No PPT conversion",body:"Keep the original HTML/CSS output from LLMs instead of flattening it into screenshots or rebuilt slide objects."},{title:"Motion-first",body:"Let the presenter control CSS animation, transitions, data flow, and staged reveals with Full, Reduced, and Paused modes."},{title:"Agent-native",body:"Expose DeckX authoring rules and validation scripts so LLM agents can create a deck and check it directly in the player."}]},format:{eyebrow:"DeckX FORMAT",title:"DeckX turns HTML presentations into exchangeable files",lead:"DeckX is a new package format. It bundles HTML slides, speaker notes, styles, image assets, and metadata into one zip-based .deckx file that the player opens with the same runtime contract.",cards:[{title:"File boundary",body:"Bundle manifest.json, slides, notes, styles, and assets into a single .deckx zip package."},{title:"URL input",body:"The player reads ?deck=<url> and loads any DeckX deck into the same runtime."},{title:"Safe default",body:"A normal DeckX package is a script-free Safe Deck, and speaker notes stay out of the slideshow view."},{title:"Verifiable",body:"Schema, asset paths, notes coverage, and visual overflow can be checked before a deck is presented."}]},flow:{eyebrow:"PLAYER FLOW",title:"The player absorbs the repetitive packaging work",lead:"Using HTML as a presentation file usually means coordinating zip files, URLs, first-slide checks, presenter view, audience view, and motion settings. DeckX Player folds those steps into one opening flow.",cards:[{title:"Before opening",body:"Choose a DeckX URL, local zip, recent deck, or official sample."},{title:"After opening",body:"Start from a first-slide preview and a clear presentation launch action."},{title:"When details matter",body:"Validation, notes, and session metadata stay available without dominating the first screen."}]},concepts:{eyebrow:"DeckX BASICS",title:"Four questions that define DeckX",lead:"DeckX is a new format, so the words need to be clear first. Presenters do not need a new editor; they need to understand how HTML presentations can be opened and operated like files.",answers:[{title:"What is DeckX?",body:"DeckX is the name of the format and runtime for packaging HTML-based presentations as exchangeable presentation files."},{title:"What is DeckX Player?",body:"DeckX Player is a browser-based runtime that opens .deckx HTML presentation packages with preview, presenter view, slideshow view, speaker notes, and motion controls."},{title:"What is a DeckX package?",body:"A DeckX package is a zip-based .deckx file containing manifest.json, HTML slides, Markdown speaker notes, styles, and assets."},{title:"Why is it useful?",body:"You can present HTML motion and layout directly, without rebuilding it in PPT, while sharing notes and assets as one file or URL."}],benefits:[{title:"Keep HTML expression",body:"Preserve CSS motion, data flow, and interactive layout instead of flattening them into images."},{title:"Presentation operations included",body:"Preview, presenter view, slideshow view, notes, timer, and motion controls are handled by the player."},{title:"Shareable file",body:"Send a .deckx zip or URL and reopen it in the same runtime."}]},motion:{eyebrow:"MOTION",title:"Full, Reduced, Paused",cards:[{title:"Full",body:"Run deck CSS animation and transitions as authored."},{title:"Reduced",body:"Shorten motion for accessibility needs or presentation-room constraints."},{title:"Paused",body:"Pause CSS animation for review, explanation, or controlled moments during a talk."}]},samples:{eyebrow:"OFFICIAL SAMPLES",title:"Open moving DeckX examples immediately",lead:"Official samples stay separate from user history and are grouped by deck content language. Compare authoring patterns, developer samples, motion decks, 4:3 canvases, image-heavy decks, and long-deck navigation in the same runtime.",openLabel:"Open in Player",groups:{en:"English samples",ko:"Korean samples"}},strategy:{eyebrow:"NEXT STRATEGY",title:"Make DeckX easy for search engines and AI agents to read first",cards:[{title:"English as the default",body:"Use English as the canonical discovery surface for global search and AI answer engines, while keeping a Korean version for local users."},{title:"llms.txt review",body:"Publish DeckX definitions, package specs, authoring guides, and sample URLs in a concise structure that LLMs can read quickly."},{title:"MCP and skills review",body:"Validate whether DeckX authoring skills, validation scripts, and sample generation should become an agent-native creation workflow."},{title:"Search and AI answer evidence",body:"Align static HTML, canonical links, hreflang, sitemap, robots.txt, JSON-LD, and public Markdown docs so crawlers and AI answer engines read the same facts."},{title:"Team features later",body:"SSO, upload, team history, and team libraries are not implemented features today. Treat them only as future product candidates."}]}},ko:{lang:"ko",navLabel:"랜딩 섹션",nav:[{href:"#start",label:"시작하기"},{href:"#ai-native",label:"AI Native"},{href:"#deckx",label:"DeckX"},{href:"#concepts",label:"개념"},{href:"#samples",label:"샘플"}],languageHref:"/",languageLabel:"English",playerCta:"플레이어 열기",hero:{badge:"AI-NATIVE HTML DECKS",title:"AI가 만든 HTML을 PPT로 바꾸지 않고 그대로 발표하세요",body:"동적인 콘텐츠는 PPT로 다시 옮기는 순간 표현력이 줄어듭니다. DeckX Player는 LLM과 agent가 만든 HTML 발표를 .deckx 패키지로 고정하고, URL이나 로컬 zip에서 열어 발표자뷰와 슬라이드쇼로 바로 실행합니다.",points:["HTML 그대로 사용","모션 중심 발표","Agent-native authoring"],primary:"플레이어 열기",secondary:"움직이는 샘플 보기"},preview:{openTitle:"DeckX 열기",recent:"Recent DeckX",samples:"Official Samples",uploads:"Uploads",present:"발표 시작",motion:"모션 제어"},open:{label:"DeckX URL 빠르게 열기",button:"열기"},starter:{eyebrow:"GET STARTED",title:"복사해서 바로 시작하는 DeckX 스타터 프로젝트",lead:"deckx-project/deckx-starter-basic은 첫 DeckX를 만들기 위한 public starter repo입니다. README, AGENTS.md, 검증/패키징 스크립트를 함께 제공해 사람과 agent가 같은 source-folder 계약으로 수정할 수 있습니다.",repoButton:"Public repo 보기",steps:[{title:"Clone",code:"git clone https://github.com/deckx-project/deckx-starter-basic.git"},{title:"Edit",code:"deck/manifest.json, deck/slides, deck/notes, deck/styles"},{title:"Validate",code:"npm run validate"},{title:"Pack",code:"npm run pack"}]},why:{eyebrow:"WHY NOW",title:"AI 시대에는 PPT보다 HTML이 자연스럽습니다",lead:"Claude Artifacts, coding agent, HTML prototype 흐름이 이미 콘텐츠 제작 방식을 바꾸고 있습니다. 문제는 만든 HTML을 매번 발표용으로 묶고, 검증하고, 다시 여는 일이 귀찮다는 점입니다.",cards:[{title:"PPT 변환 없이",body:"LLM이 만든 HTML/CSS 결과물을 이미지나 슬라이드 캡처로 죽이지 않고 원본 표현 그대로 발표합니다."},{title:"모션 중심",body:"CSS animation, transition, 데이터 흐름, 단계적 reveal을 발표자가 Full, Reduced, Paused로 제어합니다."},{title:"Agent-native",body:"DeckX 작성 규칙과 검증 스크립트를 skill로 제공해 LLM agent가 덱을 만들고 바로 플레이어에서 확인하게 합니다."}]},format:{eyebrow:"DeckX FORMAT",title:"DeckX는 HTML 발표를 교환 가능한 파일로 만드는 포맷입니다",lead:"DeckX는 새 파일 포맷입니다. HTML 슬라이드, 발표자 노트, 스타일, 이미지 자산, 메타데이터를 하나의 .deckx zip으로 묶고 플레이어가 동일한 런타임 계약으로 엽니다.",cards:[{title:"파일 경계",body:"manifest.json, slides, notes, styles, assets를 하나의 .deckx zip으로 묶습니다."},{title:"URL 입력",body:"플레이어는 ?deck=<url>을 읽고 같은 런타임에 어떤 DeckX 덱이든 로드합니다."},{title:"안전한 기본값",body:"일반 DeckX는 script 없는 Safe Deck이며 발표자 노트는 슬라이드쇼에서 제외됩니다."},{title:"검증 가능",body:"schema, asset path, notes coverage, overflow를 검사해 발표 파일을 재현 가능한 단위로 다룹니다."}]},flow:{eyebrow:"PLAYER FLOW",title:"패키징 반복을 플레이어가 흡수합니다",lead:"HTML을 발표 파일처럼 쓰려면 zip, URL, 첫 화면 확인, 발표자뷰, 관객 화면, 모션 옵션을 매번 맞춰야 합니다. DeckX Player는 이 반복 작업을 하나의 열기 흐름으로 묶습니다.",cards:[{title:"열기 전",body:"DeckX URL, 로컬 zip, 최근 DeckX, 공식 샘플 중 하나를 선택합니다."},{title:"열었을 때",body:"첫 슬라이드 미리보기와 발표 시작 버튼을 중심으로 표시합니다."},{title:"상세 정보",body:"validation, notes, session 같은 DeckX 메타는 필요할 때만 펼쳐봅니다."}]},concepts:{eyebrow:"DeckX BASICS",title:"DeckX를 이해하는 네 가지 질문",lead:"DeckX는 처음 보는 포맷이므로 먼저 용어가 분명해야 합니다. 발표자는 새 편집기를 배우는 것이 아니라, HTML 발표를 파일처럼 열고 운영하는 방식을 이해하면 됩니다.",answers:[{title:"DeckX란?",body:"DeckX는 HTML 기반 발표를 교환 가능한 패키지로 만들고, 같은 플레이어에서 재생하기 위한 포맷과 런타임의 이름입니다."},{title:"DeckX Player란?",body:"DeckX Player는 .deckx HTML presentation package를 열어 미리보기, 발표자뷰, 슬라이드쇼, 발표자 노트, 모션 제어를 제공하는 웹 기반 발표 런타임입니다."},{title:"DeckX package란?",body:"DeckX package는 manifest.json, HTML slides, Markdown speaker notes, styles, assets를 하나로 묶은 zip 기반 .deckx 발표 파일입니다."},{title:"뭐가 좋은가요?",body:"PPT로 다시 옮기지 않아도 HTML의 모션과 레이아웃을 그대로 발표할 수 있고, 발표자 노트와 자산까지 하나의 파일 또는 URL로 공유할 수 있습니다."}],benefits:[{title:"HTML 표현력 유지",body:"CSS motion, 데이터 흐름, 인터랙티브한 레이아웃을 이미지 캡처로 죽이지 않고 발표합니다."},{title:"발표 운영 내장",body:"미리보기, 발표자뷰, 슬라이드쇼, 노트, 타이머, 모션 제어를 플레이어가 담당합니다."},{title:"공유 가능한 파일",body:".deckx zip이나 URL로 전달해 같은 런타임에서 다시 열고 발표할 수 있습니다."}]},motion:{eyebrow:"MOTION",title:"Full, Reduced, Paused",cards:[{title:"Full",body:"덱 CSS animation과 transition을 그대로 재생합니다."},{title:"Reduced",body:"모션을 거의 즉시 끝나게 줄여 발표장 환경이나 접근성 요구에 맞춥니다."},{title:"Paused",body:"모든 CSS animation을 일시정지합니다. 모션 데모 검토나 발표 중 정지에 유용합니다."}]},samples:{eyebrow:"OFFICIAL SAMPLES",title:"움직이는 DeckX를 바로 열어볼 수 있습니다",lead:"공식 샘플은 사용자 히스토리와 분리되며 Deck 본문 언어 기준으로 나눕니다. 작성 패턴, 개발자 샘플, 모션, 4:3 캔버스, 이미지 자산, 롱덱 탐색을 같은 런타임에서 비교할 수 있습니다.",openLabel:"플레이어에서 열기",groups:{en:"영문 샘플",ko:"한국어 샘플"}},strategy:{eyebrow:"NEXT STRATEGY",title:"먼저 검색 엔진과 AI agent가 읽기 쉬운 경로를 만듭니다",cards:[{title:"영어를 기본값으로",body:"글로벌 검색과 AI answer engine 유입을 위해 canonical discovery surface는 영어로 두고, 한국어 버전은 지역 사용자와 설명 보강용으로 함께 제공합니다."},{title:"llms.txt 검토",body:"DeckX 정의, package spec, 작성 가이드, 샘플 URL을 LLM이 빠르게 읽도록 공개 문서 구조를 정리합니다."},{title:"MCP와 skill 검토",body:"DeckX authoring skill, validation script, 샘플 생성 흐름을 agent-native 제작 경험으로 제공할지 먼저 검증합니다."},{title:"검색과 AI 답변 근거",body:"정적 HTML, canonical, hreflang, sitemap, robots.txt, JSON-LD, 공개 Markdown 문서로 검색 엔진과 AI answer engine이 같은 사실을 읽게 합니다."},{title:"팀 기능은 이후",body:"SSO, 업로드, 팀 이력은 아직 구현된 기능이 아니며, 제품화 이후 확장 후보로만 다룹니다."}]}}};function Zs(e,t){const n=Js[t.locale];e.innerHTML=`
    <main class="project-landing" lang="${n.lang}">
      <header class="project-nav">
        <a class="project-mark" href="${h(t.homeHref)}">
          <img class="brand-icon" src="/brand/deckx-icon.svg" alt="" aria-hidden="true" />
          <span>DeckX Player</span>
        </a>
        <nav class="project-nav-links" aria-label="${h(n.navLabel)}">
          ${n.nav.map(a=>`<a href="${h(a.href)}">${h(a.label)}</a>`).join("")}
        </nav>
        <a class="btn compact" href="${h(n.languageHref)}">${h(n.languageLabel)}</a>
        <a class="btn compact" href="${h(t.playerHref)}">${h(n.playerCta)}</a>
      </header>

      <section class="project-hero">
        <div class="project-hero-copy">
          <span class="badge mono">${h(n.hero.badge)}</span>
          <h1>${h(n.hero.title)}</h1>
          <p>${X(n.hero.body)}</p>
          <div class="project-hero-points" aria-label="DeckX positioning">
            ${n.hero.points.map(a=>`<span>${h(a)}</span>`).join("")}
          </div>
          <div class="project-actions">
            <a class="btn primary" href="${h(t.playerHref)}">${h(n.hero.primary)}</a>
            <a class="btn" href="${h(t.defaultDemoHref)}">${h(n.hero.secondary)}</a>
          </div>
        </div>
        ${Qs(n)}
      </section>

      <section class="project-section project-open-section">
        <form class="project-open" data-project-deckx-form>
          <label for="project-deckx-url">${h(n.open.label)}</label>
          <div class="project-open-row">
            <input
              id="project-deckx-url"
              data-project-deckx-input
              type="text"
              inputmode="url"
              autocomplete="url"
              value="${h(t.deckxUrlValue)}"
              aria-label="DeckX URL"
            />
            <button class="btn primary" type="submit">${h(n.open.button)}</button>
          </div>
        </form>
      </section>

      ${ei(n,t)}
      ${ft("ai-native",n.why,"info-grid")}
      ${ti(n)}
      ${ft("",n.flow,"info-grid modes")}
      ${ni(n)}
      ${ft("",n.motion,"info-grid modes")}
      ${ri(n,t.demoOptions)}
      ${ai(n)}
    </main>
  `;const r=e.querySelector("[data-project-deckx-form]");r?.addEventListener("submit",a=>{a.preventDefault();const o=r.querySelector("[data-project-deckx-input]")?.value.trim();o&&t.onOpenDeckxUrl(o)})}function Qs(e){return`
    <div class="project-product-preview" aria-label="DeckX Player preview">
      <div class="preview-chrome">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div class="preview-layout">
        <aside>
          <strong>${h(e.preview.openTitle)}</strong>
          <span>${h(e.preview.recent)}</span>
          <span>${h(e.preview.samples)}</span>
          <span>${h(e.preview.uploads)}</span>
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
            <span>${h(e.preview.present)}</span>
            <span>${h(e.preview.motion)}</span>
          </div>
        </section>
      </div>
    </div>
  `}function ei(e,t){return`
    <section class="project-section project-start-section" id="start">
      <div class="section-heading">
        <p class="mono">${h(e.starter.eyebrow)}</p>
        <h2>${h(e.starter.title)}</h2>
        <span class="section-lead">${X(e.starter.lead)}</span>
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
            <a class="btn primary" href="${h(t.starterSourceHref)}">${h(e.starter.repoButton)}</a>
          </div>
        </div>
        <ol class="project-start-steps">
          ${e.starter.steps.map((n,r)=>`
            <li>
              <span>${r+1}</span>
              <strong>${h(n.title)}</strong>
              <code>${h(n.code)}</code>
            </li>
          `).join("")}
        </ol>
      </div>
    </section>
  `}function ft(e,t,n){return`
    <section class="project-section"${e?` id="${h(e)}"`:""}>
      <div class="section-heading">
        <p class="mono">${h(t.eyebrow)}</p>
        <h2>${h(t.title)}</h2>
        ${t.lead?`<span class="section-lead">${X(t.lead)}</span>`:""}
      </div>
      <div class="${h(n)}">
        ${t.cards.map(r=>`
          <article>
            <strong>${X(r.title)}</strong>
            <span>${X(r.body)}</span>
          </article>
        `).join("")}
      </div>
    </section>
  `}function ti(e){return`
    <section class="project-section" id="deckx">
      <div class="section-heading">
        <p class="mono">${h(e.format.eyebrow)}</p>
        <h2>${h(e.format.title)}</h2>
        <span class="section-lead">${X(e.format.lead)}</span>
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
              <strong>${h(t.title)}</strong>
              <span>${X(t.body)}</span>
            </article>
          `).join("")}
        </div>
      </div>
    </section>
  `}function ni(e){return`
    <section class="project-section" id="concepts">
      <div class="section-heading">
        <p class="mono">${h(e.concepts.eyebrow)}</p>
        <h2>${h(e.concepts.title)}</h2>
        <span class="section-lead">${X(e.concepts.lead)}</span>
      </div>
      ${e.concepts.answers.map(t=>`
        <div class="project-answer-block">
          <strong>${h(t.title)}</strong>
          <span>${X(t.body)}</span>
        </div>
      `).join("")}
      <div class="info-grid modes">
        ${e.concepts.benefits.map(t=>`
          <article>
            <strong>${h(t.title)}</strong>
            <span>${X(t.body)}</span>
          </article>
        `).join("")}
      </div>
    </section>
  `}function ri(e,t){const n=["en","ko"];return`
    <section class="project-section" id="samples">
      <div class="section-heading">
        <p class="mono">${h(e.samples.eyebrow)}</p>
        <h2>${h(e.samples.title)}</h2>
        <span class="section-lead">${X(e.samples.lead)}</span>
      </div>
      <div class="project-demo-groups">
        ${n.map(r=>{const a=t.filter(i=>i.language===r);return a.length===0?"":`
              <section class="project-demo-group" aria-label="${h(e.samples.groups[r])}">
                <h3 class="project-demo-group-title">${h(e.samples.groups[r])}</h3>
                <div class="project-demo-grid">
                  ${a.map(i=>si(i,e.samples.openLabel)).join("")}
                </div>
              </section>
            `}).join("")}
      </div>
    </section>
  `}function ai(e){return`
    <section class="project-section" id="workspace">
      <div class="section-heading">
        <p class="mono">${h(e.strategy.eyebrow)}</p>
        <h2>${h(e.strategy.title)}</h2>
      </div>
      <div class="info-grid modes">
        ${e.strategy.cards.map(t=>`
          <article>
            <strong>${X(t.title)}</strong>
            <span>${X(t.body)}</span>
          </article>
        `).join("")}
      </div>
    </section>
  `}function si(e,t){return`
    <article class="project-demo-card">
      <div>
        <span class="project-demo-language mono">${h(e.language.toUpperCase())}</span>
        <h3>${h(e.label)}</h3>
        <p>${h(e.description)}</p>
        <span>${h(e.detail)}</span>
      </div>
      <code>${h(e.url)}</code>
      <a class="btn compact" href="${h(e.href)}">${h(t)}</a>
    </article>
  `}function X(e){return h(e).replaceAll(".deckx","<code>.deckx</code>").replaceAll("manifest.json","<code>manifest.json</code>").replaceAll("?deck=&lt;url&gt;","<code>?deck=&lt;url&gt;</code>").replaceAll("llms.txt","<code>llms.txt</code>").replaceAll("robots.txt","<code>robots.txt</code>").replaceAll("sitemap","<code>sitemap</code>").replaceAll("JSON-LD","<code>JSON-LD</code>").replaceAll("hreflang","<code>hreflang</code>")}function h(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}const On=document.getElementById("app");if(!On)throw new Error("Missing #app mount element");const Xe=On,Nn="deckx-package-style",Un="deckx-player:history:v1",ii=8,oi="https://github.com/deckx-project/deckx-starter-basic",Ye=[{id:"starter",messageKey:"starter",url:"/decks/starter-basic.deckx",language:"ko"},{id:"patterns",messageKey:"patternLibrary",url:"/decks/pattern-library.deckx",language:"en"},{id:"sample-en",messageKey:"sampleEn",url:"/decks/sample-en.deckx",language:"en"},{id:"sample-ko",messageKey:"sampleKo",url:"/decks/sample-ko.deckx",language:"ko"},{id:"template-ko",messageKey:"templateKo",url:"/decks/template-ko.deckx",language:"ko"},{id:"dogfood",messageKey:"dogfood",url:"/decks/deckx-player-demo.deckx",language:"ko"},{id:"static",messageKey:"static",url:"/decks/static-demo.deckx",language:"ko"},{id:"motion",messageKey:"motion",url:"/decks/motion-demo.deckx",language:"ko"},{id:"classic",messageKey:"classic",url:"/decks/classic-4x3-demo.deckx",language:"ko"},{id:"image-heavy",messageKey:"imageHeavy",url:"/decks/image-heavy-demo.deckx",language:"ko"},{id:"long-120",messageKey:"long120",url:"/decks/long-120-demo.deckx",language:"ko"},{id:"long-image",messageKey:"longImage",url:"/decks/long-image-demo.deckx",language:"ko"}],ht={en:{starter:{label:"DeckX Starter",description:"A copyable starter deck packaged from deckx-project/deckx-starter-basic",detail:"A minimal DeckX package generated from the public starter source folder."},patterns:{label:"Pattern library",description:"A pattern-first DeckX sample for safer LLM-authored slides",detail:"Reference layouts for cover, section, one-message, evidence, comparison, timeline, chart, quote, and code."},"sample-en":{label:"English developer sample",description:"A natural technical DeckX written as an English developer talk",detail:"Shows package contracts, validation signals, code snippets, and Safe Deck boundaries."},"sample-ko":{label:"Korean developer sample",description:"A Korean technical DeckX sample focused on slide fundamentals",detail:"Uses pattern-first slides, presenter notes, local assets, and validation-ready structure."},"template-ko":{label:"Korean layout templates",description:"Reusable PPT-style DeckX layout presets for Korean talks",detail:"Includes title, content, section, comparison, image, timeline, chart, quote, and closing layouts."},dogfood:{label:"DeckX zip demo",description:"Loads public/decks/deckx-player-demo.deckx as a packaged presentation",detail:"A dogfooding deck that explains DeckX Player using the DeckX package format itself."},static:{label:"Static framework demo",description:"A DeckX sample explaining the Deck/Runtime boundary",detail:"Shows how text-heavy talks combine with the player basics."},motion:{label:"Motion graphics demo",description:"A CSS motion DeckX loaded into the same runtime",detail:"Compare Full, Reduced, and Paused motion modes with an animated deck."},classic:{label:"Classic 4:3 canvas demo",description:"A sample showing DeckX aspectRatio support",detail:"Confirms that non-16:9 DeckX canvases render consistently in presenter and slideshow views."},"image-heavy":{label:"Image-heavy demo",description:"An asset stress sample with 96 package-local images",detail:"Checks preview, overview, and object URL behavior for image-heavy decks."},"long-120":{label:"Release runbook long deck",description:"A 120-slide developer runbook for goto, search, and overview behavior",detail:"Exercises presenter thumbnails and navigation limits with natural release checkpoints."},"long-image":{label:"System snapshot image deck",description:"A long image sample with package-local system screenshots",detail:"Checks navigation, search, thumbnails, and asset handling across 120 image-backed slides."}},ko:{starter:{label:"DeckX 스타터",description:"deckx-project/deckx-starter-basic에서 패키징한 시작용 DeckX",detail:"public starter source folder에서 생성한 최소 DeckX package입니다."},patterns:{label:"패턴 라이브러리",description:"LLM 작성 슬라이드의 저점을 올리는 pattern-first DeckX 샘플",detail:"cover, section, one-message, evidence, comparison, timeline, chart, quote, code 패턴 레퍼런스입니다."},"sample-en":{label:"영문 개발자 샘플",description:"개발자 발표 흐름으로 만든 영문 DeckX 샘플",detail:"package contract, validation signal, code snippet, Safe Deck 경계를 보여줍니다."},"sample-ko":{label:"한국어 개발자 샘플",description:"슬라이드 본질에 집중한 한국어 DeckX 샘플",detail:"패턴 우선 슬라이드, 발표자 노트, 로컬 asset, 검증 가능한 구조를 보여줍니다."},"template-ko":{label:"한국어 기본 레이아웃 템플릿",description:"PPT 기본 장표 패턴을 DeckX로 옮긴 재사용 프리셋",detail:"title, content, section, comparison, image, timeline, chart, quote, closing 레이아웃을 포함합니다."},dogfood:{label:"DeckX zip 데모",description:"public/decks/deckx-player-demo.deckx 파일을 그대로 로드",detail:"이 프로젝트 자체를 DeckX package로 설명하는 도그푸딩 덱입니다."},static:{label:"정적 프레임워크 데모",description:"Deck/Runtime 경계를 설명하는 DeckX 샘플",detail:"텍스트 중심 발표가 기본 플레이어 기능과 어떻게 결합되는지 확인합니다."},motion:{label:"모션 그래픽 데모",description:"같은 런타임에 CSS motion DeckX를 교체한 샘플",detail:"CSS animation이 포함된 덱에서 Full, Reduced, Paused 차이를 확인합니다."},classic:{label:"4:3 캔버스 데모",description:"DeckX aspectRatio가 렌더러에 반영되는 샘플",detail:"16:9가 아닌 DeckX canvas도 발표자뷰와 슬라이드쇼에 동일하게 반영됩니다."},"image-heavy":{label:"이미지 헤비 데모",description:"96개 package-local 이미지를 로드하는 asset stress 샘플",detail:"이미지가 많은 DeckX에서 preview, overview, object URL 처리 비용을 확인합니다."},"long-120":{label:"릴리스 런북 롱덱",description:"120장 개발자 운영 런북으로 goto, search, overview를 확인하는 샘플",detail:"자연스러운 릴리스 체크포인트로 발표자뷰 썸네일 목록과 키보드 탐색 한계를 관찰합니다."},"long-image":{label:"시스템 스냅샷 이미지 롱덱",description:"package-local 시스템 스냅샷 이미지를 포함한 120장 샘플",detail:"120장 전체에 이미지가 포함된 DeckX로 탐색, 검색, 썸네일, asset 처리를 함께 관찰합니다."}}};let Oe=null,ke=null,We=null,R=ze("ko");window.addEventListener("beforeunload",()=>{Oe?.destroy(),ke?.dispose(),Ze(null)});li();async function li(){if(!Ei()){if(R=ze("ko"),en(R),xi()){window.location.replace(Li());return}ci();return}R=ze(),en(R);const e=pi();if(document.body.dataset.page="player",!e){ui();return}Pt(R.messages.main.loadingDeck);try{await Xn(e)}catch(t){Se(),Ct(t)}}function ci(){const e=di(),t=At(e),n=Bn(e);document.body.dataset.page="project",document.documentElement.lang=e,delete document.body.dataset.mode,Se(),Zs(Xe,{locale:e,deckxUrlValue:new URL(n.url,window.location.href).toString(),homeHref:e==="ko"?"/ko/":"/",playerHref:"/player",defaultDemoHref:gt(n.url),starterSourceHref:oi,demoOptions:t.map(r=>({id:r.id,label:ht[e][r.id].label,description:ht[e][r.id].description,detail:ht[e][r.id].detail,url:r.url,href:gt(r.url),language:r.language})),onOpenDeckxUrl:r=>{window.location.assign(gt(r))}})}function di(){return window.location.pathname.replace(/\/+$/,"")==="/ko"?"ko":"en"}function ui(e=""){document.body.dataset.page="player",document.body.dataset.mode="landing",Se(),Oe?.destroy(),Oe=null,ke?.dispose(),ke=null,Ze(null),ra(Xe,{i18n:R,homeHref:"/",demoOptions:qn(null),historyOptions:Wn(),actions:{onOpenDeckxUrl:Vn,onOpenDeckxFile:Fn,deckxUrlValue:"",deckxStatus:e,homeHref:"/"}})}async function Xn(e){const t=await Rs(e.url);Ze(null);const n=new URL(e.url,window.location.href).toString(),r=e.kind,a=Ye.find(o=>o.id===e.id),i=e.kind==="demo"?a?$t(a).label:t.deck.title:n;e.kind==="url"&&Rt(n)&&Kn({kind:"url",label:t.deck.title,detail:n,url:n}),Hn(t,{source:e,sourceKind:r,sourceLabel:i,deckxUrlValue:n})}async function Fn(e){Pt(R.messages.main.loadingZip);try{const t=new Uint8Array(await e.arrayBuffer()),n=Mn(t,e.name),r=URL.createObjectURL(new Blob([t],{type:e.type||"application/zip"}));Ze(r),Kn({kind:"zip",label:n.deck.title,detail:e.name,sourceIdentity:fi(e)}),window.history.replaceState(null,"",bi()),Hn(n,{source:{id:"local-zip",url:e.name,kind:"url"},sourceKind:"zip",sourceLabel:e.name,deckxUrlValue:"",slideshowDeckUrl:r})}catch(t){Se(),Ct(t)}}function Hn(e,t){Oe?.destroy(),ke?.dispose(),ke=e,Di(e.cssText,e.sourceUrl),Oe=Va(e.deck,{mount:Xe,demoOptions:qn(t.source),historyOptions:Wn(),sourceKind:t.sourceKind,sourceLabel:t.sourceLabel,deckxUrlValue:t.deckxUrlValue,slideshowDeckUrl:t.slideshowDeckUrl,trustedRuntimeScripts:e.runtimeScripts,trustedRuntimeGlobal:e.runtimeGlobal,trustedRuntimeEnabled:Si(),onOpenDeckxUrl:Vn,onOpenDeckxFile:Fn,homeHref:"/",i18n:R})}function pi(){const t=new URLSearchParams(window.location.search).get("deck");return t?jn(t):null}function jn(e){const t=Ye.find(n=>Gn(n.url,e));return{id:t?.id??"deckx-url",url:e,kind:t?"demo":"url"}}function qn(e){return At(R.locale).map(t=>({id:t.id,label:$t(t).label,description:$t(t).description,url:t.url,href:Je(t.url),active:t.id===e?.id}))}function At(e){return Ye.filter(t=>t.language===e)}function Bn(e){return At(e)[0]??Ye[0]}function Je(e){const t=new URL(window.location.href);return t.searchParams.set("deck",e),t.searchParams.delete("deckx"),t.searchParams.delete("sessionId"),t.searchParams.delete("slideshowWindow"),t.searchParams.delete("mode"),t.searchParams.set(be,R.locale),t.hash="landing",`${t.pathname}${t.search}${t.hash}`}function Wn(){return zn().map(e=>({id:e.id,kind:e.kind,label:e.label,detail:e.detail,url:e.url,href:e.kind==="url"&&e.url?Je(e.url):void 0}))}function Kn(e){const n={id:mi(e),kind:e.kind,label:e.label,detail:e.detail,url:e.url,openedAtEpochMs:Date.now()},r=zn().filter(a=>!hi(a,n));ki([n,...r].slice(0,ii))}function mi(e){return e.kind==="url"&&e.url?`url:${Ge(e.url)}`:`${e.kind}:${e.sourceIdentity??e.detail}`}function fi(e){const t="webkitRelativePath"in e?e.webkitRelativePath.trim():"";return JSON.stringify([t||e.name,e.size,e.lastModified])}function hi(e,t){return e.id===t.id?!0:e.kind!==t.kind?!1:e.kind==="url"&&e.url&&t.url?Gn(e.url,t.url):e.kind==="zip"&&t.kind==="zip"&&gi(e,t)}function gi(e,t){return e.detail===t.detail&&e.id===`zip:${e.detail}`&&t.id!==e.id}function zn(){try{const e=window.localStorage.getItem(Un);if(!e)return[];const t=JSON.parse(e);return Array.isArray(t)?yi(t.filter(Ti).filter(wi).sort((n,r)=>r.openedAtEpochMs-n.openedAtEpochMs)):[]}catch{return[]}}function yi(e){const t=new Set;return e.filter(n=>{const r=vi(n);return!r||t.has(r)?!1:(t.add(r),!0)})}function wi(e){return e.kind==="zip"||e.kind==="url"&&typeof e.url=="string"&&Rt(e.url)}function vi(e){if(e.kind==="url"){const n=_n(e.url??"");return n&&Rt(n)?`url:${n}`:null}const t=`zip:${e.detail}`;return e.id===t?t:e.id}function ki(e){try{window.localStorage.setItem(Un,JSON.stringify(e))}catch{}}function gt(e){const t=new URL("/player",window.location.href);return t.searchParams.set("deck",e),t.searchParams.set(be,R.locale),t.hash="landing",`${t.pathname}${t.search}${t.hash}`}function bi(){const e=new URL(window.location.href);return e.pathname="/player",e.searchParams.delete("deck"),e.searchParams.delete("deckx"),e.searchParams.delete("sessionId"),e.searchParams.delete("slideshowWindow"),e.searchParams.delete("mode"),e.searchParams.set(be,R.locale),e.hash="landing",`${e.pathname}${e.search}${e.hash}`}function Si(){const e=new URLSearchParams(window.location.search).get("trusted");return e==="1"||e==="true"}async function Vn(e){ke||Pt(R.messages.main.loadingDeck);try{const t=jn(e);await Xn(t),$i(t.url)}catch(t){Se(),Ct(t)}}function $i(e){window.history.replaceState(null,"",Je(e))}function Di(e,t){if(Se(),!e.trim())return;const n=document.createElement("style");n.id=Nn,n.dataset.deckxSource=t,n.textContent=e,document.head.appendChild(n)}function Se(){document.getElementById(Nn)?.remove()}function Ze(e){We&&We!==e&&URL.revokeObjectURL(We),We=e}function Gn(e,t){return Ge(e)===Ge(t)}function Ge(e){return new URL(e,window.location.href).toString()}function _n(e){try{return Ge(e)}catch{return null}}function Rt(e){const t=_n(e);if(!t)return!1;const n=new URL(t).protocol;return n==="http:"||n==="https:"}function Ei(){return window.location.pathname.replace(/\/+$/,"")==="/player"}function xi(){const e=window.location.hash;return new URLSearchParams(window.location.search).has("deck")||e==="#landing"||e==="#presenter"||e==="#slideshow"}function Li(){const e=new URL(window.location.href);return e.pathname="/player",e.searchParams.delete("mode"),e.searchParams.set(be,R.locale),`${e.pathname}${e.search}${e.hash||"#landing"}`}function Pt(e){Xe.innerHTML=`<main class="system-message">${Pe(e)}</main>`}function Ct(e){const t=e instanceof Error?e.message:String(e),n=Bn(R.locale);Xe.innerHTML=`
    <main class="system-message">
      <div class="load-error">
        <strong>${Pe(R.messages.main.loadFailed)}</strong>
        <span>${Pe(t)}</span>
        <a class="btn" href="${Pe(Je(n.url))}">${Pe(R.messages.main.openDefaultDemo)}</a>
      </div>
    </main>
  `}function $t(e){return R.messages.demos[e?.messageKey??"starter"]}function Pe(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Ti(e){if(!e||typeof e!="object")return!1;const t=e;return(t.kind==="url"||t.kind==="zip")&&typeof t.id=="string"&&typeof t.label=="string"&&typeof t.detail=="string"&&typeof t.openedAtEpochMs=="number"&&(t.url===void 0||typeof t.url=="string")}
