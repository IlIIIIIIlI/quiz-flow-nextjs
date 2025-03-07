"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface StepConfirmationProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title?: string;
  message: string;
  unfilledItems?: string[];
}

export default function StepConfirmation({
  isOpen,
  onConfirm,
  onCancel,
  title = "确认操作",
  message,
  unfilledItems = [],
}: StepConfirmationProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && onCancel()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription className="space-y-4">
            <p>{message}</p>

            {unfilledItems.length > 0 && (
              <div className="mt-2">
                <p className="font-medium text-amber-500 dark:text-amber-400">
                  以下可选项尚未填写:
                </p>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  {unfilledItems.map((item, index) => (
                    <li key={index} className="text-muted-foreground">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>返回填写</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>继续前进</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
