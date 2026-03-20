import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

export async function POST(req: Request) {
  try {
    const { input } = await req.json()

    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
    const today = new Date().toISOString().split('T')[0]

    const message = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 256,
      messages: [{
        role: 'user',
        content: `Parse this task. Today is ${today}.
Return ONLY this JSON, nothing else:
{"title":"task title without date/time","due_date":"YYYY-MM-DD or null","due_time":"HH:MM in 24h format or null","priority":"low|medium|high"}

Examples:
"call dentist tomorrow at 3pm" → {"title":"Call dentist","due_date":"${new Date(Date.now()+86400000).toISOString().split('T')[0]}","due_time":"15:00","priority":"medium"}
"submit report by Friday high priority" → {"title":"Submit report","due_date":"next Friday date","due_time":null,"priority":"high"}
"do gym" → {"title":"Do gym","due_date":null,"due_time":null,"priority":"low"}

Input: "${input}"`,
      }],
    })

    const text = message.content[0].type === 'text' ? message.content[0].text : ''
    const cleaned = text.replace(/```json|```/g, '').trim()
    const parsed = JSON.parse(cleaned)
    return NextResponse.json(parsed)
  } catch (error: any) {
    console.error('AI error:', error?.message)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}