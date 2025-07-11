// src/components/ui/MatrixTerminal.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { MatrixTypingText } from './MatrixTypingText';

const commands = [
    { text: 'npm install @js-neo/skills', delay: 1000 },
    { text: '> Success! Installed: React, Next.js, Three.js...', delay: 500 },
    { text: 'node deploy-matrix.js', delay: 1000 },
    { text: '> System rebooted. Welcome to the real web world.', delay: 500 }
];

const MatrixTerminal = () => {
    const [visibleCommands, setVisibleCommands] = useState<number[]>([]);
    const terminalRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (terminalRef.current) {
            observer.observe(terminalRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        let timeouts: NodeJS.Timeout[] = [];
        let delay = 0;

        commands.forEach((_, index) => {
            timeouts.push(
                setTimeout(() => {
                    setVisibleCommands(prev => [...prev, index]);
                }, delay)
            );
            delay += commands[index].delay + 1000;
        });

        return () => timeouts.forEach(t => clearTimeout(t));
    }, [isVisible]);

    return (
        <div
            ref={terminalRef}
            className="terminal bg-black p-4 rounded-lg border border-matrix-green max-w-2xl mx-auto"
        >
            <div className="font-mono text-matrix-green">
                {visibleCommands.map((index) => (
                    <div key={index} className="flex mb-2">
                        <span className="text-matrix-purple mr-2">$</span>
                        <MatrixTypingText
                            text={commands[index].text}
                            speed={30}
                            delay={commands[index].delay}
                        />
                    </div>
                ))}
                {visibleCommands.length < commands.length && (
                    <div className="flex">
                        <span className="text-matrix-purple mr-2">$</span>
                        <span className="terminal-cursor">_</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MatrixTerminal;