import React from 'react';
import Layout from '@theme/Layout';
import CommunityPage from '@site/src/components/content/CommunityPage';

function Community() {
  return (
    <Layout
      title="Community"
      description="Chat, meetings, mailing list, and contribution paths for the Podman community."
    >
      <CommunityPage />
    </Layout>
  );
}

export default Community;
