"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Step } from "@/types/question";
import { useQuestionnaireStore } from "@/lib/store";
import QuestionRenderer from "./QuestionRenderer";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface StepContainerProps {
  step: Step;
  responses: Record<string, any>;
  className?: string;
  stepIndex: number;
}

export default function StepContainer({
  step,
  responses,
  className,
  stepIndex,
}: StepContainerProps) {
  const { setResponse, getStepValidationErrors } = useQuestionnaireStore();
  const validationErrors = getStepValidationErrors(stepIndex);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={cn("space-y-6", className)}
    >
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-foreground">{step.title}</h2>
        {step.description && (
          <p className="text-muted-foreground">{step.description}</p>
        )}
      </div>

      <div className="space-y-8">
        {step.questions.map((question) => (
          <div key={question.id} className="space-y-4">
            <h3 className="text-lg font-medium">
              {question.prompt}
              {!question.optional && (
                <span className="text-destructive ml-1">*</span>
              )}
              {question.optional && (
                <span className="text-muted-foreground text-xs ml-2">
                  (可选)
                </span>
              )}
            </h3>

            <QuestionRenderer
              question={question}
              currentAnswer={responses[question.id]}
              onAnswer={(questionId, answer) => setResponse(questionId, answer)}
              error={validationErrors[question.id]}
            />

            {validationErrors[question.id] && (
              <Alert variant="destructive" className="mt-2">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {validationErrors[question.id]}
                </AlertDescription>
              </Alert>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
