import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import Card from '../ui/Card';

const DepartmentBadge = ({ department, requiresInsurance }) => {
  const getDepartmentStyle = (dept) => {
    const styles = {
      Mail: 'bg-blue-500/20 text-blue-300 border-blue-500',
      Regular: 'bg-green-500/20 text-green-300 border-green-500',
      Heavy: 'bg-orange-500/20 text-orange-300 border-orange-500',
      Insurance: 'bg-red-500/20 text-red-300 border-red-500',
    };
    return styles[dept] || 'bg-gray-500/20 text-gray-300 border-gray-500';
  };

  return (
    <div className="flex flex-wrap gap-2">
      {requiresInsurance && (
        <span className="px-3 py-1 rounded-full border text-sm font-medium bg-red-500/20 text-red-300 border-red-500 glow-red">
          <AlertCircle className="w-3 h-3 inline mr-1" />
          Insurance Required
        </span>
      )}
      {department.map((dept, index) => (
        <span
          key={dept}
          className={`px-3 py-1 rounded-full border text-sm font-medium ${getDepartmentStyle(dept)}`}
        >
          {dept}
        </span>
      ))}
    </div>
  );
};

const ResultsDisplay = ({ results }) => {
  if (results.length === 0) {
    return (
      <Card>
        <div className="text-center py-12">
          <Package className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h3 className="text-xl font-semibold text-white mb-2">
            No parcels processed yet
          </h3>
          <p className="text-gray-300">
            Add a parcel or upload an XML file to get started
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-600 rounded-lg">
          <CheckCircle className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white">Processing Results</h2>
          <p className="text-gray-300 text-sm">
            {results.length} parcel{results.length !== 1 ? 's' : ''} processed
          </p>
        </div>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        <AnimatePresence>
          {results.map((result, index) => (
            <motion.div
              key={result.id || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass rounded-lg p-4 border border-gray-600"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-700 rounded">
                    <Package className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">
                      {result.parcel?.recipient || 'Unknown Recipient'}
                    </h4>
                    <p className="text-gray-300 text-sm">
                      {result.parcel?.destination || 'Unknown Destination'}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-medium">
                    {result.parcel?.weight} kg
                  </p>
                  <p className="text-gray-300 text-sm">
                    €{result.parcel?.value}
                  </p>
                </div>
              </div>

              <DepartmentBadge 
                department={result.departments} 
                requiresInsurance={result.requiresInsurance}
              />

              {result.processingOrder && (
                <div className="mt-3 flex items-center gap-2 text-gray-400 text-sm">
                  <Clock className="w-3 h-3" />
                  <span>Processing order: {result.processingOrder.join(' → ')}</span>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </Card>
  );
};

export default ResultsDisplay;