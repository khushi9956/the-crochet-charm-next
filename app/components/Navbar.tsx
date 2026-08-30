"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaRegHeart,
  FaHeart,
  FaShoppingBag,
  FaUser,
  FaSearch,
  FaBars,
  FaTimes,
  FaBoxOpen,
} from "react-icons/fa";
import { useUser, useClerk } from "@clerk/nextjs";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
const { signOut } = useClerk();
const { user, isSignedIn, isLoaded } = useUser();
const [accountOpen, setAccountOpen] = useState(false);
const [nameModalOpen, setNameModalOpen] = useState(false);
const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
const [savingName, setSavingName] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<any[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  // Listen for loader completion to reveal header
  useEffect(() => {
    const handleLoaderComplete = () => setHeaderVisible(true);
    window.addEventListener("loaderComplete", handleLoaderComplete);
    return () => window.removeEventListener("loaderComplete", handleLoaderComplete);
  }, []);

  // Measure header height for spacer
  useEffect(() => {
    if (headerRef.current) {
      const measure = () => setHeaderHeight(headerRef.current!.offsetHeight);
      measure();
      window.addEventListener("resize", measure);
      return () => window.removeEventListener("resize", measure);
    }
  }, [headerVisible]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(() => {});
  }, []);

  const filteredProducts = products.filter((product: any) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );
