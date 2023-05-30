import { useRef } from 'react';
// export default DatePicker;
import React from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

import clsxm from '@/lib/clsxm';

import CalenderIcon from '~/svg/CalenderIcon.svg';
import DownwardCaret from '~/svg/DownwardCaret.svg';

type Props = {
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
};

const Calendar = (props: Props) => {
  const { selectedDate, onChange } = props;
  const dateRef = useRef<DatePicker | null>(null);

  return (
    <div className='relative grid max-w-[180px]'>
      <DatePicker
        selected={selectedDate}
        onChange={onChange}
        showPopperArrow
        className='text-grey3 border-grey4 z-10  rounded  border py-[5px] pl-10 text-sm'
        dateFormat='d MMM, yyyy'
        ref={dateRef}
      />
      <CalenderIcon className='text-grey4 absolute left-2 top-1 text-[24px]' />
      <DownwardCaret
        className={clsxm(
          'text-border-gray2 absolute right-4 top-2 -z-0 bg-white text-sm'
        )}
        onClick={() => {
          dateRef && dateRef?.current?.setFocus;
        }}
      />
    </div>
  );
};

export default Calendar;
