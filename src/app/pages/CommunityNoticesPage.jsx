import { Link } from "react-router";
import { TopNav } from "../components/TopNav";
import { BottomNav } from "../components/BottomNav";
import { Badge } from "../components/ui/badge";
import { mockNotices } from "../data/communityData";
import { PP_COLORS } from "../utils/ppStyles";

function CommunityNoticesPage() {
  return <div className="min-h-screen bg-gray-50 pb-20 lg:pb-4">
      <TopNav title="커뮤니티 공지" showBack />

      <div className="pt-14">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="space-y-3">
            {mockNotices.map((notice) => <div key={notice.id} className="bg-white rounded-2xl shadow-sm p-5">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" style={{ backgroundColor: `${PP_COLORS.lime}55`, color: PP_COLORS.olive }}>
                    {notice.category}
                  </Badge>
                  <span className="text-xs text-gray-500">{notice.createdAt}</span>
                </div>
                <h2 className="font-semibold text-gray-900 mb-2">{notice.title}</h2>
                <p className="text-sm text-gray-600">{notice.description}</p>
              </div>)}
          </div>

          <div className="mt-6">
            <Link to="/community" className="text-sm text-gray-500 hover:text-gray-700">커뮤니티로 돌아가기</Link>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>;
}

export {
  CommunityNoticesPage
};
