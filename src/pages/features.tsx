import React from 'react';
import Layout from '@theme/Layout';
import FeaturesPage from '@site/src/components/content/FeaturesPage';
import ColoringBookSection from '@site/src/components/content/ColoringBookSection';

function Features() {
  return (
    <Layout title="Podman Features" description="Explore Podman features for containers, pods, images, and Kubernetes.">
      <FeaturesPage />
      <ColoringBookSection />
    </Layout>
  );
}

export default Features;
