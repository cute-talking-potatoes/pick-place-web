import { useMemo, useState } from "react";
import { useParams, Link } from "react-router";
import { TopNav } from "../components/TopNav";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { mockMeetups } from "../data/mockData";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Share2,
  MessageSquare,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { PP_COLORS, ppGradientStyle } from "../utils/ppStyles";

const DEFAULT_NOTICE_LINES = [
  "모임 시간 10분 전까지 도착해주세요",
  "촬영 장비는 개인이 준비해주세요",
  "날씨가 좋지 않을 경우 모임이 취소될 수 있습니다",
  "참여 후 24시간 전까지 취소 가능합니다"
];

function MeetupDetailPage() {
  const { id } = useParams();
  const meetup = useMemo(() => {
    const baseMeetup = mockMeetups.find((m) => m.id === id);
    if (!baseMeetup) return null;
    try {
      const editedMeetups = JSON.parse(localStorage.getItem("edited_meetups") || "{}");
      return editedMeetups[id] || baseMeetup;
    } catch {
      return baseMeetup;
    }
  }, [id]);
  const [isJoined, setIsJoined] = useState(meetup?.isJoined || false);
  if (!meetup) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">모임을 찾을 수 없습니다</h2>
          <Link to="/community">
            <Button>커뮤니티로 돌아가기</Button>
          </Link>
        </div>
      </div>;
  }
  const handleJoinToggle = () => {
    setIsJoined(!isJoined);
  };
  const isHost = meetup.hostId === "1";
  const isFull = meetup.currentParticipants >= meetup.maxParticipants;
  const noticeLines = (meetup.noticeText ? meetup.noticeText.split("\n").map((line) => line.trim()).filter(Boolean) : DEFAULT_NOTICE_LINES);
  return <div className="min-h-screen bg-gray-50 pb-6">
      <TopNav showBack />

      <div className="pt-14">
        <div className="max-w-4xl mx-auto">
          {
    /* Cover Image */
  }
          <div className="relative h-64 bg-gray-200">
            <img
    src={meetup.image}
    alt={meetup.title}
    className="w-full h-full object-cover"
  />
            {isFull && !isJoined && <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <Badge className="text-lg px-4 py-2" style={{ backgroundColor: PP_COLORS.sage }}>
                  ✨ 모집 완료
                </Badge>
              </div>}
          </div>

          <div className="px-4 py-6 space-y-6">
            {
    /* Header */
  }
            <div>
              <div className="flex items-start gap-3 mb-3">
                <Avatar>
                  <AvatarImage src={meetup.hostAvatar} />
                  <AvatarFallback>{meetup.hostName[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Link
    to={`/spot/${meetup.spotId}`}
    className="hover:underline flex items-center gap-1"
    style={{ color: PP_COLORS.sage }}
  >
                    <MapPin className="w-4 h-4" />
                    📍 {meetup.spotName}
                  </Link>
                  <div className="text-sm text-gray-600">모임장: {meetup.hostName}</div>
                </div>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                {meetup.title}
              </h1>
            </div>

            {
    /* Date & Time */
  }
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-3 p-3 rounded-xl" style={{ backgroundColor: `${PP_COLORS.cream}40` }}>
                  <Calendar className="w-5 h-5" style={{ color: PP_COLORS.sage }} />
                  <div>
                    <div className="text-xs text-gray-600">날짜</div>
                    <div className="font-medium">{meetup.date}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl" style={{ backgroundColor: `${PP_COLORS.cream}40` }}>
                  <Clock className="w-5 h-5" style={{ color: PP_COLORS.sage }} />
                  <div>
                    <div className="text-xs text-gray-600">시간</div>
                    <div className="font-medium">{meetup.time}</div>
                  </div>
                </div>
              </div>

              {
    /* Participants Count */
  }
              <div className="flex items-center justify-between p-4 rounded-xl" style={{ background: `linear-gradient(90deg, ${PP_COLORS.cream}40, ${PP_COLORS.lime}30)` }}>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" style={{ color: PP_COLORS.sage }} />
                  <span className="font-medium">참여 인원</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold" style={{ color: PP_COLORS.sage }}>
                    {meetup.currentParticipants}
                  </span>
                  <span className="text-gray-600">/ {meetup.maxParticipants}명</span>
                </div>
              </div>
            </div>

            {
    /* Description */
  }
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-lg mb-3">📝 모임 소개</h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {meetup.description}
              </p>
            </div>

            {
    /* Participants */
  }
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-lg mb-4">
                👥 참여자 ({meetup.currentParticipants}명)
              </h3>
              <div className="space-y-3">
                {meetup.participants.map((participant) => <div
    key={participant.id}
    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
  >
                    <Avatar>
                      <AvatarImage src={participant.avatar} />
                      <AvatarFallback>{participant.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-medium">{participant.name}</div>
                      {participant.id === meetup.hostId && <div className="text-xs" style={{ color: PP_COLORS.sage }}>
                          ✨ 모임장
                        </div>}
                    </div>
                  </div>)}
              </div>
            </div>

            {
    /* Notice */
  }
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-lg mb-3">⚠️ 안내사항</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                {noticeLines.map((line) => <li key={line} className="flex items-start gap-2">
                    <span style={{ color: PP_COLORS.sage }}>•</span>
                    <span>{line}</span>
                  </li>)}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {
    /* Action Buttons */
  }
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="max-w-4xl mx-auto flex gap-3">
          {!isHost && <>
              <Button variant="outline" className="flex-1">
                <Share2 className="w-4 h-4 mr-2" />
                공유하기
              </Button>
              <Button
    className="flex-1"
    style={isJoined ? {} : ppGradientStyle}
    onClick={handleJoinToggle}
    disabled={isFull}
  >
                {isJoined ? <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    ✅ 참여 중
                  </> : isFull ? <>
                    <AlertCircle className="w-4 h-4 mr-2" />
                    마감
                  </> : <>
                    <Users className="w-4 h-4 mr-2" />
                    🎯 참여하기
                  </>}
              </Button>
              {isJoined && <Link to={`/chat/${meetup.id}`}>
                  <Button style={{ backgroundColor: PP_COLORS.sage, color: "white" }}>
                    <MessageSquare className="w-4 h-4 mr-2" />
                    💬 채팅
                  </Button>
                </Link>}
            </>}
          {isHost && <>
              <Link to={`/chat/${meetup.id}`} className="flex-1">
                <Button className="w-full" variant="outline">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  채팅방
                </Button>
              </Link>
              <Link to={`/meetup/${meetup.id}/manage`} className="flex-1">
                <Button className="w-full" style={ppGradientStyle}>
                  ⚙️ 모임 관리
                </Button>
              </Link>
            </>}
        </div>
      </div>
    </div>;
}
export {
  MeetupDetailPage
};
