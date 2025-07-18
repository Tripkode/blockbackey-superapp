"use client"

import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    CheckCircle,
    Clock,
    XCircle,
    AlertCircle,
    MapPin,
    Calendar,
    CreditCard,
    Gift,
    ArrowLeftRight,
    ShoppingBag,
    Receipt,
    Building,
    User,
    Hash,
    TrendingUp,
    TrendingDown,
    Star,
    Award,
    Zap,
    Info,
    Copy,
    ExternalLink
} from 'lucide-react';

function TransactionPage({ params }: { params: Promise<{ transactionId: string }> }) {
    const [transactionId, setTransactionId] = useState('');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const getTransactionId = async () => {
            const resolvedParams = await params;
            setTransactionId(resolvedParams.transactionId);
        };
        getTransactionId();
    }, [params]);

    // Mock data basado en el ID de transacción
    const getTransactionData = (id: string) => {
        const transactions = {
            'tx-001': {
                id: 'tx-001',
                type: 'physical_purchase',
                status: 'completed',
                title: 'Compra en Panadería',
                description: 'Croissant Premium + Café Americano',
                amount: 3.5,
                currency: 'BREAD',
                fiatAmount: 32500,
                fiatCurrency: 'COP',
                date: '2025-07-15T14:30:00Z',
                location: {
                    name: 'Esquina Artesanal',
                    address: 'Carrera 15 #85-20, Bogotá',
                    coordinates: { lat: 4.6697, lng: -74.0428 }
                },
                receipt: {
                    items: [
                        { name: 'Croissant Premium', price: 18000, quantity: 1 },
                        { name: 'Café Americano', price: 12000, quantity: 1 },
                        { name: 'Impuesto', price: 2500, quantity: 1 }
                    ],
                    total: 32500,
                    paymentMethod: 'Tarjeta de Crédito',
                    cardLast4: '4532'
                },
                reward: {
                    percentage: 1.5,
                    earned: 3.5,
                    description: 'Recompensa por compra elegible'
                },
                transactionHash: 'bread_tx_7f2a9c8e4d1b3f5a6e8c9d2f4a7b1c3e5d6f8a9b2c4e7f1a3d5b8c9e2f4a6b7c8d',
                networkFee: 0.02,
                processedBy: 'BreadNetwork v2.1',
                confirmations: 12
            },
            'tx-002': {
                id: 'tx-002',
                type: 'fiat_purchase',
                status: 'completed',
                title: 'Compra de BREAD con Fiat',
                description: 'Inversión directa en BreadCoin',
                amount: 25.0,
                currency: 'BREAD',
                fiatAmount: 4200000,
                fiatCurrency: 'COP',
                priceAtPurchase: 168000,
                date: '2025-07-12T09:15:00Z',
                paymentMethod: {
                    type: 'bank_transfer',
                    bank: 'Bancolombia',
                    accountLast4: '8291'
                },
                fees: {
                    platform: 42000,
                    network: 8400,
                    total: 50400
                },
                transactionHash: 'bread_tx_9a3c7e2f8b4d1a6f9c2e5b8d1f4a7c3e9b6f2a8d5c1e7f4a9b3c6e2d8f5a1b7c9',
                networkFee: 0.05,
                processedBy: 'BreadExchange v3.2',
                confirmations: 6
            },
            'tx-003': {
                id: 'tx-003',
                type: 'crypto_exchange',
                status: 'pending',
                title: 'Intercambio CRSS → BREAD',
                description: 'Conversión entre criptomonedas',
                amount: 12.8,
                currency: 'BREAD',
                fromAmount: 15.0,
                fromCurrency: 'CRSS',
                exchangeRate: 0.85,
                date: '2025-07-08T16:45:00Z',
                estimatedCompletion: '2025-07-08T17:00:00Z',
                slippage: 0.5,
                fees: {
                    exchange: 0.3,
                    network: 0.15,
                    total: 0.45
                },
                transactionHash: 'bread_tx_5d8a2f7c1e9b4a6d2f8c5e1b7a4d9c3f6e2a8d5c1f7b4e9a3c6d2f8b5a1c7e4d9',
                networkFee: 0.03,
                processedBy: 'BreadSwap v1.8',
                confirmations: 3,
                requiredConfirmations: 6
            }
        };

        return transactions[id as keyof typeof transactions] || transactions['tx-001'];
    };

    const transaction = getTransactionData(transactionId);

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'completed':
                return <CheckCircle className="w-4 h-4 text-green-500" />;
            case 'pending':
                return <Clock className="w-4 h-4 text-yellow-500" />;
            case 'failed':
                return <XCircle className="w-4 h-4 text-red-500" />;
            default:
                return <AlertCircle className="w-4 h-4 text-gray-500" />;
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'completed':
                return 'Completada';
            case 'pending':
                return 'Pendiente';
            case 'failed':
                return 'Fallida';
            default:
                return 'Desconocida';
        }
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'physical_purchase':
                return <ShoppingBag className="w-5 h-5 text-amber-500" />;
            case 'fiat_purchase':
                return <CreditCard className="w-5 h-5 text-blue-500" />;
            case 'crypto_exchange':
                return <ArrowLeftRight className="w-5 h-5 text-purple-500" />;
            default:
                return <Info className="w-5 h-5 text-gray-500" />;
        }
    };

    const getTypeLabel = (type: string) => {
        switch (type) {
            case 'physical_purchase':
                return 'Compra Física';
            case 'fiat_purchase':
                return 'Compra con Fiat';
            case 'crypto_exchange':
                return 'Intercambio Cripto';
            default:
                return 'Transacción';
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    const formatCrypto = (amount: number, currency: string) => {
        return `${amount.toFixed(2)} ${currency}`;
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('es-CO', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-gray-50 relative overflow-hidden pt-23 sm:pt-16">
            {/* Fondo sutil */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-16 left-8 w-24 h-24 bg-amber-100/15 rounded-full blur-3xl"></div>
                <div className="absolute bottom-16 right-8 w-32 h-32 bg-orange-100/15 rounded-full blur-3xl"></div>
            </div>

            {/* Contenido principal */}
            <div className="relative z-10 max-w-4xl mx-auto px-4 py-6">

                {/* Header compacto */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex items-center mb-4"
                >
                    <button
                        onClick={() => window.history.back()}
                        className="p-2 hover:bg-white/40 rounded-xl transition-colors mr-2"
                    >
                        <ArrowLeft className="w-5 h-5 text-gray-600" />
                    </button>
                    <h1 className="text-lg font-semibold text-gray-900">Transacción</h1>
                </motion.div>

                {/* Card principal de transacción */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/30 shadow-sm p-4 mb-4"
                >
                    {/* Header de la transacción */}
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                {getTypeIcon(transaction.type)}
                            </div>
                            <div>
                                <h2 className="font-semibold text-gray-900 text-sm">{transaction.title}</h2>
                                <p className="text-xs text-gray-600">{transaction.description}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-lg font-bold text-gray-900">
                                +{formatCrypto(transaction.amount, transaction.currency)}
                            </p>
                            <p className="text-xs text-gray-600">
                                {'fiatAmount' in transaction ? formatCurrency(transaction.fiatAmount) : ''}
                            </p>
                        </div>
                    </div>

                    {/* Status y fecha */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            {getStatusIcon(transaction.status)}
                            <span className="text-sm text-gray-700">{getStatusLabel(transaction.status)}</span>
                            <span className="px-2 py-1 bg-gray-100 text-xs rounded-full text-gray-600">
                                {getTypeLabel(transaction.type)}
                            </span>
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-gray-500">{formatDate(transaction.date)}</p>
                        </div>
                    </div>
                </motion.div>

                {/* Contenido específico por tipo */}
                {transaction.type === 'physical_purchase' && transaction.location && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/30 shadow-sm p-4 mb-4"
                    >
                        <div className="flex items-start space-x-3 mb-3">
                            <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                                <MapPin className="w-4 h-4 text-amber-600" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-medium text-gray-900 text-sm">{transaction.location.name}</h3>
                                <p className="text-xs text-gray-600">{transaction.location.address}</p>
                            </div>
                        </div>

                        {'receipt' in transaction && transaction.receipt && (
                            <div className="bg-gray-50/70 rounded-xl p-3">
                                <div className="flex items-center mb-2">
                                    <Receipt className="w-4 h-4 text-gray-500 mr-2" />
                                    <span className="text-sm font-medium text-gray-700">Recibo</span>
                                </div>
                                <div className="space-y-1">
                                    {transaction.receipt.items.map((item: any, index: number) => (
                                        <div key={index} className="flex justify-between text-sm">
                                            <span className="text-gray-600">{item.name}</span>
                                            <span className="text-gray-900">{formatCurrency(item.price)}</span>
                                        </div>
                                    ))}
                                    <div className="border-t pt-2 mt-2 flex justify-between font-medium text-sm">
                                        <span>Total</span>
                                        <span>{formatCurrency(transaction.receipt.total)}</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {'reward' in transaction && transaction.reward && (
                            <div className="bg-green-50/70 rounded-xl p-3 mt-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <Star className="w-4 h-4 text-green-500 mr-2" />
                                        <span className="text-sm font-medium text-green-700">Recompensa</span>
                                    </div>
                                    <span className="text-sm font-bold text-green-700">
                                        +{formatCrypto(transaction.reward.earned, transaction.currency)}
                                    </span>
                                </div>
                            </div>
                        )}
                    </motion.div>
                )}

                {transaction.type === 'fiat_purchase' && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/30 shadow-sm p-4 mb-4"
                    >
                        <div className="grid grid-cols-2 gap-3 mb-3">
                            <div className="bg-blue-50/70 rounded-xl p-3">
                                <div className="flex items-center mb-1">
                                    <TrendingUp className="w-4 h-4 text-blue-500 mr-2" />
                                    <span className="text-xs font-medium text-blue-700">Precio</span>
                                </div>
                                <p className="text-sm font-bold text-blue-900">
                                    {'priceAtPurchase' in transaction ? formatCurrency(transaction.priceAtPurchase) : null}
                                </p>
                            </div>

                            <div className="bg-gray-50/70 rounded-xl p-3">
                                <div className="flex items-center mb-1">
                                    <Building className="w-4 h-4 text-gray-500 mr-2" />
                                    <span className="text-xs font-medium text-gray-700">Método</span>
                                </div>
                                <p className="text-sm text-gray-900">
                                    {'paymentMethod' in transaction && transaction.paymentMethod?.type === 'bank_transfer' ? 'Transferencia' : 'Tarjeta'}
                                </p>
                            </div>
                        </div>

                        {'fees' in transaction && transaction.fees && (
                            <div className="bg-gray-50/70 rounded-xl p-3">
                                <div className="flex items-center mb-2">
                                    <Receipt className="w-4 h-4 text-gray-500 mr-2" />
                                    <span className="text-sm font-medium text-gray-700">Comisiones</span>
                                </div>
                                <div className="space-y-1 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Plataforma</span>
                                        <span className="text-gray-900">{formatCurrency(transaction.fees.platform)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Red</span>
                                        <span className="text-gray-900">{formatCurrency(transaction.fees.network)}</span>
                                    </div>
                                    <div className="border-t pt-1 mt-1 flex justify-between font-medium">
                                        <span>Total</span>
                                        <span>{formatCurrency(transaction.fees.total)}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                )}

                {transaction.type === 'crypto_exchange' && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/30 shadow-sm p-4 mb-4"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <div className="text-center">
                                <p className="text-xs text-gray-600">Envías</p>
                                <p className="text-sm font-bold text-purple-900">
                                    {'fromAmount' in transaction && 'fromCurrency' in transaction ?
                                        formatCrypto(transaction.fromAmount, transaction.fromCurrency) : null}
                                </p>
                            </div>
                            <ArrowLeftRight className="w-5 h-5 text-purple-500" />
                            <div className="text-center">
                                <p className="text-xs text-gray-600">Recibes</p>
                                <p className="text-sm font-bold text-green-900">
                                    {formatCrypto(transaction.amount, transaction.currency)}
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-gray-50/70 rounded-xl p-3">
                                <div className="flex items-center mb-1">
                                    <TrendingUp className="w-4 h-4 text-gray-500 mr-2" />
                                    <span className="text-xs font-medium text-gray-700">Tasa</span>
                                </div>
                                <p className="text-sm font-bold text-gray-900">
                                    {'exchangeRate' in transaction ? transaction.exchangeRate : null}
                                </p>
                            </div>

                            <div className="bg-yellow-50/70 rounded-xl p-3">
                                <div className="flex items-center mb-1">
                                    <AlertCircle className="w-4 h-4 text-yellow-500 mr-2" />
                                    <span className="text-xs font-medium text-yellow-700">Slippage</span>
                                </div>
                                <p className="text-sm font-bold text-yellow-900">
                                    {'slippage' in transaction ? transaction.slippage + '%' : null}
                                </p>
                            </div>
                        </div>

                        {transaction.status === 'pending' && (
                            <div className="bg-yellow-50/70 rounded-xl p-3 mt-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <Clock className="w-4 h-4 text-yellow-500 mr-2" />
                                        <span className="text-sm font-medium text-yellow-700">Procesando</span>
                                    </div>
                                    <span className="text-sm text-yellow-600">
                                        {transaction.confirmations}{'requiredConfirmations' in transaction ? `/${transaction.requiredConfirmations}` : ''} confirmaciones
                                    </span>
                                </div>
                            </div>
                        )}
                    </motion.div>
                )}

                {/* Información técnica compacta */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/30 shadow-sm p-4"
                >
                    <h3 className="font-medium text-gray-900 mb-3 text-sm">Información Técnica</h3>

                    <div className="space-y-3">
                        <div className="bg-gray-50/70 rounded-xl p-3">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center">
                                    <Hash className="w-4 h-4 text-gray-500 mr-2" />
                                    <span className="text-xs font-medium text-gray-700">Hash</span>
                                </div>
                                <button
                                    onClick={() => copyToClipboard(transaction.transactionHash)}
                                    className="p-1 hover:bg-gray-200 rounded text-gray-500 hover:text-gray-700 transition-colors"
                                >
                                    {copied ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                                </button>
                            </div>
                            <p className="text-xs text-gray-600 font-mono break-all leading-relaxed">
                                {transaction.transactionHash}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-gray-50/70 rounded-xl p-3">
                                <div className="flex items-center mb-1">
                                    <Zap className="w-4 h-4 text-gray-500 mr-2" />
                                    <span className="text-xs font-medium text-gray-700">Comisión Red</span>
                                </div>
                                <p className="text-sm text-gray-900">{formatCrypto(transaction.networkFee, transaction.currency)}</p>
                            </div>

                            <div className="bg-gray-50/70 rounded-xl p-3">
                                <div className="flex items-center mb-1">
                                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                    <span className="text-xs font-medium text-green-700">Confirmaciones</span>
                                </div>
                                <p className="text-sm text-green-600">{transaction.confirmations}</p>
                            </div>
                        </div>

                        <div className="bg-gray-50/70 rounded-xl p-3">
                            <div className="flex items-center mb-1">
                                <Info className="w-4 h-4 text-gray-500 mr-2" />
                                <span className="text-xs font-medium text-gray-700">Procesado por</span>
                            </div>
                            <p className="text-sm text-gray-900">{transaction.processedBy}</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default TransactionPage;