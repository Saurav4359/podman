import React from 'react';
import { Icon } from '@iconify/react';
import Button from '@site/src/components/utilities/Button';
import WaveBorder from '@site/src/components/shapes/WaveBorder';

const HeroMetaItem = ({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href: string;
}) => (
  <div className="flex flex-col gap-1 px-5 first:pl-0 last:pr-0">
    <span className="hero-header__meta-label font-medium uppercase tracking-wider">{label}</span>
    <a href={href} className="hero-header__meta-link font-semibold no-underline">
      {value}
    </a>
  </div>
);

function HeroHeader({ title, subtitle, podmanrelease, desktoprelease, image, platforms }) {
  return (
    <header className="hero-header">
      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-8 px-4 py-8 pb-10 md:grid-cols-[1.05fr_0.95fr] md:gap-6 md:px-6 md:py-10 md:pb-14 lg:py-12 lg:pb-16">
        <div className="flex flex-col gap-6 md:pr-2">
          <div className="space-y-4">
            <p className="hero-header__eyebrow font-semibold uppercase tracking-[0.25em]">
              Open source container tools
            </p>
            <h1 className="max-w-xl text-4xl font-bold leading-tight md:text-5xl">{title}</h1>
            <p className="hero-header__subtitle max-w-xl leading-relaxed">{subtitle}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              as="link"
              text="Get Started"
              path="/get-started"
              icon="material-symbols:arrow-forward-rounded"
              colors="hero-header__btn hero-header__btn--solid my-0"
            />
            <Button
              as="link"
              text="Download"
              path="/downloads"
              outline
              icon="material-symbols:download-rounded"
              colors="hero-header__btn hero-header__btn--outline my-0"
            />
          </div>

          <div className="flex flex-wrap items-stretch divide-x divide-white/30 border-t border-white/20 pt-4">
            <HeroMetaItem
              label="Latest stable Podman"
              value={podmanrelease.text}
              href={podmanrelease.path}
            />
            <HeroMetaItem
              label="Latest stable Podman Desktop"
              value={desktoprelease.text}
              href={desktoprelease.path}
            />
            <HeroMetaItem
              label="License"
              value="Apache License 2.0"
              href="https://www.apache.org/licenses/LICENSE-2.0"
            />
          </div>
        </div>

        <div className="relative flex flex-col gap-5 md:items-end">
          <div className="flex w-full flex-col items-center gap-3">
            <p className="hero-header__platforms-label font-medium">{platforms[0]}</p>
            <ul className="flex gap-6">
              {platforms.slice(1).map((icon, index) => (
                <li key={index}>
                  <Icon icon={icon} className="text-3xl text-white/90" />
                </li>
              ))}
            </ul>
          </div>
          <div className="hidden w-full md:block">
            <img
              src={image.path}
              alt={image.alt}
              className="mx-auto w-full max-w-xl rounded-lg border border-white/15 object-cover shadow-2xl md:ml-auto md:mr-0 lg:max-w-2xl"
            />
          </div>
        </div>
      </div>
      <WaveBorder grid="-mt-1 lg:-mt-16 lg:translate-y-[27%]" dark="dark:fill-black" />
    </header>
  );
}

export default HeroHeader;
