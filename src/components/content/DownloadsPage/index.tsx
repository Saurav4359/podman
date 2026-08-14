import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import {
  header,
  platforms,
  type DownloadGroup,
  type DownloadLink,
  type OsId,
  type PlatformCard,
  type PrimaryDownload,
  type ProductDownloads,
} from '@site/static/data/downloads';

type DetectedOs = OsId | null;

function detectOs(): DetectedOs {
  if (typeof window === 'undefined') {
    return null;
  }

  const ua = navigator.userAgent.toLowerCase();
  const platform = (navigator.platform || '').toLowerCase();

  if (ua.includes('win') || platform.includes('win')) {
    return 'windows';
  }

  if (ua.includes('mac') || platform.includes('mac')) {
    return 'macos';
  }

  if (ua.includes('linux') || platform.includes('linux') || ua.includes('x11')) {
    return 'linux';
  }

  return null;
}

function isExternalLink(link: DownloadLink | PrimaryDownload) {
  return link.external || link.href.startsWith('http');
}

function filterGroups(groups: DownloadGroup[], primary?: PrimaryDownload): DownloadGroup[] {
  if (!primary) {
    return groups;
  }

  return groups
    .map(group => ({
      ...group,
      links: group.links.filter(link => link.href !== primary.href),
    }))
    .filter(group => group.links.length > 0);
}

function CopyCommand({ command, label }: { command: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="downloads-copy">
      {label ? (
        <span className="downloads-copy__label">{label}</span>
      ) : (
        <Icon icon="material-symbols:terminal-rounded" className="downloads-copy__icon" aria-hidden="true" />
      )}
      <code className="downloads-copy__command">{command}</code>
      <button type="button" className="downloads-copy__button" onClick={handleCopy} aria-label="Copy command">
        <Icon icon={copied ? 'material-symbols:check-rounded' : 'material-symbols:content-copy-rounded'} />
      </button>
    </div>
  );
}

function DownloadGroups({ groups }: { groups: DownloadGroup[] }) {
  if (groups.length === 0) {
    return null;
  }

  return (
    <div className="downloads-groups">
      {groups.map(group => (
        <div key={group.title} className="downloads-group">
          <p className="downloads-group__title">{group.title}</p>
          <ul className="downloads-group__list">
            {group.links.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="downloads-group__link"
                  target={isExternalLink(link) ? '_blank' : undefined}
                  rel={isExternalLink(link) ? 'noopener noreferrer' : undefined}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function ProductBlock({
  product,
  variant,
}: {
  product: ProductDownloads;
  variant: 'desktop' | 'cli';
}) {
  const primaryIsDocs = product.primary?.href.startsWith('/docs');
  const groups = filterGroups(product.groups, product.primary);

  return (
    <div className={`downloads-product-block downloads-product-block--${variant}`}>
      <h3 className="downloads-product-block__title">{product.title}</h3>

      {product.primary && (
        <div className="downloads-primary">
          <a
            href={product.primary.href}
            className="downloads-primary__button"
            target={isExternalLink(product.primary) ? '_blank' : undefined}
            rel={isExternalLink(product.primary) ? 'noopener noreferrer' : undefined}
          >
            <Icon
              icon={primaryIsDocs ? 'fa6-solid:book' : 'material-symbols:download-rounded'}
              aria-hidden="true"
            />
            {product.primary.label}
          </a>
          <p className="downloads-primary__meta">{product.primary.meta}</p>
        </div>
      )}

      <DownloadGroups groups={groups} />

      {product.installHint && (
        <div className="downloads-column__hint">
          <CopyCommand command={product.installHint.command} label={product.installHint.label} />
        </div>
      )}
    </div>
  );
}

function PlatformColumn({ platform, detected }: { platform: PlatformCard; detected: boolean }) {
  return (
    <article className={`downloads-column features-section__panel${detected ? ' downloads-column--detected' : ''}`}>
      <header className="downloads-column__head">
        <div className="downloads-column__title-wrap">
          <Icon icon={platform.icon} className="downloads-column__icon" aria-hidden="true" />
          <h2 className="downloads-column__title">{platform.label}</h2>
        </div>
        <span className={`downloads-column__badge${detected ? '' : ' downloads-column__badge--placeholder'}`}>
          Recommended
        </span>
      </header>

      <div className="downloads-column__divider" aria-hidden="true" />

      <ProductBlock product={platform.desktop} variant="desktop" />

      <div className="downloads-column__divider downloads-column__divider--subtle" aria-hidden="true" />

      <ProductBlock product={platform.cli} variant="cli" />
    </article>
  );
}

function DownloadsPage() {
  const [detectedOs, setDetectedOs] = useState<DetectedOs>(null);

  useEffect(() => {
    setDetectedOs(detectOs());
  }, []);

  return (
    <div className="features-page downloads-page">
      <div className="features-shell">
        <header className="downloads-header">
          <h1 className="downloads-header__title">{header.title}</h1>
          <p className="downloads-header__subtitle">{header.subtitle}</p>
        </header>

        <div className="downloads-grid">
          {platforms.map(platform => (
            <PlatformColumn
              key={platform.id}
              platform={platform}
              detected={platform.id === detectedOs}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default DownloadsPage;
