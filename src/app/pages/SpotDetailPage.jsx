import { useState } from "react";
import { Link, useParams } from "react-router";
import { TopNav } from "../components/TopNav";
import { BottomNav } from "../components/BottomNav";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { mockSpots, mockPosts } from "../data/mockData";
import {
  MapPin,
  Star,
  Bookmark,
  CheckCircle,
  Navigation2,
  Camera,
  Clock,
  Heart,
  MessageCircle,
  Share2
} from "lucide-react";
import { PP_COLORS, ppGradientStyle } from "../utils/ppStyles";
function SpotDetailPage() {
  const { id } = useParams();
  const spot = mockSpots.find((s) => s.id === id);
  const [isBookmarked, setIsBookmarked] = useState(spot?.isBookmarked || false);
  const [isVisited, setIsVisited] = useState(spot?.isVisited || false);
  if (!spot) {
    return <div>Spot not found</div>;
  }
  const relatedPosts = mockPosts.filter((p) => p.spotId === spot.id);
  return <div className="min-h-screen bg-gray-50 pb-20 lg:pb-4">
      <TopNav title="스팟 상세" showBack />

      <div className="pt-14">
        <div className="max-w-4xl mx-auto">
          {
    /* Hero Image */
  }
          <div className="relative h-80 lg:h-96">
            <img
    src={spot.images[0]}
    alt={spot.name}
    className="w-full h-full object-cover"
  />
            {isVisited && <Badge
    className="absolute top-6 left-6 text-white backdrop-blur"
    style={{ backgroundColor: PP_COLORS.olive }}
  >
                ✨ 방문 완료
              </Badge>}
          </div>

          <div className="px-4 py-6 space-y-6">
            {
    /* Header */
  }
            <div>
              <div className="flex items-start gap-3 mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                      {spot.name}
                    </h1>
                    {isVisited && <CheckCircle className="w-6 h-6" fill={PP_COLORS.sage} style={{ color: PP_COLORS.sage }} />}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 mb-3">
                    <MapPin className="w-4 h-4" />
                    <span>{spot.location.address}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium text-lg">{spot.rating}</span>
                    <span className="text-gray-500">({spot.reviewCount} 리뷰)</span>
                  </div>
                </div>
              </div>

              {
    /* Actions */
  }
              <div className="flex gap-2">
                <Button
    variant="outline"
    onClick={() => setIsBookmarked(!isBookmarked)}
    className={isBookmarked ? "border-[#A5C89E]" : ""}
    style={isBookmarked ? { color: PP_COLORS.sage } : {}}
  >
                  <Bookmark
    className="w-4 h-4 mr-2"
    fill={isBookmarked ? PP_COLORS.sage : "none"}
  />
                  {isBookmarked ? "\u{1F49A} \uBD81\uB9C8\uD06C\uB428" : "\uBD81\uB9C8\uD06C"}
                </Button>
                <Button
    variant="outline"
    onClick={() => setIsVisited(!isVisited)}
    className={isVisited ? "border-[#A5C89E]" : ""}
    style={isVisited ? { color: PP_COLORS.sage } : {}}
  >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  {isVisited ? "\u2728 \uBC29\uBB38 \uC644\uB8CC" : "\uBC29\uBB38 \uCCB4\uD06C"}
                </Button>
              </div>
            </div>

            {
    /* Tags */
  }
            <div className="flex flex-wrap gap-2">
              {spot.tags.map((tag) => <Badge key={tag} variant="secondary" className="text-sm">
                  #{tag}
                </Badge>)}
            </div>

            {
    /* Description */
  }
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-lg mb-3">📝 소개</h3>
              <p className="text-gray-700 leading-relaxed">{spot.description}</p>
            </div>

            {
    /* Best Time & Tips */
  }
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-5 h-5" style={{ color: PP_COLORS.sage }} />
                  <h3 className="font-bold">⏰ 최적 시간</h3>
                </div>
                <p className="text-gray-700">{spot.bestTime.join(", ")}</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <Camera className="w-5 h-5" style={{ color: PP_COLORS.sage }} />
                  <h3 className="font-bold">💡 촬영 팁</h3>
                </div>
                <p className="text-gray-700 text-sm">{spot.tips}</p>
              </div>
            </div>

            {
    /* Location & Navigation */
  }
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-lg mb-4">🗺️ 위치 정보</h3>
              <div className="space-y-4">
                <div className="h-48 bg-gray-100 rounded-xl flex items-center justify-center text-gray-500">
                  지도 영역 (Kakao Map API)
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl" style={{ backgroundColor: `${PP_COLORS.cream}40` }}>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">현재 위치에서</div>
                    <span className="font-medium">{spot.travelTime}</span>
                  </div>
                  <Button className="w-full sm:w-auto" style={ppGradientStyle}>
                    <Navigation2 className="w-4 h-4 mr-2" />
                    🚗 길찾기
                  </Button>
                </div>
              </div>
            </div>

            {
    /* User Photos */
  }
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg">📸 사용자 사진</h3>
                <Link to="/upload">
                  <Button size="sm" style={{ backgroundColor: PP_COLORS.sage, color: "white" }}>
                    <Camera className="w-4 h-4 mr-2" />
                    사진 올리기
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {relatedPosts.slice(0, 6).map((post) => <Link key={post.id} to={`/post/${post.id}`}>
                    <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 hover:opacity-90 transition-opacity relative group">
                      <img
    src={post.images[0]}
    alt=""
    className="w-full h-full object-cover"
  />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-3 text-white text-sm">
                          <div className="flex items-center gap-1">
                            <Heart className="w-4 h-4" />
                            {post.likes}
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageCircle className="w-4 h-4" />
                            {post.comments}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>)}
              </div>
            </div>

            {
    /* Share */
  }
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1">
                <Share2 className="w-4 h-4 mr-2" />
                공유하기
              </Button>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>;
}
export {
  SpotDetailPage
};
