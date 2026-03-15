import { useNavigate } from "react-router";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

function CommunityModeTabs({ activeTab }) {
  const navigate = useNavigate();
  return <Tabs
    value={activeTab}
    onValueChange={(value) => {
      if (value === "feed") navigate("/community?tab=feed");
      if (value === "question") navigate("/community?tab=question");
      if (value === "meetups") navigate("/meetups");
    }}
  >
      <TabsList className="w-full grid grid-cols-3 bg-white mb-6">
        <TabsTrigger value="feed">📸 피드</TabsTrigger>
        <TabsTrigger value="question">❓ 질문</TabsTrigger>
        <TabsTrigger value="meetups">👥 모임</TabsTrigger>
      </TabsList>
    </Tabs>;
}

export {
  CommunityModeTabs
};
