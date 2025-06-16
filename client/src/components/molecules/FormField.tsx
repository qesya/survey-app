import React, { type ReactNode } from "react";

import { Label } from "@/components/atoms/Label";

interface FormFieldProps {
  label: string;
  htmlFor: string;
  children: ReactNode;
  error?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  htmlFor,
  children,
  error,
}) => {
  return (
    <div className="grid w-full items-center gap-2 mb-4">
      <Label htmlFor={htmlFor} className="text-base font-semibold">
        {label}
      </Label>
      {children}
      {error && <p className="text-sm font-medium text-destructive">{error}</p>}
    </div>
  );
};

export default FormField;
