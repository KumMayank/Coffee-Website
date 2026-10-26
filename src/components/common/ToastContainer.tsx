import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, Sparkles, X } from 'lucide-react';

export type ToastType = 'success' | 'info' | 'warning' | 'deal';

export interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
}

interface ToastContextValue {
  showToast: (title: string, message?: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback((title: string, message?: string, type: ToastType = 'success') => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, title, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast Render Portal */}
      <div className="fixed bottom-24 lg:bottom-6 right-4 sm:right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
        {toasts.map((toast) => {
          let icon = <CheckCircle2 className="w-5 h-5 text-caramel flex-shrink-0" />;
          let borderClass = 'border-caramel/40';

          if (toast.type === 'warning') {
            icon = <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0" />;
            borderClass = 'border-amber-500/40';
          } else if (toast.type === 'deal') {
            icon = <Sparkles className="w-5 h-5 text-gold-300 flex-shrink-0 animate-spin-slow" />;
            borderClass = 'border-gold-400/50';
          } else if (toast.type === 'info') {
            icon = <Info className="w-5 h-5 text-cream/70 flex-shrink-0" />;
            borderClass = 'border-cream/20';
          }

          return (
            <div
              key={toast.id}
              className={`pointer-events-auto flex items-start gap-3 p-4 rounded-2xl bg-espresso-950/90 backdrop-blur-xl border ${borderClass} shadow-2xl text-cream transform transition-all duration-300 animate-in slide-in-from-right`}
            >
              <div className="mt-0.5">{icon}</div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-cream">{toast.title}</p>
                {toast.message && (
                  <p className="text-xs text-cream/70 mt-0.5 leading-relaxed">{toast.message}</p>
                )}
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-cream/50 hover:text-cream p-1 rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return ctx;
};
