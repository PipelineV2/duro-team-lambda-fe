import { ErrorMessage, Form, Formik, useFormikContext } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { toast } from 'react-hot-toast';
import * as yup from 'yup';

import Button from '@/components/buttons/Button';
import Input from '@/components/input';
import Typography from '@/components/text';

import { SigninApi } from '@/firebase/apis';

import DuroLogo from '~/svg/Duro.svg';
interface LoginFormValues {
  email: string;
  password: string;
}
const LoginPage = () => {
  const router = useRouter();
  const initialValues: LoginFormValues = {
    email: '',
    password: '',
  };
  const { submitForm } = useFormikContext<LoginFormValues>();
  const validationSchema = yup.object({
    email: yup
      .string()
      .email('Invalid email address')
      .required('Email is required'),
    password: yup
      .string()
      .required('Password is required')
      .min(5, 'Password must be at least 5 characters'),
  });

  const handleSubmit = async (values: LoginFormValues) => {
    try {
      const { email, password } = values;
      const result = await SigninApi({ email, password });

      if (result?.status === 200) {
        localStorage.set('token', result.token);
        return router.push('/');
      } else if (result?.status === 404) {
        return toast.error(result?.message || 'Error signing in');
      } else if (result?.status === 401) {
        return toast.error(result?.message || 'Incorect password ');
      } else {
        return toast.error(result?.message || 'Error signing in');
      }
    } catch (error) {
      return toast.error('Error signing in');
    }
  };
  return (
    <main className='h-screen w-screen p-3 '>
      <div className='m-auto w-full max-w-[418px] pt-5 md:pt-20 lg:pt-[105px]'>
        <Link href='/'>
          <DuroLogo className='text-green m-auto mb-4  h-[40px] w-[120px] md:mb-8 lg:mb-16 lg:h-[55px] lg:w-[142px] ' />
        </Link>
        <Typography variant='h3' className='mb-6 text-center'>
          Welcome back
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {' '}
          <Form>
            <div className='mb-8 space-y-4'>
              <Input
                label='Email'
                placeholder='example@workmail.com'
                name='email'
                type='email'
              />
              <ErrorMessage
                name='email'
                component='div'
                className='text-sm text-red-500'
              />

              <Input
                label='Password'
                placeholder=''
                name='password'
                type='password'
              />
              <ErrorMessage
                name='password'
                component='div'
                className='text-sm text-red-500'
              />
              <Link
                href='/forgot-password'
                className='text-green text-sm font-medium leading-5'
              >
                Forgot password?
              </Link>
            </div>
            <Button
              text='Sign in'
              type='submit'
              onClick={submitForm}
              variant='primary'
              size='large'
              isFullwidth
              className='mb-6'
            />{' '}
          </Form>
        </Formik>
      </div>
    </main>
  );
};

export default LoginPage;
