# Multi-Step Questionnaire Framework

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.0-blue)](https://reactjs.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14.0-black)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC)](https://tailwindcss.com/)
[![Zustand](https://img.shields.io/badge/Zustand-4.4-yellow)](https://github.com/pmndrs/zustand)

A modern, accessible, and customizable multi-step questionnaire framework built with React, TypeScript, and Next.js. Perfect for surveys, onboarding flows, and complex form applications.

![Questionnaire Demo](https://quiz-flow-nextjs.vercel.app/)

## Features

- 🔄 **Multi-step navigation** with progress tracking
- 🧩 **Multiple question types** (single choice, multi choice, text, true/false, matching)
- ✅ **Built-in validation** with customizable error messages
- 🔍 **Optional questions** with smart confirmation dialogs
- 🎨 **Fully customizable** styling with Tailwind CSS
- 🌙 **Dark mode support** out of the box
- 📱 **Responsive design** for all screen sizes
- 💾 **Persistent state** with automatic saving
- 📝 **Form validation** with clear error messages
- 🔔 **Toast notifications** for user feedback
- ♿ **Accessibility** focused with proper ARIA attributes
- 🌐 **Internationalization ready** structure

## Installation

```bash
# Clone the repository
git clone https://github.com/IlIIIIIIlI/quiz-flow-nextjs.git

# Navigate to the project directory
cd multi-step-questionnaire

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Quick Start

Create your own questionnaire in three simple steps:

### 1. Define your questions in `config/questionnaire.ts`

```typescript
export const myQuestionnaire: QuestionnaireConfig = {
  id: "my-custom-survey",
  title: "Customer Feedback Survey",
  description: "Help us improve our products and services",
  steps: [
    {
      id: "basic-info",
      title: "Basic Information",
      label: "Info",
      questions: [
        {
          id: "age",
          type: "single",
          prompt: "What is your age range?",
          options: ["18-24", "25-34", "35-44", "45-54", "55+"],
        },
        {
          id: "email",
          type: "text",
          prompt: "Your email address",
          optional: true,
        },
      ],
    },
    // Add more steps as needed
  ],
};
```

### 2. Set it as the active questionnaire

```typescript
// In config/questionnaire.ts
export const activeQuestionnaire = myQuestionnaire;
```

### 3. Run your application

```bash
npm run dev
```

Visit `http://localhost:3000` to see your questionnaire in action!

## Customization

### Question Types

The framework supports multiple question types out of the box:

- `single` - Single choice from multiple options
- `multi` - Multiple choices from options
- `text` - Free text input
- `trueFalse` - Yes/No boolean choice
- `matching` - Match items from column A to column B

### Styling

The components use Tailwind CSS and shadcn/ui for styling. You can customize the look and feel by:

1. Modifying the Tailwind theme in `tailwind.config.js`
2. Updating component styles in their respective files
3. Creating custom question types by extending the base components

### Validation

Each question can have custom validation:

```typescript
{
  id: 'project',
  type: 'text',
  prompt: 'Describe your most challenging project',
  validation: {
    minLength: 50,
    maxLength: 500,
    errorMessage: 'Please provide at least 50 characters'
  }
}
```

## API Reference

### Core Components

| Component            | Description                                      |
| -------------------- | ------------------------------------------------ |
| `StepContainer`      | Renders a complete step with all its questions   |
| `QuestionRenderer`   | Renders an individual question based on its type |
| `NavigationControls` | Handles navigation between steps                 |
| `ProgressIndicator`  | Shows progress through the questionnaire         |
| `SubmitButton`       | Handles questionnaire submission                 |

### Hooks and State

The application uses Zustand for state management. Key functions include:

- `useQuestionnaireStore()` - Access the global questionnaire state
- `nextStep()` - Proceed to the next step (with validation)
- `previousStep()` - Return to the previous step
- `setResponse(id, value)` - Update a question's response
- `validateCurrentStep()` - Validate the current step
- `submitResponses()` - Submit the completed questionnaire

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Zustand](https://github.com/pmndrs/zustand)
- [Sonner](https://github.com/emilkowalski/sonner)
- [Framer Motion](https://www.framer.com/motion/)
