import { describe, it, expect } from 'vitest';
import { 
  calculateWPM, 
  calculateAccuracy, 
  calculateCPM, 
  getDifficultyLevel,
  calculateXP 
} from '../utils/calculations';

describe('Typing Calculations', () => {
  describe('calculateWPM', () => {
    it('should calculate WPM correctly', () => {
      expect(calculateWPM(50, 1)).toBe(10); // 50 chars / 5 / 1 minute = 10 WPM
      expect(calculateWPM(100, 2)).toBe(10); // 100 chars / 5 / 2 minutes = 10 WPM
      expect(calculateWPM(0, 1)).toBe(0); // No characters typed
      expect(calculateWPM(50, 0)).toBe(0); // No time elapsed
    });
  });

  describe('calculateAccuracy', () => {
    it('should calculate accuracy correctly', () => {
      expect(calculateAccuracy(90, 100)).toBe(90); // 90% accuracy
      expect(calculateAccuracy(50, 50)).toBe(100); // Perfect accuracy
      expect(calculateAccuracy(0, 100)).toBe(0); // No correct characters
      expect(calculateAccuracy(0, 0)).toBe(100); // No characters typed yet
    });
  });

  describe('calculateCPM', () => {
    it('should calculate CPM correctly', () => {
      expect(calculateCPM(60, 1)).toBe(60); // 60 chars in 1 minute
      expect(calculateCPM(120, 2)).toBe(60); // 120 chars in 2 minutes
      expect(calculateCPM(0, 1)).toBe(0); // No characters typed
      expect(calculateCPM(60, 0)).toBe(0); // No time elapsed
    });
  });

  describe('getDifficultyLevel', () => {
    it('should return correct difficulty levels', () => {
      expect(getDifficultyLevel(10, 80)).toBe('beginner');
      expect(getDifficultyLevel(25, 88)).toBe('words');
      expect(getDifficultyLevel(40, 91)).toBe('sentences');
      expect(getDifficultyLevel(60, 95)).toBe('code');
    });

    it('should prioritize accuracy over speed', () => {
      expect(getDifficultyLevel(50, 80)).toBe('beginner'); // High speed but low accuracy
      expect(getDifficultyLevel(15, 95)).toBe('beginner'); // Low speed but high accuracy
    });
  });

  describe('calculateXP', () => {
    it('should calculate XP correctly', () => {
      const xp = calculateXP(30, 90, 60); // 30 WPM, 90% accuracy, 60 seconds
      expect(xp).toBeGreaterThan(0);
      
      const bonusXP = calculateXP(30, 96, 60); // Should get bonus for >95% accuracy
      expect(bonusXP).toBeGreaterThan(xp);
    });

    it('should return 0 XP for no performance', () => {
      expect(calculateXP(0, 0, 0)).toBe(0);
    });
  });
});