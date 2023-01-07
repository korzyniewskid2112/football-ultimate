import { BottomTabBarProps, BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Dimensions, Image, Modal, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { removeCart } from "../redux/action";
import { useAppDispatch } from "../redux/hooks";
import getColors from "./config/const";
import { MainParamList, TabParamList } from "./config/types";
import ScrollViewCustom from "./customs/ScrollViewCustom";
import TextCustom from "./customs/TextCustom";
import ViewCustom from "./customs/ViewCustom";
import { Feather } from '@expo/vector-icons';
import { useEffect, useState } from "react";

type PaymentDemoNavigationProps = CompositeScreenProps<
    NativeStackScreenProps<MainParamList, 'PaymentDemo'>,
    BottomTabScreenProps<TabParamList>
>;

const PaymentDemo = ({ navigation, route: { params } }: PaymentDemoNavigationProps) => {

    const { width } = Dimensions.get('screen');
    const colors = getColors();
    const { bottom } = useSafeAreaInsets();
    const dispatch = useAppDispatch();
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const finishOrder = (): void => {
        params.map(({ id }) => {
            dispatch(removeCart(id));
        })
        setModalVisible(true);
        setTimeout(() => {
            navigation.navigate('HomeNavigation', {screen: 'Home'});
        }, 3000);
    }

    useEffect(() => {
        return(() => {
            setModalVisible(false);
        })
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                statusBarTranslucent={true}
            >
                <View style={{ flex: 1, backgroundColor: colors.main, opacity: 0.8, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ marginBottom: 20 }}>
                        <Feather name="check-circle" size={70} color={colors.iconWhite} />
                    </View>
                    <TextCustom color={colors.iconWhite} size={'extraLarge'}>SUCCESS!</TextCustom>
                </View>
            </Modal>
            <ScrollViewCustom>
                <View style={{ paddingTop: 20 }}>
                    {params.map(({ id, image }) => (
                        <View key={id} style={{ borderRadius: 15, overflow: 'hidden', marginBottom: 10, position: 'relative' }}>
                            <Image
                                source={{ uri: image }}
                                style={{ width: width - 50, height: 80 }}
                                resizeMode={'cover'}
                            />
                        </View>
                    ))}
                </View>
            </ScrollViewCustom>
            <View style={{ paddingBottom: bottom === 0 ? 10 : bottom, paddingTop: 10, borderTopWidth: 1, borderTopColor: colors.border }}>
                <ViewCustom>
                    <TouchableOpacity
                        onPress={(finishOrder)}
                        style={{ backgroundColor: colors.main, padding: 10, borderRadius: 10 }}
                    >
                        <TextCustom customStyles={{ textAlign: 'center' }} size={'regular'} family={'Roboto_300Light'} color={colors.textWhite}>Demo pay</TextCustom>
                    </TouchableOpacity>
                </ViewCustom>
            </View>
        </View>

    )
}

export default PaymentDemo;