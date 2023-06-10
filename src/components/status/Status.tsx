import React from 'react';
import * as Yup from 'yup';

import Checkbox from '@/components/checkbox';
import Typography from '@/components/text';

export type currentOperationStatusProps = {
  [key: string]: boolean;
  break: boolean;
  closed: boolean;
  operation: boolean;
};

export const validationSchema = Yup.object().shape({
  currentOperationStatus: Yup.string().required('A radio option is required'),
});

const Status = () => {
  return (
    <>
      <div className=' mt-[3rem] flex flex-col gap-4 lg:flex-row  lg:gap-8'>
        <Typography variant='body2' className='text-grey1'>
          Tell the status of your operations
        </Typography>

        <div className=' flex flex-wrap gap-4 lg:gap-8'>
          <Checkbox
            name='currentOperationStatus'
            label='Operation'
            type='radio'
            value='operation'
            isRow={true}
          />
          <Checkbox
            value='break'
            type='radio'
            name='currentOperationStatus'
            label='Break'
            isRow={true}
          />
          <Checkbox
            name='currentOperationStatus'
            value='closed'
            type='radio'
            label='Closed'
            isRow={true}
          />
        </div>
      </div>
    </>
  );
};

export default Status;
