import { createSlice } from '@reduxjs/toolkit';
import { projectsData } from '../data/projects';

const initialState = {
    projects: projectsData,
    activeFilter: 'All',
    searchQuery: '',
    filteredProjects: projectsData
};

const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        setFilter: (state, action) => {
            state.activeFilter = action.payload;
            state.filteredProjects = filterProjects(state.projects, action.payload, state.searchQuery);
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
            state.filteredProjects = filterProjects(state.projects, state.activeFilter, action.payload);
        }
    }
});

// Helper function to filter projects
const filterProjects = (projects, filter, query) => {
    let filtered = projects;

    // Apply category filter
    if (filter !== 'All') {
        filtered = filtered.filter(project => project.category === filter);
    }

    // Apply search query
    if (query) {
        filtered = filtered.filter(project =>
            project.name.toLowerCase().includes(query.toLowerCase())
        );
    }

    return filtered;
};

export const { setFilter, setSearchQuery } = projectsSlice.actions;
export default projectsSlice.reducer;
