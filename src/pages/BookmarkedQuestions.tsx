
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Question } from '@/types/interview';
import { BookmarkCheck, Trash2, BookOpen } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';

const BookmarkedQuestions = () => {
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState<Question[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const savedBookmarks = JSON.parse(localStorage.getItem('bookmarkedQuestions') || '[]');
    setBookmarkedQuestions(savedBookmarks);
  }, []);

  const handleRemoveBookmark = (questionId: string) => {
    const updatedBookmarks = bookmarkedQuestions.filter(q => q.id !== questionId);
    setBookmarkedQuestions(updatedBookmarks);
    localStorage.setItem('bookmarkedQuestions', JSON.stringify(updatedBookmarks));
    toast({ title: "북마크 해제", description: "질문이 북마크에서 제거되었습니다." });
  };

  const handleClearAllBookmarks = () => {
    setBookmarkedQuestions([]);
    localStorage.removeItem('bookmarkedQuestions');
    toast({ title: "전체 삭제", description: "모든 북마크가 삭제되었습니다." });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '기초';
      case 'medium': return '중급';
      case 'hard': return '고급';
      default: return '일반';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* 헤더 */}
          <Card className="shadow-lg mb-8">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              <CardTitle className="text-2xl font-bold flex items-center gap-2">
                <BookmarkCheck className="h-6 w-6" />
                북마크한 질문들
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg text-gray-700">
                    총 <span className="font-bold text-blue-600">{bookmarkedQuestions.length}개</span>의 질문이 북마크되어 있습니다.
                  </p>
                </div>
                {bookmarkedQuestions.length > 0 && (
                  <Button 
                    variant="destructive" 
                    onClick={handleClearAllBookmarks}
                    className="flex items-center gap-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    전체 삭제
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* 북마크된 질문들 */}
          {bookmarkedQuestions.length === 0 ? (
            <Card className="shadow-lg">
              <CardContent className="p-12 text-center">
                <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  아직 북마크한 질문이 없습니다
                </h3>
                <p className="text-gray-500 mb-6">
                  면접 연습 중에 중요한 질문들을 북마크해보세요!
                </p>
                <Button 
                  onClick={() => window.location.href = '/'}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  면접 연습 시작하기
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {bookmarkedQuestions.map((question, index) => (
                <Card key={question.id} className="shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm font-medium text-gray-500">
                            질문 #{index + 1}
                          </span>
                          <Badge className={`${getDifficultyColor(question.difficulty)} text-white`}>
                            {getDifficultyLabel(question.difficulty)}
                          </Badge>
                          <Badge variant="outline">
                            {question.category}
                          </Badge>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                          {question.question}
                        </h3>
                        {question.description && (
                          <p className="text-gray-600 text-sm">
                            {question.description}
                          </p>
                        )}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveBookmark(question.id)}
                        className="ml-4 text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BookmarkedQuestions;
