"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Menu,
    X,
    Bitcoin,
    TrendingUp,
    TrendingDown,
    Minus,
    DollarSign,
    Activity,
    BarChart3,
    Search,
    Filter,
    Clock,
    MapPin,
    Star,
    ChefHat,
    Wheat,
    Cookie
} from 'lucide-react';
import ContentBakery from './sidebar/ContentIndex';
import ContentCrypto from './sidebar/ContentCrypto';

// Datos simulados de criptomonedas
const cryptoData = [
    {
        id: 1,
        name: "Bitcoin",
        symbol: "BTC",
        price: 45250.32,
        change: 2.34,
        volume: "28.5B",
        trend: "up"
    },
    {
        id: 2,
        name: "Ethereum",
        symbol: "ETH",
        price: 3125.67,
        change: -1.23,
        volume: "15.2B",
        trend: "down"
    },
    {
        id: 3,
        name: "Binance Coin",
        symbol: "BNB",
        price: 312.45,
        change: 0.89,
        volume: "2.1B",
        trend: "up"
    },
    {
        id: 4,
        name: "Cardano",
        symbol: "ADA",
        price: 1.23,
        change: -0.45,
        volume: "1.8B",
        trend: "down"
    },
    {
        id: 5,
        name: "Solana",
        symbol: "SOL",
        price: 98.76,
        change: 0.00,
        volume: "3.2B",
        trend: "neutral"
    }
];

// Datos simulados de panes y panaderías
const breadData = [
    {
        id: 1,
        name: "Pan Integral",
        bakery: "Panadería El Trigal",
        price: 3500,
        rating: 4.8,
        category: "Integral",
        freshness: "Recién horneado",
        time: "5 min",
        available: true
    },
    {
        id: 2,
        name: "Croissant Francés",
        bakery: "Boulangerie Cali",
        price: 2800,
        rating: 4.9,
        category: "Francés",
        freshness: "Muy fresco",
        time: "8 min",
        available: true
    },
    {
        id: 3,
        name: "Pan de Centeno",
        bakery: "Pan Artesanal",
        price: 4200,
        rating: 4.6,
        category: "Artesanal",
        freshness: "Fresco",
        time: "12 min",
        available: false
    },
    {
        id: 4,
        name: "Baguette Tradicional",
        bakery: "La Baguette Dorada",
        price: 3200,
        rating: 4.7,
        category: "Francés",
        freshness: "Recién horneado",
        time: "6 min",
        available: true
    },
    {
        id: 5,
        name: "Pan Dulce",
        bakery: "Dulce Aroma",
        price: 2500,
        rating: 4.5,
        category: "Dulce",
        freshness: "Fresco",
        time: "10 min",
        available: true
    }
];

const breadCategories = ["Todos", "Integral", "Francés", "Artesanal", "Dulce", "Salado"];
const freshnessLevels = ["Todos", "Recién horneado", "Muy fresco", "Fresco"];
const priceRanges = [
    { label: "Todos", min: 0, max: Infinity },
    { label: "$0 - $2,500", min: 0, max: 2500 },
    { label: "$2,501 - $3,500", min: 2501, max: 3500 },
    { label: "$3,501 - $5,000", min: 3501, max: 5000 },
    { label: "$5,000+", min: 5001, max: Infinity }
];

interface SidebarProps {
    isOpen: boolean;
    onToggle: () => void;
}

interface LayoutProps {
    children: React.ReactNode;
    sidebarOpen: boolean;
    onToggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
    const [mode, setMode] = useState<'crypto' | 'bakery'>('bakery');
    const [selectedCrypto, setSelectedCrypto] = useState(cryptoData[0]);

