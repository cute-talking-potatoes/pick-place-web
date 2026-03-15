# USER FLOW (현재 구현 기준)

## 1. 문서 개요
- 목적: 현재 코드 기준의 실제 사용자 흐름 정리
- 기준 파일: `src/routes.js`, `src/app/pages/*`, `src/app/components/TopNav.jsx`, `src/app/components/CommunityModeTabs.jsx`
- 성격: 기획안이 아닌 현재 동작 문서

## 2. 공통 내비게이션 흐름
- 공통 상단 헤더(`TopNav`)는 모바일/PC 모두 설정 아이콘(`/settings`)이 항상 노출됨
- PC 공통 헤더 메뉴(상단): `메인(/main)`, `스팟(/spots)`, `커뮤니티(/community, /meetups, /upload, /post, /chat 포함 active)`, `내정보(/profile, /profile/:id, /settings, /friends 포함 active)`
- 모바일 하단 탭(`BottomNav`)은 각 주요 페이지 하단에서 사용
- 커뮤니티 상단 탭(`CommunityModeTabs`):
  - `피드` -> `/community?tab=feed`
  - `질문` -> `/community?tab=question`
  - `모임` -> `/meetups` (커뮤니티 내부 독립 탭이 아니라 모임 페이지로 이동)

## 3. 화면별 User Flow

### Main
- 진입: `/main`
- 주요 동작:
  1. 상단 검색/필터/현재위치 버튼 사용
  2. `현재 위치 기반 장소 추천` 카드 확인 -> 카드 클릭 시 `/spot/:id`
  3. 지도 마커 선택 -> 하단 스팟 카드 노출 -> `자세히 보기`로 `/spot/:id`

### Spot
- 스팟 리스트: `/spots`
  - 탭: `전체/방문 완료/북마크` (URL query `tab` 기반)
  - `취향 기반 장소 추천` 태그 선택
  - 정렬: 거리순/평점순/리뷰순/이름순
  - 카드 클릭 -> `/spot/:id`
- 스팟 상세: `/spot/:id`
  - 북마크/방문 체크 토글
  - 사용자 사진 섹션 `사진 올리기` -> `/upload?source=spot&spotId=:id`

### Upload
- 진입:
  - 커뮤니티 피드 `새 게시글 작성` -> `/upload`
  - 스팟 상세 `사진 올리기` -> `/upload?source=spot&spotId=:id`
- 스팟 연동 업로드(`source=spot`):
  - 촬영 장소 자동 입력(읽기 전용)
  - 보조 문구: `선택한 스팟 기준으로 자동 입력됨`
  - `spotId`가 유효하지 않으면 업로드 차단 + 이전 화면/스팟 리스트 유도
- 입력/검증:
  - 사진(최대 10장, 2장 이상일 때 슬라이드 미리보기)
  - 방문 일자(`type=date`) 기본값: 당일
  - 장소(일반 진입 시 선택 필수)
  - 내용(필수)
  - 태그: 취향 태그 선택 + 추천 태그 + 직접 입력(중복/공백 검증)
- 저장:
  - payload를 `localStorage(spot_upload_drafts)`에 저장 후 `/community` 이동

### Community
- 진입: `/community`
- 탭 흐름:
  - `feed`: 게시글 피드
  - `question`: 질문 목록
  - `meetups`: `/meetups`로 이동
- 공통 상단:
  - 공유 헤드라인 문구
  - 커뮤니티 공지 카드 + `공지 전체보기(/community/notices)`
- Feed(`?tab=feed`):
  - 게시글 카드(작성자/장소/방문일자/본문)
  - 이미지 영역: 정사각형 프레임(`aspect-square`),
    - 1장: 동일 프레임 단일 슬라이드
    - 2장 이상: 좌우 버튼/인디케이터/스와이프
  - 우측 패널(PC): `인기 태그` 카드, `인기 장소` 카드 (분리 구성)
  - 게시글 클릭 -> `/post/:id`
- Question(`?tab=question`):
  - `새 질문 작성` -> `/community/questions/new`
  - 질문 카드 클릭 -> `/community/questions/:id`
  - 질문 상세에서 댓글/답글 작성 가능
- 질문 상세(`/community/questions/:id`):
  - 댓글 입력 + 등록
  - 각 댓글 우측 시간 옆 `답글 달기`
  - 답글 입력/등록 후 댓글 하단에 표시

### Meetups
- 모임 목록 중심 페이지: `/meetups`
- 주요 동작:
  1. `새 모임 만들기` -> `/meetups/new`
  2. 탭(`전체 모임/참여 중`) + 필터(빠른 날짜/직접 날짜/요일/시간/상태/태그)
  3. 카드 클릭 -> `/meetup/:id`
- 상세/수정/관리:
  - 상세: `/meetup/:id`
  - 수정: `/meetup/:id/edit`
  - 관리: `/meetup/:id/manage`

