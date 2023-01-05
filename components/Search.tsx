import { useEffect, useState } from "react";
import { Dimensions, Image, TextInput, TouchableOpacity, View } from "react-native";
import getColors, { fonts } from "./config/const";
import ScrollViewCustom from "./customs/ScrollViewCustom";
import TextCustom from "./customs/TextCustom";
import ViewCustom from "./customs/ViewCustom";
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeParamList } from "./config/types";
import { apiValue, useFetch } from "./config/api";
import LoadingSplash from "./LoadingSplash";
import ErrorSplash from "./ErrorSplash";

type UseFetchProps<T> = {
    error: boolean,
    errorInfo?: string,
    response: T | null,
    isLoading: boolean,
}

type PhotoFetchProps = {
    total: number,
    total_pages: number,
    results: Array<{
        id: string,
        urls: {
            regular: string,
        },
        likes: number,
    }>,
}

const defaultRequest: UseFetchProps<PhotoFetchProps> = {
    error: false,
    errorInfo: '',
    isLoading: true,
    response: {
        total: 0,
        total_pages: 0,
        results: [],
    }
}

type SearchNavigationProps = NativeStackScreenProps<HomeParamList, 'Search'>

const Search = ({ navigation, route: { params } }: SearchNavigationProps) => {

    const [search, setSearch] = useState<string>('');
    const colors = getColors();
    const { width } = Dimensions.get('screen');
    const { top } = useSafeAreaInsets();
    const [photoRequest, setPhotoRequest] = useState<UseFetchProps<PhotoFetchProps>>(defaultRequest);

    const getSearchPhoto = async (search: string): Promise<void> => {
        setPhotoRequest(prevState => ({ ...prevState, isLoading: true, error: false, errorInfo: '' }))
        try {
            const response = await fetch(apiValue.apiLink + 'search/photos/?' + new URLSearchParams({ client_id: apiValue.client_id, query: search }));
            if (!response.ok) throw new Error(response.status + ' ' + response.statusText);
            const jsonResponse = await response.json();
            setPhotoRequest(prevState => ({ ...prevState, response: jsonResponse, isLoading: false, error: false }));
        } catch (e: any) {
            setPhotoRequest(prevState => ({ ...prevState, isLoading: false, errorInfo: e.message, error: true }));
        }
    }

    useEffect(() => {
        return (() => {
            setPhotoRequest(defaultRequest);
        })
    }, []);

    useEffect(() => {
        params?.search && setSearch(params.search);
    }, [params]);

    useEffect(() => {
        if (search.length > 0) {
            const getProducts = setTimeout(() => {
                getSearchPhoto(search);
            }, 2000);
            return (() => {
                clearTimeout(getProducts);
            })
        }
    }, [search]);

    return (
        <ScrollViewCustom spaces={{ left: 0, right: 0 }} >
            <View style={{ height: 185, backgroundColor: colors.main, position: 'relative', borderBottomLeftRadius: 25, borderBottomRightRadius: 25, marginBottom: 20, flexDirection: 'column', alignItems: 'stretch', justifyContent: 'flex-end' }}>
                <ViewCustom style={{ paddingBottom: 15, zIndex: 9999, position: 'absolute', top: top === 0 ? 10 : top + 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', left: 0, right: 0 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="ios-chevron-back-sharp" size={30} color={colors.iconWhite} />
                    </TouchableOpacity>
                    <TextCustom color={colors.textWhite} size={'large'} family={'Roboto_700Bold'}>Search</TextCustom>
                </ViewCustom>
                <ViewCustom style={{ paddingBottom: 25 }}>
                    <View style={{ backgroundColor: colors.background, borderWidth: 1, borderColor: colors.main, borderRadius: 10, paddingTop: 10, paddingBottom: 10, paddingLeft: 8, paddingRight: 8 }}>
                        <TextInput
                            style={{ color: colors.textBlack, fontSize: fonts.size.small, fontFamily: fonts.family.roboto.regular }}
                            placeholder={'Search by text'}
                            autoCapitalize={'none'}
                            autoCorrect={false}
                            textContentType={'none'}
                            onChangeText={(response) => setSearch(response)}
                        />
                    </View>
                </ViewCustom>
            </View>
            <ViewCustom>
                {search.length > 0
                    ? photoRequest.isLoading
                        ?   <LoadingSplash />
                        :   !photoRequest.error && photoRequest.response
                            ? photoRequest.response.results.map(({ id, urls: { regular } }, likes) => (
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
                                </TouchableOpacity>
                            ))
                            : <ErrorSplash developerError={photoRequest.errorInfo} />
                    : <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        <TextCustom family={'Roboto_700Bold'} size={'extraHuge'} customStyles={{marginBottom: 10}}>Empty List</TextCustom>
                        <TextCustom family={'Roboto_300Light'} size={'regular'}>Write what you want to search</TextCustom>
                    </View>
                }

            </ViewCustom>
        </ScrollViewCustom>
    )
}

export default Search;