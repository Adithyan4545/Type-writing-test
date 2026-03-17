import React, { useState, useEffect } from 'react';

const CoachingTips = ({ wpm, accuracy, streak, errors, currentLevel, className = '' }) => {
  const [currentTip, setCurrentTip] = useState('');
  const [tipType, setTipType] = useState('info'); // 'info', 'warning', 'success', 'error'

  useEffect(() => {
    let tip = '';
    let type = 'info';

    // Priority-based coaching logic
    if (accuracy < 85) {
      tip = "Focus on accuracy first! Slow down and hit the right keys.";
      type = 'error';
    } else if (streak > 20) {
      tip = "Excellent streak! Keep up the consistent typing.";
      type = 'success';
    } else if (wpm > 0 && wpm < 15) {
      tip = "Take your time. Speed will come naturally with practice.";
      type = 'info';
    } else if (errors > 5) {
      tip = "Too many mistakes. Focus on finger placement and slow down.";
      type = 'warning';
    } else if (wpm > 30) {
      tip = "Great speed! Now maintain that accuracy.";
      type = 'success';
    } else if (currentLevel <= 3) {
      tip = "Remember: Use the correct finger for each key. Check the keyboard guide.";
      type = 'info';
    } else {
      tip = "You're doing great! Keep practicing to build muscle memory.";
      type = 'info';
    }

    setCurrentTip(tip);
    setTipType(type);
  }, [wpm, accuracy, streak, errors, currentLevel]);

  const getIconAndColors = () => {
    switch (tipType) {
      case 'success':
        return {
          icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          ),
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          textColor: 'text-green-800',
          iconColor: 'text-green-500'
        };
      case 'warning':
        return {
          icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          ),
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          textColor: 'text-yellow-800',
          iconColor: 'text-yellow-500'
        };
      case 'error':
        return {
          icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          ),
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          textColor: 'text-red-800',
          iconColor: 'text-red-500'
        };
      default:
        return {
          icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          ),
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          textColor: 'text-blue-800',
          iconColor: 'text-blue-500'
        };
    }
  };

  const { icon, bgColor, borderColor, textColor, iconColor } = getIconAndColors();

  return (
    <div className={`${bgColor} ${borderColor} border rounded-lg p-4 ${className}`}>
      <div className="flex items-start space-x-3">
        <div className={`${iconColor} flex-shrink-0 mt-0.5`}>
          {icon}
        </div>
        <div>
          <h4 className={`font-medium ${textColor} mb-1`}>
            Typing Coach
          </h4>
          <p className={`text-sm ${textColor}`}>
            {currentTip}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CoachingTips;