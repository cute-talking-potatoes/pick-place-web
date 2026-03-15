import { Link } from "react-router";
import { BottomNav } from "../components/BottomNav";
import { TopNav } from "../components/TopNav";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { mockUser, mockSpots } from "../data/mockData";
import {
  Bookmark,
  Camera,
  Settings,
  LogOut,
  ChevronRight,
  CheckCircle,
  Users,
  MessageSquare,
  UserPlus
} from "lucide-react";
import { PP_COLORS } from "../utils/ppStyles";
function ProfilePage() {
  const visitedCount = mockSpots.filter((s) => s.isVisited).length;
  const bookmarkCount = mockSpots.filter((s) => s.isBookmarked).length;
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
              </div>
            </div>

            {
    /* Stats */
  }
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-100">
              <Link to="/visited">
                <div className="text-center hover:bg-gray-50 rounded-lg p-3 transition-colors">
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {visitedCount}
                  </div>
                  <div className="text-sm text-gray-600">📍 방문</div>
                </div>
              </Link>
              <Link to="/bookmarks">
                <div className="text-center hover:bg-gray-50 rounded-lg p-3 transition-colors">
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {bookmarkCount}
                  </div>
                  <div className="text-sm text-gray-600">💚 북마크</div>
                </div>
              </Link>
              <div className="text-center hover:bg-gray-50 rounded-lg p-3 transition-colors cursor-pointer">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  48
                </div>
                <div className="text-sm text-gray-600">📸 사진</div>
              </div>
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
    /* Menu Items */
  }
          <div className="bg-white rounded-2xl shadow-sm mb-4 overflow-hidden">
            <Link to="/visited">
              <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${PP_COLORS.sage}20` }}>
                    <CheckCircle className="w-5 h-5" style={{ color: PP_COLORS.sage }} />
                  </div>
                  <span className="font-medium">방문한 스팟</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{visitedCount}</Badge>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </button>
            </Link>

            <Link to="/bookmarks">
              <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${PP_COLORS.olive}20` }}>
                    <Bookmark className="w-5 h-5" style={{ color: PP_COLORS.olive }} />
                  </div>
                  <span className="font-medium">북마크</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{bookmarkCount}</Badge>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </button>
            </Link>

            <Link to="/my-photos">
              <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${PP_COLORS.lime}40` }}>
                    <Camera className="w-5 h-5" style={{ color: PP_COLORS.olive }} />
                  </div>
                  <span className="font-medium">내 사진첩</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">48</Badge>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </button>
            </Link>

            <Link to="/friends">
              <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${PP_COLORS.lime}40` }}>
                    <UserPlus className="w-5 h-5" style={{ color: PP_COLORS.olive }} />
                  </div>
                  <span className="font-medium">친구</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">4</Badge>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </button>
            </Link>

            <Link to="/my-meetups">
              <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${PP_COLORS.sage}20` }}>
                    <Users className="w-5 h-5" style={{ color: PP_COLORS.sage }} />
                  </div>
                  <span className="font-medium">내 모임</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            </Link>

            <Link to="/chat">
              <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${PP_COLORS.cream}60` }}>
                    <MessageSquare className="w-5 h-5" style={{ color: PP_COLORS.olive }} />
                  </div>
                  <span className="font-medium">채팅</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="destructive">2</Badge>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </button>
            </Link>
          </div>

          {
    /* Settings */
  }
          <div className="bg-white rounded-2xl shadow-sm mb-4 overflow-hidden">
            <Link to="/settings">
              <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <Settings className="w-5 h-5 text-gray-600" />
                  <span className="font-medium">⚙️ 설정</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            </Link>

            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <LogOut className="w-5 h-5 text-gray-600" />
                <span className="font-medium">로그아웃</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
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
