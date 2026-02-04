'use client';

import { motion, Variants, Easing } from 'framer-motion';
import { SCROLL_HEIGHT_VH } from './LandingSection';

interface LandingInfoProps {
  progress: number;
}

export default function LandingInfo({ progress }: LandingInfoProps) {
  const translateY = -progress * 150;
  const showChevron = progress < 0.02;

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center pb-20"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ transform: `translateY(${translateY}px)` }}
    >
      <motion.p
        className="text-2xl text-gray-400 md:text-3xl"
        variants={itemVariants}
      >
        와인을 고르는 가장 쉬운 방법
      </motion.p>
      <motion.p
        className="mt-2 text-2xl font-medium text-white md:text-3xl"
        variants={itemVariants}
      >
        당신에게 맞는 와인을 추천합니다
      </motion.p>

      <motion.h1
        className="mt-12 flex text-7xl font-bold tracking-wider text-white md:mt-16 md:text-9xl"
        variants={titleContainerVariants}
      >
        {'WINE 4 U'.split('').map((char, i) => (
          <motion.span
            key={i}
            className="inline-block"
            variants={charVariants}
            style={{
              textShadow:
                '0 0 80px rgba(255,255,255,0.5), 0 0 70px rgba(255,255,255,0.3)',
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </motion.h1>

      <motion.div
        className="mt-16 h-px w-64 origin-center bg-gray-200 md:mt-20 md:w-96"
        variants={lineVariants}
      />
      <motion.p className="mt-6 text-sm text-gray-500" variants={itemVariants}>
        Codeit. 2026
      </motion.p>

      {showChevron && (
        <motion.button
          className="pointer-events-auto absolute bottom-8 cursor-pointer text-2xl text-gray-400 transition-colors hover:text-white md:bottom-12"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          onClick={() => {
            window.scrollTo({
              top: window.innerHeight * (SCROLL_HEIGHT_VH / 100),
              behavior: 'smooth',
            });
          }}
        >
          ⌵
        </motion.button>
      )}
    </motion.div>
  );
}

const ease: Easing = [0, 0, 0.2, 1];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3, delayChildren: 0.5 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};

const lineVariants: Variants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.8, ease } },
};

const titleContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0,
    },
  },
};

const charVariants: Variants = {
  hidden: {
    y: '50%',
    opacity: 0,

    rotateX: 40,
  },
  visible: {
    y: '0%',
    opacity: 1,

    rotateX: 0,
    transition: {
      duration: 1,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};
