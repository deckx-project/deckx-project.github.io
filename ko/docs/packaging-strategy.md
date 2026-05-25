# Packaging Strategy

이 프로젝트는 발표 파일 작성기가 아니라 DeckX Package를 재생하는 플레이어다. 따라서 패키징 전략도 "소프트웨어 배포"와 "발표 덱 배포"를 분리해야 한다.

## 결론

기본 모델은 **온라인 플레이어 + `.deckx` 덱 열기**가 맞다.

오프라인 발표장 대응을 위해서는 별도 export 형태로 **portable show package**를 제공한다.

소프트웨어와 덱을 항상 하나의 zip으로 묶는 방식은 초기 데모에는 편하지만, 장기적으로는 플레이어 업데이트와 덱 배포가 강하게 결합되므로 기본 모델로 삼지 않는다.

## Option A: Hosted Player + DeckX Package

```text
https://player.example.com
  -> Open deck.deckx
```

장점:

- 플레이어 업데이트를 중앙에서 배포할 수 있다.
- 발표 덱은 `.deckx` 파일 하나로 이동한다.
- 사람이든 agent든 같은 package spec을 목표로 작성한다.
- 여러 덱을 같은 플레이어에서 열 수 있다.

단점:

- 발표장 인터넷과 브라우저 정책에 영향을 받는다.
- 큰 asset을 포함한 deck upload/open UX가 필요하다.
- 오프라인 fallback을 별도로 준비해야 한다.

권장 용도:

- 일반 사용
- 사내/개인 발표 준비
- 덱 검증/리허설

## Option B: Portable Show Package

```text
my-talk-show.zip
  player/
    index.html
    assets/
  deck.deckx
  start.command
  README_FOR_PRESENTATION.md
```

장점:

- 발표 PC로 파일 하나를 옮기기 쉽다.
- 인터넷이 없어도 발표할 수 있다.
- 특정 발표 시점의 player version과 deck version을 함께 고정한다.

단점:

- 플레이어 패치가 덱마다 복제된다.
- 브라우저 `file://` 제약 때문에 로컬 서버 실행 스크립트가 필요할 수 있다.
- 동일 덱을 업데이트할 때 패키지를 다시 만들어야 한다.

권장 용도:

- 컨퍼런스/외부 발표
- 인터넷 불확실한 장소
- 최종 발표본 백업

## Option C: Bundled Demo App

초기에는 `src/examples/*.ts` 방식이었지만, 현재 데모 원본은 `examples/deckx-*/` source folder로 이동했다.

장점:

- 개발이 쉽다.
- e2e 테스트가 단순하다.
- 프레임워크 기능 검증용으로 충분하다.

단점:

- 덱이 소프트웨어 bundle에 박힌다.
- 외부 agent가 만든 발표 파일을 열기 어렵다.
- "PPT player"가 아니라 "발표 사이트"처럼 굳어진다.

권장 용도:

- 런타임 개발
- 최소 smoke demo Deck
- 회귀 테스트

## Option D: Separate Demo Repository

공식 샘플과 스트레스 데모가 늘어나면 player source와 demo source를 분리한다.

```text
deckx-player-dev      # private runtime source, tests, docs
deckx-project.github.io
  index.html          # public bundled player
  assets/
  decks/              # small curated demo .deckx only
deckx-demos           # demo source folders and generated .deckx artifacts
```

장점:

- player repo가 asset-heavy demo와 generated slide fixture로 비대해지지 않는다.
- demo repo를 public으로 열면 DeckX authoring example 자체가 제품 문서가 된다.
- GitHub Pages 또는 Releases URL을 player catalog가 직접 참조할 수 있다.
- 큰 이미지/롱덱/edge-case fixture를 public player 배포 크기와 분리할 수 있다.

단점:

- player PR과 demo PR을 동시에 맞춰야 하는 경우가 생긴다.
- manifest schema 변경 시 demo repo CI까지 함께 갱신해야 한다.
- 로컬 개발에서 demo URL/fixture 동기화 규칙이 필요하다.

권장 기준:

- player repo에는 smoke 수준의 작은 official samples만 유지한다.
- 이미지 다량, 100장 이상 롱덱, 접근성/국제화/깨진 패키지 fixture는 demo repo로 옮긴다.
- public player의 기본 카탈로그에는 작은 샘플만 노출하고, stress demo는 "demo lab" 링크나 별도 카탈로그로 분리한다.

## Recommended Roadmap

1. Done: `docs/DECKX_PACKAGE.md`로 package spec을 고정한다.
2. Done: `examples/deckx-player-demo/` source folder를 추가한다.
3. Done: `pack-deckx` CLI를 만든다.
4. Done: `validate-deckx` CLI를 만든다.
5. Done: hosted player에서 `/player?deck=<url>`과 랜딩 URL 입력으로 `.deckx` 파일 열기 UX를 추가한다.
6. Done: metadata-rich, image-heavy, long-deck stress demo fixture를 dev repo에 추가한다.
7. `deckx-demos` repo를 만들어 official samples와 stress fixtures를 분리한다.
8. service worker/cache 기반 offline-ready hosted player를 검토한다.
9. portable show package export를 추가한다.

## 필요한 추가 구성

- `deckx-manifest.schema.json`: manifest 정적 검증용 JSON Schema
- `examples/deckx-player-demo/`: 폴더 기반 도그푸딩 덱 작성 예제
- `scripts/pack-deckx.mjs`: source folder를 `.deckx` zip으로 변환
- `scripts/validate-deckx.mjs`: `.deckx` 또는 source folder 검증
- `scripts/export-show-package.mjs`: player build + deck.deckx를 하나의 발표용 패키지로 묶기
- trust policy: Safe Deck과 Trusted Deck의 경계
- migration policy: `schemaVersion` 변경 시 변환 규칙

## Operational Recommendation

발표자는 최종적으로 두 가지 파일을 가질 수 있어야 한다.

```text
deck.deckx
show-package.zip
```

`deck.deckx`는 표준 발표 파일이고, `show-package.zip`은 인터넷이 안 되는 발표장을 위한 백업이다.

제품의 기본 경험은 hosted player에서 `.deckx`를 여는 방식으로 설계한다. portable package는 export 기능으로 제공한다.
