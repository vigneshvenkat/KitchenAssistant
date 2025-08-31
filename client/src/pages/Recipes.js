import React, { useState } from 'react';
import { useInventory } from '../context/InventoryContext';
import { ChefHat, Clock, TrendingUp, AlertTriangle } from 'lucide-react';

const Recipes = () => {
  const { 
    inventory, 
    recipes, 
    loading, 
    error,
    getRecipeSuggestions 
  } = useInventory();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);

  const handleGetRecipes = async () => {
    try {
      await getRecipeSuggestions();
    } catch (error) {
      console.error('Failed to get recipes:', error);
    }
  };

  const handleSearchRecipes = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setSearchLoading(true);
    try {
      const response = await fetch('/api/recipes/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ingredients: searchQuery.split(',').map(item => item.trim())
        })
      });
      
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Failed to search recipes:', error);
    } finally {
      setSearchLoading(false);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
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
        <h1 className="text-3xl font-bold text-gray-900">Recipe Suggestions</h1>
        <button
          onClick={handleGetRecipes}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <ChefHat size={20} />
          <span>Get AI Recipe Ideas</span>
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Search Recipes by Ingredients</h2>
        <form onSubmit={handleSearchRecipes} className="flex space-x-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter ingredients separated by commas (e.g., chicken, rice, tomatoes)"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={searchLoading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg transition-colors"
          >
            {searchLoading ? 'Searching...' : 'Search'}
          </button>
        </form>
      </div>

      {searchResults && (
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Search Results</h2>
          <div className="space-y-4">
            <div className="border rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-900">{searchResults.name}</h3>
                <div className="flex space-x-2">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getDifficultyColor(searchResults.difficulty)}`}>
                    {searchResults.difficulty}
                  </span>
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                    <Clock size={12} className="mr-1" />
                    {searchResults.cookingTime}
                  </span>
                </div>
              </div>

              {searchResults.ingredients && searchResults.ingredients.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Ingredients:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {searchResults.ingredients.map((ingredient, index) => (
                      <li key={index} className="text-gray-700">
                        {ingredient.quantity} {ingredient.unit} {ingredient.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {searchResults.instructions && searchResults.instructions.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Instructions:</h4>
                  <ol className="list-decimal list-inside space-y-2">
                    {searchResults.instructions.map((instruction, index) => (
                      <li key={index} className="text-gray-700">{instruction}</li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {recipes && recipes.length > 0 && (
        <div className="bg-white rounded-lg shadow-md border overflow-hidden">
          <div className="px-6 py-4 border-b bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-900">AI Recipe Suggestions</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {recipes.map((recipe, index) => (
                <div key={index} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">{recipe.name}</h3>
                    <div className="flex space-x-2">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getDifficultyColor(recipe.difficulty)}`}>
                        {recipe.difficulty}
                      </span>
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        <Clock size={12} className="mr-1" />
                        {recipe.cookingTime}
                      </span>
                    </div>
                  </div>

                  {recipe.ingredients && recipe.ingredients.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-2">Ingredients:</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {recipe.ingredients.map((ingredient, idx) => (
                          <li key={idx} className="text-gray-700">
                            {ingredient.quantity} {ingredient.unit} {ingredient.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {recipe.instructions && recipe.instructions.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-2">Instructions:</h4>
                      <ol className="list-decimal list-inside space-y-2">
                        {recipe.instructions.map((instruction, idx) => (
                          <li key={idx} className="text-gray-700">{instruction}</li>
                        ))}
                      </ol>
                    </div>
                  )}

                  {recipe.missingIngredients && recipe.missingIngredients.length > 0 && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                      <div className="flex items-center space-x-2 mb-2">
                        <AlertTriangle size={16} className="text-yellow-600" />
                        <h5 className="font-medium text-yellow-800">Missing Ingredients</h5>
                      </div>
                      <ul className="list-disc list-inside space-y-1">
                        {recipe.missingIngredients.map((ingredient, idx) => (
                          <li key={idx} className="text-yellow-700 text-sm">{ingredient}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {(!recipes || recipes.length === 0) && !searchResults && (
        <div className="bg-white p-8 rounded-lg shadow-md border text-center">
          <ChefHat className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No Recipes Yet</h2>
          <p className="text-gray-600 mb-4">
            Get AI-powered recipe suggestions based on your current inventory, or search for recipes using specific ingredients.
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleGetRecipes}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Get Recipe Ideas
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Recipes;
