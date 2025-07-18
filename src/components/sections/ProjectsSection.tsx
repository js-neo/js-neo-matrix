// src/components/sections/ProjectsSection.tsx
'use client'

import {motion} from 'framer-motion';
import GlitchText from '../ui/GlitchText';
import HologramCard, {type HologramCardProps} from '../ui/HologramCard';

const projects: HologramCardProps[] = [
    {
        title: "Matrix Dashboard",
        description: "Интерактивная аналитическая панель с 3D визуализациями",
        tags: ["React", "Three.js", "WebGL"],
        status: "online"
    },
    {
        title: "Neo Crypto",
        description: "Криптовалютный трекер с алгоритмами машинного обучения",
        tags: ["Next.js", "TypeScript", "TensorFlow.js"],
        status: "beta"
    },
    {
        title: "Zion Social",
        description: "Децентрализованная социальная сеть",
        tags: ["Solidity", "IPFS", "Web3.js"],
        status: "dev"
    }
];

const ProjectsSection = () => {
    return (
        <section className="py-20">
            <motion.h2
                initial={{opacity: 0}}
                whileInView={{opacity: 1}}
                transition={{duration: 0.5}}
                className="text-4xl md:text-6xl font-orbitron font-bold mb-12 text-center neon-text"
            >
                <GlitchText text="My Missions"/>
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                    <motion.div
                        key={`${project.title}-${index}`}
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        transition={{delay: index * 0.1,
                            duration: 0.5,
                            type: 'spring'}}
                        viewport={{once: true, margin: '0px 0px -100px 0px'}}
                    >
                        <HologramCard
                            {...project}
                        />
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default ProjectsSection;