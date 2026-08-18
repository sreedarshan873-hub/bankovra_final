import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { SectionHeading, Disclaimer } from '../components/Shared'
import { getAssistantReply } from '../utils/assistantKB'

interface Msg {
  id: string
  role: 'user' | 'assistant'
  text: string
  actionLabel?: string
  actionTo?: string
}

const quickTopics = [
  'EMI for ₹10 lakh at 9% for 5 years',
  'What is a good CIBIL score?',
  'Is UPI safe?',
  'What is KYC?',
  'Help me find the right bank',
  'Compare two banks',
]

let idCounter = 0
const nextId = () => `m${++idCounter}_${Date.now()}`

export default function AIAssistant() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: nextId(),
      role: 'assistant',
      text:
        "Hi, I'm the BANKOVRA Assistant. Ask me about banking, charges, loans, EMI, CIBIL, KYC, investments, insurance, UPI safety or fraud awareness — I can also point you to the right calculator or comparison tool.",
    },
  ])
  const [input, setInput] = useState('')
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  function send(text: string) {
    const q = text.trim()
    if (!q) return
    const userMsg: Msg = { id: nextId(), role: 'user', text: q }
    const reply = getAssistantReply(q)
    const assistantMsg: Msg = { id: nextId(), role: 'assistant', text: reply.text, actionLabel: reply.actionLabel, actionTo: reply.actionTo }
    setMessages((prev) => [...prev, userMsg, assistantMsg])
    setInput('')
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14">
      <SectionHeading
        eyebrow="BANKOVRA Assistant"
        title="Ask about banking, loans, CIBIL, KYC & fraud safety"
        description="A guided assistant connected to BANKOVRA's own calculators and comparison tools. It gives general, educational information — not personalised financial advice."
      />

      <div className="mt-8 rounded-card border border-line bg-white shadow-card flex flex-col h-[560px]">
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-5 space-y-4">
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  m.role === 'user' ? 'bg-primary text-paper rounded-br-sm' : 'bg-paper border border-line text-ink/85 rounded-bl-sm'
                }`}
              >
                <p className="whitespace-pre-line">{m.text}</p>
                {m.actionTo && (
                  <Link
                    to={m.actionTo}
                    className="mt-2 inline-block text-xs font-semibold text-teal hover:text-gold-dark underline underline-offset-2"
                  >
                    {m.actionLabel} →
                  </Link>
                )}
              </div>
            </div>
          ))}
          <div ref={endRef} />
        </div>

        <div className="border-t border-line px-4 sm:px-6 py-3">
          <div className="flex flex-wrap gap-1.5 mb-2.5">
            {quickTopics.map((t) => (
              <button
                key={t}
                onClick={() => send(t)}
                className="text-xs px-2.5 py-1 rounded-full bg-teal-light text-teal font-medium hover:opacity-80"
              >
                {t}
              </button>
            ))}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              send(input)
            }}
            className="flex gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question…"
              className="flex-1 rounded-md border border-line px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal/40"
            />
            <button type="submit" className="rounded-md bg-primary text-paper px-4 py-2.5 text-sm font-semibold hover:bg-navy-700">
              Send
            </button>
          </form>
        </div>
      </div>

      <div className="mt-6">
        <Disclaimer tone="warning">
          The BANKOVRA Assistant provides general educational information using rule-based logic connected to
          BANKOVRA's own calculators — it does not access your account, does not give personalised investment/loan
          advice, and should not be relied on as your sole source before a financial decision. It will never ask for
          your PIN, OTP, password or account number — if anything on the internet does, it is fraud.
        </Disclaimer>
      </div>
    </div>
  )
}
