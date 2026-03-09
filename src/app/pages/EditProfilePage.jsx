import { useState } from "react";
import { useNavigate } from "react-router";
import { TopNav } from "../components/TopNav";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { mockUser } from "../data/mockData";
import { Camera, Save, X } from "lucide-react";
import { PP_COLORS, ppGradientStyle } from "../utils/ppStyles";
function EditProfilePage() {
  const navigate = useNavigate();
  const [name, setName] = useState(mockUser.name);
  const [bio, setBio] = useState(mockUser.bio);
  const [avatar] = useState(mockUser.avatar);
  const handleSave = () => {
    alert("\uD504\uB85C\uD544\uC774 \uC800\uC7A5\uB418\uC5C8\uC2B5\uB2C8\uB2E4!");
    navigate("/profile");
  };
  const handleCancel = () => {
    navigate("/profile");
  };
  const handleAvatarChange = () => {
    alert("\uD504\uB85C\uD544 \uC0AC\uC9C4 \uBCC0\uACBD \uAE30\uB2A5\uC740 \uC900\uBE44 \uC911\uC785\uB2C8\uB2E4.");
  };
  return <div className="min-h-screen bg-gray-50 pb-6">
      <TopNav title="프로필 수정" showBack />

      <div className="pt-14">
        <div className="max-w-2xl mx-auto px-4 py-6">
          {
    /* Avatar Section */
  }
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-4">
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                <Avatar className="w-24 h-24 ring-4 ring-[#D8E983]/30">
                  <AvatarImage src={avatar} />
                  <AvatarFallback>{name[0]}</AvatarFallback>
                </Avatar>
                <button
    onClick={handleAvatarChange}
    className="absolute bottom-0 right-0 w-8 h-8 rounded-full flex items-center justify-center shadow-lg"
    style={{ backgroundColor: PP_COLORS.sage }}
  >
                  <Camera className="w-4 h-4 text-white" />
                </button>
              </div>
              <Button
    variant="outline"
    size="sm"
    onClick={handleAvatarChange}
  >
                📸 프로필 사진 변경
              </Button>
            </div>
          </div>

          {
    /* Form Section */
  }
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-4">
            <div className="space-y-6">
              {
    /* Name */
  }
              <div>
                <Label htmlFor="name" className="text-sm font-medium text-gray-700 mb-2 block">
                  이름
                </Label>
                <Input
    id="name"
    type="text"
    value={name}
    onChange={(e) => setName(e.target.value)}
    placeholder="이름을 입력하세요"
    className="w-full"
  />
              </div>

              {
    /* Bio */
  }
              <div>
                <Label htmlFor="bio" className="text-sm font-medium text-gray-700 mb-2 block">
                  소개
                </Label>
                <Textarea
    id="bio"
    value={bio}
    onChange={(e) => setBio(e.target.value)}
    placeholder="자기소개를 입력하세요"
    className="w-full min-h-[100px] resize-none"
    maxLength={150}
  />
                <div className="text-xs text-gray-500 mt-1 text-right">
                  {bio.length} / 150
                </div>
              </div>

              {
    /* Email (Read-only) */
  }
              <div>
                <Label htmlFor="email" className="text-sm font-medium text-gray-700 mb-2 block">
                  이메일
                </Label>
                <Input
    id="email"
    type="email"
    value="kimphoto@example.com"
    disabled
    className="w-full bg-gray-100"
  />
                <p className="text-xs text-gray-500 mt-1">
                  이메일은 변경할 수 없습니다
                </p>
              </div>

              {
    /* Phone (Optional) */
  }
              <div>
                <Label htmlFor="phone" className="text-sm font-medium text-gray-700 mb-2 block">
                  전화번호 (선택)
                </Label>
                <Input
    id="phone"
    type="tel"
    placeholder="010-0000-0000"
    className="w-full"
  />
              </div>

              {
    /* Website (Optional) */
  }
              <div>
                <Label htmlFor="website" className="text-sm font-medium text-gray-700 mb-2 block">
                  웹사이트 (선택)
                </Label>
                <Input
    id="website"
    type="url"
    placeholder="https://yourwebsite.com"
    className="w-full"
  />
              </div>

              {
    /* Instagram (Optional) */
  }
              <div>
                <Label htmlFor="instagram" className="text-sm font-medium text-gray-700 mb-2 block">
                  인스타그램 (선택)
                </Label>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">@</span>
                  <Input
    id="instagram"
    type="text"
    placeholder="username"
    className="flex-1"
  />
                </div>
              </div>
            </div>
          </div>

          {
    /* Privacy Settings */
  }
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-4">
            <h3 className="font-bold text-lg mb-4">🔒 공개 설정</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">프로필 공개</div>
                  <div className="text-sm text-gray-500">다른 사용자가 내 프로필을 볼 수 있습니다</div>
                </div>
                <input
    type="checkbox"
    defaultChecked
    className="w-5 h-5 rounded"
    style={{ accentColor: PP_COLORS.sage }}
  />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">방문 스팟 공개</div>
                  <div className="text-sm text-gray-500">내가 방문한 스팟을 다른 사용자가 볼 수 있습니다</div>
                </div>
                <input
    type="checkbox"
    defaultChecked
    className="w-5 h-5 rounded"
    style={{ accentColor: PP_COLORS.sage }}
  />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">사진 공개</div>
                  <div className="text-sm text-gray-500">내가 업로드한 사진을 다른 사용자가 볼 수 있습니다</div>
                </div>
                <input
    type="checkbox"
    defaultChecked
    className="w-5 h-5 rounded"
    style={{ accentColor: PP_COLORS.sage }}
  />
              </div>
            </div>
          </div>

          {
    /* Action Buttons */
  }
          <div className="flex gap-3">
            <Button
    variant="outline"
    className="flex-1"
    onClick={handleCancel}
  >
              <X className="w-4 h-4 mr-2" />
              취소
            </Button>
            <Button
    className="flex-1"
    style={ppGradientStyle}
    onClick={handleSave}
  >
              <Save className="w-4 h-4 mr-2" />
              저장하기
            </Button>
          </div>

          {
    /* Help Text */
  }
          <p className="text-center text-sm text-gray-500 mt-4">
            💡 프로필 정보는 다른 사용자들에게 공개됩니다
          </p>
        </div>
      </div>
    </div>;
}
export {
  EditProfilePage
};
