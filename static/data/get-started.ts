const header = {
  eyebrow: 'Getting started',
  title: 'Get Started with Podman',
  subtitle:
    'Podman is a utility provided as part of the libpod library. It can be used to create and maintain containers. The following tutorial will teach you how to set up Podman and perform some basic commands.',
};

const navigation = [
  { id: 'install', label: 'Install' },
  { id: 'resources', label: 'Resources' },
  { id: 'help', label: 'Help' },
  { id: 'images', label: 'Images' },
  { id: 'containers', label: 'Containers' },
];

const install = {
  title: 'First things first: installing Podman',
  description:
    'For installing or building Podman, please see the installation instructions. Once Podman is installed, use the resources below to dive deeper.',
  button: {
    text: 'Installation Instructions',
    path: '/docs/installation',
    icon: 'fa6-solid:book',
  },
};

const gettingStartedResources = {
  title: 'Documentation, community, and support',
  description:
    'Resources to help you get productive with Podman quickly — from docs and community channels to troubleshooting guides.',
  items: [
    {
      title: 'Quick dive into Podman',
      description:
        "Hop on over to our Docs and we'll lead you through the basic Podman commands Guide and give you pointers to more learning materials and guides.",
      link: { text: 'Read the docs', href: '/docs' },
      image: {
        path: 'images/optimized/characters/seal-diving-276w-226h.webp',
        alt: 'A seal diving into the water',
      },
    },
    {
      title: "Join Podman's Community",
      description:
        'Podman has an active chat and mailing list, and regular open community meetings. Users and aspiring contributors are most welcome in all of these venues. Join us!',
      link: { text: 'Join the community', href: '/community' },
      image: {
        path: 'images/optimized/characters/seals-swimming-205w-238h.webp',
        alt: 'A group of seals swimming.',
      },
    },
    {
      title: 'Need some help?',
      description:
        'Check out the Podman Troubleshooting Guide, search our Documentation, or file an issue in our issue tracker.',
      links: [
        {
          text: 'Troubleshooting Guide',
          href: 'https://github.com/containers/podman/blob/main/troubleshooting.md',
        },
        { text: 'Documentation', href: 'https://docs.podman.io' },
        {
          text: 'Issue tracker',
          href: 'https://github.com/containers/podman/issues',
        },
      ],
      image: {
        path: 'images/optimized/characters/confused-seal-231w-248h.webp',
        alt: 'A confused seal.',
      },
    },
  ],
};

const getHelp = {
  title: 'Getting help',
  subtitle: 'Help & manpages',
  description:
    'Podman ships with manpages and built-in help output for every command. Use these when you need quick reference material on the CLI.',
  items: [
    {
      title: 'Read the manpages',
      description: 'For more details, review the manpages:',
      command: '$ man podman\n$ man podman subcommand',
      href: 'https://docs.podman.io/en/latest/Commands.html',
      hrefLabel: 'Browse CLI documentation',
    },
    {
      title: 'Use built-in help',
      description: 'To get help and find out how Podman is working, use the --help flag:',
      command: '$ podman --help # get a list of all commands\n$ podman subcommand --help # get info on a command',
    },
  ],
  footer: {
    text: 'Please also reference the',
    linkText: 'Podman Troubleshooting Guide',
    href: 'https://github.com/containers/podman/blob/main/troubleshooting.md',
    suffix: 'to find known issues and tips on how to solve common configuration mistakes.',
  },
};

const imagesSection = {
  title: 'Searching, pulling, and listing images',
  description: 'Podman can search remote registries, pull images, and list what is stored locally.',
};

const containersSection = {
  title: 'Running a container & listing running containers',
  intro:
    'This sample container will run a very basic httpd server that serves only its index page.',
  steps: [
    {
      title: 'Running a container',
      command: '$ podman run -dt -p 8080:80/tcp docker.io/library/httpd',
      note:
        'Because the container is being run in detached mode, represented by the -d in the podman run command, Podman will run the container in the background and print the container ID after it has executed the command. The -t also adds a pseudo-tty to run arbitrary commands in an interactive shell.\n\nAlso, we use port forwarding to be able to access the HTTP server. For successful running at least slirp4netns v0.3.0 is needed.',
    },
    {
      title: 'Listing running containers',
      description: 'The podman ps command is used to list created and running containers.',
      command:
        '$ podman ps\nCONTAINER ID  IMAGE                           COMMAND           CREATED       STATUS      PORTS                 NAMES\n01c44968199f  docker.io/library/httpd:latest  httpd-foreground  1 minute ago  Up 1 minute 0.0.0.0:8080->80/tcp  laughing_bob',
      note: 'If you add -a to the podman ps command, Podman will show all containers (created, exited, running, etc.).',
    },
    {
      title: 'Testing the httpd container',
      description:
        'As you are able to see, the container does not have an IP Address assigned. The container is reachable via its published port on your local machine.',
      commands: [
        '$ curl http://localhost:8080',
        '$ curl http://<IP_Address>:8080',
      ],
      note: 'From another machine, you need to use the IP Address of the host, running the container.\n\nInstead of using curl, you can also point a browser to http://localhost:8080.',
    },
  ],
};

export {
  header,
  navigation,
  install,
  gettingStartedResources,
  getHelp,
  imagesSection,
  containersSection,
};
