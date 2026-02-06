import WineTasteBar from "./TasteBar";
export default function TasteBarGroup() {
  return (
    <div>
      <WineTasteBar label="바디감" value={4} />
      <WineTasteBar label="탄닌" value={2.5} />
      <WineTasteBar label="당도" value={5.3} />
      <WineTasteBar label="산미" value={0} />
    </div>
  );
}
