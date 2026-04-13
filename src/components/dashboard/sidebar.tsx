'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Users,
  Calendar,
  ClipboardCheck,
  TrendingUp,
  Banknote,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Students', href: '/students', icon: Users },
  { label: 'Sessions', href: '/sessions', icon: Calendar },
  { label: 'Attendance', href: '/attendance', icon: ClipboardCheck },
  { label: 'Progress', href: '/progress', icon: TrendingUp },
  { label: 'Fees', href: '/fees', icon: Banknote },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-60 flex flex-col bg-sidebar border-r border-sidebar-border shrink-0">
      <div className="px-5 py-5 border-b border-sidebar-border">
        <span className="font-semibold text-sidebar-foreground tracking-tight">
          ClassManager
        </span>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                isActive
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
