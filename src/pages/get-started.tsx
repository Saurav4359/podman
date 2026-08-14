import React from 'react';
import Layout from '@theme/Layout';
import GetStartedPage from '@site/src/components/content/GetStartedPage';

function GetStarted() {
  return (
    <Layout
      title="Get Started with Podman"
      description="Install Podman and learn basic container commands — search images, run containers, and get help from the CLI."
    >
      <GetStartedPage />
    </Layout>
  );
}

export default GetStarted;
