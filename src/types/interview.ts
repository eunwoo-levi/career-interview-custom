
export interface InterviewConfig {
  field: 'frontend' | 'backend' | 'devops' | 'fullstack';
  experience: 'junior' | '1-3years' | '3-5years' | 'senior';
  companyType: 'startup' | 'small' | 'large' | 'global';
  questionCount: number;
  categories: string[];
}

export interface Question {
  id: string;
  question: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  field: string[];
  experience: string[];
  companyType: string[];
}

export interface InterviewResult {
  questionId: string;
  question: string;
  userAnswer: string;
  feedback?: string;
  score?: number;
}

export interface CategoryOption {
  id: string;
  label: string;
  description: string;
  field: string[];
}
