export const ADD_CART: string = 'ADD_CART';
export const REMOVE_CART: string = 'REMOVE_CART';
export const ADD_FAV: string = 'ADD_FAV';
export const REMOVE_FAV: string = 'REMOVE_FAV';
export const LAST_SHOW_PICTURE: string = 'LAST_SHOW_PICTURE';

export const addCart = (id: string, image: string) => {
    return({
        type: ADD_CART,
        id: id,
        image: image,
    })
}

export const removeCart = (id: string) => {
    return({
        type: REMOVE_CART,
        id: id,
    })
}

export const addFav = (id: string, image: string) => {
    return({
        type: ADD_FAV,
        id: id,
        image: image,
    })
}

export const removeFav = (id: string) => {
    return({
        type: REMOVE_FAV,
        id: id,
    })
}

export const addPhotos = (id: string, image: string) => {
    return({
        type: LAST_SHOW_PICTURE,
        id: id,
        image: image,
    })
}