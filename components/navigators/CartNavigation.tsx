import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Cart from '../Cart';
import Collection from '../Collection';
import { CartParamList } from '../config/types';
import Photo from '../Photo';
import Photographer from '../Photographer';

const CartNavigation = () => {
    const Stack = createNativeStackNavigator<CartParamList>();

    return(
       <Stack.Navigator initialRouteName='Cart' screenOptions={{ headerBackTitleVisible: false, headerShadowVisible: false, headerTitleAlign: 'center'}}>
            <Stack.Screen name={'Cart'} component={Cart} options={{headerShown: false, title: 'Category'}}/>
            <Stack.Screen name={'Photographer'} component={Photographer} options={{headerShown: false}}/>
            <Stack.Screen name={'Photo'} component={Photo} options={{headerShown: false}}/>
            <Stack.Screen name={'Collection'} component={Collection} options={{headerShown: false}}/>
       </Stack.Navigator>
    )
}

export default CartNavigation;