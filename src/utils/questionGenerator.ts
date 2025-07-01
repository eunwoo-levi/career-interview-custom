
import { InterviewConfig, Question } from '@/types/interview';

const questionDatabase: Question[] = [
  // 프론트엔드 질문들
  {
    id: 'fe_001',
    question: 'React의 Virtual DOM이 무엇이고, 왜 사용하는지 설명해주세요.',
    category: 'React',
    difficulty: 'medium',
    field: ['frontend', 'fullstack'],
    experience: ['junior', '1-3years', '3-5years'],
    companyType: ['startup', 'small', 'large', 'global']
  },
  {
    id: 'fe_002',
    question: 'CSS의 Flexbox와 Grid의 차이점과 각각의 사용 사례를 설명해주세요.',
    category: 'CSS',
    difficulty: 'easy',
    field: ['frontend', 'fullstack'],
    experience: ['junior', '1-3years'],
    companyType: ['startup', 'small', 'large', 'global']
  },
  {
    id: 'fe_003',
    question: 'JavaScript의 호이스팅(Hoisting)에 대해 설명하고 예시를 들어주세요.',
    category: 'JavaScript',
    difficulty: 'medium',
    field: ['frontend', 'fullstack'],
    experience: ['junior', '1-3years', '3-5years'],
    companyType: ['startup', 'small', 'large', 'global']
  },
  {
    id: 'fe_004',
    question: 'React Hooks의 useState와 useEffect를 사용할 때 주의해야 할 점들을 설명해주세요.',
    category: 'React',
    difficulty: 'medium',
    field: ['frontend', 'fullstack'],
    experience: ['1-3years', '3-5years'],
    companyType: ['startup', 'small', 'large', 'global']
  },
  {
    id: 'fe_005',
    question: '웹 성능 최적화를 위한 방법들을 설명해주세요.',
    category: '성능 최적화',
    difficulty: 'hard',
    field: ['frontend', 'fullstack'],
    experience: ['3-5years', 'senior'],
    companyType: ['large', 'global']
  },
  {
    id: 'fe_006',
    question: 'TypeScript를 사용하는 이유와 장점에 대해 설명해주세요.',
    category: 'TypeScript',
    difficulty: 'easy',
    field: ['frontend', 'fullstack'],
    experience: ['junior', '1-3years', '3-5years'],
    companyType: ['startup', 'small', 'large', 'global']
  },

  // 백엔드 질문들
  {
    id: 'be_001',
    question: 'RESTful API 설계 원칙에 대해 설명해주세요.',
    category: 'API 설계',
    difficulty: 'medium',
    field: ['backend', 'fullstack'],
    experience: ['junior', '1-3years', '3-5years'],
    companyType: ['startup', 'small', 'large', 'global']
  },
  {
    id: 'be_002',
    question: '데이터베이스의 ACID 속성에 대해 설명해주세요.',
    category: '데이터베이스',
    difficulty: 'hard',
    field: ['backend', 'fullstack'],
    experience: ['1-3years', '3-5years', 'senior'],
    companyType: ['small', 'large', 'global']
  },
  {
    id: 'be_003',
    question: 'Node.js의 이벤트 루프(Event Loop)에 대해 설명해주세요.',
    category: 'Node.js',
    difficulty: 'hard',
    field: ['backend', 'fullstack'],
    experience: ['1-3years', '3-5years', 'senior'],
    companyType: ['startup', 'small', 'large', 'global']
  },
  {
    id: 'be_004',
    question: 'SQL Injection 공격과 예방 방법에 대해 설명해주세요.',
    category: '보안',
    difficulty: 'medium',
    field: ['backend', 'fullstack'],
    experience: ['junior', '1-3years', '3-5years'],
    companyType: ['startup', 'small', 'large', 'global']
  },
  {
    id: 'be_005',
    question: '마이크로서비스 아키텍처의 장단점을 설명해주세요.',
    category: '아키텍처',
    difficulty: 'hard',
    field: ['backend', 'fullstack'],
    experience: ['3-5years', 'senior'],
    companyType: ['large', 'global']
  },
  {
    id: 'be_006',
    question: 'JWT 토큰의 구조와 인증 과정을 설명해주세요.',
    category: '인증',
    difficulty: 'medium',
    field: ['backend', 'fullstack'],
    experience: ['junior', '1-3years', '3-5years'],
    companyType: ['startup', 'small', 'large', 'global']
  },

  // DevOps 질문들
  {
    id: 'do_001',
    question: 'Docker와 가상머신의 차이점을 설명해주세요.',
    category: 'Docker',
    difficulty: 'medium',
    field: ['devops'],
    experience: ['junior', '1-3years', '3-5years'],
    companyType: ['startup', 'small', 'large', 'global']
  },
  {
    id: 'do_002',
    question: 'CI/CD 파이프라인이 무엇이고 왜 중요한지 설명해주세요.',
    category: 'CI/CD',
    difficulty: 'easy',
    field: ['devops'],
    experience: ['junior', '1-3years'],
    companyType: ['startup', 'small', 'large', 'global']
  },
  {
    id: 'do_003',
    question: 'Kubernetes의 핵심 개념들(Pod, Service, Deployment)을 설명해주세요.',
    category: 'Kubernetes',
    difficulty: 'hard',
    field: ['devops'],
    experience: ['3-5years', 'senior'],
    companyType: ['large', 'global']
  },
  {
    id: 'do_004',
    question: 'AWS의 주요 서비스들(EC2, S3, RDS)에 대해 설명해주세요.',
    category: 'AWS',
    difficulty: 'easy',
    field: ['devops'],
    experience: ['junior', '1-3years'],
    companyType: ['startup', 'small', 'large', 'global']
  },
  {
    id: 'do_005',
    question: '로드 밸런서의 종류와 역할에 대해 설명해주세요.',
    category: '네트워크',
    difficulty: 'medium',
    field: ['devops'],
    experience: ['1-3years', '3-5years'],
    companyType: ['small', 'large', 'global']
  },

  // 공통 CS 질문들
  {
    id: 'cs_001',
    question: 'HTTP와 HTTPS의 차이점을 설명해주세요.',
    category: '네트워크',
    difficulty: 'easy',
    field: ['frontend', 'backend', 'devops', 'fullstack'],
    experience: ['junior', '1-3years'],
    companyType: ['startup', 'small', 'large', 'global']
  },
  {
    id: 'cs_002',
    question: 'TCP와 UDP의 차이점과 각각의 사용 사례를 설명해주세요.',
    category: '네트워크',
    difficulty: 'medium',
    field: ['frontend', 'backend', 'devops', 'fullstack'],
    experience: ['1-3years', '3-5years'],
    companyType: ['small', 'large', 'global']
  },
  {
    id: 'cs_003',
    question: '데이터베이스의 정규화에 대해 설명해주세요.',
    category: '데이터베이스',
    difficulty: 'medium',
    field: ['backend', 'fullstack'],
    experience: ['1-3years', '3-5years'],
    companyType: ['small', 'large', 'global']
  },
  {
    id: 'cs_004',
    question: '운영체제의 프로세스와 스레드의 차이점을 설명해주세요.',
    category: '운영체제',
    difficulty: 'medium',
    field: ['backend', 'devops', 'fullstack'],
    experience: ['1-3years', '3-5years', 'senior'],
    companyType: ['large', 'global']
  },
  {
    id: 'cs_005',
    question: '자료구조 중 스택과 큐의 특징과 사용 사례를 설명해주세요.',
    category: '자료구조',
    difficulty: 'easy',
    field: ['frontend', 'backend', 'fullstack'],
    experience: ['junior', '1-3years'],
    companyType: ['startup', 'small', 'large', 'global']
  },
  {
    id: 'cs_006',
    question: '알고리즘의 시간복잡도 Big O 표기법에 대해 설명해주세요.',
    category: '알고리즘',
    difficulty: 'medium',
    field: ['frontend', 'backend', 'fullstack'],
    experience: ['junior', '1-3years', '3-5years'],
    companyType: ['large', 'global']
  },
  {
    id: 'cs_007',
    question: '메모리 할당 방식 중 힙(Heap)과 스택(Stack)의 차이점을 설명해주세요.',
    category: '메모리 관리',
    difficulty: 'hard',
    field: ['backend', 'fullstack'],
    experience: ['3-5years', 'senior'],
    companyType: ['large', 'global']
  }
];

