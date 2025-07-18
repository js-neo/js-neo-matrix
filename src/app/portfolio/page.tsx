// src/app/portfolio/page.tsx


import ProjectsSection from '@/components/sections/ProjectsSection';

export default function PortfolioPage() {
    return (
            <main className="container mx-auto px-4 py-12 md:py-24 relative z-10">
                <ProjectsSection />
            </main>

    );
}