const fs = require('fs');
const path = require('path');

function getMeetingSlugs() {
  const notesDir = path.join(__dirname, '../static/data/meetings/notes');

  return fs
    .readdirSync(notesDir, { withFileTypes: true })
    .filter(entry => entry.isDirectory() && /^\d{4}-\d{2}-\d{2}$/.test(entry.name))
    .map(entry => entry.name)
    .sort((a, b) => b.localeCompare(a));
}

/** @param {import('@docusaurus/types').LoadContext} context */
module.exports = function meetingRoutesPlugin() {
  return {
    name: 'docusaurus-meeting-routes-plugin',
    async contentLoaded({ actions }) {
      const { addRoute } = actions;
      const component = '@site/src/components/content/MeetingMinutesPage/MeetingDetailPage.tsx';

      for (const slug of getMeetingSlugs()) {
        addRoute({
          path: `/community/meetings/${slug}`,
          component,
          exact: true,
        });
      }
    },
  };
};
