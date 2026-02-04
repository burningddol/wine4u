import LandingInfo from './_components/LandingInfo';
import { RenderModel } from './_components/RenderModel';

export default function Home() {
  return (
    <div>
      <div className="relative h-[100vh] w-full pt-[70px]">
        <LandingInfo />
        <RenderModel />
      </div>

      <div className="h-300 bg-white">dsds</div>
    </div>
  );
}
