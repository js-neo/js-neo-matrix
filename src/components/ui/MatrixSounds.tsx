// src/components/ui/MatrixSounds.tsx
'use client';

import React, {useEffect, useRef, useState} from 'react';
import { Howl } from 'howler';

const sounds = {
    matrix: typeof window !== 'undefined' ? new Howl({
        src: ['/sounds/matrix-ambient.ogg'],
        loop: false,
        volume: 0.1,
        html5: true
    }) : null,
    keyboard: typeof window !== 'undefined' ? new Howl({
        src: ['/sounds/digital_text.ogg'],
        volume: 0.01,
        html5: true
    }) : null,
    glitch: typeof window !== 'undefined' ? new Howl({
        src: ['/sounds/mixkit-small-electric-glitch-2595.wav'],
        volume: 0.05,
        html5: true
    }) : null
};

export const MatrixSounds = () => {
    const [soundEnabled, setSoundEnabled] = useState(false);
    const hasPlayed = useRef(false);

    useEffect(() => {

        const timer = setTimeout(() => {
            const saved = localStorage.getItem('soundEnabled');
            setSoundEnabled(saved === 'true');
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!soundEnabled || hasPlayed.current) return;

        const handlePlay = () => {
            if (sounds.matrix?.play()) {
                hasPlayed.current = true;
            }
        };


        if (sounds.matrix?.state() === 'loaded') {
            handlePlay();
        }

        else {
            sounds.matrix?.once('load', handlePlay);
        }


        sounds.matrix?.once('loaderror', () => {
            console.warn('Failed to load matrix sound');
        });

        return () => {

            sounds.matrix?.off('load', handlePlay);
            sounds.matrix?.off('loaderror');
        };
    }, [soundEnabled]);

    const toggleSound = (e: React.MouseEvent) => {
        e.stopPropagation();
        const newState = !soundEnabled;
        setSoundEnabled(newState);
        localStorage.setItem('soundEnabled', String(newState));
    };

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <button
                onClick={toggleSound}
                className="bg-matrix-green/20 hover:bg-matrix-green/40 text-matrix-green px-4 py-2 rounded-lg border border-matrix-green transition-all"
            >
                {soundEnabled ? '🔊 Sound ON' : '🔇 Sound OFF'}
            </button>
        </div>
    );
};

export const playGlitchSound = () => {
    if (sounds.glitch && localStorage.getItem('soundEnabled') === 'true') {
        sounds.glitch.play();
    }
};

export const playKeyboardSound = () => {
    if (sounds.keyboard && localStorage.getItem('soundEnabled') === 'true') {
        sounds.keyboard.play();
    }
};