import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { TopNav } from "../components/TopNav";
import { BottomNav } from "../components/BottomNav";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { mockMeetups, mockSpots } from "../data/mockData";
import { PP_COLORS, ppGradientStyle } from "../utils/ppStyles";

const DEFAULT_NOTICE_TEXT = [
  "모임 시간 10분 전까지 도착해주세요",
  "촬영 장비는 개인이 준비해주세요",
  "날씨가 좋지 않을 경우 모임이 취소될 수 있습니다",
  "참여 후 24시간 전까지 취소 가능합니다"
].join("\n");

function EditMeetupPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const meetup = useMemo(() => {
    const baseMeetup = mockMeetups.find((item) => item.id === id);
    if (!baseMeetup) return null;
    try {
      const editedMeetups = JSON.parse(localStorage.getItem("edited_meetups") || "{}");
      return editedMeetups[id] || baseMeetup;
    } catch {
      return baseMeetup;
    }
  }, [id]);

  const [title, setTitle] = useState(meetup?.title || "");
  const [description, setDescription] = useState(meetup?.description || "");
  const [spotId, setSpotId] = useState(meetup?.spotId || "");
  const [date, setDate] = useState(meetup?.date || "");
  const [time, setTime] = useState(meetup?.time || "");
  const [maxParticipants, setMaxParticipants] = useState(String(meetup?.maxParticipants || 6));
  const [tagsText, setTagsText] = useState((meetup?.tags || []).join(", "));
  const [noticeText, setNoticeText] = useState(meetup?.noticeText || DEFAULT_NOTICE_TEXT);
  const [errorMessage, setErrorMessage] = useState("");

  if (!meetup) {
    return <div className="min-h-screen bg-gray-50 pb-20 lg:pb-4">
        <TopNav title="모임 수정" showBack />
        <div className="pt-14">
          <div className="max-w-7xl mx-auto px-4 py-10">
            <div className="bg-white rounded-2xl shadow-sm p-6 text-center">
              <h2 className="text-lg font-bold text-gray-900 mb-2">모임 정보를 찾을 수 없습니다</h2>
              <p className="text-sm text-gray-600 mb-5">존재하지 않거나 접근할 수 없는 모임입니다.</p>
              <Button style={ppGradientStyle} onClick={() => navigate("/meetups")}>모임 목록으로 이동</Button>
            </div>
          </div>
        </div>
        <BottomNav />
      </div>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim() || !spotId || !date || !time || !maxParticipants) {
      setErrorMessage("필수 항목을 모두 입력해주세요.");
      return;
    }

    if (Number(maxParticipants) < meetup.currentParticipants) {
      setErrorMessage(`최대 인원은 현재 참가자 수(${meetup.currentParticipants}명)보다 작을 수 없어요.`);
      return;
    }

    const updatedMeetup = {
      ...meetup,
      title: title.trim(),
      description: description.trim(),
      spotId,
      spotName: mockSpots.find((spot) => spot.id === spotId)?.name || meetup.spotName,
      date,
      time,
      maxParticipants: Number(maxParticipants),
      tags: tagsText.split(",").map((tag) => tag.trim()).filter(Boolean),
      noticeText: noticeText.trim() || DEFAULT_NOTICE_TEXT
    };

    const storedEdits = JSON.parse(localStorage.getItem("edited_meetups") || "{}");
    storedEdits[meetup.id] = updatedMeetup;
    localStorage.setItem("edited_meetups", JSON.stringify(storedEdits));

    navigate(`/meetup/${meetup.id}/manage`);
  };

  return <div className="min-h-screen bg-gray-50 pb-20 lg:pb-4">
      <TopNav title="모임 수정" showBack />

      <div className="pt-14">
        <form onSubmit={handleSubmit} className="max-w-7xl mx-auto px-4 py-6 space-y-5">
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
                <Input type="number" min={meetup.currentParticipants} value={maxParticipants} onChange={(e) => {
                setMaxParticipants(e.target.value);
                setErrorMessage("");
              }} required />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">태그 (쉼표로 구분)</label>
              <Input value={tagsText} onChange={(e) => {
              setTagsText(e.target.value);
              setErrorMessage("");
            }} placeholder="노을, 한강, 초보환영" />
              <div className="flex flex-wrap gap-2 mt-2">
                {tagsText.split(",").map((tag) => tag.trim()).filter(Boolean).map((tag) => <Badge key={tag} variant="secondary">#{tag}</Badge>)}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">안내사항</label>
              <textarea
                value={noticeText}
                onChange={(e) => {
                  setNoticeText(e.target.value);
                  setErrorMessage("");
                }}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 resize-none"
                rows={5}
                placeholder="줄바꿈으로 항목을 구분해 입력해주세요"
              />
              <p className="text-xs text-gray-500 mt-2">줄바꿈으로 입력하면 상세 화면에서 목록으로 표시됩니다.</p>
            </div>
          </div>

          {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}

          <div className="flex gap-3 sticky bottom-20 lg:bottom-4">
            <Button type="button" variant="outline" className="flex-1" onClick={() => navigate(-1)}>취소</Button>
            <Button type="submit" className="flex-1" style={ppGradientStyle}>저장하기</Button>
          </div>
        </form>
      </div>

      <BottomNav />
    </div>;
}

export {
  EditMeetupPage
};
