const mockUser = {
  id: "1",
  name: "\uAE40\uD3EC\uD1A0",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop",
  bio: "\uC0AC\uC9C4 \uCC0D\uB294 \uAC83\uC744 \uC88B\uC544\uD558\uB294 \uC5EC\uD589\uB7EC \u{1F4F8}",
  preferences: ["\uC790\uC5F0", "\uB178\uC744", "\uAC10\uC131", "\uBC14\uB2E4", "\uAC74\uBB3C"]
};
const mockSpots = [
  {
    id: "1",
    name: "\uD55C\uAC15 \uB178\uC744 \uACF5\uC6D0",
    description: "\uC11C\uC6B8\uC758 \uC544\uB984\uB2E4\uC6B4 \uB178\uC744\uC744 \uBC30\uACBD\uC73C\uB85C \uC0AC\uC9C4\uC744 \uCC0D\uC744 \uC218 \uC788\uB294 \uBA85\uC18C\uC785\uB2C8\uB2E4. \uD2B9\uD788 \uC800\uB141 \uC2DC\uAC04\uB300\uC5D0 \uBC29\uBB38\uD558\uBA74 \uBA4B\uC9C4 \uC77C\uBAB0 \uC0AC\uC9C4\uC744 \uB0A8\uAE38 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",
    category: ["\uC790\uC5F0", "\uB178\uC744", "\uACF5\uC6D0"],
    location: {
      lat: 37.5665,
      lng: 126.978,
      address: "\uC11C\uC6B8\uC2DC \uB9C8\uD3EC\uAD6C \uC0C1\uC554\uB3D9",
      region: "\uC11C\uC6B8"
    },
    distance: 2.5,
    travelTime: "\uB3C4\uBCF4 30\uBD84 / \uB300\uC911\uAD50\uD1B5 15\uBD84",
    rating: 4.8,
    reviewCount: 324,
    images: [
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
    ],
    tags: ["\uB178\uC744", "\uD55C\uAC15", "\uAC10\uC131", "\uC778\uC0DD\uC0F7"],
    bestTime: ["\uC624\uD6C4 5-7\uC2DC", "\uC8FC\uB9D0"],
    tips: "\uD574\uC9C8\uB158 1\uC2DC\uAC04 \uC804\uC5D0 \uB3C4\uCC29\uD558\uBA74 \uC88B\uC740 \uC790\uB9AC\uB97C \uC120\uC810\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4. \uC0BC\uAC01\uB300\uB97C \uC900\uBE44\uD558\uC138\uC694!",
    isBookmarked: true,
    isVisited: true,
    mapX: 25,
    mapY: 40
  },
  {
    id: "2",
    name: "\uBD81\uCD0C \uD55C\uC625\uB9C8\uC744",
    description: "\uC804\uD1B5\uACFC \uD604\uB300\uAC00 \uACF5\uC874\uD558\uB294 \uC11C\uC6B8\uC758 \uB300\uD45C \uAD00\uAD11\uC9C0. \uD55C\uC625\uACFC \uACE8\uBAA9\uAE38\uC774 \uC544\uB984\uB2E4\uC6B4 \uC0AC\uC9C4 \uBC30\uACBD\uC744 \uC81C\uACF5\uD569\uB2C8\uB2E4.",
    category: ["\uC720\uC801\uC9C0", "\uAC74\uBB3C", "\uC804\uD1B5"],
    location: {
      lat: 37.5826,
      lng: 126.9834,
      address: "\uC11C\uC6B8\uC2DC \uC885\uB85C\uAD6C \uBD81\uCD0C\uB85C",
      region: "\uC11C\uC6B8"
    },
    distance: 5.2,
    travelTime: "\uB300\uC911\uAD50\uD1B5 25\uBD84 / \uCC28\uB7C9 20\uBD84",
    rating: 4.6,
    reviewCount: 892,
    images: [
      "https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=800&h=600&fit=crop"
    ],
    tags: ["\uD55C\uC625", "\uC804\uD1B5", "\uACE8\uBAA9", "\uC5ED\uC0AC"],
    bestTime: ["\uC624\uC804 9-11\uC2DC", "\uD3C9\uC77C"],
    tips: "\uC8FC\uB9D0\uC740 \uC0AC\uB78C\uC774 \uB9CE\uC73C\uB2C8 \uD3C9\uC77C \uC624\uC804\uC744 \uCD94\uCC9C\uD569\uB2C8\uB2E4. \uC8FC\uBBFC\uB4E4\uC758 \uC0AC\uC0DD\uD65C\uC744 \uC874\uC911\uD574\uC8FC\uC138\uC694.",
    isBookmarked: false,
    isVisited: false,
    mapX: 52,
    mapY: 30
  },
  {
    id: "3",
    name: "\uC81C\uC8FC \uC131\uC0B0\uC77C\uCD9C\uBD09",
    description: "\uC138\uACC4\uC790\uC5F0\uC720\uC0B0\uC73C\uB85C \uC9C0\uC815\uB41C \uC81C\uC8FC\uC758 \uC0C1\uC9D5. \uC77C\uCD9C \uC0AC\uC9C4\uC758 \uC131\uC9C0\uC774\uC790 \uC81C\uC8FC \uC5EC\uD589 \uD544\uC218 \uCF54\uC2A4\uC785\uB2C8\uB2E4.",
    category: ["\uC790\uC5F0", "\uBC14\uB2E4", "\uC0B0"],
    location: {
      lat: 33.4587,
      lng: 126.9434,
      address: "\uC81C\uC8FC\uD2B9\uBCC4\uC790\uCE58\uB3C4 \uC11C\uADC0\uD3EC\uC2DC \uC131\uC0B0\uC74D",
      region: "\uC81C\uC8FC"
    },
    distance: 453.2,
    travelTime: "\uD56D\uACF5 1\uC2DC\uAC04 + \uCC28\uB7C9 40\uBD84",
    rating: 4.9,
    reviewCount: 1567,
    images: [
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?w=800&h=600&fit=crop"
    ],
    tags: ["\uC77C\uCD9C", "\uC138\uACC4\uC720\uC0B0", "\uBC14\uB2E4", "\uC790\uC5F0"],
    bestTime: ["\uC0C8\uBCBD 5-6\uC2DC", "\uC5F0\uC911"],
    tips: "\uC77C\uCD9C \uC2DC\uAC04 1\uC2DC\uAC04 \uC804 \uB3C4\uCC29\uC744 \uAD8C\uC7A5\uD569\uB2C8\uB2E4. \uB4F1\uC0B0\uD654\uC640 \uBC29\uD55C\uBCF5\uC744 \uC900\uBE44\uD558\uC138\uC694.",
    isBookmarked: true,
    isVisited: false,
    mapX: 70,
    mapY: 65
  },
  {
    id: "4",
    name: "\uBD80\uC0B0 \uD574\uC6B4\uB300 \uBE14\uB8E8\uB77C\uC778",
    description: "\uBC14\uB2E4 \uC704\uB97C \uB2EC\uB9AC\uB294 \uCEA1\uC290 \uC5F4\uCC28. SNS\uC5D0\uC11C \uD56B\uD55C \uBD80\uC0B0\uC758 \uC0C8\uB85C\uC6B4 \uBA85\uC18C\uC785\uB2C8\uB2E4.",
    category: ["\uBC14\uB2E4", "\uAC74\uBB3C", "\uD604\uB300"],
    location: {
      lat: 35.1796,
      lng: 129.1756,
      address: "\uBD80\uC0B0\uAD11\uC5ED\uC2DC \uD574\uC6B4\uB300\uAD6C",
      region: "\uBD80\uC0B0"
    },
    distance: 325.8,
    travelTime: "KTX 2\uC2DC\uAC04 30\uBD84 + \uB300\uC911\uAD50\uD1B5 20\uBD84",
    rating: 4.7,
    reviewCount: 621,
    images: [
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop"
    ],
    tags: ["\uBC14\uB2E4", "\uC5F4\uCC28", "SNS\uD56B\uD50C", "\uAC10\uC131"],
    bestTime: ["\uC624\uD6C4 3-5\uC2DC", "\uC8FC\uC911"],
    tips: "\uC0AC\uC804 \uC608\uC57D \uD544\uC218! \uB9D1\uC740 \uB0A0 \uBC29\uBB38\uD558\uBA74 \uD478\uB978 \uBC14\uB2E4\uC640 \uD568\uAED8 \uBA4B\uC9C4 \uC0AC\uC9C4\uC744 \uB0A8\uAE38 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",
    isBookmarked: false,
    isVisited: true,
    mapX: 80,
    mapY: 75
  },
  {
    id: "5",
    name: "\uC131\uC218\uB3D9 \uCE74\uD398\uAC70\uB9AC",
    description: "\uD799\uD55C \uCE74\uD398\uC640 \uB3C5\uD2B9\uD55C \uAC74\uCD95\uBB3C\uC774 \uAC00\uB4DD\uD55C \uC11C\uC6B8\uC758 \uD56B\uD50C\uB808\uC774\uC2A4. \uC778\uB354\uC2A4\uD2B8\uB9AC\uC5BC\uD55C \uAC10\uC131 \uC0AC\uC9C4\uC744 \uC6D0\uD55C\uB2E4\uBA74 \uC774\uACF3!",
    category: ["\uCE74\uD398", "\uAC74\uBB3C", "\uD604\uB300"],
    location: {
      lat: 37.5447,
      lng: 127.0561,
      address: "\uC11C\uC6B8\uC2DC \uC131\uB3D9\uAD6C \uC131\uC218\uB3D9",
      region: "\uC11C\uC6B8"
    },
    distance: 8.3,
    travelTime: "\uB300\uC911\uAD50\uD1B5 35\uBD84 / \uCC28\uB7C9 25\uBD84",
    rating: 4.5,
    reviewCount: 445,
    images: [
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800&h=600&fit=crop"
    ],
    tags: ["\uCE74\uD398", "\uD799\uC2A4\uD130", "\uC778\uB354\uC2A4\uD2B8\uB9AC\uC5BC", "\uAC10\uC131"],
    bestTime: ["\uC624\uD6C4 2-4\uC2DC", "\uC8FC\uB9D0"],
    tips: "\uAC01 \uCE74\uD398\uB9C8\uB2E4 \uD2B9\uC0C9\uC774 \uC788\uC73C\uB2C8 \uC5EC\uB7EC \uACF3\uC744 \uB3CC\uC544\uBCF4\uC138\uC694. \uC6E8\uC774\uD305\uC774 \uC788\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",
    isBookmarked: true,
    isVisited: false,
    mapX: 45,
    mapY: 55
  }
];
const mockPosts = [
  {
    id: "1",
    userId: "1",
    userName: "\uAE40\uD3EC\uD1A0",
    userAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop",
    spotId: "1",
    spotName: "\uD55C\uAC15 \uB178\uC744 \uACF5\uC6D0",
    images: ["https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&h=600&fit=crop"],
    content: "\uD55C\uAC15 \uB178\uC744\uC774 \uC815\uB9D0 \uC608\uC220\uC774\uB124\uC694 \u{1F305} \uC624\uB298 \uB0A0\uC528\uAC00 \uB108\uBB34 \uC88B\uC544\uC11C \uC778\uC0DD\uC0F7 \uAC74\uC84C\uC2B5\uB2C8\uB2E4!",
    likes: 234,
    comments: 18,
    isLiked: true,
    createdAt: "2\uC2DC\uAC04 \uC804",
    tags: ["\uB178\uC744", "\uD55C\uAC15", "\uAC10\uC131", "\uC778\uC0DD\uC0F7"]
  },
  {
    id: "2",
    userId: "2",
    userName: "\uC774\uC0AC\uC9C4",
    userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    spotId: "3",
    spotName: "\uC81C\uC8FC \uC131\uC0B0\uC77C\uCD9C\uBD09",
    images: [
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?w=800&h=600&fit=crop"
    ],
    content: "\uC0C8\uBCBD 5\uC2DC\uC5D0 \uC77C\uC5B4\uB098\uC11C \uBCF8 \uC77C\uCD9C... \uB108\uBB34 \uAC10\uB3D9\uC801\uC774\uC5C8\uC5B4\uC694 \u{1F62D}",
    likes: 512,
    comments: 42,
    isLiked: false,
    createdAt: "1\uC77C \uC804",
    tags: ["\uC77C\uCD9C", "\uC81C\uC8FC", "\uC131\uC0B0\uC77C\uCD9C\uBD09", "\uC5EC\uD589"]
  }
];
const mockChatRooms = [
  {
    id: "1",
    name: "\uD55C\uAC15 \uB178\uC744 \uBAA8\uC784",
    avatar: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=400&h=400&fit=crop",
    lastMessage: "\uC774\uBC88 \uC8FC\uB9D0\uC5D0 \uAC19\uC774 \uAC00\uC2E4 \uBD84~",
    timestamp: "5\uBD84 \uC804",
    unreadCount: 2
  },
  {
    id: "2",
    name: "\uBC15\uC0AC\uC9C4",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&h=400&fit=crop",
    lastMessage: "\uC131\uC218\uB3D9 \uCE74\uD398 \uCD94\uCC9C \uC880 \uD574\uC8FC\uC138\uC694!",
    timestamp: "1\uC2DC\uAC04 \uC804",
    unreadCount: 0
  },
  {
    id: "3",
    name: "\uB0A8\uC0B0\uD0C0\uC6CC \uC57C\uACBD",
    avatar: "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?w=400&h=400&fit=crop",
    lastMessage: "\uC0AC\uC9C4 \uC798 \uCC0D\uD614\uC5B4\uC694!",
    timestamp: "1\uC2DC\uAC04 \uC804",
    unreadCount: 1
  }
];
const mockMessages = [
  {
    id: "1",
    senderId: "2",
    senderName: "\uC774\uC0AC\uC9C4",
    senderAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    content: "\uC774\uBC88 \uC8FC\uB9D0\uC5D0 \uAC19\uC774 \uAC00\uC2E4 \uBD84~",
    timestamp: "5\uBD84 \uC804",
    isRead: true
  },
  {
    id: "2",
    senderId: "1",
    senderName: "\uAE40\uD3EC\uD1A0",
    senderAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop",
    content: "\uC800 \uC88B\uC544\uC694! \uBA87 \uC2DC\uC5D0 \uB9CC\uB0A0\uAE4C\uC694?",
    timestamp: "3\uBD84 \uC804",
    isRead: true
  }
];
const categories = [
  { id: "nature", label: "\uC790\uC5F0", icon: "\u{1F332}" },
  { id: "heritage", label: "\uC720\uC801\uC9C0", icon: "\u{1F3DB}\uFE0F" },
  { id: "building", label: "\uAC74\uBB3C", icon: "\u{1F3E2}" },
  { id: "cafe", label: "\uCE74\uD398", icon: "\u2615" },
  { id: "sea", label: "\uBC14\uB2E4", icon: "\u{1F30A}" },
  { id: "mountain", label: "\uC0B0", icon: "\u26F0\uFE0F" },
  { id: "sunset", label: "\uB178\uC744", icon: "\u{1F305}" },
  { id: "night", label: "\uC57C\uACBD", icon: "\u{1F303}" }
];
const timePreferences = [
  { id: "day", label: "\uC8FC\uAC04", icon: "\u2600\uFE0F" },
  { id: "night", label: "\uC57C\uAC04", icon: "\u{1F319}" },
  { id: "sunset", label: "\uB178\uC744", icon: "\u{1F305}" },
  { id: "sunrise", label: "\uC0C8\uBCBD", icon: "\u{1F304}" }
];
const photoStyles = [
  { id: "emotional", label: "\uAC10\uC131" },
  { id: "realistic", label: "\uD604\uC2E4" },
  { id: "dreamy", label: "\uBABD\uD658" },
  { id: "film", label: "\uD544\uB984 \uB290\uB08C" },
  { id: "vivid", label: "\uC120\uBA85\uD55C" },
  { id: "vintage", label: "\uBE48\uD2F0\uC9C0" }
];
const mockComments = [
  {
    id: "1",
    postId: "1",
    userId: "2",
    userName: "\uC774\uC0AC\uC9C4",
    userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    content: "\uC6B0\uC640 \uC9C4\uC9DC \uC608\uC058\uB124\uC694! \uC800\uB3C4 \uAC00\uBCF4\uACE0 \uC2F6\uC5B4\uC694 \u2728",
    likes: 12,
    isLiked: false,
    createdAt: "1\uC2DC\uAC04 \uC804",
    replies: [
      {
        id: "1-1",
        commentId: "1",
        userId: "1",
        userName: "\uAE40\uD3EC\uD1A0",
        userAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop",
        content: "\uAC10\uC0AC\uD569\uB2C8\uB2E4! \uAC19\uC774 \uAC00\uC2E4\uB798\uC694?",
        likes: 3,
        isLiked: true,
        createdAt: "30\uBD84 \uC804"
      }
    ]
  },
  {
    id: "2",
    postId: "1",
    userId: "3",
    userName: "\uBC15\uC5EC\uD589",
    userAvatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&h=400&fit=crop",
    content: "\uB178\uC744 \uD0C0\uC774\uBC0D \uC644\uBCBD\uD558\uC2DC\uB124\uC694 \u{1F44D}",
    likes: 8,
    isLiked: true,
    createdAt: "45\uBD84 \uC804",
    replies: []
  }
];
const mockMeetups = [
  {
    id: "1",
    title: "\uD55C\uAC15 \uB178\uC744 \uCD2C\uC601 \uBAA8\uC784",
    description: "\uC774\uBC88 \uC8FC\uB9D0 \uD55C\uAC15 \uB178\uC744 \uACF5\uC6D0\uC5D0\uC11C \uD568\uAED8 \uCD2C\uC601\uD558\uC2E4 \uBD84 \uBAA8\uC9D1\uD569\uB2C8\uB2E4! \uCD08\uBCF4\uC790\uB3C4 \uD658\uC601\uD574\uC694 \u{1F60A}",
    spotId: "1",
    spotName: "\uD55C\uAC15 \uB178\uC744 \uACF5\uC6D0",
    hostId: "1",
    hostName: "\uAE40\uD3EC\uD1A0",
    hostAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop",
    date: "2026-02-28",
    time: "17:00",
    maxParticipants: 8,
    currentParticipants: 3,
    participants: [
      {
        id: "1",
        name: "\uAE40\uD3EC\uD1A0",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop"
      },
      {
        id: "2",
        name: "\uC774\uC0AC\uC9C4",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
      },
      {
        id: "3",
        name: "\uBC15\uC5EC\uD589",
        avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&h=400&fit=crop"
      }
    ],
    image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&h=600&fit=crop",
    tags: ["\uB178\uC744", "\uD55C\uAC15", "\uCD08\uBCF4\uD658\uC601"],
    isJoined: true,
    createdAt: "2\uC77C \uC804"
  },
  {
    id: "2",
    title: "\uC81C\uC8FC \uC77C\uCD9C \uD22C\uC5B4",
    description: "\uC131\uC0B0\uC77C\uCD9C\uBD09\uC5D0\uC11C \uC77C\uCD9C\uC744 \uD568\uAED8 \uBCFC \uBD84\uB4E4\uC744 \uCC3E\uC2B5\uB2C8\uB2E4. \uC0C8\uBCBD 4\uC2DC \uCD9C\uBC1C \uC608\uC815\uC774\uC5D0\uC694!",
    spotId: "3",
    spotName: "\uC81C\uC8FC \uC131\uC0B0\uC77C\uCD9C\uBD09",
    hostId: "2",
    hostName: "\uC774\uC0AC\uC9C4",
    hostAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    date: "2026-03-05",
    time: "04:00",
    maxParticipants: 6,
    currentParticipants: 4,
    participants: [
      {
        id: "2",
        name: "\uC774\uC0AC\uC9C4",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
      },
      {
        id: "3",
        name: "\uBC15\uC5EC\uD589",
        avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&h=400&fit=crop"
      },
      {
        id: "4",
        name: "\uCD5C\uB80C\uC988",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
      },
      {
        id: "5",
        name: "\uC815\uC154\uD130",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop"
      }
    ],
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
    tags: ["\uC77C\uCD9C", "\uC81C\uC8FC", "\uB4F1\uC0B0"],
    isJoined: false,
    createdAt: "1\uC77C \uC804"
  },
  {
    id: "3",
    title: "\uC131\uC218\uB3D9 \uCE74\uD398 \uD22C\uC5B4",
    description: "\uD799\uD55C \uC131\uC218\uB3D9 \uCE74\uD398\uB4E4\uC744 \uB3CC\uBA74\uC11C \uC0AC\uC9C4 \uCC0D\uC5B4\uC694! \uCE74\uD398 3\uACF3 \uC815\uB3C4 \uAC08 \uC608\uC815\uC785\uB2C8\uB2E4 \u2615",
    spotId: "5",
    spotName: "\uC131\uC218\uB3D9 \uCE74\uD398\uAC70\uB9AC",
    hostId: "3",
    hostName: "\uBC15\uC5EC\uD589",
    hostAvatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&h=400&fit=crop",
    date: "2026-03-01",
    time: "14:00",
    maxParticipants: 5,
    currentParticipants: 2,
    participants: [
      {
        id: "3",
        name: "\uBC15\uC5EC\uD589",
        avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&h=400&fit=crop"
      },
      {
        id: "5",
        name: "\uC815\uC154\uD130",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop"
      }
    ],
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=600&fit=crop",
    tags: ["\uCE74\uD398", "\uD799\uC2A4\uD130", "\uC778\uB354\uC2A4\uD2B8\uB9AC\uC5BC"],
    isJoined: false,
    createdAt: "3\uC2DC\uAC04 \uC804"
  }
];
export {
  categories,
  mockChatRooms,
  mockComments,
  mockMeetups,
  mockMessages,
  mockPosts,
  mockSpots,
  mockUser,
  photoStyles,
  timePreferences
};
