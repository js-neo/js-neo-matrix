// src/components/sections/PreviewSection.tsx

'use client';

import { motion } from 'framer-motion';
import GlitchText from '../ui/GlitchText';
import Link from 'next/link';

const PreviewSection = () => {
    const sections = [
        {
            title: "Навыки",
            description: "React, Next.js, TypeScript, Node.js, Three.js и другие современные технологии",
            link: "/skills",
            linkText: "Узнать больше →",
            colorClass: "neon-border",
            textColor: "text-matrix-green"
        },
        {
            title: "Проекты",
            description: "Посмотрите мои работы - от корпоративных решений до интерактивных экспериментов",
            link: "/portfolio",
            linkText: "Исследовать →",
            colorClass: "holo-border",
            textColor: "text-matrix-blue"
        },
        {
            title: "Контакты",
            description: "Готовы создать что-то невероятное? Свяжитесь со мной для обсуждения проекта",
            link: "/contact",
            linkText: "Связаться →",
            colorClass: "neon-border",
            textColor: "text-matrix-green"
        }
    ];

    return (
        <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
            {sections.map((section, index) => (
                <div key={index} className={`${section.colorClass} p-6 rounded-lg`}>
                    <h3 className={`text-xl font-orbitron ${section.textColor} mb-4`}>
                        <GlitchText text={section.title} />
                    </h3>
                    <p className="mb-4">{section.description}</p>
                    <Link href={section.link} className="text-matrix-blue hover:underline">
                        {section.linkText}
                    </Link>
                </div>
            ))}
        </motion.section>
    );
};

export default PreviewSection;