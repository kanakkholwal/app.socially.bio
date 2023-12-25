import { VariantProps, cva } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/lib/utils"

const textareaVarinats = cva(
  "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50"
  ,{
  variants: {
    variant: {
      default: "border-input",
      outline: "border-input",
      fluid: "border border-solid border-transparent bg-slate-100 text-slate-900 focus:border-primary/70",
      border:" border-2 focus:border-primary/70 border-solid"
    },
    rounded: {
      default: "rounded-md",
      sm: "rounded-sm",
      lg: "rounded-3xl",
      full: "rounded-full",
      none: "rounded-none",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})
export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  VariantProps<typeof textareaVarinats>{}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant,...props }, ref) => {
    return (
      <textarea
      className={cn(textareaVarinats({ variant, className }))}

        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
