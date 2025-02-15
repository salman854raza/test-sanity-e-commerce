"use client";

import Link from "next/link";
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

// Slider animation variants with spring transitions
const sliderVariants = {
  enter: (direction: string) => ({
    x: direction === "right" ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { 
      x: { type: "spring", stiffness: 300, damping: 30 }, 
      opacity: { duration: 0.3 } 
    },
  },
  exit: (direction: string) => ({
    x: direction === "right" ? -1000 : 1000,
    opacity: 0,
    transition: { 
      x: { type: "spring", stiffness: 300, damping: 30 }, 
      opacity: { duration: 0.3 } 
    },
  }),
};

const textVariants = {
  hidden: { opacity: 0, scale: 0.8, y: -50 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 100, damping: 20 } 
  },
};

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { type: "spring", stiffness: 150, damping: 10, delay: 0.3 } 
  },
  hover: { scale: 1.1, transition: { duration: 0.2 } },
  tap: { scale: 0.95 },
};

const Hero = () => {
  const images = [
    "./bg2.png",
    "./shoppingpic.jpg",
    "./shoppinpic2.webp",
    "./shoppingpic3.webp",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState("right");
   
  // Memoize handleNext to prevent unnecessary re-renders
   const handleNext = useCallback(() => {
    setDirection("right");
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }, [images.length]); // Dependency on images.length

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000);
    return () => clearInterval(interval);
  }, [handleNext]); // Now depends on handleNext

  const handlePrev = () => {
    setDirection("left");
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative flex justify-center items-center w-full h-[50vh] sm:h-[60vh] lg:h-[716px] bg-gray-200 overflow-hidden">
      {/* Image Slider */}
      <div className="relative w-full h-full overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={currentImageIndex}
            src={images[currentImageIndex]}
            alt={`Slide ${currentImageIndex + 1}`}
            custom={direction}
            variants={sliderVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className={`absolute object-cover ${
              currentImageIndex === 3
                ? "w-1/10 h-auto mx-auto left-1/4 transform -translate-x-1/2"
                : "w-full h-full"
            }`}
          />
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 text-white rounded-full"
      >
        <FaArrowLeft size={24} />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 text-white rounded-full"
      >
        <FaArrowRight size={24} />
      </button>

      {/* Text Content */}
      <div className="absolute top-40 lg:left-24 left-1/2 transform -translate-x-1/2 -translate-y-1/2 lg:transform-none lg:text-left text-center text-white px-4">
        <motion.h2
          className="text-[14px] sm:text-[16px] md:text-[18px] font-semibold tracking-wide mb-2 sm:mb-4"
          variants={textVariants}
          initial="hidden"
          animate="visible"
        >
          SUMMER 2020
        </motion.h2>
        <motion.h1
          className="text-[28px] sm:text-[36px] md:text-[48px] lg:text-[58px] font-bold mb-4 sm:mb-6 leading-tight"
          variants={textVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
        >
          NEW COLLECTION
        </motion.h1>
        <motion.p
          className="text-[14px] sm:text-[16px] md:text-[20px] leading-relaxed mb-4 sm:mb-8"
          variants={textVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
        >
          We know how large objects will act
        </motion.p>
        <motion.p
          className="text-[14px] sm:text-[16px] md:text-[20px] leading-relaxed mb-4 sm:mb-8"
          variants={textVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.6 }}
        >
          but things on a small scale.
        </motion.p>
        <motion.div
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          whileTap="tap"
        >
          <Link href="/products">
            <button className="px-4 py-2 sm:px-6 sm:py-3 bg-[#2DC071] text-white font-bold rounded hover:bg-green-700 transition-all">
              SHOP NOW
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;

