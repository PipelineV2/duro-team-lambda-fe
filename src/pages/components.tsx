// !STARTERCONF You can delete this page
import * as React from 'react';

import logger from '@/lib/logger';

import Button from '@/components/buttons';
import Calendar from '@/components/calendar';
import Card from '@/components/card';

import { Chart } from '@/components/chart/Chart';

import CircularProgress from '@/components/circular-progress';
import Info from '@/components/info';
import Input from '@/components/input';
import Layout from '@/components/layout/Layout';
import Progress from '@/components/progress';
import Select from '@/components/select';
import Seo from '@/components/Seo';

import { SignupApi } from '@/firebase/apis';

import ClockIcon from '~/svg/ClockIcon.svg';

export default function ComponentsPage() {
  const [startdate, setStartDate] = React.useState<Date | null>(new Date());

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

        <CircularProgress progress={50} />

        <Calendar selectedDate={startdate} onChange={setStartDate} />
      </div>
    </Layout>
  );
}
