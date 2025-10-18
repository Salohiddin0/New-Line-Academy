import { type BlogPost, type Course, type EventItem, type TestCategory, type TestQuestion } from "./types"

// In-memory "DB" for demo. Replace with real DB later.
let courses: Course[] = [
  {
    id: "c1",
    title: "IELTS Academic Intensive",
    category: "IELTS",
    teacher: "John Smith",
    price: 299,
    durationWeeks: 8,
    startDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14).toISOString(),
    description:
      "A rigorous 8-week program focused on all IELTS Academic modules with weekly mocks.",
    imageUrl:
      "/ielts-classroom-students.png",
    tags: ["IELTS", "Academic", "Mock Tests"],
  },
  {
    id: "c2",
    title: "General English B1-B2",
    category: "General English",
    teacher: "Sarah Lee",
    price: 199,
    durationWeeks: 12,
    startDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 28).toISOString(),
    description:
      "Improve your grammar, vocabulary, and speaking confidence at the intermediate level.",
    imageUrl:
      "/english-class-speaking.png",
    tags: ["Grammar", "Speaking", "Vocabulary"],
  },
  {
    id: "c3",
    title: "Vocabulary Booster",
    category: "Vocabulary",
    teacher: "Michael Chen",
    price: 129,
    durationWeeks: 6,
    startDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 21).toISOString(),
    description:
      "Targeted vocabulary expansion with spaced repetition and weekly quizzes.",
    imageUrl:
      "/placeholder-23gr5.png",
    tags: ["Vocabulary", "Quizzes"],
  },
]

let posts: BlogPost[] = [
  {
    slug: "ielts-speaking-tips",
    title: "Top 10 IELTS Speaking Tips",
    excerpt:
      "Practical advice to boost your fluency, coherence, and pronunciation in IELTS Speaking.",
    content:
      "These are the top tips to improve your IELTS speaking performance: practice with a partner, record yourself, expand topic vocabulary, structure answers, and more...",
    date: new Date().toISOString(),
    tags: ["IELTS", "Speaking", "Tips"],
    author: "New Line Education",
    imageUrl:
      "/student-speaking-exam.png",
  },
  {
    slug: "grammar-common-mistakes",
    title: "Common Grammar Mistakes to Avoid",
    excerpt:
      "From subject-verb agreement to article usage, avoid these pitfalls to sound natural.",
    content:
      "We cover common grammar mistakes that intermediate learners often make, with examples and corrections...",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    tags: ["Grammar", "Writing"],
    author: "New Line Education",
    imageUrl:
      "/placeholder-np5cg.png",
  },
]

let events: EventItem[] = [
  {
    id: "e1",
    title: "IELTS Masterclass Webinar",
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10).toISOString(),
    location: "Online",
    description:
      "Live 90-minute webinar with a certified IELTS instructor. Q&A at the end.",
    imageUrl:
      "/online-ielts-webinar.png",
  },
  {
    id: "e2",
    title: "Open Day: Meet the Teachers",
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
    location: "New Line Education Center",
    description:
      "Visit our center, sit in sample lessons, and get placement advice.",
    imageUrl: "/school-open-day.png",
  },
]

let testQuestions: TestQuestion[] = [
  {
    id: "t1",
    category: "IELTS",
    question: "In IELTS Writing Task 2, which is generally recommended?",
    choices: [
      "Use bullet points for clarity",
      "Write fewer than 150 words",
      "Plan your essay for a few minutes",
      "Avoid using examples",
    ],
    answerIndex: 2,
    explanation: "Planning helps structure arguments and improve coherence.",
  },
  {
    id: "t2",
    category: "Grammar",
    question: "Choose the correct sentence.",
    choices: [
      "She don’t like coffee.",
      "She doesn’t likes coffee.",
      "She doesn’t like coffee.",
      "She not like coffee.",
    ],
    answerIndex: 2,
    explanation: "Third person singular uses 'doesn't' + base verb.",
  },
  {
    id: "t3",
    category: "Vocabulary",
    question: "The word 'meticulous' most nearly means:",
    choices: ["Careless", "Thorough", "Hurried", "Casual"],
    answerIndex: 1,
    explanation: "'Meticulous' means very careful and precise.",
  },
  // Add more sample questions
]

// CONTACT submissions for demo
type ContactSubmission = {
  id: string
  name: string
  email: string
  phone?: string
  message: string
  createdAt: string
}
let contacts: ContactSubmission[] = []

// Utilities
const genId = (prefix: string) => `${prefix}_${Math.random().toString(36).slice(2, 9)}`

// CRUD-like functions
export const db = {
  // Courses
  listCourses: async (): Promise<Course[]> => courses,
  getCourse: async (id: string): Promise<Course | undefined> =>
    courses.find((c) => c.id === id),
  createCourse: async (data: Omit<Course, "id">): Promise<Course> => {
    const item: Course = { ...data, id: genId("c") }
    courses = [item, ...courses]
    return item
  },
  updateCourse: async (id: string, data: Partial<Omit<Course, "id">>) => {
    courses = courses.map((c) => (c.id === id ? { ...c, ...data } : c))
    return courses.find((c) => c.id === id)
  },
  deleteCourse: async (id: string) => {
    courses = courses.filter((c) => c.id !== id)
    return true
  },

  // Blog
  listPosts: async (): Promise<BlogPost[]> =>
    posts.sort((a, b) => +new Date(b.date) - +new Date(a.date)),
  getPost: async (slug: string) => posts.find((p) => p.slug === slug),
  createPost: async (data: BlogPost) => {
    posts = [data, ...posts.filter((p) => p.slug !== data.slug)]
    return data
  },
  deletePost: async (slug: string) => {
    posts = posts.filter((p) => p.slug !== slug)
    return true
  },

  // Events
  listEvents: async (): Promise<EventItem[]> =>
    events.sort((a, b) => +new Date(a.date) - +new Date(b.date)),
  getEvent: async (id: string) => events.find((e) => e.id === id),
  createEvent: async (data: Omit<EventItem, "id">) => {
    const item: EventItem = { ...data, id: genId("e") }
    events = [item, ...events]
    return item
  },
  deleteEvent: async (id: string) => {
    events = events.filter((e) => e.id !== id)
    return true
  },

  // Tests
  listTestQuestions: async (category?: TestCategory) =>
    category ? testQuestions.filter((q) => q.category === category) : testQuestions,
  addTestQuestion: async (data: TestQuestion) => {
    testQuestions = [data, ...testQuestions]
    return data
  },

  // Contact
  addContact: async (data: Omit<ContactSubmission, "id" | "createdAt">) => {
    const item: ContactSubmission = {
      ...data,
      id: genId("m"),
      createdAt: new Date().toISOString(),
    }
    contacts = [item, ...contacts]
    return item
  },
  listContacts: async () => contacts,
}
