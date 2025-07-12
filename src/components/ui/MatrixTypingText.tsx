'use client';

import { useEffect, useRef, useState } from 'react';

// Константы времени (в миллисекундах)
const CURSOR_BLINK_INTERVAL = 500; // Частота моргания курсора (как в старых терминалах)
const POST_TYPING_DELAY = 1500; // Задержка после печати перед скрытием курсора
const POST_COMPLETE_DELAY = 500; // Дополнительная задержка перед вызовом onComplete
const MS_PER_MINUTE = 60000; //  количество миллисекунд в минуте (60 * 1000)
const TYPING_SPEED = 300; // символов в минуту

type MatrixTypingTextProps = {
    id: string;
    text: string;
    speed?: number; // Символов в минуту (для расчета скорости печати)
    delay?: number;
    className?: string;
    activeCursorId?: string;
    onComplete?: (id?: string) => void;
};

export const MatrixTypingText = ({
                                     id,
                                     text,
                                     speed = TYPING_SPEED, // 300 символов/минуту = 5 символов/секунду = 200ms/символ
                                     delay = 0,
                                     className = '',
                                     activeCursorId,
                                     onComplete
                                 }: MatrixTypingTextProps) => {
    const [displayText, setDisplayText] = useState('');
    const [showCursor, setShowCursor] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (id === activeCursorId) {
            setShowCursor(true);

            const timeout = setTimeout(() => {
                const charDelay = MS_PER_MINUTE / speed; // Преобразуем скорость в задержку между символами
                let i = 0;

                const interval = setInterval(() => {
                    if (i < text.length) {
                        setDisplayText(text.substring(0, i + 1));
                        i++;
                    } else {
                        clearInterval(interval);

                        // Задержка перед скрытием курсора
                        setTimeout(() => setShowCursor(false), POST_TYPING_DELAY);

                        // Задержка перед завершением
                        setTimeout(() => onComplete?.(id), POST_TYPING_DELAY + POST_COMPLETE_DELAY);
                    }
                }, charDelay);

                return () => clearInterval(interval);
            }, delay);

            // Интервал моргания курсора
            const cursorInterval = setInterval(() => {
                setShowCursor(prev => !prev);
            }, CURSOR_BLINK_INTERVAL);

            return () => {
                clearTimeout(timeout);
                clearInterval(cursorInterval);
            };
        } else {
            //setDisplayText('');
            setShowCursor(false);
        }
    }, [text, speed, delay, onComplete, id, activeCursorId]);

    return (
        <div className={`inline-flex items-center ${className}`}>
            <span>{displayText}</span>
            {id === activeCursorId && showCursor && (
                <span
                    className="ml-1 w-3 h-6 bg-matrix-green terminal-curcor"
                    style={{
                        height: containerRef.current
                            ? getComputedStyle(containerRef.current).fontSize
                            : '1em'
                    }}
                />
            )}
        </div>
    );
};