'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LetterProps {
    onComplete: () => void;
}

export function Letter({ onComplete }: LetterProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [hasBeenOpened, setHasBeenOpened] = useState(false);

    const handleEnvelopeClick = () => {
        setIsOpen(true);
        setHasBeenOpened(true);
    };

    const handleContentClick = () => {
        if (hasBeenOpened) {
            setIsOpen(false);
            onComplete();
        }
    };

    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center min-h-screen px-4 z-50">
            <AnimatePresence mode="wait">
                {!isOpen ? (
                    <div className="text-center relative">
                        <motion.div
                            key="envelope"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            className="cursor-pointer"
                            onClick={handleEnvelopeClick}
                        >
                            <div className="w-60 h-32 bg-pink-200 rounded-xl shadow-lg flex items-center justify-center transform hover:scale-110 transition-transform p-6">
                                <span className="text-6xl">💌</span>
                            </div>
                        </motion.div>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap text-lg text-birthday-blue-400 font-medium"
                        >
                            ✨Nhấn vào thiệp để mở✨
                        </motion.p>
                    </div>
                ) : (
                    <motion.div
                        key="content"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl max-w-lg mx-4 cursor-pointer"
                        onClick={handleContentClick}
                    >
                        <div className="text-center space-y-6">
                            <h2 className="text-2xl font-bold text-birthday-blue-400 mb-4">
                                Gửi Alice yêu dấu của 🦊
                            </h2>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                Thời gian trôi nhanh ghê~ Thoáng cái thôi mà nàng mèo nhà ta đã đón sinh nhật 18 tuổi lần 2 rồi. Mong em tuổi mới mãi luôn yêu đời, tràn đầy năng lượng. Công việc, học hành, tình yêu, gia đình mọi thứ đều thuận lợi, trọn vẹn theo ý mình~<br></br>
                                Mong em luôn là chính mình Alice<br></br>
                                🦊❄️💓😸✨<br></br>
                                -Yukina-
                            </p>
                            <p className="text-sm text-gray-500 mt-4">
                                Nhấn vào vị trí bất kì để đóng thư
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
