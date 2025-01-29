"use client"
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const EditorsPics = () => {
  // Animation variants for images
  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
  };

  // Animation variants for the white overlay text boxes
  const overlayVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.5, ease: "easeOut" } },
  };

  return (
    <div className="flex flex-col items-center justify-center text-center mt-16 mb-7 bg-[#FAFAFA] pt-3 wrapper">
      {/* Heading */}
      <div>
        <h2 className="text-[#252B42] font-bold text-[24px] mb-2">
          EDITOR&apos;S PICK
        </h2>
        <p className="text-[#737373] text-[14px]">
          Problems trying to resolve the conflict between
        </p>
      </div>

      {/* Desktop Layout */}
      <div className="hidden sm:flex justify-center items-start gap-6 mt-6">
        {/* Men Image with Fixed Size White Div */}
        <motion.div
          className="relative"
          variants={imageVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Image src={"/men.png"} alt="men" width={509} height={500} />
          <motion.div
            className="absolute bottom-4 left-4 w-[170px] h-[48px] bg-white flex items-center justify-center"
            variants={overlayVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="text-[#252B42] font-bold text-lg">MEN</span>
          </motion.div>
        </motion.div>

        {/* Women Image with Fixed Size White Div */}
        <motion.div
          className="relative"
          variants={imageVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Image src={"/women.png"} alt="women" width={240} height={500} />
          <motion.div
            className="absolute bottom-4 left-4 w-[170px] h-[48px] bg-white flex items-center justify-center"
            variants={overlayVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="text-[#252B42] font-bold text-lg">WOMEN</span>
          </motion.div>
        </motion.div>

        {/* Accessories and Kids Image with Fixed Size White Divs */}
        <div className="flex flex-col gap-6">
          {/* Accessories Image with Fixed Size White Div */}
          <motion.div
            className="relative"
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Image src={"/accessories.png"} alt="accessories" width={240} height={242} />
            <motion.div
              className="absolute bottom-4 left-4 w-[170px] h-[48px] bg-white flex items-center justify-center"
              variants={overlayVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <span className="text-[#252B42] font-bold text-lg">ACCESSORIES</span>
            </motion.div>
          </motion.div>

          {/* Kids Image with Fixed Size White Div */}
          <motion.div
            className="relative"
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Image src={"/kids.png"} alt="kids" width={240} height={242} />
            <motion.div
              className="absolute bottom-4 left-4 w-[170px] h-[48px] bg-white flex items-center justify-center"
              variants={overlayVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <span className="text-[#252B42] font-bold text-lg">KIDS</span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="sm:hidden flex flex-col items-center justify-center gap-6 mt-6">
        {/* Men Image with Fixed Size White Div */}
        <motion.div
          className="relative w-[90%] sm:w-full"
          variants={imageVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Image src={"/men.png"} alt="men" width={509} height={500} />
          <motion.div
            className="absolute bottom-4 left-4 w-[170px] h-[48px] bg-white flex items-center justify-center"
            variants={overlayVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="text-[#252B42] font-bold text-lg">MEN</span>
          </motion.div>
        </motion.div>

        {/* Women Image with Fixed Size White Div */}
        <motion.div
          className="relative w-[90%] sm:w-full ml-24"
          variants={imageVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Image src={"/women.png"} alt="women" width={240} height={500} />
          <motion.div
            className="absolute bottom-4 left-4 w-[170px] h-[48px] bg-white flex items-center justify-center"
            variants={overlayVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="text-[#252B42] font-bold text-lg">WOMEN</span>
          </motion.div>
        </motion.div>

        {/* Accessories and Kids Image with Fixed Size White Divs */}
        <div className="flex flex-col gap-6 w-[90%] sm:w-full">
          {/* Accessories Image with Fixed Size White Div */}
          <motion.div
            className="relative ml-12"
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Image src={"/accessories.png"} alt="accessories" width={240} height={242} />
            <motion.div
              className="absolute bottom-4 left-4 w-[170px] h-[48px] bg-white flex items-center justify-center"
              variants={overlayVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <span className="text-[#252B42] font-bold text-lg">ACCESSORIES</span>
            </motion.div>
          </motion.div>

          {/* Kids Image with Fixed Size White Div */}
          <motion.div
            className="relative ml-12"
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Image src={"/kids.png"} alt="kids" width={240} height={242} />
            <motion.div
              className="absolute bottom-4 left-4 w-[170px] h-[48px] bg-white flex items-center justify-center"
              variants={overlayVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <span className="text-[#252B42] font-bold text-lg">KIDS</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default EditorsPics;