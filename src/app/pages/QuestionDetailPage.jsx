import { useMemo, useState } from "react";
import { Link, useParams } from "react-router";
import { TopNav } from "../components/TopNav";
import { BottomNav } from "../components/BottomNav";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { mockQuestionComments, mockQuestions } from "../data/communityData";
import { PP_COLORS } from "../utils/ppStyles";

function QuestionDetailPage() {
  const { id } = useParams();
  const storedQuestions = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("community_questions") || "[]");
    } catch {
      return [];
    }
  }, []);
  const question = useMemo(() => [...storedQuestions, ...mockQuestions].find((item) => item.id === id) || null, [id, storedQuestions]);
  const [commentText, setCommentText] = useState("");
  const [replyTargetId, setReplyTargetId] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [comments, setComments] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(`community_question_comments_${id}`) || "null");
      if (Array.isArray(saved)) return saved;
    } catch {
      // Keep default mock comments on parse errors.
    }
    return mockQuestionComments[id] || [];
  });

  const handleAddComment = () => {
    if (!commentText.trim()) return;
    const newComment = {
      id: `qc-${Date.now()}`,
      userName: "김포토",
      content: commentText.trim(),
      createdAt: "방금 전",
      replies: []
    };
    const nextComments = [newComment, ...comments];
    setComments(nextComments);
    localStorage.setItem(`community_question_comments_${id}`, JSON.stringify(nextComments));
    setCommentText("");
  };
  const handleAddReply = (commentId) => {
    if (!replyText.trim()) return;
    const nextComments = comments.map((comment) => {
      if (comment.id !== commentId) return comment;
      const nextReplies = [...(comment.replies || []), {
        id: `qcr-${Date.now()}`,
        userName: "김포토",
        content: replyText.trim(),
        createdAt: "방금 전"
      }];
      return { ...comment, replies: nextReplies };
    });
    setComments(nextComments);
    localStorage.setItem(`community_question_comments_${id}`, JSON.stringify(nextComments));
    setReplyText("");
    setReplyTargetId(null);
  };

  if (!question) {
    return <div className="min-h-screen bg-gray-50 pb-20 lg:pb-4">
        <TopNav title="질문 상세" showBack />
        <div className="pt-14">
          <div className="max-w-7xl mx-auto px-4 py-10 text-center">
            <p className="text-gray-600 mb-4">질문을 찾을 수 없습니다.</p>
            <Link to="/community?tab=question">
              <Button>질문 목록으로 돌아가기</Button>
            </Link>
          </div>
        </div>
        <BottomNav />
      </div>;
  }

  return <div className="min-h-screen bg-gray-50 pb-32 lg:pb-24">
      <TopNav title="질문 상세" showBack />

      <div className="pt-14">
        <div className="max-w-7xl mx-auto px-4 py-6 space-y-4">
          <div className="bg-white rounded-2xl shadow-sm p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">{question.userName}</span>
              <span className="text-xs text-gray-500">{question.createdAt}</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900 mb-3">{question.title}</h1>
            <p className="text-gray-700 leading-relaxed mb-3">{question.content}</p>
            <div className="flex flex-wrap gap-2">
              {(question.tags || []).map((tag) => <Badge key={tag} variant="secondary" className="text-xs">#{tag}</Badge>)}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-5">
            <h2 className="font-semibold text-gray-900 mb-3">댓글 {comments.length}개</h2>
            <div className="space-y-3 mb-4">
              {comments.length === 0 && <p className="text-sm text-gray-500">아직 댓글이 없습니다.</p>}
              {comments.map((comment) => <div key={comment.id} className="flex items-start gap-3">
                  <Avatar className="w-9 h-9">
                    <AvatarFallback>{comment.userName[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="bg-gray-50 rounded-2xl p-3">
                      <div className="font-medium text-sm mb-1 text-gray-900">{comment.userName}</div>
                      <p className="text-sm text-gray-700">{comment.content}</p>
                    </div>
                    <div className="mt-2 flex items-center gap-3">
                      <div className="text-xs text-gray-500">{comment.createdAt}</div>
                      <button
                        type="button"
                        className="text-xs hover:underline"
                        style={{ color: PP_COLORS.sage }}
                        onClick={() => setReplyTargetId((prev) => prev === comment.id ? null : comment.id)}
                      >
                        답글 달기
                      </button>
                    </div>
                    {(comment.replies || []).length > 0 && <div className="mt-3 space-y-2 pl-3 border-l border-gray-200">
                        {comment.replies.map((reply) => <div key={reply.id} className="bg-gray-50 rounded-xl p-3">
                            <div className="font-medium text-xs text-gray-900 mb-1">{reply.userName}</div>
                            <p className="text-sm text-gray-700">{reply.content}</p>
                            <div className="text-xs text-gray-500 mt-1">{reply.createdAt}</div>
                          </div>)}
                      </div>}
                    {replyTargetId === comment.id && <div className="mt-3 flex gap-2">
                        <Input value={replyText} onChange={(e) => setReplyText(e.target.value)} placeholder="↪ 답글을 입력하세요..." />
                        <Button onClick={() => handleAddReply(comment.id)} disabled={!replyText.trim()} style={{ backgroundColor: PP_COLORS.sage, color: "white" }}>
                          답글
                        </Button>
                      </div>}
                  </div>
                </div>)}
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-16 lg:bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="max-w-7xl mx-auto flex gap-2">
          <Input value={commentText} onChange={(e) => setCommentText(e.target.value)} placeholder="💬 댓글을 입력하세요..." />
          <Button onClick={handleAddComment} style={{ backgroundColor: PP_COLORS.sage, color: "white" }} disabled={!commentText.trim()}>
            등록
          </Button>
        </div>
      </div>

      <BottomNav />
    </div>;
}

export {
  QuestionDetailPage
};
