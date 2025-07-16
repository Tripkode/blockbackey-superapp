import { motion } from "framer-motion";
import { Clock, MapPin, Star, ChefHat, Wheat, Cookie, DollarSign, Coffee, Cake, Croissant } from "lucide-react";

function ContentBakery({
    breadData,
    filteredBreads,
    getBreadIcon,
    renderStars,
    searchTerm,
    setSearchTerm,
    breadCategories,
    selectedCategory,
    setSelectedCategory,
    freshnessLevels,
    selectedFreshness,
    setSelectedFreshness,
    priceRanges,
    selectedPriceRange,
    setSelectedPriceRange,
    minRating,
    setMinRating,
    showOnlyAvailable,
    setShowOnlyAvailable,
    clearFilters
}: any) {
    const bakeryServices = [
        {
            title: "Panadería Tradicional",
            icon: <Wheat className="w-5 h-5 text-amber-600" />,
            percentage: "43%",
            description: "Pan de trigo, integral, especial y artesanal"
        },
        {
            title: "Pastelería y Repostería",
            icon: <Cake className="w-5 h-5 text-pink-600" />,
            percentage: "25%",
            description: "Tortas, ponqués, pasteles y cupcakes"
        },
        {
            title: "Productos Tradicionales Colombianos",
            icon: <ChefHat className="w-5 h-5 text-green-600" />,
            percentage: "",
            description: "Buñuelos, achiras, liberales y regionales"
        },
        {
            title: "Productos Salados",
            icon: <Cookie className="w-5 h-5 text-orange-600" />,
            percentage: "",
            description: "Empanadas, pasteles de pollo, pandebonos"
        },
        {
            title: "Galletería",
            icon: <Cookie className="w-5 h-5 text-blue-600" />,
            percentage: "",
            description: "Galletas dulces, saladas e integrales"
        },
        {
            title: "Productos Matutinos",
            icon: <Croissant className="w-5 h-5 text-yellow-600" />,
            percentage: "",
            description: "Croissants, tostadas y pan para desayuno"
        },
        {
            title: "Bebidas Complementarias",
            icon: <Coffee className="w-5 h-5 text-brown-600" />,
            percentage: "",
            description: "Café, bebidas calientes y jugos naturales"
        }
    ];

    const handleSectionClick = (sectionTitle: string) => {
        // Aquí se manejaría la redirección a la sección específica
        console.log(`Navegando a: ${sectionTitle}`);
    };

    return (
        <>


            {/* Selección de País */}
            <div className="p-4 border-b border-gray-200/30">
                <h3 className="text-sm font-semibold text-gray-600 mb-3">PAÍS</h3>
                <select
                    className="w-full p-2 bg-white/40 backdrop-blur-sm rounded-lg border border-gray-200/30 focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-sm"
                    defaultValue="Colombia"
                >
                    <option value="Colombia">🇨🇴 Colombia</option>
                    <option value="Mexico">🇲🇽 México</option>
                    <option value="Argentina">🇦🇷 Argentina</option>
                    <option value="Peru">🇵🇪 Perú</option>
                    <option value="Chile">🇨🇱 Chile</option>
                </select>
            </div>

            {/* Secciones del Servicio */}
            <div className="p-4 border-b border-gray-200/30">
                <h3 className="text-sm font-semibold text-gray-600 mb-3">SECCIONES DEL SERVICIO</h3>
                <div className="space-y-3">
                    {bakeryServices.map((service, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleSectionClick(service.title)}
                            className="p-3 rounded-lg cursor-pointer transition-colors bg-white/40 hover:bg-white/60 backdrop-blur-sm border border-gray-200/30"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center space-x-3">
                                    {service.icon}
                                    <div>
                                        <div className="font-medium text-gray-800 text-sm">{service.title}</div>
                                        <div className="text-xs text-gray-500">{service.description}</div>
                                    </div>
                                </div>
                                {service.percentage && (
                                    <div className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                                        {service.percentage}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Otros Servicios */}
            <div className="p-4 border-b border-gray-200/30">
                <h3 className="text-sm font-semibold text-gray-600 mb-3">OTROS</h3>
                <div className="space-y-2">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full text-left p-3 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 transition-all"
                    >
                        <div className="flex items-center space-x-2">
                            <ChefHat className="w-4 h-4" />
                            <span className="text-sm font-medium">Registra tu Panadería</span>
                        </div>
                    </motion.button>
                    
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full text-left p-3 rounded-lg bg-white/40 hover:bg-white/60 backdrop-blur-sm border border-gray-200/30 transition-colors"
                    >
                        <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4 text-blue-500" />
                            <span className="text-sm">Panaderías Cerca</span>
                        </div>
                    </motion.button>
                    
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full text-left p-3 rounded-lg bg-white/40 hover:bg-white/60 backdrop-blur-sm border border-gray-200/30 transition-colors"
                    >
                        <div className="flex items-center space-x-2">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span className="text-sm">Panaderías Mejor Valoradas</span>
                        </div>
                    </motion.button>
                    
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full text-left p-3 rounded-lg bg-white/40 hover:bg-white/60 backdrop-blur-sm border border-gray-200/30 transition-colors"
                    >
                        <div className="flex items-center space-x-2">
                            <DollarSign className="w-4 h-4 text-green-500" />
                            <span className="text-sm">Ofertas Especiales</span>
                        </div>
                    </motion.button>
                </div>
            </div>



            {/* Estadísticas Panadería */}
            <div className="p-4 border-t border-gray-200/30">
                <h3 className="text-sm font-semibold text-gray-600 mb-3">ESTADÍSTICAS</h3>
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4 text-blue-500" />
                            <span className="text-sm text-gray-600">Panaderías Cerca</span>
                        </div>
                        <span className="font-semibold text-gray-800">12</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            {getBreadIcon && getBreadIcon("default")}
                            <span className="text-sm text-gray-600">Panes Disponibles</span>
                        </div>
                        <span className="font-semibold text-gray-800">{filteredBreads.filter((b: any) => b.available).length}</span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ContentBakery;