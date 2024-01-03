import { ReactElement, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTabBarProps, BottomTabHeaderProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import FactsScreen from './screens/FactsScreen';
import DriversStandingsScreen from './screens/DriversStandingsScreen';
import ConstructorsStandingsScreen from './screens/ConstructorsStandingsScreen';
import CalendarScreen from './screens/CalendarScreen';
import BottomNavBar from './components/BottomNavBar';
import SingleGPScreen from './screens/SingleGPScreen';
import TopBar from './components/TopBar';
import AppContext from './AppContext';

async function updateAudioSetting(state: boolean) {
  await SecureStore.setItemAsync("audio-on-setting", state ? "true" : "false");
}

async function updateVibrationSetting(state: boolean) {
  await SecureStore.setItemAsync("vibration-on-setting", state ? "true" : "false");
}

export default function App(): ReactElement<any, any> {

  const Tab = createBottomTabNavigator();

  const [audioOn, setAudioOn] = useState<boolean | undefined>()
  const [vibrationOn, setVibrationOn] = useState<boolean | undefined>()

  useEffect(() => {
    async function saveSetting() {
      if (audioOn != undefined) await updateAudioSetting(audioOn)
    }
    saveSetting()
  }, [audioOn])
  
  useEffect(() => {
    async function saveSetting() {
      if (vibrationOn != undefined) await updateVibrationSetting(vibrationOn)
    }
    saveSetting()
  }, [vibrationOn])

  useEffect(() => {
    async function getSettings() {
      if(await SecureStore.getItemAsync("audio-on-setting")) setAudioOn(await SecureStore.getItemAsync("audio-on-setting") == "true")
      else setAudioOn(false)
      if(await SecureStore.getItemAsync("vibration-on-setting")) setVibrationOn(await SecureStore.getItemAsync("vibration-on-setting") == "true")
      else setVibrationOn(false)
    }

    getSettings()
  }, [])
  
  

  return (
    <AppContext.Provider value={{ audioOn, setAudioOn, vibrationOn, setVibrationOn }}>
       <NavigationContainer>
        <Tab.Navigator screenOptions={{ header: (props: BottomTabHeaderProps) => <TopBar /> }} tabBar={(props: BottomTabBarProps) => <BottomNavBar {...props} />}>
          <Tab.Screen name="Facts" component={FactsScreen} />
          <Tab.Screen name="Drivers standings" component={DriversStandingsScreen} />
          <Tab.Screen name="Constructors standings" component={ConstructorsStandingsScreen} />
          <Tab.Screen name="Calendar" component={CalendarScreen} />
          <Tab.Screen name="SingleGPScreen" component={SingleGPScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
   
  );
}