useEffect(() => {
  if (user && !user.firstName) {
    setNameModalOpen(true);
  }
}, [user]);
const saveName = async () => {
  if (!firstName.trim()) {
    alert("Please enter your name.");
    return;
  }

  try {
    setSavingName(true);

    await user?.update({
      firstName: firstName.trim(),
      lastName: lastName.trim() || undefined,
    });

    await user?.reload();

    setNameModalOpen(false);
  } catch (error) {
    console.error(error);
    alert("Unable to save your name. Please try again.");
  } finally {
    setSavingName(false);
  }
};
  useEffect(() => {
    const updateCounts = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
      setCartCount(cart.length);
      setWishlistCount(wishlist.length);
    };

    updateCounts();
    window.addEventListener("cartUpdated", updateCounts);
    window.addEventListener("wishlistUpdated", updateCounts);

    return () => {
      window.removeEventListener("cartUpdated", updateCounts);
      window.removeEventListener("wishlistUpdated", updateCounts);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const getNavLink = (anchor: string) => {
    return isHome ? anchor : `/${anchor}`;
  };

const marqueeText = "🎀 RAKHI SPECIAL SALE ✦ HANDCRAFTED WITH LOVE ✦ FREE SHIPPING ON ORDERS ABOVE ₹1500 ✦ CUSTOM ORDERS WELCOME ✦ ";
  return (
    <>
      {/* Fixed Header — announcement + navbar */}
      <div
        ref={headerRef}
        className={`site-header ${headerVisible ? "header-visible" : "header-hidden"}`}
      >
        {/* Announcement Marquee — solid burgundy, never glass */}
        <div className="announcement-bar" role="marquee" aria-label="Promotional announcements">
          <div className="marquee-container">
            <div className="marquee-track">
              <span className="marquee-item">{marqueeText}</span>
              <span className="marquee-item" aria-hidden="true">{marqueeText}</span>
              <span className="marquee-item" aria-hidden="true">{marqueeText}</span>
            </div>
          </div>
        </div>

        {/* Main Navbar — transitions to glass on scroll */}
        <header
          className={`navbar-header ${scrolled ? "navbar-glass" : "navbar-solid"}`}
        >
          <nav className="max-w-7xl mx-auto px-4 lg:px-6">
            <div className="flex items-center justify-between h-[68px] lg:h-[76px]">

              {/* Logo */}
              <Link href="/" className="flex-shrink-0">
                <img
                  src="/images/logo.png"
                  alt="The Crochet Charm"
                  className="h-11 lg:h-[58px] w-auto"
                />
              </Link>

              {/* Desktop Navigation Links */}
              <div className="hidden lg:flex items-center gap-7 xl:gap-8">
                <Link href="/" className="nav-link text-[13px] font-semibold tracking-[0.08em] uppercase text-[#7B1E3A]/70">
                  Home
                </Link>
                <Link href={getNavLink("#products")} className="nav-link text-[13px] font-semibold tracking-[0.08em] uppercase text-[#7B1E3A]/70">
                  Products
                </Link>
                <Link href={getNavLink("#about")} className="nav-link text-[13px] font-semibold tracking-[0.08em] uppercase text-[#7B1E3A]/70">
                  About
                </Link>
                <Link href={getNavLink("#contact")} className="nav-link text-[13px] font-semibold tracking-[0.08em] uppercase text-[#7B1E3A]/70">
                  Contact
                </Link>
              </div>

              {/* Desktop Actions */}
              <div className="hidden lg:flex items-center gap-4 xl:gap-5">
                {/* Search */}
                <div ref={searchRef} className="relative">
                  <div className="flex items-center border border-[#E8D5D0] rounded-lg bg-[#FFFCFA] focus-within:border-[#C94B6A]/50 focus-within:ring-1 focus-within:ring-[#C94B6A]/20 transition-all duration-200">
                    <input
                      type="text"
                      placeholder="Search handmade products..."
                      value={search}
                      onChange={(e) => {
                        setSearch(e.target.value);
                        setSearchOpen(true);
                      }}
                      onFocus={() => setSearchOpen(true)}
                      className="w-48 xl:w-60 px-3 py-[7px] text-[13px] bg-transparent focus:outline-none text-[#2F2A2A] placeholder:text-[#aaa]"
                    />
                    <button className="px-2.5 py-[7px] text-[#7B1E3A]/40 hover:text-[#C94B6A] transition-colors" aria-label="Search">
                      <FaSearch size={13} />
                    </button>
                  </div>

                  {searchOpen && search && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-[0_8px_30px_rgba(123,30,58,0.08)] border border-[#F0E0D8] max-h-80 overflow-y-auto z-50">
                      {filteredProducts.length === 0 ? (
                        <p className="p-4 text-[13px] text-gray-400 text-center">No products found</p>
                      ) : (
                        filteredProducts.slice(0, 8).map((product: any) => (
                          <Link
                            key={product.id}
                            href={`/products/${product.id}`}
                            className="flex items-center gap-3 p-3 hover:bg-[#FFF5F7] transition-colors border-b border-[#F5EEF0] last:border-b-0"
                            onClick={() => { setSearch(""); setSearchOpen(false); }}
                          >
                            <img src={product.image} alt={product.name} className="w-10 h-10 rounded-md object-cover" />openc
                            <div>
                              <p className="text-[13px] font-medium text-[#2F2A2A]">{product.name}</p>
                              <p className="text-[12px] text-[#C94B6A] font-semibold">&#8377;{product.price}</p>
                            </div>
                          </Link>
                        ))
                      )}
                    </div>
                  )}
                </div>

                {/* Wishlist */}
                <Link
                  href="/wishlist"
                  className="relative group flex items-center gap-1.5 text-[#7B1E3A]/55 hover:text-[#C94B6A] transition-colors duration-200"
                  aria-label={`Wishlist, ${wishlistCount} items`}
                >
                  <FaRegHeart size={17} className="group-hover:hidden" />
                  <FaHeart size={17} className="hidden group-hover:block" />
                  <span className="text-[14px] font-bold">Wishlist</span>
                  {wishlistCount > 0 && (
                    <span className="absolute -top-2 -right-2.5 bg-[#C94B6A] text-white text-[9px] font-bold w-[17px] h-[17px] rounded-full flex items-center justify-center leading-none">
                      {wishlistCount}
                    </span>
                  )}
                </Link>

                {/* Cart */}
                <Link
                  href="/cart"
                  className="relative group flex items-center gap-1.5 text-[#7B1E3A]/55 hover:text-[#C94B6A] transition-colors duration-200"
                  aria-label={`Cart, ${cartCount} items`}
                >
                  <FaShoppingBag size={16} />
                  <span className="text-[14px] font-bold">Cart</span>
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2.5 bg-[#C94B6A] text-white text-[9px] font-bold w-[17px] h-[17px] rounded-full flex items-center justify-center leading-none">
                      {cartCount}
                    </span>
                  )}
                </Link>

                {/* My Orders */}
                <Link
                  href="/my-orders"
                  className="flex items-center gap-1.5 text-[#7B1E3A]/45 hover:text-[#C94B6A] transition-colors duration-200"
                  aria-label="My Orders"
                >
                  <FaBoxOpen size={15} />
                  <span className="text-[12px] font-bold tracking-wide uppercase">Orders</span>
                </Link>

                {/* Account / Auth */}
                {!isLoaded ? (
                  <div className="w-9 h-9 rounded-full bg-[#F7E9EC] animate-pulse" />
                ) : isSignedIn ? (
                  <div className="relative">
                    <button
                      onClick={() => setAccountOpen(!accountOpen)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#FFF5F7] transition-colors"
                      aria-expanded={accountOpen}
                    >
                        <div className="w-9 h-9 rounded-full p-[2px] bg-gradient-to-br from-[#C94B6A] to-[#7B1E3A]">
                          <div className="w-full h-full rounded-full overflow-hidden bg-[#F7E9EC] flex items-center justify-center text-[#7B1E3A] font-bold">
                            {user?.imageUrl ? (
                              <img src={user.imageUrl} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                              user?.firstName?.charAt(0)?.toUpperCase() || "U"
                            )}
                          </div>
                        </div>
                      <div className="hidden xl:block text-left">
                        <p className="text-[11px] text-[#7B1E3A]/50 leading-none">Hello,</p>
                        <p className="text-[13px] font-bold text-[#7B1E3A]">{user?.firstName || "User"}</p>
                      </div>
                      <span className="text-[#7B1E3A]/50 text-xs">▾</span>
                    </button>
                    {accountOpen && (
                      <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-[0_8px_30px_rgba(123,30,58,0.15)] border border-[#F0E0D8] overflow-hidden z-[70]">
                        <div className="px-4 py-4 bg-[#FFF5F7] border-b border-[#F0E0D8]">
                          <p className="text-sm font-bold text-[#7B1E3A]">Hi, {user?.firstName || "User"}!</p>
                          <p className="text-xs text-[#7B1E3A]/50 mt-1 truncate">{user?.primaryEmailAddress?.emailAddress}</p>
                        </div>
                        <Link href="/profile" onClick={() => setAccountOpen(false)} className="block px-4 py-3 text-sm text-[#2F2A2A] hover:bg-[#FFF5F7] hover:text-[#C94B6A]">My Profile</Link>
                        <div className="border-t border-[#F0E0D8]" />
                        <button onClick={() => signOut({ redirectUrl: "/" })} className="w-full text-left px-4 py-3 text-sm font-semibold text-red-500 hover:bg-red-50">Sign Out</button>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link href="/login" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#FFF5F7] transition-colors" aria-label="Login">
                    <div className="w-9 h-9 rounded-full bg-[#F7E9EC] flex items-center justify-center text-[#7B1E3A]">
                      <FaUser size={16} />
                    </div>
                  </Link>
                )}
              </div>
              

              {/* Mobile Actions */}
              <div className="flex lg:hidden items-center gap-1">
                <button
                  onClick={() => setSearchOpen(!searchOpen)}
                  className="p-2.5 text-[#7B1E3A]/60 hover:text-[#C94B6A] transition-colors"
                  aria-label="Search"
                >
                  {searchOpen ? <FaTimes size={17} /> : <FaSearch size={17} />}
                </button>

                <Link
                  href="/wishlist"
                  className="relative p-2.5 text-[#7B1E3A]/60 hover:text-[#C94B6A] transition-colors"
                  aria-label={`Wishlist, ${wishlistCount} items`}
                >
                  <FaRegHeart size={17} />
                  {wishlistCount > 0 && (
                    <span className="absolute top-[5px] right-[3px] bg-[#C94B6A] text-white text-[8px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center leading-none">
                      {wishlistCount}
                    </span>
                  )}
                </Link>

                <Link
                  href="/cart"
                  className="relative p-2.5 text-[#7B1E3A]/60 hover:text-[#C94B6A] transition-colors"
                  aria-label={`Cart, ${cartCount} items`}
                >
                  <FaShoppingBag size={16} />
                  {cartCount > 0 && (
                    <span className="absolute top-[5px] right-[3px] bg-[#C94B6A] text-white text-[8px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center leading-none">
                      {cartCount}
                    </span>
                  )}
                </Link>

                <Link
                  href="/my-orders"
                  className="p-2.5 text-[#7B1E3A]/60 hover:text-[#C94B6A] transition-colors"
                  aria-label="My Orders"
                >
                  <FaBoxOpen size={16} />
                </Link>

                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="p-2.5 text-[#7B1E3A]/60 hover:text-[#C94B6A] transition-colors"
                  aria-label={menuOpen ? "Close menu" : "Open menu"}
                  aria-expanded={menuOpen}
                >
                  {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                </button>
              </div>
            </div>

            {/* Mobile Search Bar */}
            {searchOpen && (
              <div className="lg:hidden pb-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search handmade products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    autoFocus
                    className="w-full px-4 py-2.5 text-[13px] border border-[#E8D5D0] rounded-lg bg-[#FFFCFA] focus:outline-none focus:border-[#C94B6A]/50 focus:ring-1 focus:ring-[#C94B6A]/20 text-[#2F2A2A] placeholder:text-[#aaa]"
                  />
                  {search && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-[0_8px_30px_rgba(123,30,58,0.08)] border border-[#F0E0D8] max-h-60 overflow-y-auto z-50">
                      {filteredProducts.length === 0 ? (
                        <p className="p-4 text-[13px] text-gray-400 text-center">No products found</p>
                      ) : (
                        filteredProducts.slice(0, 6).map((product: any) => (
                          <Link
                            key={product.id}
                            href={`/products/${product.id}`}
                            className="flex items-center gap-3 p-3 hover:bg-[#FFF5F7] transition-colors border-b border-[#F5EEF0] last:border-b-0"
                            onClick={() => { setSearch(""); setSearchOpen(false); }}
                          >
                            <img src={product.image} alt={product.name} className="w-9 h-9 rounded-md object-cover" />
                            <div>
                              <p className="text-[13px] font-medium text-[#2F2A2A]">{product.name}</p>
                              <p className="text-[12px] text-[#C94B6A] font-semibold">&#8377;{product.price}</p>
                            </div>
                          </Link>
                        ))
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </nav>
        </header>
      </div>

      {/* Spacer to prevent content from hiding behind fixed header */}
      <div className="header-spacer" style={{ height: headerHeight }} aria-hidden="true" />

      {/* Mobile Slide-out Menu — outside header so it overlays properly */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden" role="dialog" aria-modal="true" aria-label="Navigation menu">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]" onClick={() => setMenuOpen(false)} />
          <div className="absolute top-0 right-0 h-full w-[280px] bg-white shadow-[-4px_0_30px_rgba(0,0,0,0.1)] animate-slideIn flex flex-col">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#F0E0D8]">
              <span className="text-[13px] font-semibold tracking-[0.06em] uppercase text-[#7B1E3A]/60">Menu</span>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 text-[#7B1E3A]/50 hover:text-[#C94B6A] transition-colors rounded-lg hover:bg-[#FFF5F7]"
                aria-label="Close menu"
              >
                <FaTimes size={18} />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto py-3 px-3">
              <div className="space-y-0.5">
                <Link
                  href="/"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-3 text-[14px] font-medium text-[#2F2A2A] hover:bg-[#FFF5F7] hover:text-[#C94B6A] rounded-lg transition-colors"
                >
                  Home
                </Link>
                <Link
                  href={getNavLink("#products")}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-3 text-[14px] font-medium text-[#2F2A2A] hover:bg-[#FFF5F7] hover:text-[#C94B6A] rounded-lg transition-colors"
                >
                  Products
                </Link>
                <Link
                  href={getNavLink("#about")}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-3 text-[14px] font-medium text-[#2F2A2A] hover:bg-[#FFF5F7] hover:text-[#C94B6A] rounded-lg transition-colors"
                >
                  About
                </Link>
                <Link
                  href={getNavLink("#contact")}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-3 text-[14px] font-medium text-[#2F2A2A] hover:bg-[#FFF5F7] hover:text-[#C94B6A] rounded-lg transition-colors"
                >
                  Contact
                </Link>
              </div>

              <div className="border-t border-[#F0E0D8] my-3" />

              <div className="space-y-0.5">
                <Link
                  href="/wishlist"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-3 text-[14px] font-medium text-[#2F2A2A] hover:bg-[#FFF5F7] hover:text-[#C94B6A] rounded-lg transition-colors"
                >
                  <FaRegHeart size={15} className="text-[#C94B6A]/50" />
                  Wishlist
                  {wishlistCount > 0 && (
                    <span className="ml-auto bg-[#C94B6A] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                </Link>
                <Link
                  href="/cart"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-3 text-[14px] font-medium text-[#2F2A2A] hover:bg-[#FFF5F7] hover:text-[#C94B6A] rounded-lg transition-colors"
                >
                  <FaShoppingBag size={15} className="text-[#C94B6A]/50" />
                  Cart
                  {cartCount > 0 && (
                    <span className="ml-auto bg-[#C94B6A] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>
                <Link
                  href="/my-orders"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-3 text-[14px] font-medium text-[#2F2A2A] hover:bg-[#FFF5F7] hover:text-[#C94B6A] rounded-lg transition-colors"
                >
                  <FaBoxOpen size={15} className="text-[#C94B6A]/50" />
                  My Orders
                </Link>
              </div>
            </nav>

            <div className="px-5 py-4 border-t border-[#F0E0D8]">
              {isLoaded && (
                isSignedIn ? (
                  <div className="space-y-0.5">
                    <Link href="/profile" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 px-3 py-3 text-[14px] font-medium text-[#2F2A2A] hover:bg-[#FFF5F7] hover:text-[#C94B6A] rounded-lg transition-colors">
                      <FaUser size={15} className="text-[#C94B6A]/50" />
                      My Profile
                    </Link>
                    <button onClick={() => { signOut({ redirectUrl: "/" }); setMenuOpen(false); }} className="flex items-center gap-3 px-3 py-3 text-[14px] font-medium text-red-500 hover:bg-red-50 rounded-lg transition-colors w-full text-left">
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <Link href="/login" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 px-3 py-3 text-[14px] font-medium text-[#2F2A2A] hover:bg-[#FFF5F7] hover:text-[#C94B6A] rounded-lg transition-colors">
                    <FaUser size={15} className="text-[#C94B6A]/50" />
                    Login / Sign Up
                  </Link>
                )
              )}
              <p className="text-[11px] text-[#7B1E3A]/30 text-center tracking-wide mt-3">
                Handmade with love
              </p>
            </div>
            {nameModalOpen && user && (
  <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">

    <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">

      <div className="text-center">

        <div className="mx-auto w-20 h-20 rounded-full bg-[#FFF0F4] flex items-center justify-center text-4xl mb-5">
          💖
        </div>

        <h2 className="text-2xl font-bold text-[#7B1E3A]">
          Welcome to The Crochet Charm!
        </h2>

        <p className="text-sm text-gray-500 mt-2">
          Before we continue, tell us your name.
        </p>

      </div>

      <div className="mt-7 space-y-5">

        <div>
          <label className="block text-sm font-semibold text-[#4A3024] mb-2">
            First Name
          </label>

          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter your first name"
            className="w-full px-4 py-3 rounded-xl border border-pink-200 bg-pink-50/30 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#4A3024] mb-2">
            Last Name
            <span className="text-gray-400 font-normal">
              {" "} (optional)
            </span>
          </label>

          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter your last name"
            className="w-full px-4 py-3 rounded-xl border border-pink-200 bg-pink-50/30 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        <button
          onClick={saveName}
          disabled={savingName}
          className="w-full py-3.5 rounded-xl bg-pink-600 hover:bg-pink-700 disabled:opacity-60 text-white font-bold transition"
        >
          {savingName ? "Saving..." : "Continue 💖"}
        </button>

      </div>

    </div>

  </div>
)}
          </div>
        </div>
      )}
    </>
  );
}
