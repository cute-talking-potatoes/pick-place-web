import { TopNav } from "../components/TopNav";
import { Switch } from "../components/ui/switch";
import { Label } from "../components/ui/label";
import { Separator } from "../components/ui/separator";

function PrivacySettingsPage() {
  return <div className="min-h-screen bg-gray-50 pb-6">
      <TopNav title="개인정보 보호" showBack />

      <div className="pt-14">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
            <h2 className="text-lg font-bold">🛡️ 개인정보 보호 설정</h2>

            <div className="flex items-center justify-between">
              <Label htmlFor="privateAccount" className="cursor-pointer">
                <div className="font-medium">비공개 계정</div>
                <div className="text-sm text-gray-500">친구만 프로필과 게시글을 볼 수 있습니다</div>
              </Label>
              <Switch id="privateAccount" />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <Label htmlFor="showLocation" className="cursor-pointer">
                <div className="font-medium">위치 정보 공개</div>
                <div className="text-sm text-gray-500">게시글의 위치 정보를 공개합니다</div>
              </Label>
              <Switch id="showLocation" defaultChecked />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <Label htmlFor="allowSearch" className="cursor-pointer">
                <div className="font-medium">검색 허용</div>
                <div className="text-sm text-gray-500">닉네임으로 검색될 수 있습니다</div>
              </Label>
              <Switch id="allowSearch" defaultChecked />
            </div>
          </div>
        </div>
      </div>
    </div>;
}

export {
  PrivacySettingsPage
};
