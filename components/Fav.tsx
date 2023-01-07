import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Dimensions, Image, TouchableOpacity, View } from "react-native";
import getColors from "./config/const";
import { FavParamList } from "./config/types";
import ScrollViewCustom from "./customs/ScrollViewCustom"
import TextCustom from "./customs/TextCustom";
import ViewCustom from "./customs/ViewCustom";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { removeFav } from "../redux/action";

type CategoryNavigationProps = NativeStackScreenProps<FavParamList, 'Fav'>

const Fav = ({ navigation }: CategoryNavigationProps) => {

    const { width } = Dimensions.get('screen');
    const colors = getColors();
    const banerSize = ((width / 2) - 30);
    const { fav } = useAppSelector(element => element.favValues);
    const dispatch = useAppDispatch();

    const handleRemoveFav = (id: string): void => {
        dispatch(removeFav(id));
    }

    return (
        <ScrollViewCustom header={true} spaces={{ left: 0, right: 0 }}>
            <ViewCustom style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 }}>
                <TextCustom size={'huge'} family={'Roboto_700Bold'}>Fav Collection</TextCustom>
            </ViewCustom>
            {fav.length > 0
                ? <>
                    <ViewCustom style={{ marginBottom: 30 }}>
                        <TextCustom size={'large'} family={'Roboto_500Medium'} customStyles={{ textAlign: 'center' }}>Click which photos you want to buy</TextCustom>
                    </ViewCustom>
                    <ViewCustom style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                        {fav.map(({ id, image }) => (
                            <TouchableOpacity onPress={() => navigation.navigate('Photo', { id: id })} key={id} style={{ borderRadius: 10, overflow: 'hidden', marginBottom: 7, position: 'relative' }}>
                                <Image
                                    source={{ uri: image }}
                                    style={{ width: banerSize, height: banerSize }}
                                    resizeMode={'cover'}
                                />
                                <TouchableOpacity onPress={() => handleRemoveFav(id)} style={{ position: 'absolute', top: 5, right: 5, padding: 5 }}>
                                    <MaterialCommunityIcons name="delete-outline" size={24} color={colors.iconWhite} />
                                </TouchableOpacity>
                            </TouchableOpacity>
                        ))}
                    </ViewCustom>
                </>
                : <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <TextCustom family={'Roboto_700Bold'} size={'extraHuge'} customStyles={{ marginBottom: 10 }}>Empty Fav list</TextCustom>
                    <TextCustom family={'Roboto_300Light'} size={'regular'}>Add photo</TextCustom>
                </View>
            }

        </ScrollViewCustom>
    )
}

export default Fav;