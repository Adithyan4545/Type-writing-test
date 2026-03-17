# Typing Coach - Real-time Typing Improvement App

A complete, production-ready typing coach web application built with React, Vite, and Tailwind CSS. Provides real-time feedback, adaptive difficulty, and comprehensive analytics to help users improve their typing speed and accuracy.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Lint code
npm run lint
```

Open [http://localhost:5173](http://localhost:5173) to start typing!

## ✨ Features

### Real-time Feedback
- **Per-keystroke highlighting**: Green for correct, red for mistakes, blue for current position
- **Live metrics**: WPM, CPM, accuracy percentage, and current streak
- **Latency tracking**: Measures reaction time between keystrokes with visual heatmap
- **Animated caret**: Smooth cursor animation following typing progress

### Adaptive Difficulty System
The app automatically adjusts difficulty based on performance using these thresholds:

| Level | WPM Range | Min Accuracy | Content Type |
|-------|-----------|--------------|--------------|
| Beginner | 0-20 | 80% | Home row practice, simple words |
| Words | 15-35 | 85% | Common words, short phrases |
| Sentences | 25-50 | 90% | Full sentences, punctuation |
| Code | 35+ | 92% | Programming syntax, symbols |

### Visual Keyboard
- **Animated overlay**: Shows next key to press with finger hints
- **Layout support**: QWERTY and Dvorak keyboard layouts
- **Color-coded fingers**: Visual guide for proper finger placement
- **Responsive design**: Toggleable on mobile devices

### Gamification & Motivation
- **XP System**: Earn points based on WPM × accuracy × time
- **Badges**: Unlock achievements for milestones (Speed Demon, Perfectionist, etc.)
- **Streak Counter**: Track consecutive correct keystrokes
- **Progress Ring**: Visual accuracy indicator
- **Session Goals**: Daily practice targets

### Analytics & Export
- **Session History**: Last 10 sessions with detailed metrics
- **Performance Charts**: Mini reaction-time heatmap
- **CSV Export**: Download session data for external analysis
- **JSON Import/Export**: Backup and restore all user data

### Accessibility & Customization
- **Keyboard Navigation**: Full keyboard accessibility with ARIA labels
- **High Contrast Mode**: Enhanced visibility option
- **Font Size Control**: Small, medium, large text options
- **Sound Toggle**: Optional audio feedback
- **No Signup Required**: All data stored locally

## 🏗️ Architecture

### Component Structure
```
src/
├── components/
│   ├── TypingArea.jsx          # Main typing interface with character highlighting
│   ├── MetricsPanel.jsx        # Live stats display with mini charts
│   ├── VisualKeyboard.jsx      # Animated keyboard overlay
│   ├── SessionSummary.jsx      # Post-session results and tips
│   ├── Settings.jsx            # User preferences modal
│   └── SessionHistory.jsx      # Historical data table
├── hooks/
│   └── useTypingEngine.js      # Core typing logic and metrics calculation
├── utils/
│   ├── calculations.js         # WPM, accuracy, XP, and difficulty algorithms
│   └── storage.js              # localStorage persistence layer
├── data/
│   ├── sampleTexts.js          # Practice content by difficulty level
│   └── keyboardLayouts.js      # QWERTY and Dvorak key mappings
└── tests/
    ├── calculations.test.js    # Unit tests for core algorithms
    └── storage.test.js         # Unit tests for data persistence
```

### Key Algorithms

**WPM Calculation**: `(correct_characters / 5) / minutes`
**Accuracy**: `(correct_characters / total_characters) × 100`
**XP Formula**: `WPM × (accuracy/100) × (time/60) + bonus_for_95%+`

**Adaptive Difficulty**: Evaluates rolling average of last 3 sessions. Promotes user when both WPM and accuracy exceed thresholds for current level.

### Performance Optimizations
- **requestAnimationFrame**: Smooth caret animations
- **Minimal DOM updates**: Efficient character rendering
- **Event delegation**: Single keydown listener
- **Memoized calculations**: Cached metric computations

## 🎯 Usage Examples

### Basic Typing Practice
1. Select "Beginner" mode for home row practice
2. Click in the typing area and start typing
3. Watch real-time feedback as you type
4. Complete the exercise to see detailed results

### Advanced Features
- **Custom Text**: Switch to any mode and paste your own content
- **Keyboard Layouts**: Toggle between QWERTY/Dvorak in settings
- **Data Export**: Use Settings → Export Data for backup
- **Performance Tracking**: View History to analyze improvement trends

## 🧪 Testing

The app includes comprehensive unit tests for core functionality:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

Test coverage includes:
- WPM and accuracy calculations
- Adaptive difficulty algorithm
- Data persistence and retrieval
- XP and badge systems

## 🔧 Configuration

### Environment Variables
No environment variables required - the app runs entirely client-side.

### Customization
- **Sample Texts**: Edit `src/data/sampleTexts.js` to add custom practice content
- **Difficulty Thresholds**: Modify `difficultyThresholds` object to adjust progression
- **Keyboard Layouts**: Add new layouts in `src/data/keyboardLayouts.js`
- **Styling**: Customize appearance via Tailwind classes in components

## 📱 Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile**: iOS Safari 14+, Chrome Mobile 90+
- **Features**: Requires JavaScript, localStorage, and modern CSS support

## 🚀 Deployment

### Static Hosting (Recommended)
```bash
npm run build
# Deploy 'dist' folder to any static host (Netlify, Vercel, GitHub Pages)
```

### Docker
```dockerfile
FROM nginx:alpine
COPY dist /usr/share/nginx/html
EXPOSE 80
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make changes and add tests
4. Run tests: `npm test`
5. Submit a pull request

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes.

## 🎮 Demo Instructions

To record a demo GIF:
1. Start the app with `npm run dev`
2. Use screen recording software (OBS, QuickTime, etc.)
3. Demonstrate: typing practice → real-time feedback → session completion → results modal
4. Show adaptive difficulty by completing multiple sessions
5. Export the recording as GIF using online converters

---

**Built with ❤️ using React, Vite, and Tailwind CSS**