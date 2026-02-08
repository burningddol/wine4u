import { FormEvent } from "react";
import { cn } from "@/libs/utils";

interface Props {
  input: string;
  isLoading: boolean;
  onChange: (value: string) => void;
  onSubmit: (e: FormEvent) => void;
}

export default function ChatInput({ input, isLoading, onChange, onSubmit }: Props) {
  return (
    <form
      onSubmit={onSubmit}
      className="border-border flex items-center gap-2 border-t px-4 py-3"
    >
      <input
        type="text"
        value={input}
        onChange={(e) => onChange(e.target.value)}
        placeholder="와인 추천을 요청해 보세요"
        disabled={isLoading}
        className={cn(
          "text-md flex-1 rounded-lg border border-gray-300 px-3 py-2 outline-none",
          "focus:ring-0 disabled:bg-gray-100",
        )}
      />
      <button
        type="submit"
        disabled={isLoading || !input.trim()}
        className={cn(
          "bg-primary text-md rounded-lg px-4 py-2 font-bold text-white",
          "cursor-pointer disabled:cursor-not-allowed disabled:opacity-50",
        )}
      >
        전송
      </button>
    </form>
  );
}
