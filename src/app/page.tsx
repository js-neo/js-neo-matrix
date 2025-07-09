// src/app/page.tsx

import HeroSection from '@/components/sections/HeroSection';
import PreviewSection from '@/components/sections/PreviewSection';
import {Metadata} from 'next';

export const metadata: Metadata = {
    title: 'JS-Neo | Matrix Portfolio',
    description: 'Welcome to the Matrix of Web Development',
};

export default function Home() {
    return (
        <main className="min-h-screen flex flex-col">
            <div className="flex-grow container mx-auto px-4 py-12 md:py-24">
                <HeroSection />
                <PreviewSection />
            </div>
        </main>
    );
}