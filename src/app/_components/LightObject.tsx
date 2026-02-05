'use client';

interface LightObjectProps {
  progress: number;
}

const LightObject = ({ progress }: LightObjectProps) => {
  const intensity = 2 + 3.3 * Math.sin(progress * Math.PI);

  return (
    <>
      <ambientLight intensity={intensity} />
      <directionalLight position={[6, 10, 7]} intensity={intensity} />
      <directionalLight position={[-6, 12, -5]} intensity={intensity} />
    </>
  );
};

export default LightObject;
