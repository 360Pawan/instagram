import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const CustomHeader = props => {
  console.log(props);

  return (
    <View>
      <Text>Header</Text>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({});
