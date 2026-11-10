# 원본 파일 대응 및 공개본 처리

기준: 2026-11-10. 원본 경로는 프로젝트 내부 상대경로이며, 개인 컴퓨터의 절대경로는 사용하지 않습니다.

| 공개본 | 원본 | 처리 |
| --- | --- | --- |
| [data/2026-10-26/feature-reference.json](data/2026-10-26/feature-reference.json) | `research/2026-10-26/feature-reference.json` | 개인 식별 예시 치환; 내용 유지 |
| [data/2026-10-26/journey-prep.json](data/2026-10-26/journey-prep.json) | `research/2026-10-26/journey-prep.json` | 개인 식별 예시 치환; 내용 유지 |
| [data/2026-10-26/screen-notes.json](data/2026-10-26/screen-notes.json) | `research/2026-10-26/screen-notes.json` | 개인 식별 예시 치환; 내용 유지 |
| [data/2026-11-01/map-content-final.json](data/2026-11-01/map-content-final.json) | `research/2026-11-01/map-content-final.json` | 개인 식별 예시 치환; 내용 유지 |
| [data/2026-11-01/graphic-content-final.json](data/2026-11-01/graphic-content-final.json) | `research/2026-11-01/graphic-content-final.json` | 개인 식별 예시 치환; 내용 유지 |
| [data/2026-10-26/screen-index.json](data/2026-10-26/screen-index.json) | `research/2026-10-26/inventory.ndjson` | screen-notes와 결합; 기록별 식별 쿼리 제거; 캡처 원본 대신 Figma 연결 |
| [notes/01-service-map.md](notes/01-service-map.md) | `_workspace/2026-11-01-001-dc8e/final.md` | 후처리 문체평가 메타데이터 제외; 고객·현장 예시 익명화; 구조 필드명을 Markdown 제목으로 변환 |
| [notes/02-graphic-service-map.md](notes/02-graphic-service-map.md) | `_workspace/2026-11-01-002-0518/final.md` | 후처리 문체평가 메타데이터 제외; 고객·현장 예시 익명화; 구조 필드명을 Markdown 제목으로 변환 |
| [notes/03-screen-flow.md](notes/03-screen-flow.md) | `_workspace/2026-11-01-003-10c9/final.md` | 후처리 문체평가 메타데이터 제외; 고객·현장 예시 익명화; 구조 필드명을 Markdown 제목으로 변환 |
| [notes/04-crm-features.md](notes/04-crm-features.md) | `_workspace/2026-11-01-004-bc28/final.md` | 후처리 문체평가 메타데이터 제외; 고객·현장 예시 익명화; 구조 필드명을 Markdown 제목으로 변환 |
| [notes/05-admin-features.md](notes/05-admin-features.md) | `_workspace/2026-11-01-005-6aa4/final.md` | 후처리 문체평가 메타데이터 제외; 고객·현장 예시 익명화; 구조 필드명을 Markdown 제목으로 변환 |

## 추가 생성 자료

- `README.md`, `HANDOFF.md`: 이번 웹 분석 자료의 읽는 순서와 인수인계 설명.
- `data/2026-11-01/figma-links.json`: 당시 생성 기록과 2026-11-10 주요 보드 조회를 결합한 링크 색인.
- `data/source-manifest.json`: 원본·공개본의 SHA-256 및 변환 내역.

고객 실명 예시는 ‘예시 고객’, 실제 현장 예시는 ‘예시 현장 A/B/C’로 바꿨습니다. 스크린샷·원시 스냅샷·도구 요청/응답 전체·원본 PDF는 공개본에 포함하지 않습니다. 원본 기능표 및 실제 화면은 README의 Google Sheets·Figma 링크를 참고하세요.

원본 JSON 안의 `sources.path`, `reference_document_path`, `screenshots/`, `snapshots/` 등은 당시 조사에서 사용한 원본 자료의 상대경로입니다. 공개 저장소에 모두 존재하는 다운로드 경로는 아닙니다. 공개본의 탐색에는 README와 화면 근거 색인을 사용하세요.
