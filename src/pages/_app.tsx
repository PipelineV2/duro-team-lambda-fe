import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { Toaster } from 'react-hot-toast';

import '@/styles/globals.css';

import ProtectedRoute from '@/components/protected-route';

import { AuthContextProvider } from '@/context/auth';

/**
 * !STARTERCONF info
 * ? `Layout` component is called in every page using `np` snippets. If you have consistent layout across all page, you can add it here too
 */
const noAuthRequired = [
  '/',
  '/login',
  '/signup',
  '/live',
  '/reset-password',
  '/404',
  '/booking/[bookingId]',
];

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <AuthContextProvider>
      {noAuthRequired.includes(router.pathname) ? (
        <Component {...pageProps} />
      ) : (
        <ProtectedRoute>
          <Component {...pageProps} />
        </ProtectedRoute>
      )}
      <Toaster />
    </AuthContextProvider>
  );
}

export default MyApp;
