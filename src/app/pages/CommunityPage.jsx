import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { BottomNav } from "../components/BottomNav";
import { TopNav } from "../components/TopNav";
import { CommunityModeTabs } from "../components/CommunityModeTabs";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { mockPosts } from "../data/mockData";
import { Plus, Heart, MessageCircle, Bookmark, Share2, MapPin, Calendar, Users, ChevronLeft, ChevronRight } from "lucide-react";
import { PP_COLORS, ppGradientStyle } from "../utils/ppStyles";
function CommunityPage() {
  const navigate = useNavigate();
  const [imageIndexes, setImageIndexes] = useState({});
  const touchStartXRef = useRef({});
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
          <CommunityModeTabs activeTab="feed" />
              {
    /* Create Button */
  }
              <Button className="w-full mb-6" style={ppGradientStyle} onClick={handleCreatePost}>
                <Plus className="w-5 h-5 mr-2" />
                📸 새 게시글 작성
              </Button>

              {
    /* Posts */
  }
              <div className="space-y-4">
                {mockPosts.map((post) => <div key={post.id} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
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
                  </div>)}
              </div>
        </div>
      </div>

      <BottomNav />
    </div>;
}
export {
  CommunityPage
};
