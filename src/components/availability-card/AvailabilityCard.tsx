/* eslint-disable unused-imports/no-unused-vars */
import { Form, Formik, FormikHelpers, FormikProps } from 'formik';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { RiPencilLine } from 'react-icons/ri';
import * as Yup from 'yup';

import clsxm from '@/lib/clsxm';
import logger from '@/lib/logger';

import Button from '@/components/buttons';
import Checkbox from '@/components/checkbox';
import Select from '@/components/select';
import Status, {
  currentOperationStatusProps,
} from '@/components/status/Status';
import Typography from '@/components/text';

import { UpdateAvailabilityApi } from '@/firebase/apis';
import { TworkingDaysProps } from '@/pages/availability';

const days = [
  {
    id: 1,
    day: 'Sunday',
    value: 'sunday',
  },
  {
    id: 2,
    day: 'Monday',
    value: 'monday',
  },
  {
    id: 3,
    day: 'Tuesday',
    value: 'tuesday',
  },
  {
    id: 4,
    day: 'Wednesday',
    value: 'wednesday',
  },
  {
    id: 5,
    day: 'Thursday',
    value: 'thursday',
  },
  {
    id: 6,
    day: 'Friday',
    value: 'friday',
  },
  {
    id: 7,
    day: 'Saturday',
    value: 'saturday',
  },
];

interface Values extends TworkingDaysProps {
  openingHour: string;
  closingHour: string;
  currentOperationStatus: string;
}

export const validationSchema = Yup.object().shape({
  openingHour: Yup.string().required('Opening Hour is required'),
  closingHour: Yup.string().required('Closing Hour is required'),
  currentOperationStatus: Yup.string().required('A radio option is required'),
});

interface IAvalabilityProps {
  operationStatus: currentOperationStatusProps;
  avalabilityValues: {
    closingHour: string;
    openingHour: string;
    subscribed: boolean;
    workingDays: TworkingDaysProps;
  };
  handleStatus: (status: string) => void;
}

const AvailabilityCard = (props: IAvalabilityProps) => {
  const [status, setStatus] = useState('IDLE');

  const {
    avalabilityValues: { closingHour, openingHour, subscribed, workingDays },
    operationStatus,
    handleStatus,
  } = props;
  const [isEditing, setIsEditing] = useState(false);

  // logger({ workingDays });
  const handleEditing = () => {
    setIsEditing(false);
  };

  const submitForm = async (values: Values, actions: FormikHelpers<Values>) => {
    setStatus('LOADING');
    const {
      closingHour,
      currentOperationStatus: operation,
      openingHour,
      ...workingDays
    } = values;

    try {
      const result = await UpdateAvailabilityApi({
        closingHour,
        openingHour,
        workingDays,
        operation,
      });
      setStatus('DATA');
      if (result) {
        toast.success(result?.message);
      }
    } catch (error: any) {
      setStatus('ERROR');

      toast.error(error?.message);
    }
  };

  const handleChange = async (data: string) => {
    logger({ data });
  };

  return (
    <Formik
      initialValues={{
        openingHour: openingHour || '',
        closingHour: closingHour || '',
        currentOperationStatus:
          Object.keys(operationStatus).find(
            (item) => !!operationStatus[item]
          ) || '',
        ...workingDays,
      }}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={(values, actions) => {
        submitForm(values, actions);
      }}
    >
      {(props: FormikProps<Values>) => {
        return (
          <Form>
            {JSON.stringify(props, null, 2)}
            <Status />

            <div className=' shadow-s2 mt-5 rounded-md bg-white p-3 md:mt-8 md:p-8'>
              <div className=' flex items-start justify-between'>
                <div className=''>
                  <Typography variant='body1' className=' text-grey1 mb-2'>
                    Set your availability to allow queues
                  </Typography>
                  <Typography variant='body2' className=' text-grey3 '>
                    Let Duro know when you’re typically available to accept
                    meetings
                  </Typography>
                </div>
                <button
                  title='edit'
                  type='button'
                  disabled={isEditing}
                  onClick={() => setIsEditing(true)}
                  className={clsxm(
                    'hover:bg-grey5 rounded-full p-2 transition-all',
                    [isEditing && 'cursor-not-allowed opacity-20']
                  )}
                >
                  <RiPencilLine className=' text-grey3 cursor-pointer text-2xl' />
                </button>
              </div>

              <div className=''>
                <Typography variant='body2' className=' mt-[2rem]'>
                  Open hours
                </Typography>
                <div className=' flex w-full max-w-[300px] flex-col items-start gap-3   md:max-w-[600px] md:flex-row md:gap-4'>
                  <Select
                    label=''
                    placeholder='Select Opening Hour'
                    options={[
                      '1:00 am',
                      '2:00am',
                      '8:00 am',
                      '9:00 am',
                      '10:00 am',
                      '11:00 am',
                    ]}
                    className='border-grey5 text-grey1'
                    name='openingHour'
                    id='openingHour'
                  />
                  <Typography variant='body2' className='self-center'>
                    to
                  </Typography>
                  <Select
                    label=''
                    placeholder='Select Closing Hour'
                    options={[
                      '4:00 pm',
                      '5:00 pm',
                      '6:00 pm',
                      '7:00 pm',
                      '8:00pm',
                      '9:00 pm',
                      '10:00 pm',
                      '11:00 pm',
                    ]}
                    className='border-grey5 text-grey1'
                    name='closingHour'
                    id='closingHour'
                  />
                </div>
              </div>

              <div className=''>
                <Typography variant='body2' className=' mb-2 mt-[2rem]'>
                  Available days
                </Typography>

                <div className=' border-grey5 grid max-w-[250px] grid-cols-1 rounded-lg  border md:max-w-full md:grid-cols-7'>
                  {days?.map((e, index) => (
                    <div
                      className={clsxm(
                        'border-r-grey5 rounded-lg border-b p-[2rem] md:border-b-0 md:border-r',
                        [index === days.length - 1 && 'border-none']
                      )}
                      key={e.id}
                    >
                      <Checkbox
                        label={e.day}
                        value={e.value}
                        name={e.value}
                        isRow={false}
                        checked={
                          (props.values[e.value as keyof Values] as boolean) ||
                          false
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>

              <Button
                text='Save'
                onClick={() => props.handleSubmit()}
                variant='primary'
                className={clsxm('mt-[2rem] px-7 transition-all', [
                  isEditing ? 'visible' : 'invisible',
                ])}
                isLoading={status === 'LOADING'}
              />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AvailabilityCard;
