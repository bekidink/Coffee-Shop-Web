import React from "react";
import { UseFormRegister } from "react-hook-form";

interface Option {
  id: string | number;
  title: string;
}

interface SelectInputProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  className?: string;
  options?: Option[];
  multiple?: boolean;
}

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  name,
  register,
  className = "sm:col-span-2",
  options = [],
  multiple = false,
}) => {
  return (
    <div className={className}>
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-50"
      >
        {label}
      </label>
      <div className="mt-2">
        <select
          multiple={multiple}
          {...register(name)}
          id={name}
          name={name}
          className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
        >
          {options.map((option, i) => (
            <option key={i} value={option.id}>
              {option.title}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SelectInput;
