import { useState } from "react";
import { useNavigate } from "react-router";
import { TopNav } from "../components/TopNav";
import { BottomNav } from "../components/BottomNav";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { mockSpots } from "../data/mockData";
import { Upload, MapPin, X } from "lucide-react";
import { ppGradientStyle, PP_COLORS } from "../utils/ppStyles";
const mockImageUrls = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800"
];
function UploadPage() {
  const navigate = useNavigate();
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedSpot, setSelectedSpot] = useState("");
  const [content, setContent] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const popularTags = ["\uC77C\uCD9C", "\uC77C\uBAB0", "\uC57C\uACBD", "\uC790\uC5F0", "\uB3C4\uC2DC", "\uAC10\uC131", "\uC778\uBB3C", "\uAC74\uCD95"];
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/community");
  };
  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  return <div className="min-h-screen bg-gray-50 pb-20 lg:pb-4">
      <TopNav title="📸 게시글 작성" showBack />

      <div className="pt-14">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto px-4 py-6">
          {
    /* Image Upload */
  }
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              사진 추가 ✨
            </label>
            {selectedImages.length === 0 ? <button
    type="button"
    onClick={() => setSelectedImages(mockImageUrls)}
    className="w-full aspect-square border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center transition-colors"
    style={{
      borderColor: PP_COLORS.sage + "80",
      backgroundColor: `${PP_COLORS.cream}40`
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = PP_COLORS.sage;
      e.currentTarget.style.backgroundColor = `${PP_COLORS.lime}20`;
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = PP_COLORS.sage + "80";
      e.currentTarget.style.backgroundColor = `${PP_COLORS.cream}40`;
    }}
  >
                <Upload className="w-12 h-12 text-gray-400 mb-2" />
                <span className="text-gray-600 font-medium">📷 사진 업로드</span>
                <span className="text-sm text-gray-500 mt-1">
                  최대 10장까지 선택할 수 있어요
                </span>
              </button> : <div className="grid grid-cols-3 gap-3">
                {selectedImages.map((url, index) => <div key={index} className="relative aspect-square rounded-xl overflow-hidden bg-gray-100">
                    <img
    src={url}
    alt=""
    className="w-full h-full object-cover"
  />
                    <button
    type="button"
    onClick={() => setSelectedImages(selectedImages.filter((_, i) => i !== index))}
    className="absolute top-2 right-2 w-6 h-6 bg-black/60 text-white rounded-full flex items-center justify-center hover:bg-black/80 transition-colors"
  >
                      <X className="w-4 h-4" />
                    </button>
                  </div>)}
                {selectedImages.length < 10 && <button
    type="button"
    onClick={() => {
    }}
    className="aspect-square border-2 border-dashed rounded-xl flex items-center justify-center transition-colors"
    style={{
      borderColor: PP_COLORS.sage + "80",
      backgroundColor: `${PP_COLORS.cream}40`
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = PP_COLORS.sage;
      e.currentTarget.style.backgroundColor = `${PP_COLORS.lime}20`;
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = PP_COLORS.sage + "80";
      e.currentTarget.style.backgroundColor = `${PP_COLORS.cream}40`;
    }}
  >
                    <Upload className="w-8 h-8 text-gray-400" />
                  </button>}
              </div>}
          </div>

          {
    /* Spot Selection */
  }
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              📍 촬영 장소
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
    value={selectedSpot}
    onChange={(e) => setSelectedSpot(e.target.value)}
    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 transition-all"
    style={{
      focusRingColor: PP_COLORS.sage
    }}
    required
  >
                <option value="">장소를 선택해주세요</option>
                {mockSpots.map((spot) => <option key={spot.id} value={spot.id}>
                    {spot.name}
                  </option>)}
              </select>
            </div>
          </div>

          {
    /* Content */
  }
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              💭 내용
            </label>
            <textarea
    value={content}
    onChange={(e) => setContent(e.target.value)}
    placeholder="이 장소에서의 경험을 공유해주세요..."
    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 resize-none transition-all"
    style={{
      minHeight: "120px"
    }}
    required
  />
          </div>

          {
    /* Tags */
  }
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              🏷️ 태그 선택
            </label>
            <div className="flex flex-wrap gap-2">
              {popularTags.map((tag) => <Badge
    key={tag}
    variant={selectedTags.includes(tag) ? "default" : "outline"}
    className="cursor-pointer transition-all"
    style={selectedTags.includes(tag) ? {
      backgroundColor: PP_COLORS.sage,
      color: "white"
    } : {}}
    onClick={() => toggleTag(tag)}
  >
                  #{tag}
                </Badge>)}
            </div>
          </div>

          {
    /* Actions */
  }
          <div className="flex gap-3 sticky bottom-20 lg:bottom-4">
            <Button
    type="button"
    variant="outline"
    className="flex-1"
    onClick={() => navigate(-1)}
  >
              취소
            </Button>
            <Button
    type="submit"
    className="flex-1"
    style={ppGradientStyle}
    disabled={selectedImages.length === 0 || !selectedSpot || !content}
  >
              📤 게시하기
            </Button>
          </div>
        </form>
      </div>

      <BottomNav />
    </div>;
}
export {
  UploadPage
};
