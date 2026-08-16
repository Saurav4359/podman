import React from 'react';
import { Icon } from '@iconify/react';
import Layout from '@theme/Layout';
/* COMPONENTS */
import HeroHeader from '@site/src/components/layout/HeroHeader';
import KubernetesReadySection from '@site/src/components/content/KubernetesReadySection';
import EcosystemSection from '@site/src/components/content/EcosystemSection';
import ColoringBookSection from '@site/src/components/content/ColoringBookSection';
import TestimonialSection from '@site/src/components/content/TestimonialSection';
import ScrollNewsSection from '@site/src/components/content/ScrollNewsSection';
import YouTubeSection from '@site/src/components/content/YouTubeSection';
/* PAGE DATA */
import { header, featureSection, featureList, kubernetesBanner, ecosystemSection } from '@site/static/data/home';

/* PAGE COMPONENTS */
const FeatureItem = ({
  title,
  description,
  link,
}: {
  title: string;
  description: string;
  link?: { text: string; href: string };
}) => (
  <div className="space-y-2.5 p-6 md:p-7">
    <h3 className="font-display text-xl font-bold text-purple-700 dark:text-purple-400 md:text-2xl">{title}</h3>
    <p className="text-base leading-relaxed text-gray-600 dark:text-gray-200 md:text-lg md:leading-relaxed">
      {description}
    </p>
    {link && (
      <a
        href={link.href}
        className="heading-link-underline inline-flex items-center gap-1 text-base font-medium !text-purple-700 no-underline dark:!text-purple-400"
      >
        {link.text}
        <Icon icon="tabler:arrow-up-right" className="text-base text-current" />
      </a>
    )}
  </div>
);

const FeatureSection = () => {
  return (
    <section className="home-feature-section relative z-10 mx-auto mb-10 max-w-6xl px-4 md:mb-12 md:px-6 lg:max-w-7xl">
      <div className="home-feature-section__eyebrow">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-purple-700 dark:text-purple-400 md:text-base">
          {featureSection.eyebrow}
        </p>
      </div>
      <div className="mb-8 space-y-4 text-center md:mb-10 md:mt-2 lg:mt-3">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50 md:text-4xl lg:text-[2.75rem] lg:leading-tight">
          {featureSection.title}
        </h2>
        <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-500 dark:text-gray-100 md:text-xl">
          {featureSection.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
        {featureList.map(feature => (
          <div
            key={feature.title}
            className="rounded-md border border-gray-200 border-b-[3px] border-b-purple-700 bg-gray-50 dark:border-gray-700 dark:border-b-purple-700 dark:bg-white/[0.03]"
          >
            <FeatureItem
              title={feature.title}
              description={feature.description}
              link={feature.link}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

/* PAGE CONTENT */
function IndexPage() {
  return (
    <Layout>
      <HeroHeader {...header} />
      <FeatureSection />
      <KubernetesReadySection {...kubernetesBanner} />
      <EcosystemSection {...ecosystemSection} />
      <TestimonialSection />
      <YouTubeSection />
      <ScrollNewsSection limit={4} title="Latest Podman News" />
      <ColoringBookSection />
    </Layout>
  );
}

export default IndexPage;
