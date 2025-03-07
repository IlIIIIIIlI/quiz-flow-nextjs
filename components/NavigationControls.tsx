"use client";

import { Button } from "@/components/ui/button";
import { useQuestionnaireStore } from "@/lib/store";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { activeQuestionnaire } from "@/config/questionnaire";
import SubmitButton from "./SubmitButton";
import StepConfirmation from "./StepConfirmation";

export default function NavigationControls() {
  const {
    currentStep,
    nextStep,
    previousStep,
    confirmNextStep,
    cancelNextStep,
    confirmationOpen,
    validateCurrentStep,
    getUnfilledOptionalQuestions,
  } = useQuestionnaireStore();

  const totalSteps = activeQuestionnaire.steps.length;
  const isLastStep = currentStep === totalSteps - 1;
  const currentStepData = activeQuestionnaire.steps[currentStep];
  const confirmationMessage = currentStepData?.confirmationMessage || "";

  // 获取未填写的可选项
  const unfilledOptionals = getUnfilledOptionalQuestions(currentStep);

  // 检查当前步骤是否有验证错误
  const hasErrors = !validateCurrentStep();

  return (
    <>
      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          onClick={previousStep}
          disabled={currentStep === 0}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          上一步
        </Button>

        {isLastStep ? (
          <SubmitButton />
        ) : (
          <Button
            onClick={nextStep}
            className="flex items-center gap-2"
            disabled={hasErrors}
          >
            下一步
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </div>

      <StepConfirmation
        isOpen={confirmationOpen}
        onConfirm={confirmNextStep}
        onCancel={cancelNextStep}
        title={`确认 - ${currentStepData?.title || "下一步"}`}
        message={confirmationMessage}
        unfilledItems={unfilledOptionals}
      />
    </>
  );
}
