'use client'

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { type Course } from '@/lib/types'
import { CalendarDays, Users } from 'lucide-react'

type Props = {
  course: Course
  onRegister?: (course: Course) => void
}

export default function CourseCard (
  { course, onRegister }: Props = {
    course: {
      id: 'demo',
      title: 'Sample Course',
      category: 'Category',
      teacher: 'Teacher',
      price: 100,
      durationWeeks: 4,
      startDate: new Date().toISOString(),
      description: 'Description',
      imageUrl: '/online-learning-platform.png',
      tags: []
    },
    onRegister: undefined
  }
) {
  const start = new Date(course.startDate)
  return (
    <Card className='h-full flex flex-col'>
      <CardHeader>
        <CardTitle className='line-clamp-2'>{course.title}</CardTitle>
      </CardHeader>
      <CardContent className='flex-1'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={course.imageUrl || '/placeholder.svg'}
          alt={`Cover image for ${course.title}`}
          className='mb-3 h-40 w-full rounded-lg object-cover'
        />
        <p className='text-sm text-muted-foreground line-clamp-3'>
          {course.description}
        </p>
        <div className='mt-3 grid grid-cols-2 gap-2 text-sm'>
          <div className='flex items-center gap-2'>
            <Users className='h-4 w-4 text-emerald-600' />
            <span>{course.teacher}</span>
          </div>
          <div className='flex items-center gap-2'>
            <CalendarDays className='h-4 w-4 text-emerald-600' />
            <span>{start.toLocaleDateString()}</span>
          </div>
        </div>
        <div className='mt-2 text-sm'>
          <span className='rounded-md bg-emerald-50 px-2 py-1 text-emerald-800'>
            {course.category}
          </span>
        </div>
      </CardContent>
      <CardFooter className='flex items-center justify-between gap-2'>
        <span className='font-semibold'>${course.price}</span>
        <Button
          onClick={() => onRegister?.(course)}
          className='bg-emerald-600 hover:bg-emerald-700'
        >
          Register
        </Button>
      </CardFooter>
    </Card>
  )
}
