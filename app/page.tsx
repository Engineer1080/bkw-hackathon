'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, FileText, DollarSign, BookOpen, Sparkles, CheckCircle, ArrowRight, Zap, Brain, TrendingUp, Moon, Sun } from 'lucide-react'
import FileUpload from '@/components/FileUpload'
import ResultsDashboard from '@/components/ResultsDashboard'
import { useTheme } from './ThemeProvider'

export default function Home() {
  const [results, setResults] = useState<any>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const { theme, toggleTheme } = useTheme()

  const handleProcessingComplete = (data: any) => {
    setResults(data)
    setIsProcessing(false)
  }

  const features = [
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Technical Room Book",
      description: "Automatic room classification and performance calculations",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Cost Estimation",
      description: "Precise cost estimates based on DIN 276 standards",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Explanatory Report",
      description: "Auto-generated professional documentation",
      color: "from-purple-500 to-pink-500"
    }
  ]

  const stats = [
    { label: "Time Saved", value: "20h", icon: <Zap /> },
    { label: "Accuracy", value: "95%", icon: <Brain /> },
    { label: "Cost Reduction", value: "40%", icon: <TrendingUp /> }
  ]

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors">
      {/* Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-700 z-50"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-bkw-orange to-bkw-blue rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">BKW AI Assistant</h1>
              <p className="text-xs text-slate-600 dark:text-slate-400">Smarter Building Planning</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-slate-600 dark:text-slate-300 hover:text-bkw-orange transition">Features</a>
              <a href="#upload" className="text-slate-600 dark:text-slate-300 hover:text-bkw-orange transition">Upload</a>
              <button className="bg-bkw-orange text-white px-5 py-2 rounded-lg hover:bg-orange-600 transition">
                Get Started
              </button>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: 'url(/modern_office.jpg)' }}
          />
          {/* Light Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-slate-900/20 to-slate-900/40" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-orange-100/90 backdrop-blur-sm text-bkw-orange px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4" />
              <span>BKW Engineering x TUM.ai Hackathon 2025</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
              <span className="bg-gradient-to-r from-orange-600 to-orange-300 bg-clip-text text-transparent">AI-Powered</span>
              <br />
              Building Planning
            </h1>
            
            <p className="text-xl text-slate-100 mb-8 max-w-3xl mx-auto drop-shadow-lg">
              Upload your architectural model and get instant room classifications, 
              performance calculations, cost estimates, and professional reports.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + idx * 0.1 }}
                  className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-xl"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-bkw-orange">{stat.icon}</div>
                    <span className="text-3xl font-bold text-slate-900">{stat.value}</span>
                  </div>
                  <p className="text-slate-600 text-sm">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            <motion.a
              href="#upload"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-bkw-orange text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-2xl hover:shadow-bkw-orange/50 transition-all"
            >
              Start Processing
              <ArrowRight className="w-5 h-5" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 dark:text-white">
              Three Problems. <span className="text-gradient">One Solution.</span>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              Our AI handles the entire planning workflow automatically
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className="card relative overflow-hidden group bg-white dark:bg-slate-700"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center text-white mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3 dark:text-white">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Upload Section */}
      <section id="upload" className="relative py-20 px-6 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: 'url(/residential_building.jpg)' }}
          />
          {/* Light Overlay for better content readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50/90 via-slate-50/85 to-slate-50/90 dark:from-slate-900/90 dark:via-slate-900/85 dark:to-slate-900/90" />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 dark:text-white">
              Ready to <span className="text-gradient">Transform</span> Your Workflow?
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              Upload your files and let AI do the heavy lifting
            </p>
          </motion.div>

          <FileUpload 
            onProcessingComplete={handleProcessingComplete}
            setIsProcessing={setIsProcessing}
          />

          {isProcessing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-12 glass-card text-center bg-white/90 dark:bg-slate-800/90"
            >
              <div className="animate-spin w-12 h-12 border-4 border-bkw-orange border-t-transparent rounded-full mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 dark:text-white">Processing Your Files...</h3>
              <p className="text-slate-600 dark:text-slate-300">Our AI is analyzing rooms, calculating costs, and generating reports</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Results Section */}
      {results && (
        <section className="py-20 px-6 bg-white dark:bg-slate-800">
          <div className="max-w-7xl mx-auto">
            <ResultsDashboard results={results} />
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-slate-900 dark:bg-slate-950 text-white py-12 px-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-bkw-orange to-bkw-blue rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold">BKW AI Assistant</span>
          </div>
          <p className="text-slate-400 dark:text-slate-500 mb-6">
            Built for the BKW Engineering x TUM.ai Hackathon 2025
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-600">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>Railway Deployment Ready</span>
          </div>
        </div>
      </footer>
    </main>
  )
}
