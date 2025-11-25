import React from 'react';
import { Package, Settings } from 'lucide-react';
import Button from '../ui/Button';

const Header = ({ activeTab, onTabChange }) => {
  return (
    <header className="glass border-b border-gray-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Parcel Distribution</h1>
              <p className="text-gray-300 text-sm">Professional Logistics Platform</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex gap-2">
            <Button
              variant={activeTab === 'parcels' ? 'primary' : 'secondary'}
              onClick={() => onTabChange('parcels')}
              className="flex items-center gap-2"
            >
              <Package className="w-4 h-4" />
              Parcel Processing
            </Button>
            <Button
              variant={activeTab === 'departments' ? 'primary' : 'secondary'}
              onClick={() => onTabChange('departments')}
              className="flex items-center gap-2"
            >
              <Settings className="w-4 h-4" />
              Department Config
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;