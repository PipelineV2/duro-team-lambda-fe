import React from 'react';

import logger from '@/lib/logger';

import Checkbox from '@/components/checkbox';
import Typography from '@/components/text';

import { updateAvailabilityProps } from '@/utils/types';

export type currentOperationStatusProps = {
  [key: string]: boolean;
  break: boolean;
  closed: boolean;
  operation: boolean;
};

type StatusProps = {
  currentOperationStatus: currentOperationStatusProps;
  handleUpdateAvailability: ({
    type,
    value,
  }: updateAvailabilityProps) => Promise<void>;
};

const Status = ({
  currentOperationStatus,
  handleUpdateAvailability,
}: StatusProps) => {
  const {
    break: isBreak,
    closed: isClosed,
    operation: isOperation,
  } = currentOperationStatus;

  const handleChange = async (data: string) => {
    try {
      const result = await handleUpdateAvailability({
        type: 'operation',
        value: data,
      });
      logger({ result });
      // console.log({ result });
    } catch (error) {
      // console.log('error', error);
    }
  };
  return (
    <div>
      <div className=' mt-[3rem] flex flex-col gap-4 lg:flex-row  lg:gap-8'>
        <Typography variant='body2' className='text-grey1'>
          Tell the status of your operations
        </Typography>

        <div className=' flex flex-wrap gap-4 lg:gap-8'>
          <Checkbox
            value='operation'
            label='Operating'
            checked={isOperation}
            onChange={handleChange}
            isRow={true}
          />
          <Checkbox
            checked={isBreak}
            onChange={handleChange}
            value='break'
            label='Break'
            isRow={true}
          />
          <Checkbox
            checked={isClosed}
            onChange={handleChange}
            value='closed'
            label='Closed'
            isRow={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Status;
