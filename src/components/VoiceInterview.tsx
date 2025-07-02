
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { InterviewConfig, Question } from '@/types/interview';
import { getQuestionsForConfig } from '@/utils/questionGenerator';
import { Mic, MicOff, Volume2, VolumeX, Clock, BookmarkPlus, BookmarkCheck } from 'lucide-react';
import { useConversation } from '@11labs/react';
import { useToast } from '@/hooks/use-toast';

interface VoiceInterviewProps {
  config: InterviewConfig;
  onEndInterview: () => void;
}

const VoiceInterview: React.FC<VoiceInterviewProps> = ({ config, onEndInterview }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(180);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState<Set<string>>(new Set());
  const [apiKey, setApiKey] = useState('');
  const [agentId, setAgentId] = useState('');
  const [isSetupVisible, setIsSetupVisible] = useState(true);
  const { toast } = useToast();

  const conversation = useConversation({
    onConnect: () => {
      console.log('Voice conversation connected');
      setIsTimerActive(true);
      setIsSetupVisible(false);
      toast({ title: "음성 면접 시작", description: "면접관과 대화를 시작합니다." });
    },
    onDisconnect: () => {
      console.log('Voice conversation disconnected');
      setIsTimerActive(false);
    },
    onError: (error) => {
      console.error('Voice conversation error:', error);
      toast({ title: "오류", description: "음성 연결에 문제가 발생했습니다.", variant: "destructive" });
    }
  });

  useEffect(() => {
    const generatedQuestions = getQuestionsForConfig(config);
    setQuestions(generatedQuestions);
  }, [config]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isTimerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleNextQuestion();
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerActive, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartVoiceInterview = async () => {
    if (!apiKey || !agentId) {
      toast({ title: "설정 필요", description: "ElevenLabs API 키와 Agent ID를 입력해주세요.", variant: "destructive" });
      return;
    }

    try {
      console.log('Starting voice interview with agentId:', agentId);
      // 마이크 권한 요청
      await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // 세션 시작  
      await conversation.startSession({ agentId });
      console.log('Voice session started successfully');
    } catch (error) {
      console.error('Failed to start voice conversation:', error);
      toast({ title: "연결 실패", description: "음성 면접 연결에 실패했습니다. 마이크 권한을 확인해주세요.", variant: "destructive" });
    }
  };

  const handleStopVoiceInterview = async () => {
    try {
      await conversation.endSession();
      setIsSetupVisible(true);
    } catch (error) {
      console.error('Failed to end voice conversation:', error);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(180);
    } else {
      handleStopVoiceInterview();
      onEndInterview();
    }
  };

  const handleBookmark = (questionId: string) => {
    const newBookmarks = new Set(bookmarkedQuestions);
    if (newBookmarks.has(questionId)) {
      newBookmarks.delete(questionId);
      // 로컬 스토리지에서도 제거
      const existingBookmarks = JSON.parse(localStorage.getItem('bookmarkedQuestions') || '[]');
      const updatedBookmarks = existingBookmarks.filter((q: Question) => q.id !== questionId);
      localStorage.setItem('bookmarkedQuestions', JSON.stringify(updatedBookmarks));
      toast({ title: "북마크 해제", description: "질문 북마크가 해제되었습니다." });
    } else {
      newBookmarks.add(questionId);
      // 로컬 스토리지에 저장
      const currentQuestion = questions[currentQuestionIndex];
      const existingBookmarks = JSON.parse(localStorage.getItem('bookmarkedQuestions') || '[]');
      const updatedBookmarks = [...existingBookmarks, currentQuestion];
      localStorage.setItem('bookmarkedQuestions', JSON.stringify(updatedBookmarks));
      toast({ title: "북마크 추가", description: "질문이 북마크에 추가되었습니다." });
    }
    setBookmarkedQuestions(newBookmarks);
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
          <p className="text-lg text-gray-600">음성 면접 질문을 준비하고 있습니다...</p>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* API 설정 */}
      {isSetupVisible && (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>음성 면접 설정</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">ElevenLabs API Key</label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="ElevenLabs API 키를 입력하세요"
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Agent ID</label>
              <input
                type="text"
                value={agentId}
                onChange={(e) => setAgentId(e.target.value)}
                placeholder="Agent ID를 입력하세요"
                className="w-full p-2 border rounded"
              />
            </div>
            <Button onClick={handleStartVoiceInterview} className="w-full" disabled={!apiKey || !agentId}>
              <Mic className="h-4 w-4 mr-2" />
              음성 면접 시작하기
            </Button>
          </CardContent>
        </Card>
      )}

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
          <div className="flex justify-between items-start">
            <CardTitle className="text-xl font-semibold text-gray-800 flex-1">
              {currentQuestion.question}
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleBookmark(currentQuestion.id)}
              className="ml-4"
            >
              {bookmarkedQuestions.has(currentQuestion.id) ? (
                <BookmarkCheck className="h-4 w-4 text-blue-600" />
              ) : (
                <BookmarkPlus className="h-4 w-4" />
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <div className="text-lg text-gray-600">
              {conversation.status === 'connected' ? (
                <div className="flex items-center justify-center gap-2">
                  <Mic className="h-6 w-6 text-green-500" />
                  <span>음성 면접 진행 중...</span>
                  {conversation.isSpeaking && <Volume2 className="h-5 w-5 text-blue-500 animate-pulse" />}
                </div>
              ) : (
                <span>음성 면접을 시작하세요</span>
              )}
            </div>

            <div className="flex justify-center gap-4">
              {conversation.status === 'connected' ? (
                <Button variant="destructive" onClick={handleStopVoiceInterview}>
                  <MicOff className="h-4 w-4 mr-2" />
                  음성 면접 종료
                </Button>
              ) : (
                <Button onClick={handleStartVoiceInterview} disabled={!apiKey || !agentId || isSetupVisible}>
                  <Mic className="h-4 w-4 mr-2" />
                  음성 면접 시작
                </Button>
              )}
              
              <Button variant="outline" onClick={handleNextQuestion}>
                다음 질문
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 북마크된 질문 개수 */}
      {bookmarkedQuestions.size > 0 && (
        <Card className="shadow-lg bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-center gap-2 text-blue-700">
              <BookmarkCheck className="h-5 w-5" />
              <span>북마크된 질문: {bookmarkedQuestions.size}개</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 면접 종료 버튼 */}
      <div className="text-center">
        <Button variant="destructive" onClick={onEndInterview}>
          면접 종료
        </Button>
      </div>
    </div>
  );
};

export default VoiceInterview;
