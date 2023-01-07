import { useFonts } from '@expo-google-fonts/roboto';
import { StatusBar } from 'expo-status-bar';
import { Text, useColorScheme } from 'react-native';
import { Roboto_100Thin, Roboto_300Light, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold, Roboto_900Black } from '@expo-google-fonts/roboto';
import { LightTheme, DarkTheme } from './components/config/const';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import MainNavigation from './components/navigators/MainNavigation';
import { Provider } from 'react-redux';
import store, { persistStored } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import LoadingSplash from './components/LoadingSplash';

export default function App() {

  const getColor = useColorScheme();

  let [fontsLoaded] = useFonts({
    Roboto_100Thin,
    Roboto_300Light,
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
    Roboto_900Black,
  });

  return (
    fontsLoaded && (
      <>
        <Provider store={store}>
          <PersistGate persistor={persistStored} loading={<LoadingSplash />}>
            <StatusBar style="auto" />
            <SafeAreaProvider>
              <NavigationContainer theme={getColor == 'light' ? LightTheme : DarkTheme}>
                <MainNavigation />
              </NavigationContainer>
            </SafeAreaProvider>
          </PersistGate>
        </Provider>
      </>
    )
  );
}
