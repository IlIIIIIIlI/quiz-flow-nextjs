"use client";

import { Question } from "@/types/question";
import SingleChoice from "./questions/SingleChoice";
import MultiChoice from "./questions/MultiChoice";
import TextInput from "./questions/TextInput";
import TrueFalse from "./questions/TrueFalse";
import MatchingQuestion from "./questions/MatchingQuestion";

interface QuestionRendererProps {
  question: Question;
  onAnswer: (questionId: string, answer: any) => void;
  currentAnswer?: any;
  error?: string;
}

export default function QuestionRenderer({
  question,
  onAnswer,
  currentAnswer,
  error,
}: QuestionRendererProps) {
  // 包装onAnswer使其能够传递questionId
  const handleAnswer = (answer: any) => {
    onAnswer(question.id, answer);
  };

  const isRequired = !question.optional;

  switch (question.type) {
    case "single":
      return (
        <SingleChoice
          options={question.options || []}
          value={currentAnswer}
          onChange={handleAnswer}
          required={isRequired}
          error={!!error}
        />
      );
    case "multi":
      return (
        <MultiChoice
          options={question.options || []}
          value={currentAnswer || []}
          onChange={handleAnswer}
          required={isRequired}
          error={!!error}
        />
      );
    case "text":
      return (
        <TextInput
          value={currentAnswer || ""}
          onChange={handleAnswer}
          validation={question.validation}
          required={isRequired}
          error={!!error}
        />
      );
    case "trueFalse":
      return (
        <TrueFalse
          value={currentAnswer}
          onChange={handleAnswer}
          required={isRequired}
          error={!!error}
        />
      );
    case "matching":
      return (
        <MatchingQuestion
          options={question.options || []}
          value={currentAnswer || {}}
          onChange={handleAnswer}
          required={isRequired}
          error={!!error}
        />
      );
    default:
      return null;
  }
}
