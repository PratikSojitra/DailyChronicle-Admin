import * as React from "react"
import { RiLoader4Line } from "@remixicon/react"
import { cn } from "@/lib/utils"

interface LoaderProps extends React.ComponentProps<"div"> {
    size?: number | string
    label?: string
}

export function Loader({ className, size = 24, label, ...props }: LoaderProps) {
    return (
        <div
            aria-live="polite"
            role="status"
            className={cn("flex flex-col items-center justify-center gap-2", className)}
            {...props}
        >
            <RiLoader4Line
                size={size}
                className="animate-spin"
            />
            {label && <p className="text-sm font-medium text-muted-foreground">{label}</p>}
            <span className="sr-only">{label || "Loading..."}</span>
        </div>
    )
}

export function FullPageLoader({ label }: { label?: string }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <Loader size={40} label={label} className="text-primary" />
        </div>
    )
}
