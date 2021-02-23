import { useState, useContext, createContext } from 'react';
import { useApolloClient } from '@apollo/client';
import { useSignInMutation } from 'lib/graphql/signin.graphql';
import { useSignUpMutation } from 'lib/graphql/signup.graphql';
import { useCurrentUserQuery } from 'lib/graphql/currentUser.graphql';
import { useRouter } from 'next/router';
import cogoToast from 'cogo-toast';

type AuthProps = {
  user: any;
  error: string;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => void;
};

export const AuthContext = createContext<Partial<AuthProps>>({});

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};

function useProvideAuth() {
  const client = useApolloClient();
  const router = useRouter();

  const [error, setError] = useState('');
  const { data } = useCurrentUserQuery({
    fetchPolicy: 'network-only',
    errorPolicy: 'ignore',
  });
  const user = data && data.currentUser;

  // Signing In
  const [signInMutation] = useSignInMutation();
  // Signing Up
  const [signUpMutation] = useSignUpMutation();

  const signIn = async (email, password) => {
    try {
      const { data } = await signInMutation({ variables: { email, password } });
      if (data.login.token && data.login.user) {
        sessionStorage.setItem('token', data.login.token);
        client.resetStore().then(() => {
          cogoToast.success('Welcome to Spotlight!');
          router.push('/');
        });
      } else {
        setError('Invalid Login');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const signUp = async (email, password) => {
    try {
      const { data } = await signUpMutation({ variables: { email, password } });
      if (data.register.token && data.register.user) {
        sessionStorage.setItem('token', data.register.token);
        client.resetStore().then(() => {
          cogoToast.success('Account on SpotLight was created!');
          router.push('/');
        });
      } else {
        setError('Invalid Login');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const signOut = () => {
    sessionStorage.removeItem('token');
    client.resetStore().then(() => {
      cogoToast.success('See you soon!');
      setTimeout(() => {
        router.push('/');
      }, 400);
    });
  };

  return {
    user,
    error,
    signIn,
    signUp,
    signOut,
  };
}
