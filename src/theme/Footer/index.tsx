import React, { useRef } from 'react';
import Link from '@docusaurus/Link';
import { Icon } from '@iconify/react';
import {
  footerBrand,
  footerCommunityLinks,
  footerDocsLinks,
  footerLegalLinks,
  footerProjectLinks,
  footerSocial,
} from '@site/static/data/footer';

type FooterSocialItem = {
  label: string;
  href: string;
  icon: string;
  tone?: 'light';
  brand?: string;
};

type FooterLinkItem = {
  label: string;
  to?: string;
  href?: string;
  icon?: string;
};

function FooterNavLink({ label, to, href, icon }: FooterLinkItem) {
  const content = (
    <>
      {icon && <Icon icon={icon} className="site-footer__link-brand-icon" aria-hidden="true" />}
      {label}
      {!icon && href && (
        <Icon icon="tabler:external-link" className="site-footer__link-icon" aria-hidden="true" />
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} className="site-footer__link">
        {content}
      </Link>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="site-footer__link site-footer__link--external">
      {content}
    </a>
  );
}

function FooterColumn({ title, links }: { title: string; links: FooterLinkItem[] }) {
  return (
    <div className="site-footer__column">
      <h3 className="site-footer__column-title">{title}</h3>
      <ul className="site-footer__link-list">
        {links.map(link => (
          <li key={link.label}>
            <FooterNavLink {...link} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const footer = footerRef.current;
    const grid = gridRef.current;
    if (!footer || !grid) {
      return;
    }

    const rect = footer.getBoundingClientRect();
    grid.style.setProperty('--hover-x', `${event.clientX - rect.left}px`);
    grid.style.setProperty('--hover-y', `${event.clientY - rect.top}px`);
  };

  const handleMouseEnter = () => {
    gridRef.current?.classList.add('is-active');
  };

  const handleMouseLeave = () => {
    gridRef.current?.classList.remove('is-active');
  };

  return (
    <footer
      ref={footerRef}
      className="footer site-footer"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={gridRef} className="site-footer__hover-grid" aria-hidden="true" />

      <div className="site-footer__inner">
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <Link to="/" className="site-footer__brand-link">
              <img
                src={footerBrand.logo.src}
                alt={footerBrand.logo.alt}
                className="site-footer__logo"
                width={40}
                height={40}
              />
              <span className="site-footer__brand-name">Podman</span>
            </Link>
            <p className="site-footer__tagline">{footerBrand.tagline}</p>
            <div className="site-footer__social">
              {footerSocial.map(item => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={[
                    'site-footer__social-btn',
                    item.tone === 'light' ? 'site-footer__social-btn--light' : '',
                    item.brand ? `site-footer__social-btn--${item.brand}` : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  aria-label={item.label}
                >
                  <Icon icon={item.icon} className="site-footer__social-icon" />
                </a>
              ))}
            </div>
          </div>

          <div className="site-footer__columns">
            <FooterColumn title="Docs" links={footerDocsLinks} />
            <FooterColumn title="Community" links={footerCommunityLinks} />
            <FooterColumn title="Projects" links={footerProjectLinks} />
          </div>
        </div>

        <div className="site-footer__bottom">
          <p className="site-footer__copyright">
            © {year} Podman Container Tools, a Series of LF Projects, LLC.
          </p>
          <nav className="site-footer__legal-nav" aria-label="Legal">
            {footerLegalLinks.map((link, index) => (
              <React.Fragment key={link.label}>
                {index > 0 && <span className="site-footer__legal-sep" aria-hidden="true">·</span>}
                <a href={link.href} target="_blank" rel="noopener noreferrer" className="site-footer__legal-link">
                  {link.label}
                </a>
              </React.Fragment>
            ))}
          </nav>
        </div>
      </div>

      <div className="site-footer__watermark" aria-hidden="true">
        <div className="site-footer__watermark-text">
          {'Podman'.split('').map((char, index) => (
            <span key={`${char}-${index}`} className="site-footer__watermark-letter">
              {char}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
