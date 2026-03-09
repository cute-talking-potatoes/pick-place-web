import { Link, useNavigate } from "react-router";
import { ArrowLeft, Bell, Search, Settings } from "lucide-react";
import { Button } from "./ui/button";
function TopNav({
  title,
  showBack = false,
  showSearch = false,
  showNotification = false,
  showSettings = false
}) {
  const navigate = useNavigate();
  return <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
            <div className="flex items-center justify-between h-14 px-4 max-w-7xl mx-auto">
                <div className="flex items-center gap-2">
                    {showBack && <Button
    variant="ghost"
    size="icon"
    onClick={() => navigate(-1)}
    className="mr-2"
  >
                            <ArrowLeft className="w-5 h-5" />
                        </Button>}
                    {title && <h1 className="font-semibold text-lg">{title}</h1>}
                    {!title && !showBack && <Link to="/main" className="font-bold text-xl" style={{ color: "#A5C89E" }}>
                            📍 픽플
                        </Link>}
                </div>

                <div className="flex items-center gap-2">
                    {showSearch && <Button variant="ghost" size="icon">
                            <Search className="w-5 h-5" />
                        </Button>}
                    {showNotification && <Button variant="ghost" size="icon" className="relative">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
                        </Button>}
                    {showSettings && <Link to="/settings">
                            <Button variant="ghost" size="icon">
                                <Settings className="w-5 h-5" />
                            </Button>
                        </Link>}
                </div>
            </div>
        </header>;
}
export {
  TopNav
};
