import { useCallback, useEffect, useState } from "react";

const SYNC_EVENT = "myoc-storage";

function readValue(key, initialValue) {
  try {
    const saved = localStorage.getItem(key);
    return saved !== null ? JSON.parse(saved) : initialValue;
  } catch {
    return initialValue;
  }
}

/**
 * useState that is saved in localStorage.
 * Every component using the same key stays in sync.
 */
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => readValue(key, initialValue));

  const setStoredValue = useCallback(
    (next) => {
      setValue((prev) => {
        const resolved = typeof next === "function" ? next(prev) : next;
        try {
          localStorage.setItem(key, JSON.stringify(resolved));
        } catch {
          // Storage full or blocked: keep the value in memory only.
        }
        queueMicrotask(() =>
          window.dispatchEvent(new CustomEvent(SYNC_EVENT, { detail: key }))
        );
        return resolved;
      });
    },
    [key]
  );

  useEffect(() => {
    const sync = (event) => {
      const changedKey = event.detail ?? event.key;
      if (changedKey === key) setValue(readValue(key, initialValue));
    };
    window.addEventListener(SYNC_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(SYNC_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
    // initialValue is only a fallback, so it is not a dependency
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return [value, setStoredValue];
}
