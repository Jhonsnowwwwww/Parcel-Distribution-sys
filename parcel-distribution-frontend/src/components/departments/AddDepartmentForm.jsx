import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

const AddDepartmentForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    name: '',
    condition_type: 'weight',
    operator: '<=',
    value: '',
    priority: 0,
    color_theme: 'blue'
  });

  const conditionTypes = [
    { value: 'weight', label: 'Weight (kg)' },
    { value: 'value', label: 'Value (€)' }
  ];

  const operators = [
    { value: '<=', label: 'Less than or equal' },
    { value: '<', label: 'Less than' },
    { value: '>', label: 'Greater than' },
    { value: '>=', label: 'Greater than or equal' }
  ];

  const colors = [
    { value: 'blue', label: 'Blue' },
    { value: 'green', label: 'Green' },
    { value: 'orange', label: 'Orange' },
    { value: 'red', label: 'Red' },
    { value: 'purple', label: 'Purple' },
    { value: 'yellow', label: 'Yellow' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const submissionData = {
      ...formData,
      value: parseFloat(formData.value),
      priority: parseInt(formData.priority)
    };

    try {
      await onSubmit(submissionData);
      // Reset form
      setFormData({
        name: '',
        condition_type: 'weight',
        operator: '<=',
        value: '',
        priority: 0,
        color_theme: 'blue'
      });
    } catch (error) {
      // Error handled by parent
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div >

 <Card>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-purple-600 rounded-lg">
          <Plus className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white">Add New Department</h2>
          <p className="text-gray-300 text-sm">Create a custom department with routing rules</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Department Name"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="Express"
          />
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-200">
              Condition Type
            </label>
            <select
              value={formData.condition_type}
              onChange={(e) => handleChange('condition_type', e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {conditionTypes.map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-200">
              Operator
            </label>
            <select
              value={formData.operator}
              onChange={(e) => handleChange('operator', e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {operators.map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Value"
            type="number"
            step="0.01"
            value={formData.value}
            onChange={(e) => handleChange('value', e.target.value)}
            placeholder="0.00"
          />
          
          <Input
            label="Priority"
            type="number"
            value={formData.priority}
            onChange={(e) => handleChange('priority', e.target.value)}
            placeholder="0"
          />

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-200">
              Color Theme
            </label>
            <select
              value={formData.color_theme}
              onChange={(e) => handleChange('color_theme', e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {colors.map(color => (
                <option key={color.value} value={color.value}>
                  {color.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <Button
          type="submit"
          loading={loading}
          className="w-full mt-6"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Department
        </Button>
      </form>
    </Card>
    </div>
   
  );
};

export default AddDepartmentForm;