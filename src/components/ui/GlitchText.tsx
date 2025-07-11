// src/components/ui/GlitchText.tsx
'use client';

import {useCallback, useEffect, useState} from 'react';
import { motion } from 'framer-motion';
import { playGlitchSound } from './MatrixSounds';

interface GlitchTextProps {
    text: string;
    glitchProbability?: number;
    charGlitchProbability?: number;
    duration?: number;
    className?: string;
}

const GlitchText = ({
                        text,
                        glitchProbability = 0.3,
                        charGlitchProbability = 0.2,
                        duration = 0.8,
                        className = '',
                    }: GlitchTextProps) => {
    const [displayText, setDisplayText] = useState(text);
    const [isGlitching, setIsGlitching] = useState(false);

    const glitchChars = '█▓▒░|╱╲╳<>';

    const generateGlitch = useCallback(() => {
        return text
            .split('')
            .map((char) =>
                char !== ' ' && Math.random() < charGlitchProbability
                    ? glitchChars[Math.floor(Math.random() * glitchChars.length)]
                    : char
            )
            .join('');
    }, [text, charGlitchProbability, glitchChars]);

    useEffect(() => {
        let intervalId: NodeJS.Timeout;

        const startGlitching = () => {
            intervalId = setInterval(() => {
                if (Math.random() < glitchProbability) {
                    setIsGlitching(true);
                    setDisplayText(generateGlitch());
                    playGlitchSound();

                    setTimeout(() => {
                        setIsGlitching(false);
                        setDisplayText(text);
                    }, 100);
                }
            }, 2000);
        };

        startGlitching();

        return () => clearInterval(intervalId);
    }, [text, glitchProbability, generateGlitch]);

    return (
        <motion.span
            className={`inline-block ${className} ${isGlitching ? 'text-matrix-purple' : 'text-matrix-green'}`}
            animate={{
                x: isGlitching ? [0, -2, 2, -1, 1, 0] : 0,
                y: isGlitching ? [0, 2, -2, 1, -1, 0] : 0,
            }}
            transition={{
                duration: isGlitching ? duration * 0.5 : duration,
                ease: 'easeInOut',
            }}
        >
            {displayText}
        </motion.span>
    );
};

export default GlitchText;