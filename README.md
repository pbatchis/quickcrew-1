# QuickCrew - Full-Stack React & Firebase Application

A modern, full-stack web application built with React, TypeScript, and Firebase, demonstrating comprehensive software engineering skills including authentication, real-time data management, and responsive UI design.

## 🚀 Live Demo

**Try the application:** [https://quickcrew-1-dev.web.app](https://quickcrew-1-dev.web.app)

### Test Account
- **Email:** `demo@quickcrew.dev`
- **Password:** `demo1234`

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development with full IntelliSense
- **Material-UI (MUI)** - Professional component library and design system
- **React Router** - Client-side routing and navigation
- **TanStack Query** - Server state management and caching
- **Vite** - Fast build tool and development server

### Backend & Infrastructure
- **Firebase Authentication** - Secure user authentication and authorization
- **Cloud Firestore** - NoSQL database with real-time capabilities
- **Firebase Hosting** - Fast, secure web hosting with global CDN
- **Firebase Functions** - Serverless backend logic (if applicable)

### Development Tools
- **ESLint** - Code linting with TypeScript-aware rules
- **Prettier** - Code formatting and style consistency
- **Zod** - Runtime type validation and schema validation

## 🏗️ Architecture & Features

- **Component-Based Architecture** - Modular, reusable React components
- **Type Safety** - Full TypeScript implementation with strict type checking
- **Responsive Design** - Mobile-first approach with Material-UI components
- **Real-time Data** - Live updates using Firestore real-time listeners
- **Authentication Flow** - Complete user registration, login, and session management
- **Error Handling** - Comprehensive error boundaries and user feedback
- **Performance Optimized** - Code splitting, lazy loading, and efficient state management

## 🚦 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Firebase CLI (for deployment)

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd quickcrew-1
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Add your Firebase configuration to .env.local
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:5173
   ```

### Production Deployment

```bash
# Build the application
npm run build

# Deploy to Firebase Hosting
npm run deploy
```

## 📁 Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Route-level components
├── hooks/         # Custom React hooks
├── services/      # Firebase and API services
├── types/         # TypeScript type definitions
├── utils/         # Utility functions
└── config/        # Configuration files
```

## 🧪 Development Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
npm run deploy     # Deploy to Firebase Hosting
```

## 🔧 Firebase Configuration

This project uses Firebase for:
- **Authentication** - User signup, login, and session management
- **Firestore** - Real-time NoSQL database
- **Hosting** - Production deployment and CDN

## 📈 Performance & Best Practices

- **Code Splitting** - Lazy-loaded routes and components
- **Memoization** - Optimized re-renders with React.memo and useMemo
- **Type Safety** - Comprehensive TypeScript coverage
- **Error Boundaries** - Graceful error handling and user feedback
- **Responsive Design** - Mobile-first, accessible UI components
- **SEO Optimized** - Proper meta tags and semantic HTML

## 🤝 Professional Development Practices

- **Git Workflow** - Feature branches, conventional commits
- **Code Quality** - ESLint, Prettier, and TypeScript strict mode
- **Component Testing** - Unit tests with React Testing Library
- **Documentation** - Comprehensive README and inline code comments
- **Security** - Environment variable management and Firebase security rules

---

*This project demonstrates proficiency in modern full-stack development, showcasing skills in React ecosystem, Firebase backend services, TypeScript development, and professional software engineering practices.*
