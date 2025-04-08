'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
export function BirthdayCake({ onComplete }: { onComplete: () => void }) {
    const [isBlowing, setIsBlowing] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);

    const handleBlow = () => {
        setIsBlowing(true);
        setShowConfetti(true);

        // Sau khi thổi nến xong
        setTimeout(() => {
            onComplete();
        }, 3000);
    };

    return (
        <div className="relative min-h-[60vh] flex flex-col items-center justify-center">
            <AnimatePresence>
                {showConfetti && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0"
                    >
                        {/* Confetti particles */}
                        {[...Array(50)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-2 h-2 bg-birthday-blue-400 rounded-full"
                                initial={{
                                    x: Math.random() * window.innerWidth,
                                    y: window.innerHeight,
                                    scale: 0
                                }}
                                animate={{
                                    y: -100,
                                    scale: 1,
                                    opacity: 0
                                }}
                                transition={{
                                    duration: 2,
                                    delay: Math.random() * 0.5
                                }}
                            />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative"
            >
                {/* Cake base */}
                <div className="w-64 h-40 bg-gradient-to-r from-pink-300 to-pink-400 rounded-lg shadow-lg">
                    {/* Cake layers */}
                    <div className="absolute bottom-0 w-full h-32 bg-gradient-to-r from-pink-200 to-pink-300 rounded-lg" />
                    <div className="absolute bottom-8 w-full h-24 bg-gradient-to-r from-pink-100 to-pink-200 rounded-lg" />

                    {/* Candles */}
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {[...Array(5)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="relative"
                                animate={isBlowing ? {
                                    scale: [1, 1.2, 0],
                                    rotate: [-5, 5, -5]
                                } : {}}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                            >
                                <div className="w-1 h-8 bg-yellow-300" />
                                <div className={`w-2 h-2 rounded-full ${isBlowing ? 'bg-gray-400' : 'bg-yellow-400'}`} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>

            <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                onClick={handleBlow}
                disabled={isBlowing}
                className="mt-8 px-8 py-3 bg-birthday-blue-400 text-white rounded-full shadow-lg hover:bg-birthday-blue-500 transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isBlowing ? 'Phùù...' : '3 2 1 thổi🎂🔥'}
            </motion.button>
        </div>
    );
} 