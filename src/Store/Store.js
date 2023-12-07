import { configureStore } from "@reduxjs/toolkit";
import AllUserSlice from "./AllUserSlice/AllUserSlice";
import LoadingSlice from "./LoadingSlice/LoadingSlice";
import UserSlice from "./UserSlice/UserSlice";
import ConfigSlice from "./ConfigSlice/ConfigSlice"
import ProductSlice from "./ProductSlice/ProductSlice";
import ServiceSlice from "./ServiceSlice/ServiceSlice";
import CartSlice from "./CartSlice/CartSlice";
import QuerySlice from "./Query/QuerySlice";



const Store = configureStore({
  reducer: {
    config: ConfigSlice,
    user: UserSlice,
    allUser: AllUserSlice,
    loading: LoadingSlice,
    products: ProductSlice,
    services: ServiceSlice,
    cart: CartSlice,
    query: QuerySlice
  },
});

export default Store;
