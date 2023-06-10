import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Provider } from 'utils';
import { AuthProvider, TaskProvider } from 'context';
import {
  TasksScreen,
  LoginScreen,
  CreateTaskScreen,
  EditTaskScreen,
} from 'screens';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureDirection: 'vertical',
        }}
      >
        <Stack.Group>
          <Stack.Screen name={'TasksScreen'} component={TasksScreen} />
          <Stack.Screen
            name={'CreateTaskScreen'}
            component={CreateTaskScreen}
          />
          <Stack.Screen name={'EditTaskScreen'} component={EditTaskScreen} />
        </Stack.Group>
        <Stack.Screen name={'LoginScreen'} component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default () => {
  return (
    <Provider providers={[AuthProvider, TaskProvider]}>
      <App />
    </Provider>
  );
};
