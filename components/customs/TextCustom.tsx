import type { ReactNode } from "react"
import { StyleProp, Text, TextStyle, View } from "react-native"
import getColors from "../config/const"

const sizes = {
    'megaSmall': 10,
    'extraSmall': 12,
    'small': 14,
    'regular': 16,
    'large': 18,
    'extraLarge': 20,
    'huge': 24,
    'extraHuge': 26,
}

type TextCustomProps = {
    family?: 'Roboto_100Thin' | 'Roboto_300Light' | 'Roboto_400Regular' | 'Roboto_500Medium' | 'Roboto_700Bold' | 'Roboto_900Black',
    size?:  'megaSmall' | 'extraSmall' | 'small' | 'regular' | 'large' | 'extraLarge' | 'huge' | 'extraHuge',
    color?: string,
    numberLines?: number,
    children: ReactNode,
    marginBottom?: number,
    customStyles?: StyleProp<TextStyle>
}

const TextCustom = ({ family = 'Roboto_400Regular', size = 'small', color, numberLines, children, marginBottom = 0, customStyles }: TextCustomProps) => {

    const colors = getColors();

    return (
        <View style = {{marginBottom: marginBottom}}>
            <Text
                numberOfLines={numberLines ? numberLines : 10}
                style={[{
                    color: color ? color : colors.textBlack,
                    fontFamily: family,
                    fontSize: sizes[size],
                }, customStyles]}
            >{children}</Text>
        </View>
    )
}

export default TextCustom;