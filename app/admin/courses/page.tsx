import { db } from "@/lib/mock-db"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export const metadata = { title: "Manage Courses — Admin" }

async function createCourseAction(formData: FormData) {
  "use server"
  const title = String(formData.get("title") || "")
  const category = String(formData.get("category") || "")
  const teacher = String(formData.get("teacher") || "")
  const price = Number(formData.get("price") || 0)
  const durationWeeks = Number(formData.get("durationWeeks") || 0)
  const startDate = String(formData.get("startDate") || new Date().toISOString())
  const description = String(formData.get("description") || "")
  const imageUrl = String(formData.get("imageUrl") || "/online-learning-platform.png")
  if (!title || !category || !teacher) return
  await db.createCourse({
    title,
    category,
    teacher,
    price,
    durationWeeks,
    startDate,
    description,
    imageUrl,
    tags: [],
  })
}

async function deleteCourseAction(formData: FormData) {
  "use server"
  const id = String(formData.get("id") || "")
  if (!id) return
  await db.deleteCourse(id)
}

export default async function AdminCoursesPage() {
  const courses = await db.listCourses()

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
      <section>
        <h2 className="text-xl font-semibold">Courses</h2>
        <div className="mt-4 grid gap-4">
          {courses.map((c) => (
            <Card key={c.id}>
              <CardHeader className="flex-row items-center justify-between">
                <CardTitle className="text-base">{c.title}</CardTitle>
                <form action={deleteCourseAction}>
                  <input type="hidden" name="id" value={c.id} />
                  <Button variant="destructive">Delete</Button>
                </form>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>Category: {c.category}</p>
                <p>Teacher: {c.teacher}</p>
                <p>Price: ${c.price} • Duration: {c.durationWeeks} weeks</p>
                <p>Start: {new Date(c.startDate).toLocaleDateString()}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <aside>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Add New Course</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={createCourseAction} className="space-y-3">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" required />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Input id="category" name="category" placeholder="IELTS / General English / ..." required />
              </div>
              <div>
                <Label htmlFor="teacher">Teacher</Label>
                <Input id="teacher" name="teacher" required />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="price">Price</Label>
                  <Input id="price" name="price" type="number" min="0" required />
                </div>
                <div>
                  <Label htmlFor="durationWeeks">Duration (weeks)</Label>
                  <Input id="durationWeeks" name="durationWeeks" type="number" min="1" required />
                </div>
              </div>
              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <Input id="startDate" name="startDate" type="date" />
              </div>
              <div>
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input id="imageUrl" name="imageUrl" placeholder="/online-learning-platform.png" />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" />
              </div>
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Create</Button>
            </form>
          </CardContent>
        </Card>
      </aside>
    </div>
  )
}
