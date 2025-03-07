"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface SingleChoiceProps {
  options: string[];
  value?: string;
  onChange: (value: string) => void;
  required?: boolean;
  error?: boolean;
}

export default function SingleChoice({
  options,
  value,
  onChange,
  required,
  error,
}: SingleChoiceProps) {
  return (
    <RadioGroup value={value} onValueChange={onChange} className="space-y-3">
      {options.map((option) => (
        <div key={option} className="flex items-center space-x-2">
          <RadioGroupItem
            value={option}
            id={option}
            className={cn(error && "border-destructive text-destructive")}
          />
          <Label htmlFor={option} className={cn(error && "text-destructive")}>
            {option}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
}
