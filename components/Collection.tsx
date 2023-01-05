import { useFetch } from "./config/api"
import ScrollViewCustom from "./customs/ScrollViewCustom"
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GlobalParamList } from "./config/types";
import LoadingSplash from "./LoadingSplash";
import ErrorSplash from "./ErrorSplash";
import getColors from "./config/const";
import { Dimensions, Image, TouchableOpacity, View } from "react-native";
import ViewCustom from "./customs/ViewCustom";
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import TextCustom from "./customs/TextCustom";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type CollectionFetchProps = {
    id: string,
    urls: {
        regular: string,
    },
    likes: number,
}

type CollectionNavigationProps = NativeStackScreenProps<GlobalParamList, 'Collection'>

const Collection = ({ navigation, route: { params: { id, title } } }: CollectionNavigationProps) => {

    const { response, error, errorInfo, reload, setReload, isLoading } = useFetch<Array<CollectionFetchProps>>('collections/' + id + '/photos');
    const colors = getColors();
    const { top } = useSafeAreaInsets();
    const { width } = Dimensions.get('screen');

    return (
        isLoading
            ? <LoadingSplash />
            : !error && response && response.length > 0
                ? <ScrollViewCustom spaces={{ left: 0, right: 0 }} reload={reload} setReload={setReload}>
                    <View style={{ height: 130, backgroundColor: colors.main, position: 'relative', borderBottomLeftRadius: 25, borderBottomRightRadius: 25, marginBottom: 40 }}>
                        <ViewCustom style={{ paddingBottom: 15, zIndex: 9999, position: 'absolute', top: top === 0 ? 10 : top + 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', left: 0, right: 0 }}>
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <Ionicons name="ios-chevron-back-sharp" size={30} color={colors.iconWhite} />
                            </TouchableOpacity>
                            <TextCustom color={colors.textWhite} size={'large'} family={'Roboto_700Bold'}>{title} collection</TextCustom>
                        </ViewCustom>
                    </View>
                    <ViewCustom>
                        {response.map(({ id, urls: { regular }, likes }) => (
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
                                        <TextCustom customStyles={{marginLeft: 5}} size={'regular'} color={colors.textWhite} family={'Roboto_500Medium'}>{likes}</TextCustom>
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ViewCustom>
                </ScrollViewCustom>
                : <ErrorSplash setReload={setReload} developerError={errorInfo} />
    )
}

export default Collection;