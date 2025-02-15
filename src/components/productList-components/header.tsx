"use client";
import Link from "next/link";
import { useState } from "react";
import {
  FiPhone,
  FiMail,
  FiInstagram,
  FiYoutube,
  FiFacebook,
  FiTwitter,
  FiShoppingCart,
  FiHeart,
  FiX,
} from "react-icons/fi";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { useCart } from "@/components/cart-components/CartContext";
import { RiArrowDownSLine } from "react-icons/ri";
import { IoIosCart, IoIosSearch } from "react-icons/io";
import { IoHeart } from "react-icons/io5";

interface Product {
  _id: string;
  name: string;
  image: string;
  price: number;
  slug: {
    current: string;
  };
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const { cartItems, wishlist } = useCart();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Calculate total quantity of items in cart
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalWishlistItems = wishlist.length;

  // Handle search
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    // Redirect to the search results page
    window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
  };

  return (
    <div className="overflow-x-hidden">
      {/* Header Section */}
      <div className="bg-[#23856D] py-4 hidden lg:block">
        <div className="container mx-auto flex justify-between items-center text-white text-sm">
          {/* Contact Information */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <FiPhone className="hover:text-black" />
              <p className="hover:text-black">(+92) 3133856076</p>
            </div>
            <div className="flex items-center gap-1">
              <FiMail className="hover:text-black"/>
              <p className="hover:text-black">salman854raza@gmail.com</p>
            </div>
          </div>

          {/* Promotion */}
          <p className="hidden md:block hover:text-black">
            Follow Us and get a chance to win 80% off
          </p>

          {/* Social Media Links */}
          <div className="flex items-center gap-4">
            <p className="hidden md:block hover:text-pink-300">Follow Us:</p>
            <Link
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiInstagram className="hover:text-pink-600"/>
            </Link>
            <Link
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiYoutube className="hover:text-red-600"/>
            </Link>
            <Link
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiFacebook className="hover:text-blue-600"/>
            </Link>
            <Link
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiTwitter className="hover:text-blue-300"/>
            </Link>
          </div>
        </div>
      </div>

      {/* Navbar Section */}
      <div className="bg-white shadow-md border-b-2 border-[#E5E5E5] relative z-40">
        <div className="container mx-auto flex items-center justify-between py-4">
          {/* Logo */}
          <Link href={"/"}>
            <div className="text-2xl font-bold text-[#252B42] hover:text-green-500 ml-2">
              Bandage
            </div>
          </Link>

          {/* Action Icons (Mobile and Desktop) */}
          <div className="flex items-center gap-2 md:hidden">
            {/* Search Bar for Mobile */}
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search pro..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-32 px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#23A6F0]"
              />
              <button type="submit" className="absolute right-2 top-1.5">
              <IoIosSearch  className="text-lg cursor-pointer text-gray-600 hover:text-green-600" />
              </button>
            </form>

            {/* Display Search Results for Mobile */}
            {searchResults.length > 0 && (
              <div className="absolute top-full left-0 w-full bg-white border border-gray-200 shadow-lg mt-2 rounded-md z-50">
                <ul className="py-2">
                  {searchResults.map((product) => (
                    <li
                      key={product._id}
                      className="px-4 py-2 hover:bg-gray-100"
                    >
                      <Link
                        href={`/products/${product.slug.current}`}
                        className="flex items-center gap-4"
                      >
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={200}
                          height={200}
                          className="w-10 h-10 object-cover rounded"
                        />
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-gray-600">
                            ${product.price}
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Link href={"/cart"}>
              <div className="relative">
                <FiShoppingCart className="text-2xl text-[#737373] cursor-pointer hover:text-blue-600" />
                {totalItems > 0 && (
                  <span className="absolute -top-3 -right-3 bg-[#23A6F0] text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </div>
            </Link>
            <Link href={"/wishlist"}>
              <div className="relative">
                <FiHeart className="text-2xl text-[#737373] cursor-pointer hover:text-blue-600" />
                {totalWishlistItems > 0 && (
                  <span className="absolute -top-3 -right-3 bg-[#23A6F0] text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                    {totalWishlistItems}
                  </span>
                )}
              </div>
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <FiX className="text-3xl text-[#252B42]" />
              ) : (
                <Image
                  src={"/menu-icon.png"}
                  alt="icon"
                  width={23}
                  height={14}
                  className="mr-3"
                />
              )}
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex">
            <ul className="flex gap-8 text-sm font-medium text-[#737373] relative">
              <li>
                <Link href="/" className="hover:text-[#23A6F0] transition-all">
                  Home
                </Link>
              </li>
              {/* Shop Dropdown */}
            <li className="relative z-50 flex justify-center item-center">
              <button
                className="flex items-center gap-1 hover:text-green-500 transition-all"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                Shop
                <RiArrowDownSLine className="ml-1 text-xl hover:text-green-500" />
              </button>

              {dropdownOpen && (
                <div className="absolute top-full left-0 bg-white shadow-lg rounded-md py-2 w-40 border border-gray-200 z-1000">
                  <Link
                    href="/mens-clothing"
                    className="block px-4 py-2 text-black hover:bg-green-600 hover:text-white transition-all"
                  >
                      Men&apos;s Clothing
                  </Link>
                  <Link
                    href="/womens-clothing"
                    className="block px-4 py-2 text-black hover:bg-green-600 hover:text-white transition-all"
                  >
                    Women&apos;s Clothing
                  </Link>
                  <Link
                    href="/accessories"
                    className="block px-4 py-2 text-black hover:bg-green-600 hover:text-white transition-all"
                  >
                    Accessories
                  </Link>
                  <Link
                    href="/shoes"
                    className="block px-4 py-2 text-black hover:bg-green-600  hover:text-green-500 transition-all"
                  >
                    Shoes
                  </Link>
                </div>
              )}
            </li>
              <li>
                <Link
                  href="/products"
                  className="hover:text-[#23A6F0] transition-all"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-[#23A6F0] transition-all"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-[#23A6F0] transition-all"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-[#23A6F0] transition-all"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/team"
                  className="hover:text-[#23A6F0] transition-all"
                >
                  Team
                </Link>
              </li>
            </ul>
          </nav>

          {/* Action Icons for Desktop */}
          <div className="hidden md:flex items-center gap-6 text-[#23A6F0]">
            {/* Authentication Section */}
            <SignedOut>
              <SignInButton mode="modal">
                <button className="text-sm font-medium flex items-center gap-2">
                  Login/Register
                </button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <UserButton showName />
            </SignedIn>

            {/* Search Bar for Desktop */}
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#23A6F0]"
              />
              <button type="submit" className="absolute right-2 top-2">
              <IoIosSearch className="text-lg cursor-pointer mt-1" />
              </button>
            </form>

            {/* Display Search Results for Desktop */}
            {searchResults.length > 0 && (
              <div className="absolute top-full left-0 w-full bg-white border border-gray-200 shadow-lg mt-2 rounded-md z-50">
                <ul className="py-2">
                  {searchResults.map((product) => (
                    <li
                      key={product._id}
                      className="px-4 py-2 hover:bg-gray-100"
                    >
                      <Link
                        href={`/products/${product.slug.current}`}
                        className="flex items-center gap-4"
                      >
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={200}
                          height={300}
                          className="w-10 h-10 object-cover rounded"
                        />
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-gray-600">
                            ${product.price}
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Link href={"/cart"}>
              <div className="relative">
              <IoIosCart className="text-lg cursor-pointer" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-3 bg-[#737373] text-white text-xs font-semibold rounded-full w-4 h-4 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </div>
            </Link>
            <Link href={"/wishlist"}>
              <div className="relative">
              <IoHeart  className="text-lg cursor-pointer" />
                {totalWishlistItems > 0 && (
                  <span className="absolute -top-2 -right-3 bg-[#737373] text-white text-xs font-semibold rounded-full w-4 h-4 flex items-center justify-center">
                    {totalWishlistItems}
                  </span>
                )}
              </div>
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:hidden bg-white shadow-md transition-all duration-300 ease-in-out`}
        >
          <ul className="flex flex-col gap-6 p-4 text-[20px] text-[#737373] text-center">
            <li>
              <Link href="/" className="hover:text-[#23A6F0] transition-all">
                Home
              </Link>
            </li>
             {/* Shop Dropdown */}
             <li className="relative z-50">
              <button
                className="flex items-center gap-1 hover:text-green-500 transition-all"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <Link href="/productList" className="hover:text-green-500 transition-all">
                Shop
                </Link>
                <RiArrowDownSLine className="ml-1 text-xl hover:text-green-500" />
              </button>

              {dropdownOpen && (
                <div className="absolute top-full left-0 bg-white shadow-lg rounded-md py-2 w-40 border border-gray-200 z-1000">
                  <Link
                    href="/mens-clothing"
                    className="block px-4 py-2 text-black hover:bg-green-600 hover:text-white transition-all"
                  >
                    Men&apos;s Clothing
                  </Link>
                  <Link
                    href="/womens-clothing"
                    className="block px-4 py-2 text-black hover:bg-green-600 hover:text-white transition-all"
                  >
                     Women&apos;s Clothing
                  </Link>
                  <Link
                    href="/accessories"
                    className="block px-4 py-2 text-black hover:bg-green-600 hover:text-white transition-all"
                  >
                    Accessories
                  </Link>
                  <Link
                    href="/shoes"
                    className="block px-4 py-2 text-black hover:bg-green-600  hover:text-green-500 transition-all"
                  >
                    Shoes
                  </Link>
                </div>
              )}
            </li>
            <li>
              <Link
                href="/products"
                className="hover:text-[#23A6F0] transition-all"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:text-[#23A6F0] transition-all"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className="hover:text-[#23A6F0] transition-all"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-[#23A6F0] transition-all"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/team"
                className="hover:text-[#23A6F0] transition-all"
              >
                Team
              </Link>
            </li>
          </ul>
          {/* Action Icons */}
          <div className="flex flex-col gap-4 items-center py-4">
            {/* Authentication */}
            <SignedOut>
              <SignInButton mode="modal">
                <button className="text-sm font-medium flex items-center gap-2 text-[#23A6F0]">
                  Login/Register
                </button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <UserButton showName />
            </SignedIn>

            {/* Other Icons */}
            <div className="flex gap-6 text-[#23A6F0]">
            <IoIosSearch className="text-2xl cursor-pointer" />
              <div className="relative">
              <IoIosCart className="text-2xl cursor-pointer" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </div>
              <div className="relative">
              <IoHeart className="text-2xl cursor-pointer" />
                {totalWishlistItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {totalWishlistItems}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

