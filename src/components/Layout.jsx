import React, { Fragment } from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export const Layout = ({ children }) => {
  return (
    <Fragment>
      <View style={styles.container}>{children}</View>
      <StatusBar
        animated={true}
        translucent
        backgroundColor={'transparent'}
        barStyle={'auto'}
      />
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 50,
    paddingBottom: 30,
  },
});
