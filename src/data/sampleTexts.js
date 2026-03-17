export const sampleTexts = {
  beginner: [
    "asdf jkl; asdf jkl;",
    "the quick brown fox",
    "hello world typing",
    "fast fingers help",
    "keep your hands steady"
  ],
  words: [
    "apple banana cherry date elderberry fig grape",
    "computer keyboard mouse monitor screen display",
    "javascript react component function variable",
    "mountain river ocean forest desert valley",
    "music dance painting sculpture literature poetry"
  ],
  sentences: [
    "The quick brown fox jumps over the lazy dog.",
    "Pack my box with five dozen liquor jugs.",
    "How vexingly quick daft zebras jump!",
    "Waltz, bad nymph, for quick jigs vex.",
    "Programming requires patience and practice to master."
  ],
  code: [
    "function calculateWPM(chars, minutes) { return (chars / 5) / minutes; }",
    "const [state, setState] = useState({ wpm: 0, accuracy: 100 });",
    "if (keyPressed === targetChar) { correctCount++; } else { errors++; }",
    "export default function TypingEngine({ onUpdate }) { return null; }",
    "const handleKeyPress = useCallback((event) => { event.preventDefault(); }, []);"
  ],
  custom: [
    "Type your own custom text here for practice.",
    "This is a sample custom text that you can modify.",
    "Practice with any text that interests you most."
  ]
};

export const difficultyThresholds = {
  beginner: { minWPM: 0, maxWPM: 20, minAccuracy: 80 },
  words: { minWPM: 15, maxWPM: 35, minAccuracy: 85 },
  sentences: { minWPM: 25, maxWPM: 50, minAccuracy: 90 },
  code: { minWPM: 35, maxWPM: Infinity, minAccuracy: 92 }
};