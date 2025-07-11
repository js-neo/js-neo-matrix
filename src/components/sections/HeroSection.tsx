// src/components/sections/HeroSection.tsx

'use client';

import { motion } from 'framer-motion';
import { MatrixTypingText } from '../ui/MatrixTypingText';
import PillButton from '../ui/PillButton';
import MatrixTerminal from '../ui/MatrixTerminal';
import CodeSphere from '../ui/CodeSphere';
import { useState } from "react";

const HeroSection = () => {
    const [titleComplete, setTitleComplete] = useState(false);

    return (
        <section className="min-h-[80vh] flex flex-col justify-center items-center text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-12"
            >
                <h1 className="text-5xl md:text-7xl font-orbitron font-bold mb-6 neon-text">
                    <MatrixTypingText
                        text="JS-NEO"
                        speed={150}
                        onComplete={() => setTitleComplete(true)}
                    />
                </h1>
                {titleComplete && (
                    <div className="text-xl md:text-2xl text-matrix-green max-w-3xl mx-auto">
                        <MatrixTypingText
                            text="Wake up, Developer... The Matrix has you."
                            delay={500}
                        />
                    </div>
                )}
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="w-full max-w-4xl mb-16"
            >
                <CodeSphere />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="mb-16"
            >
                <MatrixTerminal />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="flex flex-col md:flex-row gap-8"
            >
                <PillButton
                    type="red"
                    label="Узнать правду"
                    href="/skills"
                />
                <PillButton
                    type="blue"
                    label="Мои проекты"
                    href="/portfolio"
                />
            </motion.div>
        </section>
    );
};

export default HeroSection;