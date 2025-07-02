
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Brain, Users, BookOpen, FileText, HelpCircle } from 'lucide-react';

const Header = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: '면접 연습', icon: Brain },
    { path: '/community', label: '커뮤니티', icon: Users },
    { path: '/wrong-answers', label: '오답노트', icon: FileText },
    { path: '/support', label: '고객센터', icon: HelpCircle },
  ];

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">InterviewAce</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link key={item.path} to={item.path}>
                  <Button 
                    variant={isActive ? "default" : "ghost"}
                    className="flex items-center space-x-2"
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Button>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center space-x-2">
            <Link to="/auth">
              <Button variant="outline" size="sm">
                로그인
              </Button>
            </Link>
            <Link to="/auth">
              <Button size="sm">
                회원가입
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
