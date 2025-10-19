'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calculator, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react'
import { predictRoomType, getRoomTypeName, type RoomFeatures } from '@/lib/api'

export default function RoomTypePredictor() {
  const [features, setFeatures] = useState<RoomFeatures>({
    volume_m3: 0,
    area_m2: 0,
    total_heating_load_kw: 0,
  })
  const [prediction, setPrediction] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setPrediction(null)

    try {
      const result = await predictRoomType(features)
      setPrediction(result.Room_Type_No)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ein Fehler ist aufgetreten')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card bg-white dark:bg-slate-800 max-w-2xl mx-auto"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-bkw-orange to-bkw-blue rounded-xl flex items-center justify-center">
          <Calculator className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Raumtyp Vorhersage
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            KI-gestützte Klassifizierung
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Volumen (m³)
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              value={features.volume_m3 || ''}
              onChange={(e) =>
                setFeatures({ ...features, volume_m3: parseFloat(e.target.value) || 0 })
              }
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-bkw-orange focus:border-transparent outline-none bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              placeholder="z.B. 150"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Fläche (m²)
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              value={features.area_m2 || ''}
              onChange={(e) =>
                setFeatures({ ...features, area_m2: parseFloat(e.target.value) || 0 })
              }
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-bkw-orange focus:border-transparent outline-none bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              placeholder="z.B. 50"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Heizlast (kW)
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              value={features.total_heating_load_kw || ''}
              onChange={(e) =>
                setFeatures({
                  ...features,
                  total_heating_load_kw: parseFloat(e.target.value) || 0,
                })
              }
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-bkw-orange focus:border-transparent outline-none bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              placeholder="z.B. 12.5"
              required
            />
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={loading}
          className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
        >
          {loading ? (
            <>
              <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
              <span>Wird analysiert...</span>
            </>
          ) : (
            <>
              <TrendingUp className="w-5 h-5" />
              <span>Raumtyp vorhersagen</span>
            </>
          )}
        </motion.button>
      </form>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-3"
          >
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-red-900 dark:text-red-300">Fehler</h4>
              <p className="text-red-700 dark:text-red-400 text-sm">{error}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Prediction Result */}
      <AnimatePresence>
        {prediction !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="mt-6 p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-xl"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-green-800 dark:text-green-300 font-medium mb-1">
                  Vorhersage erfolgreich
                </p>
                <p className="text-3xl font-bold text-green-900 dark:text-green-100 mb-2">
                  {getRoomTypeName(prediction)}
                </p>
                <p className="text-sm text-green-700 dark:text-green-400">
                  Klassifiziert als Raumtyp Nr. {prediction}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