### Profile / Profile 상세
- 내 프로필: `/profile`
  - 상단 액션: `프로필 수정(/profile/edit)`, `친구 목록(/friends)`, `채팅(/chat)`
  - 통계 탭(`방문/북마크/사진`) 클릭 시 하단 활동 카드 토글
  - 방문/북마크는 `리스트형/카드형` 전환 지원
  - 사진은 그리드로 게시글 이동(`/post/:id`)
- 타인 프로필: `/profile/:id`
  - 친구 상태 액션: `친구 추가`/`요청 보냄`/`친구 취소`
  - `메시지` -> `/chat/:id` (1:1)
  - 통계 탭(`방문/북마크/사진`) 토글 + 리스트/카드형 전환
  - 공개 범위에 따라 `비공개 상태입니다` 표시
  - 없는 사용자 id 접근 시 예외 화면 + `/friends` 유도

### Friends
- 진입: `/friends`
- 탭: `친구`, `친구 요청` (검색/추천 탭 제거됨)
- 친구 카드: `메시지(/chat/:id)`, `프로필 보기(/profile/:id)`
- 우측 패널(PC): 친구 추천 카드
  - 추천 근거 배지 + `친구 N명과 함께 아는 사람` 문구
  - `프로필` 버튼으로 `/profile/:id` 이동

### Settings
- 진입: `/settings`
- 섹션:
  - 계정: 비밀번호 변경, 개인정보 보호, 로그아웃
  - 알림 설정(스위치)
  - 표시 설정(다크모드, 언어)
  - 고객 지원(도움말, 문의하기, 약관 및 정책)
- 하위 페이지 라우트:
  - `/settings/password`
  - `/settings/privacy`
  - `/settings/help`
  - `/settings/contact`
  - `/settings/policies`

### Help
- 도움말 목록: `/settings/help`
- 상세 페이지:
  - `/settings/help/getting-started` (앱 사용 시작하기)
  - `/settings/help/spots` (스팟 검색/저장)
  - `/settings/help/meetups` (모임 참여/생성)
  - `/settings/help/community` (커뮤니티 이용)

## 4. 예외 / 분기 흐름
- Upload 스팟 연동 예외: `source=spot`인데 `spotId` 유효하지 않으면 업로드 차단 화면 표시
- Profile 상세 예외: 존재하지 않는 `:id`는 `사용자를 찾을 수 없어요` 화면
- Community/Questions:
  - 조건 필터 결과 없음 -> 빈 상태 카드
  - 댓글/답글은 입력값 비어있으면 등록되지 않음
- Meetups:
  - 필터 결과 없음 -> 빈 상태 + `새 모임 만들기` 유도

## 5. 현재 구현 기준에서 제거되었거나 통합된 경로
- 제거된 라우트/페이지:
  - `/visited`
  - `/bookmarks`
  - `/my-photos`
  - `/my-meetups`
- 통합된 흐름:
  - 커뮤니티의 `모임` 탭은 `/community` 내부 리스트가 아니라 `/meetups`로 이동
  - 프로필의 방문/북마크/사진 확인은 별도 페이지 이동이 아닌 프로필 내부 토글 카드로 통합

## 6. 현재 구현 기준에서 확인된 제약 또는 후속 보완 포인트
- 다수 기능이 목업 데이터/로컬 상태 기반
  - 질문/답글, 업로드 draft, 생성 모임 일부가 `localStorage` 사용
- 친구 요청/취소, 북마크/방문 토글은 서버 연동 없이 프론트 상태 중심
- 채팅(`/chat/:id`)은 실제 메시지 영속화/실시간 동기화 미연동
- 설정 하위 페이지는 폼/콘텐츠 중심의 화면 제공 단계(백엔드 연동 전)
- 권한/인증 가드(로그인 세션 기반 접근 제어)는 문서화 가능한 수준의 강제 로직이 아직 제한적

## 7. localStorage 사용 키 스펙 (현재 구현)
- `spot_upload_drafts`
  - 용도: 업로드 제출 payload 임시 저장
  - 저장 시점: `/upload` 제출 성공 시
  - 형태: 배열, 최신 항목을 앞에 추가
- `community_questions`
  - 용도: 질문 작성 페이지에서 생성한 질문 목록 저장
  - 조회 시점: 커뮤니티 질문 탭/질문 상세
- `community_question_comments_{questionId}`
  - 용도: 질문 상세의 댓글/답글 저장
  - 저장 시점: 댓글 등록, 답글 등록
- `created_meetups`
  - 용도: 생성된 모임 목록 저장
  - 조회 시점: `/meetups`
- `edited_meetups`
  - 용도: 수정된 모임 데이터 저장
  - 조회 시점: `/meetup/:id/manage`, `/meetup/:id/edit`

