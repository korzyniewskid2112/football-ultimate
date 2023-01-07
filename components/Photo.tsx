import { View, Image, Dimensions, TouchableOpacity, Text, Modal } from "react-native";
import getColors from "./config/const";
import ScrollViewCustom from "./customs/ScrollViewCustom";
import TextCustom from "./customs/TextCustom";
import ViewCustom from "./customs/ViewCustom";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GlobalParamList } from "./config/types";
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useFetch } from "./config/api";
import LoadingSplash from "./LoadingSplash";
import ErrorSplash from "./ErrorSplash";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { addCart, addFav, addPhotos } from "../redux/action";
import { useEffect, useState } from "react";

type PhotoFetchProps = {
    id: string,
    description: string,
    alt_description: string,
    urls: {
        regular: string,
    },
    likes: number,
    views: number,
    user: {
        username: string,
        location: string,
        profile_image: {
            medium: string,
        }
    },

}

type PhotoNavigationProps = NativeStackScreenProps<GlobalParamList, 'Photo'>

const Photo = ({ navigation, route: { params: { id } } }: PhotoNavigationProps) => {

    const { width } = Dimensions.get('screen');
    const colors = getColors();
    const { top } = useSafeAreaInsets();
    const dispatch = useAppDispatch();
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const { response, error, errorInfo, reload, setReload, isLoading } = useFetch<PhotoFetchProps>('photos/' + id);

    const handleAddCart = (id: string, image: string): void => {
        setModalVisible(true);
        dispatch(addCart(id, image));
        setTimeout(() => {
            setModalVisible(false);
        }, 1000);
    }

    const handleAddFav = (id: string, image: string): void => {
        dispatch(addFav(id, image));
    }

    useEffect(() => {
        if (response && response.id.length > 0) {
            dispatch(addPhotos(id, response.urls.regular));
        }
    }, [response]);


    return (
        isLoading
            ? <LoadingSplash />
            : !error && response && response.id.length > 0
                ? <View style={{ flex: 1, position: 'relative' }}>
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={modalVisible}
                        statusBarTranslucent={true}
                    >
                        <View style={{flex: 1, backgroundColor: colors.main, opacity: 0.8, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        <View style={{ marginBottom: 20 }}>
                            <Feather name="check-circle" size={70} color={colors.iconWhite} />
                        </View>
                        <TextCustom color={colors.iconWhite} size={'extraLarge'}>ADDED TO CART</TextCustom>
                        </View>
                    </Modal>
                    <ScrollViewCustom spaces={{ left: 0, right: 0 }} reload={reload} setReload={setReload}>
                        <View style={{ paddingBottom: 50 }}>
                            <View style={{ marginBottom: 30, position: 'relative' }}>
                                <Image
                                    source={{ uri: response.urls.regular }}
                                    style={{ width: width, height: 400, borderBottomLeftRadius: 25, borderBottomRightRadius: 25 }}
                                />
                                <ViewCustom style={{ paddingBottom: 15, zIndex: 9999, position: 'absolute', top: top === 0 ? 10 : top + 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', left: 0, right: 0 }}>
                                    <TouchableOpacity onPress={() => navigation.goBack()}>
                                        <Ionicons name="ios-chevron-back-sharp" size={30} color={colors.iconWhite} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => handleAddFav(response.id, response.urls.regular)}>
                                        <MaterialCommunityIcons name="heart-outline" size={30} color={colors.iconWhite} />
                                    </TouchableOpacity>
                                </ViewCustom>
                                <ViewCustom style={{ paddingBottom: 15, zIndex: 9999, position: 'absolute', bottom: 0, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', left: 0, right: 0, flexWrap: 'wrap' }}>
                                    <View style={{ marginLeft: 10, marginRight: 10, flexDirection: 'row', alignItems: 'center' }}>
                                        <MaterialCommunityIcons name="heart" size={19} color={colors.iconWhite} />
                                        <TextCustom customStyles={{ marginLeft: 5 }} color={colors.textWhite}>{response?.likes}</TextCustom>
                                    </View>
                                    <View style={{ marginLeft: 10, marginRight: 10, flexDirection: 'row', alignItems: 'center' }}>
                                        <MaterialCommunityIcons name="eye" size={22} color={colors.iconWhite} />
                                        <TextCustom customStyles={{ marginLeft: 5 }} color={colors.textWhite}>32</TextCustom>
                                    </View>
                                </ViewCustom>
                            </View>
                            <ViewCustom>
                                <View style={{ marginBottom: 15 }}>
                                    <TextCustom size={'huge'} family={'Roboto_700Bold'} customStyles={{ textAlign: 'center', marginBottom: 10 }}>{response.alt_description}</TextCustom>
                                    <TextCustom family={'Roboto_300Light'}>{response.description}</TextCustom>
                                </View>
                                <View style={{ marginBottom: 15, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                    <Image
                                        source={{ uri: response.user.profile_image.medium }}
                                        style={{ width: 50, height: 50, borderRadius: 5, marginRight: 10 }}
                                    />
                                    <View>
                                        <TextCustom size={'small'} family={'Roboto_700Bold'}>{response.user.username}</TextCustom>
                                        <TextCustom size={'megaSmall'}>{response.user.location}</TextCustom>
                                    </View>
                                </View>
                            </ViewCustom>

                        </View>
                    </ScrollViewCustom>
                    <TouchableOpacity
                        onPress={() => handleAddCart(id, response.urls.regular)}
                        style={{ backgroundColor: colors.main, padding: 10, borderRadius: 10, position: 'absolute', bottom: 20, left: 25, right: 25 }}
                    >
                        <TextCustom customStyles={{ textAlign: 'center' }} size={'regular'} family={'Roboto_300Light'} color={colors.textWhite}>Add photo</TextCustom>
                    </TouchableOpacity>
                </View>
                : <ErrorSplash setReload={setReload} developerError={errorInfo} />

    )
}

export default Photo;