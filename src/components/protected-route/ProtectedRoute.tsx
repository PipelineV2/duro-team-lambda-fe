import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { useAuth } from '@/context/auth';

const ProtectedRoute = ({
  children,
}: {
  children: React.ReactNode;
  isAuthPage?: boolean;
}) => {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) router.push('/login');
  }, [user, router, loading]);

  return <>{user ? children : null}</>;
};

export default ProtectedRoute;
