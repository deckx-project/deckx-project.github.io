(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();function Fn(e){const t=[],n=new Set;let r=0;e.slides.length||t.push({code:"empty-deck",severity:"error",message:"Deck must contain at least one slide."}),jn(e.aspectRatio)||t.push({code:"invalid-canvas",severity:"error",message:"Deck aspectRatio must resolve to a positive finite canvas."}),e.slides.forEach((o,c)=>{const h=o.id?.trim();h?n.has(h)?t.push({code:"duplicate-slide-id",severity:"error",message:`Slide id "${h}" is duplicated.`,slideId:h,slideIndex:c}):n.add(h):t.push({code:"missing-slide-id",severity:"error",message:`Slide ${c+1} is missing a stable id.`,slideIndex:c}),o.notes?.trim()?r+=1:t.push({code:"missing-notes",severity:"warning",message:`Slide ${h||c+1} has no speaker notes.`,slideId:h||void 0,slideIndex:c})});const s=t.filter(o=>o.severity==="error").length,i=t.length-s;return{deckId:e.id,issues:t,errorCount:s,warningCount:i,notesCoverage:{total:e.slides.length,withNotes:r,missing:Math.max(0,e.slides.length-r)}}}function jn(e){return e==="16:9"||e==="4:3"?!0:Number.isFinite(e.width)&&Number.isFinite(e.height)&&e.width>0&&e.height>0}function rt(e){if(globalThis.crypto?.randomUUID)return`${e}-${globalThis.crypto.randomUUID()}`;if(globalThis.crypto?.getRandomValues){const t=new Uint32Array(4);return globalThis.crypto.getRandomValues(t),`${e}-${Array.from(t,n=>n.toString(16).padStart(8,"0")).join("")}`}return`${e}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`}function qn(e=window){const t=e.navigator;if(t.userAgentData?.mobile===!0)return!0;const r=t.userAgent||"",s=t.platform||t.userAgentData?.platform||"",i=t.maxTouchPoints||0,o=i>0||"ontouchstart"in e,c=Tt(e,"(pointer: coarse)"),h=Tt(e,"(hover: none)");if(Bn(r)||Vn(r)||zn(r,s,i))return!0;const m=Wn(e);return o&&c&&h&&m<=1024}function Tt(e,t){return typeof e.matchMedia=="function"&&e.matchMedia(t).matches}function Bn(e){return/Android.+Mobile|iPhone|iPod|Windows Phone|IEMobile|BlackBerry|BB10|Opera Mini|Opera Mobi|Mobile Safari/i.test(e)}function Vn(e){return/iPad|Tablet|Silk|Kindle|PlayBook|Android(?!.*Mobile)/i.test(e)}function zn(e,t,n){return/Macintosh/i.test(e)&&/Mac/i.test(t)&&n>1}function Wn(e){const t=e.screen?.width||e.innerWidth,n=e.screen?.height||e.innerHeight;return Math.min(t,n)}function Kn(e){return{id:e.id,title:e.title,aspectRatio:e.aspectRatio,theme:e.theme,metadata:e.metadata,slides:e.slides.map(Gn)}}function Gn(e){const{notes:t,...n}=e;return n}function _n(){return{status:"idle",startedAtEpochMs:null,elapsedBeforePauseMs:0,timerVersion:0}}function Yn(e,t=Date.now()){return e.status==="running"?e:{...e,status:"running",startedAtEpochMs:t,timerVersion:e.timerVersion+1}}function Jn(e,t=Date.now()){return e.status!=="running"||e.startedAtEpochMs===null?e:{...e,status:"paused",startedAtEpochMs:null,elapsedBeforePauseMs:e.elapsedBeforePauseMs+(t-e.startedAtEpochMs),timerVersion:e.timerVersion+1}}function Zn(e,t=Date.now()){return e.status!=="paused"?e:{...e,status:"running",startedAtEpochMs:t,timerVersion:e.timerVersion+1}}function Qn(e=Date.now()){return{status:"running",startedAtEpochMs:e,elapsedBeforePauseMs:0,timerVersion:0}}function qt(e,t=Date.now()){return e.status!=="running"||e.startedAtEpochMs===null?e.elapsedBeforePauseMs:e.elapsedBeforePauseMs+(t-e.startedAtEpochMs)}function er(e){const t=Math.max(0,Math.floor(e/1e3)),n=Math.floor(t/60),r=t%60;return`${String(n).padStart(2,"0")}:${String(r).padStart(2,"0")}`}function tr(e,t,n){let r={deckId:e,sessionId:t,stateVersion:0,index:0,timer:_n(),peer:{connected:!1,lastSeenAt:null}};const s=new Set;return{subscribe(o){return s.add(o),()=>s.delete(o)},getState:()=>r,getPublicState:()=>({deckId:r.deckId,sessionId:r.sessionId,stateVersion:r.stateVersion,index:r.index,timer:r.timer}),getElapsedLabel:()=>er(qt(r.timer)),goto(o){const c=Ct(o,0,Math.max(0,n-1));c!==r.index&&(r={...r,index:c,stateVersion:r.stateVersion+1},i())},startTimer(){r={...r,timer:Yn(r.timer),stateVersion:r.stateVersion+1},i()},applyTimerCommand(o){const c=o==="pause"?Jn(r.timer):o==="resume"?Zn(r.timer):Qn();r={...r,timer:c,stateVersion:r.stateVersion+1},i()},applySnapshot(o){o.deckId!==r.deckId||o.sessionId!==r.sessionId||o.stateVersion<=r.stateVersion||(r={...r,index:Ct(o.index,0,Math.max(0,n-1)),stateVersion:o.stateVersion,timer:o.timer},i())},markPeerSeen(){const o=r.peer.connected;r={...r,peer:{connected:!0,lastSeenAt:Date.now()}},o||i()},refreshPeer(o){if(r.peer.lastSeenAt===null)return;const c=Date.now()-r.peer.lastSeenAt<=o;c!==r.peer.connected&&(r={...r,peer:{...r.peer,connected:c}},i())},isPeerConnected(o){return r.peer.lastSeenAt!==null&&Date.now()-r.peer.lastSeenAt<=o}};function i(){s.forEach(o=>o())}}function Ct(e,t,n){return Math.min(n,Math.max(t,e))}class nr{constructor(t){this.options=t,this.channel=new BroadcastChannel(`html-ppt:${t.deckId}:${t.sessionId}`),this.channel.addEventListener("message",this.onMessage)}options;channel;listeners=new Set;lastSeqBySender=new Map;seq=0;send(t){const n={protocol:"deckx-player-sync/v1",deckId:this.options.deckId,sessionId:this.options.sessionId,senderId:this.options.senderId,from:this.options.from,seq:++this.seq,stateVersion:rr(t),sentAtEpochMs:Date.now(),body:t};this.channel.postMessage(n)}subscribe(t){return this.listeners.add(t),()=>this.listeners.delete(t)}close(){this.channel.removeEventListener("message",this.onMessage),this.channel.close(),this.listeners.clear()}onMessage=t=>{if(!sr(t.data))return;const n=t.data;if(n.protocol!=="deckx-player-sync/v1"||n.deckId!==this.options.deckId||n.sessionId!==this.options.sessionId||n.senderId===this.options.senderId)return;const r=this.lastSeqBySender.get(n.senderId)??0;n.seq<=r||(this.lastSeqBySender.set(n.senderId,n.seq),this.listeners.forEach(s=>s(n)))}}class Mt{constructor(t="Transport is disabled."){this.reason=t}reason;send(){}subscribe(){return()=>{}}close(){}}function rr(e){if(e.type==="state-snapshot")return e.state.stateVersion;if(e.type==="pong")return e.stateVersion}function sr(e){if(!e||typeof e!="object")return!1;const t=e;return t.protocol==="deckx-player-sync/v1"&&typeof t.deckId=="string"&&typeof t.sessionId=="string"&&typeof t.senderId=="string"&&typeof t.seq=="number"&&typeof t.sentAtEpochMs=="number"&&typeof t.body=="object"}async function ar(e){const t=new URL(window.location.href);t.hash="slideshow",t.searchParams.set("sessionId",e.sessionId);let n="popup,width=1280,height=720";if(e.display==="auto"){const s=await or(e.i18n);s.status&&e.onStatus?.(s.status),s.features&&(n=s.features)}const r=window.open(t.toString(),"html-ppt-slideshow",n);return r?(r.focus(),{windowRef:r,status:{type:"opened",message:e.i18n.messages.window.opened}}):{windowRef:null,status:{type:"popup-blocked",message:e.i18n.messages.window.popupBlocked}}}async function or(e){const t=window;if(!window.isSecureContext||typeof t.getScreenDetails!="function")return{features:null,status:{type:"window-management-unavailable",message:e.messages.window.unavailable}};try{const r=(await t.getScreenDetails()).screens.find(s=>!s.isPrimary)??null;return r?{features:`left=${r.availLeft},top=${r.availTop},width=${r.availWidth},height=${r.availHeight},popup`,status:{type:"opened",message:e.messages.window.detected}}:{features:null,status:{type:"window-management-unavailable",message:e.messages.window.noExternal}}}catch{return{features:null,status:{type:"window-management-denied",message:e.messages.window.denied}}}}const ir=["en","ko"],Bt="en",ut="ui",Vt="deckx-player:ui-locale",lr={documentTitle:"DeckX Player",locale:{label:"UI language",en:"English",ko:"Korean"},demos:{starter:{label:"DeckX Starter",description:"A minimal starter project you can copy to build your first DeckX",detail:"A starter source folder with manifest, slides, notes, styles, assets, README, and AGENTS.md."},dogfood:{label:"DeckX zip demo",description:"Loads the public/decks/deckx-player-demo.deckx file as-is",detail:"A dogfooding deck that explains this project as a DeckX package."},static:{label:"Static framework demo",description:"A DeckX sample explaining the Deck/Runtime boundary",detail:"Shows how text-heavy presentations combine with the base player features."},motion:{label:"Motion graphics demo",description:"A CSS motion DeckX sample running in the same runtime",detail:"Compares Full, Reduced, and Paused modes in a deck with CSS animation."},classic:{label:"4:3 canvas demo",description:"A sample showing DeckX aspectRatio reflected in the renderer",detail:"A non-16:9 DeckX canvas is applied consistently in presenter view and slideshow."},imageHeavy:{label:"Image-heavy demo",description:"An asset stress sample that loads 96 package-local images",detail:"Checks preview, overview, and object URL costs in a DeckX with many images."},long120:{label:"120-slide long deck demo",description:"A sample for goto, search, and overview usability across many pages",detail:"Uses a 120-slide DeckX to observe presenter thumbnails and keyboard navigation limits."},longImage:{label:"120-slide image long deck demo",description:"A stress sample with a long DeckX and package-local images",detail:"Combines navigation, search, thumbnails, and asset handling across 120 image-backed slides."}},main:{loadingDeck:"Loading DeckX deck...",loadingZip:"Loading local DeckX zip...",loadFailed:"DeckX deck load failed",openDefaultDemo:"Open default demo"},player:{homeSubtitle:"Open a DeckX to start presenting",flowHeading:"The player is ready before you open a deck",emptyTitle:"Open a DeckX URL or local .deckx zip first.",emptyBody:"After opening a deck, preview and start controls become active, and DeckX details stay tucked away until needed.",flowOpenTitle:"1. Open DeckX",flowOpenBody:"Enter a URL or choose a local zip package.",flowPreviewTitle:"2. Check preview",flowPreviewBody:"Review the first slide and default presentation options.",flowStartTitle:"3. Start presenting",flowStartBody:"Run presenter view and the slideshow window together.",teamAreaTitle:"SSO and team library placeholder",teamAreaBody:"For now, DeckX history stays in this browser. Later, sign-in can sync uploaded and shared DeckX packages.",slides:"slides",planned:"planned",metadata:"metadata",runHeading:"Run presentation",start:"Start presentation",presenterOnly:"Presenter only",slideshowOnly:"Slideshow only",options:"Presentation options",projectHome:"Project overview",sourceMenu:"Open deck / samples",sourceHeading:"Open DeckX",openUrl:"Open",localPackage:"LOCAL PACKAGE",localZip:"Choose local .deckx zip",recentDeckx:"RECENT DeckX",noHistory:"No DeckX has been opened yet.",zipNeedsReselect:"select again required",officialSamples:"OFFICIAL SAMPLES",details:"View DeckX details",validationIssuesNone:"No validation issues.",moreIssuesHidden:e=>`${e} more issues hidden.`,sourceKind:{demo:"Demo DeckX",zip:"Local ZIP",url:"URL DeckX"},motionDescriptions:{full:"CSS motion and transitions enabled",reduced:"Motion compressed for review",paused:"Animations paused"}},presenter:{presets:{scriptFirst:"Left list, long notes on top, Current/Next below",balanced:"Current/Notes on the left, Next/List on the right",review:"Single-line list on the left, compact Next on the right"},connectionTitle:"Synchronization status between presenter view and slideshow window",gotoTitle:"Go to slide number",searchTitle:"Search title, body, and notes",openSlideshowTitle:"Open the audience slideshow window",openSlideshow:"Open slideshow window",settingsTitle:"Choose presenter panel layout",closePresets:"Close presets",viewPresets:"View presets",exit:"Exit",noNotes:"No speaker notes.",prev:"Prev",next:"Next",emptyPanels:"Turn on at least one component to display.",ready:"Ready",readiness:{summary:"Operating status",deck:"Current DeckX title.",session:"Session shared by presenter view and slideshow.",popup:"Slideshow window open status.",sync:"BroadcastChannel-based connection status between windows.",fullscreen:"Fullscreen status for the current window.",motion:"Deck CSS animation playback mode. Change it from the tools menu.",theme:"Presenter and slideshow chrome theme. Deck-internal styles are unchanged.",pace:"Current pace compared with planned presentation time.",filter:"Audience display adjustment values. Change them from the slideshow Display menu.",wake:"Screen wake lock request status.",mirror:"Audience screen mirror status.",validation:"DeckX package validation result.",notes:"Number of slides with speaker notes."},tools:{label:"Tools",motionDescription:"Cycle deck animation playback through Full, Reduced, and Paused.",themeLabel:"Show theme",themeDescription:"Switch presenter and slideshow chrome between Light and Dark. Deck styles are preserved.",copyUrl:"Copy URL",copyUrlDescription:"Copy the slideshow URL for manual recovery when popups are blocked.",wakeLockDescription:"Request screen wake lock in supported browsers.",mirrorDescription:"After permission, show an audience-screen mirror inside presenter view."}},slideshow:{enterFullscreen:"Start fullscreen",exitFullscreen:"Exit fullscreen",controls:"Slideshow controls",display:"Display",displayFilters:"Display filters",brightness:"Bright",contrast:"Contrast",saturation:"Sat"},runtime:{mobileCombined:"On mobile, slides and presenter view are shown together in the current tab.",openingSlideshow:"Opening slideshow window.",slideshowClosed:"The presenter closed the slideshow.",fullscreenFailed:"Fullscreen could not start. Browser permission or a user gesture is required.",notesSaved:"Notes draft saved.",notesReset:"Notes draft restored to the source notes.",notesExported:"Speaker notes exported as Markdown.",slideshowUrlCopied:"Slideshow URL copied.",searchEmpty:"Enter a search term or no results were found.",gotoEmpty:e=>`Enter a number from 1-${e}.`},window:{popupBlocked:"Popup was blocked. Allow popups in the browser, then open it again.",opened:"Slideshow window opened. Move it to an external display and start fullscreen if needed.",unavailable:"External display placement is unavailable in this browser or context, so a normal window opens.",noExternal:"No external display was found, so a normal window opens.",detected:"External display coordinates detected. Opening the slideshow window there.",denied:"External display permission was denied or unavailable, so a normal window opens."}},cr={documentTitle:"DeckX Player",locale:{label:"UI 언어",en:"영어",ko:"한국어"},demos:{starter:{label:"DeckX 스타터",description:"복사해서 첫 DeckX를 만들 수 있는 최소 예시 프로젝트",detail:"manifest, slides, notes, styles, assets, README, AGENTS.md를 포함한 starter source folder입니다."},dogfood:{label:"DeckX zip 데모",description:"public/decks/deckx-player-demo.deckx 파일을 그대로 로드",detail:"이 프로젝트 자체를 DeckX package로 설명하는 도그푸딩 덱입니다."},static:{label:"정적 프레임워크 데모",description:"Deck/Runtime 경계를 설명하는 DeckX 샘플",detail:"텍스트 중심 발표가 기본 플레이어 기능과 어떻게 결합되는지 확인합니다."},motion:{label:"모션 그래픽 데모",description:"같은 런타임에 CSS motion DeckX를 교체한 샘플",detail:"CSS animation이 포함된 덱에서 Full, Reduced, Paused 차이를 확인합니다."},classic:{label:"4:3 캔버스 데모",description:"DeckX aspectRatio가 렌더러에 반영되는 샘플",detail:"16:9가 아닌 DeckX canvas도 발표자뷰와 슬라이드쇼에 동일하게 반영됩니다."},imageHeavy:{label:"이미지 헤비 데모",description:"96개 package-local 이미지를 로드하는 asset stress 샘플",detail:"이미지가 많은 DeckX에서 preview, overview, object URL 처리 비용을 확인합니다."},long120:{label:"120장 롱덱 데모",description:"많은 페이지에서 goto, search, overview 사용성을 확인하는 샘플",detail:"120장 DeckX를 통해 발표자뷰 썸네일 목록과 키보드 탐색 한계를 관찰합니다."},longImage:{label:"120장 이미지 롱덱 데모",description:"긴 DeckX와 package-local 이미지를 함께 로드하는 stress 샘플",detail:"120장 전체에 이미지가 포함된 DeckX로 탐색, 검색, 썸네일, asset 처리를 함께 관찰합니다."}},main:{loadingDeck:"DeckX deck loading...",loadingZip:"Local DeckX zip loading...",loadFailed:"DeckX deck load failed",openDefaultDemo:"기본 데모 열기"},player:{homeSubtitle:"DeckX를 열어 발표를 시작하세요",flowHeading:"열기 전에는 플레이어만 준비합니다",emptyTitle:"DeckX URL 또는 로컬 .deckx zip을 먼저 여세요.",emptyBody:"덱을 열면 미리보기와 발표 시작 버튼이 활성화되고, DeckX 상세 정보는 필요할 때만 펼쳐볼 수 있습니다.",flowOpenTitle:"1. DeckX 열기",flowOpenBody:"URL을 입력하거나 로컬 zip package를 선택합니다.",flowPreviewTitle:"2. 미리보기 확인",flowPreviewBody:"첫 슬라이드와 기본 발표 옵션을 확인합니다.",flowStartTitle:"3. 발표 시작",flowStartBody:"발표자뷰와 슬라이드쇼 창을 함께 실행합니다.",teamAreaTitle:"SSO와 팀 라이브러리 준비 영역",teamAreaBody:"지금은 브라우저 로컬 히스토리로 동작하고, 이후 로그인하면 업로드 DeckX와 공유 받은 DeckX를 동기화할 수 있습니다.",slides:"slides",planned:"planned",metadata:"metadata",runHeading:"발표 실행",start:"발표 시작",presenterOnly:"발표자뷰만",slideshowOnly:"슬라이드쇼만",options:"발표 옵션",projectHome:"프로젝트 소개",sourceMenu:"덱 열기 / 샘플",sourceHeading:"DeckX 열기",openUrl:"열기",localPackage:"LOCAL PACKAGE",localZip:"로컬 .deckx zip 선택",recentDeckx:"RECENT DeckX",noHistory:"아직 열어본 DeckX가 없습니다.",zipNeedsReselect:"다시 선택 필요",officialSamples:"OFFICIAL SAMPLES",details:"DeckX 상세 보기",validationIssuesNone:"Validation issues 없음.",moreIssuesHidden:e=>`${e} more issues hidden.`,sourceKind:{demo:"Demo DeckX",zip:"Local ZIP",url:"URL DeckX"},motionDescriptions:{full:"CSS motion and transitions enabled",reduced:"Motion compressed for review",paused:"Animations paused"}},presenter:{presets:{scriptFirst:"왼쪽 목록, 상단 긴 노트, 하단 Current/Next",balanced:"왼쪽 Current/Notes, 오른쪽 Next/List",review:"왼쪽 한 줄 목록, 오른쪽 작은 Next"},connectionTitle:"발표자뷰와 슬라이드쇼 창의 동기화 상태",gotoTitle:"슬라이드 번호로 이동",searchTitle:"제목, 본문, 노트 검색",openSlideshowTitle:"관객용 슬라이드쇼 창을 엽니다",openSlideshow:"슬라이드쇼 창 열기",settingsTitle:"발표자뷰 패널 배치를 선택합니다",closePresets:"프리셋 닫기",viewPresets:"뷰 프리셋",exit:"종료",noNotes:"발표자 노트가 없습니다.",prev:"이전",next:"다음",emptyPanels:"표시할 컴포넌트를 하나 이상 켜주세요.",ready:"준비됨",readiness:{summary:"운영 상태",deck:"현재 열려 있는 DeckX 제목입니다.",session:"발표자뷰와 슬라이드쇼가 공유하는 세션입니다.",popup:"슬라이드쇼 창 열기 상태입니다.",sync:"BroadcastChannel 기반 창 간 연결 상태입니다.",fullscreen:"현재 창의 풀스크린 상태입니다.",motion:"덱 CSS animation 재생 방식입니다. 도구 메뉴에서 변경합니다.",theme:"발표자뷰와 슬라이드쇼 chrome 테마입니다. 덱 내부 스타일은 바꾸지 않습니다.",pace:"계획 시간 대비 현재 발표 속도입니다.",filter:"관객용 화면 보정값입니다. 슬라이드쇼의 Display 메뉴에서 조정합니다.",wake:"화면 꺼짐 방지 요청 상태입니다.",mirror:"관객 화면 미러링 상태입니다.",validation:"DeckX package 검증 결과입니다.",notes:"발표자 노트가 연결된 슬라이드 수입니다."},tools:{label:"도구",motionDescription:"Full, Reduced, Paused 순서로 덱 애니메이션 재생 방식을 바꿉니다.",themeLabel:"쇼 테마",themeDescription:"발표자뷰와 슬라이드쇼 chrome을 Light/Dark로 전환합니다. 덱 스타일은 유지됩니다.",copyUrl:"URL 복사",copyUrlDescription:"현재 세션의 슬라이드쇼 URL을 복사합니다. 팝업 차단 시 수동 복구에 사용합니다.",wakeLockDescription:"지원 브라우저에서 화면 꺼짐 방지를 요청합니다.",mirrorDescription:"권한을 허용하면 발표자 화면 안에 관객 화면 확인용 미러를 띄웁니다."}},slideshow:{enterFullscreen:"풀스크린 시작",exitFullscreen:"풀스크린 종료",controls:"Slideshow controls",display:"Display",displayFilters:"Display filters",brightness:"Bright",contrast:"Contrast",saturation:"Sat"},runtime:{mobileCombined:"모바일에서는 현재 탭에서 슬라이드와 발표자뷰를 함께 표시합니다.",openingSlideshow:"슬라이드쇼 창을 여는 중입니다.",slideshowClosed:"발표자가 슬라이드쇼를 종료했습니다.",fullscreenFailed:"풀스크린을 시작할 수 없습니다. 브라우저 권한 또는 사용자 제스처가 필요합니다.",notesSaved:"노트 드래프트를 저장했습니다.",notesReset:"노트 드래프트를 원본으로 되돌렸습니다.",notesExported:"스피커 노트를 Markdown으로 내보냈습니다.",slideshowUrlCopied:"슬라이드쇼 URL을 복사했습니다.",searchEmpty:"검색어를 입력하거나 결과가 없습니다.",gotoEmpty:e=>`1-${e} 범위의 번호를 입력하세요.`},window:{popupBlocked:"팝업이 차단되었습니다. 브라우저에서 팝업을 허용한 뒤 다시 열어주세요.",opened:"슬라이드쇼 창을 열었습니다. 필요하면 외부 화면으로 이동한 뒤 풀스크린을 시작하세요.",unavailable:"외부 화면 자동 배치는 이 브라우저 또는 실행 컨텍스트에서 지원되지 않아 일반 창으로 엽니다.",noExternal:"외부 화면을 찾지 못해 일반 창으로 엽니다.",detected:"외부 화면 좌표를 감지했습니다. 슬라이드쇼 창을 해당 위치로 엽니다.",denied:"외부 화면 권한이 거부되었거나 사용할 수 없어 일반 창으로 엽니다."}},dr={en:lr,ko:cr};function Ue(e=ur()){const t=pt(e)??Bt;return{locale:t,messages:dr[t],hrefForLocale:pr}}function ur(){const e=new URLSearchParams(window.location.search),t=pt(e.get(ut));return t?(fr(t),t):mr()??Bt}function Pt(e){document.documentElement.lang=e.locale,document.title=e.messages.documentTitle}function pt(e){if(!e)return null;const t=e.toLowerCase().split("-")[0];return t==="en"||t==="ko"?t:null}function pr(e){const t=new URL(window.location.href);return t.searchParams.set(ut,e),`${t.pathname}${t.search}${t.hash}`}function mr(){try{return pt(window.localStorage.getItem(Vt))}catch{return null}}function fr(e){try{window.localStorage.setItem(Vt,e)}catch{return}}function Le(e){return e==="4:3"?{width:1024,height:768}:e==="16:9"?{width:1280,height:720}:{width:Rt(e.width,1280),height:Rt(e.height,720)}}function Rt(e,t){return!Number.isFinite(e)||e<=0?t:Math.round(e)}function Y(e,t,n,r){e.innerHTML="",e.appendChild(zt(t,n,r))}function zt(e,t,n){const r=e.slides[t];if(!r){const m=document.createElement("section");return m.className="slide slide-end",m.innerHTML='<p class="muted">END</p>',m}const s=document.createElement("section"),i=Le(e.aspectRatio);s.className=["slide",r.className,e.theme?.className].filter(Boolean).join(" "),s.dataset.slideId=r.id,s.style.setProperty("--slide-width",`${i.width}px`),s.style.setProperty("--slide-height",`${i.height}px`),s.style.width=`${i.width}px`,s.style.height=`${i.height}px`,gr(s,e.theme?.cssVars);const o=r.render?.({deck:e,slide:r,index:t,total:e.slides.length,mode:n});o instanceof HTMLElement?s.appendChild(o):typeof o=="string"?s.innerHTML=o:s.appendChild(hr(r));const c=document.createElement("div");c.className="slide-footer mono",c.textContent=r.footer||e.title;const h=document.createElement("div");return h.className="slide-page mono",h.textContent=`${String(t+1).padStart(2,"0")} / ${String(e.slides.length).padStart(2,"0")}`,s.append(c,h),s}function J(e,t=""){const n=Le(e.aspectRatio),r=document.createElement("div");r.className=`slide-wrap ${t}`.trim();const s=document.createElement("div");return s.className="slide-scaler",s.dataset.designWidth=String(n.width),s.dataset.designHeight=String(n.height),r.appendChild(s),r}function de(){document.querySelectorAll(".slide-scaler").forEach(e=>{const t=e.parentElement;if(!t)return;const n=Number(e.dataset.designWidth||1280),r=Number(e.dataset.designHeight||720),s=Math.min(t.clientWidth/n,t.clientHeight/r),i=(t.clientWidth-n*s)/2,o=(t.clientHeight-r*s)/2;e.style.width=`${n}px`,e.style.height=`${r}px`,e.style.transform=`scale(${s})`,e.style.left=`${i}px`,e.style.top=`${o}px`})}function hr(e){const t=document.createElement("div");if(t.className="slide-content",e.kicker){const n=document.createElement("div");n.className="slide-kicker mono",n.textContent=e.kicker,t.appendChild(n)}if(e.title){const n=document.createElement("h2");n.innerHTML=e.title,t.appendChild(n)}if(e.body){const n=document.createElement("div");n.className="slide-body",n.innerHTML=e.body,t.appendChild(n)}return t}function gr(e,t){t&&Object.entries(t).forEach(([n,r])=>{e.style.setProperty(n,r)})}function yr(e,t){const n=t.i18n.messages.player;e.innerHTML=`
    <main class="player-console player-console-empty">
      ${Wt(n.homeSubtitle,t.i18n,t.homeHref)}
      <section class="player-console-grid player-console-grid-empty" aria-label="DeckX player open screen">
        <aside class="player-panel player-open-panel">
          ${Kt(t)}
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
  `,Gt(e,t.actions)}function wr(e,t){const n=Le(t.deck.aspectRatio),r=t.deck.slides[0],s=Rr(t.deck),i=t.i18n.messages.player;e.innerHTML=`
    <main class="player-console">
      ${Wt(t.deck.title,t.i18n,t.actions.homeHref)}
      <section class="player-console-grid player-console-grid-loaded" aria-label="DeckX player launch console">
        <aside class="player-panel player-open-panel">
          ${Kt(t)}
        </aside>

        <section class="player-panel player-preview-panel">
          <div class="player-panel-heading split">
            <div>
              <span class="mono">${p(Jt(t.sourceKind,t.i18n))}</span>
              <h2>${p(Hr(r?.title||t.deck.title))}</h2>
            </div>
            <span class="player-count mono">01 / ${String(t.deck.slides.length).padStart(2,"0")}</span>
          </div>
          <div class="player-preview-stage" data-player-preview aria-label="First slide preview"></div>
          <div class="player-meta-strip" aria-label="Deck metadata">
            <span><strong>${t.deck.slides.length}</strong> ${p(i.slides)}</span>
            <span><strong>${p(Yt(t.deck.aspectRatio))}</strong> ${n.width}x${n.height}</span>
            <span><strong>${p(_t(s))}</strong> ${p(i.planned)}</span>
            <span><strong>${p(Nr(t.deck.metadata))}</strong> ${p(i.metadata)}</span>
          </div>
        </section>

        <aside class="player-panel player-run-panel">
          <div class="player-panel-heading">
            <span class="mono">RUN</span>
            <h2>${p(i.runHeading)}</h2>
          </div>
          <button class="btn primary player-start-button" type="button" data-action="start">${p(i.start)}</button>
          <div class="player-secondary-actions" aria-label="Secondary player actions">
            <button class="btn" type="button" data-action="presenter">${p(i.presenterOnly)}</button>
            <button class="btn" type="button" data-action="slideshow">${p(i.slideshowOnly)}</button>
          </div>
          <details class="player-settings-detail" open>
            <summary>${p(i.options)}</summary>
            ${Tr(t.motionMode,t.i18n)}
          </details>
          ${Cr(t,s)}
        </aside>
      </section>
    </main>
  `,kr(e,t.publicDeck),Sr(e,t.actions)}function Wt(e,t,n){const r=t.messages.player;return`
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
        ${vr(t)}
        ${n?`<a class="btn compact" href="${p(n)}">${p(r.projectHome)}</a>`:""}
      </div>
    </header>
  `}function vr(e){return`
    <nav class="locale-switch" aria-label="${p(e.messages.locale.label)}">
      ${ir.map(t=>br(t,e)).join("")}
    </nav>
  `}function br(e,t){const n=e.toUpperCase();return`
    <a
      class="locale-link ${e===t.locale?"active":""}"
      href="${p(t.hrefForLocale(e))}"
      hreflang="${e}"
      aria-current="${e===t.locale?"page":"false"}"
      title="${p(t.messages.locale[e])}"
    >${n}</a>
  `}function Kt(e){const t=e.i18n.messages.player;return`
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
        ${e.actions.onOpenDeckxUrl?Dr(e.actions.deckxUrlValue??"",e.actions.deckxStatus??"",e.i18n):""}
        ${e.actions.onOpenDeckxFile?Er(e.i18n):""}
        ${Lr(e.historyOptions,e.i18n)}
        ${e.demoOptions.length>0?Ar(e.demoOptions,e.i18n):""}
      </div>
    </details>
  `}function kr(e,t){const n=e.querySelector("[data-player-preview]");if(!n)return;const r=J(t,"player-preview-wrap"),s=r.querySelector(".slide-scaler");s&&(Y(s,t,0,"slideshow"),n.appendChild(r),window.requestAnimationFrame(de))}function Sr(e,t){Gt(e,t),e.querySelector('[data-action="start"]')?.addEventListener("click",t.onStart),e.querySelector('[data-action="presenter"]')?.addEventListener("click",t.onPresenterOnly),e.querySelector('[data-action="slideshow"]')?.addEventListener("click",t.onSlideshowOnly),e.querySelectorAll("[data-motion-mode]").forEach(n=>{n.addEventListener("click",()=>{t.onSetMotionMode(n.dataset.motionMode)})})}function Gt(e,t){$r(e);const n=e.querySelector("[data-deckx-url-form]");n?.addEventListener("submit",s=>{s.preventDefault();const o=n.querySelector("[data-deckx-url-input]")?.value.trim();o&&t.onOpenDeckxUrl?.(o)});const r=e.querySelector("[data-deckx-file-input]");r?.addEventListener("change",()=>{const s=r.files?.[0];s&&t.onOpenDeckxFile?.(s),r.value=""}),e.querySelectorAll("[data-action='select-local-deckx']").forEach(s=>{s.addEventListener("click",()=>r?.click())})}function $r(e){const t=window.matchMedia("(max-width: 640px)").matches;e.querySelectorAll("[data-player-source-menu]").forEach(n=>{t||(n.open=!0)})}function Dr(e,t,n){return`
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
  `}function Er(e){const t=e.messages.player;return`
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
  `}function Lr(e,t){const n=t.messages.player;return`
    <section class="player-history-list" aria-label="Recently opened DeckX">
      <span class="player-subhead mono">${p(n.recentDeckx)}</span>
      ${e.length===0?`<p class="player-empty-copy">${p(n.noHistory)}</p>`:e.map(r=>xr(r,t)).join("")}
    </section>
  `}function xr(e,t){return e.kind==="url"&&e.href?`
      <a class="player-history-option" href="${p(e.href)}">
        <span>${p(e.label)}</span>
        <small>URL · ${p(e.detail)}</small>
      </a>
    `:`
    <button class="player-history-option as-button" type="button" data-action="select-local-deckx">
      <span>${p(e.label)}</span>
      <small>ZIP · ${p(e.detail)} · ${p(t.messages.player.zipNeedsReselect)}</small>
    </button>
  `}function Ar(e,t){return`
    <nav class="player-demo-list" aria-label="Explicit demo DeckX packages">
      <span class="player-subhead mono">${p(t.messages.player.officialSamples)}</span>
      ${e.map(n=>`
            <a class="player-demo-option ${n.active?"active":""}" href="${p(n.href)}" aria-current="${n.active?"page":"false"}">
              <span><em>DEMO</em>${p(n.label)}</span>
              <small>${p(n.description)}</small>
            </a>
          `).join("")}
    </nav>
  `}function Tr(e,t){const n=t.messages.player.motionDescriptions;return`
    <div class="player-motion-block">
      <span class="player-subhead mono">MOTION MODE</span>
      <div class="player-motion-segment" role="group" aria-label="Motion controls">
        ${[{id:"full",label:"Full",description:n.full},{id:"reduced",label:"Reduced",description:n.reduced},{id:"paused",label:"Paused",description:n.paused}].map(s=>`
              <button
                type="button"
                class="motion-mode ${s.id===e?"active":""}"
                data-motion-mode="${s.id}"
                aria-pressed="${s.id===e}"
                title="${p(s.description)}"
              >${p(s.label)}</button>
            `).join("")}
      </div>
    </div>
  `}function Cr(e,t){const n=Le(e.deck.aspectRatio),r=e.validationReport.notesCoverage,s=e.validationReport.errorCount>0?"BLOCKED":e.validationReport.warningCount>0?"WARNINGS":"READY";return`
    <details class="player-deckx-details">
      <summary>${p(e.i18n.messages.player.details)}</summary>
      <dl class="player-detail-list">
        ${M("SOURCE",`${Jt(e.sourceKind,e.i18n)} · ${e.sourceLabel}`)}
        ${M("VALIDATION",`${s} · ${e.validationReport.errorCount} errors / ${e.validationReport.warningCount} warnings`)}
        ${M("NOTES",`${r.withNotes}/${r.total} notes · ${r.missing} missing`)}
        ${M("SESSION",e.sessionId)}
        ${M("DISPLAY",Ir(e.displayFilters))}
        ${M("CANVAS",`${Yt(e.deck.aspectRatio)} · ${Or(n)}`)}
        ${M("DURATION",_t(t))}
        ${Mr(e.deck.metadata)}
      </dl>
      ${Pr(e.validationReport,e.i18n)}
    </details>
  `}function Mr(e){if(!e)return"";const t=[];return e.description&&t.push(M("DESCRIPTION",e.description)),e.version&&t.push(M("VERSION",e.version)),e.authors?.length&&t.push(M("AUTHORS",Xr(e))),e.tags?.length&&t.push(M("TAGS",e.tags.join(", "))),e.language&&t.push(M("LANGUAGE",e.language)),e.license&&t.push(M("LICENSE",e.license)),e.homepage&&t.push(M("HOMEPAGE",e.homepage)),e.repository&&t.push(M("REPOSITORY",e.repository)),e.generator?.name&&t.push(M("GENERATOR",Ur(e))),(e.createdAt||e.updatedAt)&&t.push(M("DATES",[e.createdAt,e.updatedAt].filter(Boolean).join(" / "))),t.join("")}function M(e,t){return`
    <div class="player-detail-row">
      <dt class="mono">${p(e)}</dt>
      <dd>${p(t)}</dd>
    </div>
  `}function Pr(e,t){return e.issues.length===0?`<p class="player-empty-copy">${p(t.messages.player.validationIssuesNone)}</p>`:`
    <div class="player-issue-list">
      ${e.issues.slice(0,4).map(n=>`
            <div class="player-issue" data-severity="${n.severity}">
              <strong>${p(n.code)}</strong>
              <span>${p(n.message)}</span>
            </div>
          `).join("")}
      ${e.issues.length>4?`<p>${p(t.messages.player.moreIssuesHidden(e.issues.length-4))}</p>`:""}
    </div>
  `}function Rr(e){return typeof e.durationSec=="number"&&e.durationSec>0?e.durationSec:e.slides.reduce((t,n)=>t+(n.timingSec||0),0)}function _t(e){if(!e)return"No plan";const t=Math.floor(e/60),n=e%60;return t?n?`${t}m ${n}s`:`${t}m`:`${n}s`}function Yt(e){return typeof e=="string"?e:`${e.width}:${e.height}`}function Or(e){return`${e.width} x ${e.height}`}function Ir(e){return`B${e.brightness} C${e.contrast} S${e.saturation}`}function Nr(e){return e?e.tags?.length?e.tags.find(t=>t!=="stress"&&t!=="demo")??e.tags[0]:e.language?e.language:e.version?e.version:"present":"none"}function Xr(e){return(e.authors??[]).map(t=>[t.name,t.role].filter(Boolean).join(" · ")).join(", ")}function Ur(e){return e.generator?[e.generator.name,e.generator.version].filter(Boolean).join(" "):""}function Jt(e,t){return e==="demo"?t.messages.player.sourceKind.demo:e==="zip"?t.messages.player.sourceKind.zip:t.messages.player.sourceKind.url}function Hr(e){return e.replace(/<[^>]*>/g,"").replace(/\s+/g," ").trim()}function p(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}const st=[{id:"script-first",name:"Script First",descriptionKey:"scriptFirst",layout:{presetId:"script-first",showCurrent:!0,showNext:!0,showNotes:!0,showOverview:!0,notesFontSize:22},grid:{columns:"140px minmax(0, 2fr) minmax(0, 1fr)",rows:"auto minmax(0, 1.2fr) minmax(0, 1fr) auto",areas:`
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
      `}}];function Fr(e,t,n,r,s){const i=mt(s.layout.presetId),o=Jr(i.grid,s.layout.settingsOpen),c=s.layout.showCurrent||s.layout.showNext||s.layout.showNotes||s.layout.showOverview,h=window.matchMedia("(max-width: 760px)").matches,m=s.i18n.messages.presenter;e.innerHTML=`
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
              <div class="value mono pace-value" data-pace="${s.pace.state}" data-pace-label>${k(s.pace.label)}</div>
            </div>
          </div>
          <div class="topbar-group right">
            <span class="connection mono" title="${k(m.connectionTitle)}">
              <span class="status-dot" data-connection-dot data-connected="false"></span>
              <span data-connection>${s.connectionStatus}</span>
            </span>
            <button class="tool-btn" data-action="goto" title="${k(m.gotoTitle)}">Goto</button>
            <button class="tool-btn" data-action="search" title="${k(m.searchTitle)}">Search</button>
            <button class="tool-btn primary-tool" data-action="open" title="${k(m.openSlideshowTitle)}">${k(m.openSlideshow)}</button>
            ${qr(s)}
            <button class="tool-btn" data-action="settings" title="${k(m.settingsTitle)}">${k(s.layout.settingsOpen?m.closePresets:m.viewPresets)}</button>
            <button class="tool-btn danger" data-action="exit">${k(m.exit)}</button>
          </div>
        </div>
        ${jr(s,t)}
      </header>

      ${s.layout.settingsOpen?Br(s.layout,s.i18n):""}

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
                <div class="mobile-notes-content" style="font-size:${Math.max(15,s.layout.notesFontSize-5)}px">${It(s.notesText||m.noNotes)}</div>
              </div>
              <div class="mobile-nav-actions">
                <button class="btn compact" type="button" data-action="prev">${k(m.prev)}</button>
                <button class="btn compact primary" type="button" data-action="next">${k(m.next)}</button>
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
              <div class="notes-content" style="font-size:${s.layout.notesFontSize}px">${It(s.notesText)}</div>
            </section>`:""}

      ${s.layout.showOverview?`<section class="panel overview">
              <div class="panel-label mono">SLIDE LIST</div>
              <div class="overview-list" data-overview></div>
            </section>`:""}

      ${c?"":`<section class="panel empty-presenter">
              <p>${k(m.emptyPanels)}</p>
            </section>`}

      <footer class="bottombar">
        <div class="nav-dots" data-dots></div>
        <div class="bottom-status mono">${k(s.windowStatus?.message||m.ready)}</div>
        <div class="timer-controls">
          <button class="btn compact" data-action="pause">${r.timer.status==="paused"?"Resume":"Pause"}</button>
          <button class="btn compact" data-action="reset">Reset</button>
        </div>
      </footer>
    </main>
  `;const w=e.querySelector(".presenter");w&&(w.dataset.preset=i.id,Yr(w,o));const d=e.querySelector("[data-current]"),y=e.querySelector("[data-next]"),L=e.querySelector("[data-mobile-stage]"),C=e.querySelector("[data-mobile-current]"),x=e.querySelector("[data-mobile-next]");if(d){const $=J(n);d.appendChild($),Y($.querySelector(".slide-scaler"),n,r.index,"presenter")}if(y){const $=J(n);y.appendChild($),Y($.querySelector(".slide-scaler"),n,r.index+1,"presenter")}if(L){const $=J(n,"mobile-stage-wrap");L.appendChild($),Y($.querySelector(".slide-scaler"),n,r.index,"slideshow")}if(C){const $=J(n,"mobile-mini-wrap");C.appendChild($),Y($.querySelector(".slide-scaler"),n,r.index,"presenter")}if(x){const $=J(n,"mobile-mini-wrap");x.appendChild($),Y($.querySelector(".slide-scaler"),n,r.index+1,"presenter")}Wr(e,n,r.index,s.onGoto),Kr(e);const A=e.querySelector("[data-dots]");A&&n.slides.forEach(($,P)=>{const D=document.createElement("button");D.type="button",D.className=P===r.index?"active":"",D.textContent=String(P+1),D.addEventListener("click",()=>s.onGoto(P)),A.appendChild(D)}),zr(e,s),e.querySelector('[data-action="settings"]')?.addEventListener("click",()=>{s.onToggleSettings()}),e.querySelector('[data-action="goto"]')?.addEventListener("click",()=>{s.onOpenCommand("goto")}),e.querySelector('[data-action="search"]')?.addEventListener("click",()=>{s.onOpenCommand("search")}),e.querySelector('[data-action="prev"]')?.addEventListener("click",s.onPrev),e.querySelector('[data-action="next"]')?.addEventListener("click",s.onNext),e.querySelector('[data-action="motion"]')?.addEventListener("click",s.onCycleMotionMode),e.querySelector('[data-action="theme"]')?.addEventListener("click",s.onCycleRuntimeTheme),e.querySelector('[data-action="open"]')?.addEventListener("click",s.onOpenSlideshow),e.querySelector('[data-action="copy-url"]')?.addEventListener("click",s.onCopySlideshowUrl),e.querySelector('[data-action="exit"]')?.addEventListener("click",s.onExit),e.querySelector('[data-action="edit-notes"]')?.addEventListener("click",s.onEditNotes),e.querySelector('[data-action="export-notes"]')?.addEventListener("click",s.onExportNotes),e.querySelector('[data-action="wake-lock"]')?.addEventListener("click",s.onToggleWakeLock),e.querySelector('[data-action="mirror"]')?.addEventListener("click",s.onToggleMirror),e.querySelector('[data-action="pause"]')?.addEventListener("click",s.onPauseResume),e.querySelector('[data-action="reset"]')?.addEventListener("click",s.onResetTimer),de()}function jr(e,t){const n=e.windowStatus?.type??"idle",r=e.i18n.messages.presenter,s=e.validationReport.errorCount>0?`${e.validationReport.errorCount} errors`:`${e.validationReport.warningCount} warnings`,i=`${e.validationReport.notesCoverage.withNotes}/${e.validationReport.notesCoverage.total}`,o=e.validationReport.errorCount>0?"BLOCKED":e.connectionStatus==="CONNECTED"?"READY":"CHECK";return`
    <details class="readiness-detail">
      <summary>
        <span>${k(r.readiness.summary)}</span>
        <span class="readiness-summary-chip mono" data-readiness-state="${k(o.toLowerCase())}">${o}</span>
        <span class="readiness-summary-copy">SYNC ${k(e.connectionStatus)} · POPUP ${k(Nt(n))} · VALIDATION ${k(s)}</span>
      </summary>
      <div class="readiness-row" aria-label="Presentation setup preflight">
        ${N("DECK",t.title,"",r.readiness.deck)}
        ${N("SESSION",Qr(e.sessionId),"",r.readiness.session)}
        ${N("POPUP",Nt(n),n,r.readiness.popup)}
        ${N("SYNC",e.connectionStatus,"",r.readiness.sync)}
        ${N("FULLSCREEN",e.fullscreenActive?"ON":"OFF","",r.readiness.fullscreen)}
        ${N("MOTION",Zt(e.motionMode),"",r.readiness.motion)}
        ${N("THEME",Qt(e.runtimeTheme),"",r.readiness.theme)}
        ${N("PACE",e.pace.detail,e.pace.state,r.readiness.pace)}
        ${N("FILTER",Zr(e.displayFilters),"",r.readiness.filter)}
        ${N("WAKE",e.wakeLockStatus,"",r.readiness.wake)}
        ${N("MIRROR",e.mirrorStatus,"",r.readiness.mirror)}
        ${N("VALIDATION",s,e.validationReport.errorCount>0?"error":"ok",r.readiness.validation)}
        ${N("NOTES",i,"",r.readiness.notes)}
      </div>
    </details>
  `}function N(e,t,n="",r=""){return`
    <span class="readiness-item" data-readiness-state="${k(n)}" title="${k(r)}">
      <span class="readiness-label mono">${k(e)}</span>
      <span class="readiness-value mono">${k(t)}</span>
      ${r?`<span class="readiness-description">${k(r)}</span>`:""}
    </span>
  `}function qr(e){const t=e.i18n.messages.presenter.tools;return`
    <details class="presenter-tools-menu">
      <summary class="tool-btn">${k(t.label)}</summary>
      <div class="presenter-tools-panel">
        ${ve("motion",`Motion: ${Zt(e.motionMode)}`,t.motionDescription)}
        ${ve("theme",`${t.themeLabel}: ${Qt(e.runtimeTheme)}`,t.themeDescription)}
        ${ve("copy-url",t.copyUrl,t.copyUrlDescription)}
        ${ve("wake-lock","Keep Awake",t.wakeLockDescription)}
        ${ve("mirror","Audience Mirror",t.mirrorDescription)}
      </div>
    </details>
  `}function ve(e,t,n){return`
    <button class="tool-menu-control" type="button" data-action="${k(e)}">
      <strong>${k(t)}</strong>
      <span>${k(n)}</span>
    </button>
  `}function Br(e,t){return`
    <section class="panel layout-settings">
      <div class="preset-picker" role="radiogroup" aria-label="Presenter view presets">
        ${st.map(n=>Vr(n,e.presetId,t)).join("")}
      </div>
    </section>
  `}function Vr(e,t,n){return`
    <button
      type="button"
      class="preset-card ${e.id===t?"active":""}"
      data-preset-id="${e.id}"
      aria-pressed="${e.id===t}"
    >
      <span class="preset-name">${e.name}</span>
      <span class="preset-description">${k(n.messages.presenter.presets[e.descriptionKey])}</span>
      <span class="preset-map preset-map-${e.id}"><span class="preset-map-extra"></span></span>
    </button>
  `}function zr(e,t){e.querySelectorAll("[data-preset-id]").forEach(n=>{n.addEventListener("click",()=>{const r=n.dataset.presetId;t.onSelectPreset(r)})})}function Wr(e,t,n,r){const s=e.querySelector("[data-overview]");s&&t.slides.forEach((i,o)=>{const c=document.createElement("button");c.type="button",c.className=`overview-item ${o===n?"active":""}`,c.setAttribute("aria-label",`Slide ${o+1}: ${Gr(i.title||i.id)}`),c.addEventListener("click",()=>r(o)),c.addEventListener("keydown",y=>{const L=_r(y.key);if(L===0)return;y.preventDefault(),y.stopPropagation();const C=Array.from(s.querySelectorAll(".overview-item")),x=C.indexOf(c),A=Math.max(0,Math.min(C.length-1,x+L));C[A]?.focus()});const h=document.createElement("div"),m=Le(t.aspectRatio);h.className="overview-thumb",h.style.aspectRatio=`${m.width} / ${m.height}`;const w=document.createElement("div");w.className="overview-mini-slide",w.appendChild(zt(t,o,"presenter")),h.appendChild(w);const d=document.createElement("span");d.className="overview-number mono",d.textContent=String(o+1).padStart(2,"0"),c.append(h,d),s.appendChild(c)})}function Kr(e){e.querySelectorAll(".overview-thumb").forEach(t=>{const n=t.querySelector(".slide"),r=Number.parseFloat(n?.style.width||"1280"),s=t.clientWidth/r;t.style.setProperty("--overview-thumb-scale",String(s))})}function Gr(e){return e.replace(/<[^>]*>/g,"")}function _r(e){return e==="ArrowDown"||e==="ArrowRight"?1:e==="ArrowUp"||e==="ArrowLeft"?-1:0}function Yr(e,t){Object.entries(t).forEach(([n,r])=>{e.style.setProperty(n,r)})}function mt(e){return st.find(t=>t.id===e)??st[0]}function Jr(e,t){if(!t)return Ot(e.columns,e.rows,e.areas);const n=e.areas.trim().split(`
`).map(i=>i.trim()).find(Boolean),r=n?n.replaceAll('"',"").trim().split(/\s+/).length:1,s=`"${Array.from({length:r},()=>"settings").join(" ")}"`;return Ot(e.columns,e.rows.replace(/^auto\s+/,"auto auto "),e.areas.trim().replace(/^"[^"]+"/,`$&
${s}`))}function Ot(e,t,n){return{"grid-template-columns":e,"grid-template-rows":t,"grid-template-areas":n}}function It(e){return k(e).replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>").replace(/\n/g,"<br />")}function Zt(e){return e==="reduced"?"Reduced":e==="paused"?"Paused":"Full"}function Qt(e){return e==="dark"?"Dark":"Light"}function Zr(e){return`${e.brightness}/${e.contrast}/${e.saturation}`}function Nt(e){return e==="opened"?"OPENED":e==="popup-blocked"?"BLOCKED":e==="opening"?"OPENING":e==="window-management-denied"?"DENIED":e==="window-management-unavailable"?"FALLBACK":"READY"}function Qr(e){return e.length<=12?e:`${e.slice(0,6)}...${e.slice(-4)}`}function k(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function es(e,t,n,r){const s=r.i18n.messages.slideshow;e.innerHTML=`
    <main class="slideshow-stage" data-runtime-theme="${r.runtimeTheme}">
      <div data-slide-host style="${rs(r.displayFilters)}"></div>
      <div class="slideshow-toolbar" aria-label="${Ne(s.controls)}">
        <button class="fullscreen-btn" data-action="fullscreen">
          ${Ne(document.fullscreenElement?s.exitFullscreen:s.enterFullscreen)}
        </button>
        <button class="theme-toggle-btn" data-action="theme">
          Theme: ${ns(r.runtimeTheme)}
        </button>
        <button class="motion-toggle-btn" data-action="motion">
          Motion: ${ts(r.motionMode)}
        </button>
        <button class="display-filter-toggle-btn" data-action="display-filters" aria-expanded="${r.displayFiltersOpen}">
          ${Ne(s.display)}
        </button>
      </div>
      ${r.displayFiltersOpen?`<div class="display-filter-panel" aria-label="${Ne(s.displayFilters)}">
              ${Ge("brightness",s.brightness,r.displayFilters.brightness)}
              ${Ge("contrast",s.contrast,r.displayFilters.contrast)}
              ${Ge("saturation",s.saturation,r.displayFilters.saturation)}
            </div>`:""}
      <div class="fullscreen-status mono" data-fullscreen-status></div>
    </main>
  `;const i=e.querySelector("[data-slide-host]");if(i){const o=J(t,"slideshow-wrap");i.appendChild(o),Y(o.querySelector(".slide-scaler"),t,n.index,"slideshow")}e.querySelector('[data-action="fullscreen"]')?.addEventListener("click",r.onFullscreen),e.querySelector('[data-action="motion"]')?.addEventListener("click",r.onCycleMotionMode),e.querySelector('[data-action="theme"]')?.addEventListener("click",r.onCycleRuntimeTheme),e.querySelector('[data-action="display-filters"]')?.addEventListener("click",r.onToggleDisplayFilters),e.querySelectorAll("[data-filter-key]").forEach(o=>{o.addEventListener("input",()=>{const c=o.dataset.filterKey;r.onSetDisplayFilter(c,Number(o.value))})}),e.querySelector(".slideshow-stage")?.addEventListener("click",o=>{const c=o.target;c instanceof HTMLElement&&c.closest("button, input, label")||r.onNext()}),e.querySelector(".slideshow-stage")?.addEventListener("contextmenu",o=>{o.preventDefault(),r.onPrev()}),de()}function ts(e){return e==="reduced"?"Reduced":e==="paused"?"Paused":"Full"}function ns(e){return e==="dark"?"Dark":"Light"}function Ge(e,t,n){return`
    <label class="filter-control">
      <span class="mono">${t}</span>
      <input type="range" min="60" max="140" step="1" value="${n}" data-filter-key="${e}" />
    </label>
  `}function rs(e){return`filter: brightness(${e.brightness}%) contrast(${e.contrast}%) saturate(${e.saturation}%);`}function Ne(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}const be=6e3,Se={brightness:100,contrast:100,saturation:100},Xt="light",_e={presetId:"script-first",showCurrent:!0,showNext:!0,showNotes:!0,showOverview:!0,notesFontSize:22,settingsOpen:!1};function ss(e,t){const n=Kn(e),r=Fn(e),s=t.mount,i=t.i18n??Ue();let o=as(),c=os(e.id),h=ls(e.id),m=ds(e.id),w=ps(e.id),d=null,y=!1,L="",C=!1,x="",A=!1,$="off",P=null,D="off",V=null,se=c==="paused"?"full":c,u=me(hs(t.mode),gs(t.sessionId));return window.addEventListener("resize",de),document.addEventListener("keydown",ge),document.addEventListener("fullscreenchange",v),document.addEventListener("visibilitychange",Lt),ae(u),v(),{destroy:Me,getSessionId:()=>u.sessionId};function me(a,l){const g=rt("sender"),S=tr(e.id,l,n.slides.length),I=Ce(l,g,a),b={mode:a,sessionId:l,senderId:g,store:S,transport:I,unsubscribeStore:()=>{},unsubscribeTransport:()=>{},tickTimer:null,heartbeatTimer:null,lastWindowStatus:null};return b.unsubscribeStore=S.subscribe(v),b.unsubscribeTransport=I.subscribe(Ke=>qe(b,Ke)),b.tickTimer=window.setInterval(Pe,250),b}function Ce(a,l,g){return g==="landing"?new Mt:"BroadcastChannel"in window?new nr({deckId:e.id,sessionId:a,senderId:l,from:g==="slideshow"?"slideshow":"presenter"}):new Mt("BroadcastChannel is not supported in this browser.")}function q(a,l=u.sessionId){O(u),u=me(a,l),ae(u),ys(a,l),v()}function ae(a){a.mode==="slideshow"&&(G(a),a.transport.send({type:"hello",wantsState:!0})),a.mode==="presenter"&&(a.store.startTimer(),R(a),Q(a))}function O(a){a.unsubscribeStore(),a.unsubscribeTransport(),a.transport.close(),a.tickTimer!==null&&window.clearInterval(a.tickTimer),a.heartbeatTimer!==null&&window.clearInterval(a.heartbeatTimer)}function Me(){O(u),window.removeEventListener("resize",de),document.removeEventListener("keydown",ge),document.removeEventListener("fullscreenchange",v),document.removeEventListener("visibilitychange",Lt),Et(),xt()}function v(){if(document.body.dataset.mode=u.mode,document.body.dataset.motion=c,document.body.dataset.runtimeTheme=h,u.mode==="landing"){wr(s,{i18n:i,deck:e,publicDeck:n,sessionId:u.sessionId,sourceKind:t.sourceKind??"url",sourceLabel:t.sourceLabel??t.deckxUrlValue??e.id,validationReport:r,motionMode:c,displayFilters:m,demoOptions:t.demoOptions??[],historyOptions:t.historyOptions??[],actions:{onStart:()=>je(),onPresenterOnly:()=>q("presenter",u.sessionId),onSlideshowOnly:()=>q("slideshow",u.sessionId),onSetMotionMode:a=>ie(a),onOpenDeckxUrl:t.onOpenDeckxUrl,onOpenDeckxFile:t.onOpenDeckxFile,deckxUrlValue:t.deckxUrlValue,deckxStatus:t.deckxStatus,homeHref:t.homeHref}}),We();return}if(u.mode==="presenter"){Fr(s,e,n,u.store.getState(),{i18n:i,connectionStatus:oe(),windowStatus:u.lastWindowStatus,sessionId:u.sessionId,fullscreenActive:!!document.fullscreenElement,pace:vt(),notesText:ze(u.store.getState().index),notesHasDraft:Tn(u.store.getState().index),validationReport:r,displayFilters:m,wakeLockStatus:fs($),mirrorStatus:jt(D),layout:o,runtimeTheme:h,onNext:()=>T("next"),onPrev:()=>T("prev"),onGoto:a=>T("goto",a),onOpenCommand:a=>Be(a),onEditNotes:()=>kt(),onExportNotes:()=>Mn(),onPauseResume:()=>Z(u.store.getState().timer.status==="paused"?"resume":"pause"),onResetTimer:()=>Z("reset"),onOpenSlideshow:()=>fe(),onCopySlideshowUrl:()=>Pn(),onExit:()=>K(),onSelectPreset:he,onToggleSettings:Re,onToggleWakeLock:()=>Rn(),onToggleMirror:()=>On(),onCycleRuntimeTheme:we,motionMode:c,onCycleMotionMode:ye}),We();return}es(s,n,u.store.getState(),{i18n:i,onNext:()=>T("next"),onPrev:()=>T("prev"),onFullscreen:()=>Oe(),motionMode:c,onCycleMotionMode:ye,runtimeTheme:h,onCycleRuntimeTheme:we,displayFilters:m,displayFiltersOpen:C,onToggleDisplayFilters:()=>{C=!C,v()},onSetDisplayFilter:En}),We()}async function je(){if(qn()){q("presenter",u.sessionId),u.lastWindowStatus={type:"idle",message:i.messages.runtime.mobileCombined},v();return}q("presenter",u.sessionId),await fe()}async function fe(){u.lastWindowStatus={type:"opening",message:i.messages.runtime.openingSlideshow},v();const a=await ar({sessionId:u.sessionId,display:t.display??"auto",i18n:i,onStatus:l=>{u.lastWindowStatus=l,v()}});u.lastWindowStatus=a.status,v()}function K(){u.transport.send({type:"close-slideshow"}),q("landing",rt("session"))}function T(a,l){if(u.mode!=="landing"){if(u.mode==="presenter"){ee(u.store,a,l),R(u);return}u.transport.send({type:"nav-request",action:a,index:l}),u.store.isPeerConnected(be)||ee(u.store,a,l)}}function Z(a){if(u.mode==="presenter"){u.store.applyTimerCommand(a),R(u);return}u.transport.send({type:"timer-command",action:a})}function R(a){a.mode==="presenter"&&a.transport.send({type:"state-snapshot",state:a.store.getPublicState()})}function Q(a){a.mode!=="landing"&&a.transport.send({type:"runtime-preferences",motionMode:c,displayFilters:m,runtimeTheme:h})}function qe(a,l){switch(a.store.markPeerSeen(),l.body.type){case"hello":a.mode==="presenter"&&(R(a),Q(a));break;case"state-snapshot":a.mode==="slideshow"&&l.from==="presenter"&&a.store.applySnapshot(l.body.state);break;case"nav-request":a.mode==="presenter"&&(ee(a.store,l.body.action,l.body.index),R(a));break;case"timer-command":a.mode==="presenter"&&(a.store.applyTimerCommand(l.body.action),R(a));break;case"runtime-preferences":ie(l.body.motionMode,{publish:!1}),l.body.displayFilters&&yt(l.body.displayFilters,{publish:!1}),l.body.runtimeTheme&&wt(l.body.runtimeTheme,{publish:!1});break;case"ping":a.transport.send({type:"pong",stateVersion:a.store.getState().stateVersion}),a.mode==="presenter"&&R(a);break;case"pong":break;case"close-slideshow":a.mode==="slideshow"&&(window.close(),s.innerHTML=`<div class="system-message">${W(i.messages.runtime.slideshowClosed)}</div>`);break}}function ee(a,l,g){l==="next"&&a.goto(a.getState().index+1),l==="prev"&&a.goto(a.getState().index-1),l==="goto"&&typeof g=="number"&&a.goto(g)}function G(a){a.heartbeatTimer=window.setInterval(()=>{a.transport.send({type:"ping"}),a.store.isPeerConnected(be)||a.transport.send({type:"hello",wantsState:!0})},1e3)}function Pe(){u.mode!=="landing"&&(u.store.refreshPeer(be),te())}function te(){const a=document.querySelector("[data-clock]");a&&(a.textContent=ms(new Date));const l=document.querySelector("[data-elapsed]");l&&(l.textContent=u.store.getElapsedLabel());const g=vt(),S=document.querySelector("[data-pace-label]");S&&(S.textContent=g.label,S.dataset.pace=g.state);const I=document.querySelector("[data-connection]");I&&(I.textContent=oe());const b=document.querySelector("[data-connection-dot]");b&&(b.dataset.connected=String(u.store.isPeerConnected(be)))}function oe(){return"BroadcastChannel"in window?u.store.isPeerConnected(be)?"CONNECTED":"DISCONNECTED":"UNSUPPORTED"}function he(a){const l=mt(a);o=at({...l.layout,settingsOpen:o.settingsOpen}),Ut(o),v()}function Re(){o=at({...o,settingsOpen:!o.settingsOpen}),Ut(o),v()}function ge(a){if(u.mode!=="landing"&&!ws(a.target)){if(a.key==="ArrowRight"||a.key===" "||a.key==="PageDown"){a.preventDefault(),T("next");return}if(a.key==="ArrowLeft"||a.key==="PageUp"){a.preventDefault(),T("prev");return}if(a.key==="Home"){a.preventDefault(),T("goto",0);return}if(a.key==="End"){a.preventDefault(),T("goto",n.slides.length-1);return}if(a.key.toLowerCase()==="f"){a.preventDefault(),Oe();return}if(a.key.toLowerCase()==="r"){a.preventDefault(),Z("reset");return}if(a.key.toLowerCase()==="p"){a.preventDefault(),Z(u.store.getState().timer.status==="paused"?"resume":"pause");return}if(a.key.toLowerCase()==="m"){a.preventDefault(),Ie();return}if(a.key.toLowerCase()==="g"){a.preventDefault(),Be("goto");return}if(a.key==="/"){a.preventDefault(),Be("search");return}a.key.toLowerCase()==="n"&&u.mode==="presenter"&&(a.preventDefault(),kt())}}function Oe(){if(document.fullscreenElement){document.exitFullscreen().catch(()=>{});return}document.documentElement.requestFullscreen({navigationUI:"hide"}).catch(()=>{const a=document.querySelector("[data-fullscreen-status]");a&&(a.textContent=i.messages.runtime.fullscreenFailed)})}function ye(){if(c==="full"){ie("reduced");return}if(c==="reduced"){ie("paused");return}ie("full")}function we(){wt(h==="light"?"dark":"light")}function Ie(){ie(c==="paused"?se:"paused")}function ie(a,l={}){a!=="paused"&&(se=a),a!==c&&(c=a,is(e.id,c),document.body.dataset.motion=c,l.publish!==!1&&Q(u),v())}function En(a,l){yt({...m,[a]:Xe(l,60,140)})}function yt(a,l={}){m=en(a),us(e.id,m),l.publish!==!1&&Q(u),v()}function wt(a,l={}){a!==h&&(h=a,cs(e.id,h),document.body.dataset.runtimeTheme=h,l.publish!==!1&&Q(u),v())}function vt(){const a=u.store.getState(),l=Ln();if(!l)return{label:"NO PLAN",detail:"NO PLAN",state:"none"};const g=qt(a.timer)/1e3,S=bt(a.index),I=bt(a.index+1),b=20;return g<S-b?{label:"AHEAD",detail:`${Ft(g-S)} vs plan`,state:"ahead"}:g>I+b?{label:"BEHIND",detail:`${Ft(g-I)} vs plan`,state:"behind"}:{label:"ON TRACK",detail:`${ot(g)} / ${ot(l)}`,state:"on-track"}}function Ln(){if(typeof e.durationSec=="number"&&e.durationSec>0)return e.durationSec;const a=e.slides.reduce((l,g)=>l+(g.timingSec||0),0);return a>0?a:0}function bt(a){const l=e.durationSec&&e.slides.length>0?e.durationSec/e.slides.length:0;return e.slides.slice(0,a).reduce((g,S)=>g+(S.timingSec||l),0)}function Be(a){d={mode:a,query:a==="goto"?String(u.store.getState().index+1):""},v()}function xn(){d=null,v()}function An(){if(!d)return;if(d.mode==="goto"){const l=Number.parseInt(d.query,10);Number.isFinite(l)&&T("goto",l-1),d=null,v();return}const a=Ve(d.query)[0];a&&T("goto",a.index),d=null,v()}function Ve(a){const l=a.trim().toLowerCase();return l?e.slides.map((g,S)=>({index:S,title:Ye(g.title||g.id||`Slide ${S+1}`),notes:g.notes||"",haystack:[g.title,g.body,g.notes,g.id].filter(Boolean).join(" ").toLowerCase()})).filter(g=>g.haystack.includes(l)).slice(0,8):[]}function ze(a){const l=e.slides[a];return l?w[l.id]??l.notes??"":""}function Tn(a){const l=e.slides[a];return!!(l&&Object.prototype.hasOwnProperty.call(w,l.id))}function kt(){L=ze(u.store.getState().index),y=!0,v()}function St(){y=!1,v()}function $t(){const a=e.slides[u.store.getState().index];a&&(w={...w,[a.id]:L},Ht(e.id,w),y=!1,x=i.messages.runtime.notesSaved,v())}function Cn(){const a=e.slides[u.store.getState().index];if(!a)return;const l={...w};delete l[a.id],w=l,Ht(e.id,w),L=a.notes||"",y=!1,x=i.messages.runtime.notesReset,v()}function Mn(){const a=[`# ${e.title} Speaker Notes`,"",...e.slides.flatMap((I,b)=>[`## ${b+1}. ${Ye(I.title||I.id)}`,"",ze(b)||"_No speaker notes._",""])].join(`
`),l=new Blob([a],{type:"text/markdown;charset=utf-8"}),g=URL.createObjectURL(l),S=document.createElement("a");S.href=g,S.download=`${e.id}-speaker-notes.md`,S.click(),URL.revokeObjectURL(g),x=i.messages.runtime.notesExported,v()}async function Pn(){const a=Hn();try{await navigator.clipboard?.writeText(a),x=i.messages.runtime.slideshowUrlCopied}catch{x=a}v()}async function Rn(){if(P){A=!1,await Et(),$="off",v();return}A=!0,await Dt(),v()}async function Dt(){const a=navigator;if(!a.wakeLock){$="unsupported";return}try{P=await a.wakeLock.request("screen"),$="active",P.addEventListener("release",()=>{P=null,$="off",v()})}catch{P=null,$="denied"}}async function Et(){const a=P;P=null,a&&await a.release().catch(()=>{})}function Lt(){document.visibilityState==="visible"&&A&&!P&&Dt().then(v)}async function On(){if(V||D==="fallback"){xt(),D="off",v();return}const a=navigator,l=a.mediaDevices?.getDisplayMedia;if(!l){D="fallback",v();return}try{V=await l.call(a.mediaDevices,{video:!0,audio:!1}),D="active"}catch{D="fallback"}v()}function xt(){V?.getTracks().forEach(a=>a.stop()),V=null}function We(){d&&In(),y&&Nn(),u.mode==="presenter"&&D!=="off"&&Xn(),x&&Un()}function In(){if(!d)return;const a=d.mode==="search"?Ve(d.query):[],l=d.mode==="goto"?"Go to slide":"Search slides",g=d.mode==="goto"?"Slide number":"Title, body, or notes";s.insertAdjacentHTML("beforeend",`
        <div class="command-overlay" role="dialog" aria-modal="true" aria-label="${l}">
          <div class="command-box">
            <div class="command-title mono">${l}</div>
            <input class="command-input" data-command-input value="${W(d.query)}" placeholder="${g}" />
            <div class="command-results">
              ${d.mode==="search"?a.map(b=>At(b.index,b.title,b.notes)).join("")||`<div class="command-empty">${W(i.messages.runtime.searchEmpty)}</div>`:`<div class="command-empty">${W(i.messages.runtime.gotoEmpty(n.slides.length))}</div>`}
            </div>
          </div>
        </div>
      `);const S=s.querySelector("[data-command-input]");window.requestAnimationFrame(()=>{S?.focus(),S?.setSelectionRange(0,S.value.length)}),S?.addEventListener("input",()=>{d={...d,query:S.value},I()}),S?.addEventListener("keydown",b=>{b.key==="Escape"&&(b.preventDefault(),xn()),b.key==="Enter"&&(b.preventDefault(),An())}),s.querySelectorAll("[data-command-goto]").forEach(b=>{b.addEventListener("click",()=>{T("goto",Number(b.dataset.commandGoto)),d=null,v()})});function I(){if(d?.mode!=="search")return;const b=s.querySelector(".command-results");if(!b)return;const Ke=Ve(d.query);b.innerHTML=Ke.map(le=>At(le.index,le.title,le.notes)).join("")||`<div class="command-empty">${W(i.messages.runtime.searchEmpty)}</div>`,b.querySelectorAll("[data-command-goto]").forEach(le=>{le.addEventListener("click",()=>{T("goto",Number(le.dataset.commandGoto)),d=null,v()})})}}function At(a,l,g){const S=Ye(g).slice(0,86);return`
      <button class="command-result" data-command-goto="${a}" type="button">
        <span class="mono">${String(a+1).padStart(2,"0")}</span>
        <span>${W(l)}</span>
        <small>${W(S)}</small>
      </button>
    `}function Nn(){s.insertAdjacentHTML("beforeend",`
        <div class="command-overlay" role="dialog" aria-modal="true" aria-label="Speaker notes editor">
          <div class="notes-editor-box">
            <div class="command-title mono">Speaker Notes Draft</div>
            <textarea class="notes-editor" data-notes-editor>${W(L)}</textarea>
            <div class="modal-actions">
              <button class="btn compact" data-action="notes-cancel">Cancel</button>
              <button class="btn compact" data-action="notes-reset">Reset</button>
              <button class="btn compact primary" data-action="notes-save">Save Draft</button>
            </div>
          </div>
        </div>
      `);const a=s.querySelector("[data-notes-editor]");window.requestAnimationFrame(()=>a?.focus()),a?.addEventListener("input",()=>{L=a.value}),a?.addEventListener("keydown",l=>{l.key==="Escape"&&(l.preventDefault(),St()),l.key==="Enter"&&(l.metaKey||l.ctrlKey)&&(l.preventDefault(),$t())}),s.querySelector('[data-action="notes-cancel"]')?.addEventListener("click",St),s.querySelector('[data-action="notes-reset"]')?.addEventListener("click",Cn),s.querySelector('[data-action="notes-save"]')?.addEventListener("click",$t)}function Xn(){s.insertAdjacentHTML("beforeend",`
        <aside class="audience-mirror">
          <div class="mirror-header mono">AUDIENCE MIRROR · ${jt(D)}</div>
          <div class="mirror-body" data-mirror-body></div>
        </aside>
      `);const a=s.querySelector("[data-mirror-body]");if(!a)return;if(D==="active"&&V){const g=document.createElement("video");g.autoplay=!0,g.muted=!0,g.playsInline=!0,g.srcObject=V,a.appendChild(g);return}const l=J(n,"mirror-fallback-wrap");a.appendChild(l),Y(l.querySelector(".slide-scaler"),n,u.store.getState().index,"presenter"),de()}function Un(){s.insertAdjacentHTML("beforeend",`<div class="transient-status mono" data-transient-status>${W(x)}</div>`),window.setTimeout(()=>{x="",document.querySelector("[data-transient-status]")?.remove()},2400)}function Hn(){const a=new URL(window.location.href);return a.hash="slideshow",a.searchParams.set("sessionId",u.sessionId),a.toString()}}function as(){try{const e=window.localStorage.getItem("deckx-player:layout");return e?at({..._e,...JSON.parse(e)}):_e}catch{return _e}}function Ut(e){try{window.localStorage.setItem("deckx-player:layout",JSON.stringify(e))}catch{return}}function os(e){try{const t=window.localStorage.getItem(`deckx-player:${e}:motion`)||window.localStorage.getItem("deckx-player:motion");if(t==="full"||t==="reduced"||t==="paused")return t}catch{return"full"}return"full"}function is(e,t){try{window.localStorage.setItem(`deckx-player:${e}:motion`,t)}catch{return}}function ls(e){try{const t=window.localStorage.getItem(`deckx-player:${e}:runtime-theme`)||window.localStorage.getItem("deckx-player:runtime-theme");if(t==="light"||t==="dark")return t}catch{return Xt}return Xt}function cs(e,t){try{window.localStorage.setItem(`deckx-player:${e}:runtime-theme`,t)}catch{return}}function ds(e){try{const t=window.localStorage.getItem(`deckx-player:${e}:display-filters`);return t?en(JSON.parse(t)):Se}catch{return Se}}function us(e,t){try{window.localStorage.setItem(`deckx-player:${e}:display-filters`,JSON.stringify(t))}catch{return}}function en(e){return{brightness:Xe(e.brightness??Se.brightness,60,140),contrast:Xe(e.contrast??Se.contrast,60,140),saturation:Xe(e.saturation??Se.saturation,60,140)}}function ps(e){try{const t=window.localStorage.getItem(`deckx-player:${e}:notes-drafts`);if(!t)return{};const n=JSON.parse(t);return Object.fromEntries(Object.entries(n).filter(r=>typeof r[1]=="string"))}catch{return{}}}function Ht(e,t){try{window.localStorage.setItem(`deckx-player:${e}:notes-drafts`,JSON.stringify(t))}catch{return}}function at(e){return{...mt(e.presetId).layout,settingsOpen:!!e.settingsOpen}}function ms(e){const t=String(e.getHours()).padStart(2,"0"),n=String(e.getMinutes()).padStart(2,"0"),r=String(e.getSeconds()).padStart(2,"0");return`${t}:${n}:${r}`}function ot(e){const t=Math.max(0,Math.floor(e)),n=Math.floor(t/60),r=t%60;return`${String(n).padStart(2,"0")}:${String(r).padStart(2,"0")}`}function Ft(e){return`${e>=0?"+":"-"}${ot(Math.abs(e))}`}function fs(e){return e==="active"?"ACTIVE":e==="unsupported"?"UNSUPPORTED":e==="denied"?"DENIED":"OFF"}function jt(e){return e==="active"?"ACTIVE":e==="fallback"?"FALLBACK":e==="unsupported"?"UNSUPPORTED":e==="denied"?"DENIED":"OFF"}function Ye(e){return e.replace(/<[^>]*>/g,"")}function W(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Xe(e,t,n){return Number.isFinite(e)?Math.min(n,Math.max(t,Math.round(e))):t}function hs(e){if(e)return e;const t=window.location.hash.replace("#",""),r=new URLSearchParams(window.location.search).get("mode")||t;return r==="presenter"||r==="slideshow"||r==="landing"?r:"landing"}function gs(e){return e||new URLSearchParams(window.location.search).get("sessionId")||rt("session")}function ys(e,t){const n=new URL(window.location.href);n.hash=e,n.searchParams.set("sessionId",t),window.history.replaceState({},"",n.toString())}function ws(e){return e instanceof HTMLElement?e.isContentEditable||["INPUT","TEXTAREA","SELECT"].includes(e.tagName):!1}var U=Uint8Array,ce=Uint16Array,vs=Int32Array,tn=new U([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),nn=new U([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),bs=new U([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),rn=function(e,t){for(var n=new ce(31),r=0;r<31;++r)n[r]=t+=1<<e[r-1];for(var s=new vs(n[30]),r=1;r<30;++r)for(var i=n[r];i<n[r+1];++i)s[i]=i-n[r]<<5|r;return{b:n,r:s}},sn=rn(tn,2),an=sn.b,ks=sn.r;an[28]=258,ks[258]=28;var Ss=rn(nn,0),$s=Ss.b,it=new ce(32768);for(var E=0;E<32768;++E){var _=(E&43690)>>1|(E&21845)<<1;_=(_&52428)>>2|(_&13107)<<2,_=(_&61680)>>4|(_&3855)<<4,it[E]=((_&65280)>>8|(_&255)<<8)>>1}var $e=(function(e,t,n){for(var r=e.length,s=0,i=new ce(t);s<r;++s)e[s]&&++i[e[s]-1];var o=new ce(t);for(s=1;s<t;++s)o[s]=o[s-1]+i[s-1]<<1;var c;if(n){c=new ce(1<<t);var h=15-t;for(s=0;s<r;++s)if(e[s])for(var m=s<<4|e[s],w=t-e[s],d=o[e[s]-1]++<<w,y=d|(1<<w)-1;d<=y;++d)c[it[d]>>h]=m}else for(c=new ce(r),s=0;s<r;++s)e[s]&&(c[s]=it[o[e[s]-1]++]>>15-e[s]);return c}),xe=new U(288);for(var E=0;E<144;++E)xe[E]=8;for(var E=144;E<256;++E)xe[E]=9;for(var E=256;E<280;++E)xe[E]=7;for(var E=280;E<288;++E)xe[E]=8;var on=new U(32);for(var E=0;E<32;++E)on[E]=5;var Ds=$e(xe,9,1),Es=$e(on,5,1),Je=function(e){for(var t=e[0],n=1;n<e.length;++n)e[n]>t&&(t=e[n]);return t},B=function(e,t,n){var r=t/8|0;return(e[r]|e[r+1]<<8)>>(t&7)&n},Ze=function(e,t){var n=t/8|0;return(e[n]|e[n+1]<<8|e[n+2]<<16)>>(t&7)},Ls=function(e){return(e+7)/8|0},ft=function(e,t,n){return(t==null||t<0)&&(t=0),(n==null||n>e.length)&&(n=e.length),new U(e.subarray(t,n))},xs=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],X=function(e,t,n){var r=new Error(t||xs[e]);if(r.code=e,Error.captureStackTrace&&Error.captureStackTrace(r,X),!n)throw r;return r},As=function(e,t,n,r){var s=e.length,i=r?r.length:0;if(!s||t.f&&!t.l)return n||new U(0);var o=!n,c=o||t.i!=2,h=t.i;o&&(n=new U(s*3));var m=function(ye){var we=n.length;if(ye>we){var Ie=new U(Math.max(we*2,ye));Ie.set(n),n=Ie}},w=t.f||0,d=t.p||0,y=t.b||0,L=t.l,C=t.d,x=t.m,A=t.n,$=s*8;do{if(!L){w=B(e,d,1);var P=B(e,d+1,3);if(d+=3,P)if(P==1)L=Ds,C=Es,x=9,A=5;else if(P==2){var u=B(e,d,31)+257,me=B(e,d+10,15)+4,Ce=u+B(e,d+5,31)+1;d+=14;for(var q=new U(Ce),ae=new U(19),O=0;O<me;++O)ae[bs[O]]=B(e,d+O*3,7);d+=me*3;for(var Me=Je(ae),v=(1<<Me)-1,je=$e(ae,Me,1),O=0;O<Ce;){var fe=je[B(e,d,v)];d+=fe&15;var D=fe>>4;if(D<16)q[O++]=D;else{var K=0,T=0;for(D==16?(T=3+B(e,d,3),d+=2,K=q[O-1]):D==17?(T=3+B(e,d,7),d+=3):D==18&&(T=11+B(e,d,127),d+=7);T--;)q[O++]=K}}var Z=q.subarray(0,u),R=q.subarray(u);x=Je(Z),A=Je(R),L=$e(Z,x,1),C=$e(R,A,1)}else X(1);else{var D=Ls(d)+4,V=e[D-4]|e[D-3]<<8,se=D+V;if(se>s){h&&X(0);break}c&&m(y+V),n.set(e.subarray(D,se),y),t.b=y+=V,t.p=d=se*8,t.f=w;continue}if(d>$){h&&X(0);break}}c&&m(y+131072);for(var Q=(1<<x)-1,qe=(1<<A)-1,ee=d;;ee=d){var K=L[Ze(e,d)&Q],G=K>>4;if(d+=K&15,d>$){h&&X(0);break}if(K||X(2),G<256)n[y++]=G;else if(G==256){ee=d,L=null;break}else{var Pe=G-254;if(G>264){var O=G-257,te=tn[O];Pe=B(e,d,(1<<te)-1)+an[O],d+=te}var oe=C[Ze(e,d)&qe],he=oe>>4;oe||X(3),d+=oe&15;var R=$s[he];if(he>3){var te=nn[he];R+=Ze(e,d)&(1<<te)-1,d+=te}if(d>$){h&&X(0);break}c&&m(y+131072);var Re=y+Pe;if(y<R){var ge=i-R,Oe=Math.min(R,Re);for(ge+y<0&&X(3);y<Oe;++y)n[y]=r[ge+y]}for(;y<Re;++y)n[y]=n[y-R]}}t.l=L,t.p=ee,t.b=y,t.f=w,L&&(w=1,t.m=x,t.d=C,t.n=A)}while(!w);return y!=n.length&&o?ft(n,0,y):n.subarray(0,y)},Ts=new U(0),z=function(e,t){return e[t]|e[t+1]<<8},F=function(e,t){return(e[t]|e[t+1]<<8|e[t+2]<<16|e[t+3]<<24)>>>0},Qe=function(e,t){return F(e,t)+F(e,t+4)*4294967296};function Cs(e,t){return As(e,{i:2},t&&t.out,t&&t.dictionary)}var lt=typeof TextDecoder<"u"&&new TextDecoder,Ms=0;try{lt.decode(Ts,{stream:!0}),Ms=1}catch{}var Ps=function(e){for(var t="",n=0;;){var r=e[n++],s=(r>127)+(r>223)+(r>239);if(n+s>e.length)return{s:t,r:ft(e,n-1)};s?s==3?(r=((r&15)<<18|(e[n++]&63)<<12|(e[n++]&63)<<6|e[n++]&63)-65536,t+=String.fromCharCode(55296|r>>10,56320|r&1023)):s&1?t+=String.fromCharCode((r&31)<<6|e[n++]&63):t+=String.fromCharCode((r&15)<<12|(e[n++]&63)<<6|e[n++]&63):t+=String.fromCharCode(r)}};function ln(e,t){if(t){for(var n="",r=0;r<e.length;r+=16384)n+=String.fromCharCode.apply(null,e.subarray(r,r+16384));return n}else{if(lt)return lt.decode(e);var s=Ps(e),i=s.s,n=s.r;return n.length&&X(8),i}}var Rs=function(e,t){return t+30+z(e,t+26)+z(e,t+28)},Os=function(e,t,n){var r=z(e,t+28),s=z(e,t+30),i=ln(e.subarray(t+46,t+46+r),!(z(e,t+8)&2048)),o=t+46+r,c=Is(e,o,s,n,F(e,t+20),F(e,t+24),F(e,t+42)),h=c[0],m=c[1],w=c[2];return[z(e,t+10),h,m,i,o+s+z(e,t+32),w]},Is=function(e,t,n,r,s,i,o){var c=s==4294967295,h=i==4294967295,m=o==4294967295,w=t+n,d=c+h+m;if(r&&d){for(;t+4<w;t+=4+z(e,t+2))if(z(e,t)==1)return[c?Qe(e,t+4+8*h):s,h?Qe(e,t+4):i,m?Qe(e,t+4+8*(h+c)):o,1];r<2&&X(13)}return[s,i,o,0]};function Ns(e,t){for(var n={},r=e.length-22;F(e,r)!=101010256;--r)(!r||e.length-r>65558)&&X(13);var s=z(e,r+8);if(!s)return{};var i=F(e,r+16),o=F(e,r-20)==117853008;if(o){var c=F(e,r-12);o=F(e,c)==101075792,o&&(s=F(e,c+32),i=F(e,c+48))}for(var h=0;h<s;++h){var m=Os(e,i,o),w=m[0],d=m[1],y=m[2],L=m[3],C=m[4],x=m[5],A=Rs(e,x);i=C,w?w==8?n[L]=Cs(e.subarray(A,A+d),{out:new U(y)}):X(14,"unknown compression type "+w):n[L]=ft(e,A,A+d)}return n}const Xs="deckx.deck.v1";async function Us(e){const t=new URL(e,window.location.href).toString(),n=await fetch(t);if(!n.ok)throw new Error(`DeckX package fetch failed (${n.status} ${n.statusText}).`);return cn(new Uint8Array(await n.arrayBuffer()),t)}function cn(e,t="inline.deckx"){const n=Gs(Ns(e));return Hs(n,t)}function Hs(e,t){const n=_s(e);if(!n)throw new Error("DeckX package is missing manifest.json.");const r=zs(He(e,n),n),s=ct(n),i=[],o=m=>{const w=e[m];if(!w)throw new Error(`DeckX asset is missing: ${m}`);const d=w.buffer.slice(w.byteOffset,w.byteOffset+w.byteLength),y=URL.createObjectURL(new Blob([d],{type:Zs(m)}));return i.push(y),y},c=r.theme?.css?dn(He(e,ue(s,r.theme.css)),ct(ue(s,r.theme.css)),o):"";return{deck:{id:r.id,title:r.title,aspectRatio:r.aspectRatio,durationSec:r.durationSec,theme:{name:"DeckX Package",className:`deckx-package-${Js(r.id)}`},metadata:Fs(r.metadata,s,o),slides:r.slides.map(m=>js(m,e,s,o))},cssText:c,sourceUrl:t,dispose:()=>{i.forEach(m=>URL.revokeObjectURL(m))}}}function Fs(e,t,n){if(e)return{version:e.version,description:e.description,authors:e.authors?.map(r=>({...r})),tags:e.tags?[...e.tags]:void 0,language:e.language,license:e.license,homepage:e.homepage,repository:e.repository,thumbnail:e.thumbnail?n(ue(t,e.thumbnail)):void 0,createdAt:e.createdAt,updatedAt:e.updatedAt,generator:e.generator?{...e.generator}:void 0,custom:e.custom?{...e.custom}:void 0}}function js(e,t,n,r){const s=ue(n,e.source),i=e.notes?ue(n,e.notes):null,o=qs(He(t,s),ct(s),r);return{id:e.id,title:e.title,notes:i&&t[i]?He(t,i):void 0,footer:e.footer,className:e.className,timingSec:e.timingSec,render:()=>o}}function qs(e,t,n){if(/<\/?(html|head|body)\b/i.test(e))throw new Error("DeckX slide HTML must be a fragment, not a full document.");const r=document.createElement("template");if(r.innerHTML=e,r.content.querySelector("script"))throw new Error("Safe DeckX slides cannot include <script>.");return r.content.querySelectorAll("*").forEach(s=>{Array.from(s.attributes).forEach(i=>{const o=i.name.toLowerCase(),c=i.value;if(o.startsWith("on"))throw new Error("Safe DeckX slides cannot include inline event handlers.");if(o==="style"){s.setAttribute(o,dn(c,t,n));return}if(o==="src"||o==="poster"||Bs(s,o,c)){s.setAttribute(o,ht(c,t,n));return}o==="srcset"&&s.setAttribute(o,Vs(c,t,n))})}),r.innerHTML}function Bs(e,t,n){return!(t!=="href"&&t!=="xlink:href"||e.tagName.toLowerCase()==="a"&&gt(n))}function Vs(e,t,n){return e.split(",").map(r=>{const s=r.trim().split(/\s+/);return s[0]?(s[0]=ht(s[0],t,n),s.join(" ")):""}).filter(Boolean).join(", ")}function dn(e,t,n){return e.replace(/url\(\s*(['"]?)([^'")]+)\1\s*\)/gi,(r,s,i)=>{if(pn(i))return`url("${i}")`;if(gt(i))throw new Error(`Safe DeckX CSS cannot reference external assets: ${i}`);return`url("${ht(i,t,n)}")`})}function ht(e,t,n){if(pn(e))return e;if(gt(e))throw new Error(`Safe DeckX slides cannot reference external assets: ${e}`);const r=e.indexOf("#"),s=r>=0?e.slice(r):"",i=r>=0?e.slice(0,r):e,o=ue(t,i.split("?")[0]);return`${n(o)}${s}`}function zs(e,t){const n=JSON.parse(e);if(!ne(n))throw new Error(`${t} must contain a JSON object.`);if(n.schemaVersion!==Xs)throw new Error(`Unsupported DeckX schemaVersion: ${String(n.schemaVersion)}`);if(!pe(n.id))throw new Error("DeckX manifest is missing id.");if(!pe(n.title))throw new Error("DeckX manifest is missing title.");if(!Ys(n.aspectRatio))throw new Error("DeckX manifest has invalid aspectRatio.");if(!Array.isArray(n.slides)||n.slides.length===0)throw new Error("DeckX manifest must include at least one slide.");return n.metadata!==void 0&&Ws(n.metadata),n.slides.forEach((r,s)=>Ks(r,s)),n}function Ws(e){if(!ne(e))throw new Error("DeckX manifest metadata must be an object.");const t=e;if(["version","description","language","license","homepage","repository","thumbnail","createdAt","updatedAt"].forEach(n=>{if(t[n]!==void 0&&typeof t[n]!="string")throw new Error(`DeckX metadata.${n} must be a string.`)}),t.tags!==void 0&&(!Array.isArray(t.tags)||!t.tags.every(n=>typeof n=="string")))throw new Error("DeckX metadata.tags must be an array of strings.");if(t.authors!==void 0){if(!Array.isArray(t.authors))throw new Error("DeckX metadata.authors must be an array.");t.authors.forEach((n,r)=>{if(!ne(n)||!pe(n.name))throw new Error(`DeckX metadata.authors[${r}] must include name.`)})}if(t.generator!==void 0&&(!ne(t.generator)||!pe(t.generator.name)))throw new Error("DeckX metadata.generator must include name.");if(t.custom!==void 0&&!ne(t.custom))throw new Error("DeckX metadata.custom must be an object.")}function Ks(e,t){if(!ne(e))throw new Error(`DeckX slide ${t+1} must be an object.`);if(!pe(e.id))throw new Error(`DeckX slide ${t+1} is missing id.`);if(!pe(e.source))throw new Error(`DeckX slide ${t+1} is missing source.`)}function Gs(e){const t={};return Object.entries(e).forEach(([n,r])=>{n.endsWith("/")||(t[un(n)]=r)}),t}function _s(e){if(e["manifest.json"])return"manifest.json";const t=Object.keys(e).filter(n=>n.endsWith("/manifest.json"));return t.length===1?t[0]:null}function He(e,t){const n=e[t];if(!n)throw new Error(`DeckX package entry is missing: ${t}`);return ln(n)}function ue(e,t){return un([e,t].filter(Boolean).join("/"))}function un(e){const t=e.replaceAll("\\","/");if(!t||t.startsWith("/")||t.includes("\0"))throw new Error(`Invalid DeckX package path: ${e}`);const n=[];if(t.split("/").forEach(r=>{if(!(!r||r===".")){if(r===".."){if(n.length===0)throw new Error(`DeckX package path escapes root: ${e}`);n.pop();return}n.push(r)}}),n.length===0)throw new Error(`Invalid DeckX package path: ${e}`);return n.join("/")}function ct(e){const t=e.lastIndexOf("/");return t===-1?"":e.slice(0,t)}function ne(e){return typeof e=="object"&&e!==null}function pe(e){return typeof e=="string"&&e.trim().length>0}function Ys(e){return e==="16:9"||e==="4:3"?!0:ne(e)&&typeof e.width=="number"&&typeof e.height=="number"&&Number.isFinite(e.width)&&Number.isFinite(e.height)&&e.width>0&&e.height>0}function pn(e){return e.startsWith("#")||e.startsWith("data:")||e.startsWith("blob:")||e.startsWith("mailto:")||e.startsWith("tel:")}function gt(e){return/^[a-z][a-z0-9+.-]*:/i.test(e)||e.startsWith("//")}function Js(e){return e.toLowerCase().replace(/[^a-z0-9-]+/g,"-").replace(/^-+|-+$/g,"")||"deck"}function Zs(e){const t=e.toLowerCase();return t.endsWith(".svg")?"image/svg+xml":t.endsWith(".png")?"image/png":t.endsWith(".jpg")||t.endsWith(".jpeg")?"image/jpeg":t.endsWith(".gif")?"image/gif":t.endsWith(".webp")?"image/webp":t.endsWith(".css")?"text/css":t.endsWith(".html")?"text/html":t.endsWith(".md")?"text/markdown":"application/octet-stream"}const Qs={en:{lang:"en",navLabel:"Landing sections",nav:[{href:"#start",label:"Start"},{href:"#ai-native",label:"AI Native"},{href:"#deckx",label:"DeckX"},{href:"#concepts",label:"Basics"},{href:"#samples",label:"Samples"}],languageHref:"/ko/",languageLabel:"한국어",playerCta:"Open Player",hero:{badge:"AI-NATIVE HTML DECKS",title:"Present AI-generated HTML without converting it to PowerPoint",body:"Dynamic content loses its value when it is rebuilt as static slides. DeckX Player keeps HTML authored by LLMs and agents in a .deckx package, then opens it from a URL or local zip with presenter view and slideshow view.",points:["Use HTML as-is","Motion-first presenting","Agent-native authoring"],primary:"Open Player",secondary:"Watch a moving sample"},preview:{openTitle:"Open DeckX",recent:"Recent DeckX",samples:"Official Samples",uploads:"Uploads",present:"Start presenting",motion:"Motion control"},open:{label:"Open a DeckX URL",button:"Open"},starter:{eyebrow:"GET STARTED",title:"Start from a copyable DeckX starter project",lead:"deckx-project/deckx-starter-basic is the public starter repository for creating a first DeckX deck. It gives humans and agents the same source-folder contract with README, AGENTS.md, validation, and packaging scripts.",repoButton:"View public repo",steps:[{title:"Clone",code:"git clone https://github.com/deckx-project/deckx-starter-basic.git"},{title:"Edit",code:"deck/manifest.json, deck/slides, deck/notes, deck/styles"},{title:"Validate",code:"npm run validate"},{title:"Pack",code:"npm run pack"}]},why:{eyebrow:"WHY NOW",title:"In the AI era, HTML is a better presentation source than PPT",lead:"Claude Artifacts, coding agents, and HTML prototypes have already changed how content is produced. The remaining friction is packaging, validating, and reopening that HTML every time it needs to be presented.",cards:[{title:"No PPT conversion",body:"Keep the original HTML/CSS output from LLMs instead of flattening it into screenshots or rebuilt slide objects."},{title:"Motion-first",body:"Let the presenter control CSS animation, transitions, data flow, and staged reveals with Full, Reduced, and Paused modes."},{title:"Agent-native",body:"Expose DeckX authoring rules and validation scripts so LLM agents can create a deck and check it directly in the player."}]},format:{eyebrow:"DeckX FORMAT",title:"DeckX turns HTML presentations into exchangeable files",lead:"DeckX is a new package format. It bundles HTML slides, speaker notes, styles, image assets, and metadata into one zip-based .deckx file that the player opens with the same runtime contract.",cards:[{title:"File boundary",body:"Bundle manifest.json, slides, notes, styles, and assets into a single .deckx zip package."},{title:"URL input",body:"The player reads ?deck=<url> and loads any DeckX deck into the same runtime."},{title:"Safe default",body:"A normal DeckX package is a script-free Safe Deck, and speaker notes stay out of the slideshow view."},{title:"Verifiable",body:"Schema, asset paths, notes coverage, and visual overflow can be checked before a deck is presented."}]},flow:{eyebrow:"PLAYER FLOW",title:"The player absorbs the repetitive packaging work",lead:"Using HTML as a presentation file usually means coordinating zip files, URLs, first-slide checks, presenter view, audience view, and motion settings. DeckX Player folds those steps into one opening flow.",cards:[{title:"Before opening",body:"Choose a DeckX URL, local zip, recent deck, or official sample."},{title:"After opening",body:"Start from a first-slide preview and a clear presentation launch action."},{title:"When details matter",body:"Validation, notes, and session metadata stay available without dominating the first screen."}]},concepts:{eyebrow:"DeckX BASICS",title:"Four questions that define DeckX",lead:"DeckX is a new format, so the words need to be clear first. Presenters do not need a new editor; they need to understand how HTML presentations can be opened and operated like files.",answers:[{title:"What is DeckX?",body:"DeckX is the name of the format and runtime for packaging HTML-based presentations as exchangeable presentation files."},{title:"What is DeckX Player?",body:"DeckX Player is a browser-based runtime that opens .deckx HTML presentation packages with preview, presenter view, slideshow view, speaker notes, and motion controls."},{title:"What is a DeckX package?",body:"A DeckX package is a zip-based .deckx file containing manifest.json, HTML slides, Markdown speaker notes, styles, and assets."},{title:"Why is it useful?",body:"You can present HTML motion and layout directly, without rebuilding it in PPT, while sharing notes and assets as one file or URL."}],benefits:[{title:"Keep HTML expression",body:"Preserve CSS motion, data flow, and interactive layout instead of flattening them into images."},{title:"Presentation operations included",body:"Preview, presenter view, slideshow view, notes, timer, and motion controls are handled by the player."},{title:"Shareable file",body:"Send a .deckx zip or URL and reopen it in the same runtime."}]},motion:{eyebrow:"MOTION",title:"Full, Reduced, Paused",cards:[{title:"Full",body:"Run deck CSS animation and transitions as authored."},{title:"Reduced",body:"Shorten motion for accessibility needs or presentation-room constraints."},{title:"Paused",body:"Pause CSS animation for review, explanation, or controlled moments during a talk."}]},samples:{eyebrow:"OFFICIAL SAMPLES",title:"Open moving DeckX examples immediately",lead:"Official samples stay separate from user history. Compare motion decks, static explanations, 4:3 canvases, image-heavy decks, and long-deck navigation in the same runtime.",openLabel:"Open in Player"},strategy:{eyebrow:"NEXT STRATEGY",title:"Make DeckX easy for search engines and AI agents to read first",cards:[{title:"English as the default",body:"Use English as the canonical discovery surface for global search and AI answer engines, while keeping a Korean version for local users."},{title:"llms.txt review",body:"Publish DeckX definitions, package specs, authoring guides, and sample URLs in a concise structure that LLMs can read quickly."},{title:"MCP and skills review",body:"Validate whether DeckX authoring skills, validation scripts, and sample generation should become an agent-native creation workflow."},{title:"Search and AI answer evidence",body:"Align static HTML, canonical links, hreflang, sitemap, robots.txt, JSON-LD, and public Markdown docs so crawlers and AI answer engines read the same facts."},{title:"Team features later",body:"SSO, upload, team history, and team libraries are not implemented features today. Treat them only as future product candidates."}]}},ko:{lang:"ko",navLabel:"랜딩 섹션",nav:[{href:"#start",label:"시작하기"},{href:"#ai-native",label:"AI Native"},{href:"#deckx",label:"DeckX"},{href:"#concepts",label:"개념"},{href:"#samples",label:"샘플"}],languageHref:"/",languageLabel:"English",playerCta:"플레이어 열기",hero:{badge:"AI-NATIVE HTML DECKS",title:"AI가 만든 HTML을 PPT로 바꾸지 않고 그대로 발표하세요",body:"동적인 콘텐츠는 PPT로 다시 옮기는 순간 표현력이 줄어듭니다. DeckX Player는 LLM과 agent가 만든 HTML 발표를 .deckx 패키지로 고정하고, URL이나 로컬 zip에서 열어 발표자뷰와 슬라이드쇼로 바로 실행합니다.",points:["HTML 그대로 사용","모션 중심 발표","Agent-native authoring"],primary:"플레이어 열기",secondary:"움직이는 샘플 보기"},preview:{openTitle:"DeckX 열기",recent:"Recent DeckX",samples:"Official Samples",uploads:"Uploads",present:"발표 시작",motion:"모션 제어"},open:{label:"DeckX URL 빠르게 열기",button:"열기"},starter:{eyebrow:"GET STARTED",title:"복사해서 바로 시작하는 DeckX 스타터 프로젝트",lead:"deckx-project/deckx-starter-basic은 첫 DeckX를 만들기 위한 public starter repo입니다. README, AGENTS.md, 검증/패키징 스크립트를 함께 제공해 사람과 agent가 같은 source-folder 계약으로 수정할 수 있습니다.",repoButton:"Public repo 보기",steps:[{title:"Clone",code:"git clone https://github.com/deckx-project/deckx-starter-basic.git"},{title:"Edit",code:"deck/manifest.json, deck/slides, deck/notes, deck/styles"},{title:"Validate",code:"npm run validate"},{title:"Pack",code:"npm run pack"}]},why:{eyebrow:"WHY NOW",title:"AI 시대에는 PPT보다 HTML이 자연스럽습니다",lead:"Claude Artifacts, coding agent, HTML prototype 흐름이 이미 콘텐츠 제작 방식을 바꾸고 있습니다. 문제는 만든 HTML을 매번 발표용으로 묶고, 검증하고, 다시 여는 일이 귀찮다는 점입니다.",cards:[{title:"PPT 변환 없이",body:"LLM이 만든 HTML/CSS 결과물을 이미지나 슬라이드 캡처로 죽이지 않고 원본 표현 그대로 발표합니다."},{title:"모션 중심",body:"CSS animation, transition, 데이터 흐름, 단계적 reveal을 발표자가 Full, Reduced, Paused로 제어합니다."},{title:"Agent-native",body:"DeckX 작성 규칙과 검증 스크립트를 skill로 제공해 LLM agent가 덱을 만들고 바로 플레이어에서 확인하게 합니다."}]},format:{eyebrow:"DeckX FORMAT",title:"DeckX는 HTML 발표를 교환 가능한 파일로 만드는 포맷입니다",lead:"DeckX는 새 파일 포맷입니다. HTML 슬라이드, 발표자 노트, 스타일, 이미지 자산, 메타데이터를 하나의 .deckx zip으로 묶고 플레이어가 동일한 런타임 계약으로 엽니다.",cards:[{title:"파일 경계",body:"manifest.json, slides, notes, styles, assets를 하나의 .deckx zip으로 묶습니다."},{title:"URL 입력",body:"플레이어는 ?deck=<url>을 읽고 같은 런타임에 어떤 DeckX 덱이든 로드합니다."},{title:"안전한 기본값",body:"일반 DeckX는 script 없는 Safe Deck이며 발표자 노트는 슬라이드쇼에서 제외됩니다."},{title:"검증 가능",body:"schema, asset path, notes coverage, overflow를 검사해 발표 파일을 재현 가능한 단위로 다룹니다."}]},flow:{eyebrow:"PLAYER FLOW",title:"패키징 반복을 플레이어가 흡수합니다",lead:"HTML을 발표 파일처럼 쓰려면 zip, URL, 첫 화면 확인, 발표자뷰, 관객 화면, 모션 옵션을 매번 맞춰야 합니다. DeckX Player는 이 반복 작업을 하나의 열기 흐름으로 묶습니다.",cards:[{title:"열기 전",body:"DeckX URL, 로컬 zip, 최근 DeckX, 공식 샘플 중 하나를 선택합니다."},{title:"열었을 때",body:"첫 슬라이드 미리보기와 발표 시작 버튼을 중심으로 표시합니다."},{title:"상세 정보",body:"validation, notes, session 같은 DeckX 메타는 필요할 때만 펼쳐봅니다."}]},concepts:{eyebrow:"DeckX BASICS",title:"DeckX를 이해하는 네 가지 질문",lead:"DeckX는 처음 보는 포맷이므로 먼저 용어가 분명해야 합니다. 발표자는 새 편집기를 배우는 것이 아니라, HTML 발표를 파일처럼 열고 운영하는 방식을 이해하면 됩니다.",answers:[{title:"DeckX란?",body:"DeckX는 HTML 기반 발표를 교환 가능한 패키지로 만들고, 같은 플레이어에서 재생하기 위한 포맷과 런타임의 이름입니다."},{title:"DeckX Player란?",body:"DeckX Player는 .deckx HTML presentation package를 열어 미리보기, 발표자뷰, 슬라이드쇼, 발표자 노트, 모션 제어를 제공하는 웹 기반 발표 런타임입니다."},{title:"DeckX package란?",body:"DeckX package는 manifest.json, HTML slides, Markdown speaker notes, styles, assets를 하나로 묶은 zip 기반 .deckx 발표 파일입니다."},{title:"뭐가 좋은가요?",body:"PPT로 다시 옮기지 않아도 HTML의 모션과 레이아웃을 그대로 발표할 수 있고, 발표자 노트와 자산까지 하나의 파일 또는 URL로 공유할 수 있습니다."}],benefits:[{title:"HTML 표현력 유지",body:"CSS motion, 데이터 흐름, 인터랙티브한 레이아웃을 이미지 캡처로 죽이지 않고 발표합니다."},{title:"발표 운영 내장",body:"미리보기, 발표자뷰, 슬라이드쇼, 노트, 타이머, 모션 제어를 플레이어가 담당합니다."},{title:"공유 가능한 파일",body:".deckx zip이나 URL로 전달해 같은 런타임에서 다시 열고 발표할 수 있습니다."}]},motion:{eyebrow:"MOTION",title:"Full, Reduced, Paused",cards:[{title:"Full",body:"덱 CSS animation과 transition을 그대로 재생합니다."},{title:"Reduced",body:"모션을 거의 즉시 끝나게 줄여 발표장 환경이나 접근성 요구에 맞춥니다."},{title:"Paused",body:"모든 CSS animation을 일시정지합니다. 모션 데모 검토나 발표 중 정지에 유용합니다."}]},samples:{eyebrow:"OFFICIAL SAMPLES",title:"움직이는 DeckX를 바로 열어볼 수 있습니다",lead:"공식 샘플은 사용자 히스토리와 분리됩니다. 모션, 정적 설명, 4:3 캔버스, 이미지 자산, 롱덱 탐색을 같은 런타임에서 비교할 수 있습니다.",openLabel:"플레이어에서 열기"},strategy:{eyebrow:"NEXT STRATEGY",title:"먼저 검색 엔진과 AI agent가 읽기 쉬운 경로를 만듭니다",cards:[{title:"영어를 기본값으로",body:"글로벌 검색과 AI answer engine 유입을 위해 canonical discovery surface는 영어로 두고, 한국어 버전은 지역 사용자와 설명 보강용으로 함께 제공합니다."},{title:"llms.txt 검토",body:"DeckX 정의, package spec, 작성 가이드, 샘플 URL을 LLM이 빠르게 읽도록 공개 문서 구조를 정리합니다."},{title:"MCP와 skill 검토",body:"DeckX authoring skill, validation script, 샘플 생성 흐름을 agent-native 제작 경험으로 제공할지 먼저 검증합니다."},{title:"검색과 AI 답변 근거",body:"정적 HTML, canonical, hreflang, sitemap, robots.txt, JSON-LD, 공개 Markdown 문서로 검색 엔진과 AI answer engine이 같은 사실을 읽게 합니다."},{title:"팀 기능은 이후",body:"SSO, 업로드, 팀 이력은 아직 구현된 기능이 아니며, 제품화 이후 확장 후보로만 다룹니다."}]}}};function ea(e,t){const n=Qs[t.locale];e.innerHTML=`
    <main class="project-landing" lang="${n.lang}">
      <header class="project-nav">
        <a class="project-mark" href="${f(t.homeHref)}">
          <img class="brand-icon" src="/brand/deckx-icon.svg" alt="" aria-hidden="true" />
          <span>DeckX Player</span>
        </a>
        <nav class="project-nav-links" aria-label="${f(n.navLabel)}">
          ${n.nav.map(s=>`<a href="${f(s.href)}">${f(s.label)}</a>`).join("")}
        </nav>
        <a class="btn compact" href="${f(n.languageHref)}">${f(n.languageLabel)}</a>
        <a class="btn compact" href="${f(t.playerHref)}">${f(n.playerCta)}</a>
      </header>

      <section class="project-hero">
        <div class="project-hero-copy">
          <span class="badge mono">${f(n.hero.badge)}</span>
          <h1>${f(n.hero.title)}</h1>
          <p>${H(n.hero.body)}</p>
          <div class="project-hero-points" aria-label="DeckX positioning">
            ${n.hero.points.map(s=>`<span>${f(s)}</span>`).join("")}
          </div>
          <div class="project-actions">
            <a class="btn primary" href="${f(t.playerHref)}">${f(n.hero.primary)}</a>
            <a class="btn" href="${f(t.defaultDemoHref)}">${f(n.hero.secondary)}</a>
          </div>
        </div>
        ${ta(n)}
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

      ${na(n,t)}
      ${et("ai-native",n.why,"info-grid")}
      ${ra(n)}
      ${et("",n.flow,"info-grid modes")}
      ${sa(n)}
      ${et("",n.motion,"info-grid modes")}
      ${aa(n,t.demoOptions)}
      ${oa(n)}
    </main>
  `;const r=e.querySelector("[data-project-deckx-form]");r?.addEventListener("submit",s=>{s.preventDefault();const o=r.querySelector("[data-project-deckx-input]")?.value.trim();o&&t.onOpenDeckxUrl(o)})}function ta(e){return`
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
  `}function na(e,t){return`
    <section class="project-section project-start-section" id="start">
      <div class="section-heading">
        <p class="mono">${f(e.starter.eyebrow)}</p>
        <h2>${f(e.starter.title)}</h2>
        <span class="section-lead">${H(e.starter.lead)}</span>
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
  `}function et(e,t,n){return`
    <section class="project-section"${e?` id="${f(e)}"`:""}>
      <div class="section-heading">
        <p class="mono">${f(t.eyebrow)}</p>
        <h2>${f(t.title)}</h2>
        ${t.lead?`<span class="section-lead">${H(t.lead)}</span>`:""}
      </div>
      <div class="${f(n)}">
        ${t.cards.map(r=>`
          <article>
            <strong>${H(r.title)}</strong>
            <span>${H(r.body)}</span>
          </article>
        `).join("")}
      </div>
    </section>
  `}function ra(e){return`
    <section class="project-section" id="deckx">
      <div class="section-heading">
        <p class="mono">${f(e.format.eyebrow)}</p>
        <h2>${f(e.format.title)}</h2>
        <span class="section-lead">${H(e.format.lead)}</span>
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
              <span>${H(t.body)}</span>
            </article>
          `).join("")}
        </div>
      </div>
    </section>
  `}function sa(e){return`
    <section class="project-section" id="concepts">
      <div class="section-heading">
        <p class="mono">${f(e.concepts.eyebrow)}</p>
        <h2>${f(e.concepts.title)}</h2>
        <span class="section-lead">${H(e.concepts.lead)}</span>
      </div>
      ${e.concepts.answers.map(t=>`
        <div class="project-answer-block">
          <strong>${f(t.title)}</strong>
          <span>${H(t.body)}</span>
        </div>
      `).join("")}
      <div class="info-grid modes">
        ${e.concepts.benefits.map(t=>`
          <article>
            <strong>${f(t.title)}</strong>
            <span>${H(t.body)}</span>
          </article>
        `).join("")}
      </div>
    </section>
  `}function aa(e,t){return`
    <section class="project-section" id="samples">
      <div class="section-heading">
        <p class="mono">${f(e.samples.eyebrow)}</p>
        <h2>${f(e.samples.title)}</h2>
        <span class="section-lead">${H(e.samples.lead)}</span>
      </div>
      <div class="project-demo-grid">
        ${t.map(n=>ia(n,e.samples.openLabel)).join("")}
      </div>
    </section>
  `}function oa(e){return`
    <section class="project-section" id="workspace">
      <div class="section-heading">
        <p class="mono">${f(e.strategy.eyebrow)}</p>
        <h2>${f(e.strategy.title)}</h2>
      </div>
      <div class="info-grid modes">
        ${e.strategy.cards.map(t=>`
          <article>
            <strong>${H(t.title)}</strong>
            <span>${H(t.body)}</span>
          </article>
        `).join("")}
      </div>
    </section>
  `}function ia(e,t){return`
    <article class="project-demo-card">
      <div>
        <h3>${f(e.label)}</h3>
        <p>${f(e.description)}</p>
        <span>${f(e.detail)}</span>
      </div>
      <code>${f(e.url)}</code>
      <a class="btn compact" href="${f(e.href)}">${f(t)}</a>
    </article>
  `}function H(e){return f(e).replaceAll(".deckx","<code>.deckx</code>").replaceAll("manifest.json","<code>manifest.json</code>").replaceAll("?deck=&lt;url&gt;","<code>?deck=&lt;url&gt;</code>").replaceAll("llms.txt","<code>llms.txt</code>").replaceAll("robots.txt","<code>robots.txt</code>").replaceAll("sitemap","<code>sitemap</code>").replaceAll("JSON-LD","<code>JSON-LD</code>").replaceAll("hreflang","<code>hreflang</code>")}function f(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}const mn=document.getElementById("app");if(!mn)throw new Error("Missing #app mount element");const Ae=mn,fn="deckx-package-style",hn="deckx-player:history:v1",la=8,ca="https://github.com/deckx-project/deckx-starter-basic",re=[{id:"starter",messageKey:"starter",url:"/decks/starter-basic.deckx"},{id:"dogfood",messageKey:"dogfood",url:"/decks/deckx-player-demo.deckx"},{id:"static",messageKey:"static",url:"/decks/static-demo.deckx"},{id:"motion",messageKey:"motion",url:"/decks/motion-demo.deckx"},{id:"classic",messageKey:"classic",url:"/decks/classic-4x3-demo.deckx"},{id:"image-heavy",messageKey:"imageHeavy",url:"/decks/image-heavy-demo.deckx"},{id:"long-120",messageKey:"long120",url:"/decks/long-120-demo.deckx"},{id:"long-image",messageKey:"longImage",url:"/decks/long-image-demo.deckx"}],tt={en:{starter:{label:"DeckX Starter",description:"A copyable starter deck packaged from deckx-project/deckx-starter-basic",detail:"A minimal DeckX package generated from the public starter source folder."},dogfood:{label:"DeckX zip demo",description:"Loads public/decks/deckx-player-demo.deckx as a packaged presentation",detail:"A dogfooding deck that explains DeckX Player using the DeckX package format itself."},static:{label:"Static framework demo",description:"A DeckX sample explaining the Deck/Runtime boundary",detail:"Shows how text-heavy talks combine with the player basics."},motion:{label:"Motion graphics demo",description:"A CSS motion DeckX loaded into the same runtime",detail:"Compare Full, Reduced, and Paused motion modes with an animated deck."},classic:{label:"Classic 4:3 canvas demo",description:"A sample showing DeckX aspectRatio support",detail:"Confirms that non-16:9 DeckX canvases render consistently in presenter and slideshow views."},"image-heavy":{label:"Image-heavy demo",description:"An asset stress sample with 96 package-local images",detail:"Checks preview, overview, and object URL behavior for image-heavy decks."},"long-120":{label:"Long 120-slide demo",description:"A sample for goto, search, and overview behavior across many pages",detail:"Exercises presenter thumbnails and keyboard navigation limits with a 120-slide DeckX."},"long-image":{label:"Long image demo",description:"A stress sample combining long-deck navigation with package-local images",detail:"Checks navigation, search, thumbnails, and asset handling across 120 image-backed slides."}},ko:{starter:{label:"DeckX 스타터",description:"deckx-project/deckx-starter-basic에서 패키징한 시작용 DeckX",detail:"public starter source folder에서 생성한 최소 DeckX package입니다."},dogfood:{label:"DeckX zip 데모",description:"public/decks/deckx-player-demo.deckx 파일을 그대로 로드",detail:"이 프로젝트 자체를 DeckX package로 설명하는 도그푸딩 덱입니다."},static:{label:"정적 프레임워크 데모",description:"Deck/Runtime 경계를 설명하는 DeckX 샘플",detail:"텍스트 중심 발표가 기본 플레이어 기능과 어떻게 결합되는지 확인합니다."},motion:{label:"모션 그래픽 데모",description:"같은 런타임에 CSS motion DeckX를 교체한 샘플",detail:"CSS animation이 포함된 덱에서 Full, Reduced, Paused 차이를 확인합니다."},classic:{label:"4:3 캔버스 데모",description:"DeckX aspectRatio가 렌더러에 반영되는 샘플",detail:"16:9가 아닌 DeckX canvas도 발표자뷰와 슬라이드쇼에 동일하게 반영됩니다."},"image-heavy":{label:"이미지 헤비 데모",description:"96개 package-local 이미지를 로드하는 asset stress 샘플",detail:"이미지가 많은 DeckX에서 preview, overview, object URL 처리 비용을 확인합니다."},"long-120":{label:"120장 롱덱 데모",description:"많은 페이지에서 goto, search, overview 사용성을 확인하는 샘플",detail:"120장 DeckX를 통해 발표자뷰 썸네일 목록과 키보드 탐색 한계를 관찰합니다."},"long-image":{label:"120장 이미지 롱덱 데모",description:"긴 DeckX와 package-local 이미지를 함께 로드하는 stress 샘플",detail:"120장 전체에 이미지가 포함된 DeckX로 탐색, 검색, 썸네일, asset 처리를 함께 관찰합니다."}}};let De=null,Ee=null,j=Ue("ko");window.addEventListener("beforeunload",()=>{De?.destroy(),Ee?.dispose()});da();async function da(){if(!ba()){if(j=Ue("ko"),Pt(j),ka()){window.location.replace(Sa());return}ua();return}j=Ue(),Pt(j);const e=ha();if(document.body.dataset.page="player",!e){ma();return}$n(j.messages.main.loadingDeck);try{await fa(e)}catch(t){Te(),Dn(t)}}function ua(){const e=pa();document.body.dataset.page="project",document.documentElement.lang=e,delete document.body.dataset.mode,Te(),ea(Ae,{locale:e,deckxUrlValue:new URL(re[0].url,window.location.href).toString(),homeHref:e==="ko"?"/ko/":"/",playerHref:"/player",defaultDemoHref:nt(re[0].url),starterSourceHref:ca,demoOptions:re.map(t=>({id:t.id,label:tt[e][t.id].label,description:tt[e][t.id].description,detail:tt[e][t.id].detail,url:t.url,href:nt(t.url)})),onOpenDeckxUrl:t=>{window.location.assign(nt(t))}})}function pa(){return window.location.pathname.replace(/\/+$/,"")==="/ko"?"ko":"en"}function ma(e=""){document.body.dataset.page="player",document.body.dataset.mode="landing",Te(),De?.destroy(),De=null,Ee?.dispose(),Ee=null,yr(Ae,{i18n:j,homeHref:"/",demoOptions:wn(null),historyOptions:vn(),actions:{onOpenDeckxUrl:Sn,onOpenDeckxFile:gn,deckxUrlValue:"",deckxStatus:e,homeHref:"/"}})}async function fa(e){const t=await Us(e.url),n=new URL(e.url,window.location.href).toString(),r=e.kind,s=re.find(o=>o.id===e.id),i=e.kind==="demo"?s?dt(s).label:t.deck.title:n;e.kind==="url"&&bn({kind:"url",label:t.deck.title,detail:n,url:n}),yn(t,{source:e,sourceKind:r,sourceLabel:i,deckxUrlValue:n})}async function gn(e){$n(j.messages.main.loadingZip);try{const t=cn(new Uint8Array(await e.arrayBuffer()),e.name);bn({kind:"zip",label:t.deck.title,detail:e.name}),window.history.replaceState(null,"",ya()),yn(t,{source:{id:"local-zip",url:e.name,kind:"url"},sourceKind:"zip",sourceLabel:e.name,deckxUrlValue:""})}catch(t){Te(),Dn(t)}}function yn(e,t){De?.destroy(),Ee?.dispose(),Ee=e,wa(e.cssText,e.sourceUrl),De=ss(e.deck,{mount:Ae,demoOptions:wn(t.source),historyOptions:vn(),sourceKind:t.sourceKind,sourceLabel:t.sourceLabel,deckxUrlValue:t.deckxUrlValue,onOpenDeckxUrl:Sn,onOpenDeckxFile:gn,homeHref:"/",i18n:j})}function ha(){const t=new URLSearchParams(window.location.search).get("deck");if(t){const n=re.find(r=>va(r.url,t));return{id:n?.id??"deckx-url",url:t,kind:n?"demo":"url"}}return null}function wn(e){return re.map(t=>({id:t.id,label:dt(t).label,description:dt(t).description,href:Fe(t.url),active:t.id===e?.id}))}function Fe(e){const t=new URL(window.location.href);return t.searchParams.set("deck",e),t.searchParams.delete("deckx"),t.searchParams.delete("sessionId"),t.hash="landing",`${t.pathname}${t.search}${t.hash}`}function vn(){return kn().map(e=>({id:e.id,kind:e.kind,label:e.label,detail:e.detail,href:e.kind==="url"&&e.url?Fe(e.url):void 0}))}function bn(e){const t=e.kind==="url"&&e.url?`url:${e.url}`:`zip:${e.detail}`,n={id:t,kind:e.kind,label:e.label,detail:e.detail,url:e.url,openedAtEpochMs:Date.now()},r=kn().filter(s=>s.id!==t);ga([n,...r].slice(0,la))}function kn(){try{const e=window.localStorage.getItem(hn);if(!e)return[];const t=JSON.parse(e);return Array.isArray(t)?t.filter($a).sort((n,r)=>r.openedAtEpochMs-n.openedAtEpochMs):[]}catch{return[]}}function ga(e){try{window.localStorage.setItem(hn,JSON.stringify(e))}catch{}}function nt(e){const t=new URL("/player",window.location.href);return t.searchParams.set("deck",e),t.hash="landing",`${t.pathname}${t.search}${t.hash}`}function ya(){const e=new URL(window.location.href);return e.pathname="/player",e.searchParams.delete("deck"),e.searchParams.delete("deckx"),e.searchParams.delete("sessionId"),e.searchParams.set(ut,j.locale),e.hash="landing",`${e.pathname}${e.search}${e.hash}`}function Sn(e){window.location.assign(Fe(e))}function wa(e,t){if(Te(),!e.trim())return;const n=document.createElement("style");n.id=fn,n.dataset.deckxSource=t,n.textContent=e,document.head.appendChild(n)}function Te(){document.getElementById(fn)?.remove()}function va(e,t){return new URL(e,window.location.href).toString()===new URL(t,window.location.href).toString()}function ba(){return window.location.pathname.replace(/\/+$/,"")==="/player"}function ka(){const e=window.location.hash;return new URLSearchParams(window.location.search).has("deck")||e==="#landing"||e==="#presenter"||e==="#slideshow"}function Sa(){const e=new URL(window.location.href);return e.pathname="/player",`${e.pathname}${e.search}${e.hash||"#landing"}`}function $n(e){Ae.innerHTML=`<main class="system-message">${ke(e)}</main>`}function Dn(e){const t=e instanceof Error?e.message:String(e);Ae.innerHTML=`
    <main class="system-message">
      <div class="load-error">
        <strong>${ke(j.messages.main.loadFailed)}</strong>
        <span>${ke(t)}</span>
        <a class="btn" href="${ke(Fe(re[0].url))}">${ke(j.messages.main.openDefaultDemo)}</a>
      </div>
    </main>
  `}function dt(e){return j.messages.demos[e?.messageKey??"starter"]}function ke(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function $a(e){if(!e||typeof e!="object")return!1;const t=e;return(t.kind==="url"||t.kind==="zip")&&typeof t.id=="string"&&typeof t.label=="string"&&typeof t.detail=="string"&&typeof t.openedAtEpochMs=="number"&&(t.url===void 0||typeof t.url=="string")}
