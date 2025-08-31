import React, { useEffect } from 'react';
import { useInventory } from '../context/InventoryContext';
import { Package, ChefHat, ShoppingCart, AlertTriangle } from 'lucide-react';

const Dashboard = () => {
  const { 
    inventory, 
    shoppingLists, 
    loading, 
    error,
    generateShoppingList,
    getRecipeSuggestions 
  } = useInventory();

  const totalItems = inventory.length;
  const lowStockItems = inventory.filter(item => item.quantity <= item.minQuantity);
  const outOfStockItems = inventory.filter(item => item.quantity === 0);
  const totalShoppingLists = shoppingLists.length;

  const handleGenerateShoppingList = async () => {
    try {
      await generateShoppingList();
    } catch (error) {
      console.error('Failed to generate shopping list:', error);
    }
  };

  const handleGetRecipes = async () => {
    try {
      await getRecipeSuggestions();
    } catch (error) {
      console.error('Failed to get recipes:', error);
    }
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
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex space-x-4">
          <button
            onClick={handleGetRecipes}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <ChefHat size={20} />
            <span>Get Recipe Ideas</span>
          </button>
          <button
            onClick={handleGenerateShoppingList}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <ShoppingCart size={20} />
            <span>Generate Shopping List</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-full">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Items</p>
              <p className="text-2xl font-semibold text-gray-900">{totalItems}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-full">
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Low Stock</p>
              <p className="text-2xl font-semibold text-gray-900">{lowStockItems.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border">
          <div className="flex items-center">
            <div className="p-3 bg-red-100 rounded-full">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Out of Stock</p>
              <p className="text-2xl font-semibold text-gray-900">{outOfStockItems.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-full">
              <ShoppingCart className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Shopping Lists</p>
              <p className="text-2xl font-semibold text-gray-900">{totalShoppingLists}</p>
            </div>
          </div>
        </div>
      </div>

      {lowStockItems.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Low Stock Items</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {lowStockItems.map((item) => (
              <div key={item.id} className="border rounded-lg p-4 bg-yellow-50">
                <h3 className="font-medium text-gray-900">{item.name}</h3>
                <p className="text-sm text-gray-600">
                  Current: {item.quantity} {item.unit}
                </p>
                <p className="text-sm text-gray-600">
                  Min Required: {item.minQuantity} {item.unit}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {inventory.length === 0 && (
        <div className="bg-white p-8 rounded-lg shadow-md border text-center">
          <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No Items in Inventory</h2>
          <p className="text-gray-600 mb-4">
            Start by adding some items to your kitchen inventory.
          </p>
          <button
            onClick={() => window.location.href = '/inventory'}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Add First Item
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
