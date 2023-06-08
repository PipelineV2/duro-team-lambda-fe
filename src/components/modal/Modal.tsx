import React from 'react';

import Button from '@/components/buttons/Button';
import Typography from '@/components/text';

interface Props {
  title: string;
  text: string;
  number: string;
}

// Funtion will be removed
const viewQueue = () => {
  // console.log(viewQueue)
};

const Modal: React.FC<Props> = ({ title, text, number }) => {
  return (
    <div className=' fixed left-0 top-0 z-[100] flex h-[100vh] w-[100vw] items-center justify-center bg-black bg-opacity-80 text-center'>
      <div className=' shadow-shadow2 w-[20rem] rounded-md bg-white p-[1rem]'>
        <Typography variant='h3' className='dark mb-[1rem]'>
          {title}
        </Typography>

        <Typography variant='body2'>{text}</Typography>

        <Typography variant='h1' className='mb-[3rem]'>
          {number}
        </Typography>

        <Button
          text='See current queue'
          variant='primary'
          isFullwidth={true}
          size='large'
          onClick={() => viewQueue()}
        />
      </div>
    </div>
  );
};

export default Modal;
