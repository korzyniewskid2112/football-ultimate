import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import getColors, { fonts } from './../config/const';
import { useState } from 'react';
import TextCustom from './TextCustom';

const CustomTabs = ({ state, descriptors, navigation }: BottomTabBarProps) => {

    const insets = useSafeAreaInsets();
    const colors = getColors();

    const [height, setHeight] = useState<number>(0);

    return (
        <View style={{ position: 'relative', height: height - 13 }}>
            <View onLayout={(e) => setHeight(e.nativeEvent.layout.height)} style={[styles.container, { paddingBottom: insets.bottom == 0 ? 15 : insets.bottom + 5, backgroundColor: colors.background }]}>
                {state.routes.map((route, index) => {
                    const { options: { tabBarBadge } } = descriptors[route.key];
                    const isFocused = state.index === index;
                    let onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });
                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                    };

                    const activeColor = isFocused ? colors.tabBarIconActive : colors.tabBarIcon

                    let icon = <MaterialCommunityIcons name="progress-question" size={28} color={activeColor} />
                    switch (route.name) {
                        case 'HomeNavigation':
                            icon = <MaterialIcons name="panorama-photosphere" size={27} color={activeColor} />
                            break;
                        case 'FavNavigation':
                            icon = <MaterialCommunityIcons name="heart-outline" size={29} color={activeColor} />
                            break;
                        case 'CategoryNavigation':
                            icon = <MaterialCommunityIcons name="card-multiple-outline" size={27} color={activeColor} />
                            break;
                        case 'CartNavigation':
                            icon = <MaterialCommunityIcons name="cart-outline" size={28} color={activeColor} />
                            break;
                    }

                    return (
                        <TouchableOpacity
                            key={index}
                            accessibilityRole="button"
                            onPress={onPress}
                            style={{ justifyContent: 'center', alignItems: 'center', position: 'relative' }}
                        >
                            {icon}
                            {isFocused && (
                                <View style={{position: 'absolute', bottom: -5, left: 2, right: 2, height: 2, backgroundColor: colors.tabBarIconActive, borderRadius: 60}}></View>
                            )}
                             {tabBarBadge && tabBarBadge > 0 && (
                                <View style={[styles.tabBarBadge, { backgroundColor: colors.main }]}>
                                    <TextCustom color={colors.textWhite}>{tabBarBadge}</TextCustom>
                                </View>
                            )}
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        flexDirection: 'row',
        paddingTop: 10,
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingLeft: 45,
        paddingRight: 45,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: "rgba(5, 77, 130, 1)",
        shadowOffset: {
            width: 0,
            height: 15,
        },
        shadowOpacity: 0.24,
        shadowRadius: 16.41,
        elevation: 20
    },
    tabBarBadge: {
        position: 'absolute',
        top: -5,
        right: -5,
        borderRadius: 90,
        width: 16,
        height: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabBarBadgeText: {
        fontSize: fonts.size.extraSmall
    }
});

export default CustomTabs;