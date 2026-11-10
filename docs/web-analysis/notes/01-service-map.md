# 서비스 구조·업무 흐름

기준: 2026-11-01 최종 문안. 실명·고객/현장 예시는 익명화했습니다. 화면 관찰과 저장·자동 처리 검증을 구분합니다.

### title
영업비서 · 어드민
현재 서비스 구조와 업무 흐름

### subtitle
10/26 화면 조사·기능표 기준  ·  11/01 정리  ·  리뉴얼 전 이해를 위한 업무 지도

### legend::0
화면 확인

### legend::1
문서·가이드

### legend::2
확인 필요

### legend::3
신규 요구

### index
빠르게 보기 00–02  /  업무 순서 설명 03–05  /  화면 연결 설명 06–07  /  다음 조사 08

### overview::title
00  두 서비스가 함께 하는 일

### overview::subtitle
광고 운영에서 들어온 문의를 고객 상담과 후속 관리로 연결한다.

### overview::services::0::0
어드민

### overview::services::0::1
우리 운영팀의 업무 공간

### overview::services::0::2
광고주·현장·계약·광고·제작·분배·성과를 관리한다.

### overview::services::1::0
영업비서 CRM

### overview::services::1::1
광고주 영업팀의 업무 공간

### overview::services::1::2
배정 고객을 상담하고 메모·통화·방문·계약 상태를 관리한다.

### overview::services::2::0
웹폼·내 페이지·전화

### overview::services::2::1
상담 고객이 만나는 접점

### overview::services::2::2
광고와 현장 자료를 보고 문의하거나 담당자와 연락한다.

### overview::flow::0::0
의뢰·결제

### overview::flow::0::1
광고주 / 운영 영업

### overview::flow::1::0
현장·광고 준비

### overview::flow::1::1
마케터 / 제작자

### overview::flow::2::0
문의 유입

### overview::flow::2::1
광고·웹폼

### overview::flow::3::0
광고주 분배

### overview::flow::3::1
어드민 / 지분

### overview::flow::4::0
담당자 배정

### overview::flow::4::1
CRM / 현장 팀

### overview::flow::5::0
상담·후속 관리

### overview::flow::5::1
영업담당자

### overview::flow::6::0
성과·재결제

### overview::flow::6::1
광고주 / 운영팀

### overview::distinctions::0::0
분배와 배정

### overview::distinctions::0::1
광고주별로 문의를 나누는 분배와 현장 안에서 영업담당자를 정하는 배정은 별개다.

### overview::distinctions::1::0
리드와 고객

### overview::distinctions::1::1
어드민의 리드와 CRM의 고객은 같은 데이터를 부르는 이름이다.

### overview::distinctions::2::0
두 가지 계약

### overview::distinctions::2::1
광고주의 광고 계약·결제 회차와 상담 고객의 가계약·정계약을 구분한다.

### overview::entities::0::0
광고주 ↔ 워크스페이스

### overview::entities::0::1
자료상 1:1

### overview::entities::1::0
현장 → 캠페인

### overview::entities::1::1
여러 매체 캠페인을 묶음

### overview::entities::2::0
공유 캠페인 → 광고주들

### overview::entities::2::1
지분에 따라 리드 분배

### overview::entities::3::0
고객 → 담당자·기록

### overview::entities::3::1
메모·통화·일정·상태

### overview::coverage
기능표 372항목: CRM 139 · 앱 15 · 어드민 218. 화면 54개 상태를 조사했다. 모든 기능을 실행 검증한 수치는 아니다.

### crm::title
01  영업비서 기능과 권한

### crm::subtitle
광고주 대표·팀장·영업담당자가 같은 고객 정보를 서로 다른 범위로 사용한다.

### crm::groups::0::0
오늘 할 일 파악

### crm::groups::0::1
대시보드 · 할일 · 최근 활동

### crm::groups::0::2
오늘 방문·재통화·리마인더와 팀의 상담 진척을 살핀다.

### crm::groups::1::0
고객 상담과 기록

### crm::groups::1::1
고객 목록 · 고객 카드

