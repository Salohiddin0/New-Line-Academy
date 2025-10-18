"use client"

import { type EventItem } from "@/lib/types"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"

function useCountdown(targetISO: string) {
  const [left, setLeft] = useState<number>(() => +new Date(targetISO) - Date.now())
  useEffect(() => {
    const id = setInterval(() => setLeft(+new Date(targetISO) - Date.now()), 1000)
    return () => clearInterval(id)
  }, [targetISO])
  if (left <= 0) return "Started"
  const d = Math.floor(left / (1000 * 60 * 60 * 24))
  const h = Math.floor((left / (1000 * 60 * 60)) % 24)
  const m = Math.floor((left / (1000 * 60)) % 60)
  const s = Math.floor((left / 1000) % 60)
  return `${d}d ${h}h ${m}m ${s}s`
}

export default function EventCard({ event }: { event: EventItem } = {
  event: {
    id: "e_demo",
    title: "Sample Event",
    date: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
    location: "Online",
    description: "Description",
    imageUrl: "/community-event.png",
  },
}) {
  const countdown = useCountdown(event.date)
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="line-clamp-2">{event.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={event.imageUrl || "/placeholder.svg?height=400&width=600&query=event-image"}
          alt={`Image for ${event.title}`}
          className="mb-3 h-40 w-full rounded-lg object-cover"
        />
        <p className="text-sm text-muted-foreground">{event.description}</p>
        <div className="mt-2 text-sm">
          <span className="rounded-md bg-emerald-50 px-2 py-1 text-emerald-800">Location: {event.location}</span>
        </div>
      </CardContent>
      <CardFooter className="text-sm">
        <span className="font-medium">Starts in: {countdown}</span>
      </CardFooter>
    </Card>
  )
}
