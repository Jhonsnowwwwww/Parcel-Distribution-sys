import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Trash2 } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';

const DepartmentCard = ({ department, onEdit, onDelete, isDefault = false }) => {
  const getGlowColor = (name) => {
    const colors = {
      Mail: 'glow-blue',
      Regular: 'glow-green', 
      Heavy: 'glow-orange',
      Insurance: 'glow-red',
    };
    return colors[name] || '';
  };

  const getCategoryName = (name) => {
    const categories = {
      Mail: 'Category 1',
      Regular: 'Category 2',
      Heavy: 'Category 3',
      Insurance: 'Category 4',
    };
    return categories[name] || 'Custom';
  };

  const formatRule = (dept) => {
    if (dept.name === 'Regular') {
      return 'Weight > 1 kg AND Weight <= 10 kg';
    }
    return `${dept.condition_type} ${dept.operator} ${dept.value} ${
      dept.condition_type === 'weight' ? 'kg' : '€'
    }`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="h-full"
    >
      <Card glow={getGlowColor(department.name)} className="h-full">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-white">{department.name}</h3>
            <p className="text-gray-300 text-sm">{getCategoryName(department.name)}</p>
          </div>
          {!isDefault && (
            <div className="flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onEdit(department)}
              >
                <Settings className="w-3 h-3" />
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => onDelete(department.id)}
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-medium text-gray-200 mb-1">RULES:</h4>
            <p className="text-white text-sm">{formatRule(department)}</p>
          </div>
          
          <div className="flex justify-between items-center pt-3 border-t border-gray-600">
            <span className="text-gray-400 text-sm">
              Priority: {department.priority}
            </span>
            <span 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: department.color_theme }}
            />
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default DepartmentCard;