"use client"

import React, { useState } from 'react';
import {
    User,
    Shield,
    CreditCard,
    Phone,
    Mail,
    Edit3,
    Plus,
    Check,
    AlertCircle,
    Eye,
    EyeOff,
    Settings,
    Bell,
    Lock,
    Trash2,
    Star,
    Calendar,
    MapPin,
    Camera,
    Save,
    X,
    Wallet,
    TrendingUp
} from 'lucide-react';
import { useRouter } from 'next/navigation';

function ProfilePage() {
    const [user, setUser] = useState({
        name: 'Ana María González',
        email: 'ana.gonzalez@email.com',
        phone: '+57 310 123 4567',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b5b5e23d?w=150&h=150&fit=crop&crop=face',
        isKYCVerified: false,
        phoneVerified: false,
        emailVerified: true,
        memberSince: '2023',
        location: 'Cali, Valle del Cauca',
        favoriteProducts: 12,
        totalOrders: 38,
        cryptoEarnings: 245000
    });

    const [cards, setCards] = useState([
        {
            id: 1,
            type: 'visa',
            last4: '4532',
            expiryMonth: '12',
            expiryYear: '26',
            holderName: 'Ana María González',
            isDefault: true
        },
        {
            id: 2,
            type: 'mastercard',
            last4: '8901',
            expiryMonth: '08',
            expiryYear: '25',
            holderName: 'Ana María González',
            isDefault: false
        }
    ]);

    const [editingField, setEditingField] = useState(null);
    const [tempValues, setTempValues] = useState({});
    const [showAddCard, setShowAddCard] = useState(false);

    const [addresses, setAddresses] = useState([
        {
            id: 1,
            label: 'Casa',
            address: 'Cra. 45 #12-34, Cali, Valle del Cauca',
            isPrimary: true
        },
        {
            id: 2,
            label: 'Oficina',
            address: 'Av. 6N #23-45, Cali, Valle del Cauca',
            isPrimary: false
        }
    ]);
    const [showAddAddress, setShowAddAddress] = useState(false);
    const [newAddress, setNewAddress] = useState({ label: '', address: '', location: 'Cali, Valle del Cauca' });

    const router = useRouter();

    const handleEditField = (field: any, currentValue: any) => {
        setEditingField(field);
        setTempValues({ ...tempValues, [field]: currentValue });
    };

    const handleSaveField = (field: keyof typeof user) => {
        setUser(prev => ({ ...prev, [field]: (tempValues as any)[field] }));
        setEditingField(null);
        setTempValues({});
    };

    const handleCancelEdit = () => {
        setEditingField(null);
        setTempValues({});
    };

    const getCardIcon = (type: string) => {
        switch (type) {
            case 'visa':
                return '💳';
            case 'mastercard':
                return '💳';
            default:
                return '💳';
        }
    };

    const handleVerifyKYC = () => {
        console.log('Iniciando proceso de verificación KYC...');
    };

    const handleVerifyPhone = () => {
        console.log('Enviando código de verificación al teléfono...');
    };

    const handleOpenWallet = () => {
        router.push('/wallet')
    };

    const handleSetPrimaryAddress = (id: number) => {
        setAddresses(prev => prev.map(addr => ({ ...addr, isPrimary: addr.id === id })));
    };

    const handleAddAddress = () => {
        if (!newAddress.label.trim() || !newAddress.address.trim()) return;
        setAddresses(prev => [
            ...prev,
            {
                id: prev.length ? Math.max(...prev.map(a => a.id)) + 1 : 1,
                label: newAddress.label,
                address: newAddress.address + (newAddress.location ? `, ${newAddress.location}` : ''),
                isPrimary: false
            }
        ]);
        setNewAddress({ label: '', address: '', location: 'Cali, Valle del Cauca' });
        setShowAddAddress(false);
    };

    return (
        <div className="min-h-screen relative overflow-hidden pt-32 sm:pt-20">
            {/* Fondo sutil con elementos flotantes - Adaptado para móviles */}
            <div className="absolute inset-0">
                <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-20 sm:w-32 h-20 sm:h-32 bg-amber-100/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 sm:bottom-20 right-8 sm:right-16 w-24 sm:w-40 h-24 sm:h-40 bg-orange-100/20 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/4 sm:left-1/3 w-16 sm:w-24 h-16 sm:h-24 bg-yellow-100/20 rounded-full blur-3xl"></div>
            </div>

            {/* Contenido principal */}
            <div className="relative z-10 px-3 sm:px-4 lg:px-8 py-4 sm:py-6">
                <div className="max-w-4xl mx-auto">
                    {/* Header del perfil - Responsive */}
                    <div
                        className="bg-gray-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 mb-4 sm:mb-6"
                        style={{
                            boxShadow: '6px 6px 12px rgba(0, 0, 0, 0.1), -6px -6px 12px rgba(255, 255, 255, 0.8)'
                        }}
                    >
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                            {/* Avatar y botón de cámara */}
                            <div className="relative mx-auto sm:mx-0">
                                <img
                                    src={user.avatar}
                                    alt={user.name}
                                    className="w-16 sm:w-20 h-16 sm:h-20 rounded-full object-cover"
                                />
                                <button
                                    className="absolute -bottom-1 sm:-bottom-2 -right-1 sm:-right-2 p-1.5 sm:p-2 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-colors"
                                >
                                    <Camera className="w-3 h-3" />
                                </button>
                            </div>

                            {/* Información del usuario */}
                            <div className="flex-1 text-center sm:text-left">
                                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">{user.name}</h1>
                                <p className="text-gray-600 mb-2">Miembro desde {user.memberSince}</p>
                                <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500">
                                    <div className="flex items-center">
                                        <MapPin className="w-3 sm:w-4 h-3 sm:h-4 mr-1" />
                                        <span className="hidden sm:inline">{user.location}</span>
                                        <span className="sm:hidden">Cali</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Star className="w-3 sm:w-4 h-3 sm:h-4 mr-1" />
                                        {user.favoriteProducts} favoritos
                                    </div>
                                    <div className="flex items-center">
                                        <Calendar className="w-3 sm:w-4 h-3 sm:h-4 mr-1" />
                                        {user.totalOrders} pedidos
                                    </div>
                                </div>
                            </div>
                            
                            {/* Sección de ganancias crypto y billetera - Responsive */}
                            <div className="flex flex-col sm:flex-col items-center sm:items-end gap-3 w-full sm:w-auto">
                                <div
                                    className="bg-gradient-to-r from-green-50 to-emerald-50 p-3 sm:p-4 rounded-xl w-full sm:w-auto"
                                    style={{ boxShadow: 'inset 2px 2px 5px rgba(0,0,0,0.05), inset -2px -2px 5px rgba(255,255,255,0.9)' }}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs sm:text-sm font-medium text-gray-700">Ganancias Crypto</span>
                                        <TrendingUp className="w-4 h-4 text-green-600" />
                                    </div>
                                    <p className="text-lg sm:text-2xl font-bold text-green-600">
                                        {user.cryptoEarnings?.toLocaleString("es-CO", { style: "currency", currency: "COP" })}
                                    </p>
                                    <p className="text-xs text-gray-500">En compras locales</p>
                                </div>
                                <button
                                    onClick={handleOpenWallet}
                                    className="flex items-center justify-center px-4 py-2 bg-amber-500 text-white rounded-full font-medium hover:bg-amber-600 transition-colors w-full sm:w-auto"
                                >
                                    <Wallet className="w-4 h-4 mr-2" />
                                    Billetera
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Estado de verificación - Responsive */}
                    <div
                        className="bg-gray-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 mb-4 sm:mb-6"
                        style={{
                            boxShadow: '6px 6px 12px rgba(0, 0, 0, 0.1), -6px -6px 12px rgba(255, 255, 255, 0.8)'
                        }}
                    >
                        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 flex items-center">
                            <Shield className="w-4 sm:w-5 h-4 sm:h-5 mr-2 text-amber-500" />
                            Estado de Verificación
                        </h2>
                        <div className="space-y-3 sm:space-y-4">
                            {/* KYC Verification */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 rounded-xl bg-white/50 gap-3 sm:gap-0"
                                style={{ boxShadow: 'inset 2px 2px 5px rgba(0,0,0,0.05), inset -2px -2px 5px rgba(255,255,255,0.9)' }}
                            >
                                <div className="flex items-center">
                                    <div className={`p-2 rounded-full mr-3 ${user.isKYCVerified ? 'bg-green-100' : 'bg-red-100'}`}>
                                        {user.isKYCVerified ? (
                                            <Check className="w-4 sm:w-5 h-4 sm:h-5 text-green-600" />
                                        ) : (
                                            <AlertCircle className="w-4 sm:w-5 h-4 sm:h-5 text-red-600" />
                                        )}
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900 text-sm sm:text-base">Verificación de Identidad (KYC)</p>
                                        <p className="text-xs sm:text-sm text-gray-600">
                                            {user.isKYCVerified ? 'Identidad verificada' : 'Verificación pendiente'}
                                        </p>
                                    </div>
                                </div>
                                {!user.isKYCVerified && (
                                    <button
                                        onClick={handleVerifyKYC}
                                        className="w-full sm:w-auto px-4 py-2 bg-amber-500 text-white rounded-full text-sm font-medium hover:bg-amber-600 transition-colors"
                                    >
                                        Verificar
                                    </button>
                                )}
                            </div>

                            {/* Phone Verification */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 rounded-xl bg-white/50 gap-3 sm:gap-0"
                                style={{ boxShadow: 'inset 2px 2px 5px rgba(0,0,0,0.05), inset -2px -2px 5px rgba(255,255,255,0.9)' }}
                            >
                                <div className="flex items-center">
                                    <div className={`p-2 rounded-full mr-3 ${user.phoneVerified ? 'bg-green-100' : 'bg-red-100'}`}>
                                        {user.phoneVerified ? (
                                            <Check className="w-4 sm:w-5 h-4 sm:h-5 text-green-600" />
                                        ) : (
                                            <AlertCircle className="w-4 sm:w-5 h-4 sm:h-5 text-red-600" />
                                        )}
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900 text-sm sm:text-base">Teléfono</p>
                                        <p className="text-xs sm:text-sm text-gray-600">
                                            {user.phoneVerified ? 'Número verificado' : 'Verificación pendiente'}
                                        </p>
                                    </div>
                                </div>
                                {!user.phoneVerified && (
                                    <button
                                        onClick={handleVerifyPhone}
                                        className="w-full sm:w-auto px-4 py-2 bg-amber-500 text-white rounded-full text-sm font-medium hover:bg-amber-600 transition-colors"
                                    >
                                        Verificar
                                    </button>
                                )}
                            </div>

                            {/* Email Verification */}
                            <div className="flex items-center justify-between p-3 sm:p-4 rounded-xl bg-white/50"
                                style={{ boxShadow: 'inset 2px 2px 5px rgba(0,0,0,0.05), inset -2px -2px 5px rgba(255,255,255,0.9)' }}
                            >
                                <div className="flex items-center">
                                    <div className="p-2 rounded-full mr-3 bg-green-100">
                                        <Check className="w-4 sm:w-5 h-4 sm:h-5 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900 text-sm sm:text-base">Correo Electrónico</p>
                                        <p className="text-xs sm:text-sm text-gray-600">Email verificado</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Información Personal - Responsive */}
                    <div
                        className="bg-gray-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 mb-4 sm:mb-6"
                        style={{
                            boxShadow: '6px 6px 12px rgba(0, 0, 0, 0.1), -6px -6px 12px rgba(255, 255, 255, 0.8)'
                        }}
                    >
                        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 flex items-center">
                            <User className="w-4 sm:w-5 h-4 sm:h-5 mr-2 text-amber-500" />
                            Información Personal
                        </h2>
                        <div className="space-y-3 sm:space-y-4">
                            {/* Name */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 rounded-xl bg-white/50 gap-3 sm:gap-0"
                                style={{ boxShadow: 'inset 2px 2px 5px rgba(0,0,0,0.05), inset -2px -2px 5px rgba(255,255,255,0.9)' }}
                            >
                                <div className="flex items-center flex-1">
                                    <User className="w-4 sm:w-5 h-4 sm:h-5 mr-3 text-gray-500" />
                                    <div className="flex-1">
                                        <p className="font-medium text-gray-900 text-sm sm:text-base">Nombre</p>
                                        {editingField === 'name' ? (
                                            <div className="flex items-center gap-2 mt-1">
                                                <input
                                                    type="text"
                                                    value={(tempValues as any).name || ''}
                                                    onChange={(e) => setTempValues((prev: any) => ({ ...prev, name: e.target.value }))}
                                                    className="flex-1 px-3 py-1 border border-gray-300 rounded-lg text-sm"
                                                />
                                                <button
                                                    onClick={() => handleSaveField('name')}
                                                    className="p-1 text-green-600 hover:bg-green-100 rounded"
                                                >
                                                    <Save className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={handleCancelEdit}
                                                    className="p-1 text-red-600 hover:bg-red-100 rounded"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ) : (
                                            <p className="text-xs sm:text-sm text-gray-600">{user.name}</p>
                                        )}
                                    </div>
                                </div>
                                {editingField !== 'name' && (
                                    <button
                                        onClick={() => handleEditField('name', user.name)}
                                        className="self-end sm:self-auto p-2 text-gray-500 hover:text-amber-500 transition-colors"
                                    >
                                        <Edit3 className="w-4 h-4" />
                                    </button>
                                )}
                            </div>

                            {/* Email */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 rounded-xl bg-white/50 gap-3 sm:gap-0"
                                style={{ boxShadow: 'inset 2px 2px 5px rgba(0,0,0,0.05), inset -2px -2px 5px rgba(255,255,255,0.9)' }}
                            >
                                <div className="flex items-center flex-1">
                                    <Mail className="w-4 sm:w-5 h-4 sm:h-5 mr-3 text-gray-500" />
                                    <div className="flex-1">
                                        <p className="font-medium text-gray-900 text-sm sm:text-base">Correo Electrónico</p>
                                        {editingField === 'email' ? (
                                            <div className="flex items-center gap-2 mt-1">
                                                <input
                                                    type="email"
                                                    value={(tempValues as any).email || ''}
                                                    onChange={(e) => setTempValues((prev: any) => ({ ...prev, email: e.target.value }))}
                                                    className="flex-1 px-3 py-1 border border-gray-300 rounded-lg text-sm"
                                                />
                                                <button
                                                    onClick={() => handleSaveField('email')}
                                                    className="p-1 text-green-600 hover:bg-green-100 rounded"
                                                >
                                                    <Save className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={handleCancelEdit}
                                                    className="p-1 text-red-600 hover:bg-red-100 rounded"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <p className="text-xs sm:text-sm text-gray-600 break-all">{user.email}</p>
                                                <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {editingField !== 'email' && (
                                    <button
                                        onClick={() => handleEditField('email', user.email)}
                                        className="self-end sm:self-auto p-2 text-gray-500 hover:text-amber-500 transition-colors"
                                    >
                                        <Edit3 className="w-4 h-4" />
                                    </button>
                                )}
                            </div>

                            {/* Phone */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 rounded-xl bg-white/50 gap-3 sm:gap-0"
                                style={{ boxShadow: 'inset 2px 2px 5px rgba(0,0,0,0.05), inset -2px -2px 5px rgba(255,255,255,0.9)' }}
                            >
                                <div className="flex items-center flex-1">
                                    <Phone className="w-4 sm:w-5 h-4 sm:h-5 mr-3 text-gray-500" />
                                    <div className="flex-1">
                                        <p className="font-medium text-gray-900 text-sm sm:text-base">Teléfono</p>
                                        {editingField === 'phone' ? (
                                            <div className="flex items-center gap-2 mt-1">
                                                <input
                                                    type="tel"
                                                    value={(tempValues as any).phone || ''}
                                                    onChange={(e) => setTempValues((prev: any) => ({ ...prev, phone: e.target.value }))}
                                                    className="flex-1 px-3 py-1 border border-gray-300 rounded-lg text-sm"
                                                />
                                                <button
                                                    onClick={() => handleSaveField('phone')}
                                                    className="p-1 text-green-600 hover:bg-green-100 rounded"
                                                >
                                                    <Save className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={handleCancelEdit}
                                                    className="p-1 text-red-600 hover:bg-red-100 rounded"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <p className="text-xs sm:text-sm text-gray-600">{user.phone}</p>
                                                {!user.phoneVerified && (
                                                    <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {editingField !== 'phone' && (
                                    <button
                                        onClick={() => handleEditField('phone', user.phone)}
                                        className="self-end sm:self-auto p-2 text-gray-500 hover:text-amber-500 transition-colors"
                                    >
                                        <Edit3 className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sección de Direcciones */}
                    <div
                        className="bg-gray-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 mb-4 sm:mb-6"
                        style={{
                            boxShadow: '6px 6px 12px rgba(0, 0, 0, 0.1), -6px -6px 12px rgba(255, 255, 255, 0.8)'
                        }}
                    >
                        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 flex items-center">
                            <MapPin className="w-4 sm:w-5 h-4 sm:h-5 mr-2 text-amber-500" />
                            Direcciones
                        </h2>
                        <div className="space-y-3 sm:space-y-4">
                            {addresses.map(addr => (
                                <div key={addr.id} className="flex items-center justify-between p-3 sm:p-4 rounded-xl bg-white/50" style={{ boxShadow: 'inset 2px 2px 5px rgba(0,0,0,0.05), inset -2px -2px 5px rgba(255,255,255,0.9)' }}>
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="radio"
                                            name="primaryAddress"
                                            checked={addr.isPrimary}
                                            onChange={() => handleSetPrimaryAddress(addr.id)}
                                            className="accent-amber-500 w-4 h-4"
                                        />
                                        <div>
                                            <p className="font-medium text-gray-900 text-sm sm:text-base">{addr.label}</p>
                                            <p className="text-xs sm:text-sm text-gray-600">{addr.address}</p>
                                            {addr.isPrimary && (
                                                <span className="inline-block px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full mt-1">Principal</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {showAddAddress ? (
                                <div className="flex flex-col gap-2 p-3 sm:p-4 rounded-xl bg-white/50 border border-amber-200">
                                    <input
                                        type="text"
                                        placeholder="Etiqueta (ej: Casa, Oficina)"
                                        value={newAddress.label}
                                        onChange={e => setNewAddress(prev => ({ ...prev, label: e.target.value }))}
                                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm mb-2"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Dirección (ej: Cra. 45 #12-34)"
                                        value={newAddress.address}
                                        onChange={e => setNewAddress(prev => ({ ...prev, address: e.target.value }))}
                                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm mb-2"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Ciudad, Departamento"
                                        value={newAddress.location}
                                        onChange={e => setNewAddress(prev => ({ ...prev, location: e.target.value }))}
                                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm mb-2"
                                    />
                                    <div className="flex gap-2">
                                        <button
                                            onClick={handleAddAddress}
                                            className="flex-1 px-4 py-2 bg-amber-500 text-white rounded-full font-medium hover:bg-amber-600 transition-colors"
                                        >
                                            Guardar
                                        </button>
                                        <button
                                            onClick={() => { setShowAddAddress(false); setNewAddress({ label: '', address: '', location: 'Cali, Valle del Cauca' }); }}
                                            className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-full font-medium hover:bg-gray-300 transition-colors"
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <button
                                    onClick={() => setShowAddAddress(true)}
                                    className="w-full flex items-center justify-center p-3 sm:p-4 rounded-xl bg-white/50 border-2 border-dashed border-gray-300 hover:border-amber-500 transition-colors group"
                                >
                                    <Plus className="w-4 sm:w-5 h-4 sm:h-5 mr-2 text-gray-500 group-hover:text-amber-500" />
                                    <span className="text-sm sm:text-base text-gray-500 group-hover:text-amber-500">
                                        Agregar nueva dirección
                                    </span>
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Métodos de Pago - Responsive */}
                    <div
                        className={`bg-gray-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 ${!user.isKYCVerified ? 'opacity-50 pointer-events-none' : ''}`}
                        style={{
                            boxShadow: '6px 6px 12px rgba(0, 0, 0, 0.1), -6px -6px 12px rgba(255, 255, 255, 0.8)'
                        }}
                    >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2 sm:gap-0">
                            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 flex items-center">
                                <CreditCard className="w-4 sm:w-5 h-4 sm:h-5 mr-2 text-amber-500" />
                                Métodos de Pago
                            </h2>
                            {!user.isKYCVerified && (
                                <div className="flex items-center text-xs sm:text-sm text-red-600">
                                    <Lock className="w-4 h-4 mr-1" />
                                    Verificar KYC requerido
                                </div>
                            )}
                        </div>

                        {user.isKYCVerified ? (
                            <div className="space-y-3 sm:space-y-4">
                                {cards.map((card) => (
                                    <div
                                        key={card.id}
                                        className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 rounded-xl bg-white/50 gap-3 sm:gap-0"
                                        style={{ boxShadow: 'inset 2px 2px 5px rgba(0,0,0,0.05), inset -2px -2px 5px rgba(255,255,255,0.9)' }}
                                    >
                                        <div className="flex items-center">
                                            <div className="text-xl sm:text-2xl mr-3">{getCardIcon(card.type)}</div>
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-900 text-sm sm:text-base">
                                                    **** **** **** {card.last4}
                                                </p>
                                                <p className="text-xs sm:text-sm text-gray-600">
                                                    {card.holderName} • {card.expiryMonth}/{card.expiryYear}
                                                </p>
                                                {card.isDefault && (
                                                    <span className="inline-block px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full mt-1">
                                                        Predeterminada
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <button className="self-end sm:self-auto p-2 text-gray-500 hover:text-red-500 transition-colors">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}

                                <button
                                    onClick={() => setShowAddCard(true)}
                                    className="w-full flex items-center justify-center p-3 sm:p-4 rounded-xl bg-white/50 border-2 border-dashed border-gray-300 hover:border-amber-500 transition-colors group"
                                >
                                    <Plus className="w-4 sm:w-5 h-4 sm:h-5 mr-2 text-gray-500 group-hover:text-amber-500" />
                                    <span className="text-sm sm:text-base text-gray-500 group-hover:text-amber-500">
                                        Agregar nueva tarjeta
                                    </span>
                                </button>
                            </div>
                        ) : (
                            <div className="text-center py-6 sm:py-8">
                                <Lock className="w-10 sm:w-12 h-10 sm:h-12 mx-auto text-gray-400 mb-4" />
                                <p className="text-sm sm:text-base text-gray-600 mb-4 px-4">
                                    Para agregar métodos de pago, primero debes verificar tu identidad.
                                </p>
                                <button
                                    onClick={handleVerifyKYC}
                                    className="w-full sm:w-auto px-6 py-3 bg-amber-500 text-white rounded-full font-medium hover:bg-amber-600 transition-colors"
                                >
                                    Verificar Identidad
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;