### crm::groups::1::2
검색·필터·배정·상태·메모·통화 이력·AI 요약을 확인한다.

### crm::groups::2::0
후속 상담 관리

### crm::groups::2::1
캘린더 · 방문 예약 · 알림

### crm::groups::2::2
방문 일정을 잡고 부재중 회신과 재통화 대상을 챙긴다.

### crm::groups::3::0
팀과 배정 관리

### crm::groups::3::1
멤버 관리 · 현장별 팀

### crm::groups::3::2
초대·역할·상위자·열람 범위·자동 배정·휴가를 관리한다.

### crm::groups::4::0
팀 협업과 고객 공유

### crm::groups::4::1
메시지 · 자료함 · 내 페이지

### crm::groups::4::2
팀과 고객 카드를 공유하고 고객에게 현장 자료를 보낸다.

### crm::groups::5::0
설정과 성과 확인

### crm::groups::5::1
광고 현황 · 설정 · 휴지통

### crm::groups::5::2
광고 성과를 확인하고 고객 상태·알림·AI 동의·복원을 관리한다.

### crm::roles::0::0
소유자

### crm::roles::0::1
전 고객 · 팀 권한 · 회사 정보
엑셀 가져오기·내보내기 · 영구 삭제

### crm::roles::1::0
관리자

### crm::roles::1::1
본인과 하위 조직의 고객
팀 관리 · 실적 · 고객 상태 설정

### crm::roles::2::0
담당자

### crm::roles::2::1
기본은 본인 고객
상담 기록 · 방문 · 재통화

### crm::roles::3::0
추가 권한

### crm::roles::3::1
현장 전체 보기와 담당자 변경은 별도
조회 범위가 넓어져도 수정 권한은 별개

### crm::native
앱 전용 연결: 통화 녹음 업로드 · 통화기록 동기화 · 푸시 · 다른 앱에서 공유해 고객 등록. 운영체제·버전·권한에 따라 확인이 필요하다.

### crm::limit
CRM은 조사 당시 API 404로 실제 고객 데이터가 열리지 않았다. 목록·폼 구조는 화면에서, 고객 상세·멤버·자동 배정은 문서와 가이드에서 확인했다.

### admin::title
02  어드민 기능과 권한

### admin::subtitle
운영 영업·마케터·제작자가 현장 중심으로 계약, 광고, 문의와 결과를 관리한다.

### admin::groups::0::0
운영 현황

### admin::groups::0::1
홈

### admin::groups::0::2
리드 유입·미응대율·광고주별 현황을 살핀다.

### admin::groups::1::0
제작·협업

### admin::groups::1::1
작업 보드 · 타임라인 · 작업 상세

### admin::groups::1::2
요청·담당·단계·마감·검수·완료를 관리한다.

### admin::groups::2::0
현장 운영

### admin::groups::2::1
현장 목록 · 현장 상세

### admin::groups::2::2
계약·회차·예산·매체·담당·캠페인 연동 정보를 모은다.

### admin::groups::3::0
문의 운영

### admin::groups::3::1
리드 목록 · 미배정 · 리드 상세

### admin::groups::3::2
유입 경로·분배·배정 결과·CAPI 이력을 확인한다.

### admin::groups::4::0
광고 운영

### admin::groups::4::1
광고 성과 · 소재 · 광고비 입력

### admin::groups::4::2
집행액·리드·CPL을 비교하고 일부 매체 비용을 입력한다.

### admin::groups::5::0
광고주 관리

### admin::groups::5::1
광고주 목록 · 현장·예산·구성원 탭

### admin::groups::5::2
광고주의 계약 이력·운영 현장·팀 구성을 확인한다.

### admin::groups::6::0
제작 자료

### admin::groups::6::1
문서 · 웹사이트 · 컨텐츠

### admin::groups::6::2
제안·견적·보고서·세금계산서, 웹폼과 AI 문구를 다룬다.

### admin::groups::7::0
정책·운영 지원

### admin::groups::7::1
설정 · 시스템 기록

### admin::groups::7::2
분배·상태·직원 권한·연동 오류와 자동 실행 이력을 관리한다.

