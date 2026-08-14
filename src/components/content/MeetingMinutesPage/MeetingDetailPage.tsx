import React, { useRef, useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { matchPath, useLocation } from '@docusaurus/router';
import { Icon } from '@iconify/react';
import NotFound from '@theme/NotFound';
import { getMeetingBySlug } from '@site/static/data/meetings/registry';

function MeetingTypeBadge({ type }: { type: 'community' | 'cabal' }) {
  return (
    <span className={`meeting-badge meeting-badge--${type}`}>
      {type === 'cabal' ? 'Cabal' : 'Community'}
    </span>
  );
}

function MeetingDetailPage() {
  const location = useLocation();
  const match = matchPath(location.pathname, {
    path: '/community/meetings/:slug',
    exact: true,
  });
  const slug = match?.params?.slug;
  const meeting = getMeetingBySlug(slug);
  const contentRef = useRef(null);
  const [copied, setCopied] = useState(false);

  if (!meeting) {
    return <NotFound />;
  }

  const minutesContent = meeting.module.default(contentRef);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <Layout
      title={meeting.title}
      description={`Meeting notes for ${meeting.dateLabel}.`}
    >
      <div className="features-page meeting-minutes-page meeting-minutes-page--detail">
        <div className="features-shell">
          <nav className="meeting-minutes-breadcrumb" aria-label="Breadcrumb">
            <Link to="/community">Community</Link>
            <span aria-hidden="true">/</span>
            <Link to="/community/meetings">Meeting minutes</Link>
            <span aria-hidden="true">/</span>
            <span>{meeting.dateLabel}</span>
          </nav>

          <header className="meeting-minutes-detail__header">
            <div className="meeting-minutes-detail__headline">
              <MeetingTypeBadge type={meeting.type} />
              <h1 className="meeting-minutes-detail__title">{meeting.title}</h1>
              <p className="meeting-minutes-detail__date">{meeting.dateLabel}</p>
            </div>
            <div className="meeting-minutes-detail__actions">
              {meeting.recordingUrl ? (
                <a
                  href={meeting.recordingUrl}
                  className="meeting-minutes-detail__action"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon icon="mdi:youtube" className="meeting-minutes-detail__action-icon meeting-minutes-detail__action-icon--youtube" aria-hidden="true" />
                  Watch recording
                </a>
              ) : null}
              <button type="button" className="meeting-minutes-detail__action meeting-minutes-detail__action--subtle" onClick={handleCopyLink}>
                <Icon icon={copied ? 'material-symbols:check-rounded' : 'material-symbols:link-rounded'} aria-hidden="true" />
                {copied ? 'Link copied' : 'Copy link'}
              </button>
            </div>
          </header>

          <article className="meeting-minutes-detail__content">
            <div className="meeting-minutes-detail__markdown">{minutesContent}</div>
          </article>
        </div>
      </div>
    </Layout>
  );
}

export default MeetingDetailPage;
