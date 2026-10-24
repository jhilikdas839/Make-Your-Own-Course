import { useCallback, useState } from "react";
import { ToastContext } from "./toastContext";

const STYLES = {
  success: { icon: "ri-checkbox-circle-fill", color: "text-green-500" },
  error: { icon: "ri-error-warning-fill", color: "text-red-500" },
  info: { icon: "ri-information-fill", color: "text-primary" },
};

function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = "success") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3200);
  }, []);

  return (
    <ToastContext.Provider value={showToast}>
      {children}

      <div className="fixed bottom-5 right-5 z-[100] flex w-[calc(100%-2.5rem)] max-w-sm flex-col gap-2" aria-live="polite">
        {toasts.map((toast) => {
          const style = STYLES[toast.type] || STYLES.info;
          return (
            <div
              key={toast.id}
              className="flex animate-slide-in items-start gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-lg"
            >
              <i className={`${style.icon} ${style.color} mt-0.5 text-lg`}></i>
              <p className="text-sm text-[#10131d]">{toast.message}</p>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export default ToastProvider;
