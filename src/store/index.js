import { configureStore } from '@reduxjs/toolkit';
import ToolbarSlice from './ToolbarSlice';
import LoaderSlice from './LoaderSlice';
import SnackBarSlice from './SnackBarSlice';

const store = configureStore({
    reducer: {
        toolbar: ToolbarSlice,
        loader: LoaderSlice,
        snackbar: SnackBarSlice
    },
});

export default store;