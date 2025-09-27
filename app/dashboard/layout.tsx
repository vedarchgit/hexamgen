
import type React from "react"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <div className="min-h-screen bg-background text-foreground">{children}</div>
}
