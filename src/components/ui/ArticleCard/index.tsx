import React from 'react';

type ArticleCardProps = {
  title: string;
  subtitle: string;
  display_name: string;
  author_link: string;
  date: string;
  imgSrc?: string;
  altLayout?: boolean;
  variant?: 'default' | 'featured';
  path: string;
  index?: number;
};

const FALLBACK_IMAGES = [
  'images/optimized/characters/seal-diving-276w-226h.webp',
  'images/optimized/characters/seals-swimming-205w-238h.webp',
  'images/optimized/characters/confused-seal-231w-248h.webp',
  'images/optimized/podman-selkie-385w-358h.webp',
];

function stripHtml(html: string) {
  if (!html) {
    return '';
  }
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const PublishDate = ({ date, styles }: { date: string; styles?: string }) => {
  return (
    <div
      className={`${styles} h-fit max-w-fit rounded-sm bg-gradient-radial from-blue-500 to-blue-700 px-2 text-white shadow-md dark:from-blue-900 dark:to-blue-900`}>
      <p className="font-semibold shadow-sm">{date}</p>
    </div>
  );
};

function FeaturedCardImage({
  src,
  fallback,
  alt,
  date,
}: {
  src?: string;
  fallback: string;
  alt: string;
  date: string;
}) {
  const hasFeaturedImage = Boolean(src);

  return (
    <div className="news-card__media relative h-48 w-full shrink-0 overflow-hidden border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-white/5">
      <img
        src={src || fallback}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={
          hasFeaturedImage
            ? 'h-full w-full object-cover object-center'
            : 'mx-auto h-full w-full max-w-[88%] object-contain p-4'
        }
      />
      <span className="absolute left-3 top-3 rounded-md bg-purple-700/95 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm dark:bg-purple-700/95">
        {date}
      </span>
    </div>
  );
}

function ArticleCard(props: ArticleCardProps) {
  const fallbackImage = FALLBACK_IMAGES[(props.index || 0) % FALLBACK_IMAGES.length];
  const plainTitle = stripHtml(props.title);
  const plainSubtitle = stripHtml(props.subtitle);

  if (props.variant === 'featured') {
    return (
      <article className="news-card relative flex h-full min-h-[22rem] flex-col rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-white/[0.03]">
        <FeaturedCardImage
          src={props.imgSrc}
          fallback={fallbackImage}
          alt={plainTitle}
          date={props.date}
        />

        <div className="relative z-[2] flex flex-1 flex-col p-5 pointer-events-none">
          <h3 className="line-clamp-2 text-lg font-bold leading-snug !text-gray-900 dark:!text-gray-50">
            <span className="news-card__title !text-gray-900 dark:!text-gray-50">{plainTitle}</span>
          </h3>

          <p className="news-card__excerpt mt-3 line-clamp-3 flex-1 text-sm leading-relaxed !text-gray-700 dark:!text-gray-100">
            {plainSubtitle}
          </p>

          <p className="news-card__author mt-4 border-t border-gray-100 pt-4 text-sm !text-gray-500 dark:border-gray-700 dark:!text-gray-100">
            By{' '}
            <a
              href={props.author_link}
              target="_blank"
              rel="noopener noreferrer"
              className="pointer-events-auto relative z-[3] font-medium !text-purple-700 no-underline dark:!text-purple-400">
              {props.display_name}
            </a>
          </p>
        </div>

        <a
          href={props.path}
          target="_blank"
          rel="noopener noreferrer"
          className="news-card__overlay absolute inset-0 z-[1] no-underline"
          aria-label={plainTitle}
        />
      </article>
    );
  }

  const abbrSubtitle = `${plainSubtitle.split(' ').slice(0, 32).join(' ')}...`;

  if (props.altLayout) {
    return (
      <article className="my-4 max-w-2xl shadow-lg">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="grid items-end xl:basis-5/12">
            <div className="z-10 col-start-1 row-start-1">
              <h3 className="w-9/12 bg-gradient-radial from-purple-700 to-purple-900 p-2 text-white shadow-sm">
                <a
                  href={props.path}
                  target="_blank"
                  className="text-white no-underline hover:text-blue-100 hover:no-underline dark:text-white dark:hover:text-blue-50">
                  {plainTitle}
                </a>
              </h3>
              <PublishDate date={props.date} styles="col-start-1 order-1 row-start-1 z-10" />
            </div>
            <img
              src={props.imgSrc || fallbackImage}
              className="col-start-1 row-start-1 h-full w-full rounded-sm object-cover lg:w-80"
            />
          </div>
          <div className="max-w-sm items-center gap-2 self-center p-2 pr-4">
            <p>{abbrSubtitle}</p>
            <p className="mt-2 text-purple-700 dark:text-purple-400">
              By: <a href={props.author_link}>{props.display_name}</a>
            </p>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="my-4 max-w-sm p-4">
      <div className="grid">
        <h3 className="w-10/12 rounded-sm bg-gradient-radial from-purple-700 to-purple-900 px-2 py-1 text-white shadow-sm">
          <a
            href={props.path}
            target="_blank"
            className="text-white no-underline hover:text-blue-100 hover:no-underline dark:text-white dark:hover:text-blue-50">
            {plainTitle}
          </a>
        </h3>
        <p>{abbrSubtitle}</p>
        <PublishDate date={props.date} styles="row-start-1 col-start-1 z-10 my-2" />
        <img src={props.imgSrc || fallbackImage} className="object-fit col-start-1 row-start-1 rounded-sm" alt="" />
        <p className="text-purple-700 dark:text-purple-400">
          By: <a href={props.author_link}>{props.display_name}</a>
        </p>
      </div>
    </article>
  );
}

export default ArticleCard;
