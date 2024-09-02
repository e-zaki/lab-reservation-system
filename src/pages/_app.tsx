import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';

// This is the main App component that wraps all page components
function MyApp({ Component, pageProps }: AppProps) {
  return (
    // Wrap the entire application in the SessionProvider to make session data available globally
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