### admin::roles::0::0
총관리자

### admin::roles::0::1
전 기능 · 직원 계정 · 녹취 · 세금계산서 발행

### admin::roles::1::0
중간관리자·마케터

### admin::roles::1::1
전 광고주 운영 · 총관리자 전용 기능 제외

### admin::roles::2::0
영업직원

### admin::roles::2::1
담당 광고주 · 현장·계약·추가 결제 / 일부 비용 비공개

### admin::roles::3::0
제작자

### admin::roles::3::1
작업·소재·웹 중심 / 연락처·금액 표시 제한

### admin::note
어드민에서 영업담당자와 상담 상태를 보는 기능은 있지만 기존 고객의 담당자·상태 변경은 CRM에서 한다.

### admin::limit
중간관리자 계정으로 주요 화면을 조회했다. 다른 역할의 범위와 저장 후 자동 처리는 기능표 설명이며 실행 검증하지 않았다.

### crmJourney::title
03  영업담당자의 고객 관리 여정

### crmJourney::subtitle
기본 시나리오: 새 고객을 배정받고 상담한 뒤 방문·재통화·계약 상태를 관리한다.

### crmJourney::rowLabels::0
담당자 행동

### crmJourney::rowLabels::1
주요 화면

### crmJourney::rowLabels::2
남는 정보·다음 단계

### crmJourney::rowLabels::3
자동 처리·분기

### crmJourney::stages::0::title
1  배정 확인

### crmJourney::stages::0::cells::0
새 고객 알림을 열고 내 고객을 확인한다.

### crmJourney::stages::0::cells::1
알림 → 고객 목록

### crmJourney::stages::0::cells::2
현장·유입 경로·담당자 확인

### crmJourney::stages::0::cells::3
푸시·알림톡 설정 / 휴가자는 배정 제외

### crmJourney::stages::1::title
2  고객 파악

### crmJourney::stages::1::cells::0
이전 문의와 메모·통화 이력을 읽는다.

### crmJourney::stages::1::cells::1
고객 목록 → 고객 카드

### crmJourney::stages::1::cells::2
상담 전 확인할 고객 정보

### crmJourney::stages::1::cells::3
같은 현장·번호의 재문의는 기존 카드에 기록

### crmJourney::stages::2::title
3  첫 상담

### crmJourney::stages::2::cells::0
전화하고 상태·관심도·메모를 남긴다.

### crmJourney::stages::2::cells::1
고객 카드 · 앱 통화

### crmJourney::stages::2::cells::2
상담 내용과 다음 연락 계획

### crmJourney::stages::2::cells::3
통화기록·녹음은 별도 경로 / AI 동의 필요

### crmJourney::stages::3::title
4  후속 약속

### crmJourney::stages::3::cells::0
방문·재통화 일정을 잡고 자료를 공유한다.

### crmJourney::stages::3::cells::1
방문 예약 · 내 페이지

### crmJourney::stages::3::cells::2
날짜·담당자·참고 메모·공유 링크

### crmJourney::stages::3::cells::3
일정은 캘린더·할일로 연결

### crmJourney::stages::4::title
5  오늘 처리

### crmJourney::stages::4::cells::0
방문과 회신 대상을 확인하고 완료한다.

### crmJourney::stages::4::cells::1
캘린더 · 오늘 할일

### crmJourney::stages::4::cells::2
완료 상태·추가 상담 기록

### crmJourney::stages::4::cells::3
새 부재중이 생기면 완료한 할일이 다시 열릴 수 있음

### crmJourney::stages::5::title
6  결과 공유

### crmJourney::stages::5::cells::0
고객 상태를 갱신하고 팀 실적을 확인한다.

### crmJourney::stages::5::cells::1
고객 카드 · 실적 · 최근 활동

### crmJourney::stages::5::cells::2
가계약·정계약 등 상태와 팀 집계

### crmJourney::stages::5::cells::3
계약 알림 / 유효 DB 조건에 맞으면 CAPI 전송

### crmJourney::branches::0::0
부재중·거절