## 8. 기능 상태 구분 (목업/연동)
- 서버 연동 없이 프론트 상태/목업 중심
  - 친구 상태 액션(추가/취소/요청 보냄)
  - 댓글/답글 추가
  - 업로드 제출 결과 반영
  - 모임 생성/수정 결과 반영
  - 채팅 메시지 목록
- 화면/라우팅 중심으로 구현 완료
  - 설정 하위 페이지 라우트
  - 도움말 상세 페이지 라우트
  - 프로필 활동 토글 및 보기 전환
  - 커뮤니티/모임 탭 이동 구조

## 9. 접근 제어/권한 정책 (현재 코드 기준)
- 공통: 라우트 레벨 인증 가드 없음
- 질문/게시글/모임 작성: UI상 진입 가능(로그인 상태 검증 로직 없음)
- 질문 댓글/답글: 작성자 제한 없이 입력 가능
- 프로필 상세(`/profile/:id`):
  - 존재하지 않는 id는 예외 화면 처리
  - 친구 액션은 상태값 기준 UI 제어(서버 권한 검증 없음)

## 10. 에러/빈 상태 UI 카탈로그
- Upload
  - `source=spot` + 유효하지 않은 `spotId`: 업로드 차단 화면 + 이전/스팟리스트 이동 버튼
  - 필수값 누락: 항목별 에러 메시지 표시
- Profile 상세
  - 존재하지 않는 사용자 id: `사용자를 찾을 수 없어요` + 친구 목록 이동
  - 공개 제한 항목: `비공개 상태입니다` 메시지
- Community 질문
  - 조건 필터 결과 없음: 빈 상태 카드
  - 댓글 0개: `아직 댓글이 없습니다`
- Meetups
  - 필터 결과 없음: 빈 상태 카드 + 새 모임 만들기 유도
- Friends
  - 친구 요청 0건: 친구 요청 빈 상태 화면

## 11. API 연동 전 체크리스트
- 공통
  - [ ] 인증 상태(로그인/만료/로그아웃) 기준 라우트 가드 정의
  - [ ] API 에러 공통 처리 규칙(토스트, 재시도, 폴백 UI) 확정
  - [ ] 로딩/에러/빈 상태 컴포넌트 공통화
  - [ ] 날짜/시간 포맷 표준화(서버 UTC ↔ 클라이언트 표시)

- Profile / Friends
  - [ ] 친구 상태 조회 API 연결(`friend/requested/none`)
  - [ ] 친구 요청/취소/수락/거절 API 연결
  - [ ] `/profile/:id` 공개 범위(방문/북마크/사진) 서버 필드 연동
  - [ ] 프로필 통계 수치(방문/북마크/사진) 서버 데이터로 대체

- Upload / Post
  - [ ] 업로드 이미지 실제 파일 업로드 API 연결(S3 등)
  - [ ] 업로드 payload(`spotId`, `visitedDate`, `tags`, `content`) 서버 스키마 매핑
  - [ ] 스팟 연동 업로드 예외(`spotId` 없음/권한 없음) 서버 응답 처리
  - [ ] 게시글 상세 이미지/좋아요/댓글 수 서버 동기화

- Community (질문/공지)
  - [ ] 질문 목록/상세 API 연결 및 페이지네이션 도입
  - [ ] 댓글/답글 작성 API 연결(낙관적 업데이트 여부 결정)
  - [ ] 질문 검색/태그 필터 서버 쿼리 설계
  - [ ] 공지 목록/상세 API 연결

- Meetups
  - [ ] 모임 목록 필터(날짜/요일/시간/태그/모집상태) 서버 쿼리화
  - [ ] 모임 생성/수정/관리 API 연결
  - [ ] 참여/취소/요청 승인 API 연결
  - [ ] 모집 상태(open/closed) 계산 기준 서버 단일화

- Settings / Help
  - [ ] 비밀번호 변경 API 연결 및 실패 사유 처리
  - [ ] 개인정보 보호 설정 저장/조회 API 연결
  - [ ] 문의 등록 API 연결(첨부/분류 포함 여부 확정)
  - [ ] 약관/정책 콘텐츠 CMS 또는 버전 관리 방식 확정

- 상태관리/데이터 계층
  - [ ] React Query key 설계(화면별 캐시 정책)
  - [ ] Zustand store 범위 정의(UI 상태 vs 서버 상태 분리)
  - [ ] localStorage 임시 키 단계적 제거 계획 수립

- 품질/운영
  - [ ] 주요 플로우 E2E 시나리오 작성(Login→Spot→Upload→Community)
  - [ ] 접근성 점검(키보드 포커스, aria-label, 대비)
  - [ ] 분석 이벤트 설계(작성/댓글/모임참여/친구액션)
  - [ ] 운영 로그/모니터링(Sentry 등) 연동
