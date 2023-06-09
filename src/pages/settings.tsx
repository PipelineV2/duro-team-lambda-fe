import { Form, Formik, FormikHelpers } from 'formik';
import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import QRCode from 'react-qr-code';
import * as Yup from 'yup';

import logger from '@/lib/logger';

import Button from '@/components/buttons/Button';
import Checkbox from '@/components/checkbox';
import Input from '@/components/input';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Typography from '@/components/text';

import { SettingsApi } from '@/firebase/apis';

const baseLink =
  typeof window !== 'undefined' && `${window.location.origin}/booking`;

const geofenceDataSettings = [
  {
    name: 'radius',
    label: 'Radius',
    placeholder: '5 meter',
  },
  {
    name: 'latitude',
    label: 'Latitude',
    placeholder: '6.5244',
  },
  {
    name: 'longitude',
    label: 'Longitude',
    placeholder: '3.3792',
  },
];

interface Values {
  radius: string;
  latitude: string;
  longitude: string;
  phoneNumber: string;
}

export const validationSchema = Yup.object().shape({
  radius: Yup.string().required('radius is required').matches(/^\d+$/, {
    message: 'radius must be a number',
    excludeEmptyString: true,
  }),
  latitude: Yup.string().required('latitude is required').matches(/^\d+$/, {
    message: 'latitude must be a number',
    excludeEmptyString: true,
  }),
  longitude: Yup.string().required('longitude is required').matches(/^\d+$/, {
    message: 'longitude must be a number',
    excludeEmptyString: true,
  }),
  phoneNumber: Yup.string()
    .required('phoneNumber is required')
    .matches(/^\d+$/, {
      message: 'phoneNumber must be a number',
      excludeEmptyString: true,
    }),
});

const Settings = () => {
  const [linkValue, setLinkValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({
    radius: '',
    latitude: '',
    longitude: '',
    phoneNumber: '',
  } as Values);

  useEffect(() => {
    const getSettings = async () => {
      setIsLoading(true);
      try {
        setIsLoading(false);
        const result = await SettingsApi();
        setLinkValue(`${baseLink}/${result.data.link}`);
        setInitialValues({
          radius: result.data.geofenceData[0].workingRadius.toString(),
          latitude: result.data.geofenceData[0].lat.toString(),
          longitude: result.data.geofenceData[0].long.toString(),
          phoneNumber: result.data.phoneNumber.toString(),
        });
        logger({ result });
      } catch (error: any) {
        setIsLoading(false);
        toast.error(error?.message as string);
      }
    };

    getSettings();
  }, []);

  const handleGenerateLink = useCallback(() => {
    // const newLink = new Date().getTime() / 1000000;
    // const link = Math.round(newLink);
    // setLinkValue(`${baseLink}/${link}`);
  }, []);

  useEffect(() => {
    handleGenerateLink();
  }, [handleGenerateLink]);

  const submitForm = async (values: Values, actions: FormikHelpers<Values>) => {
    logger({ values, actions });
  };
  logger({ initialValues });

  return (
    <Layout>
      {isLoading && (
        <div className='fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black bg-opacity-50'>
          <div className='h-12 w-12 animate-spin rounded-full border-8 border-t-8 border-gray-200'></div>
        </div>
      )}
      {!isLoading && (
        <Formik
          enableReinitialize={true}
          initialValues={{ ...initialValues }}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            submitForm(values, actions);
          }}
        >
          {() => (
            <Form>
              <Seo
                templateTitle='Settings'
                description='Set Clients Settings'
              />
              <div className='divide-grey5  border-b-grey5 mb-4 grid grid-cols-1  divide-solid border-b md:grid-cols-2 md:divide-x'>
                <div className='col-span-1 pb-4 md:pr-3 lg:pr-16'>
                  <div className=' mb-4 mt-4 flex items-center justify-center gap-8 md:mt-[3rem]'>
                    <Typography variant='body2' className='text-grey1'>
                      Display QR
                    </Typography>

                    <div className='flex gap-4'>
                      <Checkbox value='yes' label='Yes' />
                      <Checkbox value='no' label='No' />
                    </div>
                  </div>

                  <div className='shadow-s2 col-span-3 rounded-lg bg-white p-8 lg:col-span-1 '>
                    <Input
                      label='Link'
                      placeholder='input link here'
                      name='link'
                      // disabled
                      value={linkValue}
                      style={{ cursor: 'not-allowed' }}
                    />
                    {linkValue && (
                      <div className='mt-8 flex flex-col items-center justify-center md:px-12'>
                        <QRCode
                          value={linkValue}
                          className='mb-8 h-auto w-full'
                        />
                        <Button
                          text='Generate new QR'
                          onClick={handleGenerateLink}
                          variant='primary'
                          className='px-4 py-2.5'
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className='col-span-1 pt-4 md:pl-8 md:pt-20'>
                  <Input
                    label='Phone Number'
                    placeholder='0814587925'
                    name='phoneNumber'
                    className='border-grey5 mb-4 bg-transparent md:max-w-[284px]'
                  />
                  <div className=' flex gap-4'>
                    <Button
                      text='Change'
                      onClick={() => undefined}
                      variant='primary'
                      className='px-4 py-2.5'
                    />

                    <Button
                      text='Next'
                      onClick={() => undefined}
                      variant='text'
                      className='px-4 py-2.5'
                    />
                  </div>
                </div>
              </div>
              <div className='py-8 md:py-16'>
                <div className='md:max-w-[284px]'>
                  <Typography variant='body1' className='text-grey1 mb-2.5'>
                    Define your Geo-fence
                  </Typography>
                  <Typography variant='body2' className='text-grey3 mb-7'>
                    People within this location can make join your queue
                  </Typography>

                  {geofenceDataSettings.map((item) => {
                    const { name, label, placeholder } = item;
                    return (
                      <Input
                        key={name}
                        label={label}
                        placeholder={placeholder}
                        name={name}
                        className='border-grey5 mb-4 bg-transparent '
                      />
                    );
                  })}
                  <div className=' mt-4 flex gap-4'>
                    <Button
                      text='Create'
                      onClick={() => undefined}
                      variant='primary'
                      className='px-4 py-2.5'
                    />

                    <Button
                      text='Cancel'
                      onClick={() => undefined}
                      variant='text'
                      className='text-red px-4 py-2.5'
                    />
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </Layout>
  );
};

export default Settings;
