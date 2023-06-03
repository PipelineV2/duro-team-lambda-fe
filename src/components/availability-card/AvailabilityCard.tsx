import React from 'react';
import { RiPencilLine } from 'react-icons/ri';

import Checkbox from '@/components/checkbox';
import Select from '@/components/select';
import Typography from '@/components/text';

const AvailabilityCard = () => {
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

  return (
    <div className=' shadow-s2 mt-[2rem] rounded-md bg-white p-[2rem]'>
      <div className=' flex justify-between'>
        <div className=''>
          <Typography variant='body1' className=' mb-[0.5rem]'>
            Set your availability to allow queues
          </Typography>
          <Typography variant='body2' className=' text-grey3 w-[20rem]'>
            Let Duro know when you’re typically available to accept meetings
          </Typography>
        </div>
        <RiPencilLine className=' text-grey3 cursor-pointer text-2xl' />
      </div>

      <div className=' w-[70%]'>
        <Typography variant='body1' className=' mt-[2rem]'>
          Open hours
        </Typography>
        <div className=' flex items-center'>
          <Select
            label=''
            placeholder='8:00 am'
            options={['8:00 am', '9:00 am', '10:00 am', '11:00 am']}
          />
          <Typography variant='body2' className=' mx-[2rem]'>
            to
          </Typography>
          <Select
            label=''
            placeholder='4:00 pm'
            options={['4:00 pm', '5:00 pm', '6:00 pm', '7:00 pm']}
          />
        </div>
      </div>

      <div className=''>
        <Typography variant='body1' className=' mb-[1rem] mt-[2rem]'>
          Available days
        </Typography>

        <div className=' border-grey5 grid grid-cols-7 rounded-md border '>
          {days.map((e) => (
            <div className=' border-r-grey5 border-r p-[2rem]' key={e.id}>
              <Checkbox label={e.day} value={e.value} isRow={false} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AvailabilityCard;
