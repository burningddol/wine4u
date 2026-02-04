'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/libs/utils';

interface FeatureArticleProps {
  title: string;
  titleWidth?: string;
  descriptions: string[];
  imageSrc: string;
  imageAlt: string;
  reverse?: boolean;
}

export default function FeatureArticle({
  title,
  titleWidth = 'w-40',
  descriptions,
  imageSrc,
  imageAlt,
  reverse = false,
}: FeatureArticleProps) {
  const textContent = (
    <motion.p
      className="mx-auto mb-6 xl:mb-0"
      initial={{ opacity: 0, x: reverse ? 100 : -100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <span className={`mb-3 block ${titleWidth} text-lg font-bold break-keep`}>
        {title}
      </span>
      {descriptions.map((desc, index) => (
        <span key={index} className="block text-sm text-gray-500">
          {desc}
        </span>
      ))}
    </motion.p>
  );

  const imageContent = (
    <motion.div
      className="relative h-[233px] w-[359px] md:h-[470px] md:w-[725px]"
      initial={{ opacity: 0, x: reverse ? -100 : 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
    >
      <Image src={imageSrc} fill alt={imageAlt} />
    </motion.div>
  );

  return (
    <article
      className={cn(
        'mt-20 flex justify-between xl:items-center',
        reverse
          ? 'flex-col-reverse items-start xl:flex-row'
          : 'flex-col items-end xl:flex-row',
      )}
    >
      {reverse ? (
        <>
          {imageContent}
          {textContent}
        </>
      ) : (
        <>
          {textContent}
          {imageContent}
        </>
      )}
    </article>
  );
}
