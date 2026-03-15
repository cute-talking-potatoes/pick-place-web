const mockNotices = [
  {
    id: "notice-1",
    title: "4월 커뮤니티 챌린지: 벚꽃 스팟 공유 이벤트",
    description: "벚꽃 태그와 함께 게시글을 올리면 추첨을 통해 소정의 선물을 드려요.",
    createdAt: "오늘",
    category: "이벤트"
  },
  {
    id: "notice-2",
    title: "커뮤니티 이용 가이드 업데이트",
    description: "질문 탭 운영 정책과 댓글 가이드가 업데이트되었습니다.",
    createdAt: "2일 전",
    category: "안내"
  },
  {
    id: "notice-3",
    title: "주말 서버 점검 안내",
    description: "토요일 02:00~04:00에 서비스 접속이 일시 중단될 수 있습니다.",
    createdAt: "3일 전",
    category: "점검"
  }
];

const mockQuestions = [
  {
    id: "q1",
    title: "야경 촬영할 때 ISO 설정은 보통 어떻게 잡으세요?",
    content: "삼각대는 있는데 노이즈를 줄이면서 선명하게 찍는 팁이 궁금해요.",
    tags: ["야경", "카메라설정"],
    userName: "민준",
    createdAt: "2시간 전",
    comments: 12
  },
  {
    id: "q2",
    title: "한강 노을 촬영 포인트 추천 부탁드려요",
    content: "사람이 너무 많지 않은 위치로 추천 부탁드립니다.",
    tags: ["노을", "한강"],
    userName: "서연",
    createdAt: "5시간 전",
    comments: 7
  },
  {
    id: "q3",
    title: "성수동 감성 사진 찍기 좋은 시간대가 언제일까요?",
    content: "주말 낮에 가려는데 빛이 예쁜 시간대가 궁금합니다.",
    tags: ["감성", "성수동"],
    userName: "지훈",
    createdAt: "어제",
    comments: 4
  }
];

const mockQuestionComments = {
  q1: [
    {
      id: "q1-c1",
      userName: "하늘",
      content: "ISO 400~800에서 시작하고 셔터속도는 1/60 이하로 내려보세요.",
      createdAt: "1시간 전"
    },
    {
      id: "q1-c2",
      userName: "포토러버",
      content: "노이즈가 신경 쓰이면 RAW로 찍고 후보정에서 노이즈 감소 추천해요.",
      createdAt: "45분 전"
    }
  ],
  q2: [
    {
      id: "q2-c1",
      userName: "아라",
      content: "여의도 쪽보다 망원한강공원이 상대적으로 덜 붐벼요.",
      createdAt: "3시간 전"
    }
  ],
  q3: [
    {
      id: "q3-c1",
      userName: "렌즈인생",
      content: "오후 4~6시 골든아워가 가장 예쁘게 나와요.",
      createdAt: "어제"
    }
  ]
};

export {
  mockNotices,
  mockQuestionComments,
  mockQuestions
};
