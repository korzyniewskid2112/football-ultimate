import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeParamList } from '../config/types';
import Home from '../Home';

const FavNavigation = () => {
    const Stack = createNativeStackNavigator<HomeParamList>();

    return(
       <Stack.Navigator initialRouteName='Home' screenOptions={{ headerBackTitleVisible: false, headerShadowVisible: false, headerTitleAlign: 'center'}}>
            <Stack.Screen name={'Home'} component={Home} options={{headerShown: false, title: 'Home'}}/>

       </Stack.Navigator>
    )
}

export default FavNavigation;