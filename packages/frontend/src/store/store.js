import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query/react'
import { thunk } from "redux-thunk";
import storage from 'redux-persist/lib/storage'
import { combineReducers } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import { usersApi } from "./services/users.api";
import { scoresApi } from "./services/scores.api";
import tokenReducer from './slices/token.slices';
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
    whitelist: ['tokenState'],
    timeout: 10
}

const rootReducer = combineReducers({
    tokenState: tokenReducer,
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