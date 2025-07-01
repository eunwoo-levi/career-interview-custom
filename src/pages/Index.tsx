
import React, { useState } from 'react';
import InterviewSetup from '@/components/InterviewSetup';
import InterviewSession from '@/components/InterviewSession';
import { InterviewConfig } from '@/types/interview';

const Index = () => {
  const [interviewConfig, setInterviewConfig] = useState<InterviewConfig | null>(null);
  const [isInterviewStarted, setIsInterviewStarted] = useState(false);

  const handleStartInterview = (config: InterviewConfig) => {
    setInterviewConfig(config);
    setIsInterviewStarted(true);
  };

  const handleEndInterview = () => {
    setIsInterviewStarted(false);
    setInterviewConfig(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {!isInterviewStarted ? (
          <>
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold text-gray-900 mb-4">
                개발자 면접 <span className="text-blue-600">마스터</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                실제 면접과 같은 환경에서 CS 지식을 테스트하고 면접 실력을 향상시켜보세요
              </p>
            </div>
            <InterviewSetup onStartInterview={handleStartInterview} />
          </>
        ) : (
          <InterviewSession 
            config={interviewConfig!} 
            onEndInterview={handleEndInterview}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
