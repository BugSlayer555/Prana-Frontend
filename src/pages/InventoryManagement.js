import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Eye, Package, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';

const InventoryManagement = () => {
  const [inventory, setInventory] = useState([
    {
      id: 1,
      name: 'Paracetamol 500mg',
      category: 'Medication',
      quantity: 150,
      unit: 'Tablets',
      price: 0.50,
      supplier: 'PharmaCorp',
      expiryDate: '2024-12-31',
      status: 'In Stock',
      minStock: 50
    },
    {
      id: 2,
      name: 'Surgical Masks',
      category: 'PPE',
      quantity: 25,
      unit: 'Boxes',
      price: 15.00,
      supplier: 'MedSupply Inc',
      expiryDate: '2025-06-30',
      status: 'Low Stock',
      minStock: 30
    },
    {
      id: 3,
      name: 'Syringes 10ml',
      category: 'Medical Supplies',
      quantity: 200,
      unit: 'Pieces',
      price: 0.25,
      supplier: 'MedEquip Ltd',
      expiryDate: '2024-08-15',
      status: 'In Stock',
      minStock: 100
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredInventory = inventory.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.supplier.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status, quantity, minStock) => {
    if (status === 'Out of Stock') return 'badge-error';
    if (quantity <= minStock) return 'badge-warning';
    return 'badge-success';
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Medication': return 'badge-primary';
      case 'PPE': return 'badge-secondary';
      case 'Medical Supplies': return 'badge-accent';
      case 'Equipment': return 'badge-warning';
      default: return 'badge-primary';
    }
  };

  return (
    <DashboardLayout title="Inventory Management">
      <div className="section-spacing">
        {/* Header and Search */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="heading-responsive text-gray-900">Inventory</h2>
            <p className="text-gray-600 text-responsive">Manage medical supplies and equipment</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="btn-primary mt-4 sm:mt-0 inline-flex items-center gap-2"
          >
            <Plus className="h-5 w-5" />
            Add Item
          </button>
        </div>

        {/* Search and Filters */}
        <div className="card">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search inventory by name, category, or supplier..."
                className="input-field pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select className="input-field">
              <option>All Categories</option>
              <option>Medication</option>
              <option>PPE</option>
              <option>Medical Supplies</option>
              <option>Equipment</option>
            </select>
            <select className="input-field">
              <option>All Status</option>
              <option>In Stock</option>
              <option>Low Stock</option>
              <option>Out of Stock</option>
            </select>
          </div>
        </div>

        {/* Inventory Table */}
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="table-header">
                <tr>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Item
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Supplier
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Expiry Date
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredInventory.map((item) => (
                  <tr key={item.id} className="table-row">
                    <td className="table-cell">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                          <Package className="h-4 w-4 text-primary-600" />
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{item.name}</div>
                          <div className="text-sm text-gray-500">{item.unit}</div>
                        </div>
                      </div>
                    </td>
                    <td className="table-cell">
                      <span className={`badge ${getCategoryColor(item.category)}`}>
                        {item.category}
                      </span>
                    </td>
                    <td className="table-cell">
                      <div className="flex items-center">
                        {item.quantity <= item.minStock ? (
                          <AlertTriangle className="h-4 w-4 text-yellow-500 mr-1" />
                        ) : (
                          <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                        )}
                        <span className="text-sm font-medium text-gray-900">{item.quantity}</span>
                      </div>
                    </td>
                    <td className="table-cell text-sm text-gray-900">
                      ${item.price.toFixed(2)}
                    </td>
                    <td className="table-cell text-sm text-gray-900">
                      {item.supplier}
                    </td>
                    <td className="table-cell text-sm text-gray-900">
                      {new Date(item.expiryDate).toLocaleDateString()}
                    </td>
                    <td className="table-cell">
                      <span className={`badge ${getStatusColor(item.status, item.quantity, item.minStock)}`}>
                        {item.quantity <= item.minStock ? 'Low Stock' : item.status}
                      </span>
                    </td>
                    <td className="table-cell text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setSelectedItem(item)}
                          className="text-primary-600 hover:text-primary-900 transition-colors duration-200"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-primary-600 hover:text-primary-900 transition-colors duration-200">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900 transition-colors duration-200">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Item Details Modal */}
        {selectedItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Item Details</h3>
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Item Name</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedItem.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedItem.category}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Quantity</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedItem.quantity} {selectedItem.unit}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Unit Price</label>
                    <p className="mt-1 text-sm text-gray-900">${selectedItem.price.toFixed(2)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Supplier</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedItem.supplier}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                    <p className="mt-1 text-sm text-gray-900">{new Date(selectedItem.expiryDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Minimum Stock</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedItem.minStock} {selectedItem.unit}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedItem.quantity <= selectedItem.minStock ? 'Low Stock' : selectedItem.status}</p>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="btn-outline"
                  >
                    Close
                  </button>
                  <button className="btn-primary">
                    Edit Item
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default InventoryManagement;
