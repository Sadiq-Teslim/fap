import clsx from "clsx";
import { format } from "date-fns";
import { DATE_FORMATS } from "../constants";
import type { ApiResponse } from "../types";

// Class Name Utilities
export const cn = (...classes: any[]) => {
  return clsx(...classes);
};

// Date Utilities
export const formatDate = (
  date: Date | string,
  formatString: string = DATE_FORMATS.SHORT_DATE,
): string => {
  try {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return format(dateObj, formatString);
  } catch {
    return "Invalid date";
  }
};

export const formatDateTime = (date: Date | string): string => {
  return formatDate(date, DATE_FORMATS.DATE_TIME);
};

export const formatTime = (date: Date | string): string => {
  return formatDate(date, DATE_FORMATS.TIME);
};

export const isDateBeforeNow = (date: Date | string): boolean => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.getTime() < Date.now();
};

export const isDateAfterNow = (date: Date | string): boolean => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.getTime() > Date.now();
};

// Number Utilities
export const formatCurrency = (
  amount: number,
  currency: string = "USD",
): string => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  });
  return formatter.format(amount);
};

export const formatNumber = (num: number, decimals: number = 2): string => {
  return num.toFixed(decimals);
};

export const abbreviateNumber = (num: number): string => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
};

export const parseFloat = (value: string | number): number => {
  const parsed = typeof value === "string" ? parseFloat(value) : value;
  return isNaN(parsed) ? 0 : parsed;
};

export const percentageChange = (
  oldValue: number,
  newValue: number,
): number => {
  if (oldValue === 0) return 0;
  return ((newValue - oldValue) / oldValue) * 100;
};

// String Utilities
export const capitalizeFirst = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const toTitleCase = (str: string): string => {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
  );
};

export const slugify = (str: string): string => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-");
};

export const truncateString = (str: string, length: number): string => {
  return str.length > length ? `${str.substring(0, length)}...` : str;
};

export const maskEmail = (email: string): string => {
  const [localPart, domain] = email.split("@");
  const maskedLocal =
    localPart.charAt(0) +
    "*".repeat(localPart.length - 2) +
    localPart.charAt(localPart.length - 1);
  return `${maskedLocal}@${domain}`;
};

export const maskWallet = (address: string): string => {
  if (address.length < 8) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

// Validation Utilities
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPassword = (
  password: string,
  minLength: number = 12,
): boolean => {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
  return (
    password.length >= minLength &&
    hasUpperCase &&
    hasLowerCase &&
    hasNumbers &&
    hasSpecialChar
  );
};

export const isValidEthereumAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

export const isValidURL = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Array Utilities
export const uniqueArray = <T>(arr: T[], key?: (item: T) => any): T[] => {
  if (!key) return [...new Set(arr)];
  return [...new Map(arr.map((item) => [key(item), item])).values()];
};

export const findByProperty = <T>(
  arr: T[],
  property: keyof T,
  value: any,
): T | undefined => {
  return arr.find((item) => item[property] === value);
};

export const groupByProperty = <T>(
  arr: T[],
  property: keyof T,
): Record<string, T[]> => {
  return arr.reduce(
    (acc, item) => {
      const key = String(item[property]);
      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
    },
    {} as Record<string, T[]>,
  );
};

export const sortByProperty = <T>(
  arr: T[],
  property: keyof T,
  desc: boolean = false,
): T[] => {
  const sorted = [...arr].sort((a, b) => {
    const aVal = a[property];
    const bVal = b[property];
    if (aVal < bVal) return desc ? 1 : -1;
    if (aVal > bVal) return desc ? -1 : 1;
    return 0;
  });
  return sorted;
};

// Object Utilities
export const flattenObject = (
  obj: Record<string, any>,
  prefix: string = "",
): Record<string, any> => {
  const flattened: Record<string, any> = {};
  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === "object" && !Array.isArray(value)) {
      Object.assign(flattened, flattenObject(value, newKey));
    } else {
      flattened[newKey] = value;
    }
  }
  return flattened;
};

export const pickProperties = <
  T extends Record<string, any>,
  K extends keyof T,
>(
  obj: T,
  keys: K[],
): Pick<T, K> => {
  return keys.reduce(
    (acc, key) => {
      acc[key] = obj[key];
      return acc;
    },
    {} as Pick<T, K>,
  );
};

// Async Utilities
export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const retry = async <T>(
  fn: () => Promise<T>,
  options: { maxAttempts?: number; delayMs?: number } = {},
): Promise<T> => {
  const { maxAttempts = 3, delayMs = 1000 } = options;
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      if (attempt < maxAttempts) {
        await delay(delayMs * attempt);
      }
    }
  }

  throw lastError;
};

// Local Storage Utilities
export const getFromLocalStorage = <T>(
  key: string,
  defaultValue?: T,
): T | null => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : (defaultValue ?? null);
  } catch {
    return defaultValue ?? null;
  }
};

export const setToLocalStorage = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Failed to save to localStorage:", error);
  }
};

export const removeFromLocalStorage = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Failed to remove from localStorage:", error);
  }
};

// API Response Utilities
export const isApiSuccess = <T>(response: ApiResponse<T>): boolean => {
  return response.success === true;
};

export const isApiError = <T>(response: ApiResponse<T>): boolean => {
  return response.success === false;
};

// Random Utilities
export const generateRandomId = (length: number = 16): string => {
  return Math.random()
    .toString(36)
    .substring(2, length + 2);
};

export const generateRandomColor = (): string => {
  const colors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", "#98D8C8"];
  return colors[Math.floor(Math.random() * colors.length)];
};

// Copy to Clipboard
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
};
