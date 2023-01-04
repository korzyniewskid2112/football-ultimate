import { ActivityIndicator, Text, View } from "react-native";
import TextCustom from "./customs/TextCustom";


const LoadingSplash = () => {
    return(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingBottom: 15, paddingTop: 15}}>
            <ActivityIndicator size={'large'} style={{marginBottom: 10}}/>
            <TextCustom size={'regular'} family={'Roboto_300Light'}>Ładowanie</TextCustom>
        </View>
    )
}

export default LoadingSplash;