import { Form, Formik, FormikHelpers, FormikProps } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { toast } from 'react-hot-toast';
import * as Yup from 'yup';

import useRedirectToDashboard from '@/hooks/useRedirectToDashboard';

import Button from '@/components/buttons/Button';
import Input from '@/components/input';
import Typography from '@/components/text';

import { SigninApi } from '@/firebase/apis';

import DuroLogo from '~/svg/Duro.svg';

interface Values {
  email: string;
  password: string;
}

export const validationSchema = Yup.object().shape({
  email: Yup.string().required('Email is required').email('Email is invalid'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

const Login = () => {
  const router = useRouter();
  useRedirectToDashboard();
  const submitForm = async (values: Values, actions: FormikHelpers<Values>) => {
    // alert(JSON.stringify(values, null, 2));
    const result = await SigninApi({ ...values });

    actions.setSubmitting(false);

    if (!result?.token) {
      const errorMessage = result?.message.includes('ops')
        ? 'Invalid username or password. Please try again.'
        : result?.message;
      return toast.error(errorMessage || 'error loging in');
    }

    // else successful
    return router.push('/dashboard');
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
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            submitForm(values, actions);
          }}
        >
          {(props: FormikProps<Values>) => (
            <Form>
              <div className='mb-8 space-y-4'>
                <Input
                  label='Email'
                  placeholder='example@workmail.com'
                  name='email'
                  type='email'
                />
                <Input
                  label='Password'
                  placeholder=''
                  name='password'
                  type='password'
                />
                <Link
                  href='/reset-password'
                  className='text-green mt-4 inline-block text-sm font-medium leading-5'
                >
                  Forgot password?
                </Link>
                <Button
                  text='Sign in'
                  onClick={() => props.handleSubmit()}
                  variant='primary'
                  size='large'
                  isFullwidth
                  className='mb-6'
                  type='submit'
                  isLoading={props.isSubmitting}
                />

                <div className='flex items-center justify-center gap-2'>
                  <Typography variant='body3' className='text-gray3 text-sm'>
                    Don't have an account?
                  </Typography>
                  <Link
                    href='/signup'
                    className='text-green text-sm font-medium leading-5'
                  >
                    Create account
                  </Link>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </main>
  );
};

export default Login;
