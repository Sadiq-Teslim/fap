import { useCallback, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { CACHE_DURATION } from "../constants";

// useLocalStorage Hook
export const useLocalStorage = <T>(key: string, initialValue?: T) => {
  const [storedValue, setStoredValue] = useState<T | null>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : (initialValue ?? null);
    } catch (error) {
      console.error("Failed to read from localStorage:", error);
      return initialValue ?? null;
    }
  });

  const setValue = useCallback(
    (value: T | null) => {
      try {
        setStoredValue(value);
        if (value === null) {
          window.localStorage.removeItem(key);
        } else {
          window.localStorage.setItem(key, JSON.stringify(value));
        }
      } catch (error) {
        console.error("Failed to write to localStorage:", error);
      }
    },
    [key],
  );

  return [storedValue, setValue] as const;
};

// useAsync Hook
export const useAsync = <T, E = string>(
  asyncFunction: () => Promise<T>,
  immediate: boolean = true,
) => {
  const [status, setStatus] = useState<
    "idle" | "pending" | "success" | "error"
  >("idle");
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<E | null>(null);

  const execute = useCallback(async () => {
    setStatus("pending");
    setData(null);
    setError(null);

    try {
      const response = await asyncFunction();
      setData(response);
      setStatus("success");
      return response;
    } catch (error) {
      setError(error as E);
      setStatus("error");
    }
  }, [asyncFunction]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { execute, status, data, error };
};

// useDebounce Hook
export const useDebounce = <T>(value: T, delay: number = 500): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

// useThrottle Hook
export const useThrottle = <T>(value: T, interval: number = 500): T => {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastUpdated = useRef<number>(Date.now());

  useEffect(() => {
    const now = Date.now();

    if (now >= lastUpdated.current + interval) {
      lastUpdated.current = now;
      setThrottledValue(value);
    }
  }, [value, interval]);

  return throttledValue;
};

// usePrevious Hook
export const usePrevious = <T>(value: T): T | undefined => {
  const ref = useRef<T | undefined>(undefined);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};

// useIsMounted Hook
export const useIsMounted = (): boolean => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted;
};

// useMediaQuery Hook
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);

    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
};

// useWindowSize Hook
export const useWindowSize = () => {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return size;
};

// useClickOutside Hook
export const useClickOutside = (
  ref: React.RefObject<HTMLElement | null>,
  callback: () => void,
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref, callback]);
};

// useFetch Hook with Cache
export const useFetch = <T>(url: string, options: RequestInit = {}) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const cacheRef = useRef<Record<string, { data: T; timestamp: number }>>({});

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      // Check cache
      const cached = cacheRef.current[url];
      if (
        cached &&
        Date.now() - cached.timestamp < CACHE_DURATION.MEDIUM * 1000
      ) {
        setData(cached.data);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(url, options);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (!cancelled) {
          cacheRef.current[url] = { data: result, timestamp: Date.now() };
          setData(result);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error("Unknown error"));
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [url, options]);

  return { data, loading, error };
};

// useToggle Hook
export const useToggle = (
  initialValue: boolean = false,
): [boolean, () => void] => {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue((v) => !v);
  }, []);

  return [value, toggle];
};

// useCounter Hook
export const useCounter = (initialValue: number = 0, step: number = 1) => {
  const [count, setCount] = useState(initialValue);

  const increment = useCallback(() => setCount((c) => c + step), [step]);
  const decrement = useCallback(() => setCount((c) => c - step), [step]);
  const reset = useCallback(() => setCount(initialValue), [initialValue]);

  return { count, increment, decrement, reset };
};

// useNavigateWithQuery Hook
export const useNavigateWithQuery = () => {
  const navigate = useNavigate();

  const navigateWithQuery = useCallback(
    (path: string, query: Record<string, any> = {}) => {
      const queryString = new URLSearchParams(query).toString();
      const url = queryString ? `${path}?${queryString}` : path;
      navigate(url);
    },
    [navigate],
  );

  return navigateWithQuery;
};

// useFormValidation Hook
export const useFormValidation = <T extends Record<string, any>>(
  initialValues: T,
  onSubmit: (values: T) => void | Promise<void>,
  validate?: (values: T) => Record<string, string>,
) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value, type } = e.target;
      const val =
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
      setValues((prev) => ({ ...prev, [name]: val }));
    },
    [],
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name } = e.target;
      setTouched((prev) => ({ ...prev, [name]: true }));
    },
    [],
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (validate) {
        const newErrors = validate(values);
        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) {
          return;
        }
      }

      setIsSubmitting(true);
      try {
        await onSubmit(values);
      } finally {
        setIsSubmitting(false);
      }
    },
    [values, onSubmit, validate],
  );

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  const setFieldValue = useCallback((field: keyof T, value: any) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  }, []);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setFieldValue,
  };
};

// usePagination Hook
export const usePagination = (
  totalItems: number,
  itemsPerPage: number = 20,
) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const goToPage = useCallback(
    (page: number) => {
      const pageNum = Math.max(1, Math.min(page, totalPages));
      setCurrentPage(pageNum);
    },
    [totalPages],
  );

  const nextPage = useCallback(
    () => goToPage(currentPage + 1),
    [currentPage, goToPage],
  );
  const prevPage = useCallback(
    () => goToPage(currentPage - 1),
    [currentPage, goToPage],
  );

  return {
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    goToPage,
    nextPage,
    prevPage,
    hasPreviousPage: currentPage > 1,
    hasNextPage: currentPage < totalPages,
  };
};
