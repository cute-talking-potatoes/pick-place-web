import { Link, useLocation, useSearchParams } from "react-router";
import { BottomNav } from "../components/BottomNav";
import { TopNav } from "../components/TopNav";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import { mockSpots } from "../data/mockData";
import { MapPin, Star, Bookmark } from "lucide-react";
import { PP_COLORS } from "../utils/ppStyles";
function SpotsListPage() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || (location.pathname === "/bookmarks" ? "bookmarks" : location.pathname === "/visited" ? "visited" : "all");
  const filteredSpots = activeTab === "bookmarks" ? mockSpots.filter((s) => s.isBookmarked) : activeTab === "visited" ? mockSpots.filter((s) => s.isVisited) : mockSpots;
  const handleTabChange = (value) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set("tab", value);
    setSearchParams(nextParams, { replace: true });
  };
  return <div className="min-h-screen bg-gray-50 pb-20 lg:pb-4">
      <TopNav title="📍 스팟 리스트" showBack />

      <div className="pt-14">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {
    /* Tabs */
  }
          <Tabs value={activeTab} onValueChange={handleTabChange} className="mb-6">
            <TabsList className="w-full grid grid-cols-3 bg-white p-1 h-auto gap-1">
              <TabsTrigger value="all" className="h-auto py-3 flex flex-col gap-1 data-[state=active]:shadow-sm">
                <span className="text-xl font-bold" style={{ color: PP_COLORS.sage }}>
                  {mockSpots.length}
                </span>
                <span className="text-xs text-gray-600">전체 스팟</span>
              </TabsTrigger>
              <TabsTrigger value="visited" className="h-auto py-3 flex flex-col gap-1 data-[state=active]:shadow-sm">
                <span className="text-xl font-bold" style={{ color: PP_COLORS.olive }}>
                  {mockSpots.filter((s) => s.isVisited).length}
                </span>
                <span className="text-xs text-gray-600">✨ 방문 완료</span>
              </TabsTrigger>
              <TabsTrigger value="bookmarks" className="h-auto py-3 flex flex-col gap-1 data-[state=active]:shadow-sm">
                <span className="text-xl font-bold" style={{ color: PP_COLORS.lime }}>
                  {mockSpots.filter((s) => s.isBookmarked).length}
                </span>
                <span className="text-xs text-gray-600">💚 북마크</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">

          {
    /* Spots Grid */
  }
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSpots.length === 0 ? <div className="col-span-full text-center py-12 bg-white rounded-2xl shadow-sm">
                <Bookmark className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {activeTab === "bookmarks" ? "\uBD81\uB9C8\uD06C\uD55C \uC2A4\uD31F\uC774 \uC5C6\uC2B5\uB2C8\uB2E4" : "\uBC29\uBB38\uD55C \uC2A4\uD31F\uC774 \uC5C6\uC2B5\uB2C8\uB2E4"}
                </h3>
                <p className="text-gray-600">
                  {activeTab === "bookmarks" ? "\uAD00\uC2EC \uC788\uB294 \uC2A4\uD31F\uC744 \uBD81\uB9C8\uD06C\uD574\uBCF4\uC138\uC694" : "\uC2A4\uD31F\uC744 \uBC29\uBB38\uD558\uACE0 \uAE30\uB85D\uC744 \uB0A8\uACA8\uBCF4\uC138\uC694"}
                </p>
              </div> : filteredSpots.map((spot) => <Link key={spot.id} to={`/spot/${spot.id}`}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
                  <div className="relative h-48">
                    <img
    src={spot.images[0]}
    alt={spot.name}
    className="w-full h-full object-cover"
  />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <Badge className="backdrop-blur text-white" style={{ backgroundColor: `${PP_COLORS.sage}dd` }}>
                        {spot.category}
                      </Badge>
                      {spot.isVisited && <Badge className="backdrop-blur text-white" style={{ backgroundColor: `${PP_COLORS.olive}dd` }}>
                          ✓ 방문 완료
                        </Badge>}
                    </div>
                    <button
    className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition-colors"
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
    }}
  >
                      <Bookmark
    className={`w-5 h-5 ${spot.isBookmarked ? "" : "text-gray-700"}`}
    fill={spot.isBookmarked ? PP_COLORS.sage : "none"}
    style={spot.isBookmarked ? { color: PP_COLORS.sage } : {}}
  />
                    </button>
                  </div>

                  <div className="p-4">
                    <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1">
                      {spot.name}
                    </h3>
                    <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
                      <MapPin className="w-4 h-4" />
                      <span className="line-clamp-1">{spot.location.address}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium text-sm">{spot.rating}</span>
                        <span className="text-sm text-gray-500">
                          ({spot.reviewCount})
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {spot.tags.slice(0, 2).map((tag) => <Badge
    key={tag}
    variant="secondary"
    className="text-xs"
  >
                            #{tag}
                          </Badge>)}
                      </div>
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
  SpotsListPage
};
