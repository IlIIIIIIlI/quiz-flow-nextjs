import { QuestionnaireConfig } from "@/types/question";

export const developerQuestionnaire: QuestionnaireConfig = {
  id: "developer-onboarding",
  title: "开发者入职问卷",
  description: "帮助我们了解您的经验和偏好",
  submitButtonText: "提交问卷",
  defaultRequiredMessage: "此字段为必填项",
  defaultErrorMessage: "请检查您的输入",
  steps: [
    {
      id: "basic-info",
      title: "基本信息",
      description: "让我们了解您的编程背景",
      label: "基础",
      confirmationMessage: "请确保您已填写所有必填信息，准备好进入下一步了吗？",
      questions: [
        {
          id: "experience",
          type: "single",
          prompt: "您有多少年的编程经验？",
          options: ["0-1 年", "1-3 年", "3-5 年", "5+ 年"],
          // 必填项不设置 optional
          validation: {
            errorMessage: "请选择您的编程经验",
          },
        },
        {
          id: "remote",
          type: "trueFalse",
          prompt: "您是否有远程工作经验？",
          optional: true, // 标记为可选项
        },
      ],
    },
    {
      id: "tech-stack",
      title: "技术栈",
      description: "告诉我们您熟悉的技术",
      label: "技术",
      confirmationMessage: "所有技术信息已填写完毕，是否继续？",
      questions: [
        {
          id: "languages",
          type: "multi",
          prompt: "您熟悉哪些编程语言？",
          options: [
            "JavaScript",
            "TypeScript",
            "Python",
            "Java",
            "C++",
            "Ruby",
            "Go",
          ],
          validation: {
            errorMessage: "请至少选择一种编程语言",
          },
        },
        {
          id: "matching",
          type: "matching",
          prompt: "请将以下概念与其描述匹配",
          options: ["REST", "GraphQL", "WebSocket", "gRPC"],
          optional: true,
        },
      ],
    },
    {
      id: "project-details",
      title: "项目详情",
      description: "分享您的项目经验",
      label: "项目",
      confirmationMessage: "项目描述已完成，准备提交问卷了吗？",
      questions: [
        {
          id: "project",
          type: "text",
          prompt: "描述您最具挑战性的项目",
          validation: {
            minLength: 50,
            maxLength: 500,
            errorMessage: "请提供至少50个字符的项目描述",
          },
        },
      ],
    },
  ],
};

// 可以添加更多问卷配置
export const feedbackQuestionnaire: QuestionnaireConfig = {
  id: "feedback-form",
  title: "用户反馈表单",
  // ... 其他配置
  steps: [],
};

// 选择当前使用的问卷
export const activeQuestionnaire = developerQuestionnaire;
