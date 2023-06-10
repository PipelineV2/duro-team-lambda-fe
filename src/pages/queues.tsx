import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-hot-toast';

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

  const getQueueData = useCallback(async () => {
    QueueApi(startdate?.toISOString())
      .then((res) => {
        setStatus('SUCCESS');
        setQueueData(res?.queueArray as queueProps[]);
      })
      .catch((err) => {
        setStatus('ERROR');
        toast.error(
          err.message ||
            'Error Fetching data, please check your internet connection'
        );
      });
  }, [startdate]);

  useEffect(() => {
    let mounted = true;
    const getData = async () => {
      getQueueData();
    };
    if (mounted) {
      getData();
    }

    return () => {
      mounted = true;
    };
  }, [getQueueData]);

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
              getQueueData={getQueueData}
              canChangeDate={
                startdate?.toDateString() === new Date().toDateString()
              }
            />
            <Table
              type='INTERNAL_QUEUE'
              data={QueueTable.progress}
              title='In progress'
              hasExport
              getQueueData={getQueueData}
              canChangeDate={
                startdate?.toDateString() === new Date().toDateString()
              }
            />
            <Table
              type='INTERNAL_QUEUE'
              data={QueueTable.done}
              title='Done'
              hasExport
              getQueueData={getQueueData}
              canChangeDate={
                startdate?.toDateString() === new Date().toDateString()
              }
            />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Queues;
