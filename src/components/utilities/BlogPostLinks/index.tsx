import React from 'react';
import Link from '@docusaurus/Link';
import { Icon } from '@iconify/react';

type BlogPostLinksProps = {
  className?: string;
  layout?: 'inline' | 'buttons';
};

function BlogPostLinks({ className = '', layout = 'inline' }: BlogPostLinksProps) {
  if (layout === 'buttons') {
    return (
      <div className={`flex flex-wrap items-center justify-center gap-3 ${className}`}>
        <a
          href="https://blog.podman.io"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-md border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold !text-purple-700 no-underline transition hover:border-purple-700 dark:border-gray-700 dark:bg-white/[0.03] dark:!text-purple-100 dark:hover:border-purple-100"
        >
          Development Blog
          <Icon icon="tabler:external-link" aria-hidden="true" />
        </a>
        <Link
          to="/blogs"
          className="inline-flex items-center gap-1.5 rounded-md border border-purple-700 bg-purple-700 px-4 py-2.5 text-sm font-semibold !text-white no-underline transition hover:bg-purple-800 dark:border-purple-100 dark:bg-purple-100 dark:!text-purple-900 dark:hover:bg-purple-200"
        >
          Browse blog archive
          <Icon icon="tabler:arrow-right" aria-hidden="true" />
        </Link>
      </div>
    );
  }

  return (
    <p className={`text-center text-base text-gray-500 dark:text-gray-100 ${className}`}>
      Read more on the{' '}
      <a
        href="https://blog.podman.io"
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium !text-purple-700 no-underline hover:underline dark:!text-purple-100"
      >
        Development Blog
      </a>{' '}
      or browse the{' '}
      <Link to="/blogs" className="font-medium !text-purple-700 no-underline hover:underline dark:!text-purple-100">
        on-site archive
      </Link>
      .
    </p>
  );
}

export default BlogPostLinks;
