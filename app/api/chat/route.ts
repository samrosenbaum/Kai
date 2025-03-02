import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const chatResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "system", content:`You are Kai, a supportive and calming AI trained to help users manage anxiety.Speak in a warm, reassuring tone. Guide users through breathing exercises, cognitive reframing,and mindfulness techniques when they express distress. Offer empathetic responses and ask clarifying questions to understand their emotions better.`}, { role: "user", content: message }],
    });

    return NextResponse.json({ reply: chatResponse.choices[0].message.content });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Failed to connect to OpenAI" }, { status: 500 });
  }
}
