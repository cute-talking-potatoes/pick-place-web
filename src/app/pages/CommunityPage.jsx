import { Link } from "react-router";
import { BottomNav } from "../components/BottomNav";
import { TopNav } from "../components/TopNav";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import { mockPosts, mockMeetups } from "../data/mockData";
import { Plus, Heart, MessageCircle, Bookmark, Share2, MapPin, Calendar, Users } from "lucide-react";
import { PP_COLORS, ppGradientStyle } from "../utils/ppStyles";
function CommunityPage() {
  return <div className="min-h-screen bg-gray-50 pb-20 lg:pb-4">
      <TopNav title="✨ 커뮤니티" />

      <div className="pt-14">
        <div className="max-w-4xl mx-auto px-4 py-6">
          {
    /* Tabs */
  }
          <Tabs defaultValue="feed">
            <TabsList className="w-full grid grid-cols-2 bg-white mb-6">
              <TabsTrigger value="feed">📸 피드</TabsTrigger>
              <TabsTrigger value="meetups">👥 모임</TabsTrigger>
            </TabsList>

            {
    /* Feed Tab */
  }
            <TabsContent value="feed">
              {
    /* Create Button */
  }
              <Link to="/upload">
                <Button className="w-full mb-6" style={ppGradientStyle}>
                  <Plus className="w-5 h-5 mr-2" />
                  📸 새 게시글 작성
                </Button>
              </Link>

              {
    /* Posts */
  }
              <div className="space-y-6">
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
                      <div className={`grid ${post.images.length === 1 ? "grid-cols-1" : "grid-cols-2"} gap-1`}>
                        {post.images.slice(0, 4).map((url, index) => <div
    key={index}
    className={`relative ${post.images.length === 1 ? "aspect-[4/3]" : "aspect-square"} bg-gray-100 overflow-hidden`}
  >
                            <img
    src={url}
    alt=""
    className="w-full h-full object-cover hover:scale-105 transition-transform"
  />
                            {index === 3 && post.images.length > 4 && <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-xl font-bold">
                                +{post.images.length - 4}
                              </div>}
                          </div>)}
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
            </TabsContent>

            {
    /* Meetups Tab */
  }
            <TabsContent value="meetups">
              {
    /* Create Meetup Button */
  }
              <Button className="w-full mb-6" style={ppGradientStyle}>
                <Plus className="w-5 h-5 mr-2" />
                ✨ 새 모임 만들기
              </Button>

              {
    /* View All Link */
  }
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-xl">최근 모임</h2>
                <Link to="/meetups">
                  <Button variant="ghost" size="sm" style={{ color: PP_COLORS.sage }}>
                    전체보기 →
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {mockMeetups.map((meetup) => <Link key={meetup.id} to={`/meetup/${meetup.id}`}>
                    <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ backgroundColor: `${PP_COLORS.lime}40` }}>
                          📸
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 mb-1">
                            {meetup.title}
                          </h3>
                          <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                            <MapPin className="w-3 h-3" />
                            <span className="line-clamp-1">{meetup.spotName}</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4" style={{ color: PP_COLORS.sage }} />
                          <span>{meetup.date} {meetup.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Users className="w-4 h-4" style={{ color: PP_COLORS.sage }} />
                          <span>{meetup.currentParticipants}/{meetup.maxParticipants}명 참여 중</span>
                        </div>
                      </div>
                      <Button size="sm" className="w-full" style={{ backgroundColor: PP_COLORS.sage, color: "white" }}>
                        {meetup.isJoined ? "\u2728 \uC0C1\uC138 \uBCF4\uAE30" : "\u{1F3AF} \uCC38\uC5EC\uD558\uAE30"}
                      </Button>
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
  CommunityPage
};
