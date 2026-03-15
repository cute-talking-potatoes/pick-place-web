import { createContext, useContext, useEffect, useMemo, useState } from "react";

const LOCALE_STORAGE_KEY = "app_locale";
const THEME_STORAGE_KEY = "app_theme";

const SUPPORTED_LANGUAGES = [
  { code: "ko", label: "한국어", nativeLabel: "한국어" },
  { code: "en", label: "English", nativeLabel: "English" }
];

const messages = {
  ko: {
    settings: {
      title: "설정",
      account: "계정",
      passwordChange: "🔒 비밀번호 변경",
      passwordDesc: "비밀번호를 안전하게 변경하세요",
      privacy: "🛡️ 개인정보 보호",
      privacyDesc: "개인정보 및 계정 보안 설정",
      logout: "로그아웃",
      logoutDesc: "현재 계정에서 로그아웃합니다",
      notifications: "알림 설정",
      likes: "좋아요",
      likesDesc: "내 게시글에 좋아요가 달렸을 때",
      comments: "댓글",
      commentsDesc: "내 게시글에 댓글이 달렸을 때",
      meetups: "모임",
      meetupsDesc: "모임 알림 및 일정 안내",
      messages: "메시지",
      messagesDesc: "새로운 메시지가 도착했을 때",
      marketing: "마케팅 정보",
      marketingDesc: "이벤트 및 혜택 정보 수신",
      display: "표시 설정",
      darkMode: "다크 모드",
      darkModeDesc: "어두운 테마로 변경",
      language: "언어",
      languageDesc: "앱 표시 언어를 선택",
      support: "고객 지원",
      help: "❓ 도움말",
      helpDesc: "자주 묻는 질문 및 사용 가이드",
      contact: "💬 문의하기",
      contactDesc: "1:1 문의 및 피드백",
      policies: "📄 약관 및 정책",
      policiesDesc: "이용약관 및 개인정보처리방침",
      languageValueKo: "한국어",
      languageValueEn: "English"
    },
    language: {
      title: "언어 설정",
      subtitle: "앱에서 사용할 언어를 선택하세요.",
      current: "현재 선택"
    }
  },
  en: {
    settings: {
      title: "Settings",
      account: "Account",
      passwordChange: "🔒 Change Password",
      passwordDesc: "Update your password securely",
      privacy: "🛡️ Privacy",
      privacyDesc: "Privacy and account security settings",
      logout: "Log Out",
      logoutDesc: "Log out from current account",
      notifications: "Notifications",
      likes: "Likes",
      likesDesc: "When someone likes your post",
      comments: "Comments",
      commentsDesc: "When someone comments on your post",
      meetups: "Meetups",
      meetupsDesc: "Meetup alerts and schedule updates",
      messages: "Messages",
      messagesDesc: "When a new message arrives",
      marketing: "Marketing",
      marketingDesc: "Promotions and event updates",
      display: "Display",
      darkMode: "Dark Mode",
      darkModeDesc: "Switch to dark theme",
      language: "Language",
      languageDesc: "Choose app display language",
      support: "Support",
      help: "❓ Help",
      helpDesc: "FAQ and user guide",
      contact: "💬 Contact Us",
      contactDesc: "1:1 inquiry and feedback",
      policies: "📄 Terms & Policies",
      policiesDesc: "Terms of service and privacy policy",
      languageValueKo: "Korean",
      languageValueEn: "English"
    },
    language: {
      title: "Language",
      subtitle: "Select the language used in the app.",
      current: "Current"
    }
  }
};

const AppPreferencesContext = createContext(null);

function AppPreferencesProvider({ children }) {
  const [locale, setLocale] = useState(() => {
    if (typeof window === "undefined") return "ko";
    try {
      return localStorage.getItem(LOCALE_STORAGE_KEY) || "ko";
    } catch {
      return "ko";
    }
  });
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "light";
    try {
      return localStorage.getItem(THEME_STORAGE_KEY) || "light";
    } catch {
      return "light";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    } catch {
      // Ignore storage failures (private mode, policy restrictions).
    }
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Ignore storage failures (private mode, policy restrictions).
    }
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const value = useMemo(() => {
    const language = SUPPORTED_LANGUAGES.find((item) => item.code === locale) || SUPPORTED_LANGUAGES[0];
    const t = (key, fallback = "") => {
      const segments = key.split(".");
      let current = messages[locale];
      for (const segment of segments) {
        current = current?.[segment];
      }
      return typeof current === "string" ? current : fallback;
    };
    return {
      locale,
      setLocale,
      theme,
      setTheme,
      toggleTheme: () => setTheme((prev) => prev === "dark" ? "light" : "dark"),
      supportedLanguages: SUPPORTED_LANGUAGES,
      currentLanguage: language,
      t
    };
  }, [locale, theme]);

  return <AppPreferencesContext.Provider value={value}>{children}</AppPreferencesContext.Provider>;
}

function useAppPreferences() {
  const context = useContext(AppPreferencesContext);
  if (!context) throw new Error("useAppPreferences must be used within AppPreferencesProvider");
  return context;
}

export {
  AppPreferencesProvider,
  useAppPreferences
};
