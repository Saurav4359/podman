import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

function syncColorScheme(theme: string | null) {
  if (theme === 'dark' || theme === 'light') {
    document.documentElement.style.colorScheme = theme;
  }
}

export default (function themeTransitionModule() {
  if (!ExecutionEnvironment.canUseDOM) {
    return;
  }

  syncColorScheme(document.documentElement.getAttribute('data-theme'));

  const observer = new MutationObserver(mutations => {
    for (const mutation of mutations) {
      if (mutation.attributeName === 'data-theme') {
        syncColorScheme(document.documentElement.getAttribute('data-theme'));
      }
    }
  });

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  });
})();
