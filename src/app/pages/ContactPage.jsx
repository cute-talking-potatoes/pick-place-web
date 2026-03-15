import { TopNav } from "../components/TopNav";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { PP_COLORS } from "../utils/ppStyles";

function ContactPage() {
  return <div className="min-h-screen bg-gray-50 pb-6">
      <TopNav title="문의하기" showBack />

      <div className="pt-14">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-bold mb-4">💬 1:1 문의</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="contactTitle">제목</Label>
                <Input id="contactTitle" placeholder="문의 제목을 입력하세요" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactType">문의 유형</Label>
                <Input id="contactType" placeholder="예: 계정, 오류, 기능 요청" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactMessage">문의 내용</Label>
                <Textarea id="contactMessage" rows={6} placeholder="문의를 자세히 작성해 주세요" />
              </div>
              <Button className="w-full mt-2" style={{ backgroundColor: PP_COLORS.sage, color: "white" }}>
                문의 등록
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>;
}

export {
  ContactPage
};
