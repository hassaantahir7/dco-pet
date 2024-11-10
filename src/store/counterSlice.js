import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    counter:0,
};

const counterSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        refresh: (state, action) => {
            state.counter++
        },
    },

});

export const { refresh } = counterSlice.actions;  // Export setProfile action

export default counterSlice.reducer;