### crmJourney::branches::0::1
통화기록 동기화 → 회신 리마인더 → 재알림 → 다시 상담

### crmJourney::branches::1::0
담당자 변경

### crmJourney::branches::1::1
현장·조직 권한 확인 → 단건·일괄 변경 → 새 담당자가 후속 관리

### crmJourney::branches::2::0
인터뷰로 확인

### crmJourney::branches::2::1
첫 응대의 기준, 하루 처리량, 가장 자주 놓치는 일과 화면 밖 기록

### crmJourney::evidence
기능표와 가이드로 재구성한 업무 여정이다. 실제 소요시간·사용자 감정·만족도는 조사 전이라 표시하지 않았다.

### adminJourney::title
04  운영팀의 광고 운영 여정

### adminJourney::subtitle
기본 시나리오: 광고주 의뢰를 현장·제작·집행·문의 운영·성과 보고로 연결한다.

### adminJourney::rowLabels::0
담당·행동

### adminJourney::rowLabels::1
주요 화면

### adminJourney::rowLabels::2
입력 → 결과

### adminJourney::rowLabels::3
연결·확인할 조건

### adminJourney::stages::0::title
1  의뢰·계약

### adminJourney::stages::0::cells::0
영업직원: 제안·견적을 만들고 계약 내용을 정리한다.

### adminJourney::stages::0::cells::1
문서 · 광고주 · 현장 등록

### adminJourney::stages::0::cells::2
광고주·상품·금액·기간 → 현장·회차

### adminJourney::stages::0::cells::3
실제 계약·입금 확인 채널과 승인자는 인터뷰 필요

### adminJourney::stages::1::title
2  제작 준비

### adminJourney::stages::1::cells::0
마케터: 자료·소구점을 확인하고 제작을 요청한다.

### adminJourney::stages::1::cells::1
현장 소재 · 컨텐츠 · 작업

### adminJourney::stages::1::cells::2
자료·기획·담당·마감 → 제작 단계

### adminJourney::stages::1::cells::3
모든 단계가 끝나도 요청자 확인 후 최종 완료

### adminJourney::stages::2::title
3  광고 연결

### adminJourney::stages::2::cells::0
마케터: 매체 캠페인·사이트·분배를 연결한다.

### adminJourney::stages::2::cells::1
현장 연동 · 웹사이트 · 분배

### adminJourney::stages::2::cells::2
캠페인·웹폼·지분 → 유입 경로

### adminJourney::stages::2::cells::3
구글 연결은 성과 수집 / 리드 유입 경로와 구분

### adminJourney::stages::3::title
4  문의 운영

### adminJourney::stages::3::cells::0
운영자: 유입·미배정·분배 실패를 확인한다.

### adminJourney::stages::3::cells::1
리드 · 미배정 · 분배 기록

### adminJourney::stages::3::cells::2
문의·경로 → 광고주 전달 → CRM 배정

### adminJourney::stages::3::cells::3
재문의는 원담당 반환 / 실패·후보 없음 규칙 확인

### adminJourney::stages::4::title
5  성과 관리

### adminJourney::stages::4::cells::0
마케터: 집행·리드·소재 성과와 응대 현황을 본다.

### adminJourney::stages::4::cells::1
광고 성과 · 광고비 입력 · 홈

### adminJourney::stages::4::cells::2
자동 수집·수기 비용 → 성과 비교

### adminJourney::stages::4::cells::3
네이버·카카오 비용 입력 / 기간·누적 지표 혼재

### adminJourney::stages::5::title
6  보고·재결제

### adminJourney::stages::5::cells::0
운영팀: 보고서를 만들고 추가 결제·기간을 관리한다.

### adminJourney::stages::5::cells::1
광고 보고서 · 계약 카드 · 예산

### adminJourney::stages::5::cells::2
성과·회차 이력 → 보고·새 회차

### adminJourney::stages::5::cells::3
기존 보고서는 비용 제외 / 새 공개 기준은 미확정

### adminJourney::branches::0::0
현장 정보 변경

