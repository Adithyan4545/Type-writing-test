// Level-based progression system with finger placement focus
export const levels = {
  1: {
    id: 1,
    name: "Home Row Mastery",
    description: "Master the foundation keys: ASDF JKL;",
    targetWPM: 15,
    targetAccuracy: 90,
    keys: ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'],
    texts: [
      "asdf jkl; asdf jkl;",
      "sad lad ask flask",
      "fall ask dad flask",
      "ask dad; fall sad",
      "flask ask; dad fall"
    ]
  },
  2: {
    id: 2,
    name: "Top Row Extension",
    description: "Add top row keys: QWERT YUIOP",
    targetWPM: 20,
    targetAccuracy: 88,
    keys: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    texts: [
      "qwer tyui qwer tyui",
      "quit work type port",
      "query power output",
      "write quote poetry",
      "pretty quiet worker"
    ]
  },
  3: {
    id: 3,
    name: "Bottom Row Challenge",
    description: "Complete the alphabet: ZXCV BNM",
    targetWPM: 25,
    targetAccuracy: 85,
    keys: ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
    texts: [
      "zxcv bnm, zxcv bnm,",
      "zoom box cave move",
      "next maze climb",
      "brave zone mix",
      "complex vibrant"
    ]
  },
  4: {
    id: 4,
    name: "Common Words",
    description: "Practice everyday vocabulary",
    targetWPM: 30,
    targetAccuracy: 92,
    keys: [], // All keys
    texts: [
      "the quick brown fox",
      "hello world computer",
      "practice makes perfect",
      "typing speed accuracy",
      "keyboard finger placement"
    ]
  },
  5: {
    id: 5,
    name: "Sentences & Punctuation",
    description: "Master full sentences with punctuation",
    targetWPM: 35,
    targetAccuracy: 94,
    keys: [], // All keys + punctuation
    texts: [
      "The quick brown fox jumps over the lazy dog.",
      "Practice typing every day to improve your speed!",
      "Good typing skills are essential in today's world.",
      "Focus on accuracy first, then build up speed.",
      "Remember to use the correct finger for each key."
    ]
  }
};

export const getLevelProgress = (currentLevel, stats) => {
  const level = levels[currentLevel];
  if (!level) return { wpmProgress: 0, accuracyProgress: 0, isComplete: false };
  
  const wpmProgress = Math.min((stats.averageWPM / level.targetWPM) * 100, 100);
  const accuracyProgress = Math.min((stats.averageAccuracy / level.targetAccuracy) * 100, 100);
  const isComplete = stats.averageWPM >= level.targetWPM && stats.averageAccuracy >= level.targetAccuracy;
  
  return { wpmProgress, accuracyProgress, isComplete };
};

export const getNextUnlockedLevel = (stats) => {
  for (let i = 1; i <= Object.keys(levels).length; i++) {
    const progress = getLevelProgress(i, stats);
    if (!progress.isComplete) {
      return i;
    }
  }
  return Object.keys(levels).length; // All levels completed
};