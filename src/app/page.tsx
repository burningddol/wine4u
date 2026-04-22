import LandingSection from './_components/LandingSection';
import FeatureSection from './_components/FeatureSection';

export default function Home() {
  return (
    <div>
      <link
        rel="preload"
        href="/main/opti_wine_objects.glb"
        as="fetch"
        type="model/gltf-binary"
        crossOrigin="anonymous"
      />
      <LandingSection>
        <FeatureSection />
      </LandingSection>
    </div>
  );
}
