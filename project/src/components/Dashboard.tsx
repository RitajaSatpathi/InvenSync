import React, { useState, useEffect } from 'react';
import { AlertTriangle, TrendingUp, Package, Clock } from 'lucide-react';

interface InventoryItem {
  id: string;
  name: string;
  stock: number;
  location: string;
  status: 'OK' | 'Low' | 'Critical';
  lastUpdated: string;
}

const Dashboard: React.FC = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([
    { id: '1', name: 'Wireless Headphones', stock: 145, location: 'Zone A', status: 'OK', lastUpdated: '2s ago' },
    { id: '2', name: 'Smartphone Cases', stock: 23, location: 'Zone B', status: 'Low', lastUpdated: '1s ago' },
    { id: '3', name: 'USB Cables', stock: 8, location: 'Zone C', status: 'Critical', lastUpdated: '3s ago' },
    { id: '4', name: 'Bluetooth Speakers', stock: 67, location: 'Zone A', status: 'OK', lastUpdated: '5s ago' },
    { id: '5', name: 'Power Banks', stock: 34, location: 'Zone B', status: 'OK', lastUpdated: '2s ago' },
    { id: '6', name: 'Screen Protectors', stock: 12, location: 'Zone C', status: 'Low', lastUpdated: '1s ago' },
  ]);

  const [lastUpdate, setLastUpdate] = useState(new Date());

  const determineStatus = (stock: number): 'OK' | 'Low' | 'Critical' => {
    if (stock <= 10) return 'Critical';
    if (stock <= 25) return 'Low';
    return 'OK';
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
      setInventory(prev =>
        prev.map(item => {
          const newStock = Math.max(0, item.stock + Math.floor(Math.random() * 6) - 3);
          return {
            ...item,
            stock: newStock,
            status: determineStatus(newStock),
            lastUpdated: `${Math.floor(Math.random() * 10) + 1}s ago`,
          };
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Critical':
        return 'bg-red-100 text-red-800';
      case 'Low':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  const criticalItems = inventory.filter(item => item.status === 'Critical').length;
  const lowItems = inventory.filter(item => item.status === 'Low').length;
  const totalItems = inventory.reduce((sum, item) => sum + item.stock, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Real-Time Inventory Dashboard</h1>
        <p className="text-gray-600 mt-2">Monitor your warehouse stock levels in real-time</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Package className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Total Stock</h3>
              <p className="text-2xl font-bold text-blue-600">{totalItems}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <AlertTriangle className="h-8 w-8 text-red-600" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Critical Items</h3>
              <p className="text-2xl font-bold text-red-600">{criticalItems}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-yellow-600" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Low Stock</h3>
              <p className="text-2xl font-bold text-yellow-600">{lowItems}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Last Update</h3>
              <p className="text-sm text-green-600">{lastUpdate.toLocaleTimeString()}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Live Inventory Status</h2>
          <p className="text-sm text-gray-600 mt-1">Updated {lastUpdate.toLocaleTimeString()}</p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock Level</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {inventory.map(item => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{item.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-block px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded">
                      {item.stock} units
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{item.location}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}>
                      {item.status === 'Critical' && <AlertTriangle className="h-3 w-3 mr-1" />}
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.lastUpdated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Stock Trend - Last 24 Hours</h2>
        <div className="h-64 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <TrendingUp className="h-12 w-12 text-blue-600 mx-auto mb-2" />
            <p className="text-gray-600">Interactive chart showing stock trends over time</p>
            <p className="text-sm text-gray-500 mt-1">Real-time data visualization</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
