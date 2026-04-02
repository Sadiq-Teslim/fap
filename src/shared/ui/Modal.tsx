import React, { useRef } from "react";
import { cn } from "../utils";
import { useClickOutside } from "../hooks";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: "sm" | "md" | "lg" | "xl";
  children: React.ReactNode;
  closeButton?: boolean;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  size = "md",
  children,
  closeButton = true,
  className,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useClickOutside(modalRef, onClose);

  if (!isOpen) return null;

  const sizeStyles = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
      <div
        ref={modalRef}
        className={cn(
          "w-full rounded-xl bg-navy-light border border-navy-border shadow-card",
          sizeStyles[size],
          className,
        )}
      >
        {(title || closeButton) && (
          <div className="flex items-center justify-between border-b border-navy-border px-6 py-4">
            {title && (
              <h2 className="text-xl font-semibold text-white">{title}</h2>
            )}
            {closeButton && (
              <button
                type="button"
                className="ml-auto inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-navy-mid hover:text-white"
                onClick={onClose}
              >
                &times;
              </button>
            )}
          </div>
        )}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  isLoading?: boolean;
  variant?: "info" | "warning" | "danger";
}

export const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  isLoading = false,
  variant = "info",
}) => {
  const iconStyles = {
    info: "bg-primary/20 text-primary-light",
    warning: "bg-warning/20 text-warning",
    danger: "bg-danger/20 text-danger",
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <div className="text-center">
        <div
          className={cn(
            "mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full",
            iconStyles[variant],
          )}
        >
          {variant === "info" && "!"}
          {variant === "warning" && "\u26A0"}
          {variant === "danger" && "\u2715"}
        </div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        {description && <p className="mt-2 text-slate-400">{description}</p>}
        <div className="mt-6 flex gap-3">
          <button
            className="flex-1 rounded-lg border border-navy-border px-4 py-2 font-semibold text-slate-300 hover:bg-navy-mid transition-colors"
            onClick={onClose}
            disabled={isLoading}
          >
            {cancelText}
          </button>
          <button
            className={cn(
              "flex-1 rounded-lg px-4 py-2 font-semibold text-white transition-colors",
              variant === "danger"
                ? "bg-danger hover:bg-danger/80"
                : "bg-primary hover:bg-primary-dark",
            )}
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
};

interface ToastProps {
  type?: "success" | "error" | "info" | "warning";
  title: string;
  message?: string;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  duration?: number;
  onClose?: () => void;
}

const Toast: React.FC<ToastProps> = ({
  type = "info",
  title,
  message,
  position = "top-right",
  duration = 5000,
  onClose,
}) => {
  const [isVisible, setIsVisible] = React.useState(true);

  React.useEffect(() => {
    if (!isVisible) return;

    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose, isVisible]);

  if (!isVisible) return null;

  const typeStyles = {
    success: "bg-success text-white",
    error: "bg-danger text-white",
    info: "bg-primary text-white",
    warning: "bg-warning text-white",
  };

  const positionStyles = {
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
  };

  return (
    <div
      className={cn(
        "fixed z-50 rounded-lg p-4 shadow-lg animate-slideInRight",
        typeStyles[type],
        positionStyles[position],
      )}
    >
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <h4 className="font-semibold">{title}</h4>
          {message && <p className="mt-1 text-sm opacity-90">{message}</p>}
        </div>
        <button
          className="flex-shrink-0 text-lg opacity-70 hover:opacity-100"
          onClick={() => setIsVisible(false)}
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export const useToast = () => {
  const [toasts, setToasts] = React.useState<
    Array<ToastProps & { id: string }>
  >([]);

  const showToast = (props: Omit<ToastProps, "onClose">) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [
      ...prev,
      { ...props, id, onClose: () => removeToast(id) },
    ]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return { showToast, toasts };
};

interface ToastContainerProps {
  toasts: Array<ToastProps & { id: string }>;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts }) => {
  return (
    <div className="fixed inset-0 pointer-events-none">
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <Toast {...toast} />
        </div>
      ))}
    </div>
  );
};
