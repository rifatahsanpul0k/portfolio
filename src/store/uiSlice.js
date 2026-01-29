import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    mobileMenuOpen: false,
    theme: 'light'
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleMobileMenu: (state) => {
            state.mobileMenuOpen = !state.mobileMenuOpen;
        },
        setTheme: (state, action) => {
            state.theme = action.payload;
        }
    }
});

export const { toggleMobileMenu, setTheme } = uiSlice.actions;
export default uiSlice.reducer;
