import { useFonts } from '@expo-google-fonts/roboto';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import { Roboto_100Thin, Roboto_300Light, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold, Roboto_900Black } from '@expo-google-fonts/roboto';
import { LightTheme, DarkTheme } from './components/config/const';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import MainNavigation from './components/navigators/MainNavigation';

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
          <StatusBar style="auto" />
          <SafeAreaProvider>
            <NavigationContainer theme={getColor == 'light' ? LightTheme : DarkTheme}>
                <MainNavigation />
            </NavigationContainer>
          </SafeAreaProvider>
      </>
    )
  );
}
