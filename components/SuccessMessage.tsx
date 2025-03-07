"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle2, RefreshCcw } from "lucide-react";
import { useQuestionnaireStore } from "@/lib/store";

export default function SuccessMessage() {
  const { resetQuestionnaire } = useQuestionnaireStore();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-card text-card-foreground rounded-lg border shadow-sm p-8 max-w-md mx-auto text-center space-y-6"
    >
      <div className="mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
        <CheckCircle2 className="h-10 w-10 text-primary" />
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold">提交成功！</h2>
        <p className="text-muted-foreground">
          感谢您完成问卷。我们已收到您的回答，我们的团队将会尽快审核。
        </p>
      </div>

      <Button
        variant="outline"
        className="flex items-center gap-2"
        onClick={resetQuestionnaire}
      >
        <RefreshCcw className="h-4 w-4" />
        重新开始
      </Button>
    </motion.div>
  );
}
