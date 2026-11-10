# 그래픽 서비스 지도

기준: 2026-11-01 최종 문안. 실명·고객/현장 예시는 익명화했습니다. 화면 관찰과 저장·자동 처리 검증을 구분합니다.

### title
서비스를 흐름으로 읽기

### subtitle
아이콘은 업무 주체와 접점, 화살표는 업무와 정보가 이어지는 방향을 뜻한다.

### legend::0
영업비서

### legend::1
어드민

### legend::2
고객 접점

### legend::3
예외·확인 필요

### source
2026-10-26 화면 조사·기능표 기준 · 세부 근거와 확인할 규칙은 왼쪽 00–08 보드 참고

### overview::title
09  서비스 연결도

### overview::subtitle
광고 문의가 담당자의 상담으로 이어지는 구조

### overview::actors::0::0
광고주

### overview::actors::0::1
의뢰·결제·성과 확인

### overview::actors::1::0
상담 고객

### overview::actors::1::1
광고 탐색·문의

### overview::actors::2::0
영업담당자

### overview::actors::2::1
통화·방문·후속 관리

### overview::services::0::0
어드민

### overview::services::0::1
광고주별 문의 분배

### overview::services::0::2
현장

### overview::services::0::3
제작

### overview::services::0::4
광고

### overview::services::0::5
리드

### overview::services::1::0
영업비서

### overview::services::1::1
담당자 배정과 고객 관리

### overview::services::1::2
고객 카드

### overview::services::1::3
통화

### overview::services::1::4
일정

### overview::services::1::5
상태

### overview::intake::0
광고·웹폼

### overview::intake::1
문의 유입

### overview::arrows::0
의뢰·계약

### overview::arrows::1
광고주 분배

### overview::arrows::2
담당자 배정

### overview::arrows::3
상담·자료·방문

### overview::arrows::4
상담 결과 확인

### overview::distinction
광고주에게 나누는 ‘분배’와 영업담당자를 정하는 ‘배정’은 별개

### overview::chartTitle
기능표에 담긴 항목 수

### overview::chartLabels::0
영업비서 CRM

### overview::chartLabels::1
네이티브 앱

### overview::chartLabels::2
어드민

### overview::chartNote
총 372항목 · 사용량이나 중요도를 나타내는 수치는 아님

### crm::title
10  영업담당자의 고객 관리 여정

### crm::subtitle
새 고객을 상담하고 다음 약속을 챙기는 반복 흐름

### crm::persona::0
영업담당자

### crm::persona::1
내 고객을 놓치지 않고 후속 상담까지 관리

### crm::steps::0::0
배정 확인

### crm::steps::0::1
알림

### crm::steps::0::2
새 고객

### crm::steps::1::0
고객 파악

### crm::steps::1::1
고객 목록

### crm::steps::1::2
이전 기록

### crm::steps::2::0
첫 상담

### crm::steps::2::1
고객 카드·통화

### crm::steps::2::2
상담 메모

### crm::steps::3::0
약속 잡기

### crm::steps::3::1
방문 예약

### crm::steps::3::2
방문·재통화

### crm::steps::4::0
오늘 처리

### crm::steps::4::1
캘린더·할일

### crm::steps::4::2
완료·회신

### crm::steps::5::0
결과 공유

### crm::steps::5::1
고객 상태·실적

### crm::steps::5::2
가계약·정계약

### crm::record::0
고객 카드

### crm::record::1
메모

### crm::record::2
통화 이력

### crm::record::3
방문 일정

### crm::record::4
상태

### crm::branch::0
부재중·거절

### crm::branch::1
회신 리마인더

### crm::branch::2
재알림

### crm::branch::3
다시 상담

### crm::branchTitle
응답이 없을 때 이어지는 흐름

### crm::note
문서·가이드로 재구성한 여정. 실제 고객의 연속 흐름은 CRM API 복구 후 확인 필요.

### crm::noCurve
소요시간·감정 곡선은 사용자 조사 후 추가

### admin::title
11  광고 운영의 업무 인수인계

### admin::subtitle
업무가 어떤 주체에게 넘어가는지 따라 읽는 운영 여정

### admin::stages::0
의뢰·계약

### admin::stages::1
제작 준비

### admin::stages::2
제작·검수

### admin::stages::3
광고 연결

### admin::stages::4
문의·성과

### admin::stages::5
보고·재결제

### admin::lanes::0
영업·운영

