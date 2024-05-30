import React, { useContext, useEffect } from 'react';

import { UserContext } from '../lib/userContext';
import App from '../components/App';
import Header from '../components/Header';
import Container from '../components/Container';

const LogoutPage = () => {
  const { user } = useContext(UserContext);

  useEffect(() => {
    // This will log the user out, as login is only in client-side state right now
    if (user && window && window.location) {
      window.location.reload();
    }
  }, [user]);

  return (
    <App>
      <Header />
      <Container>
        {user ? (
          <p>Logging out...</p>
        ) : (
          <p>You have successfully logged out.</p>
        )}
      </Container>
    </App>
  );
};

export default LogoutPage;
