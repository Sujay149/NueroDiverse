import React, { useState, useEffect } from 'react';
import { Brain, RefreshCcw } from 'lucide-react';

const CARDS = [
  '🌟', '🎨', '🎭', '🎪', '🎯', '🎲',
  '🌟', '🎨', '🎭', '🎪', '🎯', '🎲'
];

const MemoryMatch = () => {
  const [cards, setCards] = useState([...CARDS].sort(() => Math.random() - 0.5));
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [revealing, setRevealing] = useState(true);
  const [startTime, setStartTime] = useState<number | null>(null); // Track game start time
  const [endTime, setEndTime] = useState<number | null>(null); // Track game end time
  const [gameCompleted, setGameCompleted] = useState(false); // Flag to check if game is completed

  useEffect(() => {
    setTimeout(() => setRevealing(false), 2000); // Flip all cards for 2 seconds
    setStartTime(Date.now()); // Start the timer when game starts
  }, []);

  useEffect(() => {
    if (matched.length === cards.length) {
      setEndTime(Date.now()); // Set end time when all cards are matched
      setGameCompleted(true); // Game completed
    }
  }, [matched, cards]);

  useEffect(() => {
    if (flipped.length === 2) {
      const [first, second] = flipped;
      if (cards[first] === cards[second]) {
        setMatched(prevMatched => [...prevMatched, first, second]);
        setScore(prevScore => (prevScore + 1));
      }
      setTimeout(() => setFlipped([]), 1000);
      setSelected(null);
    }
  }, [flipped, cards]);

  const handleClick = (index: number) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index) || revealing) return;

    if (selected === null) {
      setSelected(index);
      setFlipped([index]);
    } else {
      setFlipped([selected, index]);
    }
  };

  const resetGame = () => {
    setCards([...CARDS].sort(() => Math.random() - 0.5));
    setFlipped([]);
    setMatched([]);
    setSelected(null);
    setScore(0);
    setRevealing(true);
    setStartTime(Date.now()); // Restart the timer when resetting the game
    setGameCompleted(false); // Reset the game completion flag
    setTimeout(() => setRevealing(false), 2000);
  };

  const calculateTimeTaken = () => {
    if (startTime && endTime) {
      const timeTaken = (endTime - startTime) / 1000; // Time in seconds
      return timeTaken;
    }
    return 0;
  };

  const analyzePerformance = () => {
    const timeTaken = calculateTimeTaken();
    const speed = timeTaken < 30 ? 'fast' : timeTaken < 60 ? 'average' : 'slow';

    const analysis = `Total Time: ${timeTaken.toFixed(2)} seconds\nSpeed: ${speed}\nScore: ${score}/6\n\n`;
    if (score === 6) {
      return `${analysis}Great job! You have excellent memory and quick recall speed.`;
    } else if (score >= 4) {
      return `${analysis}Good performance! You have a good grasp, but a little improvement in recall speed could help.`;
    } else {
      return `${analysis}You may need more practice. Consider working on improving recall speed and focus.`;
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold">Memory Match</h3>
        <div className="flex gap-3">
          <Brain className="w-8 h-8 text-blue-500" />
          <button onClick={resetGame} className="p-2 bg-gray-300 rounded-full">
            <RefreshCcw className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 mb-6">
        {cards.map((card, index) => (
          <button
            key={index}
            className={`h-24 text-3xl rounded-lg transition-all duration-300 ${
              flipped.includes(index) || matched.includes(index) || revealing
                ? 'bg-blue-100'
                : 'bg-gray-200'
            }`}
            onClick={() => handleClick(index)}
            disabled={revealing}
          >
            {(flipped.includes(index) || matched.includes(index) || revealing) ? card : '?'}
          </button>
        ))}
      </div>
      <div className="text-center">
        <p className="text-gray-600">Score: {score}</p>
        {gameCompleted && (
          <div className="mt-4">
            <p className="text-green-600 font-bold">Congratulations! You won!</p>
            <pre className="mt-4 text-gray-700">{analyzePerformance()}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemoryMatch;
