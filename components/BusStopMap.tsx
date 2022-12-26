import React from 'react';
import {StyleSheet, Platform} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

function BusStopMap({
  latitude,
  longitude,
  stopName,
}: {
  latitude: number;
  longitude: number;
  stopName: string;
}) {
  return Platform.OS === 'android' ? (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.0005,
        longitudeDelta: 0.002,
      }}>
      <Marker
        title={stopName}
        coordinate={{latitude: latitude, longitude: longitude}}
      />
    </MapView>
  ) : (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.004,
      }}>
      <Marker
        title={stopName}
        coordinate={{latitude: latitude, longitude: longitude}}
      />
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default BusStopMap;
