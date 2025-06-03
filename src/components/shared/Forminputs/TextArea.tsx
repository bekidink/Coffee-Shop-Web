"use client";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface TextareaInputProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  isRequired?: boolean;
  type?: string;
  className?: string;
}

const TextareaInput: React.FC<TextareaInputProps> = ({
  label,
  name,
  register,
  errors,
  isRequired = true,
  type = "text",
  className = "sm:col-span-2",
}) => {
  return (
    <div className={className}>
      <Label
        htmlFor={name}
        className="block text-sm font-medium text-gray-900 dark:text-slate-50 mb-2"
      >
        {label}
      </Label>
      <div className="mt-2">
        <Textarea
          {...register(name, { required: isRequired })}
          id={name}
          name={name}
          rows={3}
          placeholder={`Type the ${label}`}
          defaultValue=""
          className="dark:bg-transparent dark:text-slate-100"
        />
        {errors[name] && (
          <span className="text-sm text-destructive mt-1">
            {label} is required
          </span>
        )}
      </div>
    </div>
  );
};

export default TextareaInput;
