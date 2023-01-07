import { ADD_CART, ADD_FAV, REMOVE_CART, REMOVE_FAV, LAST_SHOW_PICTURE } from './action';

type initialStateProps = {
    cart: Array<{ id: string, image: string }>,
}

type cartActionProps = {
    type: typeof ADD_CART | typeof REMOVE_CART,
    id: string,
    image: string
}

const initialState: initialStateProps = {
    cart: [],
}

const cartReducer = (state = initialState, action: cartActionProps) => {
    switch (action.type) {
        case ADD_CART:
            const exist = state.cart.find(element => element.id === action.id);
            if(exist !== undefined){
               return state
            }
            return{
                ...state, 
                cart: [...state.cart, {id: action.id, image: action.image}]
            }
        case REMOVE_CART: 
            const tempArray = [...state.cart];
            tempArray.splice(tempArray.findIndex(element => element.id === action.id), 1);
            return{
                ...state, cart: [...tempArray]
            }
        default: return state
    }
}

export default cartReducer