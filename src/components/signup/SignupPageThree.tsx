import React from 'react';

import Button from '@/components/buttons/Button';
import Input from '@/components/input';
import Select from '@/components/select';

const industries = [
  { label: 'Healthcare', value: 'healthcare' },
  { label: 'Salons and Spas', value: 'salons_spas' },
  { label: 'Professional Services', value: 'professional_services' },
  { label: 'Fitness and Wellness', value: 'fitness_wellness' },
  { label: 'Education and Tutoring', value: 'education_tutoring' },
  { label: 'Automotive Services', value: 'automotive_services' },
  { label: 'Beauty and Aesthetics', value: 'beauty_aesthetics' },
  { label: 'Legal Services', value: 'legal_services' },
  { label: 'Government Services', value: 'government_services' },
  { label: 'Pet Care', value: 'pet_care' },
  { label: 'Hospitality and Tourism', value: 'hospitality_tourism' },
  { label: 'Real Estate', value: 'real_estate' },
  { label: 'Retail and E-commerce', value: 'retail_ecommerce' },
  { label: 'Food and Beverage', value: 'food_beverage' },
  { label: 'Event Management', value: 'event_management' },
];

const industrySize = [
  '1 - 50',
  '51-200',
  '201-500',
  '501-1000',
  '1001-5000',
  '5001-10,000',
  '10,001+',
];

const SignupPageThree = () => {
  return (
    <>
      <div className='mb-8 space-y-4'>
        <Input
          label='Business name'
          placeholder='Business name'
          name='businessName'
        />
        <Select
          label='Industry'
          placeholder='Select Industy'
          options={industries}
          name='industry'
        />
        <Select
          label='Employee Size'
          placeholder='Select Employee Size'
          options={industrySize}
          name='employeeSize'
        />
        <Input
          label='Password'
          placeholder=''
          name='password'
          type='password'
        />
      </div>
      <Button
        text='Next'
        onClick={() => undefined}
        variant='primary'
        size='large'
        isFullwidth
        className='mb-6'
      >
        Finish
      </Button>
    </>
  );
};

export default SignupPageThree;
