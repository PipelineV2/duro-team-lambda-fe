import { Form, Formik, FormikProps } from 'formik';
import React from 'react';
import * as Yup from 'yup';

import Button from '@/components/buttons/Button';
import Input from '@/components/input';

import { useAuth } from '@/context/auth';

type Props = {
  goToNextStep: () => void;
};
interface Values {
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

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
    placeholder: '08xxxxxxxxxx',
    name: 'phoneNumber',
  },
];

export const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('First name is required')
    .trim('First name cannot be empty')
    .matches(
      /^[a-zA-Z0-9-]+$/,
      'This field cannot contain white space and special character'
    ),
  lastName: Yup.string()
    .required('Last Name is required')
    .trim('Last name cannot be empty')
    .matches(
      /^[a-zA-Z0-9-]+$/,
      'This field cannot contain white space and special character'
    ),
  phoneNumber: Yup.string()
    .required('Phone number is required')
    .matches(/^\d{11}$/i, 'Phone number must be 11 digits'),
});

const SignupPageTwo = (props: Props) => {
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
        firstName: '',
        lastName: '',
        phoneNumber: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        submitForm(values);
      }}
    >
      {(props: FormikProps<Values>) => (
        <Form>
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
            variant='primary'
            size='large'
            isFullwidth
            className='mb-6'
            onClick={() => props.handleSubmit()}
          >
            Next
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default SignupPageTwo;
