import React, { useEffect, useState } from 'react';
import Link from '@docusaurus/Link';
import { Icon } from '@iconify/react';
import Markdown from '@site/src/components/utilities/Markdown';
import sponsorData from '@site/src/components/content/ThankYouSection/data';
import {
  getMeetingPath,
  getMeetingsByType,
  type MeetingRecord,
} from '@site/static/data/meetings/registry';
import {
  header,
  communityChat,
  communityMeetings,
  communitySocial,
  mailingList,
  submittingIssues,
} from '@site/static/data/community';
import { footerSocial } from '@site/static/data/footer';

const sectionNav = [
  { label: 'Chat', target: '#community-chat', icon: 'tabler:message-circle' },
  { label: 'Meetings', target: '#community-meetings', icon: 'tabler:calendar-event' },
  { label: 'Socials', target: '#community-socials', icon: 'tabler:share-3' },
  { label: 'Mailing list', target: '#community-mailing', icon: 'tabler:mail' },
  { label: 'Contribute', target: '#community-contribute', icon: 'tabler:git-pull-request' },
];

/* Presentation-only metadata for the chat channels defined in static/data/community.ts */
const channelMeta = [
  {
    description: 'Chat with maintainers and users in real time.',
    glyphClass: 'community-channel-card__glyph--matrix',
  },
  {
    description: 'The classic #podman channel on Libera.Chat.',
    glyphClass: 'community-channel-card__glyph--libera',
  },
  {
    description: 'Long-form questions, ideas, and answers.',
    glyphClass: 'community-channel-card__glyph--github',
  },
  {
    description: 'Hang out with the community and get help.',
    glyphClass: 'community-channel-card__glyph--discord',
  },
];

const meetingIcons = ['tabler:users-group', 'tabler:compass'];

function formatZoneClock(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  }).formatToParts(date);

  const pick = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find(part => part.type === type)?.value ?? '';

  return {
    time: `${pick('hour')}:${pick('minute')}:${pick('second')}`,
    period: pick('dayPeriod'),
  };
}

function LiveZoneClock({ timeZone, label }: { timeZone: string; label: string }) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const interval = window.setInterval(tick, 1000);
    return () => window.clearInterval(interval);
  }, []);

  const clock = formatZoneClock(now, timeZone);

  return (
    <div className="community-hours__row">
      <span className="community-hours__zone">{label}</span>
      <time className="community-hours__time" dateTime={now.toISOString()}>
        <span className="community-hours__digits">{clock.time}</span>
        <span className="community-hours__period">{clock.period}</span>
      </time>
    </div>
  );
}

function MaintainerHoursCard() {
  return (
    <aside className="community-hours" aria-label="Current time in maintainer time zones">
      <div className="community-hours__head">
        <p className="community-hours__title">Maintainer hours</p>
        <p className="community-hours__meta">Central Europe &amp; US Eastern</p>
      </div>
      <div className="community-hours__clocks">
        <LiveZoneClock timeZone="Europe/Paris" label="CET" />
        <LiveZoneClock timeZone="America/New_York" label="ET" />
      </div>
    </aside>
  );
}

function CommunityHero() {
  return (
    <header className="community-hero">
      <div className="community-hero__copy">
        <p className="community-hero__eyebrow">Podman community</p>
        <h1 className="community-hero__title">
          Built in the open, <span>with you.</span>
        </h1>
        <div className="community-hero__intro">
          <Markdown text={header.subtitle} />
        </div>
        <div className="community-hero__actions">
          <a href="#community-chat" className="community-btn community-btn--primary">
            <Icon icon="tabler:message-circle" aria-hidden="true" />
            Join the conversation
          </a>
          <a
            href="https://github.com/containers/podman/blob/main/CONTRIBUTING.md"
            className="community-btn community-btn--ghost"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon icon="tabler:brand-github" aria-hidden="true" />
            Contributing guide
          </a>
        </div>
        <div className="community-coc">
          <Icon icon="tabler:heart-handshake" className="community-coc__icon" aria-hidden="true" />
          <div className="community-coc__text">
            <Markdown text={header.banner.text} />
          </div>
        </div>
      </div>
      <figure className="community-hero__art">
        <img
          src={header.image}
          alt={header.imageAlt}
          className="community-hero__img"
          width={6008}
          height={3467}
          draggable={false}
          loading="eager"
          decoding="async"
        />
      </figure>
    </header>
  );
}

