"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    MapPin,
    Phone,
    Mail,
    Clock,
    Instagram,
    Facebook,
    Twitter,
    Youtube,
    Heart,
    Shield,
    Users,
    Zap,
    Star,
    ChevronRight,
    Send
} from 'lucide-react';

const FooterSection = () => {
    const footerLinks = {
        customer: [
            { name: 'Cómo funciona', href: '#' },
            { name: 'Encuentra panaderías', href: '#' },
            { name: 'Programa de fidelidad', href: '#' },
            { name: 'Ofertas especiales', href: '#' },
            { name: 'Soporte al cliente', href: '#' }
        ],
        bakery: [
            { name: 'Únete como panadería', href: '#' },
            { name: 'Portal de socios', href: '#' },
            { name: 'Herramientas de gestión', href: '#' },
            { name: 'Capacitación', href: '#' },
            { name: 'Centro de ayuda', href: '#' }
        ],
        company: [
            { name: 'Sobre nosotros', href: '#' },
            { name: 'Nuestro equipo', href: '#' },
            { name: 'Carreras', href: '#' },
            { name: 'Prensa', href: '#' },
            { name: 'Blog', href: '#' }
        ],
        legal: [
            { name: 'Términos y condiciones', href: '#' },
            { name: 'Política de privacidad', href: '#' },
            { name: 'Cookies', href: '#' },
            { name: 'Accesibilidad', href: '#' },
            { name: 'Contacto legal', href: '#' }
        ]
    };

    const socialLinks = [
        { icon: Instagram, href: '#' },
        { icon: Facebook, href: '#' },
        { icon: Twitter, href: '#' },
        { icon: Youtube, href: '#' }
    ];

    return (
        <footer className="relative overflow-hidden">
            {/* Elementos decorativos de fondo eliminados para mayor minimalismo */}

            {/* Contenido principal */}
            <div className="relative z-10 px-4 sm:px-6 lg:px-8 pt-16 pb-8">
                <div className="max-w-7xl mx-auto px-4">

                    {/* Enlaces principales */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                        {/* Para clientes */}
                        <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-4">
                                Para clientes
                            </h4>
                            <ul className="space-y-3">
                                {footerLinks.customer.map((link, index) => (
                                    <li key={index}>
                                        <a
                                            href={link.href}
                                            className="text-gray-600 hover:text-gray-900 transition-colors duration-300 flex items-center group"
                                        >
                                            <ChevronRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/* Para panaderías */}
                        <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-4">
                                Para panaderías
                            </h4>
                            <ul className="space-y-3">
                                {footerLinks.bakery.map((link, index) => (
                                    <li key={index}>
                                        <a
                                            href={link.href}
                                            className="text-gray-600 hover:text-gray-900 transition-colors duration-300 flex items-center group"
                                        >
                                            <ChevronRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/* Empresa */}
                        <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-4">
                                Empresa
                            </h4>
                            <ul className="space-y-3">
                                {footerLinks.company.map((link, index) => (
                                    <li key={index}>
                                        <a
                                            href={link.href}
                                            className="text-gray-600 hover:text-gray-900 transition-colors duration-300 flex items-center group"
                                        >
                                            <ChevronRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/* Legal */}
                        <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-4">
                                Legal
                            </h4>
                            <ul className="space-y-3">
                                {footerLinks.legal.map((link, index) => (
                                    <li key={index}>
                                        <a
                                            href={link.href}
                                            className="text-gray-600 hover:text-gray-900 transition-colors duration-300 flex items-center group"
                                        >
                                            <ChevronRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Separador */}
                    <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-8"></div>

                    {/* Footer inferior */}
                    <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0">
                        {/* Logo y copyright */}
                        <div className="flex items-center space-x-4">
                            <div className="bg-white w-12 h-12 rounded-xl flex items-center justify-center shadow-inner">
                                <Heart className="w-6 h-6 text-gray-400" />
                            </div>
                            <div>
                                <h6 className="font-bold text-gray-900">BlockBackery</h6>
                                <p className="text-sm text-gray-500">© 2025 Todos los derechos reservados</p>
                            </div>
                        </div>
                        {/* Redes sociales */}
                        <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-500 mr-2">Síguenos:</span>
                            {socialLinks.map((social, index) => {
                                const Icon = social.icon;
                                return (
                                    <motion.a
                                        key={index}
                                        href={social.href}
                                        className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-500 bg-white shadow-inner transition-all duration-300 hover:scale-110 hover:text-gray-900"
                                        whileHover={{ y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Icon className="w-5 h-5" />
                                    </motion.a>
                                );
                            })}
                        </div>
                        {/* Badge de seguridad */}
                        <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-inner">
                            <Shield className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-700 font-medium">Plataforma segura</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default FooterSection;