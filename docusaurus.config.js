// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Podman',
  tagline:
    'Podman is a daemonless container engine for developing, managing, and running OCI Containers on your Linux System',
  url: 'https://podman.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'favicon.ico',
  trailingSlash: false,
  deploymentBranch: 'gh-pages',
  organizationName: 'containers',
  projectName: 'containers.github.io',
  clientModules: [require.resolve('./src/clientModules/themeTransition.ts')],
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  plugins: [
    '@docusaurus/theme-live-codeblock',
    async function tailwindPlugin() {
      return {
        name: 'docusaurus-tailwindcss',
        configurePostCss(postcssOptions) {
          postcssOptions.plugins.push(require('tailwindcss'));
          postcssOptions.plugins.push(require('autoprefixer'));
          return postcssOptions;
        },
      };
    },
    ['@docusaurus/plugin-content-blog',
      {
        showReadingTime: true,
        routeBasePath: 'release',
        id: 'release-anouncements',
        path: './release',
      },
    ],
    require.resolve('./plugins/meeting-routes-plugin.js'),
  ],
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          path: 'docs',
          editUrl: 'https://github.com/containers/podman.io/tree/main',
        },
        blog: {
          showReadingTime: true,
          routeBasePath: 'blogs',
          blogTitle: 'Podman Blog',
          blogDescription: 'Release notes, tutorials, and updates from the Podman project.',
        },
        theme: {
          customCss: require.resolve('./src/css/main.css'),
        },
      }),
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: false,
      },
      navbar: {
        hideOnScroll: false,

        title: 'Podman',
        logo: {
          alt: 'Podman Logo',
          src: 'logos/optimized/podman-3-logo-266w-253h.webp',
        },
        items: [
          { to: 'features', label: 'Features', position: 'right' },
          { to: 'get-started', label: 'Get Started', position: 'right' },
          { to: 'community', label: 'Community', position: 'right' },
          { to: 'downloads', label: 'Downloads', position: 'right' },
          { to: 'blogs', label: 'Blog', position: 'right', activeBasePath: 'blogs' },
          {
            type: 'doc',
            docId: 'podman',
            label: 'Documentation',
            position: 'right',
          },

          {
            href: 'https://github.com/containers/',
            target: '_blank',
            rel: 'noopener noreferrer',
            'aria-label': 'GitHub',
            position: 'right',
            className: 'navbar__github-link',
          },
        ],
      },
      footer: {
        style: 'dark',
        copyright: `Copyright © ${new Date().getFullYear()} Podman Container Tools.`,
      },

      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      liveCodeBlock: {
        playgroundPosition: 'bottom',
      },
    }),
};

module.exports = config;
