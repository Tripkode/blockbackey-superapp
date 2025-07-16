"use client"

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    ChevronLeft,
    Star,
    MapPin,
    Timer,
    Clock,
    Heart,
    Plus,
    Tag,
    Info,
    Gift,
    ShoppingCart,
    Phone,
    Globe,
    Facebook,
    Instagram,
    DollarSign,
    Filter,
    CreditCard, // Used for digital currency
    Pocket,
    Zap,
    PiggyBank,
    Banknote,
    LineChart, // Keep for icon, but visual will be custom
    TrendingUp, // For price trend
    TrendingDown // For price trend
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const BakeryDetailPage = ({ params }: { params: Promise<{ username: string }> }) => {
    const router = useRouter();
    const [username, setUsername] = useState<string>('');
    
    useEffect(() => {
        const getUsername = async () => {
            const resolvedParams = await params;
            setUsername(resolvedParams.username);
        };
        getUsername();
    }, [params]);

    // Dummy data for a specific bakery
    const bakery = {
        id: 1,
        name: 'Artisan Corner',
        username: 'artisan-corner',
        tagline: 'Tradición desde 1987',
        description: 'En Artisan Corner, horneamos con pasión y tradición desde 1987. Cada producto es una obra de arte, elaborado con ingredientes frescos y naturales para brindarte una experiencia inigualable. ¡Ven y descubre el sabor de la verdadera panadería artesanal!',
        rating: 4.9,
        reviews: 234,
        deliveryTime: '15-20',
        nextBatch: 15,
        distance: '0.8 km',
        promotion: '-20%',
        featured: true,
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&h=400&fit=crop',
        address: 'Calle 10 # 5-22, Cali, Valle del Cauca',
        phone: '+57 310 123 4567',
        website: 'https://www.artisancorner.com',
        digitalCurrency: 'ARTIC', // Custom crypto name
        digitalCurrencyExchangeRate: 3500, // 1 ARTIC = 3500 COP (example rate)
        categories: ['Panes', 'Postres', 'Bebidas', 'Especiales'],
        social: {
            facebook: 'ArtisanCornerBakery',
            instagram: 'artisan_corner_cali',
        },
        products: [
            {
                name: 'Croissant Artesanal',
                price: 8500, // Price in COP
                originalPrice: 9500, // Price in COP
                image: 'https://images.unsplash.com/photo-1555507530-c54e82458e59?w=120&h=120&fit=crop',
                nextReady: 15,
                rating: 4.8,
                bestseller: true,
                category: 'Panes',
                description: 'Nuestro clásico croissant, hojaldrado a la perfección y con un sabor inconfundible a mantequilla. Crujiente por fuera, suave por dentro.'
            },
            {
                name: 'Pain au Chocolat',
                price: 7200,
                image: 'https://images.unsplash.com/photo-1578662996402-fdb17c7be2de?w=120&h=120&fit=crop',
                nextReady: 25,
                rating: 4.9,
                category: 'Panes',
                description: 'Delicioso pan con dos barras de chocolate oscuro, ideal para acompañar tu café o disfrutar en cualquier momento del día.'
            },
            {
                name: 'Brioche Francés',
                price: 9200,
                originalPrice: 10000,
                image: 'https://images.unsplash.com/photo-1586444248804-7c5f7b2c7d94?w=120&h=120&fit=crop',
                nextReady: 35,
                rating: 4.7,
                category: 'Panes',
                description: 'Suave y esponjoso brioche, perfecto para el desayuno o la merienda. Elaborado con mantequilla fresca y huevos.'
            },
            {
                name: 'Tarta de Frutas',
                price: 18000,
                image: 'https://images.unsplash.com/photo-1587314168485-3216d62d1d0c?w=120&h=120&fit=crop',
                nextReady: 45,
                rating: 4.6,
                category: 'Postres',
                description: 'Tarta fresca con una variedad de frutas de temporada y crema pastelera casera sobre una base de masa quebrada.'
            },
            {
                name: 'Pan de Masa Madre',
                price: 10500,
                image: 'https://images.unsplash.com/photo-1586444248804-7c5f7b2c7d94?w=120&h=120&fit=crop',
                nextReady: 20,
                rating: 4.9,
                bestseller: true,
                category: 'Panes',
                description: 'Nuestro famoso pan de masa madre, con corteza crujiente y miga aireada. Fermentado lentamente para un sabor profundo.'
            },
            {
                name: 'Muffin de Arándanos',
                price: 5500,
                image: 'https://images.unsplash.com/photo-1579306194848-eb8774771480?w=120&h=120&fit=crop',
                nextReady: 10,
                rating: 4.5,
                category: 'Postres',
                description: 'Muffin esponjoso relleno de jugosos arándanos, perfecto para una merienda rápida.'
            },
            {
                name: 'Café Americano',
                price: 4000,
                image: 'https://images.unsplash.com/photo-1517253874-a4f66450-482?w=120&h=120&fit=crop',
                nextReady: 5,
                rating: 4.7,
                category: 'Bebidas',
                description: 'Café clásico, preparado con granos selectos y un aroma irresistible.'
            },
        ]
    };

    const [favorites, setFavorites] = useState(new Set());
    const [activeCategory, setActiveCategory] = useState('Todos');

    // Function to format price in COP
    const formatPriceCOP = (price: number) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
        }).format(price);
    };

    // Function to format price in digital currency
    const formatPriceDigital = (priceCOP: number, exchangeRate: number, currencySymbol: string) => {
        if (exchangeRate === 0) return 'N/A'; // Avoid division by zero
        const digitalAmount = priceCOP / exchangeRate;
        return `${digitalAmount.toFixed(2)} ${currencySymbol}`;
    };

    const toggleFavorite = (productId: number | string) => {
        setFavorites(prev => {
            const newFavorites = new Set(prev);
            if (newFavorites.has(productId)) {
                newFavorites.delete(productId);
            } else {
                newFavorites.add(productId);
            }
            return newFavorites;
        });
    };

    const filteredProducts = activeCategory === 'Todos'
        ? bakery.products
        : bakery.products.filter(product => product.category === activeCategory);

    // Dummy data for crypto chart (for demonstration)
    const cryptoData = {
        currentPrice: 3500, // ARTIC price in COP (example)
        change24h: 150, // Example change in COP
        percentageChange: (150 / (3500 - 150) * 100).toFixed(2), // Calculate percentage
        trend: 'up', // 'up' or 'down'
        history: [
            3300, 3350, 3400, 3380, 3450, 3500, 3600 // Example historical data for a minimalist chart
        ]
    };

    if (!username) {
        return (
            <div className="min-h-screen flex items-center justify-center pt-20">
                <p className="text-gray-600 text-lg">Cargando...</p>
            </div>
        );
    }

    if (!bakery) {
        return (
            <div className="min-h-screen flex items-center justify-center pt-20">
                <p className="text-gray-600 text-lg">Panadería no encontrada.</p>
            </div>
        );
    }

    // Determine min/max for chart scaling
    const minHistoryVal = Math.min(...cryptoData.history);
    const maxHistoryVal = Math.max(...cryptoData.history);
    const historyRange = maxHistoryVal - minHistoryVal;

    return (
        <div className="min-h-screen relative overflow-hidden pt-20">
            {/* Fondo sutil con elementos flotantes */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-10 w-32 h-32 bg-amber-100/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-16 w-40 h-40 bg-orange-100/20 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-yellow-100/20 rounded-full blur-3xl"></div>
            </div>

            {/* Contenido principal */}
            <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-6">
                <div className="max-w-7xl mx-auto backdrop-blur-sm rounded-3xl overflow-hidden"
                >
                    {/* Header de la panadería con imagen */}
                    <div className="relative h-56 md:h-72">
                        <img
                            src={bakery.image}
                            alt={bakery.name}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                        {/* Botón de regreso */}
                        <motion.button
                            onClick={() => router.back()}
                            className="absolute top-4 left-4 p-2 rounded-full bg-white/30 text-white backdrop-blur-sm hover:bg-white/50 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </motion.button>

                        {/* Info de la panadería en el overlay */}
                        <div className="absolute bottom-4 left-4 right-4 text-white">
                            <div className="flex items-end justify-between">
                                <div>
                                    <h1 className="text-3xl font-bold mb-1">{bakery.name}</h1>
                                    <p className="text-white/90 text-sm mb-2">{bakery.tagline}</p>
                                    <div className="flex items-center gap-3 text-sm">
                                        <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-2 py-1">
                                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
                                            <span>{bakery.rating}</span>
                                            <span className="text-xs ml-1">({bakery.reviews})</span>
                                        </div>
                                        <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-2 py-1">
                                            <Clock className="w-3 h-3 mr-1" />
                                            <span>{bakery.deliveryTime}min</span>
                                        </div>
                                        <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-2 py-1">
                                            <MapPin className="w-3 h-3 mr-1" />
                                            <span>{bakery.distance}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    <motion.button
                                        onClick={() => toggleFavorite(bakery.id)}
                                        className={`p-2 rounded-full backdrop-blur-sm transition-all ${favorites.has(bakery.id)
                                            ? 'bg-red-500 text-white'
                                            : 'bg-white/20 text-white hover:bg-white/30'
                                            }`}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <Heart className={`w-4 h-4 ${favorites.has(bakery.id) ? 'fill-current' : ''}`} />
                                    </motion.button>
                                    {bakery.promotion && (
                                        <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center">
                                            <Tag className="w-3 h-3 mr-1" /> {bakery.promotion}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sección de Descripción e Información */}
                    <div className="p-6 border-b border-gray-100">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-3 flex items-center">
                            <Info className="w-5 h-5 mr-2 text-amber-500" />
                            Sobre {bakery.name}
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            {bakery.description}
                        </p>

                        {/* Contact Information - Now a single responsive row */}
                        <div className="flex flex-wrap items-center justify-between gap-4 text-gray-700 text-sm mb-6">
                            <motion.div
                                className="flex items-center p-3 rounded-xl bg-gray-50 flex-grow" // Use flex-grow for responsiveness
                                style={{ boxShadow: 'inset 2px 2px 5px rgba(0,0,0,0.05), inset -2px -2px 5px rgba(255,255,255,0.9)' }}
                                whileHover={{ scale: 1.02 }}
                            >
                                <MapPin className="w-4 h-4 mr-2 text-orange-500" />
                                <span>{bakery.address}</span>
                            </motion.div>
                            <motion.div
                                className="flex items-center p-3 rounded-xl bg-gray-50 flex-grow" // Use flex-grow for responsiveness
                                style={{ boxShadow: 'inset 2px 2px 5px rgba(0,0,0,0.05), inset -2px -2px 5px rgba(255,255,255,0.9)' }}
                                whileHover={{ scale: 1.02 }}
                            >
                                <Phone className="w-4 h-4 mr-2 text-orange-500" />
                                <a href={`tel:${bakery.phone}`} className="hover:underline whitespace-nowrap">{bakery.phone}</a> {/* whitespace-nowrap to prevent breaking */}
                            </motion.div>
                            <motion.div
                                className="flex items-center p-3 rounded-xl bg-gray-50 flex-grow" // Use flex-grow for responsiveness
                                style={{ boxShadow: 'inset 2px 2px 5px rgba(0,0,0,0.05), inset -2px -2px 5px rgba(255,255,255,0.9)' }}
                                whileHover={{ scale: 1.02 }}
                            >
                                <Globe className="w-4 h-4 mr-2 text-orange-500" />
                                <a href={bakery.website} target="_blank" rel="noopener noreferrer" className="hover:underline whitespace-nowrap">Visitar sitio web</a> {/* whitespace-nowrap to prevent breaking */}
                            </motion.div>
                        </div>

                        {/* Social Media Links and Digital Currency Chart */}
                        <div className="mt-6 flex flex-col md:flex-row gap-6">
                            {/* Social Media Links */}
                            <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                                    <span className="mr-2 text-amber-500">🔗</span> Redes Sociales
                                </h3>
                                <div className="flex items-center gap-4 h-24">
                                    {bakery.social.facebook && (
                                        <motion.a
                                            href={`https://facebook.com/${bakery.social.facebook}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:text-blue-800 transition-colors p-3 rounded-full bg-gray-50 flex items-center justify-center"
                                            style={{ boxShadow: '2px 2px 5px rgba(0,0,0,0.1), -2px -2px 5px rgba(255,255,255,0.8)' }}
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            <Facebook className="w-5 h-5" />
                                        </motion.a>
                                    )}
                                    {bakery.social.instagram && (
                                        <motion.a
                                            href={`https://instagram.com/${bakery.social.instagram}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-pink-500 hover:text-pink-700 transition-colors p-3 rounded-full bg-gray-50 flex items-center justify-center"
                                            style={{ boxShadow: '2px 2px 5px rgba(0,0,0,0.1), -2px -2px 5px rgba(255,255,255,0.8)' }}
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            <Instagram className="w-5 h-5" />
                                        </motion.a>
                                    )}
                                </div>
                            </div>

                            {/* Digital Currency Chart - More compact and responsive */}
                            <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                                    <CreditCard className="w-5 h-5 mr-2 text-green-600" />
                                    Valor de {bakery.digitalCurrency}
                                </h3>
                                <motion.div
                                    className="bg-gray-50 rounded-xl p-4 flex items-center justify-between"
                                    style={{ boxShadow: 'inset 2px 2px 5px rgba(0,0,0,0.05), inset -2px -2px 5px rgba(255,255,255,0.9)', height: '96px' }}
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <div className="flex flex-col justify-center flex-grow"> {/* Info column takes available space */}
                                        <div className="flex items-center mb-1">
                                            <CreditCard className="w-6 h-6 mr-3 text-green-600" />
                                            <div>
                                                <p className="text-xl font-bold text-gray-900 leading-tight">{bakery.digitalCurrency}: {formatPriceCOP(bakery.digitalCurrencyExchangeRate)}</p>
                                                <div className={`flex items-center text-sm ${cryptoData.trend === 'up' ? 'text-green-500' : 'text-red-500'} mt-1`}>
                                                    {cryptoData.trend === 'up' ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                                                    <span>{formatPriceCOP(cryptoData.change24h)} ({cryptoData.percentageChange}%)</span>
                                                    <span className="ml-1 text-gray-500"> (24h)</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Minimalist Line Chart - Occupies remaining space */}
                                    <div className="relative h-full w-24 sm:w-32 flex-shrink-0"> {/* Fixed width for chart, can adjust as needed */}
                                        <svg width="100%" height="100%" viewBox={`0 0 ${cryptoData.history.length * 20} 100`} preserveAspectRatio="none">
                                            <polyline
                                                fill="none"
                                                stroke={cryptoData.trend === 'up' ? "#4CAF50" : "#F44336"}
                                                strokeWidth="2"
                                                points={cryptoData.history.map((value, index) => {
                                                    const y = 100 - ((value - minHistoryVal) / historyRange) * 100;
                                                    const x = index * 20;
                                                    return `${x},${y}`;
                                                }).join(' ')}
                                            />
                                            {cryptoData.history.map((value, index) => {
                                                const y = 100 - ((value - minHistoryVal) / historyRange) * 100;
                                                const x = index * 20;
                                                return (
                                                    <circle
                                                        key={index}
                                                        cx={x}
                                                        cy={y}
                                                        r="3"
                                                        fill={cryptoData.trend === 'up' ? "#4CAF50" : "#F44336"}
                                                        stroke="white"
                                                        strokeWidth="1"
                                                    />
                                                );
                                            })}
                                        </svg>
                                        <p className="text-xs text-gray-500 text-center absolute -bottom-4 left-0 w-full">Gráfico (24h)</p> {/* More compact text */}
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>


                    {/* Sección de Productos */}
                    <div className="p-6">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                            <ShoppingCart className="w-5 h-5 mr-2 text-amber-500" />
                            Nuestros Productos
                        </h2>

                        {/* Filtros de Categoría */}
                        <div className="flex flex-wrap gap-3 mb-6">
                            <motion.button
                                onClick={() => setActiveCategory('Todos')}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${activeCategory === 'Todos'
                                    ? 'bg-amber-500 text-white shadow-md'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Todos
                            </motion.button>
                            {bakery.categories.map((category) => (
                                <motion.button
                                    key={category}
                                    onClick={() => setActiveCategory(category)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${activeCategory === category
                                        ? 'bg-amber-500 text-white shadow-md'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                        }`}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {category}
                                </motion.button>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((product, idx) => (
                                    <motion.div
                                        key={idx}
                                        className="bg-gray-50 rounded-2xl p-4 group hover:shadow-lg transition-all duration-300 relative"
                                        style={{
                                            boxShadow: '6px 6px 12px rgba(0, 0, 0, 0.1), -6px -6px 12px rgba(255, 255, 255, 0.8)'
                                        }}
                                        whileHover={{ y: -4 }}
                                    >
                                        <div className="relative mb-3 h-32">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-full h-full object-cover rounded-xl"
                                            />
                                            {product.bestseller && (
                                                <div className="absolute top-2 left-2 bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center">
                                                    <Gift className="w-3 h-3 mr-1" /> Bestseller
                                                </div>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <h3 className="font-semibold text-gray-900 text-lg">
                                                {product.name}
                                            </h3>
                                            <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>

                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <div className="flex items-center">
                                                        <Star className="w-3 h-3 fill-amber-400 text-amber-400 mr-1" />
                                                        <span className="text-xs text-gray-600">{product.rating}</span>
                                                    </div>
                                                    <div className="flex items-center text-xs text-gray-500">
                                                        <Clock className="w-3 h-3 mr-1" />
                                                        {product.nextReady}min
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Price in COP and Digital Currency */}
                                            <div className="flex flex-col pt-2">
                                                <div className="flex items-baseline gap-2">
                                                    <span className="text-amber-600 font-bold text-lg">
                                                        {formatPriceCOP(product.price)}
                                                    </span>
                                                    {'originalPrice' in product && product.originalPrice !== undefined && (
                                                        <span className="text-gray-400 line-through text-sm">
                                                            {formatPriceCOP(product.originalPrice)}
                                                        </span>
                                                    )}
                                                </div>
                                                <span className="text-gray-500 text-xs mt-0.5">
                                                    ~{formatPriceDigital(product.price, bakery.digitalCurrencyExchangeRate, bakery.digitalCurrency)}
                                                </span>
                                            </div>

                                            <div className="flex justify-end pt-2">
                                                <motion.button
                                                    className="bg-amber-500 text-white p-3 rounded-full hover:bg-amber-600 transition-colors"
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                >
                                                    <Plus className="w-5 h-5" />
                                                </motion.button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <p className="col-span-full text-center text-gray-600 text-lg py-10">
                                    No hay productos en esta categoría.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BakeryDetailPage;