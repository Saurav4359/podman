const header = {
  title: 'Podman Features',
  subtitle:
    'Podman is an open source container, pod, and container image management engine. Podman provides the tools you need to build, run, and manage containers, pods, and images — on the command line or with Podman Desktop.',
};

const navigation = [
  { id: 'podman-desktop', label: 'Podman Desktop' },
  { id: 'container-management', label: 'Container Management' },
  { id: 'images', label: 'Images' },
  { id: 'pods', label: 'Pods' },
  { id: 'kubernetes', label: 'Kubernetes' },
  { id: 'command-line', label: 'Command Line' },
  { id: 'learn-more', label: 'Learn More' },
];

const sections = [
  {
    id: 'podman-desktop',
    number: '01',
    label: 'Podman Desktop',
    title: 'A graphical interface for container work.',
    description:
      "Podman Desktop is Podman's graphical application that makes it easy to install and work with Podman (and other container engines) on Windows, MacOS, and Linux.",
    items: [
      {
        title: 'Podman Desktop',
        description:
          "Podman Desktop is Podman's graphical application that makes it easy to install and work with Podman (and other container engines) on Windows, MacOS, and Linux.",
        link: {
          text: 'podman-desktop.io',
          href: 'https://podman-desktop.io',
        },
        image: {
          path: 'logos/optimized/podman-desktop-logo-200w-198h.webp',
          alt: 'Podman Desktop logo',
        },
      },
    ],
    cta: {
      text: 'Download Podman Desktop',
      href: 'https://podman-desktop.io/downloads',
    },
  },
  {
    id: 'container-management',
    number: '02',
    label: 'Container Management',
    title: 'Manage containers (not just Podman.)',
    description:
      "Podman Desktop allows you to list, view, and manage containers from multiple supported container engines in a single unified view.",
    items: [
      {
        title: 'Manage containers (not just Podman.)',
        description:
          'Podman Desktop allows you to list, view, and manage containers from multiple supported container engines in a single unified view. Gain easy access to a shell inside the container, logs, and basic controls.',
        note: 'Supported engines and orchestrators include Podman, Docker, Lima, kind, Red Hat OpenShift, Red Hat OpenShift Developer Sandbox.',
        video: {
          url: 'video/ui/containers.mp4',
          poster: 'images/optimized/ui-screens/ui-manage-containers.webp',
          terminal: {
            windowTitle: 'Podman Desktop',
            frameLabel: 'Containers · UI',
            logs: [
              'Opening Podman Desktop container manager...',
              'Connected engines: Podman, Docker, Lima, kind',
              'Network policy: local machine contexts only',
            ],
            prompt: 'podman ps -a',
          },
        },
      },
    ],
    cta: {
      text: 'Get started with containers',
      href: '/get-started',
    },
  },
  {
    id: 'images',
    number: '03',
    label: 'Images',
    title: 'Build, pull, and push images.',
    description:
      'Build containers from a Containerfile, pull images from remote repositories, and push to the registries you use.',
    items: [
      {
        title: 'Build, pull, and push images.',
        description:
          'Build containers from a Dockerfile / Containerfile, or pull images from remote repositories to run. Manage accounts for and push your images to multiple container registries.',
        video: {
          url: 'video/ui/images.mp4',
          poster: 'images/optimized/ui-screens/ui-buildimage.webp',
          terminal: {
            windowTitle: 'Podman Desktop',
            frameLabel: 'Images · UI',
            logs: [
              'Opening image builder...',
              'Registry accounts: docker.io, quay.io',
              'Ready to build, pull, and push images',
            ],
            prompt: 'podman build -t myapp .',
          },
        },
      },
    ],
    cta: {
      text: 'Image management docs',
      href: 'https://docs.podman.io/en/latest/markdown/podman-image.1.html',
    },
  },
  {
    id: 'pods',
    number: '04',
    label: 'Pods',
    title: 'Podify containers into pods.',
    description:
      'Create pods by selecting containers to run together. View unified logs and inspect the containers inside each pod.',
    items: [
      {
        title: 'Podify containers into pods.',
        description:
          'Create pods by selecting containers to run together. View unified logs for your pods and inspect the containers inside each. Play Kubernetes YAML locally, without Kubernetes, and generate Kubernetes YAML from Pods.',
        video: {
          url: 'video/ui/podify.mp4',
          poster: 'images/optimized/ui-screens/ui-podify.webp',
          terminal: {
            windowTitle: 'Podman Desktop',
            frameLabel: 'Pods · UI',
            logs: [
              'Loading pod view...',
              'Grouping selected containers into a pod',
              'Generating Kubernetes YAML from pod state',
            ],
            prompt: 'podman pod create',
          },
        },
      },
    ],
    cta: {
      text: 'Podman pod documentation',
      href: 'https://docs.podman.io/en/latest/markdown/podman-pod.1.html',
    },
  },
  {
    id: 'kubernetes',
    number: '05',
    label: 'Kubernetes',
    title: 'Deploy to Kubernetes.',
    description:
      'Deploy pods from Podman Desktop to local or remote Kubernetes contexts using automatically-generated YAML config.',
    items: [
      {
        title: 'Deploy to Kubernetes.',
        description:
          'Deploy pods from Podman Desktop to local or remote Kubernetes contexts using automatically-generated YAML config.',
        video: {
          url: 'video/ui/kubernetes.mp4',
          poster: 'images/optimized/ui-screens/ui-k8sdeploy.webp',
          terminal: {
            windowTitle: 'Podman Desktop',
            frameLabel: 'Kubernetes · UI',
            logs: [
              'Connecting to Kubernetes context...',
              'Generating deployment YAML from pod',
              'Deploy target: local or remote cluster',
            ],
            prompt: 'podman kube play deployment.yaml',
          },
        },
      },
    ],
    cta: {
      text: 'Kubernetes integration docs',
      href: 'https://docs.podman.io/en/latest/markdown/podman-kube.1.html',
    },
  },
  {
    id: 'command-line',
    number: '06',
    label: 'Command Line',
    title: 'The full Podman workflow from your terminal.',
    description:
      "Podman's command-line interface allows you to find, run, build, and share containers.",
    items: [
      {
        title: 'Find',
        heading: 'Find and pull down containers no matter where they are.',
        description:
          'Find and pull down containers whether they are on dockerhub.io or quay.io, an internal registry server, or direct from a vendor.',
        commands: ['podman search', 'podman pull'],
        terminalSession: [
          { type: 'command', text: 'podman search busybox' },
          {
            type: 'text',
            text: 'INDEX        NAME                              DESCRIPTION               STARS  OFFICIAL  AUTOMATED',
          },
          {
            type: 'text',
            text: 'docker.io    docker.io/library/busybox         Busybox base image.       1882   [OK]',
          },
          { type: 'blank' },
          {
            type: 'text',
            text: 'docker.io    docker.io/radial/busyboxplus      Full-chain, Internet...   30               [OK]',
          },
          {
            type: 'text',
            text: 'docker.io    docker.io/yauritux/busybox-curl   Busybox with CURL         8',
          },
          { type: 'text', text: '...' },
          { type: 'blank' },
          { type: 'command', text: 'podman run -it docker.io/library/busybox' },
          { type: 'blank' },
          { type: 'text', text: '/ #' },
        ],
      },
      {
        title: 'Run',
        heading: 'Run pre-built application or distro containers.',
        description:
          'Run containers using images pulled from a registry, or from images you build yourself. Podman lets you run containers as a regular user or as root.',
        commands: ['podman run'],
        terminalSession: [
          { type: 'command', text: 'podman --help' },
          { type: 'command', text: 'podman <subcommand> --help' },
        ],
      },
      {
        title: 'Build',
        heading: 'Build container images from a Containerfile.',
        description:
          'Build OCI and Docker-compatible container images using a Containerfile or Dockerfile — no daemon required.',
        commands: ['podman build'],
        terminalSession: [
          { type: 'command', text: 'podman --help' },
          { type: 'command', text: 'podman <subcommand> --help' },
        ],
      },
      {
        title: 'Share',
        heading: "Share the containers you've built.",
        description:
          'Podman lets you push your newly-built containers anywhere you want with a single podman push command.',
        commands: ['podman push'],
        terminalSession: [
          { type: 'command', text: 'podman --help' },
          { type: 'command', text: 'podman <subcommand> --help' },
        ],
      },
    ],
    cta: {
      text: 'Browse CLI documentation',
      href: 'https://docs.podman.io/en/latest/Commands.html',
    },
  },
];

