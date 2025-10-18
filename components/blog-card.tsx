import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { type BlogPost } from "@/lib/types"

export default function BlogCard({ post }: { post: BlogPost } = {
  post: {
    slug: "sample",
    title: "Sample Post",
    excerpt: "Excerpt",
    content: "Content",
    date: new Date().toISOString(),
    tags: [],
    author: "Author",
    imageUrl: "/blog-concept.png",
  },
}) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="line-clamp-2">{post.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.imageUrl || "/placeholder.svg?height=400&width=600&query=blog-post"}
          alt={`Image for ${post.title}`}
          className="mb-3 h-40 w-full rounded-lg object-cover"
        />
        <p className="text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between text-sm">
        <span>{new Date(post.date).toLocaleDateString()}</span>
        <Link
          href={`/blog/${post.slug}`}
          className="text-emerald-700 hover:underline"
          aria-label={`Read post: ${post.title}`}
        >
          Read more
        </Link>
      </CardFooter>
    </Card>
  )
}
