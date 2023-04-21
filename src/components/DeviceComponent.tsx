import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Device} from 'react-native-ble-plx';

const DeviceComponent = (props: Device) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.name}>{props.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  name: {
    fontSize: 24,
  },
});

export default DeviceComponent;
