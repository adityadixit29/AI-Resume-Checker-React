import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "~/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transform hover:scale-105 hover:shadow-lg",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 text-white hover:from-slate-800 hover:via-slate-900 hover:to-black shadow-xl border border-slate-600/20",
        destructive:
          "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-xl shadow-red-500/25",
        outline:
          "border-2 border-slate-300 bg-white/80 text-slate-800 hover:bg-slate-50 hover:border-slate-400 backdrop-blur-sm shadow-lg",
        secondary:
          "bg-gradient-to-r from-slate-100 to-slate-200 text-slate-800 hover:from-slate-200 hover:to-slate-300 shadow-lg border border-slate-300/50",
        ghost: "text-slate-700 hover:bg-slate-100/80 backdrop-blur-sm",
        link: "text-violet-600 underline-offset-4 hover:underline hover:text-violet-800",
      },
      size: {
        default: "h-11 px-6 py-3",
        sm: "h-9 rounded-lg px-4 text-xs",
        lg: "h-12 rounded-xl px-10 text-base",
        icon: "h-11 w-11 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

