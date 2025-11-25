import React, { useState } from 'react';
import { Package, Euro, User, MapPin } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Card from '../ui/Card';

const ParcelForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    weight: '',
    value: '',
    recipient: 'John Doe',
    destination: 'New York, USA'
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.weight || parseFloat(formData.weight) <= 0) {
      newErrors.weight = 'Weight must be greater than 0';
    }
    
    if (!formData.value || parseFloat(formData.value) < 0) {
      newErrors.value = 'Value must be 0 or greater';
    }
    
    if (!formData.recipient.trim()) {
      newErrors.recipient = 'Recipient is required';
    }
    
    if (!formData.destination.trim()) {
      newErrors.destination = 'Destination is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const submissionData = {
      weight: parseFloat(formData.weight),
      value: parseFloat(formData.value),
      recipient: formData.recipient,
      destination: formData.destination
    };

    try {
      await onSubmit(submissionData);
      // Reset form on success
      setFormData(prev => ({
        ...prev,
        weight: '',
        value: ''
      }));
    } catch (error) {
      // Error handled by parent
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <Card glow className="h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-600 rounded-lg">
          <Package className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white">Manual Parcel Entry</h2>
          <p className="text-gray-300 text-sm">Enter parcel details for processing</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Weight (kg)"
            type="number"
            step="0.01"
            min="0"
            placeholder="0.00"
            value={formData.weight}
            onChange={(e) => handleChange('weight', e.target.value)}
            error={errors.weight}
          />
          
          <Input
            label="Value (€)"
            type="number"
            step="0.01"
            min="0"
            placeholder="0.00"
            value={formData.value}
            onChange={(e) => handleChange('value', e.target.value)}
            error={errors.value}
          />
        </div>

        <Input
          label="Recipient"
          type="text"
          placeholder="John Doe"
          value={formData.recipient}
          onChange={(e) => handleChange('recipient', e.target.value)}
          error={errors.recipient}
        />

        <Input
          label="Destination"
          type="text"
          placeholder="New York, USA"
          value={formData.destination}
          onChange={(e) => handleChange('destination', e.target.value)}
          error={errors.destination}
        />

        <div className="pt-4 border-t border-gray-600">
          <h3 className="text-lg font-medium text-white mb-4">Submit Panel</h3>
          <Button
            type="submit"
            loading={loading}
            className="w-full"
            size="lg"
          >
            Process Parcel
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default ParcelForm;