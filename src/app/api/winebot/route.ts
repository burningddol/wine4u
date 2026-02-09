import { NextRequest, NextResponse } from "next/server";
import Cerebras from "@cerebras/cerebras_cloud_sdk";

export const runtime = "nodejs";

const cerebras = new Cerebras({
  apiKey: process.env.CEREBRAS_API_KEY,
});

export async function POST(request: NextRequest) {
  const { wineList, message } = await request.json();

  if (!message) {
    return NextResponse.json({ error: "Message is required" }, { status: 400 });
  }

  const systemSetting = `너는 와인 전문가야. ${JSON.stringify(wineList)} 이 와인리스트 중에 사용자가 한 질문에 어울리는 와인 하나를 추천해줘. 답변은"id: 이유: "이런형식으로만 답변줘. 만약 질문이 와인추천과 관련없는 질문이라면, "와인 관련 질문만 받는다." 라고 답변해.`;
  try {
    const res = await cerebras.chat.completions.create({
      messages: [
        {
          role: "system",
          content: systemSetting,
        },
        { role: "user", content: message },
      ],
      model: "llama-3.3-70b",
      max_completion_tokens: 1000,
      temperature: 0.1,
      top_p: 0.95,
      stream: false,
    });

    const content = (res as any).choices?.[0]?.message?.content;

    return NextResponse.json({
      answer: content,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 },
    );
  }
}
