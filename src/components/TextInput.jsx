import React from 'react';
import ReactNative, { StyleSheet, View, Text } from 'react-native';

export const TextInput = ({
  value,
  setValue,
  placeholder,
  type,
  autoFocus,
  secureTextEntry,
  editable,
}) => {
  return (
    <View style={styles.container}>
      {value?.length > 0 ? (
        <Text style={styles.label}>{placeholder}</Text>
      ) : null}
      <ReactNative.TextInput
        value={value}
        onChangeText={setValue}
        autoCorrect={false}
        placeholder={placeholder}
        placeholderTextColor={'#ABABAB'}
        style={[
          styles.textInput,
          {
            paddingTop: value?.length > 0 ? 14 : null,
          },
        ]}
        keyboardType={type}
        autoFocus={autoFocus}
        secureTextEntry={secureTextEntry}
        editable={editable}
      />
    </View>
  );
};

TextInput.defaultProps = {
  type: 'default',
  editable: true,
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginVertical: 3,
  },
  label: {
    color: '#ABABAB',
    fontSize: 10,
    position: 'absolute',
    top: 10,
    left: 16,
    zIndex: 1,
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    height: 55,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 16,
    color: '#3C6630',
    fontWeight: '500',
    borderColor: '#C8E1C0',
  },
});
