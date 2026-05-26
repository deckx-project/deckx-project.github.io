(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function n(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(s){if(s.ep)return;s.ep=!0;const o=n(s);fetch(s.href,o)}})();function Gn(e){const t=[],n=new Set;let r=0;e.slides.length||t.push({code:"empty-deck",severity:"error",message:"Deck must contain at least one slide."}),_n(e.aspectRatio)||t.push({code:"invalid-canvas",severity:"error",message:"Deck aspectRatio must resolve to a positive finite canvas."}),e.slides.forEach((i,c)=>{const h=i.id?.trim();h?n.has(h)?t.push({code:"duplicate-slide-id",severity:"error",message:`Slide id "${h}" is duplicated.`,slideId:h,slideIndex:c}):n.add(h):t.push({code:"missing-slide-id",severity:"error",message:`Slide ${c+1} is missing a stable id.`,slideIndex:c}),i.notes?.trim()?r+=1:t.push({code:"missing-notes",severity:"warning",message:`Slide ${h||c+1} has no speaker notes.`,slideId:h||void 0,slideIndex:c})});const s=t.filter(i=>i.severity==="error").length,o=t.length-s;return{deckId:e.id,issues:t,errorCount:s,warningCount:o,notesCoverage:{total:e.slides.length,withNotes:r,missing:Math.max(0,e.slides.length-r)}}}function _n(e){return e==="16:9"||e==="4:3"?!0:Number.isFinite(e.width)&&Number.isFinite(e.height)&&e.width>0&&e.height>0}function ot(e){if(globalThis.crypto?.randomUUID)return`${e}-${globalThis.crypto.randomUUID()}`;if(globalThis.crypto?.getRandomValues){const t=new Uint32Array(4);return globalThis.crypto.getRandomValues(t),`${e}-${Array.from(t,n=>n.toString(16).padStart(8,"0")).join("")}`}return`${e}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`}function Yn(e=window){const t=e.navigator;if(t.userAgentData?.mobile===!0)return!0;const r=t.userAgent||"",s=t.platform||t.userAgentData?.platform||"",o=t.maxTouchPoints||0,i=o>0||"ontouchstart"in e,c=It(e,"(pointer: coarse)"),h=It(e,"(hover: none)");if(Jn(r)||Zn(r)||Qn(r,s,o))return!0;const f=er(e);return i&&c&&h&&f<=1024}function It(e,t){return typeof e.matchMedia=="function"&&e.matchMedia(t).matches}function Jn(e){return/Android.+Mobile|iPhone|iPod|Windows Phone|IEMobile|BlackBerry|BB10|Opera Mini|Opera Mobi|Mobile Safari/i.test(e)}function Zn(e){return/iPad|Tablet|Silk|Kindle|PlayBook|Android(?!.*Mobile)/i.test(e)}function Qn(e,t,n){return/Macintosh/i.test(e)&&/Mac/i.test(t)&&n>1}function er(e){const t=e.screen?.width||e.innerWidth,n=e.screen?.height||e.innerHeight;return Math.min(t,n)}function tr(e){return{id:e.id,title:e.title,aspectRatio:e.aspectRatio,theme:e.theme,metadata:e.metadata,slides:e.slides.map(nr)}}function nr(e){const{notes:t,...n}=e;return n}function rr(){return{status:"idle",startedAtEpochMs:null,elapsedBeforePauseMs:0,timerVersion:0}}function sr(e,t=Date.now()){return e.status==="running"?e:{...e,status:"running",startedAtEpochMs:t,timerVersion:e.timerVersion+1}}function ar(e,t=Date.now()){return e.status!=="running"||e.startedAtEpochMs===null?e:{...e,status:"paused",startedAtEpochMs:null,elapsedBeforePauseMs:e.elapsedBeforePauseMs+(t-e.startedAtEpochMs),timerVersion:e.timerVersion+1}}function ir(e,t=Date.now()){return e.status!=="paused"?e:{...e,status:"running",startedAtEpochMs:t,timerVersion:e.timerVersion+1}}function or(e=Date.now()){return{status:"running",startedAtEpochMs:e,elapsedBeforePauseMs:0,timerVersion:0}}function _t(e,t=Date.now()){return e.status!=="running"||e.startedAtEpochMs===null?e.elapsedBeforePauseMs:e.elapsedBeforePauseMs+(t-e.startedAtEpochMs)}function lr(e){const t=Math.max(0,Math.floor(e/1e3)),n=Math.floor(t/60),r=t%60;return`${String(n).padStart(2,"0")}:${String(r).padStart(2,"0")}`}function cr(e,t,n){let r={deckId:e,sessionId:t,stateVersion:0,index:0,timer:rr(),peer:{connected:!1,lastSeenAt:null}};const s=new Set;return{subscribe(i){return s.add(i),()=>s.delete(i)},getState:()=>r,getPublicState:()=>({deckId:r.deckId,sessionId:r.sessionId,stateVersion:r.stateVersion,index:r.index,timer:r.timer}),getElapsedLabel:()=>lr(_t(r.timer)),goto(i){const c=Nt(i,0,Math.max(0,n-1));c!==r.index&&(r={...r,index:c,stateVersion:r.stateVersion+1},o())},startTimer(){r={...r,timer:sr(r.timer),stateVersion:r.stateVersion+1},o()},applyTimerCommand(i){const c=i==="pause"?ar(r.timer):i==="resume"?ir(r.timer):or();r={...r,timer:c,stateVersion:r.stateVersion+1},o()},applySnapshot(i){i.deckId!==r.deckId||i.sessionId!==r.sessionId||i.stateVersion<=r.stateVersion||(r={...r,index:Nt(i.index,0,Math.max(0,n-1)),stateVersion:i.stateVersion,timer:i.timer},o())},markPeerSeen(){const i=r.peer.connected;r={...r,peer:{connected:!0,lastSeenAt:Date.now()}},i||o()},refreshPeer(i){if(r.peer.lastSeenAt===null)return;const c=Date.now()-r.peer.lastSeenAt<=i;c!==r.peer.connected&&(r={...r,peer:{...r.peer,connected:c}},o())},isPeerConnected(i){return r.peer.lastSeenAt!==null&&Date.now()-r.peer.lastSeenAt<=i}};function o(){s.forEach(i=>i())}}function Nt(e,t,n){return Math.min(n,Math.max(t,e))}class dr{constructor(t){this.options=t,this.channel=new BroadcastChannel(`html-ppt:${t.deckId}:${t.sessionId}`),this.channel.addEventListener("message",this.onMessage)}options;channel;listeners=new Set;lastSeqBySender=new Map;seq=0;send(t){const n={protocol:"deckx-player-sync/v1",deckId:this.options.deckId,sessionId:this.options.sessionId,senderId:this.options.senderId,from:this.options.from,seq:++this.seq,stateVersion:ur(t),sentAtEpochMs:Date.now(),body:t};this.channel.postMessage(n)}subscribe(t){return this.listeners.add(t),()=>this.listeners.delete(t)}close(){this.channel.removeEventListener("message",this.onMessage),this.channel.close(),this.listeners.clear()}onMessage=t=>{if(!pr(t.data))return;const n=t.data;if(n.protocol!=="deckx-player-sync/v1"||n.deckId!==this.options.deckId||n.sessionId!==this.options.sessionId||n.senderId===this.options.senderId)return;const r=this.lastSeqBySender.get(n.senderId)??0;n.seq<=r||(this.lastSeqBySender.set(n.senderId,n.seq),this.listeners.forEach(s=>s(n)))}}class Xt{constructor(t="Transport is disabled."){this.reason=t}reason;send(){}subscribe(){return()=>{}}close(){}}function ur(e){if(e.type==="state-snapshot")return e.state.stateVersion;if(e.type==="pong")return e.stateVersion}function pr(e){if(!e||typeof e!="object")return!1;const t=e;return t.protocol==="deckx-player-sync/v1"&&typeof t.deckId=="string"&&typeof t.sessionId=="string"&&typeof t.senderId=="string"&&typeof t.seq=="number"&&typeof t.sentAtEpochMs=="number"&&typeof t.body=="object"}const mr=["DECKX_RUNTIME","KSUG_RUNTIME"];class fr{scripts;loaded=!1;loading=null;scriptElements=[];generation=0;constructor(t){this.scripts=t}get available(){return this.scripts.length>0}async mount(t){if(!this.available)return;const n=++this.generation;await this.loadScripts(),!(n!==this.generation||!t.isConnected)&&this.getRuntimeGlobal()?.mount?.(t)}cleanup(){this.generation+=1,this.getRuntimeGlobal()?.cleanup?.()}destroy(){this.cleanup(),this.scriptElements.forEach(t=>t.remove()),this.scriptElements=[],this.loaded=!1,this.loading=null}async loadScripts(){this.loaded||(this.loading||(this.loading=this.loadScriptsInOrder().then(()=>{this.loaded=!0})),await this.loading)}async loadScriptsInOrder(){for(const t of this.scripts)await new Promise((n,r)=>{const s=document.createElement("script");s.async=!1,s.src=t.url,s.dataset.deckxRuntimePath=t.path,s.onload=()=>n(),s.onerror=()=>r(new Error(`Trusted DeckX runtime failed to load: ${t.path}`)),document.body.appendChild(s),this.scriptElements.push(s)})}getRuntimeGlobal(){const t=window;for(const n of mr){const r=t[n];if(hr(r))return r}return null}}function hr(e){if(!e||typeof e!="object")return!1;const t=e;return typeof t.mount=="function"||typeof t.cleanup=="function"}async function gr(e){const t=new URL(window.location.href);t.hash="slideshow",t.searchParams.set("sessionId",e.sessionId),e.deckUrl&&t.searchParams.set("deck",e.deckUrl);let n="popup,width=1280,height=720";if(e.display==="auto"){const s=await yr(e.i18n);s.status&&e.onStatus?.(s.status),s.features&&(n=s.features)}const r=window.open(t.toString(),"html-ppt-slideshow",n);return r?(r.focus(),{windowRef:r,status:{type:"opened",message:e.i18n.messages.window.opened}}):{windowRef:null,status:{type:"popup-blocked",message:e.i18n.messages.window.popupBlocked}}}async function yr(e){const t=window;if(!window.isSecureContext||typeof t.getScreenDetails!="function")return{features:null,status:{type:"window-management-unavailable",message:e.messages.window.unavailable}};try{const r=(await t.getScreenDetails()).screens.find(s=>!s.isPrimary)??null;return r?{features:`left=${r.availLeft},top=${r.availTop},width=${r.availWidth},height=${r.availHeight},popup`,status:{type:"opened",message:e.messages.window.detected}}:{features:null,status:{type:"window-management-unavailable",message:e.messages.window.noExternal}}}catch{return{features:null,status:{type:"window-management-denied",message:e.messages.window.denied}}}}const wr=["en","ko"],Yt="en",ht="ui",Jt="deckx-player:ui-locale",vr={documentTitle:"DeckX Player",locale:{label:"UI language",en:"English",ko:"Korean"},demos:{starter:{label:"DeckX Starter",description:"A minimal starter project you can copy to build your first DeckX",detail:"A starter source folder with manifest, slides, notes, styles, assets, README, and AGENTS.md."},dogfood:{label:"DeckX zip demo",description:"Loads the public/decks/deckx-player-demo.deckx file as-is",detail:"A dogfooding deck that explains this project as a DeckX package."},static:{label:"Static framework demo",description:"A DeckX sample explaining the Deck/Runtime boundary",detail:"Shows how text-heavy presentations combine with the base player features."},motion:{label:"Motion graphics demo",description:"A CSS motion DeckX sample running in the same runtime",detail:"Compares Full, Reduced, and Paused modes in a deck with CSS animation."},classic:{label:"4:3 canvas demo",description:"A sample showing DeckX aspectRatio reflected in the renderer",detail:"A non-16:9 DeckX canvas is applied consistently in presenter view and slideshow."},imageHeavy:{label:"Image-heavy demo",description:"An asset stress sample that loads 96 package-local images",detail:"Checks preview, overview, and object URL costs in a DeckX with many images."},long120:{label:"120-slide long deck demo",description:"A sample for goto, search, and overview usability across many pages",detail:"Uses a 120-slide DeckX to observe presenter thumbnails and keyboard navigation limits."},longImage:{label:"120-slide image long deck demo",description:"A stress sample with a long DeckX and package-local images",detail:"Combines navigation, search, thumbnails, and asset handling across 120 image-backed slides."}},main:{loadingDeck:"Loading DeckX deck...",loadingZip:"Loading local DeckX zip...",loadFailed:"DeckX deck load failed",openDefaultDemo:"Open default demo"},player:{homeSubtitle:"Open a DeckX to start presenting",flowHeading:"The player is ready before you open a deck",emptyTitle:"Open a DeckX URL or local .deckx zip first.",emptyBody:"After opening a deck, preview and start controls become active, and DeckX details stay tucked away until needed.",flowOpenTitle:"1. Open DeckX",flowOpenBody:"Enter a URL or choose a local zip package.",flowPreviewTitle:"2. Check preview",flowPreviewBody:"Review the first slide and default presentation options.",flowStartTitle:"3. Start presenting",flowStartBody:"Run presenter view and the slideshow window together.",teamAreaTitle:"SSO and team library placeholder",teamAreaBody:"For now, DeckX history stays in this browser. Later, sign-in can sync uploaded and shared DeckX packages.",slides:"slides",planned:"planned",metadata:"metadata",runHeading:"Run presentation",start:"Start presentation",presenterOnly:"Presenter only",slideshowOnly:"Slideshow only",options:"Presentation options",projectHome:"Project overview",sourceMenu:"Open deck / samples",sourceHeading:"Open DeckX",openUrl:"Open",localPackage:"LOCAL PACKAGE",localZip:"Choose local .deckx zip",recentDeckx:"RECENT DeckX",noHistory:"No DeckX has been opened yet.",zipNeedsReselect:"select again required",officialSamples:"OFFICIAL SAMPLES",details:"View DeckX details",validationIssuesNone:"No validation issues.",moreIssuesHidden:e=>`${e} more issues hidden.`,sourceKind:{demo:"Demo DeckX",zip:"Local ZIP",url:"URL DeckX"},motionDescriptions:{full:"CSS motion and transitions enabled",reduced:"Motion compressed for review",paused:"Animations paused"},trustedRuntime:{heading:"TRUSTED RUNTIME",label:"Allow package JS",description:"Run package-local JavaScript declared by this DeckX."}},presenter:{presets:{scriptFirst:"Left list, long notes on top, Current/Next below",balanced:"Current/Notes on the left, Next/List on the right",review:"Single-line list on the left, compact Next on the right"},connectionTitle:"Synchronization status between presenter view and slideshow window",gotoTitle:"Go to slide number",searchTitle:"Search title, body, and notes",openSlideshowTitle:"Open the audience slideshow window",openSlideshow:"Open slideshow window",settingsTitle:"Choose presenter panel layout",closePresets:"Close presets",viewPresets:"View presets",exit:"Exit",noNotes:"No speaker notes.",prev:"Prev",next:"Next",emptyPanels:"Turn on at least one component to display.",ready:"Ready",readiness:{summary:"Operating status",deck:"Current DeckX title.",session:"Session shared by presenter view and slideshow.",popup:"Slideshow window open status.",sync:"BroadcastChannel-based connection status between windows.",fullscreen:"Fullscreen status for the current window.",motion:"Deck CSS animation playback mode. Change it from the tools menu.",theme:"Presenter and slideshow chrome theme. Deck-internal styles are unchanged.",pace:"Current pace compared with planned presentation time.",filter:"Audience display adjustment values. Change them from the slideshow Display menu.",wake:"Screen wake lock request status.",mirror:"Audience screen mirror status.",validation:"DeckX package validation result.",notes:"Number of slides with speaker notes."},tools:{label:"Tools",motionDescription:"Cycle deck animation playback through Full, Reduced, and Paused.",themeLabel:"Show theme",themeDescription:"Switch presenter and slideshow chrome between Light and Dark. Deck styles are preserved.",copyUrl:"Copy URL",copyUrlDescription:"Copy the slideshow URL for manual recovery when popups are blocked.",wakeLockDescription:"Request screen wake lock in supported browsers.",mirrorDescription:"After permission, show an audience-screen mirror inside presenter view."}},slideshow:{enterFullscreen:"Start fullscreen",exitFullscreen:"Exit fullscreen",controls:"Slideshow controls",display:"Display",displayFilters:"Display filters",brightness:"Bright",contrast:"Contrast",saturation:"Sat"},runtime:{mobileCombined:"On mobile, slides and presenter view are shown together in the current tab.",openingSlideshow:"Opening slideshow window.",slideshowClosed:"The presenter closed the slideshow.",fullscreenFailed:"Fullscreen could not start. Browser permission or a user gesture is required.",notesSaved:"Notes draft saved.",notesReset:"Notes draft restored to the source notes.",notesExported:"Speaker notes exported as Markdown.",slideshowUrlCopied:"Slideshow URL copied.",searchEmpty:"Enter a search term or no results were found.",gotoEmpty:e=>`Enter a number from 1-${e}.`},window:{popupBlocked:"Popup was blocked. Allow popups in the browser, then open it again.",opened:"Slideshow window opened. Move it to an external display and start fullscreen if needed.",unavailable:"External display placement is unavailable in this browser or context, so a normal window opens.",noExternal:"No external display was found, so a normal window opens.",detected:"External display coordinates detected. Opening the slideshow window there.",denied:"External display permission was denied or unavailable, so a normal window opens."}},br={documentTitle:"DeckX Player",locale:{label:"UI 언어",en:"영어",ko:"한국어"},demos:{starter:{label:"DeckX 스타터",description:"복사해서 첫 DeckX를 만들 수 있는 최소 예시 프로젝트",detail:"manifest, slides, notes, styles, assets, README, AGENTS.md를 포함한 starter source folder입니다."},dogfood:{label:"DeckX zip 데모",description:"public/decks/deckx-player-demo.deckx 파일을 그대로 로드",detail:"이 프로젝트 자체를 DeckX package로 설명하는 도그푸딩 덱입니다."},static:{label:"정적 프레임워크 데모",description:"Deck/Runtime 경계를 설명하는 DeckX 샘플",detail:"텍스트 중심 발표가 기본 플레이어 기능과 어떻게 결합되는지 확인합니다."},motion:{label:"모션 그래픽 데모",description:"같은 런타임에 CSS motion DeckX를 교체한 샘플",detail:"CSS animation이 포함된 덱에서 Full, Reduced, Paused 차이를 확인합니다."},classic:{label:"4:3 캔버스 데모",description:"DeckX aspectRatio가 렌더러에 반영되는 샘플",detail:"16:9가 아닌 DeckX canvas도 발표자뷰와 슬라이드쇼에 동일하게 반영됩니다."},imageHeavy:{label:"이미지 헤비 데모",description:"96개 package-local 이미지를 로드하는 asset stress 샘플",detail:"이미지가 많은 DeckX에서 preview, overview, object URL 처리 비용을 확인합니다."},long120:{label:"120장 롱덱 데모",description:"많은 페이지에서 goto, search, overview 사용성을 확인하는 샘플",detail:"120장 DeckX를 통해 발표자뷰 썸네일 목록과 키보드 탐색 한계를 관찰합니다."},longImage:{label:"120장 이미지 롱덱 데모",description:"긴 DeckX와 package-local 이미지를 함께 로드하는 stress 샘플",detail:"120장 전체에 이미지가 포함된 DeckX로 탐색, 검색, 썸네일, asset 처리를 함께 관찰합니다."}},main:{loadingDeck:"DeckX deck loading...",loadingZip:"Local DeckX zip loading...",loadFailed:"DeckX deck load failed",openDefaultDemo:"기본 데모 열기"},player:{homeSubtitle:"DeckX를 열어 발표를 시작하세요",flowHeading:"열기 전에는 플레이어만 준비합니다",emptyTitle:"DeckX URL 또는 로컬 .deckx zip을 먼저 여세요.",emptyBody:"덱을 열면 미리보기와 발표 시작 버튼이 활성화되고, DeckX 상세 정보는 필요할 때만 펼쳐볼 수 있습니다.",flowOpenTitle:"1. DeckX 열기",flowOpenBody:"URL을 입력하거나 로컬 zip package를 선택합니다.",flowPreviewTitle:"2. 미리보기 확인",flowPreviewBody:"첫 슬라이드와 기본 발표 옵션을 확인합니다.",flowStartTitle:"3. 발표 시작",flowStartBody:"발표자뷰와 슬라이드쇼 창을 함께 실행합니다.",teamAreaTitle:"SSO와 팀 라이브러리 준비 영역",teamAreaBody:"지금은 브라우저 로컬 히스토리로 동작하고, 이후 로그인하면 업로드 DeckX와 공유 받은 DeckX를 동기화할 수 있습니다.",slides:"slides",planned:"planned",metadata:"metadata",runHeading:"발표 실행",start:"발표 시작",presenterOnly:"발표자뷰만",slideshowOnly:"슬라이드쇼만",options:"발표 옵션",projectHome:"프로젝트 소개",sourceMenu:"덱 열기 / 샘플",sourceHeading:"DeckX 열기",openUrl:"열기",localPackage:"LOCAL PACKAGE",localZip:"로컬 .deckx zip 선택",recentDeckx:"RECENT DeckX",noHistory:"아직 열어본 DeckX가 없습니다.",zipNeedsReselect:"다시 선택 필요",officialSamples:"OFFICIAL SAMPLES",details:"DeckX 상세 보기",validationIssuesNone:"Validation issues 없음.",moreIssuesHidden:e=>`${e} more issues hidden.`,sourceKind:{demo:"Demo DeckX",zip:"Local ZIP",url:"URL DeckX"},motionDescriptions:{full:"CSS motion and transitions enabled",reduced:"Motion compressed for review",paused:"Animations paused"},trustedRuntime:{heading:"TRUSTED RUNTIME",label:"Package JS 허용",description:"이 DeckX가 선언한 package-local JavaScript를 실행합니다."}},presenter:{presets:{scriptFirst:"왼쪽 목록, 상단 긴 노트, 하단 Current/Next",balanced:"왼쪽 Current/Notes, 오른쪽 Next/List",review:"왼쪽 한 줄 목록, 오른쪽 작은 Next"},connectionTitle:"발표자뷰와 슬라이드쇼 창의 동기화 상태",gotoTitle:"슬라이드 번호로 이동",searchTitle:"제목, 본문, 노트 검색",openSlideshowTitle:"관객용 슬라이드쇼 창을 엽니다",openSlideshow:"슬라이드쇼 창 열기",settingsTitle:"발표자뷰 패널 배치를 선택합니다",closePresets:"프리셋 닫기",viewPresets:"뷰 프리셋",exit:"종료",noNotes:"발표자 노트가 없습니다.",prev:"이전",next:"다음",emptyPanels:"표시할 컴포넌트를 하나 이상 켜주세요.",ready:"준비됨",readiness:{summary:"운영 상태",deck:"현재 열려 있는 DeckX 제목입니다.",session:"발표자뷰와 슬라이드쇼가 공유하는 세션입니다.",popup:"슬라이드쇼 창 열기 상태입니다.",sync:"BroadcastChannel 기반 창 간 연결 상태입니다.",fullscreen:"현재 창의 풀스크린 상태입니다.",motion:"덱 CSS animation 재생 방식입니다. 도구 메뉴에서 변경합니다.",theme:"발표자뷰와 슬라이드쇼 chrome 테마입니다. 덱 내부 스타일은 바꾸지 않습니다.",pace:"계획 시간 대비 현재 발표 속도입니다.",filter:"관객용 화면 보정값입니다. 슬라이드쇼의 Display 메뉴에서 조정합니다.",wake:"화면 꺼짐 방지 요청 상태입니다.",mirror:"관객 화면 미러링 상태입니다.",validation:"DeckX package 검증 결과입니다.",notes:"발표자 노트가 연결된 슬라이드 수입니다."},tools:{label:"도구",motionDescription:"Full, Reduced, Paused 순서로 덱 애니메이션 재생 방식을 바꿉니다.",themeLabel:"쇼 테마",themeDescription:"발표자뷰와 슬라이드쇼 chrome을 Light/Dark로 전환합니다. 덱 스타일은 유지됩니다.",copyUrl:"URL 복사",copyUrlDescription:"현재 세션의 슬라이드쇼 URL을 복사합니다. 팝업 차단 시 수동 복구에 사용합니다.",wakeLockDescription:"지원 브라우저에서 화면 꺼짐 방지를 요청합니다.",mirrorDescription:"권한을 허용하면 발표자 화면 안에 관객 화면 확인용 미러를 띄웁니다."}},slideshow:{enterFullscreen:"풀스크린 시작",exitFullscreen:"풀스크린 종료",controls:"Slideshow controls",display:"Display",displayFilters:"Display filters",brightness:"Bright",contrast:"Contrast",saturation:"Sat"},runtime:{mobileCombined:"모바일에서는 현재 탭에서 슬라이드와 발표자뷰를 함께 표시합니다.",openingSlideshow:"슬라이드쇼 창을 여는 중입니다.",slideshowClosed:"발표자가 슬라이드쇼를 종료했습니다.",fullscreenFailed:"풀스크린을 시작할 수 없습니다. 브라우저 권한 또는 사용자 제스처가 필요합니다.",notesSaved:"노트 드래프트를 저장했습니다.",notesReset:"노트 드래프트를 원본으로 되돌렸습니다.",notesExported:"스피커 노트를 Markdown으로 내보냈습니다.",slideshowUrlCopied:"슬라이드쇼 URL을 복사했습니다.",searchEmpty:"검색어를 입력하거나 결과가 없습니다.",gotoEmpty:e=>`1-${e} 범위의 번호를 입력하세요.`},window:{popupBlocked:"팝업이 차단되었습니다. 브라우저에서 팝업을 허용한 뒤 다시 열어주세요.",opened:"슬라이드쇼 창을 열었습니다. 필요하면 외부 화면으로 이동한 뒤 풀스크린을 시작하세요.",unavailable:"외부 화면 자동 배치는 이 브라우저 또는 실행 컨텍스트에서 지원되지 않아 일반 창으로 엽니다.",noExternal:"외부 화면을 찾지 못해 일반 창으로 엽니다.",detected:"외부 화면 좌표를 감지했습니다. 슬라이드쇼 창을 해당 위치로 엽니다.",denied:"외부 화면 권한이 거부되었거나 사용할 수 없어 일반 창으로 엽니다."}},kr={en:vr,ko:br};function He(e=Sr()){const t=gt(e)??Yt;return{locale:t,messages:kr[t],hrefForLocale:$r}}function Sr(){const e=new URLSearchParams(window.location.search),t=gt(e.get(ht));return t?(Er(t),t):Dr()??Yt}function Ut(e){document.documentElement.lang=e.locale,document.title=e.messages.documentTitle}function gt(e){if(!e)return null;const t=e.toLowerCase().split("-")[0];return t==="en"||t==="ko"?t:null}function $r(e){const t=new URL(window.location.href);return t.searchParams.set(ht,e),`${t.pathname}${t.search}${t.hash}`}function Dr(){try{return gt(window.localStorage.getItem(Jt))}catch{return null}}function Er(e){try{window.localStorage.setItem(Jt,e)}catch{return}}function Ae(e){return e==="4:3"?{width:1024,height:768}:e==="16:9"?{width:1280,height:720}:{width:Ht(e.width,1280),height:Ht(e.height,720)}}function Ht(e,t){return!Number.isFinite(e)||e<=0?t:Math.round(e)}function Q(e,t,n,r){e.innerHTML="",e.appendChild(Zt(t,n,r))}function Zt(e,t,n){const r=e.slides[t];if(!r){const f=document.createElement("section");return f.className="slide slide-end",f.innerHTML='<p class="muted">END</p>',f}const s=document.createElement("section"),o=Ae(e.aspectRatio);s.className=["slide",r.className,e.theme?.className].filter(Boolean).join(" "),s.dataset.slideId=r.id,s.style.setProperty("--slide-width",`${o.width}px`),s.style.setProperty("--slide-height",`${o.height}px`),s.style.width=`${o.width}px`,s.style.height=`${o.height}px`,xr(s,e.theme?.cssVars);const i=r.render?.({deck:e,slide:r,index:t,total:e.slides.length,mode:n});i instanceof HTMLElement?s.appendChild(i):typeof i=="string"?s.innerHTML=i:s.appendChild(Lr(r));const c=document.createElement("div");c.className="slide-footer mono",c.textContent=r.footer||e.title;const h=document.createElement("div");return h.className="slide-page mono",h.textContent=`${String(t+1).padStart(2,"0")} / ${String(e.slides.length).padStart(2,"0")}`,s.append(c,h),s}function ee(e,t=""){const n=Ae(e.aspectRatio),r=document.createElement("div");r.className=`slide-wrap ${t}`.trim();const s=document.createElement("div");return s.className="slide-scaler",s.dataset.designWidth=String(n.width),s.dataset.designHeight=String(n.height),r.appendChild(s),r}function pe(){document.querySelectorAll(".slide-scaler").forEach(e=>{const t=e.parentElement;if(!t)return;const n=Number(e.dataset.designWidth||1280),r=Number(e.dataset.designHeight||720),s=Math.min(t.clientWidth/n,t.clientHeight/r),o=(t.clientWidth-n*s)/2,i=(t.clientHeight-r*s)/2;e.style.width=`${n}px`,e.style.height=`${r}px`,e.style.transform=`scale(${s})`,e.style.left=`${o}px`,e.style.top=`${i}px`})}function Lr(e){const t=document.createElement("div");if(t.className="slide-content",e.kicker){const n=document.createElement("div");n.className="slide-kicker mono",n.textContent=e.kicker,t.appendChild(n)}if(e.title){const n=document.createElement("h2");n.innerHTML=e.title,t.appendChild(n)}if(e.body){const n=document.createElement("div");n.className="slide-body",n.innerHTML=e.body,t.appendChild(n)}return t}function xr(e,t){t&&Object.entries(t).forEach(([n,r])=>{e.style.setProperty(n,r)})}function Tr(e,t){const n=t.i18n.messages.player;e.innerHTML=`
    <main class="player-console player-console-empty">
      ${Qt(n.homeSubtitle,t.i18n,t.homeHref)}
      <section class="player-console-grid player-console-grid-empty" aria-label="DeckX player open screen">
        <aside class="player-panel player-open-panel">
          ${en(t)}
        </aside>

        <section class="player-panel player-guidance-panel">
          <div class="player-panel-heading">
            <span class="mono">PLAYER FLOW</span>
            <h2>${u(n.flowHeading)}</h2>
          </div>
          <div class="player-empty-stage" aria-label="No DeckX opened">
            <strong>${u(n.emptyTitle)}</strong>
            <span>${u(n.emptyBody)}</span>
          </div>
          <ol class="player-flow-list">
            <li><strong>${u(n.flowOpenTitle)}</strong><span>${u(n.flowOpenBody)}</span></li>
            <li><strong>${u(n.flowPreviewTitle)}</strong><span>${u(n.flowPreviewBody)}</span></li>
            <li><strong>${u(n.flowStartTitle)}</strong><span>${u(n.flowStartBody)}</span></li>
          </ol>
          <div class="player-login-teaser">
            <strong>${u(n.teamAreaTitle)}</strong>
            <span>${u(n.teamAreaBody)}</span>
          </div>
        </section>
      </section>
    </main>
  `,tn(e,t.actions)}function Ar(e,t){const n=Ae(t.deck.aspectRatio),r=t.deck.slides[0],s=zr(t.deck),o=t.i18n.messages.player;e.innerHTML=`
    <main class="player-console">
      ${Qt(t.deck.title,t.i18n,t.actions.homeHref)}
      <section class="player-console-grid player-console-grid-loaded" aria-label="DeckX player launch console">
        <aside class="player-panel player-open-panel">
          ${en(t)}
        </aside>

        <section class="player-panel player-preview-panel">
          <div class="player-panel-heading split">
            <div>
              <span class="mono">${u(sn(t.sourceKind,t.i18n))}</span>
              <h2>${u(Jr(r?.title||t.deck.title))}</h2>
            </div>
            <span class="player-count mono">01 / ${String(t.deck.slides.length).padStart(2,"0")}</span>
          </div>
          <div class="player-preview-stage" data-player-preview aria-label="First slide preview"></div>
          <div class="player-meta-strip" aria-label="Deck metadata">
            <span><strong>${t.deck.slides.length}</strong> ${u(o.slides)}</span>
            <span><strong>${u(rn(t.deck.aspectRatio))}</strong> ${n.width}x${n.height}</span>
            <span><strong>${u(nn(s))}</strong> ${u(o.planned)}</span>
            <span><strong>${u(Gr(t.deck.metadata))}</strong> ${u(o.metadata)}</span>
          </div>
        </section>

        <aside class="player-panel player-run-panel">
          <div class="player-panel-heading">
            <span class="mono">RUN</span>
            <h2>${u(o.runHeading)}</h2>
          </div>
          <button class="btn primary player-start-button" type="button" data-action="start">${u(o.start)}</button>
          <div class="player-secondary-actions" aria-label="Secondary player actions">
            <button class="btn" type="button" data-action="presenter">${u(o.presenterOnly)}</button>
            <button class="btn" type="button" data-action="slideshow">${u(o.slideshowOnly)}</button>
          </div>
          <details class="player-settings-detail" open>
            <summary>${u(o.options)}</summary>
            ${Fr(t.motionMode,t.i18n)}
            ${t.trustedRuntimeAvailable?jr(t.trustedRuntimeEnabled,t.i18n):""}
          </details>
          ${qr(t,s)}
        </aside>
      </section>
    </main>
  `,Mr(e,t.publicDeck),Pr(e,t.actions)}function Qt(e,t,n){const r=t.messages.player;return`
    <header class="player-console-header">
      <div class="player-title-group">
        <img class="brand-icon player-brand-icon" src="/brand/deckx-icon.svg" alt="" aria-hidden="true" />
        <div>
          <span class="badge mono">DeckX PLAYER</span>
          <h1>DeckX Player</h1>
          <p>${u(e)}</p>
        </div>
      </div>
      <div class="player-header-actions">
        ${Rr(t)}
        ${n?`<a class="btn compact" href="${u(n)}">${u(r.projectHome)}</a>`:""}
      </div>
    </header>
  `}function Rr(e){return`
    <nav class="locale-switch" aria-label="${u(e.messages.locale.label)}">
      ${wr.map(t=>Cr(t,e)).join("")}
    </nav>
  `}function Cr(e,t){const n=e.toUpperCase();return`
    <a
      class="locale-link ${e===t.locale?"active":""}"
      href="${u(t.hrefForLocale(e))}"
      hreflang="${e}"
      aria-current="${e===t.locale?"page":"false"}"
      title="${u(t.messages.locale[e])}"
    >${n}</a>
  `}function en(e){const t=e.i18n.messages.player;return`
    <details class="player-source-menu" data-player-source-menu>
      <summary class="player-source-menu-summary">
        <span class="hamburger-lines" aria-hidden="true"></span>
        <span>${u(t.sourceMenu)}</span>
      </summary>
      <div class="player-source-menu-body">
        <div class="player-panel-heading">
          <span class="mono">SOURCE</span>
          <h2>${u(t.sourceHeading)}</h2>
        </div>
        ${e.actions.onOpenDeckxUrl?Ir(e.actions.deckxUrlValue??"",e.actions.deckxStatus??"",e.i18n):""}
        ${e.actions.onOpenDeckxFile?Nr(e.i18n):""}
        ${Xr(e.historyOptions,e.i18n)}
        ${e.demoOptions.length>0?Hr(e.demoOptions,e.i18n):""}
      </div>
    </details>
  `}function Mr(e,t){const n=e.querySelector("[data-player-preview]");if(!n)return;const r=ee(t,"player-preview-wrap"),s=r.querySelector(".slide-scaler");s&&(Q(s,t,0,"slideshow"),n.appendChild(r),window.requestAnimationFrame(pe))}function Pr(e,t){tn(e,t),e.querySelector('[data-action="start"]')?.addEventListener("click",t.onStart),e.querySelector('[data-action="presenter"]')?.addEventListener("click",t.onPresenterOnly),e.querySelector('[data-action="slideshow"]')?.addEventListener("click",t.onSlideshowOnly),e.querySelectorAll("[data-motion-mode]").forEach(n=>{n.addEventListener("click",()=>{t.onSetMotionMode(n.dataset.motionMode)})}),e.querySelector("[data-trusted-runtime-toggle]")?.addEventListener("change",n=>{const r=n.currentTarget;t.onSetTrustedRuntime(r.checked)})}function tn(e,t){Or(e);const n=e.querySelector("[data-deckx-url-form]");n?.addEventListener("submit",s=>{s.preventDefault();const i=n.querySelector("[data-deckx-url-input]")?.value.trim();i&&t.onOpenDeckxUrl?.(i)});const r=e.querySelector("[data-deckx-file-input]");r?.addEventListener("change",()=>{const s=r.files?.[0];s&&t.onOpenDeckxFile?.(s),r.value=""}),e.querySelectorAll("[data-action='select-local-deckx']").forEach(s=>{s.addEventListener("click",()=>r?.click())})}function Or(e){const t=window.matchMedia("(max-width: 640px)").matches;e.querySelectorAll("[data-player-source-menu]").forEach(n=>{t||(n.open=!0)})}function Ir(e,t,n){return`
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
          value="${u(e)}"
          aria-label="DeckX URL"
        />
        <button class="btn compact" type="submit">${u(n.messages.player.openUrl)}</button>
      </div>
      ${t?`<div class="deckx-url-status">${u(t)}</div>`:""}
    </form>
  `}function Nr(e){const t=e.messages.player;return`
    <div class="player-file-open">
      <span class="player-subhead mono">${u(t.localPackage)}</span>
      <input
        id="player-deckx-file"
        data-deckx-file-input
        class="visually-hidden"
        type="file"
        accept=".deckx,.zip,application/zip,application/x-zip-compressed"
        aria-label="DeckX zip file"
      />
      <button class="btn" type="button" data-action="select-local-deckx">${u(t.localZip)}</button>
    </div>
  `}function Xr(e,t){const n=t.messages.player;return`
    <section class="player-history-list" aria-label="Recently opened DeckX">
      <span class="player-subhead mono">${u(n.recentDeckx)}</span>
      ${e.length===0?`<p class="player-empty-copy">${u(n.noHistory)}</p>`:e.map(r=>Ur(r,t)).join("")}
    </section>
  `}function Ur(e,t){return e.kind==="url"&&e.href?`
      <a class="player-history-option" href="${u(e.href)}">
        <span>${u(e.label)}</span>
        <small>URL · ${u(e.detail)}</small>
      </a>
    `:`
    <button class="player-history-option as-button" type="button" data-action="select-local-deckx">
      <span>${u(e.label)}</span>
      <small>ZIP · ${u(e.detail)} · ${u(t.messages.player.zipNeedsReselect)}</small>
    </button>
  `}function Hr(e,t){return`
    <nav class="player-demo-list" aria-label="Explicit demo DeckX packages">
      <span class="player-subhead mono">${u(t.messages.player.officialSamples)}</span>
      ${e.map(n=>`
            <a class="player-demo-option ${n.active?"active":""}" href="${u(n.href)}" aria-current="${n.active?"page":"false"}">
              <span><em>DEMO</em>${u(n.label)}</span>
              <small>${u(n.description)}</small>
            </a>
          `).join("")}
    </nav>
  `}function Fr(e,t){const n=t.messages.player.motionDescriptions;return`
    <div class="player-motion-block">
      <span class="player-subhead mono">MOTION MODE</span>
      <div class="player-motion-segment" role="group" aria-label="Motion controls">
        ${[{id:"full",label:"Full",description:n.full},{id:"reduced",label:"Reduced",description:n.reduced},{id:"paused",label:"Paused",description:n.paused}].map(s=>`
              <button
                type="button"
                class="motion-mode ${s.id===e?"active":""}"
                data-motion-mode="${s.id}"
                aria-pressed="${s.id===e}"
                title="${u(s.description)}"
              >${u(s.label)}</button>
            `).join("")}
      </div>
    </div>
  `}function jr(e,t){const n=t.messages.player.trustedRuntime;return`
    <label class="player-trusted-runtime" title="${u(n.description)}">
      <span class="player-subhead mono">${u(n.heading)}</span>
      <span class="trusted-runtime-row">
        <input
          type="checkbox"
          data-trusted-runtime-toggle
          ${e?"checked":""}
          aria-label="${u(n.label)}"
        />
        <span>${u(n.label)}</span>
      </span>
    </label>
  `}function qr(e,t){const n=Ae(e.deck.aspectRatio),r=e.validationReport.notesCoverage,s=e.validationReport.errorCount>0?"BLOCKED":e.validationReport.warningCount>0?"WARNINGS":"READY";return`
    <details class="player-deckx-details">
      <summary>${u(e.i18n.messages.player.details)}</summary>
      <dl class="player-detail-list">
        ${M("SOURCE",`${sn(e.sourceKind,e.i18n)} · ${e.sourceLabel}`)}
        ${M("VALIDATION",`${s} · ${e.validationReport.errorCount} errors / ${e.validationReport.warningCount} warnings`)}
        ${M("NOTES",`${r.withNotes}/${r.total} notes · ${r.missing} missing`)}
        ${M("SESSION",e.sessionId)}
        ${M("DISPLAY",Kr(e.displayFilters))}
        ${M("CANVAS",`${rn(e.deck.aspectRatio)} · ${Wr(n)}`)}
        ${M("DURATION",nn(t))}
        ${Br(e.deck.metadata)}
      </dl>
      ${Vr(e.validationReport,e.i18n)}
    </details>
  `}function Br(e){if(!e)return"";const t=[];return e.description&&t.push(M("DESCRIPTION",e.description)),e.version&&t.push(M("VERSION",e.version)),e.authors?.length&&t.push(M("AUTHORS",_r(e))),e.tags?.length&&t.push(M("TAGS",e.tags.join(", "))),e.language&&t.push(M("LANGUAGE",e.language)),e.license&&t.push(M("LICENSE",e.license)),e.homepage&&t.push(M("HOMEPAGE",e.homepage)),e.repository&&t.push(M("REPOSITORY",e.repository)),e.generator?.name&&t.push(M("GENERATOR",Yr(e))),(e.createdAt||e.updatedAt)&&t.push(M("DATES",[e.createdAt,e.updatedAt].filter(Boolean).join(" / "))),t.join("")}function M(e,t){return`
    <div class="player-detail-row">
      <dt class="mono">${u(e)}</dt>
      <dd>${u(t)}</dd>
    </div>
  `}function Vr(e,t){return e.issues.length===0?`<p class="player-empty-copy">${u(t.messages.player.validationIssuesNone)}</p>`:`
    <div class="player-issue-list">
      ${e.issues.slice(0,4).map(n=>`
            <div class="player-issue" data-severity="${n.severity}">
              <strong>${u(n.code)}</strong>
              <span>${u(n.message)}</span>
            </div>
          `).join("")}
      ${e.issues.length>4?`<p>${u(t.messages.player.moreIssuesHidden(e.issues.length-4))}</p>`:""}
    </div>
  `}function zr(e){return typeof e.durationSec=="number"&&e.durationSec>0?e.durationSec:e.slides.reduce((t,n)=>t+(n.timingSec||0),0)}function nn(e){if(!e)return"No plan";const t=Math.floor(e/60),n=e%60;return t?n?`${t}m ${n}s`:`${t}m`:`${n}s`}function rn(e){return typeof e=="string"?e:`${e.width}:${e.height}`}function Wr(e){return`${e.width} x ${e.height}`}function Kr(e){return`B${e.brightness} C${e.contrast} S${e.saturation}`}function Gr(e){return e?e.tags?.length?e.tags.find(t=>t!=="stress"&&t!=="demo")??e.tags[0]:e.language?e.language:e.version?e.version:"present":"none"}function _r(e){return(e.authors??[]).map(t=>[t.name,t.role].filter(Boolean).join(" · ")).join(", ")}function Yr(e){return e.generator?[e.generator.name,e.generator.version].filter(Boolean).join(" "):""}function sn(e,t){return e==="demo"?t.messages.player.sourceKind.demo:e==="zip"?t.messages.player.sourceKind.zip:t.messages.player.sourceKind.url}function Jr(e){return e.replace(/<[^>]*>/g,"").replace(/\s+/g," ").trim()}function u(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}const lt=[{id:"script-first",name:"Script First",descriptionKey:"scriptFirst",layout:{presetId:"script-first",showCurrent:!0,showNext:!0,showNotes:!0,showOverview:!0,notesFontSize:22},grid:{columns:"140px minmax(0, 2fr) minmax(0, 1fr)",rows:"auto minmax(0, 1.2fr) minmax(0, 1fr) auto",areas:`
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
      `}}];function Zr(e,t,n,r,s){const o=yt(s.layout.presetId),i=cs(o.grid,s.layout.settingsOpen),c=s.layout.showCurrent||s.layout.showNext||s.layout.showNotes||s.layout.showOverview,h=window.matchMedia("(max-width: 760px)").matches,f=s.i18n.messages.presenter;e.innerHTML=`
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
              <div class="value mono pace-value" data-pace="${s.pace.state}" data-pace-label>${$(s.pace.label)}</div>
            </div>
          </div>
          <div class="topbar-group right">
            <span class="connection mono" title="${$(f.connectionTitle)}">
              <span class="status-dot" data-connection-dot data-connected="false"></span>
              <span data-connection>${s.connectionStatus}</span>
            </span>
            <button class="tool-btn" data-action="goto" title="${$(f.gotoTitle)}">Goto</button>
            <button class="tool-btn" data-action="search" title="${$(f.searchTitle)}">Search</button>
            <button class="tool-btn primary-tool" data-action="open" title="${$(f.openSlideshowTitle)}">${$(f.openSlideshow)}</button>
            ${es(s)}
            <button class="tool-btn" data-action="settings" title="${$(f.settingsTitle)}">${$(s.layout.settingsOpen?f.closePresets:f.viewPresets)}</button>
            <button class="tool-btn danger" data-action="exit">${$(f.exit)}</button>
          </div>
        </div>
        ${Qr(s,t)}
      </header>

      ${s.layout.settingsOpen?ts(s.layout,s.i18n):""}

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
                <span class="mono">SCRIPT${s.notesHasDraft?" · DRAFT":""}</span>
                <div class="mobile-notes-content" style="font-size:${Math.max(15,s.layout.notesFontSize-5)}px">${jt(s.notesText||f.noNotes)}</div>
              </div>
              <div class="mobile-nav-actions">
                <button class="btn compact" type="button" data-action="prev">${$(f.prev)}</button>
                <button class="btn compact primary" type="button" data-action="next">${$(f.next)}</button>
              </div>
            </section>`:""}

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
              <div class="notes-content" style="font-size:${s.layout.notesFontSize}px">${jt(s.notesText)}</div>
            </section>`:""}

      ${s.layout.showOverview?`<section class="panel overview">
              <div class="panel-label mono">SLIDE LIST</div>
              <div class="overview-list" data-overview></div>
            </section>`:""}

      ${c?"":`<section class="panel empty-presenter">
              <p>${$(f.emptyPanels)}</p>
            </section>`}

      <footer class="bottombar">
        <div class="nav-dots" data-dots></div>
        <div class="bottom-status mono">${$(s.windowStatus?.message||f.ready)}</div>
        <div class="timer-controls">
          <button class="btn compact" data-action="pause">${r.timer.status==="paused"?"Resume":"Pause"}</button>
          <button class="btn compact" data-action="reset">Reset</button>
        </div>
      </footer>
    </main>
  `;const v=e.querySelector(".presenter");v&&(v.dataset.preset=o.id,ls(v,i));const p=e.querySelector("[data-current]"),y=e.querySelector("[data-next]"),w=e.querySelector("[data-mobile-stage]"),T=e.querySelector("[data-mobile-current]"),R=e.querySelector("[data-mobile-next]");if(p){const S=ee(n);p.appendChild(S),Q(S.querySelector(".slide-scaler"),n,r.index,"presenter")}if(y){const S=ee(n);y.appendChild(S),Q(S.querySelector(".slide-scaler"),n,r.index+1,"presenter")}if(w){const S=ee(n,"mobile-stage-wrap");w.appendChild(S),Q(S.querySelector(".slide-scaler"),n,r.index,"slideshow")}if(T){const S=ee(n,"mobile-mini-wrap");T.appendChild(S),Q(S.querySelector(".slide-scaler"),n,r.index,"presenter")}if(R){const S=ee(n,"mobile-mini-wrap");R.appendChild(S),Q(S.querySelector(".slide-scaler"),n,r.index+1,"presenter")}ss(e,n,r.index,s.onGoto),as(e);const A=e.querySelector("[data-dots]");A&&n.slides.forEach((S,q)=>{const L=document.createElement("button");L.type="button",L.className=q===r.index?"active":"",L.textContent=String(q+1),L.addEventListener("click",()=>s.onGoto(q)),A.appendChild(L)}),rs(e,s),e.querySelector('[data-action="settings"]')?.addEventListener("click",()=>{s.onToggleSettings()}),e.querySelector('[data-action="goto"]')?.addEventListener("click",()=>{s.onOpenCommand("goto")}),e.querySelector('[data-action="search"]')?.addEventListener("click",()=>{s.onOpenCommand("search")}),e.querySelector('[data-action="prev"]')?.addEventListener("click",s.onPrev),e.querySelector('[data-action="next"]')?.addEventListener("click",s.onNext),e.querySelector('[data-action="motion"]')?.addEventListener("click",s.onCycleMotionMode),e.querySelector('[data-action="theme"]')?.addEventListener("click",s.onCycleRuntimeTheme),e.querySelector('[data-action="open"]')?.addEventListener("click",s.onOpenSlideshow),e.querySelector('[data-action="copy-url"]')?.addEventListener("click",s.onCopySlideshowUrl),e.querySelector('[data-action="exit"]')?.addEventListener("click",s.onExit),e.querySelector('[data-action="edit-notes"]')?.addEventListener("click",s.onEditNotes),e.querySelector('[data-action="export-notes"]')?.addEventListener("click",s.onExportNotes),e.querySelector('[data-action="wake-lock"]')?.addEventListener("click",s.onToggleWakeLock),e.querySelector('[data-action="mirror"]')?.addEventListener("click",s.onToggleMirror),e.querySelector('[data-action="pause"]')?.addEventListener("click",s.onPauseResume),e.querySelector('[data-action="reset"]')?.addEventListener("click",s.onResetTimer),pe()}function Qr(e,t){const n=e.windowStatus?.type??"idle",r=e.i18n.messages.presenter,s=e.validationReport.errorCount>0?`${e.validationReport.errorCount} errors`:`${e.validationReport.warningCount} warnings`,o=`${e.validationReport.notesCoverage.withNotes}/${e.validationReport.notesCoverage.total}`,i=e.validationReport.errorCount>0?"BLOCKED":e.connectionStatus==="CONNECTED"?"READY":"CHECK";return`
    <details class="readiness-detail">
      <summary>
        <span>${$(r.readiness.summary)}</span>
        <span class="readiness-summary-chip mono" data-readiness-state="${$(i.toLowerCase())}">${i}</span>
        <span class="readiness-summary-copy">SYNC ${$(e.connectionStatus)} · POPUP ${$(qt(n))} · VALIDATION ${$(s)}</span>
      </summary>
      <div class="readiness-row" aria-label="Presentation setup preflight">
        ${I("DECK",t.title,"",r.readiness.deck)}
        ${I("SESSION",us(e.sessionId),"",r.readiness.session)}
        ${I("POPUP",qt(n),n,r.readiness.popup)}
        ${I("SYNC",e.connectionStatus,"",r.readiness.sync)}
        ${I("FULLSCREEN",e.fullscreenActive?"ON":"OFF","",r.readiness.fullscreen)}
        ${I("MOTION",an(e.motionMode),"",r.readiness.motion)}
        ${I("THEME",on(e.runtimeTheme),"",r.readiness.theme)}
        ${I("PACE",e.pace.detail,e.pace.state,r.readiness.pace)}
        ${I("FILTER",ds(e.displayFilters),"",r.readiness.filter)}
        ${I("WAKE",e.wakeLockStatus,"",r.readiness.wake)}
        ${I("MIRROR",e.mirrorStatus,"",r.readiness.mirror)}
        ${I("VALIDATION",s,e.validationReport.errorCount>0?"error":"ok",r.readiness.validation)}
        ${I("NOTES",o,"",r.readiness.notes)}
      </div>
    </details>
  `}function I(e,t,n="",r=""){return`
    <span class="readiness-item" data-readiness-state="${$(n)}" title="${$(r)}">
      <span class="readiness-label mono">${$(e)}</span>
      <span class="readiness-value mono">${$(t)}</span>
      ${r?`<span class="readiness-description">${$(r)}</span>`:""}
    </span>
  `}function es(e){const t=e.i18n.messages.presenter.tools;return`
    <details class="presenter-tools-menu">
      <summary class="tool-btn">${$(t.label)}</summary>
      <div class="presenter-tools-panel">
        ${Se("motion",`Motion: ${an(e.motionMode)}`,t.motionDescription)}
        ${Se("theme",`${t.themeLabel}: ${on(e.runtimeTheme)}`,t.themeDescription)}
        ${Se("copy-url",t.copyUrl,t.copyUrlDescription)}
        ${Se("wake-lock","Keep Awake",t.wakeLockDescription)}
        ${Se("mirror","Audience Mirror",t.mirrorDescription)}
      </div>
    </details>
  `}function Se(e,t,n){return`
    <button class="tool-menu-control" type="button" data-action="${$(e)}">
      <strong>${$(t)}</strong>
      <span>${$(n)}</span>
    </button>
  `}function ts(e,t){return`
    <section class="panel layout-settings">
      <div class="preset-picker" role="radiogroup" aria-label="Presenter view presets">
        ${lt.map(n=>ns(n,e.presetId,t)).join("")}
      </div>
    </section>
  `}function ns(e,t,n){return`
    <button
      type="button"
      class="preset-card ${e.id===t?"active":""}"
      data-preset-id="${e.id}"
      aria-pressed="${e.id===t}"
    >
      <span class="preset-name">${e.name}</span>
      <span class="preset-description">${$(n.messages.presenter.presets[e.descriptionKey])}</span>
      <span class="preset-map preset-map-${e.id}"><span class="preset-map-extra"></span></span>
    </button>
  `}function rs(e,t){e.querySelectorAll("[data-preset-id]").forEach(n=>{n.addEventListener("click",()=>{const r=n.dataset.presetId;t.onSelectPreset(r)})})}function ss(e,t,n,r){const s=e.querySelector("[data-overview]");s&&t.slides.forEach((o,i)=>{const c=document.createElement("button");c.type="button",c.className=`overview-item ${i===n?"active":""}`,c.setAttribute("aria-label",`Slide ${i+1}: ${is(o.title||o.id)}`),c.addEventListener("click",()=>r(i)),c.addEventListener("keydown",y=>{const w=os(y.key);if(w===0)return;y.preventDefault(),y.stopPropagation();const T=Array.from(s.querySelectorAll(".overview-item")),R=T.indexOf(c),A=Math.max(0,Math.min(T.length-1,R+w));T[A]?.focus()});const h=document.createElement("div"),f=Ae(t.aspectRatio);h.className="overview-thumb",h.style.aspectRatio=`${f.width} / ${f.height}`;const v=document.createElement("div");v.className="overview-mini-slide",v.appendChild(Zt(t,i,"presenter")),h.appendChild(v);const p=document.createElement("span");p.className="overview-number mono",p.textContent=String(i+1).padStart(2,"0"),c.append(h,p),s.appendChild(c)})}function as(e){e.querySelectorAll(".overview-thumb").forEach(t=>{const n=t.querySelector(".slide"),r=Number.parseFloat(n?.style.width||"1280"),s=t.clientWidth/r;t.style.setProperty("--overview-thumb-scale",String(s))})}function is(e){return e.replace(/<[^>]*>/g,"")}function os(e){return e==="ArrowDown"||e==="ArrowRight"?1:e==="ArrowUp"||e==="ArrowLeft"?-1:0}function ls(e,t){Object.entries(t).forEach(([n,r])=>{e.style.setProperty(n,r)})}function yt(e){return lt.find(t=>t.id===e)??lt[0]}function cs(e,t){if(!t)return Ft(e.columns,e.rows,e.areas);const n=e.areas.trim().split(`
`).map(o=>o.trim()).find(Boolean),r=n?n.replaceAll('"',"").trim().split(/\s+/).length:1,s=`"${Array.from({length:r},()=>"settings").join(" ")}"`;return Ft(e.columns,e.rows.replace(/^auto\s+/,"auto auto "),e.areas.trim().replace(/^"[^"]+"/,`$&
${s}`))}function Ft(e,t,n){return{"grid-template-columns":e,"grid-template-rows":t,"grid-template-areas":n}}function jt(e){return $(e).replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>").replace(/\n/g,"<br />")}function an(e){return e==="reduced"?"Reduced":e==="paused"?"Paused":"Full"}function on(e){return e==="dark"?"Dark":"Light"}function ds(e){return`${e.brightness}/${e.contrast}/${e.saturation}`}function qt(e){return e==="opened"?"OPENED":e==="popup-blocked"?"BLOCKED":e==="opening"?"OPENING":e==="window-management-denied"?"DENIED":e==="window-management-unavailable"?"FALLBACK":"READY"}function us(e){return e.length<=12?e:`${e.slice(0,6)}...${e.slice(-4)}`}function $(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function ps(e,t,n,r){const s=r.i18n.messages.slideshow;e.innerHTML=`
    <main class="slideshow-stage" data-runtime-theme="${r.runtimeTheme}">
      <div data-slide-host style="${hs(r.displayFilters)}"></div>
      <div class="slideshow-toolbar" aria-label="${Ne(s.controls)}">
        <button class="fullscreen-btn" data-action="fullscreen">
          ${Ne(document.fullscreenElement?s.exitFullscreen:s.enterFullscreen)}
        </button>
        <button class="theme-toggle-btn" data-action="theme">
          Theme: ${fs(r.runtimeTheme)}
        </button>
        <button class="motion-toggle-btn" data-action="motion">
          Motion: ${ms(r.motionMode)}
        </button>
        <button class="display-filter-toggle-btn" data-action="display-filters" aria-expanded="${r.displayFiltersOpen}">
          ${Ne(s.display)}
        </button>
      </div>
      ${r.displayFiltersOpen?`<div class="display-filter-panel" aria-label="${Ne(s.displayFilters)}">
              ${Ze("brightness",s.brightness,r.displayFilters.brightness)}
              ${Ze("contrast",s.contrast,r.displayFilters.contrast)}
              ${Ze("saturation",s.saturation,r.displayFilters.saturation)}
            </div>`:""}
      <div class="fullscreen-status mono" data-fullscreen-status></div>
    </main>
  `;const o=e.querySelector("[data-slide-host]");if(o){const i=ee(t,"slideshow-wrap");o.appendChild(i),Q(i.querySelector(".slide-scaler"),t,n.index,"slideshow")}e.querySelector('[data-action="fullscreen"]')?.addEventListener("click",r.onFullscreen),e.querySelector('[data-action="motion"]')?.addEventListener("click",r.onCycleMotionMode),e.querySelector('[data-action="theme"]')?.addEventListener("click",r.onCycleRuntimeTheme),e.querySelector('[data-action="display-filters"]')?.addEventListener("click",r.onToggleDisplayFilters),e.querySelectorAll("[data-filter-key]").forEach(i=>{i.addEventListener("input",()=>{const c=i.dataset.filterKey;r.onSetDisplayFilter(c,Number(i.value))})}),e.querySelector(".slideshow-stage")?.addEventListener("click",i=>{const c=i.target;c instanceof HTMLElement&&c.closest("button, input, label")||r.onNext()}),e.querySelector(".slideshow-stage")?.addEventListener("contextmenu",i=>{i.preventDefault(),r.onPrev()}),pe()}function ms(e){return e==="reduced"?"Reduced":e==="paused"?"Paused":"Full"}function fs(e){return e==="dark"?"Dark":"Light"}function Ze(e,t,n){return`
    <label class="filter-control">
      <span class="mono">${t}</span>
      <input type="range" min="60" max="140" step="1" value="${n}" data-filter-key="${e}" />
    </label>
  `}function hs(e){return`filter: brightness(${e.brightness}%) contrast(${e.contrast}%) saturate(${e.saturation}%);`}function Ne(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}const $e=6e3,Ee={brightness:100,contrast:100,saturation:100},Bt="light",Vt="trusted",Qe={presetId:"script-first",showCurrent:!0,showNext:!0,showNotes:!0,showOverview:!0,notesFontSize:22,settingsOpen:!1};function gs(e,t){const n=tr(e),r=Gn(e),s=t.mount,o=t.i18n??He();let i=ys(),c=ws(e.id),h=bs(e.id),f=Ss(e.id),v=Ds(e.id),p=!!t.trustedRuntimeEnabled;const y=new fr(t.trustedRuntimeScripts??[]);let w=null,T=!1,R="",A=!1,S="",q=!1,L="off",H=null,P="off",V=null,me=c==="paused"?"full":c,d=_(xs(t.mode),Ts(t.sessionId));return window.addEventListener("resize",pe),document.addEventListener("keydown",ve),document.addEventListener("fullscreenchange",b),document.addEventListener("visibilitychange",Ct),he(d),b(),{destroy:Ve,getSessionId:()=>d.sessionId};function _(a,l){const g=ot("sender"),D=cr(e.id,l,n.slides.length),O=fe(l,g,a),k={mode:a,sessionId:l,senderId:g,store:D,transport:O,unsubscribeStore:()=>{},unsubscribeTransport:()=>{},tickTimer:null,heartbeatTimer:null,lastWindowStatus:null};return k.unsubscribeStore=D.subscribe(b),k.unsubscribeTransport=O.subscribe(Je=>J(k,Je)),k.tickTimer=window.setInterval(ge,250),k}function fe(a,l,g){return g==="landing"?new Xt:"BroadcastChannel"in window?new dr({deckId:e.id,sessionId:a,senderId:l,from:g==="slideshow"?"slideshow":"presenter"}):new Xt("BroadcastChannel is not supported in this browser.")}function C(a,l=d.sessionId){Pe(d),d=_(a,l),he(d),As(a,l),b()}function he(a){a.mode==="slideshow"&&(ne(a),a.transport.send({type:"hello",wantsState:!0})),a.mode==="presenter"&&(a.store.startTimer(),W(a),K(a))}function Pe(a){a.unsubscribeStore(),a.unsubscribeTransport(),a.transport.close(),a.tickTimer!==null&&window.clearInterval(a.tickTimer),a.heartbeatTimer!==null&&window.clearInterval(a.heartbeatTimer)}function Ve(){Pe(d),y.destroy(),window.removeEventListener("resize",pe),document.removeEventListener("keydown",ve),document.removeEventListener("fullscreenchange",b),document.removeEventListener("visibilitychange",Ct),Rt(),Mt()}function b(){if(document.body.dataset.mode=d.mode,document.body.dataset.motion=c,document.body.dataset.runtimeTheme=h,p&&y.cleanup(),d.mode==="landing"){Ar(s,{i18n:o,deck:e,publicDeck:n,sessionId:d.sessionId,sourceUrl:t.deckxUrlValue??"",sourceKind:t.sourceKind??"url",sourceLabel:t.sourceLabel??t.deckxUrlValue??e.id,validationReport:r,motionMode:c,displayFilters:f,trustedRuntimeAvailable:y.available,trustedRuntimeEnabled:p,demoOptions:t.demoOptions??[],historyOptions:t.historyOptions??[],actions:{onStart:()=>Y(),onPresenterOnly:()=>C("presenter",d.sessionId),onSlideshowOnly:()=>C("slideshow",d.sessionId),onSetMotionMode:a=>ce(a),onSetTrustedRuntime:Pn,onOpenDeckxUrl:t.onOpenDeckxUrl,onOpenDeckxFile:t.onOpenDeckxFile,deckxUrlValue:t.deckxUrlValue,deckxStatus:t.deckxStatus,homeHref:t.homeHref}}),Ye(),We();return}if(d.mode==="presenter"){Zr(s,e,n,d.store.getState(),{i18n:o,connectionStatus:we(),windowStatus:d.lastWindowStatus,sessionId:d.sessionId,fullscreenActive:!!document.fullscreenElement,pace:Dt(),notesText:_e(d.store.getState().index),notesHasDraft:Un(d.store.getState().index),validationReport:r,displayFilters:f,wakeLockStatus:Ls(L),mirrorStatus:Gt(P),layout:i,runtimeTheme:h,onNext:()=>x("next"),onPrev:()=>x("prev"),onGoto:a=>x("goto",a),onOpenCommand:a=>Ke(a),onEditNotes:()=>Lt(),onExportNotes:()=>Fn(),onPauseResume:()=>oe(d.store.getState().timer.status==="paused"?"resume":"pause"),onResetTimer:()=>oe("reset"),onOpenSlideshow:()=>te(),onCopySlideshowUrl:()=>jn(),onExit:()=>Oe(),onSelectPreset:Ie,onToggleSettings:ze,onToggleWakeLock:()=>qn(),onToggleMirror:()=>Bn(),onCycleRuntimeTheme:kt,motionMode:c,onCycleMotionMode:ke}),Ye(),We();return}ps(s,n,d.store.getState(),{i18n:o,onNext:()=>x("next"),onPrev:()=>x("prev"),onFullscreen:()=>be(),motionMode:c,onCycleMotionMode:ke,runtimeTheme:h,onCycleRuntimeTheme:kt,displayFilters:f,displayFiltersOpen:A,onToggleDisplayFilters:()=>{A=!A,b()},onSetDisplayFilter:Mn}),Ye(),We()}async function Y(){if(Yn()){C("presenter",d.sessionId),d.lastWindowStatus={type:"idle",message:o.messages.runtime.mobileCombined},b();return}C("presenter",d.sessionId),await te()}async function te(){d.lastWindowStatus={type:"opening",message:o.messages.runtime.openingSlideshow},b();const a=await gr({sessionId:d.sessionId,display:t.display??"auto",i18n:o,deckUrl:t.slideshowDeckUrl,onStatus:l=>{d.lastWindowStatus=l,b()}});d.lastWindowStatus=a.status,b()}function Oe(){d.transport.send({type:"close-slideshow"}),C("landing",ot("session"))}function x(a,l){if(d.mode!=="landing"){if(d.mode==="presenter"){le(d.store,a,l),W(d);return}d.transport.send({type:"nav-request",action:a,index:l}),d.store.isPeerConnected($e)||le(d.store,a,l)}}function oe(a){if(d.mode==="presenter"){d.store.applyTimerCommand(a),W(d);return}d.transport.send({type:"timer-command",action:a})}function W(a){a.mode==="presenter"&&a.transport.send({type:"state-snapshot",state:a.store.getPublicState()})}function K(a){a.mode!=="landing"&&a.transport.send({type:"runtime-preferences",motionMode:c,displayFilters:f,runtimeTheme:h})}function J(a,l){switch(a.store.markPeerSeen(),l.body.type){case"hello":a.mode==="presenter"&&(W(a),K(a));break;case"state-snapshot":a.mode==="slideshow"&&l.from==="presenter"&&a.store.applySnapshot(l.body.state);break;case"nav-request":a.mode==="presenter"&&(le(a.store,l.body.action,l.body.index),W(a));break;case"timer-command":a.mode==="presenter"&&(a.store.applyTimerCommand(l.body.action),W(a));break;case"runtime-preferences":ce(l.body.motionMode,{publish:!1}),l.body.displayFilters&&St(l.body.displayFilters,{publish:!1}),l.body.runtimeTheme&&$t(l.body.runtimeTheme,{publish:!1});break;case"ping":a.transport.send({type:"pong",stateVersion:a.store.getState().stateVersion}),a.mode==="presenter"&&W(a);break;case"pong":break;case"close-slideshow":a.mode==="slideshow"&&(window.close(),s.innerHTML=`<div class="system-message">${G(o.messages.runtime.slideshowClosed)}</div>`);break}}function le(a,l,g){l==="next"&&a.goto(a.getState().index+1),l==="prev"&&a.goto(a.getState().index-1),l==="goto"&&typeof g=="number"&&a.goto(g)}function ne(a){a.heartbeatTimer=window.setInterval(()=>{a.transport.send({type:"ping"}),a.store.isPeerConnected($e)||a.transport.send({type:"hello",wantsState:!0})},1e3)}function ge(){d.mode!=="landing"&&(d.store.refreshPeer($e),ye())}function ye(){const a=document.querySelector("[data-clock]");a&&(a.textContent=Es(new Date));const l=document.querySelector("[data-elapsed]");l&&(l.textContent=d.store.getElapsedLabel());const g=Dt(),D=document.querySelector("[data-pace-label]");D&&(D.textContent=g.label,D.dataset.pace=g.state);const O=document.querySelector("[data-connection]");O&&(O.textContent=we());const k=document.querySelector("[data-connection-dot]");k&&(k.dataset.connected=String(d.store.isPeerConnected($e)))}function we(){return"BroadcastChannel"in window?d.store.isPeerConnected($e)?"CONNECTED":"DISCONNECTED":"UNSUPPORTED"}function Ie(a){const l=yt(a);i=ct({...l.layout,settingsOpen:i.settingsOpen}),zt(i),b()}function ze(){i=ct({...i,settingsOpen:!i.settingsOpen}),zt(i),b()}function ve(a){if(d.mode!=="landing"&&!Cs(a.target)){if(a.key==="ArrowRight"||a.key===" "||a.key==="PageDown"){a.preventDefault(),x("next");return}if(a.key==="ArrowLeft"||a.key==="PageUp"){a.preventDefault(),x("prev");return}if(a.key==="Home"){a.preventDefault(),x("goto",0);return}if(a.key==="End"){a.preventDefault(),x("goto",n.slides.length-1);return}if(a.key.toLowerCase()==="f"){a.preventDefault(),be();return}if(a.key.toLowerCase()==="r"){a.preventDefault(),oe("reset");return}if(a.key.toLowerCase()==="p"){a.preventDefault(),oe(d.store.getState().timer.status==="paused"?"resume":"pause");return}if(a.key.toLowerCase()==="m"){a.preventDefault(),Cn();return}if(a.key.toLowerCase()==="g"){a.preventDefault(),Ke("goto");return}if(a.key==="/"){a.preventDefault(),Ke("search");return}a.key.toLowerCase()==="n"&&d.mode==="presenter"&&(a.preventDefault(),Lt())}}function be(){if(document.fullscreenElement){document.exitFullscreen().catch(()=>{});return}document.documentElement.requestFullscreen({navigationUI:"hide"}).catch(()=>{const a=document.querySelector("[data-fullscreen-status]");a&&(a.textContent=o.messages.runtime.fullscreenFailed)})}function ke(){if(c==="full"){ce("reduced");return}if(c==="reduced"){ce("paused");return}ce("full")}function kt(){$t(h==="light"?"dark":"light")}function Cn(){ce(c==="paused"?me:"paused")}function ce(a,l={}){a!=="paused"&&(me=a),a!==c&&(c=a,vs(e.id,c),document.body.dataset.motion=c,l.publish!==!1&&K(d),b())}function Mn(a,l){St({...f,[a]:Ue(l,60,140)})}function St(a,l={}){f=ln(a),$s(e.id,f),l.publish!==!1&&K(d),b()}function $t(a,l={}){a!==h&&(h=a,ks(e.id,h),document.body.dataset.runtimeTheme=h,l.publish!==!1&&K(d),b())}function Pn(a){y.available&&(p=a,Rs(a),a||y.cleanup(),b())}function We(){if(!p||!y.available)return;const a=On();a&&y.mount(a).catch(l=>{y.cleanup(),S=l instanceof Error?l.message:String(l),Ot()})}function On(){return d.mode==="landing"?s.querySelector("[data-player-preview]"):d.mode==="slideshow"?s.querySelector("[data-slide-host]"):s.querySelector("[data-mobile-stage]")||s.querySelector("[data-current]")||s.querySelector("[data-next]")}function Dt(){const a=d.store.getState(),l=In();if(!l)return{label:"NO PLAN",detail:"NO PLAN",state:"none"};const g=_t(a.timer)/1e3,D=Et(a.index),O=Et(a.index+1),k=20;return g<D-k?{label:"AHEAD",detail:`${Kt(g-D)} vs plan`,state:"ahead"}:g>O+k?{label:"BEHIND",detail:`${Kt(g-O)} vs plan`,state:"behind"}:{label:"ON TRACK",detail:`${dt(g)} / ${dt(l)}`,state:"on-track"}}function In(){if(typeof e.durationSec=="number"&&e.durationSec>0)return e.durationSec;const a=e.slides.reduce((l,g)=>l+(g.timingSec||0),0);return a>0?a:0}function Et(a){const l=e.durationSec&&e.slides.length>0?e.durationSec/e.slides.length:0;return e.slides.slice(0,a).reduce((g,D)=>g+(D.timingSec||l),0)}function Ke(a){w={mode:a,query:a==="goto"?String(d.store.getState().index+1):""},b()}function Nn(){w=null,b()}function Xn(){if(!w)return;if(w.mode==="goto"){const l=Number.parseInt(w.query,10);Number.isFinite(l)&&x("goto",l-1),w=null,b();return}const a=Ge(w.query)[0];a&&x("goto",a.index),w=null,b()}function Ge(a){const l=a.trim().toLowerCase();return l?e.slides.map((g,D)=>({index:D,title:et(g.title||g.id||`Slide ${D+1}`),notes:g.notes||"",haystack:[g.title,g.body,g.notes,g.id].filter(Boolean).join(" ").toLowerCase()})).filter(g=>g.haystack.includes(l)).slice(0,8):[]}function _e(a){const l=e.slides[a];return l?v[l.id]??l.notes??"":""}function Un(a){const l=e.slides[a];return!!(l&&Object.prototype.hasOwnProperty.call(v,l.id))}function Lt(){R=_e(d.store.getState().index),T=!0,b()}function xt(){T=!1,b()}function Tt(){const a=e.slides[d.store.getState().index];a&&(v={...v,[a.id]:R},Wt(e.id,v),T=!1,S=o.messages.runtime.notesSaved,b())}function Hn(){const a=e.slides[d.store.getState().index];if(!a)return;const l={...v};delete l[a.id],v=l,Wt(e.id,v),R=a.notes||"",T=!1,S=o.messages.runtime.notesReset,b()}function Fn(){const a=[`# ${e.title} Speaker Notes`,"",...e.slides.flatMap((O,k)=>[`## ${k+1}. ${et(O.title||O.id)}`,"",_e(k)||"_No speaker notes._",""])].join(`
`),l=new Blob([a],{type:"text/markdown;charset=utf-8"}),g=URL.createObjectURL(l),D=document.createElement("a");D.href=g,D.download=`${e.id}-speaker-notes.md`,D.click(),URL.revokeObjectURL(g),S=o.messages.runtime.notesExported,b()}async function jn(){const a=Kn();try{await navigator.clipboard?.writeText(a),S=o.messages.runtime.slideshowUrlCopied}catch{S=a}b()}async function qn(){if(H){q=!1,await Rt(),L="off",b();return}q=!0,await At(),b()}async function At(){const a=navigator;if(!a.wakeLock){L="unsupported";return}try{H=await a.wakeLock.request("screen"),L="active",H.addEventListener("release",()=>{H=null,L="off",b()})}catch{H=null,L="denied"}}async function Rt(){const a=H;H=null,a&&await a.release().catch(()=>{})}function Ct(){document.visibilityState==="visible"&&q&&!H&&At().then(b)}async function Bn(){if(V||P==="fallback"){Mt(),P="off",b();return}const a=navigator,l=a.mediaDevices?.getDisplayMedia;if(!l){P="fallback",b();return}try{V=await l.call(a.mediaDevices,{video:!0,audio:!1}),P="active"}catch{P="fallback"}b()}function Mt(){V?.getTracks().forEach(a=>a.stop()),V=null}function Ye(){w&&Vn(),T&&zn(),d.mode==="presenter"&&P!=="off"&&Wn(),S&&Ot()}function Vn(){if(!w)return;const a=w.mode==="search"?Ge(w.query):[],l=w.mode==="goto"?"Go to slide":"Search slides",g=w.mode==="goto"?"Slide number":"Title, body, or notes";s.insertAdjacentHTML("beforeend",`
        <div class="command-overlay" role="dialog" aria-modal="true" aria-label="${l}">
          <div class="command-box">
            <div class="command-title mono">${l}</div>
            <input class="command-input" data-command-input value="${G(w.query)}" placeholder="${g}" />
            <div class="command-results">
              ${w.mode==="search"?a.map(k=>Pt(k.index,k.title,k.notes)).join("")||`<div class="command-empty">${G(o.messages.runtime.searchEmpty)}</div>`:`<div class="command-empty">${G(o.messages.runtime.gotoEmpty(n.slides.length))}</div>`}
            </div>
          </div>
        </div>
      `);const D=s.querySelector("[data-command-input]");window.requestAnimationFrame(()=>{D?.focus(),D?.setSelectionRange(0,D.value.length)}),D?.addEventListener("input",()=>{w={...w,query:D.value},O()}),D?.addEventListener("keydown",k=>{k.key==="Escape"&&(k.preventDefault(),Nn()),k.key==="Enter"&&(k.preventDefault(),Xn())}),s.querySelectorAll("[data-command-goto]").forEach(k=>{k.addEventListener("click",()=>{x("goto",Number(k.dataset.commandGoto)),w=null,b()})});function O(){if(w?.mode!=="search")return;const k=s.querySelector(".command-results");if(!k)return;const Je=Ge(w.query);k.innerHTML=Je.map(de=>Pt(de.index,de.title,de.notes)).join("")||`<div class="command-empty">${G(o.messages.runtime.searchEmpty)}</div>`,k.querySelectorAll("[data-command-goto]").forEach(de=>{de.addEventListener("click",()=>{x("goto",Number(de.dataset.commandGoto)),w=null,b()})})}}function Pt(a,l,g){const D=et(g).slice(0,86);return`
      <button class="command-result" data-command-goto="${a}" type="button">
        <span class="mono">${String(a+1).padStart(2,"0")}</span>
        <span>${G(l)}</span>
        <small>${G(D)}</small>
      </button>
    `}function zn(){s.insertAdjacentHTML("beforeend",`
        <div class="command-overlay" role="dialog" aria-modal="true" aria-label="Speaker notes editor">
          <div class="notes-editor-box">
            <div class="command-title mono">Speaker Notes Draft</div>
            <textarea class="notes-editor" data-notes-editor>${G(R)}</textarea>
            <div class="modal-actions">
              <button class="btn compact" data-action="notes-cancel">Cancel</button>
              <button class="btn compact" data-action="notes-reset">Reset</button>
              <button class="btn compact primary" data-action="notes-save">Save Draft</button>
            </div>
          </div>
        </div>
      `);const a=s.querySelector("[data-notes-editor]");window.requestAnimationFrame(()=>a?.focus()),a?.addEventListener("input",()=>{R=a.value}),a?.addEventListener("keydown",l=>{l.key==="Escape"&&(l.preventDefault(),xt()),l.key==="Enter"&&(l.metaKey||l.ctrlKey)&&(l.preventDefault(),Tt())}),s.querySelector('[data-action="notes-cancel"]')?.addEventListener("click",xt),s.querySelector('[data-action="notes-reset"]')?.addEventListener("click",Hn),s.querySelector('[data-action="notes-save"]')?.addEventListener("click",Tt)}function Wn(){s.insertAdjacentHTML("beforeend",`
        <aside class="audience-mirror">
          <div class="mirror-header mono">AUDIENCE MIRROR · ${Gt(P)}</div>
          <div class="mirror-body" data-mirror-body></div>
        </aside>
      `);const a=s.querySelector("[data-mirror-body]");if(!a)return;if(P==="active"&&V){const g=document.createElement("video");g.autoplay=!0,g.muted=!0,g.playsInline=!0,g.srcObject=V,a.appendChild(g);return}const l=ee(n,"mirror-fallback-wrap");a.appendChild(l),Q(l.querySelector(".slide-scaler"),n,d.store.getState().index,"presenter"),pe()}function Ot(){s.insertAdjacentHTML("beforeend",`<div class="transient-status mono" data-transient-status>${G(S)}</div>`),window.setTimeout(()=>{S="",document.querySelector("[data-transient-status]")?.remove()},2400)}function Kn(){const a=new URL(window.location.href);return a.hash="slideshow",a.searchParams.set("sessionId",d.sessionId),t.slideshowDeckUrl&&a.searchParams.set("deck",t.slideshowDeckUrl),a.toString()}}function ys(){try{const e=window.localStorage.getItem("deckx-player:layout");return e?ct({...Qe,...JSON.parse(e)}):Qe}catch{return Qe}}function zt(e){try{window.localStorage.setItem("deckx-player:layout",JSON.stringify(e))}catch{return}}function ws(e){try{const t=window.localStorage.getItem(`deckx-player:${e}:motion`)||window.localStorage.getItem("deckx-player:motion");if(t==="full"||t==="reduced"||t==="paused")return t}catch{return"full"}return"full"}function vs(e,t){try{window.localStorage.setItem(`deckx-player:${e}:motion`,t)}catch{return}}function bs(e){try{const t=window.localStorage.getItem(`deckx-player:${e}:runtime-theme`)||window.localStorage.getItem("deckx-player:runtime-theme");if(t==="light"||t==="dark")return t}catch{return Bt}return Bt}function ks(e,t){try{window.localStorage.setItem(`deckx-player:${e}:runtime-theme`,t)}catch{return}}function Ss(e){try{const t=window.localStorage.getItem(`deckx-player:${e}:display-filters`);return t?ln(JSON.parse(t)):Ee}catch{return Ee}}function $s(e,t){try{window.localStorage.setItem(`deckx-player:${e}:display-filters`,JSON.stringify(t))}catch{return}}function ln(e){return{brightness:Ue(e.brightness??Ee.brightness,60,140),contrast:Ue(e.contrast??Ee.contrast,60,140),saturation:Ue(e.saturation??Ee.saturation,60,140)}}function Ds(e){try{const t=window.localStorage.getItem(`deckx-player:${e}:notes-drafts`);if(!t)return{};const n=JSON.parse(t);return Object.fromEntries(Object.entries(n).filter(r=>typeof r[1]=="string"))}catch{return{}}}function Wt(e,t){try{window.localStorage.setItem(`deckx-player:${e}:notes-drafts`,JSON.stringify(t))}catch{return}}function ct(e){return{...yt(e.presetId).layout,settingsOpen:!!e.settingsOpen}}function Es(e){const t=String(e.getHours()).padStart(2,"0"),n=String(e.getMinutes()).padStart(2,"0"),r=String(e.getSeconds()).padStart(2,"0");return`${t}:${n}:${r}`}function dt(e){const t=Math.max(0,Math.floor(e)),n=Math.floor(t/60),r=t%60;return`${String(n).padStart(2,"0")}:${String(r).padStart(2,"0")}`}function Kt(e){return`${e>=0?"+":"-"}${dt(Math.abs(e))}`}function Ls(e){return e==="active"?"ACTIVE":e==="unsupported"?"UNSUPPORTED":e==="denied"?"DENIED":"OFF"}function Gt(e){return e==="active"?"ACTIVE":e==="fallback"?"FALLBACK":e==="unsupported"?"UNSUPPORTED":e==="denied"?"DENIED":"OFF"}function et(e){return e.replace(/<[^>]*>/g,"")}function G(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Ue(e,t,n){return Number.isFinite(e)?Math.min(n,Math.max(t,Math.round(e))):t}function xs(e){if(e)return e;const t=window.location.hash.replace("#",""),r=new URLSearchParams(window.location.search).get("mode")||t;return r==="presenter"||r==="slideshow"||r==="landing"?r:"landing"}function Ts(e){return e||new URLSearchParams(window.location.search).get("sessionId")||ot("session")}function As(e,t){const n=new URL(window.location.href);n.hash=e,n.searchParams.set("sessionId",t),window.history.replaceState({},"",n.toString())}function Rs(e){const t=new URL(window.location.href);e?t.searchParams.set(Vt,"1"):t.searchParams.delete(Vt),window.history.replaceState({},"",t.toString())}function Cs(e){return e instanceof HTMLElement?e.isContentEditable||["INPUT","TEXTAREA","SELECT"].includes(e.tagName):!1}var X=Uint8Array,ue=Uint16Array,Ms=Int32Array,cn=new X([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),dn=new X([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),Ps=new X([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),un=function(e,t){for(var n=new ue(31),r=0;r<31;++r)n[r]=t+=1<<e[r-1];for(var s=new Ms(n[30]),r=1;r<30;++r)for(var o=n[r];o<n[r+1];++o)s[o]=o-n[r]<<5|r;return{b:n,r:s}},pn=un(cn,2),mn=pn.b,Os=pn.r;mn[28]=258,Os[258]=28;var Is=un(dn,0),Ns=Is.b,ut=new ue(32768);for(var E=0;E<32768;++E){var Z=(E&43690)>>1|(E&21845)<<1;Z=(Z&52428)>>2|(Z&13107)<<2,Z=(Z&61680)>>4|(Z&3855)<<4,ut[E]=((Z&65280)>>8|(Z&255)<<8)>>1}var Le=(function(e,t,n){for(var r=e.length,s=0,o=new ue(t);s<r;++s)e[s]&&++o[e[s]-1];var i=new ue(t);for(s=1;s<t;++s)i[s]=i[s-1]+o[s-1]<<1;var c;if(n){c=new ue(1<<t);var h=15-t;for(s=0;s<r;++s)if(e[s])for(var f=s<<4|e[s],v=t-e[s],p=i[e[s]-1]++<<v,y=p|(1<<v)-1;p<=y;++p)c[ut[p]>>h]=f}else for(c=new ue(r),s=0;s<r;++s)e[s]&&(c[s]=ut[i[e[s]-1]++]>>15-e[s]);return c}),Re=new X(288);for(var E=0;E<144;++E)Re[E]=8;for(var E=144;E<256;++E)Re[E]=9;for(var E=256;E<280;++E)Re[E]=7;for(var E=280;E<288;++E)Re[E]=8;var fn=new X(32);for(var E=0;E<32;++E)fn[E]=5;var Xs=Le(Re,9,1),Us=Le(fn,5,1),tt=function(e){for(var t=e[0],n=1;n<e.length;++n)e[n]>t&&(t=e[n]);return t},B=function(e,t,n){var r=t/8|0;return(e[r]|e[r+1]<<8)>>(t&7)&n},nt=function(e,t){var n=t/8|0;return(e[n]|e[n+1]<<8|e[n+2]<<16)>>(t&7)},Hs=function(e){return(e+7)/8|0},wt=function(e,t,n){return(t==null||t<0)&&(t=0),(n==null||n>e.length)&&(n=e.length),new X(e.subarray(t,n))},Fs=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],N=function(e,t,n){var r=new Error(t||Fs[e]);if(r.code=e,Error.captureStackTrace&&Error.captureStackTrace(r,N),!n)throw r;return r},js=function(e,t,n,r){var s=e.length,o=r?r.length:0;if(!s||t.f&&!t.l)return n||new X(0);var i=!n,c=i||t.i!=2,h=t.i;i&&(n=new X(s*3));var f=function(ve){var be=n.length;if(ve>be){var ke=new X(Math.max(be*2,ve));ke.set(n),n=ke}},v=t.f||0,p=t.p||0,y=t.b||0,w=t.l,T=t.d,R=t.m,A=t.n,S=s*8;do{if(!w){v=B(e,p,1);var q=B(e,p+1,3);if(p+=3,q)if(q==1)w=Xs,T=Us,R=9,A=5;else if(q==2){var V=B(e,p,31)+257,me=B(e,p+10,15)+4,d=V+B(e,p+5,31)+1;p+=14;for(var _=new X(d),fe=new X(19),C=0;C<me;++C)fe[Ps[C]]=B(e,p+C*3,7);p+=me*3;for(var he=tt(fe),Pe=(1<<he)-1,Ve=Le(fe,he,1),C=0;C<d;){var b=Ve[B(e,p,Pe)];p+=b&15;var L=b>>4;if(L<16)_[C++]=L;else{var Y=0,te=0;for(L==16?(te=3+B(e,p,3),p+=2,Y=_[C-1]):L==17?(te=3+B(e,p,7),p+=3):L==18&&(te=11+B(e,p,127),p+=7);te--;)_[C++]=Y}}var Oe=_.subarray(0,V),x=_.subarray(V);R=tt(Oe),A=tt(x),w=Le(Oe,R,1),T=Le(x,A,1)}else N(1);else{var L=Hs(p)+4,H=e[L-4]|e[L-3]<<8,P=L+H;if(P>s){h&&N(0);break}c&&f(y+H),n.set(e.subarray(L,P),y),t.b=y+=H,t.p=p=P*8,t.f=v;continue}if(p>S){h&&N(0);break}}c&&f(y+131072);for(var oe=(1<<R)-1,W=(1<<A)-1,K=p;;K=p){var Y=w[nt(e,p)&oe],J=Y>>4;if(p+=Y&15,p>S){h&&N(0);break}if(Y||N(2),J<256)n[y++]=J;else if(J==256){K=p,w=null;break}else{var le=J-254;if(J>264){var C=J-257,ne=cn[C];le=B(e,p,(1<<ne)-1)+mn[C],p+=ne}var ge=T[nt(e,p)&W],ye=ge>>4;ge||N(3),p+=ge&15;var x=Ns[ye];if(ye>3){var ne=dn[ye];x+=nt(e,p)&(1<<ne)-1,p+=ne}if(p>S){h&&N(0);break}c&&f(y+131072);var we=y+le;if(y<x){var Ie=o-x,ze=Math.min(x,we);for(Ie+y<0&&N(3);y<ze;++y)n[y]=r[Ie+y]}for(;y<we;++y)n[y]=n[y-x]}}t.l=w,t.p=K,t.b=y,t.f=v,w&&(v=1,t.m=R,t.d=T,t.n=A)}while(!v);return y!=n.length&&i?wt(n,0,y):n.subarray(0,y)},qs=new X(0),z=function(e,t){return e[t]|e[t+1]<<8},F=function(e,t){return(e[t]|e[t+1]<<8|e[t+2]<<16|e[t+3]<<24)>>>0},rt=function(e,t){return F(e,t)+F(e,t+4)*4294967296};function Bs(e,t){return js(e,{i:2},t&&t.out,t&&t.dictionary)}var pt=typeof TextDecoder<"u"&&new TextDecoder,Vs=0;try{pt.decode(qs,{stream:!0}),Vs=1}catch{}var zs=function(e){for(var t="",n=0;;){var r=e[n++],s=(r>127)+(r>223)+(r>239);if(n+s>e.length)return{s:t,r:wt(e,n-1)};s?s==3?(r=((r&15)<<18|(e[n++]&63)<<12|(e[n++]&63)<<6|e[n++]&63)-65536,t+=String.fromCharCode(55296|r>>10,56320|r&1023)):s&1?t+=String.fromCharCode((r&31)<<6|e[n++]&63):t+=String.fromCharCode((r&15)<<12|(e[n++]&63)<<6|e[n++]&63):t+=String.fromCharCode(r)}};function hn(e,t){if(t){for(var n="",r=0;r<e.length;r+=16384)n+=String.fromCharCode.apply(null,e.subarray(r,r+16384));return n}else{if(pt)return pt.decode(e);var s=zs(e),o=s.s,n=s.r;return n.length&&N(8),o}}var Ws=function(e,t){return t+30+z(e,t+26)+z(e,t+28)},Ks=function(e,t,n){var r=z(e,t+28),s=z(e,t+30),o=hn(e.subarray(t+46,t+46+r),!(z(e,t+8)&2048)),i=t+46+r,c=Gs(e,i,s,n,F(e,t+20),F(e,t+24),F(e,t+42)),h=c[0],f=c[1],v=c[2];return[z(e,t+10),h,f,o,i+s+z(e,t+32),v]},Gs=function(e,t,n,r,s,o,i){var c=s==4294967295,h=o==4294967295,f=i==4294967295,v=t+n,p=c+h+f;if(r&&p){for(;t+4<v;t+=4+z(e,t+2))if(z(e,t)==1)return[c?rt(e,t+4+8*h):s,h?rt(e,t+4):o,f?rt(e,t+4+8*(h+c)):i,1];r<2&&N(13)}return[s,o,i,0]};function _s(e,t){for(var n={},r=e.length-22;F(e,r)!=101010256;--r)(!r||e.length-r>65558)&&N(13);var s=z(e,r+8);if(!s)return{};var o=F(e,r+16),i=F(e,r-20)==117853008;if(i){var c=F(e,r-12);i=F(e,c)==101075792,i&&(s=F(e,c+32),o=F(e,c+48))}for(var h=0;h<s;++h){var f=Ks(e,o,i),v=f[0],p=f[1],y=f[2],w=f[3],T=f[4],R=f[5],A=Ws(e,R);o=T,v?v==8?n[w]=Bs(e.subarray(A,A+p),{out:new X(y)}):N(14,"unknown compression type "+v):n[w]=wt(e,A,A+p)}return n}const Ys="deckx.deck.v1";async function Js(e){const t=new URL(e,window.location.href).toString(),n=await fetch(t);if(!n.ok)throw new Error(`DeckX package fetch failed (${n.status} ${n.statusText}).`);return gn(new Uint8Array(await n.arrayBuffer()),t)}function gn(e,t="inline.deckx"){const n=la(_s(e));return Zs(n,t)}function Zs(e,t){const n=ca(e);if(!n)throw new Error("DeckX package is missing manifest.json.");const r=aa(Fe(e,n),n),s=mt(n),o=[],i=v=>{const p=e[v];if(!p)throw new Error(`DeckX asset is missing: ${v}`);const y=p.buffer.slice(p.byteOffset,p.byteOffset+p.byteLength),w=URL.createObjectURL(new Blob([y],{type:pa(v)}));return o.push(w),w},c=r.theme?.css?yn(Fe(e,ae(s,r.theme.css)),mt(ae(s,r.theme.css)),i):"",h=Qs(r.metadata,s,e,i);return{deck:{id:r.id,title:r.title,aspectRatio:r.aspectRatio,durationSec:r.durationSec,theme:{name:"DeckX Package",className:`deckx-package-${ua(r.id)}`},metadata:ea(r.metadata,s,i),slides:r.slides.map(v=>ta(v,e,s,i))},cssText:c,runtimeScripts:h,sourceUrl:t,dispose:()=>{o.forEach(v=>URL.revokeObjectURL(v))}}}function Qs(e,t,n,r){const s=e?.custom?.runtime;if(s===void 0)return[];if(!Array.isArray(s))throw new Error("DeckX metadata.custom.runtime must be an array of package-local JS paths.");return s.map((o,i)=>{if(!ie(o))throw new Error(`DeckX metadata.custom.runtime[${i}] must be a non-empty string.`);if(je(o)||bt(o))throw new Error(`Trusted DeckX runtime must be package-local: ${o}`);const c=ae(t,o);if(!c.toLowerCase().endsWith(".js"))throw new Error(`Trusted DeckX runtime must be a JavaScript file: ${c}`);if(!n[c])throw new Error(`Trusted DeckX runtime is missing: ${c}`);return{path:c,url:r(c)}})}function ea(e,t,n){if(e)return{version:e.version,description:e.description,authors:e.authors?.map(r=>({...r})),tags:e.tags?[...e.tags]:void 0,language:e.language,license:e.license,homepage:e.homepage,repository:e.repository,thumbnail:e.thumbnail?n(ae(t,e.thumbnail)):void 0,createdAt:e.createdAt,updatedAt:e.updatedAt,generator:e.generator?{...e.generator}:void 0,custom:e.custom?{...e.custom}:void 0}}function ta(e,t,n,r){const s=ae(n,e.source),o=e.notes?ae(n,e.notes):null,i=na(Fe(t,s),mt(s),r);return{id:e.id,title:e.title,notes:o&&t[o]?Fe(t,o):void 0,footer:e.footer,className:e.className,timingSec:e.timingSec,render:()=>i}}function na(e,t,n){if(/<\/?(html|head|body)\b/i.test(e))throw new Error("DeckX slide HTML must be a fragment, not a full document.");const r=document.createElement("template");if(r.innerHTML=e,r.content.querySelector("script"))throw new Error("Safe DeckX slides cannot include <script>.");return r.content.querySelectorAll("*").forEach(s=>{Array.from(s.attributes).forEach(o=>{const i=o.name.toLowerCase(),c=o.value;if(i.startsWith("on"))throw new Error("Safe DeckX slides cannot include inline event handlers.");if(i==="style"){s.setAttribute(i,yn(c,t,n));return}if(i==="src"||i==="poster"||ra(s,i,c)){s.setAttribute(i,vt(c,t,n));return}i==="srcset"&&s.setAttribute(i,sa(c,t,n))})}),r.innerHTML}function ra(e,t,n){return!(t!=="href"&&t!=="xlink:href"||e.tagName.toLowerCase()==="a"&&je(n))}function sa(e,t,n){return e.split(",").map(r=>{const s=r.trim().split(/\s+/);return s[0]?(s[0]=vt(s[0],t,n),s.join(" ")):""}).filter(Boolean).join(", ")}function yn(e,t,n){return e.replace(/url\(\s*(['"]?)([^'")]+)\1\s*\)/gi,(r,s,o)=>{if(bt(o))return`url("${o}")`;if(je(o))throw new Error(`Safe DeckX CSS cannot reference external assets: ${o}`);return`url("${vt(o,t,n)}")`})}function vt(e,t,n){if(bt(e))return e;if(je(e))throw new Error(`Safe DeckX slides cannot reference external assets: ${e}`);const r=e.indexOf("#"),s=r>=0?e.slice(r):"",o=r>=0?e.slice(0,r):e,i=ae(t,o.split("?")[0]);return`${n(i)}${s}`}function aa(e,t){const n=JSON.parse(e);if(!re(n))throw new Error(`${t} must contain a JSON object.`);if(n.schemaVersion!==Ys)throw new Error(`Unsupported DeckX schemaVersion: ${String(n.schemaVersion)}`);if(!ie(n.id))throw new Error("DeckX manifest is missing id.");if(!ie(n.title))throw new Error("DeckX manifest is missing title.");if(!da(n.aspectRatio))throw new Error("DeckX manifest has invalid aspectRatio.");if(!Array.isArray(n.slides)||n.slides.length===0)throw new Error("DeckX manifest must include at least one slide.");return n.metadata!==void 0&&ia(n.metadata),n.slides.forEach((r,s)=>oa(r,s)),n}function ia(e){if(!re(e))throw new Error("DeckX manifest metadata must be an object.");const t=e;if(["version","description","language","license","homepage","repository","thumbnail","createdAt","updatedAt"].forEach(n=>{if(t[n]!==void 0&&typeof t[n]!="string")throw new Error(`DeckX metadata.${n} must be a string.`)}),t.tags!==void 0&&(!Array.isArray(t.tags)||!t.tags.every(n=>typeof n=="string")))throw new Error("DeckX metadata.tags must be an array of strings.");if(t.authors!==void 0){if(!Array.isArray(t.authors))throw new Error("DeckX metadata.authors must be an array.");t.authors.forEach((n,r)=>{if(!re(n)||!ie(n.name))throw new Error(`DeckX metadata.authors[${r}] must include name.`)})}if(t.generator!==void 0&&(!re(t.generator)||!ie(t.generator.name)))throw new Error("DeckX metadata.generator must include name.");if(t.custom!==void 0&&!re(t.custom))throw new Error("DeckX metadata.custom must be an object.")}function oa(e,t){if(!re(e))throw new Error(`DeckX slide ${t+1} must be an object.`);if(!ie(e.id))throw new Error(`DeckX slide ${t+1} is missing id.`);if(!ie(e.source))throw new Error(`DeckX slide ${t+1} is missing source.`)}function la(e){const t={};return Object.entries(e).forEach(([n,r])=>{n.endsWith("/")||(t[wn(n)]=r)}),t}function ca(e){if(e["manifest.json"])return"manifest.json";const t=Object.keys(e).filter(n=>n.endsWith("/manifest.json"));return t.length===1?t[0]:null}function Fe(e,t){const n=e[t];if(!n)throw new Error(`DeckX package entry is missing: ${t}`);return hn(n)}function ae(e,t){return wn([e,t].filter(Boolean).join("/"))}function wn(e){const t=e.replaceAll("\\","/");if(!t||t.startsWith("/")||t.includes("\0"))throw new Error(`Invalid DeckX package path: ${e}`);const n=[];if(t.split("/").forEach(r=>{if(!(!r||r===".")){if(r===".."){if(n.length===0)throw new Error(`DeckX package path escapes root: ${e}`);n.pop();return}n.push(r)}}),n.length===0)throw new Error(`Invalid DeckX package path: ${e}`);return n.join("/")}function mt(e){const t=e.lastIndexOf("/");return t===-1?"":e.slice(0,t)}function re(e){return typeof e=="object"&&e!==null}function ie(e){return typeof e=="string"&&e.trim().length>0}function da(e){return e==="16:9"||e==="4:3"?!0:re(e)&&typeof e.width=="number"&&typeof e.height=="number"&&Number.isFinite(e.width)&&Number.isFinite(e.height)&&e.width>0&&e.height>0}function bt(e){return e.startsWith("#")||e.startsWith("data:")||e.startsWith("blob:")||e.startsWith("mailto:")||e.startsWith("tel:")}function je(e){return/^[a-z][a-z0-9+.-]*:/i.test(e)||e.startsWith("//")}function ua(e){return e.toLowerCase().replace(/[^a-z0-9-]+/g,"-").replace(/^-+|-+$/g,"")||"deck"}function pa(e){const t=e.toLowerCase();return t.endsWith(".svg")?"image/svg+xml":t.endsWith(".png")?"image/png":t.endsWith(".jpg")||t.endsWith(".jpeg")?"image/jpeg":t.endsWith(".gif")?"image/gif":t.endsWith(".webp")?"image/webp":t.endsWith(".css")?"text/css":t.endsWith(".html")?"text/html":t.endsWith(".js")?"text/javascript":t.endsWith(".md")?"text/markdown":"application/octet-stream"}const ma={en:{lang:"en",navLabel:"Landing sections",nav:[{href:"#start",label:"Start"},{href:"#ai-native",label:"AI Native"},{href:"#deckx",label:"DeckX"},{href:"#concepts",label:"Basics"},{href:"#samples",label:"Samples"}],languageHref:"/ko/",languageLabel:"한국어",playerCta:"Open Player",hero:{badge:"AI-NATIVE HTML DECKS",title:"Present AI-generated HTML without converting it to PowerPoint",body:"Dynamic content loses its value when it is rebuilt as static slides. DeckX Player keeps HTML authored by LLMs and agents in a .deckx package, then opens it from a URL or local zip with presenter view and slideshow view.",points:["Use HTML as-is","Motion-first presenting","Agent-native authoring"],primary:"Open Player",secondary:"Watch a moving sample"},preview:{openTitle:"Open DeckX",recent:"Recent DeckX",samples:"Official Samples",uploads:"Uploads",present:"Start presenting",motion:"Motion control"},open:{label:"Open a DeckX URL",button:"Open"},starter:{eyebrow:"GET STARTED",title:"Start from a copyable DeckX starter project",lead:"deckx-project/deckx-starter-basic is the public starter repository for creating a first DeckX deck. It gives humans and agents the same source-folder contract with README, AGENTS.md, validation, and packaging scripts.",repoButton:"View public repo",steps:[{title:"Clone",code:"git clone https://github.com/deckx-project/deckx-starter-basic.git"},{title:"Edit",code:"deck/manifest.json, deck/slides, deck/notes, deck/styles"},{title:"Validate",code:"npm run validate"},{title:"Pack",code:"npm run pack"}]},why:{eyebrow:"WHY NOW",title:"In the AI era, HTML is a better presentation source than PPT",lead:"Claude Artifacts, coding agents, and HTML prototypes have already changed how content is produced. The remaining friction is packaging, validating, and reopening that HTML every time it needs to be presented.",cards:[{title:"No PPT conversion",body:"Keep the original HTML/CSS output from LLMs instead of flattening it into screenshots or rebuilt slide objects."},{title:"Motion-first",body:"Let the presenter control CSS animation, transitions, data flow, and staged reveals with Full, Reduced, and Paused modes."},{title:"Agent-native",body:"Expose DeckX authoring rules and validation scripts so LLM agents can create a deck and check it directly in the player."}]},format:{eyebrow:"DeckX FORMAT",title:"DeckX turns HTML presentations into exchangeable files",lead:"DeckX is a new package format. It bundles HTML slides, speaker notes, styles, image assets, and metadata into one zip-based .deckx file that the player opens with the same runtime contract.",cards:[{title:"File boundary",body:"Bundle manifest.json, slides, notes, styles, and assets into a single .deckx zip package."},{title:"URL input",body:"The player reads ?deck=<url> and loads any DeckX deck into the same runtime."},{title:"Safe default",body:"A normal DeckX package is a script-free Safe Deck, and speaker notes stay out of the slideshow view."},{title:"Verifiable",body:"Schema, asset paths, notes coverage, and visual overflow can be checked before a deck is presented."}]},flow:{eyebrow:"PLAYER FLOW",title:"The player absorbs the repetitive packaging work",lead:"Using HTML as a presentation file usually means coordinating zip files, URLs, first-slide checks, presenter view, audience view, and motion settings. DeckX Player folds those steps into one opening flow.",cards:[{title:"Before opening",body:"Choose a DeckX URL, local zip, recent deck, or official sample."},{title:"After opening",body:"Start from a first-slide preview and a clear presentation launch action."},{title:"When details matter",body:"Validation, notes, and session metadata stay available without dominating the first screen."}]},concepts:{eyebrow:"DeckX BASICS",title:"Four questions that define DeckX",lead:"DeckX is a new format, so the words need to be clear first. Presenters do not need a new editor; they need to understand how HTML presentations can be opened and operated like files.",answers:[{title:"What is DeckX?",body:"DeckX is the name of the format and runtime for packaging HTML-based presentations as exchangeable presentation files."},{title:"What is DeckX Player?",body:"DeckX Player is a browser-based runtime that opens .deckx HTML presentation packages with preview, presenter view, slideshow view, speaker notes, and motion controls."},{title:"What is a DeckX package?",body:"A DeckX package is a zip-based .deckx file containing manifest.json, HTML slides, Markdown speaker notes, styles, and assets."},{title:"Why is it useful?",body:"You can present HTML motion and layout directly, without rebuilding it in PPT, while sharing notes and assets as one file or URL."}],benefits:[{title:"Keep HTML expression",body:"Preserve CSS motion, data flow, and interactive layout instead of flattening them into images."},{title:"Presentation operations included",body:"Preview, presenter view, slideshow view, notes, timer, and motion controls are handled by the player."},{title:"Shareable file",body:"Send a .deckx zip or URL and reopen it in the same runtime."}]},motion:{eyebrow:"MOTION",title:"Full, Reduced, Paused",cards:[{title:"Full",body:"Run deck CSS animation and transitions as authored."},{title:"Reduced",body:"Shorten motion for accessibility needs or presentation-room constraints."},{title:"Paused",body:"Pause CSS animation for review, explanation, or controlled moments during a talk."}]},samples:{eyebrow:"OFFICIAL SAMPLES",title:"Open moving DeckX examples immediately",lead:"Official samples stay separate from user history. Compare motion decks, static explanations, 4:3 canvases, image-heavy decks, and long-deck navigation in the same runtime.",openLabel:"Open in Player"},strategy:{eyebrow:"NEXT STRATEGY",title:"Make DeckX easy for search engines and AI agents to read first",cards:[{title:"English as the default",body:"Use English as the canonical discovery surface for global search and AI answer engines, while keeping a Korean version for local users."},{title:"llms.txt review",body:"Publish DeckX definitions, package specs, authoring guides, and sample URLs in a concise structure that LLMs can read quickly."},{title:"MCP and skills review",body:"Validate whether DeckX authoring skills, validation scripts, and sample generation should become an agent-native creation workflow."},{title:"Search and AI answer evidence",body:"Align static HTML, canonical links, hreflang, sitemap, robots.txt, JSON-LD, and public Markdown docs so crawlers and AI answer engines read the same facts."},{title:"Team features later",body:"SSO, upload, team history, and team libraries are not implemented features today. Treat them only as future product candidates."}]}},ko:{lang:"ko",navLabel:"랜딩 섹션",nav:[{href:"#start",label:"시작하기"},{href:"#ai-native",label:"AI Native"},{href:"#deckx",label:"DeckX"},{href:"#concepts",label:"개념"},{href:"#samples",label:"샘플"}],languageHref:"/",languageLabel:"English",playerCta:"플레이어 열기",hero:{badge:"AI-NATIVE HTML DECKS",title:"AI가 만든 HTML을 PPT로 바꾸지 않고 그대로 발표하세요",body:"동적인 콘텐츠는 PPT로 다시 옮기는 순간 표현력이 줄어듭니다. DeckX Player는 LLM과 agent가 만든 HTML 발표를 .deckx 패키지로 고정하고, URL이나 로컬 zip에서 열어 발표자뷰와 슬라이드쇼로 바로 실행합니다.",points:["HTML 그대로 사용","모션 중심 발표","Agent-native authoring"],primary:"플레이어 열기",secondary:"움직이는 샘플 보기"},preview:{openTitle:"DeckX 열기",recent:"Recent DeckX",samples:"Official Samples",uploads:"Uploads",present:"발표 시작",motion:"모션 제어"},open:{label:"DeckX URL 빠르게 열기",button:"열기"},starter:{eyebrow:"GET STARTED",title:"복사해서 바로 시작하는 DeckX 스타터 프로젝트",lead:"deckx-project/deckx-starter-basic은 첫 DeckX를 만들기 위한 public starter repo입니다. README, AGENTS.md, 검증/패키징 스크립트를 함께 제공해 사람과 agent가 같은 source-folder 계약으로 수정할 수 있습니다.",repoButton:"Public repo 보기",steps:[{title:"Clone",code:"git clone https://github.com/deckx-project/deckx-starter-basic.git"},{title:"Edit",code:"deck/manifest.json, deck/slides, deck/notes, deck/styles"},{title:"Validate",code:"npm run validate"},{title:"Pack",code:"npm run pack"}]},why:{eyebrow:"WHY NOW",title:"AI 시대에는 PPT보다 HTML이 자연스럽습니다",lead:"Claude Artifacts, coding agent, HTML prototype 흐름이 이미 콘텐츠 제작 방식을 바꾸고 있습니다. 문제는 만든 HTML을 매번 발표용으로 묶고, 검증하고, 다시 여는 일이 귀찮다는 점입니다.",cards:[{title:"PPT 변환 없이",body:"LLM이 만든 HTML/CSS 결과물을 이미지나 슬라이드 캡처로 죽이지 않고 원본 표현 그대로 발표합니다."},{title:"모션 중심",body:"CSS animation, transition, 데이터 흐름, 단계적 reveal을 발표자가 Full, Reduced, Paused로 제어합니다."},{title:"Agent-native",body:"DeckX 작성 규칙과 검증 스크립트를 skill로 제공해 LLM agent가 덱을 만들고 바로 플레이어에서 확인하게 합니다."}]},format:{eyebrow:"DeckX FORMAT",title:"DeckX는 HTML 발표를 교환 가능한 파일로 만드는 포맷입니다",lead:"DeckX는 새 파일 포맷입니다. HTML 슬라이드, 발표자 노트, 스타일, 이미지 자산, 메타데이터를 하나의 .deckx zip으로 묶고 플레이어가 동일한 런타임 계약으로 엽니다.",cards:[{title:"파일 경계",body:"manifest.json, slides, notes, styles, assets를 하나의 .deckx zip으로 묶습니다."},{title:"URL 입력",body:"플레이어는 ?deck=<url>을 읽고 같은 런타임에 어떤 DeckX 덱이든 로드합니다."},{title:"안전한 기본값",body:"일반 DeckX는 script 없는 Safe Deck이며 발표자 노트는 슬라이드쇼에서 제외됩니다."},{title:"검증 가능",body:"schema, asset path, notes coverage, overflow를 검사해 발표 파일을 재현 가능한 단위로 다룹니다."}]},flow:{eyebrow:"PLAYER FLOW",title:"패키징 반복을 플레이어가 흡수합니다",lead:"HTML을 발표 파일처럼 쓰려면 zip, URL, 첫 화면 확인, 발표자뷰, 관객 화면, 모션 옵션을 매번 맞춰야 합니다. DeckX Player는 이 반복 작업을 하나의 열기 흐름으로 묶습니다.",cards:[{title:"열기 전",body:"DeckX URL, 로컬 zip, 최근 DeckX, 공식 샘플 중 하나를 선택합니다."},{title:"열었을 때",body:"첫 슬라이드 미리보기와 발표 시작 버튼을 중심으로 표시합니다."},{title:"상세 정보",body:"validation, notes, session 같은 DeckX 메타는 필요할 때만 펼쳐봅니다."}]},concepts:{eyebrow:"DeckX BASICS",title:"DeckX를 이해하는 네 가지 질문",lead:"DeckX는 처음 보는 포맷이므로 먼저 용어가 분명해야 합니다. 발표자는 새 편집기를 배우는 것이 아니라, HTML 발표를 파일처럼 열고 운영하는 방식을 이해하면 됩니다.",answers:[{title:"DeckX란?",body:"DeckX는 HTML 기반 발표를 교환 가능한 패키지로 만들고, 같은 플레이어에서 재생하기 위한 포맷과 런타임의 이름입니다."},{title:"DeckX Player란?",body:"DeckX Player는 .deckx HTML presentation package를 열어 미리보기, 발표자뷰, 슬라이드쇼, 발표자 노트, 모션 제어를 제공하는 웹 기반 발표 런타임입니다."},{title:"DeckX package란?",body:"DeckX package는 manifest.json, HTML slides, Markdown speaker notes, styles, assets를 하나로 묶은 zip 기반 .deckx 발표 파일입니다."},{title:"뭐가 좋은가요?",body:"PPT로 다시 옮기지 않아도 HTML의 모션과 레이아웃을 그대로 발표할 수 있고, 발표자 노트와 자산까지 하나의 파일 또는 URL로 공유할 수 있습니다."}],benefits:[{title:"HTML 표현력 유지",body:"CSS motion, 데이터 흐름, 인터랙티브한 레이아웃을 이미지 캡처로 죽이지 않고 발표합니다."},{title:"발표 운영 내장",body:"미리보기, 발표자뷰, 슬라이드쇼, 노트, 타이머, 모션 제어를 플레이어가 담당합니다."},{title:"공유 가능한 파일",body:".deckx zip이나 URL로 전달해 같은 런타임에서 다시 열고 발표할 수 있습니다."}]},motion:{eyebrow:"MOTION",title:"Full, Reduced, Paused",cards:[{title:"Full",body:"덱 CSS animation과 transition을 그대로 재생합니다."},{title:"Reduced",body:"모션을 거의 즉시 끝나게 줄여 발표장 환경이나 접근성 요구에 맞춥니다."},{title:"Paused",body:"모든 CSS animation을 일시정지합니다. 모션 데모 검토나 발표 중 정지에 유용합니다."}]},samples:{eyebrow:"OFFICIAL SAMPLES",title:"움직이는 DeckX를 바로 열어볼 수 있습니다",lead:"공식 샘플은 사용자 히스토리와 분리됩니다. 모션, 정적 설명, 4:3 캔버스, 이미지 자산, 롱덱 탐색을 같은 런타임에서 비교할 수 있습니다.",openLabel:"플레이어에서 열기"},strategy:{eyebrow:"NEXT STRATEGY",title:"먼저 검색 엔진과 AI agent가 읽기 쉬운 경로를 만듭니다",cards:[{title:"영어를 기본값으로",body:"글로벌 검색과 AI answer engine 유입을 위해 canonical discovery surface는 영어로 두고, 한국어 버전은 지역 사용자와 설명 보강용으로 함께 제공합니다."},{title:"llms.txt 검토",body:"DeckX 정의, package spec, 작성 가이드, 샘플 URL을 LLM이 빠르게 읽도록 공개 문서 구조를 정리합니다."},{title:"MCP와 skill 검토",body:"DeckX authoring skill, validation script, 샘플 생성 흐름을 agent-native 제작 경험으로 제공할지 먼저 검증합니다."},{title:"검색과 AI 답변 근거",body:"정적 HTML, canonical, hreflang, sitemap, robots.txt, JSON-LD, 공개 Markdown 문서로 검색 엔진과 AI answer engine이 같은 사실을 읽게 합니다."},{title:"팀 기능은 이후",body:"SSO, 업로드, 팀 이력은 아직 구현된 기능이 아니며, 제품화 이후 확장 후보로만 다룹니다."}]}}};function fa(e,t){const n=ma[t.locale];e.innerHTML=`
    <main class="project-landing" lang="${n.lang}">
      <header class="project-nav">
        <a class="project-mark" href="${m(t.homeHref)}">
          <img class="brand-icon" src="/brand/deckx-icon.svg" alt="" aria-hidden="true" />
          <span>DeckX Player</span>
        </a>
        <nav class="project-nav-links" aria-label="${m(n.navLabel)}">
          ${n.nav.map(s=>`<a href="${m(s.href)}">${m(s.label)}</a>`).join("")}
        </nav>
        <a class="btn compact" href="${m(n.languageHref)}">${m(n.languageLabel)}</a>
        <a class="btn compact" href="${m(t.playerHref)}">${m(n.playerCta)}</a>
      </header>

      <section class="project-hero">
        <div class="project-hero-copy">
          <span class="badge mono">${m(n.hero.badge)}</span>
          <h1>${m(n.hero.title)}</h1>
          <p>${U(n.hero.body)}</p>
          <div class="project-hero-points" aria-label="DeckX positioning">
            ${n.hero.points.map(s=>`<span>${m(s)}</span>`).join("")}
          </div>
          <div class="project-actions">
            <a class="btn primary" href="${m(t.playerHref)}">${m(n.hero.primary)}</a>
            <a class="btn" href="${m(t.defaultDemoHref)}">${m(n.hero.secondary)}</a>
          </div>
        </div>
        ${ha(n)}
      </section>

      <section class="project-section project-open-section">
        <form class="project-open" data-project-deckx-form>
          <label for="project-deckx-url">${m(n.open.label)}</label>
          <div class="project-open-row">
            <input
              id="project-deckx-url"
              data-project-deckx-input
              type="text"
              inputmode="url"
              autocomplete="url"
              value="${m(t.deckxUrlValue)}"
              aria-label="DeckX URL"
            />
            <button class="btn primary" type="submit">${m(n.open.button)}</button>
          </div>
        </form>
      </section>

      ${ga(n,t)}
      ${st("ai-native",n.why,"info-grid")}
      ${ya(n)}
      ${st("",n.flow,"info-grid modes")}
      ${wa(n)}
      ${st("",n.motion,"info-grid modes")}
      ${va(n,t.demoOptions)}
      ${ba(n)}
    </main>
  `;const r=e.querySelector("[data-project-deckx-form]");r?.addEventListener("submit",s=>{s.preventDefault();const i=r.querySelector("[data-project-deckx-input]")?.value.trim();i&&t.onOpenDeckxUrl(i)})}function ha(e){return`
    <div class="project-product-preview" aria-label="DeckX Player preview">
      <div class="preview-chrome">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div class="preview-layout">
        <aside>
          <strong>${m(e.preview.openTitle)}</strong>
          <span>${m(e.preview.recent)}</span>
          <span>${m(e.preview.samples)}</span>
          <span>${m(e.preview.uploads)}</span>
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
            <span>${m(e.preview.present)}</span>
            <span>${m(e.preview.motion)}</span>
          </div>
        </section>
      </div>
    </div>
  `}function ga(e,t){return`
    <section class="project-section project-start-section" id="start">
      <div class="section-heading">
        <p class="mono">${m(e.starter.eyebrow)}</p>
        <h2>${m(e.starter.title)}</h2>
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
            <a class="btn primary" href="${m(t.starterSourceHref)}">${m(e.starter.repoButton)}</a>
          </div>
        </div>
        <ol class="project-start-steps">
          ${e.starter.steps.map((n,r)=>`
            <li>
              <span>${r+1}</span>
              <strong>${m(n.title)}</strong>
              <code>${m(n.code)}</code>
            </li>
          `).join("")}
        </ol>
      </div>
    </section>
  `}function st(e,t,n){return`
    <section class="project-section"${e?` id="${m(e)}"`:""}>
      <div class="section-heading">
        <p class="mono">${m(t.eyebrow)}</p>
        <h2>${m(t.title)}</h2>
        ${t.lead?`<span class="section-lead">${U(t.lead)}</span>`:""}
      </div>
      <div class="${m(n)}">
        ${t.cards.map(r=>`
          <article>
            <strong>${U(r.title)}</strong>
            <span>${U(r.body)}</span>
          </article>
        `).join("")}
      </div>
    </section>
  `}function ya(e){return`
    <section class="project-section" id="deckx">
      <div class="section-heading">
        <p class="mono">${m(e.format.eyebrow)}</p>
        <h2>${m(e.format.title)}</h2>
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
              <strong>${m(t.title)}</strong>
              <span>${U(t.body)}</span>
            </article>
          `).join("")}
        </div>
      </div>
    </section>
  `}function wa(e){return`
    <section class="project-section" id="concepts">
      <div class="section-heading">
        <p class="mono">${m(e.concepts.eyebrow)}</p>
        <h2>${m(e.concepts.title)}</h2>
        <span class="section-lead">${U(e.concepts.lead)}</span>
      </div>
      ${e.concepts.answers.map(t=>`
        <div class="project-answer-block">
          <strong>${m(t.title)}</strong>
          <span>${U(t.body)}</span>
        </div>
      `).join("")}
      <div class="info-grid modes">
        ${e.concepts.benefits.map(t=>`
          <article>
            <strong>${m(t.title)}</strong>
            <span>${U(t.body)}</span>
          </article>
        `).join("")}
      </div>
    </section>
  `}function va(e,t){return`
    <section class="project-section" id="samples">
      <div class="section-heading">
        <p class="mono">${m(e.samples.eyebrow)}</p>
        <h2>${m(e.samples.title)}</h2>
        <span class="section-lead">${U(e.samples.lead)}</span>
      </div>
      <div class="project-demo-grid">
        ${t.map(n=>ka(n,e.samples.openLabel)).join("")}
      </div>
    </section>
  `}function ba(e){return`
    <section class="project-section" id="workspace">
      <div class="section-heading">
        <p class="mono">${m(e.strategy.eyebrow)}</p>
        <h2>${m(e.strategy.title)}</h2>
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
  `}function ka(e,t){return`
    <article class="project-demo-card">
      <div>
        <h3>${m(e.label)}</h3>
        <p>${m(e.description)}</p>
        <span>${m(e.detail)}</span>
      </div>
      <code>${m(e.url)}</code>
      <a class="btn compact" href="${m(e.href)}">${m(t)}</a>
    </article>
  `}function U(e){return m(e).replaceAll(".deckx","<code>.deckx</code>").replaceAll("manifest.json","<code>manifest.json</code>").replaceAll("?deck=&lt;url&gt;","<code>?deck=&lt;url&gt;</code>").replaceAll("llms.txt","<code>llms.txt</code>").replaceAll("robots.txt","<code>robots.txt</code>").replaceAll("sitemap","<code>sitemap</code>").replaceAll("JSON-LD","<code>JSON-LD</code>").replaceAll("hreflang","<code>hreflang</code>")}function m(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}const vn=document.getElementById("app");if(!vn)throw new Error("Missing #app mount element");const Ce=vn,bn="deckx-package-style",kn="deckx-player:history:v1",Sa=8,$a="https://github.com/deckx-project/deckx-starter-basic",se=[{id:"starter",messageKey:"starter",url:"/decks/starter-basic.deckx"},{id:"dogfood",messageKey:"dogfood",url:"/decks/deckx-player-demo.deckx"},{id:"static",messageKey:"static",url:"/decks/static-demo.deckx"},{id:"motion",messageKey:"motion",url:"/decks/motion-demo.deckx"},{id:"classic",messageKey:"classic",url:"/decks/classic-4x3-demo.deckx"},{id:"image-heavy",messageKey:"imageHeavy",url:"/decks/image-heavy-demo.deckx"},{id:"long-120",messageKey:"long120",url:"/decks/long-120-demo.deckx"},{id:"long-image",messageKey:"longImage",url:"/decks/long-image-demo.deckx"}],at={en:{starter:{label:"DeckX Starter",description:"A copyable starter deck packaged from deckx-project/deckx-starter-basic",detail:"A minimal DeckX package generated from the public starter source folder."},dogfood:{label:"DeckX zip demo",description:"Loads public/decks/deckx-player-demo.deckx as a packaged presentation",detail:"A dogfooding deck that explains DeckX Player using the DeckX package format itself."},static:{label:"Static framework demo",description:"A DeckX sample explaining the Deck/Runtime boundary",detail:"Shows how text-heavy talks combine with the player basics."},motion:{label:"Motion graphics demo",description:"A CSS motion DeckX loaded into the same runtime",detail:"Compare Full, Reduced, and Paused motion modes with an animated deck."},classic:{label:"Classic 4:3 canvas demo",description:"A sample showing DeckX aspectRatio support",detail:"Confirms that non-16:9 DeckX canvases render consistently in presenter and slideshow views."},"image-heavy":{label:"Image-heavy demo",description:"An asset stress sample with 96 package-local images",detail:"Checks preview, overview, and object URL behavior for image-heavy decks."},"long-120":{label:"Long 120-slide demo",description:"A sample for goto, search, and overview behavior across many pages",detail:"Exercises presenter thumbnails and keyboard navigation limits with a 120-slide DeckX."},"long-image":{label:"Long image demo",description:"A stress sample combining long-deck navigation with package-local images",detail:"Checks navigation, search, thumbnails, and asset handling across 120 image-backed slides."}},ko:{starter:{label:"DeckX 스타터",description:"deckx-project/deckx-starter-basic에서 패키징한 시작용 DeckX",detail:"public starter source folder에서 생성한 최소 DeckX package입니다."},dogfood:{label:"DeckX zip 데모",description:"public/decks/deckx-player-demo.deckx 파일을 그대로 로드",detail:"이 프로젝트 자체를 DeckX package로 설명하는 도그푸딩 덱입니다."},static:{label:"정적 프레임워크 데모",description:"Deck/Runtime 경계를 설명하는 DeckX 샘플",detail:"텍스트 중심 발표가 기본 플레이어 기능과 어떻게 결합되는지 확인합니다."},motion:{label:"모션 그래픽 데모",description:"같은 런타임에 CSS motion DeckX를 교체한 샘플",detail:"CSS animation이 포함된 덱에서 Full, Reduced, Paused 차이를 확인합니다."},classic:{label:"4:3 캔버스 데모",description:"DeckX aspectRatio가 렌더러에 반영되는 샘플",detail:"16:9가 아닌 DeckX canvas도 발표자뷰와 슬라이드쇼에 동일하게 반영됩니다."},"image-heavy":{label:"이미지 헤비 데모",description:"96개 package-local 이미지를 로드하는 asset stress 샘플",detail:"이미지가 많은 DeckX에서 preview, overview, object URL 처리 비용을 확인합니다."},"long-120":{label:"120장 롱덱 데모",description:"많은 페이지에서 goto, search, overview 사용성을 확인하는 샘플",detail:"120장 DeckX를 통해 발표자뷰 썸네일 목록과 키보드 탐색 한계를 관찰합니다."},"long-image":{label:"120장 이미지 롱덱 데모",description:"긴 DeckX와 package-local 이미지를 함께 로드하는 stress 샘플",detail:"120장 전체에 이미지가 포함된 DeckX로 탐색, 검색, 썸네일, asset 처리를 함께 관찰합니다."}}};let xe=null,Te=null,Xe=null,j=He("ko");window.addEventListener("beforeunload",()=>{xe?.destroy(),Te?.dispose(),Be(null)});Da();async function Da(){if(!Ia()){if(j=He("ko"),Ut(j),Na()){window.location.replace(Xa());return}Ea();return}j=He(),Ut(j);const e=Aa();if(document.body.dataset.page="player",!e){xa();return}An(j.messages.main.loadingDeck);try{await Ta(e)}catch(t){Me(),Rn(t)}}function Ea(){const e=La();document.body.dataset.page="project",document.documentElement.lang=e,delete document.body.dataset.mode,Me(),fa(Ce,{locale:e,deckxUrlValue:new URL(se[0].url,window.location.href).toString(),homeHref:e==="ko"?"/ko/":"/",playerHref:"/player",defaultDemoHref:it(se[0].url),starterSourceHref:$a,demoOptions:se.map(t=>({id:t.id,label:at[e][t.id].label,description:at[e][t.id].description,detail:at[e][t.id].detail,url:t.url,href:it(t.url)})),onOpenDeckxUrl:t=>{window.location.assign(it(t))}})}function La(){return window.location.pathname.replace(/\/+$/,"")==="/ko"?"ko":"en"}function xa(e=""){document.body.dataset.page="player",document.body.dataset.mode="landing",Me(),xe?.destroy(),xe=null,Te?.dispose(),Te=null,Be(null),Tr(Ce,{i18n:j,homeHref:"/",demoOptions:Dn(null),historyOptions:En(),actions:{onOpenDeckxUrl:Tn,onOpenDeckxFile:Sn,deckxUrlValue:"",deckxStatus:e,homeHref:"/"}})}async function Ta(e){const t=await Js(e.url);Be(null);const n=new URL(e.url,window.location.href).toString(),r=e.kind,s=se.find(i=>i.id===e.id),o=e.kind==="demo"?s?ft(s).label:t.deck.title:n;e.kind==="url"&&Ln({kind:"url",label:t.deck.title,detail:n,url:n}),$n(t,{source:e,sourceKind:r,sourceLabel:o,deckxUrlValue:n})}async function Sn(e){An(j.messages.main.loadingZip);try{const t=new Uint8Array(await e.arrayBuffer()),n=gn(t,e.name),r=URL.createObjectURL(new Blob([t],{type:e.type||"application/zip"}));Be(r),Ln({kind:"zip",label:n.deck.title,detail:e.name}),window.history.replaceState(null,"",Ca()),$n(n,{source:{id:"local-zip",url:e.name,kind:"url"},sourceKind:"zip",sourceLabel:e.name,deckxUrlValue:"",slideshowDeckUrl:r})}catch(t){Me(),Rn(t)}}function $n(e,t){xe?.destroy(),Te?.dispose(),Te=e,Pa(e.cssText,e.sourceUrl),xe=gs(e.deck,{mount:Ce,demoOptions:Dn(t.source),historyOptions:En(),sourceKind:t.sourceKind,sourceLabel:t.sourceLabel,deckxUrlValue:t.deckxUrlValue,slideshowDeckUrl:t.slideshowDeckUrl,trustedRuntimeScripts:e.runtimeScripts,trustedRuntimeEnabled:Ma(),onOpenDeckxUrl:Tn,onOpenDeckxFile:Sn,homeHref:"/",i18n:j})}function Aa(){const t=new URLSearchParams(window.location.search).get("deck");if(t){const n=se.find(r=>Oa(r.url,t));return{id:n?.id??"deckx-url",url:t,kind:n?"demo":"url"}}return null}function Dn(e){return se.map(t=>({id:t.id,label:ft(t).label,description:ft(t).description,href:qe(t.url),active:t.id===e?.id}))}function qe(e){const t=new URL(window.location.href);return t.searchParams.set("deck",e),t.searchParams.delete("deckx"),t.searchParams.delete("sessionId"),t.hash="landing",`${t.pathname}${t.search}${t.hash}`}function En(){return xn().map(e=>({id:e.id,kind:e.kind,label:e.label,detail:e.detail,href:e.kind==="url"&&e.url?qe(e.url):void 0}))}function Ln(e){const t=e.kind==="url"&&e.url?`url:${e.url}`:`zip:${e.detail}`,n={id:t,kind:e.kind,label:e.label,detail:e.detail,url:e.url,openedAtEpochMs:Date.now()},r=xn().filter(s=>s.id!==t);Ra([n,...r].slice(0,Sa))}function xn(){try{const e=window.localStorage.getItem(kn);if(!e)return[];const t=JSON.parse(e);return Array.isArray(t)?t.filter(Ua).sort((n,r)=>r.openedAtEpochMs-n.openedAtEpochMs):[]}catch{return[]}}function Ra(e){try{window.localStorage.setItem(kn,JSON.stringify(e))}catch{}}function it(e){const t=new URL("/player",window.location.href);return t.searchParams.set("deck",e),t.hash="landing",`${t.pathname}${t.search}${t.hash}`}function Ca(){const e=new URL(window.location.href);return e.pathname="/player",e.searchParams.delete("deck"),e.searchParams.delete("deckx"),e.searchParams.delete("sessionId"),e.searchParams.set(ht,j.locale),e.hash="landing",`${e.pathname}${e.search}${e.hash}`}function Ma(){const e=new URLSearchParams(window.location.search).get("trusted");return e==="1"||e==="true"}function Tn(e){window.location.assign(qe(e))}function Pa(e,t){if(Me(),!e.trim())return;const n=document.createElement("style");n.id=bn,n.dataset.deckxSource=t,n.textContent=e,document.head.appendChild(n)}function Me(){document.getElementById(bn)?.remove()}function Be(e){Xe&&Xe!==e&&URL.revokeObjectURL(Xe),Xe=e}function Oa(e,t){return new URL(e,window.location.href).toString()===new URL(t,window.location.href).toString()}function Ia(){return window.location.pathname.replace(/\/+$/,"")==="/player"}function Na(){const e=window.location.hash;return new URLSearchParams(window.location.search).has("deck")||e==="#landing"||e==="#presenter"||e==="#slideshow"}function Xa(){const e=new URL(window.location.href);return e.pathname="/player",`${e.pathname}${e.search}${e.hash||"#landing"}`}function An(e){Ce.innerHTML=`<main class="system-message">${De(e)}</main>`}function Rn(e){const t=e instanceof Error?e.message:String(e);Ce.innerHTML=`
    <main class="system-message">
      <div class="load-error">
        <strong>${De(j.messages.main.loadFailed)}</strong>
        <span>${De(t)}</span>
        <a class="btn" href="${De(qe(se[0].url))}">${De(j.messages.main.openDefaultDemo)}</a>
      </div>
    </main>
  `}function ft(e){return j.messages.demos[e?.messageKey??"starter"]}function De(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Ua(e){if(!e||typeof e!="object")return!1;const t=e;return(t.kind==="url"||t.kind==="zip")&&typeof t.id=="string"&&typeof t.label=="string"&&typeof t.detail=="string"&&typeof t.openedAtEpochMs=="number"&&(t.url===void 0||typeof t.url=="string")}
