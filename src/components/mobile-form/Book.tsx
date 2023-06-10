/* eslint-disable unused-imports/no-unused-vars */
import { Form, Formik, FormikHelpers, FormikProps } from 'formik';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import * as Yup from 'yup';

import Button from '@/components/buttons';
import Modal from '@/components/modal';

import { JoinQueueApi } from '@/firebase/apis';
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
  const params = useRouter();

  const [status, setStatus] = useState('IDLE');

  const businessName = props?.vendor?.businessName;
  const isOperating = props?.vendor?.isOperating;
  const phoneNumber = props?.vendor?.phoneNumber;
  const isClosed = props?.vendor?.isClosed;
  const isOnBreak = props?.vendor?.isOnBreak;

  const submitForm = async (
    values: IValues,
    actions: FormikHelpers<IValues>
  ) => {
    //  /set the values to context for later retrival
    // setUserRegistrationDetails({ ...values });
    // goToNextStep();
    setStatus('LOADING');
    try {
      const result = await JoinQueueApi({
        name: values.firstName,
        phoneNumber,
        purpose: values.purposeOfVisit,
        formLink: (params?.query?.bookingId || '') as string,
      });

      if (result && result?.status >= 200 && result?.status < 300) {
        setStatus('DATA');
        return toast.success(result?.message);
      } else {
        setStatus('ERROR');
        return toast.error((result && result?.message) || '');
      }
    } catch (error: any) {
      setStatus('ERROR');

      return toast.error(error?.message);
    } finally {
      actions.setSubmitting(false);
    }
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
          {isClosed && (
            <Typography variant='body1' className=' mb-[2rem] text-center'>
              This business is currently not operating or is closed
            </Typography>
          )}

          {isOnBreak && (
            <Typography variant='body1' className=' mb-[2rem] text-center'>
              This business is currently on break, please try later
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
              onSubmit={(values, actions) => {
                submitForm(values, actions);
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
                      placeholder='Select'
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
                      isLoading={status === 'LOADING'}
                    />
                  </div>
                </Form>
              )}
            </Formik>
          )}
        </div>
      </div>
      {status === 'DATA' && (
        <Modal
          title='Successful!'
          text='You have booked a spot on the queue. Your number is:'
          number='05'
        />
      )}
    </main>
  );
};

export default Book;
