import React from 'react';
import { Icon } from '@iconify/react';

type EcosystemTool = {
  title: string;
  description: string;
  image: {
    path: string;
    alt: string;
  };
  href: string;
};

type EcosystemSectionProps = {
  title: string;
  tools: EcosystemTool[];
};

function EcosystemSection({ title, tools }: EcosystemSectionProps) {
  return (
    <section className="mx-auto mb-12 max-w-6xl px-4 md:mb-14 md:px-6 lg:max-w-7xl">
      <h2 className="mb-6 text-2xl font-bold !text-gray-900 dark:!text-gray-50 md:mb-8 md:text-3xl">
        {title}
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tools.map(tool => (
          <article
            key={tool.title}
            className="ecosystem-card border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-white/[0.03]"
          >
            <div className="mb-4 flex items-center gap-3">
              <img
                src={tool.image.path}
                alt={tool.image.alt}
                className="h-12 w-12 shrink-0 object-contain"
              />
              <h3 className="text-lg font-semibold !text-gray-900 dark:!text-gray-50">
                {tool.title}
              </h3>
            </div>
            <p className="mb-4 text-base leading-relaxed !text-gray-700 dark:!text-gray-100">
              {tool.description}
            </p>
            <a
              href={tool.href}
              target="_blank"
              rel="noopener noreferrer"
              className="heading-link-underline text-sm font-medium !text-purple-700 no-underline dark:!text-purple-100"
            >
              Learn more
              <Icon icon="tabler:external-link" className="shrink-0 text-sm text-current" aria-hidden="true" />
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

export default EcosystemSection;
