import {
  LATEST_DESKTOP_VERSION,
  LATEST_VERSION,
} from '@site/static/data/global';

export type OsId = 'windows' | 'macos' | 'linux';

export type DownloadLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type DownloadGroup = {
  title: string;
  links: DownloadLink[];
};

export type PrimaryDownload = {
  label: string;
  href: string;
  meta: string;
  external?: boolean;
};

export type ProductDownloads = {
  title: string;
  primary?: PrimaryDownload;
  groups: DownloadGroup[];
  installHint?: {
    label: string;
    command: string;
  };
};

export type PlatformCard = {
  id: OsId;
  label: string;
  icon: string;
  desktop: ProductDownloads;
  cli: ProductDownloads;
};

const desktopBase = `https://github.com/podman-desktop/podman-desktop/releases/download/v${LATEST_DESKTOP_VERSION}`;
const cliBase = `https://github.com/containers/podman/releases/download/v${LATEST_VERSION}`;

const header = {
  title: 'Downloads',
  subtitle: 'Get Podman Desktop and the Podman CLI for your platform.',
};

const platforms: PlatformCard[] = [
  {
    id: 'windows',
    label: 'Windows',
    icon: 'fa-brands:windows',
    desktop: {
      title: 'Podman Desktop',
      primary: {
        label: 'Download Now',
        href: `${desktopBase}/podman-desktop-${LATEST_DESKTOP_VERSION}-setup.exe`,
        meta: `v${LATEST_DESKTOP_VERSION} · x64`,
        external: true,
      },
      groups: [
        {
          title: 'Other installers',
          links: [
            { label: 'arm64', href: `${desktopBase}/podman-desktop-${LATEST_DESKTOP_VERSION}-setup-arm64.exe`, external: true },
          ],
        },
        {
          title: 'Portable',
          links: [
            { label: 'x64', href: `${desktopBase}/podman-desktop-${LATEST_DESKTOP_VERSION}-x64.exe`, external: true },
            { label: 'arm64', href: `${desktopBase}/podman-desktop-${LATEST_DESKTOP_VERSION}-arm64.exe`, external: true },
          ],
        },
      ],
      installHint: {
        label: 'winget',
        command: 'winget install -e --id RedHat.Podman-Desktop',
      },
    },
    cli: {
      title: 'Podman CLI',
      primary: {
        label: 'Download Now',
        href: `${cliBase}/podman-installer-windows-amd64.msi`,
        meta: `v${LATEST_VERSION} · amd64`,
        external: true,
      },
      groups: [
        {
          title: 'Other installers',
          links: [
            { label: 'arm64', href: `${cliBase}/podman-installer-windows-arm64.msi`, external: true },
          ],
        },
      ],
    },
  },
  {
    id: 'macos',
    label: 'macOS',
    icon: 'fa-brands:apple',
    desktop: {
      title: 'Podman Desktop',
      primary: {
        label: 'Download Now',
        href: `${desktopBase}/podman-desktop-${LATEST_DESKTOP_VERSION}-universal.dmg`,
        meta: `Universal · v${LATEST_DESKTOP_VERSION}`,
        external: true,
      },
      groups: [
        {
          title: 'Other downloads',
          links: [
            { label: 'Intel', href: `${desktopBase}/podman-desktop-${LATEST_DESKTOP_VERSION}-x64.dmg`, external: true },
            { label: 'Apple silicon', href: `${desktopBase}/podman-desktop-${LATEST_DESKTOP_VERSION}-arm64.dmg`, external: true },
          ],
        },
      ],
      installHint: {
        label: 'Homebrew',
        command: 'brew install --cask podman-desktop',
      },
    },
    cli: {
      title: 'Podman CLI',
      primary: {
        label: 'Download Now',
        href: `${cliBase}/podman-installer-macos-arm64.pkg`,
        meta: `v${LATEST_VERSION} · arm64`,
        external: true,
      },
      groups: [],
    },
  },
  {
    id: 'linux',
    label: 'Linux',
    icon: 'fa-brands:linux',
    desktop: {
      title: 'Podman Desktop',
      primary: {
        label: 'Download Now',
        href: `${desktopBase}/podman-desktop-${LATEST_DESKTOP_VERSION}.flatpak`,
        meta: `Flatpak · v${LATEST_DESKTOP_VERSION}`,
        external: true,
      },
      groups: [
        {
          title: 'Other downloads',
          links: [
            { label: 'AMD64 tar.gz', href: `${desktopBase}/podman-desktop-${LATEST_DESKTOP_VERSION}-x64.tar.gz`, external: true },
            { label: 'ARM64 tar.gz', href: `${desktopBase}/podman-desktop-${LATEST_DESKTOP_VERSION}-arm64.tar.gz`, external: true },
          ],
        },
      ],
      installHint: {
        label: 'Flatpak',
        command: 'flatpak install flathub io.podman_desktop.PodmanDesktop',
      },
    },
    cli: {
      title: 'Podman CLI',
      primary: {
        label: 'Installation guide',
        href: '/docs/installation#installing-on-linux',
        meta: `v${LATEST_VERSION} · package managers`,
      },
      groups: [],
    },
  },
];

export { header, platforms };
