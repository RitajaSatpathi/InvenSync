import React, { useState, useEffect } from 'react';
import { TrendingUp, Brain, AlertCircle, Calendar } from 'lucide-react';

interface ForecastData {
  product: string;
  currentStock: number;
  predictedStock: number;
  daysRemaining: number;
  trend: 'increasing' | 'decreasing' | 'stable';
}

const Forecasting: React.FC = () => {
  const [forecasts, setForecasts] = useState<ForecastData[]>([
    {
      product: 'Wireless Headphones',
      currentStock: 145,
      predictedStock: 89,
      daysRemaining: 12,
      trend: 'decreasing'
    },
    {
      product: 'USB Cables',
      currentStock: 8,
      predictedStock: 0,
      daysRemaining: 3,
      trend: 'decreasing'
    },
    {
      product: 'Smartphone Cases',
      currentStock: 23,
      predictedStock: 45,
      daysRemaining: 18,
      trend: 'increasing'
    },
    {
      product: 'Bluetooth Speakers',
      currentStock: 67,
      predictedStock: 65,
      daysRemaining: 15,
      trend: 'stable'
    }
  ]);

  const [insights, setInsights] = useState([
    {
      id: '1',
      type: 'recommendation',
      title: 'Increase Reorder Frequency',
      description: 'USB Cables are selling 40% faster than usual. Consider increasing reorder frequency.',
      priority: 'high'
    },
    {
      id: '2',
      type: 'prediction',
      title: 'Seasonal Trend Detected',
      description: 'Wireless Headphones show increased demand pattern. Stock up for next month.',
      priority: 'medium'
    },
    {
      id: '3',
      type: 'optimization',
      title: 'Inventory Optimization',
      description: 'Smartphone Cases are overstocked. Consider reducing next order quantity.',
      priority: 'low'
    }
  ]);

  useEffect(() => {
    // Simulate real-time forecast updates
    const interval = setInterval(() => {
      setForecasts(prev => prev.map(forecast => ({
        ...forecast,
        predictedStock: Math.max(0, forecast.predictedStock + Math.floor(Math.random() * 10) - 5),
        daysRemaining: Math.max(1, forecast.daysRemaining + Math.floor(Math.random() * 2) - 1)
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'increasing':
        return 'text-green-600 bg-green-100';
      case 'decreasing':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-red-500 bg-red-50';
      case 'medium':
        return 'border-yellow-500 bg-yellow-50';
      default:
        return 'border-blue-500 bg-blue-50';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Demand Forecasting</h1>
        <p className="text-gray-600 mt-2">AI-powered inventory predictions and insights</p>
      </div>

      {/* Forecast Chart Placeholder */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Stock Trend Comparison</h2>
        <div className="h-80 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <TrendingUp className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">Interactive Line Chart</p>
            <p className="text-sm text-gray-500 mt-2">Current Stock vs Predicted Stock Over Time</p>
          </div>
        </div>
      </div>

      {/* Forecast Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {forecasts.map((forecast, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-900">{forecast.product}</h3>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getTrendColor(forecast.trend)}`}>
                {forecast.trend}
              </span>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Current Stock:</span>
                <span className="text-sm font-semibold">{forecast.currentStock}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Predicted Stock:</span>
                <span className="text-sm font-semibold">{forecast.predictedStock}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Days Remaining:</span>
                <span className={`text-sm font-semibold ${
                  forecast.daysRemaining <= 3 ? 'text-red-600' : 
                  forecast.daysRemaining <= 7 ? 'text-yellow-600' : 'text-green-600'
                }`}>
                  {forecast.daysRemaining} days
                </span>
              </div>
            </div>
            
            {forecast.daysRemaining <= 3 && (
              <div className="mt-4 p-3 bg-red-50 rounded-md">
                <div className="flex items-center">
                  <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                  <span className="text-sm text-red-700 font-medium">
                    Critical: Will run out in {forecast.daysRemaining} days
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* AI Insights */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center mb-6">
          <Brain className="h-6 w-6 text-purple-600 mr-3" />
          <h2 className="text-xl font-semibold text-gray-900">AI-Powered Insights</h2>
        </div>
        
        <div className="space-y-4">
          {insights.map((insight) => (
            <div key={insight.id} className={`p-4 rounded-lg border-l-4 ${getPriorityColor(insight.priority)}`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{insight.title}</h3>
                  <p className="text-gray-600 text-sm">{insight.description}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  insight.priority === 'high' ? 'bg-red-100 text-red-700' :
                  insight.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-blue-100 text-blue-700'
                }`}>
                  {insight.priority}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Forecasting;