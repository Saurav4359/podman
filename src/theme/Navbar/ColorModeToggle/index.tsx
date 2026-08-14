import React, { useCallback } from 'react';
import { useColorMode, useThemeConfig } from '@docusaurus/theme-common';
import ColorModeToggle from '@theme/ColorModeToggle';
import type { Props } from '@theme/Navbar/ColorModeToggle';
import styles from './styles.module.css';

type DocumentWithViewTransition = Document & {
  startViewTransition?: (callback: () => void) => { finished: Promise<void> };
};

export default function NavbarColorModeToggle({
  className,
}: Props): JSX.Element | null {
  const navbarStyle = useThemeConfig().navbar.style;
  const disabled = useThemeConfig().colorMode.disableSwitch;
  const { colorMode, setColorMode } = useColorMode();

  const handleChange = useCallback(
    (newMode: 'light' | 'dark') => {
      const applyTheme = () => {
        document.documentElement.setAttribute('data-theme', newMode);
        document.documentElement.style.colorScheme = newMode;
        setColorMode(newMode);
      };

      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches;

      const doc = document as DocumentWithViewTransition;
      if (
        !prefersReducedMotion &&
        typeof doc.startViewTransition === 'function'
      ) {
        doc.startViewTransition(applyTheme);
      } else {
        applyTheme();
      }
    },
    [setColorMode],
  );

  if (disabled) {
    return null;
  }

  return (
    <ColorModeToggle
      className={className}
      buttonClassName={
        navbarStyle === 'dark' ? styles.darkNavbarColorModeToggle : undefined
      }
      value={colorMode}
      onChange={handleChange}
    />
  );
}
