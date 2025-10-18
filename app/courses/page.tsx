'use client'

import SiteHeader from '@/components/site-header'
import SiteFooter from '@/components/site-footer'
import { db } from '@/lib/mock-db'
import { type Course } from '@/lib/types'
import { Suspense } from 'react'
import CoursesClient from './courses-client'

export const metadata = {
  title: 'Courses — New Line Education',
  description:
    'Explore IELTS prep, General English, and specialized courses. Filter by category, teacher, and price.'
}

export default async function CoursesPage () {
  const courses = await db.listCourses()
  const allTeachers = Array.from(new Set(courses.map(c => c.teacher)))
  const allCategories = Array.from(new Set(courses.map(c => c.category)))

  return (
    <>
      <SiteHeader />
      <main className='mx-auto max-w-7xl px-4 py-10'>
        <h1 className='text-3xl font-bold'>Courses</h1>
        <p className='text-muted-foreground'>
          Find a course that fits your goals.
        </p>
        <Suspense
          fallback={
            <div className='mt-8 text-sm text-muted-foreground'>
              Loading courses...
            </div>
          }
        >
          <CoursesClient
            initialCourses={courses as Course[]}
            allTeachers={allTeachers}
            allCategories={allCategories}
          />
        </Suspense>
      </main>
      <SiteFooter />
    </>
  )
}
