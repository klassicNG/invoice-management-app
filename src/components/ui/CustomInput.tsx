import React, { forwardRef } from 'react';

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  className?: string;
}

export const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className={`flex flex-col gap-2 ${className}`}>
        <div className="flex justify-between items-center">
          <label 
            className={`text-[13px] tracking-wide font-medium transition-colors ${
              error ? 'text-[#EC5757]' : 'text-[#7E88C3] dark:text-[#DFE3FA]'
            }`}
          >
            {label}
          </label>
          {error && (
            <span className="text-[11px] font-semibold text-[#EC5757]">
              {error}
            </span>
          )}
        </div>
        <input
          ref={ref}
          className={`w-full px-4 py-3 rounded-[4px] border outline-none font-bold text-[15px] bg-white text-[#0C0E16] dark:bg-[#1E2139] dark:text-white transition-colors duration-200 focus:border-[#9277FF] dark:focus:border-[#9277FF] ${
            error 
              ? 'border-[#EC5757] dark:border-[#EC5757]' 
              : 'border-[#DFE3FA] dark:border-[#252945]'
          }`}
          {...props}
        />
      </div>
    );
  }
);

CustomInput.displayName = 'CustomInput';
