import { useState } from "react";
import { useNavigate } from "react-router";
import { TopNav } from "../components/TopNav";
import { BottomNav } from "../components/BottomNav";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { mockSpots } from "../data/mockData";
import { ppGradientStyle } from "../utils/ppStyles";

const DEFAULT_NOTICE_TEXT = [
  "모임 시간 10분 전까지 도착해주세요",
  "촬영 장비는 개인이 준비해주세요",
  "날씨가 좋지 않을 경우 모임이 취소될 수 있습니다",
  "참여 후 24시간 전까지 취소 가능합니다"
].join("\n");

function CreateMeetupPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [spotId, setSpotId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [maxParticipants, setMaxParticipants] = useState("6");
  const [tagsText, setTagsText] = useState("");
  const [noticeText, setNoticeText] = useState(DEFAULT_NOTICE_TEXT);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim() || !spotId || !date || !time || !maxParticipants) {
      setErrorMessage("필수 항목을 모두 입력해주세요.");
      return;
    }

    const selectedSpot = mockSpots.find((spot) => spot.id === spotId);
    const newMeetup = {
      id: `created-${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      spotId,
      spotName: selectedSpot?.name || "",
      hostId: "1",
      hostName: "김포토",
      hostAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop",
      date,
      time,
      maxParticipants: Number(maxParticipants),
      currentParticipants: 1,
      participants: [
        {
          id: "1",
          name: "김포토",
          avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop"
        }
      ],
      image: selectedSpot?.images?.[0] || "",
      tags: tagsText.split(",").map((tag) => tag.trim()).filter(Boolean),
      noticeText: noticeText.trim() || DEFAULT_NOTICE_TEXT,
      isJoined: true,
      createdAt: "방금 전"
    };

    const stored = JSON.parse(localStorage.getItem("created_meetups") || "[]");
    localStorage.setItem("created_meetups", JSON.stringify([newMeetup, ...stored]));
    navigate("/meetups?tab=all");
  };

  return <div className="min-h-screen bg-gray-50 pb-20 lg:pb-4">
      <TopNav title="✨ 새 모임 만들기" showBack />

      <div className="pt-14">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto px-4 py-6 space-y-5">
          <div className="bg-white rounded-2xl shadow-sm p-5 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">모임 제목</label>
              <Input value={title} onChange={(e) => {
              setTitle(e.target.value);
              setErrorMessage("");
            }} required />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">모임 설명</label>
              <textarea
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  setErrorMessage("");
                }}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 resize-none"
                rows={4}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">촬영 스팟</label>
              <select
                value={spotId}
                onChange={(e) => {
                  setSpotId(e.target.value);
                  setErrorMessage("");
                }}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2"
                required
              >
                <option value="">스팟을 선택해주세요</option>
                {mockSpots.map((spot) => <option key={spot.id} value={spot.id}>
                    {spot.name}
                  </option>)}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">날짜</label>
                <Input type="date" value={date} onChange={(e) => {
                setDate(e.target.value);
                setErrorMessage("");
              }} required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">시간</label>
                <Input type="time" value={time} onChange={(e) => {
                setTime(e.target.value);
                setErrorMessage("");
              }} required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">최대 인원</label>
                <Input type="number" min="2" value={maxParticipants} onChange={(e) => {
                setMaxParticipants(e.target.value);
                setErrorMessage("");
              }} required />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">태그 (쉼표로 구분)</label>
              <Input value={tagsText} onChange={(e) => setTagsText(e.target.value)} placeholder="노을, 한강, 초보환영" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">안내사항</label>
              <textarea
                value={noticeText}
                onChange={(e) => setNoticeText(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 resize-none"
                rows={5}
              />
            </div>
          </div>

          {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}

          <div className="flex gap-3 sticky bottom-20 lg:bottom-4">
            <Button type="button" variant="outline" className="flex-1" onClick={() => navigate(-1)}>취소</Button>
            <Button type="submit" className="flex-1" style={ppGradientStyle}>모임 생성하기</Button>
          </div>
        </form>
      </div>

      <BottomNav />
    </div>;
}

export {
  CreateMeetupPage
};
