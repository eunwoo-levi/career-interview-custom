
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Search, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-md text-center shadow-lg">
        <CardHeader>
          <div className="mx-auto w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Search className="h-10 w-10 text-blue-600" />
          </div>
          <CardTitle className="text-4xl font-bold text-gray-900 mb-2">
            404
          </CardTitle>
          <CardTitle className="text-xl font-semibold text-gray-700">
            페이지를 찾을 수 없습니다
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">
            요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
          </p>
          <p className="text-sm text-gray-500">
            경로: <code className="bg-gray-100 px-2 py-1 rounded">{location.pathname}</code>
          </p>
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button 
              onClick={() => window.history.back()}
              variant="outline"
              className="flex-1"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              이전 페이지
            </Button>
            <Link to="/" className="flex-1">
              <Button className="w-full">
                <Home className="h-4 w-4 mr-2" />
                홈으로 가기
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
