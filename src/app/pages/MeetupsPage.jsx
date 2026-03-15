import { Link, useSearchParams } from "react-router";
import { BottomNav } from "../components/BottomNav";
import { TopNav } from "../components/TopNav";
import { CommunityModeTabs } from "../components/CommunityModeTabs";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import { mockMeetups } from "../data/mockData";
import { mockNotices } from "../data/communityData";
import { Plus, MapPin, Calendar, Users, Clock } from "lucide-react";
import { PP_COLORS, ppGradientStyle } from "../utils/ppStyles";
import { useMemo } from "react";

function MeetupsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const quickDateFilter = searchParams.get("qDate") || "all";
  const dateFrom = searchParams.get("dateFrom") || "";
  const dateTo = searchParams.get("dateTo") || "";
  const timeFilter = searchParams.get("time") || "all";
  const statusFilter = searchParams.get("status") || "all";
  const selectedWeekdays = useMemo(() => (searchParams.get("weekdays") || "").split(",").filter(Boolean).map((value) => Number(value)).filter((value) => !Number.isNaN(value)), [searchParams]);
  const selectedTags = useMemo(() => (searchParams.get("tags") || "").split(",").filter(Boolean), [searchParams]);

  const storedMeetups = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("created_meetups") || "[]");
    } catch {
      return [];
    }
  }, []);

  const allMeetups = useMemo(() => [...storedMeetups, ...mockMeetups], [storedMeetups]);
  const activeTab = searchParams.get("tab") || "all";

  const updateFilterParams = (updates) => {
    const nextParams = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (value === "" || value === null || value === undefined || value === "all") {
        nextParams.delete(key);
      } else {
        nextParams.set(key, value);
      }
    });
    setSearchParams(nextParams, { replace: true });
  };
  const setQuickDateExclusive = (quickDateValue) => {
    updateFilterParams({
      qDate: quickDateValue,
      dateFrom: "",
      dateTo: ""
    });
  };
  const setDateFromExclusive = (value) => {
    updateFilterParams({
      dateFrom: value,
      qDate: ""
    });
  };
  const setDateToExclusive = (value) => {
    updateFilterParams({
      dateTo: value,
      qDate: ""
    });
  };

  const handleTabChange = (value) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set("tab", value);
    setSearchParams(nextParams, { replace: true });
  };

  const candidateMeetups = activeTab === "joined" ? allMeetups.filter((m) => m.isJoined) : allMeetups;
  const allTags = useMemo(() => [...new Set(allMeetups.flatMap((meetup) => meetup.tags || []))], [allMeetups]);

  const today = useMemo(() => {
    const now = new Date();
    const y = now.getFullYear();
    const m = `${now.getMonth() + 1}`.padStart(2, "0");
    const d = `${now.getDate()}`.padStart(2, "0");
    return `${y}-${m}-${d}`;
  }, []);

  const filteredMeetups = useMemo(() => {
    const todayDate = new Date(`${today}T00:00:00`);
    const tomorrowDate = new Date(todayDate);
    tomorrowDate.setDate(todayDate.getDate() + 1);

    const weekStart = new Date(todayDate);
    const day = weekStart.getDay();
    const mondayDiff = day === 0 ? -6 : 1 - day;
    weekStart.setDate(weekStart.getDate() + mondayDiff);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);

    const startDateFilter = dateFrom ? new Date(`${dateFrom}T00:00:00`) : null;
    const endDateFilter = dateTo ? new Date(`${dateTo}T23:59:59`) : null;
    const isSameDate = (a, b) => a.toDateString() === b.toDateString();

    return candidateMeetups.filter((meetup) => {
      const meetupDate = meetup.date ? new Date(`${meetup.date}T00:00:00`) : null;
      if (!meetupDate || Number.isNaN(meetupDate.getTime())) return false;

      if (quickDateFilter === "today" && !isSameDate(meetupDate, todayDate)) return false;
      if (quickDateFilter === "tomorrow" && !isSameDate(meetupDate, tomorrowDate)) return false;
      if (quickDateFilter === "thisWeek" && (meetupDate < weekStart || meetupDate > weekEnd)) return false;
      if (quickDateFilter === "weekend" && ![0, 6].includes(meetupDate.getDay())) return false;

      if (startDateFilter && meetupDate < startDateFilter) return false;
      if (endDateFilter && meetupDate > endDateFilter) return false;

      if (selectedWeekdays.length > 0 && !selectedWeekdays.includes(meetupDate.getDay())) return false;

      if (timeFilter !== "all") {
        const hour = Number((meetup.time || "0").split(":")[0]);
        if (timeFilter === "morning" && !(hour >= 5 && hour < 12)) return false;
        if (timeFilter === "afternoon" && !(hour >= 12 && hour < 17)) return false;
        if (timeFilter === "evening" && !(hour >= 17 && hour < 21)) return false;
        if (timeFilter === "night" && !(hour >= 21 || hour < 5)) return false;
      }

      const isClosed = meetup.currentParticipants >= meetup.maxParticipants;
      if (statusFilter === "open" && isClosed) return false;
      if (statusFilter === "closed" && !isClosed) return false;

      if (selectedTags.length > 0 && !selectedTags.some((tag) => (meetup.tags || []).includes(tag))) return false;
      return true;
    });
  }, [candidateMeetups, dateFrom, dateTo, quickDateFilter, selectedTags, selectedWeekdays, statusFilter, timeFilter, today]);

  const quickDateOptions = [
    { id: "all", label: "전체" },
    { id: "today", label: "오늘" },
    { id: "tomorrow", label: "내일" },
    { id: "thisWeek", label: "이번 주" }
  ];

  const weekdayOptions = [
    { value: 1, label: "월" },
    { value: 2, label: "화" },
    { value: 3, label: "수" },
    { value: 4, label: "목" },
    { value: 5, label: "금" },
    { value: 6, label: "토" },
    { value: 0, label: "일" }
  ];

  const statusOptions = [
    { id: "all", label: "전체" },
    { id: "open", label: "모집중" },
    { id: "closed", label: "완료" }
  ];

  const clearFilters = () => {
    updateFilterParams({
      qDate: "",
      weekdays: "",
      dateFrom: "",
      dateTo: "",
      time: "",
      status: "",
      tags: ""
    });
  };

  return <div className="min-h-screen bg-gray-50 pb-20 lg:pb-4">
      <TopNav title="👥 촬영 모임" showBack />

      <div className="pt-14">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              함께 촬영할 메이트를 찾아보세요! 📸
            </h1>
            <p className="text-gray-600">
              같은 관심사를 가진 사람들과 함께 특별한 순간을 기록하세요
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-4 mb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 mb-1">커뮤니티 공지</p>
                <h3 className="font-semibold text-gray-900">{mockNotices[0].title}</h3>
                <p className="text-sm text-gray-600 mt-1">{mockNotices[0].description}</p>
              </div>
              <div className="flex flex-col items-end gap-2 shrink-0 ml-3">
                <span className="text-xs text-gray-500">{mockNotices[0].createdAt}</span>
                <Link to="/community/notices" className="text-xs hover:underline" style={{ color: PP_COLORS.sage }}>
                  공지 전체보기
                </Link>
              </div>
            </div>
          </div>

          <CommunityModeTabs activeTab="meetups" />

          <Link to="/meetups/new">
            <Button className="w-full mb-6" style={ppGradientStyle}>
              <Plus className="w-5 h-5 mr-2" />
              ✨ 새 모임 만들기
            </Button>
          </Link>

          <div className="mb-6 lg:hidden bg-white rounded-2xl shadow-sm p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">필터</h3>
              <button type="button" onClick={clearFilters} className="text-xs text-gray-500 hover:text-gray-700">초기화</button>
            </div>

            <div className="flex flex-wrap gap-2">
              {quickDateOptions.map((option) => <button
    key={option.id}
    type="button"
    onClick={() => setQuickDateExclusive(option.id)}
    className={`px-3 py-1.5 rounded-full border text-xs ${quickDateFilter === option.id ? "text-white border-transparent" : "bg-white text-gray-700 border-gray-200"}`}
    style={quickDateFilter === option.id ? { backgroundColor: PP_COLORS.sage } : {}}
  >
                  {option.label}
                </button>)}
            </div>

            <div className="grid grid-cols-2 gap-2">
              <input type="date" value={dateFrom} onChange={(e) => setDateFromExclusive(e.target.value)} className="h-9 rounded-lg border border-gray-200 px-2 text-sm" max={dateTo || undefined} />
              <input type="date" value={dateTo} onChange={(e) => setDateToExclusive(e.target.value)} className="h-9 rounded-lg border border-gray-200 px-2 text-sm" min={dateFrom || undefined} />
            </div>

            <div className="flex flex-wrap gap-2">
              <button
    type="button"
    onClick={() => updateFilterParams({ weekdays: "" })}
    className={`px-2.5 py-1 rounded-full text-xs border ${selectedWeekdays.length === 0 ? "text-white border-transparent" : "bg-white text-gray-700 border-gray-200"}`}
    style={selectedWeekdays.length === 0 ? { backgroundColor: PP_COLORS.sage } : {}}
  >
                전체
              </button>
              {weekdayOptions.map((weekday) => <button
    key={weekday.value}
    type="button"
    onClick={() => {
      const nextWeekdays = selectedWeekdays.includes(weekday.value) ? selectedWeekdays.filter((d) => d !== weekday.value) : [...selectedWeekdays, weekday.value];
      updateFilterParams({ weekdays: nextWeekdays.join(",") });
    }}
    className={`px-2.5 py-1 rounded-full text-xs border ${selectedWeekdays.includes(weekday.value) ? "text-white border-transparent" : "bg-white text-gray-700 border-gray-200"}`}
    style={selectedWeekdays.includes(weekday.value) ? { backgroundColor: PP_COLORS.sage } : {}}
  >
                  {weekday.label}
                </button>)}
            </div>

            <div className="grid grid-cols-3 gap-2">
              {statusOptions.map((option) => <button
    key={option.id}
    type="button"
    onClick={() => updateFilterParams({ status: option.id })}
    className={`h-8 rounded-lg border text-xs ${statusFilter === option.id ? "text-white border-transparent" : "bg-white text-gray-700 border-gray-200"}`}
    style={statusFilter === option.id ? { backgroundColor: PP_COLORS.sage } : {}}
  >
                  {option.label}
                </button>)}
            </div>
          </div>

          <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-6">
            <div>
              <Tabs value={activeTab} onValueChange={handleTabChange} className="mb-6">
                <TabsList className="w-full grid grid-cols-2 bg-white p-1 h-auto gap-1">
                  <TabsTrigger value="all" className="h-auto py-3 flex flex-col gap-1 data-[state=active]:shadow-sm">
                    <span className="text-xl font-bold" style={{ color: PP_COLORS.sage }}>
                      {allMeetups.length}
                    </span>
                    <span className="text-xs text-gray-600">전체 모임</span>
                  </TabsTrigger>
                  <TabsTrigger value="joined" className="h-auto py-3 flex flex-col gap-1 data-[state=active]:shadow-sm">
                    <span className="text-xl font-bold" style={{ color: PP_COLORS.olive }}>
                      {allMeetups.filter((m) => m.isJoined).length}
                    </span>
                    <span className="text-xs text-gray-600">참여 중</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value={activeTab} className="mt-6">
                  <div className="space-y-4">
                    {filteredMeetups.length === 0 ? <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
                        <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <h3 className="text-lg font-bold text-gray-900 mb-1">표시할 모임이 없습니다</h3>
                        <p className="text-sm text-gray-600 mb-4">첫 모임을 직접 만들어보세요.</p>
                        <Link to="/meetups/new">
                          <Button style={ppGradientStyle}>✨ 새 모임 만들기</Button>
                        </Link>
                      </div> : filteredMeetups.map((meetup) => {
                        const isClosed = meetup.currentParticipants >= meetup.maxParticipants;
                        return <Link key={meetup.id} to={`/meetup/${meetup.id}`}>
                            <div className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-all hover:-translate-y-1">
                              <div className="relative h-48">
                                <img
      src={meetup.image}
      alt={meetup.title}
      className="w-full h-full object-cover"
    />
                                <div className="absolute top-3 left-3">
                                  <Badge
      className="backdrop-blur text-white"
      style={{ backgroundColor: isClosed ? "#ef4444dd" : `${PP_COLORS.sage}dd` }}
    >
                                    {isClosed ? "모집 완료" : "모집 중"}
                                  </Badge>
                                </div>
                                {meetup.isJoined && <div className="absolute top-3 right-3">
                                    <Badge className="bg-green-500 backdrop-blur">✓ 참여 중</Badge>
                                  </div>}
                              </div>

                              <div className="p-5">
                                <h3 className="font-bold text-lg text-gray-900 mb-2">{meetup.title}</h3>
                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{meetup.description}</p>

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

                                <div className="flex flex-wrap gap-2 mb-4">
                                  {meetup.tags.map((tag) => <Badge key={tag} variant="secondary" className="text-xs">#{tag}</Badge>)}
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                  <div className="flex items-center gap-2">
                                    <Users className="w-4 h-4 text-gray-600" />
                                    <span className="text-sm text-gray-600">{meetup.currentParticipants}/{meetup.maxParticipants}명 참여 중</span>
                                    {isClosed && <Badge variant="destructive" className="text-xs">마감 임박</Badge>}
                                  </div>
                                  <Button
      size="sm"
      style={{
        backgroundColor: meetup.isJoined ? PP_COLORS.olive : PP_COLORS.sage,
        color: "white"
      }}
    >
                                    {meetup.isJoined ? "✨ 상세 보기" : "🎯 참여하기"}
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </Link>;
                      })}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <aside className="hidden lg:block">
              <div className="sticky top-20 bg-white rounded-2xl shadow-sm p-4 space-y-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-gray-900">필터</h3>
                  <button type="button" onClick={clearFilters} className="text-xs text-gray-500 hover:text-gray-700">초기화</button>
                </div>

                <div>
                  <p className="text-xs font-medium text-gray-600 mb-2">빠른 날짜</p>
                  <div className="flex flex-wrap gap-2">
                    {quickDateOptions.map((option) => <button
      key={option.id}
      type="button"
      onClick={() => setQuickDateExclusive(option.id)}
      className={`px-3 py-1.5 rounded-full border text-xs transition-colors ${quickDateFilter === option.id ? "text-white border-transparent" : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"}`}
      style={quickDateFilter === option.id ? { backgroundColor: PP_COLORS.sage } : {}}
    >
                        {option.label}
                      </button>)}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-medium text-gray-600 mb-2">직접 날짜</p>
                  <div className="space-y-2">
                    <input type="date" value={dateFrom} onChange={(e) => setDateFromExclusive(e.target.value)} className="h-9 w-full rounded-lg border border-gray-200 px-3 text-sm" max={dateTo || undefined} />
                    <input type="date" value={dateTo} onChange={(e) => setDateToExclusive(e.target.value)} className="h-9 w-full rounded-lg border border-gray-200 px-3 text-sm" min={dateFrom || undefined} />
                  </div>
                </div>

                <div>
                  <p className="text-xs font-medium text-gray-600 mb-2">요일</p>
                  <div className="flex flex-wrap gap-2">
                    <button
      type="button"
      onClick={() => updateFilterParams({ weekdays: "" })}
      className={`px-2.5 py-1 rounded-full border text-xs ${selectedWeekdays.length === 0 ? "text-white border-transparent" : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"}`}
      style={selectedWeekdays.length === 0 ? { backgroundColor: PP_COLORS.sage } : {}}
    >
                      전체
                    </button>
                    {weekdayOptions.map((weekday) => <button
      key={weekday.value}
      type="button"
      onClick={() => {
        const nextWeekdays = selectedWeekdays.includes(weekday.value) ? selectedWeekdays.filter((d) => d !== weekday.value) : [...selectedWeekdays, weekday.value];
        updateFilterParams({ weekdays: nextWeekdays.join(",") });
      }}
      className={`px-2.5 py-1 rounded-full border text-xs ${selectedWeekdays.includes(weekday.value) ? "text-white border-transparent" : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"}`}
      style={selectedWeekdays.includes(weekday.value) ? { backgroundColor: PP_COLORS.sage } : {}}
    >
                        {weekday.label}
                      </button>)}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-medium text-gray-600 mb-2">모집 상태</p>
                  <div className="grid grid-cols-3 gap-2">
                    {statusOptions.map((option) => <button
      key={option.id}
      type="button"
      onClick={() => updateFilterParams({ status: option.id })}
      className={`h-8 rounded-lg border text-xs ${statusFilter === option.id ? "text-white border-transparent" : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"}`}
      style={statusFilter === option.id ? { backgroundColor: PP_COLORS.sage } : {}}
    >
                        {option.label}
                      </button>)}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-medium text-gray-600 mb-2">시간대</p>
                  <div className="grid grid-cols-2 gap-2">
                    {[{ id: "all", label: "전체" }, { id: "morning", label: "아침" }, { id: "afternoon", label: "오후" }, { id: "evening", label: "저녁" }, { id: "night", label: "야간" }].map((option) => <button
      key={option.id}
      type="button"
      onClick={() => updateFilterParams({ time: option.id })}
      className={`h-8 rounded-lg border text-xs ${timeFilter === option.id ? "text-white border-transparent" : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"}`}
      style={timeFilter === option.id ? { backgroundColor: PP_COLORS.sage } : {}}
    >
                        {option.label}
                      </button>)}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-medium text-gray-600 mb-2">태그</p>
                  <div className="flex flex-wrap gap-2">
                    {allTags.map((tag) => <button
      key={tag}
      type="button"
      onClick={() => {
        const nextTags = selectedTags.includes(tag) ? selectedTags.filter((value) => value !== tag) : [...selectedTags, tag];
        updateFilterParams({ tags: nextTags.join(",") });
      }}
      className={`px-2.5 py-1 rounded-full border text-xs ${selectedTags.includes(tag) ? "text-white border-transparent" : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"}`}
      style={selectedTags.includes(tag) ? { backgroundColor: PP_COLORS.sage } : {}}
    >
                        #{tag}
                      </button>)}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>;
}

export {
  MeetupsPage
};
