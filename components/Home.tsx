import { Dimensions, Image, ImageBackground, ScrollView, Text, TouchableOpacity, View } from "react-native";
import getColors, { fonts } from "./config/const";
import ScrollViewCustom from "./customs/ScrollViewCustom";
import TextCustom from "./customs/TextCustom";
import { FontAwesome } from '@expo/vector-icons';
import ViewCustom from "./customs/ViewCustom";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeParamList, MainParamList, TabParamList } from "./config/types";
import { useAppSelector } from "../redux/hooks";

const staticCategoryNature: Array<{ id: string, image: string }> = [
    { id: 'tWb7IsL9CnY', image: 'https://images.unsplash.com/photo-1489275449173-7c7fe1d26f54?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXw4NTYyNjl8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60' },
    { id: 'askAk8cXTlg', image: 'https://images.unsplash.com/photo-1491466424936-e304919aada7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8Mnw4NTYyNjl8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60' },
    { id: 'G28xPGrogBE', image: 'https://images.unsplash.com/photo-1492305175278-3b3afaa2f31f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8M3w4NTYyNjl8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60' },
    { id: 'askAk8cXTlg', image: 'https://images.unsplash.com/photo-1493962621260-74cc5a3baf89?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8NXw4NTYyNjl8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60' },
    { id: 'G28xPGrogBE', image: 'https://images.unsplash.com/photo-1483729003874-2189d8afad2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8OHw4NTYyNjl8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60' },
    { id: 'FFHvNDCj3vI', image: 'https://images.unsplash.com/photo-1490533658566-1855b89cd85f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8N3w4NTYyNjl8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60' },
];

