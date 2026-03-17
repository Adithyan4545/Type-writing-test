import React, { useEffect, useRef } from 'react';

const TypingArea = ({ targetText, currentIndex, userInput, errors, onKeyPress, isActive, isDarkMode = false }) => {
  const hiddenInputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key.length === 1 || e.key === ' ') {
        e.preventDefault();
        onKeyPress(e.key);
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        // Handle backspace if needed
      }
    };

    if (hiddenInputRef.current) {
      hiddenInputRef.current.focus();
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onKeyPress]);

  const renderText = () => {
    return targetText.split('').map((char, index) => {
      let className = 'typing-char ';
      
      if (index < userInput.length) {
        className += errors.includes(index) ? 'incorrect' : 'correct';
      } else if (index === currentIndex) {
        className += 'current';
      }

      return (
        <span key={index} className={className}>
          {char === ' ' ? '\u00A0' : char}
          {index === currentIndex && (
            <span className="typing-caret"></span>
          )}
        </span>
      );
    });
  };

  return (
    <div className="relative">
      <input
        ref={hiddenInputRef}
        className="absolute opacity-0 pointer-events-none"
        autoFocus
        aria-label="Hidden input for typing"
      />
      <div 
        className={`text-2xl leading-relaxed font-mono p-6 rounded-lg border-2 min-h-32 cursor-text shadow-sm hover:shadow-md transition-shadow duration-200 fade-in ${
          isDarkMode 
            ? 'bg-gray-800 border-gray-600 text-gray-200' 
            : 'bg-white border-gray-200 text-gray-900'
        }`}
        onClick={() => hiddenInputRef.current?.focus()}
        role="textbox"
        aria-label="Typing practice area"
        tabIndex={0}
      >
        {renderText()}
      </div>
      <div className={`mt-2 text-sm text-center ${
        isDarkMode ? 'text-gray-400' : 'text-gray-600'
      }`}>
        {isActive ? 'Keep typing...' : 'Click here and start typing to begin the exercise'}
      </div>
    </div>
  );
};

export default TypingArea;