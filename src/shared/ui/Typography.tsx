import React from "react";
import { cn } from "../utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "success" | "warning" | "danger";
  size?: "sm" | "md";
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const variantStyles = {
      primary: "bg-primary bg-opacity-10 text-primary",
      success: "bg-success bg-opacity-10 text-success",
      warning: "bg-warning bg-opacity-10 text-warning",
      danger: "bg-danger bg-opacity-10 text-danger",
    };

    const sizeStyles = {
      sm: "px-2 py-1 text-xs",
      md: "px-3 py-1 text-sm",
    };

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full font-semibold",
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...props}
      />
    );
  },
);

Badge.displayName = "Badge";

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "info" | "success" | "warning" | "error";
  title?: string;
  icon?: React.ReactNode;
  closeable?: boolean;
  onClose?: () => void;
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      type = "info",
      title,
      icon,
      closeable,
      onClose,
      children,
      ...props
    },
    ref,
  ) => {
    const [isVisible, setIsVisible] = React.useState(true);

    if (!isVisible) return null;

    const typeStyles = {
      info: "bg-blue-50 border-blue-200 text-blue-700",
      success:
        "bg-success bg-opacity-10 border border-success border-opacity-30 text-success",
      warning:
        "bg-warning bg-opacity-10 border border-warning border-opacity-30 text-warning",
      error:
        "bg-danger bg-opacity-10 border border-danger border-opacity-30 text-danger",
    };

    const handleClose = () => {
      setIsVisible(false);
      onClose?.();
    };

    return (
      <div
        ref={ref}
        className={cn("rounded-lg p-4", typeStyles[type], className)}
        {...props}
      >
        <div className="flex items-start">
          {icon && <div className="mr-3 flex-shrink-0">{icon}</div>}
          <div className="flex-1">
            {title && <h3 className="font-semibold">{title}</h3>}
            <div className={title ? "mt-1" : ""}>{children}</div>
          </div>
          {closeable && (
            <button
              type="button"
              className="ml-auto flex-shrink-0 text-lg opacity-70 hover:opacity-100"
              onClick={handleClose}
            >
              ×
            </button>
          )}
        </div>
      </div>
    );
  },
);

Alert.displayName = "Alert";

interface LoadingProps {
  size?: "sm" | "md" | "lg";
  centered?: boolean;
  text?: string;
}

export const Loading: React.FC<LoadingProps> = ({
  size = "md",
  centered = true,
  text,
}) => {
  const sizeStyles = {
    sm: "h-6 w-6",
    md: "h-10 w-10",
    lg: "h-16 w-16",
  };

  const spinner = (
    <svg
      className={cn("animate-spin text-primary", sizeStyles[size])}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  if (centered) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        {spinner}
        {text && <p className="mt-4 text-neutral-dark">{text}</p>}
      </div>
    );
  }

  return spinner;
};

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string | number;
  height?: string | number;
  borderRadius?: string;
}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      width = "100%",
      height = "16px",
      borderRadius = "8px",
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn("animate-pulse bg-neutral-light", className)}
        style={{ width, height, borderRadius }}
        {...props}
      />
    );
  },
);

Skeleton.displayName = "Skeleton";

export const SkeletonCard: React.FC = () => {
  return (
    <div className="space-y-4 rounded-lg border border-neutral-light p-6">
      <Skeleton height="24px" width="60%" />
      <Skeleton height="16px" width="100%" />
      <Skeleton height="16px" width="85%" />
      <div className="pt-4">
        <Skeleton height="40px" width="100%" borderRadius="6px" />
      </div>
    </div>
  );
};
