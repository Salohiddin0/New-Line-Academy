import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import { db } from "@/lib/mock-db"
import { notFound } from "next/navigation"

type Props = { params: { slug: string } }

export async function generateMetadata({ params }: Props) {
  const post = await db.getPost(params.slug)
  if (!post) return { title: "Post Not Found — New Line Education" }
  return {
    title: `${post.title} — New Line Education`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: Props) {
  const post = await db.getPost(params.slug)
  if (!post) return notFound()

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-10">
        <article>
          <h1 className="text-3xl font-bold">{post.title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {new Date(post.date).toLocaleDateString()} {post.author ? `• ${post.author}` : ""}
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {post.imageUrl && (
            <img
              src={post.imageUrl || "/placeholder.svg"}
              alt={`Image for ${post.title}`}
              className="mt-6 h-auto w-full rounded-lg border object-cover"
            />
          )}
          <div className="prose prose-neutral mt-6 max-w-none">
            <p>{post.content}</p>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  )
}