### adminJourney::branches::0::1
광고 기간·매체·추가 결제 → 회차·히스토리 반영 → 현황판 동기화

### adminJourney::branches::1::0
공유 캠페인

### adminJourney::branches::1::1
광고주별 분배 지분과 소유 현장·다른 광고주 보기를 함께 확인

### adminJourney::branches::2::0
인터뷰로 확인

### adminJourney::branches::2::1
요청·제작·검수 인수인계, 수기 보정, 보고 후 광고주 문의 처리

### adminJourney::evidence
화면 구조와 기능표를 묶어 만든 운영 흐름이다. 단계별 책임자·승인·처리시간은 실제 운영 인터뷰로 확정한다.

### blueprint::title
05  두 서비스를 잇는 블루프린트

### blueprint::subtitle
상담 고객이 문의하고 상담받는 과정을 기준으로 접점과 내부 처리를 나눈다.

### blueprint::columns::0
광고·현장 탐색

### blueprint::columns::1
문의 접수

### blueprint::columns::2
배정·첫 상담

### blueprint::columns::3
후속 상담·방문

### blueprint::columns::4
결과·성과 확인

### blueprint::rows::0::label
상담 고객의 행동

### blueprint::rows::0::cells::0
광고·현장 소개를 살핀다.

### blueprint::rows::0::cells::1
웹폼·전화로 문의한다.

### blueprint::rows::0::cells::2
담당자의 연락을 받고 상담한다.

### blueprint::rows::0::cells::3
자료를 확인하고 재통화·방문한다.

### blueprint::rows::0::cells::4
상담을 이어가거나 계약 의사를 전달한다.

### blueprint::rows::1::label
고객과 만나는 접점

### blueprint::rows::1::cells::0
광고 소재 · 웹사이트 · 내 페이지

### blueprint::rows::1::cells::1
상담 신청 폼 · 전화

### blueprint::rows::1::cells::2
영업담당자의 전화·문자·카카오톡

### blueprint::rows::1::cells::3
방문 약속 · 공유 자료 · 현장 안내

### blueprint::rows::1::cells::4
후속 연락 · 계약 상담

### blueprint::rows::2::label
영업비서에서 하는 일

### blueprint::rows::2::cells::0
내 페이지·자료 준비

### blueprint::rows::2::cells::1
고객 카드에 문의 축적

### blueprint::rows::2::cells::2
알림 확인 · 고객 파악 · 상담 기록

### blueprint::rows::2::cells::3
캘린더 · 할일 · 부재중 회신

### blueprint::rows::2::cells::4
고객 상태 갱신 · 팀 실적 확인

### blueprint::rows::3::label
어드민의 내부 업무

### blueprint::rows::3::cells::0
계약·현장 · 제작 요청 · 캠페인 연결

### blueprint::rows::3::cells::1
웹폼 연결 · 유입 경로 확인

### blueprint::rows::3::cells::2
광고주 분배 · 미배정·실패 처리

### blueprint::rows::3::cells::3
광고·소재·응대 현황 모니터링

### blueprint::rows::3::cells::4
광고 보고서 · 결제 회차·기간 관리

### blueprint::rows::4::label
시스템·지원 처리

### blueprint::rows::4::cells::0
매체 연동 · 웹 추적 · 제작 자료

### blueprint::rows::4::cells::1
중복·재문의 판단 · 미배정 보관

### blueprint::rows::4::cells::2
CRM 자동 배정 · 푸시·알림톡

### blueprint::rows::4::cells::3
통화기록 · 녹음 · AI · 리마인더

### blueprint::rows::4::cells::4
성과 집계 · 유효 DB 전환 전송

### blueprint::rows::5::label
연결되는 정보

### blueprint::rows::5::cells::0
현장·캠페인·웹사이트·소재

### blueprint::rows::5::cells::1
이름·연락처·유입 경로·문의

### blueprint::rows::5::cells::2
광고주·현장·담당자·배정 이력

### blueprint::rows::5::cells::3
메모·통화·일정·열람 기록

### blueprint::rows::5::cells::4
상태·계약 집계·광고 성과·회차

