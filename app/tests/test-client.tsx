"use client"

import { type TestQuestion, type TestCategory } from "@/lib/types"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useMemo, useState } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

function pickRandom<T>(arr: T[], n: number): T[] {
  if (arr.length <= n) return arr
  const copy = [...arr]
  const res: T[] = []
  while (res.length < n && copy.length) {
    const idx = Math.floor(Math.random() * copy.length)
    res.push(copy.splice(idx, 1)[0])
  }
  return res
}

type Props = { initialQuestions: TestQuestion[] }

export default function TestClient({ initialQuestions }: Props = { initialQuestions: [] }) {
  const categories: TestCategory[] = ["IELTS", "Grammar", "Vocabulary"]
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [submitted, setSubmitted] = useState(false)
  const [active, setActive] = useState<TestCategory>("IELTS")

  const questionsByCat = useMemo(() => {
    const map: Record<TestCategory, TestQuestion[]> = { IELTS: [], Grammar: [], Vocabulary: [] }
    for (const q of initialQuestions) {
      map[q.category].push(q)
    }
    return {
      IELTS: pickRandom(map.IELTS, 10),
      Grammar: pickRandom(map.Grammar, 10),
      Vocabulary: pickRandom(map.Vocabulary, 10),
    }
  }, [initialQuestions])

  const currentQs = questionsByCat[active]

  const score = useMemo(() => {
    if (!submitted) return 0
    return currentQs.reduce((acc, q) => acc + (answers[q.id] === q.answerIndex ? 1 : 0), 0)
  }, [answers, currentQs, submitted])

  function handleSubmit() {
    setSubmitted(true)
  }
  function reset() {
    setAnswers({})
    setSubmitted(false)
  }

  return (
    <Tabs value={active} onValueChange={(v) => setActive(v as TestCategory)}>
      <TabsList className="grid w-full grid-cols-3">
        {categories.map((c) => (
          <TabsTrigger key={c} value={c}>{c}</TabsTrigger>
        ))}
      </TabsList>
      {categories.map((c) => (
        <TabsContent key={c} value={c} className="mt-6 space-y-4">
          {questionsByCat[c].length === 0 ? (
            <p className="text-sm text-muted-foreground">No questions available.</p>
          ) : (
            questionsByCat[c].map((q, idx) => (
              <Card key={q.id}>
                <CardHeader>
                  <CardTitle className="text-base">
                    Q{idx + 1}. {q.question}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={answers[q.id]?.toString()}
                    onValueChange={(val) => {
                      const choiceIndex = parseInt(val, 10)
                      setAnswers((prev) => ({ ...prev, [q.id]: choiceIndex }))
                    }}
                  >
                    {q.choices.map((choice, i) => (
                      <div key={i} className="flex items-center space-x-2">
                        <RadioGroupItem id={`${q.id}-${i}`} value={`${i}`} />
                        <Label htmlFor={`${q.id}-${i}`}>{choice}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                  {submitted && (
                    <div className="mt-3 text-sm">
                      {answers[q.id] === q.answerIndex ? (
                        <span className="text-emerald-700">Correct</span>
                      ) : (
                        <span className="text-red-600">
                          Incorrect. Correct answer: {q.choices[q.answerIndex]}
                        </span>
                      )}
                      {q.explanation && <p className="text-muted-foreground mt-1">Explanation: {q.explanation}</p>}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
          {questionsByCat[c].length > 0 && (
            <Card>
              <CardFooter className="flex items-center justify-between w-full">
                <Button variant="outline" onClick={reset}>Reset</Button>
                <div className="flex items-center gap-3">
                  {submitted && <span className="font-medium">Score: {score}/{currentQs.length}</span>}
                  <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={handleSubmit}>
                    {submitted ? "Recalculate" : "Submit"}
                  </Button>
                </div>
              </CardFooter>
            </Card>
          )}
        </TabsContent>
      ))}
    </Tabs>
  )
}
