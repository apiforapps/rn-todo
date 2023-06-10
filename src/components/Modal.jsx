import React from 'react';
import ReactNative, { StyleSheet, View, Pressable } from 'react-native';

export const Modal = ({
  children,
  height,
  showModal,
  setShowModal,
  backgroundColor,
}) => {
  return (
    <ReactNative.Modal
      animationType={'slide'}
      transparent={true}
      visible={showModal}
      onRequestClose={setShowModal}
    >
      <Pressable
        accessibilityLabel={
          'The area where the modal window will close when pressed.'
        }
        style={{
          flex: 1,
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
        }}
        onPressOut={setShowModal}
      >
        <View style={[styles.modal, { height, backgroundColor }]}>
          <View style={styles.headLine} />
          {children}
        </View>
      </Pressable>
    </ReactNative.Modal>
  );
};

Modal.defaultProps = {
  backgroundColor: '#121212',
};

const styles = StyleSheet.create({
  modal: {
    width: '100%',
    paddingHorizontal: 12,
    paddingVertical: 30,
    marginTop: 'auto',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'relative',
    shadowColor: '#000000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
  headLine: {
    width: 70,
    height: 4,
    backgroundColor: '#FFF',
    borderRadius: 4,
    alignSelf: 'center',
    marginTop: -16,
    marginBottom: 4,
  },
});
