// src/components/ui/MatrixTypingText.tsx

'use client';

import { useEffect, useRef, useState } from 'react';
import {TerminalCursor} from "@/components/ui/TerminalCursor";
import {getTypingParams, TYPING_CONFIG} from "@/constants/typingConfig";

type MatrixTypingTextProps = {
    id: string;
    text: string;
    speed?: number;
    delay?: number;
    className?: string;
    activeCursorId?: string;
    onComplete?: (id?: string) => void;
};

export const MatrixTypingText = ({
                                     id,
                                     text,
                                     speed = TYPING_CONFIG.speed,
                                     delay = 0,
                                     className = '',
                                     activeCursorId,
                                     onComplete
                                 }: MatrixTypingTextProps) => {
    const [displayText, setDisplayText] = useState('');
    const [showCursor, setShowCursor] = useState(false);
    const [isPreTyping, setIsPreTyping] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);
    const { charDelay } = getTypingParams(text.length);

    useEffect(() => {
        if (id !== activeCursorId) {
            setShowCursor(false);
            return;
        }

        setShowCursor(true);
        let timeoutId: NodeJS.Timeout;
        let intervalId: NodeJS.Timeout;
        let cursorIntervalId: NodeJS.Timeout;
        let preTypingTimeoutId: NodeJS.Timeout;

        const startTyping = () => {
            setIsPreTyping(false);
            let i = 0;

            intervalId = setInterval(() => {
                if (i < text.length) {
                    setDisplayText(text.substring(0, i + 1));
                    i++;
                } else {
                    clearInterval(intervalId);
                    timeoutId = setTimeout(() => {
                        setShowCursor(false);
                        onComplete?.(id);
                    }, TYPING_CONFIG.delays.postTyping);
                }
            }, charDelay);
        };

        // eslint-disable-next-line prefer-const
        cursorIntervalId = setInterval(() => {
            setShowCursor(prev => !prev);
        }, TYPING_CONFIG.cursor.blinkInterval);

        // eslint-disable-next-line prefer-const
        preTypingTimeoutId = setTimeout(() => {
            startTyping();
        }, TYPING_CONFIG.delays.preTyping);

        return () => {
            clearTimeout(preTypingTimeoutId);
            clearTimeout(timeoutId);
            clearInterval(intervalId);
            clearInterval(cursorIntervalId);
        };
    }, [text, speed, delay, onComplete, id, activeCursorId, charDelay]);

    return (
        <div
            className={`inline-flex items-baseline ${className}`}
            ref={containerRef}
            style={{ lineHeight: 1 }}
        >
            <span style={{ visibility: isPreTyping ? 'hidden' : 'visible' }}>
                {displayText}
            </span>
            <TerminalCursor
                show={showCursor}
                alignWithRef={containerRef}
            />
        </div>
    );
};