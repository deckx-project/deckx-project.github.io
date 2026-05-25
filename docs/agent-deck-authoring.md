# Agent Deck Authoring Guide

이 문서는 사람 또는 AI agent가 DeckX Package를 작성할 때 따라야 할 작업 지침이다. 목표는 멋진 HTML 한 장을 만드는 것이 아니라, DeckX Player가 안정적으로 발표할 수 있는 덱 패키지를 만드는 것이다.

## 작성 목표

좋은 DeckX Package는 다음 조건을 만족한다.

- 발표자가 말할 흐름이 명확하다.
- 관객용 화면과 speaker notes가 분리되어 있다.
- 모든 자산이 package 내부에 있다.
- 런타임을 수정하지 않고 재생된다.
- 발표자뷰의 검색, pacing, validation이 의미 있게 동작한다.

## 기본 산출물

```text
deck-folder/
  manifest.json
  slides/
  notes/
  styles/
  assets/
```

필수:

- `manifest.json`
- slide HTML 파일
- speaker notes Markdown 파일
- 필요한 이미지/SVG
- 덱 CSS
- 라이브러리/샘플 노출이 필요한 경우 `metadata` 필드

## 작성 순서

1. 발표 목적과 청중을 3문장 이내로 정리한다.
2. 전체 발표 시간을 정하고 slide count를 역산한다.
3. 각 slide에 `id`, `title`, `timingSec`, 핵심 메시지 1개를 배정한다.
4. slide HTML은 관객이 보는 시각 정보만 작성한다.
5. notes Markdown은 발표자가 실제로 말할 문장 중심으로 작성한다.
6. CSS는 덱 내부 class에만 적용한다.
7. assets 경로를 manifest 기준 상대 경로로 정리한다.
8. 검증 체크리스트를 실행한다.

## Slide 작성 규칙

한 slide는 하나의 메시지만 전달한다.

권장 구조:

```html
<section class="deckx-slide-content topic-slide">
  <p class="kicker">02 / Sync</p>
  <h1>두 창은 하나의 세션으로 묶인다</h1>
  <ul>
    <li>Presenter가 source of truth다.</li>
    <li>Slideshow는 navigation intent만 보낸다.</li>
    <li>Session id로 여러 발표를 격리한다.</li>
  </ul>
</section>
```

피해야 할 것:

- 한 slide에 서로 다른 주제 2개 이상 넣기
- 발표자가 읽을 긴 문장을 본문에 그대로 넣기
- 작은 글씨로 정보를 과밀하게 넣기
- 이미지 경로를 외부 URL에 의존하기
- slide HTML 안에 speaker notes를 숨기기

## Speaker Notes 작성 규칙

notes는 발표자의 운영 화면이다.

좋은 notes:

- 첫 문장은 해당 slide의 말문을 여는 문장
- 핵심 메시지는 bold 처리
- 데모 조작이 필요한 경우 별도 문단으로 표시
- `timingSec` 안에 말할 수 있는 분량

예:

```markdown
여기서는 이 프로젝트의 핵심 경계를 설명합니다.

**Deck은 콘텐츠이고 Runtime은 운영입니다.**

이 경계가 유지되어야 다른 사람이 만든 `.deckx` 파일도 같은 플레이어에서 재생할 수 있습니다.
```

## Design Constraints

- 16:9 기본 canvas는 1280x720이다.
- 4:3 기본 canvas는 1024x768이다.
- 텍스트는 캔버스를 벗어나지 않아야 한다.
- 폰트 크기는 프로젝터에서 읽히는 크기여야 한다.
- 색 대비가 낮은 조합을 피한다.
- 모션은 발표자가 끌 수 있다는 전제에서만 사용한다.
- 중요한 정보는 색상만으로 구분하지 않는다.

## Motion Rules

모션은 가능하지만 발표를 방해하면 안 된다.

허용:

- 의미를 강화하는 짧은 반복
- 상태 흐름을 보여주는 CSS animation
- `prefers-reduced-motion` 대응

주의:

- 5초 이상 자동 반복되는 움직임은 motion pause/reduced에서 멈춰야 한다.
- 텍스트를 계속 움직이는 패턴은 피한다.
- 관객이 읽어야 하는 정보 위에 모션을 겹치지 않는다.

## Asset Rules

- assets는 package 내부에 둔다.
- 큰 이미지는 발표 해상도에 맞게 최적화한다.
- SVG는 가능하면 자체 포함한다.
- 외부 CDN, Google Fonts, 원격 이미지에 의존하지 않는다.
- 저작권/라이선스가 불명확한 이미지를 넣지 않는다.

## Manifest Quality Rules

- `id`는 변경하지 않는 안정 식별자다.
- `metadata.description`, `metadata.authors`, `metadata.tags`, `metadata.language`, `metadata.license`는 플레이어 라이브러리와 업로드 이력에서 재사용할 수 있게 채운다.
- `metadata.thumbnail`은 package 내부 상대 경로만 사용한다.
- slide id는 사람이 읽을 수 있게 만든다: `intro`, `runtime-boundary`, `closing`.
- `durationSec`는 전체 발표 목표 시간이다.
- 각 slide의 `timingSec` 합은 `durationSec`와 크게 어긋나지 않게 한다.
- 모든 slide에 notes를 제공한다. 의도적으로 notes가 없는 경우 이유를 별도 검증 리포트에 남긴다.

## Agent Checklist

덱 작성 agent는 완료 전에 다음을 확인한다.

- `manifest.json`이 존재한다.
- 모든 slide `source` 파일이 존재한다.
- 모든 notes 파일이 존재하거나 누락 이유가 있다.
- slide id 중복이 없다.
- asset 경로가 package 내부 상대 경로다.
- slide HTML에 `<script>`와 inline event handler가 없다.
- 발표자 노트가 관객용 slide HTML에 노출되지 않는다.
- 긴 제목/리스트가 canvas를 넘지 않는다.
- 전체 흐름이 발표 목적과 일치한다.

## Output Summary Format

agent는 작업 완료 후 다음 형식으로 요약한다.

```text
Deck: <title>
Slides: <count>
Duration: <durationSec>
Assets: <count>
Notes coverage: <withNotes>/<total>
Validation: pass | warnings | fail
Known risks:
- ...
```