### blueprint::lines::0
고객 접점과 내부 업무의 경계

### blueprint::lines::1
영업비서 ↔ 어드민의 인수인계

### blueprint::lines::2
사람이 하는 일 ↔ 자동·지원 처리

### blueprint::notes::0::0
연결 1  광고주 분배

### blueprint::notes::0::1
어드민에서 어느 광고주가 받을 문의인지 정한다.

### blueprint::notes::1::0
연결 2  담당자 배정

### blueprint::notes::1::1
CRM 현장 팀에서 누가 상담할 고객인지 정한다.

### blueprint::notes::2::0
연결 3  상담 결과 반영

### blueprint::notes::2::1
CRM의 상태·기록이 팀 실적과 운영 성과 확인에 쓰인다.

### blueprint::evidence
기능표에 적힌 연결을 도식화했다. AI 시작 조건·재문의 예외·정산처럼 상충하거나 확인되지 않은 규칙은 08에 모았다.

### crmWire::title
06  영업비서 화면 연결

### crmWire::subtitle
현재 주요 영역을 단순화한 와이어프레임. 새 UI 제안이나 완전한 화면 복제는 아니다.

### crmWire::screens::0::title
1  고객 목록

### crmWire::screens::0::badge
화면 구조

### crmWire::screens::0::route
/customers

### crmWire::screens::0::blocks::0::0
상단

### crmWire::screens::0::blocks::0::1
워크스페이스 · 현장 · 검색

### crmWire::screens::0::blocks::1::0
찾기

### crmWire::screens::0::blocks::1::1
플랫폼 · 기간 · 담당자 · 관심도

### crmWire::screens::0::blocks::2::0
고객 표·모바일 카드

### crmWire::screens::0::blocks::2::1
고객명 | 상태 | 담당자 | 최근 메모

### crmWire::screens::0::blocks::3::0
주요 행동

### crmWire::screens::0::blocks::3::1
고객 추가 · 고객 열기 · 담당자 변경

### crmWire::screens::0::note
목록의 11개 열 중 주요 영역만 표시한다. 체크로 선택한 후에는 권한에 따라 일괄 변경 기능이 노출된다.

### crmWire::screens::1::title
2  고객 카드

### crmWire::screens::1::badge
문서·가이드

### crmWire::screens::1::route
고객 목록에서 고객 선택

### crmWire::screens::1::blocks::0::0
기본 정보

### crmWire::screens::1::blocks::0::1
현장 · 이름 · 연락처 · 담당자

### crmWire::screens::1::blocks::1::0
상담 상태

### crmWire::screens::1::blocks::1::1
상태 · 관심도 · 수정

### crmWire::screens::1::blocks::2::0
활동 기록

### crmWire::screens::1::blocks::2::1
메모 · 통화 이력 · AI 통화 요약

### crmWire::screens::1::blocks::3::0
후속 행동

### crmWire::screens::1::blocks::3::1
방문 예약 · 내 페이지 공유

### crmWire::screens::1::note
이전·다음 고객 이동, 재문의 기록, 공유한 내 페이지 열람 내역을 함께 확인.

### crmWire::screens::2::title
3  캘린더

### crmWire::screens::2::badge
화면 구조

### crmWire::screens::2::route
/calendar

### crmWire::screens::2::blocks::0::0
탐색

### crmWire::screens::2::blocks::0::1
월 이동 · 담당자 필터

### crmWire::screens::2::blocks::1::0
월간 달력

### crmWire::screens::2::blocks::1::1
날짜별 일정

### crmWire::screens::2::blocks::2::0
선택한 날짜

### crmWire::screens::2::blocks::2::1
고객 · 시간 · 담당자 · 메모

### crmWire::screens::2::blocks::3::0
주요 행동

### crmWire::screens::2::blocks::3::1
방문 일정 등록 · 고객 카드 열기

### crmWire::screens::2::note
고객 카드의 방문 예약과 연결. 휴가 등록은 배정 제외 규칙에도 영향을 준다.

### crmWire::screens::3::title
4  오늘 할일

### crmWire::screens::3::badge
화면 구조

