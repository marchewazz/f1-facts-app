import { ReactElement } from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import FactsScreen from './screens/FactsScreen';
import DriversStandingsScreen from './screens/DriversStandingsScreen';
import ConstructorsStandingsScreen from './screens/ConstructorsStandingsScreen';
import CalendarScreen from './screens/CalendarScreen';
import BottomNavBar from './components/BottomNavBar';
import SingleGPScreen from './screens/SingleGPScreen';

export default function App(): ReactElement<any, any> {

  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={(props: BottomTabBarProps) => <BottomNavBar {...props} />}>
        <Tab.Screen name="Facts" component={FactsScreen} />
        <Tab.Screen name="Drivers standings" component={DriversStandingsScreen} />
        <Tab.Screen name="Constructors standings" component={ConstructorsStandingsScreen} />
        <Tab.Screen name="Calendar" component={CalendarScreen} />
        <Tab.Screen name="SingleGPScreen" component={SingleGPScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}