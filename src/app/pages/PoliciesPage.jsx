import { TopNav } from "../components/TopNav";

function PoliciesPage() {
  return <div className="min-h-screen bg-gray-50 pb-6">
      <TopNav title="약관 및 정책" showBack />

      <div className="pt-14">
        <div className="max-w-7xl mx-auto px-4 py-6 space-y-4">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-bold mb-3">📄 서비스 이용약관</h2>
            <p className="text-sm text-gray-600 leading-6">
              픽플 서비스 이용을 위한 기본 약관입니다. 서비스 이용 시 본 약관에 동의한 것으로 간주됩니다.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-bold mb-3">🔐 개인정보 처리방침</h2>
            <p className="text-sm text-gray-600 leading-6">
              이용자의 개인정보는 관련 법령을 준수하여 안전하게 관리되며, 명시된 목적 범위 내에서만 사용됩니다.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-bold mb-3">⚖️ 커뮤니티 운영정책</h2>
            <p className="text-sm text-gray-600 leading-6">
              건전한 커뮤니티 문화를 위해 신고/제재 정책을 운영하며, 운영정책 위반 시 게시글 제한이 적용될 수 있습니다.
            </p>
          </div>
        </div>
      </div>
    </div>;
}

export {
  PoliciesPage
};
