import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { useAuth } from '@/context/auth';

const ProtectedPage = ({
  children,
}: {
  children: React.ReactNode;
  isAuthPage?: boolean;
}) => {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) router.push('/');
  }, [user, router, loading]);

  return <div>{children}</div>;
};

export default ProtectedPage;
