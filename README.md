# Kitchen Inventory Manager

A comprehensive AI-powered kitchen inventory and grocery stock management system built with React, Node.js, and OpenAI integration.

## 🚀 Features

### 📦 Inventory Management
- Add, edit, and delete inventory items
- Track quantities, units, categories, and expiry dates
- Set minimum stock levels for automatic alerts
- Real-time stock status monitoring

### 🤖 AI Recipe Suggestions
- Get personalized recipe recommendations based on available ingredients
- Search for recipes using specific ingredients
- Step-by-step cooking instructions
- Cooking time and difficulty level information
- Missing ingredients suggestions

### 🛒 Shopping List Management
- Auto-generate shopping lists from low stock items
- Create custom shopping lists manually
- Set item priorities (High, Medium, Low)
- Mark items as completed
- Categorize items for better organization

### 📊 Dashboard
- Overview of inventory status
- Low stock and out-of-stock alerts
- Quick access to key features
- Visual statistics and metrics

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and context
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **React Router** - Client-side routing

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **OpenAI API** - AI-powered recipe suggestions
- **Helmet** - Security middleware
- **Rate Limiting** - API protection

### Development Tools
- **Concurrently** - Run frontend and backend simultaneously
- **Nodemon** - Auto-restart server on changes
- **ESLint** - Code quality and consistency

## 📁 Project Structure

```
kitchen-inventory-manager/
├── client/                 # React frontend
│   ├── public/            # Static files
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── context/       # React context for state management
│   │   ├── pages/         # Page components
│   │   ├── App.js         # Main app component
│   │   └── index.js       # Entry point
│   ├── package.json       # Frontend dependencies
│   └── tailwind.config.js # Tailwind CSS configuration
├── server/                 # Node.js backend
│   ├── routes/            # API route handlers
│   ├── middleware/        # Custom middleware
│   └── index.js           # Server entry point
├── package.json            # Backend dependencies and scripts
└── .env.example           # Environment variables template
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd kitchen-inventory-manager
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` file and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. **Start the development servers**
   ```bash
   npm run dev
   ```
   
   This will start both:
   - Backend server on http://localhost:5000
   - Frontend development server on http://localhost:3000

### Alternative: Run Separately

**Backend only:**
```bash
npm run server
```

**Frontend only:**
```bash
npm run client
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here

# Security
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### OpenAI API Setup

1. Visit [OpenAI Platform](https://platform.openai.com/)
2. Create an account and get your API key
3. Add the API key to your `.env` file
4. Ensure you have sufficient credits for API calls

## 📱 Usage

### Adding Inventory Items
1. Navigate to the Inventory page
2. Click "Add Item"
3. Fill in item details (name, quantity, unit, category)
4. Set minimum quantity for low stock alerts
5. Optionally add expiry date
6. Click "Add Item"

### Getting Recipe Suggestions
1. Go to the Recipes page
2. Click "Get AI Recipe Ideas"
3. The AI will analyze your current inventory
4. Get personalized recipe recommendations
5. View step-by-step instructions and missing ingredients

### Managing Shopping Lists
1. Visit the Shopping page
2. Click "Generate from Low Stock" for automatic lists
3. Or create custom lists manually
4. Add items with priorities and categories
5. Mark items as completed when shopping

## 🔒 Security Features

- **Helmet.js** - Security headers
- **Rate Limiting** - API abuse prevention
- **CORS** - Cross-origin resource sharing
- **Input Validation** - Data sanitization
- **Error Handling** - Secure error responses

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Environment Variables
Ensure all production environment variables are set:
- `NODE_ENV=production`
- `OPENAI_API_KEY` (production key)
- `PORT` (production port)

### Deployment Platforms
- **Heroku** - Easy deployment with Git
- **Vercel** - Frontend deployment
- **Railway** - Full-stack deployment
- **DigitalOcean** - VPS deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the code examples

## 🔮 Future Enhancements

- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] User authentication and multi-user support
- [ ] Barcode scanning for items
- [ ] Recipe favorites and ratings
- [ ] Nutritional information
- [ ] Meal planning features
- [ ] Mobile app development
- [ ] Integration with grocery delivery services
- [ ] Advanced analytics and reporting
- [ ] Multi-language support

## 📊 Performance

- **Frontend**: Optimized React components with lazy loading
- **Backend**: Efficient Express.js routing with middleware
- **AI Integration**: Optimized OpenAI API calls with caching
- **UI/UX**: Responsive design with Tailwind CSS

---

**Built with ❤️ using modern web technologies**
