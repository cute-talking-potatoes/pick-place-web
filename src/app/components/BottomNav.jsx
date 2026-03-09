import { Link, useLocation } from "react-router";
import { List, MessageSquare, User, Map } from "lucide-react";
function BottomNav() {
  const location = useLocation();
  const navItems = [
    { path: "/main", icon: Map, label: "\uC9C0\uB3C4" },
    { path: "/spots", icon: List, label: "\uC2A4\uD31F" },
    { path: "/community", icon: MessageSquare, label: "\uCEE4\uBBA4\uB2C8\uD2F0" },
    { path: "/profile", icon: User, label: "\uB0B4 \uC815\uBCF4" }
  ];
  return <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 lg:hidden">
            <div className="flex justify-around items-center h-16 px-2">
                {navItems.map((item) => {
    const Icon = item.icon;
    const isActive = location.pathname === item.path;
    return <Link
      key={item.path}
      to={item.path}
      className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${isActive ? "text-[#A5C89E]" : "text-gray-500 hover:text-gray-700"}`}
    >
                            <Icon className="w-6 h-6 mb-1" />
                            <span className="text-xs">{item.label}</span>
                        </Link>;
  })}
            </div>
        </nav>;
}
export {
  BottomNav
};
