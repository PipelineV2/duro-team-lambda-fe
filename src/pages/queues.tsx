import React, { useMemo, useState } from 'react';

import Calendar from '@/components/calendar';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Table from '@/components/Table';

import data from '../utils/data.json';

const Queues = () => {
  const [startdate, setStartDate] = useState<Date | null>(new Date());

  const testQueue = useMemo(() => {
    const current = data.map((item) => ({ ...item, status: '0' }));
    const progress = data.map((item) => ({ ...item, status: '1' }));
    const done = data.map((item) => ({ ...item, status: '2' }));
    return { current, progress, done };
  }, []);

  return (
    <Layout>
      <Seo templateTitle='Dashboard' description='Dashboard Statistics' />
      <div className='pt-8'>
        <Calendar selectedDate={startdate} onChange={setStartDate} />
        <div className='space-y-8 overflow-hidden py-5'>
          <Table
            type='INTERNAL_QUEUE'
            data={testQueue.current}
            title='Current queue'
            hasExport
          />
          <Table
            type='INTERNAL_QUEUE'
            data={testQueue.progress}
            title='In progress'
            hasExport
          />
          <Table
            type='INTERNAL_QUEUE'
            data={testQueue.done}
            title='Done'
            hasExport
          />
        </div>
      </div>
    </Layout>
  );
};

export default Queues;
