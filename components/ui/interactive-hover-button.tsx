import { ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"

export function InteractiveHoverButton({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "group relative inline-flex w-auto cursor-pointer overflow-hidden rounded-full border text-center transition-colors",
        className
      )}
      {...props}
    >
      <div className="relative z-10 flex items-center justify-center gap-2">
        <div className="relative z-0 h-2 w-2 rounded-full bg-current transition-all duration-300 group-hover:scale-[100.8]" />
        <span className="relative z-10 inline-block transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
          {children}
        </span>
      </div>
      <div className="absolute top-0 z-20 flex h-full w-full translate-x-12 items-center justify-center gap-2 opacity-0 transition-all duration-300 group-hover:-translate-x-2 group-hover:opacity-100 group-hover:text-background">
        <span>{children}</span>
        <ArrowRight className="h-4 w-4" />
      </div>
    </button>
  )
}
