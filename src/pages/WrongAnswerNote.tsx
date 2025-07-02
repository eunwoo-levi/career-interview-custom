
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Clock, RefreshCcw, Trash2, Filter } from 'lucide-react';

interface WrongAnswer {
  id: string;
  question: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  userAnswer: string;
  correctAnswer: string;
  explanation: string;
  date: string;
  retryCount: number;
}

const WrongAnswerNote = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const mockWrongAnswers: WrongAnswer[] = [
    {
      id: '1',
      question: 'React에서 useEffect의 두 번째 매개변수(dependency array)의 역할은 무엇인가요?',
      category: 'React',
      difficulty: 'medium',
      userAnswer: '컴포넌트가 렌더링될 때마다 실행됩니다.',
      correctAnswer: 'dependency array에 포함된 값들이 변경될 때만 effect가 실행됩니다.',
      explanation: 'useEffect의 두 번째 매개변수는 의존성 배열로, 이 배열에 포함된 값들이 변경될 때만 effect가 다시 실행됩니다. 빈 배열([])을 전달하면 마운트/언마운트 시에만 실행됩니다.',
      date: '2024-01-15',
      retryCount: 2
    },
    {
      id: '2',
      question: 'TCP와 UDP의 주요 차이점을 설명하세요.',
      category: '네트워크',
      difficulty: 'medium',
      userAnswer: 'TCP는 빠르고 UDP는 느립니다.',
      correctAnswer: 'TCP는 연결 지향적이고 신뢰성을 보장하며, UDP는 비연결 지향적이고 빠른 전송에 중점을 둡니다.',
      explanation: 'TCP는 3-way handshake로 연결을 설정하고 데이터 전송 순서와 정확성을 보장합니다. UDP는 연결 설정 없이 빠르게 데이터를 전송하지만 신뢰성은 보장하지 않습니다.',
      date: '2024-01-14',
      retryCount: 1
    },
    {
      id: '3',
      question: 'Spring Boot에서 @Autowired 어노테이션의 역할은 무엇인가요?',
      category: 'Spring',
      difficulty: 'easy',
      userAnswer: '클래스를 자동으로 생성합니다.',
      correctAnswer: '의존성 주입(Dependency Injection)을 자동으로 수행합니다.',
      explanation: '@Autowired는 스프링 컨테이너에서 해당 타입의 빈을 찾아 자동으로 주입해주는 어노테이션입니다. 생성자, 필드, 메서드에 사용할 수 있습니다.',
      date: '2024-01-13',
      retryCount: 0
    }
  ];

  const categories = ['all', 'React', '네트워크', 'Spring', 'JavaScript', 'Java'];
  
  const filteredAnswers = selectedCategory === 'all' 
    ? mockWrongAnswers 
    : mockWrongAnswers.filter(answer => answer.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleRetry = (id: string) => {
    console.log('Retry question:', id);
    // 실제 서비스에서는 해당 질문으로 다시 면접 시작
  };

  const handleDelete = (id: string) => {
    console.log('Delete wrong answer:', id);
    // 실제 서비스에서는 API 호출로 삭제
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            <BookOpen className="inline-block mr-3 h-10 w-10 text-blue-600" />
            오답 노트
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            틀린 문제들을 다시 보고 학습하여 실력을 향상시키세요
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-red-600 mb-2">{mockWrongAnswers.length}</div>
              <p className="text-sm text-gray-600">총 오답 문제</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {mockWrongAnswers.filter(a => a.retryCount > 0).length}
              </div>
              <p className="text-sm text-gray-600">재시도한 문제</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {Math.round(mockWrongAnswers.filter(a => a.retryCount > 0).length / mockWrongAnswers.length * 100)}%
              </div>
              <p className="text-sm text-gray-600">학습 진행률</p>
            </CardContent>
          </Card>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="rounded-full"
            >
              <Filter className="h-4 w-4 mr-2" />
              {category === 'all' ? '전체' : category}
            </Button>
          ))}
        </div>

        {/* Wrong Answers List */}
        <div className="space-y-6">
          {filteredAnswers.map((answer) => (
            <Card key={answer.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={getDifficultyColor(answer.difficulty)}>
                        {answer.difficulty}
                      </Badge>
                      <Badge variant="outline">{answer.category}</Badge>
                      <div className="flex items-center text-sm text-gray-500 ml-auto">
                        <Clock className="h-4 w-4 mr-1" />
                        {answer.date}
                      </div>
                    </div>
                    <CardTitle className="text-lg font-semibold text-gray-900">
                      {answer.question}
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-red-600 mb-2">❌ 내 답변:</h4>
                  <p className="text-gray-700 bg-red-50 p-3 rounded">{answer.userAnswer}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-green-600 mb-2">✅ 정답:</h4>
                  <p className="text-gray-700 bg-green-50 p-3 rounded">{answer.correctAnswer}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-blue-600 mb-2">💡 해설:</h4>
                  <p className="text-gray-700 bg-blue-50 p-3 rounded">{answer.explanation}</p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="text-sm text-gray-600">
                    재시도 횟수: <span className="font-medium">{answer.retryCount}회</span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRetry(answer.id)}
                    >
                      <RefreshCcw className="h-4 w-4 mr-2" />
                      다시 풀기
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(answer.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      삭제
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredAnswers.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              오답이 없습니다
            </h3>
            <p className="text-gray-600">
              {selectedCategory === 'all' 
                ? '아직 틀린 문제가 없습니다. 면접 연습을 시작해보세요!' 
                : `${selectedCategory} 카테고리에 틀린 문제가 없습니다.`}
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default WrongAnswerNote;
