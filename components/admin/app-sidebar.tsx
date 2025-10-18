"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { Home, GraduationCap, Newspaper, CalendarDays, Users, TestTubes } from 'lucide-react'

const items = [
  { title: "Dashboard", href: "/admin", icon: Home },
  { title: "Courses", href: "/admin/courses", icon: GraduationCap },
  { title: "Blog", href: "/admin/blog", icon: Newspaper },
  { title: "Events", href: "/admin/events", icon: CalendarDays },
  { title: "Tests", href: "/admin/tests", icon: TestTubes },
  { title: "Users", href: "/admin/users", icon: Users },
]

export function AdminSidebar({ }: Record<string, never> = {}) {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Admin</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild>
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
      <SidebarRail />
    </Sidebar>
  )
}
