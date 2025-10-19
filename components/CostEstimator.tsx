"use client";

import { useState } from "react";
import { estimateCosts, type CostEstimationRequest, type CostEstimationResponse } from "@/lib/api";
import { motion } from "framer-motion";
import { Calculator, CheckCircle, AlertCircle, TrendingUp } from "lucide-react";

const FEDERAL_STATES = [
  "Baden-Württemberg", "Bayern", "Berlin", "Brandenburg", "Bremen",
  "Hamburg", "Hessen", "Mecklenburg-Vorpommern", "Niedersachsen",
  "Nordrhein-Westfalen", "Rheinland-Pfalz", "Saarland", "Sachsen",
  "Sachsen-Anhalt", "Schleswig-Holstein", "Thüringen",
];

const PROJECT_TYPES = [
  { value: "office", label: "Bürogebäude" },
  { value: "laboratory", label: "Labor" },
  { value: "hospital", label: "Krankenhaus" },
  { value: "school", label: "Schule" },
  { value: "residential", label: "Wohngebäude" },
];

export default function CostEstimator() {
  const [formData, setFormData] = useState<CostEstimationRequest>({
    project_name: "",
    location: "",
    project_type: "office",
    federal_state: "Bayern",
    total_area_m2: 0,
    number_of_rooms: undefined,
    building_height_m: undefined,
  });

  const [result, setResult] = useState<CostEstimationResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      console.log("🤖 Requesting AI cost estimation...");
      const estimation = await estimateCosts(formData);
      setResult(estimation);
      console.log("✅ Cost estimation complete!");
    } catch (err) {
      console.error("❌ Error:", err);
      setError(err instanceof Error ? err.message : "Ein Fehler ist aufgetreten");
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 mb-6 border border-slate-200 dark:border-slate-700"
      >
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-3">
            <Calculator className="w-8 h-8 text-green-600" />
            KI-Kostenschätzung
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Intelligente TGA-Kostenschätzung nach DIN 276
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Projektname */}
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

            {/* Standort */}
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

            {/* Gebäudetyp */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Gebäudetyp *
              </label>
              <select
                value={formData.project_type}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    project_type: e.target.value as CostEstimationRequest["project_type"],
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

            {/* Bundesland */}
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

            {/* Gesamtfläche */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Gesamtfläche (m²) *
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                value={formData.total_area_m2 || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    total_area_m2: parseFloat(e.target.value) || 0,
                  })
                }
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-bkw-orange focus:border-transparent outline-none bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                placeholder="z.B. 5000"
                required
              />
            </div>

            {/* Anzahl Räume (Optional) */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Anzahl Räume (optional)
              </label>
              <input
                type="number"
                min="0"
                value={formData.number_of_rooms || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    number_of_rooms: e.target.value ? parseInt(e.target.value) : undefined,
                  })
                }
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-bkw-orange focus:border-transparent outline-none bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                placeholder="z.B. 150"
              />
            </div>

            {/* Gebäudehöhe (Optional) */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Gebäudehöhe (m) (optional)
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                value={formData.building_height_m || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    building_height_m: e.target.value ? parseFloat(e.target.value) : undefined,
                  })
                }
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-bkw-orange focus:border-transparent outline-none bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                placeholder="z.B. 18.5"
              />
            </div>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 px-6 rounded-xl hover:from-green-700 hover:to-blue-700 disabled:from-slate-400 disabled:to-slate-500 transition-all font-semibold text-lg shadow-lg flex items-center justify-center gap-3"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                KI berechnet Kosten...
              </span>
            ) : (
              <>
                <TrendingUp className="w-5 h-5" />
                <span>Kostenschätzung erstellen</span>
              </>
            )}
          </motion.button>
        </form>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-700 text-red-700 dark:text-red-300 rounded-lg flex items-center gap-3"
          >
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <div>
              <p className="font-medium">Fehler:</p>
              <p className="text-sm">{error}</p>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Results */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 border border-slate-200 dark:border-slate-700"
        >
          <div className="flex items-center gap-3 mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                Kostenschätzung: {result.project_name}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {result.total_area_m2.toLocaleString("de-DE")} m²
              </p>
            </div>
          </div>

          <div className="grid gap-4 mb-6">
            {/* KG 410 */}
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-700">
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <h4 className="font-bold text-slate-900 dark:text-white">KG 410 - Sanitäranlagen</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    {result.cost_estimation.kg_410.beschreibung}
                  </p>
                </div>
                <div className="text-right ml-4">
                  <p className="text-2xl font-bold text-blue-700 dark:text-blue-400">
                    {formatCurrency(result.cost_estimation.kg_410.betrag)}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {result.cost_estimation.kg_410.pro_m2} €/m²
                  </p>
                </div>
              </div>
            </div>

            {/* KG 420 */}
            <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg border border-orange-200 dark:border-orange-700">
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <h4 className="font-bold text-slate-900 dark:text-white">KG 420 - Wärmeversorgung</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    {result.cost_estimation.kg_420.beschreibung}
                  </p>
                </div>
                <div className="text-right ml-4">
                  <p className="text-2xl font-bold text-orange-700 dark:text-orange-400">
                    {formatCurrency(result.cost_estimation.kg_420.betrag)}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {result.cost_estimation.kg_420.pro_m2} €/m²
                  </p>
                </div>
              </div>
            </div>

            {/* KG 430 */}
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-700">
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <h4 className="font-bold text-slate-900 dark:text-white">KG 430 - Lüftungstechnik</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    {result.cost_estimation.kg_430.beschreibung}
                  </p>
                </div>
                <div className="text-right ml-4">
                  <p className="text-2xl font-bold text-green-700 dark:text-green-400">
                    {formatCurrency(result.cost_estimation.kg_430.betrag)}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {result.cost_estimation.kg_430.pro_m2} €/m²
                  </p>
                </div>
              </div>
            </div>

            {/* KG 434 */}
            <div className="bg-cyan-50 dark:bg-cyan-900/20 p-4 rounded-lg border border-cyan-200 dark:border-cyan-700">
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <h4 className="font-bold text-slate-900 dark:text-white">KG 434 - Kältetechnik</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    {result.cost_estimation.kg_434.beschreibung}
                  </p>
                </div>
                <div className="text-right ml-4">
                  <p className="text-2xl font-bold text-cyan-700 dark:text-cyan-400">
                    {formatCurrency(result.cost_estimation.kg_434.betrag)}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {result.cost_estimation.kg_434.pro_m2} €/m²
                  </p>
                </div>
              </div>
            </div>

            {/* KG 440 */}
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-700">
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <h4 className="font-bold text-slate-900 dark:text-white">KG 440 - Elektroanlagen</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    {result.cost_estimation.kg_440.beschreibung}
                  </p>
                </div>
                <div className="text-right ml-4">
                  <p className="text-2xl font-bold text-yellow-700 dark:text-yellow-400">
                    {formatCurrency(result.cost_estimation.kg_440.betrag)}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {result.cost_estimation.kg_440.pro_m2} €/m²
                  </p>
                </div>
              </div>
            </div>

            {/* KG 470 */}
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-700">
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <h4 className="font-bold text-slate-900 dark:text-white">
                    KG 470 - Nutzungsspezifische Anlagen
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    {result.cost_estimation.kg_470.beschreibung}
                  </p>
                </div>
                <div className="text-right ml-4">
                  <p className="text-2xl font-bold text-red-700 dark:text-red-400">
                    {formatCurrency(result.cost_estimation.kg_470.betrag)}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {result.cost_estimation.kg_470.pro_m2} €/m²
                  </p>
                </div>
              </div>
            </div>

            {/* KG 480 */}
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-700">
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <h4 className="font-bold text-slate-900 dark:text-white">KG 480 - Gebäudeautomation</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    {result.cost_estimation.kg_480.beschreibung}
                  </p>
                </div>
                <div className="text-right ml-4">
                  <p className="text-2xl font-bold text-purple-700 dark:text-purple-400">
                    {formatCurrency(result.cost_estimation.kg_480.betrag)}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {result.cost_estimation.kg_480.pro_m2} €/m²
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Gesamtsumme */}
          <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6 rounded-xl mb-4 shadow-lg">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold">Gesamt TGA (KG 400)</h3>
                <p className="text-sm opacity-90">{result.cost_estimation.genauigkeit}</p>
              </div>
              <div className="text-right">
                <p className="text-4xl font-bold">
                  {formatCurrency(result.cost_estimation.gesamt_kg_400.betrag)}
                </p>
                <p className="text-lg">
                  {result.cost_estimation.gesamt_kg_400.pro_m2} €/m²
                </p>
              </div>
            </div>
          </div>

          {/* Hinweise */}
          {result.cost_estimation.hinweise && result.cost_estimation.hinweise.length > 0 && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 mb-4 rounded">
              <h4 className="font-bold text-yellow-800 dark:text-yellow-300 mb-2 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Hinweise:
              </h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-yellow-900 dark:text-yellow-200">
                {result.cost_estimation.hinweise.map((hinweis, index) => (
                  <li key={index}>{hinweis}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Disclaimer */}
          <div className="text-xs text-slate-500 dark:text-slate-400 text-center border-t border-slate-200 dark:border-slate-700 pt-4">
            <p>{result.disclaimer}</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}

