import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import { resources } from '@site/src/components/content/BasicResourcesBox/data';
import BlogPostLinks from '@site/src/components/utilities/BlogPostLinks';
import { useBlogPosts } from '@site/src/hooks/useBlogPosts';
import { header, navigation, sections, learnMore } from '@site/static/data/features';

type FeatureItem = (typeof sections)[number]['items'][number];
type FeatureSection = (typeof sections)[number];

const SECTION_COUNT = sections.length + 1;

function FeatureVideo({ url, poster, isActive }: { url: string; poster: string; isActive: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return undefined;
    }

    if (isActive) {
      video.play().catch(() => undefined);
    } else {
      video.pause();
    }

    return undefined;
  }, [isActive]);

  return (
    <video
      ref={videoRef}
      className="features-terminal__video"
      poster={poster}
      muted
      playsInline
      loop
      preload="metadata"
    >
      <source src={url} type="video/mp4" />
    </video>
  );
}

type TerminalMeta = {
  windowTitle: string;
  frameLabel: string;
  logs: string[];
  prompt: string;
};

function isCliScreenshot(path: string) {
  return path.includes('cli-screens');
}

function isCliScreenshotItem(item: FeatureItem) {
  return 'image' in item && Boolean(item.image) && isCliScreenshot(item.image.path);
}

function getTerminalMetaForItem(item: FeatureItem, title?: string): TerminalMeta {
  const command =
    'commands' in item && item.commands && item.commands.length > 0
      ? item.commands[0]
      : 'podman';

  return {
    windowTitle: title ? `Podman CLI — ${title}` : 'Podman CLI',
    frameLabel: command,
    logs: [`Running ${command}...`, 'Engine: podman (rootless)', 'Status: ready'],
    prompt: command,
  };
}

function hasTerminalSession(item: FeatureItem) {
  return (
    'terminalSession' in item &&
    Array.isArray(item.terminalSession) &&
    item.terminalSession.length > 0 &&
    typeof item.terminalSession[0] === 'object'
  );
}

function renderTerminalCommandText(text: string) {
  const parts = text.split(/(--help|<subcommand>)/g);

  return parts.map((part, index) => {
    if (part === '--help') {
      return (
        <span key={index} className="features-terminal__session-flag">
          {part}
        </span>
      );
    }

    if (part === '<subcommand>') {
      return (
        <span key={index} className="features-terminal__session-placeholder">
          {part}
        </span>
      );
    }

    return <span key={index}>{part}</span>;
  });
}

function FeatureTerminalSessionLine({
  line,
  index,
}: {
  line: { type: string; text?: string };
  index: number;
}) {
  if (line.type === 'blank') {
    return <div className="features-terminal__session-blank" aria-hidden="true" />;
  }

  if (line.type === 'command' && line.text) {
    return (
      <p className="features-terminal__session-line features-terminal__session-line--command">
        <span className="features-terminal__session-prompt">$ </span>
        {renderTerminalCommandText(line.text)}
      </p>
    );
  }

  if (line.type === 'text' && line.text) {
    return (
      <p
        className={`features-terminal__session-line features-terminal__session-line--text${
          line.text === '...' ? ' features-terminal__session-line--muted' : ''
        }${line.text === '/ #' ? ' features-terminal__session-line--shell' : ''}`}
      >
        {line.text}
      </p>
    );
  }

  return null;
}

function FeatureTerminalWindow({
  terminal,
  compact = false,
  hideLogs = false,
  video = false,
  screenshot = false,
  session = false,
  children,
}: {
  terminal: TerminalMeta;
  compact?: boolean;
  hideLogs?: boolean;
  video?: boolean;
  screenshot?: boolean;
  session?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`features-terminal${compact ? ' features-terminal--compact' : ''}${
        video ? ' features-terminal--video' : ''
      }${screenshot ? ' features-terminal--screenshot' : ''}${
        session ? ' features-terminal--session' : ''
      }`}
    >
      <div className="features-terminal__titlebar">
        <div className="features-terminal__traffic" aria-hidden="true">
          <span className="features-terminal__dot features-terminal__dot--close" />
          <span className="features-terminal__dot features-terminal__dot--minimize" />
          <span className="features-terminal__dot features-terminal__dot--maximize" />
        </div>
        <p className="features-terminal__window-title">{terminal.windowTitle}</p>
      </div>

      <div className="features-terminal__body">
        {!hideLogs && !screenshot && !session && (
          <div className="features-terminal__logs" aria-hidden="true">
            {terminal.logs.map((line, index) => (
              <p
                key={line}
                className={`features-terminal__log${index > 0 ? ' features-terminal__log--indent' : ''}`}
              >
                {line}
              </p>
            ))}
          </div>
        )}

        {video ? (
          <div className="features-terminal__viewport features-terminal__viewport--video">{children}</div>
        ) : screenshot ? (
          <div className="features-terminal__viewport features-terminal__viewport--screenshot">{children}</div>
        ) : session ? (
          <div className="features-terminal__viewport features-terminal__viewport--session">{children}</div>
        ) : (
          <div className="features-terminal__frame">
            <span className="features-terminal__frame-label">{terminal.frameLabel}</span>
            <div
              className={`features-terminal__viewport${compact ? ' features-terminal__viewport--compact' : ''}`}
            >
              {children}
            </div>
          </div>
        )}

        {!video && !session && (
          <p className="features-terminal__prompt" aria-hidden="true">
            <span className="features-terminal__prompt-symbol">&gt;</span>
            {terminal.prompt}
          </p>
        )}
      </div>
    </div>
  );
}

