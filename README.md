# Typing Coach - Real-time Typing Improvement App 🚀

[![npm](https://img.shields.io/npm/v/typing-coach?color=orange)](https://www.npmjs.com/package/typing-coach)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5-green.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3-purple.svg)](https://tailwindcss.com/)

A complete, production-ready typing coach web application built with **React**, **Vite**, and **Tailwind CSS**. Provides real-time feedback, adaptive difficulty, and comprehensive analytics to help users improve their typing speed and accuracy.

## ✨ Features

- **Real-time Typing Feedback**: Live WPM, accuracy, and error highlighting
- **Adaptive Levels**: Progressive difficulty with 100+ levels (from `src/data/levels.js`)
- **Visual Keyboard**: Interactive keyboard visualization (`VisualKeyboard.jsx`)
- **Metrics Dashboard**: Detailed stats and progress tracking (`MetricsPanel.jsx`)
- **Session History**: Save and review past sessions (`SessionHistory.jsx`, `storage.js`)
- **Coaching Tips**: Personalized improvement suggestions (`CoachingTips.jsx`)
- **Level Selector**: Choose custom difficulty (`LevelSelector.jsx`)
- **Dark/Light Theme**: Toggleable UI themes (`ThemeToggle.jsx`, `Settings.jsx`)
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Local Storage**: Persistent progress without backend
- **Comprehensive Testing**: Unit tests with Vitest (`src/tests/`)

## 📱 Screenshots

### Typing Interface
![Typing Area](https://via.placeholder.com/800x400/0f766e/ffffff?text=Real-time+Typing+Interface+with+Visual+Keyboard)
*(Live WPM, accuracy, error highlights, and visual keyboard)*

### Metrics & History
![Metrics Panel](https://via.placeholder.com/800x400/1e3a8a/ffffff?text=Metrics+Panel+%26+Session+History)
*(Detailed stats, graphs, and session summaries)*

### Level Complete
![Level Complete](https://via.placeholder.com/800x400/f59e0b/000000?text=Level+Complete+with+Rewards)
*(Celebratory screen with tips and next challenge)*

## 🚀 Quick Start

```bash
# Clone & Install
git clone <repo-url>
cd typing-coach
npm install

# Start development server (localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm test

# Lint code
npm run lint
```

## 🛠️ Installation

1. Ensure Node.js >=18 and npm >=9 are installed
2. `npm install` - Installs React, TailwindCSS, Vite, Vitest, ESLint
3. `npm run dev` - Launches hot-reloaded dev server

No additional setup required!

## 🎮 Usage

1. **Select Level**: Choose beginner/intermediate/advanced from Level Selector
2. **Configure Settings**: Theme, keyboard layout (`src/data/keyboardLayouts.js`), sample texts (`src/data/sampleTexts.js`)
3. **Start Typing**: Match the prompt in TypingArea - get instant feedback!
4. **Track Progress**: View real-time metrics, complete levels, save sessions
5. **Review & Improve**: Check history, coaching tips, retry failed levels

## 📁 Project Structure

```
typing-coach/
├── src/
│   ├── components/     # UI Components
│   │   ├── TypingArea.jsx
│   │   ├── MetricsPanel.jsx
│   │   ├── VisualKeyboard.jsx
│   │   └── ... (10+ more)
│   ├── hooks/          # Custom React hooks
│   │   └── useTypingEngine.js
│   ├── utils/          # Helper functions
│   │   ├── calculations.js
│   │   └── storage.js
│   ├── data/           # Static data
│   │   ├── levels.js
│   │   └── sampleTexts.js
│   ├── tests/          # Unit tests
│   └── index.css       # Tailwind imports
├── public/             # Static assets
├── index.html          # Entry point
├── vite.config.js      # Vite config
├── tailwind.config.js  # Tailwind config
├── package.json        # Dependencies & scripts
└── README.md           # You're reading it! 👀
```

## 🧪 Testing

```bash
# Run tests with coverage
npm test -- --coverage

# Watch mode
npm test -- --watch
```

Tests cover:
- Typing calculations (`calculations.test.js`)
- Local storage (`storage.test.js`)
- Core engine logic

## 🔧 Customization

- **Add Levels**: Edit `src/data/levels.js`
- **New Texts**: Add to `src/data/sampleTexts.js`
- **Keyboard Layouts**: Extend `src/data/keyboardLayouts.js`
- **Themes**: Modify Tailwind config + `ThemeToggle.jsx`
- **New Metrics**: Hook into `useTypingEngine.js`

## 🚀 Deployment

### Static Hosting (Recommended)
```bash
npm run build
# Deploy 'dist/' folder to Netlify, Vercel, GitHub Pages, etc.
```

### Docker (Optional)
```dockerfile
FROM node:18-alpine
COPY . .
RUN npm ci --only=production
RUN npm run build
EXPOSE 80
CMD npx serve dist
```

## 🤝 Contributing

1. Fork the repo
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push & PR to `main`

Follow ESLint rules. Write tests for new features.

## 📄 License

MIT License - see [LICENSE](LICENSE) (create if needed)

## 🙌 Acknowledgments

Built with ❤️ using React ecosystem. Icons from Heroicons, data from typing standards.

---

⭐ **Star on GitHub** | 🐛 **[Issues](https://github.com/user/typing-coach/issues)** | 📖 **Demo**: Run `npm run dev`

