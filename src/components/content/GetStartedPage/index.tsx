import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import CodeBlock from '@theme/CodeBlock';
import { resources } from '@site/src/components/content/BasicResourcesBox/data';
import {
  searchExample,
  searchFilterExample,
  imagesExample,
} from '@site/src/components/content/CodeExampleSection/data';
import {
  containersSection,
  getHelp,
  gettingStartedResources,
  header,
  imagesSection,
  install,
  navigation,
} from '@site/static/data/get-started';

type ResourceItem = (typeof gettingStartedResources.items)[number];

function GetStartedHero() {
  return (
    <header className="features-hero">
      <div className="features-hero__box">
        <p className="features-hero__eyebrow">{header.eyebrow}</p>
        <div className="features-hero__main">
          <h1 className="features-hero__title">{header.title}</h1>
          <p className="features-hero__subtitle">{header.subtitle}</p>
        </div>
      </div>
    </header>
  );
}

function GetStartedNav({
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
    <nav className="features-nav" aria-label="Get started sections">
      <div className="features-shell">
        <ul ref={listRef} className="features-nav__list">
          {navigation.map((item, index) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`features-nav__link${activeIndex === index ? ' is-active' : ''}`}
                onClick={event => handleClick(event, index, item.id)}
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

function GetStartedResourceCard({ item }: { item: ResourceItem }) {
  return (
    <article className="features-community-card">
      <div className="features-community-card__icon">
        <img src={item.image.path} alt={item.image.alt} loading="lazy" decoding="async" />
      </div>
      <h3 className="features-community-card__title">{item.title}</h3>
      <p className="features-community-card__text">{item.description}</p>
      {'link' in item && item.link && (
        <a href={item.link.href} className="features-link heading-link-underline">
          {item.link.text}
          <Icon icon="tabler:arrow-up-right" className="text-base" />
        </a>
      )}
      {'links' in item && item.links && (
        <ul className="features-community-card__links">
          {item.links.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                className="features-link heading-link-underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.text}
                <Icon icon="tabler:arrow-up-right" className="text-base" />
              </a>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

function GetStartedCode({ children }: { children: string }) {
  return (
    <div className="get-started-code">
      <CodeBlock language="bash" showLineNumbers>
        {children}
      </CodeBlock>
    </div>
  );
}

function GetStartedNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="get-started-note">
      <p className="get-started-note__label">Note</p>
      <div className="get-started-note__body">{children}</div>
    </div>
  );
}

function GetStartedInstallSection() {
  return (
    <div className="features-section__panel">
      <div className="get-started-install-grid">
        <div className="get-started-install-grid__main">
          <div className="features-section__header get-started-install-grid__header">
            <h2 className="features-section__title">{install.title}</h2>
            <p className="features-section__description">{install.description}</p>
            <a href={install.button.path} className="features-cta-button features-section__inline-link">
              <Icon icon={install.button.icon} aria-hidden="true" />
              {install.button.text}
            </a>
          </div>
        </div>

        <div className="get-started-resources">
          <h3 className="get-started-resources__title">{resources.title}</h3>
          <ul className="features-learn-more__resource-list get-started-resources__list">
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
      </div>
    </div>
  );
}

function GetStartedResourcesSection() {
  return (
    <div className="features-section__panel">
      <div className="features-section__header">
        <h2 className="features-section__title">{gettingStartedResources.title}</h2>
        <p className="features-section__description">{gettingStartedResources.description}</p>
      </div>
      <div className="features-community-grid">
        {gettingStartedResources.items.map(item => (
          <GetStartedResourceCard key={item.title} item={item} />
        ))}
      </div>
    </div>
  );
}

function GetStartedHelpSection() {
  return (
    <div className="features-section__panel">
      <div className="features-section__header">
        <h2 className="features-section__title">{getHelp.title}</h2>
        <p className="features-section__description">{getHelp.description}</p>
      </div>

      <div className="get-started-help-grid">
        {getHelp.items.map(item => (
          <article key={item.title} className="get-started-help-card">
            <h3 className="get-started-help-card__title">{item.title}</h3>
            <p className="get-started-help-card__text">{item.description}</p>
            <GetStartedCode>{item.command}</GetStartedCode>
            {'href' in item && item.href && (
              <a href={item.href} className="features-link heading-link-underline">
                {item.hrefLabel}
                <Icon icon="tabler:arrow-up-right" className="text-base" />
              </a>
            )}
          </article>
        ))}
      </div>

      <p className="get-started-help-footer">
        {getHelp.footer.text}{' '}
        <a href={getHelp.footer.href} className="features-link heading-link-underline">
          {getHelp.footer.linkText}
        </a>{' '}
        {getHelp.footer.suffix}
      </p>
    </div>
  );
}

function GetStartedImagesSection() {
  const examples = [
    {
      title: 'Search remote registries',
      description: searchExample.label,
      command: `${searchExample.command}${searchExample.code}`,
    },
    {
      title: 'Filter results and pull an image',
      description: searchFilterExample.label,
      extra: searchFilterExample.extra,
      command: `${searchFilterExample.command}${searchFilterExample.code}`,
    },
    {
      title: 'List local images',
      description: imagesExample.label,
      extra: imagesExample.extra,
      command: `${imagesExample.command}${imagesExample.code}`,
    },
  ];

  return (
    <div className="features-section__panel">
      <div className="features-section__header">
        <h2 className="features-section__title">{imagesSection.title}</h2>
        <p className="features-section__description">{imagesSection.description}</p>
      </div>

      <div className="get-started-examples">
        {examples.map(example => (
          <article key={example.title} className="get-started-example">
            <h3 className="get-started-example__title">{example.title}</h3>
            <p className="get-started-example__text">{example.description}</p>
            {example.extra && <p className="get-started-example__text">{example.extra}</p>}
            <GetStartedCode>{example.command}</GetStartedCode>
          </article>
        ))}
      </div>
    </div>
  );
}

function GetStartedContainersSection() {
  return (
    <div className="features-section__panel">
      <div className="features-section__header">
        <h2 className="features-section__title">{containersSection.title}</h2>
        <p className="features-section__description">{containersSection.intro}</p>
      </div>

      <div className="get-started-steps">
        {containersSection.steps.map(step => (
          <article key={step.title} className="get-started-step">
            <h3 className="get-started-step__title">{step.title}</h3>
            {'description' in step && step.description && (
              <p className="get-started-step__text">{step.description}</p>
            )}
            {'command' in step && step.command && <GetStartedCode>{step.command}</GetStartedCode>}
            {'commands' in step &&
              step.commands?.map(command => (
                <GetStartedCode key={command}>{command}</GetStartedCode>
              ))}
            {'note' in step && step.note && (
              <GetStartedNote>
                {step.note.split('\n\n').map(paragraph => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </GetStartedNote>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}

function GetStartedPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  const scrollToSection = useCallback((index: number) => {
    sectionRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

  const sections = [
    { id: 'install', content: <GetStartedInstallSection /> },
    { id: 'resources', content: <GetStartedResourcesSection /> },
    { id: 'help', content: <GetStartedHelpSection /> },
    { id: 'images', content: <GetStartedImagesSection /> },
    { id: 'containers', content: <GetStartedContainersSection /> },
  ];

  return (
    <div className="features-page get-started-page">
      <div className="features-shell">
        <GetStartedHero />
      </div>

      <GetStartedNav activeIndex={activeIndex} onJump={scrollToSection} />

      <div className="features-sections">
        {sections.map((section, index) => (
          <section
            key={section.id}
            id={section.id}
            ref={element => {
              sectionRefs.current[index] = element;
            }}
            className="features-section features-section--compact"
          >
            <div className="features-shell">{section.content}</div>
          </section>
        ))}
      </div>
    </div>
  );
}

export default GetStartedPage;
