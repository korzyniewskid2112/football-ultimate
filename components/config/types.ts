export type TabParamList = {
    CategoryNavigation: undefined,
    HomeNavigation: undefined,
    FavNavigation: undefined,
    CartNavigation: undefined
}

export type HomeParamList = GlobalParamList & {
    Home: undefined,
}
export type CategoryParamList = {
    Category: undefined,
}

export type FavParamList = {
    Fav: undefined,
}

export type MainParamList = {
    TabsNavigation: undefined,
}

export type GlobalParamList = {
    Photographer: {id: string}
    Photo: {id: string},
}
