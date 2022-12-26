import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {useAppNavigation, useAppRoute} from '../Route';
import BusStopMap from '../components/BusStopMap';
// import {LatLng, LeafletView} from 'react-native-leaflet-view';

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

function BusDetailsScreen() {
  const navigation = useAppNavigation();
  const route = useAppRoute<'BusDetailsScreen'>();
  const {busRouteInfo, filtered_busStopName} = route.params;
  const [busStopETA, setBusStopETA] = useState<StopETAType[]>([]);

  function fetchBusStopETA() {
    fetch(
      `https://data.etabus.gov.hk/v1/transport/kmb/eta/${busRouteInfo.bus_stop}/${busRouteInfo.route}/1`,
      {method: 'GET'},
    )
      .then(response => response.json())
      .then(response => response['data'])
      .then(response => setBusStopETA(response))
      .catch(err => {
        console.error(err, 'Error from fetching BFA3460955AC820C');
      });
  }

  useEffect(() => {
    navigation.setOptions({
      title: busRouteInfo.route + ' ' + '往' + ' ' + busRouteInfo.dest_tc,
      animationTypeForReplace: 'pop',
      headerTitleStyle: {
        fontWeight: '500',
        fontSize: 17,
      },
    });
    fetchBusStopETA();
  }, []);

  function timeDifferenceCalculator(ETA: string) {
    let timeDifference =
      (new Date(ETA).getTime() - new Date().getTime()) / 1000 / 60;
    if (timeDifference > 0) {
      return Math.ceil(timeDifference);
    } else {
      return '-';
    }
  }

  let latitude = 0;
  let longitude = 0;
  let stopName = '';
  if (filtered_busStopName) {
    latitude = parseFloat(filtered_busStopName[0]['lat']);
    longitude = parseFloat(filtered_busStopName[0]['long']);
    stopName = filtered_busStopName[0]['name_tc'];
  }

  return (
    <View style={styles.scrollViewContainer}>
      <View style={styles.mapContainer}>
        <BusStopMap
          latitude={latitude}
          longitude={longitude}
          stopName={stopName}
        />
      </View>
      <View style={styles.ETAContainer}>
        <View style={styles.ETA_stopName_container}>
          <Text style={styles.ETA_stopName_Text}>
            {filtered_busStopName[0]['name_tc']}
          </Text>
        </View>
        {busStopETA.map((item, index) => {
          return (
            <View style={styles.ETA_eta_big_container} key={index}>
              <View style={styles.ETA_eta_min_container}>
                <Text style={styles.ETA_eta_min_text}>
                  {!item.eta ? '-' : timeDifferenceCalculator(item.eta)}
                </Text>
                <Text>分鐘</Text>
              </View>
              <View style={styles.ETA_eta_rmk_container}>
                <Text style={styles.ETA_eta_rmk_text}>
                  {item.rmk_tc == '原定班次' ? '預定班次' : ''}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {flex: 1, height: '100%'},
  mapContainer: {
    flex: 1.65,
    height: '100%',
    width: '100%',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  ETAContainer: {
    flex: 1,
    // borderWidth: 1,
    borderColor: 'black',
  },
  ETA_stopName_container: {
    justifyContent: 'center',
    // height: '30%',
    // marginVertical: 20,
    marginTop: 40,
    marginBottom: 20,
    marginLeft: 30,
  },
  ETA_stopName_Text: {
    fontSize: 26,
    color: '#404040',
  },
  ETA_eta_big_container: {
    marginLeft: 60,
    width: '40%',
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  ETA_eta_min_container: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'flex-end',
    marginVertical: 5,
    width: 70,
  },
  ETA_eta_min_text: {
    fontSize: 23,
    marginRight: 7,
    color: '#2E63B0',
  },
  ETA_eta_rmk_container: {
    marginLeft: 7,
  },
  ETA_eta_rmk_text: {
    fontSize: 20,
    color: '#545E65',
  },
});

export default BusDetailsScreen;
