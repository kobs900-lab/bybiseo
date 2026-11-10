# 영업비서 웹 CRM·운영 어드민 분석 근거자료

2026-10-26 초기 조사, 2026-11-01 서비스 지도·화면 조사 정리, 2026-11-03 표기의 통합 플로우를 연결하는 자료입니다. 2026-11-10 공개용 분석 자료로 정리했습니다.

## 처음 읽는 순서

1. [다른 세션용 인수인계 프롬프트](HANDOFF.md)
2. [전체 통합 플로우](https://www.figma.com/design/NGuWMZPzRryklddGjC0Ihw?node-id=49-843)
3. [서비스 구조와 확인할 질문](data/2026-10-26/journey-prep.json)
4. [CRM 기능별 설명](notes/04-crm-features.md) · [어드민 기능별 설명](notes/05-admin-features.md)
5. [화면 관찰 기록](data/2026-10-26/screen-notes.json) · [화면 근거 색인](data/2026-10-26/screen-index.json)
6. [원본 파일 대응·공개본 처리 내역](SOURCES.md)

## 주요 결과물

| 자료 | 내용 |
| --- | --- |
| [기능표 스냅샷](data/2026-10-26/feature-reference.json) | CRM 139, 앱 15, 어드민 218: 총 372개 기능표 항목과 원문 행 링크 |
| [원본 Google Sheets](https://docs.google.com/spreadsheets/d/1aSov0NMwYqSkhpuyMo-GNIhoY3t70HYP9q-M15l6C2Y/edit) | 접근 권한에 따라 최신 기능표 확인 |
| [여정·규칙·미확인 질문](data/2026-10-26/journey-prep.json) | 서비스 경계, 관계, 분배·배정, 정책 질문과 조사 한계 |
| [서비스 지도 문안](notes/01-service-map.md) | 00–08 서비스 역할·권한·여정·화면 연결 |
| [그래픽 서비스 설명](notes/02-graphic-service-map.md) | 09–12 연결도·여정·인수인계·블루프린트 |
| [실제 화면 플로우 설명](notes/03-screen-flow.md) | 13–14 CRM·어드민 화면 이동과 미실행 범위 |
| [Figma 보드 색인](data/2026-11-01/figma-links.json) | 주요 보드 7개와 기능별 보드 22개 링크 |

## Figma 바로가기

- [전체 통합 플로우](https://www.figma.com/design/NGuWMZPzRryklddGjC0Ihw?node-id=49-843)
- [현재 서비스 지도 00–08](https://www.figma.com/design/NGuWMZPzRryklddGjC0Ihw?node-id=5-13)
- [그래픽 서비스 지도 09–12](https://www.figma.com/design/NGuWMZPzRryklddGjC0Ihw?node-id=9-264)
- [실제 화면 플로우 13–14](https://www.figma.com/design/NGuWMZPzRryklddGjC0Ihw?node-id=13-770)
- [기능별 보드 목차](https://www.figma.com/design/NGuWMZPzRryklddGjC0Ihw?node-id=30-818)
- [CRM PC·모바일 웹 15–24](https://www.figma.com/design/NGuWMZPzRryklddGjC0Ihw?node-id=21-818)
- [어드민 PC·모바일 웹 25–36](https://www.figma.com/design/NGuWMZPzRryklddGjC0Ihw?node-id=28-818)

## 핵심 구분

- 어드민은 운영팀의 광고주·현장·계약·제작·광고·리드·성과 관리 공간입니다. CRM은 광고주 영업팀의 고객 상담·기록·방문·후속 관리 공간입니다.
- 광고주별 **분배**와 현장 팀의 담당자 **배정**은 별개입니다.
- 광고 계약·결제 회차와 상담 고객의 가계약·정계약은 다릅니다.
- 372는 기능표 항목 수입니다. 테스트 통과 수·화면 수·사용량이 아닙니다.

## 근거의 시점과 한계

10/26에는 CRM 일부 API 404로 데이터 흐름을 확인하지 못했습니다. 11/01에는 데모 고객 상세·AI 요약·방문 예약 폼·기존 일정까지 확인한 기록이 있습니다. 10/26의 관찰 한계와 11/01의 추가 확인을 함께 읽어야 합니다.

화면 직접 관찰, 사용 가이드, 문서상의 정책, 미확인 사항, 설계 가설을 구분합니다. 저장·발송·결제·삭제·자동 처리와 모든 역할의 권한을 실행 검증한 자료가 아닙니다. 비용·수수료 산식과 공개 범위, 분배·배정 예외, 실제 인수인계, AI 자동/수동 조건은 확인 질문으로 남아 있습니다.

## 공개본 범위

이 저장소에는 기능·구조 분석, 화면별 관찰 요약, 근거 색인과 최종 문안을 제공합니다. 설명 속 고객 이름과 구체적인 현장 예시는 익명화했습니다. 원본 캡처·원시 화면 텍스트·도구 실행 로그·인증정보는 포함하지 않았습니다. 실제 화면은 위 Figma 링크에서 해당 파일의 접근 권한에 따라 확인할 수 있습니다. Figma의 공유 권한은 변경하지 않았습니다.

모바일 앱 고객 탭의 11/09–11/10 분석은 별도 작업입니다. 이 디렉터리는 웹 CRM·운영 어드민의 전체 분석을 다룹니다.
