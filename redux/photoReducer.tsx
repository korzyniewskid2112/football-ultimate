import { LAST_SHOW_PICTURE } from './action';

type initialStateProps = {
    photo: Array<{ id: string, image: string }>,
}

type photoActionProps = {
    type: typeof LAST_SHOW_PICTURE,
    id: string,
    image: string
}

const initialState: initialStateProps = {
    photo: [],
}

const photoReducer = (state = initialState, action: photoActionProps) => {
    switch (action.type) {
        case LAST_SHOW_PICTURE:
            const tempState = [...state.photo];
            if (tempState.length >= 10) {
                tempState.shift();
            }
            if (tempState.find(element => element.id === action.id)) {
                return { ...state }
            }
            return {
                ...state, photo: [...tempState, {id: action.id, image: action.image}]
            }
        default: return state
    }
}

export default photoReducer

