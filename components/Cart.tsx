import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Dimensions, Image, TouchableOpacity, View } from "react-native";
import getColors from "./config/const";
import { CartParamList } from "./config/types";
import ScrollViewCustom from "./customs/ScrollViewCustom"
import TextCustom from "./customs/TextCustom";
import ViewCustom from "./customs/ViewCustom";
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useEffect, useState } from "react";


const staticCategory: Array<{ id: string, name: string, image: string }> = [
    { id: '4473399', name: 'Photo', image: 'https://images.unsplash.com/photo-1551706872-e17847fd94af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXRodW1ibmFpbHx8NjExMjM3fHxlbnwwfHx8fA%3D%3D&dpr=1&auto=format&fit=crop&w=294&q=60' },
    { id: '531429', name: 'Wedding', image: 'https://images.unsplash.com/photo-1606490194859-07c18c9f0968?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXRodW1ibmFpbHx8ZHU1N1VPZjNmYXN8fGVufDB8fHx8&dpr=1&auto=format&fit=crop&w=294&q=60' },
    { id: '1785728', name: 'Travel', image: 'https://images.unsplash.com/photo-1483310750918-d1bf88acc906?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXRodW1ibmFpbHx8MjM2MjgyMXx8ZW58MHx8fHw%3D&dpr=1&auto=format&fit=crop&w=294&q=60' },
    { id: '3403106', name: 'Summer', image: 'https://images.unsplash.com/photo-1583003784933-fe4ba1b9c424?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXRodW1ibmFpbHx8NTIyNDUwNDF8fGVufDB8fHx8&dpr=1&auto=format&fit=crop&w=294&q=60' },
];

type CategoryNavigationProps = NativeStackScreenProps<CartParamList, 'Cart'>

const Cart = ({ navigation }: CategoryNavigationProps) => {

    const { width } = Dimensions.get('screen');
    const colors = getColors();
    const banerSize = ((width / 2) - 30);
    const [basket, setBasket] = useState<Array<string>>([]);

    const addToBasket = (id: string): void => {
        let tempBasket = [...basket];
        const exist = tempBasket.find(element => element === id);

        if (exist == undefined) {
            setBasket([...tempBasket, id]);
        } else {
            tempBasket.splice(tempBasket.findIndex((element) => (element == id)), 1);
            setBasket([...tempBasket]);
        }
    }

    const selectedChecker = (id: string): boolean => {
        let status = false;
        basket.forEach((object) => {
            if (object === id) {
                status = true;
            }
        })
        return status;
    }

    useEffect(() => {
        return (() => {
            setBasket([]);
        })
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <ScrollViewCustom header={true} spaces={{ left: 0, right: 0 }}>
                <ViewCustom style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 }}>
                    <TextCustom size={'huge'} family={'Roboto_700Bold'}>Cart</TextCustom>
                </ViewCustom>
                <ViewCustom style={{ marginBottom: 30 }}>
                    <TextCustom size={'large'} family={'Roboto_500Medium'} customStyles={{ textAlign: 'center' }}>Click which photos you want to buy</TextCustom>
                </ViewCustom>
                <ViewCustom style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                    {staticCategory.map(({ name, id, image }) => (
                        <TouchableOpacity onPress={() => addToBasket(id)} key={id + name} style={{ borderRadius: 10, overflow: 'hidden', marginBottom: 7, position: 'relative' }}>
                            <Image
                                source={{ uri: image }}
                                style={{ width: banerSize, height: banerSize }}
                                resizeMode={'cover'}
                            />
                            <TouchableOpacity style={{ position: 'absolute', top: 5, right: 5, padding: 5 }}>
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
            </ScrollViewCustom>
            {basket.length > 0 && (
                <ViewCustom>
                    <TouchableOpacity
                        style={{ backgroundColor: colors.main, padding: 10, borderRadius: 10, position: 'absolute', bottom: 20, left: 25, right: 25 }}
                    >
                        <TextCustom customStyles={{ textAlign: 'center' }} size={'regular'} family={'Roboto_300Light'} color={colors.textWhite}>Go to payment</TextCustom>
                    </TouchableOpacity>
                </ViewCustom>
            )}
        </View>

    )
}

export default Cart;