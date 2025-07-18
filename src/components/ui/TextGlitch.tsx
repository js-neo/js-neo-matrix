// src/components/ui/TextGlitch.tsx

'use client';
import { motion } from 'framer-motion';
import { useState, useCallback } from 'react';
import { cn } from '@/lib/merge-utils';

const TextGlitch = ({
                        text,
                        intensity = 0.3,
                        duration = 0.2,
                        className = '',
                    }: {
    text: string;
    intensity?: number;
    duration?: number;
    className?: string;
}) => {
    const [displayText, setDisplayText] = useState(text);
    const [isGlitching, setIsGlitching] = useState(false);

    const glitchChars = '█▓▒░|╱╲╳<>';

    const applyGlitch = useCallback(() => {
        setIsGlitching(true);
        setDisplayText(
            text.split('').map(char =>
                Math.random() < intensity
                    ? glitchChars[Math.floor(Math.random() * glitchChars.length)]
                    : char
            ).join('')
        );
        setTimeout(() => setIsGlitching(false), 100);
    }, [text, intensity]);

    return (
        <motion.span
            onHoverStart={applyGlitch}
            onHoverEnd={() => setDisplayText(text)}
            className={cn(
                'inline-block text-matrix-green hover:text-matrix-purple',
                className
            )}
            animate={{
                x: isGlitching ? [0, -2, 2, 0] : 0,
                y: isGlitching ? [0, 2, -2, 0] : 0,
                textShadow: isGlitching ? '0 0 8px currentColor' : 'none'
            }}
            transition={{ duration }}
        >
            {displayText}
        </motion.span>
    );
};

export default TextGlitch;