import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { Button } from "../components/ui/button";
import { categories, timePreferences, photoStyles } from "../data/mockData";
import { ChevronRight } from "lucide-react";
function OnboardingPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const fromProfile = searchParams.get("from") === "profile";
  const [step, setStep] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [selectedStyles, setSelectedStyles] = useState([]);
  const toggleSelection = (list, setList, id) => {
    if (list.includes(id)) {
      setList(list.filter((item) => item !== id));
    } else {
      setList([...list, id]);
    }
  };
  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      navigate(fromProfile ? "/profile" : "/main");
    }
  };
  const canProceed = () => {
    if (step === 1) return selectedCategories.length > 0;
    if (step === 2) return selectedTimes.length > 0;
    if (step === 3) return selectedStyles.length > 0;
    return false;
  };
  return <div className="min-h-screen bg-gradient-to-br from-[#FFFBB1]/30 via-white to-[#D8E983]/20 flex flex-col">
      {
    /* Progress */
  }
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">취향 설정</span>
            <span className="text-sm font-medium text-gray-900">{step} / 3</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
    className="h-2 rounded-full transition-all duration-300"
    style={{
      width: `${step / 3 * 100}%`,
      background: "linear-gradient(90deg, #A5C89E 0%, #AEB877 100%)"
    }}
  />
          </div>
        </div>
      </div>

      {
    /* Content */
  }
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-7xl">
          {step === 1 && <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                어떤 배경을 좋아하시나요?
              </h2>
              <p className="text-gray-600">
                원하는 배경 유형을 모두 선택해주세요
              </p>
            </div>}

          {step === 2 && <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                선호하는 시간대는?
              </h2>
              <p className="text-gray-600">
                촬영하고 싶은 시간대를 선택해주세요
              </p>
            </div>}

          {step === 3 && <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                어떤 스타일을 선호하시나요?
              </h2>
              <p className="text-gray-600">
                좋아하는 사진 스타일을 선택해주세요
              </p>
            </div>}

          {
    /* Step 1: Categories */
  }
          {step === 1 && <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {categories.map((category) => <button
    key={category.id}
    onClick={() => toggleSelection(selectedCategories, setSelectedCategories, category.id)}
    className={`p-6 rounded-2xl border-2 transition-all ${selectedCategories.includes(category.id) ? "border-[#A5C89E] bg-[#A5C89E]/10 shadow-md" : "border-gray-200 bg-white hover:border-gray-300"}`}
  >
                  <div className="text-4xl mb-2">{category.icon}</div>
                  <div className="font-medium text-gray-900">{category.label}</div>
                </button>)}
            </div>}

          {
    /* Step 2: Time Preferences */
  }
          {step === 2 && <div className="grid grid-cols-2 gap-6">
              {timePreferences.map((time) => <button
    key={time.id}
    onClick={() => toggleSelection(selectedTimes, setSelectedTimes, time.id)}
    className={`p-8 rounded-2xl border-2 transition-all ${selectedTimes.includes(time.id) ? "border-[#A5C89E] bg-[#A5C89E]/10 shadow-md" : "border-gray-200 bg-white hover:border-gray-300"}`}
  >
                  <div className="text-6xl mb-3">{time.icon}</div>
                  <div className="font-medium text-lg text-gray-900">{time.label}</div>
                </button>)}
            </div>}

          {
    /* Step 3: Photo Styles */
  }
          {step === 3 && <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {photoStyles.map((style) => <button
    key={style.id}
    onClick={() => toggleSelection(selectedStyles, setSelectedStyles, style.id)}
    className={`p-6 rounded-2xl border-2 transition-all ${selectedStyles.includes(style.id) ? "border-[#A5C89E] bg-[#A5C89E]/10 shadow-md" : "border-gray-200 bg-white hover:border-gray-300"}`}
  >
                  <div className="font-medium text-gray-900">{style.label}</div>
                </button>)}
            </div>}
        </div>
      </div>

      {
    /* Actions */
  }
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="max-w-7xl mx-auto flex gap-3">
          {step > 1 && <Button
    variant="outline"
    onClick={() => setStep(step - 1)}
    className="flex-1"
  >
              이전
            </Button>}
          <Button
    onClick={handleNext}
    disabled={!canProceed()}
    className={`h-14 ${step === 1 ? "w-full" : "flex-1"}`}
    style={{
      background: canProceed() ? "linear-gradient(90deg, #A5C89E 0%, #AEB877 100%)" : void 0
    }}
  >
            {step === 3 ? "\uC644\uB8CC" : "\uB2E4\uC74C"}
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>;
}
export {
  OnboardingPage
};
