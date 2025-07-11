'use client';

import {useEffect, useRef, useState} from 'react';
// import { playKeyboardSound } from './MatrixSounds';

type MatrixTypingTextProps = {
    text: string;
    speed?: number;
    delay?: number;
    className?: string;
    onComplete?: () => void;
};

export const MatrixTypingText = ({
                                     text,
                                     speed = 30,
                                     delay = 0,
                                     className = '',
                                     onComplete
                                 }: MatrixTypingTextProps) => {
    const [displayText, setDisplayText] = useState('');
    const [showCursor, setShowCursor] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timeout = setTimeout(() => {
            let i = 0;
            const interval = setInterval(() => {
                if (i < text.length) {
                    setDisplayText(text.substring(0, i + 1));
                    // playKeyboardSound();
                    i++;
                } else {
                    clearInterval(interval);
                    setShowCursor(false);
                    onComplete?.();
                }
            }, speed);

            return () => clearInterval(interval);
        }, delay);

        const cursorInterval = setInterval(() => {
            setShowCursor(prev => !prev);
        }, 500);

        return () => {
            clearTimeout(timeout);
            clearInterval(cursorInterval);
        };
    }, [text, speed, delay, onComplete]);

    return (
        <div className={`inline-flex items-center ${className}`}>
            <span>{displayText}</span>
            {showCursor ? (
                <span className="ml-1 w-3 h-6 bg-matrix-green animate-pulse"
                      style={{
                          height: containerRef.current
                              ? getComputedStyle(containerRef.current).fontSize
                              : '1em'
                      }}
                />
            ) : (
                <span className="invisible ml-1 w-3 h-6"
                      style={{
                          height: containerRef.current
                              ? getComputedStyle(containerRef.current).fontSize
                              : '1em'
                      }}
                >|</span>
            )}
        </div>
    );
};