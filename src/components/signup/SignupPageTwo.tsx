import React from 'react';

import Button from '@/components/buttons/Button';
import Input from '@/components/input';

type Props = {
  goToNextStep: () => void;
};

const userDetails = [
  {
    label: 'First name',
    placeholder: 'First name',
    name: 'firstName',
  },
  {
    label: 'Last name',
    placeholder: 'Last name',
    name: 'lastName',
  },
  {
    label: 'Phone number',
    placeholder: '+234xxxxxxxxxx',
    name: 'Phonenumber',
  },
];

const SignupPageTwo = (props: Props) => {
  const { goToNextStep } = props;
  return (
    <>
      <div className='mb-8 space-y-4'>
        {userDetails.map((item) => {
          const { label, placeholder, name } = item;
          return (
            <Input
              name={name}
              key={label}
              label={label}
              placeholder={placeholder}
              className='mb-2'
            />
          );
        })}
      </div>

      <Button
        text='Next'
        onClick={goToNextStep}
        variant='primary'
        size='large'
        isFullwidth
        className='mb-6'
      >
        Next
      </Button>
    </>
  );
};

export default SignupPageTwo;
