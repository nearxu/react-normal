// import { createSlice, configureStore } from '@reduxjs/toolkit'

import {  createStore , applyMiddleware,compose} from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducers'


const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk),
  // other store enhancers if any
);
const store = createStore(reducer, enhancer);

// const counterSlice = createSlice({
//   name: 'counter',
//   initialState: {
//     value: 0
//   },
//   reducers: {
//     incremented: state => {
//       // Redux Toolkit allows us to write "mutating" logic in reducers. It
//       // doesn't actually mutate the state because it uses the Immer library,
//       // which detects changes to a "draft state" and produces a brand new
//       // immutable state based off those changes
//       state.value += 1
//     },
//     decremented: state => {
//       state.value -= 1
//     }
//   }
// })

// export const { incremented, decremented } = counterSlice.actions

// const store = configureStore({
//   reducer: counterSlice.reducer
// })

export default store
