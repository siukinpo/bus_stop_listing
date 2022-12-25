import React, {useEffect} from 'react';
import {Pressable, View, Text, StyleSheet, Alert, LogBox} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useAppNavigation} from '../Route';

interface StopETAType {
  co: string;
  route: string;
  dir: string;
  service_type: number;
  seq: number;
  dest_tc: string;
  dest_sc: string;
  dest_en: string;
  eta_seq: number;
  eta: string;
  rmk_tc: string;
  rmk_sc: string;
  rmk_en: string;
  data_timestamp: string;
  bus_stop: string;
}
interface StopInfoType {
  stop: string;
  name_en: string;
  name_tc: string;
  name_sc: string;
  lat: string;
  long: string;
}
LogBox.ignoreLogs(['Could not find Fiber with id "32"']);

function BusStopItem({
  busRouteInfo,
  busStopInfo,
}: {
  busRouteInfo: StopETAType;
  busStopInfo: StopInfoType[];
}) {
  // const navigation = useNavigation();
  const navigation = useAppNavigation();

  let filtered_busStopName_name = '';
  let filtered_busStopName: StopInfoType[];
  if (busStopInfo && busStopInfo.length >= 1) {
    filtered_busStopName = busStopInfo.filter(item => {
      return item['stop'] == busRouteInfo.bus_stop;
    });
    filtered_busStopName_name = filtered_busStopName[0]['name_tc'];
  }

  let timeDifference =
    (new Date(busRouteInfo.eta).getTime() - new Date().getTime()) / 1000 / 60;

  function pressHandler() {
    navigation.navigate('BusDetailsScreen', {
      busRouteInfo,
      filtered_busStopName,
    });
  }

  return (
    <Pressable
      android_ripple={{color: '#ccc'}}
      style={({pressed}) => [
        styles.stopItemContainer,
        pressed ? styles.buttonPressed : null,
      ]}
      onPress={pressHandler}>
      <View style={styles.routeContainer}>
        <Text style={styles.routeText}>{busRouteInfo.route}</Text>
      </View>
      <View style={styles.destStopContainer}>
        <View style={styles.destContainer}>
          <Text style={{marginRight: 7}}>往</Text>
          <Text style={styles.destText}>{busRouteInfo.dest_tc}</Text>
        </View>
        <View style={styles.stopContainer}>
          <Text style={styles.stopText}>{filtered_busStopName_name}</Text>
        </View>
      </View>
      <View style={styles.etaContainer}>
        {/* <Text>{busRouteInfo.eta}</Text> */}
        <View style={styles.etaMinContainer}>
          <Text style={styles.etaMinText}>
            {timeDifference > 0 ? Math.ceil(timeDifference) : '-'}
          </Text>
        </View>
        <View style={styles.etaWordContainer}>
          <Text>分鐘</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonPressed: {
    // opacity: 0.5,
    backgroundColor: '#E3E3E3',
  },
  stopItemContainer: {
    borderWidth: 1,
    borderColor: '#E3E3E3',
    height: 70,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  routeContainer: {
    height: '100%',
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  routeText: {
    fontWeight: '800',
    fontSize: 22,
    color: '#3C4750',
  },
  destStopContainer: {
    width: '50%',
    marginLeft: 13,
  },
  destContainer: {
    flex: 1.5,
    // justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  destText: {
    color: '#3C4750',
    fontWeight: '800',
    fontSize: 25,
  },
  stopContainer: {flex: 1, justifyContent: 'center'},
  stopText: {color: '#47525B', fontSize: 18},
  etaContainer: {
    width: '23%',
  },
  etaMinContainer: {
    flex: 1.5,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  etaMinText: {
    fontSize: 28,
    color: '#2E63B0',
  },
  etaWordContainer: {flex: 1, justifyContent: 'center', alignItems: 'flex-end'},
});

export default BusStopItem;
