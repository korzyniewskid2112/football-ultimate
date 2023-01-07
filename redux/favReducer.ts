import { ADD_FAV, REMOVE_FAV } from './action';

type initialStateProps = {
    fav: Array<{ id: string, image: string }>,
}

type cartActionProps = {
    type: typeof ADD_FAV | typeof REMOVE_FAV,
    id: string,
    image: string
}

const initialState: initialStateProps = {
    fav: [],
}

const favReducer = (state = initialState, action: cartActionProps) => {
    switch (action.type) {
        case ADD_FAV:
            const exist = state.fav.find(element => element.id === action.id);
            if(exist !== undefined){
               return state
            }
            return{
                ...state, 
                fav: [...state.fav, {id: action.id, image: action.image}]
            }
        case REMOVE_FAV: 
            const tempArray = [...state.fav];
            tempArray.splice(tempArray.findIndex(element => element.id === action.id), 1);
            return{
                ...state, fav: [...tempArray]
            }
        default: return state
    }
}

export default favReducer