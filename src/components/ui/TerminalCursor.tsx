// src/components/ui/TerminalCursor.tsx

'use client';

import React from 'react';
import {cn} from "@/lib/merge-utils";

const CURSOR = {
    BLINK_INTERVAL: 500,
    WIDTH_RATIO: 0.6,
    HEIGHT_RATIO: 1.0
};

type TerminalCursorProps = {
    show?: boolean;
    blinkInterval?: number;
    className?: string;
    alignWithRef?: React.RefObject<HTMLElement | null>
};

export const TerminalCursor = ({
                                   show = true,
                                   blinkInterval = CURSOR.BLINK_INTERVAL,
                                   className = '',
                                   alignWithRef
                               }: TerminalCursorProps) => {


    const getCursorStyle = () => {
        if (!alignWithRef?.current) return {
            height: '1em',
            width: '0.6em'
        };

        const fontSize = getComputedStyle(alignWithRef.current).fontSize;
        return {
            height: fontSize,
            width: `calc(${fontSize} * ${CURSOR.WIDTH_RATIO})`
        };
    };

    return (

        <span
            className={cn("ml-1 bg-matrix-green transition-opacity",
                className)}
            style={{
                ...getCursorStyle(),
                opacity: show ? 1 : 0,
                transitionDuration: `${blinkInterval / 2}ms`
            }}
        />

    );
};