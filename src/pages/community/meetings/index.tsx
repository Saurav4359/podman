import React from 'react';
import Layout from '@theme/Layout';
import MeetingMinutesArchive from '@site/src/components/content/MeetingMinutesPage/MeetingMinutesArchive';

function MeetingMinutesIndexPage() {
  return (
    <Layout
      title="Meeting Minutes"
      description="Archive of Podman community and cabal meeting notes with shareable pages for each meeting."
    >
      <MeetingMinutesArchive />
    </Layout>
  );
}

export default MeetingMinutesIndexPage;
