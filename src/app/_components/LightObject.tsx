'use client';

const LightObject = () => {
  return (
    <>
      <ambientLight intensity={1.8} />

      <directionalLight position={[6, 10, 7]} intensity={1.5} />
      <directionalLight position={[-6, 12, -5]} intensity={1} />
    </>
  );
};

export default LightObject;
