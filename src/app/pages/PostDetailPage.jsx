import { useState } from "react";
import { useParams, Link } from "react-router";
import { TopNav } from "../components/TopNav";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { mockPosts, mockComments } from "../data/mockData";
import { Heart, MessageCircle, Bookmark, Share2, Send, MoreVertical } from "lucide-react";
import { PP_COLORS } from "../utils/ppStyles";
function PostDetailPage() {
  const { id } = useParams();
  const post = mockPosts.find((p) => p.id === id);
  const [isLiked, setIsLiked] = useState(post?.isLiked || false);
  const [likes, setLikes] = useState(post?.likes || 0);
  const [comment, setComment] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const [showImageIndex, setShowImageIndex] = useState(0);
  if (!post) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">게시글을 찾을 수 없습니다</h2>
          <Link to="/community">
            <Button>커뮤니티로 돌아가기</Button>
          </Link>
        </div>
      </div>;
  }
  const postComments = mockComments.filter((c) => c.postId === post.id);
  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };
  const handleComment = () => {
    if (comment.trim()) {
      setComment("");
      setReplyTo(null);
    }
  };
  return <div className="min-h-screen bg-gray-50 pb-24">
      <TopNav showBack />

      <div className="pt-14">
        <div className="max-w-4xl mx-auto bg-white lg:rounded-2xl lg:shadow-sm lg:my-6">
          {
    /* Post Header */
  }
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={post.userAvatar} />
                <AvatarFallback>{post.userName[0]}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium text-gray-900">{post.userName}</div>
                <Link
    to={`/spot/${post.spotId}`}
    className="text-sm hover:underline"
    style={{ color: PP_COLORS.sage }}
  >
                  📍 {post.spotName}
                </Link>
              </div>
            </div>
            <Button variant="ghost" size="icon">
              <MoreVertical className="w-5 h-5" />
            </Button>
          </div>

          {
    /* Images */
  }
          <div className="relative">
            <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
              <img
    src={post.images[showImageIndex]}
    alt=""
    className="w-full h-full object-cover"
  />
            </div>
            {post.images.length > 1 && <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {post.images.map((_, index) => <button
    key={index}
    onClick={() => setShowImageIndex(index)}
    className={`w-2 h-2 rounded-full transition-all ${showImageIndex === index ? "w-6" : "bg-white/60"}`}
    style={showImageIndex === index ? { backgroundColor: PP_COLORS.sage } : {}}
  />)}
              </div>}
          </div>

          {
    /* Content */
  }
          <div className="p-4">
            <div className="mb-4">
              <p className="text-gray-900 leading-relaxed">{post.content}</p>
              <div className="text-sm text-gray-500 mt-2">{post.createdAt}</div>
              {post.visitedDate && <div className="text-sm text-gray-500 mt-1">📅 방문 일자: {post.visitedDate}</div>}
            </div>

            {
    /* Actions */
  }
            <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
              <button
    onClick={handleLike}
    className="flex items-center gap-2 transition-colors"
    style={{ color: isLiked ? PP_COLORS.sage : "inherit" }}
    onMouseEnter={(e) => {
      if (!isLiked) e.currentTarget.style.color = PP_COLORS.sage;
    }}
    onMouseLeave={(e) => {
      if (!isLiked) e.currentTarget.style.color = "inherit";
    }}
  >
                <Heart
    className={`w-6 h-6`}
    fill={isLiked ? PP_COLORS.sage : "none"}
  />
                <span className="font-medium">{likes}</span>
              </button>
              <button
    className="flex items-center gap-2 transition-colors hover:text-[#A5C89E]"
  >
                <MessageCircle className="w-6 h-6" />
                <span className="font-medium">{post.comments}</span>
              </button>
              <button className="ml-auto transition-colors hover:text-[#A5C89E]">
                <Bookmark className="w-6 h-6" />
              </button>
              <button className="transition-colors hover:text-[#A5C89E]">
                <Share2 className="w-6 h-6" />
              </button>
            </div>

            {
    /* Comments Section */
  }
            <div className="pt-4">
              <h3 className="font-bold text-lg mb-4">💬 댓글 {postComments.length}개</h3>
              <div className="space-y-4">
                {postComments.map((c) => <div key={c.id} className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Avatar className="w-9 h-9">
                        <AvatarImage src={c.userAvatar} />
                        <AvatarFallback>{c.userName[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="bg-gray-50 rounded-2xl p-3">
                          <div className="font-medium text-sm mb-1">{c.userName}</div>
                          <p className="text-gray-700 text-sm">{c.content}</p>
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                          <span>{c.createdAt}</span>
                          <button
    style={{ color: c.isLiked ? PP_COLORS.sage : "inherit" }}
    onMouseEnter={(e) => e.currentTarget.style.color = PP_COLORS.sage}
    onMouseLeave={(e) => {
      if (!c.isLiked) e.currentTarget.style.color = "inherit";
    }}
  >
                            💚 {c.likes}
                          </button>
                          <button
    onClick={() => setReplyTo(c.id)}
    className="transition-colors"
    onMouseEnter={(e) => e.currentTarget.style.color = PP_COLORS.sage}
    onMouseLeave={(e) => e.currentTarget.style.color = "inherit"}
  >
                            답글 달기
                          </button>
                        </div>
                      </div>
                    </div>

                    {
    /* Replies */
  }
                    {c.replies && c.replies.length > 0 && <div className="ml-12 space-y-3">
                        {c.replies.map((reply) => <div key={reply.id} className="flex items-start gap-3">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={reply.userAvatar} />
                              <AvatarFallback>{reply.userName[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="bg-gray-50 rounded-2xl p-3">
                                <div className="font-medium text-sm mb-1">{reply.userName}</div>
                                <p className="text-gray-700 text-sm">{reply.content}</p>
                              </div>
                              <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                                <span>{reply.createdAt}</span>
                                <button
    style={{ color: reply.isLiked ? PP_COLORS.sage : "inherit" }}
    onMouseEnter={(e) => e.currentTarget.style.color = PP_COLORS.sage}
    onMouseLeave={(e) => {
      if (!reply.isLiked) e.currentTarget.style.color = "inherit";
    }}
  >
                                  💚 {reply.likes}
                                </button>
                              </div>
                            </div>
                          </div>)}
                      </div>}
                  </div>)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {
    /* Comment Input */
  }
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="max-w-4xl mx-auto">
          {replyTo && <div className="flex items-center justify-between mb-2 text-sm">
              <span className="text-gray-600">답글 작성 중...</span>
              <button
    onClick={() => setReplyTo(null)}
    style={{ color: PP_COLORS.sage }}
    onMouseEnter={(e) => e.currentTarget.style.color = PP_COLORS.olive}
    onMouseLeave={(e) => e.currentTarget.style.color = PP_COLORS.sage}
  >
                취소
              </button>
            </div>}
          <div className="flex gap-2">
            <Input
    value={comment}
    onChange={(e) => setComment(e.target.value)}
    placeholder="💬 댓글을 입력하세요..."
    className="flex-1"
    onKeyPress={(e) => {
      if (e.key === "Enter" && comment.trim()) {
        handleComment();
      }
    }}
  />
            <Button
    size="icon"
    style={{ backgroundColor: PP_COLORS.sage, color: "white" }}
    onClick={handleComment}
    disabled={!comment.trim()}
  >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>;
}
export {
  PostDetailPage
};
