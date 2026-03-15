import { useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { TopNav } from "../components/TopNav";
import { BottomNav } from "../components/BottomNav";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { mockPosts, mockSpots, mockUser } from "../data/mockData";
import { Upload, MapPin, X, AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";
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
  const preferenceTags = useMemo(() => mockUser.preferences || [], []);
  const defaultTags = useMemo(() => ["일출", "일몰", "야경", "자연", "도시", "감성", "인물", "건축"], []);
  const knownTags = useMemo(() => [...new Set([...preferenceTags, ...defaultTags])], [preferenceTags, defaultTags]);
  const [selectedTags, setSelectedTags] = useState(() => Array.from(new Set(editingPost?.tags || [])));
  const [customTags, setCustomTags] = useState(() => (editingPost?.tags || []).filter((tag) => !knownTags.includes(tag)));
  const [customTagInput, setCustomTagInput] = useState("");
  const [previewIndex, setPreviewIndex] = useState(0);
  const [errors, setErrors] = useState({});

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
      tags: Array.from(new Set(selectedTags)),
      createdAt: new Date().toISOString()
    };

    const savedUploads = JSON.parse(localStorage.getItem("spot_upload_drafts") || "[]");
    localStorage.setItem("spot_upload_drafts", JSON.stringify([uploadPayload, ...savedUploads]));

    navigate("/community");
  };
  const toggleTag = (tag) => {
    setSelectedTags((prevTags) => prevTags.includes(tag) ? prevTags.filter((t) => t !== tag) : [...prevTags, tag]);
  };
  const addCustomTag = () => {
    const nextTag = customTagInput.trim().replace(/^#/, "");
    if (!nextTag) {
      setErrors((prev) => ({ ...prev, tags: "태그를 입력한 뒤 추가해주세요." }));
      return;
    }
    if (selectedTags.some((tag) => tag.toLowerCase() === nextTag.toLowerCase())) {
      setErrors((prev) => ({ ...prev, tags: "이미 추가된 태그입니다." }));
      return;
    }
    setSelectedTags((prevTags) => [...prevTags, nextTag]);
    if (!knownTags.some((tag) => tag.toLowerCase() === nextTag.toLowerCase())) {
      setCustomTags((prevTags) => [...prevTags, nextTag]);
    }
    setCustomTagInput("");
    setErrors((prev) => ({ ...prev, tags: "" }));
  };
  const removeTag = (tagToRemove) => {
    setSelectedTags((prevTags) => prevTags.filter((tag) => tag !== tagToRemove));
    setCustomTags((prevTags) => prevTags.filter((tag) => tag !== tagToRemove));
  };
  const removeImage = (removeIndex) => {
    setSelectedImages((prevImages) => {
      const nextImages = prevImages.filter((_, index) => index !== removeIndex);
      setPreviewIndex((prev) => Math.min(prev, Math.max(0, nextImages.length - 1)));
      return nextImages;
    });
  };
  const safePreviewIndex = selectedImages.length > 0 ? Math.min(previewIndex, selectedImages.length - 1) : 0;

  if (isSpotUploadFlow) {
    if (isInvalidSpotFlow) {
      return <div className="min-h-screen bg-gray-50 pb-20 lg:pb-4">
          <TopNav title="📸 게시글 작성" showBack />

          <div className="pt-14">
            <div className="max-w-7xl mx-auto px-4 py-10">
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
        <form onSubmit={handleSubmit} className="max-w-7xl mx-auto px-4 py-6">
          {
    /* Image Upload */
  }
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              사진 추가 ✨
            </label>
            <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden border-2 border-dashed" style={{
            borderColor: PP_COLORS.sage + "80",
            backgroundColor: `${PP_COLORS.cream}40`
          }}>
              {selectedImages.length === 0 ? <button
      type="button"
      onClick={() => setSelectedImages(mockImageUrls)}
      className="w-full h-full flex flex-col items-center justify-center transition-colors"
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = `${PP_COLORS.lime}20`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "transparent";
      }}
    >
                  <Upload className="w-12 h-12 text-gray-400 mb-2" />
                  <span className="text-gray-600 font-medium">📷 사진 업로드</span>
                  <span className="text-sm text-gray-500 mt-1">
                    최대 10장까지 선택할 수 있어요
                  </span>
                </button> : selectedImages.length >= 2 ? <div className="h-full relative p-1">
                    <div className="relative h-full rounded-lg overflow-hidden bg-gray-100">
                      <img
      src={selectedImages[safePreviewIndex]}
      alt=""
      className="w-full h-full object-cover"
    />
                      <button
      type="button"
      onClick={() => removeImage(safePreviewIndex)}
      className="absolute top-2 right-2 w-6 h-6 bg-black/60 text-white rounded-full flex items-center justify-center hover:bg-black/80 transition-colors"
    >
                        <X className="w-4 h-4" />
                      </button>
                      <button
      type="button"
      onClick={() => setPreviewIndex((prev) => prev === 0 ? selectedImages.length - 1 : prev - 1)}
      className="absolute top-1/2 left-2 -translate-y-1/2 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
      aria-label="이전 사진"
    >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
      type="button"
      onClick={() => setPreviewIndex((prev) => prev === selectedImages.length - 1 ? 0 : prev + 1)}
      className="absolute top-1/2 right-2 -translate-y-1/2 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
      aria-label="다음 사진"
    >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                        {selectedImages.map((_, index) => <button
      key={index}
      type="button"
      onClick={() => setPreviewIndex(index)}
      className={`w-2 h-2 rounded-full ${safePreviewIndex === index ? "bg-white" : "bg-white/50"}`}
      aria-label={`${index + 1}번 사진 보기`}
    />)}
                      </div>
                    </div>
                  </div> : <div className="h-full relative p-1">
                    <div className="relative h-full rounded-lg overflow-hidden bg-gray-100">
                      <img
      src={selectedImages[0]}
      alt=""
      className="w-full h-full object-cover"
    />
                      <button
      type="button"
      onClick={() => removeImage(0)}
      className="absolute top-2 right-2 w-6 h-6 bg-black/60 text-white rounded-full flex items-center justify-center hover:bg-black/80 transition-colors"
    >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>}
            </div>
            {selectedImages.length > 0 && <>
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
            <p className="text-xs text-gray-500 mb-3">내 취향 태그를 먼저 선택하고, 필요한 태그는 직접 추가할 수 있어요.</p>
            <div className="mb-3">
              <p className="text-xs font-medium text-gray-600 mb-2">내 취향 태그</p>
              <div className="flex flex-wrap gap-2">
                {preferenceTags.map((tag) => <Badge
      key={tag}
      variant={selectedTags.includes(tag) ? "default" : "outline"}
      className="cursor-pointer transition-all"
      style={selectedTags.includes(tag) ? {
        backgroundColor: PP_COLORS.sage,
        color: "white"
      } : {}}
      onClick={() => {
        toggleTag(tag);
        if (errors.tags) setErrors({ ...errors, tags: "" });
      }}
    >
                    #{tag}
                  </Badge>)}
              </div>
            </div>
            <div className="mb-4">
              <p className="text-xs font-medium text-gray-600 mb-2">추천 태그</p>
              <div className="flex flex-wrap gap-2">
                {defaultTags.filter((tag) => !preferenceTags.includes(tag)).map((tag) => <Badge
    key={tag}
    variant={selectedTags.includes(tag) ? "default" : "outline"}
    className="cursor-pointer transition-all"
    style={selectedTags.includes(tag) ? {
      backgroundColor: PP_COLORS.sage,
      color: "white"
    } : {}}
    onClick={() => {
      toggleTag(tag);
      if (errors.tags) setErrors({ ...errors, tags: "" });
    }}
  >
                  #{tag}
                </Badge>)}
              </div>
            </div>
            <div className="flex gap-2 mb-3">
              <Input
    value={customTagInput}
    onChange={(e) => {
      setCustomTagInput(e.target.value);
      if (errors.tags) setErrors({ ...errors, tags: "" });
    }}
    placeholder="새 태그 입력 후 추가 (예: 필름감성)"
    onKeyDown={(e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        addCustomTag();
      }
    }}
  />
              <Button type="button" variant="outline" onClick={addCustomTag}>추가</Button>
            </div>
            {selectedTags.length > 0 && <div>
                <p className="text-xs font-medium text-gray-600 mb-2">선택된 태그</p>
                <div className="flex flex-wrap gap-2">
                  {selectedTags.map((tag) => <Badge key={tag} className="text-white" style={{ backgroundColor: PP_COLORS.sage }}>
                      #{tag}
                      <button
      type="button"
      className="ml-1.5 inline-flex"
      onClick={() => removeTag(tag)}
      aria-label={`${tag} 태그 제거`}
    >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>)}
                </div>
              </div>}
            {customTags.length > 0 && <p className="text-xs text-gray-500 mt-2">직접 추가한 태그 {customTags.length}개가 포함되어 있어요.</p>}
            {errors.tags && <p className="text-xs text-red-500 mt-2">{errors.tags}</p>}
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
