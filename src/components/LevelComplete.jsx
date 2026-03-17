import React, { useEffect, useState } from 'react';
import { levels } from '../data/levels';

const LevelComplete = ({ level, onContinue, onClose, stats }) => {
  const [showAnimation, setShowAnimation] = useState(false);
  const levelData = levels[level];
  const nextLevel = levels[level + 1];

  useEffect(() => {
    setShowAnimation(true);
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`bg-white rounded-lg p-8 max-w-md w-full mx-4 transform transition-all duration-500 ${
        showAnimation ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
      }`}>
        {/* Celebration Animation */}
        <div className="text-center mb-6">
          <div className="relative">
            <div className="text-6xl animate-bounce">🎉</div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 border-4 border-yellow-400 rounded-full animate-ping opacity-75"></div>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mt-4">
            Level {level} Complete!
          </h2>
          <p className="text-gray-600 mt-2">
            {levelData?.name}
          </p>
        </div>

        {/* Stats Summary */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">Your Performance</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{Math.round(stats.wpm)}</div>
              <div className="text-gray-600">WPM</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{Math.round(stats.accuracy)}%</div>
              <div className="text-gray-600">Accuracy</div>
            </div>
          </div>
          
          {/* Achievement badges */}
          <div className="mt-4 flex justify-center space-x-2">
            {stats.wpm >= (levelData?.targetWPM || 0) && (
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                Speed Goal ✓
              </span>
            )}
            {stats.accuracy >= (levelData?.targetAccuracy || 0) && (
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                Accuracy Goal ✓
              </span>
            )}
          </div>
        </div>

        {/* Next Level Preview */}
        {nextLevel && (
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-blue-800 mb-2">Next Challenge</h3>
            <p className="text-sm text-blue-700">
              <strong>Level {level + 1}:</strong> {nextLevel.name}
            </p>
            <p className="text-xs text-blue-600 mt-1">
              {nextLevel.description}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-3">
          {nextLevel ? (
            <button
              onClick={onContinue}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Continue to Level {level + 1}
            </button>
          ) : (
            <button
              onClick={onClose}
              className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              All Levels Complete! 🏆
            </button>
          )}
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default LevelComplete;