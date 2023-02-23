
import { combineReducers, applyMiddleware } from 'redux'
import { configureStore } from "@reduxjs/toolkit";
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import { productListReducer, productDetailsReducer } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers';
import { userLoginReducer, userRegisterReducer } from './reducers/userReducers';

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const store = configureStore({
    reducer: {
        productList: productListReducer,
        productDetails: productDetailsReducer,
        cart: cartReducer,
        userLogin: userLoginReducer,
        userRegister: userRegisterReducer,
    },
    preloadedState: {
        cart: { cartItems: cartItemsFromStorage },
        userLogin: { userInfo: userInfoFromStorage}
    },
    middleware: [thunk],
})

export default store

