import { Dispatch, ReactElement, ReactNode, SetStateAction } from "react";
import { RefreshControl, View, StyleSheet, ScrollView } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type ScrollViewCustomProps = {
    header?: boolean,
    spaces?: { left?: number, right?: number },
    children: ReactNode,
    reload?: boolean,
    setReload?: Dispatch<SetStateAction<boolean>>
}

const ScrollViewCustom = ({ header = false, spaces = { left: 25, right: 25 }, children, reload, setReload }: ScrollViewCustomProps) => {

    const insets = useSafeAreaInsets();

    return (
        reload != undefined && setReload
            ? <ScrollView style={[{paddingLeft: spaces.left, paddingRight: spaces.right}]} showsVerticalScrollIndicator={false} 
                refreshControl={<RefreshControl refreshing={reload} onRefresh={() => setReload(prevState => !prevState)} />} >
                <View style={{ paddingTop: header ? insets.top : 0, paddingBottom: 15 }}>
                    {children}
                </View>
            </ScrollView >
            : <ScrollView style={[{paddingLeft: spaces.left, paddingRight: spaces.right}]} showsVerticalScrollIndicator={false}>
                <View style={{ paddingTop: header ? insets.top : 0, paddingBottom: 15 }}>
                    {children}
                </View>
            </ScrollView>
    )
}

export default ScrollViewCustom;