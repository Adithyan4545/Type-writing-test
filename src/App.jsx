import React, { useState, useEffect, useCallback } from 'react';
import TypingArea from './components/TypingArea';
import MetricsPanel from './components/MetricsPanel';
import VisualKeyboard from './components/VisualKeyboard';
import SessionSummary from './components/SessionSummary';
import Settings from './components/Settings';
import SessionHistory from './components/SessionHistory';
import LevelSelector from './components/LevelSelector';
import CoachingTips from './components/CoachingTips';
import LevelComplete from './components/LevelComplete';
import ThemeToggle from './components/ThemeToggle';
import { useTypingEngine } from './hooks/useTypingEngine';
import { levels, getLevelProgress, getNextUnlockedLevel } from './data/levels';
import { storage } from './utils/storage';
import { calculateXP, getBadges } from './utils/calculations';

function App() {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentText, setCurrentText] = useState('');
  const [showSummary, setShowSummary] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showLevelSelector, setShowLevelSelector] = useState(false);
  const [showKeyboard, setShowKeyboard] = useState(true);
  const [showFingerGuide, setShowFingerGuide] = useState(true);
  const [showLevelComplete, setShowLevelComplete] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [sessionResult, setSessionResult] = useState(null);
  const [settings, setSettings] = useState(storage.getSettings());
  const [stats, setStats] = useState(storage.getStats());
  const [sessions, setSessions] = useState(storage.getSessions());

  const getRandomText = useCallback((level) => {
    const levelData = levels[level];
    if (!levelData) return 'Type this text to practice.';
    const texts = levelData.texts;
    return texts[Math.floor(Math.random() * texts.length)];
  }, []);

  const handleSessionComplete = useCallback((result) => {
    const newSession = {
      ...result,
      level: currentLevel,
      text: currentText.substring(0, 50) + '...'
    };

    // Update stats with level-specific tracking
    const xp = calculateXP(result.wpm, result.accuracy, result.timeInSeconds);
    const newBadges = getBadges(stats, result);
    const updatedStats = {
      ...stats,
      totalSessions: stats.totalSessions + 1,
      bestWPM: Math.max(stats.bestWPM, result.wpm),
      totalXP: stats.totalXP + xp,
      badges: [...stats.badges, ...newBadges.map(b => b.id)],
      averageWPM: ((stats.averageWPM * stats.totalSessions) + result.wpm) / (stats.totalSessions + 1),
      averageAccuracy: ((stats.averageAccuracy * stats.totalSessions) + result.accuracy) / (stats.totalSessions + 1)
    };

    // Check level completion
    const levelData = levels[currentLevel];
    const isLevelComplete = result.wpm >= levelData.targetWPM && result.accuracy >= levelData.targetAccuracy;
    
    setStats(updatedStats);
    setSessionResult({ ...newSession, xp, newBadges, isLevelComplete });
    
    if (isLevelComplete && levels[currentLevel + 1]) {
      setShowLevelComplete(true);
    } else {
      setShowSummary(true);
    }

    storage.saveSession(newSession);
    storage.saveStats(updatedStats);
    setSessions(storage.getSessions());
  }, [currentLevel, currentText, stats]);

  const {
    currentIndex,
    userInput,
    errors,
    isActive,
    wpm,
    accuracy,
    cpm,
    streak,
    latencies,
    handleKeyPress,
    reset,
    currentChar
  } = useTypingEngine(currentText, handleSessionComplete);

  useEffect(() => {
    setCurrentText(getRandomText(currentLevel));
  }, [currentLevel, getRandomText]);

  const handleNewSession = () => {
    setCurrentText(getRandomText(currentLevel));
    setShowSummary(false);
    setShowLevelComplete(false);
    reset();
  };

  const handleLevelChange = (level) => {
    setCurrentLevel(level);
    setCurrentText(getRandomText(level));
    setShowLevelSelector(false);
    reset();
  };

  const handleLevelComplete = () => {
    if (levels[currentLevel + 1]) {
      setCurrentLevel(currentLevel + 1);
      setCurrentText(getRandomText(currentLevel + 1));
    }
    setShowLevelComplete(false);
    reset();
  };

  const handleSettingsChange = (newSettings) => {
    setSettings(newSettings);
    storage.saveSettings(newSettings);
  };

  const handleExportData = () => {
    const data = storage.exportData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'typing-coach-data.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportData = (data) => {
    if (storage.importData(data)) {
      setSettings(storage.getSettings());
      setStats(storage.getStats());
      setSessions(storage.getSessions());
      alert('Data imported successfully!');
    } else {
      alert('Failed to import data. Please check the file format.');
    }
  };

  const currentLevelData = levels[currentLevel];
  const maxUnlockedLevel = getNextUnlockedLevel(stats);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      {/* Header */}
      <header className={`border-b px-4 py-3 ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className={`text-2xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>
              ⌨️ Typing Coach
            </h1>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              isDarkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'
            }`}>
              Level {currentLevel}: {currentLevelData?.name}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <ThemeToggle 
              isDark={isDarkMode} 
              onToggle={() => setIsDarkMode(!isDarkMode)} 
            />
            
            <button
              onClick={() => setShowLevelSelector(true)}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                isDarkMode 
                  ? 'bg-purple-600 text-white hover:bg-purple-700' 
                  : 'bg-purple-600 text-white hover:bg-purple-700'
              }`}
            >
              Levels
            </button>
            
            <button
              onClick={() => setShowHistory(true)}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                isDarkMode 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              History
            </button>
            
            <button
              onClick={() => setShowSettings(true)}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                isDarkMode 
                  ? 'bg-gray-600 text-white hover:bg-gray-500' 
                  : 'bg-gray-600 text-white hover:bg-gray-700'
              }`}
            >
              Settings
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Typing Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Level Progress */}
            <div className={`rounded-lg p-4 ${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            } border`}>
              <div className="flex justify-between items-center mb-2">
                <h3 className={`font-semibold ${
                  isDarkMode ? 'text-white' : 'text-gray-800'
                }`}>
                  {currentLevelData?.name}
                </h3>
                <div className="text-sm text-gray-500">
                  Target: {currentLevelData?.targetWPM} WPM, {currentLevelData?.targetAccuracy}% Accuracy
                </div>
              </div>
              <p className={`text-sm mb-3 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {currentLevelData?.description}
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>WPM Progress</span>
                    <span>{Math.round((wpm / currentLevelData?.targetWPM) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min((wpm / currentLevelData?.targetWPM) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Accuracy Progress</span>
                    <span>{Math.round((accuracy / currentLevelData?.targetAccuracy) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min((accuracy / currentLevelData?.targetAccuracy) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <TypingArea
              targetText={currentText}
              currentIndex={currentIndex}
              userInput={userInput}
              errors={errors}
              onKeyPress={handleKeyPress}
              isActive={isActive}
              isDarkMode={isDarkMode}
            />
            
            <CoachingTips
              wpm={wpm}
              accuracy={accuracy}
              streak={streak}
              errors={errors.length}
              currentLevel={currentLevel}
            />
            
            {showKeyboard && (
              <VisualKeyboard
                currentKey={currentChar}
                layout={settings.keyboardLayout}
                showFingerGuide={showFingerGuide}
                onKeyPress={handleKeyPress}
                isDarkMode={isDarkMode}
              />
            )}
            
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setShowKeyboard(!showKeyboard)}
                className={`px-4 py-2 rounded transition-colors ${
                  isDarkMode 
                    ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {showKeyboard ? 'Hide' : 'Show'} Keyboard
              </button>
              {showKeyboard && (
                <button
                  onClick={() => setShowFingerGuide(!showFingerGuide)}
                  className={`px-4 py-2 rounded transition-colors ${
                    showFingerGuide
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : isDarkMode 
                        ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {showFingerGuide ? 'Hide' : 'Show'} Finger Guide
                </button>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <MetricsPanel
              wpm={wpm}
              accuracy={accuracy}
              cpm={cpm}
              streak={streak}
              latencies={latencies}
              isDarkMode={isDarkMode}
            />
            
            <div className={`rounded-lg border p-4 ${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
              <h3 className={`font-semibold mb-3 ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>Progress</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Current Level:</span>
                  <span className="font-semibold">{currentLevel}</span>
                </div>
                <div className="flex justify-between">
                  <span>Best WPM:</span>
                  <span className="font-semibold">{Math.round(stats.bestWPM)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Avg Accuracy:</span>
                  <span className="font-semibold">{Math.round(stats.averageAccuracy || 0)}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Total XP:</span>
                  <span className="font-semibold">{Math.round(stats.totalXP)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Sessions:</span>
                  <span className="font-semibold">{stats.totalSessions}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      {showLevelComplete && sessionResult && (
        <LevelComplete
          level={currentLevel}
          onContinue={handleLevelComplete}
          onClose={() => setShowLevelComplete(false)}
          stats={sessionResult}
        />
      )}

      {showSummary && sessionResult && (
        <SessionSummary
          session={sessionResult}
          onNewSession={handleNewSession}
          onClose={() => setShowSummary(false)}
        />
      )}

      {showLevelSelector && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-lg p-6 ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="flex justify-between items-center mb-6">
              <h2 className={`text-2xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>Select Level</h2>
              <button
                onClick={() => setShowLevelSelector(false)}
                className={`text-gray-500 hover:text-gray-700 ${
                  isDarkMode ? 'hover:text-gray-300' : ''
                }`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <LevelSelector
              currentLevel={currentLevel}
              onLevelSelect={handleLevelChange}
              stats={stats}
            />
          </div>
        </div>
      )}

      {showSettings && (
        <Settings
          settings={settings}
          onSettingsChange={handleSettingsChange}
          onClose={() => setShowSettings(false)}
          onExport={handleExportData}
          onImport={handleImportData}
        />
      )}

      {showHistory && (
        <SessionHistory
          sessions={sessions}
          onClose={() => setShowHistory(false)}
        />
      )}
    </div>
  );
}

export default App;