import React from 'react';
import { Icon } from '@iconify/react';

type KubernetesReadySectionProps = {
  eyebrow: string;
  title: string;
  titleHighlight: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
  learnMore: {
    text: string;
    path: string;
  };
  docsLink: {
    text: string;
    href: string;
  };
};

function KubernetesReadySection({
  title,
  titleHighlight,
  description,
  image,
  learnMore,
  docsLink,
}: KubernetesReadySectionProps) {
  return (
    <section className="mx-auto mb-12 max-w-6xl border-t border-gray-200 px-4 pt-10 md:mb-14 md:px-6 md:pt-12 lg:max-w-7xl dark:border-gray-700">
      <div className="grid items-start gap-8 md:grid-cols-[140px_1fr] md:gap-10">
        <img
          src={image.src}
          alt={image.alt}
          className="mx-auto h-28 w-28 object-contain md:mx-0 md:h-32 md:w-32"
        />

        <div className="space-y-4 text-center md:text-left">
          <h2 className="text-2xl font-bold leading-snug !text-gray-900 dark:!text-gray-50 md:text-3xl">
            {title} {titleHighlight}
          </h2>
          <p className="max-w-2xl text-base leading-relaxed !text-gray-700 dark:!text-gray-100 md:text-lg">
            {description}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-5 md:justify-start">
            <a
              href={learnMore.path}
              className="heading-link-underline inline-flex items-center gap-1 text-base font-semibold !text-purple-700 no-underline dark:!text-purple-400"
            >
              {learnMore.text}
              <Icon icon="tabler:arrow-right" className="text-base text-current" />
            </a>
            <a
              href={docsLink.href}
              target="_blank"
              rel="noopener noreferrer"
              className="heading-link-underline inline-flex items-center gap-1 text-base font-medium !text-gray-700 no-underline dark:!text-gray-100"
            >
              {docsLink.text}
              <Icon icon="tabler:external-link" className="text-base text-current" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default KubernetesReadySection;
