import { describe, it, expect, beforeEach } from 'vitest';
import { storage } from '../utils/storage';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

global.localStorage = localStorageMock;

describe('Storage Utils', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
  });

  describe('getSessions', () => {
    it('should return empty array when no sessions exist', () => {
      localStorageMock.getItem.mockReturnValue(null);
      expect(storage.getSessions()).toEqual([]);
    });

    it('should return parsed sessions when they exist', () => {
      const mockSessions = [{ id: 1, wpm: 30 }];
      localStorageMock.getItem.mockReturnValue(JSON.stringify(mockSessions));
      expect(storage.getSessions()).toEqual(mockSessions);
    });

    it('should return empty array on parse error', () => {
      localStorageMock.getItem.mockReturnValue('invalid json');
      expect(storage.getSessions()).toEqual([]);
    });
  });

  describe('saveSession', () => {
    it('should save session with timestamp and id', () => {
      localStorageMock.getItem.mockReturnValue('[]');
      
      const session = { wpm: 30, accuracy: 95 };
      storage.saveSession(session);
      
      expect(localStorageMock.setItem).toHaveBeenCalled();
      const savedData = JSON.parse(localStorageMock.setItem.mock.calls[0][1]);
      expect(savedData[0]).toMatchObject(session);
      expect(savedData[0]).toHaveProperty('id');
      expect(savedData[0]).toHaveProperty('timestamp');
    });
  });

  describe('getSettings', () => {
    it('should return default settings when none exist', () => {
      localStorageMock.getItem.mockReturnValue(null);
      const settings = storage.getSettings();
      
      expect(settings).toMatchObject({
        keyboardLayout: 'qwerty',
        theme: 'light',
        soundEnabled: true,
        fontSize: 'medium',
        highContrast: false
      });
    });

    it('should merge saved settings with defaults', () => {
      localStorageMock.getItem.mockReturnValue(JSON.stringify({ keyboardLayout: 'dvorak' }));
      const settings = storage.getSettings();
      
      expect(settings.keyboardLayout).toBe('dvorak');
      expect(settings.theme).toBe('light'); // Default value
    });
  });

  describe('exportData and importData', () => {
    it('should export all data with timestamp', () => {
      localStorageMock.getItem.mockReturnValue('[]');
      
      const exportedData = storage.exportData();
      
      expect(exportedData).toHaveProperty('sessions');
      expect(exportedData).toHaveProperty('settings');
      expect(exportedData).toHaveProperty('stats');
      expect(exportedData).toHaveProperty('exportDate');
    });

    it('should import data successfully', () => {
      const mockData = {
        sessions: [{ id: 1 }],
        settings: { theme: 'dark' },
        stats: { totalSessions: 5 }
      };
      
      const result = storage.importData(mockData);
      
      expect(result).toBe(true);
      expect(localStorageMock.setItem).toHaveBeenCalledTimes(3);
    });
  });
});