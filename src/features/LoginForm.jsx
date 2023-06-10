import React, { useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
  ActivityIndicator,
} from 'react-native';

import { TextInput } from 'components';
import { AuthContext } from 'context';

export const LoginForm = ({ navigation }) => {
  const { isLoading, username, password, setUsername, setPassword, login } =
    useContext(AuthContext);
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Pressable
          style={[
            styles.button,
            {
              backgroundColor: '#7F8C8D',
              alignSelf: 'flex-start',
              marginBottom: 80,
            },
          ]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.label}>Go Back</Text>
        </Pressable>
        <TextInput
          placeholder={'Name'}
          value={username}
          setValue={setUsername}
        />
        <TextInput
          placeholder={'Password'}
          value={password}
          setValue={setPassword}
          secureTextEntry
          type={'number-pad'}
        />
        <Pressable
          style={[
            styles.button,
            { backgroundColor: '#34495E', alignSelf: 'center' },
          ]}
          onPress={() => login()}
        >
          <Text style={styles.label}>
            {isLoading ? <ActivityIndicator /> : 'Login'}
          </Text>
        </Pressable>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 4,
    marginVertical: 8,
  },
  label: {
    color: '#FFF',
    textTransform: 'uppercase',
    fontSize: 12,
    fontWeight: 500,
  },
});
