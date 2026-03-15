import { useMemo, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { BottomNav } from "../components/BottomNav";
import { TopNav } from "../components/TopNav";
import { CommunityModeTabs } from "../components/CommunityModeTabs";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { mockPosts, mockSpots } from "../data/mockData";
import { mockNotices, mockQuestions } from "../data/communityData";
import { Plus, Heart, MessageCircle, Bookmark, Share2, MapPin, Calendar, Users, ChevronLeft, ChevronRight } from "lucide-react";
import { PP_COLORS, ppGradientStyle } from "../utils/ppStyles";
function CommunityPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const contentTab = searchParams.get("tab") === "question" ? "question" : "feed";
  const [imageIndexes, setImageIndexes] = useState({});
  const [selectedFilterTags, setSelectedFilterTags] = useState([]);
  const [selectedQuestionTags, setSelectedQuestionTags] = useState([]);
  const [questionSearch, setQuestionSearch] = useState("");
  const touchStartXRef = useRef({});
  const storedQuestions = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("community_questions") || "[]");
    } catch {
      return [];
    }
  }, []);
  const questions = useMemo(() => [...storedQuestions, ...mockQuestions], [storedQuestions]);
  const popularTags = useMemo(() => {
    const tagCountMap = mockPosts.reduce((acc, post) => {
      post.tags.forEach((tag) => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
      return acc;
    }, {});
    return Object.entries(tagCountMap).sort((a, b) => b[1] - a[1]).slice(0, 10).map(([tag]) => tag);
  }, []);
  const questionPopularTags = useMemo(() => {
    const tagCountMap = questions.reduce((acc, question) => {
      question.tags.forEach((tag) => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
      return acc;
    }, {});
    return Object.entries(tagCountMap).sort((a, b) => b[1] - a[1]).slice(0, 8).map(([tag]) => tag);
  }, [questions]);
  const popularSpots = useMemo(() => [...mockSpots].sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 5), []);
  const popularQuestions = useMemo(() => [...questions].sort((a, b) => b.comments - a.comments).slice(0, 5), [questions]);
  const filteredPosts = useMemo(() => {
    if (selectedFilterTags.length === 0) return mockPosts;
    return mockPosts.filter((post) => selectedFilterTags.some((tag) => post.tags.includes(tag)));
  }, [selectedFilterTags]);
  const filteredQuestions = useMemo(() => {
    const keyword = questionSearch.trim().toLowerCase();
    return questions.filter((question) => {
      const tagMatched = selectedQuestionTags.length === 0 || selectedQuestionTags.some((tag) => question.tags.includes(tag));
      if (!tagMatched) return false;
      if (!keyword) return true;
      const searchable = `${question.title} ${question.content} ${question.tags.join(" ")} ${question.userName}`.toLowerCase();
      return searchable.includes(keyword);
    });
  }, [questionSearch, questions, selectedQuestionTags]);
  const getImageIndex = (postId, imagesLength) => {
    if (imagesLength <= 1) return 0;
    const currentIndex = imageIndexes[postId] || 0;
    return Math.min(currentIndex, imagesLength - 1);
  };
  const goToImage = (postId, nextIndex) => {
    setImageIndexes((prev) => ({ ...prev, [postId]: nextIndex }));
  };
  const moveImage = (postId, imagesLength, direction) => {
    if (imagesLength <= 1) return;
    const current = getImageIndex(postId, imagesLength);
    const next = direction === "next" ? Math.min(current + 1, imagesLength - 1) : Math.max(current - 1, 0);
    goToImage(postId, next);
  };
  const toggleFilterTag = (tag) => {
    setSelectedFilterTags((prevTags) => prevTags.includes(tag) ? prevTags.filter((value) => value !== tag) : [...prevTags, tag]);
  };
  const toggleQuestionTag = (tag) => {
    setSelectedQuestionTags((prevTags) => prevTags.includes(tag) ? prevTags.filter((value) => value !== tag) : [...prevTags, tag]);
  };
  const handleCreatePost = () => navigate("/upload");
  return <div className="min-h-screen bg-gray-50 pb-20 lg:pb-4">
      <TopNav title="✨ 커뮤니티" />

      <div className="pt-14">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              특별한 순간을 공유해보세요! 📸
            </h1>
            <p className="text-gray-600">
              사람들에게 특별한 순간을 공유하세요
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-4 mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">커뮤니티 공지</p>
                    <h3 className="font-semibold text-gray-900">{mockNotices[0].title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{mockNotices[0].description}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2 shrink-0 ml-3">
                    <span className="text-xs text-gray-500">{mockNotices[0].createdAt}</span>
                    <Link to="/community/notices" className="text-xs hover:underline" style={{ color: PP_COLORS.sage }}>
                      공지 전체보기
                    </Link>
                  </div>
                </div>
              </div>
          <CommunityModeTabs activeTab={contentTab} />
              {
    /* Create Button */
  }
              {contentTab === "feed" && <Button className="w-full mb-6" style={ppGradientStyle} onClick={handleCreatePost}>
                  <Plus className="w-5 h-5 mr-2" />
                  📸 새 게시글 작성
                </Button>}
              {contentTab === "question" && <Link to="/community/questions/new">
                  <Button className="w-full mb-6" style={ppGradientStyle}>
                    <Plus className="w-5 h-5 mr-2" />
                    ❓ 새 질문 작성
                  </Button>
                </Link>}

              {contentTab === "feed" && <div className="mb-4 lg:hidden">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-700 font-medium">인기 태그</p>
                  {selectedFilterTags.length > 0 && <button
      type="button"
      className="text-xs text-gray-500 hover:text-gray-700"
      onClick={() => setSelectedFilterTags([])}
    >
                      초기화
                    </button>}
                </div>
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {popularTags.map((tag) => <button
    key={tag}
    type="button"
    className={`whitespace-nowrap px-3 py-1.5 rounded-full border text-xs transition-colors ${selectedFilterTags.includes(tag) ? "text-white border-transparent" : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"}`}
    style={selectedFilterTags.includes(tag) ? { backgroundColor: PP_COLORS.sage } : {}}
    onClick={() => toggleFilterTag(tag)}
  >
                      #{tag}
                    </button>)}
                </div>
              </div>}

              <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-6">
                {
    /* Posts */
  }
                <div className="space-y-4">
                  {contentTab === "feed" && (filteredPosts.length === 0 ? <div className="bg-white rounded-2xl shadow-sm p-8 text-center text-sm text-gray-600">
                      선택한 태그에 맞는 게시글이 없습니다.
                    </div> : filteredPosts.map((post) => <div key={post.id} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    {
    /* Post Header */
  }
                    <div className="p-4 border-b border-gray-100">
                      <div className="flex items-center gap-3 mb-3">
                        <Avatar>
                          <AvatarImage src={post.userAvatar} />
                          <AvatarFallback>{post.userName[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">{post.userName}</div>
                          <div className="text-sm text-gray-500">{post.createdAt}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-4 h-4" style={{ color: PP_COLORS.sage }} />
                        <Link
    to={`/spot/${post.spotId}`}
    className="text-sm hover:underline"
    style={{ color: PP_COLORS.sage }}
  >
                          📍 {post.spotName}
                        </Link>
                      </div>
                      {post.visitedDate && <div className="text-xs text-gray-500 mb-2">📅 방문 일자: {post.visitedDate}</div>}
                      <p className="text-gray-700 leading-relaxed">{post.content}</p>
                    </div>

                    {
    /* Post Images */
  }
                    <Link to={`/post/${post.id}`}>
                      <div
    className="relative bg-gray-100 aspect-square overflow-hidden"
    onTouchStart={(e) => {
      touchStartXRef.current[post.id] = e.changedTouches[0].clientX;
    }}
    onTouchEnd={(e) => {
      const startX = touchStartXRef.current[post.id];
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      if (Math.abs(diff) < 30) return;
      moveImage(post.id, post.images.length, diff > 0 ? "next" : "prev");
    }}
  >
                        <img
    src={post.images[getImageIndex(post.id, post.images.length)]}
    alt=""
    className="w-full h-full object-cover hover:scale-105 transition-transform"
  />
                        {post.images.length > 1 && getImageIndex(post.id, post.images.length) > 0 && <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        moveImage(post.id, post.images.length, "prev");
      }}
      className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/45 text-white rounded-full flex items-center justify-center hover:bg-black/60 transition-colors"
      aria-label="이전 사진"
    >
                              <ChevronLeft className="w-4 h-4" />
                            </button>}
                        {post.images.length > 1 && getImageIndex(post.id, post.images.length) < post.images.length - 1 && <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        moveImage(post.id, post.images.length, "next");
      }}
      className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/45 text-white rounded-full flex items-center justify-center hover:bg-black/60 transition-colors"
      aria-label="다음 사진"
    >
                              <ChevronRight className="w-4 h-4" />
                            </button>}
                        <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-black/45 text-white text-xs">
                          {getImageIndex(post.id, post.images.length) + 1}/{post.images.length}
                        </div>
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                          {post.images.map((_, index) => <button
      key={index}
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        goToImage(post.id, index);
      }}
      className={`w-2 h-2 rounded-full transition-colors ${getImageIndex(post.id, post.images.length) === index ? "bg-white" : "bg-white/55"}`}
      aria-label={`${index + 1}번째 이미지`}
    />)}
                        </div>
                      </div>
                    </Link>

                    {
    /* Post Actions */
  }
                    <div className="p-4">
                      <div className="flex items-center gap-4 mb-3">
                        <button
    className="flex items-center gap-2 transition-colors"
    style={{ color: post.isLiked ? PP_COLORS.sage : "inherit" }}
    onMouseEnter={(e) => {
      if (!post.isLiked) e.currentTarget.style.color = PP_COLORS.sage;
    }}
    onMouseLeave={(e) => {
      if (!post.isLiked) e.currentTarget.style.color = "inherit";
    }}
  >
                          <Heart
    className="w-6 h-6"
    fill={post.isLiked ? PP_COLORS.sage : "none"}
  />
                          <span className="font-medium">{post.likes}</span>
                        </button>
                        <Link
    to={`/post/${post.id}`}
    className="flex items-center gap-2 transition-colors hover:text-[#A5C89E]"
  >
                          <MessageCircle className="w-6 h-6" />
                          <span className="font-medium">{post.comments}</span>
                        </Link>
                        <button className="ml-auto transition-colors hover:text-[#A5C89E]">
                          <Bookmark className="w-6 h-6" />
                        </button>
                        <button className="transition-colors hover:text-[#A5C89E]">
                          <Share2 className="w-6 h-6" />
                        </button>
                      </div>

                      {
    /* Tags */
  }
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => <Badge key={tag} variant="secondary" className="text-xs">
                            #{tag}
                          </Badge>)}
                      </div>
                    </div>
                  </div>))}
                  {contentTab === "question" && <>
                      <div className="bg-white rounded-2xl shadow-sm p-4 space-y-4 lg:hidden">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">많은 사람들이 궁금해하는 태그</h3>
                          <p className="text-sm text-gray-600">관심 있는 질문을 빠르게 찾아보세요.</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {questionPopularTags.map((tag) => <button
      key={tag}
      type="button"
      className={`px-3 py-1.5 rounded-full border text-xs transition-colors ${selectedQuestionTags.includes(tag) ? "text-white border-transparent" : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"}`}
      style={selectedQuestionTags.includes(tag) ? { backgroundColor: PP_COLORS.sage } : {}}
      onClick={() => toggleQuestionTag(tag)}
    >
                              #{tag}
                            </button>)}
                        </div>
                        <Input
      value={questionSearch}
      onChange={(e) => setQuestionSearch(e.target.value)}
      placeholder="질문 검색 (예: 야경 ISO, 삼각대, 보정)"
    />
                      </div>
                      {filteredQuestions.length === 0 && <div className="bg-white rounded-2xl shadow-sm p-8 text-center text-sm text-gray-600">
                          조건에 맞는 질문이 없습니다.
                        </div>}
                      {filteredQuestions.map((question) => <Link key={question.id} to={`/community/questions/${question.id}`} className="block">
                          <div className="bg-white rounded-2xl shadow-sm p-5 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{question.title}</h3>
                        <span className="text-xs text-gray-500">{question.createdAt}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{question.content}</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {question.tags.map((tag) => <Badge key={tag} variant="secondary" className="text-xs">#{tag}</Badge>)}
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{question.userName}</span>
                        <span>답변 {question.comments}개</span>
                      </div>
                    </div>
                        </Link>)}
                    </>}
                </div>

                <aside className="hidden lg:block">
                  <div className="sticky top-20 space-y-4">
                    {contentTab === "feed" && <div className="bg-white rounded-2xl shadow-sm p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-base font-semibold text-gray-900">🔥 인기 태그</h3>
                        {selectedFilterTags.length > 0 && <button
      type="button"
      className="text-xs text-gray-500 hover:text-gray-700"
      onClick={() => setSelectedFilterTags([])}
    >
                            초기화
                          </button>}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {popularTags.map((tag) => <button
      key={tag}
      type="button"
      className={`px-3 py-1.5 rounded-full border text-xs transition-colors ${selectedFilterTags.includes(tag) ? "text-white border-transparent" : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"}`}
      style={selectedFilterTags.includes(tag) ? { backgroundColor: PP_COLORS.sage } : {}}
      onClick={() => toggleFilterTag(tag)}
    >
                            #{tag}
                          </button>)}
                      </div>
                    </div>}

                    {contentTab === "feed" && <div className="bg-white rounded-2xl shadow-sm p-4">
                      <h4 className="text-base font-semibold text-gray-900 mb-3">📍 인기 장소</h4>
                      <div className="space-y-2">
                        {popularSpots.map((spot) => <Link key={spot.id} to={`/spot/${spot.id}`} className="block">
                            <div className="rounded-xl border border-gray-100 px-3 py-2 hover:bg-gray-50 transition-colors">
                              <div className="text-sm font-medium text-gray-900 line-clamp-1">{spot.name}</div>
                              <div className="text-xs text-gray-500 mt-1">{spot.location.region} · {spot.reviewCount} 리뷰</div>
                            </div>
                          </Link>)}
                      </div>
                    </div>}

                    {contentTab === "question" && <div className="bg-white rounded-2xl shadow-sm p-4 space-y-4">
                        <div>
                          <h3 className="text-base font-semibold text-gray-900 mb-1">👀 많은 사람들이 궁금해하는 태그</h3>
                          <p className="text-sm text-gray-600">관심 있는 질문을 빠르게 찾아보세요.</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {questionPopularTags.map((tag) => <button
      key={tag}
      type="button"
      className={`px-3 py-1.5 rounded-full border text-xs transition-colors ${selectedQuestionTags.includes(tag) ? "text-white border-transparent" : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"}`}
      style={selectedQuestionTags.includes(tag) ? { backgroundColor: PP_COLORS.sage } : {}}
      onClick={() => toggleQuestionTag(tag)}
    >
                              #{tag}
                            </button>)}
                        </div>
                        <Input
      value={questionSearch}
      onChange={(e) => setQuestionSearch(e.target.value)}
      placeholder="질문 검색 (예: 야경 ISO, 삼각대, 보정)"
    />
                      </div>}

                    {contentTab === "question" && <div className="bg-white rounded-2xl shadow-sm p-4">
                      <h4 className="text-base font-semibold text-gray-900 mb-3">❓ 인기 질문</h4>
                      <div className="space-y-2">
                        {popularQuestions.map((question) => <Link key={question.id} to={`/community/questions/${question.id}`} className="block">
                            <div className="rounded-xl border border-gray-100 px-3 py-2 hover:bg-gray-50 transition-colors">
                            <div className="text-sm font-medium text-gray-900 line-clamp-1">{question.title}</div>
                            <div className="text-xs text-gray-500 mt-1">답변 {question.comments}개</div>
                          </div>
                          </Link>)}
                      </div>
                    </div>}
                  </div>
                </aside>
              </div>
            </div>
          </div>

      <BottomNav />
    </div>;
}
export {
  CommunityPage
};
