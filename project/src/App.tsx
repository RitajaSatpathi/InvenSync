import React, { useState, useEffect } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import Alerts from './components/Alerts';
import Forecasting from './components/Forecasting';
import Replenishment from './components/Replenishment';
import SensorMap from './components/SensorMap';

function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [alertCount, setAlertCount] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setAlertCount(prev => Math.max(0, prev + Math.floor(Math.random() * 3) - 1));
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const handleEnterDashboard = () => {
    setShowWelcome(false);
  };

  if (showWelcome) {
    return <WelcomeScreen onEnterDashboard={handleEnterDashboard} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'alerts':
        return <Alerts />;
      case 'forecasting':
        return <Forecasting />;
      case 'replenishment':
        return <Replenishment />;
      case 'sensor-map':
        return <SensorMap />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        alertCount={alertCount}
      />
      <main className="pt-16">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
