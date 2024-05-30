import React, { useContext, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { UserContext } from '../lib/userContext';
import App from '../components/App';
import Header from '../components/Header';
import Container from '../components/Container';
import ErrorMessage from '../components/ErrorMessage';
import Loading from '../components/Loading';
import LoginForm from '../feature-login/LoginForm';

const LOGIN_MUTATION = gql`
  mutation loginUser($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      __typename
      token
      user {
        username
        lastLoggedIn
      }
    }
  }
`;

const LoginPage = () => {
  const { setUser } = useContext(UserContext);
  const [loginUser, { data, loading, error }] = useMutation(LOGIN_MUTATION);

  useEffect(() => {
    if (data && data.login) {
      setUser(data.login);
    }
  }, [data]);

  const submitLogin = ({ username, password }) => {
    loginUser({
      variables: {
        username,
        password,
      },
    }).catch(() => null);
  };

  return (
    <App>
      <Header />
      <Container>
        <LoginForm submitLogin={submitLogin} />
        {loading ? <Loading /> : null}
        {error ? <ErrorMessage error={error} /> : null}
        {data && data.login ? (
          <p>success! welcome {data.login.user.username}</p>
        ) : null}
      </Container>
    </App>
  );
};

export default LoginPage;
