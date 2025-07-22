# Project Structure

```
rifat/
├── 📄 index.html                    # Main HTML file
├── 📄 README.md                     # Project documentation
├── 📄 package.json                  # Node.js dependencies and scripts
├── 📄 .gitignore                    # Git ignore rules
│
├── 📁 css/
│   └── 📄 styles.css               # Custom CSS styles and variables
│
├── 📁 js/
│   ├── 📄 main.js                  # Core functionality (themes, navigation, animations)
│   ├── 📄 portfolio-data.js        # Dynamic content loading from JSON
│   └── 📄 utils.js                 # Utility functions and helpers
│
├── 📁 data/
│   └── 📄 portfolio.json           # Portfolio content and configuration
│
├── 📁 config/
│   ├── 📄 site-config.json         # Site-wide configuration
│   └── 📄 dev-config.json          # Development configuration
│
├── 📁 assets/
│   ├── 📁 images/                  # Image assets
│   │   ├── 📄 profile.jpg          # Profile photo (to be added)
│   │   ├── 📄 project-1.jpg        # Project screenshots
│   │   └── 📄 ...
│   └── 📁 icons/                   # Icon files
│       ├── 📄 favicon.ico          # Site favicon
│       └── 📄 ...
│
└── 📁 docs/
    └── 📄 structure.md             # This file - project structure
```

## File Descriptions

### 🏠 Root Files

- **`index.html`** - Main HTML file with semantic structure
- **`README.md`** - Complete project documentation
- **`package.json`** - Node.js configuration and build scripts
- **`.gitignore`** - Files and folders excluded from version control

### 🎨 Stylesheets (`css/`)

- **`styles.css`** - Custom CSS with CSS variables for theming

### ⚡ JavaScript (`js/`)

- **`main.js`** - Core application logic

  - Theme management (dark/light mode)
  - Mobile menu functionality
  - Header scroll effects
  - Smooth scrolling
  - Intersection Observer animations
  - Performance optimizations

- **`portfolio-data.js`** - Dynamic content management

  - JSON data loading
  - DOM rendering
  - Content updates
  - Error handling

- **`utils.js`** - Utility functions
  - DOM manipulation helpers
  - Storage utilities
  - Animation functions
  - Performance optimizations
  - Validation functions
  - Device detection

### 📊 Data (`data/`)

- **`portfolio.json`** - Centralized content management
  - Personal information
  - Navigation items
  - Skills and technologies
  - Project details
  - Goals and objectives
  - Contact information

### ⚙️ Configuration (`config/`)

- **`site-config.json`** - Site-wide settings

  - SEO configuration
  - Social media links
  - Analytics setup
  - Performance settings

- **`dev-config.json`** - Development settings
  - Build configuration
  - Deployment settings
  - Testing configuration

### 🖼️ Assets (`assets/`)

- **`images/`** - Visual assets

  - Profile photos
  - Project screenshots
  - Background images
  - Icons and logos

- **`icons/`** - Icon files
  - Favicon
  - App icons
  - SVG icons

### 📚 Documentation (`docs/`)

- **`structure.md`** - This file explaining project organization

## Key Features

### 🌓 Theme System

- Automatic dark/light mode detection
- Manual theme toggle
- System preference respect
- Smooth transitions

### 📱 Responsive Design

- Mobile-first approach
- Flexible layouts
- Touch-friendly navigation
- Adaptive typography

### ⚡ Performance

- Lazy loading
- Intersection Observer
- Debounced scroll events
- Optimized animations

### 🔧 Maintainability

- Modular JavaScript architecture
- JSON-based content management
- CSS custom properties
- Clear separation of concerns

### 🎯 Accessibility

- Semantic HTML structure
- Keyboard navigation
- Screen reader friendly
- High contrast support

## Development Workflow

1. **Content Updates**: Edit `data/portfolio.json`
2. **Styling Changes**: Modify `css/styles.css`
3. **Functionality**: Update respective JS files
4. **Configuration**: Adjust config files as needed
5. **Assets**: Add images to `assets/` folders

## Build Process

1. **Development**: Use live server for local development
2. **Testing**: Validate HTML, lint JavaScript
3. **Optimization**: Minify CSS/JS, optimize images
4. **Deployment**: Upload to hosting platform

This structure ensures easy maintenance, clear organization, and scalable development.
