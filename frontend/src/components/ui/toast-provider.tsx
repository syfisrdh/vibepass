"use client"

import * as React from "react"
import { createContext, useContext, useState } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { X, CheckCircle, AlertCircle, TriangleAlert, Info } from "lucide-react"
import { cn } from "@/lib/utils"

const toastVariants = cva(
  "group relative flex w-[90vw] max-w-md items-start overflow-hidden rounded-xl border p-2 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-right-full",
  {
    variants: {
      variant: {
        default: "border-slate-200 bg-white text-slate-950 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50",
        success:
          "border-green-600 bg-green-50 text-green-900 dark:border-green-800 dark:bg-green-950 dark:text-green-50",
        error: "border-red-500 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-950 dark:text-red-50",
        warning:
          "border-yellow-500 bg-yellow-50 text-yellow-900 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-50",
        info: "border-blue-500 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

type ToastType = "success" | "error" | "warning" | "info" | "default"

interface ToastProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof toastVariants> {
  duration?: number
  onClose?: () => void
  title?: string
  description?: string
}

interface ToastContextType {
  toast: (options: {
    title: string
    description?: string
    type?: ToastType
    duration?: number
  }) => void
}

// Context
const ToastContext = createContext<ToastContextType | undefined>(undefined)

// Toast Component
const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ className, variant, duration = 5000, onClose, title, description, children, ...props }, ref) => {
    const [progress, setProgress] = React.useState(100)
    const [isVisible, setIsVisible] = React.useState(true)
    const [isPaused, setIsPaused] = React.useState(false)
    const intervalRef = React.useRef<NodeJS.Timeout | null>(null)

    React.useEffect(() => {
      const decrementStep = 100 / (duration / 100)

      const startTimer = () => {
        intervalRef.current = setInterval(() => {
          setProgress((prevProgress) => {
            if (prevProgress <= decrementStep) {
              clearInterval(intervalRef.current as NodeJS.Timeout)
              setTimeout(() => {
                setIsVisible(false)
                if (onClose) onClose()
              }, 300)
              return 0
            }
            return prevProgress - decrementStep
          })
        }, 100)
      }

      if (!isPaused) {
        startTimer()
      }

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
        }
      }
    }, [duration, isPaused, onClose])

    const handleMouseEnter = () => {
      setIsPaused(true)
    }

    const handleMouseLeave = () => {
      setIsPaused(false)
    }

    const handleClose = () => {
      setIsVisible(false)
      if (onClose) onClose()
    }

    if (!isVisible) return null

    const getIcon = () => {
      switch (variant) {
        case "success":
          return <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-600" />
        case "error":
          return <AlertCircle className="h-5 w-5 text-red-500 dark:text-red-400" />
        case "warning":
          return <TriangleAlert className="h-5 w-5 text-yellow-500 dark:text-yellow-400" />
        case "info":
          return <Info className="h-5 w-5 text-blue-500 dark:text-blue-400" />
        default:
          return null
      }
    }

    const getProgressColor = () => {
      switch (variant) {
        case "success":
          return "bg-green-600 dark:bg-green-400 rounded-lg"
        case "error":
          return "bg-red-500 dark:bg-red-400 rounded-lg"
        case "warning":
          return "bg-yellow-500 dark:bg-yellow-400 rounded-lg"
        case "info":
          return "bg-blue-500 dark:bg-blue-400 rounded-lg"
        default:
          return "bg-slate-500 dark:bg-slate-400 rounded-lg"
      }
    }

    return (
      <div
        ref={ref}
        className={cn(toastVariants({ variant }), className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {getIcon() && <div className="mr-3 flex-shrink-0 mt-0.5">{getIcon()}</div>}
        <div className="flex-1 mr-4">
          {title && <div className="font-semibold text-sm mb-1">{title}</div>}
          {description && <div className="text-sm text-muted-foreground mb-1">{description}</div>}
          {children}
        </div>
        <button
          onClick={handleClose}
          className="absolute right-2 top-2 rounded-md p-1 text-slate-500 opacity-0 transition-opacity hover:text-slate-900 group-hover:opacity-100 dark:text-slate-400 dark:hover:text-slate-50"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="absolute bottom-0 left-0 right-0 h-1 w-full overflow-hidden">
          <div className={cn("h-full transition-all", getProgressColor())} style={{ width: `${progress}%` }} />
        </div>
      </div>
    )
  },
)
Toast.displayName = "Toast"

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Array<{
    id: string
    title: string
    description?: string
    type: ToastType
    duration: number
  }>>([])

  const toast = ({
    title,
    description,
    type = "default",
    duration = 5000
  }: {
    title: string
    description?: string
    type?: ToastType
    duration?: number
  }) => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts((prev) => [...prev, { id, title, description, type, duration }])
  }

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed top-20 right-6 z-50 space-y-2 md:top-auto md:bottom-6">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            variant={toast.type}
            duration={toast.duration}
            onClose={() => removeToast(toast.id)}
            title={toast.title}
            description={toast.description}
          />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

// useToast Hook
export function useToast() {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}