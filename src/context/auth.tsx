import { onAuthStateChanged } from 'firebase/auth';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { auth } from '@/firebase/FirebaseStore';
import { signupProps } from '@/utils/types';

// Define the shape of the user object
interface User {
  id: string;
  name: string;
  email: string;
}

// Define the shape of the authentication context
interface AuthContextType {
  setUserRegistrationDetails: (item: Partial<signupProps>) => void;
  userRegistrationDetails: signupProps;
  clearRegistrationDetails: () => void;

  user: User | null;
  loading: boolean;
  logout: () => void;
  // login: (email: string, password: string) => Promise<void>;
  // logout: () => void;
}

// Create the initial context value
const initialContext: AuthContextType = {
  userRegistrationDetails: {} as signupProps,
  setUserRegistrationDetails: () => null,
  clearRegistrationDetails: () => null,
  user: null,
  loading: true,
  logout: async () => null,
  // login: async (email: string, password: string) => {},
  // logout: () => {},
};

// Create the AuthContext
const AuthContext = createContext<AuthContextType>(initialContext);

// Create a custom hook to access the AuthContext
export const useAuth = (): AuthContextType => useContext(AuthContext);

const formatAuthUser = (user: any) => ({
  uid: user.uid,
  email: user.email,
});
// Create the AuthProvider component
export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [userRegistrationDetails, _setUserRegistrationDetails] = useState(
    {} as signupProps
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(formatAuthUser(user));
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = useCallback(() => {
    return auth.signOut().then(() => {
      setUser(null);
      setLoading(true);
    });
  }, []);

  const setUserRegistrationDetails = useCallback(
    (item: Partial<signupProps>) => {
      _setUserRegistrationDetails((u) => ({
        ...u,
        ...item,
      }));
    },
    []
  );

  const clearRegistrationDetails = useCallback(() => {
    _setUserRegistrationDetails({} as signupProps);
  }, []);

  const contextValue = useMemo(() => {
    return {
      setUserRegistrationDetails,
      userRegistrationDetails,
      user,
      clearRegistrationDetails,
      loading,
      logout,
    };
  }, [
    setUserRegistrationDetails,
    user,
    userRegistrationDetails,
    clearRegistrationDetails,
    loading,
    logout,
  ]);

  // Provide the AuthContext value to the children components
  return (
    <AuthContext.Provider value={contextValue}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
}
