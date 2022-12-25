import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

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

export type AppParamList = {
  BusStopsScreen: {};
  BusDetailsScreen: {
    busRouteInfo: StopETAType;
    filtered_busStopName: StopInfoType[];
  };
  Login: {};
};

export const AppStack = createNativeStackNavigator<AppParamList>();

export const useAppNavigation = () => {
  return useNavigation<NavigationProp<AppParamList>>();
};

export const useAppRoute = <T extends keyof AppParamList>() => {
  return useRoute<RouteProp<AppParamList, T>>();
};
