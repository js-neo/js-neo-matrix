// src/components/ui/HoverGlitch.tsx

'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/merge-utils';

const glitchChars = '█▓▒░|╱╲╳<>';

interface HoverGlitchProps {
    children: React.ReactNode;
    intensity?: number;
    duration?: number;
    glitchOnHover?: boolean;
    className?: string;
}

const HoverGlitch = ({
                         children,
                         intensity = 0.3,
                         duration = 0.8,
                         glitchOnHover = true,
    className = ''
                     }: HoverGlitchProps) => {
    const [isGlitching, setIsGlitching] = useState(false);
    const [glitchedContent, setGlitchedContent] = useState<React.ReactNode>(children);

    const applyGlitch = useCallback(() => {
        if (typeof children === 'string') {
            const glitchedText = children
                .split('')
                .map(char =>
                    char !== ' ' && Math.random() < intensity
                        ? glitchChars[Math.floor(Math.random() * glitchChars.length)]
                        : char
                )
                .join('');
            setGlitchedContent(glitchedText);
        } else {
            setGlitchedContent(children);
        }
    }, [children, intensity]);

    useEffect(() => {
        if (glitchOnHover) return;

        let timeout: NodeJS.Timeout;
            const interval = setInterval(() => {
                if (Math.random() < intensity) {
                    setIsGlitching(true);
                    applyGlitch();
                    timeout = setTimeout(() => {
                        setIsGlitching(false);
                        setGlitchedContent(children);
                    }, 100);
                }
            }, 2000);
            return () => {
                clearInterval(interval);
                clearTimeout(timeout);
            }

    }, [applyGlitch, children, glitchOnHover, intensity]);

    const handleHover = useCallback(() => {
        if (!glitchOnHover || isGlitching) return;
        if (glitchOnHover) {
            setIsGlitching(true);
            applyGlitch();
            setTimeout(() => {
                setIsGlitching(false);
                setGlitchedContent(children);
            }, 500);
        }
    }, [glitchOnHover, isGlitching, applyGlitch]);

    return (
        <motion.span
            onHoverStart={glitchOnHover ? handleHover : undefined}
            onHoverEnd={glitchOnHover ? () => setGlitchedContent(children) : undefined}
            className={cn('inline-block', isGlitching ? 'text-matrix-purple' : 'text-matrix-green', className)}
            animate={{
                x: isGlitching ? [0, -2, 2, -1, 1, 0] : 0,
                y: isGlitching ? [0, 2, -2, 1, -1, 0] : 0,
                textShadow: isGlitching ? [
                    '0 0 5px #00ff41',
                    '0 0 10px #00f0ff',
                    '0 0 15px #9d00ff',
                    '0 0 5px #00ff41'
                ] : 'none'
            }}
            transition={{
                duration: isGlitching ? duration * 0.5 : duration,
                ease: 'easeInOut',
            }}
        >
            {glitchedContent}
        </motion.span>
    );
};

export default HoverGlitch;