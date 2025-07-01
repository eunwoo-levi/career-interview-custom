
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { InterviewConfig, Question } from '@/types/interview';
import { getQuestionsForConfig } from '@/utils/questionGenerator';
import { Clock, CheckCircle, XCircle } from 'lucide-react';

interface InterviewSessionProps {
  config: InterviewConfig;
  onEndInterview: () => void;
}

const InterviewSession: React.FC<InterviewSessionProps> = ({ config, onEndInterview }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [timeLeft, setTimeLeft] = useState(180); // 3분
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const generatedQuestions = getQuestionsForConfig(config);
    setQuestions(generatedQuestions);
    setAnswers(new Array(generatedQuestions.length).fill(''));
  }, [config]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isTimerActive && timeLeft > 0 && !showResults) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleNextQuestion();
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerActive, timeLeft, showResults]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleNextQuestion = () => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = currentAnswer;
    setAnswers(newAnswers);
    setCurrentAnswer('');

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(180);
    } else {
      setShowResults(true);
      setIsTimerActive(false);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      const newAnswers = [...answers];
      newAnswers[currentQuestionIndex] = currentAnswer;
      setAnswers(newAnswers);
      
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setCurrentAnswer(answers[currentQuestionIndex - 1] || '');
      setTimeLeft(180);
    }
  };

  const getProgressPercentage = () => {
    return ((currentQuestionIndex + 1) / questions.length) * 100;
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

  if (questions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">면접 질문을 준비하고 있습니다...</p>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <Card className="max-w-4xl mx-auto shadow-lg">
        <CardHeader className="bg-gradient-to-r from-green-500 to-blue-600 text-white">
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <CheckCircle className="h-6 w-6" />
            면접 완료!
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">면접 결과 요약</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">총 질문 수</p>
                  <p className="text-2xl font-bold text-blue-600">{questions.length}개</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">답변 완료</p>
                  <p className="text-2xl font-bold text-green-600">
                    {answers.filter(answer => answer.trim().length > 0).length}개
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">완료율</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {Math.round((answers.filter(answer => answer.trim().length > 0).length / questions.length) * 100)}%
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold">답변 내역</h4>
              {questions.map((question, index) => (
                <div key={question.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h5 className="font-medium text-gray-800 flex-1">{question.question}</h5>
                    <Badge className={`ml-2 ${getDifficultyColor(question.difficulty)} text-white`}>
                      {getDifficultyLabel(question.difficulty)}
                    </Badge>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-600 mb-1">내 답변:</p>
                    <div className="bg-gray-50 p-3 rounded border min-h-16">
                      {answers[index] || (
                        <span className="text-gray-400 italic">답변하지 않음</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center">
              <Button onClick={onEndInterview} size="lg" className="px-8">
                새로운 면접 시작하기
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* 진행상황 헤더 */}
      <Card className="shadow-lg">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                질문 {currentQuestionIndex + 1} / {questions.length}
              </h2>
              <p className="text-sm text-gray-600">{currentQuestion.category}</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge className={`${getDifficultyColor(currentQuestion.difficulty)} text-white`}>
                {getDifficultyLabel(currentQuestion.difficulty)}
              </Badge>
              <div className="flex items-center gap-2 text-lg font-mono">
                <Clock className="h-5 w-5 text-red-500" />
                <span className={timeLeft <= 30 ? 'text-red-500 font-bold' : 'text-gray-700'}>
                  {formatTime(timeLeft)}
                </span>
              </div>
            </div>
          </div>
          <Progress value={getProgressPercentage()} className="h-2" />
        </CardContent>
      </Card>

      {/* 질문 카드 */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-800">
            {currentQuestion.question}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Textarea
            value={currentAnswer}
            onChange={(e) => setCurrentAnswer(e.target.value)}
            placeholder="답변을 입력해주세요..."
            className="min-h-48 resize-none text-base"
          />
          <div className="flex justify-between items-center mt-6">
            <Button
              variant="outline"
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
            >
              이전 질문
            </Button>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setIsTimerActive(!isTimerActive)}
              >
                {isTimerActive ? '타이머 정지' : '타이머 시작'}
              </Button>
              <Button onClick={handleNextQuestion}>
                {currentQuestionIndex === questions.length - 1 ? '면접 완료' : '다음 질문'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 면접 종료 버튼 */}
      <div className="text-center">
        <Button variant="destructive" onClick={onEndInterview}>
          면접 종료
        </Button>
      </div>
    </div>
  );
};

export default InterviewSession;
