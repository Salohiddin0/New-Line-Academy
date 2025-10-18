'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export default function ContactForm() {
  const [loading, setLoading] = useState(false)
  const [ok, setOk] = useState(false)

  const PREFIX = '+998'
  const TOTAL_DIGITS_AFTER_PREFIX = 9
  const phoneRef = useRef<HTMLInputElement>(null)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setOk(false)
    const res = await fetch('/api/contact', {
      method: 'POST',
      body: formData,
    })
    setLoading(false)
    setOk(res.ok)
  }

  // --- format phone number ---
  function formatPhone(digits: string) {
    let formatted = ''
    const clean = digits.replace(/\D/g, '').slice(0, TOTAL_DIGITS_AFTER_PREFIX)
    if (clean.length > 0) formatted = '(' + clean.slice(0, 2)
    if (clean.length >= 3) formatted += ') ' + clean.slice(2, 5)
    if (clean.length >= 6) formatted += '-' + clean.slice(5, 7)
    if (clean.length >= 8) formatted += '-' + clean.slice(7, 9)
    return formatted
  }

  const handlePhoneFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!e.target.value) e.target.value = PREFIX + ' '
    setTimeout(() => {
      e.target.setSelectionRange(e.target.value.length, e.target.value.length)
    }, 0)
  }

  const handlePhoneKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const input = e.currentTarget
    const start = input.selectionStart ?? 0
    const end = input.selectionEnd ?? 0

    if (e.ctrlKey && e.key.toLowerCase() === 'a') return

    if ((e.key === 'Backspace' || e.key === 'Delete') && start === 0 && end === input.value.length) {
      input.value = ''
      e.preventDefault()
      return
    }

    if ((e.key === 'Backspace' || e.key === 'Delete') && start <= PREFIX.length) {
      e.preventDefault()
      input.setSelectionRange(PREFIX.length + 1, PREFIX.length + 1)
      return
    }

    if (!e.ctrlKey && !e.metaKey && e.key.length === 1) {
      if (!/^[0-9]$/.test(e.key)) {
        e.preventDefault()
        return
      }
    }
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value
    if (!val.startsWith(PREFIX)) {
      val = val.replace(/\D/g, '')
      if (val.startsWith('998')) val = val.slice(3)
      val = PREFIX + ' ' + formatPhone(val)
    } else {
      const digits = val.replace(PREFIX, '').replace(/\D/g, '')
      val = PREFIX + ' ' + formatPhone(digits)
    }
    e.target.value = val

    if (phoneRef.current && phoneRef.current.selectionStart! < PREFIX.length + 1) {
      phoneRef.current.setSelectionRange(PREFIX.length + 1, PREFIX.length + 1)
    }
  }

  const handlePhonePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const text = e.clipboardData.getData('text')
    const digits = text.replace(/\D/g, '')
    let suffix = digits
    if (digits.startsWith('998')) suffix = digits.slice(3)
    const val = PREFIX + ' ' + formatPhone(suffix)
    e.currentTarget.value = val
    setTimeout(() => {
      const pos = val.length
      phoneRef.current?.setSelectionRange(pos, pos)
    }, 0)
  }

  return (
    <form
      className="mt-8 space-y-4"
      action={async (fd) => {
        await handleSubmit(fd)
      }}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" name="name" required placeholder="Your name" />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            ref={phoneRef}
            id="phone"
            name="phone"
            placeholder="+998 (__) ___-__-__"
            inputMode="numeric"
            autoComplete="tel"
            onFocus={handlePhoneFocus}
            onKeyDown={handlePhoneKeyDown}
            onChange={handlePhoneChange}
            onPaste={handlePhonePaste}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required placeholder="you@example.com" />
      </div>

      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" name="message" required placeholder="How can we help?" />
      </div>

      <Button disabled={loading} className="bg-emerald-600 hover:bg-emerald-700">
        {loading ? 'Submitting...' : 'Submit'}
      </Button>

      {ok && (
        <p className="text-sm text-emerald-700">
          Thank you! We received your submission. We will contact you shortly. (Demo)
        </p>
      )}
    </form>
  )
}
