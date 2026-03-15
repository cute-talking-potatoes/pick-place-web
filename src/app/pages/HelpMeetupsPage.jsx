import { TopNav } from "../components/TopNav";

function HelpMeetupsPage() {
  return <div className="min-h-screen bg-gray-50 pb-6">
      <TopNav title="모임 참여/생성" showBack />

      <div className="pt-14">
        <div className="max-w-7xl mx-auto px-4 py-6 space-y-4">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-bold mb-2">모임 찾기</h2>
            <p className="text-sm text-gray-600">모임 탭에서 날짜, 시간, 태그, 모집 상태 필터로 원하는 모임을 찾을 수 있습니다.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-bold mb-2">모임 생성</h2>
            <p className="text-sm text-gray-600">새 모임 만들기에서 장소, 일정, 모집 인원, 안내사항을 입력해 모임을 개설합니다.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-bold mb-2">참여 요청 및 관리</h2>
            <p className="text-sm text-gray-600">모임 상세에서 참여 요청을 보내고, 운영자는 모임 관리 화면에서 요청을 수락/거절할 수 있습니다.</p>
          </div>
        </div>
      </div>
    </div>;
}

export {
  HelpMeetupsPage
};
