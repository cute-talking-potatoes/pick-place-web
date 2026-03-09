import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Camera } from "lucide-react";
function LoginPage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      navigate("/main");
    } else {
      navigate("/onboarding");
    }
  };
  return <div className="min-h-screen bg-gradient-to-br from-[#FFFBB1]/30 via-white to-[#D8E983]/20 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {
    /* Logo */
  }
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl shadow-lg mb-4" style={{ background: "linear-gradient(135deg, #A5C89E 0%, #AEB877 100%)" }}>
            <Camera className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: "#AEB877" }}>픽플</h1>
          <p className="text-gray-600">나만의 특별한 장소를 찾아보세요</p>
        </div>

        {
    /* Form */
  }
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex gap-2 mb-6">
            <Button
    variant={isLogin ? "default" : "outline"}
    className="flex-1"
    onClick={() => setIsLogin(true)}
  >
              로그인
            </Button>
            <Button
    variant={!isLogin ? "default" : "outline"}
    className="flex-1"
    onClick={() => setIsLogin(false)}
  >
              회원가입
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
    type="email"
    placeholder="이메일"
    required
    className="h-12"
  />
            </div>
            <div>
              <Input
    type="password"
    placeholder="비밀번호"
    required
    className="h-12"
  />
            </div>
            {!isLogin && <div>
                <Input
    type="password"
    placeholder="비밀번호 확인"
    required
    className="h-12"
  />
              </div>}

            <Button type="submit" className="w-full h-12" style={{ background: "linear-gradient(90deg, #A5C89E 0%, #AEB877 100%)" }}>
              {isLogin ? "\uB85C\uADF8\uC778" : "\uD68C\uC6D0\uAC00\uC785"}
            </Button>
          </form>

          {
    /* Social Login */
  }
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">또는</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <Button variant="outline" className="h-12">
                <span className="text-xl">K</span>
              </Button>
              <Button variant="outline" className="h-12">
                <span className="text-xl">N</span>
              </Button>
              <Button variant="outline" className="h-12">
                <span className="text-xl">G</span>
              </Button>
            </div>
          </div>

          {isLogin && <div className="mt-6 text-center">
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
                비밀번호를 잊으셨나요?
              </a>
            </div>}
        </div>

        <p className="mt-6 text-center text-xs text-gray-500">
          계속 진행하면 이용약관 및 개인정보처리방침에 동의하는 것으로 간주됩니다
        </p>
      </div>
    </div>;
}
export {
  LoginPage
};
