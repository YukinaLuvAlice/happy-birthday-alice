'use client';

import { motion } from 'framer-motion';

interface SuccessMessageProps {
    onComplete: () => void;
}

export function SuccessMessage({ onComplete }: SuccessMessageProps) {
    return (
        <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50 bg-black/30"
            onClick={onComplete}
        >
            <div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl text-center">
                <div className="text-6xl mb-4">✨</div>
                <h2 className="text-2xl font-bold text-birthday-blue-400 mb-4">
                    Đã nhớ điều em ước rồi Alice✨
                </h2>
                <p className="text-gray-600">
                    Mong nguyện ước của em trở thành sự thật🌟
                </p>
            </div>
        </motion.div>
    );
}
