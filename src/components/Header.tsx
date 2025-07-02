
import React from 'react';
import { Button } from '@/components/ui/button';
import { Brain, Menu, BookmarkCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* 로고 */}
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <Brain className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-800">InterviewAce</span>
          </div>

          {/* 네비게이션 메뉴 */}
          <nav className="hidden md:flex items-center gap-6">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="text-gray-700 hover:text-blue-600"
            >
              홈
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => navigate('/community')}
              className="text-gray-700 hover:text-blue-600"
            >
              커뮤니티
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => navigate('/bookmarks')}
              className="text-gray-700 hover:text-blue-600 flex items-center gap-1"
            >
              <BookmarkCheck className="h-4 w-4" />
              북마크
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => navigate('/wrong-answers')}
              className="text-gray-700 hover:text-blue-600"
            >
              오답노트
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => navigate('/support')}
              className="text-gray-700 hover:text-blue-600"
            >
              고객센터
            </Button>
            <Button 
              onClick={() => navigate('/auth')}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              로그인
            </Button>
          </nav>

          {/* 모바일 메뉴 버튼 */}
          <Button variant="ghost" size="sm" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
