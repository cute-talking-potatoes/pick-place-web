import { Link } from "react-router";
import { TopNav } from "../components/TopNav";
import { ChevronRight } from "lucide-react";

const helpItems = [
  { title: "앱 사용 시작하기", description: "회원가입, 프로필 설정, 첫 게시글 업로드 방법", path: "/settings/help/getting-started" },
  { title: "스팟 검색/저장", description: "스팟 탐색, 방문/북마크 확인 방법", path: "/settings/help/spots" },
  { title: "모임 참여/생성", description: "모임 생성, 참여 요청, 일정 관리 방법", path: "/settings/help/meetups" },
  { title: "커뮤니티 이용", description: "피드, 질문, 공지 탭 이용 방법", path: "/settings/help/community" }
];

function HelpPage() {
  return <div className="min-h-screen bg-gray-50 pb-6">
      <TopNav title="도움말" showBack />

      <div className="pt-14">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {helpItems.map((item, index) => <Link
        key={item.title}
        to={item.path}
        className={`w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors ${index !== helpItems.length - 1 ? "border-b border-gray-100" : ""}`}
      >
                <div className="text-left">
                  <p className="font-medium text-gray-900">{item.title}</p>
                  <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </Link>)}
          </div>
        </div>
      </div>
    </div>;
}

export {
  HelpPage
};
