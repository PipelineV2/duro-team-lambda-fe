// !STARTERCONF You can delete this page
import * as React from 'react';

import logger from '@/lib/logger';

import AvailabilityCard from '@/components/availability-card';
import Button from '@/components/buttons/Button';

import Card from '@/components/card';
import { Chart } from '@/components/chart/Chart';
import Info from '@/components/info';
import Input from '@/components/input';
import Layout from '@/components/layout/Layout';
import Progress from '@/components/progress';
import Select from '@/components/select';
import Seo from '@/components/Seo';
import Status from '@/components/status';
import Table from '@/components/Table';

import { SignupApi } from '@/firebase/apis';

import data from '../utils/data.json';

import ClockIcon from '~/svg/ClockIcon.svg';

export default function ComponentsPage() {
  const handleForm = async () => {
    const data = await SignupApi({
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      businessName: '',
      industry: '',
      employeeSize: '',
      phoneNumber: '',
    });

    logger(data);
  };

  return (
    <Layout>
      <Seo
        templateTitle='Components'
        description='Pre-built components with awesome default'
      />
      <div className='w-full  space-y-3'>
        <Table type='EXTERNAL_QUEUE' data={data} title='Current queue' />
        <Table
          type='INTERNAL_QUEUE'
          data={data}
          hasExport
          title='Current queue'
        />
        <Table
          type='FREQUENT_CUSTOMERS'
          data={data}
          title='Frequent Customers: '
        />
      </div>

      <div className='w-full max-w-[420px] space-y-3'>
        <Button
          size='small'
          variant='secondary'
          onClick={handleForm}
          text='Small Sizes'
        />
        <Card label='Attended to' stat='20 mins' icon={ClockIcon} />
        <div className='h-[200px] w-[400px]'>
          <Chart />
        </div>

        <Button
          size='small'
          variant='secondary'
          onClick={handleForm}
          text='Small Sizes'
        />

        <div className='grid w-[90%] max-w-[420px] gap-2'>
          <Input
            label='Work Email'
            placeholder='Work email'
            error='this is an error'
            type='password'
            name='password'
          />

          <Select
            label='Industry'
            placeholder='Select Work email'
            error='this is an error'
            options={['Banking', 'Dancing']}
          />

          <Progress currentStep={1} totalStep={3} />

          <Info text='Use your work email for smooth integrations and use' />

          {/* <CircularProgress progress={50} /> */}

          {/* <Calendar selectedDate={startdate} onChange={setStartDate} /> */}
        </div>
      </div>

      <Status />

      <AvailabilityCard />
    </Layout>
  );
}
