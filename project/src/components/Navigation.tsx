import React from 'react';
import { Cuboid as Cube, Bell, TrendingUp, RotateCcw, MapPin, Package } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  alertCount: number;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab, alertCount }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Package },
    { id: 'alerts', label: 'Alerts', icon: Bell },
    { id: 'forecasting', label: 'Forecast', icon: TrendingUp },
    { id: 'replenishment', label: 'Replenishment', icon: RotateCcw },
    { id: 'sensor-map', label: 'Sensor Map', icon: MapPin },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Cube className="h-8 w-8 text-blue-600 mr-2" />
            <span className="text-xl font-bold text-gray-900">InvenSync</span>
          </div>

          {/* Navigation Items */}
          <div className="flex space-x-8">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors relative ${
                  activeTab === id
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className="h-4 w-4 mr-2" />
                {label}
                {id === 'alerts' && alertCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {alertCount}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;