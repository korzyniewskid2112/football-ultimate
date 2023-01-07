import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainParamList } from '../config/types';
import PaymentDemo from '../PaymentDemo';
import TabsNavigation from './TabsNavigation';

const MainNavigation = () => {

      const Stack = createNativeStackNavigator<MainParamList>();
      return (
            <Stack.Navigator initialRouteName='TabsNavigation' screenOptions={{ headerBackTitleVisible: false, headerShadowVisible: false }}>
                  <Stack.Screen name='TabsNavigation' component={TabsNavigation} options={{ headerShown: false }} />
                  <Stack.Screen name='PaymentDemo' component={PaymentDemo} options={{ headerShown: true, title: 'Confirm' }} />
            </Stack.Navigator>
      );

}

export default MainNavigation;