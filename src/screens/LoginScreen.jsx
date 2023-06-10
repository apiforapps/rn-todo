import React, { useContext, useEffect } from 'react';

import { Layout } from 'components';
import { LoginForm } from 'features';
import { AuthContext } from 'context';

export const LoginScreen = ({ navigation }) => {
  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (token) {
      navigation.navigate('TasksScreen');
    }
  }, [token]);

  return (
    <Layout>
      <LoginForm navigation={navigation} />
    </Layout>
  );
};
