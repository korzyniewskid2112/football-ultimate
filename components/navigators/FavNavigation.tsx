import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FavParamList } from '../config/types';
import Fav from '../Fav';

const FavNavigation = () => {
    const Stack = createNativeStackNavigator<FavParamList>();

    return(
       <Stack.Navigator initialRouteName='Fav' screenOptions={{ headerBackTitleVisible: false, headerShadowVisible: false, headerTitleAlign: 'center'}}>
            <Stack.Screen name={'Fav'} component={Fav} options={{headerShown: false}} />

       </Stack.Navigator>
    )
}

export default FavNavigation;