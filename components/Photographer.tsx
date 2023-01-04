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

const staticCategoryPortrait: Array<{ id: string, name: string, image: string }> = [
    { id: 'FFHvNDCj3vI', name: 'dw', image: 'https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXw0YzI0VGdxUWpEWXx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60' },
    { id: 'FFHvNDCj3vI', name: 'Portait', image: 'https://images.unsplash.com/photo-1504131598085-4cca8500b677?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8Mnw0YzI0VGdxUWpEWXx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60' },
    { id: 'FFHvNDCj3vI', name: 'Portait', image: 'https://images.unsplash.com/photo-1517269992380-58d48f7101d1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8M3w0YzI0VGdxUWpEWXx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60' },
    { id: 'FFHvNDCj3vI', name: 'Portait', image: 'https://images.unsplash.com/photo-1499557354967-2b2d8910bcca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8NHw0YzI0VGdxUWpEWXx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60' },
    { id: 'FFHvNDCj3vI', name: 'Portait', image: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8NXw0YzI0VGdxUWpEWXx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60' },
    { id: 'FFHvNDCj3vI', name: 'Portait', image: 'https://images.unsplash.com/photo-1480455624313-e29b44bbfde1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8OHw0YzI0VGdxUWpEWXx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60' },
];

type PhotographerNavigationProps = NativeStackScreenProps<GlobalParamList, 'Photographer'>;

const Photographer = ({ navigation }: PhotographerNavigationProps) => {

    const colors = getColors();
    const { width } = Dimensions.get('screen');
    const { top } = useSafeAreaInsets();

    return (
        <ScrollViewCustom spaces={{ left: 0, right: 0 }}>
            <View style={{ height: 130, backgroundColor: colors.main, position: 'relative', borderBottomLeftRadius: 25, borderBottomRightRadius: 25, marginBottom: 100 }}>
                <ViewCustom style={{ paddingBottom: 15, zIndex: 9999, position: 'absolute', top: top === 0 ? 10 : top + 10 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="ios-chevron-back-sharp" size={30} color={colors.iconWhite} />
                    </TouchableOpacity>
                </ViewCustom>
                <View style={{ position: 'absolute', bottom: -60, left: 0, right: 0, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ width: 88, height: 88, borderRadius: 60, overflow: 'hidden', backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center', marginBottom: 5 }}>
                        <Image
                            source={{ uri: 'https://images.unsplash.com/photo-1556746228-08014386cfe8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTZ8NjExMjM3fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60' }}
                            style={{ width: 78, height: 78, borderRadius: 60 }}
                            resizeMode={'cover'}
                        />
                    </View>
                    <TextCustom size={'regular'} family={'Roboto_700Bold'}>Robert Sisua Rt</TextCustom>
                </View>
            </View>
            <ViewCustom>
                {staticCategoryPortrait.map(({ image, id, name }, i) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Photo', { id: id })}
                        key={id + image} style={{ borderRadius: 15, overflow: 'hidden', marginBottom: 10, position: 'relative' }}
                    >
                        <Image
                            source={{ uri: image }}
                            style={{ width: width - 50, height: 180 }}
                            resizeMode={'cover'}
                        />
                        <View style={{ position: 'absolute', top: 10, right: 10 }}>
                            <TouchableOpacity>
                                <MaterialCommunityIcons name="heart-outline" size={30} color={colors.iconWhite} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ position: 'absolute', bottom: 10, left: 10 }}>
                            <TextCustom color={colors.textWhite} size={'large'} family={'Roboto_700Bold'} >{name}</TextCustom>
                        </View>
                    </TouchableOpacity>
                ))}
            </ViewCustom>
        </ScrollViewCustom>
    )
}

export default Photographer;