const staticCategoryPortrait: Array<{ id: string, image: string }> = [
    { id: 'tWb7IsL9CnY', image: 'https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXw0YzI0VGdxUWpEWXx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60' },
    { id: 'G28xPGrogBE', image: 'https://images.unsplash.com/photo-1504131598085-4cca8500b677?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8Mnw0YzI0VGdxUWpEWXx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60' },
    { id: 'FFHvNDCj3vI', image: 'https://images.unsplash.com/photo-1517269992380-58d48f7101d1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8M3w0YzI0VGdxUWpEWXx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60' },
    { id: 'tWb7IsL9CnY', image: 'https://images.unsplash.com/photo-1499557354967-2b2d8910bcca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8NHw0YzI0VGdxUWpEWXx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60' },
    { id: 'G28xPGrogBE', image: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8NXw0YzI0VGdxUWpEWXx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60' },
    { id: 'askAk8cXTlg', image: 'https://images.unsplash.com/photo-1480455624313-e29b44bbfde1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8OHw0YzI0VGdxUWpEWXx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60' },
];

const staticCategoryPhotographer: Array<{ id: string, image: string }> = [
    { id: 'kellysikkema', image: 'https://images.unsplash.com/profile-1663525621922-0803f7148a58image?dpr=1&auto=format&fit=crop&w=150&h=150&q=60&crop=faces&bg=fff' },
    { id: 'anniespratt', image: 'https://images.unsplash.com/profile-1648828806223-1852f704c58aimage?dpr=1&auto=format&fit=crop&w=150&h=150&q=60&crop=faces&bg=fff' },
    { id: 'florenciaviadana', image: 'https://images.unsplash.com/profile-1622647595684-2a687164aa4bimage?dpr=1&auto=format&fit=crop&w=150&h=150&q=60&crop=faces&bg=fff' },
    { id: 'heftiba', image: 'https://images.unsplash.com/profile-1605780274397-200ea3604d6fimage?dpr=1&auto=format&fit=crop&w=150&h=150&q=60&crop=faces&bg=fff' },
    { id: 'venrick', image: 'https://images.unsplash.com/profile-1628113606365-fb9f61a7e316image?dpr=1&auto=format&fit=crop&w=150&h=150&q=60&crop=faces&bg=fff' },
    { id: 'nugthan', image: 'https://images.unsplash.com/profile-1604000926394-7b782abcfcd9image?dpr=1&auto=format&fit=crop&w=150&h=150&q=60&crop=faces&bg=fff' },
    { id: 'lvenfoto', image: 'https://images.unsplash.com/profile-1670063569010-2c0a5bc558d8image?dpr=1&auto=format&fit=crop&w=150&h=150&q=60&crop=faces&bg=fff' },
];

type HomeNavigationProps = NativeStackScreenProps<HomeParamList, 'Home'>;

const Home = ({ navigation }: HomeNavigationProps) => {

    const colors = getColors();
    const { width } = Dimensions.get('screen');
    const { photo } = useAppSelector(element => element.photoValues);

    return (
        <ScrollViewCustom header={true} spaces={{ left: 0, right: 0 }}>
            <ViewCustom style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 }}>
                <TextCustom size={'huge'} family={'Roboto_700Bold'}>Discover Photo</TextCustom>
                <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                    <FontAwesome name="search" size={26} color={colors.iconBlack} />
                </TouchableOpacity>
            </ViewCustom>
            <ViewCustom style={{ marginBottom: 25 }}>
                <View style={{
                    shadowColor: "rgba(5, 77, 130, 1)",
                    shadowOffset: {
                        width: 0,
                        height: 7,
                    },
                    shadowOpacity: 0.54,
                    shadowRadius: 16.41,
                    elevation: 20
                }}>
                    <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1556103255-4443dbae8e5a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8cGhvdG9ncmFwaGVyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60' }}
                        style={{ width: width - 50, height: 200, borderRadius: 10, }}
                        resizeMode={'cover'}
                    />
                </View>
            </ViewCustom>
            <View style={{ marginBottom: 25 }}>
                <ViewCustom style={{ marginBottom: 15 }}>
                    <TextCustom size={'regular'} family={'Roboto_700Bold'}>Popular Photographer</TextCustom>
                </ViewCustom>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    {staticCategoryPhotographer.map(({ id, image }, i) => (
                        <TouchableOpacity
                            key={id}
                            onPress={() => navigation.navigate('Photographer', { id: id, image: image })}
                            style={{ marginRight: i === staticCategoryPhotographer.length - 1 ? 25 : 10, marginLeft: i === 0 ? 25 : 0 }}
                        >
                            <Image
                                source={{ uri: image }}
                                style={{ width: 60, height: 60, borderRadius: 60 }}
                            />
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
            {photo.length > 0 && (
                <View style={{marginBottom: 25}}>
                    <TouchableOpacity onPress={() => navigation.navigate('Collection', { id: '2005243', title: 'Portrait' })}>
                        <ViewCustom style={{ marginBottom: 15, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                            <TextCustom size={'extraLarge'} family={'Roboto_700Bold'}>Recently viewed photos</TextCustom>
                        </ViewCustom>
                    </TouchableOpacity>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        {photo.map(({ image, id }, i) => (
                            <TouchableOpacity onPress={() => navigation.navigate('Photo', { id: id })} key={id + image} style={{ borderRadius: 15, overflow: 'hidden', marginRight: i === staticCategoryPortrait.length - 1 ? 25 : 10, marginLeft: i === 0 ? 25 : 0 }}>
                                <Image
                                    source={{ uri: image }}
                                    style={{ width: width - 80, height: 170 }}
                                    resizeMode={'cover'}
                                />
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            )}
            <View style={{ marginBottom: 25 }}>
                <TouchableOpacity onPress={() => navigation.navigate('Collection', { id: '1319040', title: 'Nature' })}>
                    <ViewCustom style={{ marginBottom: 15, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <Image
                            source={{ uri: 'https://images.unsplash.com/photo-1490133286769-d909ac67878e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8OXw4NTYyNjl8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60' }}
                            style={{ width: 50, height: 50, borderRadius: 5, marginRight: 10 }}
                        />
                        <View>
                            <TextCustom size={'small'} family={'Roboto_700Bold'}>Nature Collection</TextCustom>
                            <TextCustom size={'megaSmall'}>7 photo add by Twinkle - 8 minutes ago</TextCustom>
                        </View>
                    </ViewCustom>
                </TouchableOpacity>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    {staticCategoryNature.map(({ image, id }, i) => (
                        <TouchableOpacity onPress={() => navigation.navigate('Photo', { id: id })} key={id + image} style={{ borderRadius: 15, overflow: 'hidden', marginRight: i === staticCategoryNature.length - 1 ? 25 : 10, marginLeft: i === 0 ? 25 : 0 }}>
                            <Image
                                source={{ uri: image }}
                                style={{ width: width - 80, height: 170 }}
                                resizeMode={'cover'}
                            />
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
            <View style={{ marginBottom: 25 }}>
                <TouchableOpacity onPress={() => navigation.navigate('Collection', { id: '2005243', title: 'Portrait' })}>
                    <ViewCustom style={{ marginBottom: 15, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <Image
                            source={{ uri: 'https://images.unsplash.com/photo-1497881807663-38b9a95b7192?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8OXw0YzI0VGdxUWpEWXx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60' }}
                            style={{ width: 50, height: 50, borderRadius: 5, marginRight: 10 }}
                        />
                        <View>
                            <TextCustom size={'small'} family={'Roboto_700Bold'}>Portrait Collection</TextCustom>
                            <TextCustom size={'megaSmall'}>2 photo add by Twinkle - 12 minutes ago</TextCustom>
                        </View>
                    </ViewCustom>
                </TouchableOpacity>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    {staticCategoryPortrait.map(({ image, id }, i) => (
                        <TouchableOpacity onPress={() => navigation.navigate('Photo', { id: id })} key={id + image} style={{ borderRadius: 15, overflow: 'hidden', marginRight: i === staticCategoryPortrait.length - 1 ? 25 : 10, marginLeft: i === 0 ? 25 : 0 }}>
                            <Image
                                source={{ uri: image }}
                                style={{ width: width - 80, height: 170 }}
                                resizeMode={'cover'}
                            />
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </ScrollViewCustom>
    )
}

export default Home;