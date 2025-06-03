"use client";
import React from "react";
import { UseFormRegister, useWatch } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface ToggleInputProps {
  label: string;
  name: string;
  trueTitle: string;
  falseTitle: string;
  register: UseFormRegister<any>;
  className?: string;
}

const ToggleInput: React.FC<ToggleInputProps> = ({
  label,
  name,
  trueTitle,
  falseTitle,
  register,
  className = "sm:col-span-2 flex flex-wrap",
}) => {
  const isChecked = useWatch({
    name,
    // control: register(name)., // Access control from register
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
