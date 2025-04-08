'use client';

import { BirthdayHeader } from '@/app/components/BirthdayHeader';
import { BirthdayCake } from '@/app/components/BirthdayCake';
import WishForm from '@/app/components/WishForm';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import BirthdaySlideshow from '@/app/components/BirthdaySlideshow';
import { Letter } from '@/app/components/Letter';
import { SuccessMessage } from '@/app/components/SuccessMessage';
import { AnimatePresence } from 'framer-motion';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showWishForm, setShowWishForm] = useState(false);
  const [showSlideshow, setShowSlideshow] = useState(true);
  const [showHeader, setShowHeader] = useState(false);
  const [showCake, setShowCake] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '10px';
        particle.style.height = '10px';
        particle.style.background = 'rgba(255, 255, 255, 0.5)';
        particle.style.borderRadius = '50%';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        containerRef.current.appendChild(particle);

        gsap.to(particle, {
          y: 'random(-100, 100)',
          x: 'random(-100, 100)',
          opacity: 'random(0.2, 0.8)',
          duration: 'random(3, 6)',
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }
    }

    return () => {
      if (containerRef.current) {
        while (containerRef.current.firstChild) {
          containerRef.current.removeChild(containerRef.current.firstChild);
        }
      }
    };
  }, []);

  const handleSlideshowComplete = () => {
    setShowSlideshow(false);
    setShowHeader(true);
    setShowCake(true);
  };

  const handleCakeComplete = () => {
    setShowCake(false);
    setShowLetter(true);
  };

  const handleLetterComplete = () => {
    setShowLetter(false);
    setShowWishForm(true);
  };

  const handleWishSubmit = (wish: string) => {
    console.log('Wish submitted:', wish);
    setShowSuccess(true);
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/cat-pattern.svg')] bg-repeat opacity-10" />

      {/* Header và Slideshow */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {showHeader && <BirthdayHeader />}
      </div>

      {/* Components chính giữa màn hình */}
      <div className="relative z-10">
        {showSlideshow && (
          <BirthdaySlideshow onComplete={handleSlideshowComplete} />
        )}

        {showCake && !showLetter && !showWishForm && (
          <BirthdayCake onComplete={handleCakeComplete} />
        )}

        {showLetter && (
          <Letter onComplete={handleLetterComplete} />
        )}

        {showWishForm && (
          <div className="max-w-md mx-auto px-4">
            <WishForm onSubmit={handleWishSubmit} />
          </div>
        )}
      </div>

      <AnimatePresence>
        {showSuccess && (
          <SuccessMessage onComplete={handleSuccessClose} />
        )}
      </AnimatePresence>
    </div>
  );
}
