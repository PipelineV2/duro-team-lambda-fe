import React, { useEffect, useMemo, useState } from 'react';

import logger from '@/lib/logger';

import Calendar from '@/components/calendar';
import FullPageLoader from '@/components/full-page-loader';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Table from '@/components/Table';

import { QueueApi } from '@/firebase/apis';
import { Tstatus } from '@/pages/dashboard';
import { queueProps } from '@/utils/types';

const Queues = () => {
  const [startdate, setStartDate] = useState<Date | null>(new Date());
  const [status, setStatus] = useState<Tstatus>('LOADING');
  const [queueData, setQueueData] = useState([] as queueProps[]);

  useEffect(() => {
    let mounted = true;
    const getData = async () => {
      QueueApi(startdate?.toISOString())
        .then((res) => {
          setStatus('SUCCESS');
          // setDashboardData(res.data as TQueue);
          setQueueData(res?.queueArray as queueProps[]);
          logger(res);
        })
        .catch((err) => {
          setStatus('ERROR');
          logger(err);
        });
    };
    if (mounted) {
      getData();
    }

    return () => {
      mounted = true;
    };
  }, [startdate]);

  const QueueTable = useMemo(() => {
    const current = queueData.filter((item) => item.status === 0);
    const progress = queueData.filter((item) => item.status === 1);
    const done = queueData.filter((item) => item.status === 2);
    return { current, progress, done };
  }, [queueData]);

  return (
    <Layout>
      <Seo templateTitle='Dashboard' description='Dashboard Statistics' />
      <div className='pt-8'>
        <Calendar selectedDate={startdate} onChange={setStartDate} />
        {status === 'LOADING' && <FullPageLoader />}
        {status === 'SUCCESS' && (
          <div className='space-y-8 overflow-hidden py-5'>
            <Table
              type='INTERNAL_QUEUE'
              data={QueueTable.current}
              title='Current queue'
              hasExport
            />
            <Table
              type='INTERNAL_QUEUE'
              data={QueueTable.progress}
              title='In progress'
              hasExport
            />
            <Table
              type='INTERNAL_QUEUE'
              data={QueueTable.done}
              title='Done'
              hasExport
            />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Queues;
