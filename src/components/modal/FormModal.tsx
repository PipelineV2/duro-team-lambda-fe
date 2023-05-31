import React from 'react';

import Button from '@/components/buttons/Button';
import Input from '@/components/input';
import Typography from '@/components/text/Text';

interface Props {
  title: string;
  label: string;
  placeholder: string;
  value: string;
  name: string;
}

const FormModal: React.FC<Props> = ({
  title,
  label,
  placeholder,
  value,
  name,
}) => {
  return (
    <div className=' fixed left-0 top-0 z-[100] flex h-[100vh] w-[100vw] items-center justify-center bg-white bg-opacity-80'>
      <div className=' shadow-shadow2 w-[30rem] rounded-md bg-white p-[1rem]'>
        <Typography variant='body1' className='dark mb-[1rem]'>
          {title}
        </Typography>

        <div className=' grid'>
          <form action='' className=' grid'>
            {/* <label htmlFor={name}>
              <Typography
                variant='secondary'
                className='text-grey3 mb-[0.5rem]'
              >
                {label}
              </Typography>
            </label> */}
            {/* <input
              type='text'
              className=' border-dark mb-[2rem] rounded-md border placeholder:text-sm'
              placeholder={placeholder}
              value={value}
            /> */}
            <Input
              type='text'
              value={value}
              name={name}
              label={label}
              placeholder={placeholder}
              className=' border-dark mb-[2rem] rounded-md border placeholder:text-sm'
            />
            <Button variant='primary' className=' mb-[1rem]' isFullwidth={true}>
              Create Schedule
            </Button>
          </form>

          <Button variant='text' isFullwidth={true}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FormModal;
