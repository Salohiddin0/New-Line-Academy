'use client'

import SiteHeader from '@/components/site-header'
import SiteFooter from '@/components/site-footer'
import ContactForm from './contact-form'

export default function ContactPage () {
  return (
    <>
      <SiteHeader />
      <main className='mx-auto max-w-3xl px-4 py-10'>
        <h1 className='text-3xl font-bold'>Contact & Registration</h1>
        <p className='text-muted-foreground'>
          Fill out the form and we will reach out with next steps.
        </p>

        <ContactForm />
      </main>
      <SiteFooter />
    </>
  )
}
