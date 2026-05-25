# DeckX Package

DeckX Package는 DeckX Player Runtime이 여는 발표 파일이다. 이 저장소는 덱 편집기가 아니라 플레이어이므로, 외부 사람이든 다른 agent든 이 스펙을 따라 발표 패키지를 만든다.

DeckX는 **Deck eXchange Package**의 약자다. HTML 기반 발표의 동적 표현력을 유지하면서도, 덱을 특정 런타임 소스가 아니라 교환 가능한 파일 포맷으로 다루겠다는 뜻이다.

## 원칙

- 작성 중에는 폴더를 source of truth로 둔다.
- 발표/공유 버전은 zip 기반 `.deckx` 파일로 고정한다.
- 일반 `.deckx` 덱은 실행 가능한 JavaScript를 포함하지 않는다.
- `manifest.json`이 덱의 계약이다.
- 플레이어는 package를 읽어 내부 `Deck` model로 변환한다.
- 데모용 원본도 `examples/deckx-*/` source folder를 기준으로 둔다. 배포/공유/랜딩 데모 진입점은 `.deckx` 파일 또는 `.deckx` URL만 사용한다.

## Authoring Folder

```text
my-talk/
  manifest.json
  slides/
    001-intro.html
    002-runtime.html
  notes/
    001-intro.md
    002-runtime.md
  styles/
    theme.css
  assets/
    hero.png
    chart.svg
```

## Distribution File

```text
my-talk.deckx
```

`.deckx`는 zip 파일이다. 확장자는 발표 덱 패키지라는 의미를 주기 위한 이름이다.

현재 저장소의 도그푸딩 데모는 `examples/deckx-player-demo/`를 source of truth로 두고, `npm run pack:deckx`로 `public/decks/deckx-player-demo.deckx`를 생성한다. 플레이어는 기본 랜딩에서 이 zip 파일을 직접 로드한다.

## manifest.json

정적 검증용 JSON Schema 초안은 [deckx-manifest.schema.json](/Users/redlasha/work-hslee/poc-html-ppt/docs/deckx-manifest.schema.json)에 둔다.

```json
{
  "schemaVersion": "deckx.deck.v1",
  "id": "ksug-2026-ops",
  "title": "개발의 마지막은 운영이다",
  "aspectRatio": "16:9",
  "durationSec": 1800,
  "theme": {
    "css": "./styles/theme.css"
  },
  "metadata": {
    "version": "1.0.0",
    "description": "운영 관점에서 HTML 발표 패키지 경계를 설명하는 세션",
    "authors": [
      { "name": "DeckX Project", "role": "maintainer" }
    ],
    "tags": ["runtime", "operations", "html-deck"],
    "language": "ko-KR",
    "license": "CC-BY-4.0",
    "thumbnail": "./assets/thumbnail.svg"
  },
  "slides": [
    {
      "id": "intro",
      "title": "개발의 마지막은 운영이다",
      "source": "./slides/001-intro.html",
      "notes": "./notes/001-intro.md",
      "timingSec": 120
    }
  ]
}
```

## Manifest Fields

- `schemaVersion`: required. 현재 초안은 `deckx.deck.v1`.
- `id`: required. 영문 소문자, 숫자, `-` 권장. 발표 파일의 안정 ID.
- `title`: required. 랜딩/발표자뷰에 표시되는 제목.
- `aspectRatio`: required. `"16:9"`, `"4:3"`, 또는 `{ "width": 1280, "height": 720 }`.
- `durationSec`: optional. 전체 발표 목표 시간.
- `theme.css`: optional. 덱 전용 CSS 경로.
- `metadata`: optional. 검색, 라이브러리, 업로드, 샘플 카탈로그에서 사용할 표준 설명 정보.
- `slides`: required. 순서가 곧 발표 순서.

Metadata fields:

