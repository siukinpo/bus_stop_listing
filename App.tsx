import React, {Fragment, type PropsWithChildren} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';

import {GlobalStyles} from './constants/styles';
import BusStopsScreen from './screens/BusStopsScreen';
import BusDetailsScreen from './screens/BusDetailsScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {
  const backgroundStyle = {
    backgroundColor: GlobalStyles.colors.header,
  };
  const backgroundStyleBottom = {
    backgroundColor: 'white',
  };

  return (
    <Fragment>
      <SafeAreaView style={[{flex: 0}, backgroundStyle]} />
      <SafeAreaView style={[{flex: 1}, backgroundStyleBottom]}>
        <StatusBar backgroundColor={GlobalStyles.colors.header} />

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
