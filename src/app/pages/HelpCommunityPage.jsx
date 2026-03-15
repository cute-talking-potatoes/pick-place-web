import { TopNav } from "../components/TopNav";

function HelpCommunityPage() {
  return <div className="min-h-screen bg-gray-50 pb-6">
      <TopNav title="커뮤니티 이용" showBack />

      <div className="pt-14">
        <div className="max-w-7xl mx-auto px-4 py-6 space-y-4">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-bold mb-2">피드 보기</h2>
            <p className="text-sm text-gray-600">피드 탭에서 사진 게시글을 확인하고 게시글 상세에서 댓글까지 볼 수 있습니다.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-bold mb-2">질문 탭 활용</h2>
            <p className="text-sm text-gray-600">질문 작성, 태그 필터, 검색으로 궁금한 내용을 빠르게 찾고 답변을 확인할 수 있습니다.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-bold mb-2">공지 확인</h2>
            <p className="text-sm text-gray-600">공지 탭에서 서비스 안내와 업데이트 소식을 확인할 수 있습니다.</p>
          </div>
        </div>
      </div>
    </div>;
}

export {
  HelpCommunityPage
};
