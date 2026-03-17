import React from 'react';
import { getImprovementTips } from '../utils/calculations';

const SessionSummary = ({ session, onNewSession, onClose }) => {
  const tips = getImprovementTips(session);
  
  const drills = [
    { name: 'Home Row Practice', duration: '30s', description: 'asdf jkl; repetition' },
    { name: 'Common Words', duration: '45s', description: 'the, and, for, you' },
    { name: 'Problem Keys', duration: '60s', description: 'Focus on your slowest keys' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Session Complete!</h2>
          <div className="text-4xl font-bold text-blue-600 mb-1">{session.wpm} WPM</div>
          <div className="text-lg text-green-600">{session.accuracy}% Accuracy</div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center p-3 bg-gray-50 rounded">
            <div className="font-semibold text-gray-700">{session.cpm}</div>
            <div className="text-sm text-gray-600">CPM</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded">
            <div className="font-semibold text-gray-700">{Math.round(session.timeInSeconds)}s</div>
            <div className="text-sm text-gray-600">Time</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded">
            <div className="font-semibold text-gray-700">{session.errors}</div>
            <div className="text-sm text-gray-600">Errors</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded">
            <div className="font-semibold text-gray-700">{session.averageLatency}ms</div>
            <div className="text-sm text-gray-600">Avg Latency</div>
          </div>
        </div>

        {tips.length > 0 && (
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-2">💡 Improvement Tips</h3>
            <ul className="space-y-1">
              {tips.map((tip, index) => (
                <li key={index} className="text-sm text-gray-600 flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mb-6">
          <h3 className="font-semibold text-gray-800 mb-2">🎯 Suggested Drills</h3>
          <div className="space-y-2">
            {drills.map((drill, index) => (
              <div key={index} className="flex justify-between items-center p-2 bg-blue-50 rounded">
                <div>
                  <div className="font-medium text-sm">{drill.name}</div>
                  <div className="text-xs text-gray-600">{drill.description}</div>
                </div>
                <div className="text-xs text-blue-600 font-medium">{drill.duration}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={onNewSession}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
          >
            New Session
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionSummary;