import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/layout/Header';
import ParcelForm from './components/parcels/ParcelForm';
import XMLUpload from './components/parcels/XMLUpload';
import ResultsDisplay from './components/parcels/ResultsDisplay';
import DepartmentManager from './components/departments/DepartmentManager';
// import ParcelVisualization from './components/parcels/ParcelVisualization';
import { useParcels } from './hooks/useApi';

function App() {
  const [activeTab, setActiveTab] = useState('parcels');
  const { processParcel, processXML, results, loading, error } = useParcels();

  const handleParcelSubmit = async (parcelData) => {
    await processParcel(parcelData);
  };

  const handleXMLUpload = async (xmlData) => {
    await processXML(xmlData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {activeTab === 'parcels' && (
            <motion.div
              key="parcels"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Page Header */}
              <div className="text-center">
                <h1 className="text-4xl font-bold text-white mb-4">
                  Parcel Processing
                </h1>
                <p className="text-xl text-gray-300">
                  Process parcels manually or upload an XML file for batch processing
                </p>
              </div>

              {/* 3D Visualization */}
              {/* <ParcelVisualization /> */}

              {/* Processing Sections */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <ParcelForm 
                  onSubmit={handleParcelSubmit}
                  loading={loading}
                />
                <XMLUpload 
                  onUpload={handleXMLUpload}
                  loading={loading}
                />
              </div>

              {/* Results */}
              <ResultsDisplay results={results} />

              {/* Error Display */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass border border-red-500/50 rounded-lg p-4 text-red-400"
                >
                  <strong>Error:</strong> {error}
                </motion.div>
              )}
            </motion.div>
          )}

          {activeTab === 'departments' && (
            <motion.div
              key="departments"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <DepartmentManager />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;