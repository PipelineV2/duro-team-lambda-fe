/* eslint-disable unused-imports/no-unused-vars */
import { Form, Formik, FormikProps } from 'formik';
import React from 'react';
import * as Yup from 'yup';

import Button from '@/components/buttons';

import { TVendorDataProps } from '@/utils/types';

import Input from '../input';
import Select from '../select';
import Typography from '../text';

interface IValues {
  firstName: string;
  phoneNumber: string;
  purposeOfVisit: string;
}

export const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('First name is required')
    .trim('First name cannot be empty')
    .matches(
      /^[a-zA-Z0-9-]+$/,
      'This field cannot contain white space and special character'
    ),
  phoneNumber: Yup.string()
    .required('Phone Number is required')
    .matches(/^\d+$/, {
      message: 'Phone Number must be a number',
      excludeEmptyString: true,
    }),
  purposeOfVisit: Yup.string().required('Purpose Of Visit is required'),
});

type Props = {
  vendor: TVendorDataProps;
};

const Book = (props: Props) => {
  const { businessName, isOperating, isWorkHours, isWorkingDay, phoneNumber } =
    props.vendor;
  // console.log(props);
  const submitForm = async (values: IValues) => {
    //  /set the values to context for later retrival
    // setUserRegistrationDetails({ ...values });
    // goToNextStep();
  };

  return (
    <main className='h-screen w-screen p-3 '>
      <div className='m-auto w-full max-w-[418px] pt-5 md:pt-20 lg:pt-[105px]'>
        <Typography
          variant='h3'
          className='text-green mb-[1rem] text-center font-sans'
        >
          {businessName}
        </Typography>
        <Typography variant='body1' className=' mb-[2rem] text-center'>
          Book a spot on the queue
        </Typography>

        <div className=' flex  flex-col justify-between'>
          {!isOperating && (
            <Typography variant='body1' className=' mb-[2rem] text-center'>
              This business is currently not operating
            </Typography>
          )}
          {isOperating && (
            <Formik
              initialValues={{
                firstName: '',
                phoneNumber: '',
                purposeOfVisit: '',
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                submitForm(values);
              }}
            >
              {(props: FormikProps<IValues>) => (
                <Form>
                  <div className='flex flex-col gap-4'>
                    <Input
                      label='First name'
                      placeholder='First name'
                      name='firstName'
                      className='border-grey5 text-grey1'
                    />
                    <Input
                      label='Phone number'
                      placeholder='Phone number'
                      name='phoneNumber'
                      className='border-grey5 text-grey1'
                    />
                    <Select
                      label='Purpose of visit'
                      name='purposeOfVisit'
                      className='border-grey5 text-grey1'
                      placeholder='Purpose of visit'
                      options={[
                        'Account creation',
                        'Consultation',
                        'File a complain',
                      ]}
                    />

                    <Button
                      text='Join the queue'
                      variant='primary'
                      className='mt-1 text-center'
                      size='large'
                      isFullwidth={true}
                      onClick={() => props.handleSubmit()}
                    />
                  </div>
                </Form>
              )}
            </Formik>
          )}
        </div>
      </div>
    </main>
  );
};

export default Book;
