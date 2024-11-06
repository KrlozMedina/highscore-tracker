'use client';

import { Provider } from "react-redux";
import { store, persistor } from "./store";
import {PersistGate} from 'redux-persist/integration/react';
import { persistStore } from "redux-persist";

export default function StoreProvider({ children }) {
        const persistor = persistStore(store)

        return <PersistGate persistor={persistor} >
                <Provider store={store}>
                        {children}
                </Provider>
        </PersistGate>
}