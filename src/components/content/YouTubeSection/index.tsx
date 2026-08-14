import React from 'react';
import Link from '@docusaurus/Link';
import { Icon } from '@iconify/react';
import { youtubeSection, type YouTubeChannel } from '@site/static/data/youtube';

function YouTubeCard({
  id,
  title,
  description,
  duration,
}: {
  id: string;
  title: string;
  description: string;
  duration: string;
}) {
  const href = `https://www.youtube.com/watch?v=${id}`;
  const thumbnail = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

  return (
    <article className="youtube-card">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="youtube-card__link"
        aria-label={`Watch on YouTube: ${title}`}
      >
        <div className="youtube-card__media">
          <img src={thumbnail} alt="" loading="lazy" className="youtube-card__thumb" />
          <span className="youtube-card__play" aria-hidden="true">
            <Icon icon="tabler:player-play-filled" />
          </span>
          <span className="youtube-card__duration">{duration}</span>
        </div>
        <div className="youtube-card__body">
          <h3 className="youtube-card__title">{title}</h3>
          <p className="youtube-card__description">{description}</p>
          <span className="youtube-card__cta">
            Watch on YouTube
            <Icon icon="tabler:external-link" aria-hidden="true" />
          </span>
        </div>
      </a>
    </article>
  );
}

function ChannelLink({ label, href, to }: YouTubeChannel) {
  const isExternal = Boolean(href);

  const content = (
    <>
      <Icon
        icon={isExternal ? 'logos:youtube-icon' : 'tabler:calendar-event'}
        className={isExternal ? 'youtube-section__yt-icon' : 'youtube-section__channel-icon'}
        aria-hidden="true"
      />
      {label}
      <Icon
        icon={to ? 'tabler:arrow-right' : 'tabler:arrow-up-right'}
        className="youtube-section__channel-arrow"
        aria-hidden="true"
      />
    </>
  );

  if (to) {
    return (
      <Link to={to} className="youtube-section__channel-link">
        {content}
      </Link>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="youtube-section__channel-link">
      {content}
    </a>
  );
}

function YouTubeSection() {
  const { eyebrow, title, subtitle, channels, videos } = youtubeSection;

  return (
    <section className="youtube-section border-t border-gray-200 bg-gray-50 py-12 dark:border-gray-700 dark:bg-white/[0.02] md:py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-6 lg:max-w-7xl">
        <div className="mb-8 space-y-3 text-center md:mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-purple-700 dark:text-purple-100 md:text-base">
            {eyebrow}
          </p>
          <h2 className="text-2xl font-bold !text-gray-900 dark:!text-gray-50 md:text-3xl">{title}</h2>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-gray-500 dark:text-gray-100 md:text-lg">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {videos.map(video => (
            <YouTubeCard key={video.id} {...video} />
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {channels.map(channel => (
            <ChannelLink key={channel.label} {...channel} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default YouTubeSection;
