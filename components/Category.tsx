import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Dimensions, Image, TouchableOpacity, View } from "react-native";
import getColors from "./config/const";
import { CategoryParamList } from "./config/types";
import ScrollViewCustom from "./customs/ScrollViewCustom"
import TextCustom from "./customs/TextCustom";
import ViewCustom from "./customs/ViewCustom";


const staticCategory: Array<{ id: string, name: string, image: string }> = [
    { id: '4473399', name: 'Photo', image: 'https://images.unsplash.com/photo-1551706872-e17847fd94af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXRodW1ibmFpbHx8NjExMjM3fHxlbnwwfHx8fA%3D%3D&dpr=1&auto=format&fit=crop&w=294&q=60' },
    { id: '531429', name: 'Wedding', image: 'https://images.unsplash.com/photo-1606490194859-07c18c9f0968?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXRodW1ibmFpbHx8ZHU1N1VPZjNmYXN8fGVufDB8fHx8&dpr=1&auto=format&fit=crop&w=294&q=60' },
    { id: '1785728', name: 'Travel', image: 'https://images.unsplash.com/photo-1483310750918-d1bf88acc906?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXRodW1ibmFpbHx8MjM2MjgyMXx8ZW58MHx8fHw%3D&dpr=1&auto=format&fit=crop&w=294&q=60' },
    { id: '3403106', name: 'Summer', image: 'https://images.unsplash.com/photo-1583003784933-fe4ba1b9c424?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXRodW1ibmFpbHx8NTIyNDUwNDF8fGVufDB8fHx8&dpr=1&auto=format&fit=crop&w=294&q=60' },
    { id: '8862635', name: 'Model', image: 'https://images.unsplash.com/photo-1593795899768-947c4929449d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXRodW1ibmFpbHx8aGR0aXJzS2RPMVl8fGVufDB8fHx8&dpr=1&auto=format&fit=crop&w=294&q=60' },
    { id: 'n8Ypb8lEUAU', name: 'Portait', image: 'https://images.unsplash.com/photo-1542513217-0b0eedf7005d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXRodW1ibmFpbHx8MjAzNDc3Mnx8ZW58MHx8fHw%3D&dpr=1&auto=format&fit=crop&w=294&q=60' },
    { id: '3348849', name: 'Architecture', image: 'https://images.unsplash.com/photo-1565791380709-49e529c8b073?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXRodW1ibmFpbHx8MTIwNTYxMDd8fGVufDB8fHx8&dpr=1&auto=format&fit=crop&w=294&q=60' },
    { id: '345761', name: 'Sport', image: 'https://images.unsplash.com/photo-1541694458248-5aa2101c77df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXRodW1ibmFpbHx8MTA2MTE1NTd8fGVufDB8fHx8&dpr=1&auto=format&fit=crop&w=294&q=60' },
    { id: '535863', name: 'Kids', image: 'https://images.unsplash.com/photo-1484820540004-14229fe36ca4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXRodW1ibmFpbHx8ODU4MTcyNXx8ZW58MHx8fHw%3D&dpr=1&auto=format&fit=crop&w=294&q=60' },
    { id: '430456', name: 'Books', image: 'https://images.unsplash.com/photo-1632503429233-56138b85634d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXRodW1ibmFpbHx8dk1XakhBem1yQlF8fGVufDB8fHx8&dpr=1&auto=format&fit=crop&w=294&q=60' },
];

type CategoryNavigationProps = NativeStackScreenProps<CategoryParamList, 'Category'>

const Category = ({navigation} : CategoryNavigationProps) => {

    const { width } = Dimensions.get('screen');
    const colors = getColors();
    const banerSize = ((width / 2) - 30);

    return (
        <ScrollViewCustom header={true} spaces={{ left: 0, right: 0 }}>
            <ViewCustom style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 }}>
                <TextCustom size={'huge'} family={'Roboto_700Bold'}>Discover Collection</TextCustom>
            </ViewCustom>
            <ViewCustom style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                {staticCategory.map(({ name, id, image }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('Collection', {id: id, title: name})} key={id + name} style={{ borderRadius: 10, overflow: 'hidden', marginBottom: 7, position: 'relative' }}>
                        <Image
                            source={{ uri: image }}
                            style={{ width: banerSize, height: banerSize }}
                            resizeMode={'cover'}
                        />
                        <View style={{ position: 'absolute', bottom: 10, left: 10 }}>
                            <TextCustom color={colors.textWhite} family={'Roboto_700Bold'} size={'large'}>{name}</TextCustom>
                        </View>
                    </TouchableOpacity>
                ))}
            </ViewCustom>
        </ScrollViewCustom>
    )
}

export default Category;