import { TopNav } from "../components/TopNav";

function HelpGettingStartedPage() {
  return <div className="min-h-screen bg-gray-50 pb-6">
      <TopNav title="앱 사용 시작하기" showBack />

      <div className="pt-14">
        <div className="max-w-7xl mx-auto px-4 py-6 space-y-4">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-bold mb-2">1. 계정 설정</h2>
            <p className="text-sm text-gray-600">프로필 이미지, 소개 문구, 취향 태그를 먼저 설정하면 추천 정확도가 올라갑니다.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-bold mb-2">2. 첫 게시글 업로드</h2>
            <p className="text-sm text-gray-600">스팟을 선택한 뒤 사진과 방문 정보를 입력해 첫 게시글을 작성해 보세요.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-bold mb-2">3. 커뮤니티 참여</h2>
            <p className="text-sm text-gray-600">관심 태그를 팔로우하고 질문/모임에 참여해 다른 사용자와 교류할 수 있습니다.</p>
          </div>
        </div>
      </div>
    </div>;
}

export {
  HelpGettingStartedPage
};
