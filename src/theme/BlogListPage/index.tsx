import React from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {
  PageMetadata,
  HtmlClassNameProvider,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import BlogLayout from '@theme/BlogLayout';
import BlogListPaginator from '@theme/BlogListPaginator';
import SearchMetadata from '@theme/SearchMetadata';
import BlogPostItems from '@theme/BlogPostItems';
import type { Props } from '@theme/BlogListPage';

function BlogListPageMetadata({ metadata }: Pick<Props, 'metadata'>) {
  const {
    siteConfig: { title: siteTitle },
  } = useDocusaurusContext();
  const { blogDescription, blogTitle, permalink } = metadata;
  const isBlogOnlyMode = permalink === '/';
  const title = isBlogOnlyMode ? siteTitle : blogTitle;

  return (
    <>
      <PageMetadata title={title} description={blogDescription} />
      <SearchMetadata tag="blog_posts_list" />
    </>
  );
}

function BlogListPageContent({ metadata, items, sidebar }: Pick<Props, 'metadata' | 'items' | 'sidebar'>) {
  return (
    <BlogLayout sidebar={sidebar}>
      <header className="blog-list-header">
        <h1 className="blog-list-header__title">{metadata.blogTitle}</h1>
        {metadata.blogDescription ? (
          <p className="blog-list-header__subtitle">{metadata.blogDescription}</p>
        ) : null}
      </header>
      <BlogPostItems items={items} />
      <BlogListPaginator metadata={metadata} />
    </BlogLayout>
  );
}

export default function BlogListPage(props: Props): JSX.Element {
  return (
    <HtmlClassNameProvider
      className={clsx(ThemeClassNames.wrapper.blogPages, ThemeClassNames.page.blogListPage)}>
      <BlogListPageMetadata metadata={props.metadata} />
      <BlogListPageContent metadata={props.metadata} items={props.items} sidebar={props.sidebar} />
    </HtmlClassNameProvider>
  );
}
