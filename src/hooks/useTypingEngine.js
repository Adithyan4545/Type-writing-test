import { useState, useEffect, useCallback, useRef } from 'react';
import { calculateWPM, calculateAccuracy, calculateCPM } from '../utils/calculations';

export const useTypingEngine = (targetText, onComplete) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [errors, setErrors] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [cpm, setCpm] = useState(0);
  const [streak, setStreak] = useState(0);
  const [latencies, setLatencies] = useState([]);
  
  const lastKeystrokeTime = useRef(null);
  const intervalRef = useRef(null);

  const reset = useCallback(() => {
    setCurrentIndex(0);
    setUserInput('');
    setErrors([]);
    setStartTime(null);
    setIsActive(false);
    setWpm(0);
    setAccuracy(100);
    setCpm(0);
    setStreak(0);
    setLatencies([]);
    lastKeystrokeTime.current = null;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const updateMetrics = useCallback(() => {
    if (!startTime) return;
    
    const now = Date.now();
    const timeInMinutes = (now - startTime) / 60000;
    const correctChars = userInput.length - errors.length;
    
    setWpm(calculateWPM(correctChars, timeInMinutes));
    setAccuracy(calculateAccuracy(correctChars, userInput.length));
    setCpm(calculateCPM(userInput.length, timeInMinutes));
  }, [startTime, userInput.length, errors.length]);

  const handleKeyPress = useCallback((char) => {
    const now = Date.now();
    
    if (!isActive && !startTime) {
      setStartTime(now);
      setIsActive(true);
    }

    if (lastKeystrokeTime.current) {
      const latency = now - lastKeystrokeTime.current;
      setLatencies(prev => [...prev, latency]);
    }
    lastKeystrokeTime.current = now;

    const targetChar = targetText[currentIndex];
    const newInput = userInput + char;
    
    setUserInput(newInput);
    
    if (char === targetChar) {
      setStreak(prev => prev + 1);
      setCurrentIndex(prev => prev + 1);
    } else {
      setErrors(prev => [...prev, currentIndex]);
      setStreak(0);
      setCurrentIndex(prev => prev + 1);
    }

    if (currentIndex + 1 >= targetText.length) {
      setIsActive(false);
      const finalTime = (now - startTime) / 60000;
      const correctChars = newInput.length - errors.length - (char !== targetChar ? 1 : 0);
      const finalWPM = calculateWPM(correctChars, finalTime);
      const finalAccuracy = calculateAccuracy(correctChars, newInput.length);
      const averageLatency = latencies.length > 0 ? latencies.reduce((a, b) => a + b, 0) / latencies.length : 0;
      
      onComplete({
        wpm: finalWPM,
        accuracy: finalAccuracy,
        cpm: calculateCPM(newInput.length, finalTime),
        timeInSeconds: (now - startTime) / 1000,
        errors: errors.length + (char !== targetChar ? 1 : 0),
        streak: char === targetChar ? streak + 1 : 0,
        averageLatency: Math.round(averageLatency),
        latencies: [...latencies, now - lastKeystrokeTime.current]
      });
    }
  }, [currentIndex, userInput, targetText, isActive, startTime, errors, streak, latencies, onComplete]);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(updateMetrics, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, updateMetrics]);

  useEffect(() => {
    reset();
  }, [targetText, reset]);

  return {
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
    currentChar: targetText[currentIndex] || '',
    isComplete: currentIndex >= targetText.length
  };
};