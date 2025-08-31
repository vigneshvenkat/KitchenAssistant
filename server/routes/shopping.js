const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// In-memory storage for shopping lists
let shoppingLists = [];

// Get all shopping lists
router.get('/', (req, res) => {
  try {
    res.json(shoppingLists);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch shopping lists' });
  }
});

// Create new shopping list
router.post('/', (req, res) => {
  try {
    const { name, items } = req.body;
    
    if (!name) {
      return res.status(400).json({ error: 'Shopping list name is required' });
    }

    const newList = {
      id: uuidv4(),
      name: name.trim(),
      items: items || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    shoppingLists.push(newList);
    res.status(201).json(newList);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create shopping list' });
  }
});

// Generate shopping list from low stock
router.post('/generate', (req, res) => {
  try {
    const { inventory } = req.body;
    
    if (!inventory || !Array.isArray(inventory)) {
      return res.status(400).json({ error: 'Inventory array is required' });
    }

    const lowStockItems = inventory.filter(item => 
      item.quantity <= item.minQuantity
    );

    const shoppingItems = lowStockItems.map(item => ({
      id: uuidv4(),
      name: item.name,
      quantity: Math.max(item.minQuantity - item.quantity, 1),
      unit: item.unit,
      category: item.category,
      priority: item.quantity === 0 ? 'High' : 'Medium'
    }));

    const newList = {
      id: uuidv4(),
      name: 'Auto-generated Shopping List',
      items: shoppingItems,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    shoppingLists.push(newList);
    res.status(201).json(newList);
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate shopping list' });
  }
});

// Update shopping list
router.put('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { name, items } = req.body;
    
    const listIndex = shoppingLists.findIndex(list => list.id === id);
    if (listIndex === -1) {
      return res.status(404).json({ error: 'Shopping list not found' });
    }

    shoppingLists[listIndex] = {
      ...shoppingLists[listIndex],
      name: name || shoppingLists[listIndex].name,
      items: items || shoppingLists[listIndex].items,
      updatedAt: new Date().toISOString()
    };

    res.json(shoppingLists[listIndex]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update shopping list' });
  }
});

// Delete shopping list
router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const listIndex = shoppingLists.findIndex(list => list.id === id);
    
    if (listIndex === -1) {
      return res.status(404).json({ error: 'Shopping list not found' });
    }

    shoppingLists.splice(listIndex, 1);
    res.json({ message: 'Shopping list deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete shopping list' });
  }
});

module.exports = router;
