export interface ParsedWineBotAnswer {
  id: number;
  reason: string;
}

export function parseWineBotAnswer(answer: string): ParsedWineBotAnswer | null {
  const idMatch = answer.match(/id:\s*(\d+)/);
  const reasonMatch = answer.match(/이유:\s*([\s\S]+)/);

  if (!idMatch) return null;

  return {
    id: Number(idMatch[1]),
    reason: reasonMatch ? reasonMatch[1].trim() : "",
  };
}
