import { useState } from "react";
import { Link } from "react-router";
import { TopNav } from "../components/TopNav";
import { BottomNav } from "../components/BottomNav";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { mockSpots } from "../data/mockData";
import {
  Search,
  SlidersHorizontal,
  MapPin,
  Star,
  Navigation,
  Bookmark,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { PP_COLORS, ppGradientStyle } from "../utils/ppStyles";
function MainMapPage() {
  const MotionDiv = motion.div;
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const spot = selectedSpot ? mockSpots.find((s) => s.id === selectedSpot) : null;
  const locationRecommendedSpots = mockSpots.slice(0, 3);
  return <div className="h-screen flex flex-col bg-gray-50 pt-14">
      <TopNav />
      {
    /* Search Bar */
  }
      <div className="bg-white border-b border-gray-200 px-4 py-3 z-10">
        <div className="max-w-7xl mx-auto flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
    type="text"
    placeholder="🔍 장소, 지역 검색..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="pl-10 h-11"
  />
          </div>
          <Button
    variant="outline"
    size="icon"
    className="h-11 w-11"
    onClick={() => setShowFilters(!showFilters)}
  >
            <SlidersHorizontal className="w-5 h-5" />
          </Button>
          <Button
    size="icon"
    className="h-11 w-11"
    style={{ backgroundColor: PP_COLORS.sage, color: "white" }}
  >
            <Navigation className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {
    /* Filters */
  }
      <AnimatePresence>
        {showFilters && <MotionDiv
    initial={{ height: 0, opacity: 0 }}
    animate={{ height: "auto", opacity: 1 }}
    exit={{ height: 0, opacity: 0 }}
    className="bg-white border-b border-gray-200 overflow-hidden"
  >
            <div className="px-4 py-4 max-w-7xl mx-auto">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="cursor-pointer hover:bg-gray-200">
                  🏔️ 자연
                </Badge>
                <Badge variant="secondary" className="cursor-pointer hover:bg-gray-200">
                  🏙️ 도시
                </Badge>
                <Badge variant="secondary" className="cursor-pointer hover:bg-gray-200">
                  🌅 일출/일몰
                </Badge>
                <Badge variant="secondary" className="cursor-pointer hover:bg-gray-200">
                  🌃 야경
                </Badge>
                <Badge variant="secondary" className="cursor-pointer hover:bg-gray-200">
                  🎨 감성
                </Badge>
              </div>
            </div>
          </MotionDiv>}
      </AnimatePresence>

      {/* Current Location Recommendations */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-base font-bold text-gray-900 mb-1">📍 현재 위치 기반 장소 추천</h2>
          <p className="text-sm text-gray-600 mb-3">지금 위치에서 가깝고 사진 찍기 좋은 스팟을 먼저 추천해드려요.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {locationRecommendedSpots.map((recommendedSpot) => <Link key={recommendedSpot.id} to={`/spot/${recommendedSpot.id}`}>
                <div className="rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3 hover:bg-white hover:shadow-sm transition-all">
                  <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">{recommendedSpot.name}</h3>
                  <p className="text-xs text-gray-600 mb-2 line-clamp-1">{recommendedSpot.description}</p>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{recommendedSpot.location.region} · 약 {recommendedSpot.distance}km</span>
                  </div>
                </div>
              </Link>)}
          </div>
        </div>
      </div>

      {
    /* Map Area */
  }
      <div className="flex-1 relative">
        {
    /* Mock Map with gradient background */
  }
        <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-[#FFFBB1]/30 to-[#D8E983]/20">
          {
    /* Map Grid Lines */
  }
          <div className="absolute inset-0 opacity-10">
            <div className="h-full w-full" style={{
    backgroundImage: `linear-gradient(#ccc 1px, transparent 1px), linear-gradient(90deg, #ccc 1px, transparent 1px)`,
    backgroundSize: "50px 50px"
  }} />
          </div>

          {
    /* Location Pins */
  }
          <div className="absolute inset-0">
            {mockSpots.map((spot2) => <button
    key={spot2.id}
    onClick={() => setSelectedSpot(spot2.id)}
    className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-110"
    style={{
      left: `${spot2.mapX}%`,
      top: `${spot2.mapY}%`
    }}
  >
                <div className={`relative w-12 h-12 transition-all ${selectedSpot === spot2.id ? "scale-125" : ""}`}>
                  {spot2.isVisited && <div
    className={`absolute inset-0 rounded-full ${selectedSpot === spot2.id ? "scale-150" : "scale-125"} transition-transform`}
    style={{ backgroundColor: `${PP_COLORS.lime}40` }}
  />}
                  
                  <div
    className={`relative w-full h-full rounded-full shadow-lg flex items-center justify-center ${selectedSpot === spot2.id ? "text-white" : spot2.isVisited ? "text-white" : ""}`}
    style={{
      backgroundColor: selectedSpot === spot2.id ? PP_COLORS.sage : spot2.isVisited ? PP_COLORS.olive : "white",
      color: selectedSpot === spot2.id || spot2.isVisited ? "white" : PP_COLORS.sage,
      border: (!selectedSpot || selectedSpot !== spot2.id) && !spot2.isVisited ? `2px solid ${PP_COLORS.sage}` : "none"
    }}
  >
                    <MapPin className="w-6 h-6" fill="currentColor" />
                  </div>

                  {selectedSpot === spot2.id && <motion.div
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white px-3 py-1 rounded-full shadow-lg whitespace-nowrap text-sm font-medium"
  >
                      {spot2.name}
                    </motion.div>}
                </div>
              </button>)}
          </div>
        </div>

        {
    /* Legend */
  }
        <div className="absolute bottom-4 left-4 bg-white rounded-2xl shadow-lg p-4 z-10">
          <h4 className="font-medium text-sm mb-3">📍 범례</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-white border-2" style={{ borderColor: PP_COLORS.sage }} />
              <span className="text-xs text-gray-600">미방문</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: PP_COLORS.olive }} />
              <span className="text-xs text-gray-600">✨ 방문 완료</span>
            </div>
          </div>
        </div>
      </div>

      {
    /* Selected Spot Card */
  }
      <AnimatePresence>
        {spot && <motion.div
    initial={{ y: "100%" }}
    animate={{ y: 0 }}
    exit={{ y: "100%" }}
    transition={{ type: "spring", damping: 30, stiffness: 300 }}
    className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-20 max-h-[60vh] overflow-hidden"
  >
            <div className="relative">
              <button
    onClick={() => setSelectedSpot(null)}
    className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center z-10 hover:bg-gray-100 transition-colors"
  >
                <X className="w-5 h-5" />
              </button>

              {
    /* Image */
  }
              <div className="relative h-48 bg-gray-200">
                <img
    src={spot.images[0]}
    alt={spot.name}
    className="w-full h-full object-cover"
  />
                {spot.isVisited && <Badge className="absolute top-4 left-4 text-white backdrop-blur" style={{ backgroundColor: PP_COLORS.sage }}>
                    ✓ 방문 완료
                  </Badge>}
              </div>

              {
    /* Content */
  }
              <div className="p-6 overflow-y-auto max-h-[calc(60vh-12rem)]">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {spot.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <MapPin className="w-4 h-4" />
                      <span>{spot.location.address}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{spot.rating}</span>
                      <span className="text-sm text-gray-500">
                        ({spot.reviewCount})
                      </span>
                    </div>
                  </div>
                  <Button
    variant="outline"
    size="icon"
    className={spot.isBookmarked ? "border-[#A5C89E]" : ""}
    style={spot.isBookmarked ? { color: PP_COLORS.sage } : {}}
  >
                    <Bookmark
    className="w-5 h-5"
    fill={spot.isBookmarked ? PP_COLORS.sage : "none"}
  />
                  </Button>
                </div>

                <p className="text-gray-700 mb-6 leading-relaxed">
                  {spot.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {spot.tags.map((tag) => <Badge
    key={tag}
    variant="secondary"
    className="text-sm"
  >
                      #{tag}
                    </Badge>)}
                </div>

                <Link to={`/spot/${spot.id}`}>
                  <Button className="w-full" style={ppGradientStyle}>
                    📸 자세히 보기
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>}
      </AnimatePresence>

      <BottomNav />
    </div>;
}
export {
  MainMapPage
};
