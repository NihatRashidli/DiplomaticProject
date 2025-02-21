import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import productSlice from "../features/ProductSlice";
import basketSlice from "../features/BasketSlice";
import wishlistSlice from "../features/WishlistSlice";
import userSlice from "../features/userSlice";
import documentSlice from "../features/documentSlice";
import adminSlice from "../features/adminSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "basket", "wishlist", "documents", "admin"],
};

const persistedUserReducer = persistReducer(
  { key: "user", storage },
  userSlice
);
const persistedProductReducer = persistReducer(
  { key: "product", storage },
  productSlice
);
const persistedBasketReducer = persistReducer(
  { key: "basket", storage },
  basketSlice
);
const persistedWishlistReducer = persistReducer(
  { key: "wishlist", storage },
  wishlistSlice
);
const persistedDocumentReducer = persistReducer(
  { key: "documents", storage },
  documentSlice
);
const persistedAdminReducer = persistReducer(
  { key: "admin", storage },
  adminSlice
);

export const store = configureStore({
  reducer: {
    products: persistedProductReducer,
    basket: persistedBasketReducer,
    wishlist: persistedWishlistReducer,
    user: persistedUserReducer,
    documents: persistedDocumentReducer,
    admin: persistedAdminReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
