import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Category from '../Category';
import { CategoryParamList } from '../config/types';
import Home from '../Home';

const CategoryNavigation = () => {
    const Stack = createNativeStackNavigator<CategoryParamList>();

    return(
       <Stack.Navigator initialRouteName='Category' screenOptions={{ headerBackTitleVisible: false, headerShadowVisible: false, headerTitleAlign: 'center'}}>
            <Stack.Screen name={'Category'} component={Category} options={{headerShown: false, title: 'Category'}}/>

       </Stack.Navigator>
    )
}

export default CategoryNavigation;