function CommunityNav() {
  return (
    <nav className="community-nav" aria-label="Page sections">
      {sectionNav.map(item => (
        <a key={item.target} href={item.target} className="community-nav__link">
          <Icon icon={item.icon} aria-hidden="true" />
          {item.label}
        </a>
      ))}
    </nav>
  );
}

function SectionHead({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="community-section__head">
      <p className="community-section__eyebrow">{eyebrow}</p>
      <h2 className="community-section__title">{title}</h2>
      {children ? <div className="community-section__subtitle">{children}</div> : null}
    </div>
  );
}

function CommunityChatSection() {
  return (
    <section id="community-chat" className="community-section">
      <div className="community-chat__top">
        <SectionHead eyebrow="Channels" title={communityChat.title}>
          <p>{communityChat.subtitle}</p>
        </SectionHead>
        <MaintainerHoursCard />
      </div>
      <div className="community-channel-grid">
        {communityChat.links.map((link, index) => {
          const meta = channelMeta[index] ?? {};
          return (
            <a
              key={index}
              href={link.path}
              className="community-channel-card"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div
                className={`community-channel-card__glyph${
                  meta.glyphClass ? ` ${meta.glyphClass}` : ''
                }`}
              >
                {'image' in link && link.image ? (
                  <img
                    src={link.image.path}
                    alt={link.image.alt}
                    className="community-channel-card__logo"
                    loading="lazy"
                  />
                ) : 'icon' in link && link.icon ? (
                  <Icon icon={link.icon} aria-hidden="true" />
                ) : null}
              </div>
              <div className="community-channel-card__body">
                <span className="community-channel-card__label">{link.text}</span>
                {meta.description ? (
                  <span className="community-channel-card__desc">{meta.description}</span>
                ) : null}
              </div>
              <Icon icon="tabler:arrow-up-right" className="community-channel-card__arrow" aria-hidden="true" />
            </a>
          );
        })}
      </div>
    </section>
  );
}

