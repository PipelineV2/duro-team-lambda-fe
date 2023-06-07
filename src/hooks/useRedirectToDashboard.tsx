import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useAuth } from '@/context/auth';

const useRedirectToDashboard = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  // Listen for changes on loading and authUser, redirect if needed
  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, router, loading]);
};

export default useRedirectToDashboard;
