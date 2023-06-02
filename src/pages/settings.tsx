import React from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Typography from '@/components/text';

const Settings = () => {
  return (
    <Layout>
      <Seo templateTitle='Settings' description='Set Cleints Settings' />
      <Typography variant='h1' className='text-grey2 mb-16 '>
        I am the indaboski
      </Typography>
    </Layout>
  );
};

export default Settings;
