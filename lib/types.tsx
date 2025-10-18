export type Course = {
  id: string
  title: string
  category: string
  teacher: string
  price: number
  durationWeeks: number
  startDate: string // ISO
  description: string
  imageUrl: string
  tags?: string[]
}

export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  content: string
  date: string // ISO
  tags: string[]
  author?: string
  imageUrl?: string
}

export type EventItem = {
  id: string
  title: string
  date: string // ISO
  location: string
  description: string
  imageUrl?: string
}

export type TestCategory = "IELTS" | "Grammar" | "Vocabulary"

export type TestQuestion = {
  id: string
  category: TestCategory
  question: string
  choices: string[]
  answerIndex: number
  explanation?: string
}
