import React from 'react';
import {
  Button,
  FlatList,
  ListRenderItemInfo,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import useBLE from './hooks/useBLE';
import {Device} from 'react-native-ble-plx';
import DeviceComponent from './components/DeviceComponent';

function App(): JSX.Element {
  const {requestPermissions, scanForDevices, devices} = useBLE();

  const onScanForDevices = () => {
    requestPermissions((isGranted: boolean) => {
      if (isGranted) {
        scanForDevices();
      }
    });
  };

  const renderItem = ({item}: ListRenderItemInfo<Device>) => {
    return <DeviceComponent {...item} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <FlatList<Device>
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        data={devices}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <Button title="Connect" onPress={onScanForDevices} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    paddingHorizontal: 32,
  },
});

export default App;
