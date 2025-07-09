// src/components/ui/EasterEggHandler.tsx
'use client';

import { useEffect } from 'react';

const EasterEggHandler = () => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.altKey && e.key === 'u') {
                document.body.classList.add('code-rain');
                setTimeout(() => {
                    document.body.classList.remove('code-rain');
                }, 3000);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return null;
};

export default EasterEggHandler;