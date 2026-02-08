import { useRef, useEffect } from "react";
import ChatBubble from "./ChatBubble";
import WineRecommendCard from "./WineRecommendCard";

export interface WineData {
  id: number;
  name: string;
  image: string;
  reason?: string;
}

export interface ChatMessage {
  role: "user" | "bot";
  content: string;
  wine?: WineData;
}

interface Props {
  messages: ChatMessage[];
  isLoading: boolean;
}

export default function ChatMessages({ messages, isLoading }: Props) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="scrollbar-ghost flex-1 overflow-y-auto px-4 py-4">
      <div className="flex flex-col gap-3">
        {messages.map((msg, idx) =>
          msg.wine ? (
            <WineRecommendCard key={idx} wine={msg.wine} />
          ) : (
            <ChatBubble key={idx} role={msg.role} content={msg.content} />
          ),
        )}
        {isLoading && (
          <div className="text-md self-start rounded-2xl bg-gray-100 px-4 py-2.5 text-gray-600">
            추천 중...
          </div>
        )}
        <div ref={endRef} />
      </div>
    </div>
  );
}
