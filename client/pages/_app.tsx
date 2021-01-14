import React, { useContext, useEffect, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { themeLight, themeDark } from 'lib/theme';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from 'lib/apollo';
import { AuthContext, auth } from 'lib/useAuth';

export default function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  const [darkState, setDarkState] = useState(false);
  const handleThemeChange = () => {
    setDarkState(!darkState);
  };
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);

  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={darkState ? themeDark : themeLight}>
        <CssBaseline />
        <AuthContext.Provider value={auth}>
          <Component
            {...pageProps}
            handleThemeChange={handleThemeChange}
            darkState={darkState}
          />
        </AuthContext.Provider>
      </ThemeProvider>
    </ApolloProvider>
  );
}
