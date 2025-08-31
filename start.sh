#!/bin/bash

echo "�� Starting Kitchen Inventory Manager..."

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found. Creating from template..."
    cp .env.example .env
    echo "📝 Please edit .env file and add your OpenAI API key"
    echo "🔑 Get your API key from: https://platform.openai.com/api-keys"
    exit 1
fi

# Check if OpenAI API key is set
if grep -q "your_openai_api_key_here" .env; then
    echo "⚠️  Please set your OpenAI API key in .env file"
    echo "🔑 Get your API key from: https://platform.openai.com/api-keys"
    exit 1
fi

echo "✅ Environment configured"
echo "📦 Installing dependencies..."

# Install backend dependencies
npm install

# Install frontend dependencies
cd client && npm install && cd ..

echo "🎯 Starting development servers..."
echo "🌐 Backend: http://localhost:5000"
echo "🖥️  Frontend: http://localhost:3000"
echo "📱 Open http://localhost:3000 in your browser"

# Start both servers
npm run dev
