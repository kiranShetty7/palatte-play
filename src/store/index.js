import { configureStore } from '@reduxjs/toolkit';
import toolbarSlice from './ToolbarSlice';

const store = configureStore({
    reducer: {
        toolbar: toolbarSlice
    },
});

export default store;