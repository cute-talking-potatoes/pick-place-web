import { TopNav } from "../components/TopNav";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { PP_COLORS } from "../utils/ppStyles";

function ChangePasswordPage() {
  return <div className="min-h-screen bg-gray-50 pb-6">
      <TopNav title="비밀번호 변경" showBack />

      <div className="pt-14">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-bold mb-4">🔒 비밀번호 변경</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">현재 비밀번호</Label>
                <Input id="currentPassword" type="password" placeholder="현재 비밀번호를 입력하세요" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">새 비밀번호</Label>
                <Input id="newPassword" type="password" placeholder="새 비밀번호를 입력하세요" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">새 비밀번호 확인</Label>
                <Input id="confirmPassword" type="password" placeholder="새 비밀번호를 다시 입력하세요" />
              </div>
              <Button className="w-full mt-2" style={{ backgroundColor: PP_COLORS.sage, color: "white" }}>
                변경하기
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>;
}

export {
  ChangePasswordPage
};
