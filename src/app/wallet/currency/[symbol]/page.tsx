"use client"

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
    ArrowLeft,
    TrendingUp,
    TrendingDown,
    Gift,
    ShoppingBag,
    CreditCard,
    ArrowUpRight,
    Calendar,
    Info,
    Star,
    Award,
    Zap,
    ArrowLeftRight
} from 'lucide-react';

function SymbolWalletTransactions({ params }: { params: Promise<{ symbol: string }> }) {
    const router = useRouter();
    const [selectedTimeframe, setSelectedTimeframe] = useState('7d');
    const [symbol, setSymbol] = useState('');

    useEffect(() => {
        const getUsername = async () => {
            const resolvedParams = await params;
            setSymbol(resolvedParams.symbol);
        };
        getUsername();
    }, [params]);

    // Mock data para una criptomoneda específica
    const cryptoData = {
        id: 1,
        name: 'BreadCoin',
        symbol: symbol,
        icon: '🍞',
        bakery: 'Esquina Artesanal',
        currentBalance: 125.50,
        valueCOP: 185.40,
        change24h: 2.3,
        totalValueCOP: 125.50 * 185.40,
        acquisitionValueCOP: 118.75 * 170.20, // Valor de adquisición
        profitLoss: (125.50 * 185.40) - (118.75 * 170.20),
        profitPercentage: ((125.50 * 185.40) - (118.75 * 170.20)) / (118.75 * 170.20) * 100
    };

    const transactions = [
        {
            id: 1,
            type: 'reward',
            title: 'Recompensa por Compra',
            description: 'Croissant Premium + Café',
            amount: 3.5,
            valueCOP: 3.5 * 185.40,
            date: '2025-07-15',
            bakery: 'Esquina Artesanal',
            originalPurchase: 45000,
            rewardPercentage: 1.5,
            status: 'completed'
        },
        {
            id: 2,
            type: 'purchase',
            title: 'Compra con Fiat',
            description: 'Compra directa de BREAD',
            amount: 25.0,
            valueCOP: 4200000,
            date: '2025-07-12',
            paymentMethod: 'Tarjeta de Crédito',
            priceAtPurchase: 168.00,
            status: 'completed'
        },
        {
            id: 3,
            type: 'reward',
            title: 'Recompensa por Fidelidad',
            description: 'Cliente VIP - Compra mensual',
            amount: 8.2,
            valueCOP: 8.2 * 185.40,
            date: '2025-07-10',
            bakery: 'Esquina Artesanal',
            originalPurchase: 120000,
            rewardPercentage: 2.0,
            status: 'completed'
        },
        {
            id: 4,
            type: 'exchange',
            title: 'Intercambio desde CroissantToken',
            description: 'CRSS → BREAD',
            amount: 12.8,
            valueCOP: 12.8 * 185.40,
            date: '2025-07-08',
            exchangeRate: 0.85,
            fromCurrency: 'CRSS',
            fromAmount: 15.0,
            status: 'completed'
        },
        {
            id: 5,
            type: 'reward',
            title: 'Recompensa por Referido',
            description: 'Tu amigo hizo su primera compra',
            amount: 5.0,
            valueCOP: 5.0 * 185.40,
            date: '2025-07-05',
            bakery: 'Esquina Artesanal',
            referralBonus: true,
            status: 'completed'
        },
        {
            id: 6,
            type: 'purchase',
            title: 'Compra con Fiat',
            description: 'Inversión inicial',
            amount: 50.0,
            valueCOP: 8100000,
            date: '2025-07-01',
            paymentMethod: 'Transferencia Bancaria',
            priceAtPurchase: 162.00,
            status: 'completed'
        },
        {
            id: 7,
            type: 'reward',
            title: 'Bonus de Bienvenida',
            description: 'Regalo por registrarte',
            amount: 10.0,
            valueCOP: 10.0 * 185.40,
            date: '2025-06-28',
            bakery: 'Esquina Artesanal',
            welcomeBonus: true,
            status: 'completed'
        }
    ];

    const formatCurrency = (amount: string | number | bigint | undefined) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(
            amount === undefined ? 0 : typeof amount === "string" ? Number(amount) : amount
        );
    };

    const formatCrypto = (amount: number | undefined, currency: string | undefined) => {
        if (typeof amount !== "number" || amount === undefined || currency === undefined) {
            return "-";
        }
        return `${amount.toFixed(2)} ${currency}`;
    };

    const getTransactionIcon = (type: string) => {
        switch (type) {
            case 'reward':
                return <Gift className="w-5 h-5 text-green-500" />;
            case 'purchase':
                return <CreditCard className="w-5 h-5 text-blue-500" />;
            case 'exchange':
                return <ArrowLeftRight className="w-5 h-5 text-purple-500" />;
            default:
                return <Info className="w-5 h-5 text-gray-500" />;
        }
    };

    const getTransactionTypeLabel = (type: string) => {
        switch (type) {
            case 'reward':
                return 'Recompensa';
            case 'purchase':
                return 'Compra';
            case 'exchange':
                return 'Intercambio';
            default:
                return 'Transacción';
        }
    };

    const timeframes = [
        { value: '7d', label: '7 días' },
        { value: '30d', label: '30 días' },
        { value: '90d', label: '90 días' },
        { value: 'all', label: 'Todo' }
    ];

    return (
        <div className="min-h-screen bg-gray-50 relative overflow-hidden pt-26 sm:pt-16">
            {/* Fondo sutil */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-10 w-32 h-32 bg-amber-100/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-16 w-40 h-40 bg-orange-100/20 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-yellow-100/20 rounded-full blur-3xl"></div>
            </div>

            {/* Contenido principal */}
            <div className="relative z-10 px-3 sm:px-4 lg:px-6 py-4">
                <div className="max-w-4xl mx-auto">

                    {/* Header con botón de regreso */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center mb-6"
                    >
                        <button 
                            onClick={() => router.back()}
                            className="p-2 hover:bg-white/50 rounded-full transition-colors mr-3"
                        >
                            <ArrowLeft className="w-5 h-5 text-gray-600" />
                        </button>
                        <h1 className="text-xl font-bold text-gray-900">
                            Detalles de {cryptoData.name}
                        </h1>
                    </motion.div>

                    {/* Resumen de la criptomoneda */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-white/20 shadow-sm mb-6"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center">
                                <div className="flex items-center justify-center w-14 h-14 bg-amber-100 rounded-xl mr-4">
                                    <span className="text-2xl">{cryptoData.icon}</span>
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-gray-900">{cryptoData.name}</h2>
                                    <p className="text-sm text-gray-600">{cryptoData.bakery}</p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {formatCurrency(cryptoData.valueCOP)} •
                                        <span className={`ml-1 ${cryptoData.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                            {cryptoData.change24h >= 0 ? '+' : ''}{cryptoData.change24h.toFixed(1)}%
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-amber-50/50 p-4 rounded-xl">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-gray-700">Balance Actual</span>
                                    <Zap className="w-4 h-4 text-amber-500" />
                                </div>
                                <p className="text-xl font-bold text-gray-900">{formatCrypto(cryptoData.currentBalance, cryptoData.symbol)}</p>
                                <p className="text-sm text-gray-600 mt-1">{formatCurrency(cryptoData.totalValueCOP)}</p>
                            </div>

                            <div className="bg-green-50/50 p-4 rounded-xl">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-gray-700">Ganancia/Pérdida</span>
                                    {cryptoData.profitLoss >= 0 ? (
                                        <TrendingUp className="w-4 h-4 text-green-500" />
                                    ) : (
                                        <TrendingDown className="w-4 h-4 text-red-500" />
                                    )}
                                </div>
                                <p className={`text-xl font-bold ${cryptoData.profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {cryptoData.profitLoss >= 0 ? '+' : ''}{formatCurrency(cryptoData.profitLoss)}
                                </p>
                                <p className={`text-sm mt-1 ${cryptoData.profitPercentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {cryptoData.profitPercentage >= 0 ? '+' : ''}{cryptoData.profitPercentage.toFixed(2)}%
                                </p>
                            </div>

                            <div className="bg-blue-50/50 p-4 rounded-xl">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-gray-700">Valor de Compra</span>
                                    <ShoppingBag className="w-4 h-4 text-blue-500" />
                                </div>
                                <p className="text-xl font-bold text-gray-900">{formatCurrency(cryptoData.acquisitionValueCOP)}</p>
                                <p className="text-sm text-gray-600 mt-1">Costo promedio</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Filtros de tiempo */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mb-6"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-gray-900">Historial de Transacciones</h2>
                            <div className="flex bg-white/70 backdrop-blur-sm rounded-xl p-1 border border-white/20">
                                {timeframes.map((timeframe) => (
                                    <button
                                        key={timeframe.value}
                                        onClick={() => setSelectedTimeframe(timeframe.value)}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${selectedTimeframe === timeframe.value
                                            ? 'bg-amber-100 text-amber-700 shadow-sm'
                                            : 'text-gray-600 hover:text-gray-900'
                                            }`}
                                    >
                                        {timeframe.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Lista de transacciones */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="space-y-3"
                    >
                        <AnimatePresence>
                            {transactions.map((transaction, index) => (
                                <motion.div
                                    key={transaction.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                    className="bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-white/20 shadow-sm hover:shadow-md transition-shadow duration-200"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-start space-x-3">
                                            <div className="flex items-center justify-center w-10 h-10 bg-gray-50 rounded-full mt-1">
                                                {getTransactionIcon(transaction.type)}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center space-x-2 mb-1">
                                                    <h3 className="font-semibold text-gray-900 text-sm">{transaction.title}</h3>
                                                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${transaction.type === 'reward' ? 'bg-green-100 text-green-700' :
                                                        transaction.type === 'purchase' ? 'bg-blue-100 text-blue-700' :
                                                            'bg-purple-100 text-purple-700'
                                                        }`}>
                                                        {getTransactionTypeLabel(transaction.type)}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-gray-600 mb-2">{transaction.description}</p>

                                                {/* Información adicional según el tipo */}
                                                {transaction.type === 'reward' && (
                                                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                                                        {transaction.originalPurchase && (
                                                            <span>Compra: {formatCurrency(transaction.originalPurchase)}</span>
                                                        )}
                                                        {transaction.rewardPercentage && (
                                                            <span className="flex items-center">
                                                                <Star className="w-3 h-3 mr-1 text-amber-500" />
                                                                {transaction.rewardPercentage}% recompensa
                                                            </span>
                                                        )}
                                                        {transaction.referralBonus && (
                                                            <span className="flex items-center">
                                                                <Award className="w-3 h-3 mr-1 text-green-500" />
                                                                Bonus referido
                                                            </span>
                                                        )}
                                                        {transaction.welcomeBonus && (
                                                            <span className="flex items-center">
                                                                <Gift className="w-3 h-3 mr-1 text-blue-500" />
                                                                Bonus bienvenida
                                                            </span>
                                                        )}
                                                    </div>
                                                )}

                                                {transaction.type === 'purchase' && (
                                                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                                                        <span>Precio: {formatCurrency(transaction.priceAtPurchase)}</span>
                                                        <span>Método: {transaction.paymentMethod}</span>
                                                    </div>
                                                )}

                                                {transaction.type === 'exchange' && (
                                                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                                                        <span>De: {formatCrypto(transaction.fromAmount, transaction.fromCurrency)}</span>
                                                        <span>Tasa: {transaction.exchangeRate}</span>
                                                    </div>
                                                )}

                                                <div className="flex items-center mt-2 text-xs text-gray-400">
                                                    <Calendar className="w-3 h-3 mr-1" />
                                                    {new Date(transaction.date).toLocaleDateString('es-CO', {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric'
                                                    })}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="text-right flex-shrink-0">
                                            <div className="flex items-center text-green-600 mb-1">
                                                <ArrowUpRight className="w-4 h-4 mr-1" />
                                                <span className="font-bold text-sm">+{formatCrypto(transaction.amount, cryptoData.symbol)}</span>
                                            </div>
                                            <p className="text-xs text-gray-600">{formatCurrency(transaction.valueCOP)}</p>
                                            {transaction.type === 'purchase' && (
                                                <p className="text-xs text-gray-500 mt-1">
                                                    {formatCurrency(transaction.valueCOP)}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>

                    {/* Resumen estadístico */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="mt-6 bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-white/20 shadow-sm"
                    >
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumen del Período</h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="text-center">
                                <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-xl mx-auto mb-3">
                                    <Gift className="w-6 h-6 text-green-600" />
                                </div>
                                <p className="text-2xl font-bold text-gray-900">
                                    {transactions.filter(t => t.type === 'reward').length}
                                </p>
                                <p className="text-sm text-gray-600">Recompensas</p>
                                <p className="text-xs text-green-600 mt-1">
                                    +{formatCrypto(transactions.filter(t => t.type === 'reward').reduce((sum, t) => sum + t.amount, 0), cryptoData.symbol)}
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mx-auto mb-3">
                                    <CreditCard className="w-6 h-6 text-blue-600" />
                                </div>
                                <p className="text-2xl font-bold text-gray-900">
                                    {transactions.filter(t => t.type === 'purchase').length}
                                </p>
                                <p className="text-sm text-gray-600">Compras</p>
                                <p className="text-xs text-blue-600 mt-1">
                                    +{formatCrypto(transactions.filter(t => t.type === 'purchase').reduce((sum, t) => sum + t.amount, 0), cryptoData.symbol)}
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-xl mx-auto mb-3">
                                    <ArrowLeftRight className="w-6 h-6 text-purple-600" />
                                </div>
                                <p className="text-2xl font-bold text-gray-900">
                                    {transactions.filter(t => t.type === 'exchange').length}
                                </p>
                                <p className="text-sm text-gray-600">Intercambios</p>
                                <p className="text-xs text-purple-600 mt-1">
                                    +{formatCrypto(transactions.filter(t => t.type === 'exchange').reduce((sum, t) => sum + t.amount, 0), cryptoData.symbol)}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

export default SymbolWalletTransactions;