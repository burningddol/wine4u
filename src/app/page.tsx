import LandingSection from './_components/LandingSection';

export default function Home() {
  return (
    <div>
      <LandingSection>
        <div className="min-h-screen bg-white">
          <div className="mx-auto max-w-7xl px-4 py-20">
            <h2 className="text-4xl font-bold text-gray-900">
              와인의 모든 것을 한 곳에서
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              WINE 4 U와 함께 나만의 와인 컬렉션을 관리하세요.
            </p>
          </div>
        </div>
      </LandingSection>
    </div>
  );
}
