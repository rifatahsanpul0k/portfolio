import React from 'react';
import { useSelector } from 'react-redux';
import Header from './components/layout/Header';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import GitHubSection from './components/sections/GitHubSection';
import FeaturedProject from './components/sections/FeaturedProject';
import FilterBar from './components/sections/FilterBar';
import ProjectGrid from './components/projects/ProjectGrid';
import TechStack from './components/sections/TechStack';
import CTA from './components/sections/CTA';
import './index.css';

function App() {
    const { projects } = useSelector(state => state.projects);
    const featuredProject = projects.find(p => p.type === 'featured');

    return (
        <div className="app">
            <Header />

            <main className="main-content">
                <Hero />

                <About />

                <GitHubSection />

                <div id="projects">
                    {featuredProject && <FeaturedProject project={featuredProject} />}

                    <FilterBar />

                    <ProjectGrid />
                </div>

                <div id="skills">
                    <TechStack />
                </div>

                <CTA />
            </main>
        </div>
    );
}

export default App;
