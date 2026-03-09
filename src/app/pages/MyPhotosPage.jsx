import { Link } from "react-router";
import { TopNav } from "../components/TopNav";
import { BottomNav } from "../components/BottomNav";
import { Button } from "../components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import { mockPosts } from "../data/mockData";
import { Camera, Heart, MessageCircle, Grid3x3, List } from "lucide-react";
import { PP_COLORS } from "../utils/ppStyles";
import { useState } from "react";
function MyPhotosPage() {
  const [viewMode, setViewMode] = useState("grid");
  const myPosts = mockPosts.filter((post) => post.userId === "1");
  return <div className="min-h-screen bg-gray-50 pb-20 lg:pb-4">
      <TopNav title="내 사진첩" showBack />

      <div className="pt-14">
        <div className="max-w-4xl mx-auto px-4 py-6">
          {
    /* Stats */
  }
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-gray-900">{myPosts.length}</div>
                <div className="text-sm text-gray-600">게시글</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {myPosts.reduce((sum, post) => sum + post.likes, 0)}
                </div>
                <div className="text-sm text-gray-600">좋아요</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {myPosts.reduce((sum, post) => sum + post.comments, 0)}
                </div>
                <div className="text-sm text-gray-600">댓글</div>
              </div>
            </div>
          </div>

          {
    /* View Mode Toggle */
  }
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-lg">내 게시글</h2>
            <div className="flex gap-2">
              <Button
    variant={viewMode === "grid" ? "default" : "outline"}
    size="icon"
    onClick={() => setViewMode("grid")}
  >
                <Grid3x3 className="w-4 h-4" />
              </Button>
              <Button
    variant={viewMode === "list" ? "default" : "outline"}
    size="icon"
    onClick={() => setViewMode("list")}
  >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {
    /* Tabs */
  }
          <Tabs defaultValue="all" className="mb-6">
            <TabsList className="w-full grid grid-cols-2 bg-white mb-4">
              <TabsTrigger value="all">전체</TabsTrigger>
              <TabsTrigger value="liked">좋아요한 게시글</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              {myPosts.length === 0 ? <div className="text-center py-12 bg-white rounded-2xl shadow-sm">
                  <Camera className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    아직 게시글이 없습니다
                  </h3>
                  <p className="text-gray-600 mb-4">
                    첫 번째 사진을 공유해보세요!
                  </p>
                  <Link to="/upload">
                    <Button style={{ backgroundColor: PP_COLORS.sage, color: "white" }}>
                      <Camera className="w-4 h-4 mr-2" />
                      📸 사진 업로드
                    </Button>
                  </Link>
                </div> : viewMode === "grid" ? <div className="grid grid-cols-3 gap-1">
                  {myPosts.map((post) => <Link key={post.id} to={`/post/${post.id}`}>
                      <div className="aspect-square relative group cursor-pointer overflow-hidden">
                        <img
    src={post.images[0]}
    alt=""
    className="w-full h-full object-cover transition-transform group-hover:scale-105"
  />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 text-white">
                          <div className="flex items-center gap-1">
                            <Heart className="w-5 h-5" fill="white" />
                            <span className="font-medium">{post.likes}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageCircle className="w-5 h-5" fill="white" />
                            <span className="font-medium">{post.comments}</span>
                          </div>
                        </div>
                      </div>
                    </Link>)}
                </div> : <div className="space-y-4">
                  {myPosts.map((post) => <Link key={post.id} to={`/post/${post.id}`}>
                      <div className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                        <div className="flex gap-4 p-4">
                          <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                            <img
    src={post.images[0]}
    alt=""
    className="w-full h-full object-cover"
  />
                          </div>
                          <div className="flex-1 min-w-0">
                            <Link
    to={`/spot/${post.spotId}`}
    className="text-sm hover:underline block mb-1"
    style={{ color: PP_COLORS.sage }}
  >
                              📍 {post.spotName}
                            </Link>
                            <p className="text-gray-900 line-clamp-2 mb-2">
                              {post.content}
                            </p>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <Heart className="w-4 h-4" />
                                {post.likes}
                              </div>
                              <div className="flex items-center gap-1">
                                <MessageCircle className="w-4 h-4" />
                                {post.comments}
                              </div>
                              <span className="ml-auto">{post.createdAt}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>)}
                </div>}
            </TabsContent>

            <TabsContent value="liked">
              <div className="text-center py-12 bg-white rounded-2xl shadow-sm">
                <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  좋아요한 게시글이 없습니다
                </h3>
                <p className="text-gray-600">
                  마음에 드는 게시글에 좋아요를 눌러보세요
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <BottomNav />
    </div>;
}
export {
  MyPhotosPage
};
