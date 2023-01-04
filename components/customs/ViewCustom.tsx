import type { ReactNode } from "react";
import { StyleProp, View, ViewStyle } from "react-native";


const ViewCustom = ({children, style}: {children: ReactNode, style?: StyleProp<ViewStyle>}) => {
    return(
        <View style={[{paddingLeft: 25, paddingRight: 25}, style]}>
            {children}
        </View>
    )
}

export default ViewCustom;