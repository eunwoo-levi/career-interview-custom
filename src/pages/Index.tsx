import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InterviewSetup from '@/components/InterviewSetup';
import InterviewSession from '@/components/InterviewSession';
import VoiceInterview from '@/components/VoiceInterview';
import { InterviewConfig } from '@/types/interview';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Users, 
  FileText, 
  Clock, 
  Target, 
  TrendingUp,
  CheckCircle,
  Star,
  ArrowRight,
  Mic,
  MessageSquare
} from 'lucide-react';

const Index = () => {
  const [currentStep, setCurrentStep] = useState<'setup' | 'interview' | 'voice-interview'>('setup');
  const [interviewConfig, setInterviewConfig] = useState<InterviewConfig | null>(null);

  const handleStartInterview = (config: InterviewConfig, isVoice: boolean = false) => {
    setInterviewConfig(config);
    setCurrentStep(isVoice ? 'voice-interview' : 'interview');
  };

  const handleEndInterview = () => {
    setCurrentStep('setup');
    setInterviewConfig(null);
  };

  if (currentStep === 'interview' && interviewConfig) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <InterviewSession config={interviewConfig} onEndInterview={handleEndInterview} />
        </div>
        <Footer />
      </div>
    );
  }

  if (currentStep === 'voice-interview' && interviewConfig) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <VoiceInterview config={interviewConfig} onEndInterview={handleEndInterview} />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Header />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            개발자 면접의 <span className="text-blue-600">새로운 기준</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            AI 기반 맞춤형 면접 질문으로 실전같은 연습을 경험하세요. 
            텍스트와 음성 면접 모두 지원합니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 bg-blue-600 hover:bg-blue-700"
              onClick={() => {
                const element = document.getElementById('interview-setup');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              텍스트 면접 시작하기
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8 py-6 border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
              onClick={() => {
                const element = document.getElementById('interview-setup');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Mic className="mr-2 h-5 w-5" />
              음성 면접 체험하기
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 mx-auto mb-4">
                <Brain className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
                AI 기반 질문 생성
              </h3>
              <p className="text-gray-600 text-center">
                AI가 생성하는 최적의 질문으로 면접 준비
              </p>
            </CardContent>
          </Card>

          {/* Feature 2 */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600 mx-auto mb-4">
                <Target className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
                맞춤형 질문
              </h3>
              <p className="text-gray-600 text-center">
                직무, 경력, 기술 스택에 따른 맞춤형 질문 제공
              </p>
            </CardContent>
          </Card>

          {/* Feature 3 */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-purple-100 text-purple-600 mx-auto mb-4">
                <TrendingUp className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
                실력 향상
              </h3>
              <p className="text-gray-600 text-center">
                체계적인 면접 연습을 통해 실력 향상
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {/* Stat 1 */}
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">300+</div>
              <p className="text-gray-700">질문 데이터</p>
            </div>

            {/* Stat 2 */}
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">100+</div>
              <p className="text-gray-700">활성 사용자</p>
            </div>

            {/* Stat 3 */}
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">4.8</div>
              <div className="flex items-center justify-center text-yellow-500">
                <Star className="w-6 h-6" />
                <Star className="w-6 h-6" />
                <Star className="w-6 h-6" />
                <Star className="w-6 h-6" />
                <Star className="w-6 h-6" />
              </div>
              <p className="text-gray-700">평점</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            사용자 후기
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            InterviewAce를 사용한 사용자들의 생생한 후기를 확인하세요
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Testimonial 1 */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <CheckCircle className="text-green-500 mr-2" />
                <h4 className="text-lg font-semibold text-gray-900">
                  "정말 도움이 됐어요!"
                </h4>
              </div>
              <p className="text-gray-700">
                덕분에 면접에서 자신감을 얻었고, 좋은 결과를 얻을 수 있었습니다.
              </p>
              <div className="mt-4 text-sm text-gray-500">
                - 김**
              </div>
            </CardContent>
          </Card>

          {/* Testimonial 2 */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <CheckCircle className="text-green-500 mr-2" />
                <h4 className="text-lg font-semibold text-gray-900">
                  "강력 추천합니다!"
                </h4>
              </div>
              <p className="text-gray-700">
                다양한 질문과 체계적인 시스템 덕분에 실력이 향상되는 것을 느꼈습니다.
              </p>
              <div className="mt-4 text-sm text-gray-500">
                - 이**
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Interview Setup */}
      <section id="interview-setup" className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            맞춤형 면접 설정
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            당신의 직무와 경력에 맞는 면접 질문을 생성합니다
          </p>
        </div>
        
        <InterviewSetup 
          onStartInterview={(config) => handleStartInterview(config, false)}
          onStartVoiceInterview={(config) => handleStartInterview(config, true)}
        />
      </section>

      <Footer />
    </div>
  );
};

export default Index;
