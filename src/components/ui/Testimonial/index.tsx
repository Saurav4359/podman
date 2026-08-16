import React, { useState } from 'react';
import { Icon } from '@iconify/react';

type TestimonialProps = {
  name: string;
  handle: string;
  description: string;
  social: string;
  path: string;
  date: string;
  avatar: string;
  featuredlink?: string;
};

function TestimonialAvatar({ src, name }: { src: string; name: string }) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gray-100 dark:bg-white/10"
        aria-hidden="true"
      >
        <Icon icon="tabler:user" className="text-3xl text-gray-500 dark:text-gray-300" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={`${name} avatar`}
      className="h-16 w-16 shrink-0 rounded-full object-cover"
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
    />
  );
}

function Testimonial(props: TestimonialProps) {
  return (
    <article className="mx-2 my-4 flex max-w-sm flex-col rounded-md border border-gray-200 bg-white p-4 shadow-lg dark:border-gray-700 dark:bg-white/[0.04] dark:shadow-none">
      <div className="mb-4 flex items-center gap-3">
        <div className="order-first">
          <TestimonialAvatar src={props.avatar} name={props.name} />
        </div>
        <div className="m-2 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-50">{props.name}</h3>
            <Icon icon={`logos:${props.social}`} className="text-2xl" />
          </div>
          <a
            href={props.path}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-500 no-underline hover:text-purple-700 dark:text-gray-100 dark:hover:text-purple-100"
          >
            {props.handle}
          </a>
        </div>
      </div>
      <div className="mb-4 mt-2">
        <p className="mb-2 whitespace-normal leading-snug text-gray-700 dark:text-gray-100">{props.description}</p>
        {props.featuredlink && (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={props.featuredlink}
            className="text-sm text-purple-700 no-underline hover:text-purple-900 dark:text-purple-400 dark:hover:text-purple-500"
          >
            {props.featuredlink}
          </a>
        )}
      </div>
      <div className="mt-auto self-start text-sm italic text-gray-500 dark:text-gray-300">
        <a
          href={props.path}
          target="_blank"
          rel="noopener noreferrer"
          className="text-inherit no-underline hover:text-purple-700 dark:hover:text-purple-500"
        >
          {props.date}
        </a>
      </div>
    </article>
  );
}

export default Testimonial;
