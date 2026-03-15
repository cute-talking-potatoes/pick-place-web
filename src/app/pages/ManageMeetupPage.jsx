import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { TopNav } from "../components/TopNav";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import { mockMeetups } from "../data/mockData";
import {
  Users,
  Calendar,
  MapPin,
  Clock,
  MessageSquare,
  UserPlus,
  UserMinus,
  Edit,
  Trash2,
  CheckCircle,
  XCircle
} from "lucide-react";
import { PP_COLORS, ppGradientStyle } from "../utils/ppStyles";
function ManageMeetupPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const meetup = useState(() => {
    const baseMeetup = mockMeetups.find((m) => m.id === id);
    if (!baseMeetup) return null;
    try {
      const editedMeetups = JSON.parse(localStorage.getItem("edited_meetups") || "{}");
      return editedMeetups[id] || baseMeetup;
    } catch {
      return baseMeetup;
    }
  })[0];
  const [pendingRequests, setPendingRequests] = useState([
    {
      id: "req1",
      userId: "5",
      name: "\uBC15\uC0AC\uC9C4",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      message: "\uD568\uAED8 \uCD2C\uC601\uD558\uACE0 \uC2F6\uC5B4\uC694! \uCD08\uBCF4\uC778\uB370 \uAD1C\uCC2E\uC744\uAE4C\uC694?",
      requestedAt: "2\uC2DC\uAC04 \uC804"
    },
    {
      id: "req2",
      userId: "6",
      name: "\uCD5C\uB80C\uC988",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      message: "\uC800\uB3C4 \uCC38\uC5EC\uD558\uACE0 \uC2F6\uC2B5\uB2C8\uB2E4!",
      requestedAt: "5\uC2DC\uAC04 \uC804"
    }
  ]);
  const handleApprove = (requestId) => {
    setPendingRequests((prev) => prev.filter((r) => r.id !== requestId));
  };
  const handleReject = (requestId) => {
    setPendingRequests((prev) => prev.filter((r) => r.id !== requestId));
  };
  const handleRemoveParticipant = () => {
    alert("\uCC38\uAC00\uC790\uB97C \uB0B4\uBCF4\uB0C8\uC2B5\uB2C8\uB2E4.");
  };
  const handleDeleteMeetup = () => {
    if (confirm("\uC815\uB9D0 \uC774 \uBAA8\uC784\uC744 \uC0AD\uC81C\uD558\uC2DC\uACA0\uC2B5\uB2C8\uAE4C? \uC774 \uC791\uC5C5\uC740 \uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.")) {
      navigate("/my-meetups");
    }
  };
  if (!meetup) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">모임을 찾을 수 없습니다.</p>
          <Button onClick={() => navigate("/my-meetups")}>
            내 모임으로 돌아가기
          </Button>
        </div>
      </div>;
  }
  return <div className="min-h-screen bg-gray-50 pb-6">
      <TopNav title="모임 관리" showBack />

      <div className="pt-14">
        <div className="max-w-4xl mx-auto px-4 py-6">
          {
    /* Meetup Info Card */
  }
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-4">
            <div className="relative h-48">
              <img
    src={meetup.image}
    alt={meetup.title}
    className="w-full h-full object-cover"
  />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h1 className="text-white text-xl font-bold mb-2">{meetup.title}</h1>
                <div className="flex items-center gap-2 text-white/90 text-sm">
                  <MapPin className="w-4 h-4" />
                  {meetup.spotName}
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2 text-gray-700">
                  <Calendar className="w-5 h-5" style={{ color: PP_COLORS.sage }} />
                  <span className="text-sm">{meetup.date}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Clock className="w-5 h-5" style={{ color: PP_COLORS.sage }} />
                  <span className="text-sm">{meetup.time}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5" style={{ color: PP_COLORS.olive }} />
                <span className="text-sm text-gray-700">
                  {meetup.currentParticipants} / {meetup.maxParticipants}명
                </span>
                <Badge
    variant="secondary"
    style={{
      backgroundColor: `${PP_COLORS.lime}40`,
      color: PP_COLORS.olive
    }}
  >
                  {meetup.currentParticipants >= meetup.maxParticipants ? "\uB9C8\uAC10" : "\uBAA8\uC9D1\uC911"}
                </Badge>
              </div>

              <div className="flex gap-2">
                <Link to={`/meetup/${meetup.id}/edit`} className="flex-1">
                  <Button variant="outline" className="w-full">
                    <Edit className="w-4 h-4 mr-2" />
                    모임 수정
                  </Button>
                </Link>
                <Button
    variant="outline"
    className="flex-1"
    onClick={() => navigate(`/chat/${meetup.id}`)}
  >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  단체 채팅
                </Button>
              </div>
            </div>
          </div>

          {
    /* Management Tabs */
  }
          <Tabs defaultValue="requests" className="mb-4">
            <TabsList className="w-full grid grid-cols-2 bg-white mb-4">
              <TabsTrigger value="requests">
                가입 신청 
                {pendingRequests.length > 0 && <Badge className="ml-2" variant="destructive">
                    {pendingRequests.length}
                  </Badge>}
              </TabsTrigger>
              <TabsTrigger value="participants">
                참가자 ({meetup.currentParticipants})
              </TabsTrigger>
            </TabsList>

            {
    /* Pending Requests */
  }
            <TabsContent value="requests">
              <div className="space-y-3">
                {pendingRequests.length === 0 ? <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
                    <UserPlus className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p className="text-gray-500">새로운 가입 신청이 없습니다</p>
                  </div> : pendingRequests.map((request) => <div
    key={request.id}
    className="bg-white rounded-2xl shadow-sm p-4"
  >
                      <div className="flex items-start gap-3 mb-3">
                        <Avatar>
                          <AvatarImage src={request.avatar} />
                          <AvatarFallback>{request.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">{request.name}</div>
                          <div className="text-sm text-gray-500">{request.requestedAt}</div>
                        </div>
                      </div>
                      
                      {request.message && <div className="bg-gray-50 rounded-lg p-3 mb-3 text-sm text-gray-700">
                          {request.message}
                        </div>}

                      <div className="flex gap-2">
                        <Button
    size="sm"
    className="flex-1"
    style={ppGradientStyle}
    onClick={() => handleApprove(request.id)}
  >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          승인
                        </Button>
                        <Button
    size="sm"
    variant="outline"
    className="flex-1"
    onClick={() => handleReject(request.id)}
  >
                          <XCircle className="w-4 h-4 mr-1" />
                          거절
                        </Button>
                      </div>
                    </div>)}
              </div>
            </TabsContent>

            {
    /* Current Participants */
  }
            <TabsContent value="participants">
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                {
    /* Host */
  }
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={meetup.hostAvatar} />
                      <AvatarFallback>{meetup.hostName[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">
                        {meetup.hostName}
                      </div>
                      <div className="text-sm text-gray-500">모임장</div>
                    </div>
                    <Badge style={{
    backgroundColor: `${PP_COLORS.cream}80`,
    color: PP_COLORS.olive
  }}>
                      👑 주최자
                    </Badge>
                  </div>
                </div>

                {
    /* Participants */
  }
                {meetup.participants.map((participant) => <div
    key={participant.id}
    className="p-4 border-b border-gray-100 last:border-b-0"
  >
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={participant.avatar} />
                        <AvatarFallback>{participant.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">
                          {participant.name}
                        </div>
                        <div className="text-sm text-gray-500">참가자</div>
                      </div>
                      <Button
    size="sm"
    variant="ghost"
    onClick={() => handleRemoveParticipant(participant.id)}
  >
                        <UserMinus className="w-4 h-4 mr-1" />
                        내보내기
                      </Button>
                    </div>
                  </div>)}
              </div>
            </TabsContent>
          </Tabs>

          {
    /* Danger Zone */
  }
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden border-2 border-red-100">
            <div className="p-4 border-b border-red-100">
              <h2 className="font-bold text-lg text-red-600">위험 구역</h2>
            </div>

            <div className="p-4">
              <Button
    variant="outline"
    className="w-full border-red-200 text-red-600 hover:bg-red-50"
    onClick={handleDeleteMeetup}
  >
                <Trash2 className="w-4 h-4 mr-2" />
                모임 삭제
              </Button>
              <p className="text-xs text-gray-500 mt-2 text-center">
                모임을 삭제하면 모든 데이터가 영구적으로 삭제되며, 참가자들에게 알림이 전송됩니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>;
}
export {
  ManageMeetupPage
};
