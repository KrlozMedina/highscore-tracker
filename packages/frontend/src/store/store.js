import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query/react'
import { thunk } from "redux-thunk";
import storage from 'redux-persist/lib/storage'
import { combineReducers } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import { usersApi } from "./services/users.api";
import { scoresApi } from "./services/scores.api";
import counterReducer from './slices/counter.slices';
import {
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['counterState'],
    timeout: 100
}

const rootReducer = combineReducers({
    counterState: counterReducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [scoresApi.reducerPath]: scoresApi.reducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        })
        .concat([usersApi.middleware], [scoresApi.middleware], [thunk])
});

setupListeners(store.dispatch)

export {store};