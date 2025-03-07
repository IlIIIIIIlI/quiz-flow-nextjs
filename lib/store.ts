// lib/store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { activeQuestionnaire } from "@/config/questionnaire";
import { submitQuestionnaire } from "@/lib/api";
import { toast } from "sonner";

export interface QuestionnaireState {
  // 基础状态
  currentStep: number;
  responses: Record<string, any>;
  isSubmitting: boolean;
  isComplete: boolean;
  submitError: string | null;
  submitSuccess: boolean;
  confirmationOpen: boolean;

  // 导航相关
  nextStep: () => void;
  confirmNextStep: () => void;
  cancelNextStep: () => void;
  previousStep: () => void;
  goToStep: (step: number) => void;

  // 响应相关
  setResponse: (questionId: string, answer: any) => void;
  resetQuestionnaire: () => void;

  // 提交相关
  submitResponses: () => Promise<void>;

  // 验证相关
  validateCurrentStep: () => boolean;
  getStepValidationErrors: (stepIndex: number) => Record<string, string>;
  hasRequiredFieldsCompleted: (stepIndex: number) => boolean;
  getUnfilledOptionalQuestions: (stepIndex: number) => string[];
}

export const useQuestionnaireStore = create<QuestionnaireState>()(
  persist(
    (set, get) => ({
      // 基础状态
      currentStep: 0,
      responses: {},
      isSubmitting: false,
      isComplete: false,
      submitError: null,
      submitSuccess: false,
      confirmationOpen: false,

      // 获取未填写的可选项
      getUnfilledOptionalQuestions: (stepIndex: number) => {
        const { responses } = get();
        const step = activeQuestionnaire.steps[stepIndex];
        const unfilledOptionalQuestions: string[] = [];

        if (!step) return unfilledOptionalQuestions;

        step.questions.forEach((question) => {
          // 只关注可选项
          if (!question.optional) return;

          const answer = responses[question.id];

          // 检查是否未填写
          if (
            answer === undefined ||
            answer === null ||
            answer === "" ||
            (Array.isArray(answer) && answer.length === 0) ||
            (typeof answer === "object" && Object.keys(answer).length === 0)
          ) {
            unfilledOptionalQuestions.push(question.prompt);
          }
        });

        return unfilledOptionalQuestions;
      },

      // 下一步
      nextStep: () => {
        const {
          validateCurrentStep,
          currentStep,
          getUnfilledOptionalQuestions,
        } = get();

        // 验证当前步骤的必填项
        if (!validateCurrentStep()) {
          // 如果必填项验证失败，使用Toast通知
          toast.error("请填写所有必填项", {
            description: "标记有 * 的项目为必填项",
          });
          return; // 如果验证失败，不允许进入下一步
        }

        // 检查是否有未填写的可选项
        const unfilledOptionals = getUnfilledOptionalQuestions(currentStep);

        // 如果有未填写的可选项且有确认信息，打开确认对话框
        const currentStepData = activeQuestionnaire.steps[currentStep];
        if (
          unfilledOptionals.length > 0 &&
          currentStepData &&
          currentStepData.confirmationMessage
        ) {
          // 显示有未填写可选项的提示
          set({ confirmationOpen: true });
        } else {
          // 所有可选项都已填写或没有确认信息，直接进入下一步
          set((state) => ({
            currentStep: Math.min(
              state.currentStep + 1,
              activeQuestionnaire.steps.length - 1
            ),
          }));
        }
      },

      // 确认进入下一步
      confirmNextStep: () => {
        set((state) => ({
          confirmationOpen: false,
          currentStep: Math.min(
            state.currentStep + 1,
            activeQuestionnaire.steps.length - 1
          ),
        }));
      },

      // 取消进入下一步
      cancelNextStep: () => {
        set({ confirmationOpen: false });
      },

      // 返回上一步
      previousStep: () => {
        set((state) => ({
          currentStep: Math.max(state.currentStep - 1, 0),
        }));
      },

      // 直接跳转到指定步骤
      goToStep: (step) => {
        // 只有当当前步骤验证通过，或者是向后导航时才允许
        const { currentStep, validateCurrentStep } = get();

        if (step < currentStep || validateCurrentStep()) {
          if (step >= 0 && step < activeQuestionnaire.steps.length) {
            set({ currentStep: step });
          }
        }
      },

      // 设置问题的回答
      setResponse: (questionId: string, answer: any) => {
        set((state) => ({
          responses: {
            ...state.responses,
            [questionId]: answer,
          },
        }));
      },

      // 重置问卷
      resetQuestionnaire: () => {
        set({
          currentStep: 0,
          responses: {},
          isComplete: false,
          submitError: null,
          submitSuccess: false,
          confirmationOpen: false,
        });
      },

      // 提交问卷响应
      submitResponses: async () => {
        const { responses, validateCurrentStep } = get();

        // 最后一次验证当前步骤
        if (!validateCurrentStep()) {
          toast.error("无法提交", {
            description: "请先填写所有必填字段",
          });
          return;
        }

        set({ isSubmitting: true, submitError: null });

        try {
          const result = await submitQuestionnaire({
            questionnaireId: activeQuestionnaire.id,
            responses,
            submittedAt: new Date().toISOString(),
          });

          if (result.success) {
            set({
              isSubmitting: false,
              isComplete: true,
              submitSuccess: true,
            });
            toast.success("提交成功！", {
              description: "感谢您完成问卷",
            });
          } else {
            set({
              isSubmitting: false,
              submitError: result.message,
            });
            toast.error("提交失败", {
              description: result.message,
            });
          }
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "提交时发生错误，请稍后再试。";
          set({
            isSubmitting: false,
            submitError: errorMessage,
          });
          toast.error("提交错误", {
            description: errorMessage,
          });
        }
      },

      // 验证当前步骤
      validateCurrentStep: () => {
        const { currentStep, getStepValidationErrors } = get();
        const errors = getStepValidationErrors(currentStep);
        return Object.keys(errors).length === 0;
      },

      // 获取步骤的验证错误
      getStepValidationErrors: (stepIndex: number) => {
        const { responses } = get();
        const step = activeQuestionnaire.steps[stepIndex];
        const errors: Record<string, string> = {};

        if (!step) return errors;

        step.questions.forEach((question) => {
          const answer = responses[question.id];

          // 跳过可选项
          if (question.optional) return;

          // 必填检查
          if (
            answer === undefined ||
            answer === null ||
            answer === "" ||
            (Array.isArray(answer) && answer.length === 0) ||
            (typeof answer === "object" && Object.keys(answer).length === 0)
          ) {
            errors[question.id] =
              question.validation?.errorMessage ||
              activeQuestionnaire.defaultRequiredMessage ||
              "此字段为必填项";
            return;
          }

          // 最小长度检查
          if (
            question.validation?.minLength &&
            typeof answer === "string" &&
            answer.length < question.validation.minLength
          ) {
            errors[question.id] =
              question.validation.errorMessage ||
              `最少需要 ${question.validation.minLength} 个字符`;
            return;
          }
        });

        return errors;
      },

      // 检查必填字段是否已填写完成
      hasRequiredFieldsCompleted: (stepIndex: number) => {
        const errors = get().getStepValidationErrors(stepIndex);
        return Object.keys(errors).length === 0;
      },
    }),
    {
      name: "questionnaire-storage",
      // 可以添加自定义存储配置，如存储选择性
      partialize: (state) => ({
        // 只持久化这些字段
        responses: state.responses,
        currentStep: state.currentStep,
        isComplete: state.isComplete,
      }),
    }
  )
);
