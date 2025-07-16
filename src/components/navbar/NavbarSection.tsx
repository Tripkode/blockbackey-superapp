"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Croissant, Menu, UserRound, Wallet, UserCircle2, Settings, LogOut, MapPin, ChevronDown, Plus, Search, X, Navigation } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface NavbarProps {
    sidebarOpen?: boolean;
    onToggleSidebar?: () => void;
}

interface Address {
    id: string;
    city: string;
    address: string;
    isMain?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ sidebarOpen = false, onToggleSidebar }) => {
    const [scrolled, setScrolled] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentLocation, setCurrentLocation] = useState({
        city: "Cali, Valle del Cauca",
        address: "Cra 24E #4-97"
    });
    
    const dropdownRef = useRef<HTMLDivElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    // Direcciones guardadas simuladas
    const [savedAddresses, setSavedAddresses] = useState<Address[]>([
        {
            id: '1',
            city: 'Cali, Valle del Cauca',
            address: 'Cra 24E #4-97',
            isMain: true
        },
        {
            id: '2',
            city: 'Cali, Valle del Cauca',
            address: 'Av. 6 Norte #25-45, San Fernando'
        },
        {
            id: '3',
            city: 'Cali, Valle del Cauca',
            address: 'Calle 5 #38-25, Granada'
        },
        {
            id: '4',
            city: 'Cali, Valle del Cauca',
            address: 'Cra 100 #11-50, Ciudad Jardín'
        }
    ]);

    // Filtrar direcciones según búsqueda
    const filteredAddresses = savedAddresses.filter(address => 
        address.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        address.city.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setIsAddressModalOpen(false);
            }
        };

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsAddressModalOpen(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscape);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, []);

    // Efecto para enfocar el input cuando se abre el modal
    useEffect(() => {
        if (isAddressModalOpen && searchInputRef.current) {
            setTimeout(() => {
                searchInputRef.current?.focus();
            }, 100);
        }
    }, [isAddressModalOpen]);

    const toggleDropdown = () => {
        setIsDropdownOpen(prev => !prev);
    };

    const openAddressModal = () => {
        setIsAddressModalOpen(true);
        setSearchQuery('');
    };

    const closeAddressModal = () => {
        setIsAddressModalOpen(false);
        setSearchQuery('');
    };

    const handleLocationSelect = (location: { city: string; address: string }) => {
        setCurrentLocation(location);
        closeAddressModal();
    };

    const handleUseCurrentLocation = () => {
        // Aquí puedes implementar la lógica para obtener la ubicación actual
        console.log("Usando ubicación actual");
        // Ejemplo de uso de geolocalización
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    // Aquí tendrías que hacer reverse geocoding para obtener la dirección
                    setCurrentLocation({
                        city: "Cali, Valle del Cauca",
                        address: "Ubicación actual"
                    });
                },
                (error) => {
                    console.error("Error obteniendo ubicación:", error);
                }
            );
        }
        closeAddressModal();
    };

    const handleAddAddress = () => {
        closeAddressModal();
        // Aquí puedes agregar la lógica para abrir un modal o navegar a la página de agregar dirección
        console.log("Abrir modal para agregar dirección");
    };

    const LocationSelect = ({ isMobile = false }) => (
        <div className={`relative ${isMobile ? 'w-full' : ''}`}>
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={openAddressModal}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg font-medium transition-all duration-300 bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200/50 ${isMobile ? 'w-full justify-center' : ''
                    }`}
            >
                <MapPin size={16} className="text-amber-600" />
                <div className="flex flex-col items-start">
                    <span className="text-sm font-medium">{currentLocation.address}</span>
                </div>
                <ChevronDown size={14} className="transition-transform duration-200" />
            </motion.button>
        </div>
    );

    return (
        <>
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

                                {/* Center: Location Select (Desktop only) */}
                                <div className="hidden md:flex flex-1 justify-center max-w-sm">
                                    <LocationSelect />
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

            {/* Mobile Location Bar */}
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: "easeOut", delay: 0.1 }}
                        className={`md:hidden fixed top-12 left-0 right-0 z-40 transition-all duration-300 ease-out ${scrolled
                            ? 'bg-white/80 backdrop-blur-xl border-b border-gray-200/50'
                            : 'bg-white/10 backdrop-blur-sm border-b border-white/20'
                            }`}
                    >
                        <div className="max-w-7xl mx-auto px-6">
                            <div className="py-2">
                                <LocationSelect isMobile={true} />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Address Modal */}
            <AnimatePresence>
                {isAddressModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
                    >
                        <motion.div
                            ref={modalRef}
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] overflow-hidden"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b border-gray-200">
                                <h2 className="text-lg font-semibold text-gray-900">Seleccionar dirección</h2>
                                <button
                                    onClick={closeAddressModal}
                                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    <X size={20} className="text-gray-500" />
                                </button>
                            </div>

                            {/* Search Input */}
                            <div className="p-6 border-b border-gray-200">
                                <div className="relative">
                                    <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        ref={searchInputRef}
                                        type="text"
                                        placeholder="Buscar dirección..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="max-h-64 overflow-y-auto">
                                {/* Use Current Location Option */}
                                <button
                                    onClick={handleUseCurrentLocation}
                                    className="w-full flex items-center p-4 text-left hover:bg-gray-50 transition-colors border-b border-gray-100"
                                >
                                    <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full mr-3">
                                        <Navigation size={16} className="text-blue-600" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-medium text-blue-600">Usar mi ubicación actual</div>
                                        <div className="text-sm text-gray-500">Detectar automáticamente</div>
                                    </div>
                                </button>

                                {/* Saved Addresses */}
                                {filteredAddresses.length > 0 ? (
                                    filteredAddresses.map((address) => (
                                        <button
                                            key={address.id}
                                            onClick={() => handleLocationSelect(address)}
                                            className={`w-full flex items-center p-4 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 ${
                                                currentLocation.address === address.address && currentLocation.city === address.city
                                                    ? 'bg-amber-50 border-amber-200'
                                                    : ''
                                            }`}
                                        >
                                            <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full mr-3">
                                                <MapPin size={16} className="text-amber-600" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="font-medium text-gray-900">{address.address}</div>
                                                <div className="text-sm text-gray-500">{address.city}</div>
                                                {address.isMain && (
                                                    <div className="text-xs text-amber-600 font-medium">Principal</div>
                                                )}
                                            </div>
                                        </button>
                                    ))
                                ) : (
                                    <div className="p-8 text-center text-gray-500">
                                        <MapPin size={48} className="mx-auto mb-4 text-gray-300" />
                                        <p>No se encontraron direcciones</p>
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="p-6 border-t border-gray-200">
                                <button
                                    onClick={handleAddAddress}
                                    className="w-full flex items-center justify-center p-3 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors font-medium"
                                >
                                    <Plus size={20} className="mr-2" />
                                    Agregar nueva dirección
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;