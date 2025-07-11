// src/components/ui/MatrixSounds.tsx
'use client';

import { useEffect, useRef } from 'react';
import { Howl } from 'howler';

const sounds = {
    matrix: new Howl({
        src: ['/sounds/matrix-ambient.ogg'],
        loop: true,
        volume: 0.1
    }),
    keyboard: new Howl({
        src: ['/sounds/digital_text.ogg'],
        volume: 0.01
    }),
    glitch: new Howl({
        src: ['/sounds/mixkit-small-electric-glitch-2595'],
        volume: 0.05
    })
};

export const MatrixSounds = () => {
    const initialized = useRef(false);

    useEffect(() => {
        if (!initialized.current) {
            sounds.matrix.play();
            initialized.current = true;
        }

        return () => {
            sounds.matrix.stop();
        };
    }, []);

    return null;
};

// export const playKeyboardSound = () => sounds.keyboard.play();
export const playGlitchSound = () => sounds.glitch.play();