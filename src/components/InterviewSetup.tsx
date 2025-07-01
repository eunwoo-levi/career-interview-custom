import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { InterviewConfig } from '@/types/interview';
import { Code, Server, Settings, Globe, Building, Briefcase, Users } from 'lucide-react';
import CategorySelector from './CategorySelector';

interface InterviewSetupProps {
  onStartInterview: (config: InterviewConfig) => void;
}

const InterviewSetup: React.FC<InterviewSetupProps> = ({ onStartInterview }) => {
  const [selectedField, setSelectedField] = useState<InterviewConfig['field'] | null>(null);
  const [selectedExperience, setSelectedExperience] = useState<InterviewConfig['experience'] | null>(null);
  const [selectedCompanyType, setSelectedCompanyType] = useState<InterviewConfig['companyType'] | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [questionCount, setQuestionCount] = useState(10);

  const fields = [
    { id: 'frontend', label: '프론트엔드', icon: Code, description: 'React, Vue, JavaScript, CSS' },
    { id: 'backend', label: '백엔드', icon: Server, description: 'Node.js, Java, Python, DB' },
    { id: 'devops', label: 'DevOps', icon: Settings, description: 'AWS, Docker, CI/CD' },
    { id: 'fullstack', label: '풀스택', icon: Globe, description: '프론트엔드 + 백엔드' }
  ];

  const experiences = [
    { id: 'junior', label: '신입', description: '0년차, 기본 개념 중심' },
    { id: '1-3years', label: '주니어', description: '1-3년차, 실무 경험' },
    { id: '3-5years', label: '시니어', description: '3-5년차, 심화 개념' },
    { id: 'senior', label: '리드', description: '5년차+, 아키텍처 설계' }
  ];

  const companyTypes = [
    { id: 'startup', label: '스타트업', icon: Building, description: '빠른 개발, 다양한 업무' },
    { id: 'small', label: '중소기업', icon: Briefcase, description: '안정적인 환경' },
    { id: 'large', label: '대기업', icon: Users, description: '체계적인 프로세스' },
    { id: 'global', label: '글로벌 기업', icon: Globe, description: '국제적 기준' }
  ];

  const handleStartInterview = () => {
    if (selectedField && selectedExperience && selectedCompanyType && selectedCategories.length > 0) {
      onStartInterview({
        field: selectedField,
        experience: selectedExperience,
        companyType: selectedCompanyType,
        questionCount,
        categories: selectedCategories
      });
    }
  };

  const isReadyToStart = selectedField && selectedExperience && selectedCompanyType && selectedCategories.length > 0;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* 개발 분야 선택 */}
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Code className="h-6 w-6 text-blue-600" />
            개발 분야 선택
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {fields.map((field) => {
              const Icon = field.icon;
              return (
                <div
                  key={field.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
                    selectedField === field.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedField(field.id as InterviewConfig['field'])}
                >
                  <div className="flex flex-col items-center text-center space-y-2">
                    <Icon className={`h-8 w-8 ${selectedField === field.id ? 'text-blue-600' : 'text-gray-600'}`} />
                    <h3 className="font-semibold text-gray-800">{field.label}</h3>
                    <p className="text-sm text-gray-600">{field.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* 카테고리 선택 */}
      <CategorySelector
        selectedField={selectedField || ''}
        selectedCategories={selectedCategories}
        onCategoriesChange={setSelectedCategories}
      />

      {/* 경력 레벨 선택 */}
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-green-600" />
            경력 레벨 선택
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {experiences.map((exp) => (
              <div
                key={exp.id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
                  selectedExperience === exp.id
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedExperience(exp.id as InterviewConfig['experience'])}
              >
                <div className="text-center space-y-2">
                  <h3 className="font-semibold text-gray-800">{exp.label}</h3>
                  <p className="text-sm text-gray-600">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 회사 유형 선택 */}
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Building className="h-6 w-6 text-purple-600" />
            회사 유형 선택
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {companyTypes.map((company) => {
              const Icon = company.icon;
              return (
                <div
                  key={company.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
                    selectedCompanyType === company.id
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedCompanyType(company.id as InterviewConfig['companyType'])}
                >
                  <div className="flex flex-col items-center text-center space-y-2">
                    <Icon className={`h-8 w-8 ${selectedCompanyType === company.id ? 'text-purple-600' : 'text-gray-600'}`} />
                    <h3 className="font-semibold text-gray-800">{company.label}</h3>
                    <p className="text-sm text-gray-600">{company.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* 질문 개수 선택 */}
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-800">질문 개수</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 flex-wrap">
            {[5, 10, 15, 20].map((count) => (
              <Button
                key={count}
                variant={questionCount === count ? "default" : "outline"}
                onClick={() => setQuestionCount(count)}
                className="min-w-16"
              >
                {count}개
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 선택 요약 및 시작 버튼 */}
      {isReadyToStart && (
        <Card className="shadow-lg border-0 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-center md:text-left">
                <h3 className="text-xl font-bold mb-2">면접 준비 완료!</h3>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  <Badge variant="secondary" className="bg-white/20 text-white">
                    {fields.find(f => f.id === selectedField)?.label}
                  </Badge>
                  <Badge variant="secondary" className="bg-white/20 text-white">
                    {experiences.find(e => e.id === selectedExperience)?.label}
                  </Badge>
                  <Badge variant="secondary" className="bg-white/20 text-white">
                    {companyTypes.find(c => c.id === selectedCompanyType)?.label}
                  </Badge>
                  <Badge variant="secondary" className="bg-white/20 text-white">
                    {selectedCategories.length}개 카테고리
                  </Badge>
                  <Badge variant="secondary" className="bg-white/20 text-white">
                    {questionCount}개 질문
                  </Badge>
                </div>
              </div>
              <Button 
                onClick={handleStartInterview}
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 font-bold px-8"
              >
                면접 시작하기
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default InterviewSetup;
