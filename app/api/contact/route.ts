import { db } from "@/lib/mock-db"

export async function POST(request: Request) {
  const formData = await request.formData()
  const name = String(formData.get("name") || "")
  const email = String(formData.get("email") || "")
  const phone = String(formData.get("phone") || "")
  const message = String(formData.get("message") || "")

  if (!name || !email || !message) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 })
  }

  // 1️⃣ Avval DB-ga saqlaymiz
  await db.addContact({ name, email, phone, message })

  // 2️⃣ Telegram bot token va chat ID (env orqali)
  const botToken = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!botToken || !chatId) {
    console.error("Telegram config yo‘q! .env.local faylni tekshir.")
    return new Response(JSON.stringify({ error: "Bot config missing" }), { status: 500 })
  }

  // 3️⃣ Yuboriladigan xabar matni
  const text = `
📩 *Yangi murojaat keldi!*

👤 Ism: ${name}
📞 Telefon: ${phone}
📧 Email: ${email}
💬 Xabar: ${message}
  `

  try {
    // 4️⃣ Telegram API'ga POST request yuboramiz
    const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "Markdown",
      }),
    })

    if (!res.ok) {
      const error = await res.text()
      console.error("Telegram error:", error)
      return new Response(JSON.stringify({ error: "Failed to send message to Telegram" }), { status: 500 })
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200 })
  } catch (err) {
    console.error("Xatolik:", err)
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 })
  }
}
