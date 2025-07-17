import React, { useState, useEffect } from 'react';
import { AlertTriangle, Check, ShoppingCart, X, Volume2, VolumeX } from 'lucide-react';

interface Alert {
  id: string;
  product: string;
  message: string;
  timestamp: string;
  priority: 'Critical' | 'Warning';
  acknowledged: boolean;
}

const Alerts: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      product: 'USB Cables',
      message: 'Stock level has dropped below critical threshold (8 units remaining)',
      timestamp: '2 minutes ago',
      priority: 'Critical',
      acknowledged: false
    },
    {
      id: '2',
      product: 'Smartphone Cases',
      message: 'Low stock warning - 23 units remaining',
      timestamp: '5 minutes ago',
      priority: 'Warning',
      acknowledged: false
    },
    {
      id: '3',
      product: 'Screen Protectors',
      message: 'Inventory level approaching minimum threshold',
      timestamp: '12 minutes ago',
      priority: 'Warning',
      acknowledged: true
    }
  ]);

  const [filter, setFilter] = useState<'All' | 'Critical' | 'Warning'>('All');
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    // Simulate new alerts
    const interval = setInterval(() => {
      const newAlert: Alert = {
        id: Date.now().toString(),
        product: 'Power Banks',
        message: 'Stock level changed - monitoring required',
        timestamp: 'Just now',
        priority: Math.random() > 0.5 ? 'Critical' : 'Warning',
        acknowledged: false
      };
      
      setAlerts(prev => [newAlert, ...prev.slice(0, 9)]);
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  const handleAcknowledge = (alertId: string) => {
    setAlerts(prev => 
      prev.map(alert => 
        alert.id === alertId ? { ...alert, acknowledged: true } : alert
      )
    );
  };

  const handleReorder = (alertId: string) => {
    const alert = alerts.find(a => a.id === alertId);
    if (alert) {
      // Simulate reorder action
      alert('Reorder initiated for ' + alert.product);
      handleAcknowledge(alertId);
    }
  };

  const handleIgnore = (alertId: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
  };

  const filteredAlerts = alerts.filter(alert => 
    filter === 'All' || alert.priority === filter
  );

  const getPriorityColor = (priority: string) => {
    return priority === 'Critical' 
      ? 'text-red-600 bg-red-100' 
      : 'text-yellow-600 bg-yellow-100';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Stock Alerts</h1>
        <p className="text-gray-600 mt-2">Monitor and manage inventory alerts</p>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">Filter by Priority:</label>
            <select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value as 'All' | 'Critical' | 'Warning')}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Alerts</option>
              <option value="Critical">Critical Only</option>
              <option value="Warning">Warning Only</option>
            </select>
          </div>
          
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              soundEnabled 
                ? 'bg-blue-100 text-blue-700' 
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            {soundEnabled ? <Volume2 className="h-4 w-4 mr-2" /> : <VolumeX className="h-4 w-4 mr-2" />}
            Alert Sounds {soundEnabled ? 'On' : 'Off'}
          </button>
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.map((alert) => (
          <div 
            key={alert.id} 
            className={`bg-white rounded-lg shadow p-6 border-l-4 ${
              alert.priority === 'Critical' 
                ? 'border-red-500' 
                : 'border-yellow-500'
            } ${alert.acknowledged ? 'opacity-75' : ''}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <AlertTriangle className={`h-5 w-5 mr-2 ${
                    alert.priority === 'Critical' ? 'text-red-500' : 'text-yellow-500'
                  }`} />
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(alert.priority)}`}>
                    {alert.priority}
                  </span>
                  <span className="text-sm text-gray-500 ml-4">{alert.timestamp}</span>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{alert.product}</h3>
                <p className="text-gray-600">{alert.message}</p>
              </div>
              
              {!alert.acknowledged && (
                <div className="flex space-x-2 ml-4">
                  <button
                    onClick={() => handleAcknowledge(alert.id)}
                    className="flex items-center px-3 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors text-sm"
                  >
                    <Check className="h-4 w-4 mr-1" />
                    Acknowledge
                  </button>
                  
                  <button
                    onClick={() => handleReorder(alert.id)}
                    className="flex items-center px-3 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors text-sm"
                  >
                    <ShoppingCart className="h-4 w-4 mr-1" />
                    Reorder
                  </button>
                  
                  <button
                    onClick={() => handleIgnore(alert.id)}
                    className="flex items-center px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-sm"
                  >
                    <X className="h-4 w-4 mr-1" />
                    Ignore
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredAlerts.length === 0 && (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No alerts found</h3>
          <p className="text-gray-600">No alerts match your current filter settings.</p>
        </div>
      )}
    </div>
  );
};

export default Alerts;