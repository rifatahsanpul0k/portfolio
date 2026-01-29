import React from 'react';
import { useSelector } from 'react-redux';
import ProjectCard from './ProjectCard';
import './ProjectGrid.css';

const ProjectGrid = () => {
    const { filteredProjects } = useSelector(state => state.projects);

    // Filter out featured project (shown separately)
    const regularProjects = filteredProjects.filter(p => p.type !== 'featured');

    if (regularProjects.length === 0) {
        return (
            <div className="project-grid__empty">
                <span className="text-body text-gray">No projects found matching your criteria</span>
            </div>
        );
    }

    return (
        <div className="project-grid">
            <div className="project-grid__container">
                {regularProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </div>
    );
};

export default ProjectGrid;
