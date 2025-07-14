// src/components/ui/MatrixTypingText.tsx

'use client';

import { useEffect, useRef, useState } from 'react';

// Константы
const CURSOR = {
    BLINK_INTERVAL: 500,
    WIDTH_RATIO: 0.6,
    HEIGHT_RATIO: 1.0
};

const TIMING = {
    POST_TYPING_DELAY: 1500, // пауза после окончания печати строки, когда курсор еще виден
    POST_COMPLETE_DELAY: 500,
    MS_PER_MINUTE: 60000,
    DEFAULT_SPEED: 500 // символов в минуту
};

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
                                     speed = TIMING.DEFAULT_SPEED,
                                     delay = 0,
                                     className = '',
                                     activeCursorId,
                                     onComplete
                                 }: MatrixTypingTextProps) => {
    const [displayText, setDisplayText] = useState('');
    const [showCursor, setShowCursor] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const getCursorStyle = () => {
        if (!containerRef.current) return {
            height: '1em',
            width: '0.6em'
        };

        const fontSize = getComputedStyle(containerRef.current).fontSize;
        return {
            height: fontSize,
            width: `calc(${fontSize} * ${CURSOR.WIDTH_RATIO})`
        };
    };

    const cursorStyle = getCursorStyle();

    useEffect(() => {
        if (id !== activeCursorId) {
            setShowCursor(false);
            return;
        }

        setShowCursor(true);
        let timeoutId: NodeJS.Timeout;
        let intervalId: NodeJS.Timeout;
        let cursorIntervalId: NodeJS.Timeout;

        const startTyping = () => {
            const charDelay = TIMING.MS_PER_MINUTE / speed;
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
                    }, TIMING.POST_TYPING_DELAY);
                }
            }, charDelay);
        };

        // eslint-disable-next-line prefer-const
        cursorIntervalId = setInterval(() => {
            setShowCursor(prev => !prev);
        }, CURSOR.BLINK_INTERVAL);

        const timer = setTimeout(startTyping, delay);

        return () => {
            clearTimeout(timer);
            clearTimeout(timeoutId);
            clearInterval(intervalId);
            clearInterval(cursorIntervalId);
        };
    }, [text, speed, delay, onComplete, id, activeCursorId]);

    return (
        <div className={`inline-flex items-center ${className}`} ref={containerRef}>
            <span>{displayText}</span>
            <span
                className="ml-1 bg-matrix-green transition-opacity"
                style={{
                    ...cursorStyle,
                    opacity: showCursor ? 1 : 0,
                    transitionDuration: `${CURSOR.BLINK_INTERVAL / 2}ms`
                }}
            />
        </div>
    );
};