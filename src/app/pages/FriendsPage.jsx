import { Link, useSearchParams } from "react-router";
import { BottomNav } from "../components/BottomNav";
import { TopNav } from "../components/TopNav";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import { Input } from "../components/ui/input";
import { UserPlus, Search, Check, X, MoreVertical, Camera, MapPin } from "lucide-react";
import { PP_COLORS } from "../utils/ppStyles";
const mockFriends = [
  {
    id: "2",
    name: "\uC774\uC0AC\uC9C4",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    bio: "\uC5EC\uD589\uACFC \uC0AC\uC9C4\uC744 \uC0AC\uB791\uD558\uB294 \uD504\uB9AC\uB79C\uC11C \u{1F4F7}",
    mutualFriends: 5,
    postsCount: 42,
    spotsVisited: 28,
    isFriend: true
  },
  {
    id: "3",
    name: "\uBC15\uC5EC\uD589",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&h=400&fit=crop",
    bio: "\uD799\uD55C \uACF3\uC744 \uCC3E\uC544\uB2E4\uB2C8\uB294 \uC5EC\uD589\uB7EC \u2708\uFE0F",
    mutualFriends: 3,
    postsCount: 35,
    spotsVisited: 22,
    isFriend: true
  },
  {
    id: "4",
    name: "\uCD5C\uB80C\uC988",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    bio: "\uC77C\uC0C1\uC744 \uC608\uC220\uB85C \uB9CC\uB4DC\uB294 \uC0AC\uC9C4\uAC00 \u{1F3A8}",
    mutualFriends: 2,
    postsCount: 67,
    spotsVisited: 45,
    isFriend: true
  },
  {
    id: "5",
    name: "\uC815\uC154\uD130",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    bio: "\uC21C\uAC04\uC744 \uD3EC\uCC29\uD558\uB294 \uAC83\uC744 \uC88B\uC544\uD574\uC694 \u{1F4F8}",
    mutualFriends: 1,
    postsCount: 28,
    spotsVisited: 18,
    isFriend: true
  }
];
const mockFriendRequests = [
  {
    id: "6",
    name: "\uAC15\uD3EC\uD1A0",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    bio: "\uC0C8\uB85C\uC6B4 \uC7A5\uC18C\uB97C \uD0D0\uD5D8\uD558\uB294 \uAC83\uC744 \uC88B\uC544\uD569\uB2C8\uB2E4",
    mutualFriends: 2,
    timestamp: "2\uC2DC\uAC04 \uC804"
  },
  {
    id: "7",
    name: "\uC724\uC2A4\uB0C5",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
    bio: "\uAC10\uC131 \uC0AC\uC9C4 \uC88B\uC544\uD558\uC2DC\uB294 \uBD84 \uD658\uC601! \u{1F49A}",
    mutualFriends: 4,
    timestamp: "1\uC77C \uC804"
  }
];
const mockSuggestions = [
  {
    id: "8",
    name: "\uC11C\uBDF0\uD30C\uC778\uB354",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop",
    bio: "\uC790\uC5F0 \uD48D\uACBD \uC0AC\uC9C4\uC744 \uC8FC\uB85C \uCC0D\uC5B4\uC694 \u{1F33F}",
    mutualFriends: 6,
    reason: "\uAD00\uC2EC\uC0AC\uAC00 \uBE44\uC2B7\uD574\uC694"
  },
  {
    id: "9",
    name: "\uD55C\uCC30\uCE75",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop",
    bio: "\uCE74\uD398 \uD22C\uC5B4 \uC88B\uC544\uD558\uC2DC\uB294 \uBD84! \u2615",
    mutualFriends: 3,
    reason: "\uCDE8\uD5A5\uC774 \uBE44\uC2B7\uD574\uC694"
  },
  {
    id: "10",
    name: "\uC870\uC778\uD654",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop",
    bio: "\uC778\uBB3C \uC0AC\uC9C4 \uCD2C\uC601 \uC88B\uC544\uD574\uC694 \u{1F464}",
    mutualFriends: 5,
    reason: "\uAC19\uC740 \uBAA8\uC784\uC5D0 \uCC38\uC5EC\uD588\uC5B4\uC694"
  }
];
function FriendsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "friends";
  const handleTabChange = (value) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set("tab", value);
    setSearchParams(nextParams, { replace: true });
  };
  return <div className="min-h-screen bg-gray-50 pb-20 lg:pb-4">
      <TopNav title="👥 친구" showBack />

      <div className="pt-14">
        <div className="max-w-4xl mx-auto px-4 py-6">
          {
    /* Search */
  }
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
    placeholder="친구 검색..."
    className="pl-10"
  />
          </div>

          {
    /* Tabs */
  }
          <Tabs value={activeTab} onValueChange={handleTabChange}>
            <TabsList className="w-full grid grid-cols-3 bg-white mb-6 p-1 h-auto gap-1">
              <TabsTrigger value="friends" className="h-auto py-3 flex flex-col gap-1 data-[state=active]:shadow-sm">
                <span className="text-xl font-bold" style={{ color: PP_COLORS.sage }}>
                  {mockFriends.length}
                </span>
                <span className="text-xs text-gray-600">친구</span>
              </TabsTrigger>
              <TabsTrigger value="requests" className="h-auto py-3 flex flex-col gap-1 data-[state=active]:shadow-sm">
                <span className="text-xl font-bold" style={{ color: PP_COLORS.olive }}>
                  {mockFriendRequests.length}
                </span>
                <span className="text-xs text-gray-600">친구 요청</span>
              </TabsTrigger>
              <TabsTrigger value="suggestions" className="h-auto py-3 flex flex-col gap-1 data-[state=active]:shadow-sm">
                <span className="text-xl font-bold" style={{ color: PP_COLORS.lime }}>
                  {mockSuggestions.length}
                </span>
                <span className="text-xs text-gray-600">추천</span>
              </TabsTrigger>
            </TabsList>

            {
    /* Friends List */
  }
            <TabsContent value="friends">
              <div className="space-y-3">
                {mockFriends.map((friend) => <div key={friend.id} className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-3">
                      <Avatar className="w-14 h-14 ring-2 ring-[#D8E983]/30">
                        <AvatarImage src={friend.avatar} />
                        <AvatarFallback>{friend.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-bold text-gray-900">{friend.name}</h3>
                          <button className="text-gray-400 hover:text-gray-600">
                            <MoreVertical className="w-5 h-5" />
                          </button>
                        </div>
                        <p className="text-sm text-gray-600 mb-2 line-clamp-1">{friend.bio}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                          <div className="flex items-center gap-1">
                            <Camera className="w-3 h-3" />
                            <span>{friend.postsCount}개 게시물</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            <span>{friend.spotsVisited}곳 방문</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Link to={`/chat/${friend.id}`} className="flex-1">
                            <Button size="sm" variant="outline" className="w-full">
                              💬 메시지
                            </Button>
                          </Link>
                          <Link to={`/profile/${friend.id}`} className="flex-1">
                            <Button
    size="sm"
    className="w-full"
    style={{ backgroundColor: PP_COLORS.sage, color: "white" }}
  >
                              프로필 보기
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>)}
              </div>
            </TabsContent>

            {
    /* Friend Requests */
  }
            <TabsContent value="requests">
              {mockFriendRequests.length === 0 ? <div className="text-center py-12 bg-white rounded-2xl shadow-sm">
                  <UserPlus className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    친구 요청이 없습니다
                  </h3>
                  <p className="text-gray-600">
                    새로운 친구 요청이 오면 여기에 표시됩니다
                  </p>
                </div> : <div className="space-y-3">
                  {mockFriendRequests.map((request) => <div key={request.id} className="bg-white rounded-2xl p-4 shadow-sm">
                      <div className="flex items-start gap-3">
                        <Avatar className="w-14 h-14 ring-2 ring-[#D8E983]/30">
                          <AvatarImage src={request.avatar} />
                          <AvatarFallback>{request.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-bold text-gray-900">{request.name}</h3>
                            <span className="text-xs text-gray-500">{request.timestamp}</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{request.bio}</p>
                          <p className="text-xs text-gray-500 mb-3">
                            친구 {request.mutualFriends}명과 함께 아는 사람
                          </p>
                          <div className="flex gap-2">
                            <Button
    size="sm"
    className="flex-1"
    style={{ backgroundColor: PP_COLORS.sage, color: "white" }}
  >
                              <Check className="w-4 h-4 mr-1" />
                              수락
                            </Button>
                            <Button size="sm" variant="outline" className="flex-1">
                              <X className="w-4 h-4 mr-1" />
                              거절
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>)}
                </div>}
            </TabsContent>

            {
    /* Friend Suggestions */
  }
            <TabsContent value="suggestions">
              <div className="space-y-3">
                {mockSuggestions.map((suggestion) => <div key={suggestion.id} className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-3">
                      <Avatar className="w-14 h-14 ring-2 ring-[#D8E983]/30">
                        <AvatarImage src={suggestion.avatar} />
                        <AvatarFallback>{suggestion.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 mb-1">{suggestion.name}</h3>
                        <p className="text-sm text-gray-600 mb-2 line-clamp-1">{suggestion.bio}</p>
                        <div className="flex items-center gap-2 mb-3">
                          <Badge
    variant="secondary"
    className="text-xs"
    style={{ backgroundColor: `${PP_COLORS.lime}40`, color: PP_COLORS.olive }}
  >
                            {suggestion.reason}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            친구 {suggestion.mutualFriends}명과 함께 아는 사람
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <Button
    size="sm"
    className="flex-1"
    style={{ backgroundColor: PP_COLORS.sage, color: "white" }}
  >
                            <UserPlus className="w-4 h-4 mr-1" />
                            친구 추가
                          </Button>
                          <Button size="sm" variant="outline">
                            프로필
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>)}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <BottomNav />
    </div>;
}
export {
  FriendsPage
};
