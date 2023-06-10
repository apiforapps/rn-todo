import React, { useContext, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Pressable,
  ActivityIndicator,
  Keyboard,
} from 'react-native';

import { TextInput } from 'components';
import { TaskContext } from 'context';

export const TaskForm = ({ navigation }) => {
  const {
    isLoading,
    username,
    email,
    text,
    status,
    current,
    setUsername,
    setEmail,
    setText,
    setStatus,
    reset,
    createTask,
    editTask,
  } = useContext(TaskContext);

  useEffect(() => {
    if (current) {
      setUsername(current.username);
      setEmail(current.email);
      setText(current.text);
      setStatus(current.status);
    }
  }, [current]);

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
          onPress={() => {
            reset();
            navigation.goBack();
          }}
        >
          <Text style={styles.label}>Go Back</Text>
        </Pressable>
        <TextInput
          placeholder={'Name'}
          value={username}
          setValue={setUsername}
          editable={current ? false : true}
        />
        <TextInput
          placeholder={'Email'}
          value={email}
          setValue={setEmail}
          editable={current ? false : true}
        />
        <TextInput
          placeholder={'Text'}
          value={text}
          setValue={(newText) => {
            setText(newText);
            if (current) {
              if (status === 0 && newText !== current.text) {
                setStatus(1);
              } else if (status === 10 && newText !== current.text) {
                setStatus(11);
              }
            }
          }}
        />
        {current && (
          <Pressable
            style={[
              styles.button,
              {
                backgroundColor:
                  status === 0 || status === 1 ? '#7F8C8D' : '#27AE60',
              },
            ]}
            onPress={() =>
              status === 0 || status === 1 ? setStatus(10) : setStatus(0)
            }
          >
            {status === 0 || status === 1 ? (
              <Text style={styles.label}>Not completed</Text>
            ) : (
              <Text style={styles.label}>Completed</Text>
            )}
          </Pressable>
        )}
        <Pressable
          style={[
            styles.button,
            { backgroundColor: '#27AE60', alignSelf: 'center' },
          ]}
          onPress={() => (current ? editTask() : createTask())}
        >
          <Text style={styles.label}>
            {isLoading ? <ActivityIndicator /> : 'Save'}
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
