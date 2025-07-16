"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Croissant, Menu, UserRound, Wallet, UserCircle2, Settings, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface NavbarProps {
    sidebarOpen?: boolean;
    onToggleSidebar?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ sidebarOpen = false, onToggleSidebar }) => {
    const [scrolled, setScrolled] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 20;
            setScrolled(isScrolled);
            setIsVisible(window.scrollY < 50);
        };

        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => {
        setIsDropdownOpen(prev => !prev);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.nav
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${scrolled
                        ? 'bg-white/80 backdrop-blur-xl border-b border-gray-200/50'
                        : 'bg-white/10 backdrop-blur-sm border-b border-white/20'
                        }`}
                >
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="flex items-center justify-between h-12">

                            {/* Left side: Sidebar Button + Logo */}
                            <div className="flex items-center space-x-3">
                                {/* Sidebar Button */}
                                {onToggleSidebar && (
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={onToggleSidebar}
                                        className="p-2 rounded-lg transition-all duration-300 bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200/50"
                                    >
                                        <Menu className="w-4 h-4" />
                                    </motion.button>
                                )}

                                {/* Logo */}
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="cursor-pointer"
                                    onClick={() => router.push('/')}
                                >
                                    <Croissant
                                        size={24}
                                        className="text-amber-600 transition-colors duration-300"
                                    />
                                </motion.div>
                            </div>

                            {/* Right side buttons */}
                            <div className="flex items-center space-x-3">
                                {/* User Avatar with Dropdown */}
                                <div className="relative" ref={dropdownRef}>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={toggleDropdown}
                                        className="p-2 rounded-full transition-all duration-300 flex items-center justify-center bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200/50"
                                    >
                                        <UserRound className="w-4 h-4" />
                                    </motion.button>

                                    <AnimatePresence>
                                        {isDropdownOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                                transition={{ duration: 0.2, ease: "easeOut" }}
                                                className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg py-1 z-50 origin-top-right bg-white border border-gray-200/70"
                                            >
                                                <a
                                                    href="/profile"
                                                    className="flex items-center px-4 py-2 text-sm transition-colors duration-200 text-gray-700 hover:bg-gray-100"
                                                >
                                                    <UserCircle2 className="mr-2 h-4 w-4" /> Tu perfil
                                                </a>
                                                <div className="border-t border-gray-200/70 my-1"></div>
                                                <a
                                                    href="#"
                                                    className="flex items-center px-4 py-2 text-sm transition-colors duration-200 text-gray-700 hover:bg-gray-100"
                                                >
                                                    <Settings className="mr-2 h-4 w-4" /> Configuración
                                                </a>
                                                <a
                                                    href="#"
                                                    className="flex items-center px-4 py-2 text-sm transition-colors duration-200 text-red-600 hover:bg-red-50"
                                                >
                                                    <LogOut className="mr-2 h-4 w-4" /> Cerrar sesión
                                                </a>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Wallet Button */}
                                <motion.button
                                    whileHover={{ scale: 1.02, y: -1 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex items-center space-x-2 px-3 py-1.5 rounded-lg font-medium transition-all duration-300 bg-gradient-to-r from-blue-50 to-indigo-100 text-blue-700 border border-blue-200/50"
                                    onClick={() => router.push('/wallet')}
                                >
                                    <Wallet size={16} />
                                    <span className="text-sm font-semibold">Billetera</span>
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </motion.nav>
            )}
        </AnimatePresence>
    );
};

export default Navbar;