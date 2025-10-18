import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { db } from "@/lib/mock-db"

export const metadata = { title: "Admin Dashboard — New Line Education" }

export default async function AdminDashboard() {
  const [courses, posts, events, contacts] = await Promise.all([
    db.listCourses(),
    db.listPosts(),
    db.listEvents(),
    db.listContacts(),
  ])

  const stats = [
    { label: "Courses", value: courses.length },
    { label: "Blog Posts", value: posts.length },
    { label: "Events", value: events.length },
    { label: "Contact Messages", value: contacts.length },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((s) => (
        <Card key={s.label}>
          <CardHeader>
            <CardTitle className="text-base">{s.label}</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">{s.value}</CardContent>
        </Card>
      ))}
    </div>
  )
}
