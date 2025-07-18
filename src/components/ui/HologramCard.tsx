// src/components/ui/HologramCard.tsx

'use client'
import { motion } from 'framer-motion';

type ProjectStatus = 'online' | 'beta' | 'dev'

const statusStyles: Record<ProjectStatus, string> = {
    online: 'bg-matrix-green',
    beta: 'bg-matrix-blue',
    dev: 'bg-matrix-purple'
};

export interface HologramCardProps {
    title: string;
    description: string;
    tags: string[];
    status?: ProjectStatus
}

const HologramCard = ({
                          title,
                          description,
                          tags,
                          status = 'dev'
                      }: HologramCardProps) => {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="holo-border rounded-lg overflow-hidden bg-matrix-dark/50 backdrop-blur-sm"
        >
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-orbitron text-matrix-green">{title}</h3>
            {status && (
                <span
                    className={`${statusStyles[status]} text-black text-xs px-2 py-1 rounded-full`}
                >
              {status}
            </span>
            )}
                </div>

                <p className="text-gray-300 mb-4">{description}</p>
                {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {tags.map(tag => (
                        <span
                            key={tag}
                            className="text-xs bg-matrix-dark text-matrix-green px-2 py-1 rounded border border-matrix-green"
                        >
              {tag}
            </span>
                    ))}
                </div>)}
            </div>

            <div className="h-1 bg-gradient-to-r from-matrix-green via-matrix-blue to-matrix-purple" />
        </motion.div>
    );
};

export default HologramCard;