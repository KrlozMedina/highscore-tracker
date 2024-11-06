import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    counter: 0
}

export const counterSlice = createSlice({
    name: 'counterSlice',
    initialState,
    reducers: {
        setCounter: (state, action) => {
            state.counter = action.payload.counter;
        }
    }
})

export const { setCounter } = counterSlice.actions;
export const selectCounter = (state) => state.counterState.counter;
export default counterSlice.reducer;

// import { createSlice } from '@reduxjs/toolkit';

// export const counterSlice = createSlice({
//     name: "counter",
//     initialState: {value: 0},
//     reducers: {
//         increment: (state, action) => {
//             console.log(`increment: ${JSON.stringify(action)}`);
//             state.value += 1;
//         },
//         decrement: (state, action) => {
//             console.log(`decrement: ${JSON.stringify(action)}`);
//             state.value -= 1;
//         }
//     }
// });

// export const { increment, decrement } = counterSlice.actions;