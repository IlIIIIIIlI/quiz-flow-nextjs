import { SubmissionData } from "@/types/question";

// 模拟API提交函数
export async function submitQuestionnaire(
  data: SubmissionData
): Promise<{ success: boolean; message: string }> {
  // 模拟网络延迟
  return new Promise((resolve) => {
    setTimeout(() => {
      // 模拟服务器校验和响应
      // 在实际应用中，这里会是真实的API调用
      console.log("问卷提交数据:", data);

      // 模拟90%的成功率
      const success = Math.random() < 0.9;

      if (success) {
        resolve({
          success: true,
          message: "问卷提交成功！感谢您的参与。",
        });
      } else {
        resolve({
          success: false,
          message: "提交失败，请稍后再试。",
        });
      }
    }, 1500); // 1.5秒延迟模拟网络请求
  });
}
