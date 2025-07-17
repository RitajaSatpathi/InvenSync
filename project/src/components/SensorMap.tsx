import React, { useState, useEffect } from 'react';
import { MapPin, Wifi, WifiOff, Thermometer, Battery, Package } from 'lucide-react';

interface Sensor {
  id: string;
  zone: string;
  position: { x: number; y: number };
  product: string;
  stock: number;
  status: 'online' | 'offline' | 'warning';
  battery: number;
  temperature: number;
  lastUpdate: string;
  rackId: string;
}

interface MovingItem {
  id: string;
  position: { x: number; y: number };
  targetPosition: { x: number; y: number };
  product: string;
  status: 'moving' | 'arrived';
}

const SensorMap: React.FC = () => {
  const [sensors, setSensors] = useState<Sensor[]>([
    {
      id: 'S001',
      zone: 'Zone A',
      position: { x: 15, y: 20 },
      product: 'Wireless Headphones',
      stock: 145,
      status: 'online',
      battery: 85,
      temperature: 22,
      lastUpdate: '2s ago',
      rackId: 'A1-01'
    },
    {
      id: 'S002',
      zone: 'Zone A',
      position: { x: 35, y: 20 },
      product: 'Bluetooth Speakers',
      stock: 67,
      status: 'online',
      battery: 92,
      temperature: 21,
      lastUpdate: '1s ago',
      rackId: 'A1-02'
    },
    {
      id: 'S003',
      zone: 'Zone A',
      position: { x: 55, y: 20 },
      product: 'Gaming Headsets',
      stock: 89,
      status: 'warning',
      battery: 78,
      temperature: 24,
      lastUpdate: '5s ago',
      rackId: 'A1-03'
    },
    {
      id: 'S004',
      zone: 'Zone B',
      position: { x: 15, y: 45 },
      product: 'Smartphone Cases',
      stock: 23,
      status: 'warning',
      battery: 67,
      temperature: 23,
      lastUpdate: '3s ago',
      rackId: 'B1-01'
    },
    {
      id: 'S005',
      zone: 'Zone B',
      position: { x: 35, y: 45 },
      product: 'Power Banks',
      stock: 34,
      status: 'online',
      battery: 45,
      temperature: 25,
      lastUpdate: '7s ago',
      rackId: 'B1-02'
    },
    {
      id: 'S006',
      zone: 'Zone B',
      position: { x: 55, y: 45 },
      product: 'Charging Cables',
      stock: 156,
      status: 'online',
      battery: 88,
      temperature: 22,
      lastUpdate: '4s ago',
      rackId: 'B1-03'
    },
    {
      id: 'S007',
      zone: 'Zone C',
      position: { x: 15, y: 80 },
      product: 'USB Cables',
      stock: 8,
      status: 'warning',
      battery: 15,
      temperature: 20,
      lastUpdate: '2m ago',
      rackId: 'C1-01'
    },
    {
      id: 'S008',
      zone: 'Zone C',
      position: { x: 35, y: 80 },
      product: 'Screen Protectors',
      stock: 12,
      status: 'offline',
      battery: 5,
      temperature: 19,
      lastUpdate: '5m ago',
      rackId: 'C1-02'
    },
    {
      id: 'S009',
      zone: 'Zone C',
      position: { x: 55, y: 80 },
      product: 'Tablet Stands',
      stock: 78,
      status: 'online',
      battery: 92,
      temperature: 23,
      lastUpdate: '1s ago',
      rackId: 'C1-03'
    }
  ]);

  const [movingItems, setMovingItems] = useState<MovingItem[]>([]);
  const [selectedSensor, setSelectedSensor] = useState<Sensor | null>(null);
  const [hoveredSensor, setHoveredSensor] = useState<string | null>(null);

  // Warehouse rack positions for visual layout
  const racks = [
    // Zone A racks
    { id: 'A1-01', zone: 'A', x: 10, y: 15, width: 10, height: 10 },
    { id: 'A1-02', zone: 'A', x: 30, y: 15, width: 10, height: 10 },
    { id: 'A1-03', zone: 'A', x: 50, y: 15, width: 10, height: 10 },
    { id: 'A2-01', zone: 'A', x: 70, y: 15, width: 10, height: 10 },
    
    // Zone B racks
    { id: 'B1-01', zone: 'B', x: 10, y: 40, width: 10, height: 10 },
    { id: 'B1-02', zone: 'B', x: 30, y: 40, width: 10, height: 10 },
    { id: 'B1-03', zone: 'B', x: 50, y: 40, width: 10, height: 10 },
    { id: 'B2-01', zone: 'B', x: 70, y: 40, width: 10, height: 10 },
    
    // Zone C racks
    { id: 'C1-01', zone: 'C', x: 10, y: 75, width: 10, height: 10 },
    { id: 'C1-02', zone: 'C', x: 30, y: 75, width: 10, height: 10 },
    { id: 'C1-03', zone: 'C', x: 50, y: 75, width: 10, height: 10 },
    { id: 'C2-01', zone: 'C', x: 70, y: 75, width: 10, height: 10 },
  ];

  useEffect(() => {
    // Simulate real-time sensor updates
    const sensorInterval = setInterval(() => {
      setSensors(prev => prev.map(sensor => ({
        ...sensor,
        stock: Math.max(0, sensor.stock + Math.floor(Math.random() * 4) - 2),
        battery: Math.max(0, Math.min(100, sensor.battery + Math.floor(Math.random() * 3) - 1)),
        temperature: Math.max(18, Math.min(30, sensor.temperature + Math.random() * 2 - 1)),
        lastUpdate: `${Math.floor(Math.random() * 10) + 1}s ago`
      })));
    }, 4000);

    // Simulate moving items (forklifts, workers, etc.)
    const movingInterval = setInterval(() => {
      // Add new moving item occasionally
      if (Math.random() > 0.7 && movingItems.length < 3) {
        const newItem: MovingItem = {
          id: `moving-${Date.now()}`,
          position: { x: 5, y: 85 }, // Start from loading dock
          targetPosition: { 
            x: 10 + Math.random() * 70, 
            y: 15 + Math.random() * 60 
          },
          product: ['Inventory Restock', 'Quality Check', 'Order Pickup'][Math.floor(Math.random() * 3)],
          status: 'moving'
        };
        setMovingItems(prev => [...prev, newItem]);
      }

      // Update positions of existing moving items
      setMovingItems(prev => prev.map(item => {
        if (item.status === 'moving') {
          const dx = item.targetPosition.x - item.position.x;
          const dy = item.targetPosition.y - item.position.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 2) {
            return { ...item, status: 'arrived' };
          }
          
          const speed = 0.8;
          const newX = item.position.x + (dx / distance) * speed;
          const newY = item.position.y + (dy / distance) * speed;
          
          return {
            ...item,
            position: { x: newX, y: newY }
          };
        }
        return item;
      }).filter(item => item.status === 'moving')); // Remove arrived items
    }, 200);

    return () => {
      clearInterval(sensorInterval);
      clearInterval(movingInterval);
    };
  }, [movingItems.length]);

  const getSensorColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-500 border-green-600 shadow-green-300';
      case 'warning':
        return 'bg-yellow-500 border-yellow-600 shadow-yellow-300';
      case 'offline':
        return 'bg-red-500 border-red-600 shadow-red-300';
      default:
        return 'bg-gray-500 border-gray-600 shadow-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
        return <Wifi className="h-4 w-4 text-green-600" />;
      case 'warning':
        return <Wifi className="h-4 w-4 text-yellow-600" />;
      case 'offline':
        return <WifiOff className="h-4 w-4 text-red-600" />;
      default:
        return <WifiOff className="h-4 w-4 text-gray-600" />;
    }
  };

  const zoneStats = {
    'Zone A': {
      total: sensors.filter(s => s.zone === 'Zone A').length,
      online: sensors.filter(s => s.zone === 'Zone A' && s.status === 'online').length,
      warning: sensors.filter(s => s.zone === 'Zone A' && s.status === 'warning').length,
      offline: sensors.filter(s => s.zone === 'Zone A' && s.status === 'offline').length
    },
    'Zone B': {
      total: sensors.filter(s => s.zone === 'Zone B').length,
      online: sensors.filter(s => s.zone === 'Zone B' && s.status === 'online').length,
      warning: sensors.filter(s => s.zone === 'Zone B' && s.status === 'warning').length,
      offline: sensors.filter(s => s.zone === 'Zone B' && s.status === 'offline').length
    },
    'Zone C': {
      total: sensors.filter(s => s.zone === 'Zone C').length,
      online: sensors.filter(s => s.zone === 'Zone C' && s.status === 'online').length,
      warning: sensors.filter(s => s.zone === 'Zone C' && s.status === 'warning').length,
      offline: sensors.filter(s => s.zone === 'Zone C' && s.status === 'offline').length
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Warehouse Sensor Map</h1>
        <p className="text-gray-600 mt-2">Real-time monitoring of IoT sensors across warehouse zones</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Zone Statistics */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Zone Status</h3>
            <div className="space-y-4">
              {Object.entries(zoneStats).map(([zone, stats]) => (
                <div key={zone} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{zone}</h4>
                    <span className="text-sm text-gray-600">{stats.total} sensors</span>
                  </div>
                  <div className="flex space-x-4 text-sm">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                      <span>{stats.online} Online</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                      <span>{stats.warning} Warning</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                      <span>{stats.offline} Offline</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Feed */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Activity</h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {movingItems.map((item) => (
                <div key={item.id} className="flex items-center text-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 animate-pulse"></div>
                  <span className="text-gray-700">{item.product} in progress</span>
                </div>
              ))}
              <div className="flex items-center text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <span className="text-gray-700">Sensor S001 updated stock level</span>
              </div>
              <div className="flex items-center text-sm">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                <span className="text-gray-700">Low battery alert - Sensor S007</span>
              </div>
            </div>
          </div>

          {/* Sensor Details */}
          {selectedSensor && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Sensor Details</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Sensor ID:</span>
                  <span className="font-medium">{selectedSensor.id}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Rack Location:</span>
                  <span className="font-medium">{selectedSensor.rackId}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Zone:</span>
                  <span className="font-medium">{selectedSensor.zone}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Product:</span>
                  <span className="font-medium">{selectedSensor.product}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Stock:</span>
                  <span className="font-medium">{selectedSensor.stock} units</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Status:</span>
                  <div className="flex items-center">
                    {getStatusIcon(selectedSensor.status)}
                    <span className="ml-2 font-medium capitalize">{selectedSensor.status}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Battery:</span>
                  <div className="flex items-center">
                    <Battery className="h-4 w-4 text-gray-600 mr-2" />
                    <span className="font-medium">{selectedSensor.battery}%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Temperature:</span>
                  <div className="flex items-center">
                    <Thermometer className="h-4 w-4 text-gray-600 mr-2" />
                    <span className="font-medium">{selectedSensor.temperature.toFixed(1)}°C</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Last Update:</span>
                  <span className="font-medium">{selectedSensor.lastUpdate}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Warehouse Map */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Warehouse Layout</h3>
            <div className="relative bg-gray-50 rounded-lg border-2 border-gray-200" style={{ height: '700px' }}>
              
              {/* Grid Background */}
              <div className="absolute inset-0 opacity-20">
                <svg width="100%" height="100%" className="absolute inset-0">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#d1d5db" strokeWidth="1"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>

              {/* Zone Labels and Boundaries */}
              <div className="absolute top-4 left-4 bg-blue-100 text-blue-800 px-3 py-1 rounded-md font-semibold shadow-sm">
                Zone A - Electronics
              </div>
              <div className="absolute top-1/3 left-4 bg-green-100 text-green-800 px-3 py-1 rounded-md font-semibold shadow-sm">
                Zone B - Accessories  
              </div>
              <div className="absolute top-2/3 left-4 bg-purple-100 text-purple-800 px-3 py-1 rounded-md font-semibold shadow-sm">
                Zone C - Components
              </div>

              {/* Zone Dividers */}
              <div className="absolute top-0 left-0 w-full h-1/3 border-b-2 border-dashed border-blue-300"></div>
              <div className="absolute top-1/3 left-0 w-full h-1/3 border-b-2 border-dashed border-green-300"></div>

              {/* Loading Dock */}
              <div className="absolute bottom-4 left-4 bg-gray-200 border-2 border-gray-400 px-3 py-2 rounded-md">
                <div className="text-xs font-medium text-gray-700">Loading Dock</div>
              </div>

              {/* Office Area */}
              <div className="absolute top-4 right-4 bg-yellow-100 border-2 border-yellow-300 px-3 py-2 rounded-md">
                <div className="text-xs font-medium text-yellow-700">Office</div>
              </div>

              {/* Warehouse Racks */}
              {racks.map((rack) => (
                <div
                  key={rack.id}
                  className={`absolute border-2 rounded-md ${
                    rack.zone === 'A' ? 'bg-blue-50 border-blue-300' :
                    rack.zone === 'B' ? 'bg-green-50 border-green-300' :
                    'bg-purple-50 border-purple-300'
                  }`}
                  style={{
                    left: `${rack.x}%`,
                    top: `${rack.y}%`,
                    width: `${rack.width}%`,
                    height: `${rack.height}%`
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-medium text-gray-600">{rack.id}</span>
                  </div>
                </div>
              ))}

              {/* Sensors */}
              {sensors.map((sensor) => (
                <div
                  key={sensor.id}
                  className={`absolute w-5 h-5 rounded-full border-2 cursor-pointer transition-all duration-200 ${getSensorColor(sensor.status)} ${
                    hoveredSensor === sensor.id ? 'scale-150 shadow-lg' : 'shadow-md'
                  } ${selectedSensor?.id === sensor.id ? 'ring-4 ring-blue-300' : ''}`}
                  style={{
                    left: `${sensor.position.x}%`,
                    top: `${sensor.position.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  onMouseEnter={() => setHoveredSensor(sensor.id)}
                  onMouseLeave={() => setHoveredSensor(null)}
                  onClick={() => setSelectedSensor(sensor)}
                >
                  {/* Sensor pulse animation */}
                  <div className={`absolute inset-0 rounded-full animate-ping ${
                    sensor.status === 'online' ? 'bg-green-400' :
                    sensor.status === 'warning' ? 'bg-yellow-400' : 'bg-red-400'
                  } opacity-75`}></div>

                  {/* Tooltip */}
                  {hoveredSensor === sensor.id && (
                    <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded px-3 py-2 whitespace-nowrap z-20 shadow-lg">
                      <div className="font-medium">{sensor.id} - {sensor.rackId}</div>
                      <div>{sensor.product}</div>
                      <div>{sensor.stock} units • {sensor.battery}% battery</div>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                    </div>
                  )}
                </div>
              ))}

              {/* Moving Items */}
              {movingItems.map((item) => (
                <div
                  key={item.id}
                  className="absolute w-3 h-3 bg-blue-600 rounded-full animate-pulse shadow-lg z-10"
                  style={{
                    left: `${item.position.x}%`,
                    top: `${item.position.y}%`,
                    transform: 'translate(-50%, -50%)',
                    transition: 'all 0.2s linear'
                  }}
                >
                  {/* Movement trail */}
                  <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-50"></div>
                </div>
              ))}

              {/* Legend */}
              <div className="absolute bottom-4 right-4 bg-white rounded-md p-4 shadow-lg border">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Legend</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-green-500 rounded-full mr-3 shadow-sm"></div>
                    <span className="text-xs text-gray-600">Online Sensor</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-yellow-500 rounded-full mr-3 shadow-sm"></div>
                    <span className="text-xs text-gray-600">Warning</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-red-500 rounded-full mr-3 shadow-sm"></div>
                    <span className="text-xs text-gray-600">Offline</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-600 rounded-full mr-3 animate-pulse"></div>
                    <span className="text-xs text-gray-600">Activity</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SensorMap;