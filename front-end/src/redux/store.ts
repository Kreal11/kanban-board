import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { boardsReducer } from "./board/slice";
import storage from "redux-persist/lib/storage";
import { cardsReducer } from "./card/slice";

const authPersistConfig = {
  key: "boards",
  storage,
  whitelist: ["boards"],
};

const rootReducer = combineReducers({
  boards: persistReducer(authPersistConfig, boardsReducer),
  cards: cardsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
