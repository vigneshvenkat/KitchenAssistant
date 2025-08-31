const express = require('express');
const router = express.Router();
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Get recipe suggestions based on inventory
router.post('/suggest', async (req, res) => {
  try {
    const { inventory } = req.body;
    
    if (!inventory || !Array.isArray(inventory)) {
      return res.status(400).json({ error: 'Inventory array is required' });
    }

    const availableIngredients = inventory
      .filter(item => item.quantity > 0)
      .map(item => `${item.name} (${item.quantity} ${item.unit})`)
      .join(', ');

    const prompt = `Based on these available ingredients: ${availableIngredients}, suggest 3 delicious recipes. For each recipe, provide:
1. Recipe name
2. Ingredients list with quantities
3. Step-by-step cooking instructions
4. Cooking time
5. Difficulty level
6. Any missing ingredients that would enhance the recipe

Format the response as JSON with this structure:
{
  "recipes": [
    {
      "name": "Recipe Name",
      "ingredients": [{"name": "ingredient", "quantity": "amount", "unit": "unit"}],
      "instructions": ["step 1", "step 2", ...],
      "cookingTime": "X minutes",
      "difficulty": "Easy/Medium/Hard",
      "missingIngredients": ["ingredient 1", "ingredient 2"]
    }
  ]
}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 1000,
      temperature: 0.7
    });

    const response = completion.choices[0].message.content;
    let recipes;
    
    try {
      recipes = JSON.parse(response);
    } catch (parseError) {
      // Fallback if AI response isn't valid JSON
      recipes = {
        recipes: [{
          name: "AI Recipe Suggestion",
          ingredients: [],
          instructions: [response],
          cookingTime: "Varies",
          difficulty: "Unknown",
          missingIngredients: []
        }]
      };
    }

    res.json(recipes);
  } catch (error) {
    console.error('Recipe suggestion error:', error);
    res.status(500).json({ 
      error: 'Failed to generate recipe suggestions',
      details: error.message 
    });
  }
});

// Get recipe by ingredients
router.post('/search', async (req, res) => {
  try {
    const { ingredients } = req.body;
    
    if (!ingredients || !Array.isArray(ingredients)) {
      return res.status(400).json({ error: 'Ingredients array is required' });
    }

    const ingredientList = ingredients.join(', ');
    const prompt = `Find a recipe that uses these ingredients: ${ingredientList}. Provide:
1. Recipe name
2. Complete ingredients list with quantities
3. Step-by-step cooking instructions
4. Cooking time
5. Difficulty level

Format as JSON.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 800,
      temperature: 0.7
    });

    const response = completion.choices[0].message.content;
    let recipe;
    
    try {
      recipe = JSON.parse(response);
    } catch (parseError) {
      recipe = {
        name: "Recipe Search Result",
        ingredients: [],
        instructions: [response],
        cookingTime: "Varies",
        difficulty: "Unknown"
      };
    }

    res.json(recipe);
  } catch (error) {
    console.error('Recipe search error:', error);
    res.status(500).json({ 
      error: 'Failed to search for recipe',
      details: error.message 
    });
  }
});

module.exports = router;
