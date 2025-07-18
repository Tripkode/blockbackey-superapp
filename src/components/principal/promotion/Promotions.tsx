"use client"

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Clock, Star, MapPin, Truck } from 'lucide-react';

const PromotionsCarousel = () => {
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const carouselRef = useRef<HTMLDivElement>(null);

    const businesses = [
        {
            id: 1,
            name: 'Hakuma Food',
            deliveryTime: '13 min',
            freeDelivery: true,
            image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=320&h=180&fit=crop',
            category: 'Hamburguesas',
            rating: 4.8,
            promo: 'Envío Gratis: Aplican TyC'
        },
        {
            id: 2,
            name: 'Mr. Jors',
            deliveryTime: '52 min',
            freeDelivery: true,
            image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=320&h=180&fit=crop',
            category: 'Sándwiches',
            rating: 4.6,
            promo: 'Envío Gratis: Aplican TyC'
        },
        {
            id: 3,
            name: 'La Santa Carne Llanera',
            deliveryTime: '35 min',
            freeDelivery: true,
            image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=320&h=180&fit=crop',
            category: 'Carnes',
            rating: 4.7,
            promo: 'Envío Gratis: Aplican TyC'
        },
        {
            id: 4,
            name: 'Mas Q Papa',
            deliveryTime: '35 min',
            freeDelivery: true,
            image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=320&h=180&fit=crop',
            category: 'Comida Rápida',
            rating: 4.5,
            promo: 'Envío Gratis: Aplican TyC'
        },
        {
            id: 5,
            name: 'Comida Rápida Alf',
            deliveryTime: '30 min',
            freeDelivery: true,
            image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=320&h=180&fit=crop',
            category: 'Hamburguesas',
            rating: 4.9,
            promo: 'Envío Gratis: Aplican TyC'
        },
        {
            id: 6,
            name: 'Doña María',
            deliveryTime: '25 min',
            freeDelivery: true,
            image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=320&h=180&fit=crop',
            category: 'Comida Casera',
            rating: 4.8,
            promo: 'Envío Gratis: Aplican TyC'
        }
    ];

    // Funciones para drag-scroll
    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        setIsDragging(true);
        setStartX(e.pageX - (carouselRef.current?.offsetLeft || 0));
        setScrollLeft(carouselRef.current?.scrollLeft || 0);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - (carouselRef.current?.offsetLeft || 0);
        const walk = (x - startX) * 1.5;
        if (carouselRef.current) {
            carouselRef.current.scrollLeft = scrollLeft - walk;
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
    };

    return (
        <div className="">
            <div className="max-w-7xl mx-auto px-4">
                {/* Título alineado a la izquierda */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                        Lo mejor en Cali!
                    </h2>
                    <button className="text-teal-600 hover:text-teal-700 font-medium text-sm flex items-center gap-1 transition-colors">
                        Ver más
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>

                {/* Carousel */}
                <div className="relative">
                    <div
                        ref={carouselRef}
                        className="flex gap-4 overflow-x-auto pb-4 cursor-grab active:cursor-grabbing"
                        style={{
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                            userSelect: isDragging ? 'none' : 'auto',
                        }}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseLeave}
                    >
                        <style jsx>{`
                            div::-webkit-scrollbar {
                                display: none;
                            }
                        `}</style>

                        {businesses.map((business) => (
                            <motion.div
                                key={business.id}
                                className="flex-shrink-0 cursor-pointer group"
                                style={{ width: '280px' }}
                                whileHover={{ y: -4 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div
                                    className="bg-white rounded-2xl overflow-hidden transition-all duration-300 group-hover:shadow-lg"
                                    style={{
                                        boxShadow: '6px 6px 12px rgba(0, 0, 0, 0.1), -6px -6px 12px rgba(255, 255, 255, 0.8)'
                                    }}
                                >
                                    {/* Imagen del negocio */}
                                    <div className="relative h-36 overflow-hidden">
                                        <img
                                            src={business.image}
                                            alt={business.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />

                                        {/* Promo overlay */}
                                        {business.promo && (
                                            <div className="absolute top-3 left-3">
                                                <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                                                    <Truck className="w-3 h-3" />
                                                    {business.promo}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Información del negocio */}
                                    <div className="p-4">
                                        <h3 className="font-semibold text-gray-900 mb-2 text-lg">
                                            {business.name}
                                        </h3>

                                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                                            <div className="flex items-center gap-1">
                                                <Clock className="w-4 h-4" />
                                                <span>{business.deliveryTime}</span>
                                            </div>

                                            <div className="flex items-center gap-1">
                                                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                                                <span>{business.rating}</span>
                                            </div>

                                            {business.freeDelivery && (
                                                <div className="flex items-center gap-1 text-green-600">
                                                    <Truck className="w-4 h-4" />
                                                    <span>Envío gratis</span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="text-sm text-gray-500">
                                            {business.category}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PromotionsCarousel;