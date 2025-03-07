"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { QuestionContainerProps } from "@/types/question";
import SingleChoice from "./questions/SingleChoice";
import MultiChoice from "./questions/MultiChoice";
import TextInput from "./questions/TextInput";
import TrueFalse from "./questions/TrueFalse";
import MatchingQuestion from "./questions/MatchingQuestion";

export default function QuestionContainer({
  question,
  onAnswer,
  currentAnswer,
  className,
}: QuestionContainerProps) {
  const renderQuestion = () => {
    switch (question.type) {
      case "single":
        return (
          <SingleChoice
            options={question.options || []}
            value={currentAnswer}
            onChange={onAnswer}
            required={!question.optional}
          />
        );
      case "multi":
        return (
          <MultiChoice
            options={question.options || []}
            value={currentAnswer}
            onChange={onAnswer}
            required={!question.optional}
          />
        );
      case "text":
        return (
          <TextInput
            value={currentAnswer}
            onChange={onAnswer}
            validation={question.validation}
            required={!question.optional}
          />
        );
      case "trueFalse":
        return (
          <TrueFalse
            value={currentAnswer}
            onChange={onAnswer}
            required={!question.optional}
          />
        );
      case "matching":
        return (
          <MatchingQuestion
            options={question.options || []}
            value={currentAnswer}
            onChange={onAnswer}
            required={!question.optional}
          />
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={cn("space-y-4", className)}
    >
      <h2 className="text-xl font-semibold text-foreground">
        {question.prompt}
        {!question.optional && <span className="text-destructive ml-1">*</span>}
        {question.optional && (
          <span className="text-muted-foreground text-xs ml-2">(可选)</span>
        )}
      </h2>
      {renderQuestion()}
    </motion.div>
  );
}
