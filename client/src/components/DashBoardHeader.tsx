
import { UserNav } from "./user-nav"

interface DashboardHeaderProps {
  heading: string
  text?: string
}

export function DashboardHeader({

  text
}: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between px-2">
      <div className="grid gap-1">
       Heading
        {text && <p className="text-muted-foreground">{text}</p>}
      </div>
      <UserNav />
    </div>
  )
}

