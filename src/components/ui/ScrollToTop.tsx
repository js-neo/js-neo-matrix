// src/components/ui/ScrollToTop.tsx

'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const ScrollToTop = () => {
    const pathname = usePathname();

    useEffect(() => {

        if (typeof window !== 'undefined') {
            window.history.scrollRestoration = 'manual';
        }

        const timer = setTimeout(() => {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'auto'
            });
        }, 50);

        return () => clearTimeout(timer);
    }, [pathname]);

    return null;
};

export default ScrollToTop;