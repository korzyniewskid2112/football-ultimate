import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import type { Dispatch, SetStateAction } from "react";
import getColors from "./config/const";
import TextCustom from "./customs/TextCustom";


const ErrorSplash = ({ developerError, setReload }: { developerError: string | undefined, setReload?: Dispatch<SetStateAction<boolean>> }) => {

    const colors = getColors();

    return (
        <View style={styles.container}>
            {developerError
                ? (<TextCustom customStyles={{ textAlign: 'center' }}>Informacje developerska: {developerError}</TextCustom>)
                : null
            }
            <TextCustom customStyles={{ textAlign: 'center', marginBottom: 10 }}>Wystąpił błąd, spróbuj ponownie</TextCustom>
            {setReload && (
                <View>
                    <TouchableOpacity
                        style={{ backgroundColor: colors.main, padding: 10, borderRadius: 10 }}
                    >
                        <TextCustom customStyles={{ textAlign: 'center' }} size={'regular'} family={'Roboto_300Light'} color={colors.textWhite}>Odświeź</TextCustom>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        paddingLeft: 25,
        paddingRight: 25,
    },
});

export default ErrorSplash;