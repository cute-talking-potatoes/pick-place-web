import { Check } from "lucide-react";
import { TopNav } from "../components/TopNav";
import { useAppPreferences } from "../context/AppPreferencesContext";
import { PP_COLORS } from "../utils/ppStyles";

function LanguageSettingsPage() {
  const { locale, setLocale, supportedLanguages, t } = useAppPreferences();

  return <div className="min-h-screen bg-gray-50 pb-6">
      <TopNav title={t("language.title", "언어 설정")} showBack />

      <div className="pt-14">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="bg-white rounded-2xl shadow-sm p-4">
            <p className="text-sm text-gray-600 mb-4">
              {t("language.subtitle", "앱에서 사용할 언어를 선택하세요.")}
            </p>

            <div className="space-y-2">
              {supportedLanguages.map((language) => {
      const isActive = locale === language.code;
      return <button
        key={language.code}
        type="button"
        onClick={() => setLocale(language.code)}
        className={`w-full flex items-center justify-between rounded-xl border px-4 py-3 text-left transition-colors ${isActive ? "border-transparent" : "border-gray-200 hover:bg-gray-50"}`}
        style={isActive ? { backgroundColor: `${PP_COLORS.lime}30`, color: "#1f2937" } : {}}
      >
                    <div>
                      <p className="font-medium">{language.nativeLabel}</p>
                      <p className="text-xs text-gray-500">{language.label}</p>
                    </div>
                    {isActive && <div className="inline-flex items-center gap-1 text-xs font-medium" style={{ color: PP_COLORS.sage }}>
                        <Check className="w-4 h-4" />
                        {t("language.current", "현재 선택")}
                      </div>}
                  </button>;
    })}
            </div>
          </div>
        </div>
      </div>
    </div>;
}

export {
  LanguageSettingsPage
};
