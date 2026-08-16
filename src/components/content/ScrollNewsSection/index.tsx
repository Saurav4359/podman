import React, { useMemo, useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import ArticleCard from '@site/src/components/ui/ArticleCard';
import BlogPostLinks from '@site/src/components/utilities/BlogPostLinks';
import { useBlogPosts } from '@site/src/hooks/useBlogPosts';

const CARDS_PER_STEP = 3;

type ScrollNewsSectionProps = {
  title?: string;
  limit?: number;
};

function ScrollNewsSection({ title = 'Latest Podman News', limit = 4 }: ScrollNewsSectionProps) {
  const { data, loading } = useBlogPosts(limit);
  const [activeStep, setActiveStep] = useState(0);
  const wheelLock = useRef(false);

  const posts = useMemo(() => data.slice(0, limit), [data, limit]);

  const chunks = useMemo(() => {
    const groups: typeof posts[] = [];
    for (let i = 0; i < posts.length; i += CARDS_PER_STEP) {
      groups.push(posts.slice(i, i + CARDS_PER_STEP));
    }
    return groups;
  }, [posts]);

  const steps = chunks.length;

  if (loading || posts.length === 0) {
    return null;
  }

  const goPrev = () => setActiveStep(step => Math.max(0, step - 1));
  const goNext = () => setActiveStep(step => Math.min(steps - 1, step + 1));

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (steps <= 1 || wheelLock.current) {
      return;
    }

    const horizontalScroll = Math.abs(event.deltaX) > Math.abs(event.deltaY);
    if (!horizontalScroll || Math.abs(event.deltaX) < 12) {
      return;
    }

    event.preventDefault();
    wheelLock.current = true;

    if (event.deltaX > 0) {
      goNext();
    } else {
      goPrev();
    }

    window.setTimeout(() => {
      wheelLock.current = false;
    }, 500);
  };

  const renderCard = (card: (typeof posts)[number], index: number) => (
    <ArticleCard
      variant="featured"
      title={card.title.rendered}
      author_link={card.author_info.author_link}
      display_name={card.author_info.display_name}
      subtitle={card.excerpt.rendered}
      date={card.wbDate}
      imgSrc={card.jetpack_featured_media_url}
      path={card.link}
      index={index}
    />
  );

  if (steps <= 1) {
    return (
      <section className="news-scroll-section border-t border-gray-200 py-12 dark:border-gray-700 md:py-16">
        <h2 className="mb-8 text-center text-2xl font-bold !text-purple-700 dark:!text-purple-400 md:mb-10 md:text-3xl">
          {title}
        </h2>
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-stretch gap-6 md:grid-cols-3">
          {posts.map((card, index) => (
            <div key={card.id} className="news-card-shell h-full">
              {renderCard(card, index)}
            </div>
          ))}
        </div>
        <BlogPostLinks className="mt-8" />
      </section>
    );
  }

  return (
    <section className="news-scroll-section border-t border-gray-200 py-12 dark:border-gray-700 md:py-16" aria-label={title}>
      <h2 className="mb-8 text-center text-2xl font-bold !text-purple-700 dark:!text-purple-400 md:mb-10 md:text-3xl">
        {title}
      </h2>

      <div className="mx-auto flex max-w-7xl items-stretch gap-3 px-4 md:gap-4 md:px-6">
        <button
          type="button"
          onClick={goPrev}
          disabled={activeStep === 0}
          aria-label="Show previous news cards"
          className="hidden shrink-0 self-center rounded-full border border-gray-200 bg-white p-2 text-gray-700 transition enabled:hover:border-blue-700 enabled:hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-30 dark:border-gray-500 dark:bg-white/10 dark:text-gray-50 dark:enabled:hover:border-blue-500 dark:enabled:hover:text-blue-500 sm:inline-flex"
        >
          <Icon icon="tabler:chevron-left" className="text-2xl" />
        </button>

        <div className="news-carousel-viewport min-w-0 flex-1" onWheel={handleWheel}>
          <div className="news-carousel-stage">
            <div
              className="news-carousel-track flex w-full transition-transform duration-500 ease-in-out motion-reduce:transition-none"
              style={{ transform: `translate3d(-${activeStep * 100}%, 0, 0)` }}
            >
              {chunks.map((chunk, stepIndex) => (
                <div
                  key={stepIndex}
                  className="news-carousel-slide w-full shrink-0 grow-0 basis-full"
                >
                  <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-3">
                    {Array.from({ length: CARDS_PER_STEP }).map((_, slotIndex) => {
                      const card = chunk[slotIndex];

                      if (!card) {
                        return (
                          <div key={`empty-${stepIndex}-${slotIndex}`} className="hidden md:block" aria-hidden="true" />
                        );
                      }

                      return (
                        <div key={card.id} className="news-card-shell h-full min-w-0">
                          {renderCard(card, stepIndex * CARDS_PER_STEP + slotIndex)}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={goNext}
          disabled={activeStep === steps - 1}
          aria-label="Show next news cards"
          className="hidden shrink-0 self-center rounded-full border border-gray-200 bg-white p-2 text-gray-700 transition enabled:hover:border-blue-700 enabled:hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-30 dark:border-gray-500 dark:bg-white/10 dark:text-gray-50 dark:enabled:hover:border-blue-500 dark:enabled:hover:text-blue-500 sm:inline-flex"
        >
          <Icon icon="tabler:chevron-right" className="text-2xl" />
        </button>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4 sm:hidden">
        <button
          type="button"
          onClick={goPrev}
          disabled={activeStep === 0}
          aria-label="Show previous news cards"
          className="rounded-full border border-gray-200 bg-white p-2 text-gray-700 transition enabled:hover:border-blue-700 enabled:hover:text-blue-700 disabled:opacity-30 dark:border-gray-500 dark:bg-white/10 dark:text-gray-50 dark:enabled:hover:border-blue-500 dark:enabled:hover:text-blue-500"
        >
          <Icon icon="tabler:chevron-left" className="text-xl" />
        </button>
        <button
          type="button"
          onClick={goNext}
          disabled={activeStep === steps - 1}
          aria-label="Show next news cards"
          className="rounded-full border border-gray-200 bg-white p-2 text-gray-700 transition enabled:hover:border-blue-700 enabled:hover:text-blue-700 disabled:opacity-30 dark:border-gray-500 dark:bg-white/10 dark:text-gray-50 dark:enabled:hover:border-blue-500 dark:enabled:hover:text-blue-500"
        >
          <Icon icon="tabler:chevron-right" className="text-xl" />
        </button>
      </div>

      <div className="mt-6 flex justify-center gap-2" aria-hidden="true">
        {chunks.map((_, index) => (
          <span
            key={index}
            className={`h-1 rounded-full transition-all duration-300 ${
              index === activeStep ? 'w-8 bg-purple-700 dark:bg-purple-100' : 'w-4 bg-gray-300 dark:bg-gray-500'
            }`}
          />
        ))}
      </div>

      <BlogPostLinks className="mt-8" />
    </section>
  );
}

export default ScrollNewsSection;
