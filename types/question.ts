export type QuestionType =
  | "single"
  | "multi"
  | "text"
  | "trueFalse"
  | "matching";

export interface Question {
  id: string;
  type: QuestionType;
  prompt: string;
  options?: string[];
  // 可选标志
  optional?: boolean;
  validation?: {
    minLength?: number;
    maxLength?: number;
    errorMessage?: string;
  };
}

export interface Step {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
  // 自定义标签
  label?: string;
  // 步骤确认信息
  confirmationMessage?: string;
}

export interface QuestionnaireConfig {
  id: string;
  title: string;
  description?: string;
  steps: Step[];
  submitButtonText?: string;
  // 默认错误消息
  defaultErrorMessage?: string;
  defaultRequiredMessage?: string;
}

// 添加回 QuestionContainerProps 接口，保持兼容性
export interface QuestionContainerProps {
  question: Question;
  onAnswer: (answer: any) => void;
  currentAnswer?: any;
  className?: string;
}

// 更新后的问题属性接口
export interface QuestionProps {
  question: Question;
  onAnswer: (questionId: string, answer: any) => void;
  currentAnswer?: any;
  error?: boolean;
  required?: boolean;
}

export interface SubmissionData {
  questionnaireId: string;
  responses: Record<string, any>;
  submittedAt: string;
}
