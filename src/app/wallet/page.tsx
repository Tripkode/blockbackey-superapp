"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Package,
    ShoppingBag,
    Banknote,
    Landmark,
    Wallet,
    Layers,
    ArrowLeftRight,
    X,
    Plus,
    ExternalLink,
    CreditCard,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const WalletPage = () => {
    const router = useRouter();

    // Estado para los modales
    const [exchangeModal, setExchangeModal] = useState({
        isOpen: false,
        selectedCoin: null,
        targetCoinId: '',
        exchangeAmount: ''
    });

    const [buyCryptoModal, setBuyCryptoModal] = useState({
        isOpen: false,
        selectedCoin: '',
        buyAmount: '',
        paymentMethod: 'credit_card'
    });

    // Mock data para la billetera con precios en pesos colombianos
    const [walletData, setWalletData] = useState({
        balanceCOP: 5247280, // Equivalente a ~$1,250 USD
        bakeryCoins: [
            {
                id: 1,
                name: 'BreadCoin',
                symbol: 'BREAD',
                amount: 125.50,
                bakery: 'Esquina Artesanal',
                icon: '🍞',
                valueCOP: 185.40,
                change24h: 2.3
            },
            {
                id: 2,
                name: 'CroissantToken',
                symbol: 'CRSS',
                amount: 89.25,
                bakery: 'Panadería Moderna',
                icon: '🥐',
                valueCOP: 142.80,
                change24h: -1.2
            },
            {
                id: 3,
                name: 'SourdoughCoin',
                symbol: 'SOUR',
                amount: 67.80,
                bakery: 'Masa Madre & Cía',
                icon: '🥖',
                valueCOP: 298.50,
                change24h: 5.7
            },
            {
                id: 4,
                name: 'MuffinMoney',
                symbol: 'MUFN',
                amount: 234.15,
                bakery: 'Delicias Dulces',
                icon: '🧁',
                valueCOP: 95.20,
                change24h: -0.8
            },
            {
                id: 5,
                name: 'BaguetteBucks',
                symbol: 'BAGT',
                amount: 156.90,
                bakery: 'Casa Francesa',
                icon: '🥖',
                valueCOP: 167.35,
                change24h: 3.1
            },
            {
                id: 6,
                name: 'DonutDollars',
                symbol: 'DNUT',
                amount: 78.30,
                bakery: 'Paraíso Donas',
                icon: '🍩',
                valueCOP: 124.60,
                change24h: 1.8
            },
            {
                id: 7,
                name: 'PieToken',
                symbol: 'PIE',
                amount: 45.67,
                bakery: 'Tartas Rústicas',
                icon: '🥧',
                valueCOP: 412.90,
                change24h: -2.4
            },
            {
                id: 8,
                name: 'CakeCoin',
                symbol: 'CAKE',
                amount: 189.30,
                bakery: 'Tortas Elegantes',
                icon: '🍰',
                valueCOP: 203.75,
                change24h: 4.2
            }
        ],
        transactions: [
            {
                id: 1,
                type: 'purchase',
                bakery: 'Esquina Artesanal',
                product: 'Croissant Artesanal',
                amountCOP: 35700,
                cryptoPaid: { currency: 'BREAD', amount: 2.5 },
                date: '2025-07-10',
                status: 'completed'
            },
            {
                id: 2,
                type: 'deposit',
                source: 'Esquina Artesanal',
                amountCOP: 3150,
                cryptoReceived: { currency: 'BREAD', amount: 5.0 },
                date: '2025-07-09',
                status: 'completed'
            },
            {
                id: 3,
                type: 'purchase',
                bakery: 'Panadería Moderna',
                product: 'Baguette Premium',
                amountCOP: 20160,
                cryptoPaid: { currency: 'CRSS', amount: 1.8 },
                date: '2025-07-08',
                status: 'completed'
            },
            {
                id: 4,
                type: 'buy',
                amountCOP: 2100000,
                cryptoReceived: { currency: 'SOUR', amount: 25.0 },
                date: '2025-07-05',
                status: 'completed'
            },
            {
                id: 5,
                type: 'deposit',
                source: 'Masa Madre & Cía',
                amountCOP: 5040,
                cryptoReceived: { currency: 'SOUR', amount: 3.2 },
                date: '2025-07-04',
                status: 'completed'
            },
        ]
    });

    const formatCurrency = (amount: string | number | bigint) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(typeof amount === 'string' ? Number(amount) : amount);
    };

    const formatCrypto = (amount: number, currency: string) => {
        return `${amount.toFixed(2)} ${currency}`;
    };

    const getTransactionIcon = (type: string) => {
        switch (type) {
            case 'purchase':
                return <ShoppingBag className="w-5 h-5 text-amber-500" />;
            case 'deposit':
                return <Banknote className="w-5 h-5 text-blue-500" />;
            case 'buy':
                return <CreditCard className="w-5 h-5 text-green-500" />;
            case 'withdrawal':
                return <Landmark className="w-5 h-5 text-red-500" />;
            default:
                return <Layers className="w-5 h-5 text-gray-500" />;
        }
    };

    const handleExchange = (coinId: number) => {
        const selectedCoin = walletData.bakeryCoins.find(coin => coin.id === coinId);
        setExchangeModal({
            isOpen: true,
            selectedCoin: null,
            targetCoinId: '',
            exchangeAmount: ''
        });
    };

    const closeExchangeModal = () => {
        setExchangeModal({
            isOpen: false,
            selectedCoin: null,
            targetCoinId: '',
            exchangeAmount: ''
        });
    };

    const handleBuyCrypto = (coinId = '') => {
        setBuyCryptoModal({
            isOpen: true,
            selectedCoin: coinId,
            buyAmount: '',
            paymentMethod: 'credit_card'
        });
    };

    const closeBuyCryptoModal = () => {
        setBuyCryptoModal({
            isOpen: false,
            selectedCoin: '',
            buyAmount: '',
            paymentMethod: 'credit_card'
        });
    };

    const calculateExchangeRate = () => {
        if (!exchangeModal.selectedCoin || !exchangeModal.targetCoinId || !exchangeModal.exchangeAmount) {
            return 0;
        }
        const exchangeRate = 0.85;
        return parseFloat(exchangeModal.exchangeAmount) * exchangeRate;
    };

    const calculateBuyAmount = () => {
        if (!buyCryptoModal.selectedCoin || !buyCryptoModal.buyAmount) {
            return 0;
        }
        const selectedCoinData = walletData.bakeryCoins.find(coin => coin.id === parseInt(buyCryptoModal.selectedCoin));
        if (!selectedCoinData) return 0;

        return parseFloat(buyCryptoModal.buyAmount) / selectedCoinData.valueCOP;
    };

    const handleConfirmExchange = () => {
        console.log('Intercambio confirmado:', {
            from: exchangeModal.selectedCoin,
            to: exchangeModal.targetCoinId,
            amount: exchangeModal.exchangeAmount,
            willReceive: calculateExchangeRate()
        });
        closeExchangeModal();
    };

    const handleConfirmBuy = () => {
        console.log('Compra confirmada:', {
            coin: buyCryptoModal.selectedCoin,
            amount: buyCryptoModal.buyAmount,
            willReceive: calculateBuyAmount(),
            paymentMethod: buyCryptoModal.paymentMethod
        });
        closeBuyCryptoModal();
    };

    const handleGoToExchange = () => {
        console.log('Navegando al Exchange global...');
        // Aquí iría la navegación a la app de Exchange
    };

    return (
        <div className="min-h-screen bg-gray-50 relative overflow-hidden sm:pt-20 pt-26">
            {/* Fondo sutil */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-10 w-32 h-32 bg-amber-100/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-16 w-40 h-40 bg-orange-100/20 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-yellow-100/20 rounded-full blur-3xl"></div>
            </div>

            {/* Contenido principal */}
            <div className="relative z-10 px-3 sm:px-4 lg:px-6 py-4">
                <div className="max-w-5xl mx-auto">

                    {/* Resumen de la billetera */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-gradient-to-r from-amber-400 to-orange-400 p-6 rounded-2xl shadow-lg mb-6 text-white"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center">
                                <Wallet className="w-5 h-5 mr-2" />
                                <h2 className="text-lg font-semibold">Saldo Total</h2>
                            </div>
                            <span className="text-2xl font-bold">
                                {formatCurrency(walletData.balanceCOP)}
                            </span>
                        </div>
                        <p className="text-white/80 text-sm mb-4">
                            Valor total de todas tus criptomonedas de panaderías
                        </p>

                        {/* Botones de acción */}
                        <div className="flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={() => handleBuyCrypto()}
                                className="flex items-center justify-center px-4 py-2.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl font-medium transition-all duration-200 text-sm"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Comprar Cripto
                            </button>
                            <button
                                onClick={handleGoToExchange}
                                className="flex items-center justify-center px-4 py-2.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl font-medium transition-all duration-200 text-sm"
                            >
                                <ExternalLink className="w-4 h-4 mr-2" />
                                Ir a Exchange
                            </button>
                        </div>
                    </motion.div>

                    {/* Modal de Compra de Cripto */}
                    <AnimatePresence>
                        {buyCryptoModal.isOpen && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                            >
                                <motion.div
                                    initial={{ scale: 0.95, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.95, opacity: 0 }}
                                    className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl max-h-[90vh] overflow-y-auto"
                                >
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-xl font-bold text-gray-900">Comprar Criptomoneda</h3>
                                        <button
                                            onClick={closeBuyCryptoModal}
                                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                        >
                                            <X className="w-5 h-5 text-gray-600" />
                                        </button>
                                    </div>

                                    {/* Selección de moneda */}
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Selecciona la criptomoneda:
                                        </label>
                                        <select
                                            value={buyCryptoModal.selectedCoin}
                                            onChange={(e) => setBuyCryptoModal(prev => ({
                                                ...prev,
                                                selectedCoin: e.target.value
                                            }))}
                                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                        >
                                            <option value="">Selecciona una moneda</option>
                                            {walletData.bakeryCoins.map(coin => (
                                                <option key={coin.id} value={coin.id}>
                                                    {coin.icon} {coin.name} - {formatCurrency(coin.valueCOP)}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Monto a comprar */}
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Monto en COP:
                                        </label>
                                        <input
                                            type="number"
                                            value={buyCryptoModal.buyAmount}
                                            onChange={(e) => setBuyCryptoModal(prev => ({
                                                ...prev,
                                                buyAmount: e.target.value
                                            }))}
                                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                            placeholder="100000"
                                            min="10000"
                                        />
                                    </div>

                                    {/* Método de pago */}
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Método de pago:
                                        </label>
                                        <select
                                            value={buyCryptoModal.paymentMethod}
                                            onChange={(e) => setBuyCryptoModal(prev => ({
                                                ...prev,
                                                paymentMethod: e.target.value
                                            }))}
                                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                        >
                                            <option value="credit_card">Tarjeta de Crédito</option>
                                            <option value="debit_card">Tarjeta de Débito</option>
                                            <option value="bank_transfer">Transferencia Bancaria</option>
                                            <option value="pse">PSE</option>
                                        </select>
                                    </div>

                                    {/* Resumen de la compra */}
                                    {buyCryptoModal.selectedCoin && buyCryptoModal.buyAmount && (
                                        <div className="mb-6 p-4 bg-amber-50 rounded-xl">
                                            <p className="text-sm text-gray-700 mb-2">Recibirás aproximadamente:</p>
                                            <p className="text-lg font-bold text-amber-700">
                                                {calculateBuyAmount().toFixed(4)} {
                                                    walletData.bakeryCoins.find(coin => coin.id === parseInt(buyCryptoModal.selectedCoin))?.symbol
                                                }
                                            </p>
                                        </div>
                                    )}

                                    {/* Botones */}
                                    <div className="flex space-x-3">
                                        <button
                                            onClick={closeBuyCryptoModal}
                                            className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            onClick={handleConfirmBuy}
                                            disabled={!buyCryptoModal.selectedCoin || !buyCryptoModal.buyAmount}
                                            className="flex-1 py-3 px-4 bg-gradient-to-r from-amber-400 to-orange-400 text-white rounded-xl font-medium hover:from-amber-500 hover:to-orange-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Comprar
                                        </button>
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Modal de Intercambio */}
                    <AnimatePresence>
                        {exchangeModal.isOpen && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                            >
                                <motion.div
                                    initial={{ scale: 0.95, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.95, opacity: 0 }}
                                    className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl max-h-[90vh] overflow-y-auto"
                                >
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-xl font-bold text-gray-900">Intercambiar Cripto</h3>
                                        <button
                                            onClick={closeExchangeModal}
                                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                        >
                                            <X className="w-5 h-5 text-gray-600" />
                                        </button>
                                    </div>

                                    {/* Moneda de origen */}
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Intercambiar desde:
                                        </label>
                                        <div className="flex items-center p-3 bg-gray-50 rounded-xl">
                                            <span className="text-xl mr-3">{exchangeModal.selectedCoin && 'icon' in exchangeModal.selectedCoin ? (exchangeModal.selectedCoin as any).icon : null}</span>
                                            <div>
                                                <p className="font-semibold text-gray-900">
                                                    {exchangeModal.selectedCoin && 'name' in exchangeModal.selectedCoin ? (exchangeModal.selectedCoin as any).name : ''}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    Disponible: {exchangeModal.selectedCoin && 'amount' in exchangeModal.selectedCoin && typeof (exchangeModal.selectedCoin as any).amount === 'number'
                                                        ? (exchangeModal.selectedCoin as any).amount.toFixed(2)
                                                        : '0.00'}{' '}
                                                    {exchangeModal.selectedCoin && 'symbol' in exchangeModal.selectedCoin ? (exchangeModal.selectedCoin as any).symbol : ''}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Cantidad a intercambiar */}
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Cantidad a intercambiar:
                                        </label>
                                        <input
                                            type="number"
                                            value={exchangeModal.exchangeAmount}
                                            onChange={(e) => setExchangeModal(prev => ({
                                                ...prev,
                                                exchangeAmount: e.target.value
                                            }))}
                                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                            placeholder="0.00"
                                            max={exchangeModal.selectedCoin && 'amount' in exchangeModal.selectedCoin && typeof (exchangeModal.selectedCoin as any).amount === 'number'
                                                ? (exchangeModal.selectedCoin as any).amount
                                                : undefined}
                                        />
                                    </div>

                                    {/* Moneda de destino */}
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Intercambiar por:
                                        </label>
                                        <select
                                            value={exchangeModal.targetCoinId}
                                            onChange={(e) => setExchangeModal(prev => ({
                                                ...prev,
                                                targetCoinId: e.target.value
                                            }))}
                                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                        >
                                            <option value="">Selecciona una moneda</option>
                                            {(walletData.bakeryCoins as any[])
                                                .filter((coin: any) => coin.id !== (exchangeModal.selectedCoin && (exchangeModal.selectedCoin as any).id))
                                                .map((coin: any) => (
                                                    <option key={coin.id} value={coin.id}>
                                                        {coin.icon} {coin.name} ({coin.symbol})
                                                    </option>
                                                ))
                                            }
                                        </select>
                                    </div>

                                    {/* Información del intercambio */}
                                    {exchangeModal.exchangeAmount && exchangeModal.targetCoinId && (
                                        <div className="mb-6 p-4 bg-amber-50 rounded-xl">
                                            <p className="text-sm text-gray-700 mb-2">Recibirás aproximadamente:</p>
                                            <p className="text-lg font-bold text-amber-700">
                                                {calculateExchangeRate().toFixed(2)} {
                                                    walletData.bakeryCoins.find(coin => coin.id === parseInt(exchangeModal.targetCoinId))?.symbol
                                                }
                                            </p>
                                        </div>
                                    )}

                                    {/* Botones */}
                                    <div className="flex space-x-3">
                                        <button
                                            onClick={closeExchangeModal}
                                            className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            onClick={handleConfirmExchange}
                                            disabled={!exchangeModal.exchangeAmount || !exchangeModal.targetCoinId}
                                            className="flex-1 py-3 px-4 bg-gradient-to-r from-amber-400 to-orange-400 text-white rounded-xl font-medium hover:from-amber-500 hover:to-orange-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Confirmar
                                        </button>
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Lista de Criptomonedas */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mb-6"
                    >
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">
                            Tus Criptomonedas
                        </h2>

                        <div className="grid gap-3">
                            {walletData.bakeryCoins.map((coin) => (
                                <motion.div
                                    key={coin.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: coin.id * 0.03 }}
                                    className="bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-white/20 shadow-sm"
                                >
                                    <div className="flex items-center justify-between" onClick={() => router.push(`/wallet/${coin.symbol}`)}>
                                        <div className="flex items-center space-x-3">
                                            <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full">
                                                <span className="text-lg">{coin.icon}</span>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900 text-sm">{coin.name}</h3>
                                                <p className="text-xs text-gray-600">{coin.bakery}</p>
                                                <p className="text-xs text-gray-500">
                                                    {formatCurrency(coin.valueCOP)} •
                                                    <span className={`ml-1 ${coin.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                                        {coin.change24h >= 0 ? '+' : ''}{coin.change24h.toFixed(1)}%
                                                    </span>
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-3">
                                            <div className="text-right">
                                                <p className="font-bold text-sm text-gray-900">{coin.amount.toFixed(2)}</p>
                                                <p className="text-xs text-gray-500">{coin.symbol}</p>
                                                <p className="text-xs text-gray-600">
                                                    {formatCurrency(coin.amount * coin.valueCOP)}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => handleExchange(coin.id)}
                                                className="bg-gray-100 hover:bg-gray-200 transition-colors duration-200 p-2 rounded-full shadow-sm"
                                                title="Intercambiar"
                                            >
                                                <ArrowLeftRight className="w-4 h-4 text-gray-600" />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Historial de transacciones */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">
                            Historial de Transacciones
                        </h2>

                        <div className="space-y-3">
                            <AnimatePresence>
                                {walletData.transactions.length > 0 ? (
                                    walletData.transactions.map((transaction) => (
                                        <motion.div
                                            key={transaction.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            transition={{ duration: 0.3 }}
                                            className="flex items-center justify-between bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-white/20 shadow-sm"
                                        >
                                            <div className="flex items-center">
                                                {getTransactionIcon(transaction.type)}
                                                <div className="ml-3">
                                                    <p className="font-medium text-gray-800 text-sm">
                                                        {transaction.type === 'purchase' && `Compra en ${transaction.bakery}`}
                                                        {transaction.type === 'deposit' && `Depósito de ${transaction.source}`}
                                                        {transaction.type === 'buy' && `Compra de criptomoneda`}
                                                    </p>
                                                    {'product' in transaction && (
                                                        <p className="text-xs text-gray-500 flex items-center">
                                                            <Package className="w-3 h-3 mr-1" /> {transaction.product}
                                                        </p>
                                                    )}
                                                    <p className="text-xs text-gray-400 mt-1">
                                                        {new Date(transaction.date).toLocaleDateString('es-CO')}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className={`font-semibold text-sm ${transaction.type === 'purchase' ? 'text-red-500' : 'text-green-500'}`}>
                                                    {transaction.type === 'purchase' ? '-' : '+'}
                                                    {formatCurrency(transaction.amountCOP)}
                                                </p>
                                                {'cryptoPaid' in transaction && transaction.cryptoPaid && (
                                                    <p className="text-xs text-gray-600">
                                                        -{formatCrypto(transaction.cryptoPaid.amount, transaction.cryptoPaid.currency)}
                                                    </p>
                                                )}
                                                {'cryptoReceived' in transaction && transaction.cryptoReceived && (
                                                    <p className="text-xs text-gray-600">
                                                        +{formatCrypto(transaction.cryptoReceived.amount, transaction.cryptoReceived.currency)}
                                                    </p>
                                                )}
                                            </div>
                                        </motion.div>
                                    ))
                                ) : (
                                    <div className="text-center py-8 text-gray-600">
                                        <div className="text-4xl mb-3">📊</div>
                                        <p className="text-sm">Aún no hay transacciones.</p>
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

export default WalletPage;