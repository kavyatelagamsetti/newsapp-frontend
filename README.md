# PulseWire - Modern News Aggregator

PulseWire is a sleek, modern news aggregator application that brings together the latest headlines from multiple sources. Built with cutting-edge technologies and a focus on user experience, PulseWire delivers news in a clean, intuitive interface.

## 🚀 Features

- Real-time news updates from multiple sources
- Modern, responsive UI with glassmorphism design
- Offline support with local data persistence
- Category-based news filtering
- Smooth animations and transitions
- Dark mode support

## 🛠️ Technologies Used

### Frontend
- **React 18** - Latest version for optimal performance and features
- **Vite** - Next-generation frontend tooling for blazing fast development
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **Framer Motion** - Production-ready motion library for React
- **React Icons** - Popular icons library for React applications

### State Management & Data Fetching
- **React Query** - Powerful data synchronization library
- **Axios** - Promise-based HTTP client for API requests

### Development Tools
- **TypeScript** - Static type checking for robust development
- **ESLint** - Code linting for maintaining code quality
- **Prettier** - Code formatting for consistent style

## 📁 Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── NewsCard.tsx   # Individual news article card
│   ├── NewsGrid.tsx   # Grid layout for news articles
│   ├── CategoryFilter.tsx  # News category filtering
│   └── RefreshButton.tsx   # News refresh functionality
├── hooks/             # Custom React hooks
│   └── useNews.ts    # News data fetching and management
├── utils/            # Utility functions
│   └── newsStorage.ts # Local storage management
├── types/            # TypeScript type definitions
│   └── news.ts      # News-related type definitions
└── App.tsx          # Main application component
```

## 🎯 Component Architecture

### Core Components

1. **App.tsx**
   - Main application container
   - Manages global state and layout
   - Handles theme switching

2. **NewsGrid.tsx**
   - Displays news articles in a responsive grid
   - Implements infinite scroll
   - Handles article loading states

3. **NewsCard.tsx**
   - Individual news article presentation
   - Implements hover animations
   - Handles article interactions

4. **CategoryFilter.tsx**
   - Category selection interface
   - Manages news filtering
   - Implements smooth transitions

### Custom Hooks

- **useNews**
  - Manages news data fetching
  - Handles caching and state updates
  - Implements error handling

### Utility Functions

- **newsStorage**
  - Manages local storage operations
  - Implements data persistence
  - Handles backup functionality

## 🚀 Getting Started

1. Clone the repository
```bash
git clone https://github.com/yourusername/pulsewire.git
```

2. Install dependencies
```bash
yarn install
```

3. Start the development server
```bash
yarn dev
```

## 🎨 Design Philosophy

PulseWire follows modern design principles:
- Glassmorphism for depth and visual hierarchy
- Responsive design for all screen sizes
- Smooth animations for better user experience
- Intuitive navigation and interaction patterns
- Accessibility-first approach

## 🔮 Future Enhancements

- User authentication and personalization
- Social sharing integration
- Advanced search functionality
- Custom news source selection
- Push notifications for breaking news

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.