function FeatureTerminalVideo({
  terminal,
  url,
  poster,
  isActive,
}: {
  terminal: TerminalMeta;
  url: string;
  poster: string;
  isActive: boolean;
}) {
  return (
    <FeatureTerminalWindow terminal={terminal} video>
      <FeatureVideo url={url} poster={poster} isActive={isActive} />
    </FeatureTerminalWindow>
  );
}

function FeatureTerminalSession({ item }: { item: FeatureItem }) {
  if (!hasTerminalSession(item)) {
    return null;
  }

  return (
    <FeatureTerminalWindow
      terminal={getTerminalMetaForItem(item, item.title)}
      hideLogs
      session
    >
      {item.terminalSession.map((line, index) => (
        <FeatureTerminalSessionLine key={`${line.type}-${index}`} line={line} index={index} />
      ))}
    </FeatureTerminalWindow>
  );
}

function FeatureTerminalScreenshot({
  item,
  compact = true,
  cliCard = false,
}: {
  item: FeatureItem;
  compact?: boolean;
  cliCard?: boolean;
}) {
  if (!('image' in item) || !item.image) {
    return null;
  }

  return (
    <FeatureTerminalWindow
      terminal={getTerminalMetaForItem(item)}
      compact={compact && !cliCard}
      hideLogs={compact || cliCard}
      screenshot={cliCard}
    >
      <img
        src={item.image.path}
        alt={item.image.alt}
        className="features-terminal__screenshot"
        loading="lazy"
        decoding="async"
      />
    </FeatureTerminalWindow>
  );
}

function FeaturesPageHeader() {
  return (
    <header className="features-page-header">
      <div className="features-shell features-page-header__inner">
        <div className="features-page-header__copy">
          <p className="features-hero__eyebrow">Open source container tools</p>
          <h1 className="features-hero__title">{header.title}</h1>
          <p className="features-hero__subtitle">{header.subtitle}</p>
        </div>
        <figure className="features-page-header__art">
          <img
            src={header.image.path}
            alt={header.image.alt}
            className="features-page-header__img"
            width={1536}
            height={1024}
            draggable={false}
            loading="eager"
            decoding="async"
          />
        </figure>
      </div>
    </header>
  );
}

