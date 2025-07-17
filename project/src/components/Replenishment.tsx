import React, { useState } from 'react';
import { ShoppingCart, Settings, FileText, CheckCircle, Clock, Truck } from 'lucide-react';

interface ReplenishmentItem {
  id: string;
  product: string;
  currentStock: number;
  reorderPoint: number;
  reorderQuantity: number;
  supplier: string;
  unitCost: number;
  autoReplenish: boolean;
  lastOrdered: string;
  status: 'pending' | 'ordered' | 'delivered';
}

const Replenishment: React.FC = () => {
  const [items, setItems] = useState<ReplenishmentItem[]>([
    {
      id: '1',
      product: 'Wireless Headphones',
      currentStock: 145,
      reorderPoint: 50,
      reorderQuantity: 200,
      supplier: 'TechSupply Co.',
      unitCost: 45.99,
      autoReplenish: true,
      lastOrdered: '2024-01-15',
      status: 'delivered'
    },
    {
      id: '2',
      product: 'USB Cables',
      currentStock: 8,
      reorderPoint: 25,
      reorderQuantity: 500,
      supplier: 'Cable Direct',
      unitCost: 3.99,
      autoReplenish: false,
      lastOrdered: '2024-01-10',
      status: 'pending'
    },
    {
      id: '3',
      product: 'Smartphone Cases',
      currentStock: 23,
      reorderPoint: 30,
      reorderQuantity: 300,
      supplier: 'Accessory World',
      unitCost: 12.99,
      autoReplenish: true,
      lastOrdered: '2024-01-12',
      status: 'ordered'
    }
  ]);

  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const suppliers = [
    'TechSupply Co.',
    'Cable Direct',
    'Accessory World',
    'Global Electronics',
    'Warehouse Direct'
  ];

  const toggleAutoReplenish = (itemId: string) => {
    setItems(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, autoReplenish: !item.autoReplenish } : item
      )
    );
  };

  const updateSupplier = (itemId: string, supplier: string) => {
    setItems(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, supplier } : item
      )
    );
  };

  const toggleSelection = (itemId: string) => {
    setSelectedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const generatePurchaseOrder = () => {
    const selectedProducts = items.filter(item => selectedItems.includes(item.id));
    const totalCost = selectedProducts.reduce((sum, item) => sum + (item.reorderQuantity * item.unitCost), 0);
    
    alert(`Purchase Order Generated\n\nItems: ${selectedProducts.length}\nTotal Cost: $${totalCost.toFixed(2)}\n\nOrder will be processed and sent to suppliers.`);
    
    // Update status to ordered
    setItems(prev =>
      prev.map(item =>
        selectedItems.includes(item.id) ? { ...item, status: 'ordered' } : item
      )
    );
    
    setSelectedItems([]);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'ordered':
        return <ShoppingCart className="h-4 w-4 text-blue-500" />;
      case 'delivered':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'ordered':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const totalSelectedCost = items
    .filter(item => selectedItems.includes(item.id))
    .reduce((sum, item) => sum + (item.reorderQuantity * item.unitCost), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Auto-Replenishment</h1>
        <p className="text-gray-600 mt-2">Manage automatic reordering and supplier relationships</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Settings className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Auto-Enabled</h3>
              <p className="text-2xl font-bold text-blue-600">
                {items.filter(item => item.autoReplenish).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <ShoppingCart className="h-8 w-8 text-yellow-600" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Pending Orders</h3>
              <p className="text-2xl font-bold text-yellow-600">
                {items.filter(item => item.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Truck className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">In Transit</h3>
              <p className="text-2xl font-bold text-green-600">
                {items.filter(item => item.status === 'ordered').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Replenishment Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Replenishment Settings</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedItems(items.map(item => item.id));
                      } else {
                        setSelectedItems([]);
                      }
                    }}
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reorder Point
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Supplier
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Auto-Replenish
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Est. Cost
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => toggleSelection(item.id)}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{item.product}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-semibold ${
                      item.currentStock <= item.reorderPoint ? 'text-red-600' : 'text-gray-900'
                    }`}>
                      {item.currentStock} units
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{item.reorderPoint} units</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={item.supplier}
                      onChange={(e) => updateSupplier(item.id, e.target.value)}
                      className="text-sm border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {suppliers.map(supplier => (
                        <option key={supplier} value={supplier}>{supplier}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => toggleAutoReplenish(item.id)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                        item.autoReplenish
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {item.autoReplenish ? 'Enabled' : 'Disabled'}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(item.status)}
                      <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      ${(item.reorderQuantity * item.unitCost).toFixed(2)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Purchase Order Section */}
      {selectedItems.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Purchase Order Summary</h3>
              <p className="text-sm text-gray-600">
                {selectedItems.length} items selected • Total: ${totalSelectedCost.toFixed(2)}
              </p>
            </div>
            <button
              onClick={generatePurchaseOrder}
              className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FileText className="h-5 w-5 mr-2" />
              Generate Purchase Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Replenishment;