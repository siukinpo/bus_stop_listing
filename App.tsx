import React, {Fragment, type PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {GlobalStyles} from './constants/styles';
import BusStopsScreen from './screens/BusStopsScreen';
import BusDetailsScreen from './screens/BusDetailsScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useAppRoute} from './Route';

const Stack = createNativeStackNavigator();

const App = () => {
  // const isDarkMode = useColorScheme() === 'dark';

  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };
  const backgroundStyle = {
    backgroundColor: GlobalStyles.colors.header,
  };
  const backgroundStyleBottom = {
    backgroundColor: 'white',
  };

  return (
    // <SafeAreaView style={[backgroundStyle, {flex: 1}]}>
    <Fragment>
      <SafeAreaView style={[{flex: 0}, backgroundStyle]} />
      <SafeAreaView style={[{flex: 1}, backgroundStyleBottom]}>
        <StatusBar
          // barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={GlobalStyles.colors.header}
        />

        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {backgroundColor: GlobalStyles.colors.header},
              headerTintColor: 'white',
              headerTitleStyle: {
                fontWeight: '500',
                fontSize: 20,
              },
            }}>
            <Stack.Screen
              name="BusStopList"
              component={BusStopsScreen}
              options={{
                title: '巴士站列表',
              }}
            />
            <Stack.Screen
              name="BusDetailsScreen"
              component={BusDetailsScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
        {/* <BusDetailsScreen /> */}
      </SafeAreaView>
    </Fragment>
  );
};

export default App;
