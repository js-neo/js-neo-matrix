// src/components/ui/DigitalPill.tsx

'use client'

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

type DigitalPillProps = {
    type: 'red' | 'blue';
    label: string;
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
};

const DigitalPill = ({
                         type,
                         label,
                         onClick,
                         className = '',
                         disabled = false  }: DigitalPillProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const [glitchText, setGlitchText] = useState(label);

    useEffect(() => {
        if (!isHovered) return;

        const interval = setInterval(() => {
            if (Math.random() > 0.7) {
                const glitched = label
                    .split('')
                    .map(char => Math.random() > 0.8 ? String.fromCharCode(65 + Math.floor(Math.random() * 26)) : char)
                    .join('');
                setGlitchText(glitched);

                setTimeout(() => setGlitchText(label), 100);
            }
        }, 500);

        return () => clearInterval(interval);
    }, [isHovered, label]);

    const colors = {
        red: {
            bg: 'bg-matrix-red',
            border: 'border-matrix-red',
            glow: 'hover:shadow-[0_0_20px_5px_rgba(255,0,60,0.7)]',
            gradient: 'radial-gradient(circle, rgba(255,0,60,1) 0%, rgba(155,0,36,0) 70%)'
        },
        blue: {
            bg: 'bg-matrix-blue',
            border: 'border-matrix-blue',
            glow: 'hover:shadow-[0_0_20px_5px_rgba(0,240,255,0.7)]',
            gradient: 'radial-gradient(circle, rgba(0,240,255,1) 0%, rgba(0,120,127,0) 70%)'
        }
    };

    return (
        <motion.button
            className={`relative ${colors[type].bg} ${colors[type].border} ${colors[type].glow} 
        rounded-full p-4 px-8 font-orbitron text-xl uppercase tracking-widest 
        transition-all duration-300 ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            onClick={onClick}
        >
      <span className="relative z-10 text-black font-bold">
        {glitchText}
      </span>
            <motion.div
                className="absolute inset-0 rounded-full opacity-70"
                animate={{
                    scale: isHovered ? [1, 1.2, 1] : 1,
                    opacity: isHovered ? [0.7, 0.3, 0.7] : 0.7
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{
                    background: type === 'red'
                        ? 'radial-gradient(circle, rgba(255,0,60,1) 0%, rgba(155,0,36,0) 70%)'
                        : 'radial-gradient(circle, rgba(0,240,255,1) 0%, rgba(0,120,127,0) 70%)'
                }}
            />
        </motion.button>
    );
};

export default DigitalPill;