import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, CheckCircle, Clock, BookOpen, PlusCircle, Gift, Bell } from 'lucide-react';

const Daily = () => {
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [dailyTasks, setDailyTasks] = useState([
    { id: '1', title: 'Morning Mindfulness', duration: '10 mins', type: 'Wellness', description: 'Start your day with a calming breathing exercise' },
    { id: '2', title: 'Focus Exercise', duration: '15 mins', type: 'Cognitive', description: 'Complete a pattern recognition challenge' },
    { id: '3', title: 'Reading Practice', duration: '20 mins', type: 'Learning', description: 'Read an article using dyslexia-friendly tools' }
  ]);
  const [newTask, setNewTask] = useState({ title: '', duration: '', type: '', description: '' });

  const toggleTask = (taskId: string) => {
    setCompletedTasks(prev => prev.includes(taskId) ? prev.filter(id => id !== taskId) : [...prev, taskId]);
  };

  const addTask = () => {
    if (newTask.title && newTask.duration && newTask.type) {
      setDailyTasks([...dailyTasks, { id: Date.now().toString(), ...newTask }]);
      setNewTask({ title: '', duration: '', type: '', description: '' });
    }
  };

  const addReminderToGoogleCalendar = (task: any) => {
    const event = {
      text: task.title,
      dates: `${new Date().toISOString()}/${new Date().toISOString()}`,
      details: task.description,
      location: 'Your Schedule',
    };
    const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.text)}&dates=${encodeURIComponent(event.dates)}&details=${encodeURIComponent(event.details)}&location=${encodeURIComponent(event.location)}`;
    window.open(googleCalendarUrl, '_blank');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Daily Activities</h1>
        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-blue-500" />
          <span className="text-blue-500">{new Date().toLocaleDateString()}</span>
        </div>
      </div>

      <div className="space-y-4">
        {dailyTasks.map((task) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            className={`bg-white p-6 rounded-lg shadow-lg border border-gray-200
              ${completedTasks.includes(task.id) ? 'border-green-300 bg-green-50' : 'border-blue-300 bg-blue-50'}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{task.title}</h3>
                <p className="text-gray-700 mb-4">{task.description}</p>
                <div className="flex items-center space-x-4 text-gray-600">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1 text-blue-500" /> {task.duration}
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-1 text-purple-500" /> {task.type}
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <button onClick={() => toggleTask(task.id)} className={`p-2 rounded-full transition-colors
                  ${completedTasks.includes(task.id) ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-blue-500 text-white hover:bg-blue-600'}`}>
                  <CheckCircle className="h-6 w-6" />
                </button>
                <button onClick={() => addReminderToGoogleCalendar(task)} className="p-2 rounded-full bg-yellow-500 text-white hover:bg-yellow-600">
                  <Bell className="h-6 w-6" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">Add a New Task</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Title" value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} />
          <input className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Duration" value={newTask.duration} onChange={(e) => setNewTask({ ...newTask, duration: e.target.value })} />
          <input className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Type" value={newTask.type} onChange={(e) => setNewTask({ ...newTask, type: e.target.value })} />
          <button onClick={addTask} className="p-2 bg-blue-500 text-white rounded flex items-center hover:bg-blue-600 transition-colors">
            <PlusCircle className="h-5 w-5 mr-2" /> Add Task
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Progress Tracker</h2>
        <div className="flex items-center justify-between">
          <div className="text-gray-700">
            Completed: {completedTasks.length} / {dailyTasks.length} tasks
          </div>
          <div className="w-48 h-3 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${(completedTasks.length / dailyTasks.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>

      {completedTasks.length === dailyTasks.length && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 100 }}
          className="p-6 bg-gradient-to-r from-green-200 to-green-400 border border-green-500 rounded-lg flex items-center space-x-4"
        >
          <Gift className="h-8 w-8 text-green-700" />
          <h2 className="text-xl font-semibold text-green-900">Congratulations! You've completed all tasks for today! 🎉</h2>
        </motion.div>
      )}
    </div>
  );
};

export default Daily;
