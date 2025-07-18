'use client'

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, CreditCard, Plus, X, Zap, Check, Minus } from 'lucide-react';

// Tipos para nuestros datos
interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    bakeryId: string;
}

interface PaymentCard {
    id: string;
    last4: string;
    brand: string;
    expiration: string;
}

interface CryptoWallet {
    id: string;
    name: string;
    symbol: string;
    balance: number;
    bakeryId: string;
    exchangeRate: number;
}

const CartPage = () => {
    // Estado del carrito
    const [cartItems, setCartItems] = useState<CartItem[]>([
        {
            id: '1',
            name: 'Croissant Artesanal',
            price: 8500,
            quantity: 2,
            image: 'https://images.unsplash.com/photo-1555507530-c54e82458e59?w=120&h=120&fit=crop',
            bakeryId: 'artisan-corner'
        },
        {
            id: '2',
            name: 'Baguette Premium',
            price: 4800,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=120&h=120&fit=crop',
            bakeryId: 'boulangerie-moderne'
        },
        {
            id: '3',
            name: 'Sourdough Clásico',
            price: 12000,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1586444248804-7c5f7b2c7d94?w=120&h=120&fit=crop',
            bakeryId: 'sourdough-co'
        }
    ]);

    // Estado para el modal de pago
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [paymentMode, setPaymentMode] = useState<'fiat' | 'crypto'>('fiat');
    const [selectedCard, setSelectedCard] = useState<string | null>(null);
    const [selectedCrypto, setSelectedCrypto] = useState<string | null>(null);
    const [rewardInfo, setRewardInfo] = useState<{ amount: number, currency: string } | null>(null);

    // Tarjetas simuladas
    const [paymentCards] = useState<PaymentCard[]>([
        { id: 'card1', last4: '1234', brand: 'Visa', expiration: '12/25' },
        { id: 'card2', last4: '5678', brand: 'Mastercard', expiration: '08/24' }
    ]);

    // Criptomonedas simuladas
    const [cryptoWallets] = useState<CryptoWallet[]>([
        { id: 'pan', name: 'PanCoin', symbol: 'PAN', balance: 150, bakeryId: 'artisan-corner', exchangeRate: 1 },
        { id: 'brd', name: 'BreadToken', symbol: 'BRD', balance: 75, bakeryId: 'boulangerie-moderne', exchangeRate: 0.95 },
        { id: 'cro', name: 'CroissantCoin', symbol: 'CRO', balance: 200, bakeryId: 'sourdough-co', exchangeRate: 1.05 }
    ]);

    // Calcular totales
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.08;
    const total = subtotal + tax;

    // Actualizar cantidad
    const updateQuantity = (id: string, newQuantity: number) => {
        if (newQuantity === 0) {
            removeItem(id);
            return;
        }
        setCartItems(prev =>
            prev.map(item =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    // Eliminar un item del carrito
    const removeItem = (id: string) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    // Calcular recompensas
    const calculateRewards = () => {
        if (!selectedCrypto) return null;

        const selected = cryptoWallets.find(c => c.id === selectedCrypto);
        if (!selected) return null;

        const bakeryIds = cartItems.map(item => item.bakeryId);
        const isNativeCurrency = bakeryIds.includes(selected.bakeryId);

        if (isNativeCurrency) return null;

        const rewardPercentage = Math.min(0.06, 0.03 + (Math.random() * 0.03));
        const rewardAmount = total * rewardPercentage;

        return {
            amount: rewardAmount,
            currency: 'PAN'
        };
    };

    // Efecto para recalcular recompensas
    useEffect(() => {
        if (paymentMode === 'crypto' && selectedCrypto) {
            setRewardInfo(calculateRewards());
        } else {
            setRewardInfo(null);
        }
    }, [selectedCrypto, paymentMode]);

    // Formatear precios
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
        }).format(price);
    };

    // Manejar el pago
    const handlePayment = () => {
        alert('¡Pago realizado con éxito!');
        setShowPaymentModal(false);
        setCartItems([]);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 mt-20">
            <div className="max-w-7xl mx-auto">
                {/* Título principal */}
                <div className="text-start mb-8">
                    <h1 className="text-3xl font-light text-gray-900 mb-2">Carrito de Compras</h1>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Lista de productos */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                            <div className="p-6 border-b border-gray-50">
                                <h2 className="text-lg font-medium text-gray-900">
                                    Productos ({cartItems.length})
                                </h2>
                            </div>

                            <div className="divide-y divide-gray-50">
                                {cartItems.length === 0 ? (
                                    <div className="p-12 text-center">
                                        <div className="text-5xl mb-4 opacity-40">🛒</div>
                                        <p className="text-gray-500">Tu carrito está vacío</p>
                                    </div>
                                ) : (
                                    cartItems.map((item) => (
                                        <motion.div
                                            key={item.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            className="p-6 hover:bg-gray-25 transition-colors"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>

                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-medium text-gray-900 truncate">
                                                        {item.name}
                                                    </h3>
                                                    <p className="text-sm text-gray-500 mt-1">
                                                        {formatPrice(item.price)}
                                                    </p>
                                                </div>

                                                <div className="flex items-center gap-3">
                                                    <div className="flex items-center rounded-lg border border-gray-200 bg-white">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            className="p-2 hover:bg-gray-50 rounded-l-lg transition-colors"
                                                        >
                                                            <Minus size={14} />
                                                        </button>
                                                        <span className="px-3 py-2 text-sm font-medium min-w-[40px] text-center">
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            className="p-2 hover:bg-gray-50 rounded-r-lg transition-colors"
                                                        >
                                                            <Plus size={14} />
                                                        </button>
                                                    </div>

                                                    <button
                                                        onClick={() => removeItem(item.id)}
                                                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Resumen y pago */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 sticky top-8">
                            <div className="p-6 border-b border-gray-50">
                                <h2 className="text-lg font-medium text-gray-900">Resumen</h2>
                            </div>

                            <div className="p-6 space-y-4">
                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Subtotal</span>
                                        <span className="text-gray-900">{formatPrice(subtotal)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Impuestos</span>
                                        <span className="text-gray-900">{formatPrice(tax)}</span>
                                    </div>
                                    <div className="pt-3 border-t border-gray-100 flex justify-between">
                                        <span className="font-medium text-gray-900">Total</span>
                                        <span className="font-bold text-amber-600">{formatPrice(total)}</span>
                                    </div>
                                </div>

                                {/* Recompensas */}
                                {cartItems.length > 0 && (
                                    <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
                                        <div className="flex items-center text-amber-700 mb-1">
                                            <Zap size={16} className="mr-2" />
                                            <span className="text-sm font-medium">Recompensas estimadas</span>
                                        </div>
                                        <p className="text-sm text-amber-600">
                                            +25 PAN por esta compra
                                        </p>
                                    </div>
                                )}

                                {/* Botón de pago */}
                                {cartItems.length > 0 && (
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setShowPaymentModal(true)}
                                        className="w-full bg-gray-900 text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors"
                                    >
                                        Proceder al pago
                                    </motion.button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal de pago */}
            <AnimatePresence>
                {showPaymentModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50"
                        onClick={() => setShowPaymentModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-hidden"
                            onClick={e => e.stopPropagation()}
                        >
                            {/* Header */}
                            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                                <h2 className="text-xl font-medium text-gray-900">Método de pago</h2>
                                <button
                                    onClick={() => setShowPaymentModal(false)}
                                    className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Tabs */}
                            <div className="p-6 border-b border-gray-50">
                                <div className="flex bg-gray-100 rounded-xl p-1">
                                    <button
                                        className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${paymentMode === 'fiat'
                                                ? 'bg-white text-gray-900 shadow-sm'
                                                : 'text-gray-600 hover:text-gray-900'
                                            }`}
                                        onClick={() => setPaymentMode('fiat')}
                                    >
                                        Tarjetas
                                    </button>
                                    <button
                                        className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${paymentMode === 'crypto'
                                                ? 'bg-white text-gray-900 shadow-sm'
                                                : 'text-gray-600 hover:text-gray-900'
                                            }`}
                                        onClick={() => setPaymentMode('crypto')}
                                    >
                                        Criptomonedas
                                    </button>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 max-h-[50vh] overflow-y-auto">
                                {paymentMode === 'fiat' ? (
                                    <div className="space-y-4">
                                        {paymentCards.map(card => (
                                            <div
                                                key={card.id}
                                                className={`p-4 rounded-xl border cursor-pointer transition-all ${selectedCard === card.id
                                                        ? 'border-amber-300 bg-amber-50 shadow-sm'
                                                        : 'border-gray-200 hover:border-gray-300'
                                                    }`}
                                                onClick={() => setSelectedCard(card.id)}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded flex items-center justify-center">
                                                            <CreditCard size={14} className="text-white" />
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-gray-900">
                                                                {card.brand} •••• {card.last4}
                                                            </p>
                                                            <p className="text-sm text-gray-500">
                                                                Vence {card.expiration}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    {selectedCard === card.id && (
                                                        <div className="w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center">
                                                            <Check size={12} className="text-white" />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {cryptoWallets.map(crypto => (
                                            <div
                                                key={crypto.id}
                                                className={`p-4 rounded-xl border cursor-pointer transition-all ${selectedCrypto === crypto.id
                                                        ? 'border-amber-300 bg-amber-50 shadow-sm'
                                                        : 'border-gray-200 hover:border-gray-300'
                                                    }`}
                                                onClick={() => setSelectedCrypto(crypto.id)}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full flex items-center justify-center text-white font-bold">
                                                            {crypto.symbol.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-gray-900">
                                                                {crypto.name}
                                                            </p>
                                                            <p className="text-sm text-gray-500">
                                                                Balance: {crypto.balance.toFixed(2)} {crypto.symbol}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    {selectedCrypto === crypto.id && (
                                                        <div className="w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center">
                                                            <Check size={12} className="text-white" />
                                                        </div>
                                                    )}
                                                </div>

                                                {selectedCrypto === crypto.id && rewardInfo && (
                                                    <div className="mt-3 pt-3 border-t border-amber-100">
                                                        <div className="flex items-center text-amber-700 text-sm">
                                                            <Zap size={14} className="mr-2" />
                                                            <span>
                                                                Ganarás {rewardInfo.amount.toFixed(2)} {rewardInfo.currency} adicionales
                                                            </span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}

                                        {/* Información de recompensas */}
                                        <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                                            <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                                                <Zap size={16} className="mr-2 text-amber-500" />
                                                Programa de recompensas
                                            </h4>
                                            <p className="text-sm text-gray-600">
                                                Paga con criptomonedas de otras panaderías y gana PAN como recompensa.
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="p-6 border-t border-gray-100 bg-gray-50">
                                <div className="space-y-2 mb-4">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Total</span>
                                        <span className="font-medium text-gray-900">{formatPrice(total)}</span>
                                    </div>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handlePayment}
                                    disabled={
                                        (paymentMode === 'fiat' && !selectedCard) ||
                                        (paymentMode === 'crypto' && !selectedCrypto)
                                    }
                                    className={`w-full py-3 rounded-xl font-medium transition-colors ${(paymentMode === 'fiat' && selectedCard) ||
                                            (paymentMode === 'crypto' && selectedCrypto)
                                            ? 'bg-gray-900 text-white hover:bg-gray-800'
                                            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                        }`}
                                >
                                    Confirmar pago
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CartPage;