import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Settings } from 'lucide-react';
import Card from '../ui/Card';
import DepartmentCard from './DepartmentCard';
import AddDepartmentForm from './AddDepartmentForm';
import { useDepartments } from '../../hooks/useApi';

const DepartmentManager = () => {
  const { departments, loading, error, fetchDepartments, createDepartment, deleteDepartment } = useDepartments();

  const defaultDepartments = ['Mail', 'Regular', 'Heavy', 'Insurance'];

  useEffect(() => {
    fetchDepartments();
  }, [fetchDepartments]);

  const handleCreateDepartment = async (departmentData) => {
    await createDepartment(departmentData);
  };

  const handleDeleteDepartment = async (departmentId) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      await deleteDepartment(departmentId);
    }
  };

  if (error) {
    return (
      <Card>
        <div className="text-center text-red-400 py-8">
          Error loading departments: {error}
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-2">
          Department Configuration
        </h1>
        <p className="text-gray-300 text-lg">
          Manage business rules for parcel routing
        </p>
      </div>

      {/* Current Departments */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-600 rounded-lg">
            <Settings className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-semibold text-white">Current Departments</h2>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="h-40 animate-pulse">
                <div className="space-y-3">
                  <div className="h-4 bg-gray-600 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-600 rounded w-1/2"></div>
                  <div className="h-8 bg-gray-600 rounded"></div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {departments.map(dept => (
              <DepartmentCard
                key={dept.id}
                department={dept}
                isDefault={defaultDepartments.includes(dept.name)}
                onDelete={handleDeleteDepartment}
              />
            ))}
          </div>
        )}
      </section>

      {/* Add New Department */}
      <section>
        <AddDepartmentForm 
          onSubmit={handleCreateDepartment}
          loading={loading}
        />
      </section>
    </div>
  );
};

export default DepartmentManager;