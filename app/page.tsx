import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import Hero from "@/components/hero"
import { db } from "@/lib/mock-db"
import CourseCard from "@/components/course-card"
import BlogCard from "@/components/blog-card"
import EventCard from "@/components/event-card"

export const metadata = {
  title: "New Line Education — IELTS, General English, and More",
  description:
    "A modern learning center for IELTS prep, General English, and skill-focused programs. Register for courses, take online tests, and stay updated with events.",
}

export default async function HomePage() {
  const [courses, posts, events] = await Promise.all([
    db.listCourses(),
    db.listPosts(),
    db.listEvents(),
  ])

  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <section className="mx-auto max-w-7xl px-4 py-12">
          <h2 className="text-2xl font-semibold">Highlighted Courses</h2>
          <p className="text-muted-foreground">Our most popular picks right now</p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.slice(0, 3).map((c) => (
              <CourseCard key={c.id} course={c} />
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Latest Blog</h2>
          </div>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.slice(0, 3).map((p) => (
              <BlogCard key={p.slug} post={p} />
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12">
          <h2 className="text-2xl font-semibold">Upcoming Events</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.slice(0, 3).map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
