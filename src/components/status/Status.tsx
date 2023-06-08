import React from 'react';

import Checkbox from '@/components/checkbox';
import Typography from '@/components/text';

const Status = () => {
  return (
    <div>
      <div className=' mt-[3rem] flex flex-col gap-4 lg:flex-row  lg:gap-8'>
        <Typography variant='body2' className='text-grey1'>
          Tell the status of your operations
        </Typography>

        <div className=' flex flex-wrap gap-4 lg:gap-8'>
          <Checkbox value='operating' label='Operating' isRow={true} />
          <Checkbox value='break' label='Break' isRow={true} />
          <Checkbox value='closed' label='Closed' isRow={true} />
        </div>
      </div>
    </div>
  );
};

export default Status;
