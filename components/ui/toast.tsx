"use client"

import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface ToastProps {
  id: string
  title?: string
  description?: string
  variant?: "default" | "destructive" | "success"
  onClose: () => void
}

export function Toast({ id, title, description, variant = "default", onClose }: ToastProps) {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 5000)

    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div
      className={cn(
        "pointer-events-auto flex w-full max-w-md rounded-lg border p-4 shadow-lg",
        "bg-background border-border",
        variant === "destructive" && "border-red-500 bg-red-50 text-red-900",
        variant === "success" && "border-green-500 bg-green-50 text-green-900"
      )}
    >
      <div className="flex-1">
        {title && <div className="font-semibold">{title}</div>}
        {description && <div className="text-sm opacity-90">{description}</div>}
      </div>
      <button
        onClick={onClose}
        className="ml-4 inline-flex rounded-lg p-1.5 text-gray-400 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300"
      >
        <X size={16} />
      </button>
    </div>
  )
}