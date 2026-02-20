import Image from "next/image";

interface WineSummaryProps {
  image?: string;
  name?: string;
  region?: string;
}

export default function WineSummary({ image, name, region }: WineSummaryProps) {
  return (
    <>
      <div className="flex gap-4">
        <div className="relative h-20 w-[62px] flex-shrink-0 overflow-hidden">
          {image ? (
            <Image
              className="object-contain"
              src={image}
              alt={name ?? ""}
              fill
              unoptimized={image.startsWith("http")}
            />
          ) : (
            <span className="flex h-full w-full items-center justify-center text-3xl">
              🍷
            </span>
          )}
        </div>
        <div className="flex flex-col justify-center">
          <h3 className="text-2lg font-bold text-black">{name ?? "—"}</h3>
          <p className="text-md font-normal text-gray-300">{region ?? "—"}</p>
        </div>
      </div>
    </>
  );
}
