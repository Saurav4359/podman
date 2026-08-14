import React from 'react';
import { Icon } from '@iconify/react';
import data from './data';

function ColoringBookSection() {
  return (
    <section className="mx-auto mb-10 max-w-6xl px-4 md:mb-12 md:px-6 lg:max-w-7xl">
      <div className="flex flex-col items-stretch gap-6 rounded-md border border-gray-200 border-l-[3px] border-l-purple-700 bg-gray-50 px-5 py-6 sm:flex-row sm:items-center sm:gap-8 sm:px-7 sm:py-7 dark:border-gray-700 dark:border-l-purple-700 dark:bg-white/[0.03]">
        <div className="flex shrink-0 items-center justify-center gap-5 sm:justify-start md:gap-6">
          <img
            src={data.featureImage.src}
            alt={data.featureImage.alt}
            className="h-auto w-36 object-contain sm:w-40 md:w-44"
            width={224}
            height={288}
            loading="lazy"
            decoding="async"
          />
          <img
            src={data.collageImages.src}
            alt={data.collageImages.alt}
            className="hidden h-auto w-44 object-contain sm:block md:w-52 lg:w-56"
            width={496}
            height={364}
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="min-w-0 flex-1 space-y-3 sm:space-y-4">
          <h2 className="text-xl font-bold leading-snug text-gray-900 dark:text-gray-50 md:text-2xl">
            {data.title}
          </h2>
          <p className="text-base leading-relaxed text-gray-700 dark:text-gray-100 md:text-lg md:leading-relaxed">
            {data.description}
          </p>
          <a
            href={data.button.path}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-fit max-w-fit items-center gap-2 rounded-md border border-purple-700 bg-white px-5 py-2 text-base font-semibold !text-purple-700 no-underline transition duration-150 hover:border-purple-900 hover:bg-purple-900 hover:!text-white hover:no-underline hover:shadow-md dark:border-gray-300 dark:bg-transparent dark:!text-white dark:hover:border-purple-500 dark:hover:bg-purple-700 dark:hover:!text-white dark:hover:shadow-none"
          >
            {data.button.text}
            <Icon icon="tabler:download" className="text-lg text-current" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default ColoringBookSection;
