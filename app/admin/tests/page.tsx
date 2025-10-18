import { db } from "@/lib/mock-db"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export const metadata = { title: "Manage Tests — Admin" }

async function addQuestion(formData: FormData) {
  "use server"
  const category = String(formData.get("category") || "IELTS")
  const question = String(formData.get("question") || "")
  const choices = [0,1,2,3].map((i) => String(formData.get(`choice${i}`) || "")).filter(Boolean)
  const answerIndex = Number(formData.get("answerIndex") || 0)
  const explanation = String(formData.get("explanation") || "")
  if (!question || choices.length < 2) return
  await db.addTestQuestion({
    id: `t_${Math.random().toString(36).slice(2,9)}`,
    category: category as any,
    question,
    choices,
    answerIndex,
    explanation,
  })
}

export default async function AdminTestsPage() {
  const qs = await db.listTestQuestions()
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_460px]">
      <section>
        <h2 className="text-xl font-semibold">Questions ({qs.length})</h2>
        <div className="mt-4 grid gap-3">
          {qs.slice(0, 50).map((q) => (
            <Card key={q.id}>
              <CardHeader>
                <CardTitle className="text-base">{q.category}: {q.question}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <ol className="list-decimal pl-5">
                  {q.choices.map((c, i) => (
                    <li key={i} className={i === q.answerIndex ? "font-medium text-emerald-700" : ""}>{c}</li>
                  ))}
                </ol>
                {q.explanation && <p className="mt-2 text-muted-foreground">Explanation: {q.explanation}</p>}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <aside>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Add Question</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={addQuestion} className="space-y-3">
              <div>
                <Label>Category</Label>
                <Select name="category" defaultValue="IELTS">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="IELTS">IELTS</SelectItem>
                    <SelectItem value="Grammar">Grammar</SelectItem>
                    <SelectItem value="Vocabulary">Vocabulary</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="question">Question</Label>
                <Textarea id="question" name="question" required />
              </div>
              {[0,1,2,3].map((i) => (
                <div key={i}>
                  <Label htmlFor={`choice${i}`}>Choice {i + 1}</Label>
                  <Input id={`choice${i}`} name={`choice${i}`} required={i < 2} />
                </div>
              ))}
              <div>
                <Label htmlFor="answerIndex">Correct Choice Index (0-3)</Label>
                <Input id="answerIndex" name="answerIndex" type="number" min="0" max="3" defaultValue={0} />
              </div>
              <div>
                <Label htmlFor="explanation">Explanation</Label>
                <Textarea id="explanation" name="explanation" />
              </div>
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Add</Button>
            </form>
          </CardContent>
        </Card>
      </aside>
    </div>
  )
}
