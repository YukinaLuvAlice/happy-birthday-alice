'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Các slide có thể tùy chỉnh
const slides = [
    {
        id: 1,
        text: "Hôm nay là một ngày rất đặc biệt",
        emoji: "🌟"
    },
    {
        id: 2,
        text: "Ngày mà một thiên thần đáng yêu đến với thế giới này vào 18+1 năm trước",
        emoji: "🕊️"
    },
    {
        id: 3,
        text: "Chúc nàng mèo lười của anh luôn vui vẻ, hạnh phúc, yêu đời ",
        emoji: "😸"
    },
    {
        id: 4,
        text: "Chúc mừng sinh nhật em Alice",
        emoji: "🎂"
    },
    {
        id: 5,
        text: "愛してるアリス",
        emoji: "😽"
    }
];

export default function BirthdaySlideshow({ onComplete }: { onComplete: () => void }) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        if (currentSlide < slides.length) {
            const timer = setTimeout(() => {
                setIsVisible(false);
                setTimeout(() => {
                    setCurrentSlide(prev => prev + 1);
                    setIsVisible(true);
                }, 500);
            }, 3000);

            return () => clearTimeout(timer);
        } else {
            // Khi slideshow kết thúc
            setTimeout(() => {
                onComplete();
            }, 1000);
        }
    }, [currentSlide, onComplete]);

    if (currentSlide >= slides.length) {
        return null;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <AnimatePresence mode="wait">
                {isVisible && (
                    <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        transition={{ duration: 0.5 }}
                        className="text-center p-8 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl max-w-lg mx-4"
                    >
                        <div className="text-6xl mb-4">{slides[currentSlide].emoji}</div>
                        <h2 className="text-3xl font-bold text-birthday-blue-400 mb-4">
                            {slides[currentSlide].text}
                        </h2>
                        <div className="flex justify-center space-x-2">
                            {slides.map((_, index) => (
                                <div
                                    key={index}
                                    className={`w-3 h-3 rounded-full ${index === currentSlide ? 'bg-birthday-blue-400' : 'bg-gray-300'
                                        }`}
                                />
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
} 