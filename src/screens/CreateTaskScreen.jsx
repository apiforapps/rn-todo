import React from 'react';

import { Layout } from 'components';
import { TaskForm } from 'features';

export const CreateTaskScreen = ({ navigation }) => {
  return (
    <Layout>
      <TaskForm navigation={navigation} />
    </Layout>
  );
};
