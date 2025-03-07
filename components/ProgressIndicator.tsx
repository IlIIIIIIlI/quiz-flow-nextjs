// components/ProgressIndicator.tsx
"use client";

import { Progress } from "@/components/ui/progress-custom";
import { useQuestionnaireStore } from "@/lib/store";
import { activeQuestionnaire } from "@/config/questionnaire";
import { cn } from "@/lib/utils";

export default function ProgressIndicator() {
  const { currentStep, goToStep, validateCurrentStep } =
    useQuestionnaireStore();
  const steps = activeQuestionnaire.steps;
  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleStepClick = (index: number) => {
    if (index <= currentStep) {
      // 可以自由回到之前的步骤
      goToStep(index);
    } else if (validateCurrentStep()) {
      // 只有当前步骤验证通过后才能前进
      goToStep(index);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>
          步骤 {currentStep + 1} / {steps.length}
        </span>
        <span>{Math.round(progress)}% 完成</span>
      </div>
      <Progress value={progress} className="h-2" />
      <div className="flex justify-between">
        {steps.map((step, index) => (
          <button
            key={step.id}
            className={cn(
              "text-xs font-medium rounded-full px-3 py-1 transition-colors",
              index === currentStep
                ? "bg-primary text-primary-foreground"
                : index < currentStep
                ? "bg-muted text-foreground hover:bg-muted/80 cursor-pointer"
                : "bg-muted/30 text-muted-foreground cursor-default"
            )}
            onClick={() => handleStepClick(index)}
            disabled={index > currentStep}
          >
            {step.label || `步骤 ${index + 1}`}
          </button>
        ))}
      </div>
    </div>
  );
}
