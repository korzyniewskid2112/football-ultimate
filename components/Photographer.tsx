import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import getColors from "./config/const";
import ScrollViewCustom from "./customs/ScrollViewCustom";
import ViewCustom from "./customs/ViewCustom";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GlobalParamList, HomeParamList } from "./config/types";
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import TextCustom from "./customs/TextCustom";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useFetch } from "./config/api";
import LoadingSplash from "./LoadingSplash";
import ErrorSplash from "./ErrorSplash";

type PhotographerFetchProps = {
    id: string,
    urls: {
        regular: string,
    },
    likes: number,
    user: {
        location: string,
    }
}

type PhotographerNavigationProps = NativeStackScreenProps<GlobalParamList, 'Photographer'>;

const Photographer = ({ navigation, route: { params: { id, image } } }: PhotographerNavigationProps) => {

    const { response, reload, setReload, isLoading, error, errorInfo } = useFetch<Array<PhotographerFetchProps>>('users/' + id + '/photos');
    const colors = getColors();
    const { width } = Dimensions.get('screen');
    const { top } = useSafeAreaInsets();

    return (
        isLoading
            ? <LoadingSplash />
            : !error && response && response.length > 0
                ? <ScrollViewCustom spaces={{ left: 0, right: 0 }} reload={reload} setReload={setReload}>
                    <View style={{ height: 130, backgroundColor: colors.main, position: 'relative', borderBottomLeftRadius: 25, borderBottomRightRadius: 25, marginBottom: 100 }}>
                        <ViewCustom style={{ paddingBottom: 15, zIndex: 9999, position: 'absolute', top: top === 0 ? 10 : top + 10 }}>
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <Ionicons name="ios-chevron-back-sharp" size={30} color={colors.iconWhite} />
                            </TouchableOpacity>
                        </ViewCustom>
                        <View style={{ position: 'absolute', bottom: -60, left: 0, right: 0, justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ width: 88, height: 88, borderRadius: 60, overflow: 'hidden', backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center', marginBottom: 5 }}>
                                <Image
                                    source={{ uri: image }}
                                    style={{ width: 78, height: 78, borderRadius: 60 }}
                                    resizeMode={'cover'}
                                />
                            </View>
                            <TextCustom size={'regular'} family={'Roboto_700Bold'}>{id}</TextCustom>
                        </View>
                    </View>
                    <ViewCustom>
                        {response.map(({ id, urls: {regular}, user: {location}, likes}, i) => (
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Photo', { id: id })}
                                key={id} style={{ borderRadius: 15, overflow: 'hidden', marginBottom: 10, position: 'relative' }}
                            >
                                <Image
                                    source={{ uri: regular }}
                                    style={{ width: width - 50, height: 180 }}
                                    resizeMode={'cover'}
                                />
                                <View style={{ position: 'absolute', top: 10, right: 10 }}>
                                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <MaterialCommunityIcons name="heart-outline" size={24} color={colors.iconWhite} />
                                        <TextCustom customStyles={{ marginLeft: 5 }} size={'regular'} color={colors.textWhite} family={'Roboto_500Medium'}>{likes}</TextCustom>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ position: 'absolute', bottom: 10, left: 10 }}>
                                    <TextCustom color={colors.textWhite} size={'large'} family={'Roboto_700Bold'} >{location}</TextCustom>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ViewCustom>
                </ScrollViewCustom>
                : <ErrorSplash developerError={errorInfo} setReload={setReload} />

    )
}

export default Photographer;