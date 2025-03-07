"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckIcon, XIcon } from "lucide-react";

interface TrueFalseProps {
  value?: boolean;
  onChange: (value: boolean) => void;
  required?: boolean;
  error?: boolean;
}

export default function TrueFalse({
  value,
  onChange,
  required,
  error,
}: TrueFalseProps) {
  return (
    <div className="flex gap-4">
      <Button
        variant="outline"
        className={cn(
          "flex-1",
          value === true && "bg-primary text-primary-foreground",
          error && "border-destructive text-destructive"
        )}
        onClick={() => onChange(true)}
      >
        <CheckIcon className="mr-2 h-4 w-4" />是
      </Button>
      <Button
        variant="outline"
        className={cn(
          "flex-1",
          value === false && "bg-primary text-primary-foreground",
          error && "border-destructive text-destructive"
        )}
        onClick={() => onChange(false)}
      >
        <XIcon className="mr-2 h-4 w-4" />否
      </Button>
    </div>
  );
}
