import React from 'react';
import clsx from 'clsx';

type YouTubeIconProps = {
  className?: string;
};

export default function YouTubeIcon({ className }: YouTubeIconProps) {
  return (
    <svg
      className={clsx('youtube-icon', className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="#FF0000"
        d="M23.5 6.2c-.3-1.1-1.2-2-2.3-2.2C19.3 3.6 12 3.6 12 3.6s-7.3 0-9.2.4C1.7 4.2.8 5.1.5 6.2.1 8.1 0 12 0 12s.1 3.9.5 5.8c.3 1.1 1.2 2 2.3 2.2 1.9.4 9.2.4 9.2.4s7.3 0 9.2-.4c1.1-.2 2-1.1 2.3-2.2.4-1.9.5-5.8.5-5.8s-.1-3.9-.5-5.8z"
      />
      <path fill="#FFFFFF" d="M9.6 15.6 15.8 12 9.6 8.4v7.2z" />
    </svg>
  );
}
