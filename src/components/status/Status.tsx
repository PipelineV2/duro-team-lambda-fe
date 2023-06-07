import React from 'react';

import Checkbox from '@/components/checkbox';
import Typography from '@/components/text';

const Status = () => {
  return (
    <div>
      <div className=' mt-[3rem] flex w-[60%] justify-between'>
        <Typography variant='body2' className='text-grey1'>
          Tell the status of your operations
        </Typography>

        <div className=' flex w-[50%] justify-between'>
          <Checkbox value='operating' label='Operating' isRow={true} />
          <Checkbox value='break' label='Break' isRow={true} />
          <Checkbox value='closed' label='Closed' isRow={true} />
        </div>
      </div>
    </div>
  );
};

export default Status;
