import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Category from '../Category';
import Collection from '../Collection';
import { CategoryParamList } from '../config/types';
import Home from '../Home';
import Photo from '../Photo';
import Photographer from '../Photographer';

const CategoryNavigation = () => {
    const Stack = createNativeStackNavigator<CategoryParamList>();

    return(
       <Stack.Navigator initialRouteName='Category' screenOptions={{ headerBackTitleVisible: false, headerShadowVisible: false, headerTitleAlign: 'center'}}>
            <Stack.Screen name={'Category'} component={Category} options={{headerShown: false, title: 'Category'}}/>
            <Stack.Screen name={'Photographer'} component={Photographer} options={{headerShown: false}}/>
            <Stack.Screen name={'Photo'} component={Photo} options={{headerShown: false}}/>
            <Stack.Screen name={'Collection'} component={Collection} options={{headerShown: false}}/>
       </Stack.Navigator>
    )
}

export default CategoryNavigation;