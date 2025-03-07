"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface MultiChoiceProps {
  options: string[];
  value?: string[];
  onChange: (value: string[]) => void;
  required?: boolean;
  error?: boolean;
}

export default function MultiChoice({
  options,
  value = [],
  onChange,
  required,
  error,
}: MultiChoiceProps) {
  const handleChange = (option: string, checked: boolean) => {
    if (checked) {
      onChange([...value, option]);
    } else {
      onChange(value.filter((v) => v !== option));
    }
  };

  return (
    <div className="space-y-3">
      {options.map((option) => (
        <div key={option} className="flex items-center space-x-2">
          <Checkbox
            id={option}
            checked={value.includes(option)}
            onCheckedChange={(checked) =>
              handleChange(option, checked as boolean)
            }
            className={cn(
              error && "border-destructive data-[state=checked]:bg-destructive"
            )}
          />
          <Label htmlFor={option} className={cn(error && "text-destructive")}>
            {option}
          </Label>
        </div>
      ))}
    </div>
  );
}
