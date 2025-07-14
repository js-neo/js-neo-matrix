// src/components/ui/MatrixTerminal.tsx

'use client';

import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {MatrixTypingText} from './MatrixTypingText';

const COMMAND_DELAY = 1500; // пауза между появлением разных команд в терминале
const LINE_TYPING_BASE_DELAY = 1000; // Базовая задержка перед началом печати команды
const TYPING_SPEED = 500;
const CURSOR = {
    BLINK_INTERVAL: 500,
    WIDTH_RATIO: 0.6,
    HEIGHT_RATIO: 1.0
};

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
        }, CURSOR.BLINK_INTERVAL);

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
        let delay = LINE_TYPING_BASE_DELAY;

        commands.forEach((command, index) => {
            timeouts.push(
                setTimeout(() => {
                    setVisibleCommands(prev => [...prev, index]);
                    setActiveCursorId(command.id);
                }, delay)
            );

            // Расчет задержки для следующей команды:
            // Базовое время печати + фиксированная задержка между командами
            delay += (command.text.length * (60000 / TYPING_SPEED)) + COMMAND_DELAY;
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
                        speed={TYPING_SPEED}
                        delay={0}
                        activeCursorId={activeCursorId}
                        onComplete={() => handleCommandComplete(command.id)}
                    />
                </div>
            );
        });
    }, [visibleCommands, activeCursorId, handleCommandComplete]);

    const getCursorStyle = () => {
        if (!promptRef.current) return {
            height: '1em',
            width: '0.6em'
        };

        const fontSize = getComputedStyle(promptRef.current).fontSize;
        return {
            height: fontSize,
            width: `calc(${fontSize} * ${CURSOR.WIDTH_RATIO})`
        };
    };

    return (
        <div ref={terminalRef}
             className="terminal bg-black p-4 rounded-lg border border-matrix-green max-w-2xl mx-auto">
            <div className="font-mono text-matrix-green">
                {visibleCommands.length > 0 ? (
                    commandElements ) : (
                    <div className="flex">
                        <span ref={promptRef} className="text-matrix-purple mr-2">$</span>
                        <span
                            className="bg-matrix-green transition-opacity"
                            style={{
                                ...getCursorStyle(),
                                opacity: showCursor ? 1 : 0,
                                transitionDuration: `${CURSOR.BLINK_INTERVAL / 2}ms`
                            }}
                        />
                    </div>)}
            </div>
        </div>
    );
};

export default MatrixTerminal;