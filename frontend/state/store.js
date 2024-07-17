import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import { pizzaApi } from './pizzaApi'
import filterReducer from './filterSlice'

const createStore = () => configureStore({
  reducer: {
    [pizzaApi.reducerPath]: pizzaApi.reducer,
    filter: filterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pizzaApi.middleware),
})

const store = createStore()

setupListeners(store.dispatch)

export const resetStore = () => {
  const newStore = createStore()
  setupListeners(newStore.dispatch)
  return newStore
}

export { store }
export default store



// const exampleReducer = (state = { count: 0 }) => {
//   return state
// }

// export const resetStore = () => configureStore({
//   reducer: {
//     example: exampleReducer,
//     [pizzaApi.reducerPath]: pizzaApi.reducer,
//   },
//   middleware: getDefaultMiddleware =>
//     getDefaultMiddleware().concat(pizzaApi.middleware),
// })

// setupListeners(resetStore().dispatch)

// export const store = resetStore()
