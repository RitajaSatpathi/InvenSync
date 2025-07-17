import React from 'react';
import { ArrowRight, Package, BarChart3, Bell, MapPin, Cuboid as Cube } from 'lucide-react';

interface WelcomeScreenProps {
  onEnterDashboard: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onEnterDashboard }) => {
  const handleEnterDashboard = () => {
    onEnterDashboard();
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/warehouse copy.jpg')" }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>

      {/* Foreground content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-end pb-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo and Title */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-full mb-6 backdrop-blur-sm border border-white/20">
              <Cube className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-6xl font-bold text-white mb-4">
              InvenSync
            </h1>
            <p className="text-2xl text-gray-200 font-light mb-8">
              Track, Predict, and Replenish Smartly
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <BarChart3 className="w-8 h-8 text-blue-200 mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">Real-Time Analytics</h3>
              <p className="text-gray-300 text-sm">Live insights and predictive forecasting</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <Bell className="w-8 h-8 text-blue-200 mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">Smart Alerts</h3>
              <p className="text-gray-300 text-sm">Proactive notifications and warnings</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <Package className="w-8 h-8 text-blue-200 mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">Auto Replenishment</h3>
              <p className="text-gray-300 text-sm">Automated ordering and restocking</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <MapPin className="w-8 h-8 text-blue-200 mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">IoT Sensor Network</h3>
              <p className="text-gray-300 text-sm">Real-time monitoring and tracking</p>
            </div>
          </div>

          {/* Enter Dashboard Button */}
          <button
            onClick={handleEnterDashboard}
            className="inline-flex items-center px-12 py-4 bg-blue-600 text-white font-semibold text-lg rounded-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 shadow-2xl hover:shadow-blue-500/25"
          >
            Enter Dashboard
            <ArrowRight className="ml-3 w-6 h-6" />
          </button>

          <div className="mt-8 text-gray-400 text-sm">
            <p>Powered by advanced AI and IoT technology</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
