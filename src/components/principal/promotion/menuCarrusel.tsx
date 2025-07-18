"use client"

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const BakeryCategories = () => {
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const carouselRef = useRef<HTMLDivElement>(null);

    const categories = [
        {
            id: 1,
            name: 'Panadería Tradicional',
            description: 'Pan de trigo, integral, especial y artesanal',
            percentage: '',
            icon: '🍞',
            color: 'bg-amber-100',
            textColor: 'text-amber-800',
            borderColor: 'border-amber-200/40',
            accentColor: 'bg-amber-500'
        },
        {
            id: 2,
            name: 'Pastelería y Repostería',
            description: 'Tortas, ponqués, pasteles y cupcakes',
            percentage: '',
            icon: '🎂',
            color: 'bg-pink-100',
            textColor: 'text-pink-800',
            borderColor: 'border-pink-200/40',
            accentColor: 'bg-pink-500'
        },
        {
            id: 3,
            name: 'Productos Tradicionales Colombianos',
            description: 'Buñuelos, achiras, liberales y regionales',
            percentage: '',
            icon: '🥟',
            color: 'bg-yellow-100',
            textColor: 'text-yellow-800',
            borderColor: 'border-yellow-200/40',
            accentColor: 'bg-yellow-500'
        },
        {
            id: 4,
            name: 'Productos Salados',
            description: 'Empanadas, pasteles de pollo, pandebonos',
            percentage: '',
            icon: '🥟',
            color: 'bg-orange-100',
            textColor: 'text-orange-800',
            borderColor: 'border-orange-200/40',
            accentColor: 'bg-orange-500'
        },
        {
            id: 5,
            name: 'Galletería',
            description: 'Galletas dulces, saladas e integrales',
            percentage: '',
            icon: '🍪',
            color: 'bg-amber-100',
            textColor: 'text-amber-900',
            borderColor: 'border-amber-300/40',
            accentColor: 'bg-amber-600'
        },
        {
            id: 6,
            name: 'Productos Matutinos',
            description: 'Croissants, tostadas y pan para desayuno',
            percentage: '',
            icon: '🥐',
            color: 'bg-blue-100',
            textColor: 'text-blue-800',
            borderColor: 'border-blue-200/40',
            accentColor: 'bg-blue-500'
        },
        {
            id: 7,
            name: 'Bebidas Complementarias',
            description: 'Café, bebidas calientes y jugos naturales',
            percentage: '',
            icon: '☕',
            color: 'bg-green-100',
            textColor: 'text-green-800',
            borderColor: 'border-green-200/40',
            accentColor: 'bg-green-500'
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
        <div className="py-8">
            <div className="max-w-7xl mx-auto px-4">
                {/* Título */}
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                        ¡Pide ahora, nosotros te lo llevamos!
                    </h2>
                </div>

                {/* Carousel mejorado */}
                <div className="relative">
                    <div
                        ref={carouselRef}
                        className="flex gap-6 overflow-x-auto pb-6 cursor-grab active:cursor-grabbing"
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

                        {categories.map((category, index) => (
                            <motion.div
                                key={category.id}
                                className="flex-shrink-0 cursor-pointer group w-auto"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.1,
                                    type: "spring",
                                    stiffness: 100
                                }}
                                whileHover={{
                                    y: -8,
                                    transition: { duration: 0.2 }
                                }}
                            >
                                <div
                                    className={`${category.color} rounded-3xl overflow-hidden transition-all duration-300 group-hover:shadow-2xl border ${category.borderColor} relative h-40 flex flex-col justify-center items-center w-auto`}
                                    style={{
                                        boxShadow: '8px 8px 20px rgba(0, 0, 0, 0.08), -8px -8px 20px rgba(255, 255, 255, 0.9)',
                                        minWidth: '160px'
                                    }}
                                >
                                    {/* Accent line */}
                                    <div className={`absolute top-0 left-0 right-0 h-1 ${category.accentColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                                    {/* Porcentaje si existe */}
                                    {category.percentage && (
                                        <div className="absolute top-3 right-3">
                                            <div className={`${category.textColor} bg-white/90 px-3 py-1 rounded-full text-xs font-bold shadow-sm`}>
                                                {category.percentage}
                                            </div>
                                        </div>
                                    )}

                                    {/* Icono principal con animación */}
                                    <motion.div
                                        className="text-5xl mb-3"
                                        whileHover={{
                                            scale: 1.1,
                                            rotate: [0, -10, 10, 0],
                                            transition: { duration: 0.5 }
                                        }}
                                    >
                                        {category.icon}
                                    </motion.div>

                                    {/* Título mejorado */}
                                    <h3 className={`font-bold ${category.textColor} text-sm text-center leading-tight whitespace-nowrap px-3 tracking-wide`}>
                                        {category.name}
                                    </h3>

                                    {/* Flecha indicadora mejorada */}
                                    <motion.div
                                        className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
                                        whileHover={{ x: 2 }}
                                    >
                                        <div className={`p-1 rounded-full bg-white/80 shadow-sm`}>
                                            <ChevronRight className={`w-4 h-4 ${category.textColor}`} />
                                        </div>
                                    </motion.div>

                                    {/* Glow effect on hover */}
                                    <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-r from-white to-transparent" />
                                </div>
                            </motion.div>
                        ))}
                    </div>


                </div>
            </div>
        </div>
    );
};

export default BakeryCategories;