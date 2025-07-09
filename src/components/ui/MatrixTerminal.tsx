// src/components/ui/MatrixTerminal.tsx

import { useEffect, useState } from 'react';

const commands = [
    { text: 'npm install @js-neo/skills', delay: 1000 },
    { text: '> Success! Installed: React, Next.js, Three.js...', delay: 500 },
    { text: 'node deploy-matrix.js', delay: 1000 },
    { text: '> System rebooted. Welcome to the real world.', delay: 500 }
];

const MatrixTerminal = () => {
    const [output, setOutput] = useState<string[]>([]);
    const [currentCommand, setCurrentCommand] = useState(0);

    useEffect(() => {
        if (currentCommand >= commands.length) return;

        const timer = setTimeout(() => {
            setOutput(prev => [...prev, commands[currentCommand].text]);
            setCurrentCommand(prev => prev + 1);
        }, commands[currentCommand].delay);

        return () => clearTimeout(timer);
    }, [currentCommand]);

    return (
        <div className="terminal bg-black p-4 rounded-lg border border-matrix-green max-w-2xl mx-auto">
            <div className="font-mono text-matrix-green">
                {output.map((line, index) => (
                    <div key={index} className="flex">
                        <span className="text-matrix-purple mr-2">$</span>
                        <span>{line}</span>
                    </div>
                ))}
                {currentCommand < commands.length && (
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