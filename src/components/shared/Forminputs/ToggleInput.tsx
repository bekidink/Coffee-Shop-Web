"use client";
import React from "react";
import { UseFormRegister, useWatch, Control } from "react-hook-form"; // Import Control
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface ToggleInputProps {
  label: string;
  name: string;
  trueTitle: string;
  falseTitle: string;
  register: UseFormRegister<any>;
  control: Control<any>; // Add control prop
  className?: string;
}

const ToggleInput: React.FC<ToggleInputProps> = ({
  label,
  name,
  trueTitle,
  falseTitle,
  register,
  control, // Receive control prop
  className = "sm:col-span-2 flex flex-wrap",
}) => {
  const isChecked = useWatch({
    name,
    control, // Use the passed control
  });

  return (
    <div className={className}>
      <div className="w-full sm:w-1/2">
        <Label
          htmlFor={name}
          className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-50 mb-2"
        >
          {label}
        </Label>
      </div>
      <div className="w-full sm:w-1/2">
        <div className="flex items-center space-x-3">
          <Switch
            {...register(name)}
            id={name}
            checked={isChecked}
            className="data-[state=checked]:bg-purple-600"
          />
          <span className="text-sm font-medium text-gray-900 dark:text-gray-300">
            {isChecked ? trueTitle : falseTitle}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ToggleInput;
