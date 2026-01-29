import { configureStore } from '@reduxjs/toolkit';
import projectsReducer from './projectsSlice';
import uiReducer from './uiSlice';

export const store = configureStore({
    reducer: {
        projects: projectsReducer,
        ui: uiReducer
    }
});
