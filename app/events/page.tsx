import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import { db } from "@/lib/mock-db"
import EventCard from "@/components/event-card"

export const metadata = {
  title: "Events — New Line Education",
  description:
    "Explore upcoming and past events, webinars, and open days.",
}

export default async function EventsPage() {
  const events = await db.listEvents()
  const now = Date.now()
  const upcoming = events.filter((e) => +new Date(e.date) >= now)
  const past = events.filter((e) => +new Date(e.date) < now)

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-10">
        <h1 className="text-3xl font-bold">Events</h1>
        <p className="text-muted-foreground">Join our events and webinars</p>

        <section className="mt-8">
          <h2 className="text-xl font-semibold">Upcoming</h2>
          <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {upcoming.length === 0 ? (
              <p className="text-sm text-muted-foreground">No upcoming events.</p>
            ) : (
              upcoming.map((e) => <EventCard key={e.id} event={e} />)
            )}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold">Past Events</h2>
          <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {past.length === 0 ? (
              <p className="text-sm text-muted-foreground">No past events yet.</p>
            ) : (
              past.map((e) => <EventCard key={e.id} event={e} />)
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
