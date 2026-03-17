export const calculateWPM = (correctChars, timeInMinutes) => {
  if (timeInMinutes === 0) return 0;
  return Math.round((correctChars / 5) / timeInMinutes);
};

export const calculateAccuracy = (correctChars, totalChars) => {
  if (totalChars === 0) return 100;
  return Math.round((correctChars / totalChars) * 100);
};

export const calculateCPM = (totalChars, timeInMinutes) => {
  if (timeInMinutes === 0) return 0;
  return Math.round(totalChars / timeInMinutes);
};

export const getDifficultyLevel = (wpm, accuracy) => {
  if (wpm < 20 || accuracy < 85) return 'beginner';
  if (wpm < 35 || accuracy < 90) return 'words';
  if (wpm < 50 || accuracy < 92) return 'sentences';
  return 'code';
};

export const calculateXP = (wpm, accuracy, timeInSeconds) => {
  const baseXP = Math.round(wpm * (accuracy / 100) * (timeInSeconds / 60));
  const bonusXP = accuracy >= 95 ? Math.round(baseXP * 0.2) : 0;
  return baseXP + bonusXP;
};

export const getBadges = (stats, session) => {
  const badges = [];
  
  if (session.wpm >= 40 && !stats.badges.includes('speed_demon')) {
    badges.push({ id: 'speed_demon', name: 'Speed Demon', description: 'Reached 40 WPM' });
  }
  
  if (session.accuracy >= 98 && !stats.badges.includes('perfectionist')) {
    badges.push({ id: 'perfectionist', name: 'Perfectionist', description: '98% accuracy' });
  }
  
  if (stats.totalSessions >= 10 && !stats.badges.includes('dedicated')) {
    badges.push({ id: 'dedicated', name: 'Dedicated', description: '10 sessions completed' });
  }
  
  return badges;
};

export const getImprovementTips = (session) => {
  const tips = [];
  
  if (session.accuracy < 90) {
    tips.push("Focus on accuracy over speed - aim for 95%+ accuracy");
    tips.push("Slow down and build muscle memory first");
  }
  
  if (session.wpm < 25) {
    tips.push("Practice home row keys: asdf jkl;");
    tips.push("Keep your fingers on the home row position");
  }
  
  if (session.averageLatency > 200) {
    tips.push("Try to anticipate the next character");
    tips.push("Practice common letter combinations");
  }
  
  return tips.slice(0, 3);
};