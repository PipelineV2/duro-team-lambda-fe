// !STARTERCONF You can delete this page
import * as React from 'react';

import logger from '@/lib/logger';

import Button from '@/components/buttons/Button';
import Layout from '@/components/layout/Layout';
import FormModal from '@/components/modal/FormModal';
import Seo from '@/components/Seo';

import { SignupApi } from '@/firebase/apis';

export default function ComponentsPage() {
  logger({ NEXT_PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY });

  const handleForm = async () => {
    const data = await SignupApi({
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      businessName: '',
      industry: '',
      employeeSize: '',
      phoneNumber: '',
    });

    logger(data);
    // if (error) {
    //     return console.log(error)
    // }

    // // else successful
    // console.log(result)
    // return router.push("/admin")
  };

  return (
    <Layout>
      <Seo
        templateTitle='Components'
        description='Pre-built components with awesome default'
      />

      <Button size='small' variant='secondary' onClick={handleForm}>
        Small Size
      </Button>

      <FormModal
        title='New Schedule'
        name='schedule'
        label='Schedule name'
        placeholder='Normal hours, holiday hours etc...'
        value='Something here'
      />
      {/* <main>
        <Typography variant='h1'>Mama is here</Typography>
        <Typography variant='h2'>Mama is here</Typography>
        <Typography variant='h3'>Mama is here</Typography>
        <Typography
          variant='h4'
          className='text-sm font-medium leading-[1.25rem]'
        >
          Mama is here
        </Typography>
        <Typography variant='small'>Mama is small</Typography>
        <Typography variant='body1'>Mama is body1</Typography>
        <Typography variant='body2'>Mama is body2</Typography>
        <Typography variant='button'>Mama is button</Typography>
        <Typography variant='secondary'>Mama is secondary</Typography>
        <section
          className={clsx(mode === 'dark' ? 'bg-dark' : 'bg-white', color)}
        >
          <div
            className={clsx(
              'layout min-h-screen py-20',
              mode === 'dark' ? 'text-white' : 'text-black'
            )}
          >
            <h1>Built-in Components</h1>
            <ArrowLink direction='left' className='mt-2' href='/'>
              Back to Home
            </ArrowLink>

            <ol className='mt-8 space-y-6'>
              <li className='space-y-2'>
                <h2 className='text-lg md:text-xl'>Customize Colors</h2>
                <p className={clsx('!mt-1 text-sm', textColor)}>
                  You can change primary color to any Tailwind CSS colors. See
                  globals.css to change your color.
                </p>
                <div className='flex flex-wrap gap-2'>
                  <select
                    name='color'
                    id='color'
                    title='color'
                    value={color}
                    className={clsx(
                      'block max-w-xs rounded',
                      mode === 'dark'
                        ? 'bg-dark border border-gray-600'
                        : 'border-gray-300 bg-white',
                      'focus:border-primary-400 focus:ring-primary-400 focus:outline-none focus:ring'
                    )}
                    onChange={(e) => setColor(e.target.value as Color)}
                  >
                    {colorList.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  <ButtonLink href='https://github.com/theodorusclarence/ts-nextjs-tailwind-starter/blob/main/src/styles/colors.css'>
                    Check list of colors
                  </ButtonLink>
                </div>
                <div className='flex flex-wrap gap-2 text-xs font-medium'>
                  <div className='bg-primary-50 flex h-10 w-10 items-center justify-center rounded text-black'>
                    50
                  </div>
                  <div className='bg-primary-100 flex h-10 w-10 items-center justify-center rounded text-black'>
                    100
                  </div>
                  <div className='bg-primary-200 flex h-10 w-10 items-center justify-center rounded text-black'>
                    200
                  </div>
                  <div className='bg-primary-300 flex h-10 w-10 items-center justify-center rounded text-black'>
                    300
                  </div>
                  <div className='bg-primary-400 flex h-10 w-10 items-center justify-center rounded text-black'>
                    400
                  </div>
                  <div className='bg-primary-500 flex h-10 w-10 items-center justify-center rounded text-black'>
                    500
                  </div>
                  <div className='bg-primary-600 flex h-10 w-10 items-center justify-center rounded text-white'>
                    600
                  </div>
                  <div className='bg-primary-700 flex h-10 w-10 items-center justify-center rounded text-white'>
                    700
                  </div>
                  <div className='bg-primary-800 flex h-10 w-10 items-center justify-center rounded text-white'>
                    800
                  </div>
                  <div className='bg-primary-900 flex h-10 w-10 items-center justify-center rounded text-white'>
                    900
                  </div>
                  <div className='bg-primary-950 flex h-10 w-10 items-center justify-center rounded text-white'>
                    950
                  </div>
                </div>
              </li>
              <li className='space-y-2'>
                <h2 className='text-lg md:text-xl'>UnstyledLink</h2>
                <p className={clsx('!mt-1 text-sm', textColor)}>
                  No style applied, differentiate internal and outside links,
                  give custom cursor for outside links.
                </p>
                <div className='space-x-2'>
                  <UnstyledLink href='/'>Internal Links</UnstyledLink>
                  <UnstyledLink href='https://theodorusclarence.com'>
                    Outside Links
                  </UnstyledLink>
                </div>
              </li>
              <li className='space-y-2'>
                <h2 className='text-lg md:text-xl'>PrimaryLink</h2>
                <p className={clsx('!mt-1 text-sm', textColor)}>
                  Add styling on top of UnstyledLink, giving a primary color to
                  the link.
                </p>
                <div className='space-x-2'>
                  <PrimaryLink href='/'>Internal Links</PrimaryLink>
                  <PrimaryLink href='https://theodorusclarence.com'>
                    Outside Links
                  </PrimaryLink>
                </div>
              </li>
              <li className='space-y-2'>
                <h2 className='text-lg md:text-xl'>UnderlineLink</h2>
                <p className={clsx('!mt-1 text-sm', textColor)}>
                  Add styling on top of UnstyledLink, giving a dotted and
                  animated underline.
                </p>
                <div className='space-x-2'>
                  <UnderlineLink href='/'>Internal Links</UnderlineLink>
                  <UnderlineLink href='https://theodorusclarence.com'>
                    Outside Links
                  </UnderlineLink>
                </div>
              </li>
              <li className='space-y-2'>
                <h2 className='text-lg md:text-xl'>ArrowLink</h2>
                <p className={clsx('!mt-1 text-sm', textColor)}>
                  Useful for indicating navigation, I use this quite a lot, so
                  why not build a component with some whimsy touch?
                </p>
                <div className='flex flex-wrap items-center gap-4'>
                  <ArrowLink href='/' direction='left'>
                    Direction Left
                  </ArrowLink>
                  <ArrowLink href='/'>Direction Right</ArrowLink>
                  <ArrowLink
                    as={UnstyledLink}
                    className='inline-flex items-center'
                    href='/'
                  >
                    Polymorphic
                  </ArrowLink>
                  <ArrowLink
                    as={ButtonLink}
                    variant='light'
                    className='inline-flex items-center'
                    href='/'
                  >
                    Polymorphic
                  </ArrowLink>
                </div>
              </li>
              <li className='space-y-2'>
                <h2 className='text-lg md:text-xl'>ButtonLink</h2>
                <p className={clsx('!mt-1 text-sm', textColor)}>
                  Button styled link with 3 variants.
                </p>
                <div className='flex flex-wrap gap-2'>
                  <ButtonLink
                    variant='primary'
                    href='https://theodorusclarence.com'
                  >
                    Primary Variant
                  </ButtonLink>
                  <ButtonLink
                    variant='outline'
                    href='https://theodorusclarence.com'
                  >
                    Outline Variant
                  </ButtonLink>
                  <ButtonLink
                    variant='ghost'
                    href='https://theodorusclarence.com'
                  >
                    Ghost Variant
                  </ButtonLink>
                  <ButtonLink
                    variant='dark'
                    href='https://theodorusclarence.com'
                  >
                    Dark Variant
                  </ButtonLink>
                  <ButtonLink
                    variant='light'
                    href='https://theodorusclarence.com'
                  >
                    Light Variant
                  </ButtonLink>
                </div>
              </li>
              <li className='space-y-2'>
                <h2 className='text-lg md:text-xl'>Button</h2>
                <p className={clsx('!mt-1 text-sm', textColor)}>
                  Ordinary button with style.
                </p>
                <div className='flex flex-wrap gap-2'>
                  <Button variant='primary'>Primary Variant</Button>
                  <Button variant='secondary'>Outline Variant</Button>
                  <Button variant='text'>Ghost Variant</Button>
                </div>
                <div className='flex flex-wrap gap-2'>
                  <Button
                    variant='primary'
                    leftIcon={HiPlus}
                    rightIcon={HiArrowRight}
                  >
                    Icon
                  </Button>
                  <Button
                    variant='secondary'
                    leftIcon={HiPlus}
                    rightIcon={HiArrowRight}
                  >
                    Icon
                  </Button>
                  <Button
                    variant='text'
                    leftIcon={HiPlus}
                    rightIcon={HiArrowRight}
                  >
                    Icon
                  </Button>
                </div>
                <div className='!mt-4 flex flex-wrap gap-2'>
                  <Button size='small' variant='primary' isFullwidth>
                    Small Size
                  </Button>
                  <Button size='small' variant='secondary'>
                    Small Size
                  </Button>
                  <Button size='small' variant='text'>
                    Small Size
                  </Button>
                </div>
                <div className='flex flex-wrap gap-2'>
                  <Button
                    size='small'
                    variant='primary'
                    leftIcon={HiPlus}
                    rightIcon={HiArrowRight}
                  >
                    Icon
                  </Button>
                  <Button
                    size='small'
                    variant='secondary'
                    leftIcon={HiPlus}
                    rightIcon={HiArrowRight}
                  >
                    Icon
                  </Button>
                  <Button
                    size='small'
                    variant='text'
                    leftIcon={HiPlus}
                    rightIcon={HiArrowRight}
                  >
                    Icon
                  </Button>
                </div>

                <div className='!mt-4 flex flex-wrap gap-2'>
                  <Button disabled variant='primary'>
                    Disabled
                  </Button>
                  <Button disabled variant='text'>
                    Disabled
                  </Button>
                  <Button disabled variant='text'>
                    Disabled
                  </Button>
                </div>
                <div className='flex flex-wrap gap-2'>
                  <Button isLoading variant='primary'>
                    Disabled
                  </Button>
                  <Button isLoading variant='secondary'>
                    Disabled
                  </Button>
                  <Button isLoading variant='text'>
                    Disabled
                  </Button>
                </div>
              </li>
              <li className='space-y-2'>
                <h2 className='text-lg md:text-xl'>TextButton</h2>
                <p className={clsx('!mt-1 text-sm', textColor)}>
                  Button with a text style
                </p>
                <div className='space-x-2'>
                  <TextButton>Primary Variant</TextButton>
                  <TextButton variant='basic'>Basic Variant</TextButton>
                </div>
              </li>
              <li className='space-y-2'>
                <h2 className='text-lg md:text-xl'>IconButton</h2>
                <p className={clsx('!mt-1 text-sm', textColor)}>
                  Button with only icon inside
                </p>
                <div className='space-x-2'>
                  <IconButton icon={HiPlus} />
                  <IconButton
                    variant='outline'
                    icon={HiOutlineDesktopComputer}
                  />
                  <IconButton variant='ghost' icon={HiOutlineDeviceMobile} />
                  <IconButton variant='dark' icon={HiOutlineShieldCheck} />
                  <IconButton variant='light' icon={HiOutlineCreditCard} />
                </div>
              </li>
              <li className='space-y-2'>
                <h2 className='text-lg md:text-xl'>Custom 404 Page</h2>
                <p className={clsx('!mt-1 text-sm', textColor)}>
                  Styled 404 page with some animation.
                </p>
                <div className='flex flex-wrap gap-2'>
                  <ButtonLink href='/404'>Visit the 404 page</ButtonLink>
                </div>
              </li>
              <li className='space-y-2'>
                <h2 className='text-lg md:text-xl'>Next Image</h2>
                <p className={clsx('!mt-1 text-sm', textColor)}>
                  Next Image with default props and skeleton animation
                </p>
                <NextImage
                  useSkeleton
                  className='w-32 md:w-40'
                  src='/favicon/android-chrome-192x192.png'
                  width='180'
                  height='180'
                  alt='Icon'
                />
              </li>
              <li className='space-y-2'>
                <h2 className='text-lg md:text-xl'>Skeleton</h2>
                <p className={clsx('!mt-1 text-sm', textColor)}>
                  Skeleton with shimmer effect
                </p>
                <Skeleton className='h-72 w-72' />
              </li>
            </ol>
          </div>
        </section>
      </main> */}
    </Layout>
  );
}
