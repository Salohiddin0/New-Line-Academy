'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Menu,
  BookOpen,
  Newspaper,
  CalendarDays,
  GraduationCap,
  TestTubes,
  Phone
} from 'lucide-react'
import { useState } from 'react'


const navLinks = [
  { href: '/courses', label: 'Courses', icon: GraduationCap },
  { href: '/tests', label: 'Online Tests', icon: TestTubes },
  { href: '/blog', label: 'Blog', icon: Newspaper },
  { href: '/events', label: 'Events', icon: CalendarDays },
  { href: '/contact', label: 'Contact', icon: Phone }
]

export default function SiteHeader ({}: Record<string, never> = {}) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className='w-full border-b bg-white'>
      <div className='mx-auto flex max-w-7xl items-center justify-between px-4 py-3'>
        <Link href='/' className='flex items-center gap-2'>
          <BookOpen className='h-6 w-6 text-emerald-600' />
          <span className='font-semibold'>New Line Education</span>
        </Link>
        <nav className='hidden items-center gap-1 md:flex'>
          {navLinks.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                'flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-foreground',
                pathname.startsWith(l.href) &&
                  'text-foreground font-medium bg-muted/30'
              )}
            >
              <l.icon className='h-4 w-4' />
              {l.label}
            </Link>
          ))}
          <Link href='/admin' className='ml-2'>
            <Button
              variant='outline'
              className='border-emerald-600 text-emerald-700 hover:bg-emerald-50'
            >
              Admin
            </Button>
          </Link>
        </nav>
        <Button
          variant='ghost'
          size='icon'
          className='md:hidden'
          onClick={() => setOpen(o => !o)}
          aria-label='Toggle Navigation Menu'
        >
          <Menu className='h-6 w-6' />
        </Button>
      </div>
      {open && (
        <div className='border-t md:hidden'>
          <div className='mx-auto flex max-w-7xl flex-col px-4 py-2'>
            {navLinks.map(l => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-foreground',
                  pathname.startsWith(l.href) &&
                    'text-foreground font-medium bg-muted/30'
                )}
              >
                <l.icon className='h-4 w-4' />
                {l.label}
              </Link>
            ))}
            <Link
              href='/admin'
              onClick={() => setOpen(false)}
              className='px-3 py-2'
            >
              <Button
                variant='outline'
                className='w-full border-emerald-600 text-emerald-700 hover:bg-emerald-50'
              >
                Admin
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
