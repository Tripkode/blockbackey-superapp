"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { Search, Star, ChevronRight, MapPin, Timer, Zap, Clock, Heart, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

const BakeryHeroSection = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentSlide, setCurrentSlide] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState('populares');
    const [favorites, setFavorites] = useState(new Set());
    const [isDragging, setIsDragging] = useState(false);
    const router = useRouter();

    const categories = [
        { id: 'populares', name: 'Populares', icon: Zap, color: 'from-amber-400 to-orange-400' },
        { id: 'promociones', name: 'Ofertas', icon: Star, color: 'from-rose-400 to-pink-400' },
        { id: 'cerca', name: 'Cerca', icon: MapPin, color: 'from-blue-400 to-cyan-400' },
        { id: 'recientes', name: 'Frescos', icon: Timer, color: 'from-green-400 to-emerald-400' }
    ];

    const bakeries = [
        {
            id: 1,
            name: 'Artisan Corner',
            username: 'artisan-corner',
            tagline: 'Tradición desde 1987',
            rating: 4.9,
            reviews: 234,
            deliveryTime: '15-20',
            nextBatch: 15,
            distance: '0.8 km',
            promotion: '-20%',
            featured: true,
            image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&h=400&fit=crop',
            products: [
                {
                    name: 'Croissant Artesanal',
                    price: 8500,
                    originalPrice: 9500,
                    image: 'https://images.unsplash.com/photo-1555507530-c54e82458e59?w=120&h=120&fit=crop',
                    nextReady: 15,
                    rating: 4.8,
                    bestseller: true
                },
                {
                    name: 'Pain au Chocolat',
                    price: 7200,
                    image: 'https://images.unsplash.com/photo-1578662996402-fdb17c7be2de?w=120&h=120&fit=crop',
                    nextReady: 25,
                    rating: 4.9
                },
                {
                    name: 'Brioche Francés',
                    price: 9200,
                    image: 'https://images.unsplash.com/photo-1586444248804-7c5f7b2c7d94?w=120&h=120&fit=crop',
                    nextReady: 35,
                    rating: 4.7
                }
            ]
        },
        {
            id: 2,
            name: 'Boulangerie Moderne',
            username: 'boulangerie-moderne',
            tagline: 'Fusión contemporánea',
            rating: 4.8,
            reviews: 189,
            deliveryTime: '10-15',
            nextBatch: 8,
            distance: '0.5 km',
            promotion: null,
            featured: false,
            image: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=800&h=400&fit=crop',
            products: [
                {
                    name: 'Baguette Premium',
                    price: 4800,
                    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=120&h=120&fit=crop',
                    nextReady: 8,
                    rating: 4.9,
                    bestseller: true
                },
                {
                    name: 'Éclair Vainilla',
                    price: 8900,
                    image: 'https://images.unsplash.com/photo-1587668178277-295251f900ce?w=120&h=120&fit=crop',
                    nextReady: 18,
                    rating: 4.8
                },
                {
                    name: 'Macaron Mix',
                    price: 12000,
                    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=120&h=120&fit=crop',
                    nextReady: 28,
                    rating: 4.6
                }
            ]
        },
        {
            id: 3,
            name: 'Sourdough & Co.',
            username: 'sourdough-co',
            tagline: 'Fermentación natural',
            rating: 4.7,
            reviews: 156,
            deliveryTime: '20-25',
            nextBatch: 22,
            distance: '1.2 km',
            promotion: '2x1',
            featured: true,
            image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=400&fit=crop',
            products: [
                {
                    name: 'Sourdough Clásico',
                    price: 12000,
                    image: 'https://images.unsplash.com/photo-1586444248804-7c5f7b2c7d94?w=120&h=120&fit=crop',
                    nextReady: 22,
                    rating: 4.8,
                    bestseller: true
                },
                {
                    name: 'Focaccia Herbs',
                    price: 10800,
                    image: 'https://images.unsplash.com/photo-1571197119282-6d4d2b654e79?w=120&h=120&fit=crop',
                    nextReady: 32,
                    rating: 4.7
                },
                {
                    name: 'Multigrano',
                    price: 9500,
                    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=120&h=120&fit=crop',
                    nextReady: 42,
                    rating: 4.9
                }
            ]
        }
    ];

    const filteredBakeries = bakeries.filter(bakery =>
        bakery.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bakery.products.some(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const formatPrice = (price: any) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
        }).format(price);
    };

    const toggleFavorite = (bakeryId: any) => {
        setFavorites(prev => {
            const newFavorites = new Set(prev);
            if (newFavorites.has(bakeryId)) {
                newFavorites.delete(bakeryId);
            } else {
                newFavorites.add(bakeryId);
            }
            return newFavorites;
        });
    };

    const handleBakeryNavigation = (username: string) => {
        router.push(`/in/${username}`);
    };

    const nextSlide = () => {
        if (!isDragging) {
            setCurrentSlide((prev) => (prev + 1) % filteredBakeries.length);
        }
    };

    const prevSlide = () => {
        if (!isDragging) {
            setCurrentSlide((prev) => (prev - 1 + filteredBakeries.length) % filteredBakeries.length);
        }
    };

    const handlePanEnd = (event: any, info: any) => {
        setIsDragging(false);
        const threshold = 50;

        if (info.offset.x > threshold) {
            prevSlide();
        } else if (info.offset.x < -threshold) {
            nextSlide();
        }
    };

    const handlePanStart = () => {
        setIsDragging(true);
    };

    useEffect(() => {
        if (filteredBakeries.length > 0) {
            const interval = setInterval(() => {
                if (!isDragging) {
                    nextSlide();
                }
            }, 6000);
            return () => clearInterval(interval);
        }
    }, [filteredBakeries.length, isDragging]);

    return (
        <div className="min-h-screen bg-gray-50 relative overflow-hidden pt-32">
            {/* Fondo sutil con elementos flotantes */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-10 w-32 h-32 bg-amber-100/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-16 w-40 h-40 bg-orange-100/20 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-yellow-100/20 rounded-full blur-3xl"></div>
            </div>

            {/* Header compacto */}
            <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-6">
                <div className="max-w-4xl mx-auto">
                    {/* Título y buscador */}
                    <div className="text-center mb-8">
                        {/* Contenedor principal responsive */}
                        <div className="flex flex-col lg:flex-row items-center gap-4 w-full">
                            {/* Buscador minimalista */}
                            <div className="relative w-full lg:flex-1 max-w-md lg:max-w-none">
                                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                                    <Search className="w-5 h-5" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Buscar panadería o producto..."
                                    className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border border-gray-200 focus:border-gray-300 focus:outline-none transition-all duration-300 text-gray-700 placeholder-gray-400"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            {/* Categorías - Desktop: lado derecho, Mobile: abajo en carousel */}
                            <div className="w-full lg:w-auto lg:flex-shrink-0">
                                {/* Desktop */}
                                <div className="hidden lg:flex flex-wrap gap-2 justify-end">
                                    {categories.map((category) => {
                                        const Icon = category.icon;
                                        const isActive = selectedCategory === category.id;
                                        return (
                                            <motion.button
                                                key={category.id}
                                                onClick={() => setSelectedCategory(category.id)}
                                                className={`flex items-center px-4 py-3 rounded-xl transition-all duration-300 ${isActive
                                                    ? 'bg-white shadow-lg text-gray-900'
                                                    : 'bg-white/60 text-gray-600 hover:bg-white/80'
                                                    }`}
                                                style={{
                                                    boxShadow: isActive
                                                        ? '6px 6px 12px rgba(0, 0, 0, 0.1), -6px -6px 12px rgba(255, 255, 255, 0.8)'
                                                        : '3px 3px 6px rgba(0, 0, 0, 0.1), -3px -3px 6px rgba(255, 255, 255, 0.8)'
                                                }}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <Icon className="w-4 h-4 mr-2" />
                                                <span className="text-sm font-medium">{category.name}</span>
                                            </motion.button>
                                        );
                                    })}
                                </div>

                                {/* Mobile - Carousel horizontal sin scrollbar */}
                                <div className="lg:hidden">
                                    <div
                                        className="flex gap-2 overflow-x-auto pb-2"
                                        style={{
                                            scrollbarWidth: 'none',
                                            msOverflowStyle: 'none',
                                        }}
                                    >
                                        <style jsx>{`
                                            div::-webkit-scrollbar {
                                                display: none;
                                            }
                                        `}</style>
                                        {categories.map((category) => {
                                            const Icon = category.icon;
                                            const isActive = selectedCategory === category.id;
                                            return (
                                                <motion.button
                                                    key={category.id}
                                                    onClick={() => setSelectedCategory(category.id)}
                                                    className={`flex items-center px-4 py-3 rounded-xl transition-all duration-300 whitespace-nowrap flex-shrink-0 ${isActive
                                                        ? 'bg-white shadow-lg text-gray-900'
                                                        : 'bg-white/60 text-gray-600 hover:bg-white/80'
                                                        }`}
                                                    style={{
                                                        boxShadow: isActive
                                                            ? '6px 6px 12px rgba(0, 0, 0, 0.1), -6px -6px 12px rgba(255, 255, 255, 0.8)'
                                                            : '3px 3px 6px rgba(0, 0, 0, 0.1), -3px -3px 6px rgba(255, 255, 255, 0.8)'
                                                    }}
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    <Icon className="w-4 h-4 mr-2" />
                                                    <span className="text-sm font-medium">{category.name}</span>
                                                </motion.button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Carrusel principal */}
            <div className="relative z-10 px-4 sm:px-6 lg:px-8 pb-12">
                <div className="max-w-4xl mx-auto">
                    <AnimatePresence mode="wait">
                        {filteredBakeries.length > 0 ? (
                            <motion.div
                                key={currentSlide}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={0.2}
                                onPanStart={handlePanStart}
                                onPanEnd={handlePanEnd}
                                className="cursor-grab active:cursor-grabbing"
                            >
                                {(() => {
                                    const bakery = filteredBakeries[currentSlide];
                                    return (
                                        <div className="bg-white rounded-3xl overflow-hidden shadow-xl"
                                            style={{
                                                boxShadow: '12px 12px 24px rgba(0, 0, 0, 0.1), -12px -12px 24px rgba(255, 255, 255, 0.8)'
                                            }}
                                        >
                                            {/* Header de la panadería */}
                                            <div className="relative h-48 md:h-56">
                                                <img
                                                    src={bakery.image}
                                                    alt={bakery.name}
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                                {/* Overlay con información */}
                                                <div className="absolute bottom-4 left-4 right-4">
                                                    <div className="flex items-end justify-between">
                                                        <div>
                                                            <h2 className="text-2xl font-bold text-white mb-1">
                                                                {bakery.name}
                                                            </h2>
                                                            <p className="text-white/90 text-sm mb-2">
                                                                {bakery.tagline}
                                                            </p>
                                                            <div className="flex items-center gap-3 text-white/80 text-sm">
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
                                                                <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                                                                    {bakery.promotion}
                                                                </div>
                                                            )}

                                                            <div className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                                                                <Timer className="w-3 h-3 mr-1" />
                                                                Próximo: {bakery.nextBatch}min
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Productos */}
                                            <div className="p-6">
                                                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                                    Productos destacados
                                                </h3>

                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                                    {bakery.products.map((product, idx) => (
                                                        <motion.div
                                                            key={idx}
                                                            className="bg-gray-50 rounded-2xl p-4 group hover:shadow-lg transition-all duration-300"
                                                            style={{
                                                                boxShadow: '6px 6px 12px rgba(0, 0, 0, 0.1), -6px -6px 12px rgba(255, 255, 255, 0.8)'
                                                            }}
                                                            whileHover={{ y: -4 }}
                                                        >
                                                            <div className="relative mb-3">
                                                                <img
                                                                    src={product.image}
                                                                    alt={product.name}
                                                                    className="w-full h-24 object-cover rounded-xl"
                                                                />
                                                                {product.bestseller && (
                                                                    <div className="absolute top-2 left-2 bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                                                                        Bestseller
                                                                    </div>
                                                                )}
                                                            </div>

                                                            <div className="space-y-2">
                                                                <h4 className="font-semibold text-gray-900 text-sm">
                                                                    {product.name}
                                                                </h4>

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

                                                                <div className="flex items-center justify-between">
                                                                    <div className="flex items-center gap-2">
                                                                        <span className="text-amber-600 font-bold">
                                                                            {formatPrice(product.price)}
                                                                        </span>
                                                                        {'originalPrice' in product && product.originalPrice !== undefined && (
                                                                            <span className="text-gray-400 line-through text-sm">
                                                                                {formatPrice(product.originalPrice)}
                                                                            </span>
                                                                        )}
                                                                    </div>

                                                                    <motion.button
                                                                        className="bg-amber-500 text-white p-2 rounded-full hover:bg-amber-600 transition-colors"
                                                                        whileHover={{ scale: 1.1 }}
                                                                        whileTap={{ scale: 0.9 }}
                                                                    >
                                                                        <Plus className="w-4 h-4" />
                                                                    </motion.button>
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    ))}
                                                </div>

                                                {/* Botón de acción */}
                                                <motion.button
                                                    onClick={() => handleBakeryNavigation(bakery.username)}
                                                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-4 rounded-2xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all duration-300 flex items-center justify-center group"
                                                    style={{
                                                        boxShadow: '6px 6px 12px rgba(0, 0, 0, 0.1), -6px -6px 12px rgba(255, 255, 255, 0.8)'
                                                    }}
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    Explorar panadería completa
                                                    <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                                </motion.button>
                                            </div>
                                        </div>
                                    );
                                })()}
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-20"
                            >
                                <div className="text-6xl mb-4">🔍</div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    No encontramos resultados
                                </h3>
                                <p className="text-gray-600">
                                    Intenta con otro término de búsqueda
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Indicadores */}
                    {filteredBakeries.length > 1 && (
                        <div className="flex justify-center mt-8 gap-2">
                            {filteredBakeries.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentSlide(idx)}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentSlide
                                        ? 'bg-amber-500 w-8'
                                        : 'bg-gray-300 hover:bg-gray-400'
                                        }`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BakeryHeroSection;