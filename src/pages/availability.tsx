import React from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Typography from '@/components/text';

const Availability = () => {
  return (
    <Layout>
      <Seo
        templateTitle='Availability'
        description='Set Cleints Availability'
      />
      <Typography variant='h1' className='text-grey2 mb-16 '>
        I am unavailable
      </Typography>
    </Layout>
  );
};

export default Availability;
