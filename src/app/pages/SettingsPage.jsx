import { useState } from "react";
import { Link } from "react-router";
import { TopNav } from "../components/TopNav";
import { Switch } from "../components/ui/switch";
import { Label } from "../components/ui/label";
import { Separator } from "../components/ui/separator";
import { useAppPreferences } from "../context/AppPreferencesContext";
import {
  ChevronRight,
  Bell,
  Globe,
  Moon,
  Lock,
  LogOut,
  Shield,
  HelpCircle,
  MessageSquare,
  FileText,
  Heart,
  Mail,
  Smartphone
} from "lucide-react";
import { PP_COLORS } from "../utils/ppStyles";

function SettingsPage() {
  const { theme, setTheme, locale, t } = useAppPreferences();
  const [notifications, setNotifications] = useState({
    likes: true,
    comments: true,
    meetups: true,
    messages: true,
    marketing: false
  });

  const languageLabel = locale === "ko" ? t("settings.languageValueKo", "한국어") : t("settings.languageValueEn", "English");

  return <div className="min-h-screen bg-gray-50 pb-6">
      <TopNav title={t("settings.title", "설정")} showBack />

      <div className="pt-14">
        <div className="max-w-7xl mx-auto px-4 py-6 space-y-4">
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h2 className="font-bold text-lg">{t("settings.account", "계정")}</h2>
            </div>

            <Link to="/settings/password" className="block">
              <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${PP_COLORS.sage}20` }}>
                    <Lock className="w-5 h-5" style={{ color: PP_COLORS.sage }} />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">{t("settings.passwordChange", "🔒 비밀번호 변경")}</div>
                    <div className="text-sm text-gray-500">{t("settings.passwordDesc", "비밀번호를 안전하게 변경하세요")}</div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            </Link>

            <Link to="/settings/privacy" className="block">
              <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${PP_COLORS.lime}40` }}>
                    <Shield className="w-5 h-5" style={{ color: PP_COLORS.olive }} />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">{t("settings.privacy", "🛡️ 개인정보 보호")}</div>
                    <div className="text-sm text-gray-500">{t("settings.privacyDesc", "개인정보 및 계정 보안 설정")}</div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            </Link>

            <button
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-t border-gray-100"
              onClick={() => alert("로그아웃되었습니다.")}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-red-50">
                  <LogOut className="w-5 h-5 text-red-500" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-red-600">{t("settings.logout", "로그아웃")}</div>
                  <div className="text-sm text-gray-500">{t("settings.logoutDesc", "현재 계정에서 로그아웃합니다")}</div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-red-400" />
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h2 className="font-bold text-lg flex items-center gap-2">
                <Bell className="w-5 h-5" />
                {t("settings.notifications", "알림 설정")}
              </h2>
            </div>

            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Heart className="w-5 h-5 text-gray-400" />
                  <Label htmlFor="likes" className="cursor-pointer">
                    <div className="font-medium">{t("settings.likes", "좋아요")}</div>
                    <div className="text-sm text-gray-500">{t("settings.likesDesc", "내 게시글에 좋아요가 달렸을 때")}</div>
                  </Label>
                </div>
                <Switch id="likes" checked={notifications.likes} onCheckedChange={(checked) => setNotifications({ ...notifications, likes: checked })} />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-gray-400" />
                  <Label htmlFor="comments" className="cursor-pointer">
                    <div className="font-medium">{t("settings.comments", "댓글")}</div>
                    <div className="text-sm text-gray-500">{t("settings.commentsDesc", "내 게시글에 댓글이 달렸을 때")}</div>
                  </Label>
                </div>
                <Switch id="comments" checked={notifications.comments} onCheckedChange={(checked) => setNotifications({ ...notifications, comments: checked })} />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Smartphone className="w-5 h-5 text-gray-400" />
                  <Label htmlFor="meetups" className="cursor-pointer">
                    <div className="font-medium">{t("settings.meetups", "모임")}</div>
                    <div className="text-sm text-gray-500">{t("settings.meetupsDesc", "모임 알림 및 일정 안내")}</div>
                  </Label>
                </div>
                <Switch id="meetups" checked={notifications.meetups} onCheckedChange={(checked) => setNotifications({ ...notifications, meetups: checked })} />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <Label htmlFor="messages" className="cursor-pointer">
                    <div className="font-medium">{t("settings.messages", "메시지")}</div>
                    <div className="text-sm text-gray-500">{t("settings.messagesDesc", "새로운 메시지가 도착했을 때")}</div>
                  </Label>
                </div>
                <Switch id="messages" checked={notifications.messages} onCheckedChange={(checked) => setNotifications({ ...notifications, messages: checked })} />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-gray-400" />
                  <Label htmlFor="marketing" className="cursor-pointer">
                    <div className="font-medium">{t("settings.marketing", "마케팅 정보")}</div>
                    <div className="text-sm text-gray-500">{t("settings.marketingDesc", "이벤트 및 혜택 정보 수신")}</div>
                  </Label>
                </div>
                <Switch id="marketing" checked={notifications.marketing} onCheckedChange={(checked) => setNotifications({ ...notifications, marketing: checked })} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h2 className="font-bold text-lg">{t("settings.display", "표시 설정")}</h2>
            </div>

            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Moon className="w-5 h-5 text-gray-400" />
                  <Label htmlFor="darkMode" className="cursor-pointer">
                    <div className="font-medium">{t("settings.darkMode", "다크 모드")}</div>
                    <div className="text-sm text-gray-500">{t("settings.darkModeDesc", "어두운 테마로 변경")}</div>
                  </Label>
                </div>
                <Switch id="darkMode" checked={theme === "dark"} onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")} />
              </div>

              <Separator />

              <Link to="/settings/language" className="block">
                <button className="w-full flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-gray-400" />
                    <div className="text-left">
                      <div className="font-medium flex items-center gap-2">
                        <span>{t("settings.language", "언어")}</span>
                        <span className="px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-700">{languageLabel}</span>
                      </div>
                      <div className="text-sm text-gray-500">{t("settings.languageDesc", "앱 표시 언어를 선택")}</div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h2 className="font-bold text-lg">{t("settings.support", "고객 지원")}</h2>
            </div>

            <Link to="/settings/help" className="block">
              <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${PP_COLORS.cream}60` }}>
                    <HelpCircle className="w-5 h-5" style={{ color: PP_COLORS.olive }} />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">{t("settings.help", "❓ 도움말")}</div>
                    <div className="text-sm text-gray-500">{t("settings.helpDesc", "자주 묻는 질문 및 사용 가이드")}</div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            </Link>

            <Link to="/settings/contact" className="block">
              <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${PP_COLORS.lime}40` }}>
                    <MessageSquare className="w-5 h-5" style={{ color: PP_COLORS.olive }} />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">{t("settings.contact", "💬 문의하기")}</div>
                    <div className="text-sm text-gray-500">{t("settings.contactDesc", "1:1 문의 및 피드백")}</div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            </Link>

            <Link to="/settings/policies" className="block">
              <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${PP_COLORS.sage}20` }}>
                    <FileText className="w-5 h-5" style={{ color: PP_COLORS.sage }} />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">{t("settings.policies", "📄 약관 및 정책")}</div>
                    <div className="text-sm text-gray-500">{t("settings.policiesDesc", "이용약관 및 개인정보처리방침")}</div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            </Link>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-4">
            <div className="text-center text-sm text-gray-500 space-y-1">
              <div>픽플 v1.0.0</div>
              <div>© 2026 Pick Place. All rights reserved.</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm overflow-hidden border-2 border-red-100">
            <div className="p-4 border-b border-red-100">
              <h2 className="font-bold text-lg text-red-600">위험 구역</h2>
            </div>

            <button className="w-full flex items-center justify-between p-4 hover:bg-red-50 transition-colors">
              <div className="text-left">
                <div className="font-medium text-red-600">계정 탈퇴</div>
                <div className="text-sm text-gray-500">모든 데이터가 영구적으로 삭제됩니다</div>
              </div>
              <ChevronRight className="w-5 h-5 text-red-400" />
            </button>
          </div>
        </div>
      </div>
    </div>;
}

export {
  SettingsPage
};
