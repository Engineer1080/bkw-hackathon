'use client'

import { useState, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, File, X, Check, AlertCircle } from 'lucide-react'
import axios from 'axios'

interface FileUploadProps {
  onProcessingComplete: (data: any) => void
  setIsProcessing: (value: boolean) => void
}

export default function FileUpload({ onProcessingComplete, setIsProcessing }: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [projectInfo, setProjectInfo] = useState({
    location: '',
    buildingType: '',
    specialRequirements: ''
  })
  const [error, setError] = useState<string | null>(null)

  const acceptedFileTypes = useMemo(() => [
    '.ifc',
    '.rvt',
    '.xlsx',
    '.xlsm',
    '.xls',
    '.pdf'
  ], [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const addFiles = (newFiles: File[]) => {
    const validFiles = newFiles.filter(file => {
      const extension = '.' + file.name.split('.').pop()?.toLowerCase()
      return acceptedFileTypes.includes(extension)
    })
    
    if (validFiles.length !== newFiles.length) {
      setError('Some files were rejected. Please upload only IFC, RVT, Excel, or PDF files.')
      setTimeout(() => setError(null), 5000)
    }
    
    setFiles(prev => [...prev, ...validFiles])
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const droppedFiles = Array.from(e.dataTransfer.files)
    const validFiles = droppedFiles.filter(file => {
      const extension = '.' + file.name.split('.').pop()?.toLowerCase()
      return acceptedFileTypes.includes(extension)
    })
    
    if (validFiles.length !== droppedFiles.length) {
      setError('Some files were rejected. Please upload only IFC, RVT, Excel, or PDF files.')
      setTimeout(() => setError(null), 5000)
    }
    
    setFiles(prev => [...prev, ...validFiles])
  }, [acceptedFileTypes])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files)
      addFiles(selectedFiles)
    }
  }

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async () => {
    if (files.length === 0) {
      setError('Please upload at least one file')
      return
    }

    setIsProcessing(true)
    setError(null)

    try {
      const formData = new FormData()
      files.forEach(file => {
        formData.append('files', file)
      })
      formData.append('location', projectInfo.location)
      formData.append('buildingType', projectInfo.buildingType)
      formData.append('specialRequirements', projectInfo.specialRequirements)

      // TODO: Replace with your actual ML backend endpoint
      const API_ENDPOINT = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/process'
      
      const response = await axios.post(API_ENDPOINT, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      onProcessingComplete(response.data)
      
    } catch (err: any) {
      console.error('Error processing files:', err)
      setError(err.response?.data?.message || 'Failed to process files. Please try again.')
      setIsProcessing(false)
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
    <div className="space-y-6">
      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3"
          >
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-red-900">Error</h4>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Drop Zone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`card relative cursor-pointer transition-all bg-white dark:bg-slate-800 ${
          isDragging ? 'border-bkw-orange border-4 bg-orange-50 dark:bg-orange-950' : 'border-dashed border-2 border-slate-300 dark:border-slate-600'
        }`}
      >
        <input
          type="file"
          multiple
          onChange={handleFileSelect}
          accept={acceptedFileTypes.join(',')}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          id="file-upload"
        />
        
        <div className="text-center py-12">
          <motion.div
            animate={{ y: isDragging ? -10 : 0 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-bkw-orange to-bkw-blue rounded-full mb-6"
          >
            <Upload className="w-10 h-10 text-white" />
          </motion.div>
          
          <h3 className="text-2xl font-bold mb-2 dark:text-white">
            {isDragging ? 'Drop your files here' : 'Upload Your Files'}
          </h3>
          <p className="text-slate-600 dark:text-slate-300 mb-4">
            Drag and drop or click to browse
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Supported: IFC, RVT, XLSX, XLSM, PDF (Max 100MB each)
          </p>
        </div>
      </motion.div>

      {/* Uploaded Files List */}
      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-3"
          >
            <h4 className="font-semibold text-lg flex items-center gap-2 dark:text-white">
              <Check className="w-5 h-5 text-green-600" />
              Uploaded Files ({files.length})
            </h4>
            
            {files.map((file, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-center justify-between p-4 bg-white dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                    <File className="w-5 h-5 text-blue-600 dark:text-blue-300" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">{file.name}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{formatFileSize(file.size)}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="p-2 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition"
                >
                  <X className="w-5 h-5 text-red-600 dark:text-red-400" />
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project Information */}
      <div className="card space-y-4 bg-white dark:bg-slate-800">
        <h4 className="font-semibold text-lg dark:text-white">Project Information (Optional)</h4>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Location
            </label>
            <input
              type="text"
              value={projectInfo.location}
              onChange={(e) => setProjectInfo(prev => ({ ...prev, location: e.target.value }))}
              placeholder="e.g., München, Germany"
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-bkw-orange focus:border-transparent outline-none bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Building Type
            </label>
            <select
              value={projectInfo.buildingType}
              onChange={(e) => setProjectInfo(prev => ({ ...prev, buildingType: e.target.value }))}
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-bkw-orange focus:border-transparent outline-none bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
            >
              <option value="">Select type...</option>
              <option value="office">Office Building</option>
              <option value="residential">Residential</option>
              <option value="industrial">Industrial</option>
              <option value="educational">Educational</option>
              <option value="healthcare">Healthcare</option>
              <option value="mixed">Mixed Use</option>
            </select>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Special Requirements
          </label>
          <textarea
            value={projectInfo.specialRequirements}
            onChange={(e) => setProjectInfo(prev => ({ ...prev, specialRequirements: e.target.value }))}
            placeholder="e.g., Laboratory rooms on ground floor, high energy efficiency requirements..."
            rows={3}
            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-bkw-orange focus:border-transparent outline-none resize-none bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
          />
        </div>
      </div>

      {/* Process Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleSubmit}
        disabled={files.length === 0}
        className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none flex items-center justify-center gap-3"
      >
        <Upload className="w-5 h-5" />
        Process Files with AI
      </motion.button>
    </div>
  )
}
