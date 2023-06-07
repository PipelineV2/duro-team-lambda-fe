import React from 'react';

import Button from '../buttons';
import Input from '../input';
import Select from '../select';
import Typography from '../text';

const Book = () => {
  return (
    <div>
      {/* Margin top will be removed */}
      <div className=' mx-auto mt-[3rem] h-[100vh] w-[90%]'>
        <Typography variant='body1' className=' mb-[2rem] text-center'>
          Book a spot on the queue
        </Typography>

        <div className=' flex h-[80vh] flex-col justify-between'>
          <div className=''>
            <Input
              label='First name'
              placeholder='First name'
              name='firstName'
              className=' mb-2'
            />
            <Input
              label='Phone number'
              placeholder='Phone number'
              name='number'
              className=' mb-2'
            />
            <Select
              label='Purpose of visit'
              placeholder='Purpose of visit'
              options={['Account creation', 'Consultation', 'File a complain']}
            />
          </div>

          <Button
            text='Join the queue'
            variant='primary'
            className=' text-center'
            size='large'
            isFullwidth={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Book;
