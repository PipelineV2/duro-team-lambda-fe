import { Form, Formik, FormikProps } from 'formik';
import Link from 'next/link';
import React from 'react';
import * as Yup from 'yup';

import Button from '@/components/buttons/Button';
import Info from '@/components/info';
import Input from '@/components/input';
import Typography from '@/components/text/Text';

import { useAuth } from '@/context/auth';

type Props = {
  goToNextStep: () => void;
};

interface Values {
  email: string;
}

export const validationSchema = Yup.object().shape({
  email: Yup.string().required('Email is required').email('Email is invalid'),
});

const SignupPageOne = (props: Props) => {
  const { goToNextStep } = props;
  const { setUserRegistrationDetails } = useAuth();

  const submitForm = async (values: Values) => {
    //  /set the values to context for later retrival
    setUserRegistrationDetails({ ...values });
    goToNextStep();
  };

  return (
    <Formik
      initialValues={{
        email: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        submitForm(values);
      }}
    >
      {(props: FormikProps<Values>) => (
        <Form>
          <Input
            label='Work Email'
            placeholder='adeleke@crystalbank.com'
            className='mb-2'
            name='email'
          />
          <Info
            text='Use your work email for smooth integrations and use'
            className='mb-8'
          />
          <Button
            text='Next'
            onClick={() => props.handleSubmit()}
            variant='primary'
            size='large'
            isFullwidth
            className='mb-6'
          >
            Next
          </Button>
          <div className='flex items-center justify-center gap-6'>
            <Typography variant='secondary' className='text-gray3'>
              Already have an account?
            </Typography>
            <Link
              href='/login'
              className='text-green text-sm font-medium leading-5'
            >
              Login
            </Link>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SignupPageOne;
