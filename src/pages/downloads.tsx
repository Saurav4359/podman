import React from 'react';
import Layout from '@theme/Layout';
import DownloadsPage from '@site/src/components/content/DownloadsPage';

function Downloads() {
  return (
    <Layout
      title="Downloads"
      description="Download Podman CLI and Podman Desktop for Windows, macOS, and Linux."
    >
      <DownloadsPage />
    </Layout>
  );
}

export default Downloads;
