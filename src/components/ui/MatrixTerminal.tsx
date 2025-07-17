// src/components/ui/MatrixTerminal.tsx

'use client';

import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {MatrixTypingText} from './MatrixTypingText';
import {TYPING_CONFIG} from "@/constants/typingConfig";
import {TerminalCursor} from "@/components/ui/TerminalCursor";

const commands = [
    {id: 'terminal_command_1', text: 'npm install @js-neo/skills'},
    {id: 'terminal_command_2', text: '> Success! Installed: React, Next.js, Three.js...'},
    {id: 'terminal_command_3', text: 'node deploy-matrix.js'},
    {id: 'terminal_command_4', text: '> System rebooted. Welcome to the real web world.'}
];

interface MatrixTerminalProps {
    activeCursorId: string;
    setActiveCursorId: (id: string) => void;
}

const MatrixTerminal = ({activeCursorId, setActiveCursorId}: MatrixTerminalProps) => {
    const [visibleCommands, setVisibleCommands] = useState<number[]>([]);
    const terminalRef = useRef<HTMLDivElement>(null);
    const promptRef = useRef<HTMLSpanElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [showCursor, setShowCursor] = useState(false);

    useEffect(() => {
        const cursorIntervalId = setInterval(() => {
            setShowCursor(prev => !prev);
        }, TYPING_CONFIG.cursor.blinkInterval);

        return () => {
            clearInterval(cursorIntervalId);
        };
    }, []);


    useEffect(() => {
        if (!terminalRef.current || isVisible) return;

        const observer = new IntersectionObserver(
            ([entry]) => entry.isIntersecting && setIsVisible(true),
            {threshold: 0.1}
        );

        observer.observe(terminalRef.current);
        return () => observer.disconnect();
    }, [isVisible]);

    useEffect(() => {
        if (!isVisible) return;

        const timeouts: NodeJS.Timeout[] = [];
        let delay = TYPING_CONFIG.delays.lineStart;

        commands.forEach((command, index) => {
            timeouts.push(
                setTimeout(() => {
                    setVisibleCommands(prev => [...prev, index]);
                    setActiveCursorId(command.id);
                }, delay)
            );


            delay += TYPING_CONFIG.delays.preTyping +
                (command.text.length * (60000 / TYPING_CONFIG.speed)) +
                (index < commands.length - 1 ? TYPING_CONFIG.delays.postTyping : 0);
        });

        return () => timeouts.forEach(t => clearTimeout(t));
    }, [isVisible, setActiveCursorId]);


    const handleCommandComplete = useCallback((currentId: string) => {
        const currentIndex = commands.findIndex(cmd => cmd.id === currentId);
        if (currentIndex < commands.length - 1) {
            setActiveCursorId(commands[currentIndex + 1].id);
        }
    }, [setActiveCursorId]);

    const commandElements = useMemo(() => {
        return visibleCommands.map((commandIndex) => {
            const command = commands[commandIndex];
            return (
                <div key={command.id} className="flex mb-2">
                    <span className="text-matrix-purple mr-2">$</span>
                    <MatrixTypingText
                        id={command.id}
                        text={command.text}
                        speed={TYPING_CONFIG.speed}
                        delay={0}
                        activeCursorId={activeCursorId}
                        onComplete={() => handleCommandComplete(command.id)}
                    />
                </div>
            );
        });
    }, [visibleCommands, activeCursorId, handleCommandComplete]);

    return (
        <div ref={terminalRef}
             className="terminal bg-black p-4 rounded-lg border border-matrix-green max-w-2xl mx-auto">
            <div className="font-mono text-matrix-green">
                {visibleCommands.length > 0 ? (
                    commandElements ) : (
                    <div className="flex">
                        <span ref={promptRef} className="text-matrix-purple mb-2 mr-2">$</span>
                        <TerminalCursor
                            show={showCursor}
                            blinkInterval={TYPING_CONFIG.cursor.blinkInterval}
                            alignWithRef={promptRef}
                        />
                    </div>)}
            </div>
        </div>
    );
};

export default MatrixTerminal;