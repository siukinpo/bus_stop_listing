import React, {useCallback, useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  ScrollView,
  StyleSheet,
  View,
  RefreshControl,
  LogBox,
} from 'react-native';
import BusStopItem from '../components/BusStopItem';

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

const wait = (timeout: number) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};
LogBox.ignoreLogs(['Network request failed']);

function BusStopsScreen() {
  const [stopETAInfoBFA, setStopETAInfoBFA] = useState<StopETAType[]>([]);
  const [stopETAInfo5FB, setStopETAInfo5FB] = useState<StopETAType[]>([]);
  const [busStopInfo, setBusStopInfo] = useState<StopInfoType[]>([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const busStopSaved = ['BFA3460955AC820C', '5FB1FCAF80F3D97D'];

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    const reloadBusStopInfo = new Promise(async (resolve, reject) => {
      await fetchBusStopInfo();
      resolve('');
    });

    reloadBusStopInfo
      .then(async () => {
        await wait(1000);
      })
      .then(() => {
        setRefreshing(false);
      });
  }, []);

  function fetchBusStopInfo() {
    fetch(
      'https://data.etabus.gov.hk/v1/transport/kmb/stop-eta/BFA3460955AC820C',
      {method: 'GET'},
    )
      .then(response => response.json())
      .then(response => response['data'])
      .then(response =>
        response
          .map((item: StopETAType) => {
            item.bus_stop = 'BFA3460955AC820C';
            return item;
          })
          .filter((item: StopETAType) => {
            return item.eta_seq == 1;
          }),
      )
      .then(response => setStopETAInfoBFA(response))
      .catch(err => {
        console.error(err, 'Error from fetching BFA3460955AC820C');
      });

    fetch(
      'https://data.etabus.gov.hk/v1/transport/kmb/stop-eta/5FB1FCAF80F3D97D',
      {method: 'GET'},
    )
      .then(response => response.json())
      .then(response => response['data'])
      .then(response =>
        response
          .map((item: StopETAType) => {
            item.bus_stop = '5FB1FCAF80F3D97D';
            return item;
          })
          .filter((item: StopETAType) => {
            return item.eta_seq == 1;
          }),
      )
      .then(response => setStopETAInfo5FB(response))
      .catch(err => {
        console.error(err, 'Error from fetching 5FB1FCAF80F3D97D');
        Alert.alert('Fail to Get the Information, please try later');
      });
  }

  function fetchBusStopName() {
    fetch(`https://data.etabus.gov.hk/v1/transport/kmb/stop`, {method: 'GET'})
      .then(response => response.json())
      .then(response => response['data'])
      .then(response =>
        response.filter((item: StopInfoType) =>
          busStopSaved.includes(item.stop),
        ),
      )
      .then(response => setBusStopInfo(response))
      .catch(err => {
        console.error(err, 'Error from fetching Bus Stop Information');
      });
  }

  useEffect(() => {
    fetchBusStopName();
    fetchBusStopInfo();
    setInterval(() => {
      fetchBusStopInfo();
    }, 30000);
  }, []);

  return (
    <View style={styles.scrollViewContainer}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {stopETAInfoBFA.map((item, index) => {
          return (
            <BusStopItem
              busRouteInfo={item}
              busStopInfo={busStopInfo}
              key={index}
            />
          );
        })}
        {stopETAInfo5FB.map((item, index) => {
          return (
            <BusStopItem
              busRouteInfo={item}
              busStopInfo={busStopInfo}
              key={index}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    height: '100%',
  },
  scrollViewContainer: {
    height: '98.5%',
    flex: 1,
  },
});

export default BusStopsScreen;