const knowPodman = {
  title: 'Getting to know Podman',
  cards: [
    {
      title: 'Quick dive into Podman',
      description:
        "Hop on over to our [Docs](/docs) and we'll lead you through the basic Podman commands Guide and give you pointers to more learning materials and guides.",
      image: {
        path: 'images/optimized/characters/seal-diving-276w-226h.webp',
        alt: 'A seal diving into the water',
      },
    },
    {
      title: "Join Podman's Community",
      description:
        'Podman has an active chat and mailing list, and regular open community meetings. Users and aspiring contributors are most welcome in all of these venues. Join us!',
      image: {
        path: 'images/optimized/characters/seals-swimming-205w-238h.webp',
        alt: 'A group of seals swimming.',
      },
    },
    {
      title: 'Need some help?',
      description:
        'Check out the [Podman Troubleshooting Guide](https://github.com/containers/podman/blob/main/troubleshooting.md), search our [Documentation](https://docs.podman.io), or file an issue in our [issue tracker](https://github.com/containers/podman/issues).',
      image: {
        path: 'images/optimized/characters/confused-seal-231w-248h.webp',
        alt: 'A confused seal.',
      },
    },
  ],
};

const carouselContent = [
  {
    title: 'Find',
    commands: ['podman search', 'podman pull'],
    subtitle: 'Find and pull down containers no matter what they are',
    description:
      'Find and pull down containers whether they are on dockerhub.io or quay.io, an internal registry server, or direct from a vendor.',
    image: {
      path: 'images/optimized/cli-screens/cli-find-image.webp',
      alt: 'A screenshot of the commandline while using the search and pull commands',
    },
  },
  {
    title: 'Run',
    commands: ['podman run'],
    subtitle: 'Run pre-built application or distro containers.',
    description:
      'Find and pull down containers whether they are on dockerhub.io or quay.io, an internal registry server, or direct from a vendor.',
    image: {
      path: 'images/optimized/cli-screens/cli-run-image.webp',
      alt: 'A screenshot of the commandline while using the run command',
    },
  },
  {
    title: 'Build',
    commands: ['podman build'],
    subtitle: 'Podman Troubleshooting Guide',
    description: 'Creating new layers with small tweaks or major overhauls is easy with podman build',
    image: {
      path: 'images/optimized/cli-screens/cli-build-image.webp',
      alt: 'A screenshot of the commandline while using the build command',
    },
  },
  {
    title: 'Share',
    commands: ['podman push'],
    subtitle: "Share the containers you've built",
    description:
      'Podman lets you push your newly-built containers anywhere you want with a single podman push command.',
    image: {
      path: 'images/optimized/cli-screens/cli-share-image.webp',
      alt: 'A screenshot of the commandline while using the push command',
    },
  },
];

const learnMore = {
  title: 'Want to learn more?',
  resources: {
    title: 'Basic Podman Resources',
    cards: [
      {
        text: 'Installation Instructions',
        path: '#',
        icon: 'fa6-solid:book',
      },
      {
        text: 'Documentation',
        path: 'https://docs.podman.io',
        icon: 'fa6-solid:book',
      },
      {
        text: 'Podman Troubleshooting',
        path: 'https://github.com/containers/podman/blob/main/troubleshooting.md',
        icon: 'fa6-solid:book',
      },
    ],
  },
  blogPosts: {
    title: 'Recent Podman Blog Posts',
  },
};

export { header, navigation, sections, knowPodman, carouselContent, learnMore };