### crmWire::screens::3::route
/tasks

### crmWire::screens::3::blocks::0::0
오늘의 목록

### crmWire::screens::3::blocks::0::1
방문 · 재통화 · 리마인더

### crmWire::screens::3::blocks::1::0
정렬·필터

### crmWire::screens::3::blocks::1::1
종류별 필터 · 우선도순

### crmWire::screens::3::blocks::2::0
할일 항목

### crmWire::screens::3::blocks::2::1
고객 · 해야 할 일 · 완료 표시

### crmWire::screens::3::blocks::3::0
고객으로 복귀

### crmWire::screens::3::blocks::3::1
고객 카드에서 후속 상담 기록

### crmWire::screens::3::note
날짜 선택 없이 오늘 기준. 새 부재중이 생기면 완료 항목이 다시 열릴 수 있다.

### crmWire::flow
알림 → 고객 목록 → 고객 카드 → 방문·재통화 예약 → 캘린더·오늘 할일 → 고객 카드

### crmWire::limit
고객 상세는 가이드 참고. 실제 테스트 고객의 연속 흐름은 API 연결 복구 후 확인해야 한다.

### adminWire::title
07  어드민 화면 연결

### adminWire::subtitle
현장을 중심으로 계약·유입·성과를 오가며 운영 상태를 설명한다.

### adminWire::screens::0::title
1  현장 목록

### adminWire::screens::0::badge
화면 확인

### adminWire::screens::0::route
현장 목록

### adminWire::screens::0::blocks::0::0
보기

### adminWire::screens::0::blocks::0::1
운영중 · 준비중 · 내 담당 · 전체

### adminWire::screens::0::blocks::1::0
조건

### adminWire::screens::0::blocks::1::1
현장·광고주 검색 · 지역 · 기간

### adminWire::screens::0::blocks::2::0
현장 표

### adminWire::screens::0::blocks::2::1
상태 | 기간 | 리드 | 예산 | CPL

### adminWire::screens::0::blocks::3::0
주요 행동

### adminWire::screens::0::blocks::3::1
현장 상세 열기 · 현장 등록

### adminWire::screens::0::note
리드는 선택 기간, 예산 소진·CPL은 누적 기준이라는 문서 설명이 있다.

### adminWire::screens::1::title
2  현장 상세

### adminWire::screens::1::badge
화면 확인

### adminWire::screens::1::route
현장 행 선택

### adminWire::screens::1::blocks::0::0
계약·회차

### adminWire::screens::1::blocks::0::1
결제액 · 운영비 · 집행액 · 잔액

### adminWire::screens::1::blocks::1::0
업무 탭

### adminWire::screens::1::blocks::1::1
개요 · 광고 · 리드 · 분배 · 소재

### adminWire::screens::1::blocks::2::0
연결 탭

### adminWire::screens::1::blocks::2::1
정리본 · 웹사이트 · 연동 · 히스토리

### adminWire::screens::1::blocks::3::0
주요 행동

### adminWire::screens::1::blocks::3::1
추가 결제 · 기간 변경 · 작업·보고서

### adminWire::screens::1::note
운영 정보가 모이는 중심 화면. 공유 캠페인은 광고주에 따라 보이는 범위가 다르다.

### adminWire::screens::2::title
3  리드 상세

### adminWire::screens::2::badge
화면 확인

### adminWire::screens::2::route
리드 목록 또는 현장 리드

### adminWire::screens::2::blocks::0::0
유입 경로

### adminWire::screens::2::blocks::0::1
매체 → 캠페인 → 광고세트 → 소재

### adminWire::screens::2::blocks::1::0
배정 정보

### adminWire::screens::2::blocks::1::1
광고주 · 현장 · 담당자

### adminWire::screens::2::blocks::2::0
상담·전환

### adminWire::screens::2::blocks::2::1
메모 · 상태 · CAPI 전송

### adminWire::screens::2::blocks::3::0
추적·이력

### adminWire::screens::2::blocks::3::1
UTM · 문의 경로 · 변경 기록

