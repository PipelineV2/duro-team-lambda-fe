import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

import AvailabilityCard from '@/components/availability-card';
import FullPageLoader from '@/components/full-page-loader';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Status from '@/components/status';
import { currentOperationStatusProps } from '@/components/status/Status';

import { AvailabilityApi, UpdateAvailabilityApi } from '@/firebase/apis';
import { availReturnDataProps, updateAvailabilityProps } from '@/utils/types';

export type TworkingDaysProps = {
  friday: boolean;
  monday: boolean;
  saturday: boolean;
  sunday: boolean;
  thursday: boolean;
  tuesday: boolean;
  wednesday: boolean;
};

const Availability = () => {
  type Tstatus = 'LOADING' | 'SUCCESS' | 'ERROR';
  const [status, setStatus] = useState<Tstatus>('LOADING');
  const [availabilityData, setAvailabilityData] = useState(
    {} as availReturnDataProps
  );

  const getAvailability = useCallback(async () => {
    try {
      const result = await AvailabilityApi();
      if (result === undefined) {
        toast.error(
          'Error Fetching data, please check your internet connection'
        );
        setStatus('ERROR');
      } else {
        setAvailabilityData(result as availReturnDataProps);
        // console.log(result);
        setStatus('SUCCESS');
      }
    } catch (error: any) {
      setStatus('ERROR');
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      getAvailability();
    }

    return () => {
      isMounted = false;
    };
  }, [getAvailability]);

  const closingHour = availabilityData?.data?.closingHour || '';
  const openingHour = availabilityData?.data?.openingHour || '';
  const subscribed = availabilityData?.data?.subscribed || false;
  const workingDays = (availabilityData?.data?.workingDays?.[0] ||
    {}) as TworkingDaysProps;
  const currentOperationStatus = (availabilityData?.data
    ?.currentOperationStatus?.[0] || {}) as currentOperationStatusProps;

  const avalabilityValues = {
    closingHour,
    openingHour,
    subscribed,
    workingDays,
  };

  const handleUpdateAvailability = useCallback(
    async ({ type, value }: updateAvailabilityProps) => {
      try {
        const result = await UpdateAvailabilityApi({
          type,
          value,
        });
        if (result === undefined) {
          toast.error('Error updating availability');
        }
        toast.success('Availability updated successfully');
        getAvailability();
      } catch (error: any) {
        toast.error('Error updating availability');
      }
    },
    [getAvailability]
  );

  return (
    <Layout>
      <Seo
        templateTitle='Availability'
        description='Set Cleints Availability'
      />
      {status === 'LOADING' && <FullPageLoader />}
      {status === 'SUCCESS' && (
        <>
          <Status
            currentOperationStatus={currentOperationStatus}
            handleUpdateAvailability={handleUpdateAvailability}
          />
          <AvailabilityCard
            avalabilityValues={avalabilityValues}
            handleUpdateAvailability={handleUpdateAvailability}
          />
        </>
      )}
    </Layout>
  );
};

export default Availability;
