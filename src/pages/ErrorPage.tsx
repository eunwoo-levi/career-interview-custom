
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ErrorPageProps {
  error?: string;
  resetError?: () => void;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ 
  error = "알 수 없는 오류가 발생했습니다.", 
  resetError 
}) => {
  const handleRefresh = () => {
    if (resetError) {
      resetError();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-md text-center shadow-lg">
        <CardHeader>
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            오류가 발생했습니다
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">
            {error}
          </p>
          <p className="text-sm text-gray-500">
            문제가 지속되면 새로고침하거나 홈으로 돌아가세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={handleRefresh}
              className="flex-1"
              variant="outline"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              새로고침
            </Button>
            <Link to="/" className="flex-1">
              <Button className="w-full">
                <Home className="h-4 w-4 mr-2" />
                홈으로
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ErrorPage;
