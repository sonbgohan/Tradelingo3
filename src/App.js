import React, { useState } from 'react';
import { Sparkles, ChevronRight, ChevronLeft, Award, BarChart2, BookOpen, Users, Settings, Bell, Check, X, HelpCircle } from 'lucide-react';

const TradeMaster = () => {
  const [selectedWorld, setSelectedWorld] = useState('basics');
  const [currentScreen, setCurrentScreen] = useState('worldMap');
  const [currentLesson, setCurrentLesson] = useState(null);

  const worlds = {
    basics: {
      name: "Trading Basics",
      color: "bg-blue-500",
      levels: 5,
      completed: 3,
      icon: <BookOpen className="h-8 w-8 text-blue-200" />
    },
    technical: {
      name: "Technical Analysis",
      color: "bg-purple-500",
      levels: 8,
      completed: 0,
      icon: <BarChart2 className="h-8 w-8 text-purple-200" />
    },
    fundamental: {
      name: "Fundamental Analysis",
      color: "bg-green-500",
      levels: 6,
      completed: 0,
      icon: <BookOpen className="h-8 w-8 text-green-200" />
    },
    strategies: {
      name: "Trading Strategies",
      color: "bg-yellow-500",
      levels: 10,
      completed: 0,
      icon: <Award className="h-8 w-8 text-yellow-200" />
    },
    advanced: {
      name: "Advanced Concepts",
      color: "bg-red-500",
      levels: 12,
      completed: 0,
      icon: <Sparkles className="h-8 w-8 text-red-200" />
    }
  };

  const generateLevelNodes = (world) => {
    const levels = [];
    for (let i = 1; i <= worlds[world].levels; i++) {
      const isCompleted = i <= worlds[world].completed;
      const isActive = i === worlds[world].completed + 1;

      const classes = isCompleted
        ? `${worlds[world].color} text-white`
        : isActive
        ? 'bg-gray-800 border border-blue-400 text-white'
        : 'bg-gray-800 text-gray-400';

      levels.push(
        <div
          key={i}
          className={`${classes} w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl shadow-lg hover:scale-105 transition-transform cursor-pointer relative`}
        >
          {i}
          {isCompleted && (
            <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1">
              <Sparkles className="h-4 w-4 text-yellow-500" />
            </div>
          )}
        </div>
      );
    }
    return levels;
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Header */}
      <header className="bg-gray-800 p-4 flex justify-between items-center border-b border-gray-700">
        <div className="flex items-center">
          <Sparkles className="h-6 w-6 text-blue-400 mr-2" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
            TradeMaster
          </h1>
        </div>
        <div className="flex items-center space-x-6">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-sm font-bold">42</div>
            <div className="ml-1 text-blue-400 font-semibold">XP</div>
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center">
              <Award className="h-5 w-5 text-gray-900" />
            </div>
            <div className="ml-1 text-yellow-400 font-semibold">3</div>
          </div>
          <Bell className="h-6 w-6 text-gray-400 cursor-pointer hover:text-blue-400" />
          <Settings className="h-6 w-6 text-gray-400 cursor-pointer hover:text-blue-400" />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-8 px-4">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {Object.keys(worlds).map((worldKey) => (
            <div
              key={worldKey}
              onClick={() => setSelectedWorld(worldKey)}
              className={`${selectedWorld === worldKey ? `${worlds[worldKey].color} text-white` : 'bg-gray-800 text-gray-300'} 
                p-4 rounded-xl flex flex-col items-center justify-center w-32 h-32 cursor-pointer
                hover:scale-105 transition-transform shadow-lg`}
            >
              <div className={`rounded-full p-3 ${selectedWorld === worldKey ? 'bg-opacity-20 bg-white' : 'bg-gray-700'}`}>
                {worlds[worldKey].icon}
              </div>
              <span className="mt-2 font-medium text-center">{worlds[worldKey].name}</span>
              <div className="mt-1 text-xs">
                {worlds[worldKey].completed}/{worlds[worldKey].levels}
              </div>
            </div>
          ))}
        </div>

        {/* Level Progression */}
        <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 shadow-xl">
          <h2 className="text-xl font-bold mb-6 flex items-center">
            <span className={`inline-block w-4 h-4 rounded-full ${worlds[selectedWorld].color} mr-2`}></span>
            {worlds[selectedWorld].name} - Learning Path
          </h2>

          <div className="flex flex-wrap gap-6 justify-center items-center">
            {generateLevelNodes(selectedWorld)}
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <footer className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700">
        <div className="flex justify-around p-4">
          <div className="flex flex-col items-center text-blue-400">
            <BookOpen className="h-6 w-6" />
            <span className="text-xs mt-1">Learn</span>
          </div>
          <div className="flex flex-col items-center text-gray-400">
            <BarChart2 className="h-6 w-6" />
            <span className="text-xs mt-1">Practice</span>
          </div>
          <div className="flex flex-col items-center text-gray-400">
            <Users className="h-6 w-6" />
            <span className="text-xs mt-1">Community</span>
          </div>
          <div className="flex flex-col items-center text-gray-400">
            <Award className="h-6 w-6" />
            <span className="text-xs mt-1">Profile</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TradeMaster;