### admin::lanes::1
마케터

### admin::lanes::2
제작자

### admin::lanes::3
시스템

### admin::tasks::0::0
제안·견적

### admin::tasks::0::1
현장·회차

### admin::tasks::1::0
기획·제작 요청

### admin::tasks::1::1
자료·담당·마감

### admin::tasks::2::0
소재·웹 제작

### admin::tasks::2::1
작업 보드

### admin::tasks::3::0
요청자 확인

### admin::tasks::3::1
최종 완료

### admin::tasks::4::0
캠페인·웹폼

### admin::tasks::4::1
분배 지분 연결

### admin::tasks::5::0
문의·광고 성과

### admin::tasks::5::1
미배정·비용 확인

### admin::tasks::6::0
보고·추가 결제

### admin::tasks::6::1
새 회차·기간

### admin::system::0::0
문의 수집

### admin::system::0::1
매체·웹폼

### admin::system::1::0
분배·전달

### admin::system::1::1
광고주 → CRM

### admin::handoffs::0
제작 요청

### admin::handoffs::1
검수·확인

### admin::handoffs::2
운영 시작

### admin::handoffs::3
성과 보고

### admin::note
역할별 흐름은 자료 기준. 실제 승인자와 화면 밖 인수인계는 운영 인터뷰로 확인.

### admin::loop
추가 결제·기간 변경 후 다음 운영 회차로

### blueprint::title
12  고객 문의를 중심으로 본 서비스 블루프린트

### blueprint::subtitle
위쪽은 고객과 만나는 일, 아래쪽은 내부 업무와 자동 처리

### blueprint::stages::0
탐색

### blueprint::stages::1
문의

### blueprint::stages::2
상담

### blueprint::stages::3
방문·후속 관리

### blueprint::stages::4
결과 확인

### blueprint::lanes::0::0
상담 고객

### blueprint::lanes::0::1
고객 행동

### blueprint::lanes::1::0
고객 접점

### blueprint::lanes::1::1
직접 만나는 화면·채널

### blueprint::lanes::2::0
영업비서

### blueprint::lanes::2::1
영업팀의 고객 관리

### blueprint::lanes::3::0
어드민

### blueprint::lanes::3::1
운영팀의 내부 업무

### blueprint::lanes::4::0
시스템

### blueprint::lanes::4::1
자동·지원 처리

### blueprint::nodes::0::0
광고 탐색

### blueprint::nodes::0::1
문의 남기기

### blueprint::nodes::0::2
상담받기

### blueprint::nodes::0::3
방문·재통화

### blueprint::nodes::0::4
의사 전달

### blueprint::nodes::1::0
광고·현장 소개

### blueprint::nodes::1::1
웹폼·전화

### blueprint::nodes::1::2
담당자 연락

### blueprint::nodes::1::3
자료·방문 약속

### blueprint::nodes::1::4
후속 연락

### blueprint::nodes::2::0
내 페이지

### blueprint::nodes::2::1
고객 카드

### blueprint::nodes::2::2
담당자 배정

### blueprint::nodes::2::3
일정·할일

### blueprint::nodes::2::4
상태·실적

### blueprint::nodes::3::0
현장·제작

### blueprint::nodes::3::1
유입·분배

### blueprint::nodes::3::2
미배정 확인

### blueprint::nodes::3::3
광고 모니터링

### blueprint::nodes::3::4
보고·회차

### blueprint::nodes::4::0
매체 연동

### blueprint::nodes::4::1
중복·재문의 판단

### blueprint::nodes::4::2
푸시·알림톡

### blueprint::nodes::4::3
통화·AI·리마인더

### blueprint::nodes::4::4
전환·성과 집계

### blueprint::boundaries::0
고객에게 보이는 접점과 내부 업무의 경계

### blueprint::boundaries::1
영업비서와 어드민의 인수인계

### blueprint::boundaries::2
사람이 하는 일과 자동·지원 처리의 경계

### blueprint::handoffs::0
문의 접수

### blueprint::handoffs::1
광고주 분배

### blueprint::handoffs::2
담당자 배정

### blueprint::handoffs::3
상담 결과

### blueprint::legend::0
실선: 주요 업무·정보 흐름

### blueprint::legend::1
점선: 보조 연결·후속 흐름

### blueprint::note
업무의 연결을 표현한 지도. 데이터 전송 방식·처리시간·예외 규칙은 별도 확인 필요.
