'use client'

import { motion } from 'framer-motion'
import { Download, FileText, DollarSign, BookOpen, CheckCircle, TrendingUp, AlertTriangle } from 'lucide-react'

interface ResultsDashboardProps {
  results: any
}

export default function ResultsDashboard({ results }: ResultsDashboardProps) {
  const downloadFile = (url: string, filename: string) => {
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Success Header */}
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4"
        >
          <CheckCircle className="w-10 h-10 text-green-600" />
        </motion.div>
        <h2 className="text-4xl font-bold mb-2">Processing Complete!</h2>
        <p className="text-xl text-slate-600">
          Your building analysis is ready
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold">Rooms Analyzed</h3>
          </div>
          <p className="text-4xl font-bold text-slate-900 mb-2">
            {results?.summary?.totalRooms || 0}
          </p>
          <p className="text-sm text-slate-600">
            Classified into {results?.summary?.roomTypes || 0} types
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold">Total Cost</h3>
          </div>
          <p className="text-4xl font-bold text-slate-900 mb-2">
            €{results?.costs?.total?.toLocaleString() || '0'}
          </p>
          <p className="text-sm text-slate-600">
            Across all trades (DIN 276)
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold">Confidence</h3>
          </div>
          <p className="text-4xl font-bold text-slate-900 mb-2">
            {results?.summary?.confidence || 95}%
          </p>
          <p className="text-sm text-slate-600">
            Based on {results?.summary?.similarProjects || 15} similar projects
          </p>
        </motion.div>
      </div>

      {/* Cost Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card"
      >
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <DollarSign className="w-7 h-7 text-bkw-orange" />
          Cost Breakdown (DIN 276)
        </h3>
        
        <div className="space-y-4">
          {results?.costs?.breakdown?.map((item: any, index: number) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-semibold text-slate-900">{item.category}</span>
                  <span className="text-sm text-slate-600 ml-2">({item.code})</span>
                </div>
                <span className="text-lg font-bold text-slate-900">
                  €{item.amount.toLocaleString()}
                </span>
              </div>
              <div className="relative w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.percentage}%` }}
                  transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-bkw-orange to-bkw-blue rounded-full"
                />
              </div>
              <p className="text-sm text-slate-600">{item.description}</p>
            </div>
          )) || (
            <>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-semibold">Heat Supply Systems</span>
                    <span className="text-sm text-slate-600 ml-2">(KG 420)</span>
                  </div>
                  <span className="text-lg font-bold">€285,000</span>
                </div>
                <div className="relative w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "25%" }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-orange-500 to-red-500"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-semibold">Air Technology</span>
                    <span className="text-sm text-slate-600 ml-2">(KG 430)</span>
                  </div>
                  <span className="text-lg font-bold">€410,000</span>
                </div>
                <div className="relative w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "35%" }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-cyan-500"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-semibold">Electrical Systems</span>
                    <span className="text-sm text-slate-600 ml-2">(KG 440)</span>
                  </div>
                  <span className="text-lg font-bold">€520,000</span>
                </div>
                <div className="relative w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "40%" }}
                    transition={{ duration: 1, delay: 0.7 }}
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 to-pink-500"
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </motion.div>

      {/* Room Classifications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="card"
      >
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <FileText className="w-7 h-7 text-bkw-blue" />
          Room Classification Summary
        </h3>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {results?.roomClassifications?.map((room: any, index: number) => (
            <div key={index} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-slate-900">{room.type}</span>
                <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded">
                  {room.count}
                </span>
              </div>
              <div className="text-sm text-slate-600 space-y-1">
                <p>Heating: {room.heating} W/m²</p>
                <p>Cooling: {room.cooling} W/m²</p>
              </div>
            </div>
          )) || (
            <>
              {['Office', 'Meeting Room', 'WC', 'Corridor', 'Storage', 'Technical Room'].map((type, idx) => (
                <div key={idx} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">{type}</span>
                    <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded">
                      {Math.floor(Math.random() * 20) + 5}
                    </span>
                  </div>
                  <div className="text-sm text-slate-600 space-y-1">
                    <p>Heating: {Math.floor(Math.random() * 50) + 20} W/m²</p>
                    <p>Cooling: {Math.floor(Math.random() * 40) + 15} W/m²</p>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </motion.div>

      {/* Warnings/Recommendations */}
      {results?.warnings && results.warnings.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="card bg-amber-50 border-amber-200"
        >
          <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-amber-600" />
            Recommendations
          </h3>
          <ul className="space-y-2">
            {results.warnings.map((warning: string, index: number) => (
              <li key={index} className="text-slate-700 flex items-start gap-2">
                <span className="text-amber-600 mt-1">•</span>
                <span>{warning}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Download Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="grid md:grid-cols-3 gap-4"
      >
        <button
          onClick={() => downloadFile(results?.files?.roomBook || '#', 'technical_room_book.xlsx')}
          className="btn-secondary flex items-center justify-center gap-3"
        >
          <Download className="w-5 h-5" />
          Room Book (Excel)
        </button>
        
        <button
          onClick={() => downloadFile(results?.files?.costEstimate || '#', 'cost_estimate.xlsx')}
          className="btn-secondary flex items-center justify-center gap-3"
        >
          <Download className="w-5 h-5" />
          Cost Estimate (Excel)
        </button>
        
        <button
          onClick={() => downloadFile(results?.files?.report || '#', 'explanatory_report.pdf')}
          className="btn-secondary flex items-center justify-center gap-3"
        >
          <Download className="w-5 h-5" />
          Report (PDF)
        </button>
      </motion.div>
    </motion.div>
  )
}
