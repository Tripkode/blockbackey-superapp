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
    BarChart3
} from 'lucide-react';

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

interface CryptoSidebarProps {
    isOpen: boolean;
    onToggle: () => void;
}

const CryptoSidebar: React.FC<CryptoSidebarProps> = ({ isOpen, onToggle }) => {
    const [selectedCrypto, setSelectedCrypto] = useState(cryptoData[0]);

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
                    {/* Crypto Principal */}
                    <div className="p-4 border-b border-gray-200/30 pt-20">
                        <h3 className="text-sm font-semibold text-gray-600 mb-3">MONEDA PRINCIPAL</h3>
                        <div className="bg-white/40 backdrop-blur-sm rounded-lg p-4 border border-gray-200/30">
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-semibold text-gray-800">{selectedCrypto.name}</span>
                                <span className="text-sm text-gray-500">{selectedCrypto.symbol}</span>
                            </div>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-2xl font-bold text-gray-800">
                                    ${selectedCrypto.price.toLocaleString()}
                                </span>
                                <div className="flex items-center space-x-1">
                                    {getTrendIcon(selectedCrypto.trend)}
                                    <span className={`text-sm font-medium ${getTrendColor(selectedCrypto.trend)}`}>
                                        {selectedCrypto.change > 0 ? '+' : ''}{selectedCrypto.change}%
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between text-sm text-gray-600">
                                <div className="flex items-center space-x-1">
                                    <Activity className="w-4 h-4" />
                                    <span>Volumen: {selectedCrypto.volume}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Lista de Criptomonedas */}
                    <div className="p-4">
                        <h3 className="text-sm font-semibold text-gray-600 mb-3">MERCADO</h3>
                        <div className="space-y-2">
                            {cryptoData.map((crypto) => (
                                <motion.div
                                    key={crypto.id}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`p-3 rounded-lg cursor-pointer transition-colors ${selectedCrypto.id === crypto.id
                                            ? 'bg-blue-50/60 border border-blue-200/50 backdrop-blur-sm'
                                            : 'bg-white/30 hover:bg-white/50 backdrop-blur-sm border border-gray-200/30'
                                        }`}
                                    onClick={() => setSelectedCrypto(crypto)}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-8 h-8 bg-orange-100/80 rounded-full flex items-center justify-center backdrop-blur-sm">
                                                <DollarSign className="w-4 h-4 text-orange-600" />
                                            </div>
                                            <div>
                                                <div className="font-medium text-gray-800">{crypto.symbol}</div>
                                                <div className="text-xs text-gray-500">{crypto.name}</div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-semibold text-gray-800">
                                                ${crypto.price.toLocaleString()}
                                            </div>
                                            <div className={`text-xs flex items-center space-x-1 ${getTrendColor(crypto.trend)}`}>
                                                {getTrendIcon(crypto.trend)}
                                                <span>{crypto.change > 0 ? '+' : ''}{crypto.change}%</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Estadísticas */}
                    <div className="p-4 border-t border-gray-200/30">
                        <h3 className="text-sm font-semibold text-gray-600 mb-3">ESTADÍSTICAS</h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <BarChart3 className="w-4 h-4 text-blue-500" />
                                    <span className="text-sm text-gray-600">Transacciones Hoy</span>
                                </div>
                                <span className="font-semibold text-gray-800">1,234</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <Activity className="w-4 h-4 text-green-500" />
                                    <span className="text-sm text-gray-600">Volumen Total</span>
                                </div>
                                <span className="font-semibold text-gray-800">$52.1M</span>
                            </div>
                        </div>
                    </div>
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

interface CryptoLayoutProps {
    children: React.ReactNode;
    sidebarOpen: boolean;
    onToggleSidebar: () => void;
}

const CryptoLayout: React.FC<CryptoLayoutProps> = ({
    children,
    sidebarOpen,
    onToggleSidebar
}) => {
    return (
        <div className="relative min-h-screen ">
            {/* Sidebar */}
            <CryptoSidebar isOpen={sidebarOpen} onToggle={onToggleSidebar} />

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

export default CryptoLayout;