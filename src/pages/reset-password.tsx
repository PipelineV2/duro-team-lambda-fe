import { Form, Formik, FormikHelpers, FormikProps } from 'formik';
import Link from 'next/link';
import React from 'react';
import { toast } from 'react-hot-toast';
import * as Yup from 'yup';

import useRedirectToDashboard from '@/hooks/useRedirectToDashboard';

import Button from '@/components/buttons/Button';
import Input from '@/components/input';
import Typography from '@/components/text';

import { ResetPasswordApi } from '@/firebase/apis';

import DuroLogo from '~/svg/Duro.svg';

interface Values {
  email: string;
}

export const validationSchema = Yup.object().shape({
  email: Yup.string().required('Email is required').email('Email is invalid'),
});

const SignupPageThree = () => {
  useRedirectToDashboard();

  const submitForm = async (values: Values, actions: FormikHelpers<Values>) => {
    // alert(JSON.stringify(values, null, 2));
    await ResetPasswordApi(values.email);

    actions.setSubmitting(false);

    actions.resetForm();
    // else successful
    toast.success('Password reset successful! ');
    // return router.push('/login');
  };

  return (
    <main className='h-screen w-screen p-3 '>
      <div className='m-auto w-full max-w-[418px] pt-5 md:pt-20 lg:pt-[105px]'>
        <Link href='/'>
          <DuroLogo className='text-green m-auto mb-4  h-[40px] w-[120px] md:mb-8 lg:mb-16 lg:h-[55px] lg:w-[142px] ' />
        </Link>
        <Typography variant='h3' className='mb-6 text-center'>
          Reset Password
        </Typography>
        <Typography variant='body2' className='mb-6 text-center'>
          Please enter your email to initiate resetting your password
        </Typography>
        <Formik
          initialValues={{
            email: '',
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

                <Button
                  text='Reset'
                  onClick={() => props.handleSubmit()}
                  variant='primary'
                  size='large'
                  isFullwidth
                  className='mb-6'
                  type='submit'
                  isLoading={props.isSubmitting}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </main>
  );
};

export default SignupPageThree;
