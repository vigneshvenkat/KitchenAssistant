const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// In-memory storage (replace with database in production)
let inventory = [];

// Get all inventory items
router.get('/', (req, res) => {
  try {
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch inventory' });
  }
});

// Add new item to inventory
router.post('/', (req, res) => {
  try {
    const { name, quantity, unit, category, expiryDate, minQuantity } = req.body;
    
    if (!name || !quantity || !unit) {
      return res.status(400).json({ error: 'Name, quantity, and unit are required' });
    }

    const newItem = {
      id: uuidv4(),
      name: name.trim(),
      quantity: parseFloat(quantity),
      unit: unit.trim(),
      category: category || 'General',
      expiryDate: expiryDate || null,
      minQuantity: parseFloat(minQuantity) || 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    inventory.push(newItem);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add item to inventory' });
  }
});

// Update inventory item
router.put('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity, unit, category, expiryDate, minQuantity } = req.body;
    
    const itemIndex = inventory.findIndex(item => item.id === id);
    if (itemIndex === -1) {
      return res.status(404).json({ error: 'Item not found' });
    }

    inventory[itemIndex] = {
      ...inventory[itemIndex],
      name: name || inventory[itemIndex].name,
      quantity: parseFloat(quantity) || inventory[itemIndex].quantity,
      unit: unit || inventory[itemIndex].unit,
      category: category || inventory[itemIndex].category,
      expiryDate: expiryDate || inventory[itemIndex].expiryDate,
      minQuantity: parseFloat(minQuantity) || inventory[itemIndex].minQuantity,
      updatedAt: new Date().toISOString()
    };

    res.json(inventory[itemIndex]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update item' });
  }
});

// Delete inventory item
router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const itemIndex = inventory.findIndex(item => item.id === id);
    
    if (itemIndex === -1) {
      return res.status(404).json({ error: 'Item not found' });
    }

    inventory.splice(itemIndex, 1);
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete item' });
  }
});

// Get low stock items
router.get('/low-stock', (req, res) => {
  try {
    const lowStockItems = inventory.filter(item => 
      item.quantity <= item.minQuantity
    );
    res.json(lowStockItems);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch low stock items' });
  }
});

module.exports = router;
