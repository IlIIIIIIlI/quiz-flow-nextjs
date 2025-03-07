"use client";

import { Button } from "@/components/ui/button";
import { useQuestionnaireStore } from "@/lib/store";
import { Send } from "lucide-react";
import { activeQuestionnaire } from "@/config/questionnaire";
import { toast } from "sonner";

export default function SubmitButton() {
  const { submitResponses, isSubmitting, validateCurrentStep } =
    useQuestionnaireStore();

  const handleSubmit = async () => {
    // 验证当前步骤
    if (!validateCurrentStep()) {
      toast.error("无法提交", {
        description: "请先填写所有必填字段",
      });
      return;
    }

    // 显示提交中的Toast
    const loadingToast = toast.loading("正在提交问卷...");

    try {
      await submitResponses();
      // 成功时关闭加载Toast
      toast.dismiss(loadingToast);
    } catch (error) {
      // 错误时关闭加载Toast并显示错误
      toast.dismiss(loadingToast);
      toast.error("提交失败", {
        description: "请稍后重试",
      });
    }
  };

  return (
    <Button
      onClick={handleSubmit}
      disabled={isSubmitting}
      className="flex items-center gap-2"
    >
      {isSubmitting
        ? "提交中..."
        : activeQuestionnaire.submitButtonText || "提交"}
      {!isSubmitting && <Send className="h-4 w-4" />}
    </Button>
  );
}
