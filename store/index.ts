import { configureStore } from '@reduxjs/toolkit';
// Import your reducers here
// import yourReducer from './yourReducer';

const store = configureStore({
  reducer: {
    // Add your reducers here
    // yourReducer: yourReducer,
  },
});

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Add default export
export default store; 