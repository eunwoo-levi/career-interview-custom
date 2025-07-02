import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InterviewSetup from '@/components/InterviewSetup';
import InterviewSession from '@/components/InterviewSession';
import LoadingSpinner from '@/components/LoadingSpinner';
import { InterviewConfig } from '@/types/interview';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Target, 
  Users, 
  TrendingUp, 
  CheckCircle, 
  Star,
  ArrowRight,
  Play
} from 'lucide-react';

const Index = () => {
  const [interviewConfig, setInterviewConfig] = useState<InterviewConfig | null>(null);
  const [isInterviewStarted, setIsInterviewStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSetup, setShowSetup] = useState(false);

  const handleStartInterview = async (config: InterviewConfig) => {
    setIsLoading(true);
    // 실제 서비스에서는 API 호출
    await new Promise(resolve => setTimeout(resolve, 1500));
    setInterviewConfig(config);
    setIsInterviewStarted(true);
    setIsLoading(false);
  };

  const handleEndInterview = () => {
    setIsInterviewStarted(false);
    setInterviewConfig(null);
    setShowSetup(false);
  };

  const features = [
    {
      icon: Target,
      title: '맞춤형 면접 질문',
      description: '개발 분야, 경력, 회사 유형에 따른 최적화된 질문',
      color: 'text-blue-600'
    },
    {
      icon: Brain,
      title: 'AI 기반 분석',
      description: '실제 면접 트렌드와 기업별 출제 경향 분석',
      color: 'text-green-600'
    },
    {
      icon: Users,
      title: '커뮤니티 공유',
      description: '실제 면접 후기와 팁을 개발자들과 공유',
      color: 'text-purple-600'
    },
    {
      icon: TrendingUp,
      title: '실력 향상 추적',
      description: '면접 연습 기록과 약점 분석으로 지속적 개선',
      color: 'text-orange-600'
    }
  ];

  const stats = [
    { label: '누적 면접 연습', value: '12,847', suffix: '회' },
    { label: '합격 후기', value: '1,234', suffix: '건' },
    { label: '활성 사용자', value: '5,678', suffix: '명' },
    { label: '평균 만족도', value: '4.8', suffix: '/5.0' }
  ];

  const testimonials = [
    {
      name: '김개발',
      role: '프론트엔드 개발자',
      company: '네이버',
      content: 'React 관련 질문들이 실제 면접과 정말 유사했어요. 덕분에 긴장하지 않고 면접을 볼 수 있었습니다.',
      rating: 5
    },
    {
      name: '박백엔드',
      role: '백엔드 개발자', 
      company: '카카오',
      content: 'Spring Boot와 JPA 질문이 특히 도움이 됐습니다. 실무진이 물어볼 법한 깊이 있는 질문들이에요.',
      rating: 5
    },
    {
      name: '이데브옵스',
      role: 'DevOps 엔지니어',
      company: '쿠팡',
      content: 'AWS와 인프라 관련 질문들이 체계적으로 정리되어 있어서 공부하기 좋았어요.',
      rating: 4
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <Header />
        <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[60vh]">
          <LoadingSpinner size="lg" text="면접 질문을 준비하고 있습니다..." />
        </div>
      </div>
    );
  }

  if (isInterviewStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <Header />
        <InterviewSession 
          config={interviewConfig!} 
          onEndInterview={handleEndInterview}
        />
      </div>
    );
  }

  if (showSetup) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <InterviewSetup onStartInterview={handleStartInterview} />
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
          <Badge className="mb-6 px-4 py-2 bg-blue-100 text-blue-800 text-sm font-medium">
            🚀 베타 서비스 런칭
          </Badge>
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            개발자 면접의 <span className="text-blue-600">새로운 기준</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            AI 기반 맞춤형 면접 질문으로 실제 면접처럼 연습하고, 
            개발자 커뮤니티에서 경험을 공유하며 함께 성장하세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="px-8 py-3 text-lg"
              onClick={() => setShowSetup(true)}
            >
              <Play className="mr-2 h-5 w-5" />
              지금 시작하기
            </Button>
            <Link to="/community">
              <Button size="lg" variant="outline" className="px-8 py-3 text-lg w-full">
                서비스 둘러보기
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {stat.value}
                  <span className="text-lg text-gray-600">{stat.suffix}</span>
                </div>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            왜 <span className="text-blue-600">InterviewAce</span>인가요?
          </h2>
          <p className="text-xl text-gray-600">
            실제 면접 현장을 그대로 옮긴 혁신적인 연습 환경
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className={`mx-auto w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-4`}>
                    <Icon className={`h-8 w-8 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto px-4 py-16 bg-white/50 rounded-3xl mx-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            성공한 개발자들의 <span className="text-blue-600">후기</span>
          </h2>
          <p className="text-xl text-gray-600">
            실제 합격자들이 전하는 생생한 경험담
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="font-bold text-blue-600">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">
                      {testimonial.role} • {testimonial.company}
                    </p>
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 italic">"{testimonial.content}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
