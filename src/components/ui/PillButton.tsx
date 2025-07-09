// src/components/ui/PillButton.tsx

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

type PillButtonProps = {
    type: 'red' | 'blue';
    label: string;
    href: string;
    className?: string;
};

const PillButton = ({
                        type,
                        label,
                        href,
                        className = ''
                    }: PillButtonProps) => {
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

    const colorConfig = colors[type];

    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`${className}`}
        >
            <Link href={href} passHref>
                <div className={`relative ${colorConfig.bg} ${colorConfig.border} ${colorConfig.glow} 
          rounded-full p-4 px-8 font-orbitron text-xl uppercase tracking-widest 
          transition-all duration-300 cursor-pointer`}
                >
          <span className="relative z-10 text-black font-bold">
            {label}
          </span>
                    <motion.div
                        className="absolute inset-0 rounded-full opacity-70"
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.7, 0.3, 0.7]
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        style={{
                            background: colorConfig.gradient
                        }}
                    />
                </div>
            </Link>
        </motion.div>
    );
};

export default PillButton;