export function getQuestionsForConfig(config: InterviewConfig): Question[] {
  console.log('Getting questions for config:', config);
  
  // 설정에 맞는 질문들을 필터링
  const filteredQuestions = questionDatabase.filter(question => {
    const fieldMatch = question.field.includes(config.field);
    const experienceMatch = question.experience.includes(config.experience);
    const companyMatch = question.companyType.includes(config.companyType);
    
    return fieldMatch && experienceMatch && companyMatch;
  });
  
  console.log('Filtered questions count:', filteredQuestions.length);
  
  // 질문이 부족한 경우 관련 분야의 질문들도 포함
  if (filteredQuestions.length < config.questionCount) {
    const additionalQuestions = questionDatabase.filter(question => {
      const fieldMatch = question.field.includes(config.field);
      const notAlreadyIncluded = !filteredQuestions.some(fq => fq.id === question.id);
      return fieldMatch && notAlreadyIncluded;
    });
    
    filteredQuestions.push(...additionalQuestions);
  }
  
  // 요청된 개수만큼 랜덤하게 선택
  const shuffled = filteredQuestions.sort(() => 0.5 - Math.random());
  const selectedQuestions = shuffled.slice(0, config.questionCount);
  
  console.log('Selected questions:', selectedQuestions.length);
  
  return selectedQuestions;
}
