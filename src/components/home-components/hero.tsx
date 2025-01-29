"use client"
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

const Hero = () => {
  // Animation variants for text content
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  // Animation variants for the button
  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, delay: 0.5, ease: "easeOut" } },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
  };

  return (
    <div className="relative bg-[url('/hero.png')] bg-cover bg-center sm:bg-[top_center] lg:bg-center h-[400px] sm:h-[600px] lg:h-[716px] wrapper">
      {/* Overlay */}
      <div className="absolute inset-0"></div>

      {/* Text Content */}
      <div className="absolute top-40 lg:left-24 left-1/2 transform -translate-x-1/2 -translate-y-1/2 lg:transform-none lg:text-left text-center text-white px-4">
        {/* Subheading */}
        <motion.h2
          className="text-[14px] sm:text-[16px] md:text-[18px] font-semibold tracking-wide mb-2 sm:mb-4 mr-10"
          variants={textVariants}
          initial="hidden"
          animate="visible"
        >
          SUMMER 2020
        </motion.h2>

        {/* Main Heading */}
        <motion.h1
          className="text-[28px] sm:text-[36px] md:text-[48px] lg:text-[58px] font-bold mb-4 sm:mb-6 leading-tight mr-10"
          variants={textVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
        >
          NEW COLLECTION
        </motion.h1>

        {/* Paragraph 1 */}
        <motion.p
          className="text-[14px] sm:text-[16px] md:text-[20px] leading-relaxed mb-4 sm:mb-8 mr-10"
          variants={textVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
        >
          We know how large objects will act
        </motion.p>

        {/* Paragraph 2 */}
        <motion.p
          className="text-[14px] sm:text-[16px] md:text-[20px] leading-relaxed mb-4 sm:mb-8 -mt-3 md:-mt-9 mr-10"
          variants={textVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.6 }}
        >
          but things on a small scale.
        </motion.p>

        {/* Button */}
        <motion.div
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          whileTap="tap"
        >
          <Link href={"/products"}>
            <button className="px-4 py-2 sm:px-6 sm:py-3 bg-[#2DC071] text-white font-bold rounded hover:bg-green-700 transition-all mr-10">
              SHOP NOW
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;