- `version`: optional. 덱 콘텐츠 버전.
- `description`: optional. 플레이어/라이브러리에서 보여줄 짧은 설명.
- `authors`: optional. `{ name, role?, url?, email? }` 배열.
- `tags`: optional. 샘플 분류, 검색, 필터링용 문자열 배열.
- `language`: optional. 권장값은 `ko-KR`, `en-US` 같은 BCP 47 language tag.
- `license`: optional. `MIT`, `CC-BY-4.0`, `Proprietary` 같은 라이선스 표기.
- `homepage`, `repository`: optional. 덱 또는 프로젝트 URL.
- `thumbnail`: optional. package-relative 이미지 경로. 외부 URL은 Safe Deck에서 허용하지 않는다.
- `createdAt`, `updatedAt`: optional. ISO date 또는 datetime 문자열 권장.
- `generator`: optional. `{ name, version?, url? }`.
- `custom`: optional. 표준 필드로 표현하지 못하는 도메인별 확장 객체.

Slide fields:

- `id`: required. 중복 금지.
- `title`: recommended. 검색/goto/overview에서 사용.
- `source`: required. 슬라이드 본문 HTML 경로.
- `notes`: recommended. speaker notes Markdown 경로.
- `timingSec`: optional. 해당 슬라이드 목표 시간.
- `className`: optional. slide root에 붙일 클래스.
- `footer`: optional. slide footer.

## Slide HTML Contract

일반 DeckX slide HTML은 fragment다. 전체 `html`, `head`, `body`, `script` 태그를 넣지 않는다.

권장:

```html
<section class="deckx-slide-content">
  <p class="kicker">01 / Runtime</p>
  <h1>Deck은 콘텐츠, Runtime은 운영</h1>
  <ul>
    <li>상태 동기화는 플레이어가 담당한다.</li>
    <li>덱은 발표 내용과 자산만 가진다.</li>
  </ul>
</section>
```

금지:

- `<script>`
- inline event handler: `onclick`, `onload` 등
- 외부 CDN에 의존하는 이미지/CSS/font
- 절대 파일 경로
- 발표자 노트를 slide HTML 안에 숨겨 넣는 방식

## Asset Paths

- 모든 경로는 `manifest.json` 위치 기준 상대 경로다.
- `../`로 package 밖을 참조하지 않는다.
- 파일명은 ASCII, lowercase, hyphen-case를 권장한다.
- 큰 video/audio는 post-MVP 범위다. 현재는 이미지/SVG 중심으로 둔다.

## CSS Contract

덱 CSS는 덱 내부 표현만 담당한다.

허용:

- slide 내부 layout
- CSS animation
- CSS custom properties
- local font-face

주의:

- runtime class인 `.presenter`, `.slideshow-stage`, `.topbar` 등을 직접 override하지 않는다.
- 자동 반복 애니메이션은 발표자가 motion pause/reduced를 걸 수 있어야 한다.
- 텍스트가 캔버스 밖으로 overflow되지 않아야 한다.

## Notes Contract

notes는 Markdown 파일을 권장한다.

```markdown
오늘 발표의 핵심 메시지는 하나입니다.

**운영은 개발이 완성되는 마지막 단계**입니다.
```

규칙:

- 관객에게 보일 문장을 notes에만 넣지 않는다.
- 발표자가 읽을 수 있도록 문단 단위로 쓴다.
- slide `timingSec`와 말 분량이 크게 어긋나지 않게 한다.

## Safe Mode vs Trusted Mode

기본 `.deckx`는 Safe Mode다.

- manifest/json/html/css/assets만 허용
- JS 실행 없음
- 플레이어가 HTML sanitizer와 asset resolver를 적용할 수 있음

Trusted Mode는 별도 확장이다.

- custom JS module 허용 가능
- 개인 POC 또는 신뢰한 개발자 Deck에만 사용
- 보안, 재현성, 검증 비용이 높으므로 일반 덱 포맷으로 삼지 않는다.

## Validation Requirements

최소 검증:

- `manifest.json` parse 가능
- `schemaVersion` 지원 여부
- Deck id/title/aspectRatio 존재
- slide id 존재 및 중복 없음
- slide source 파일 존재
- notes coverage report
- asset path가 package 내부인지 확인
- fixed canvas overflow 검사

현재 데모 DeckX package는 다음 명령으로 overflow를 검사한다.

```bash
npm run check:overflow
```

외부 `.deckx` package 검증 CLI는 `npm run validate:deckx` 또는 `node scripts/validate-deckx.mjs <source-folder-or-file.deckx>`로 실행한다.
