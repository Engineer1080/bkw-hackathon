'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, Upload, Download, AlertCircle, CheckCircle, Sparkles } from 'lucide-react'
import { generateAIReport, downloadBlob, type ReportRequest } from '@/lib/api'

const FEDERAL_STATES = [
  "Baden-Württemberg",
  "Bayern",
  "Berlin",
  "Brandenburg",
  "Bremen",
  "Hamburg",
  "Hessen",
  "Mecklenburg-Vorpommern",
  "Niedersachsen",
  "Nordrhein-Westfalen",
  "Rheinland-Pfalz",
  "Saarland",
  "Sachsen",
  "Sachsen-Anhalt",
  "Schleswig-Holstein",
  "Thüringen",
]

const PROJECT_TYPES = [
  { value: "office", label: "Bürogebäude" },
  { value: "laboratory", label: "Labor" },
  { value: "hospital", label: "Krankenhaus" },
  { value: "school", label: "Schule" },
  { value: "residential", label: "Wohngebäude" },
] as const

export default function AIReportGenerator() {
  const [formData, setFormData] = useState<ReportRequest>({
    project_name: "",
    location: "",
    project_type: "office",
    federal_state: "Bayern",
  })
  
  const [roomBook, setRoomBook] = useState<File | null>(null)
  const [costEstimate, setCostEstimate] = useState<File | null>(null)
  const [exportFormat, setExportFormat] = useState<"docx" | "markdown">("docx")
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      console.log("🚀 Generating AI report...")
      
      const blob = await generateAIReport({
        request: formData,
        room_book: roomBook || undefined,
        cost_estimate: costEstimate || undefined,
        export_format: exportFormat,
      })
      
      // Generate filename
      const extension = exportFormat === "docx" ? "docx" : "md"
      const sanitizedName = formData.project_name
        .replace(/[^a-zA-Z0-9äöüÄÖÜß]/g, "_")
        .substring(0, 50)
      const filename = `Erlaeuterungsbericht_${sanitizedName}.${extension}`
      
      // Download file
      downloadBlob(blob, filename)
      
      setSuccess(true)
      console.log("✅ Report downloaded successfully!")
    } catch (err) {
      console.error("❌ Error:", err)
      setError(err instanceof Error ? err.message : "Ein Fehler ist aufgetreten")
    } finally {
      setLoading(false)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card bg-white dark:bg-slate-800 max-w-4xl mx-auto"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            AI Report Generator
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Powered by Claude Sonnet 4.5
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Projektname & Standort */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Projektname *
            </label>
            <input
              type="text"
              value={formData.project_name}
              onChange={(e) =>
                setFormData({ ...formData, project_name: e.target.value })
              }
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-bkw-orange focus:border-transparent outline-none bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              placeholder="z.B. Neubau Zentrale Muster GmbH"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Standort *
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-bkw-orange focus:border-transparent outline-none bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              placeholder="z.B. München, Bayern"
              required
            />
          </div>
        </div>

        {/* Gebäudetyp & Bundesland */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Gebäudetyp *
            </label>
            <select
              value={formData.project_type}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  project_type: e.target.value as ReportRequest["project_type"],
                })
              }
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-bkw-orange focus:border-transparent outline-none bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              required
            >
              {PROJECT_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Bundesland *
            </label>
            <select
              value={formData.federal_state}
              onChange={(e) =>
                setFormData({ ...formData, federal_state: e.target.value })
              }
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-bkw-orange focus:border-transparent outline-none bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              required
            >
              {FEDERAL_STATES.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* File Uploads */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Raumbuch (Optional)
            </label>
            <div className="relative">
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={(e) => setRoomBook(e.target.files?.[0] || null)}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-bkw-orange focus:border-transparent outline-none bg-white dark:bg-slate-700 text-slate-900 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-orange-50 dark:file:bg-orange-900/30 file:text-bkw-orange hover:file:bg-orange-100 dark:hover:file:bg-orange-900/50"
              />
            </div>
            {roomBook && (
              <p className="mt-2 text-sm text-green-600 dark:text-green-400 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                {roomBook.name} ({formatFileSize(roomBook.size)})
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Kostenschätzung (Optional)
            </label>
            <div className="relative">
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={(e) => setCostEstimate(e.target.files?.[0] || null)}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-bkw-orange focus:border-transparent outline-none bg-white dark:bg-slate-700 text-slate-900 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-orange-50 dark:file:bg-orange-900/30 file:text-bkw-orange hover:file:bg-orange-100 dark:hover:file:bg-orange-900/50"
              />
            </div>
            {costEstimate && (
              <p className="mt-2 text-sm text-green-600 dark:text-green-400 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                {costEstimate.name} ({formatFileSize(costEstimate.size)})
              </p>
            )}
          </div>
        </div>

        {/* Export Format */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Export Format
          </label>
          <div className="flex gap-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                value="docx"
                checked={exportFormat === "docx"}
                onChange={(e) => setExportFormat(e.target.value as "docx")}
                className="mr-2 text-bkw-orange focus:ring-bkw-orange"
              />
              <span className="text-slate-700 dark:text-slate-300">Word (DOCX)</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                value="markdown"
                checked={exportFormat === "markdown"}
                onChange={(e) => setExportFormat(e.target.value as "markdown")}
                className="mr-2 text-bkw-orange focus:ring-bkw-orange"
              />
              <span className="text-slate-700 dark:text-slate-300">Markdown</span>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-lg hover:from-purple-700 hover:to-pink-700 disabled:from-gray-400 disabled:to-gray-500 transition-all font-medium text-lg shadow-lg flex items-center justify-center gap-3"
        >
          {loading ? (
            <>
              <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
              <span>KI generiert Bericht...</span>
            </>
          ) : (
            <>
              <FileText className="w-5 h-5" />
              <span>Report mit AI generieren</span>
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
            className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-3"
          >
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-red-900 dark:text-red-300">Fehler</h4>
              <p className="text-red-700 dark:text-red-400 text-sm">{error}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Message */}
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="mt-6 p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-xl"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <Download className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-green-800 dark:text-green-300 font-medium mb-1">
                  Report erfolgreich generiert!
                </p>
                <p className="text-sm text-green-700 dark:text-green-400">
                  Der Erläuterungsbericht wurde heruntergeladen und ist bereit zur Verwendung.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Info Box */}
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <p className="text-sm text-blue-800 dark:text-blue-300">
          <strong>ℹ️ Hinweis:</strong> Die Generierung dauert ca. 30-60 Sekunden,
          da Claude AI jeden Abschnitt intelligent erstellt. Der Report entspricht HOAI Leistungsphase 2.
        </p>
      </div>
    </motion.div>
  )
}

