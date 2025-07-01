
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, ThumbsUp, Clock, User, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  category: string;
  likes: number;
  comments: number;
  createdAt: string;
  tags: string[];
}

const Community = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const mockPosts: Post[] = [
    {
      id: '1',
      title: '프론트엔드 면접에서 가장 많이 나오는 React 질문들',
      content: '최근 면접을 본 경험을 바탕으로 자주 나오는 React 관련 질문들을 정리해봤습니다...',
      author: '김개발',
      category: 'frontend',
      likes: 24,
      comments: 8,
      createdAt: '2시간 전',
      tags: ['React', 'JavaScript', '면접후기']
    },
    {
      id: '2', 
      title: 'Spring Boot 면접 질문 정리 (3년차 경험)',
      content: 'Java Spring 관련해서 실제 면접에서 받았던 질문들과 답변 방향을 공유합니다...',
      author: '박백엔드',
      category: 'backend',
      likes: 18,
      comments: 12,
      createdAt: '5시간 전',
      tags: ['Java', 'Spring', '경력면접']
    },
    {
      id: '3',
      title: 'AWS 인프라 면접 준비 꿀팁',
      content: 'DevOps 엔지니어로 이직하면서 준비했던 AWS 관련 면접 질문들을 공유해요...',
      author: '이데브옵스',
      category: 'devops',
      likes: 31,
      comments: 6,
      createdAt: '1일 전',
      tags: ['AWS', 'DevOps', '이직']
    },
    {
      id: '4',
      title: '네트워크 CS 질문 완벽 정리',
      content: 'TCP/UDP, HTTP/HTTPS, DNS 등 네트워크 관련 CS 질문들을 체계적으로 정리했습니다...',
      author: '최CS마스터',
      category: 'cs',
      likes: 45,
      comments: 15,
      createdAt: '2일 전',
      tags: ['네트워크', 'CS', '신입']
    }
  ];

  const categories = [
    { id: 'all', label: '전체', color: 'bg-gray-100 text-gray-800' },
    { id: 'frontend', label: '프론트엔드', color: 'bg-blue-100 text-blue-800' },
    { id: 'backend', label: '백엔드', color: 'bg-green-100 text-green-800' },
    { id: 'devops', label: 'DevOps', color: 'bg-purple-100 text-purple-800' },
    { id: 'cs', label: 'CS', color: 'bg-orange-100 text-orange-800' }
  ];

  const filteredPosts = selectedCategory === 'all' 
    ? mockPosts 
    : mockPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block mb-4">
            <h1 className="text-3xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
              InterviewAce
            </h1>
          </Link>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            개발자 <span className="text-blue-600">커뮤니티</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            면접 경험을 공유하고, 함께 성장하는 개발자 커뮤니티
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className="rounded-full"
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="text-center">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">전체 게시글</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">1,247</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">활성 사용자</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">523</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">이번 주 답변</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">89</div>
            </CardContent>
          </Card>
        </div>

        {/* Posts */}
        <div className="space-y-6">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600 cursor-pointer">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-3 line-clamp-2">
                      {post.content}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Badge 
                    className={categories.find(c => c.id === post.category)?.color}
                  >
                    {categories.find(c => c.id === post.category)?.label}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {post.author}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {post.createdAt}
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      {post.likes}
                    </div>
                    <div className="flex items-center">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      {post.comments}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Write Post Button */}
        <div className="fixed bottom-8 right-8">
          <Button size="lg" className="rounded-full shadow-lg">
            <MessageCircle className="h-5 w-5 mr-2" />
            글쓰기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Community;
