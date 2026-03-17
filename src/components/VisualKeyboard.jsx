import React, { useState, useEffect } from 'react';
import { qwertyLayout, dvorakLayout } from '../data/keyboardLayouts';

const VisualKeyboard = ({ currentKey, layout = 'qwerty', className = '', showFingerGuide = true, onKeyPress, isDarkMode = false }) => {
  const [pressedKey, setPressedKey] = useState(null);
  const keyboardLayout = layout === 'dvorak' ? dvorakLayout : qwertyLayout;
  
  // Animate key press
  useEffect(() => {
    if (currentKey && onKeyPress) {
      setPressedKey(currentKey.toLowerCase());
      const timer = setTimeout(() => setPressedKey(null), 200);
      return () => clearTimeout(timer);
    }
  }, [currentKey, onKeyPress]);
  
  const getKeyClass = (keyData) => {
    const baseClass = `keyboard-key p-2 m-0.5 ${keyData.width || 'w-8 h-8'} transition-all duration-150`;
    const fingerClass = keyData.finger > 0 ? `finger-${keyData.finger}` : '';
    const activeClass = keyData.key.toLowerCase() === currentKey.toLowerCase() ? 'active animate-pulse' : '';
    const pressedClass = keyData.key.toLowerCase() === pressedKey ? 'scale-95 shadow-inner' : '';
    
    return `${baseClass} ${fingerClass} ${activeClass} ${pressedClass}`.trim();
  };

  const getFingerInfo = (key) => {
    const keyData = keyboardLayout.flat().find(k => k.key.toLowerCase() === key.toLowerCase());
    if (!keyData) return { name: '', hand: '', color: '' };
    
    const fingerData = {
      0: { name: 'Thumb', hand: 'Both', color: 'bg-gray-100' },
      1: { name: 'Pinky', hand: 'Left', color: 'bg-pink-100' },
      2: { name: 'Ring', hand: 'Left', color: 'bg-yellow-100' },
      3: { name: 'Middle', hand: 'Left', color: 'bg-green-100' },
      4: { name: 'Index', hand: 'Left', color: 'bg-blue-100' }
    };
    
    // Determine hand based on key position
    const leftKeys = ['q','w','e','r','t','a','s','d','f','g','z','x','c','v','b','1','2','3','4','5','`'];
    const isLeftHand = leftKeys.includes(key.toLowerCase());
    
    const finger = fingerData[keyData.finger] || fingerData[0];
    return {
      ...finger,
      hand: keyData.finger === 0 ? 'Both' : (isLeftHand ? 'Left' : 'Right')
    };
  };

  const fingerInfo = currentKey ? getFingerInfo(currentKey) : null;

  return (
    <div className={`${isDarkMode ? 'dark bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg p-4 ${className}`}>
      <div className="flex justify-between items-center mb-3">
        <div className={`text-sm font-medium ${
          isDarkMode ? 'text-gray-200' : 'text-gray-700'
        }`}>
          Virtual Keyboard ({layout.toUpperCase()})
        </div>
        {showFingerGuide && (
          <div className={`text-xs ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            Finger Guide Enabled
          </div>
        )}
      </div>
      
      {currentKey && showFingerGuide && fingerInfo && (
        <div className={`mb-4 p-3 rounded-lg border ${
          isDarkMode 
            ? 'bg-blue-900 border-blue-700' 
            : 'bg-blue-50 border-blue-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <span className={`text-sm font-semibold ${
                isDarkMode ? 'text-blue-200' : 'text-blue-800'
              }`}>
                Next Key: <span className="text-lg font-mono">{currentKey.toUpperCase()}</span>
              </span>
            </div>
            <div className="text-right">
              <div className={`text-xs ${
                isDarkMode ? 'text-blue-300' : 'text-blue-600'
              }`}>
                Use {fingerInfo.hand} {fingerInfo.name}
              </div>
              <div className={`inline-block w-4 h-4 rounded-full ${fingerInfo.color} border border-gray-300 mt-1`}></div>
            </div>
          </div>
        </div>
      )}
      
      <div className="space-y-1">
        {keyboardLayout.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center">
            {row.map((keyData, keyIndex) => (
              <button
                key={keyIndex}
                className={getKeyClass(keyData)}
                disabled
                aria-label={`Key ${keyData.key}`}
              >
                {keyData.key === ' ' ? 'Space' : keyData.key.toUpperCase()}
              </button>
            ))}
          </div>
        ))}
      </div>
      
      {showFingerGuide && (
        <div className={`mt-4 pt-3 border-t ${
          isDarkMode ? 'border-gray-600' : 'border-gray-200'
        }`}>
          <div className={`text-xs font-medium mb-2 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>Finger Guide:</div>
          <div className="flex items-center justify-center space-x-6">
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded mr-1 border ${
                isDarkMode ? 'bg-pink-600 border-pink-500' : 'bg-pink-200 border-pink-300'
              }`}></div>
              <span className={`text-xs ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>Pinky</span>
            </div>
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded mr-1 border ${
                isDarkMode ? 'bg-yellow-600 border-yellow-500' : 'bg-yellow-200 border-yellow-300'
              }`}></div>
              <span className={`text-xs ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>Ring</span>
            </div>
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded mr-1 border ${
                isDarkMode ? 'bg-green-600 border-green-500' : 'bg-green-200 border-green-300'
              }`}></div>
              <span className={`text-xs ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>Middle</span>
            </div>
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded mr-1 border ${
                isDarkMode ? 'bg-blue-600 border-blue-500' : 'bg-blue-200 border-blue-300'
              }`}></div>
              <span className={`text-xs ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>Index</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VisualKeyboard;