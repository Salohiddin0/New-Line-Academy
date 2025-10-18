import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import TestClient from "./test-client"
import { db } from "@/lib/mock-db"

export const metadata = {
  title: "Online Tests — New Line Education",
  description:
    "Practice IELTS, Grammar, and Vocabulary. Get instant results and explanations.",
}

export default async function TestsPage() {
  const qs = await db.listTestQuestions()
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="text-3xl font-bold">Online Tests</h1>
        <p className="text-muted-foreground">Select a category and answer the questions. Results will be shown instantly.</p>
        <div className="mt-8">
          <TestClient initialQuestions={qs} />
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
