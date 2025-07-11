// src/app/layout.tsx

import type { Metadata } from 'next';
import { Inter, Orbitron, Fira_Code } from 'next/font/google';
import './globals.css';
import MatrixRain from '@/components/ui/MatrixRain';
import EasterEggHandler from '@/components/ui/EasterEggHandler';
import React from "react";
import {MatrixSounds} from "@/components/ui/MatrixSounds";
import ScrollToTop from '@/components/ui/ScrollToTop';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const orbitron = Orbitron({ subsets: ['latin'], variable: '--font-orbitron' });
const firaCode = Fira_Code({ subsets: ['latin'], variable: '--font-fira-code' });

export const metadata: Metadata = {
    title: 'JS-Neo Matrix Portfolio',
    description: 'Welcome to the Matrix of Web Development',
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${inter.variable} ${orbitron.variable} ${firaCode.variable}`}>
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        </head>
        <body className="bg-matrix-dark text-white overflow-x-hidden">
        <ScrollToTop/>
        <MatrixRain />
        <EasterEggHandler />
        {children}
        <MatrixSounds />
        </body>
        </html>
    );
}