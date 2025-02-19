import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import productSlice from "../features/ProductSlice";
import basketSlice from "../features/BasketSlice";
import wishlistSlice from "../features/WishlistSlice";
import userSlice from "../features/userSlice";
import documentSlice from "../features/documentSlice"; // DocumentSlice əlavə edildi

const persistProductConfig = {
  key: "product",
  storage,
};

const persistBasketConfig = {
  key: "basket",
  storage,
};

const persistWishlistConfig = {
  key: "wishlist",
  storage,
};

const persistUserConfig = {
  key: "user",
  storage,
};

const persistDocumentConfig = {
  key: "documents",
  storage,
};

const persistedProductReducer = persistReducer(
  persistProductConfig,
  productSlice
);

const persistedWishlistReducer = persistReducer(
  persistWishlistConfig,
  wishlistSlice
);

const persistedBasketReducer = persistReducer(persistBasketConfig, basketSlice);

const persistedUserReducer = persistReducer(persistUserConfig, userSlice);

const persistedDocumentReducer = persistReducer(
  persistDocumentConfig,
  documentSlice
);

export const store = configureStore({
  reducer: {
    products: persistedProductReducer,
    basket: persistedBasketReducer,
    wishlist: persistedWishlistReducer,
    user: persistedUserReducer,
    documents: persistedDocumentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
