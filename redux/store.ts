import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist'
import cartReducer from './cartReducer';
import favReducer from './favReducer';
import photoReducer from './photoReducer';

const persistConfigCart = {
    key: 'cart',
    storage: AsyncStorage,
}

const persistConfigFav = {
    key: 'fav',
    storage: AsyncStorage,
}

const persistConfigPhoto = {
    key: 'photo',
    storage: AsyncStorage,
}

const persistedReducer = combineReducers({
    cartValues: persistReducer(persistConfigCart, cartReducer),
    favValues: persistReducer(persistConfigFav, favReducer),
    photoValues: persistReducer(persistConfigPhoto, photoReducer),
}) 

const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false,
    }),
})

export const persistStored = persistStore(store);

export default store;