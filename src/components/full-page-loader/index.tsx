import React, { useRef } from 'react';
import LoadingBar from 'react-top-loading-bar';

export default function FullPageLoader() {
  const ref = useRef<any>(null);

  React.useEffect(() => {
    ref?.current?.continuousStart();
    const complete = ref?.current?.complete();
    return () => {
      return complete;
    };
  }, []);
  return (
    <>
      <LoadingBar color='#007f5f' ref={ref} height={4} />
      <div className=' fixed bottom-0 left-0 right-0 top-1 z-50  backdrop-blur-sm'>
        <div className='mx-auto mt-10 w-full max-w-md  rounded-md  p-4 '>
          <div className='flex animate-pulse space-x-4'>
            <div className='flex-1 space-y-6 py-1'>
              <div className='h-3 rounded bg-slate-200'></div>
              <div className='space-y-3'>
                <div className='h-8 rounded bg-slate-200'></div>
                <div className=' h-8 rounded bg-slate-200'></div>
                <div className='h-8 rounded bg-slate-200'></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
