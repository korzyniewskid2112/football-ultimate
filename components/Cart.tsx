import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Alert, Dimensions, Image, TouchableOpacity, View } from "react-native";
import getColors from "./config/const";
import { CartParamList, MainParamList } from "./config/types";
import ScrollViewCustom from "./customs/ScrollViewCustom"
import TextCustom from "./customs/TextCustom";
import ViewCustom from "./customs/ViewCustom";
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useCallback, useEffect, useState } from "react";
import { useAppSelector } from "../redux/hooks";
import { useDispatch } from "react-redux";
import { removeCart } from "../redux/action";
import { CompositeScreenProps, useFocusEffect } from "@react-navigation/native";


type CartNavigationProps = CompositeScreenProps<
    NativeStackScreenProps<CartParamList, 'Cart'>,
    NativeStackScreenProps<MainParamList>
>;

const Cart = ({ navigation }: CartNavigationProps) => {

    const { width } = Dimensions.get('screen');
    const colors = getColors();
    const banerSize = ((width / 2) - 30);
    const [basket, setBasket] = useState<Array<{ id: string, image: string }>>([]);
    const { cart } = useAppSelector(element => element.cartValues);
    const dispatch = useDispatch();

    const addToBasket = (id: string, image: string): void => {
        let tempBasket = [...basket];
        const exist = tempBasket.find(element => element.id === id);

        if (exist == undefined) {
            setBasket([...tempBasket, { id: id, image: image }]);
        } else {
            tempBasket.splice(tempBasket.findIndex((element) => (element.id == id)), 1);
            setBasket([...tempBasket]);
        }
    }

    const handleRemoveCart = (id: string): void => {
        dispatch(removeCart(id));
    }

    const selectedChecker = (id: string): boolean => {
        let status = false;
        basket.forEach((object) => {
            if (object.id === id) {
                status = true;
            }
        })
        return status;
    }

    useFocusEffect(
        useCallback(() => {
            return (() => {
                setBasket([]);
            })
        }, [])
    )

    return (
        <View style={{ flex: 1 }}>
            <ScrollViewCustom header={true} spaces={{ left: 0, right: 0 }}>
                <ViewCustom style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 }}>
                    <TextCustom size={'huge'} family={'Roboto_700Bold'}>Cart</TextCustom>
                </ViewCustom>
                {cart.length > 0
                    ? <>
                        <ViewCustom style={{ marginBottom: 30 }}>
                            <TextCustom size={'large'} family={'Roboto_500Medium'} customStyles={{ textAlign: 'center' }}>Click which photos you want to buy</TextCustom>
                        </ViewCustom>
                        <ViewCustom style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                            {cart.map(({ id, image }) => (
                                <TouchableOpacity onPress={() => addToBasket(id, image)} key={id} style={{ borderRadius: 10, overflow: 'hidden', marginBottom: 7, position: 'relative' }}>
                                    <Image
                                        source={{ uri: image }}
                                        style={{ width: banerSize, height: banerSize }}
                                        resizeMode={'cover'}
                                    />
                                    <TouchableOpacity
                                        onPress={() => Alert.alert('Remove item?', undefined, [{ text: 'No' }, { text: 'Yes', style: 'destructive', onPress: () => handleRemoveCart(id) }])} style={{ position: 'absolute', top: 5, right: 5, padding: 5 }}>
                                        <MaterialCommunityIcons name="delete-outline" size={24} color={colors.iconWhite} />
                                    </TouchableOpacity>
                                    {selectedChecker(id) === true && (
                                        <View style={{ position: 'absolute', top: 0, right: 0, left: 0, bottom: 0, backgroundColor: colors.main, opacity: 0.7, justifyContent: 'center', alignItems: 'center' }}>
                                            <MaterialIcons name="check" size={40} color={colors.iconWhite} />
                                            <TextCustom family={'Roboto_500Medium'} color={colors.textWhite} size={'small'}>Selected</TextCustom>
                                        </View>
                                    )}
                                </TouchableOpacity>
                            ))}
                        </ViewCustom>
                    </>
                    : <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <TextCustom family={'Roboto_700Bold'} size={'extraHuge'} customStyles={{ marginBottom: 10 }}>Empty Cart</TextCustom>
                        <TextCustom family={'Roboto_300Light'} size={'regular'}>Add photo</TextCustom>
                    </View>
                }
            </ScrollViewCustom>
            {
                basket.length > 0 && (
                    <ViewCustom>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('PaymentDemo', basket)}
                            style={{ backgroundColor: colors.main, padding: 10, borderRadius: 10, position: 'absolute', bottom: 20, left: 25, right: 25 }}
                        >
                            <TextCustom customStyles={{ textAlign: 'center' }} size={'regular'} family={'Roboto_300Light'} color={colors.textWhite}>Go to payment</TextCustom>
                        </TouchableOpacity>
                    </ViewCustom>
                )
            }
        </View >

    )
}

export default Cart;