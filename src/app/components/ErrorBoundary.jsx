import { useRouteError, Link } from "react-router";
import { Button } from "./ui/button";
import { AlertCircle, Home } from "lucide-react";
import { PP_COLORS } from "../utils/ppStyles";
function ErrorBoundary() {
  const error = useRouteError();
  return <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full text-center">
                <div className="bg-white rounded-3xl p-8 shadow-lg">
                    <div
    className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center"
    style={{ backgroundColor: `${PP_COLORS.yellow}40` }}
  >
                        <AlertCircle className="w-10 h-10" style={{ color: PP_COLORS.olive }} />
                    </div>

                    <h1 className="text-2xl font-bold mb-2">앗, 문제가 발생했어요!</h1>

                    <p className="text-gray-600 mb-6">
                        {error?.statusText || error?.message || "\uD398\uC774\uC9C0\uB97C \uBD88\uB7EC\uC62C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}
                    </p>

                    <Link to="/main">
                        <Button
    className="w-full"
    style={{ backgroundColor: PP_COLORS.sage, color: "white" }}
  >
                            <Home className="w-4 h-4 mr-2" />
              홈으로 돌아가기
            </Button>
                    </Link>
                </div>
            </div>
        </div>;
}
export {
  ErrorBoundary
};
