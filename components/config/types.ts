export type TabParamList = {
    CategoryNavigation: undefined,
    HomeNavigation: undefined | {screen: 'Home'},
    FavNavigation: undefined,
    CartNavigation: undefined
}

export type HomeParamList = GlobalParamList & {
    Home: undefined,
    Search: undefined | {search: string},
}
export type CategoryParamList = GlobalParamList & {
    Category: undefined,
}

export type FavParamList = GlobalParamList & {
    Fav: undefined,
}

export type MainParamList = {
    TabsNavigation: undefined,
    PaymentDemo: Array<{id: string, image: string}>,
}

export type CartParamList = GlobalParamList & {
    Cart: undefined
}

export type GlobalParamList = {
    Photographer: {id: string, image: string},
    Photo: {id: string},
    Collection: {id: string, title: string},
}
