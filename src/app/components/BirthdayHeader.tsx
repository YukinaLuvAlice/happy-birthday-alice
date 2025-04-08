'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import {FloatingElement} from './FloatingElement';

export function BirthdayHeader() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className="text-center py-10 relative overflow-hidden">
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: isVisible ? 1 : 0, opacity: isVisible ? 1 : 0 }}
                transition={{ duration: 0.8, type: "spring" }}
            >
                <h1 className="text-2xl md:text-5xl font-bold text-birthday-blue-400 font-comic drop-shadow-lg">
                    🎉 誕生日おめでとうアリス 🎉
                </h1>
                <p className="mt-4 text-xl text-birthday-blue-300 font-comic">
                    ✨ 生まれてきてくれてありがとう ✨
                </p>
            </motion.div>
        </div>
    );
} 