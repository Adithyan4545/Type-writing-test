import React from 'react';
import { levels, getLevelProgress } from '../data/levels';

const LevelSelector = ({ currentLevel, onLevelSelect, stats, className = '' }) => {
  const renderLevel = (levelId) => {
    const level = levels[levelId];
    const progress = getLevelProgress(levelId, stats);
    const isUnlocked = levelId === 1 || getLevelProgress(levelId - 1, stats).isComplete;
    const isCurrent = currentLevel === levelId;
    
    return (
      <div
        key={levelId}
        className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
          isCurrent 
            ? 'border-blue-500 bg-blue-50' 
            : isUnlocked 
              ? 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md' 
              : 'border-gray-100 bg-gray-50 cursor-not-allowed opacity-60'
        }`}
        onClick={() => isUnlocked && onLevelSelect(levelId)}
      >
        {/* Lock icon for locked levels */}
        {!isUnlocked && (
          <div className="absolute top-2 right-2">
            <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
          </div>
        )}
        
        {/* Completion checkmark */}
        {progress.isComplete && (
          <div className="absolute top-2 right-2">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        )}
        
        <div className="mb-2">
          <h3 className={`font-semibold ${isUnlocked ? 'text-gray-800' : 'text-gray-400'}`}>
            Level {levelId}: {level.name}
          </h3>
          <p className={`text-sm ${isUnlocked ? 'text-gray-600' : 'text-gray-400'}`}>
            {level.description}
          </p>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span>Target: {level.targetWPM} WPM</span>
            <span>{level.targetAccuracy}% Accuracy</span>
          </div>
          
          {isUnlocked && (
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-gray-600">
                <span>WPM Progress</span>
                <span>{Math.round(progress.wpmProgress)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div 
                  className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${progress.wpmProgress}%` }}
                ></div>
              </div>
              
              <div className="flex justify-between text-xs text-gray-600">
                <span>Accuracy Progress</span>
                <span>{Math.round(progress.accuracyProgress)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div 
                  className="bg-green-500 h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${progress.accuracyProgress}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <h2 className="text-xl font-bold text-gray-800 mb-4">Select Level</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.keys(levels).map(levelId => renderLevel(parseInt(levelId)))}
      </div>
    </div>
  );
};

export default LevelSelector;