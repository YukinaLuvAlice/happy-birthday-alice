'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface WishFormProps {
  onSubmit: (wish: string) => void;
}

export default function WishForm({ onSubmit }: WishFormProps) {
  const [wish, setWish] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!wish.trim()) {
      setError('Nào phải ước đi~ Không được chơi ăn gian nha');
      return;
    }

    setIsSubmitting(true);

    try {
      // Gọi API để lưu điều ước
      const response = await fetch('/api/wishes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ wish }),
      });

      if (!response.ok) {
        throw new Error('Không thể lưu điều ước');
      }

      onSubmit(wish);
    } catch (err) {
      setError('Có lỗi xảy ra, vui lòng thử lại');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold text-birthday-blue-400 mb-4 text-center">
        ✨Thổi bánh kem rồi thì ước gì đó đi Alice✨
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <textarea
            value={wish}
            onChange={(e) => setWish(e.target.value)}
            placeholder="Điều ước của em là gì nè nhỏ ơi?"
            className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-birthday-blue-400 focus:border-transparent resize-none"
            disabled={isSubmitting}
          />
          {error && (
            <p className="mt-1 text-sm text-red-500">{error}</p>
          )}
        </div>

        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-3 bg-birthday-blue-400 text-white rounded-lg font-medium shadow-md hover:bg-birthday-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Đang gửi...' : 'Gửi đi nhỏ ơi chờ chi 🌟'}
        </motion.button>
      </form>
    </motion.div>
  );
}
