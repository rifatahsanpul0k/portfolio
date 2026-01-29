import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, setSearchQuery } from '../../store/projectsSlice';
import { filterCategories } from '../../data/projects';
import './FilterBar.css';

const FilterBar = () => {
    const dispatch = useDispatch();
    const { activeFilter, searchQuery } = useSelector(state => state.projects);

    const handleFilterChange = (filter) => {
        dispatch(setFilter(filter));
    };

    const handleSearchChange = (e) => {
        dispatch(setSearchQuery(e.target.value));
    };

    return (
        <div className="filter-bar border-b">
            <div className="filter-bar__tabs">
                {filterCategories.map((category) => (
                    <button
                        key={category}
                        className={`filter-bar__tab ${activeFilter === category ? 'filter-bar__tab--active' : ''}`}
                        onClick={() => handleFilterChange(category)}
                    >
                        <span className="text-caption">{category}</span>
                    </button>
                ))}
            </div>

            <div className="filter-bar__search">
                <span className="material-icons filter-bar__search-icon">search</span>
                <input
                    type="text"
                    className="filter-bar__search-input text-caption"
                    placeholder="SEARCH_PROJECTS..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>
        </div>
    );
};

export default FilterBar;
