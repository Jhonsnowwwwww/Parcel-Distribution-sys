import React, { useCallback, useState } from 'react';
import { Upload, FileText, Download, Play, AlertCircle } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';

const XMLUpload = ({ onUpload, loading }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [xmlData, setXmlData] = useState(null);
  const [error, setError] = useState(null);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
    setError(null);
    
    const files = Array.from(e.dataTransfer.files);
    const xmlFile = files.find(file => file.type === 'text/xml' || file.name.endsWith('.xml'));
    
    if (xmlFile) {
      setSelectedFile(xmlFile);
      readFile(xmlFile);
    } else {
      setError('Please select a valid XML file');
    }
  }, []);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setError(null);
    
    if (file) {
      // Validate file type
      if (file.type === 'text/xml' || file.name.endsWith('.xml')) {
        setSelectedFile(file);
        readFile(file);
      } else {
        setError('Please select a valid XML file (.xml)');
      }
    }
  };

  const readFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      setXmlData(content);
      console.log('XML file read successfully:', content.substring(0, 100) + '...');
    };
    reader.onerror = () => {
      setError('Error reading file');
    };
    reader.readAsText(file);
  };

  const handleProcessXML = async () => {
    if (xmlData) {
      setError(null);
      console.log('Processing XML data:', xmlData);
      
      try {
        await onUpload(xmlData);
        // Reset after successful processing
        setSelectedFile(null);
        setXmlData(null);
        // Clear file input
        document.getElementById('xml-file-input').value = '';
      } catch (err) {
        setError(`Processing failed: ${err.message}`);
        console.error('XML processing error:', err);
      }
    } else {
      setError('No XML data to process');
    }
  };

  const downloadSampleXML = () => {
    const sampleXML = `<?xml version="1.0" encoding="UTF-8"?>
<container>
  <parcels>
    <parcel>
      <weight>0.5</weight>
      <value>50</value>
      <recipient>John Doe</recipient>
      <destination>New York</destination>
    </parcel>
    <parcel>
      <weight>5</weight>
      <value>1500</value>
      <recipient>Jane Smith</recipient>
      <destination>London</destination>
    </parcel>
    <parcel>
      <weight>15</weight>
      <value>800</value>
      <recipient>Bob Johnson</recipient>
      <destination>Tokyo</destination>
    </parcel>
  </parcels>
</container>`;

    const blob = new Blob([sampleXML], { type: 'text/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sample-parcels.xml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-green-600 rounded-lg">
          <FileText className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white">XML File Upload</h2>
          <p className="text-gray-300 text-sm">Upload an XML file containing parcel data</p>
        </div>
      </div>

      <div
        className={`
          border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 cursor-pointer mb-4
          ${isDragOver 
            ? 'border-blue-500 bg-blue-500/10' 
            : 'border-gray-600 hover:border-gray-400'
          }
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById('xml-file-input').click()}
      >
        <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        <p className="text-lg font-medium text-white mb-2">
          Drag and drop your XML file here, or
        </p>
        <Button variant="secondary" className="mb-4">
          Select File
        </Button>
        <p className="text-gray-400 text-sm">
          {selectedFile ? `Selected: ${selectedFile.name}` : 'No file selected'}
        </p>
        
        <input
          id="xml-file-input"
          type="file"
          accept=".xml"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg flex items-center gap-2 text-red-300">
          <AlertCircle className="w-4 h-4" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      {/* Process Button */}
      {selectedFile && xmlData && (
        <div className="mb-4">
          <Button
            onClick={handleProcessXML}
            loading={loading}
            className="w-full"
            size="lg"
          >
            <Play className="w-4 h-4 mr-2" />
            Process XML File ({selectedFile.name})
          </Button>
        </div>
      )}

      <div className="pt-4 border-t border-gray-600">
        <Button
          variant="secondary"
          onClick={downloadSampleXML}
          className="w-full"
        >
          <Download className="w-4 h-4 mr-2" />
          Download Sample XML
        </Button>
      </div>
    </Card>
  );
};

export default XMLUpload;