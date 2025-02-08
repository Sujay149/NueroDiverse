import React, { useState } from 'react';
import MemoryMatch from '../components/games/MemoryMatch';
import WordPuzzle from '../components/games/WordPuzzle';
import SpeedReading from '../components/games/SpeedReading';
import { GamepadIcon } from 'lucide-react';


const GamesPage = () => {
  const [activeGame, setActiveGame] = useState<string | null>(null);

  // Use URLs for the logos
  const games = [
    { 
      id: 'memory', 
      title: 'Memory Match', 
      component: MemoryMatch, 
      logo: 'https://th.bing.com/th/id/OIP.IK1AvnxCTWUS5NLmoM-90AHaEK?w=328&h=184&c=7&r=0&o=5&dpr=1.4&pid=1.7' // Replace with the actual URL for the Memory Match logo
    },
    { 
      id: 'word', 
      title: 'Word Puzzle', 
      component: WordPuzzle, 
      logo: 'https://th.bing.com/th/id/OIP.N3zaT8twkkKPygqny0xzaQAAAA?w=200&h=180&c=7&r=0&o=5&dpr=1.4&pid=1.7' // Replace with the actual URL for the Word Puzzle logo
    },
    { 
      id: 'speed', 
      title: 'Speed Reading', 
      component: SpeedReading, 
      logo: 'https://th.bing.com/th?id=OIP.FU7j9JfzOs6SRDj7nq3k5AHaFj&w=288&h=216&c=8&rs=1&qlt=90&o=6&dpr=1.4&pid=3.1&rm=2' // Replace with the actual URL for the Speed Reading logo
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <div className="max-w-7xl mx-auto px-4 py-12 flex-1">
        
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">Learning Games</h1>
          <GamepadIcon className="w-8 h-8 text-blue-500" />
        </div>
        
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Engage with our interactive games designed to reduce anxiety, improve focus, 
          and make learning fun. Each game adapts to your pace and preferences.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {games.map(game => (
            <button
              key={game.id}
              onClick={() => setActiveGame(game.id)}
              className={`relative p-6 rounded-lg shadow-md transition-all ${
                activeGame === game.id ? 'bg-blue-50 ring-2 ring-blue-500' : 'bg-white hover:shadow-lg'
              }`}
            >
              <div className="mb-4 flex justify-center relative">
                <img
                  src={game.logo} // Set the logo image URL as source
                  alt={`${game.title} Logo`} // Alt text for accessibility
                  className="w-full h-40 object-cover rounded-lg" // Make the image cover the entire card
                />
              </div>
              <h3 className="text-xl font-bold mb-2">{game.title}</h3>
              <p className="text-gray-600">Click to play</p>
            </button>
          ))}
        </div>

        {activeGame && (
          <div className="max-w-2xl mx-auto">
            {React.createElement(games.find(g => g.id === activeGame)?.component || 'div')}
          </div>
        )}
      </div>
    </div>
  );
};

export default GamesPage;
