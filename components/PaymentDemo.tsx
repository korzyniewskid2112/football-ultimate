import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Dimensions, Image, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import getColors from "./config/const";
import { MainParamList } from "./config/types";
import ScrollViewCustom from "./customs/ScrollViewCustom";
import TextCustom from "./customs/TextCustom";
import ViewCustom from "./customs/ViewCustom";

type PaymentDemoNavigationProps = NativeStackScreenProps<MainParamList, 'PaymentDemo'>;

const PaymentDemo = ({ navigation, route: { params } }: PaymentDemoNavigationProps) => {

    const { width } = Dimensions.get('screen');
    const colors = getColors();
    const {bottom} = useSafeAreaInsets();

    return (
        <View style={{flex: 1}}>
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
            <View style={{paddingBottom: bottom === 0 ? 10 : bottom, paddingTop: 10, borderTopWidth: 1, borderTopColor: colors.border}}>
                <ViewCustom>
                    <TouchableOpacity
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