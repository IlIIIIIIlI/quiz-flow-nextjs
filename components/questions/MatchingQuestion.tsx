"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface MatchingQuestionProps {
  options: string[];
  value?: Record<string, string>;
  onChange: (value: Record<string, string>) => void;
  required?: boolean;
  error?: boolean;
}

export default function MatchingQuestion({
  options,
  value = {},
  onChange,
  required,
  error,
}: MatchingQuestionProps) {
  const handleChange = (key: string, selectedValue: string) => {
    onChange({
      ...value,
      [key]: selectedValue,
    });
  };

  return (
    <div className="space-y-4">
      {options.map((option) => (
        <div key={option} className="flex items-center gap-4">
          <span className={cn("min-w-[120px]", error && "text-destructive")}>
            {option}
          </span>
          <Select
            value={value[option]}
            onValueChange={(val) => handleChange(option, val)}
          >
            <SelectTrigger
              className={cn("w-[200px]", error && "border-destructive")}
            >
              <SelectValue placeholder="请选择匹配项" />
            </SelectTrigger>
            <SelectContent>
              {options.map((matchOption) => (
                <SelectItem key={matchOption} value={matchOption}>
                  {matchOption}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ))}
    </div>
  );
}
