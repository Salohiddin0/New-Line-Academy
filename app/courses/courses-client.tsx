"use client"

import { useMemo, useState } from "react"
import { type Course } from "@/lib/types"
import CourseCard from "@/components/course-card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

type Props = {
  initialCourses: Course[]
  allTeachers: string[]
  allCategories: string[]
}

export default function CoursesClient({
  initialCourses,
  allTeachers,
  allCategories,
}: Props = {
  initialCourses: [],
  allTeachers: [],
  allCategories: [],
}) {
  const [q, setQ] = useState("")
  const [teacher, setTeacher] = useState<string>("")
  const [category, setCategory] = useState<string>("")
  const [maxPrice, setMaxPrice] = useState<number>(Math.max(500, ...(initialCourses.map((c) => c.price))))

  const filtered = useMemo(() => {
    let items = initialCourses
    if (q.trim()) {
      const t = q.toLowerCase()
      items = items.filter(
        (c) =>
          c.title.toLowerCase().includes(t) ||
          c.description.toLowerCase().includes(t) ||
          c.category.toLowerCase().includes(t) ||
          c.teacher.toLowerCase().includes(t)
      )
    }
    if (teacher) items = items.filter((c) => c.teacher === teacher)
    if (category) items = items.filter((c) => c.category === category)
    items = items.filter((c) => c.price <= maxPrice)
    return items
  }, [initialCourses, q, teacher, category, maxPrice])

  return (
    <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-[260px_1fr]">
      <aside className="rounded-lg border p-4">
        <div className="space-y-4">
          <div>
            <Label htmlFor="q">Search</Label>
            <Input id="q" placeholder="Search courses..." value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          <div>
            <Label>Teacher</Label>
            <Select value={teacher} onValueChange={setTeacher}>
              <SelectTrigger><SelectValue placeholder="All teachers" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="">All</SelectItem>
                {allTeachers.map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger><SelectValue placeholder="All categories" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="">All</SelectItem>
                {allCategories.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Max Price: ${maxPrice}</Label>
            <Slider
              value={[maxPrice]}
              onValueChange={(v) => setMaxPrice(v[0] ?? maxPrice)}
              min={0}
              max={Math.max(500, ...(initialCourses.map((c) => c.price)))}
              step={10}
            />
          </div>
        </div>
      </aside>
      <section>
        {filtered.length === 0 ? (
          <p className="text-sm text-muted-foreground">No courses found. Adjust filters.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((c) => (
              <CourseCard key={c.id} course={c} onRegister={() => alert(`Registered for ${c.title}! (demo)`)}/>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
