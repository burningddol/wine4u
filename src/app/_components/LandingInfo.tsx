'use client';

import { motion, Variants, Easing } from 'framer-motion';

export default function LandingInfo() {
  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center pb-20"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.p
        className="text-2xl text-gray-400 md:text-3xl"
        variants={textVariants}
      >
        한 곳에서 관리하는
      </motion.p>
      <motion.p
        className="mt-2 text-2xl font-medium text-white md:text-3xl"
        variants={textVariants}
      >
        나만의 와인 창고
      </motion.p>

      <motion.h1
        className="mt-12 text-7xl font-bold tracking-wider text-white md:mt-16 md:text-9xl"
        variants={logoVariants}
        style={{
          textShadow:
            '0 0 40px rgba(255, 255, 255, 0.5), 0 0 80px rgba(255, 255, 255, 0.3)',
        }}
      >
        WINE 4 U
      </motion.h1>

      <motion.div
        className="mt-16 h-px w-64 origin-center bg-gray-200 md:mt-20 md:w-96"
        variants={lineVariants}
      />

      <motion.p className="mt-6 text-sm text-gray-500" variants={textVariants}>
        Codeit. 2026
      </motion.p>

      <motion.div
        className="absolute bottom-8 md:bottom-12"
        variants={chevronVariants}
        animate={bounceAnimation}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gray-400"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </motion.div>
    </motion.div>
  );
}

const easeOut: Easing = [0.0, 0.0, 0.2, 1];
const easeInOut: Easing = [0.4, 0.0, 0.2, 1];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.5,
    },
  },
};

const textVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: easeOut,
    },
  },
};

const logoVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1,
      ease: easeOut,
    },
  },
};

const lineVariants: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      duration: 0.8,
      ease: easeOut,
    },
  },
};

const chevronVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: 2,
    },
  },
};

const bounceAnimation = {
  y: [0, 10, 0],
  transition: {
    duration: 1.5,
    repeat: Infinity,
    ease: easeInOut,
  },
};
