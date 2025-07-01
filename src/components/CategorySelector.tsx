
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { CategoryOption } from '@/types/interview';
import { Code2, Database, Globe, Server, Monitor, HardDrive, Network } from 'lucide-react';

interface CategorySelectorProps {
  selectedField: string;
  selectedCategories: string[];
  onCategoriesChange: (categories: string[]) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  selectedField,
  selectedCategories,
  onCategoriesChange
}) => {
  const categoryOptions: CategoryOption[] = [
    // 프론트엔드 카테고리
    { id: 'react', label: 'React', description: 'JSX, Hooks, State 관리', field: ['frontend', 'fullstack'] },
    { id: 'javascript', label: 'JavaScript', description: '문법, 비동기, 이벤트', field: ['frontend', 'fullstack'] },
    { id: 'typescript', label: 'TypeScript', description: '타입 시스템, 인터페이스', field: ['frontend', 'fullstack'] },
    { id: 'css', label: 'CSS', description: 'Flexbox, Grid, 반응형', field: ['frontend', 'fullstack'] },
    { id: 'performance', label: '성능 최적화', description: '번들링, 캐싱, 렌더링', field: ['frontend', 'fullstack'] },
    
    // 백엔드 카테고리
    { id: 'java', label: 'Java', description: 'OOP, 컬렉션, 스트림', field: ['backend', 'fullstack'] },
    { id: 'spring', label: 'Spring', description: 'IoC, AOP, Boot', field: ['backend', 'fullstack'] },
    { id: 'nodejs', label: 'Node.js', description: '이벤트 루프, Express', field: ['backend', 'fullstack'] },
    { id: 'database', label: '데이터베이스', description: 'SQL, NoSQL, 정규화', field: ['backend', 'fullstack'] },
    { id: 'api', label: 'API 설계', description: 'REST, GraphQL, 인증', field: ['backend', 'fullstack'] },
    { id: 'security', label: '보안', description: 'SQL Injection, XSS', field: ['backend', 'fullstack'] },
    
    // DevOps 카테고리
    { id: 'docker', label: 'Docker', description: '컨테이너, 이미지', field: ['devops'] },
    { id: 'kubernetes', label: 'Kubernetes', description: 'Pod, Service, 배포', field: ['devops'] },
    { id: 'aws', label: 'AWS', description: 'EC2, S3, RDS', field: ['devops'] },
    { id: 'cicd', label: 'CI/CD', description: '파이프라인, 자동화', field: ['devops'] },
    { id: 'monitoring', label: '모니터링', description: '로그, 메트릭, 알람', field: ['devops'] },
    
    // 공통 CS 카테고리
    { id: 'network', label: '네트워크', description: 'HTTP, TCP/UDP, DNS', field: ['frontend', 'backend', 'devops', 'fullstack'] },
    { id: 'datastructure', label: '자료구조', description: '스택, 큐, 트리, 해시', field: ['frontend', 'backend', 'devops', 'fullstack'] },
    { id: 'algorithm', label: '알고리즘', description: '정렬, 탐색, 시간복잡도', field: ['frontend', 'backend', 'devops', 'fullstack'] },
    { id: 'os', label: '운영체제', description: '프로세스, 스레드, 메모리', field: ['frontend', 'backend', 'devops', 'fullstack'] },
    { id: 'architecture', label: '시스템 아키텍처', description: '마이크로서비스, 확장성', field: ['backend', 'devops', 'fullstack'] }
  ];

  const availableCategories = categoryOptions.filter(category => 
    category.field.includes(selectedField)
  );

  const handleCategoryToggle = (categoryId: string) => {
    const newCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter(id => id !== categoryId)
      : [...selectedCategories, categoryId];
    
    onCategoriesChange(newCategories);
  };

  const getCategoryIcon = (categoryId: string) => {
    const iconMap: { [key: string]: React.ComponentType<any> } = {
      react: Code2,
      javascript: Code2,
      typescript: Code2,
      css: Monitor,
      java: Code2,
      spring: Server,
      nodejs: Server,
      database: Database,
      api: Globe,
      docker: Server,
      kubernetes: Server,
      aws: Globe,
      network: Network,
      datastructure: Database,
      os: HardDrive,
      default: Code2
    };
    
    return iconMap[categoryId] || iconMap.default;
  };

  if (!selectedField) {
    return null;
  }

  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Database className="h-6 w-6 text-indigo-600" />
          질문 카테고리 선택
        </CardTitle>
        <p className="text-sm text-gray-600">
          면접에서 다루고 싶은 주제를 선택해주세요 (여러 개 선택 가능)
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {availableCategories.map((category) => {
            const Icon = getCategoryIcon(category.id);
            const isSelected = selectedCategories.includes(category.id);
            
            return (
              <div
                key={category.id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
                  isSelected
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => handleCategoryToggle(category.id)}
              >
                <div className="flex items-start space-x-3">
                  <Checkbox
                    checked={isSelected}
                    onChange={() => handleCategoryToggle(category.id)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className={`h-5 w-5 ${isSelected ? 'text-indigo-600' : 'text-gray-600'}`} />
                      <h3 className="font-semibold text-gray-800">{category.label}</h3>
                    </div>
                    <p className="text-sm text-gray-600">{category.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {selectedCategories.length > 0 && (
          <div className="mt-4 pt-4 border-t">
            <p className="text-sm font-medium text-gray-700 mb-2">선택된 카테고리:</p>
            <div className="flex flex-wrap gap-2">
              {selectedCategories.map(categoryId => {
                const category = availableCategories.find(c => c.id === categoryId);
                return category ? (
                  <Badge key={categoryId} variant="secondary" className="bg-indigo-100 text-indigo-800">
                    {category.label}
                  </Badge>
                ) : null;
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CategorySelector;
