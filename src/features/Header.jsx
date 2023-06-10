import React, { useContext } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthContext, TaskContext } from 'context';

export const Header = ({ navigation }) => {
  const { token, setToken } = useContext(AuthContext);
  const { reset } = useContext(TaskContext);

  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.button, { backgroundColor: '#27AE60' }]}
        onPress={() => {
          reset();
          navigation.navigate('CreateTaskScreen');
        }}
      >
        <Text style={styles.label}>New task</Text>
      </Pressable>
      <Pressable
        style={[styles.button, { backgroundColor: '#34495E' }]}
        onPress={() =>
          token
            ? (AsyncStorage.clear(), setToken(null))
            : navigation.navigate('LoginScreen')
        }
      >
        <Text style={styles.label}>{token ? 'Logout' : 'Login'}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 4,
  },
  label: {
    color: '#FFF',
    textTransform: 'uppercase',
    fontSize: 12,
    fontWeight: 500,
  },
});
