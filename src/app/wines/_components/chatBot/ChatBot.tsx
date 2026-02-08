"use client";

import { useState, FormEvent } from "react";
import { cn } from "@/libs/utils";
import { postWineBotMessage, getWineById } from "@/libs/api/wines/getAPIData";
import { parseWineBotAnswer } from "../../_libs/parseWineBotAnswer";
import { AnimatePresence, motion } from "framer-motion";
import ChatMessages, { ChatMessage } from "./ChatMessages";
import ChatInput from "./ChatInput";
import { LoginedUser } from "@/types/auth/types";

interface ChatBotProps {
  user: LoginedUser | null | "isPending";
}

const INITIAL_MESSAGE: ChatMessage = {
  role: "bot",
  content: "안녕하세요! 와인 추천을 도와드릴게요. 어떤 와인을 찾고 계신가요?",
};

export default function ChatBot({ user }: ChatBotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setInput("");
    setIsLoading(true);

    if (!user || user === "isPending") {
      setIsLoading(false);
      return setMessages((prev) => [
        ...prev,
        { role: "bot", content: "해당 기능은 로그인이 필요합니다." },
      ]);
    }

    try {
      const answer = await postWineBotMessage(trimmed);
      const parsed = parseWineBotAnswer(answer);

      if (parsed) {
        const wine = await getWineById(parsed.id);
        setMessages((prev) => [
          ...prev,
          {
            role: "bot",
            content: "",
            wine: {
              id: wine.id,
              name: wine.name,
              image: wine.image,
              reason: parsed.reason,
            },
          },
        ]);
        setMessages((prev) => [
          ...prev,
          {
            role: "bot",
            content: parsed.reason,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "bot", content: answer ?? "응답을 받지 못했습니다." },
        ]);
      }
    } catch (e) {
      console.log(e);
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "오류가 발생했습니다. 다시 시도해 주세요." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "fixed right-10 bottom-10 z-[100] flex h-12 w-12 cursor-pointer items-center justify-center",
          "bg-primary shadow-soft rounded-full text-white",
          "transition-transform hover:scale-105",
        )}
        aria-label={isOpen ? "채팅 닫기" : "AI 와인 추천"}
      >
        {isOpen ? "✕" : "AI"}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 50, y: 100, scale: 0.7 }}
            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, y: 100, scale: 0.7 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "fixed right-10 bottom-24 z-[100]",
              "flex h-[500px] flex-col",
              "w-[calc(100vw-2rem)] md:w-[350px]",
              "border-border shadow-soft overflow-hidden rounded-sm border bg-white",
            )}
          >
            <div className="border-border flex items-center border-b px-5 py-3">
              <h3 className="text-lg font-bold">Wine 4 U bot</h3>
            </div>

            <ChatMessages messages={messages} isLoading={isLoading} />
            <ChatInput
              input={input}
              isLoading={isLoading}
              onChange={setInput}
              onSubmit={handleSubmit}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
