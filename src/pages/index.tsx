import Link from 'next/link';
import * as React from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

const pages = [
  'availability',
  'components',
  'dashboard',
  'live',
  'login',
  'queues',
  'settings',
  'signup',
  'verify',
];
export default function HomePage() {
  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main>
        <div className='layout relative flex  flex-col items-center justify-center py-12 text-center'>
          <h3 className='m-4'>
            Click on this link to see pages that has been created
          </h3>
          {pages.map((page) => {
            return (
              <Link
                key={page}
                href={page}
                className='pb-2 uppercase hover:underline'
              >
                {page}
              </Link>
            );
          })}
        </div>
      </main>
    </Layout>
  );
}
