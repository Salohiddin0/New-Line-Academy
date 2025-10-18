import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import { db } from "@/lib/mock-db"
import BlogCard from "@/components/blog-card"

export const metadata = {
  title: "Blog & News — New Line Education",
  description:
    "Articles, tips, and strategies to improve your English and prepare for IELTS.",
}

export default async function BlogPage() {
  const posts = await db.listPosts()
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-10">
        <h1 className="text-3xl font-bold">Blog & News</h1>
        <p className="text-muted-foreground">Latest articles and updates from our teachers.</p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <BlogCard key={p.slug} post={p} />
          ))}
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
