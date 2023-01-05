import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { fonts } from './../config/const';
import CustomTabs from '../customs/CustomTabs';
import HomeNavigation from './HomeNavigation';
import { TabParamList } from '../config/types';
import FavNavigation from './FavNavigation';
import CategoryNavigation from './CategoryNavigation';
import CartNavigation from './CartNavigation';


const TabsNavigation = () => {

    const Tab = createBottomTabNavigator<TabParamList>();
    return (
        <Tab.Navigator
            initialRouteName='HomeNavigation'
            screenOptions={{ headerTitleStyle: { fontFamily: fonts.family.roboto.medium, fontSize: fonts.size.large }, headerShown: false }}
            tabBar={props => <CustomTabs {...props} />}
        >
            <Tab.Screen name={'HomeNavigation'} component={HomeNavigation} />
            <Tab.Screen name={'CategoryNavigation'} component={CategoryNavigation} />
            <Tab.Screen name={'FavNavigation'} component={FavNavigation} />
            <Tab.Screen name={'CartNavigation'} component={CartNavigation} />
        </Tab.Navigator>
    )

}

export default TabsNavigation;