    // Estados para filtros de panadería
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Todos');
    const [selectedFreshness, setSelectedFreshness] = useState('Todos');
    const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0]);
    const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);
    const [minRating, setMinRating] = useState(0);

    // Función para filtrar panes
    const filteredBreads = breadData.filter(bread => {
        const matchesSearch = bread.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            bread.bakery.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'Todos' || bread.category === selectedCategory;
        const matchesFreshness = selectedFreshness === 'Todos' || bread.freshness === selectedFreshness;
        const matchesPrice = bread.price >= selectedPriceRange.min && bread.price <= selectedPriceRange.max;
        const matchesAvailability = !showOnlyAvailable || bread.available;
        const matchesRating = bread.rating >= minRating;

        return matchesSearch && matchesCategory && matchesFreshness && matchesPrice && matchesAvailability && matchesRating;
    });

    const getTrendIcon = (trend: string) => {
        switch (trend) {
            case 'up':
                return <TrendingUp className="w-4 h-4 text-green-500" />;
            case 'down':
                return <TrendingDown className="w-4 h-4 text-red-500" />;
            default:
                return <Minus className="w-4 h-4 text-gray-500" />;
        }
    };

    const getTrendColor = (trend: string) => {
        switch (trend) {
            case 'up':
                return 'text-green-500';
            case 'down':
                return 'text-red-500';
            default:
                return 'text-gray-500';
        }
    };

    const getBreadIcon = (category: string) => {
        switch (category) {
            case 'Integral':
                return <Wheat className="w-4 h-4 text-amber-600" />;
            case 'Francés':
                return <ChefHat className="w-4 h-4 text-blue-600" />;
            case 'Dulce':
                return <Cookie className="w-4 h-4 text-pink-600" />;
            default:
                return <DollarSign className="w-4 h-4 text-orange-600" />;
        }
    };

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={`w-3 h-3 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
            />
        ));
    };

    const clearFilters = () => {
        setSearchTerm('');
        setSelectedCategory('Todos');
        setSelectedFreshness('Todos');
        setSelectedPriceRange(priceRanges[0]);
        setShowOnlyAvailable(false);
        setMinRating(0);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setMode('bakery');
            }
        };
        if (typeof window !== 'undefined') {
            window.addEventListener('resize', handleResize);
            // Set initial mode on mount
            handleResize();
        }
        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('resize', handleResize);
            }
        };
    }, []);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ x: -300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -300, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="fixed left-0 top-0 h-full w-80 bg-white/80 backdrop-blur-xl border-r border-gray-200/50 z-40 overflow-y-auto no-scrollbar"
                >
                    {/* Switch de Modo visible en todos los tamaños */}
                    <div className="p-4 border-b border-gray-200/30 pt-16">
                        <div className="flex items-center justify-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <Bitcoin className="w-4 h-4 text-orange-500" />
                                <span className="text-sm font-medium text-gray-700">Crypto</span>
                            </div>
                            <button
                                onClick={() => setMode(mode === 'crypto' ? 'bakery' : 'crypto')}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${mode === 'bakery' ? 'bg-amber-500' : 'bg-gray-300'}`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${mode === 'bakery' ? 'translate-x-6' : 'translate-x-1'}`}
                                />
                            </button>
                            <div className="flex items-center space-x-2">
                                <ChefHat className="w-4 h-4 text-amber-600" />
                                <span className="text-sm font-medium text-gray-700">Panadería</span>
                            </div>
                        </div>
                    </div>

                    {/* Contenido Crypto */}
                    {mode === 'crypto' && <ContentCrypto
                        selectedCrypto={selectedCrypto}
                        getTrendIcon={getTrendIcon}
                        getTrendColor={getTrendColor}
                        cryptoData={cryptoData}
                        setSelectedCrypto={setSelectedCrypto}
                    />}

                    {/* Contenido Panadería */}
                    {mode === 'bakery' && <ContentBakery
                        breadData={breadData}
                        filteredBreads={filteredBreads}
                        getBreadIcon={getBreadIcon}
                        renderStars={renderStars}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        breadCategories={breadCategories}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                        freshnessLevels={freshnessLevels}
                        selectedFreshness={selectedFreshness}
                        setSelectedFreshness={setSelectedFreshness}
                        priceRanges={priceRanges}
                        selectedPriceRange={selectedPriceRange}
                        setSelectedPriceRange={setSelectedPriceRange}
                        minRating={minRating}
                        setMinRating={setMinRating}
                        showOnlyAvailable={showOnlyAvailable}
                        setShowOnlyAvailable={setShowOnlyAvailable}
                        clearFilters={clearFilters}
                    />}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

// Hook personalizado para el estado del sidebar
export const useSidebar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return { sidebarOpen, toggleSidebar };
};



export const CryptoLayout: React.FC<LayoutProps> = ({
    children,
    sidebarOpen,
    onToggleSidebar
}) => {
    return (
        <div className="relative min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* Sidebar */}
            <Sidebar isOpen={sidebarOpen} onToggle={onToggleSidebar} />

            {/* Contenido principal */}
            <motion.div
                animate={{
                    marginLeft: typeof window !== 'undefined' && window.innerWidth >= 1024 && sidebarOpen ? '320px' : '0px'
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="transition-all duration-300"
            >
                {children}
            </motion.div>
        </div>
    );
};