function FeaturesNav({
  activeIndex,
  onJump,
}: {
  activeIndex: number;
  onJump: (index: number) => void;
}) {
  const listRef = useRef<HTMLUListElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>, index: number, id: string) => {
    event.preventDefault();
    onJump(index);
    window.history.replaceState(null, '', `#${id}`);
  };

  useEffect(() => {
    const list = listRef.current;
    if (!list) {
      return;
    }

    const activeLink = list.querySelector<HTMLElement>('.features-nav__link.is-active');
    activeLink?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, [activeIndex]);

  return (
    <nav className="features-nav" aria-label="Feature sections">
      <div className="features-shell">
        <ul ref={listRef} className="features-nav__list">
          {navigation.map((item, index) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={event => handleClick(event, index, item.id)}
                className={`features-nav__link${activeIndex === index ? ' is-active' : ''}`}
                aria-current={activeIndex === index ? 'true' : undefined}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

function FeatureCommands({ commands }: { commands: string[] }) {
  return (
    <ul className="features-commands">
      {commands.map(command => (
        <li key={command}>
          <code>{command}</code>
        </li>
      ))}
    </ul>
  );
}

function FeatureTextLink({
  cta,
  className,
}: {
  cta: { text: string; href: string };
  className?: string;
}) {
  return (
    <a
      href={cta.href}
      className={`features-link heading-link-underline${className ? ` ${className}` : ''}`}
      target={cta.href.startsWith('http') ? '_blank' : undefined}
      rel={cta.href.startsWith('http') ? 'noopener noreferrer' : undefined}
    >
      {cta.text}
      <Icon icon="tabler:arrow-up-right" className="text-base" />
    </a>
  );
}

function FeatureShowcase({
  item,
  reverse = false,
  isActive = true,
  sectionLabel,
  cta,
}: {
  item: FeatureItem;
  reverse?: boolean;
  isActive?: boolean;
  sectionLabel?: string;
  cta?: { text: string; href: string };
}) {
  const hasVideo = 'video' in item && item.video;
  const hasImage = 'image' in item && item.image;
  const isCompactImage = hasImage && !hasVideo && !isCliScreenshot(item.image.path);
  const isCliImage = hasImage && !hasVideo && isCliScreenshot(item.image.path);
  const isVideoTerminal = hasVideo && item.video && 'terminal' in item.video && item.video.terminal;

  return (
    <article
      className={`features-showcase${reverse ? ' features-showcase--reverse' : ''}${
        isCompactImage ? ' features-showcase--compact' : ''
      }${isCliImage ? ' features-showcase--cli' : ''}${
        isVideoTerminal ? ' features-showcase--video-terminal' : ''
      }`}
    >
      <div className="features-showcase__copy">
        {sectionLabel && (
          <p className="features-section__label features-showcase__label">{sectionLabel}</p>
        )}
        <h3 className="features-showcase__title">{item.title}</h3>
        <p className="features-showcase__text">{item.description}</p>
        {'commands' in item && item.commands && <FeatureCommands commands={item.commands} />}
        {'note' in item && item.note && <p className="features-showcase__note">{item.note}</p>}
        {'link' in item && item.link && (
          <a
            href={item.link.href}
            className="features-link heading-link-underline"
            target={item.link.href.startsWith('http') ? '_blank' : undefined}
            rel={item.link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
          >
            {item.link.text}
            <Icon icon="tabler:arrow-up-right" className="text-base" />
          </a>
        )}
        {cta && <FeatureTextLink cta={cta} className="features-section__inline-link" />}
      </div>

      <div className="features-showcase__media">
        {hasVideo && item.video ? (
          'terminal' in item.video && item.video.terminal ? (
            <FeatureTerminalVideo
              terminal={item.video.terminal as TerminalMeta}
              url={item.video.url}
              poster={item.video.poster}
              isActive={isActive}
            />
          ) : (
            <FeatureVideo url={item.video.url} poster={item.video.poster} isActive={isActive} />
          )
        ) : isCliImage ? (
          <FeatureTerminalScreenshot item={item} compact={false} />
        ) : (
          hasImage && (
            <div className="features-image-short">
              <img src={item.image.path} alt={item.image.alt} loading="lazy" decoding="async" />
            </div>
          )
        )}
      </div>
    </article>
  );
}

function FeatureCliCard({ item }: { item: FeatureItem }) {
  if (hasTerminalSession(item)) {
    const heading = 'heading' in item && item.heading ? item.heading : item.title;

    return (
      <article className="features-cli-card features-cli-card--workflow">
        <FeatureTerminalSession item={item} />
        <div className="features-cli-card__body">
          <h3 className="features-cli-card__title">{heading}</h3>
          <p className="features-cli-card__text">{item.description}</p>
          {'commands' in item && item.commands && <FeatureCommands commands={item.commands} />}
        </div>
      </article>
    );
  }

  const hasCliImage = 'image' in item && item.image && isCliScreenshot(item.image.path);

  return (
    <article className="features-cli-card">
      {hasCliImage ? (
        <FeatureTerminalScreenshot item={item} cliCard />
      ) : (
        'image' in item &&
        item.image && (
          <div className="features-cli-card__media features-cli-card__media--short">
            <img src={item.image.path} alt={item.image.alt} loading="lazy" decoding="async" />
          </div>
        )
      )}
      <div className="features-cli-card__body">
        <h3 className="features-cli-card__title">{item.title}</h3>
        {'commands' in item && item.commands && <FeatureCommands commands={item.commands} />}
      </div>
    </article>
  );
}

function isVideoItem(item: FeatureItem) {
  return 'video' in item && Boolean(item.video);
}

function isWorkflowSection(section: FeatureSection) {
  return section.id === 'command-line';
}

function isCompactSection(section: FeatureSection) {
  return section.id === 'podman-desktop' || section.id === 'command-line';
}

function FeatureInlineMedia({ item }: { item: FeatureItem }) {
  return (
    <div className="features-section__inline-media">
      {'image' in item && item.image && (
        <img
          src={item.image.path}
          alt={item.image.alt}
          className="features-section__inline-media-img"
          loading="lazy"
          decoding="async"
        />
      )}
      {'link' in item && item.link && (
        <a
          href={item.link.href}
          className="features-link heading-link-underline"
          target={item.link.href.startsWith('http') ? '_blank' : undefined}
          rel={item.link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
        >
          {item.link.text}
          <Icon icon="tabler:arrow-up-right" className="text-base" />
        </a>
      )}
    </div>
  );
}

function isVideoOnlySection(section: FeatureSection) {
  const videoItems = section.items.filter(isVideoItem);
  const nonVideoItems = section.items.filter(item => !isVideoItem(item));
  const cardItems = isWorkflowSection(section)
    ? nonVideoItems
    : nonVideoItems.filter(item => !isCliScreenshotItem(item));

  return (
    videoItems.length > 0 &&
    !isWorkflowSection(section) &&
    cardItems.length === 0
  );
}

function FeaturesSectionBlock({
  section,
  isActive,
}: {
  section: FeatureSection;
  isActive: boolean;
}) {
  const videoItems = section.items.filter(isVideoItem);
  const nonVideoItems = section.items.filter(item => !isVideoItem(item));
  const cardItems = isWorkflowSection(section)
    ? nonVideoItems
    : nonVideoItems.filter(item => !isCliScreenshotItem(item));
  const workflowCliItems = isWorkflowSection(section)
    ? section.items.filter(hasTerminalSession)
    : [];
  const useSingleShowcase =
    !isWorkflowSection(section) &&
    videoItems.length === 0 &&
    cardItems.length === 1;
  const isVideoOnly = isVideoOnlySection(section);

  return (
    <div className={`features-section__panel${isVideoOnly ? ' features-section__panel--video-demo' : ''}`}>
      {!isVideoOnly && (
        <div className="features-section__header">
          <p className="features-section__label">{section.label}</p>
          <h2 className="features-section__title">{section.title}</h2>
          <p className="features-section__description">{section.description}</p>
          {'cta' in section && section.cta && (
            <FeatureTextLink cta={section.cta} className="features-section__inline-link" />
          )}
        </div>
      )}

      {videoItems.map((item, index) => (
        <FeatureShowcase
          key={item.title}
          item={item}
          reverse={index % 2 === 1}
          isActive={isActive}
          sectionLabel={isVideoOnly ? section.label : undefined}
          cta={isVideoOnly && 'cta' in section ? section.cta : undefined}
        />
      ))}

      {useSingleShowcase && cardItems[0] && isCompactSection(section) && (
        <FeatureInlineMedia item={cardItems[0]} />
      )}

      {useSingleShowcase && cardItems[0] && !isCompactSection(section) && (
        <FeatureShowcase item={cardItems[0]} isActive={isActive} />
      )}

      {isWorkflowSection(section) && workflowCliItems.length > 0 && (
        <div className="features-workflow-grid">
          {workflowCliItems.map(item => (
            <FeatureCliCard key={item.title} item={item} />
          ))}
        </div>
      )}

      {!isWorkflowSection(section) &&
        !useSingleShowcase &&
        cardItems.length > 0 && (
          <div className="features-cli-grid">
            {cardItems.map(item => (
              <FeatureCliCard key={item.title} item={item} />
            ))}
          </div>
        )}

    </div>
  );
}

function stripHtml(html: string) {
  if (!html) {
    return '';
  }

  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function FeatureLearnMoreResources() {
  return (
    <div className="features-learn-more__resources">
      <h3 className="features-learn-more__heading">{resources.title}</h3>
      <ul className="features-learn-more__resource-list">
        {resources.buttons.map(button => (
          <li key={button.text}>
            <a
              href={button.path}
              className="features-learn-more__resource-link"
              target={button.path.startsWith('http') ? '_blank' : undefined}
              rel={button.path.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              <Icon icon={button.icon} className="features-learn-more__resource-icon" aria-hidden="true" />
              <span>{button.text}</span>
              <Icon icon="tabler:arrow-up-right" className="features-learn-more__resource-arrow" aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

const LEARN_MORE_FALLBACK_IMAGES = [
  'images/optimized/characters/seal-diving-276w-226h.webp',
  'images/optimized/characters/seals-swimming-205w-238h.webp',
  'images/optimized/characters/confused-seal-231w-248h.webp',
  'images/optimized/podman-selkie-385w-358h.webp',
];

function getLearnMoreFallbackImage(index: number) {
  return LEARN_MORE_FALLBACK_IMAGES[index % LEARN_MORE_FALLBACK_IMAGES.length];
}

function FeatureLearnMorePostImage({
  src,
  fallback,
  alt,
}: {
  src: string;
  fallback: string;
  alt: string;
}) {
  const [imageSrc, setImageSrc] = useState(src || fallback);
  const usesFallback = !src || imageSrc === fallback;

  useEffect(() => {
    setImageSrc(src || fallback);
  }, [src, fallback]);

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={`features-learn-more__post-image${
        usesFallback ? ' features-learn-more__post-image--fallback' : ''
      }`}
      loading="lazy"
      decoding="async"
      onError={() => {
        if (imageSrc !== fallback) {
          setImageSrc(fallback);
        }
      }}
    />
  );
}

function FeatureLearnMoreBlog() {
  const { data, loading } = useBlogPosts(2);

  if (loading) {
    return null;
  }

  const posts = data.slice(0, 2);

  return (
    <div className="features-learn-more__blog">
      <h3 className="features-learn-more__heading">{learnMore.blogPosts.title}</h3>
      <ul className="features-learn-more__post-list">
        {posts.map((post, index) => {
          const title = stripHtml(post.title.rendered);
          const excerpt = stripHtml(post.excerpt.rendered);
          const featuredImage = post.jetpack_featured_media_url?.trim() ?? '';
          const fallbackImage = getLearnMoreFallbackImage(index);

          return (
            <li key={post.id}>
              <a
                href={post.link}
                className="features-learn-more__post-card"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FeatureLearnMorePostImage src={featuredImage} fallback={fallbackImage} alt={title} />
                <div className="features-learn-more__post-copy">
                  <p className="features-learn-more__post-date">{post.wbDate}</p>
                  <p className="features-learn-more__post-title">{title}</p>
                  <p className="features-learn-more__post-excerpt">{excerpt}</p>
                </div>
              </a>
            </li>
          );
        })}
      </ul>
      <BlogPostLinks className="features-learn-more__footer mt-4" />
    </div>
  );
}

function FeaturesLearnMoreSlide() {
  return (
    <div className="features-section__panel features-section__panel--learn">
      <div className="features-section__header">
        <p className="features-section__label">Learn More</p>
        <h2 className="features-section__title">{learnMore.title}</h2>
      </div>

      <div className="features-learn-more__grid">
        <FeatureLearnMoreResources />
        <FeatureLearnMoreBlog />
      </div>
    </div>
  );
}

function FeaturesPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  const scrollToSection = useCallback((index: number) => {
    const element = sectionRefs.current[index];
    if (!element) {
      return;
    }

    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  useEffect(() => {
    const elements = sectionRefs.current.filter(Boolean) as HTMLElement[];
    if (elements.length === 0) {
      return undefined;
    }

    const getActivationOffset = () => {
      const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
      return (4.2 + 3.5) * rootFontSize;
    };

    let frame = 0;

    const updateActiveIndex = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const offset = getActivationOffset();
        const atBottom =
          window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
        let nextIndex = 0;

        if (atBottom) {
          nextIndex = elements.length - 1;
        } else {
          for (let i = 0; i < elements.length; i++) {
            const { top } = elements[i].getBoundingClientRect();
            if (top - offset <= 1) {
              nextIndex = i;
            }
          }
        }

        setActiveIndex(current => (current === nextIndex ? current : nextIndex));
      });
    };

    updateActiveIndex();
    window.addEventListener('scroll', updateActiveIndex, { passive: true });
    window.addEventListener('resize', updateActiveIndex);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', updateActiveIndex);
      window.removeEventListener('resize', updateActiveIndex);
    };
  }, []);

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (!hash) {
      return;
    }

    window.setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 120);
  }, []);

  return (
    <div className="features-page">
      <FeaturesPageHeader />
      <FeaturesNav activeIndex={activeIndex} onJump={scrollToSection} />

      <div className="features-sections">
        {sections.map((section, index) => (
          <section
            key={section.id}
            id={section.id}
            ref={element => {
              sectionRefs.current[index] = element;
            }}
            className={`features-section${isCompactSection(section) ? ' features-section--compact' : ''}`}
          >
            <div className="features-shell">
              <FeaturesSectionBlock section={section} isActive={activeIndex === index} />
            </div>
          </section>
        ))}

        <section
          id="learn-more"
          ref={element => {
            sectionRefs.current[SECTION_COUNT - 1] = element;
          }}
          className="features-section features-section--compact"
        >
          <div className="features-shell">
            <FeaturesLearnMoreSlide />
          </div>
        </section>
      </div>
    </div>
  );
}

export default FeaturesPage;
