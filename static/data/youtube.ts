export type YouTubeVideo = {
  id: string;
  title: string;
  description: string;
  duration: string;
};

export type YouTubeChannel = {
  label: string;
  href?: string;
  to?: string;
};

export const youtubeSection = {
  eyebrow: 'Watch & Learn',
  title: 'Latest from Podman on YouTube',
  subtitle: 'Tutorials, community meetings, and demos from the Podman team.',
  channels: [
    {
      label: 'Podman Desktop',
      href: 'https://www.youtube.com/@podmandesktop-rh',
    },
    {
      label: 'Community meetings',
      to: '/community/meetings',
    },
  ] satisfies YouTubeChannel[],
  videos: [
    {
      id: '2GKZa1WJnz4',
      title: 'How to Get Started with Podman Desktop',
      description:
        'Walk through building, running, and deploying containerized apps with Podman Desktop.',
      duration: '16 min',
    },
    {
      id: 'W3cWHSrQnEQ',
      title: 'Podman Community Meeting — August 2026',
      description: 'Monthly community sync covering releases, roadmap, and contributor updates.',
      duration: '58 min',
    },
    {
      id: 'ZIkOorf_08I',
      title: 'Podman Desktop Community Meeting',
      description: 'Desktop team demo of new features, workflows, and extension updates.',
      duration: '45 min',
    },
    {
      id: 'wm8IB0GcAso',
      title: 'Podman 6.0 Community Meeting',
      description: 'Deep dive into Podman 6.0 changes, migration notes, and Q&A.',
      duration: '52 min',
    },
  ] satisfies YouTubeVideo[],
};
