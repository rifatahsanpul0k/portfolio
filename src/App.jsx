import React, { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import Header from './components/layout/Header';
import Hero from './components/sections/Hero';
import './index.css';

// Lazy load non-critical sections
const About = lazy(() => import('./components/sections/About'));
const GitHubSection = lazy(() => import('./components/sections/GitHubSection'));
const FeaturedProject = lazy(() => import('./components/sections/FeaturedProject'));
const FilterBar = lazy(() => import('./components/sections/FilterBar'));
const ProjectGrid = lazy(() => import('./components/projects/ProjectGrid'));
const TechStack = lazy(() => import('./components/sections/TechStack'));
const CTA = lazy(() => import('./components/sections/CTA'));

// Loading component
const SectionLoader = () => (
    <div style={{
        padding: '48px 32px',
        textAlign: 'center',
        color: '#666',
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '12px'
    }}>
        LOADING_SECTION...
    </div>
);

function App() {
    const { projects } = useSelector(state => state.projects);
    const featuredProject = projects.find(p => p.type === 'featured');

    return (
        <div className="app">
            <Header />

            <main className="main-content">
                <Hero />

                <Suspense fallback={<SectionLoader />}>
                    <About />
                </Suspense>

                <Suspense fallback={<SectionLoader />}>
                    <GitHubSection />
                </Suspense>

                <div id="projects">
                    <Suspense fallback={<SectionLoader />}>
                        {featuredProject && <FeaturedProject project={featuredProject} />}

                        <FilterBar />

                        <ProjectGrid />
                    </Suspense>
                </div>

                <div id="skills">
                    <Suspense fallback={<SectionLoader />}>
                        <TechStack />
                    </Suspense>
                </div>

                <Suspense fallback={<SectionLoader />}>
                    <CTA />
                </Suspense>
            </main>
        </div>
    );
}

export default App;
