import React from 'react';

import AvailabilityCard from '@/components/availability-card';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Status from '@/components/status';

const Availability = () => {
  return (
    <Layout>
      <Seo
        templateTitle='Availability'
        description='Set Cleints Availability'
      />
      <Status />
      <AvailabilityCard />
    </Layout>
  );
};

export default Availability;
