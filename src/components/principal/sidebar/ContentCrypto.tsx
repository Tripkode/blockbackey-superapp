import { motion } from "framer-motion";
import { Activity, BarChart3, DollarSign } from "lucide-react";

function ContentCrypto({ selectedCrypto, getTrendIcon, getTrendColor, cryptoData, setSelectedCrypto }: {
    selectedCrypto: any,
    getTrendIcon: any,
    getTrendColor: any,
    cryptoData: any,
    setSelectedCrypto: any
}) {
    return (
        <>
            {/* Crypto Principal */}
            <div className="p-4 border-b border-gray-200/30">
                <h3 className="text-sm font-semibold text-gray-600 mb-3">MONEDA PRINCIPAL</h3>
                <div className="bg-white/40 backdrop-blur-sm rounded-lg p-4 border border-gray-200/30">
                    <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-gray-800">{selectedCrypto.name}</span>
                        <span className="text-sm text-gray-500">{selectedCrypto.symbol}</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl font-bold text-gray-800">
                            ${selectedCrypto.price.toLocaleString()}
                        </span>
                        <div className="flex items-center space-x-1">
                            {getTrendIcon(selectedCrypto.trend)}
                            <span className={`text-sm font-medium ${getTrendColor(selectedCrypto.trend)}`}>
                                {selectedCrypto.change > 0 ? '+' : ''}{selectedCrypto.change}%
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                            <Activity className="w-4 h-4" />
                            <span>Volumen: {selectedCrypto.volume}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Lista de Criptomonedas */}
            <div className="p-4">
                <h3 className="text-sm font-semibold text-gray-600 mb-3">MERCADO</h3>
                <div className="space-y-2">
                    {cryptoData.map((crypto: any) => (
                        <motion.div
                            key={crypto.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`p-3 rounded-lg cursor-pointer transition-colors ${selectedCrypto.id === crypto.id
                                ? 'bg-blue-50/60 border border-blue-200/50 backdrop-blur-sm'
                                : 'bg-white/30 hover:bg-white/50 backdrop-blur-sm border border-gray-200/30'
                                }`}
                            onClick={() => setSelectedCrypto(crypto)}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-orange-100/80 rounded-full flex items-center justify-center backdrop-blur-sm">
                                        <DollarSign className="w-4 h-4 text-orange-600" />
                                    </div>
                                    <div>
                                        <div className="font-medium text-gray-800">{crypto.symbol}</div>
                                        <div className="text-xs text-gray-500">{crypto.name}</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="font-semibold text-gray-800">
                                        ${crypto.price.toLocaleString()}
                                    </div>
                                    <div className={`text-xs flex items-center space-x-1 ${getTrendColor(crypto.trend)}`}>
                                        {getTrendIcon(crypto.trend)}
                                        <span>{crypto.change > 0 ? '+' : ''}{crypto.change}%</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Estadísticas Crypto */}
            <div className="p-4 border-t border-gray-200/30">
                <h3 className="text-sm font-semibold text-gray-600 mb-3">ESTADÍSTICAS</h3>
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <BarChart3 className="w-4 h-4 text-blue-500" />
                            <span className="text-sm text-gray-600">Transacciones Hoy</span>
                        </div>
                        <span className="font-semibold text-gray-800">1,234</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Activity className="w-4 h-4 text-green-500" />
                            <span className="text-sm text-gray-600">Volumen Total</span>
                        </div>
                        <span className="font-semibold text-gray-800">$52.1M</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ContentCrypto;