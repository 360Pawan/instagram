import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';

const PrimaryButton = ({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
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
