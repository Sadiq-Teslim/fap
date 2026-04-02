import React from "react";
import { cn } from "../utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, icon, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="mb-2 block text-sm font-semibold text-slate-200">
            {label}
            {props.required && <span className="ml-1 text-danger">*</span>}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-4 top-3 text-slate-400">{icon}</div>
          )}
          <input
            ref={ref}
            className={cn(
              "w-full rounded-lg border border-navy-border bg-navy-mid px-4 py-3 text-white transition-all duration-200",
              "focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
              "placeholder:text-slate-500",
              icon && "pl-12",
              error && "border-danger focus:border-danger focus:ring-danger/20",
              className,
            )}
            {...props}
          />
        </div>
        {error && <p className="mt-1 text-sm text-danger">{error}</p>}
        {helperText && !error && (
          <p className="mt-1 text-sm text-slate-400">{helperText}</p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  rows?: number;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helperText, rows = 4, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="mb-2 block text-sm font-semibold text-slate-200">
            {label}
            {props.required && <span className="ml-1 text-danger">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          rows={rows}
          className={cn(
            "w-full rounded-lg border border-navy-border bg-navy-mid px-4 py-3 text-white transition-all duration-200",
            "focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
            "placeholder:text-slate-500 resize-none",
            error && "border-danger focus:border-danger focus:ring-danger/20",
            className,
          )}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-danger">{error}</p>}
        {helperText && !error && (
          <p className="mt-1 text-sm text-slate-400">{helperText}</p>
        )}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    { className, label, error, helperText, options, placeholder, ...props },
    ref,
  ) => {
    return (
      <div className="w-full">
        {label && (
          <label className="mb-2 block text-sm font-semibold text-slate-200">
            {label}
            {props.required && <span className="ml-1 text-danger">*</span>}
          </label>
        )}
        <select
          ref={ref}
          className={cn(
            "w-full rounded-lg border border-navy-border bg-navy-mid px-4 py-3 text-white transition-all duration-200",
            "focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
            error && "border-danger focus:border-danger focus:ring-danger/20",
            className,
          )}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="mt-1 text-sm text-danger">{error}</p>}
        {helperText && !error && (
          <p className="mt-1 text-sm text-slate-400">{helperText}</p>
        )}
      </div>
    );
  },
);

Select.displayName = "Select";
