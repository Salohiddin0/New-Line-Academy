import { db } from "@/lib/mock-db"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export const metadata = { title: "Manage Events — Admin" }

async function createEvent(formData: FormData) {
  "use server"
  const title = String(formData.get("title") || "")
  const date = String(formData.get("date") || "")
  const location = String(formData.get("location") || "")
  const description = String(formData.get("description") || "")
  const imageUrl = String(formData.get("imageUrl") || "")
  if (!title || !date) return
  await db.createEvent({
    title, date, location, description, imageUrl: imageUrl || undefined,
  })
}

async function deleteEvent(formData: FormData) {
  "use server"
  const id = String(formData.get("id") || "")
  if (!id) return
  await db.deleteEvent(id)
}

export default async function AdminEventsPage() {
  const events = await db.listEvents()
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_420px]">
      <section>
        <h2 className="text-xl font-semibold">Events</h2>
        <div className="mt-4 grid gap-4">
          {events.map((e) => (
            <Card key={e.id}>
              <CardHeader className="flex-row items-center justify-between">
                <CardTitle className="text-base">{e.title}</CardTitle>
                <form action={deleteEvent}>
                  <input type="hidden" name="id" value={e.id} />
                  <Button variant="destructive">Delete</Button>
                </form>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>Date: {new Date(e.date).toLocaleString()}</p>
                <p>Location: {e.location}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <aside>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Add Event</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={createEvent} className="space-y-3">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" required />
              </div>
              <div>
                <Label htmlFor="date">Date & Time</Label>
                <Input id="date" name="date" type="datetime-local" required />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input id="location" name="location" placeholder="Online or Center address" />
              </div>
              <div>
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input id="imageUrl" name="imageUrl" placeholder="/community-event.png" />
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
