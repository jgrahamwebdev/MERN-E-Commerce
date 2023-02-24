
import axios from 'axios'

//ADD TO CART
export const addToCart = (id, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`)

    //Collects info we want to be displayed about item in cart
    dispatch({
        type: 'CART_ADD_ITEM',
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty
        }
    })

    //Stores cart items to local storage
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

//REMOVE FROM CART
export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: 'CART_REMOVE_ITEM',
        payload: id
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

//SAVE SHIPPING ADDRESS
export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({
        type: 'CART_SAVE_SHIPPING_ADDRESS',
        payload: data
    })

    localStorage.setItem('shippingAddress', JSON.stringify(data))
}



