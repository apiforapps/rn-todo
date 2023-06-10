import React from 'react';

import { Layout } from 'components';
import { Header, TasksList } from 'features';

export const TasksScreen = ({ navigation }) => {
  return (
    <Layout>
      <Header navigation={navigation} />
      <TasksList navigation={navigation} />
    </Layout>
  );
};
