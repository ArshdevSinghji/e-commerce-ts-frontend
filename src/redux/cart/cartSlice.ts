import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
    title: string;
    price: number;
    image: string;
}

interface CartState{
    items: CartItem[];
}

const initialState: CartState = {
    items: []
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            if(state.items.find(item => item.title === action.payload.title)) {
                alert("Item already in cart");
                return;
            }
            state.items.push(action.payload)
            alert("Item added to cart");
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            state.items.splice(action.payload, 1);
        }
    }
})

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;