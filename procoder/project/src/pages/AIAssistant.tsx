import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Brain, Sparkles } from 'lucide-react';

const AIAssistant = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 p-6">
      <div className="text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-indigo-700 mb-4"
        >
          AI Learning Assistant
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-gray-700"
        >
          Get personalized help with your learning journey
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          whileHover={{ scale: 1.05, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
          transition={{ duration: 0.3 }}
          className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:border-indigo-300"
        >
          <Bot className="h-8 w-8 text-indigo-500 mb-4" />
          <h3 className="font-semibold text-indigo-700 mb-2">Learning Support</h3>
          <p className="text-gray-700">Get help with your studies and homework</p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
          transition={{ duration: 0.3 }}
          className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:border-indigo-300"
        >
          <Brain className="h-8 w-8 text-indigo-500 mb-4" />
          <h3 className="font-semibold text-indigo-700 mb-2">Study Tips</h3>
          <p className="text-gray-700">Receive personalized learning strategies</p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
          transition={{ duration: 0.3 }}
          className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:border-indigo-300"
        >
          <Sparkles className="h-8 w-8 text-indigo-500 mb-4" />
          <h3 className="font-semibold text-indigo-700 mb-2">Progress Tracking</h3>
          <p className="text-gray-700">Monitor your learning achievements</p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-md border border-gray-200"
      >
        <iframe
          src="https://www.chatbase.co/chatbot-iframe/fDzle9yleBIL9o8zRI6kS"
          width="100%"
          style={{ height: '100%', minHeight: '700px' }}
          frameBorder="0"
        ></iframe>
      </motion.div>
    </div>
  );
};

export default AIAssistant;
