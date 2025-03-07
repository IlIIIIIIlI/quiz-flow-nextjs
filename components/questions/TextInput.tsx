"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface TextInputProps {
  value?: string;
  onChange: (value: string) => void;
  validation?: {
    minLength?: number;
    maxLength?: number;
    errorMessage?: string;
  };
  required?: boolean;
  error?: boolean;
}

export default function TextInput({
  value = "",
  onChange,
  validation,
  required,
  error,
}: TextInputProps) {
  return (
    <div className="space-y-2">
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        minLength={validation?.minLength}
        maxLength={validation?.maxLength}
        className={cn(
          "w-full",
          error && "border-destructive focus-visible:ring-destructive"
        )}
      />
      {validation?.maxLength && (
        <p
          className={cn(
            "text-sm text-muted-foreground",
            value.length >= (validation.maxLength || 0) && "text-destructive",
            error && "text-destructive"
          )}
        >
          {value.length}/{validation.maxLength} 字符
        </p>
      )}
    </div>
  );
}
