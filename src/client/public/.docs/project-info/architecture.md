# CV Website - Project Architecture Analysis

## Common Information

### Project Overview
- **Project Name**: CV Website
- **Version**: 0.1.0
- **Type**: Single Page Application (SPA)
- **Purpose**: Personal portfolio/CV website showcasing professional experience, skills, and projects
- **Architecture**: Frontend-only React application with modern web technologies

### Technology Stack
- **Core Framework**: React 19.0.0 with TypeScript 4.9.5
- **Build Tool**: Create React App (CRA) with react-scripts 5.0.1
- **Package Manager**: npm
- **Language**: TypeScript with strict mode enabled
- **Routing**: React Router DOM 7.6.2
- **Testing**: Jest with React Testing Library

### Development Environment
- **Node.js**: Compatible with modern Node.js versions
- **Browsers**: Production targets >0.2% market share, development targets latest Chrome/Firefox/Safari
- **Linting**: ESLint with React app configuration
- **Type Checking**: TypeScript with strict mode

## Frontend Architecture

### Component Architecture

#### Directory Structure
```
src/
├── components/           # Reusable UI components
│   ├── controls/        # Control components (buttons, toggles)
│   ├── shared/          # Shared components (cards, skill items)
│   ├── About.tsx        # About section component
│   ├── Education.tsx    # Education section component
│   ├── Experience.tsx   # Experience section component
│   ├── Header.tsx       # Header component
│   ├── Navbar.tsx       # Navigation component
│   ├── PortfolioGrid.tsx # Portfolio grid component
│   ├── Projects.tsx     # Projects section component
│   └── Skills.tsx       # Skills section component
├── pages/               # Page-level components
│   ├── AboutMe.tsx      # Main about page
│   └── Blog.tsx         # Blog page (placeholder)
├── models/              # TypeScript interfaces and data models
├── services/            # API and data services
├── styles/              # SCSS stylesheets
├── themes/              # Material-UI theme configurations
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
└── shared/              # Shared assets (images, etc.)
```

#### Component Hierarchy
- **App.tsx**: Root component with theme provider and routing
- **Navbar**: Top navigation with theme toggle
- **AboutMe**: Main page component
- **Section Components**: Modular components for different CV sections

### Styling Architecture

#### Technology Stack
- **Primary**: Material-UI (MUI) v6.4.1 with Emotion
- **Secondary**: SCSS (Sass) for custom styling
- **CSS-in-JS**: Emotion for component-specific styles
- **CSS Variables**: Custom properties for theming
- **Additional**: TailwindCSS v4.1.10 (configured but not actively used)

#### Theme System
The application implements a sophisticated dual-theme system:

##### Theme Configuration
- **Dark Theme**: Cyberpunk-inspired with neon green (#00ff99) accents
- **Light Theme**: Professional blue (#1976d2) color scheme
- **Theme Provider**: Material-UI ThemeProvider with custom theme objects
- **Dynamic Switching**: Runtime theme switching with state management

##### CSS Variables Architecture
```scss
:root {
  // Dark theme variables
  --dark-bg: #121212;
  --dark-primary: #00ff99;
  --dark-gradient: linear-gradient(135deg, #00ff99 0%, #00ff99 100%);
  
  // Light theme variables
  --light-bg: #f5f5f5;
  --light-primary: #1976d2;
  --light-gradient: linear-gradient(135deg, #1976d2 0%, #64b5f6 100%);
  
  // Typography
  --font-primary: 'Poppins', Arial, sans-serif;
  --font-mono: 'Consolas', 'Courier New', monospace;
}
```

##### Styling Layers
1. **Global Styles** (`global.scss`): Base styles, theme classes, utility classes
2. **Component Styles** (`*.scss`): Component-specific stylesheets
3. **Material-UI Overrides**: Custom component styling through theme configuration
4. **CSS Variables**: Dynamic theming and consistent design tokens

#### Design System
- **Typography**: Poppins font family with Material-UI typography variants
- **Color Palette**: 
  - Dark: Neon green (#00ff99), dark backgrounds (#121212, #1e1e1e)
  - Light: Blue (#1976d2), light backgrounds (#f5f5f5, #ffffff)
- **Spacing**: Material-UI spacing system (8px base unit)
- **Shadows**: Custom shadow system with theme-specific values
- **Animations**: CSS transitions (0.3s ease-in-out) for interactive elements

### Data Architecture

#### TypeScript Models
```typescript
// Core data interfaces
interface Project {
    name: string;
    role: string;
    description: string;
    company: string;
    techStack: string;
    startDate: string;
    endDate: string;
}

interface Experience {
    // Experience data structure
}

interface Education {
    // Education data structure
}

interface Technology {
    // Technology/skills data structure
}
```

#### Data Management
- **Static Data**: Mock data stored in TypeScript files
- **Services Layer**: `portfolio.service.ts` for data operations
- **Type Safety**: Full TypeScript coverage for all data structures
- **No Backend**: Currently frontend-only with static data

### State Management
- **Local State**: React useState for component-level state
- **Theme State**: Global theme state managed in App component
- **No Global State**: No Redux/Zustand - simple prop drilling for theme

### Performance Considerations
- **Code Splitting**: React Router for route-based code splitting
- **Bundle Optimization**: Create React App optimizations
- **Image Optimization**: WebP support through CRA
- **Lazy Loading**: Potential for component lazy loading
- **Web Vitals**: Built-in web vitals monitoring

### Development Workflow
- **Hot Reload**: Development server with hot module replacement
- **Type Checking**: Real-time TypeScript compilation
- **Linting**: ESLint with React-specific rules
- **Testing**: Jest setup with React Testing Library
- **Build Process**: Optimized production builds with CRA

### Deployment Architecture
- **Static Site**: Can be deployed to any static hosting service
- **Build Output**: Optimized static files in `build/` directory
- **Environment**: No server-side dependencies
- **CDN Ready**: Static assets optimized for CDN delivery

### Future Considerations
- **Backend Integration**: Potential for API integration
- **CMS Integration**: Content management system for dynamic content
- **PWA Features**: Progressive Web App capabilities
- **Internationalization**: Multi-language support
- **Analytics**: User behavior tracking
- **SEO Optimization**: Server-side rendering considerations

---

*This architecture provides a solid foundation for a modern, maintainable, and scalable portfolio website with excellent developer experience and user interface.*
