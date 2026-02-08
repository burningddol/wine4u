import { cn } from "@/libs/utils";

interface Props {
  role: "user" | "bot";
  content: string;
}

export default function ChatBubble({ role, content }: Props) {
  return (
    <div
      className={cn(
        "text-md max-w-[80%] rounded-sm px-4 py-2.5",
        role === "user"
          ? "bg-primary self-end text-white"
          : "self-start bg-gray-100 text-gray-800",
      )}
    >
      {content}
    </div>
  );
}
