import { useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { TopNav } from "../components/TopNav";
import { BottomNav } from "../components/BottomNav";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { mockPosts, mockSpots } from "../data/mockData";
import { Upload, MapPin, X, AlertCircle } from "lucide-react";
import { ppGradientStyle, PP_COLORS } from "../utils/ppStyles";
const mockImageUrls = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800"
];
function UploadPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const today = new Date().toISOString().split("T")[0];

  const source = searchParams.get("source");
  const spotIdFromQuery = searchParams.get("spotId");
  const postIdFromQuery = searchParams.get("postId");
  const isSpotUploadFlow = source === "spot";
  const editingPost = useMemo(() => {
    if (!postIdFromQuery) return null;
    return mockPosts.find((post) => post.id === postIdFromQuery) || null;
  }, [postIdFromQuery]);

  const [selectedImages, setSelectedImages] = useState(() => editingPost?.images || []);
  const [selectedSpotId, setSelectedSpotId] = useState(() => editingPost?.spotId || "");
  const [visitedDate, setVisitedDate] = useState(() => searchParams.get("visitedDate") || editingPost?.visitedDate || today);
  const [content, setContent] = useState(() => editingPost?.content || "");
  const [selectedTags, setSelectedTags] = useState(() => editingPost?.tags || []);
  const [errors, setErrors] = useState({});
  const popularTags = ["\uC77C\uCD9C", "\uC77C\uBAB0", "\uC57C\uACBD", "\uC790\uC5F0", "\uB3C4\uC2DC", "\uAC10\uC131", "\uC778\uBB3C", "\uAC74\uCD95"];

  const lockedSpot = useMemo(() => {
    if (!isSpotUploadFlow || !spotIdFromQuery) return null;
    return mockSpots.find((spot) => spot.id === spotIdFromQuery) || null;
  }, [isSpotUploadFlow, spotIdFromQuery]);

  const isInvalidSpotFlow = isSpotUploadFlow && !lockedSpot;
  const effectiveSpotId = isSpotUploadFlow ? lockedSpot?.id || "" : selectedSpotId;

  const validateForm = () => {
    const nextErrors = {};
    if (selectedImages.length === 0) nextErrors.images = "사진을 1장 이상 추가해주세요.";
    if (!effectiveSpotId) nextErrors.spot = "촬영 장소를 선택해주세요.";
    if (!visitedDate) nextErrors.visitedDate = "방문 일자를 입력해주세요.";
    if (visitedDate && visitedDate > today) nextErrors.visitedDate = "방문 일자는 오늘 이후로 설정할 수 없어요.";
    if (!content.trim()) nextErrors.content = "내용을 입력해주세요.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const uploadPayload = {
      postId: editingPost?.id || null,
      spotId: effectiveSpotId,
      visitedDate,
      content: content.trim(),
      images: selectedImages,
      tags: selectedTags,
      createdAt: new Date().toISOString()
    };

    const savedUploads = JSON.parse(localStorage.getItem("spot_upload_drafts") || "[]");
    localStorage.setItem("spot_upload_drafts", JSON.stringify([uploadPayload, ...savedUploads]));

    navigate("/community");
  };
  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  if (isSpotUploadFlow) {
    if (isInvalidSpotFlow) {
      return <div className="min-h-screen bg-gray-50 pb-20 lg:pb-4">
          <TopNav title="📸 게시글 작성" showBack />

          <div className="pt-14">
            <div className="max-w-2xl mx-auto px-4 py-10">
              <div className="bg-white rounded-2xl shadow-sm p-6 text-center">
                <AlertCircle className="w-10 h-10 text-amber-500 mx-auto mb-3" />
                <h2 className="text-lg font-bold text-gray-900 mb-2">선택된 스팟 정보가 없어요</h2>
                <p className="text-sm text-gray-600 mb-5">
                  스팟 상세 화면에서 업로드를 시작하면 촬영 장소가 자동으로 입력됩니다.
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1" onClick={() => navigate(-1)}>
                    이전 화면
                  </Button>
                  <Link to="/spots" className="flex-1">
                    <Button className="w-full" style={ppGradientStyle}>스팟 리스트로 이동</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <BottomNav />
        </div>;
    }
  }

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
    className="w-full aspect-[4/3] border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center transition-colors"
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
              </button> : <>
                <div className={`grid ${selectedImages.length === 1 ? "grid-cols-1" : "grid-cols-2"} gap-1 rounded-xl overflow-hidden`}>
                  {selectedImages.map((url, index) => <div
    key={index}
    className={`relative bg-gray-100 overflow-hidden ${selectedImages.length === 1 ? "aspect-[4/3]" : "aspect-square"}`}
  >
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
                </div>
                {selectedImages.length < 10 && <Button
    type="button"
    variant="outline"
    className="mt-3 w-full"
    onClick={() => setSelectedImages([...selectedImages, ...mockImageUrls].slice(0, 10))}
  >
                    <Upload className="w-4 h-4 mr-2" />
                    사진 추가
                  </Button>}
              </>}
            {errors.images && <p className="text-xs text-red-500 mt-2">{errors.images}</p>}
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
              {isSpotUploadFlow ? <Input
    value={lockedSpot.name}
    className="pl-10 bg-gray-100 text-gray-700"
    readOnly
    aria-readonly="true"
  /> : <select
    value={selectedSpotId}
    onChange={(e) => {
      setSelectedSpotId(e.target.value);
      if (errors.spot) setErrors({ ...errors, spot: "" });
    }}
    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 transition-all"
    required
  >
                  <option value="">장소를 선택해주세요</option>
                  {mockSpots.map((spot) => <option key={spot.id} value={spot.id}>
                      {spot.name}
                    </option>)}
                </select>}
            </div>
            {isSpotUploadFlow && <p className="text-xs text-gray-500 mt-2">선택한 스팟 기준으로 자동 입력됨</p>}
            {errors.spot && <p className="text-xs text-red-500 mt-2">{errors.spot}</p>}
          </div>

          {/* Visited Date */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">📅 방문 일자</label>
            <Input
    type="date"
    value={visitedDate}
    onChange={(e) => {
      setVisitedDate(e.target.value);
      if (errors.visitedDate) setErrors({ ...errors, visitedDate: "" });
    }}
    max={today}
    required
  />
            {errors.visitedDate && <p className="text-xs text-red-500 mt-2">{errors.visitedDate}</p>}
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
    onChange={(e) => {
      setContent(e.target.value);
      if (errors.content) setErrors({ ...errors, content: "" });
    }}
    placeholder="이 장소에서의 경험을 공유해주세요..."
    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 resize-none transition-all"
    style={{
      minHeight: "120px"
    }}
    required
  />
            {errors.content && <p className="text-xs text-red-500 mt-2">{errors.content}</p>}
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
    disabled={selectedImages.length === 0 || !effectiveSpotId || !visitedDate || !content.trim()}
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
