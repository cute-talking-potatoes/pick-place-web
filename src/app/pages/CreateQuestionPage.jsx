import { useState } from "react";
import { useNavigate } from "react-router";
import { TopNav } from "../components/TopNav";
import { BottomNav } from "../components/BottomNav";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { ppGradientStyle } from "../utils/ppStyles";

function CreateQuestionPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tagsText, setTagsText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setErrorMessage("제목과 내용을 입력해주세요.");
      return;
    }

    const newQuestion = {
      id: `q-${Date.now()}`,
      title: title.trim(),
      content: content.trim(),
      tags: tagsText.split(",").map((tag) => tag.trim()).filter(Boolean),
      userName: "김포토",
      createdAt: "방금 전",
      comments: 0
    };

    const savedQuestions = JSON.parse(localStorage.getItem("community_questions") || "[]");
    localStorage.setItem("community_questions", JSON.stringify([newQuestion, ...savedQuestions]));
    navigate("/community?tab=question");
  };

  return <div className="min-h-screen bg-gray-50 pb-20 lg:pb-4">
      <TopNav title="새 질문 작성" showBack />

      <div className="pt-14">
        <form onSubmit={handleSubmit} className="max-w-7xl mx-auto px-4 py-6 space-y-4">
          <div className="bg-white rounded-2xl shadow-sm p-5 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">질문 제목</label>
              <Input
    value={title}
    onChange={(e) => {
      setTitle(e.target.value);
      if (errorMessage) setErrorMessage("");
    }}
    placeholder="무엇이 궁금한가요?"
  />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">질문 내용</label>
              <textarea
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                  if (errorMessage) setErrorMessage("");
                }}
                placeholder="상황을 자세히 설명해주면 더 좋은 답변을 받을 수 있어요."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2"
                rows={8}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">태그 (쉼표로 구분)</label>
              <Input
    value={tagsText}
    onChange={(e) => setTagsText(e.target.value)}
    placeholder="야경, 카메라설정, 보정"
  />
            </div>
          </div>

          {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}

          <div className="flex gap-3 sticky bottom-20 lg:bottom-4">
            <Button type="button" variant="outline" className="flex-1" onClick={() => navigate(-1)}>취소</Button>
            <Button type="submit" className="flex-1" style={ppGradientStyle}>질문 등록</Button>
          </div>
        </form>
      </div>

      <BottomNav />
    </div>;
}

export {
  CreateQuestionPage
};
