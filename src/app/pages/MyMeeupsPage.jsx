import { Link } from "react-router";
import { TopNav } from "../components/TopNav";
import { BottomNav } from "../components/BottomNav";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import { mockMeetups } from "../data/mockData";
import { Plus, Calendar, MapPin, Users, Clock, CheckCircle } from "lucide-react";
import { PP_COLORS, ppGradientStyle } from "../utils/ppStyles";
function MyMeetupsPage() {
  const joinedMeetups = mockMeetups.filter((m) => m.isJoined);
  const hostedMeetups = mockMeetups.filter((m) => m.hostId === "1");
  return <div className="min-h-screen bg-gray-50 pb-20 lg:pb-4">
      <TopNav title="내 모임" showBack />

      <div className="pt-14">
        <div className="max-w-4xl mx-auto px-4 py-6">
          {
    /* Stats */
  }
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-gray-900">{joinedMeetups.length}</div>
                <div className="text-sm text-gray-600">참여 중인 모임</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{hostedMeetups.length}</div>
                <div className="text-sm text-gray-600">주최한 모임</div>
              </div>
            </div>
          </div>

          {
    /* Create Button */
  }
          <Button className="w-full mb-6" style={ppGradientStyle}>
            <Plus className="w-5 h-5 mr-2" />
            ✨ 새 모임 만들기
          </Button>

          {
    /* Tabs */
  }
          <Tabs defaultValue="joined" className="mb-6">
            <TabsList className="w-full grid grid-cols-2 bg-white mb-4">
              <TabsTrigger value="joined">참여 중</TabsTrigger>
              <TabsTrigger value="hosted">내가 주최</TabsTrigger>
            </TabsList>

            {
    /* Joined Meetups */
  }
            <TabsContent value="joined">
              {joinedMeetups.length === 0 ? <div className="text-center py-12 bg-white rounded-2xl shadow-sm">
                  <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    참여 중인 모임이 없습니다
                  </h3>
                  <p className="text-gray-600 mb-4">
                    관심 있는 모임에 참여해보세요
                  </p>
                  <Link to="/community">
                    <Button variant="outline">
                      모임 둘러보기
                    </Button>
                  </Link>
                </div> : <div className="space-y-4">
                  {joinedMeetups.map((meetup) => <Link key={meetup.id} to={`/meetup/${meetup.id}`}>
                      <div className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                        {
    /* Image */
  }
                        <div className="relative h-48">
                          <img
    src={meetup.image}
    alt={meetup.title}
    className="w-full h-full object-cover"
  />
                          <div className="absolute top-3 right-3">
                            <Badge className="bg-green-500">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              참여 중
                            </Badge>
                          </div>
                        </div>

                        {
    /* Content */
  }
                        <div className="p-4">
                          <h3 className="font-bold text-lg text-gray-900 mb-2">
                            {meetup.title}
                          </h3>
                          <div className="space-y-2 mb-3">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <MapPin className="w-4 h-4 flex-shrink-0" />
                              <span>{meetup.spotName}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Calendar className="w-4 h-4 flex-shrink-0" />
                              <span>{meetup.date}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Clock className="w-4 h-4 flex-shrink-0" />
                              <span>{meetup.time}</span>
                            </div>
                          </div>

                          {
    /* Tags */
  }
                          <div className="flex flex-wrap gap-2 mb-3">
                            {meetup.tags.map((tag) => <Badge key={tag} variant="secondary" className="text-xs">
                                #{tag}
                              </Badge>)}
                          </div>

                          {
    /* Participants */
  }
                          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4 text-gray-600" />
                              <span className="text-sm text-gray-600">
                                {meetup.currentParticipants}/{meetup.maxParticipants}명
                              </span>
                            </div>
                            <Button size="sm" variant="outline">
                              상세 보기
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Link>)}
                </div>}
            </TabsContent>

            {
    /* Hosted Meetups */
  }
            <TabsContent value="hosted">
              {hostedMeetups.length === 0 ? <div className="text-center py-12 bg-white rounded-2xl shadow-sm">
                  <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    주최한 모임이 없습니다
                  </h3>
                  <p className="text-gray-600 mb-4">
                    직접 모임을 만들어보세요
                  </p>
                  <Button style={{ backgroundColor: PP_COLORS.sage, color: "white" }}>
                    <Plus className="w-4 h-4 mr-2" />
                    ✨ 모임 만들기
                  </Button>
                </div> : <div className="space-y-4">
                  {hostedMeetups.map((meetup) => <Link key={meetup.id} to={`/meetup/${meetup.id}`}>
                      <div className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                        {
    /* Image */
  }
                        <div className="relative h-48">
                          <img
    src={meetup.image}
    alt={meetup.title}
    className="w-full h-full object-cover"
  />
                          <div className="absolute top-3 right-3">
                            <Badge style={{ backgroundColor: PP_COLORS.olive }}>
                              ✨ 주최자
                            </Badge>
                          </div>
                        </div>

                        {
    /* Content */
  }
                        <div className="p-4">
                          <h3 className="font-bold text-lg text-gray-900 mb-2">
                            {meetup.title}
                          </h3>
                          <div className="space-y-2 mb-3">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <MapPin className="w-4 h-4 flex-shrink-0" />
                              <span>{meetup.spotName}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Calendar className="w-4 h-4 flex-shrink-0" />
                              <span>{meetup.date}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Clock className="w-4 h-4 flex-shrink-0" />
                              <span>{meetup.time}</span>
                            </div>
                          </div>

                          {
    /* Participants */
  }
                          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4 text-gray-600" />
                              <span className="text-sm text-gray-600">
                                {meetup.currentParticipants}/{meetup.maxParticipants}명
                              </span>
                            </div>
                            <Button size="sm" style={{ backgroundColor: PP_COLORS.sage, color: "white" }}>
                              ⚙️ 모임 관리
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Link>)}
                </div>}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <BottomNav />
    </div>;
}
export {
  MyMeetupsPage
};
