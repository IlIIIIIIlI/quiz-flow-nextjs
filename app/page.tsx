"use client";

import { AnimatePresence } from "framer-motion";
import { useQuestionnaireStore } from "@/lib/store";
import StepContainer from "@/components/StepContainer";
import NavigationControls from "@/components/NavigationControls";
import ProgressIndicator from "@/components/ProgressIndicator";
import SuccessMessage from "@/components/SuccessMessage";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { activeQuestionnaire } from "@/config/questionnaire";

export default function Home() {
  const { currentStep, responses, isComplete, submitError, submitSuccess } =
    useQuestionnaireStore();
  const currentStepData = activeQuestionnaire.steps[currentStep];

  // 问卷提交成功显示成功消息
  if (isComplete && submitSuccess) {
    return (
      <main className="min-h-screen bg-background p-8 flex items-center justify-center">
        <SuccessMessage />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">{activeQuestionnaire.title}</h1>
          <p className="text-muted-foreground">
            {activeQuestionnaire.description}
          </p>
        </div>

        <ProgressIndicator />

        {submitError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>提交错误</AlertTitle>
            <AlertDescription>{submitError}</AlertDescription>
          </Alert>
        )}

        <AnimatePresence mode="wait">
          {currentStepData && (
            <StepContainer
              key={currentStepData.id}
              step={currentStepData}
              responses={responses}
              stepIndex={currentStep}
            />
          )}
        </AnimatePresence>

        <NavigationControls />
      </div>
    </main>
  );
}
