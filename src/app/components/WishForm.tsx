'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function WishForm() {
  const [wish, setWish] = useState(''); // State để lưu điều ước
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const response = await fetch('/api/wishes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ wishText: wish }), // Gửi điều ước từ input
    });

    if (!response.ok) {
      setError('Có lỗi xảy ra, vui lòng thử lại');
    } else {
      setWish(''); // Reset input sau khi gửi thành công
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
            value={wish} // Liên kết với state
            onChange={(e) => setWish(e.target.value)} // Cập nhật state khi người dùng nhập
            placeholder="Điều ước của em là gì nè nhỏ ơi?"
            className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-birthday-blue-400 focus:border-transparent resize-none"
          />
          {error && (
            <p className="mt-1 text-sm text-red-500">{error}</p>
          )}
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-3 bg-birthday-blue-400 text-white rounded-lg font-medium shadow-md hover:bg-birthday-blue-500"
        >
          Gửi điều ước
        </motion.button>
      </form>
    </motion.div>
  );
}