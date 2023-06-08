import React, { useEffect, useState } from 'react';

import logger from '@/lib/logger';

import Card from '@/components/card';
import { Chart } from '@/components/chart/Chart';
import CircularProgress from '@/components/circular-progress';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Table from '@/components/Table';
import Typography from '@/components/text';

import { DashboardApi } from '@/firebase/apis';

import data from '../utils/data.json';

import ClockIcon from '~/svg/ClockIcon.svg';

const databaseData = [
  {
    id: 1,
    title: 'Queue length',
    stat: 52,
  },
  {
    id: 2,
    title: 'Attended to',
    stat: 10,
  },
  {
    id: 3,
    title: 'Left queue',
    stat: 0,
  },
  {
    id: 4,
    title: 'Waiting time',
    stat: 20,
  },
];

const Dashboard = () => {
  // eslint-disable-next-line unused-imports/no-unused-vars
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    const getData = async () => {
      setIsLoading(true);
      DashboardApi()
        .then((res) => {
          setIsLoading(false);
          logger(res);
        })
        .catch((err) => {
          setIsLoading(false);
          logger(err);
        });
    };
    if (mounted) {
      getData();
    }

    return () => {
      mounted = true;
    };
  }, []);

  return (
    <Layout>
      <Seo templateTitle='Dashboard' description='Dashboard Statistics' />
      <div className='space-y-8 overflow-hidden py-5'>
        <div className='grid  grid-flow-row grid-cols-1 items-center justify-center gap-4 md:grid-cols-2 lg:grid-cols-4'>
          {databaseData.map((item) => {
            const { id, title, stat } = item;
            return (
              <Card
                key={id}
                label={title}
                stat={stat}
                icon={title.includes('time') && ClockIcon}
              />
            );
          })}
        </div>
        <div className='flex grid-cols-1 flex-col gap-6 md:grid md:grid-cols-2 lg:md:grid-cols-3'>
          <div className='shadow-s2 col-span-3 rounded-lg bg-white p-8 pb-16 lg:col-span-1 '>
            <Typography variant='body2' className='text-grey2 mb-16 '>
              Queue progress
            </Typography>
            <div className='grid place-items-center'>
              <CircularProgress progress={50} />
            </div>
          </div>

          <div className='shadow-s2 col-span-1 hidden rounded-lg bg-white p-6 pb-8 lg:col-span-2 lg:grid '>
            <Typography variant='body2' className='text-grey2 mb-8 '>
              Total visits
            </Typography>
            <div className='m-auto grid place-items-center lg:w-[500px]'>
              <Chart />
            </div>
          </div>
        </div>

        <div className=''>
          <Table
            type='FREQUENT_CUSTOMERS'
            data={data}
            title='Frequent Customers: '
          />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
