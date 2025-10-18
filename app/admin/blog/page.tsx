import { db } from "@/lib/mock-db"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export const metadata = { title: "Manage Blog — Admin" }

async function createPost(form: FormData) {
  "use server"
  const slug = String(form.get("slug") || "")
  const title = String(form.get("title") || "")
  const excerpt = String(form.get("excerpt") || "")
  const content = String(form.get("content") || "")
  const imageUrl = String(form.get("imageUrl") || "")
  const tags = String(form.get("tags") || "").split(",").map((t) => t.trim()).filter(Boolean)
  if (!slug || !title || !excerpt) return
  await db.createPost({
    slug,
    title,
    excerpt,
    content,
    date: new Date().toISOString(),
    tags,
    author: "Admin",
    imageUrl: imageUrl || undefined,
  })
}

async function deletePost(form: FormData) {
  "use server"
  const slug = String(form.get("slug") || "")
  if (!slug) return
  await db.deletePost(slug)
}

export default async function AdminBlogPage() {
  const posts = await db.listPosts()
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_420px]">
      <section>
        <h2 className="text-xl font-semibold">Blog Posts</h2>
        <div className="mt-4 grid gap-4">
          {posts.map((p) => (
            <Card key={p.slug}>
              <CardHeader className="flex-row items-center justify-between">
                <CardTitle className="text-base">{p.title}</CardTitle>
                <form action={deletePost}>
                  <input type="hidden" name="slug" value={p.slug} />
                  <Button variant="destructive">Delete</Button>
                </form>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>Slug: {p.slug}</p>
                <p>Date: {new Date(p.date).toLocaleDateString()}</p>
                <p>Tags: {p.tags.join(", ")}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <aside>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Create Post</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={createPost} className="space-y-3">
              <div>
                <Label htmlFor="slug">Slug</Label>
                <Input id="slug" name="slug" required placeholder="ielts-speaking-tips-2025" />
              </div>
              <div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" required />
              </div>
              <div>
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea id="excerpt" name="excerpt" required />
              </div>
              <div>
                <Label htmlFor="content">Content</Label>
                <Textarea id="content" name="content" className="min-h-28" />
              </div>
              <div>
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input id="imageUrl" name="imageUrl" placeholder="/blog-concept.png" />
              </div>
              <div>
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input id="tags" name="tags" placeholder="IELTS, Speaking, Tips" />
              </div>
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Publish</Button>
            </form>
          </CardContent>
        </Card>
      </aside>
    </div>
  )
}
