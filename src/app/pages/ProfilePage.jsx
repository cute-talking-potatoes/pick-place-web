import { Link, useParams } from "react-router";
import { useState } from "react";
import { BottomNav } from "../components/BottomNav";
import { TopNav } from "../components/TopNav";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { mockUser, mockSpots, mockPosts } from "../data/mockData";
import {
  Camera,
  Grid3x3,
  Heart,
  List,
  MessageCircle
} from "lucide-react";
import { PP_COLORS } from "../utils/ppStyles";
const mockFriendProfiles = {
  "2": {
    id: "2",
    name: "이사진",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    bio: "여행과 사진을 사랑하는 프리랜서 📷",
    preferences: ["감성적인", "야경", "카페"],
    visitedCount: 28,
    bookmarkCount: 14,
    postsCount: 42,
    mutualFriends: 5,
    visibility: { visited: true, bookmarks: false, photos: true },
    visitedSpotIds: ["1", "3", "5"],
    bookmarkedSpotIds: ["1", "2"]
  },
  "3": {
    id: "3",
    name: "박여행",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&h=400&fit=crop",
    bio: "힙한 곳을 찾아다니는 여행러 ✈️",
    preferences: ["도시", "핫플", "야경"],
    visitedCount: 22,
    bookmarkCount: 9,
    postsCount: 35,
    mutualFriends: 3,
    visibility: { visited: true, bookmarks: true, photos: false },
    visitedSpotIds: ["2", "5"],
    bookmarkedSpotIds: ["2", "4", "5"]
  },
  "4": {
    id: "4",
    name: "최렌즈",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    bio: "일상을 예술로 만드는 사진가 🎨",
    preferences: ["인물", "감성적인", "조용한 곳"],
    visitedCount: 45,
    bookmarkCount: 20,
    postsCount: 67,
    mutualFriends: 2,
    visibility: { visited: false, bookmarks: false, photos: true },
    visitedSpotIds: ["1", "4"],
    bookmarkedSpotIds: ["3"]
  },
  "5": {
    id: "5",
    name: "정셔터",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    bio: "순간을 포착하는 것을 좋아해요 📸",
    preferences: ["자연", "필름무드", "노을"],
    visitedCount: 18,
    bookmarkCount: 8,
    postsCount: 28,
    mutualFriends: 1,
    visibility: { visited: true, bookmarks: true, photos: true },
    visitedSpotIds: ["1", "2", "4"],
    bookmarkedSpotIds: ["1", "5"]
  },
  "8": {
    id: "8",
    name: "서뷰파인더",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop",
    bio: "자연 풍경 사진을 주로 찍어요 🌿",
    preferences: ["자연", "산책", "조용한 곳"],
    visitedCount: 31,
    bookmarkCount: 16,
    postsCount: 52,
    mutualFriends: 6,
    visibility: { visited: false, bookmarks: false, photos: false },
    visitedSpotIds: [],
    bookmarkedSpotIds: []
  },
  "9": {
    id: "9",
    name: "한찰칵",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop",
    bio: "카페 투어 좋아하시는 분! ☕",
    preferences: ["카페", "감성적인", "브런치"],
    visitedCount: 19,
    bookmarkCount: 12,
    postsCount: 26,
    mutualFriends: 3,
    visibility: { visited: true, bookmarks: false, photos: false },
    visitedSpotIds: ["5"],
    bookmarkedSpotIds: ["5"]
  },
  "10": {
    id: "10",
    name: "조인화",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop",
    bio: "인물 사진 촬영 좋아해요 👤",
    preferences: ["인물", "실내", "감성적인"],
    visitedCount: 24,
    bookmarkCount: 11,
    postsCount: 33,
    mutualFriends: 5,
    visibility: { visited: true, bookmarks: true, photos: true },
    visitedSpotIds: ["2", "3", "4"],
    bookmarkedSpotIds: ["2", "3"]
  }
};
const defaultFriendRelationship = {
  "2": "friend",
  "3": "friend",
  "4": "friend",
  "5": "friend",
  "8": "none",
  "9": "none",
  "10": "none"
};
function ProfilePage() {
  const { id } = useParams();
  const isOwnProfile = !id;
  const friendProfile = id ? mockFriendProfiles[id] : null;
  const friendPosts = id ? mockPosts.filter((post) => post.userId === id) : [];
  const [activeFriendSection, setActiveFriendSection] = useState("photos");
  const [activeOwnSection, setActiveOwnSection] = useState("photos");
  const [friendSpotViewMode, setFriendSpotViewMode] = useState("list");
  const [ownSpotViewMode, setOwnSpotViewMode] = useState("list");
  const [friendRelationship, setFriendRelationship] = useState(defaultFriendRelationship);
  const relationship = id ? friendRelationship[id] || "none" : "none";
  const friendVisitedSpots = id && friendProfile ? mockSpots.filter((spot) => (friendProfile.visitedSpotIds || []).includes(spot.id)) : [];
  const friendBookmarkedSpots = id && friendProfile ? mockSpots.filter((spot) => (friendProfile.bookmarkedSpotIds || []).includes(spot.id)) : [];
  const handleFriendRequest = () => {
    if (!id || relationship !== "none") return;
    setFriendRelationship((prev) => ({ ...prev, [id]: "requested" }));
    alert("친구 요청을 보냈습니다. 상대방에게 알림이 전송됩니다.");
  };
  const handleFriendCancel = () => {
    if (!id || relationship !== "friend") return;
    setFriendRelationship((prev) => ({ ...prev, [id]: "none" }));
    alert("친구 상태를 취소했습니다.");
  };
  if (id && !friendProfile) {
    return <div className="min-h-screen bg-gray-50 pb-20 lg:pb-4">
        <TopNav title="👤 프로필" showBack />
        <div className="pt-14">
          <div className="max-w-7xl mx-auto px-4 py-10">
            <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
              <h2 className="text-xl font-bold text-gray-900 mb-2">사용자를 찾을 수 없어요</h2>
              <p className="text-sm text-gray-600 mb-5">친구 목록에서 다시 선택해 주세요.</p>
              <Link to="/friends">
                <Button style={{ backgroundColor: PP_COLORS.sage, color: "white" }}>친구 목록으로</Button>
              </Link>
            </div>
          </div>
        </div>
        <BottomNav />
      </div>;
  }
  if (!isOwnProfile && friendProfile) {
    return <div className="min-h-screen bg-gray-50 pb-20 lg:pb-4">
        <TopNav title="👤 프로필" showBack />
        <div className="pt-14">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="bg-white rounded-2xl shadow-sm p-6 mb-4">
              <div className="flex items-start gap-4 mb-6">
                <Avatar className="w-20 h-20 ring-4 ring-[#D8E983]/30">
                  <AvatarImage src={friendProfile.avatar} />
                  <AvatarFallback>{friendProfile.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-900 mb-1">{friendProfile.name}</h2>
                  <p className="text-gray-600 mb-3">{friendProfile.bio}</p>
                  <p className="text-xs text-gray-500">친구 {friendProfile.mutualFriends}명과 함께 아는 사람</p>
                  <div className="grid grid-cols-2 gap-2 mt-3 w-full max-w-sm">
                    {relationship === "friend" ? <Button
        size="sm"
        onClick={handleFriendCancel}
        style={{ backgroundColor: "#FEE2E2", color: "#B91C1C" }}
      >
                        친구 취소
                      </Button> : relationship === "requested" ? <Button
        size="sm"
        disabled
        style={{ backgroundColor: "#E5E7EB", color: "#6B7280" }}
      >
                        요청 보냄
                      </Button> : <Button
        size="sm"
        onClick={handleFriendRequest}
        style={{ backgroundColor: PP_COLORS.sage, color: "white" }}
      >
                        친구 추가
                      </Button>}
                    <Link to={`/chat/${id}`} className="w-full">
                      <Button
        size="sm"
        className="w-full"
        style={{ backgroundColor: `${PP_COLORS.lime}40`, color: PP_COLORS.olive }}
      >
                        메시지
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setActiveFriendSection((prev) => prev === "visited" ? null : "visited")}
                  className={`text-center rounded-lg p-3 transition-colors ${activeFriendSection === "visited" ? "bg-[#EEF5E8] dark:bg-[#243226]" : "hover:bg-gray-50 dark:hover:bg-gray-800"}`}
                >
                  <div className="text-2xl font-bold text-gray-900 mb-1">{friendProfile.visitedCount}</div>
                  <div className="text-sm text-gray-600">📍 방문</div>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveFriendSection((prev) => prev === "bookmarks" ? null : "bookmarks")}
                  className={`text-center rounded-lg p-3 transition-colors ${activeFriendSection === "bookmarks" ? "bg-[#EEF5E8] dark:bg-[#243226]" : "hover:bg-gray-50 dark:hover:bg-gray-800"}`}
                >
                  <div className="text-2xl font-bold text-gray-900 mb-1">{friendProfile.bookmarkCount}</div>
                  <div className="text-sm text-gray-600">💚 북마크</div>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveFriendSection((prev) => prev === "photos" ? null : "photos")}
                  className={`text-center rounded-lg p-3 transition-colors ${activeFriendSection === "photos" ? "bg-[#EEF5E8] dark:bg-[#243226]" : "hover:bg-gray-50 dark:hover:bg-gray-800"}`}
                >
                  <div className="text-2xl font-bold text-gray-900 mb-1">{friendProfile.postsCount}</div>
                  <div className="text-sm text-gray-600">📸 사진</div>
                </button>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm p-6 mb-4">
              <h3 className="font-bold text-lg mb-4">💫 취향 태그</h3>
              <div className="flex flex-wrap gap-2">
                {friendProfile.preferences.map((pref) => <Badge
      key={pref}
      variant="secondary"
      className="text-sm"
      style={{
        backgroundColor: `${PP_COLORS.lime}40`,
        color: PP_COLORS.olive
      }}
    >
                    {pref}
                  </Badge>)}
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm p-6 mb-4">
              <div className="flex items-center justify-between mb-4 gap-3">
                <h3 className="font-bold text-lg">
                  {activeFriendSection === "visited" && "📍 방문한 스팟"}
                  {activeFriendSection === "bookmarks" && "💚 북마크"}
                  {activeFriendSection === "photos" && `📸 ${friendProfile.name}님의 사진`}
                  {!activeFriendSection && "활동 보기"}
                </h3>
                {(activeFriendSection === "visited" || activeFriendSection === "bookmarks") && <div className="flex items-center gap-1">
                    <Button
      size="icon"
      variant={friendSpotViewMode === "list" ? "default" : "outline"}
      onClick={() => setFriendSpotViewMode("list")}
      aria-label="리스트형 보기"
      className="h-8 w-8"
    >
                      <List className="w-4 h-4" />
                    </Button>
                    <Button
      size="icon"
      variant={friendSpotViewMode === "card" ? "default" : "outline"}
      onClick={() => setFriendSpotViewMode("card")}
      aria-label="카드형 보기"
      className="h-8 w-8"
    >
                      <Grid3x3 className="w-4 h-4" />
                    </Button>
                  </div>}
              </div>
              {!activeFriendSection ? <div className="text-center py-8 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-600">위의 방문/북마크/사진을 선택해 주세요.</p>
                </div> : !friendProfile.visibility?.[activeFriendSection] ? <div className="text-center py-8 bg-gray-50 rounded-xl">
                  <p className="text-sm font-medium text-gray-700 mb-1">비공개 상태입니다</p>
                  <p className="text-xs text-gray-500">사용자가 공개 범위를 제한했어요.</p>
                </div> : activeFriendSection === "visited" ? friendVisitedSpots.length === 0 ? <div className="text-center py-8 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-600">공개된 방문 스팟이 없습니다.</p>
                </div> : friendSpotViewMode === "list" ? <div className="space-y-2">
                  {friendVisitedSpots.map((spot) => <Link key={spot.id} to={`/spot/${spot.id}`}>
                      <div className="rounded-xl border border-gray-100 p-3 hover:bg-gray-50 transition-colors">
                        <p className="font-medium text-gray-900">{spot.name}</p>
                        <p className="text-xs text-gray-500 mt-1">{spot.location.address}</p>
                      </div>
                    </Link>)}
                </div> : <div className="grid grid-cols-3 gap-3">
                  {friendVisitedSpots.map((spot) => <Link key={spot.id} to={`/spot/${spot.id}`}>
                      <div className="rounded-xl border border-gray-100 overflow-hidden hover:shadow-sm transition-shadow">
                        <div className="h-28 bg-gray-100">
                          <img src={spot.images[0]} alt={spot.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="p-3">
                          <p className="font-medium text-gray-900 line-clamp-1">{spot.name}</p>
                          <p className="text-xs text-gray-500 mt-1 line-clamp-1">{spot.location.address}</p>
                        </div>
                      </div>
                    </Link>)}
                </div> : activeFriendSection === "bookmarks" ? friendBookmarkedSpots.length === 0 ? <div className="text-center py-8 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-600">공개된 북마크가 없습니다.</p>
                </div> : friendSpotViewMode === "list" ? <div className="space-y-2">
                  {friendBookmarkedSpots.map((spot) => <Link key={spot.id} to={`/spot/${spot.id}`}>
                      <div className="rounded-xl border border-gray-100 p-3 hover:bg-gray-50 transition-colors">
                        <p className="font-medium text-gray-900">{spot.name}</p>
                        <p className="text-xs text-gray-500 mt-1">{spot.location.address}</p>
                      </div>
                    </Link>)}
                </div> : <div className="grid grid-cols-3 gap-3">
                  {friendBookmarkedSpots.map((spot) => <Link key={spot.id} to={`/spot/${spot.id}`}>
                      <div className="rounded-xl border border-gray-100 overflow-hidden hover:shadow-sm transition-shadow">
                        <div className="h-28 bg-gray-100">
                          <img src={spot.images[0]} alt={spot.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="p-3">
                          <p className="font-medium text-gray-900 line-clamp-1">{spot.name}</p>
                          <p className="text-xs text-gray-500 mt-1 line-clamp-1">{spot.location.address}</p>
                        </div>
                      </div>
                    </Link>)}
                </div> : friendPosts.length === 0 ? <div className="text-center py-8 bg-gray-50 rounded-xl">
                  <Camera className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">아직 공개된 사진이 없습니다.</p>
                </div> : <div className="grid grid-cols-3 gap-1">
                  {friendPosts.map((post) => <Link key={post.id} to={`/post/${post.id}`}>
                      <div className="aspect-square relative group cursor-pointer overflow-hidden rounded-md">
                        <img
      src={post.images[0]}
      alt={`${post.userName}의 게시글 사진`}
      className="w-full h-full object-cover transition-transform group-hover:scale-105"
    />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 text-white">
                          <div className="flex items-center gap-1 text-xs">
                            <Heart className="w-4 h-4" fill="white" />
                            <span className="font-medium">{post.likes}</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs">
                            <MessageCircle className="w-4 h-4" fill="white" />
                            <span className="font-medium">{post.comments}</span>
                          </div>
                        </div>
                      </div>
                    </Link>)}
                </div>}
            </div>
          </div>
        </div>
        <BottomNav />
      </div>;
  }
  const visitedCount = mockSpots.filter((s) => s.isVisited).length;
  const bookmarkCount = mockSpots.filter((s) => s.isBookmarked).length;
  const myPosts = mockPosts.filter((post) => post.userId === mockUser.id);
  const myVisitedSpots = mockSpots.filter((spot) => spot.isVisited);
  const myBookmarkedSpots = mockSpots.filter((spot) => spot.isBookmarked);
  return <div className="min-h-screen bg-gray-50 pb-20 lg:pb-4">
      <TopNav title="✨ 내 정보" showSettings />

      <div className="pt-14">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {
    /* Profile Header */
  }
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-4">
            <div className="flex items-start gap-4 mb-6">
              <Avatar className="w-20 h-20 ring-4 ring-[#D8E983]/30">
                <AvatarImage src={mockUser.avatar} />
                <AvatarFallback>{mockUser.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900 mb-1">
                  {mockUser.name} 👋
                </h2>
                <p className="text-gray-600 mb-3">{mockUser.bio}</p>
                <Link to="/profile/edit">
                  <Button size="sm" variant="outline">
                    ✏️ 프로필 수정
                  </Button>
                </Link>
                <div className="grid grid-cols-2 gap-2 mt-3 w-full max-w-sm">
                  <Link to="/friends" className="w-full">
                    <Button
      size="sm"
      className="w-full"
      style={{ backgroundColor: PP_COLORS.sage, color: "white" }}
    >
                      친구 목록
                    </Button>
                  </Link>
                  <Link to="/chat" className="w-full">
                    <Button
      size="sm"
      className="w-full"
      style={{ backgroundColor: `${PP_COLORS.lime}40`, color: PP_COLORS.olive }}
    >
                      채팅
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {
    /* Stats */
  }
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setActiveOwnSection((prev) => prev === "visited" ? null : "visited")}
                className={`text-center rounded-lg p-3 transition-colors ${activeOwnSection === "visited" ? "bg-[#EEF5E8] dark:bg-[#243226]" : "hover:bg-gray-50 dark:hover:bg-gray-800"}`}
              >
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {visitedCount}
                  </div>
                  <div className="text-sm text-gray-600">📍 방문</div>
              </button>
              <button
                type="button"
                onClick={() => setActiveOwnSection((prev) => prev === "bookmarks" ? null : "bookmarks")}
                className={`text-center rounded-lg p-3 transition-colors ${activeOwnSection === "bookmarks" ? "bg-[#EEF5E8] dark:bg-[#243226]" : "hover:bg-gray-50 dark:hover:bg-gray-800"}`}
              >
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {bookmarkCount}
                  </div>
                  <div className="text-sm text-gray-600">💚 북마크</div>
              </button>
              <button
                type="button"
                onClick={() => setActiveOwnSection((prev) => prev === "photos" ? null : "photos")}
                className={`text-center rounded-lg p-3 transition-colors ${activeOwnSection === "photos" ? "bg-[#EEF5E8] dark:bg-[#243226]" : "hover:bg-gray-50 dark:hover:bg-gray-800"}`}
              >
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {myPosts.length}
                </div>
                <div className="text-sm text-gray-600">📸 사진</div>
              </button>
            </div>
          </div>

          {
    /* Preferences */
  }
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-4">
            <h3 className="font-bold text-lg mb-4">💫 내 취향</h3>
            <div className="flex flex-wrap gap-2">
              {mockUser.preferences.map((pref) => <Badge
    key={pref}
    variant="secondary"
    className="text-sm"
    style={{
      backgroundColor: `${PP_COLORS.lime}40`,
      color: PP_COLORS.olive
    }}
  >
                  {pref}
                </Badge>)}
              <Link to="/onboarding?from=profile">
                <Button size="sm" variant="ghost" style={{ color: PP_COLORS.sage }}>
                  수정하기
                </Button>
              </Link>
            </div>
          </div>

          {
    /* My Photos */
  }
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-4">
            <div className="flex items-center justify-between mb-4 gap-3">
              <h3 className="font-bold text-lg">
                {activeOwnSection === "visited" && "📍 방문한 스팟"}
                {activeOwnSection === "bookmarks" && "💚 북마크"}
                {activeOwnSection === "photos" && "📸 내 사진"}
                {!activeOwnSection && "활동 보기"}
              </h3>
              {(activeOwnSection === "visited" || activeOwnSection === "bookmarks") && <div className="flex items-center gap-1">
                  <Button
    size="icon"
    variant={ownSpotViewMode === "list" ? "default" : "outline"}
    onClick={() => setOwnSpotViewMode("list")}
    aria-label="리스트형 보기"
    className="h-8 w-8"
  >
                    <List className="w-4 h-4" />
                  </Button>
                  <Button
    size="icon"
    variant={ownSpotViewMode === "card" ? "default" : "outline"}
    onClick={() => setOwnSpotViewMode("card")}
    aria-label="카드형 보기"
    className="h-8 w-8"
  >
                    <Grid3x3 className="w-4 h-4" />
                  </Button>
                </div>}
            </div>
            {!activeOwnSection ? <div className="text-center py-8 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-600">위의 방문/북마크/사진을 선택해 주세요.</p>
              </div> : activeOwnSection === "visited" ? myVisitedSpots.length === 0 ? <div className="text-center py-8 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-600">방문한 스팟이 없습니다.</p>
              </div> : ownSpotViewMode === "list" ? <div className="space-y-2">
                {myVisitedSpots.map((spot) => <Link key={spot.id} to={`/spot/${spot.id}`}>
                    <div className="rounded-xl border border-gray-100 p-3 hover:bg-gray-50 transition-colors">
                      <p className="font-medium text-gray-900">{spot.name}</p>
                      <p className="text-xs text-gray-500 mt-1">{spot.location.address}</p>
                    </div>
                  </Link>)}
              </div> : <div className="grid grid-cols-3 gap-3">
                {myVisitedSpots.map((spot) => <Link key={spot.id} to={`/spot/${spot.id}`}>
                    <div className="rounded-xl border border-gray-100 overflow-hidden hover:shadow-sm transition-shadow">
                      <div className="h-28 bg-gray-100">
                        <img src={spot.images[0]} alt={spot.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-3">
                        <p className="font-medium text-gray-900 line-clamp-1">{spot.name}</p>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-1">{spot.location.address}</p>
                      </div>
                    </div>
                  </Link>)}
              </div> : activeOwnSection === "bookmarks" ? myBookmarkedSpots.length === 0 ? <div className="text-center py-8 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-600">북마크한 스팟이 없습니다.</p>
              </div> : ownSpotViewMode === "list" ? <div className="space-y-2">
                {myBookmarkedSpots.map((spot) => <Link key={spot.id} to={`/spot/${spot.id}`}>
                    <div className="rounded-xl border border-gray-100 p-3 hover:bg-gray-50 transition-colors">
                      <p className="font-medium text-gray-900">{spot.name}</p>
                      <p className="text-xs text-gray-500 mt-1">{spot.location.address}</p>
                    </div>
                  </Link>)}
              </div> : <div className="grid grid-cols-3 gap-3">
                {myBookmarkedSpots.map((spot) => <Link key={spot.id} to={`/spot/${spot.id}`}>
                    <div className="rounded-xl border border-gray-100 overflow-hidden hover:shadow-sm transition-shadow">
                      <div className="h-28 bg-gray-100">
                        <img src={spot.images[0]} alt={spot.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-3">
                        <p className="font-medium text-gray-900 line-clamp-1">{spot.name}</p>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-1">{spot.location.address}</p>
                      </div>
                    </div>
                  </Link>)}
              </div> : myPosts.length === 0 ? <div className="text-center py-8 bg-gray-50 rounded-xl">
                <Camera className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-600">아직 공개된 사진이 없습니다.</p>
              </div> : <div className="grid grid-cols-3 gap-1">
                {myPosts.map((post) => <Link key={post.id} to={`/post/${post.id}`}>
                    <div className="aspect-square relative group cursor-pointer overflow-hidden rounded-md">
                      <img
    src={post.images[0]}
    alt={`${post.userName}의 게시글 사진`}
    className="w-full h-full object-cover transition-transform group-hover:scale-105"
  />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 text-white">
                        <div className="flex items-center gap-1 text-xs">
                          <Heart className="w-4 h-4" fill="white" />
                          <span className="font-medium">{post.likes}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs">
                          <MessageCircle className="w-4 h-4" fill="white" />
                          <span className="font-medium">{post.comments}</span>
                        </div>
                      </div>
                    </div>
                  </Link>)}
              </div>}
          </div>

          {
    /* Version */
  }
          <p className="text-center text-sm text-gray-500">
            픽플 v1.0.0 💚
          </p>
        </div>
      </div>

      <BottomNav />
    </div>;
}
export {
  ProfilePage
};
