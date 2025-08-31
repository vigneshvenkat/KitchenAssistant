import React, { useState } from 'react';
import { useInventory } from '../context/InventoryContext';
import { Plus, Edit, Trash2, ShoppingCart, CheckCircle } from 'lucide-react';

const Shopping = () => {
  const { 
    shoppingLists, 
    loading, 
    error,
    generateShoppingList 
  } = useInventory();

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingList, setEditingList] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    items: []
  });

  const [newItem, setNewItem] = useState({
    name: '',
    quantity: '',
    unit: '',
    category: '',
    priority: 'Medium'
  });

  const units = ['kg', 'g', 'l', 'ml', 'pcs', 'pack', 'bottle', 'can', 'box'];
  const categories = ['Vegetables', 'Fruits', 'Dairy', 'Meat', 'Grains', 'Spices', 'Beverages', 'Snacks', 'General'];
  const priorities = ['Low', 'Medium', 'High'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNewItemChange = (e) => {
    const { name, value } = e.target;
    setNewItem(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addItemToList = () => {
    if (newItem.name && newItem.quantity && newItem.unit) {
      const item = {
        id: Date.now().toString(),
        ...newItem,
        quantity: parseFloat(newItem.quantity),
        completed: false
      };
      
      setFormData(prev => ({
        ...prev,
        items: [...prev.items, item]
      }));
      
      setNewItem({
        name: '',
        quantity: '',
        unit: '',
        category: '',
        priority: 'Medium'
      });
    }
  };

  const removeItemFromList = (itemId) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== itemId)
    }));
  };

  const toggleItemComplete = (listId, itemId) => {
    // This would typically update the backend
    console.log('Toggle item complete:', listId, itemId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingList) {
        // Update existing list
        console.log('Update list:', editingList.id, formData);
      } else {
        // Create new list
        console.log('Create new list:', formData);
      }
      
      setFormData({
        name: '',
        items: []
      });
      setEditingList(null);
      setShowAddForm(false);
    } catch (error) {
      console.error('Failed to save shopping list:', error);
    }
  };

  const handleGenerateList = async () => {
    try {
      await generateShoppingList();
    } catch (error) {
      console.error('Failed to generate shopping list:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      items: []
    });
    setEditingList(null);
    setShowAddForm(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Shopping Lists</h1>
        <div className="flex space-x-4">
          <button
            onClick={handleGenerateList}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <ShoppingCart size={20} />
            <span>Generate from Low Stock</span>
          </button>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Plus size={20} />
            <span>Create List</span>
          </button>
        </div>
      </div>

      {showAddForm && (
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {editingList ? 'Edit Shopping List' : 'Create New Shopping List'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                List Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-3">Add Items</h3>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-3">
                <input
                  type="text"
                  name="name"
                  value={newItem.name}
                  onChange={handleNewItemChange}
                  placeholder="Item name"
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  name="quantity"
                  value={newItem.quantity}
                  onChange={handleNewItemChange}
                  placeholder="Quantity"
                  min="0"
                  step="0.01"
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                  name="unit"
                  value={newItem.unit}
                  onChange={handleNewItemChange}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Unit</option>
                  {units.map(unit => (
                    <option key={unit} value={unit}>{unit}</option>
                  ))}
                </select>
                <select
                  name="category"
                  value={newItem.category}
                  onChange={handleNewItemChange}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <select
                  name="priority"
                  value={newItem.priority}
                  onChange={handleNewItemChange}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {priorities.map(priority => (
                    <option key={priority} value={priority}>{priority}</option>
                  ))}
                </select>
              </div>
              <button
                type="button"
                onClick={addItemToList}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Add Item
              </button>
            </div>

            {formData.items.length > 0 && (
              <div className="border rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-3">Current Items</h3>
                <div className="space-y-2">
                  {formData.items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                      <div className="flex items-center space-x-4">
                        <span className="font-medium">{item.name}</span>
                        <span className="text-gray-600">{item.quantity} {item.unit}</span>
                        <span className="text-gray-600">{item.category}</span>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          item.priority === 'High' ? 'bg-red-100 text-red-800' :
                          item.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {item.priority}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItemFromList(item.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                {editingList ? 'Update' : 'Create'} List
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {shoppingLists.map((list) => (
          <div key={list.id} className="bg-white rounded-lg shadow-md border overflow-hidden">
            <div className="px-6 py-4 border-b bg-gray-50">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">{list.name}</h2>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(list)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(list.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              {list.items.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No items in this list</p>
              ) : (
                <div className="space-y-3">
                  {list.items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => toggleItemComplete(list.id, item.id)}
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                            item.completed 
                              ? 'bg-green-500 border-green-500 text-white' 
                              : 'border-gray-300'
                          }`}
                        >
                          {item.completed && <CheckCircle size={14} />}
                        </button>
                        <span className={`font-medium ${item.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                          {item.name}
                        </span>
                        <span className={`text-gray-600 ${item.completed ? 'line-through' : ''}`}>
                          {item.quantity} {item.unit}
                        </span>
                        <span className={`text-gray-600 ${item.completed ? 'line-through' : ''}`}>
                          {item.category}
                        </span>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          item.priority === 'High' ? 'bg-red-100 text-red-800' :
                          item.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {item.priority}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {shoppingLists.length === 0 && (
          <div className="bg-white p-8 rounded-lg shadow-md border text-center">
            <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No Shopping Lists</h2>
            <p className="text-gray-600 mb-4">
              Create your first shopping list or generate one automatically from low stock items.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleGenerateList}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Generate from Low Stock
              </button>
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Create List
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shopping;
