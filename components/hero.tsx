import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Hero({ }: Record<string, never> = {}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50 to-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 py-12 md:grid-cols-2 md:py-20">
        <div>
          <h1 className="text-3xl font-bold leading-tight tracking-tight md:text-5xl">
            Achieve Your English Goals with New Line Education
          </h1>
          <p className="mt-4 text-muted-foreground md:text-lg">
            IELTS prep, General English, and skills-focused courses with expert teachers. Join now and start improving today.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/courses">
              <Button className="bg-emerald-600 hover:bg-emerald-700">Browse Courses</Button>
            </Link>
            <Link href="/tests">
              <Button variant="outline" className="border-emerald-600 text-emerald-700 hover:bg-emerald-50">
                Take a Free Test
              </Button>
            </Link>
          </div>
        </div>
        <div className="relative">
          {/* Decorative/illustrative image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/students-learning-english.png"
            alt="Students learning English in a classroom"
            className="h-auto w-full rounded-xl border shadow-sm"
          />
        </div>
      </div>
    </section>
  )
}
