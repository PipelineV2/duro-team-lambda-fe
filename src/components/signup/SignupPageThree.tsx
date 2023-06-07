import { Form, Formik, FormikHelpers, FormikProps } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import { toast } from 'react-hot-toast';
import * as Yup from 'yup';

import Button from '@/components/buttons/Button';
import Input from '@/components/input';
import Select from '@/components/select';

import { useAuth } from '@/context/auth';
import { SignupApi } from '@/firebase/apis';
import { signupProps } from '@/utils/types';

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

interface Values {
  businessName: string;
  industry: string;
  employeeSize: string;
  password: string;
}

export const validationSchema = Yup.object().shape({
  businessName: Yup.string()
    .required('Business name is required')
    .trim('Business name cannot be empty'),
  industry: Yup.string()
    .required('industry is required')
    .trim('industry cannot be empty'),
  employeeSize: Yup.string().required('employee Size is required'),
  password: Yup.string()
    .required('Password is required')
    .min(5, 'Password must be at least 5 characters'),
});

const SignupPageThree = () => {
  const { userRegistrationDetails, clearRegistrationDetails } = useAuth();

  const router = useRouter();

  const submitForm = async (values: Values, actions: FormikHelpers<Values>) => {
    //  /set the values to context for later retrival
    // setUserRegistrationDetails({ ...values });
    const signupValues: signupProps = { ...userRegistrationDetails, ...values };
    const result = await SignupApi({ ...signupValues });
    actions.setSubmitting(false);

    if (result?.status !== 201) {
      return toast.error(result?.message || 'Error creating account');
    }
    clearRegistrationDetails();
    return router.push('/verify');
  };

  return (
    <Formik
      initialValues={{
        businessName: '',
        industry: '',
        employeeSize: '',
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
            onClick={() => props.handleSubmit()}
            variant='primary'
            size='large'
            isFullwidth
            className='mb-6'
            isLoading={props.isSubmitting}
          >
            Finish
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default SignupPageThree;