function MeetingCard({
  card,
  meetings,
  icon,
}: {
  card: (typeof communityMeetings.cards)[number];
  meetings: MeetingRecord[];
  icon: string;
}) {
  const recent = meetings.slice(0, 3);
  const [joinButton, agendaButton] = card.buttons;

  return (
    <article className="community-meeting-card">
      <div className="community-meeting-card__head">
        <span className="community-meeting-card__glyph">
          <Icon icon={icon} aria-hidden="true" />
        </span>
        <h3 className="community-meeting-card__title">{card.title}</h3>
      </div>
      <div className="community-meeting-card__schedule">
        <span className="community-meeting-card__slot">
          <Icon icon="tabler:calendar-event" aria-hidden="true" />
          <Markdown text={card.date} />
        </span>
        <span className="community-meeting-card__slot">
          <Icon icon="tabler:clock" aria-hidden="true" />
          {card.timeZone}
        </span>
      </div>
      <div className="community-meeting-card__desc">
        <Markdown text={card.subtitle} />
      </div>
      <div className="community-meeting-card__actions">
        <a
          href={joinButton.path}
          className="community-btn community-btn--primary"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon icon="tabler:video" aria-hidden="true" />
          {joinButton.text}
        </a>
        <a
          href={agendaButton.path}
          className="community-btn community-btn--ghost"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon icon="tabler:file-text" aria-hidden="true" />
          {agendaButton.text}
        </a>
      </div>
      {recent.length > 0 ? (
        <div className="community-meeting-card__recent">
          <p className="community-meeting-card__recent-label">Recent meetings</p>
          <ul className="community-meeting-card__list">
            {recent.map(meeting => (
              <li key={meeting.slug} className="community-meeting-card__row">
                <span className="community-meeting-card__date">{meeting.dateLabel}</span>
                <span className="community-meeting-card__links">
                  {meeting.recordingUrl ? (
                    <a
                      href={meeting.recordingUrl}
                      className="community-meeting-card__link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon
                        icon="mdi:youtube"
                        className="community-meeting-card__yt"
                        aria-hidden="true"
                      />
                      Recording
                    </a>
                  ) : null}
                  <Link to={getMeetingPath(meeting.slug)} className="community-meeting-card__link">
                    <Icon icon="tabler:notes" aria-hidden="true" />
                    Minutes
                  </Link>
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      <Link to="/community/meetings" className="community-meeting-card__archive">
        Browse all meeting minutes
        <Icon icon="tabler:arrow-right" aria-hidden="true" />
      </Link>
    </article>
  );
}

function CommunityMeetingsSection() {
  const meetingsByCard = [getMeetingsByType('community'), getMeetingsByType('cabal')];

  return (
    <section id="community-meetings" className="community-section">
      <SectionHead eyebrow="Meetings" title={communityMeetings.title}>
        <Markdown text={communityMeetings.subtitle} />
      </SectionHead>
      <div className="community-meetings-layout">
        {communityMeetings.cards.map((card, index) => (
          <MeetingCard
            key={index}
            card={card}
            meetings={meetingsByCard[index] ?? []}
            icon={meetingIcons[index]}
          />
        ))}
      </div>
      <p className="community-desktop-note">
        <img
          src="logos/optimized/podman-desktop-logo-200w-198h.webp"
          alt=""
          className="community-desktop-note__logo"
          loading="lazy"
        />
        Looking for Podman Desktop community meetings?{' '}
        <a href="https://podman-desktop.io/community#community-events" target="_blank" rel="noopener noreferrer">
          Visit podman-desktop.io
        </a>
      </p>
    </section>
  );
}

function CommunitySocialsSection() {
  return (
    <section id="community-socials" className="community-section">
      <SectionHead eyebrow="Socials" title={communitySocial.title}>
        <p>{communitySocial.subtitle}</p>
      </SectionHead>
      <div className="community-social-grid">
        {footerSocial.map(item => {
          const brand = item.brand ?? item.label.toLowerCase();

          return (
            <a
              key={item.label}
              href={item.href}
              className="community-channel-card community-social-card"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={`community-channel-card__glyph community-social-card__glyph--${brand}`}>
                <Icon icon={item.icon} aria-hidden="true" />
              </div>
              <div className="community-channel-card__body">
                <span className="community-channel-card__label">{item.label}</span>
              </div>
              <Icon icon="tabler:arrow-up-right" className="community-channel-card__arrow" aria-hidden="true" />
            </a>
          );
        })}
      </div>
    </section>
  );
}

function CommunityMailingSection() {
  return (
    <section id="community-mailing" className="community-section">
      <SectionHead eyebrow="Stay in the loop" title={mailingList.title}>
        <p>{mailingList.subtitle}</p>
      </SectionHead>
      <div className="community-mailing-grid">
        <article className="community-panel">
          <div className="community-panel__head">
            <span className="community-panel__glyph">
              <Icon icon="tabler:mail-search" aria-hidden="true" />
            </span>
            <h3 className="community-panel__title">{mailingList.browseInfo.title}</h3>
          </div>
          <Markdown text={mailingList.browseInfo.subtitle} styles="community-panel__body" />
          <a
            href="https://lists.podman.io/"
            className="community-btn community-btn--ghost"
            target="_blank"
            rel="noopener noreferrer"
          >
            Browse the archives
            <Icon icon="tabler:arrow-up-right" aria-hidden="true" />
          </a>
        </article>
        <article className="community-panel">
          <div className="community-panel__head">
            <span className="community-panel__glyph">
              <Icon icon="tabler:mail-plus" aria-hidden="true" />
            </span>
            <h3 className="community-panel__title">{mailingList.subscribeInfo.title}</h3>
          </div>
          <div className="community-mailing-options">
            {mailingList.subscribeInfo.options.map((option, index) => (
              <div key={index} className="community-mailing-option">
                <Markdown text={option.subtitle} styles="community-mailing-option__body" />
                <a
                  href={option.button.path}
                  className="community-btn community-btn--ghost"
                  {...(option.button.path.startsWith('http')
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                >
                  {option.button.text}
                  <Icon icon="tabler:arrow-up-right" aria-hidden="true" />
                </a>
              </div>
            ))}
          </div>
          <p className="community-panel__footnote">
            A confirmation email will be sent to you. Once you reply to it, you can post directly to{' '}
            <a href="mailto:podman@lists.podman.io">podman@lists.podman.io</a>.
          </p>
        </article>
      </div>
      <p className="community-mailing-note">
        <Icon icon="tabler:info-circle" aria-hidden="true" />
        {mailingList.extraInfo.note}
      </p>
    </section>
  );
}

function IssueLinkMenu({ label, links }: { label: string; links: { text: string; path: string }[] }) {
  return (
    <details className="community-details">
      <summary className="community-details__summary">{label}</summary>
      <ul className="community-details__list">
        {links.map((link, index) => (
          <li key={index}>
            <a href={link.path} target="_blank" rel="noopener noreferrer">
              {link.text}
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}

function CommunityContributeSection() {
  const issuesIntro = submittingIssues[0];
  const issuesGuide = submittingIssues[1];
  const prGuide = submittingIssues[2];

  return (
    <section id="community-contribute" className="community-section">
      <SectionHead eyebrow="Contribute" title={issuesIntro.title}>
        <Markdown text={issuesIntro.subtitle} />
      </SectionHead>
      <div className="community-contribute-grid">
        <article className="community-panel">
          <div className="community-panel__head">
            <span className="community-panel__glyph">
              <Icon icon="tabler:bug" aria-hidden="true" />
            </span>
            <h3 className="community-panel__title">{issuesGuide.title}</h3>
          </div>
          <p className="community-panel__alert">
            <Icon icon="tabler:shield-lock" aria-hidden="true" />
            {issuesGuide.subtitle}
          </p>
          {issuesGuide.sections.map((section, index) => (
            <div key={index} className="community-issue-block">
              <Markdown text={section.text} styles="community-panel__body" />
              <ul className="community-checklist">
                {section.checkList.map((item, itemIndex) => (
                  <li key={itemIndex}>{item}</li>
                ))}
              </ul>
              <IssueLinkMenu label={section.button.text} links={section.button.links} />
            </div>
          ))}
        </article>
        <article className="community-panel">
          <div className="community-panel__head">
            <span className="community-panel__glyph">
              <Icon icon="tabler:git-pull-request" aria-hidden="true" />
            </span>
            <h3 className="community-panel__title">{prGuide.title}</h3>
          </div>
          <Markdown text={prGuide.subtitle} styles="community-panel__body" />
          {prGuide.description.map((paragraph, index) => (
            <p key={index} className="community-panel__body">
              {paragraph}
            </p>
          ))}
          <ul className="community-checklist">
            {prGuide.checkList.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <a
            href={prGuide.button.path}
            className="community-btn community-btn--primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            {prGuide.button.text}
            <Icon icon="tabler:arrow-up-right" aria-hidden="true" />
          </a>
        </article>
      </div>
    </section>
  );
}

function ContributorsMarquee() {
  // The track is duplicated so the loop is seamless; the copy is hidden from
  // assistive tech and keyboard users.
  return (
    <section className="community-section" aria-label="Contributing organizations">
      <SectionHead eyebrow="Thank you" title="Special thanks to our contributors">
        <p>The Podman community has contributors from many different organizations, including:</p>
      </SectionHead>
      <div className="community-marquee">
        <div className="community-marquee__track">
          {[0, 1].map(copy => (
            <div
              key={copy}
              className="community-marquee__group"
              {...(copy === 1 ? { 'aria-hidden': true } : {})}
            >
              {sponsorData.map((sponsor, index) => (
                <a
                  key={index}
                  href={sponsor.href}
                  className="community-marquee__item"
                  target="_blank"
                  rel="noopener noreferrer"
                  {...(copy === 1 ? { tabIndex: -1 } : {})}
                >
                  <img src={sponsor.src} alt={sponsor.alt} loading="lazy" />
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CommunityPage() {
  return (
    <div className="features-page community-page">
      <div className="features-shell community-shell">
        <CommunityHero />
        <CommunityNav />
        <CommunityChatSection />
        <CommunityMeetingsSection />
        <CommunitySocialsSection />
        <CommunityMailingSection />
        <CommunityContributeSection />
        <ContributorsMarquee />
      </div>
    </div>
  );
}

export default CommunityPage;