### adminWire::screens::2::note
어드민은 유입·분배·추적을 확인한다. 기존 고객의 담당자·상태 변경은 CRM으로 연결된다.

### adminWire::screens::3::title
4  성과·보고

### adminWire::screens::3::badge
화면 확인

### adminWire::screens::3::route
광고 성과 · 문서 · 광고 보고서

### adminWire::screens::3::blocks::0::0
성과 요약

### adminWire::screens::3::blocks::0::1
기간 · 현장 · 매체

### adminWire::screens::3::blocks::1::0
비교

### adminWire::screens::3::blocks::1::1
광고비 · 리드 · CPL · 소재 성과

### adminWire::screens::3::blocks::2::0
비용 보완

### adminWire::screens::3::blocks::2::1
네이버·카카오 수기 입력·일괄 업로드

### adminWire::screens::3::blocks::3::0
보고서

### adminWire::screens::3::blocks::3::1
주간·종료 보고서 · 인쇄·PDF

### adminWire::screens::3::note
기존 광고 보고서는 비용 지표를 제외한다. 광고비·수수료 공개는 별도 신규 요구다.

### adminWire::flow
현장 목록 → 현장 상세 → 리드·광고 성과 확인 → 보고서 → 추가 결제·기간 관리

### adminWire::limit
와이어프레임은 정보의 위치와 연결을 설명한다. 금액·연락처·쓰기 권한은 역할에 따라 달라진다.

### questions::title
08  설계 전에 확인할 것

### questions::subtitle
현재 기능, 문서의 설명, 신규 사업 요구를 구분하고 다음 조사의 질문으로 남긴다.

### questions::items::0::0
우선 1  비용·수수료

### questions::items::0::1
결제액·운영비·집행액·잔액·수수료는 어떻게 계산하는가?

### questions::items::0::2
대표·운영 담당 / VAT·기간·공유 캠페인 배분·정정·환불·이관 기준

### questions::items::1::0
우선 2  분배·배정 예외

### questions::items::1::1
재문의 원담당이 휴가·퇴사 상태이거나 배정 후보가 없으면 누가 처리하는가?

### questions::items::1::2
마케터·CRM 관리자 / 대기·재시도·수동 처리·알림 기준

### questions::items::2::0
우선 3  실제 인수인계

### questions::items::2::1
의뢰·입금·제작·검수·광고 연결의 완료를 누가 확인하는가?

### questions::items::2::2
운영 영업·마케터·제작자 / 카톡·슬랙·NAS·엑셀 등 화면 밖 업무

### questions::items::3::0
우선 4  설명이 다른 기능

### questions::items::3::1
AI 요약은 언제 자동·수동으로 시작하는가? 사이트 연결 후 미배정은 자동 처리인가?

### questions::items::3::2
개발·운영 담당 / 진입점별 조건과 문서 상충 확인

### questions::items::4::0
우선 5  실제 사용 확인

### questions::items::4::1
대표·팀장·담당자의 고객 범위와 앱 동작이 문서 설명과 같은가?

### questions::items::4::2
테스트 계정·실기기 / CRM API 복구·iOS 배포·권한·오류 상태

### questions::newRequirement::0
신규 요구  광고비·수수료 공개

### questions::newRequirement::1
기존 보고서는 비용을 제외한다. 새 공개 화면은 금액의 정의·확정 시점·조회 권한부터 합의해야 한다.

### questions::sources::0
영업비서 UX·UI 리뉴얼 브리프 · 3쪽

### questions::sources::1
영업비서 기능 정리 · 요약 / CRM / 앱 / 어드민 / 역할 / 용어

### questions::sources::2
2026-10-26 Ego Lite 화면 조사 · 어드민 33 / CRM 21개 상태

### questions::limits
기능표의 정상·알려진 문제는 원문 기록이다. 저장·발송·결제·삭제·자동 처리와 모든 역할을 실행 검증한 결과는 아니다.

### questions::interview
브리프의 인터뷰 대상: 마케터 · 영업직원 · 광고주 담당 · 광고주. 시간·빈도·불편·감정은 인터뷰 후 추가한다.
