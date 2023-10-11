import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const PrimaryButton = ({
  title,
  onPress,
  disabled,
}: {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      disabled={disabled}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FFCF96',
    alignSelf: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    minWidth: 200,
  },

  text: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
});
