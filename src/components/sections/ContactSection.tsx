// src/components/sections/ContactSection.tsx
'use client'

import {motion} from 'framer-motion';
import GlitchText from '../ui/GlitchText';
import HoverGlitch from '../ui/HoverGlitch';
import TextGlitch from "@/components/ui/TextGlitch";

const ContactSection = () => {
    return (
        <section className="py-20 max-w-4xl mx-auto">
            <motion.h2
                initial={{opacity: 0}}
                whileInView={{opacity: 1}}
                className="text-4xl md:text-6xl font-orbitron font-bold mb-12 text-center neon-text"
            >
                <GlitchText text="Contact Operator"/>
            </motion.h2>

            <motion.div
                initial={{opacity: 0}}
                whileInView={{opacity: 1}}
                className="holo-border p-8 rounded-lg"
            >
                <form className="space-y-6">
                    <div>
                        <label className="block text-matrix-green mb-2">
                            <span className="font-matrix">
                                <TextGlitch text="Your Name">


                                </TextGlitch>
                            </span>
                        </label>
                        <input
                            type="text"
                            className="w-full bg-matrix-dark border border-matrix-green rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-matrix-green"
                        />
                    </div>

                    <div>
                        <label className="block text-matrix-green mb-2">
                                <span className="font-matrix">
                                    <HoverGlitch intensity={0.5}>
                                        Your Message</HoverGlitch>
                                </span>
                        </label>
                        <textarea
                            rows={5}
                            className="w-full bg-matrix-dark border border-matrix-green rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-matrix-green font-matrix"
                        />
                    </div>

                    <div className="text-center">
                        <button
                            type="submit"
                            className="bg-matrix-green text-black font-orbitron px-8 py-3 rounded-full hover:bg-matrix-blue transition-all duration-300 uppercase tracking-widest"
                        >
                            <HoverGlitch intensity={0.1}>
                                <span>Send Message</span>
                            </HoverGlitch>
                        </button>
                    </div>
                </form>
            </motion.div>
        </section>
    );
};

export default ContactSection;