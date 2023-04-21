import {useState} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import {BleManager, Device} from 'react-native-ble-plx';

type PermissionCallback = (result: boolean) => void;

interface BluetoothLowEnergyApi {
  requestPermissions(callback: PermissionCallback): Promise<void>;
  scanForDevices(): void;
  devices: Device[];
}

const bleManager = new BleManager();

export default function useBLE(): BluetoothLowEnergyApi {
  const [devices, setDevices] = useState<Device[]>([]);

  const requestPermissions = async (callback: PermissionCallback) => {
    if (Platform.OS === 'android') {
      const grantedStatus = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'BLE needs location permission',
          buttonNegative: 'Cancel',
          buttonPositive: 'Ok',
          buttonNeutral: 'Maybe later',
        },
      );
      callback(grantedStatus === PermissionsAndroid.RESULTS.GRANTED);
    } else {
      callback(true);
    }
  };

  const isDuplicateDevice = (_devices: Device[], nextDevice: Device) => {
    return _devices.findIndex(e => nextDevice.id === e.id) > -1;
  };

  const scanForDevices = () => {
    bleManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.log(error);
      }
      if (device && !!device.name) {
        setDevices(prevState => {
          if (!isDuplicateDevice(prevState, device)) {
            return [...prevState, device];
          }
          return prevState;
        });
      }
    });
  };

  return {
    requestPermissions,
    scanForDevices,
    devices,
  };
}
