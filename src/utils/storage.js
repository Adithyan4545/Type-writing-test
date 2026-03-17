const STORAGE_KEYS = {
  SESSIONS: 'typing_coach_sessions',
  SETTINGS: 'typing_coach_settings',
  STATS: 'typing_coach_stats'
};

export const storage = {
  getSessions: () => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.SESSIONS) || '[]');
    } catch {
      return [];
    }
  },

  saveSession: (session) => {
    const sessions = storage.getSessions();
    sessions.unshift({ ...session, id: Date.now(), timestamp: new Date().toISOString() });
    localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions.slice(0, 50)));
  },

  getSettings: () => {
    try {
      return {
        keyboardLayout: 'qwerty',
        theme: 'light',
        soundEnabled: true,
        fontSize: 'medium',
        highContrast: false,
        ...JSON.parse(localStorage.getItem(STORAGE_KEYS.SETTINGS) || '{}')
      };
    } catch {
      return {
        keyboardLayout: 'qwerty',
        theme: 'light',
        soundEnabled: true,
        fontSize: 'medium',
        highContrast: false
      };
    }
  },

  saveSettings: (settings) => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  },

  getStats: () => {
    try {
      return {
        totalSessions: 0,
        bestWPM: 0,
        totalXP: 0,
        streak: 0,
        badges: [],
        averageWPM: 0,
        averageAccuracy: 0,
        currentLevel: 1,
        completedLevels: [],
        ...JSON.parse(localStorage.getItem(STORAGE_KEYS.STATS) || '{}')
      };
    } catch {
      return {
        totalSessions: 0,
        bestWPM: 0,
        totalXP: 0,
        streak: 0,
        badges: [],
        averageWPM: 0,
        averageAccuracy: 0,
        currentLevel: 1,
        completedLevels: []
      };
    }
  },

  saveStats: (stats) => {
    localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));
  },

  exportData: () => {
    return {
      sessions: storage.getSessions(),
      settings: storage.getSettings(),
      stats: storage.getStats(),
      exportDate: new Date().toISOString()
    };
  },

  importData: (data) => {
    try {
      if (data.sessions) localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(data.sessions));
      if (data.settings) localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(data.settings));
      if (data.stats) localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(data.stats));
      return true;
    } catch {
      return false;
    }
  }
};