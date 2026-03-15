import { TopNav } from "../components/TopNav";

function HelpSpotsPage() {
  return <div className="min-h-screen bg-gray-50 pb-6">
      <TopNav title="스팟 검색/저장" showBack />

      <div className="pt-14">
        <div className="max-w-7xl mx-auto px-4 py-6 space-y-4">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-bold mb-2">스팟 탐색</h2>
            <p className="text-sm text-gray-600">스팟 리스트에서 취향 태그, 정렬 옵션으로 원하는 장소를 빠르게 찾을 수 있습니다.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-bold mb-2">방문/북마크 관리</h2>
            <p className="text-sm text-gray-600">프로필의 활동 영역에서 방문한 장소와 북마크 스팟을 확인하고 카드형/리스트형으로 볼 수 있습니다.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-bold mb-2">스팟 상세 확인</h2>
            <p className="text-sm text-gray-600">각 스팟 상세에서 사진, 태그, 추천 시간대, 이동 정보를 확인할 수 있습니다.</p>
          </div>
        </div>
      </div>
    </div>;
}

export {
  HelpSpotsPage
};
