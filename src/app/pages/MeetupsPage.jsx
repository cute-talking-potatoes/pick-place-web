import { Link, useSearchParams } from "react-router";
import { BottomNav } from "../components/BottomNav";
import { TopNav } from "../components/TopNav";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import { mockMeetups } from "../data/mockData";
import { Plus, MapPin, Calendar, Users, Clock, Search } from "lucide-react";
import { PP_COLORS, ppGradientStyle } from "../utils/ppStyles";
function MeetupsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "all";
  const handleTabChange = (value) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set("tab", value);
    setSearchParams(nextParams, { replace: true });
  };
  const filteredMeetups = activeTab === "joined" ? mockMeetups.filter((m) => m.isJoined) : mockMeetups;
  return <div className="min-h-screen bg-gray-50 pb-20 lg:pb-4">
      <TopNav title="👥 촬영 모임" showBack />

      <div className="pt-14">
        <div className="max-w-4xl mx-auto px-4 py-6">
          {
    /* Header */
  }
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              함께 촬영할 메이트를 찾아보세요! 📸
            </h1>
            <p className="text-gray-600">
              같은 관심사를 가진 사람들과 함께 특별한 순간을 기록하세요
            </p>
          </div>

          {
    /* Search */
  }
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
    placeholder="모임 검색..."
    className="pl-10"
  />
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
          <Tabs value={activeTab} onValueChange={handleTabChange} className="mb-6">
            <TabsList className="w-full grid grid-cols-2 bg-white p-1 h-auto gap-1">
              <TabsTrigger value="all" className="h-auto py-3 flex flex-col gap-1 data-[state=active]:shadow-sm">
                <span className="text-xl font-bold" style={{ color: PP_COLORS.sage }}>
                  {mockMeetups.length}
                </span>
                <span className="text-xs text-gray-600">전체 모임</span>
              </TabsTrigger>
              <TabsTrigger value="joined" className="h-auto py-3 flex flex-col gap-1 data-[state=active]:shadow-sm">
                <span className="text-xl font-bold" style={{ color: PP_COLORS.olive }}>
                  {mockMeetups.filter((m) => m.isJoined).length}
                </span>
                <span className="text-xs text-gray-600">참여 중</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
          {
    /* Meetups List */
  }
          <div className="space-y-4">
            {filteredMeetups.map((meetup) => <Link key={meetup.id} to={`/meetup/${meetup.id}`}>
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-all hover:-translate-y-1">
                  {
    /* Image */
  }
                  <div className="relative h-48">
                    <img
    src={meetup.image}
    alt={meetup.title}
    className="w-full h-full object-cover"
  />
                    <div className="absolute top-3 left-3">
                      <Badge
    className="backdrop-blur text-white"
    style={{ backgroundColor: `${PP_COLORS.sage}dd` }}
  >
                        모집 중
                      </Badge>
                    </div>
                    {meetup.isJoined && <div className="absolute top-3 right-3">
                        <Badge className="bg-green-500 backdrop-blur">
                          ✓ 참여 중
                        </Badge>
                      </div>}
                  </div>

                  {
    /* Content */
  }
                  <div className="p-5">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">
                      {meetup.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {meetup.description}
                    </p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: PP_COLORS.sage }} />
                        <span>{meetup.spotName}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4 flex-shrink-0" style={{ color: PP_COLORS.sage }} />
                        <span>{meetup.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4 flex-shrink-0" style={{ color: PP_COLORS.sage }} />
                        <span>{meetup.time}</span>
                      </div>
                    </div>

                    {
    /* Tags */
  }
                    <div className="flex flex-wrap gap-2 mb-4">
                      {meetup.tags.map((tag) => <Badge key={tag} variant="secondary" className="text-xs">
                          #{tag}
                        </Badge>)}
                    </div>

                    {
    /* Footer */
  }
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-600" />
                        <span className="text-sm text-gray-600">
                          {meetup.currentParticipants}/{meetup.maxParticipants}명 참여 중
                        </span>
                        {meetup.currentParticipants >= meetup.maxParticipants && <Badge variant="destructive" className="text-xs">마감 임박</Badge>}
                      </div>
                      <Button
    size="sm"
    style={{
      backgroundColor: meetup.isJoined ? PP_COLORS.olive : PP_COLORS.sage,
      color: "white"
    }}
  >
                        {meetup.isJoined ? "\u2728 \uC0C1\uC138 \uBCF4\uAE30" : "\u{1F3AF} \uCC38\uC5EC\uD558\uAE30"}
                      </Button>
                    </div>
                  </div>
                </div>
              </Link>)}
          </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <BottomNav />
    </div>;
}
export {
  MeetupsPage
};
