/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

import logger from '@/lib/logger';

import AvailabilityCard from '@/components/availability-card';
import FullPageLoader from '@/components/full-page-loader';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import { currentOperationStatusProps } from '@/components/status/Status';

import { AvailabilityApi } from '@/firebase/apis';
import { availReturnDataProps } from '@/utils/types';

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
  const [operationStatus, setOperationStatus] = useState(
    {} as currentOperationStatusProps
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
        logger({ result });
        setOperationStatus(result!.data!.currentOperationStatus?.[0] || {});
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

  const avalabilityValues = {
    closingHour,
    openingHour,
    subscribed,
    workingDays,
  };

  const handleStatus = useCallback(
    (status: string) => {
      const newOperationStatus = { ...operationStatus };
      Object.keys(newOperationStatus).forEach((val) => {
        if (status !== val) {
          return (newOperationStatus[val] = false);
        }
        return (newOperationStatus[val] = true);
      });
      setOperationStatus(newOperationStatus);
    },
    [operationStatus]
  );

  // const handleUpdateAvailability = useCallback();
  // async ({ type, value }: updateAvailabilityProps) => {
  //   try {
  //     const result = await UpdateAvailabilityApi({
  //       type,
  //       value,
  //     });
  //     if (result === undefined) {
  //       toast.error('Error updating availability');
  //     }
  //     toast.success('Availability updated successfully');
  //     getAvailability();
  //   } catch (error: any) {
  //     toast.error('Error updating availability');
  //   }
  // }
  // ,
  // [getAvailability]

  return (
    <Layout>
      <Seo
        templateTitle='Availability'
        description='Set Cleints Availability'
      />
      {status === 'LOADING' && <FullPageLoader />}
      {status === 'SUCCESS' && (
        <>
          <AvailabilityCard
            operationStatus={operationStatus}
            avalabilityValues={avalabilityValues}
            handleStatus={handleStatus}
          />
        </>
      )}
    </Layout>
  );
};

export default Availability;
